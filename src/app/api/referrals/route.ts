import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

// Reuse the base lead schema for shared fields
const baseLeadSchema = z.object({
  // Step 1: Purpose & Requested Amount
  purpose: z.string().trim().min(2).max(100),
  desiredAmount: z.coerce.number().positive().max(5_000_000),

  // Step 2: Financial Profile
  income: z.coerce.number().positive().max(1_000_000),
  employment: z.enum(["Sub 3 luni", "3–12 luni", "1–3 ani", "Peste 3 ani"]),
  creditTypes: z
    .array(z.enum(["Bancă", "IFN", "Card de credit", "Leasing", "Nu am"]))
    .min(1)
    .max(5),
  monthlyPayment: z.coerce.number().min(0).max(100_000),
  delays: z.enum(["Nu", "Da"]),
  creditBureau: z.enum(["Nu", "Da", "Nu știu"]),

  // Step 3: Contact & Consents
  name: z.string().trim().min(2).max(100),
  phone: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, ""))
    .pipe(z.string().regex(/^(?:\+40|0040|0)7\d{8}$/, "Număr de telefon nevalid")),
  email: z.string().trim().email().max(120),
  birthYear: z.coerce.number().int().min(1930).max(new Date().getFullYear() - 18),
  message: z.string().trim().max(1000).optional().default(""),
  gdpr: z.boolean().optional().default(true),
  gdprConsent: z.boolean().optional().default(true),
  marketing: z.boolean().optional().default(false),
  marketingConsent: z.boolean().optional().default(false),

  // Traffic & Device Metadata
  website: z.string().max(0).optional(), // Honeypot
  utmSource: z.string().max(100).optional().default("direct"),
  utmMedium: z.string().max(100).optional().default("—"),
  utmCampaign: z.string().max(100).optional().default("—"),
  utmContent: z.string().max(100).optional().default("—"),
  referral: z.string().max(100).optional().default("—"),
  pageUrl: z.string().url().max(2048).optional(),
  deviceType: z.string().max(50).optional().default("Desktop"),
});

// Referral‑specific fields
const referralSchema = z.object({
  referrer_name: z.string().trim().min(2).max(100),
  referrer_phone: z.string().trim().transform(v => v.replace(/\s+/g, "")).pipe(z.string().regex(/^(?:\+40|0040|0)7\d{8}$/, "Telefon referrer invalid")),
  referrer_email: z.string().trim().email().max(120).optional().default(""),
  client_name: z.string().trim().min(2).max(100),
  client_phone: z.string().trim().transform(v => v.replace(/\s+/g, "")).pipe(z.string().regex(/^(?:\+40|0040|0)7\d{8}$/, "Telefon client invalid")),
  client_email: z.string().trim().email().max(120).optional().default(""),
  financial_need: z.string().trim().min(2).max(200),
  referral_message: z.string().trim().max(1000).optional().default(""),
  consent: z.boolean().optional().default(true),
  website: z.string().max(0).optional(), // Honeypot
});
const attempts = new Map<string, { count: number; resetAt: number }>();
const fullReferralSchema = baseLeadSchema.merge(referralSchema);
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
      return NextResponse.json({ ok: false, message: "Datele introduse sunt incomplete sau invalide." }, { status: 400 });
    }
    const data = parsed.data;
    if (isDuplicate(data.referrer_phone, data.referrer_email)) {
      return NextResponse.json({ ok: true, message: "Recomandarea a fost înregistrată cu succes." });
    }
    const sanitized = {
      ...data,
      name: clean(data.name),
      email: clean(data.email),
      message: clean(data.message),
    };
    // Store in leads table – respecting existing columns
    const { error } = await getSupabaseAdmin()
    .from("leads")
    .insert({
      name: sanitized.client_name,
      phone: sanitized.client_phone,
      email: sanitized.client_email,
      birth_year: sanitized.birthYear,
      purpose: sanitized.financial_need || sanitized.purpose,
      desired_amount: String(sanitized.desiredAmount),
      income: String(sanitized.income),
      employment: sanitized.employment,
      credit_types: sanitized.creditTypes,
      credit_type: sanitized.creditTypes.join(", "),
      monthly_payment: String(sanitized.monthlyPayment),
      delays: sanitized.delays,
      credit_bureau: sanitized.creditBureau,
      message: `[RECOMANDARE DE LA: ${sanitized.referrer_name} (${sanitized.referrer_phone}${sanitized.referrer_email ? " / " + sanitized.referrer_email : ""})] ${sanitized.referral_message || ""}`.trim(),
      gdpr: sanitized.gdpr,
      marketing: sanitized.marketing,
      utm_source: "referral",
      utm_medium: sanitized.utmMedium,
      utm_campaign: sanitized.utmCampaign,
      utm_content: sanitized.utmContent,
      page_url: sanitized.pageUrl,
      device_type: sanitized.deviceType,
      ip,
      user_agent: request.headers.get("user-agent") || "",
      referrer: sanitized.referrer_name,
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
