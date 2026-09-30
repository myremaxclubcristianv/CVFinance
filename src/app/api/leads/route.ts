import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
const standardLeadSchema = z.object({
  // Step 1: Purpose & Requested Amount
  purpose: z.string().trim().min(2, "Selectează un obiectiv financiar.").max(100),
  desiredAmount: z.coerce.number().positive("Suma dorită trebuie să fie mai mare ca 0.").max(5_000_000),

  // Step 2: Financial Profile
  income: z.coerce.number().positive("Venitul trebuie să fie mai mare ca 0.").max(1_000_000),
  employment: z.string().trim().min(1, "Selectează vechimea în muncă.").max(100),
  creditTypes: z
    .array(z.string())
    .min(1)
    .max(10)
    .optional()
    .default(["Bancă"]),
  monthlyPayment: z.coerce.number().min(0).max(100_000).optional().default(0),
  delays: z.string().trim().max(100).optional().default("Nu"),
  creditBureau: z.string().trim().max(100).optional().default("Nu știu"),

  // Step 3: Contact & Consents
  name: z.string().trim().min(2, "Te rugăm să introduci numele complet (minimum 2 caractere).").max(100),
  phone: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, ""))
    .pipe(z.string().regex(/^(?:\+40|0040|0)7\d{8}$/, "Te rugăm să introduci un număr de telefon valid din România.")),
  email: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((val) => (!val ? undefined : val))
    .pipe(z.string().email("Adresă de email nevalidă.").max(120).optional()),
  birthYear: z.coerce.number().int().min(1930).max(new Date().getFullYear() - 18).optional().default(1990),
  message: z.string().trim().max(1000).optional().default(""),
  gdpr: z.literal(true, {
    errorMap: () => ({ message: "Acordul cu termenii și condițiile este obligatoriu." }),
  }),
  gdprConsent: z.boolean().optional().default(true),
  marketing: z.boolean().optional().default(false),
  marketingConsent: z.boolean().optional().default(false),

  // Traffic & Device Metadata
  website: z.string().max(0).optional().default(""), // Honeypot
  utmSource: z.string().max(100).optional().default("direct"),
  utmMedium: z.string().max(100).optional().default("—"),
  utmCampaign: z.string().max(100).optional().default("—"),
  utmContent: z.string().max(100).optional().default("—"),
  referral: z.string().max(100).optional().default("—"),
  pageUrl: z.string().max(2048).optional(),
  deviceType: z.string().max(50).optional().default("Desktop"),
  visitorId: z.string().max(100).optional(),
  sessionId: z.string().max(100).optional(),
});

const totulLeadSchema = z.object({
  source: z.enum(["totul-inainte-de-credit", "homepage-totul-inainte-de-credit"]),
  leadType: z.string().optional().default("credit_prequalification"),
  problemTypes: z.array(z.string()).min(1, "Selectează cel puțin o problemă sau situație."),
  income: z.coerce.number().min(0, "Venitul nu poate fi negativ.").max(1_000_000),
  incomeType: z.string().trim().min(2, "Selectează tipul venitului.").max(100),
  employmentDuration: z.string().trim().min(2, "Selectează vechimea în muncă.").max(100),
  monthlyInstallments: z.coerce.number().min(0).max(100_000),
  activeCreditCount: z.string().trim().min(1).max(50),
  requestedAmount: z.coerce.number().min(0).max(5_000_000),

  creditBureauStatus: z.string().trim().min(2).max(200),
  delayPeriod: z.string().trim().max(200).optional().default("—"),
  clientMessage: z.string().trim().max(2000).optional().default(""),

  name: z.string().trim().min(2, "Te rugăm să introduci numele complet (minimum 2 caractere).").max(100),
  phone: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, ""))
    .pipe(z.string().regex(/^(?:\+40|0040|0)7\d{8}$/, "Te rugăm să introduci un număr de telefon valid din România.")),
  email: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((val) => (!val ? undefined : val))
    .pipe(z.string().email("Adresă de email nevalidă.").max(120).optional()),

  gdpr: z.literal(true, {
    errorMap: () => ({ message: "Acordul cu termenii și condițiile este obligatoriu." }),
  }),
  gdprConsent: z.boolean().optional().default(true),
  marketing: z.boolean().optional().default(false),
  marketingConsent: z.boolean().optional().default(false),

  // Traffic & Device Metadata
  website: z.string().max(0).optional().default(""), // Honeypot
  utmSource: z.string().max(100).optional().default("direct"),
  utmMedium: z.string().max(100).optional().default("—"),
  utmCampaign: z.string().max(100).optional().default("—"),
  utmContent: z.string().max(100).optional().default("—"),
  referral: z.string().max(100).optional().default("—"),
  pageUrl: z.string().max(2048).optional(),
  deviceType: z.string().max(50).optional().default("Desktop"),
  visitorId: z.string().max(100).optional(),
  sessionId: z.string().max(100).optional(),
});

const businessLeadSchema = z.object({
  source: z.literal("homepage-business-finance"),
  leadType: z.string().optional().default("business_finance_prequalification"),
  selectedPurposes: z.array(z.string()).min(1, "Selectează cel puțin un scop al finanțării."),
  companyType: z.string().trim().min(1).max(50),
  companyAge: z.string().trim().min(1).max(50),
  industry: z.string().trim().min(1).max(100),
  location: z.string().trim().min(1).max(100),
  employeeRange: z.string().trim().min(1).max(50),
  companyName: z.string().trim().max(100).optional().default("Nespecificat"),

  annualRevenue: z.string().trim().min(1).max(100),
  approximateProfit: z.string().trim().min(1).max(100),
  existingCredits: z.string().trim().min(1).max(100),
  monthlyInstallments: z.coerce.number().min(0).max(1_000_000),
  requestedAmountRange: z.string().trim().min(1).max(100),
  currency: z.string().trim().min(1).max(10),

  hasActiveCredits: z.string().trim().min(1).max(100),
  hasDelays: z.string().trim().min(1).max(100),
  previousRefusal: z.string().trim().min(1).max(100),
  bureauStatus: z.string().trim().min(1).max(100),
  urgency: z.string().trim().min(1).max(100),
  clientMessage: z.string().trim().max(2000).optional().default(""),

  name: z.string().trim().min(2, "Te rugăm să introduci numele complet (minimum 2 caractere).").max(100),
  phone: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, ""))
    .pipe(z.string().regex(/^(?:\+40|0040|0)7\d{8}$/, "Te rugăm să introduci un număr de telefon valid din România.")),
  email: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((val) => (!val ? undefined : val))
    .pipe(z.string().email("Adresă de email nevalidă.").max(120).optional()),

  gdpr: z.literal(true, {
    errorMap: () => ({ message: "Acordul cu termenii și condițiile este obligatoriu." }),
  }),
  gdprConsent: z.boolean().optional().default(true),
  marketing: z.boolean().optional().default(false),
  marketingConsent: z.boolean().optional().default(false),

  // Traffic & Device Metadata
  website: z.string().max(0).optional().default(""), // Honeypot
  utmSource: z.string().max(100).optional().default("direct"),
  utmMedium: z.string().max(100).optional().default("—"),
  utmCampaign: z.string().max(100).optional().default("—"),
  utmContent: z.string().max(100).optional().default("—"),
  referral: z.string().max(100).optional().default("—"),
  pageUrl: z.string().max(2048).optional(),
  deviceType: z.string().max(50).optional().default("Desktop"),
  visitorId: z.string().max(100).optional(),
  sessionId: z.string().max(100).optional(),
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

function calculateLeadPriority(data: any): "HOT" | "WARM" | "INFORMATIONAL" {
  const problems: string[] = Array.isArray(data.problemTypes) ? data.problemTypes : [];
  const status: string = data.creditBureauStatus || "";
  const phoneValid = !!data.phone;

  const isHot =
    problems.some((p) =>
      [
        "Am fost refuzat de bancă",
        "Am fost refuzat de IFN",
        "Am fost refuzat de un IFN",
        "Am întârzieri la credite",
        "Am probleme în Biroul de Credit",
        "Am istoric negativ",
        "Am prea multe rate",
        "Vreau rate mai mici",
        "Vreau refinanțare",
      ].includes(p)
    ) ||
    status.includes("întârzieri") ||
    status.includes("restante") ||
    status.includes("refuzat") ||
    status.includes("raportat") ||
    status.includes("incorecte") ||
    status.includes("negativ");

  if (isHot && phoneValid) return "HOT";

  const isWarm =
    problems.length > 0 ||
    (data.requestedAmount && data.requestedAmount > 0) ||
    (data.income && data.income > 0);

  if (isWarm) return "WARM";

  return "INFORMATIONAL";
}

function calculateBusinessLeadPriority(data: any): "HOT" | "WARM" | "INFORMATIONAL" {
  const urgency = data.urgency || "";
  const revenue = data.annualRevenue || "";
  const requested = data.requestedAmountRange || "";
  const companyAge = data.companyAge || "";

  const isHighValue =
    urgency.includes("sub 30 zile") ||
    urgency.includes("URGENT") ||
    revenue.includes("1M") ||
    revenue.includes("5M") ||
    requested.includes("250.000") ||
    requested.includes("500.000");

  const isEstablished =
    companyAge.includes("1–3 ani") ||
    companyAge.includes("3–5 ani") ||
    companyAge.includes("Peste 5 ani");

  if (isHighValue && isEstablished) return "HOT";
  if (isHighValue || isEstablished) return "WARM";
  return "INFORMATIONAL";
}

const clean = (val?: string) => (val || "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim();

function escapeHtml(val?: string): string {
  if (!val) return "";
  return String(val)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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

      credit_types: Array.isArray(leadData.creditTypes) ? leadData.creditTypes : [String(leadData.creditTypes || "Nespecificat")],
      credit_type: Array.isArray(leadData.creditTypes) ? leadData.creditTypes.join(", ") : String(leadData.creditTypes || "Nespecificat"),

      monthly_payment: String(leadData.monthlyPayment || "0"),
      delays: leadData.delays || "Nu",
      credit_bureau: leadData.creditBureau || "Nu știu",

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
    console.error("Supabase lead insert failed");
    return false;
  }

  return true;
}

async function sendTelegram(telegramText: string): Promise<boolean> {
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
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
      subject: `🚨 CV FINANCE — NOUĂ SOLICITARE (Fallback)`,
      html: telegramText.replace(/\n/g, "<br/>"),
    }),
  });

  return response.ok;
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
      return NextResponse.json(
        { ok: false, message: "Prea multe solicitări efectuate de pe această adresă. Încearcă din nou în 15 minute." },
        { status: 429 }
      );
    }

    const isTotulCredit = body?.source === "totul-inainte-de-credit" || body?.source === "homepage-totul-inainte-de-credit";
    const isBusiness = body?.source === "homepage-business-finance";
    const parsed = isBusiness
      ? businessLeadSchema.safeParse(body)
      : isTotulCredit
      ? totulLeadSchema.safeParse(body)
      : standardLeadSchema.safeParse(body);

    const { success, data, error } = parsed;

    // Honeypot check (website must be empty)
    if (data?.website) {
      return NextResponse.json({ ok: true, message: "Solicitarea a fost înregistrată cu succes." }, { status: 200 });
    }

    if (!success) {
      const firstIssue = error?.issues?.[0];
      const errorMessage = firstIssue?.message || "Datele introduse sunt incomplete sau invalide.";
      return NextResponse.json(
        {
          ok: false,
          message: errorMessage,
          ...(process.env.NODE_ENV !== "production" ? { errors: error?.flatten() } : {}),
        },
        { status: 400 }
      );
    }

    const lead: any = data;
    
    // Duplicate Check
    if (isDuplicate(lead.phone, lead.email || "")) {
      return NextResponse.json({ ok: true, message: "Solicitarea a fost înregistrată cu succes." });
    }

    const sanitizedName = clean(lead.name);
    const sanitizedEmail = lead.email ? clean(lead.email) : "";

    const timestamp = new Intl.DateTimeFormat("ro-RO", {
      dateStyle: "medium",
      timeStyle: "medium",
      timeZone: "Europe/Bucharest",
    }).format(new Date());

    const userAgent = clean(request.headers.get("user-agent") || "necunoscut");
    const referrer = clean(request.headers.get("referer") || "direct");

    let telegramText = "";
    let fullLeadData: any = {};

    if (isBusiness) {
      const sanitizedMessage = clean(lead.clientMessage || "");
      const priority = calculateBusinessLeadPriority(lead);
      const priorityBadge = priority === "HOT" ? "🔥 HOT" : priority === "WARM" ? "🟡 WARM" : "🔵 INFORMATIONAL";
      const purposesText = (lead.selectedPurposes || []).map((p: string) => `• ${escapeHtml(p)}`).join("\n");

      fullLeadData = {
        ...lead,
        name: sanitizedName,
        email: sanitizedEmail,
        message: sanitizedMessage,
        purpose: `Business Finance — ${lead.selectedPurposes?.join(", ")}`,
        desiredAmount: lead.requestedAmountRange,
        income: lead.annualRevenue,
        employment: lead.companyAge,
        ip,
        userAgent,
        referrer,
        timestamp,
      };

      const shortVisitor = lead.visitorId ? escapeHtml(clean(lead.visitorId).replace(/^(vis_|sess_)/, "").toUpperCase().slice(0, 4) + "••••") : "";
      const shortSession = lead.sessionId ? escapeHtml(clean(lead.sessionId).replace(/^(vis_|sess_)/, "").toUpperCase().slice(0, 4) + "••••") : "";
      const idFooter = (shortVisitor ? `\n🆔 <b>Visitor:</b> <code>${shortVisitor}</code>` : "") + (shortSession ? `\n🧭 <b>Session:</b> <code>${shortSession}</code>` : "");

      telegramText =
        `🏢 <b>LEAD — BUSINESS FINANCE</b>\n\n` +
        `🔥 <b>PRIORITATE: ${priorityBadge}</b>\n\n` +
        `👤 <b>ANTREPRENOR</b>\n` +
        `Nume: ${escapeHtml(sanitizedName)}\n` +
        `Telefon: <code>${escapeHtml(lead.phone)}</code>\n` +
        `Email: ${escapeHtml(sanitizedEmail) || "—"}\n\n` +
        `🏢 <b>BUSINESS</b>\n` +
        `Firma: ${escapeHtml(clean(lead.companyName || "Nespecificat"))}\n` +
        `Tip: ${escapeHtml(lead.companyType)} | Vechime: ${escapeHtml(lead.companyAge)}\n` +
        `Domeniu: ${escapeHtml(clean(lead.industry || "—"))} | Localitate: ${escapeHtml(clean(lead.location || "—"))}\n` +
        `Angajați: ${escapeHtml(lead.employeeRange)}\n\n` +
        `💰 <b>PROFIL FINANCIAR</b>\n` +
        `Cifră de afaceri: ${escapeHtml(lead.annualRevenue)}\n` +
        `Profit: ${escapeHtml(lead.approximateProfit)}\n` +
        `Sumă dorită: <b>${escapeHtml(lead.requestedAmountRange)} (${escapeHtml(lead.currency)})</b>\n` +
        `Credite/Rate active: ${escapeHtml(lead.existingCredits)} (${escapeHtml(String(lead.monthlyInstallments))} RON/lună)\n\n` +
        `🎯 <b>DESTINAȚIE FINANȚARE</b>\n` +
        `${purposesText || "• Nespecificat"}\n\n` +
        `⚠️ <b>RISC & CONTEXT</b>\n` +
        `Biroul de credit: ${escapeHtml(lead.bureauStatus)}\n` +
        `Întârzieri: ${escapeHtml(lead.hasDelays)}\n` +
        `Refuzuri anterioare: ${escapeHtml(lead.previousRefusal)}\n` +
        `Urgență: ${escapeHtml(lead.urgency)}\n\n` +
        `📝 <b>MESAJ CLIENT</b>\n` +
        `${escapeHtml(sanitizedMessage) || "Nicio mențiune adăugată."}\n\n` +
        `🌐 <b>TRAFFIC</b>\n` +
        `Sursă: Homepage Business Finance\n` +
        `Device: ${escapeHtml(lead.deviceType || "Desktop")}\n` +
        `Referrer: ${escapeHtml(referrer)}\n` +
        `UTM: ${escapeHtml(lead.utmSource)} / ${escapeHtml(lead.utmMedium)} / ${escapeHtml(lead.utmCampaign)}\n\n` +
        `🕐 <b>TIMESTAMP</b>\n` +
        `${escapeHtml(timestamp)}` +
        idFooter;
    } else if (isTotulCredit) {
      const sanitizedMessage = clean(lead.clientMessage || "");
      const formattedIncome = new Intl.NumberFormat("ro-RO").format(lead.income);
      const formattedInstallments = new Intl.NumberFormat("ro-RO").format(lead.monthlyInstallments);
      const formattedAmount = new Intl.NumberFormat("ro-RO").format(lead.requestedAmount);

      const priority = calculateLeadPriority(lead);
      const priorityBadge = priority === "HOT" ? "🔥 HOT" : priority === "WARM" ? "🟡 WARM" : "🔵 INFORMATIONAL";

      fullLeadData = {
        ...lead,
        name: sanitizedName,
        email: sanitizedEmail,
        message: sanitizedMessage,
        purpose: "Totul înainte de credit — Prequalification",
        desiredAmount: lead.requestedAmount,
        creditTypes: [lead.activeCreditCount],
        income: lead.income,
        employment: lead.employmentDuration,
        monthlyPayment: lead.monthlyInstallments,
        delays: lead.creditBureauStatus.includes("întârzieri") ? "Da" : "Nu",
        creditBureau: lead.creditBureauStatus,
        ip,
        userAgent,
        referrer,
        timestamp,
      };

      const motivText = (lead.problemTypes || []).map((p: string) => `• ${escapeHtml(p)}`).join("\n");
      const headerTitle = lead.source === "homepage-totul-inainte-de-credit"
        ? "🔥 <b>LEAD — HOMEPAGE / TOTUL ÎNAINTE DE CREDIT</b>"
        : "🔥 <b>LEAD — TOTUL ÎNAINTE DE CREDIT</b>";

      const shortVisitor = lead.visitorId ? escapeHtml(clean(lead.visitorId).replace(/^(vis_|sess_)/, "").toUpperCase().slice(0, 4) + "••••") : "";
      const shortSession = lead.sessionId ? escapeHtml(clean(lead.sessionId).replace(/^(vis_|sess_)/, "").toUpperCase().slice(0, 4) + "••••") : "";
      const idFooter = (shortVisitor ? `\n🆔 <b>Visitor:</b> <code>${shortVisitor}</code>` : "") + (shortSession ? `\n🧭 <b>Session:</b> <code>${shortSession}</code>` : "");

      telegramText =
        `${headerTitle}\n\n` +
        `🔥 <b>PRIORITATE: ${priorityBadge}</b>\n\n` +
        `👤 <b>CLIENT</b>\n` +
        `Nume: ${escapeHtml(sanitizedName)}\n` +
        `Telefon: <code>${escapeHtml(lead.phone)}</code>\n` +
        `Email: ${escapeHtml(sanitizedEmail) || "—"}\n\n` +
        `🎯 <b>MOTIV / PROBLEME</b>\n` +
        `${motivText || "• Nespecificat"}\n\n` +
        `💳 <b>SITUAȚIE FINANCIARĂ</b>\n` +
        `Venit: ${escapeHtml(formattedIncome)} RON\n` +
        `Tip venit: ${escapeHtml(lead.incomeType)}\n` +
        `Vechime: ${escapeHtml(lead.employmentDuration)}\n` +
        `Rate lunare: ${escapeHtml(formattedInstallments)} RON\n` +
        `Credite active: ${escapeHtml(lead.activeCreditCount)}\n` +
        `Sumă dorită: ${escapeHtml(formattedAmount)} RON\n\n` +
        `🏦 <b>BIROUL DE CREDIT</b>\n` +
        `Status: ${escapeHtml(lead.creditBureauStatus)}\n` +
        `Întârzieri / Perioadă: ${escapeHtml(lead.delayPeriod || "—")}\n\n` +
        `📝 <b>SITUAȚIA CLIENTULUI</b>\n` +
        `${escapeHtml(sanitizedMessage) || "Nicio mențiune adăugată."}\n\n` +
        `🌐 <b>TRAFFIC</b>\n` +
        `Page: ${escapeHtml(lead.pageUrl || "/totul-inainte-de-credit")}\n` +
        `Device: ${escapeHtml(lead.deviceType || "Desktop")}\n` +
        `Referrer: ${escapeHtml(referrer)}\n` +
        `UTM: ${escapeHtml(lead.utmSource)} / ${escapeHtml(lead.utmMedium)} / ${escapeHtml(lead.utmCampaign)}\n\n` +
        `🕐 <b>TIMESTAMP</b>\n` +
        `${escapeHtml(timestamp)}\n\n` +
        `⚡ <b>LEAD SCORE</b>\n` +
        `${priorityBadge}` +
        idFooter;
    } else {
      const sanitizedMessage = clean(lead.message || "");
      const formattedAmount = new Intl.NumberFormat("ro-RO").format(lead.desiredAmount);
      const formattedIncome = new Intl.NumberFormat("ro-RO").format(lead.income);
      const formattedPayment = new Intl.NumberFormat("ro-RO").format(lead.monthlyPayment);

      fullLeadData = {
        ...lead,
        name: sanitizedName,
        email: sanitizedEmail,
        message: sanitizedMessage,
        ip,
        userAgent,
        referrer,
        timestamp,
      };

      const shortVisitor = lead.visitorId ? escapeHtml(clean(lead.visitorId).replace(/^(vis_|sess_)/, "").toUpperCase().slice(0, 4) + "••••") : "";
      const shortSession = lead.sessionId ? escapeHtml(clean(lead.sessionId).replace(/^(vis_|sess_)/, "").toUpperCase().slice(0, 4) + "••••") : "";
      const idFooter = (shortVisitor ? `\n🆔 <b>Visitor:</b> <code>${shortVisitor}</code>` : "") + (shortSession ? `\n🧭 <b>Session:</b> <code>${shortSession}</code>` : "");

      telegramText =
        `🚨 <b>CV FINANCE</b>\n<b>NOU CLIENT FINANCIAL ADVISORY</b>\n` +
        `🔥 <b>Prioritate: HIGH</b>\n\n` +
        `👤 <b>Client:</b> ${escapeHtml(sanitizedName)}\n` +
        `📞 <b>Telefon:</b> <code>${escapeHtml(lead.phone)}</code>\n` +
        `📧 <b>Email:</b> ${escapeHtml(sanitizedEmail) || "—"}\n` +
        `🎂 <b>An naștere:</b> ${escapeHtml(String(lead.birthYear))}\n\n` +
        `💰 <b>Venit:</b> ${escapeHtml(formattedIncome)} RON\n` +
        `🏦 <b>Credite:</b> ${escapeHtml(lead.creditTypes?.join(", "))}\n` +
        `📉 <b>Rată actuală:</b> ${escapeHtml(formattedPayment)} RON\n` +
        `🎯 <b>Obiectiv financiar:</b> ${escapeHtml(lead.purpose)}\n` +
        `💳 <b>Sumă:</b> <b>${escapeHtml(formattedAmount)} RON</b>\n` +
        `🔒 <b>GDPR:</b> ✅ Acceptat\n` +
        `📢 <b>Marketing:</b> ${(lead.marketingConsent || lead.marketing) ? "✅ Acceptat" : "❌ Neacceptat"}\n\n` +
        `📍 <b>Sursă:</b> ${escapeHtml(lead.utmSource)} / ${escapeHtml(lead.utmMedium)} / ${escapeHtml(lead.utmCampaign)}\n` +
        `📱 <b>Device:</b> ${escapeHtml(lead.deviceType)}\n` +
        `🌐 <b>Referrer:</b> ${escapeHtml(referrer)}\n` +
        `🔗 <b>Pagină:</b> ${escapeHtml(lead.pageUrl || "—")}\n` +
        `⏰ <b>Ora:</b> ${escapeHtml(timestamp)}` +
        idFooter;
    }

    // 1. Permanent Storage Layer
    try {
      await saveLead(fullLeadData);
    } catch (dbError) {
      console.error("Database save error:", dbError);
    }

    // 2. Notifications Flow with Fallback
    try {
      const telegramSuccess = await sendTelegram(telegramText);
      
      if (!telegramSuccess) {
        await sendEmail(fullLeadData, telegramText);
      }
    } catch (notifyError) {
      console.error("Notification flow error:", notifyError);
      await sendEmail(fullLeadData, telegramText).catch(() => {});
    }

    // Always return safe success to user if we reach here
    return NextResponse.json({ ok: true, message: "Solicitarea a fost înregistrată cu succes." });
  } catch (error) {
    console.error("API /api/leads error:", error);
    return NextResponse.json(
      { ok: false, message: "A apărut o eroare la procesarea solicitării. Încearcă din nou." },
      { status: 500 }
    );
  }
}
