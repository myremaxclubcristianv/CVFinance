import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

// In-memory rate limiting per client IP
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
  isNewVisitorNotified: boolean;
  isReturningVisitorNotified: boolean;
  isHighIntentNotified: boolean;
  hasCompletedCalculator: boolean;
  hasStartedForm: boolean;
  hasClickedPhone: boolean;
  hasClickedWhatsApp: boolean;
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
  initialPage: string
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
      isNewVisitorNotified: false,
      isReturningVisitorNotified: false,
      isHighIntentNotified: false,
      hasCompletedCalculator: false,
      hasStartedForm: false,
      hasClickedPhone: false,
      hasClickedWhatsApp: false,
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

function evaluateHighIntent(session: SessionJourney): { isHighIntent: boolean; signals: string[] } {
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
  if (commercialPages.length >= 3) {
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
  
  const isHighIntent = signals.length >= 2;
  return { isHighIntent, signals };
}

const trackSchema = z.object({
  event: z.string().trim().min(1).max(64),
  visitorId: z.string().trim().max(64).optional().default("vis_anon"),
  sessionId: z.string().trim().max(64).optional().default("sess_anon"),
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
  utmSource: z.string().trim().max(100).optional().default("direct"),
  utmMedium: z.string().trim().max(100).optional().default("—"),
  utmCampaign: z.string().trim().max(100).optional().default("—"),
  utmContent: z.string().trim().max(100).optional().default("—"),
  utmTerm: z.string().trim().max(100).optional().default("—"),
  referrer: z.string().trim().max(2048).optional().default("direct"),
  language: z.string().trim().max(50).optional().default("ro-RO"),
  timezone: z.string().trim().max(100).optional().default("Europe/Bucharest"),
  timestamp: z.string().trim().max(50).optional(),
  metadata: z.record(z.any()).optional().default({}),
  amount: z.coerce.number().optional(),
  payment: z.coerce.number().optional(),
  termYears: z.coerce.number().optional(),
});

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

function formatShortId(id: string): string {
  const prefix = id.startsWith("sess_") ? "sess_" : "vis_";
  const cleanId = id.replace(/^(vis_|sess_)/, "");
  const upper = cleanId.toUpperCase();
  return prefix + upper.slice(0, 4) + "••••";
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

function maskIp(ip: string): string {
  if (ip.includes(".")) {
    const parts = ip.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.xxx.xxx`;
    }
  }
  return "xxx.xxx.xxx.xxx";
}

function parseDeviceFromUA(ua: string) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
  const isTablet = /iPad|Android/i.test(ua) && !/Mobile/i.test(ua);
  const deviceType = isTablet ? "Tablet" : isMobile ? "Mobile" : "Desktop";

  let os = "Other OS";
  let osModel = "";
  if (/iPhone/i.test(ua)) {
    os = "iOS";
    osModel = "iPhone";
  } else if (/iPad/i.test(ua)) {
    os = "iPadOS";
    osModel = "iPad";
  } else if (/Macintosh|Mac OS X/i.test(ua)) {
    os = "macOS";
  } else if (/Windows NT/i.test(ua)) {
    os = "Windows";
  } else if (/Android/i.test(ua)) {
    os = "Android";
  } else if (/Linux/i.test(ua)) {
    os = "Linux";
  }

  let browser = "Other Browser";
  if (/Edg/i.test(ua)) browser = "Edge";
  else if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = "Chrome";
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";
  else if (/Firefox/i.test(ua)) browser = "Firefox";
  else if (/Opera|OPR/i.test(ua)) browser = "Opera";

  const deviceSummary = osModel
    ? `${deviceType} · ${osModel} · ${browser}`
    : `${deviceType} · ${os} · ${browser}`;

  return { deviceType, os, browser, deviceSummary };
}

function parseGeoFromHeaders(request: Request) {
  const countryCode = request.headers.get("x-vercel-ip-country") || "RO";
  const cityRaw = request.headers.get("x-vercel-ip-city") || "";
  const regionRaw = request.headers.get("x-vercel-ip-country-region") || "";
  const timezoneRaw = request.headers.get("x-vercel-ip-timezone") || "Europe/Bucharest";

  let country = "Romania";
  let countryFlag = "🇷🇴";

  if (countryCode === "RO") {
    country = "Romania";
    countryFlag = "🇷🇴";
  } else if (countryCode === "GB" || countryCode === "UK") {
    country = "Marea Britanie";
    countryFlag = "🇬🇧";
  } else if (countryCode === "DE") {
    country = "Germania";
    countryFlag = "🇩🇪";
  } else if (countryCode === "IT") {
    country = "Italia";
    countryFlag = "🇮🇹";
  } else if (countryCode === "ES") {
    country = "Spania";
    countryFlag = "🇪🇸";
  } else if (countryCode === "FR") {
    country = "Franța";
    countryFlag = "🇫🇷";
  } else if (countryCode === "US") {
    country = "Statele Unite";
    countryFlag = "🇺🇸";
  } else if (countryCode === "MD") {
    country = "Moldova";
    countryFlag = "🇲🇩";
  } else {
    country = countryCode;
    countryFlag = "🌍";
  }

  let city = "București";
  if (cityRaw) {
    try {
      city = decodeURIComponent(cityRaw);
    } catch {
      city = cityRaw;
    }
  } else if (regionRaw) {
    city = regionRaw;
  }

  return { country, countryFlag, city, timezone: timezoneRaw };
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

async function saveToSupabase(sessionData: any, eventData: any): Promise<void> {
  try {
    const admin = getSupabaseAdmin();
    if (sessionData && sessionData.id) {
      await admin.from("visitor_sessions").upsert(sessionData, { onConflict: "id" });
    }
    if (eventData && eventData.id) {
      await admin.from("visitor_events").insert(eventData);
    }
  } catch {
    // Graceful degradation
  }
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (!allowTrackRequest(ip)) {
      return NextResponse.json({ ok: false, message: "Rate limit exceeded" }, { status: 429 });
    }

    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
    }

    const parsed = trackSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: "Invalid payload schema" }, { status: 400 });
    }

    const data = parsed.data;
    const ua = request.headers.get("user-agent") || "";
    const parsedUA = parseDeviceFromUA(ua);
    const geo = parseGeoFromHeaders(request);
    const sourceInfo = normalizeSource(data.utmSource, data.referrer);

    const rawVisitorId = clean(data.visitorId) || "vis_anon";
    const rawSessionId = clean(data.sessionId) || "sess_anon";
    const shortVisitorId = formatShortId(rawVisitorId);
    const shortSessionId = formatShortId(rawSessionId);

    const safePage = escapeHtml(clean(data.page) || "/");
    const safeCtaLabel = escapeHtml(clean(data.ctaLabel));
    const safeDeviceSummary = escapeHtml(parsedUA.deviceSummary);
    const safeScreenCategory = escapeHtml(clean(data.screenCategory) || "Large screen");
    const safeLanguage = escapeHtml(clean(data.language) || "ro-RO");
    const safeTimezone = escapeHtml(clean(data.timezone) || geo.timezone);
    const safeSource = escapeHtml(sourceInfo.label);
    const safeMedium = escapeHtml(clean(data.utmMedium) || "—");
    const safeCampaign = escapeHtml(clean(data.utmCampaign) || "—");
    const safeReferrerHost = escapeHtml(sourceInfo.host);
    const safeCity = escapeHtml(geo.city);
    const safeCountry = escapeHtml(geo.country);
    const maskedClientIp = maskIp(ip);

    const fullTimestampStr = new Intl.DateTimeFormat("ro-RO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Europe/Bucharest",
    }).format(new Date());

    const timeOnly = new Intl.DateTimeFormat("ro-RO", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Europe/Bucharest",
    }).format(new Date());

    const actionTimeStr = new Intl.DateTimeFormat("ro-RO", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Bucharest",
    }).format(new Date());

    // Journey Tracking
    const session = getOrCreateSession(
      rawSessionId,
      rawVisitorId,
      data.isReturning,
      data.visitCount,
      clean(data.page) || "/"
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

    // --- EVENT CLASSIFICATION & TELEGRAM HIERARCHY ---

    // 1. Session Started / New Visitor / Returning Visitor
    if (event === "visitor_session_started" || event === "session_started" || (event === "page_view" && pageCount === 1 && session.actions.length === 0)) {
      if (data.isReturning && !session.isReturningVisitorNotified) {
        session.isReturningVisitorNotified = true;
        session.actions.push("Returning visit");
        session.timedActions.push({ timeStr: actionTimeStr, name: "Page view" });
        shouldNotifyTelegram = true;
        const recentJourney = session.pagesVisited.map((p, i) => `${i + 1}. ${escapeHtml(p)}`).join("\n");
        const lastAction = session.actions.length > 1 ? session.actions[session.actions.length - 1] : "Page view";
        telegramText =
          `💳 <b>CREDITE.CRISTIANVADUVA.COM — 🔁 VISITATOR RECURENT</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `🕐 <b>SESSION</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `Time: ${fullTimestampStr} EEST\n` +
          `Visitor: <code>${shortVisitorId}</code>\n` +
          `Session: <code>${shortSessionId}</code>\n` +
          `Visit: #${data.visitCount}\n` +
          `━━━━━━━━━━━━━━\n` +
          `🌍 <b>CONTEXT</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `Location: ${geo.countryFlag} ${safeCity}, ${safeCountry}\n` +
          `Device: ${safeDeviceSummary}\n` +
          `━━━━━━━━━━━━━━\n` +
          `🔗 <b>ACQUISITION</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `Source: ${safeSource}\n` +
          `Referrer: ${safeReferrerHost}\n` +
          `━━━━━━━━━━━━━━\n` +
          `📄 <b>PAGES & METRICS</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `Landing: ${escapeHtml(session.landingPage)}\n` +
          `Current: ${safePage}\n` +
          `Pages: ${pageCount}\n` +
          `Duration: ${durationFormatted}\n` +
          `Actions: ${session.actions.length}\n` +
          `━━━━━━━━━━━━━━\n` +
          `🧭 <b>RECENT JOURNEY</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `${recentJourney}\n` +
          `━━━━━━━━━━━━━━\n` +
          `⚡ <b>LAST ACTION:</b> ${escapeHtml(lastAction)}`;
      } else if (!data.isReturning && !session.isNewVisitorNotified) {
        session.isNewVisitorNotified = true;
        session.actions.push("Page viewed");
        session.timedActions.push({ timeStr: actionTimeStr, name: "Page view" });
        shouldNotifyTelegram = true;
        telegramText =
          `💳 <b>CREDITE.CRISTIANVADUVA.COM — 👀 VISITOR NOU</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `🕐 <b>SESSION</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `Time: ${fullTimestampStr} EEST\n` +
          `Visitor: <code>${shortVisitorId}</code>\n` +
          `Session: <code>${shortSessionId}</code>\n` +
          `Visit: #${data.visitCount}\n` +
          `━━━━━━━━━━━━━━\n` +
          `🌍 <b>CONTEXT</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `Location: ${geo.countryFlag} ${safeCity}, ${safeCountry}\n` +
          `Device: ${safeDeviceSummary}\n` +
          `Screen: ${safeScreenCategory}\n` +
          `Language: ${safeLanguage}\n` +
          `Timezone: ${safeTimezone}\n` +
          `━━━━━━━━━━━━━━\n` +
          `🔗 <b>ACQUISITION</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `Source: ${safeSource}\n` +
          `Medium: ${safeMedium}\n` +
          `Campaign: ${safeCampaign}\n` +
          `Referrer: ${safeReferrerHost}\n` +
          `━━━━━━━━━━━━━━\n` +
          `📄 <b>ACTIVITY</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `Landing: ${safePage}\n` +
          `First action: Page viewed\n` +
          `━━━━━━━━━━━━━━\n` +
          `🎯 <b>STATUS:</b> New visitor`;
      }
    }

    // 2. High-Value Page View Notification
    else if (event === "page_view" && isImportantPage(clean(data.page))) {
      session.timedActions.push({ timeStr: actionTimeStr, name: `Page (${clean(data.page)})` });
      if (canNotifyAction(`page_${clean(data.page)}`, 30000)) {
        shouldNotifyTelegram = true;
        telegramText =
          `💳 <b>CREDITE.CRISTIANVADUVA.COM — 📄 PAGINĂ IMPORTANTĂ</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `📄 <b>PAGE:</b> ${safePage}\n` +
          `🕐 <b>Time:</b> ${timeOnly}\n` +
          `🆔 <b>Visitor:</b> <code>${shortVisitorId}</code>\n` +
          `🆔 <b>Session:</b> <code>${shortSessionId}</code>\n` +
          `━━━━━━━━━━━━━━\n` +
          `🌍 <b>Location:</b> ${geo.countryFlag} ${safeCity}, ${safeCountry}\n` +
          `📱 <b>Device:</b> ${safeDeviceSummary}\n` +
          `🔗 <b>Source:</b> ${safeSource}\n` +
          `🔗 <b>Referrer:</b> ${safeReferrerHost}\n` +
          `⏱ <b>Session duration:</b> ${durationFormatted} (${pageCount} pages)`;
      }
    }

    // 3. Phone CTA Clicked
    else if (event === "phone_click" || event === "cta_phone_clicked") {
      session.hasClickedPhone = true;
      session.actions.push("Phone CTA clicked");
      session.timedActions.push({ timeStr: actionTimeStr, name: "Phone CTA" });
      if (canNotifyAction("phone")) {
        shouldNotifyTelegram = true;
        const totalClicks = session.actionCounts.get("phone") || 1;
        const ctaTitle = totalClicks > 1 ? `📞 PHONE CTA CLICKED · ${totalClicks}×` : `📞 PHONE CTA CLICKED`;
        telegramText =
          `💳 <b>CREDITE.CRISTIANVADUVA.COM — 📞 CLICK TELEFON</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `🕐 <b>Time:</b> ${timeOnly}\n` +
          `🆔 <b>Visitor:</b> <code>${shortVisitorId}</code>\n` +
          `🆔 <b>Session:</b> <code>${shortSessionId}</code>\n` +
          `📄 <b>Page:</b> ${safePage}\n` +
          `🔘 <b>CTA:</b> Telefon 0767 110 439\n` +
          `━━━━━━━━━━━━━━\n` +
          `🌍 <b>Location:</b> ${geo.countryFlag} ${safeCity}, ${safeCountry}\n` +
          `📱 <b>Device:</b> ${safeDeviceSummary}\n` +
          `🔗 <b>Source:</b> ${safeSource}\n` +
          `🔗 <b>Referrer:</b> ${safeReferrerHost}\n` +
          `━━━━━━━━━━━━━━\n` +
          `📊 <b>JOURNEY BEFORE CLICK</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `Pages viewed: ${pageCount}\n` +
          `Duration: ${durationFormatted}\n` +
          `Actions: ${session.actions.length}\n` +
          `━━━━━━━━━━━━━━\n` +
          `🎯 <b>ACTION:</b> ${ctaTitle}`;
      }
    }

    // 4. WhatsApp CTA Clicked
    else if (event === "whatsapp_click" || event === "cta_whatsapp_clicked" || event === "business_finance_whatsapp" || event === "totul_credit_whatsapp") {
      session.hasClickedWhatsApp = true;
      session.actions.push("WhatsApp CTA clicked");
      session.timedActions.push({ timeStr: actionTimeStr, name: "WhatsApp CTA" });
      if (canNotifyAction("whatsapp")) {
        shouldNotifyTelegram = true;
        const totalClicks = session.actionCounts.get("whatsapp") || 1;
        const ctaTitle = totalClicks > 1 ? `💬 WHATSAPP CTA CLICKED · ${totalClicks}×` : `💬 WHATSAPP CTA CLICKED`;
        telegramText =
          `💳 <b>CREDITE.CRISTIANVADUVA.COM — 💬 CLICK WHATSAPP</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `🕐 <b>Time:</b> ${timeOnly}\n` +
          `🆔 <b>Visitor:</b> <code>${shortVisitorId}</code>\n` +
          `🆔 <b>Session:</b> <code>${shortSessionId}</code>\n` +
          `📄 <b>Page:</b> ${safePage}\n` +
          `🔘 <b>CTA:</b> WhatsApp Direct\n` +
          `━━━━━━━━━━━━━━\n` +
          `🌍 <b>Location:</b> ${geo.countryFlag} ${safeCity}, ${safeCountry}\n` +
          `📱 <b>Device:</b> ${safeDeviceSummary}\n` +
          `🔗 <b>Source:</b> ${safeSource}\n` +
          `🔗 <b>Referrer:</b> ${safeReferrerHost}\n` +
          `━━━━━━━━━━━━━━\n` +
          `📊 <b>JOURNEY BEFORE CLICK</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `Pages viewed: ${pageCount}\n` +
          `Duration: ${durationFormatted}\n` +
          `Actions: ${session.actions.length}\n` +
          `━━━━━━━━━━━━━━\n` +
          `🎯 <b>ACTION:</b> ${ctaTitle}`;
      }
    }

    // 5. Telegram CTA Clicked
    else if (event === "telegram_click" || event === "cta_telegram_clicked") {
      session.actions.push("Telegram CTA clicked");
      session.timedActions.push({ timeStr: actionTimeStr, name: "Telegram CTA" });
      if (canNotifyAction("telegram_click")) {
        shouldNotifyTelegram = true;
        telegramText =
          `💳 <b>CREDITE.CRISTIANVADUVA.COM — ✈️ CLICK TELEGRAM</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `🕐 <b>Time:</b> ${timeOnly}\n` +
          `🆔 <b>Visitor:</b> <code>${shortVisitorId}</code>\n` +
          `🆔 <b>Session:</b> <code>${shortSessionId}</code>\n` +
          `📄 <b>Page:</b> ${safePage}\n` +
          `🔘 <b>CTA:</b> Telegram Contact\n` +
          `━━━━━━━━━━━━━━\n` +
          `🌍 <b>Location:</b> ${geo.countryFlag} ${safeCity}, ${safeCountry}\n` +
          `📱 <b>Device:</b> ${safeDeviceSummary}\n` +
          `🔗 <b>Source:</b> ${safeSource}\n` +
          `🔗 <b>Referrer:</b> ${safeReferrerHost}\n` +
          `━━━━━━━━━━━━━━\n` +
          `📊 <b>JOURNEY:</b> ${pageCount} pages · ${durationFormatted}`;
      }
    }

    // 6. Calculator Activity
    else if (event === "calculator_complete" || event === "calculator_completed" || event === "calculator_used") {
      session.hasCompletedCalculator = true;
      session.actions.push("Calculator completed");
      session.timedActions.push({ timeStr: actionTimeStr, name: "Calculator completed" });
      if (canNotifyAction("calculator", 15000)) {
        shouldNotifyTelegram = true;
        const coarseAmount = getCoarseAmountRange(data.amount);
        const coarsePayment = getCoarsePaymentRange(data.payment);
        telegramText =
          `💳 <b>CREDITE.CRISTIANVADUVA.COM — 🧮 CALCULATOR FINALIZAT</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `🕐 <b>Time:</b> ${timeOnly}\n` +
          `🆔 <b>Visitor:</b> <code>${shortVisitorId}</code>\n` +
          `🆔 <b>Session:</b> <code>${shortSessionId}</code>\n` +
          `📄 <b>Page:</b> ${safePage}\n` +
          `━━━━━━━━━━━━━━\n` +
          `💰 <b>INPUT</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `Interval sumă: <b>${coarseAmount}</b>\n` +
          `Durată estimată: 20–25 ani\n` +
          `━━━━━━━━━━━━━━\n` +
          `📊 <b>RESULT ESTIMAT</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `Rată lunară: <b>${coarsePayment}</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `🌍 <b>Context:</b> ${geo.countryFlag} ${safeCity}, ${safeCountry}\n` +
          `💻 <b>Device:</b> ${safeDeviceSummary}\n` +
          `🔗 <b>Source:</b> ${safeSource}\n` +
          `⏱ <b>Session duration:</b> ${durationFormatted}`;
      }
    }

    // 7. Real Story Viewed
    else if (event === "story_view" || safePage.includes("/povesti-reale/")) {
      const storyTitle = (data.metadata?.title as string) || (safePage.includes("david") ? "David — 21 credite IFN" : safePage.includes("georgeta") ? "Georgeta — Refinanțare rate mari" : safePage.includes("istoric-negativ") ? "Istoric negativ Biroul de Credit" : "Studiu de caz Smart Credit");
      if (!session.storiesViewed.includes(storyTitle)) {
        session.storiesViewed.push(storyTitle);
      }
      session.actions.push(`Story: ${storyTitle}`);
      session.timedActions.push({ timeStr: actionTimeStr, name: "Story viewed" });
      if (canNotifyAction(`story_${safePage}`, 30000)) {
        shouldNotifyTelegram = true;
        const storiesCount = session.storiesViewed.length;
        const storiesBadge = storiesCount > 1 ? ` (${storiesCount} povești citite în sesiune)` : "";
        telegramText =
          `💳 <b>CREDITE.CRISTIANVADUVA.COM — 📖 POVESTE VIZUALIZATĂ</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `📖 <b>Story:</b> ${escapeHtml(storyTitle)}${storiesBadge}\n` +
          `📄 <b>URL:</b> ${safePage}\n` +
          `🕐 <b>Time:</b> ${timeOnly}\n` +
          `🆔 <b>Visitor:</b> <code>${shortVisitorId}</code>\n` +
          `🆔 <b>Session:</b> <code>${shortSessionId}</code>\n` +
          `━━━━━━━━━━━━━━\n` +
          `🌍 <b>Location:</b> ${geo.countryFlag} ${safeCity}, ${safeCountry}\n` +
          `📱 <b>Device:</b> ${safeDeviceSummary}\n` +
          `🔗 <b>Source:</b> ${safeSource}\n` +
          `🔗 <b>Referrer:</b> ${safeReferrerHost}\n` +
          `📊 <b>Session:</b> ${durationFormatted} · ${pageCount} pages`;
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
      session.timedActions.push({ timeStr: actionTimeStr, name: "Form started" });
      if (canNotifyAction("form_start", 20000)) {
        shouldNotifyTelegram = true;
        telegramText =
          `💳 <b>CREDITE.CRISTIANVADUVA.COM — 📝 FORMULAR ÎNCEPUT</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `🕐 <b>Time:</b> ${timeOnly}\n` +
          `🆔 <b>Visitor:</b> <code>${shortVisitorId}</code>\n` +
          `🧭 <b>Session:</b> <code>${shortSessionId}</code>\n` +
          `📄 <b>Form:</b> Verificare Eligibilitate Credit\n` +
          `📄 <b>Page:</b> ${safePage}\n` +
          `━━━━━━━━━━━━━━\n` +
          `🌍 <b>Location:</b> ${geo.countryFlag} ${safeCity}, ${safeCountry}\n` +
          `📱 <b>Device:</b> ${safeDeviceSummary}\n` +
          `🔗 <b>Source:</b> ${safeSource}\n` +
          `🔗 <b>Referrer:</b> ${safeReferrerHost}\n` +
          `⏱ <b>Session:</b> ${pageCount} pages · ${durationFormatted}`;
      }
    }

    // 9. Referral Program Interaction
    else if (event === "referral_page_viewed" || event === "referral_hero_cta_clicked" || event === "referral_link_clicked") {
      session.actions.push("Referral hub accessed");
      session.timedActions.push({ timeStr: actionTimeStr, name: "Referral page" });
      if (canNotifyAction("referral", 25000)) {
        shouldNotifyTelegram = true;
        telegramText =
          `💳 <b>CREDITE.CRISTIANVADUVA.COM — 🤝 PROGRAM RECOMANDĂRI</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `🕐 <b>Time:</b> ${timeOnly}\n` +
          `Vizitatorul a accesat ecosistemul de parteneriat / recomandări\n` +
          `━━━━━━━━━━━━━━\n` +
          `🆔 <b>Visitor:</b> <code>${shortVisitorId}</code>\n` +
          `🧭 <b>Session:</b> <code>${shortSessionId}</code>\n` +
          `📍 <b>Pagină:</b> ${safePage}\n` +
          `💻 <b>Device:</b> ${safeDeviceSummary}\n` +
          `⏱ <b>Session:</b> ${durationFormatted}`;
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
      session.timedActions.push({ timeStr: actionTimeStr, name: `CTA (${actionName})` });
      if (canNotifyAction(`cta_${actionName}`, 20000)) {
        shouldNotifyTelegram = true;
        telegramText =
          `💳 <b>CREDITE.CRISTIANVADUVA.COM — 🔥 ACTIVITATE IMPORTANTĂ</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `🕐 <b>Time:</b> ${timeOnly}\n` +
          `🆔 <b>Visitor:</b> <code>${shortVisitorId}</code>\n` +
          `🧭 <b>Session:</b> <code>${shortSessionId}</code>\n` +
          `📄 <b>Page:</b> ${safePage}\n` +
          `🎯 <b>ACTION:</b> 🎯 CTA CLICKED "${actionName}"\n` +
          `━━━━━━━━━━━━━━\n` +
          `📍 <b>Location:</b> ${geo.countryFlag} ${safeCity}, ${safeCountry}\n` +
          `💻 <b>Device:</b> ${safeDeviceSummary}\n` +
          `🔎 <b>Source:</b> ${safeSource}\n` +
          `📊 <b>Session:</b> ${durationFormatted} · ${pageCount} pages`;
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
      session.timedActions.push({ timeStr: actionTimeStr, name: "Lead submitted" });
      shouldNotifyTelegram = true;
      const formattedPages = session.pagesVisited.map((p, idx) => `${idx + 1}. ${escapeHtml(p)}`).join("\n");
      const formattedTimeline = session.timedActions.length > 0
        ? session.timedActions.map((ta) => `${ta.timeStr} — ${escapeHtml(ta.name)}`).join("\n")
        : `${actionTimeStr} — Lead submitted`;
      
      telegramText =
        `💳 <b>CREDITE.CRISTIANVADUVA.COM — 📊 JOURNEY</b>\n` +
        `━━━━━━━━━━━━━━\n` +
        `👤 <b>VISITOR & SESSION</b>\n` +
        `━━━━━━━━━━━━━━\n` +
        `🆔 Visitor ID: <code>${shortVisitorId}</code>\n` +
        `🧭 Session ID: <code>${shortSessionId}</code>\n` +
        `🕐 Time: ${timeOnly} · Duration: ${durationFormatted}\n` +
        `📍 Location: ${geo.countryFlag} ${safeCity}, ${safeCountry}\n` +
        `💻 Device: ${safeDeviceSummary}\n` +
        `━━━━━━━━━━━━━━\n` +
        `🔗 <b>ACQUISITION</b>\n` +
        `━━━━━━━━━━━━━━\n` +
        `Source: ${safeSource}\n` +
        `Medium: ${safeMedium}\n` +
        `Campaign: ${safeCampaign}\n` +
        `Referrer: ${safeReferrerHost}\n` +
        `Landing page: ${escapeHtml(session.landingPage)}\n` +
        `━━━━━━━━━━━━━━\n` +
        `📄 <b>PAGES VISITED (${session.pagesVisited.length})</b>\n` +
        `━━━━━━━━━━━━━━\n` +
        `${formattedPages}\n` +
        `━━━━━━━━━━━━━━\n` +
        `⚡ <b>ACTIONS TIMELINE</b>\n` +
        `━━━━━━━━━━━━━━\n` +
        `${formattedTimeline}\n` +
        `━━━━━━━━━━━━━━\n` +
        `🟢 <b>CONVERSION:</b> NEW LEAD`;
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
          `💳 <b>CREDITE.CRISTIANVADUVA.COM — 🚪 SESIUNE ÎNCHEIATĂ</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `⏱ <b>Duration:</b> ${durationFormatted}\n` +
          `🆔 <b>Visitor:</b> <code>${shortVisitorId}</code>\n` +
          `🧭 <b>Session:</b> <code>${shortSessionId}</code>\n` +
          `━━━━━━━━━━━━━━\n` +
          `📍 <b>Location:</b> ${geo.countryFlag} ${safeCity}, ${safeCountry}\n` +
          `💻 <b>Device:</b> ${safeDeviceSummary}\n` +
          `🔗 <b>Source:</b> ${safeSource}\n` +
          `━━━━━━━━━━━━━━\n` +
          `📄 <b>Landing:</b> ${escapeHtml(session.landingPage)}\n` +
          `📄 <b>Exit:</b> ${safePage}\n` +
          `📊 <b>Pages:</b> ${pageCount} pages\n` +
          `━━━━━━━━━━━━━━\n` +
          `⚡ <b>IMPORTANT ACTIONS:</b>\n` +
          `${importantActions}\n` +
          `━━━━━━━━━━━━━━\n` +
          `🟢 <b>Outcome:</b> ${outcome}`;
      }
    }

    // High Intent Automatic Alert Trigger (if multiple commercial signals detected)
    if (!session.isHighIntentNotified && !session.hasConverted) {
      const intentEval = evaluateHighIntent(session);
      if (intentEval.isHighIntent) {
        session.isHighIntentNotified = true;
        const highIntentMsg =
          `💳 <b>CREDITE.CRISTIANVADUVA.COM — 🎯 INTENȚIE RIDICATĂ</b>\n` +
          `━━━━━━━━━━━━━━\n` +
          `🎯 <b>SIGNALS:</b>\n` +
          `${intentEval.signals.map((s) => `• ${escapeHtml(s)}`).join("\n")}\n` +
          `━━━━━━━━━━━━━━\n` +
          `🕐 <b>Time:</b> ${timeOnly}\n` +
          `🆔 <b>Visitor:</b> <code>${shortVisitorId}</code>\n` +
          `🧭 <b>Session:</b> <code>${shortSessionId}</code>\n` +
          `🌍 <b>Location:</b> ${geo.countryFlag} ${safeCity}, ${safeCountry}\n` +
          `📱 <b>Device:</b> ${safeDeviceSummary}\n` +
          `🔗 <b>Source:</b> ${safeSource}\n` +
          `━━━━━━━━━━━━━━\n` +
          `📊 <b>JOURNEY:</b> ${pageCount} pages · ${durationFormatted}`;
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
