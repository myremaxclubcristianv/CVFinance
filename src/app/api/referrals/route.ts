import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

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

// Duplicate protection – same as leads route
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

function clean(val: string) {
  return val.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
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
    const body = await request.json();
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "127.0.0.1";
    if (!allowRequest(ip)) {
      return NextResponse.json({ ok: false, message: "Prea multe cereri. Încearcă din nou în 15 minute." }, { status: 429 });
    }
    const parsed = fullReferralSchema.safeParse(body);
    if (!parsed.success || parsed.data.website) {
      console.error("REFERRAL VALIDATION FAILED", JSON.stringify(parsed.error?.flatten(), null, 2));
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
    // Store in leads table – respecting existing columns
    const { error } = await getSupabaseAdmin()
    .from("leads")
    .insert({
      name: clean(data.client_name),
      phone: clean(data.client_phone),
      email: data.client_email ? clean(data.client_email) : "referral@cvfinance.ro",
      purpose: clean(data.financial_need),
      desired_amount: "0",
      income: "0",
      employment: "Sub 3 luni",
      credit_types: ["Nu am"],
      credit_type: "Nu am",
      monthly_payment: "0",
      delays: "Nu",
      credit_bureau: "Nu știu",
      message: `[RECOMANDARE DE LA: ${clean(data.referrer_name)} (${clean(data.referrer_phone)}${data.referrer_email ? " / " + clean(data.referrer_email) : ""})] ${clean(data.referral_message || "")}`.trim(),
      gdpr: true,
      marketing: false,
      utm_source: "referral",
      utm_medium: data.utmMedium || "—",
      utm_campaign: data.utmCampaign || "—",
      utm_content: data.utmContent || "—",
      page_url: data.pageUrl,
      device_type: data.deviceType || "Desktop",
      ip,
      user_agent: request.headers.get("user-agent") || "",
      referrer: clean(data.referrer_name),
    });
    if (error) {
      console.error("Supabase insert error (referral):", error);
    }
    // Build Telegram message for referral
    const telegramText = `🚨 <b>CV FINANCE – RECOMANDARE</b>\n` +
      `<b>Referrer:</b> ${clean(data.referrer_name)} (${clean(data.referrer_phone)})\n` +
      `<b>Client:</b> ${clean(data.client_name)} (${clean(data.client_phone)})\n` +
      `<b>Finanțare:</b> ${clean(data.financial_need)}\n` +
      `<b>Mesaj:</b> ${clean(data.referral_message)}`;
    await sendTelegramReferral(telegramText);
    return NextResponse.json({ ok: true, message: "Recomandarea a fost înregistrată cu succes." });
  } catch (e) {
    console.error("/api/referrals error:", e);
    return NextResponse.json({ ok: false, message: "Eroare internă. Încearcă din nou." }, { status: 500 });
  }
}
