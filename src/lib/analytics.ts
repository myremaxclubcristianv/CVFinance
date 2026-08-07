// Commercial Analytics Utility for GA4, Meta Pixel & Telegram Live Visitor Tracking

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

// Get or initialize persistent anonymous Session ID
export const getSessionId = (): string => {
  if (typeof window === "undefined") return "server";
  let sessionId = sessionStorage.getItem("cv_finance_session_id");
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 6);
    sessionStorage.setItem("cv_finance_session_id", sessionId);
  }
  return sessionId;
};

// Helper to check stored consent
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

// Helper to extract traffic parameters (UTMs, Referrer, Device)
export const getTrafficMetadata = () => {
  if (typeof window === "undefined") return {};

  const query = new URLSearchParams(window.location.search);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;

  const deviceType = isTablet ? "Tablet" : isMobile ? "Mobile" : "Desktop";

  return {
    utmSource: query.get("utm_source") || "direct",
    utmMedium: query.get("utm_medium") || "—",
    utmCampaign: query.get("utm_campaign") || "—",
    utmContent: query.get("utm_content") || "—",
    referrer: document.referrer || "direct",
    landingPage: window.location.pathname,
    deviceType,
    sessionId: getSessionId(),
  };
};

// Fire-and-forget server-side Telegram activity logger
const logTelegramActivity = (eventName: string, eventParams?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;

  const meta = getTrafficMetadata();
  const payload = {
    event: eventName,
    sessionId: meta.sessionId,
    page: window.location.pathname + window.location.hash,
    deviceType: meta.deviceType,
    utmSource: meta.utmSource,
    referrer: meta.referrer,
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

  // Deduplication check
  const eventKey = `${eventName}-${JSON.stringify(eventParams || {})}`;
  if (eventCache.has(eventKey)) {
    return;
  }
  eventCache.add(eventKey);
  
  // Clear cache for this event after 3 seconds
  setTimeout(() => {
    eventCache.delete(eventKey);
  }, 3000);

  // Send activity to Telegram live intelligence (Fire and Forget)
  logTelegramActivity(eventName, eventParams);

  // Track Google Analytics Event ONLY if analytics consent is granted
  if (hasConsent("analytics") && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }

  // Track Meta Pixel Event ONLY if marketing consent is granted
  if (hasConsent("marketing") && window.fbq) {
    if (eventName === "lead_success") {
      window.fbq("track", "Lead", eventParams);
    } else if (eventName === "page_view") {
      window.fbq("track", "PageView");
    } else if (eventName === "calculator_complete" || eventName === "form_start") {
      window.fbq("track", "ViewContent", { content_name: eventName, ...eventParams });
    } else {
      window.fbq("trackCustom", eventName, eventParams);
    }
  }

  // Dev Logging in development mode
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics Track] (${eventName}) Consent - Analytics: ${hasConsent("analytics")}, Marketing: ${hasConsent("marketing")}:`, eventParams);
  }
};
