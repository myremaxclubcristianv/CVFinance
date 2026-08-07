import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
const leadSchema = z.object({
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
  creditBureau: z.enum(["Nu", "Da", "Nu știu", "Nu stiu"]),

  // Step 3: Contact & Consents
  name: z.string().trim().min(2).max(100),
  phone: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, ""))
    .pipe(z.string().regex(/^(?:\+40|0040|0)7\d{8}$/, "Număr de telefon nevalid")),
  email: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((val) => (!val ? undefined : val))
    .pipe(z.string().email("Adresă de email nevalidă").max(120).optional()),
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

// Rate limiting (sliding window)
const attempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 15 * 60 * 1000;

function allowRequest(ip: string): boolean {
  const now = Date.now();
  const attempt = attempts.get(ip);
  if (!attempt || attempt.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (attempt.count >= RATE_LIMIT) return false;
  attempt.count += 1;
  return true;
}

// Temporary Duplicate Prevention
// TODO: Replace with Redis/Supabase based deduplication when traffic increases.
const processedLeads = new Map<string, number>();
const DUP_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isDuplicate(phone: string, email: string): boolean {
  const now = Date.now();
  const key = `${phone}-${email}`;
  const lastProcessed = processedLeads.get(key);
  
  if (lastProcessed && now - lastProcessed < DUP_WINDOW_MS) {
    return true;
  }
  
  processedLeads.set(key, now);
  return false;
}

const clean = (val: string) => val.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();

// --- Storage & Notification Abstraction Layer ---

async function saveLead(leadData: any): Promise<boolean> {
  const { error } = await getSupabaseAdmin()
    .from("leads")
    .insert({
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email,

      birth_year: leadData.birthYear,
      purpose: leadData.purpose,
      desired_amount: String(leadData.desiredAmount),

      income: String(leadData.income),
      employment: leadData.employment,

      credit_types: leadData.creditTypes,
      credit_type: leadData.creditTypes.join(", "),

      monthly_payment: String(leadData.monthlyPayment),
      delays: leadData.delays,
      credit_bureau: leadData.creditBureau,

      message: leadData.message,

      gdpr: leadData.gdpr,
      marketing: leadData.marketing,

      utm_source: leadData.utmSource,
      utm_medium: leadData.utmMedium,
      utm_campaign: leadData.utmCampaign,
      utm_content: leadData.utmContent,

      page_url: leadData.pageUrl,
      device_type: leadData.deviceType,

      ip: leadData.ip,
      user_agent: leadData.userAgent,
      referrer: leadData.referrer,
    });

  if (error) {
    console.error("Supabase lead insert failed:", error);
    return false;
  }

  return true;
}

async function sendTelegram(telegramText: string): Promise<boolean> {
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    console.warn("Telegram missing configuration");
    return false;
  }
  
  const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: telegramText,
      parse_mode: "HTML",
    }),
  });
  
  return response.ok;
}

async function sendEmail(leadData: any, telegramText: string): Promise<boolean> {
  if (!process.env.RESEND_API_KEY || !process.env.LEAD_EMAIL_TO || !process.env.LEAD_EMAIL_FROM) {
    console.warn("Resend missing configuration");
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.LEAD_EMAIL_FROM,
      to: [process.env.LEAD_EMAIL_TO],
      subject: `🚨 CV FINANCE — NOUĂ SOLICITARE (Fallback): ${leadData.name} (${leadData.phone})`,
      html: telegramText.replace(/\n/g, "<br/>"),
    }),
  });

  return response.ok;
}

export async function POST(request: Request) {
  console.log('API /api/leads HIT');
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('Failed to parse JSON body', parseError);
      const raw = await request.text();
      console.log('RAW BODY TEXT', raw);
    }
  console.log('REQUEST BODY', body);

    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip") || "127.0.0.1";

    if (!allowRequest(ip)) {
      return NextResponse.json(
        { ok: false, message: "Prea multe solicitări efectuate de pe această adresă. Încearcă din nou în 15 minute." },
        { status: 429 }
      );
    }

    const parsed = leadSchema.safeParse(body);
    // Log payload for debugging
    console.log("RECEIVED LEAD PAYLOAD", JSON.stringify(body, null, 2));
    const { success, data, error } = parsed;
    // Honeypot check (website must be empty)
    if (data?.website) {
      console.warn("Honeypot triggered, ignoring lead.");
      return NextResponse.json({ ok: true, message: "Solicitarea a fost înregistrată cu succes." }, { status: 200 });
    }
    if (!success) {
      console.error("LEAD VALIDATION FAILED", JSON.stringify(error?.flatten(), null, 2));
      const errorMessage = error?.errors?.map((e) => e.message).join(", ") || "Datele introduse sunt incomplete sau invalide.";
      return NextResponse.json(
        {
          ok: false,
          message: "Datele introduse sunt incomplete sau invalide.",
          ...(process.env.NODE_ENV !== "production" ? { errors: error?.flatten() } : {}),
        },
        { status: 400 }
      );
    }

    const lead = data;
    
    // Duplicate Check
    if (isDuplicate(lead.phone, lead.email || "")) {
      // Return 200 OK to the client to not raise alarm, but skip processing
      console.log(`Duplicate lead prevented for ${lead.phone} / ${lead.email}`);
      return NextResponse.json({ ok: true, message: "Solicitarea a fost înregistrată cu succes." });
    }

    const sanitizedName = clean(lead.name);
    const sanitizedEmail = lead.email ? clean(lead.email) : "";
    const sanitizedMessage = clean(lead.message);

    const timestamp = new Intl.DateTimeFormat("ro-RO", {
      dateStyle: "medium",
      timeStyle: "medium",
      timeZone: "Europe/Bucharest",
    }).format(new Date());

    const userAgent = clean(request.headers.get("user-agent") || "necunoscut");
    const referrer = clean(request.headers.get("referer") || "direct");
    const formattedAmount = new Intl.NumberFormat("ro-RO").format(lead.desiredAmount);
    const formattedIncome = new Intl.NumberFormat("ro-RO").format(lead.income);
    const formattedPayment = new Intl.NumberFormat("ro-RO").format(lead.monthlyPayment);

    const fullLeadData = {
      ...lead,
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
      ip,
      userAgent,
      referrer,
      timestamp,
    };

    // 1. Permanent Storage Layer (Abstractions)
    try {
      console.log('INSERT START');
      await saveLead(fullLeadData);
      console.log('INSERT RESULT', 'completed');
    } catch (dbError) {
      console.error("Database save failed, but continuing to notifications:", dbError);
    }

    // Commercial High-Priority Telegram Message Format
    const telegramText =
      `🚨 <b>CV FINANCE</b>\n<b>NOU CLIENT FINANCIAL ADVISORY</b>\n` +
      `🔥 <b>Prioritate: HIGH</b>\n\n` +
      `👤 <b>Client:</b> ${sanitizedName}\n` +
      `📞 <b>Telefon:</b> <code>${lead.phone}</code>\n` +
      `📧 <b>Email:</b> ${sanitizedEmail}\n` +
      `🎂 <b>An naștere:</b> ${lead.birthYear}\n\n` +
      `💰 <b>Venit:</b> ${formattedIncome} RON\n` +
      `🏦 <b>Credite:</b> ${lead.creditTypes.join(", ")}\n` +
      `📉 <b>Rată actuală:</b> ${formattedPayment} RON\n` +
      `🎯 <b>Obiectiv financiar:</b> ${lead.purpose}\n` +
      `💳 <b>Sumă:</b> <b>${formattedAmount} RON</b>\n` +
      `🔒 <b>GDPR:</b> ✅ Acceptat\n` +
      `📢 <b>Marketing:</b> ${(lead.marketingConsent || lead.marketing) ? "✅ Acceptat" : "❌ Neacceptat"}\n\n` +
      `📍 <b>Sursă:</b> ${lead.utmSource} / ${lead.utmMedium} / ${lead.utmCampaign}\n` +
      `📱 <b>Device:</b> ${lead.deviceType}\n` +
      `🌐 <b>Referrer:</b> ${referrer}\n` +
      `🔗 <b>Pagină:</b> ${lead.pageUrl || "—"}\n` +
      `⏰ <b>Ora:</b> ${timestamp}`;

    // 2. Notifications Flow with Fallback
    try {
      const telegramSuccess = await sendTelegram(telegramText);
      
      if (!telegramSuccess) {
        console.warn("Telegram failed, attempting email fallback...");
        const emailSuccess = await sendEmail(fullLeadData, telegramText);
        if (!emailSuccess) {
           console.error("CRITICAL: Both Telegram and Email fallback failed for lead:", fullLeadData);
        }
      }
    } catch (notifyError) {
      console.error("Error in notification flow:", notifyError);
      // Attempt emergency email
      await sendEmail(fullLeadData, telegramText).catch(e => console.error("Emergency email failed:", e));
    }

    // Always return safe success to user if we reach here
    return NextResponse.json({ ok: true, message: "Solicitarea a fost înregistrată cu succes." });
  } catch (error) {
    console.error("API /api/leads Error:", error);
    // Even on 500, we do not expose internal error details to the client
    return NextResponse.json(
      { ok: false, message: "A apărut o eroare la procesarea solicitării. Încearcă din nou." },
      { status: 500 }
    );
  }
}
