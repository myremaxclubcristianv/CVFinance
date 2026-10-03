import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  detectEcosystemProperty,
  escapeHtml,
  cleanString,
  formatShortId,
  parseDeviceFromUA,
  parseGeoFromHeaders,
} from "@/lib/ecosystem";

const referralSchema = z.object({
  referrer_name: z.string().trim().min(2).max(100),
  referrer_phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/\s+/g, ""))
    .pipe(z.string().regex(/^(?:\+40|0040|0)7\d{8}$/, "Telefon referrer invalid")),
  referrer_email: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((v) => (!v ? undefined : v))
    .pipe(z.string().email().max(120).optional()),
  client_name: z.string().trim().min(2).max(100),
  client_phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/\s+/g, ""))
    .pipe(z.string().regex(/^(?:\+40|0040|0)7\d{8}$/, "Telefon client invalid")),
  client_email: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((v) => (!v ? undefined : v))
    .pipe(z.string().email().max(120).optional()),
  financial_need: z.string().trim().min(2).max(200),
  referral_message: z.string().trim().max(1000).optional().default(""),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Trebuie să confirmați consimțământul." }),
  }),
  website: z.string().max(0).optional().default(""), // Honeypot
  utmMedium: z.string().max(100).optional().default("—"),
  utmCampaign: z.string().max(100).optional().default("—"),
  utmContent: z.string().max(100).optional().default("—"),
  pageUrl: z.string().max(2048).optional(),
  deviceType: z.string().max(50).optional().default("Desktop"),
  visitorId: z.string().max(100).optional(),
  sessionId: z.string().max(100).optional(),
});

const attempts = new Map<string, { count: number; resetAt: number }>();
const fullReferralSchema = referralSchema;
const RATE_LIMIT = 5;
const WINDOW_MS = 15 * 60 * 1000;

function allowRequest(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count += 1;
  return true;
}

// Duplicate protection
const processed = new Map<string, number>();
const DUP_WINDOW_MS = 10 * 60 * 1000;

function isDuplicate(phone: string, email: string): boolean {
  const now = Date.now();
  const key = `${phone}-${email}`;
  const last = processed.get(key);
  if (last && now - last < DUP_WINDOW_MS) return true;
  processed.set(key, now);
  return false;
}

function getClientIp(request: Request): string {
  const vercelIp = request.headers.get("x-vercel-ip") || request.headers.get("x-real-ip");
  if (vercelIp) return vercelIp.trim();
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",");
    return parts[parts.length - 1].trim();
  }
  return "127.0.0.1";
}

async function sendTelegramReferral(text: string): Promise<boolean> {
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) return false;
  const resp = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text, parse_mode: "HTML" }),
  });
  return resp.ok;
}

export async function POST(request: Request) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, message: "Datele transmise sunt invalide." },
        { status: 400 }
      );
    }

    const ip = getClientIp(request);
    if (!allowRequest(ip)) {
      return NextResponse.json({ ok: false, message: "Prea multe cereri. Încearcă din nou în 15 minute." }, { status: 429 });
    }
    const parsed = fullReferralSchema.safeParse(body);
    if (!parsed.success || parsed.data.website) {
      return NextResponse.json(
        {
          ok: false,
          message: "Datele introduse sunt incomplete sau invalide.",
          ...(process.env.NODE_ENV !== "production" ? { errors: parsed.error?.flatten() } : {}),
        },
        { status: 400 }
      );
    }
    const data = parsed.data;
    if (isDuplicate(data.referrer_phone, data.referrer_email || "")) {
      return NextResponse.json({ ok: true, message: "Recomandarea a fost înregistrată cu succes." });
    }

    const userAgent = cleanString(request.headers.get("user-agent") || "necunoscut");
    const referrer = cleanString(request.headers.get("referer") || "direct");
    const deviceInfo = parseDeviceFromUA(userAgent);
    const geoInfo = parseGeoFromHeaders(request);
    const ecosystemProp = detectEcosystemProperty(data.pageUrl, request);

    // Store in leads table
    const { error } = await getSupabaseAdmin()
      .from("leads")
      .insert({
        name: cleanString(data.client_name),
        phone: cleanString(data.client_phone),
        email: data.client_email ? cleanString(data.client_email) : null,
        purpose: cleanString(data.financial_need),
        desired_amount: null,
        income: null,
        employment: null,
        credit_types: null,
        credit_type: null,
        monthly_payment: null,
        delays: null,
        credit_bureau: null,
        message: `[RECOMANDARE DE LA: ${cleanString(data.referrer_name)} (${cleanString(data.referrer_phone)}${data.referrer_email ? " / " + cleanString(data.referrer_email) : ""})] ${cleanString(data.referral_message || "")}`.trim(),
        gdpr: true,
        marketing: false,
        utm_source: "referral",
        utm_medium: data.utmMedium || "—",
        utm_campaign: data.utmCampaign || "—",
        utm_content: data.utmContent || "—",
        page_url: data.pageUrl || null,
        device_type: data.deviceType || "Desktop",
        ip,
        user_agent: userAgent,
        referrer: cleanString(data.referrer_name),
      });

    if (error) {
      console.error("Supabase insert error (referral):", error);
    }

    const shortVisitor = formatShortId(data.visitorId);
    const shortSession = formatShortId(data.sessionId);

    const timestamp = new Intl.DateTimeFormat("ro-RO", {
      dateStyle: "medium",
      timeStyle: "medium",
      timeZone: "Europe/Bucharest",
    }).format(new Date());

    const sanitizedReferralMsg = cleanString(data.referral_message || "");

    // Build Telegram message for referral
    const telegramText =
      `${ecosystemProp.emoji} <b>${ecosystemProp.domain.toUpperCase()} — 🤝 RECOMANDARE NOUĂ</b>\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `👤 <b>PARTENER / REFERRER</b>\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `Nume: ${escapeHtml(cleanString(data.referrer_name))}\n` +
      `Telefon: <code>${escapeHtml(cleanString(data.referrer_phone))}</code>\n` +
      `Email: ${cleanString(data.referrer_email) ? escapeHtml(cleanString(data.referrer_email)) : "Nespecificat"}\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `👥 <b>CLIENT RECOMANDAT</b>\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `Nume: ${escapeHtml(cleanString(data.client_name))}\n` +
      `Telefon: <code>${escapeHtml(cleanString(data.client_phone))}</code>\n` +
      `Email: ${cleanString(data.client_email) ? escapeHtml(cleanString(data.client_email)) : "Nespecificat"}\n` +
      `Nevoie financiară: <b>${escapeHtml(cleanString(data.financial_need))}</b>\n` +
      (sanitizedReferralMsg ? `Mesaj: ${escapeHtml(sanitizedReferralMsg)}\n` : "") +
      `━━━━━━━━━━━━━━━━━━\n` +
      `🌐 <b>CONTEXT</b>\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `Landing page: ${escapeHtml(data.pageUrl || "/referral")}\n` +
      `Source: referral\n` +
      `Medium: —\n` +
      `Campaign: —\n` +
      `Referrer: ${escapeHtml(referrer)}\n` +
      `Device: ${escapeHtml(deviceInfo.deviceType || data.deviceType || "Desktop")}\n` +
      `OS: ${escapeHtml(deviceInfo.os)}\n` +
      `Browser: ${escapeHtml(deviceInfo.browser)}\n` +
      `Location aproximativă: ${geoInfo.countryFlag} ${escapeHtml(geoInfo.city)}, ${escapeHtml(geoInfo.country)}\n` +
      `Visitor ID: <code>${shortVisitor}</code>\n` +
      `Session ID: <code>${shortSession}</code>\n` +
      `Time: ${escapeHtml(timestamp)}`;

    await sendTelegramReferral(telegramText);
    return NextResponse.json({ ok: true, message: "Recomandarea a fost înregistrată cu succes." });
  } catch (e) {
    console.error("/api/referrals error:", e);
    return NextResponse.json({ ok: false, message: "Eroare internă. Încearcă din nou." }, { status: 500 });
  }
}
