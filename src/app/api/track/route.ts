import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  detectEcosystemProperty,
  formatTelegramTitle,
  escapeHtml,
  cleanString as clean,
  formatShortId,
  parseDeviceFromUA,
  parseGeoFromHeaders,
  getSecureClientIp,
} from "@/lib/ecosystem";

// In-memory rate limiting per client IP (serverless-local)
const ipRateLimit = new Map<string, { count: number; resetAt: number }>();
const TRACK_RATE_LIMIT = 60; // Max 60 tracking hits per minute per IP
const TRACK_WINDOW_MS = 60 * 1000;

function allowTrackRequest(ip: string): boolean {
  const now = Date.now();
  const entry = ipRateLimit.get(ip);
  if (!entry || entry.resetAt < now) {
    ipRateLimit.set(ip, { count: 1, resetAt: now + TRACK_WINDOW_MS });
    return true;
  }
  if (entry.count >= TRACK_RATE_LIMIT) return false;
  entry.count += 1;
  return true;
}

// In-memory Session Journey state cache
interface TimedAction {
  timeStr: string;
  name: string;
}

interface AttributionTouch {
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
  landingPage?: string;
  timestamp?: string;
}

interface SessionJourney {
  visitorId: string;
  sessionId: string;
  isReturning: boolean;
  visitCount: number;
  startTime: number;
  lastActive: number;
  landingPage: string;
  pagesVisited: string[];
  storiesViewed: string[];
  actions: string[];
  timedActions: TimedAction[];
  firstTouch?: AttributionTouch | null;
  lastTouch?: AttributionTouch | null;
  isNewVisitorNotified: boolean;
  isReturningVisitorNotified: boolean;
  isHighIntentNotified: boolean;
  hasCompletedCalculator: boolean;
  hasStartedForm: boolean;
  hasClickedPhone: boolean;
  hasClickedWhatsApp: boolean;
  hasClickedTelegram: boolean;
  hasConverted: boolean;
  actionCounts: Map<string, number>;
  lastActionNotification: Map<string, number>;
}

const sessionStore = new Map<string, SessionJourney>();

function getOrCreateSession(
  sessionId: string,
  visitorId: string,
  isReturning: boolean,
  visitCount: number,
  initialPage: string,
  firstTouch?: AttributionTouch | null,
  lastTouch?: AttributionTouch | null
): SessionJourney {
  const now = Date.now();
  let session = sessionStore.get(sessionId);
  if (!session) {
    session = {
      visitorId,
      sessionId,
      isReturning,
      visitCount,
      startTime: now,
      lastActive: now,
      landingPage: initialPage || "/",
      pagesVisited: [initialPage || "/"],
      storiesViewed: [],
      actions: [],
      timedActions: [],
      firstTouch: firstTouch || null,
      lastTouch: lastTouch || null,
      isNewVisitorNotified: false,
      isReturningVisitorNotified: false,
      isHighIntentNotified: false,
      hasCompletedCalculator: false,
      hasStartedForm: false,
      hasClickedPhone: false,
      hasClickedWhatsApp: false,
      hasClickedTelegram: false,
      hasConverted: false,
      actionCounts: new Map<string, number>(),
      lastActionNotification: new Map<string, number>(),
    };
    sessionStore.set(sessionId, session);
  } else {
    session.lastActive = now;
    if (initialPage && !session.pagesVisited.includes(initialPage)) {
      session.pagesVisited.push(initialPage);
    }
    if (firstTouch && !session.firstTouch) {
      session.firstTouch = firstTouch;
    }
    if (lastTouch) {
      session.lastTouch = lastTouch;
    }
  }

  // Periodic cleanup of sessions older than 2 hours
  if (sessionStore.size > 2000) {
    for (const [sId, s] of sessionStore.entries()) {
      if (now - s.lastActive > 2 * 60 * 60 * 1000) {
        sessionStore.delete(sId);
      }
    }
  }

  return session;
}

const IMPORTANT_PAGES = [
  "/calculator-rata-credit",
  "/totul-inainte-de-credit",
  "/broker-credite-bucuresti",
  "/referral",
  "/refinantare-credit",
  "/credit-istoric-negativ",
  "/credit-nevoi-personale",
  "/stergere-birou-credit",
];

function isImportantPage(page: string): boolean {
  return IMPORTANT_PAGES.includes(page) || page.startsWith("/povesti-reale/");
}

function deriveObservedInterest(session: SessionJourney, currentPage: string): { interest: string; specificArea: string } {
  const pages = session.pagesVisited;
  const p = currentPage || (pages.length > 0 ? pages[pages.length - 1] : "/");

  if (p.includes("/totul-inainte-de-credit") || session.hasStartedForm) {
    return { interest: "Credit", specificArea: "Verificare Eligibilitate & Diagnostic" };
  }
  if (p.includes("/refinantare-credit")) {
    return { interest: "Refinanțare", specificArea: "Optimizare & Reducere Rate" };
  }
  if (p.includes("/credit-istoric-negativ") || p.includes("/stergere-birou-credit")) {
    return { interest: "Istoric Negativ", specificArea: "Analiză Biroul de Credit" };
  }
  if (p.includes("/credit-nevoi-personale")) {
    return { interest: "Credit de Nevoi Personale", specificArea: "Finanțare Rapidă" };
  }
  if (p.includes("/calculator")) {
    return { interest: "Simulare Credit", specificArea: "Calculator Rate & Buget" };
  }
  if (p.includes("/referral")) {
    return { interest: "Parteneriat", specificArea: "Program Recomandări" };
  }
  if (p.includes("/povesti-reale/")) {
    return { interest: "Studii de Caz", specificArea: "Povești Reale de Finanțare" };
  }
  return { interest: "Consultanță Financiară", specificArea: "Homepage Browsing" };
}

function evaluateHighIntent(session: SessionJourney): { isHighIntent: boolean; signals: string[]; reason: string } {
  const signals: string[] = [];

  if (session.hasCompletedCalculator) {
    signals.push("Calculator finalizat cu simulare");
  }

  const commercialPages = session.pagesVisited.filter((p) =>
    p.includes("/calculator") ||
    p.includes("/totul-inainte-de-credit") ||
    p.includes("/broker-credite") ||
    p.includes("/referral") ||
    p.includes("/povesti-reale") ||
    p.includes("/credite-ipotecare") ||
    p.includes("/refinantare") ||
    p.includes("/stergere-birou") ||
    p.includes("/credit-")
  );
  if (commercialPages.length >= 2) {
    signals.push(`${commercialPages.length} pagini comerciale vizitate`);
  }

  if (session.hasClickedPhone) {
    signals.push("Click pe numărul de telefon");
  }

  if (session.hasClickedWhatsApp) {
    signals.push("Click pe butonul WhatsApp");
  }

  if (session.hasStartedForm) {
    signals.push("Formular de calificare inițiat");
  }

  if (session.isReturning && session.visitCount >= 2) {
    signals.push(`Vizitator recurent (Vizita #${session.visitCount})`);
  }

  const isHighIntent = signals.length >= 2 || (session.hasStartedForm && (session.hasClickedPhone || session.hasClickedWhatsApp));
  const reason = signals.slice(0, 3).join(" + ");
  return { isHighIntent, signals, reason };
}

const touchSchema = z
  .object({
    source: z.string().trim().max(100).optional().default("direct"),
    medium: z.string().trim().max(100).optional().default("—"),
    campaign: z.string().trim().max(100).optional().default("—"),
    term: z.string().trim().max(100).optional(),
    content: z.string().trim().max(100).optional(),
    landingPage: z.string().trim().max(2048).optional(),
    timestamp: z.string().trim().max(100).optional(),
  })
  .optional()
  .nullable();

const trackSchema = z.object({
  event: z.string().trim().min(1).max(64),
  visitorId: z.string().trim().max(64).optional().default("VF-ANON"),
  sessionId: z.string().trim().max(64).optional().default("S-ANON"),
  isReturning: z.boolean().optional().default(false),
  visitCount: z.coerce.number().int().min(1).max(10000).optional().default(1),
  sessionDuration: z.coerce.number().int().min(0).max(86400).optional().default(0),
  page: z.string().trim().max(2048).optional().default("/"),
  section: z.string().trim().max(200).optional(),
  ctaLabel: z.string().trim().max(200).optional(),
  source: z.string().trim().max(200).optional(),
  destination_phone: z.string().trim().max(50).optional(),
  intent: z.string().trim().max(50).optional().default("LOW"),
  deviceType: z.string().trim().max(50).optional().default("Mobile"),
  screenCategory: z.string().trim().max(50).optional().default("Medium screen"),
  screenResolution: z.string().trim().max(50).optional().default("—"),
  viewport: z.string().trim().max(50).optional().default("—"),
  utmSource: z.string().trim().max(100).optional().default("direct"),
  utmMedium: z.string().trim().max(100).optional().default("—"),
  utmCampaign: z.string().trim().max(100).optional().default("—"),
  utmContent: z.string().trim().max(100).optional().default("—"),
  utmTerm: z.string().trim().max(100).optional().default("—"),
  referrer: z.string().trim().max(2048).optional().default("direct"),
  language: z.string().trim().max(50).optional().default("ro-RO"),
  timezone: z.string().trim().max(100).optional().default("Europe/Bucharest"),
  timestamp: z.string().trim().max(50).optional(),
  firstTouch: touchSchema,
  lastTouch: touchSchema,
  scrollDepth: z.string().trim().max(50).optional(),
  duration: z.string().trim().max(50).optional(),
  metadata: z.record(z.any()).optional().default({}),
  amount: z.coerce.number().optional(),
  payment: z.coerce.number().optional(),
  termYears: z.coerce.number().optional(),
});

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

function maskIp(ip: string): string {
  if (ip.includes(".")) {
    const parts = ip.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.xxx.xxx`;
    }
  }
  return "xxx.xxx.xxx.xxx";
}

function normalizeSource(utmSource: string, referrer: string): { label: string; host: string } {
  const ref = (referrer || "").toLowerCase();
  const utm = (utmSource || "").toLowerCase();

  let host = "direct";
  try {
    if (referrer && referrer !== "direct" && referrer.startsWith("http")) {
      const url = new URL(referrer);
      host = url.hostname.replace(/^www\./, "");
    } else if (referrer && referrer !== "direct") {
      host = referrer;
    }
  } catch {
    host = referrer || "direct";
  }

  if (utm.includes("google") || host.includes("google") || ref.includes("google")) {
    return { label: "Google · organic", host: "google.com" };
  }
  if (utm.includes("facebook") || utm.includes("fb") || host.includes("facebook") || host.includes("fb.")) {
    return { label: "Facebook", host: "facebook.com" };
  }
  if (utm.includes("instagram") || host.includes("instagram") || ref.includes("instagram")) {
    return { label: "Instagram", host: "instagram.com" };
  }
  if (utm.includes("tiktok") || host.includes("tiktok") || ref.includes("tiktok")) {
    return { label: "TikTok", host: "tiktok.com" };
  }
  if (utm.includes("telegram") || host.includes("t.me") || ref.includes("t.me")) {
    return { label: "Telegram", host: "t.me" };
  }
  if (utm.includes("referral") || host.includes("remax") || host.includes("cristianvaduva")) {
    return { label: "Referral Ecosystem", host };
  }
  if (utm && utm !== "direct" && utm !== "—") {
    return { label: utm, host };
  }
  return { label: host === "direct" ? "Direct" : host, host };
}

function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "00m 05s";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const mm = m < 10 ? `0${m}` : `${m}`;
  const ss = s < 10 ? `0${s}` : `${s}`;
  return `${mm}m ${ss}s`;
}

// Coarse Privacy-Preserving Ranges
function getCoarseAmountRange(amount?: number): string {
  if (!amount || amount <= 0) return "50.000 – 100.000 lei";
  if (amount < 50000) return "< 50.000 lei";
  if (amount <= 100000) return "50.000 – 100.000 lei";
  if (amount <= 200000) return "100.000 – 200.000 lei";
  if (amount <= 350000) return "200.000 – 350.000 lei";
  if (amount <= 500000) return "350.000 – 500.000 lei";
  if (amount <= 1000000) return "500.000 – 1.000.000 lei";
  return "> 1.000.000 lei";
}

function getCoarsePaymentRange(payment?: number): string {
  if (!payment || payment <= 0) return "1.000 – 2.000 lei / lună";
  if (payment < 1000) return "< 1.000 lei / lună";
  if (payment <= 2000) return "1.000 – 2.000 lei / lună";
  if (payment <= 3500) return "2.000 – 3.500 lei / lună";
  if (payment <= 5000) return "3.500 – 5.000 lei / lună";
  if (payment <= 10000) return "5.000 – 10.000 lei / lună";
  return "> 10.000 lei / lună";
}

async function sendTelegramActivity(text: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return false;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function saveToSupabase(sessionRecord: any, eventRecord: any): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();
    await supabase.from("sessions").upsert(sessionRecord, { onConflict: "id" });
    await supabase.from("events").insert(eventRecord);
  } catch {
    // Non-blocking fallback
  }
}

export async function POST(request: Request) {
  try {
    // 1. Payload size guard
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 65536) {
      return NextResponse.json({ ok: false, error: "Payload too large" }, { status: 413 });
    }

    const clientIp = getSecureClientIp(request);
    const maskedClientIp = maskIp(clientIp);

    if (!allowTrackRequest(clientIp)) {
      return NextResponse.json({ ok: false, error: "Rate limit exceeded" }, { status: 429 });
    }

    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }

    const parsed = trackSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid schema" }, { status: 400 });
    }

    const data = parsed.data;

    // Detect originating ecosystem property (CREDITE, INSURANCE, HOMEFIND, AIXMEDIA, CONSTRUCTIONS, FLY)
    const ecosystemProp = detectEcosystemProperty(clean(data.page) || clean(data.source), request);

    // Context & Technical Details
    const rawVisitorId = data.visitorId || "VF-ANON";
    const rawSessionId = data.sessionId || "S-ANON";
    const shortVisitorId = formatShortId(rawVisitorId);
    const shortSessionId = formatShortId(rawSessionId);

    const ua = request.headers.get("user-agent") || "";
    const parsedUA = parseDeviceFromUA(ua);
    const safeDeviceType = escapeHtml(parsedUA.deviceType || data.deviceType || "Desktop");
    const safeOS = escapeHtml(parsedUA.os || "Other OS");
    const safeBrowser = escapeHtml(parsedUA.browser || "Other Browser");
    const safeDeviceSummary = parsedUA.deviceSummary;

    const geo = parseGeoFromHeaders(request);
    const safeCity = escapeHtml(geo.city || "București");
    const safeCountry = escapeHtml(geo.country || "România");
    const safePage = escapeHtml(clean(data.page));
    const safeCtaLabel = escapeHtml(clean(data.ctaLabel));
    const safeLanguage = escapeHtml(clean(data.language));
    const safeTimezone = escapeHtml(clean(data.timezone));
    const safeScreen = escapeHtml(clean(data.screenResolution));
    const safeViewport = escapeHtml(clean(data.viewport));

    const sourceInfo = normalizeSource(data.utmSource, data.referrer);
    const safeSource = escapeHtml(sourceInfo.label);
    const safeReferrerHost = escapeHtml(sourceInfo.host);
    const safeMedium = escapeHtml(clean(data.utmMedium));
    const safeCampaign = escapeHtml(clean(data.utmCampaign));

    // Multi-touch attribution extraction
    const firstTouchSource = data.firstTouch?.source ? `${escapeHtml(clean(data.firstTouch.source))} / ${escapeHtml(clean(data.firstTouch.medium || "—"))}` : "—";
    const lastTouchSource = data.lastTouch?.source ? `${escapeHtml(clean(data.lastTouch.source))} / ${escapeHtml(clean(data.lastTouch.medium || "—"))}` : "—";

    const nowDateTime = new Date();
    const fullDateFormatted = new Intl.DateTimeFormat("ro-RO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Europe/Bucharest",
    }).format(nowDateTime);

    const timeOnly = new Intl.DateTimeFormat("ro-RO", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Europe/Bucharest",
    }).format(nowDateTime);

    // Journey Tracking
    const session = getOrCreateSession(
      rawSessionId,
      rawVisitorId,
      data.isReturning,
      data.visitCount,
      clean(data.page) || "/",
      data.firstTouch,
      data.lastTouch
    );

    const currentDurationSec = Math.max(data.sessionDuration, Math.floor((Date.now() - session.startTime) / 1000));
    const durationFormatted = formatDuration(currentDurationSec);
    const pageCount = session.pagesVisited.length;

    const event = clean(data.event);
    const now = Date.now();
    let telegramText = "";
    let shouldNotifyTelegram = false;

    // Cooldown helper (prevent spamming same action within 20s, aggregate count)
    const canNotifyAction = (actionKey: string, cooldownMs = 20000) => {
      const last = session.lastActionNotification.get(actionKey) || 0;
      const count = (session.actionCounts.get(actionKey) || 0) + 1;
      session.actionCounts.set(actionKey, count);
      if (now - last < cooldownMs) {
        return false;
      }
      session.lastActionNotification.set(actionKey, now);
      return true;
    };

    // Credit intent classification based on actual user actions
    const observedInterest = deriveObservedInterest(session, clean(data.page));

    // --- EVENT CLASSIFICATION & TELEGRAM HIERARCHY ---

    // 1. Session Started / New Visitor / Returning Visitor
    if (event === "visitor_session_started" || event === "session_started" || (event === "page_view" && pageCount === 1 && session.actions.length === 0)) {
      if (data.isReturning && !session.isReturningVisitorNotified) {
        session.isReturningVisitorNotified = true;
        session.actions.push("Returning visit");
        session.timedActions.push({ timeStr: timeOnly, name: "Page view" });
        shouldNotifyTelegram = true;
        const recentJourney = session.pagesVisited.map((p, i) => `${i + 1}. ${escapeHtml(p)}`).join("\n");
        telegramText =
          `${formatTelegramTitle(ecosystemProp.key, "🔵 RETURNING VISITOR")}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `👤 <b>VIZITATOR</b>\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `Visitor ID: <code>${shortVisitorId}</code>\n` +
          `Session: <code>${shortSessionId}</code>\n` +
          `Status: 🔁 Vizitator recurent\n` +
          `Vizită: #${data.visitCount}\n` +
          `Ora: ${fullDateFormatted}\n` +
          `Durată sesiune: ${durationFormatted}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `📍 <b>ORIGINE / ACQUISITION</b>\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `Sursă: ${safeSource}\n` +
          `Medium: ${safeMedium}\n` +
          `Campaign: ${safeCampaign}\n` +
          `Referrer: ${safeReferrerHost}\n` +
          `Landing: ${escapeHtml(session.landingPage)}\n` +
          `First Touch: ${firstTouchSource}\n` +
          `Last Touch: ${lastTouchSource}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `🌍 <b>LOCAȚIE ESTIMATĂ</b>\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `Țară: ${geo.countryFlag} ${safeCountry}\n` +
          `Regiune: ${safeCity}\n` +
          `Oraș: ${safeCity}\n` +
          `Timezone: ${safeTimezone}\n` +
          `⚠️ Locație estimată — NU GPS\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `📱 <b>DEVICE</b>\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `Categorie: ${safeDeviceType}\n` +
          `OS: ${safeOS}\n` +
          `Browser: ${safeBrowser}\n` +
          `Screen: ${safeScreen}\n` +
          `Viewport: ${safeViewport}\n` +
          `Limbă: ${safeLanguage}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `🧭 <b>PARCURS SESIUNE</b>\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `${recentJourney}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `💳 <b>INTENT:</b> ${escapeHtml(observedInterest.interest)} (${escapeHtml(observedInterest.specificArea)})`;
      } else if (!data.isReturning && !session.isNewVisitorNotified) {
        session.isNewVisitorNotified = true;
        session.actions.push("Page viewed");
        session.timedActions.push({ timeStr: timeOnly, name: "Page view" });
        shouldNotifyTelegram = true;
        telegramText =
          `${formatTelegramTitle(ecosystemProp.key, "🟢 VISITOR NOU")}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `👤 <b>VIZITATOR</b>\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `Visitor ID: <code>${shortVisitorId}</code>\n` +
          `Session: <code>${shortSessionId}</code>\n` +
          `Status: 🆕 Prima vizită\n` +
          `Vizită: #1\n` +
          `Ora: ${fullDateFormatted}\n` +
          `Durată sesiune: ${durationFormatted}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `📍 <b>ORIGINE / ACQUISITION</b>\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `Sursă: ${safeSource}\n` +
          `Medium: ${safeMedium}\n` +
          `Campaign: ${safeCampaign}\n` +
          `Referrer: ${safeReferrerHost}\n` +
          `Landing: ${safePage}\n` +
          `First Touch: ${firstTouchSource}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `🌍 <b>LOCAȚIE ESTIMATĂ</b>\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `Țară: ${geo.countryFlag} ${safeCountry}\n` +
          `Regiune: ${safeCity}\n` +
          `Oraș: ${safeCity}\n` +
          `Timezone: ${safeTimezone}\n` +
          `⚠️ Locație estimată — NU GPS\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `📱 <b>DEVICE</b>\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `Categorie: ${safeDeviceType}\n` +
          `OS: ${safeOS}\n` +
          `Browser: ${safeBrowser}\n` +
          `Screen: ${safeScreen}\n` +
          `Viewport: ${safeViewport}\n` +
          `Limbă: ${safeLanguage}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `💳 <b>INTENT:</b> ${escapeHtml(observedInterest.interest)} (${escapeHtml(observedInterest.specificArea)})`;
      }
    }

    // 2. High-Value Page View Notification
    else if (event === "page_view" && isImportantPage(clean(data.page))) {
      session.timedActions.push({ timeStr: timeOnly, name: `Page (${clean(data.page)})` });
      if (canNotifyAction(`page_${clean(data.page)}`, 30000)) {
        shouldNotifyTelegram = true;
        telegramText =
          `${formatTelegramTitle(ecosystemProp.key, "📄 PAGINĂ IMPORTANTĂ")}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `📄 <b>Pagină:</b> ${safePage}\n` +
          `🕐 <b>Ora:</b> ${timeOnly}\n` +
          `🆔 <b>Visitor ID:</b> <code>${shortVisitorId}</code>\n` +
          `🧭 <b>Session:</b> <code>${shortSessionId}</code>\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `📍 <b>Origine:</b> ${safeSource} (${safeMedium})\n` +
          `🌍 <b>Locație:</b> ${geo.countryFlag} ${safeCity}, ${safeCountry} (estimată)\n` +
          `📱 <b>Device:</b> ${safeDeviceSummary}\n` +
          `⏱ <b>Durată sesiune:</b> ${durationFormatted} (${pageCount} pagini)\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `💳 <b>INTENT:</b> ${escapeHtml(observedInterest.interest)} (${escapeHtml(observedInterest.specificArea)})`;
      }
    }

    // 3. Phone CTA Clicked
    else if (event === "phone_click" || event === "cta_phone_clicked") {
      session.hasClickedPhone = true;
      session.actions.push("Phone CTA clicked");
      session.timedActions.push({ timeStr: timeOnly, name: "Phone CTA" });
      if (canNotifyAction("phone")) {
        shouldNotifyTelegram = true;
        const totalClicks = session.actionCounts.get("phone") || 1;
        const ctaTitle = totalClicks > 1 ? `📞 PHONE CTA CLICKED · ${totalClicks}×` : `📞 PHONE CTA CLICKED`;
        telegramText =
          `${formatTelegramTitle(ecosystemProp.key, "📞 CLICK TELEFON")}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `📞 <b>PHONE CTA</b>\n` +
          `CTA: VERIFICĂ SITUAȚIA (Telefon)\n` +
          `Pagină: ${safePage}\n` +
          `Ora: ${timeOnly}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `👤 <b>VIZITATOR</b>\n` +
          `Visitor ID: <code>${shortVisitorId}</code>\n` +
          `Session: <code>${shortSessionId}</code>\n` +
          `Vizită: #${data.visitCount}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `🌍 <b>Context:</b> ${geo.countryFlag} ${safeCity}, ${safeCountry} (estimată)\n` +
          `📱 <b>Device:</b> ${safeDeviceSummary}\n` +
          `🔗 <b>Sursă:</b> ${safeSource}\n` +
          `⏱ <b>Durată până la apel:</b> ${durationFormatted} (${pageCount} pagini)\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `🎯 <b>ACTION:</b> ${ctaTitle}`;
      }
    }

    // 4. WhatsApp CTA Clicked
    else if (event === "whatsapp_click" || event === "cta_whatsapp_clicked" || event === "business_finance_whatsapp" || event === "totul_credit_whatsapp") {
      session.hasClickedWhatsApp = true;
      session.actions.push("WhatsApp CTA clicked");
      session.timedActions.push({ timeStr: timeOnly, name: "WhatsApp CTA" });
      if (canNotifyAction("whatsapp")) {
        shouldNotifyTelegram = true;
        const totalClicks = session.actionCounts.get("whatsapp") || 1;
        const ctaTitle = totalClicks > 1 ? `💬 WHATSAPP CTA CLICKED · ${totalClicks}×` : `💬 WHATSAPP CTA CLICKED`;
        telegramText =
          `${formatTelegramTitle(ecosystemProp.key, "🟢 CLICK WHATSAPP")}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `🟢 <b>WHATSAPP CTA</b>\n` +
          `CTA: Contact WhatsApp Direct\n` +
          `Pagină: ${safePage}\n` +
          `Ora: ${timeOnly}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `👤 <b>VIZITATOR</b>\n` +
          `Visitor ID: <code>${shortVisitorId}</code>\n` +
          `Session: <code>${shortSessionId}</code>\n` +
          `Vizită: #${data.visitCount}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `🌍 <b>Context:</b> ${geo.countryFlag} ${safeCity}, ${safeCountry} (estimată)\n` +
          `📱 <b>Device:</b> ${safeDeviceSummary}\n` +
          `🔗 <b>Sursă:</b> ${safeSource}\n` +
          `⏱ <b>Durată:</b> ${durationFormatted} (${pageCount} pagini)\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `🎯 <b>ACTION:</b> ${ctaTitle}`;
      }
    }

    // 5. Telegram CTA Clicked
    else if (event === "telegram_click" || event === "cta_telegram_clicked") {
      session.hasClickedTelegram = true;
      session.actions.push("Telegram CTA clicked");
      session.timedActions.push({ timeStr: timeOnly, name: "Telegram CTA" });
      if (canNotifyAction("telegram_click")) {
        shouldNotifyTelegram = true;
        telegramText =
          `${formatTelegramTitle(ecosystemProp.key, "✈️ CLICK TELEGRAM")}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `✈️ <b>TELEGRAM CTA</b>\n` +
          `CTA: Contact Telegram Direct\n` +
          `Pagină: ${safePage}\n` +
          `Ora: ${timeOnly}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `👤 <b>VIZITATOR</b>\n` +
          `Visitor ID: <code>${shortVisitorId}</code>\n` +
          `Session: <code>${shortSessionId}</code>\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `🌍 <b>Locație:</b> ${geo.countryFlag} ${safeCity}, ${safeCountry} (estimată)\n` +
          `📱 <b>Device:</b> ${safeDeviceSummary}\n` +
          `⏱ <b>Session:</b> ${pageCount} pagini · ${durationFormatted}`;
      }
    }

    // 6. Calculator Activity
    else if (event === "calculator_complete" || event === "calculator_completed" || event === "calculator_used") {
      session.hasCompletedCalculator = true;
      session.actions.push("Calculator completed");
      session.timedActions.push({ timeStr: timeOnly, name: "Calculator completed" });
      if (canNotifyAction("calculator", 15000)) {
        shouldNotifyTelegram = true;
        const coarseAmount = getCoarseAmountRange(data.amount);
        const coarsePayment = getCoarsePaymentRange(data.payment);
        telegramText =
          `${formatTelegramTitle(ecosystemProp.key, "🧮 CALCULATOR FINALIZAT")}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `🕐 <b>Ora:</b> ${timeOnly}\n` +
          `🆔 <b>Visitor ID:</b> <code>${shortVisitorId}</code>\n` +
          `🧭 <b>Session:</b> <code>${shortSessionId}</code>\n` +
          `📄 <b>Pagină:</b> ${safePage}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `💰 <b>SIMULARE</b>\n` +
          `Interval sumă: <b>${coarseAmount}</b>\n` +
          `Rată lunară estimată: <b>${coarsePayment}</b>\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `🌍 <b>Locație:</b> ${geo.countryFlag} ${safeCity}, ${safeCountry} (estimată)\n` +
          `💻 <b>Device:</b> ${safeDeviceSummary}\n` +
          `🔗 <b>Sursă:</b> ${safeSource}\n` +
          `⏱ <b>Durată sesiune:</b> ${durationFormatted}`;
      }
    }

    // 7. Real Story Viewed
    else if (event === "story_view" || safePage.includes("/povesti-reale/")) {
      const storyTitle = (data.metadata?.title as string) || (safePage.includes("david") ? "David — 21 credite IFN" : safePage.includes("georgeta") ? "Georgeta — Refinanțare rate mari" : safePage.includes("istoric-negativ") ? "Istoric negativ Biroul de Credit" : "Studiu de caz Smart Credit");
      if (!session.storiesViewed.includes(storyTitle)) {
        session.storiesViewed.push(storyTitle);
      }
      session.actions.push(`Story: ${storyTitle}`);
      session.timedActions.push({ timeStr: timeOnly, name: "Story viewed" });
      if (canNotifyAction(`story_${safePage}`, 30000)) {
        shouldNotifyTelegram = true;
        const storiesCount = session.storiesViewed.length;
        const storiesBadge = storiesCount > 1 ? ` (${storiesCount} povești citite în sesiune)` : "";
        telegramText =
          `${formatTelegramTitle(ecosystemProp.key, "📖 POVESTE VIZUALIZATĂ")}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `📖 <b>Story:</b> ${escapeHtml(storyTitle)}${storiesBadge}\n` +
          `📄 <b>URL:</b> ${safePage}\n` +
          `🕐 <b>Ora:</b> ${timeOnly}\n` +
          `🆔 <b>Visitor ID:</b> <code>${shortVisitorId}</code>\n` +
          `🧭 <b>Session:</b> <code>${shortSessionId}</code>\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `🌍 <b>Locație:</b> ${geo.countryFlag} ${safeCity}, ${safeCountry} (estimată)\n` +
          `📱 <b>Device:</b> ${safeDeviceSummary}\n` +
          `🔗 <b>Sursă:</b> ${safeSource}\n` +
          `📊 <b>Sesiune:</b> ${durationFormatted} · ${pageCount} pagini`;
      }
    }

    // 8. Form Started
    else if (
      event === "form_start" ||
      event === "form_started" ||
      event === "lead_form_started" ||
      event === "business_finance_started" ||
      event === "totul_credit_started"
    ) {
      session.hasStartedForm = true;
      session.actions.push("Form started");
      session.timedActions.push({ timeStr: timeOnly, name: "Form started" });
      if (canNotifyAction("form_start", 20000)) {
        shouldNotifyTelegram = true;
        const formName = clean(data.page).includes("totul")
          ? "Totul Înainte de Credit"
          : clean(data.page).includes("business")
          ? "Business Finance"
          : "Verificare Eligibilitate Credit";
        telegramText =
          `${formatTelegramTitle(ecosystemProp.key, "📝 FORMULAR ÎNCEPUT")}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `📝 <b>FORM STARTED</b>\n` +
          `Form: ${escapeHtml(formName)}\n` +
          `Pagină: ${safePage}\n` +
          `Ora: ${timeOnly}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `👤 <b>VIZITATOR</b>\n` +
          `Visitor ID: <code>${shortVisitorId}</code>\n` +
          `Session: <code>${shortSessionId}</code>\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `🌍 <b>Locație:</b> ${geo.countryFlag} ${safeCity}, ${safeCountry} (estimată)\n` +
          `📱 <b>Device:</b> ${safeDeviceSummary}\n` +
          `🔗 <b>Sursă:</b> ${safeSource}\n` +
          `⏱ <b>Elapsed:</b> ${durationFormatted} (${pageCount} pagini)`;
      }
    }

    // 9. Referral Program Interaction
    else if (event === "referral_page_viewed" || event === "referral_hero_cta_clicked" || event === "referral_link_clicked") {
      session.actions.push("Referral hub accessed");
      session.timedActions.push({ timeStr: timeOnly, name: "Referral page" });
      if (canNotifyAction("referral", 25000)) {
        shouldNotifyTelegram = true;
        telegramText =
          `${formatTelegramTitle(ecosystemProp.key, "🤝 PROGRAM RECOMANDĂRI")}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `🕐 <b>Ora:</b> ${timeOnly}\n` +
          `Vizitatorul a accesat ecosistemul de parteneriat / recomandări\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `🆔 <b>Visitor ID:</b> <code>${shortVisitorId}</code>\n` +
          `🧭 <b>Session:</b> <code>${shortSessionId}</code>\n` +
          `📍 <b>Pagină:</b> ${safePage}\n` +
          `💻 <b>Device:</b> ${safeDeviceSummary}\n` +
          `⏱ <b>Sesiune:</b> ${durationFormatted}`;
      }
    }

    // 10. Key CTA Clicks
    else if (
      event === "cta_click" ||
      event === "cta_analysis_clicked" ||
      event === "hero_primary_cta_click" ||
      event === "hero_secondary_cta_click" ||
      event === "command_row_click"
    ) {
      const actionName = safeCtaLabel || clean(data.source) || "VERIFICĂ SITUAȚIA";
      session.actions.push(`CTA: ${actionName}`);
      session.timedActions.push({ timeStr: timeOnly, name: `CTA (${actionName})` });
      if (canNotifyAction(`cta_${actionName}`, 20000)) {
        shouldNotifyTelegram = true;
        telegramText =
          `${formatTelegramTitle(ecosystemProp.key, "🔥 ACTIVITATE IMPORTANTĂ")}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `🔘 <b>CTA CLICK</b>\n` +
          `CTA: "${escapeHtml(actionName)}"\n` +
          `Pagină: ${safePage}\n` +
          `Ora: ${timeOnly}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `👤 <b>VIZITATOR</b>\n` +
          `Visitor ID: <code>${shortVisitorId}</code>\n` +
          `Session: <code>${shortSessionId}</code>\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `📍 <b>Locație:</b> ${geo.countryFlag} ${safeCity}, ${safeCountry} (estimată)\n` +
          `💻 <b>Device:</b> ${safeDeviceSummary}\n` +
          `🔎 <b>Sursă:</b> ${safeSource}\n` +
          `📊 <b>Sesiune:</b> ${durationFormatted} · ${pageCount} pagini`;
      }
    }

    // 11. Lead / Referral Conversion Journey Summary
    else if (
      event === "lead_success" ||
      event === "form_submitted" ||
      event === "business_finance_submitted" ||
      event === "totul_credit_submitted" ||
      event === "referral_form_submit"
    ) {
      session.hasConverted = true;
      session.actions.push("Lead submitted");
      session.timedActions.push({ timeStr: timeOnly, name: "Lead submitted" });
      shouldNotifyTelegram = true;
      const formattedJourney = session.timedActions.length > 0
        ? session.timedActions.map((ta) => `${ta.timeStr}\n→ ${escapeHtml(ta.name)}`).join("\n\n")
        : `${timeOnly}\n→ Lead submitted`;

      const formName = clean(data.page).includes("totul")
        ? "Totul Înainte de Credit"
        : clean(data.page).includes("business")
        ? "Business Finance"
        : clean(data.page).includes("referral")
        ? "Formular Recomandare"
        : "Credit Verification";

      telegramText =
        `${formatTelegramTitle(ecosystemProp.key, "🔥 CONVERSIE LEAD")}\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `🔥 <b>CONVERSION</b>\n` +
        `Lead: CREATED\n` +
        `Form: ${escapeHtml(formName)}\n` +
        `Visitor: <code>${shortVisitorId}</code>\n` +
        `Session: <code>${shortSessionId}</code>\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `📍 <b>ACQUISITION</b>\n` +
        `Source: ${safeSource} / ${safeMedium}\n` +
        `Landing: ${escapeHtml(session.landingPage)}\n` +
        `First Touch: ${firstTouchSource}\n` +
        `Last Touch: ${lastTouchSource}\n` +
        `Conversion time: ${timeOnly}\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `📱 <b>DEVICE & LOCATION</b>\n` +
        `Device: ${safeDeviceSummary}\n` +
        `Location: ${geo.countryFlag} ${safeCity}, ${safeCountry} (estimată)\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `🧭 <b>USER JOURNEY</b>\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `${formattedJourney}`;
    }

    // 12. Session End Notification (only for engaged sessions)
    else if (event === "session_end" || event === "visitor_session_ended") {
      if (currentDurationSec > 30 || pageCount >= 2 || session.actions.length > 0) {
        shouldNotifyTelegram = true;
        const outcome = session.hasConverted ? "Lead / Recomandare trimisă" : "Nicio conversie";
        const importantActions = session.actions.length > 0
          ? session.actions.slice(-5).map((a) => `• ${escapeHtml(a)}`).join("\n")
          : "• Navigare generală";
        telegramText =
          `${formatTelegramTitle(ecosystemProp.key, "📊 SESSION SUMMARY")}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `👤 <b>VIZITATOR</b>\n` +
          `Visitor ID: <code>${shortVisitorId}</code>\n` +
          `Session: <code>${shortSessionId}</code>\n` +
          `Status: ${session.isReturning ? "Returning" : "New"}\n` +
          `Duration: ${durationFormatted}\n` +
          `Pages: ${pageCount}\n` +
          `Interactions: ${session.actions.length}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `📍 <b>ACQUISITION</b>\n` +
          `Source: ${safeSource} / ${safeMedium}\n` +
          `Landing: ${escapeHtml(session.landingPage)}\n` +
          `Last Page: ${safePage}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `📱 <b>DEVICE & LOCATION</b>\n` +
          `Device: ${safeDeviceSummary}\n` +
          `Location: ${geo.countryFlag} ${safeCity}, ${safeCountry} (estimată)\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `⚡ <b>IMPORTANT ACTIONS</b>\n` +
          `${importantActions}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `🟢 <b>Outcome:</b> ${outcome}`;
      }
    }

    // High Intent Automatic Alert Trigger (if multiple commercial signals detected)
    if (!session.isHighIntentNotified && !session.hasConverted) {
      const intentEval = evaluateHighIntent(session);
      if (intentEval.isHighIntent) {
        session.isHighIntentNotified = true;
        const highIntentMsg =
          `${formatTelegramTitle(ecosystemProp.key, "🔥 HIGH INTENT VISITOR")}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `🔥 <b>HIGH INTENT</b>\n` +
          `Reason: ${escapeHtml(intentEval.reason)}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `👤 <b>VIZITATOR</b>\n` +
          `Visitor ID: <code>${shortVisitorId}</code>\n` +
          `Session: <code>${shortSessionId}</code>\n` +
          `Ora: ${timeOnly}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `🌍 <b>Location:</b> ${geo.countryFlag} ${safeCity}, ${safeCountry} (estimată)\n` +
          `📱 <b>Device:</b> ${safeDeviceSummary}\n` +
          `🔗 <b>Source:</b> ${safeSource} / ${safeMedium}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `📊 <b>JOURNEY:</b> ${pageCount} pagini · ${durationFormatted}\n` +
          `🎯 <b>SIGNALS:</b>\n${intentEval.signals.map((s) => `• ${escapeHtml(s)}`).join("\n")}`;
        sendTelegramActivity(highIntentMsg).catch(() => {});
      }
    }

    // Send Telegram Notification if qualified
    if (shouldNotifyTelegram && telegramText) {
      sendTelegramActivity(telegramText).catch(() => {});
    }

    // Structured Supabase Storage
    const eventId = `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const sessionRecord = {
      id: rawSessionId,
      visitor_id: rawVisitorId,
      started_at: new Date(session.startTime).toISOString(),
      last_seen_at: new Date(session.lastActive).toISOString(),
      landing_page: session.landingPage,
      exit_page: clean(data.page) || "/",
      source: sourceInfo.label,
      medium: clean(data.utmMedium),
      campaign: clean(data.utmCampaign),
      content: clean(data.utmContent),
      term: clean(data.utmTerm),
      device_type: safeDeviceSummary,
      os: parsedUA.os,
      browser: parsedUA.browser,
      language: safeLanguage,
      timezone: safeTimezone,
      country: safeCountry,
      region: geo.city,
      city: safeCity,
      page_count: session.pagesVisited.length,
      event_count: session.actions.length + 1,
      duration_seconds: currentDurationSec,
    };

    const eventRecord = {
      id: eventId,
      session_id: rawSessionId,
      visitor_id: rawVisitorId,
      event_type: event,
      route: clean(data.page) || "/",
      referrer: clean(data.referrer),
      metadata: {
        ctaLabel: data.ctaLabel,
        section: data.section,
        amount: data.amount,
        payment: data.payment,
        intent: data.intent,
        ipMasked: maskedClientIp,
        firstTouch: data.firstTouch,
        lastTouch: data.lastTouch,
        screen: data.screenResolution,
        viewport: data.viewport,
      },
      created_at: new Date().toISOString(),
    };

    // Fire and forget database save
    saveToSupabase(sessionRecord, eventRecord).catch(() => {});

    return NextResponse.json({ ok: true, visitorId: shortVisitorId, sessionId: shortSessionId });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
