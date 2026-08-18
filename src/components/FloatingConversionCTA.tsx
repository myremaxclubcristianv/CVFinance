"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { MessageCircle, ArrowRight, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { CONTACT } from "@/lib/constants";

interface FloatingConversionCTAProps {
  phone?: string;
  whatsappMessage?: string;
}

export default function FloatingConversionCTA({
  phone = CONTACT.WHATSAPP,
  whatsappMessage = "Bună ziua, doresc o analiză gratuită a opțiunilor mele financiare.",
}: FloatingConversionCTAProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape" && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Hide floating button when main fullscreen mobile menu is open
  useEffect(() => {
    const checkMobileMenu = () => {
      const overlayOpen = document.querySelector(".cv-mobile-overlay.is-open");
      const bodyLocked = document.body.style.overflow === "hidden";
      setIsMobileMenuOpen(!!(overlayOpen || bodyLocked));
    };

    // Observer for body style / overlay changes
    const observer = new MutationObserver(checkMobileMenu);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style", "class"],
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    trackEvent("floating_cta_toggle", { state: !isOpen ? "open" : "close" });
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent("whatsapp_click", { destination_phone: phone, source: "floating_popup" });
    const encodedMsg = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMsg}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const handleVerificationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent("cta_analysis_clicked", { source: "floating_popup" });
    setIsOpen(false);

    const scrollToForm = () => {
      const el = document.getElementById("verificare-credit") || document.getElementById("aplica");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (pathname === "/") {
      scrollToForm();
    } else {
      router.push("/#verificare-credit");
      setTimeout(scrollToForm, 300);
    }
  };

  const handleReferralClick = () => {
    trackEvent("referral_link_clicked", { source: "floating_popup" });
    setIsOpen(false);
  };

  // If main mobile menu is open, don't render/display floating button
  if (isMobileMenuOpen) return null;

  return (
    <>
      <style>{`
        .cv-floating-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 990;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        /* Safe area support for iOS home bar */
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          .cv-floating-container {
            bottom: calc(20px + env(safe-area-inset-bottom, 0px));
          }
        }

        /* ── Floating Contact Trigger Button ── */
        .cv-floating-btn {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-color: var(--emerald, #087F5B);
          color: #FFFFFF;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.14);
          transition: background-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
          -webkit-tap-highlight-color: transparent;
          flex-shrink: 0;
        }

        .cv-floating-btn:hover {
          background-color: var(--emerald-hover, #066c4d);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
        }

        .cv-floating-btn:active {
          transform: scale(0.96);
        }

        .cv-floating-btn:focus-visible {
          outline: 2px solid var(--emerald, #087F5B);
          outline-offset: 3px;
        }

        /* ── Popup Menu ── */
        .cv-floating-popup {
          position: absolute;
          bottom: calc(100% + 12px);
          right: 0;
          width: min(320px, calc(100vw - 36px));
          background-color: #FFFFFF;
          border: 1px solid var(--border, #E4E8E6);
          border-radius: 2px;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          opacity: 0;
          transform: translateY(8px);
          pointer-events: none;
          transition: opacity 190ms ease-out, transform 200ms ease-out;
          box-sizing: border-box;
        }

        .cv-floating-popup.is-open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        .cv-floating-popup-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-bottom: 1px solid var(--border, #E4E8E6);
          background-color: var(--bg-secondary, #F7F9F8);
        }

        .cv-floating-popup-title {
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-secondary, #5F6368);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .cv-floating-popup-close {
          background: none;
          border: none;
          color: var(--text-secondary, #5F6368);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        .cv-floating-popup-nav {
          display: flex;
          flex-direction: column;
        }

        .cv-floating-popup-item {
          display: flex;
          align-items: baseline;
          gap: 12px;
          padding: 13px 16px;
          border-bottom: 1px solid var(--border, #E4E8E6);
          text-decoration: none;
          color: var(--text-primary, #111111);
          background-color: #FFFFFF;
          border-left: none;
          border-right: none;
          border-top: none;
          text-align: left;
          width: 100%;
          cursor: pointer;
          min-height: 48px;
          box-sizing: border-box;
          transition: background-color 140ms ease;
          -webkit-tap-highlight-color: transparent;
        }

        .cv-floating-popup-item:last-child {
          border-bottom: none;
        }

        .cv-floating-popup-item:hover {
          background-color: var(--bg-secondary, #F7F9F8);
        }

        .cv-floating-popup-num {
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--emerald, #087F5B);
          flex-shrink: 0;
          width: 18px;
        }

        .cv-floating-popup-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .cv-floating-popup-lbl {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-primary, #111111);
          line-height: 1.2;
        }

        .cv-floating-popup-desc {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 0.78rem;
          color: var(--text-secondary, #5F6368);
          line-height: 1.3;
        }
      `}</style>

      <div ref={containerRef} className="cv-floating-container">
        {/* Popup Menu */}
        <nav
          id="floating-contact-menu"
          aria-label="Opțiuni de contact rapid"
          className={`cv-floating-popup ${isOpen ? "is-open" : ""}`}
        >
          <div className="cv-floating-popup-header">
            <span className="cv-floating-popup-title">CONTACT RAPID</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="cv-floating-popup-close"
              aria-label="Închide meniul de contact"
            >
              <X size={16} />
            </button>
          </div>

          <nav className="cv-floating-popup-nav">
            {/* 01: WhatsApp */}
            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="cv-floating-popup-item"
            >
              <span className="cv-floating-popup-num">01</span>
              <span className="cv-floating-popup-content">
                <span className="cv-floating-popup-lbl">WhatsApp</span>
                <span className="cv-floating-popup-desc">Scrie-mi direct →</span>
              </span>
            </a>

            {/* 02: Verifică Situația */}
            <a
              href="/#verificare-credit"
              onClick={handleVerificationClick}
              className="cv-floating-popup-item"
            >
              <span className="cv-floating-popup-num">02</span>
              <span className="cv-floating-popup-content">
                <span className="cv-floating-popup-lbl">VERIFICĂ SITUAȚIA</span>
                <span className="cv-floating-popup-desc">Analizează situația ta financiară →</span>
              </span>
            </a>

            {/* 03: Recomandă un Client */}
            <Link
              href="/referral"
              onClick={handleReferralClick}
              className="cv-floating-popup-item"
            >
              <span className="cv-floating-popup-num">03</span>
              <span className="cv-floating-popup-content">
                <span className="cv-floating-popup-lbl">RECOMANDĂ UN CLIENT</span>
                <span className="cv-floating-popup-desc">Primește recompensa →</span>
              </span>
            </Link>
          </nav>
        </nav>

        {/* Single Floating Button */}
        <button
          type="button"
          onClick={handleToggle}
          className="cv-floating-btn"
          aria-label="Contact"
          aria-expanded={isOpen}
          aria-controls="floating-contact-menu"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    </>
  );
}

