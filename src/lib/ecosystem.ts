// Centralized Ecosystem Source Identification & Telegram Routing Engine
// Ecosystem properties of Cristian Văduva

export type EcosystemPropertyKey =
  | "credite"
  | "insurance"
  | "homefind"
  | "aixmedia"
  | "constructions"
  | "fly";

export interface EcosystemPropertyConfig {
  key: EcosystemPropertyKey;
  domain: string;
  name: string;
  emoji: string;
  brand: string;
  telegramHeader: string;
  description: string;
}

export const ECOSYSTEM_PROPERTIES: Record<EcosystemPropertyKey, EcosystemPropertyConfig> = {
  credite: {
    key: "credite",
    domain: "credite.cristianvaduva.com",
    name: "CREDITE",
    emoji: "💳",
    brand: "CV Finance / Credite",
    telegramHeader: "💳 CREDITE.CRISTIANVADUVA.COM",
    description: "Credit Advisory & Financial Optimization",
  },
  insurance: {
    key: "insurance",
    domain: "insurance.cristianvaduva.com",
    name: "INSURANCE",
    emoji: "🛡️",
    brand: "CV Insurance",
    telegramHeader: "🛡️ INSURANCE.CRISTIANVADUVA.COM",
    description: "Financial Protection & Insurance Advisory",
  },
  homefind: {
    key: "homefind",
    domain: "homefind.cristianvaduva.com",
    name: "HOMEFIND",
    emoji: "🏠",
    brand: "Home Find",
    telegramHeader: "🏠 HOMEFIND.CRISTIANVADUVA.COM",
    description: "Real Estate Matching Platform",
  },
  aixmedia: {
    key: "aixmedia",
    domain: "aixmedia.cristianvaduva.com",
    name: "AIXMEDIA",
    emoji: "🎬",
    brand: "AiX Media",
    telegramHeader: "🎬 AIXMEDIA.CRISTIANVADUVA.COM",
    description: "Digital Media & Video Strategy",
  },
  constructions: {
    key: "constructions",
    domain: "constructions.cristianvaduva.com",
    name: "CONSTRUCTIONS",
    emoji: "🏗️",
    brand: "CONSTRUCTIONS by AiXLuxury",
    telegramHeader: "🏗️ CONSTRUCTIONS.CRISTIANVADUVA.COM",
    description: "Premium Construction & Engineering by AiXLuxury",
  },
  fly: {
    key: "fly",
    domain: "fly.cristianvaduva.com",
    name: "FLY",
    emoji: "✈️",
    brand: "FLY",
    telegramHeader: "✈️ FLY.CRISTIANVADUVA.COM",
    description: "Private Aviation & Executive Travel",
  },
};

/**
 * Identify the originating ecosystem property from request headers, page URL, or source hints.
 */
export function detectEcosystemProperty(
  hint?: string | null,
  request?: Request | null
): EcosystemPropertyConfig {
  const checkString = (str?: string | null): EcosystemPropertyKey | null => {
    if (!str) return null;
    const lower = str.toLowerCase();
    if (lower.includes("constructions")) return "constructions";
    if (lower.includes("fly")) return "fly";
    if (lower.includes("insurance")) return "insurance";
    if (lower.includes("homefind")) return "homefind";
    if (lower.includes("aixmedia")) return "aixmedia";
    if (lower.includes("credite")) return "credite";
    return null;
  };

  // 1. Direct hint (e.g. from pageUrl or payload source)
  const fromHint = checkString(hint);
  if (fromHint) return ECOSYSTEM_PROPERTIES[fromHint];

  // 2. Request headers (Host, Referer, Origin)
  if (request) {
    const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "";
    const fromHost = checkString(host);
    if (fromHost) return ECOSYSTEM_PROPERTIES[fromHost];

    const origin = request.headers.get("origin") || "";
    const fromOrigin = checkString(origin);
    if (fromOrigin) return ECOSYSTEM_PROPERTIES[fromOrigin];

    const referer = request.headers.get("referer") || "";
    const fromReferer = checkString(referer);
    if (fromReferer) return ECOSYSTEM_PROPERTIES[fromReferer];
  }

  // Default to credite for this codebase
  return ECOSYSTEM_PROPERTIES.credite;
}

/**
 * Format a unified Telegram message title for an ecosystem event.
 */
export function formatTelegramTitle(
  propertyKeyOrHint: EcosystemPropertyKey | string | null,
  eventBadge: string
): string {
  const property =
    propertyKeyOrHint && propertyKeyOrHint in ECOSYSTEM_PROPERTIES
      ? ECOSYSTEM_PROPERTIES[propertyKeyOrHint as EcosystemPropertyKey]
      : detectEcosystemProperty(propertyKeyOrHint);

  return `${property.emoji} <b>${property.telegramHeader.replace(/^[^\s]+\s*/, "")} — ${eventBadge}</b>`;
}

/**
 * Clean and HTML-escape string for safe Telegram HTML parsing.
 */
export function escapeHtml(val?: string | null): string {
  if (!val) return "";
  return String(val)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function cleanString(val?: string | null): string {
  return (val || "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
}

/**
 * Format short pseudonymous Visitor/Session ID.
 */
export function formatShortId(id?: string | null): string {
  if (!id) return "—";
  const prefix = id.startsWith("sess_") ? "sess_" : "vis_";
  const cleanId = id.replace(/^(vis_|sess_)/, "");
  const upper = cleanId.toUpperCase();
  return prefix + upper.slice(0, 4) + "••••";
}

/**
 * Parse client device, OS, and browser from User-Agent string.
 */
export function parseDeviceFromUA(ua: string) {
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

/**
 * Parse approximate geolocation from standard edge / proxy headers.
 */
export function parseGeoFromHeaders(request: Request) {
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

/**
 * Validate and safely extract client IP from headers.
 * Protects against header injection, oversized strings, and malformed IPs.
 */
const IPV4_REGEX = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const IPV6_REGEX = /^[0-9a-fA-F:]+$/;

export function getSecureClientIp(request: Request): string {
  const candidates = [
    request.headers.get("x-vercel-ip"),
    request.headers.get("cf-connecting-ip"),
    request.headers.get("x-real-ip"),
  ];

  for (const raw of candidates) {
    if (raw) {
      const ip = raw.trim();
      if (ip.length <= 45 && (IPV4_REGEX.test(ip) || IPV6_REGEX.test(ip))) {
        return ip;
      }
    }
  }

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",");
    const clientPart = parts[0]?.trim();
    if (clientPart && clientPart.length <= 45 && (IPV4_REGEX.test(clientPart) || IPV6_REGEX.test(clientPart))) {
      return clientPart;
    }
  }

  return "127.0.0.1";
}

