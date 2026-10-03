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
  getSecureClientIp,
} from "@/lib/ecosystem";

// Real Form Schema for Main Lead Qualification (credite.cristianvaduva.com)
// Source of truth: Formularul Real din UI (3 pași: Obiectiv/Sumă -> Venit/Vechime -> Nume/Telefon/Email/GDPR)
const standardLeadSchema = z.object({
  // Step 1: Purpose & Desired Amount
  purpose: z.string().trim().min(2, "Selectează un obiectiv financiar.").max(100),
  desiredAmount: z.coerce.number().positive("Suma dorită trebuie să fie mai mare ca 0.").max(5_000_000),

  // Step 2: Income & Employment
  income: z.coerce.number().positive("Venitul trebuie să fie mai mare ca 0.").max(1_000_000),
  employment: z.string().trim().min(1, "Selectează vechimea în muncă.").max(100),

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

  gdpr: z.literal(true, {
    errorMap: () => ({ message: "Acordul cu termenii și condițiile este obligatoriu." }),
  }),
  gdprConsent: z.boolean().optional().default(true),

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

// Real Form Schema for "Totul Înainte de Credit" Funnel
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

// Real Form Schema for "Business Finance" Funnel
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

// Method guards for non-POST HTTP methods
export async function GET() {
  return NextResponse.json({ ok: false, message: "Method Not Allowed" }, { status: 405, headers: { Allow: "POST" } });
}
export async function PUT() {
  return NextResponse.json({ ok: false, message: "Method Not Allowed" }, { status: 405, headers: { Allow: "POST" } });
}
export async function DELETE() {
  return NextResponse.json({ ok: false, message: "Method Not Allowed" }, { status: 405, headers: { Allow: "POST" } });
}
export async function PATCH() {
  return NextResponse.json({ ok: false, message: "Method Not Allowed" }, { status: 405, headers: { Allow: "POST" } });
}

// --- Storage & Notification Abstraction Layer ---

async function saveLead(leadData: any): Promise<boolean> {
  const { error } = await getSupabaseAdmin()
    .from("leads")
    .insert({
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email || null,

      birth_year: leadData.birthYear || null,
      purpose: leadData.purpose || null,
      desired_amount: leadData.desiredAmount ? String(leadData.desiredAmount) : null,

      income: leadData.income ? String(leadData.income) : null,
      employment: leadData.employment || null,

      credit_types: leadData.creditTypes
        ? Array.isArray(leadData.creditTypes)
          ? leadData.creditTypes
          : [String(leadData.creditTypes)]
        : null,
      credit_type: leadData.creditTypes
        ? Array.isArray(leadData.creditTypes)
          ? leadData.creditTypes.join(", ")
          : String(leadData.creditTypes)
        : null,

      monthly_payment: leadData.monthlyPayment ? String(leadData.monthlyPayment) : null,
      delays: leadData.delays || null,
      credit_bureau: leadData.creditBureau || null,

      message: leadData.message || null,

      gdpr: leadData.gdpr ?? true,
      marketing: leadData.marketing ?? false,

      utm_source: leadData.utmSource || null,
      utm_medium: leadData.utmMedium || null,
      utm_campaign: leadData.utmCampaign || null,
      utm_content: leadData.utmContent || null,

      page_url: leadData.pageUrl || null,
      device_type: leadData.deviceType || null,

      ip: leadData.ip || null,
      user_agent: leadData.userAgent || null,
      referrer: leadData.referrer || null,
    });

  if (error) {
    console.error("Supabase lead insert failed:", error);
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
    // 1. Payload size guard against memory exhaustion DoS
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 65536) {
      return NextResponse.json(
        { ok: false, message: "Payload-ul depășește limita permisă." },
        { status: 413 }
      );
    }

    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, message: "Datele transmise sunt invalide." },
        { status: 400 }
      );
    }

    const ip = getSecureClientIp(request);

    if (!allowRequest(ip)) {
      return NextResponse.json(
        { ok: false, message: "Prea multe solicitări efectuate de pe această adresă. Încearcă din nou în 15 minute." },
        { status: 429 }
      );
    }

    const isTotulCredit =
      body?.source === "totul-inainte-de-credit" ||
      body?.source === "homepage-totul-inainte-de-credit";
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

    const sanitizedName = cleanString(lead.name);
    const sanitizedEmail = lead.email ? cleanString(lead.email) : "";

    const timestamp = new Intl.DateTimeFormat("ro-RO", {
      dateStyle: "medium",
      timeStyle: "medium",
      timeZone: "Europe/Bucharest",
    }).format(new Date());

    const userAgent = cleanString(request.headers.get("user-agent") || "necunoscut");
    const referrer = cleanString(request.headers.get("referer") || "direct");
    const deviceInfo = parseDeviceFromUA(userAgent);
    const geoInfo = parseGeoFromHeaders(request);
    const ecosystemProp = detectEcosystemProperty(lead.pageUrl || lead.source, request);

    let telegramText = "";
    let fullLeadData: any = {};

    const shortVisitor = formatShortId(lead.visitorId);
    const shortSession = formatShortId(lead.sessionId);

    if (isBusiness) {
      const sanitizedMessage = cleanString(lead.clientMessage || "");
      const sanitizedCompany = cleanString(lead.companyName || "");
      const sanitizedIndustry = cleanString(lead.industry || "");
      const sanitizedLocation = cleanString(lead.location || "");

      const priority = calculateBusinessLeadPriority(lead);
      const priorityBadge = priority === "HOT" ? "🔥 HOT" : priority === "WARM" ? "🟡 WARM" : "🔵 INFORMATIONAL";
      const purposesText = (lead.selectedPurposes || []).map((p: string) => `• ${escapeHtml(p)}`).join("\n");
      const formattedMonthly = new Intl.NumberFormat("ro-RO").format(lead.monthlyInstallments || 0);

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

      telegramText =
        `${ecosystemProp.emoji} <b>${ecosystemProp.domain.toUpperCase()} — 🟢 LEAD NOU (BUSINESS FINANCE)</b>\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `👤 <b>CLIENT / ANTREPRENOR</b>\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `Nume: ${escapeHtml(sanitizedName)}\n` +
        `Telefon: <code>${escapeHtml(lead.phone)}</code>\n` +
        `Email: ${sanitizedEmail ? escapeHtml(sanitizedEmail) : "Nespecificat"}\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `🏢 <b>DATE COMPANIE</b>\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `Firma: ${sanitizedCompany && sanitizedCompany !== "Nespecificat" ? escapeHtml(sanitizedCompany) : "Nespecificat"}\n` +
        `Tip firmă: ${escapeHtml(lead.companyType)}\n` +
        `Vechime: ${escapeHtml(lead.companyAge)}\n` +
        `Domeniu: ${sanitizedIndustry && sanitizedIndustry !== "—" ? escapeHtml(sanitizedIndustry) : "Nespecificat"}\n` +
        `Localitate: ${sanitizedLocation && sanitizedLocation !== "—" ? escapeHtml(sanitizedLocation) : "Nespecificat"}\n` +
        `Angajați: ${escapeHtml(lead.employeeRange)}\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `💼 <b>PROFIL FINANCIAR & SOLICITARE</b>\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `Prioritate: ${priorityBadge}\n` +
        `Destinație finanțare:\n` +
        `${purposesText || "• Nespecificat"}\n\n` +
        `Sumă dorită: <b>${escapeHtml(lead.requestedAmountRange)} (${escapeHtml(lead.currency)})</b>\n` +
        `Cifră de afaceri: ${escapeHtml(lead.annualRevenue)}\n` +
        `Profit: ${escapeHtml(lead.approximateProfit)}\n` +
        `Credite active: ${escapeHtml(lead.existingCredits)} (Rate lunare: ${escapeHtml(formattedMonthly)} RON)\n` +
        `Biroul de credit: ${escapeHtml(lead.bureauStatus)}\n` +
        `Întârzieri: ${escapeHtml(lead.hasDelays)}\n` +
        `Refuzuri anterioare: ${escapeHtml(lead.previousRefusal)}\n` +
        `Urgență: ${escapeHtml(lead.urgency)}\n` +
        (sanitizedMessage ? `Mesaj client: ${escapeHtml(sanitizedMessage)}\n` : "") +
        `━━━━━━━━━━━━━━━━━━\n` +
        `🌐 <b>CONTEXT</b>\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `Landing page: ${escapeHtml(lead.pageUrl || "/business-finance")}\n` +
        `Source: ${escapeHtml(lead.utmSource || "direct")}\n` +
        `Medium: ${escapeHtml(lead.utmMedium || "—")}\n` +
        `Campaign: ${escapeHtml(lead.utmCampaign || "—")}\n` +
        `Referrer: ${escapeHtml(referrer)}\n` +
        `Device: ${escapeHtml(deviceInfo.deviceType || lead.deviceType || "Desktop")}\n` +
        `OS: ${escapeHtml(deviceInfo.os)}\n` +
        `Browser: ${escapeHtml(deviceInfo.browser)}\n` +
        `Location aproximativă: ${geoInfo.countryFlag} ${escapeHtml(geoInfo.city)}, ${escapeHtml(geoInfo.country)}\n` +
        `Visitor ID: <code>${shortVisitor}</code>\n` +
        `Session ID: <code>${shortSession}</code>\n` +
        `Time: ${escapeHtml(timestamp)}`;
    } else if (isTotulCredit) {
      const sanitizedMessage = cleanString(lead.clientMessage || "");
      const sanitizedDelay = cleanString(lead.delayPeriod || "");

      const formattedIncome = new Intl.NumberFormat("ro-RO").format(lead.income);
      const formattedInstallments = new Intl.NumberFormat("ro-RO").format(lead.monthlyInstallments);
      const formattedAmount = new Intl.NumberFormat("ro-RO").format(lead.requestedAmount);

      const priority = calculateLeadPriority(lead);
      const priorityBadge = priority === "HOT" ? "🔥 HOT" : priority === "WARM" ? "🟡 WARM" : "🔵 INFORMATIONAL";
      const motivText = (lead.problemTypes || []).map((p: string) => `• ${escapeHtml(p)}`).join("\n");

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

      telegramText =
        `${ecosystemProp.emoji} <b>${ecosystemProp.domain.toUpperCase()} — 🟢 LEAD NOU</b>\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `👤 <b>CLIENT</b>\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `Nume: ${escapeHtml(sanitizedName)}\n` +
        `Telefon: <code>${escapeHtml(lead.phone)}</code>\n` +
        `Email: ${sanitizedEmail ? escapeHtml(sanitizedEmail) : "Nespecificat"}\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `💳 <b>SOLICITARE (TOTUL ÎNAINTE DE CREDIT)</b>\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `Prioritate: ${priorityBadge}\n` +
        `Situație / Probleme:\n` +
        `${motivText || "• Nespecificat"}\n\n` +
        `Venit: ${escapeHtml(formattedIncome)} RON\n` +
        `Tip venit: ${escapeHtml(lead.incomeType)}\n` +
        `Vechime muncă: ${escapeHtml(lead.employmentDuration)}\n` +
        `Rate lunare actuale: ${escapeHtml(formattedInstallments)} RON\n` +
        `Credite active: ${escapeHtml(lead.activeCreditCount)}\n` +
        `Sumă dorită: ${escapeHtml(formattedAmount)} RON\n` +
        `Birou de Credit: ${escapeHtml(lead.creditBureauStatus)}\n` +
        (sanitizedDelay && sanitizedDelay !== "—" ? `Perioadă întârzieri: ${escapeHtml(sanitizedDelay)}\n` : "") +
        (sanitizedMessage ? `Mesaj client: ${escapeHtml(sanitizedMessage)}\n` : "") +
        `━━━━━━━━━━━━━━━━━━\n` +
        `🌐 <b>CONTEXT</b>\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `Landing page: ${escapeHtml(lead.pageUrl || "/totul-inainte-de-credit")}\n` +
        `Source: ${escapeHtml(lead.utmSource || "direct")}\n` +
        `Medium: ${escapeHtml(lead.utmMedium || "—")}\n` +
        `Campaign: ${escapeHtml(lead.utmCampaign || "—")}\n` +
        `Referrer: ${escapeHtml(referrer)}\n` +
        `Device: ${escapeHtml(deviceInfo.deviceType || lead.deviceType || "Desktop")}\n` +
        `OS: ${escapeHtml(deviceInfo.os)}\n` +
        `Browser: ${escapeHtml(deviceInfo.browser)}\n` +
        `Location aproximativă: ${geoInfo.countryFlag} ${escapeHtml(geoInfo.city)}, ${escapeHtml(geoInfo.country)}\n` +
        `Visitor ID: <code>${shortVisitor}</code>\n` +
        `Session ID: <code>${shortSession}</code>\n` +
        `Time: ${escapeHtml(timestamp)}`;
    } else {
      // Standard Lead from Homepage Credit Form (credite.cristianvaduva.com)
      // Strictly mirrors form fields: purpose, desiredAmount, income, employment, name, phone, email, gdpr
      const formattedAmount = new Intl.NumberFormat("ro-RO").format(lead.desiredAmount);
      const formattedIncome = new Intl.NumberFormat("ro-RO").format(lead.income);

      fullLeadData = {
        name: sanitizedName,
        phone: lead.phone,
        email: sanitizedEmail || null,
        purpose: lead.purpose,
        desiredAmount: lead.desiredAmount,
        income: lead.income,
        employment: lead.employment,
        gdpr: true,
        gdprConsent: true,
        utmSource: lead.utmSource,
        utmMedium: lead.utmMedium,
        utmCampaign: lead.utmCampaign,
        utmContent: lead.utmContent,
        referral: lead.referral,
        pageUrl: lead.pageUrl,
        deviceType: lead.deviceType,
        visitorId: lead.visitorId,
        sessionId: lead.sessionId,
        ip,
        userAgent,
        referrer,
        timestamp,
      };

      telegramText =
        `${ecosystemProp.emoji} <b>${ecosystemProp.domain.toUpperCase()} — 🟢 LEAD NOU</b>\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `👤 <b>CLIENT</b>\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `Nume: ${escapeHtml(sanitizedName)}\n` +
        `Telefon: <code>${escapeHtml(lead.phone)}</code>\n` +
        `Email: ${sanitizedEmail ? escapeHtml(sanitizedEmail) : "Nespecificat"}\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `💳 <b>SOLICITARE</b>\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `Tip credit: ${escapeHtml(lead.purpose)}\n` +
        `Sumă: ${escapeHtml(formattedAmount)} RON\n` +
        `Venit: ${escapeHtml(formattedIncome)} RON\n` +
        `Tip venit: ${escapeHtml(lead.employment)}\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `🌐 <b>CONTEXT</b>\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `Landing page: ${escapeHtml(lead.pageUrl || "/")}\n` +
        `Source: ${escapeHtml(lead.utmSource || "direct")}\n` +
        `Medium: ${escapeHtml(lead.utmMedium || "—")}\n` +
        `Campaign: ${escapeHtml(lead.utmCampaign || "—")}\n` +
        `Referrer: ${escapeHtml(referrer)}\n` +
        `Device: ${escapeHtml(deviceInfo.deviceType || lead.deviceType || "Desktop")}\n` +
        `OS: ${escapeHtml(deviceInfo.os)}\n` +
        `Browser: ${escapeHtml(deviceInfo.browser)}\n` +
        `Location aproximativă: ${geoInfo.countryFlag} ${escapeHtml(geoInfo.city)}, ${escapeHtml(geoInfo.country)}\n` +
        `Visitor ID: <code>${shortVisitor}</code>\n` +
        `Session ID: <code>${shortSession}</code>\n` +
        `Time: ${escapeHtml(timestamp)}`;
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
