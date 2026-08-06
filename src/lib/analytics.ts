// Commercial Analytics Utility for GA4 & Meta Pixel with Strict GDPR Cookie Consent

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

// Track Custom Event in GA4 & Meta Pixel with Consent Checks
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  if (typeof window === "undefined") return;

  // Deduplication check
  const eventKey = `${eventName}-${JSON.stringify(eventParams || {})}`;
  if (eventCache.has(eventKey)) {
    return; // Prevent duplicate firing
  }
  eventCache.add(eventKey);
  
  // Clear cache for this event after 2 seconds
  setTimeout(() => {
    eventCache.delete(eventKey);
  }, 2000);

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
  };
};
