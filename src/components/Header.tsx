"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className={`cv-header ${isScrolled ? "scrolled" : ""}`}>
      
      {/* DESKTOP HEADER INNER */}
      <div className="cv-container hidden md:flex cv-header-inner" style={{ paddingLeft: "32px", paddingRight: "32px" }}>
        {/* LEFT: BRANDING */}
        <Link href="/" className="cv-brand">
          <span className="cv-brand-title">CV Finance</span>
          <span className="cv-brand-subtitle">CREDIT ADVISORY & FINANCIAL OPTIMIZATION</span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="cv-nav-links">
          <Link
            href="/#totul-inainte-de-credit"
            className="cv-nav-link"
            onClick={(e) => handleNavClick(e, "/#totul-inainte-de-credit", "totul-inainte-de-credit")}
          >
            Personal
          </Link>
          <Link
            href="/#business-finance"
            className="cv-nav-link"
            onClick={(e) => handleNavClick(e, "/#business-finance", "business-finance")}
          >
            Business
          </Link>
          <Link
            href="/#servicii"
            className="cv-nav-link"
            onClick={(e) => handleNavClick(e, "/#servicii", "servicii")}
          >
            Servicii
          </Link>
          <Link
            href="/#cum-functioneaza"
            className="cv-nav-link"
            onClick={(e) => handleNavClick(e, "/#cum-functioneaza", "cum-functioneaza")}
          >
            Cum funcționează
          </Link>
          <Link
            href="/#despre"
            className="cv-nav-link"
            onClick={(e) => handleNavClick(e, "/#despre", "despre")}
          >
            Despre mine
          </Link>
          <Link
            href="/#contact"
            className="cv-nav-link"
            onClick={(e) => handleNavClick(e, "/#contact", "contact")}
          >
            Contact
          </Link>
        </nav>

        {/* PRIMARY ACTION CTA */}
        <div className="flex items-center">
          <a href="#verificare-credit" className="cv-btn-primary" onClick={handleCtaClick}>
            VERIFICĂ SITUAȚIA →
          </a>
        </div>
      </div>

      {/* MOBILE HEADER INNER */}
{/* MOBILE HEADER INNER */}
<div className="cv-container flex md:hidden cv-header-inner-mobile" style={{ height: "60px", paddingTop: "env(safe-area-inset-top)", paddingLeft: "20px", paddingRight: "20px", alignItems: "center", justifyContent: "space-between", background: "var(--bg-primary)", borderBottom: "1px solid var(--border)" }}>
  {/* LEFT: BRANDING */}
  <Link href="/" className="cv-brand" onClick={() => setMobileMenuOpen(false)}>
    <span className="cv-brand-title" style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "-0.01em" }}>CV Finance</span>
  </Link>
  {/* RIGHT: MENU TRIGGER */}
  <button
    type="button"
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    aria-expanded={mobileMenuOpen}
    aria-controls="mobile-nav-panel"
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "70px",
      height: "36px",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0
    }}
    aria-label={mobileMenuOpen ? "Închide meniul" : "Deschide meniul"}
  >
    {mobileMenuOpen ? (
      <X size={16} strokeWidth={2} />
    ) : (
      <div style={{ width: "16px", height: "1px", backgroundColor: "#111111", marginBottom: "2px" }} />
    )}
    <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", fontFamily: "monospace", lineHeight: "1" }}>
      {mobileMenuOpen ? "ÎNCHIDE" : "MENU"}
    </span>
  </button>
</div>

      {/* FULL-SCREEN MOBILE NAVIGATION PANEL */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-panel"
          className="md:hidden fixed inset-x-0 bottom-0 bg-white z-[999] px-5 py-6 flex flex-col justify-between" 
          style={{ 
            top: "calc(58px + env(safe-area-inset-top, 0px))", 
            height: "calc(100vh - (58px + env(safe-area-inset-top, 0px)))", 
            overflowY: "auto",
            borderTop: "1px solid rgba(17, 17, 17, 0.08)"
          }}
        >
          <div className="flex flex-col gap-6" style={{ marginTop: "1rem" }}>
            <nav className="flex flex-col" style={{ borderTop: "1px solid rgba(17, 17, 17, 0.08)" }}>
              {MOBILE_MENU_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                  style={{
                    display: "block",
                    padding: "1.25rem 0",
                    borderBottom: "1px solid rgba(17, 17, 17, 0.08)",
                    textDecoration: "none",
                    color: "#111111"
                  }}
                >
                  <span className="cv-mono" style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 500, display: "block", marginBottom: "0.25rem" }}>
                    {item.code}
                  </span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.02em", display: "block", lineHeight: "1.1" }}>
                    {item.title}
                  </span>
                  <span style={{ fontSize: "12.5px", color: "var(--text-secondary)", display: "block", marginTop: "0.15rem" }}>
                    {item.desc}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom, 0px))", marginTop: "3rem" }}>
            <a
              href="#verificare-credit"
              className="cv-btn-primary w-full text-center"
              style={{
                display: "block",
                height: "52px",
                lineHeight: "52px",
                padding: 0,
                backgroundColor: "#087F5B",
                color: "#FFFFFF",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer"
              }}
              onClick={handleCtaClick}
            >
              VERIFICĂ SITUAȚIA →
            </a>
          </div>
        </div>
      )}

      {/* Scroll indicator progress bar */}
      <div 
        className="cv-scroll-rollbar"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: "1px",
          backgroundColor: "var(--emerald)",
          transition: "width 80ms ease-out",
          zIndex: 100
        }}
      />
    </header>
  );
}
