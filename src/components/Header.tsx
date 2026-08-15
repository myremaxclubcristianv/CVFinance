"use client";

import React, { useState, useEffect, type ReactElement } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// Navigation items shared between desktop and mobile
const NAV_ITEMS = [
  { code: "01", title: "PERSONAL", desc: "Credit pentru locuință, refinanțare și nevoi personale.", href: "#totul-inainte-de-credit", id: "totul-inainte-de-credit" },
  { code: "02", title: "BUSINESS", desc: "Finanțare pentru companie.", href: "#business-finance", id: "business-finance" },
  { code: "03", title: "SERVICII", desc: "Analiză și consultanță.", href: "#servicii", id: "servicii" },
  { code: "04", title: "PROCES", desc: "Cum analizăm situația și ajungem la variante.", href: "#cum-functioneaza", id: "cum-functioneaza" },
  { code: "05", title: "DESPRE", desc: "Cristian Văduva.", href: "#despre", id: "despre" },
  { code: "06", title: "CONTACT", desc: "Vorbește direct.", href: "#contact", id: "contact" },
];

export default function Header(): ReactElement {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Scroll handling for header style and progress bar
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 10);
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock when mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // ESC key listener to close mobile menu
  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", escHandler);
    return () => window.removeEventListener("keydown", escHandler);
  }, [mobileMenuOpen]);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    trackEvent("cta_analysis_clicked", { source: "header_nav_cta" });
    const el = document.getElementById("verificare-credit") || document.getElementById("aplica");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Single header element */}
      <header className={`cv-header ${isScrolled ? "scrolled" : ""}`}>
        {/* Desktop navigation */}
        <div className="cv-container hidden md:flex cv-header-inner" style={{ paddingLeft: "var(--gap-desktop)", paddingRight: "var(--gap-desktop)" }}>
          <Link href="/" className="cv-brand" onClick={() => setMobileMenuOpen(false)}>
            <span className="cv-brand-title">CV Finance</span>
            <span className="cv-brand-subtitle">CREDIT ADVISORY &amp; FINANCIAL OPTIMIZATION</span>
          </Link>
          <nav className="cv-nav-links">
            {NAV_ITEMS.map(item => (
              <Link key={item.id} href={item.href} className="cv-nav-link" onClick={e => handleNavClick(e, item.id)}>{item.title}</Link>
            ))}
          </nav>
          <a href="#verificare-credit" className="cv-btn-primary" onClick={handleCtaClick}>VERIFICĂ SITUAȚIA →</a>
        </div>
        {/* Mobile header */}
        <div className="cv-container flex md:hidden cv-header-inner-mobile" style={{ height: "60px", paddingLeft: "var(--gap-mobile)", paddingRight: "var(--gap-mobile)" }}>
          <Link href="/" className="cv-brand" onClick={() => setMobileMenuOpen(false)}>
            <span className="cv-brand-title" style={{ fontSize: "1.15rem", fontWeight: 800 }}>CV Finance</span>
            <span className="cv-brand-subtitle" style={{ fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.08em", marginTop: "1px" }}>CREDIT ADVISORY</span>
          </Link>
          <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-expanded={mobileMenuOpen} aria-controls="mobile-nav-panel" aria-label={mobileMenuOpen ? "Închide meniul" : "Deschide meniul"} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem" }}>
            {mobileMenuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
          </button>
        </div>
        {/* Reading progress bar */}
        <div className="cv-scroll-rollbar" style={{ width: `${scrollProgress}%` }} />
      </header>

      {/* Mobile overlay (outside header) */}
      {mobileMenuOpen && (
        <div id="mobile-nav-panel" className="cv-mobile-overlay" role="dialog" aria-modal="true">
          <div className="cv-mobile-menu-content">
            {NAV_ITEMS.map(item => (
              <Link key={item.id} href={item.href} className="cv-mobile-menu-item" onClick={e => handleNavClick(e, item.id)}>
                <span className="cv-mobile-menu-index">{item.code}</span>
                <span className="cv-mobile-menu-title">{item.title}</span>
                <span className="cv-mobile-menu-desc">{item.desc}</span>
              </Link>
            ))}
            <div className="cv-mobile-menu-cta-wrap">
              <a href="#verificare-credit" className="cv-mobile-menu-cta" onClick={handleCtaClick}>VERIFICĂ SITUAȚIA →</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
