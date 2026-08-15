"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="cv-header">
      <div className="cv-container cv-header-inner">
        {/* LEFT: BRANDING */}
        <Link href="/" className="cv-brand">
          <span className="cv-brand-title">CV Finance</span>
          <span className="cv-brand-subtitle">Credit Advisory & Financial Optimization</span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="cv-nav-links hidden md:flex">
          <Link
            href="/#totul-inainte-de-credit"
            className="cv-nav-link"
            onClick={(e) => handleNavClick(e, "/#totul-inainte-de-credit")}
          >
            Personal
          </Link>
          <Link
            href="/#business-finance"
            className="cv-nav-link"
            onClick={(e) => handleNavClick(e, "/#business-finance")}
          >
            Business
          </Link>
          <Link
            href="/#servicii"
            className="cv-nav-link"
            onClick={(e) => handleNavClick(e, "/#servicii")}
          >
            Servicii
          </Link>
          <Link
            href="/#cum-functioneaza"
            className="cv-nav-link"
            onClick={(e) => handleNavClick(e, "/#cum-functioneaza")}
          >
            Cum funcționează
          </Link>
          <Link
            href="/#despre"
            className="cv-nav-link"
            onClick={(e) => handleNavClick(e, "/#despre")}
          >
            Despre mine
          </Link>
          <Link
            href="/#contact"
            className="cv-nav-link"
            onClick={(e) => handleNavClick(e, "/#contact")}
          >
            Contact
          </Link>
        </nav>

        {/* PRIMARY ACTION CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#verificare-credit" className="cv-btn-primary" onClick={handleCtaClick}>
            VERIFICĂ SITUAȚIA →
          </a>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden p-2 text-neutral-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Închide meniul" : "Deschide meniul"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE COMPACT NAV DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 bottom-0 top-[56px] bg-white z-[999] px-6 py-8 flex flex-col justify-between" style={{ height: "calc(100vh - 56px)", overflowY: "auto" }}>
          <div className="flex flex-col gap-6">
            <span className="cv-mono" style={{ color: "var(--emerald)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em" }}>CV ADVISORY DIRECTORY</span>
            <nav className="flex flex-col gap-5">
              <Link
                href="/#totul-inainte-de-credit"
                className="text-lg font-bold text-neutral-900 flex items-center justify-between py-2 border-b border-neutral-100"
                onClick={(e) => handleNavClick(e, "/#totul-inainte-de-credit")}
              >
                <span>PERSONAL</span>
                <ChevronRight size={18} style={{ color: "var(--text-secondary)" }} />
              </Link>
              <Link
                href="/#business-finance"
                className="text-lg font-bold text-neutral-900 flex items-center justify-between py-2 border-b border-neutral-100"
                onClick={(e) => handleNavClick(e, "/#business-finance")}
              >
                <span>BUSINESS</span>
                <ChevronRight size={18} style={{ color: "var(--text-secondary)" }} />
              </Link>
              <Link
                href="/#servicii"
                className="text-lg font-bold text-neutral-900 flex items-center justify-between py-2 border-b border-neutral-100"
                onClick={(e) => handleNavClick(e, "/#servicii")}
              >
                <span>SERVICII</span>
                <ChevronRight size={18} style={{ color: "var(--text-secondary)" }} />
              </Link>
              <Link
                href="/#cum-functioneaza"
                className="text-lg font-bold text-neutral-900 flex items-center justify-between py-2 border-b border-neutral-100"
                onClick={(e) => handleNavClick(e, "/#cum-functioneaza")}
              >
                <span>CUM FUNCȚIONEAZĂ</span>
                <ChevronRight size={18} style={{ color: "var(--text-secondary)" }} />
              </Link>
              <Link
                href="/#despre"
                className="text-lg font-bold text-neutral-900 flex items-center justify-between py-2 border-b border-neutral-100"
                onClick={(e) => handleNavClick(e, "/#despre")}
              >
                <span>DESPRE MINE</span>
                <ChevronRight size={18} style={{ color: "var(--text-secondary)" }} />
              </Link>
              <Link
                href="/#contact"
                className="text-lg font-bold text-neutral-900 flex items-center justify-between py-2 border-b border-neutral-100"
                onClick={(e) => handleNavClick(e, "/#contact")}
              >
                <span>CONTACT</span>
                <ChevronRight size={18} style={{ color: "var(--text-secondary)" }} />
              </Link>
            </nav>
          </div>

          <div style={{ paddingBottom: "3rem" }}>
            <a
              href="#verificare-credit"
              className="cv-btn-primary w-full text-center py-3.5"
              onClick={handleCtaClick}
            >
              VERIFICĂ SITUAȚIA →
            </a>
          </div>
        </div>
      )}
      {/* Scroll indicator rollbar */}
      <div 
        className="cv-scroll-rollbar"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: "2px",
          backgroundColor: "var(--emerald)",
          transition: "width 80ms ease-out",
          zIndex: 100
        }}
      />
    </header>
  );
}
