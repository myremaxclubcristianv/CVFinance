"use client";

import { useEffect, useState, useCallback } from "react";
import { Shield, Settings, X, Lock, BarChart3, Target } from "lucide-react";

export interface CookieConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
  version: string;
}

const CONSENT_KEY = "cv_finance_cookie_consent";
const CURRENT_VERSION = "1.0";

const defaultConsent: CookieConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: Date.now(),
  version: CURRENT_VERSION,
};

export function getStoredConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsentState;
    if (parsed.version !== CURRENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function hasCategoryConsent(category: "analytics" | "marketing"): boolean {
  const consent = getStoredConsent();
  if (!consent) return false;
  return !!consent[category];
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [analyticsToggle, setAnalyticsToggle] = useState(false);
  const [marketingToggle, setMarketingToggle] = useState(false);

  // Initialize scripts based on stored consent
  const applyScripts = useCallback((consent: CookieConsentState) => {
    if (typeof window === "undefined") return;

    // 1. Google Analytics Script Injection
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (consent.analytics && gaId && !document.getElementById("ga-script")) {
      const script = document.createElement("script");
      script.id = "ga-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", gaId, { anonymize_ip: true });
    }

    // 2. Meta Pixel Script Injection
    const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
    if (consent.marketing && pixelId && !document.getElementById("fb-pixel-script")) {
      const w = window as unknown as Record<string, unknown>;
      if (!w.fbq) {
        const n = function (...args: unknown[]) {
          const fn = n as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[] };
          if (fn.callMethod) {
            fn.callMethod(...args);
          } else {
            fn.queue.push(args);
          }
        };
        const fn = n as unknown as { push: unknown; loaded: boolean; version: string; queue: unknown[] };
        fn.push = n;
        fn.loaded = true;
        fn.version = "2.0";
        fn.queue = [];
        w.fbq = n;
        const s = document.createElement("script");
        s.id = "fb-pixel-script";
        s.async = true;
        s.src = "https://connect.facebook.net/en_US/fbevents.js";
        const firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode?.insertBefore(s, firstScript);
      }
      if (typeof w.fbq === "function") {
        w.fbq("init", pixelId);
        w.fbq("track", "PageView");
      }
    }
  }, []);

  const saveConsent = useCallback(
    (analytics: boolean, marketing: boolean) => {
      const consent: CookieConsentState = {
        necessary: true,
        analytics,
        marketing,
        timestamp: Date.now(),
        version: CURRENT_VERSION,
      };
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
      applyScripts(consent);
      setShowBanner(false);
      setShowModal(false);
    },
    [applyScripts]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = getStoredConsent();
      if (stored) {
        applyScripts(stored);
      } else {
        setShowBanner(true);
      }
    }, 0);

    // Listener for footer link to reopen preferences modal
    const handleOpenSettings = () => {
      const current = getStoredConsent() || defaultConsent;
      setAnalyticsToggle(current.analytics);
      setMarketingToggle(current.marketing);
      setShowBanner(false);
      setShowModal(true);
    };

    window.addEventListener("cv_open_cookie_settings", handleOpenSettings);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("cv_open_cookie_settings", handleOpenSettings);
    };
  }, [applyScripts]);

  // ESC key listener for modal accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showModal]);

  if (!showBanner && !showModal) return null;

  return (
    <>
      {/* 1. FLOATING COOKIE BANNER (Apple / Fintech Aesthetic) */}
      {showBanner && (
        <div
          role="region"
          aria-label="Notificare Cookie-uri"
          style={{
            position: "fixed",
            bottom: "24px",
            left: "24px",
            right: "24px",
            maxWidth: "760px",
            margin: "0 auto",
            backgroundColor: "#101311",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "20px",
            padding: "24px 28px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
            zIndex: 9999,
            color: "#ffffff",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "rgba(57, 255, 136, 0.08)",
                border: "1px solid rgba(57, 255, 136, 0.15)",
                color: "#39FF88",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Shield size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.1rem", margin: "0 0 6px 0", color: "#ffffff", fontWeight: 700 }}>
                Respectăm confidențialitatea datelor tale.
              </h3>
              <p style={{ fontSize: "0.9rem", margin: 0, color: "#A1A1AA", lineHeight: 1.5 }}>
                Folosim cookie-uri pentru funcționarea site-ului, analiză statistică și îmbunătățirea experienței. Poți alege ce accepți.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "12px",
              paddingTop: "12px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <button
              onClick={() => {
                const current = getStoredConsent() || defaultConsent;
                setAnalyticsToggle(current.analytics);
                setMarketingToggle(current.marketing);
                setShowBanner(false);
                setShowModal(true);
              }}
              style={{
                background: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#A1A1AA",
                borderRadius: "8px",
                padding: "10px 16px",
                fontSize: "0.85rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Settings size={14} /> Personalizează
            </button>

            <button
              onClick={() => saveConsent(false, false)}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#ffffff",
                borderRadius: "8px",
                padding: "10px 18px",
                fontSize: "0.85rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Doar necesare
            </button>

            <button
              onClick={() => saveConsent(true, true)}
              style={{
                background: "#39FF88",
                border: "1px solid #39FF88",
                color: "#050505",
                borderRadius: "8px",
                padding: "10px 20px",
                fontSize: "0.85rem",
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 0 15px rgba(57, 255, 136, 0.25)",
              }}
            >
              Acceptă toate
            </button>
          </div>
        </div>
      )}

      {/* 2. COOKIE PREFERENCES MODAL */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(5, 5, 5, 0.85)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 10000,
          }}
        >
          <div
            style={{
              backgroundColor: "#101311",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "24px",
              padding: "32px",
              maxWidth: "580px",
              width: "100%",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
              color: "#ffffff",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Shield size={20} style={{ color: "#39FF88" }} />
                <h2 id="modal-title" style={{ fontSize: "1.3rem", margin: 0, fontWeight: 800 }}>
                  Preferințe Cookie-uri
                </h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                aria-label="Închide modal"
                style={{
                  background: "none",
                  border: 0,
                  color: "#A1A1AA",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: "0.9rem", color: "#A1A1AA", marginBottom: "24px", lineHeight: 1.5 }}>
              Alege categoriile de cookie-uri pe care permiți să le stocăm. Modificările se vor aplica imediat.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "28px" }}>
              {/* Category 1: Necessary */}
              <div
                style={{
                  background: "#151918",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", gap: "12px" }}>
                  <Lock size={18} style={{ color: "#39FF88", marginTop: "2px" }} />
                  <div>
                    <h4 style={{ margin: "0 0 4px 0", fontSize: "0.95rem", fontWeight: 700 }}>Necesare</h4>
                    <p style={{ margin: 0, fontSize: "0.82rem", color: "#A1A1AA" }}>
                      Aceste cookie-uri sunt necesare pentru funcționarea site-ului.
                    </p>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: "#39FF88",
                    background: "rgba(57, 255, 136, 0.1)",
                    padding: "3px 10px",
                    borderRadius: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Mereu active
                </span>
              </div>

              {/* Category 2: Analytics */}
              <div
                style={{
                  background: "#151918",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", gap: "12px" }}>
                  <BarChart3 size={18} style={{ color: "#39FF88", marginTop: "2px" }} />
                  <div>
                    <h4 style={{ margin: "0 0 4px 0", fontSize: "0.95rem", fontWeight: 700 }}>Analitice</h4>
                    <p style={{ margin: 0, fontSize: "0.82rem", color: "#A1A1AA" }}>
                      Ne ajută să înțelegem cum este utilizat site-ul pentru a-l îmbunătăți.
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsToggle}
                  onChange={(e) => setAnalyticsToggle(e.target.checked)}
                  aria-label="Permite cookie-uri analitice"
                  style={{ accentColor: "#39FF88", width: "18px", height: "18px", cursor: "pointer", marginTop: "2px" }}
                />
              </div>

              {/* Category 3: Marketing */}
              <div
                style={{
                  background: "#151918",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", gap: "12px" }}>
                  <Target size={18} style={{ color: "#39FF88", marginTop: "2px" }} />
                  <div>
                    <h4 style={{ margin: "0 0 4px 0", fontSize: "0.95rem", fontWeight: 700 }}>Marketing</h4>
                    <p style={{ margin: 0, fontSize: "0.82rem", color: "#A1A1AA" }}>
                      Permit măsurarea campaniilor și afișarea unor reclame relevante.
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={marketingToggle}
                  onChange={(e) => setMarketingToggle(e.target.checked)}
                  aria-label="Permite cookie-uri de marketing"
                  style={{ accentColor: "#39FF88", width: "18px", height: "18px", cursor: "pointer", marginTop: "2px" }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                paddingTop: "20px",
              }}
            >
              <button
                onClick={() => saveConsent(analyticsToggle, marketingToggle)}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  borderRadius: "8px",
                  padding: "10px 18px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Salvează preferințele
              </button>

              <button
                onClick={() => saveConsent(true, true)}
                style={{
                  background: "#39FF88",
                  border: "1px solid #39FF88",
                  color: "#050505",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Acceptă toate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
