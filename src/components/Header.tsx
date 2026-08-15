"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const MOBILE_MENU_ITEMS = [
  { code: "01", title: "PERSONAL", desc: "Credite, refinanțare, locuință", href: "/#totul-inainte-de-credit", id: "totul-inainte-de-credit" },
  { code: "02", title: "BUSINESS", desc: "Finanțare pentru companie", href: "/#business-finance", id: "business-finance" },
  { code: "03", title: "SERVICII", desc: "Analiză și consultanță", href: "/#servicii", id: "servicii" },
  { code: "04", title: "CUM FUNCȚIONEAZĂ", desc: "De la situație la soluție", href: "/#cum-functioneaza", id: "cum-functioneaza" },
  { code: "05", title: "DESPRE MINE", desc: "Cristian Văduva", href: "/#despre", id: "despre" },
  { code: "06", title: "CONTACT", desc: "Vorbim direct", href: "/#contact", id: "contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuMounted, setMenuMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mount/unmount with animation timing
  useEffect(() => {
    if (mobileMenuOpen) {
      setMenuMounted(true);
    } else {
      const timer = setTimeout(() => setMenuMounted(false), 220);
      return () => clearTimeout(timer);
    }
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // ESC to close
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    trackEvent("cta_analysis_clicked", { source: "header_nav_cta" });

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    setMobileMenuOpen(false);
    if (pathname === "/") {
      const targetEl = document.getElementById(id);
      if (targetEl) {
        e.preventDefault();
        setTimeout(() => targetEl.scrollIntoView({ behavior: "smooth" }), 60);
      }
    }
  };

  return (
    <>
      <style>{`
        /* ── Mobile header bar ── */
        .cv-mobile-bar {
          display: none;
          align-items: center;
          justify-content: space-between;
          height: 60px;
          padding: 0 20px;
          padding-top: env(safe-area-inset-top, 0px);
          background: var(--bg-primary, #FAFAF8);
          position: relative;
          box-sizing: border-box;
        }
        @media (max-width: 767px) {
          .cv-mobile-bar { display: flex; }
        }
        /* Clamp gutters at 320px so nothing overflows */
        @media (max-width: 340px) {
          .cv-mobile-bar { padding-left: 16px; padding-right: 16px; }
          .cv-overlay-header { padding-left: 16px; padding-right: 16px; }
          .cv-overlay-nav { padding-left: 16px; padding-right: 16px; }
          .cv-overlay-footer { padding-left: 16px; padding-right: 16px; }
        }

        /* Brand wordmark */
        .cv-mobile-brand {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          line-height: 1;
          -webkit-tap-highlight-color: transparent;
        }
        .cv-mobile-brand-mark {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 15.5px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #111111;
          line-height: 1;
          position: relative;
          /* prevent text from being selectable / highlighted on tap */
          user-select: none;
        }
        /* Subtle emerald dot — accent, not decoration */
        .cv-mobile-brand-mark::after {
          content: '';
          display: inline-block;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #087F5B;
          margin-left: 2px;
          position: relative;
          top: -5px;
          flex-shrink: 0;
        }

        /* ── Menu trigger ── */
        .cv-menu-trigger {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          /* Invisible padding for 44×44 touch target */
          padding: 12px 0 12px 16px;
          margin-right: -4px;
          min-width: 44px;
          min-height: 44px;
          position: relative;
          -webkit-tap-highlight-color: transparent;
        }
        .cv-menu-trigger-line {
          display: block;
          height: 1.5px;
          background: #1A1A1A;
          border-radius: 1px;
          transform-origin: center center;
          transition:
            width     180ms ease-out,
            transform 200ms ease-out,
            opacity   160ms ease-out;
        }
        /* Closed: longer top, shorter bottom — intentional asymmetry */
        .cv-menu-trigger-line:first-child { width: 22px; }
        .cv-menu-trigger-line:last-child  { width: 14px; }

        /* Open: precise X — both lines equal, cross at midpoint */
        .cv-menu-trigger[aria-expanded="true"] .cv-menu-trigger-line {
          width: 18px;
        }
        .cv-menu-trigger[aria-expanded="true"] .cv-menu-trigger-line:first-child {
          transform: rotate(45deg) translateY(5.25px);
        }
        .cv-menu-trigger[aria-expanded="true"] .cv-menu-trigger-line:last-child {
          transform: rotate(-45deg) translateY(-5.25px);
        }

        /* Bottom border of bar */
        .cv-mobile-bar-border {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(17,17,17,0.07);
        }

        /* ── Full-screen overlay ── */
        .cv-mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: var(--bg-primary, #FAFAF8);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 190ms ease-out, transform 210ms ease-out;
          pointer-events: none;
        }
        .cv-mobile-overlay.is-open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        /* Overlay top row — mirrors bar exactly */
        .cv-overlay-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 60px;
          padding: 0 20px;
          padding-top: env(safe-area-inset-top, 0px);
          flex-shrink: 0;
          border-bottom: 1px solid rgba(17,17,17,0.07);
          box-sizing: border-box;
        }

        /* ── Nav list ── */
        .cv-overlay-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 0 20px;
          /* no top padding — first item has border-top + margin */
        }
        .cv-overlay-item {
          display: flex;
          align-items: baseline;
          gap: 20px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(17,17,17,0.06);
          text-decoration: none;
          color: #111111;
          transition: opacity 140ms ease-out;
          -webkit-tap-highlight-color: transparent;
        }
        .cv-overlay-item:active { opacity: 0.45; }
        .cv-overlay-item:first-child {
          border-top: 1px solid rgba(17,17,17,0.06);
          margin-top: 10px;
        }

        /* Mono index — small, recessed */
        .cv-overlay-index {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 9.5px;
          font-weight: 400;
          color: #B8B8B8;
          letter-spacing: 0.04em;
          line-height: 1.4;
          flex-shrink: 0;
          width: 24px;
        }
        .cv-overlay-content {
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 0;
        }
        /* Primary: title is the dominant element */
        .cv-overlay-title {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.015em;
          line-height: 1.1;
          color: #111111;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        /* Secondary: description is clearly subordinate */
        .cv-overlay-desc {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 11.5px;
          color: #999999;
          line-height: 1.2;
          font-weight: 400;
        }

        /* ── Overlay footer CTA ── */
        .cv-overlay-footer {
          padding: 20px;
          padding-bottom: calc(24px + env(safe-area-inset-bottom, 0px));
          flex-shrink: 0;
          border-top: 1px solid rgba(17,17,17,0.07);
          margin-top: auto;
        }
        .cv-overlay-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 50px;
          padding: 0 18px;
          background: #087F5B;
          color: #FFFFFF;
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }
        .cv-overlay-cta-arrow {
          font-size: 15px;
          font-weight: 400;
          letter-spacing: 0;
          flex-shrink: 0;
        }
      `}</style>

      <header className={`cv-header ${isScrolled ? "scrolled" : ""}`}>
        {/* ── DESKTOP NAVIGATION — unchanged ── */}
        <div className="desktop-navigation hidden md:flex cv-header-inner" style={{ paddingLeft: "32px", paddingRight: "32px" }}>
          <Link href="/" className="cv-brand">
            <span className="cv-brand-title">CV Finance</span>
            <span className="cv-brand-subtitle">CREDIT ADVISORY &amp; FINANCIAL OPTIMIZATION</span>
          </Link>
          <nav className="cv-nav-links">
            <Link href="/#totul-inainte-de-credit" className="cv-nav-link" onClick={(e) => handleNavClick(e, "/#totul-inainte-de-credit", "totul-inainte-de-credit")}>Personal</Link>
            <Link href="/#business-finance" className="cv-nav-link" onClick={(e) => handleNavClick(e, "/#business-finance", "business-finance")}>Business</Link>
            <Link href="/#servicii" className="cv-nav-link" onClick={(e) => handleNavClick(e, "/#servicii", "servicii")}>Servicii</Link>
            <Link href="/#cum-functioneaza" className="cv-nav-link" onClick={(e) => handleNavClick(e, "/#cum-functioneaza", "cum-functioneaza")}>Cum funcționează</Link>
            <Link href="/#despre" className="cv-nav-link" onClick={(e) => handleNavClick(e, "/#despre", "despre")}>Despre mine</Link>
            <Link href="/#contact" className="cv-nav-link" onClick={(e) => handleNavClick(e, "/#contact", "contact")}>Contact</Link>
          </nav>
          <div className="flex items-center">
            <a href="#verificare-credit" className="cv-btn-primary" onClick={handleCtaClick}>VERIFICĂ SITUAȚIA →</a>
          </div>
        </div>

        {/* ── MOBILE NAVIGATION BAR ── */}
        <div className="cv-mobile-bar">
          <Link
            href="/"
            className="cv-mobile-brand"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="CV Finance — acasă"
          >
            <span className="cv-mobile-brand-mark">CV</span>
          </Link>

          <button
            type="button"
            className="cv-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={mobileMenuOpen ? "Închide meniul" : "Deschide meniul"}
          >
            <span className="cv-menu-trigger-line" />
            <span className="cv-menu-trigger-line" />
          </button>

          {/* Subtle bottom border */}
          <div className="cv-mobile-bar-border" />
        </div>

        {/* Scroll progress bar — inside header, bottom edge */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: `${scrollProgress}%`,
            height: "1px",
            backgroundColor: "var(--emerald, #087F5B)",
            transition: "width 80ms ease-out",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
      </header>

      {/* ── MOBILE FULL-SCREEN OVERLAY (outside <header>) ── */}
      {menuMounted && (
        <div
          id="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Navigație"
          className={`cv-mobile-overlay md:hidden ${mobileMenuOpen ? "is-open" : ""}`}
        >
          {/* Overlay top row — mirrors bar */}
          <div className="cv-overlay-header">
            <Link
              href="/"
              className="cv-mobile-brand"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="CV Finance — acasă"
            >
              <span className="cv-mobile-brand-mark">CV</span>
            </Link>

            <button
              type="button"
              className="cv-menu-trigger"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Închide meniul"
              aria-expanded={true}
              aria-controls="mobile-nav-panel"
            >
              <span className="cv-menu-trigger-line" />
              <span className="cv-menu-trigger-line" />
            </button>
          </div>

          {/* Navigation items */}
          <nav className="cv-overlay-nav" aria-label="Meniu principal">
            {MOBILE_MENU_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="cv-overlay-item"
                onClick={(e) => handleNavClick(e, item.href, item.id)}
              >
                <span className="cv-overlay-index">{item.code}</span>
                <span className="cv-overlay-content">
                  <span className="cv-overlay-title">{item.title}</span>
                  <span className="cv-overlay-desc">{item.desc}</span>
                </span>
              </Link>
            ))}
          </nav>

          {/* CTA footer */}
          <div className="cv-overlay-footer">
            <a
              href="#verificare-credit"
              className="cv-overlay-cta"
              onClick={handleCtaClick}
            >
              <span>VERIFICĂ SITUAȚIA</span>
              <span className="cv-overlay-cta-arrow">→</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
