// Commercial Analytics & Visitor Intelligence v2 Utility
// Supports GA4, Meta Pixel & Server-Side Live Telegram/Supabase Intelligence

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "";

// Cache for deduplicating exact same events within a short timeframe
const eventCache = new Set<string>();

// Get or initialize persistent pseudonymous Visitor ID (localStorage)
export const getVisitorId = (): string => {
  if (typeof window === "undefined") return "vis_server";
  try {
    let visitorId = localStorage.getItem("cv_finance_visitor_id");
    if (!visitorId) {
      visitorId = "vis_" + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 6);
      localStorage.setItem("cv_finance_visitor_id", visitorId);
      localStorage.setItem("cv_finance_visit_count", "1");
      localStorage.setItem("cv_finance_first_seen", String(Date.now()));
      localStorage.setItem("cv_finance_last_seen", String(Date.now()));
    } else {
      const lastSeen = Number(localStorage.getItem("cv_finance_last_seen") || "0");
      const now = Date.now();
      // Increment visit count if returning after 30 minutes
      if (now - lastSeen > 30 * 60 * 1000) {
        const count = Number(localStorage.getItem("cv_finance_visit_count") || "1") + 1;
        localStorage.setItem("cv_finance_visit_count", String(count));
      }
      localStorage.setItem("cv_finance_last_seen", String(now));
    }
    return visitorId;
  } catch {
    return "vis_anon";
  }
};

// Get or initialize persistent pseudonymous Session ID (sessionStorage)
export const getSessionId = (): string => {
  if (typeof window === "undefined") return "sess_server";
  try {
    let sessionId = sessionStorage.getItem("cv_finance_session_id");
    if (!sessionId) {
      sessionId = "sess_" + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 6);
      sessionStorage.setItem("cv_finance_session_id", sessionId);
      sessionStorage.setItem("cv_finance_session_start", String(Date.now()));
    }
    return sessionId;
  } catch {
    return "sess_anon";
  }
};

export const getSessionDuration = (): number => {
  if (typeof window === "undefined") return 0;
  try {
    const start = Number(sessionStorage.getItem("cv_finance_session_start") || Date.now());
    return Math.max(0, Math.floor((Date.now() - start) / 1000));
  } catch {
    return 0;
  }
};

export const getVisitCount = (): number => {
  if (typeof window === "undefined") return 1;
  try {
    return Number(localStorage.getItem("cv_finance_visit_count") || "1");
  } catch {
    return 1;
  }
};

// Helper to check stored cookie consent
export const hasConsent = (category: "analytics" | "marketing"): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem("cv_finance_cookie_consent");
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return !!parsed[category];
  } catch {
    return false;
  }
};

// Helper to extract traffic parameters (UTMs, Referrer, Device, Viewport, Timezone)
export const getTrafficMetadata = () => {
  if (typeof window === "undefined") return {};

  const query = new URLSearchParams(window.location.search);
  const ua = navigator.userAgent || "";
  const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
  const isTablet = /iPad|Android/i.test(ua) && window.innerWidth >= 768;
  const deviceType = isTablet ? "Tablet" : isMobile ? "Mobile" : "Desktop";

  let screenCategory = "Desktop";
  if (window.innerWidth < 640) screenCategory = "Small screen";
  else if (window.innerWidth < 1024) screenCategory = "Medium screen";
  else screenCategory = "Large screen";

  const visitorId = getVisitorId();
  const sessionId = getSessionId();
  const visitCount = getVisitCount();
  const isReturning = visitCount > 1;
  const sessionDuration = getSessionDuration();

  let language = "ro-RO";
  let timezone = "Europe/Bucharest";
  try {
    language = navigator.language || "ro-RO";
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Bucharest";
  } catch {}

  return {
    visitorId,
    sessionId,
    isReturning,
    visitCount,
    sessionDuration,
    utmSource: query.get("utm_source") || "direct",
    utmMedium: query.get("utm_medium") || "—",
    utmCampaign: query.get("utm_campaign") || "—",
    utmContent: query.get("utm_content") || "—",
    utmTerm: query.get("utm_term") || "—",
    referrer: document.referrer || "direct",
    landingPage: window.location.pathname,
    deviceType,
    screenCategory,
    language,
    timezone,
  };
};

// Fire-and-forget server-side telemetry logger
const logTelegramActivity = (eventName: string, eventParams?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;

  const meta = getTrafficMetadata();
  const payload = {
    event: eventName,
    visitorId: meta.visitorId,
    sessionId: meta.sessionId,
    isReturning: meta.isReturning,
    visitCount: meta.visitCount,
    sessionDuration: meta.sessionDuration,
    page: window.location.pathname + window.location.hash,
    deviceType: meta.deviceType,
    screenCategory: meta.screenCategory,
    utmSource: meta.utmSource,
    utmMedium: meta.utmMedium,
    utmCampaign: meta.utmCampaign,
    utmContent: meta.utmContent,
    utmTerm: meta.utmTerm,
    referrer: meta.referrer,
    language: meta.language,
    timezone: meta.timezone,
    timestamp: new Date().toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" }),
    ...eventParams,
  };

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
      navigator.sendBeacon("/api/track", blob);
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Silent fallback
  }
};

// Track Custom Event in GA4, Meta Pixel & Telegram Live Visitor Intelligence
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  if (typeof window === "undefined") return;

  // Deduplication check (3-second debounce per event signature)
  const eventKey = `${eventName}-${JSON.stringify(eventParams || {})}`;
  if (eventCache.has(eventKey)) {
    return;
  }
  eventCache.add(eventKey);
  setTimeout(() => {
    eventCache.delete(eventKey);
  }, 3000);

  // Send activity to live visitor intelligence backend
  logTelegramActivity(eventName, eventParams);

  // Track Google Analytics Event ONLY if analytics consent is granted
  if (hasConsent("analytics") && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }

  // Track Meta Pixel Event ONLY if marketing consent is granted
  if (hasConsent("marketing") && window.fbq) {
    if (eventName === "lead_success" || eventName === "form_submitted") {
      window.fbq("track", "Lead", eventParams);
    } else if (eventName === "page_view") {
      window.fbq("track", "PageView");
    } else if (
      eventName === "calculator_complete" ||
      eventName === "calculator_completed" ||
      eventName === "form_start" ||
      eventName === "form_started"
    ) {
      window.fbq("track", "ViewContent", { content_name: eventName, ...eventParams });
    } else {
      window.fbq("trackCustom", eventName, eventParams);
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.log(`[Visitor Intelligence v2] (${eventName}) Consent - Analytics: ${hasConsent("analytics")}, Marketing: ${hasConsent("marketing")}:`, eventParams);
  }
};
