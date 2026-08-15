"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ArrowRight, Menu, X, Sparkles, ChevronDown, Gift, MessageCircle, Building2, UserCheck, ShieldAlert } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { CONTACT } from "@/lib/constants";

export default function Header() {
  const [menu, setMenu] = useState(false);
  const [intentOpen, setIntentOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Close mega menu on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setIntentOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIntentOpen(false);
      }
    };
    if (intentOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [intentOpen]);

  const handleIntentSelect = (type: "personal" | "business", preselectValue: string, targetElementId: string) => {
    setIntentOpen(false);
    setMenu(false);

    if (type === "personal") {
      trackEvent("credit_intent_selected", { intent: preselectValue, source: "header_mega_menu" });
    } else {
      trackEvent("business_intent_selected", { intent: preselectValue, source: "header_mega_menu" });
    }

    const triggerNavigation = () => {
      const targetEl = document.getElementById(targetElementId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
      window.dispatchEvent(new CustomEvent("cv_intent_select", { detail: { type, preselectValue } }));
    };

    if (pathname === "/") {
      triggerNavigation();
    } else {
      router.push(`/#${targetElementId}`);
      setTimeout(triggerNavigation, 300);
    }
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenu(false);
    trackEvent("cta_analysis_clicked", { source: "header_nav_cta" });

    const scrollToForm = () => {
      const el = document.getElementById("verificare-credit");
      if (el) {
        const isReducedMotion =
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({
          behavior: isReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    };

    if (pathname === "/") {
      scrollToForm();
    } else {
      router.push("/#verificare-credit");
      setTimeout(scrollToForm, 300);
    }
  };

  return (
    <header className="nav">
      <Link href="/" className="brand" style={{ letterSpacing: "-1px" }}>
        <span>CV</span> Finance
      </Link>
      <nav>
        {/* EXECUTIVE INTENT SELECTOR TRIGGER */}
        <button
          type="button"
          className="nav-intent-trigger"
          onClick={() => {
            setIntentOpen(!intentOpen);
            trackEvent("intent_menu_opened", { location: "header_nav" });
          }}
          aria-expanded={intentOpen}
          aria-label="Selector intenție client CE CAUȚI?"
        >
          <Sparkles size={15} style={{ color: "#34D399" }} />
          <span>CE CAUȚI?</span>
          <ChevronDown size={14} style={{ transform: intentOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
        </button>

        <Link href="/#totul-inainte-de-credit">Persoane</Link>
        <Link href="/#business-finance">Business</Link>
        <Link href="/#financial-intelligence">Intelligence</Link>
        <Link href="/#proces">Cum funcționează</Link>
        <Link href="/referral">Recomandări</Link>
        <Link href="/#faq">FAQ</Link>
        <Link href="/#contact-direct">Contact</Link>
      </nav>
      <a className="nav-cta" href="/#verificare-credit" onClick={handleCtaClick}>
        VERIFICĂ SITUAȚIA <ArrowRight size={15} />
      </a>
      <button
        className="menu"
        onClick={() => setMenu(!menu)}
        aria-label={menu ? "Închide meniul de navigație" : "Deschide meniul de navigație"}
        aria-expanded={menu}
        aria-controls="mobile-nav-menu"
      >
        {menu ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* EXECUTIVE MEGA MENU INTENT OVERLAY */}
      {intentOpen && (
        <div className="mega-intent-menu-overlay" ref={megaMenuRef} role="navigation" aria-label="Meniu intenție client">
          <div className="mega-intent-container">
            <div className="mega-intent-header">
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 800, color: "#F8FAFC", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
                  CE CAUȚI? — SELECTEAZĂ SITUAȚIA TA
                </h4>
                <p style={{ fontSize: "13px", color: "#CBD5E1", margin: 0 }}>
                  Te ducem direct la analiza și formularul potrivit fără pași inutili.
                </p>
              </div>
              <button type="button" className="mega-close-btn" onClick={() => setIntentOpen(false)} aria-label="Închide meniul">
                <X size={18} />
              </button>
            </div>

            <div className="mega-intent-grid">
              {/* PERSONAL CREDIT INTENTS */}
              <div className="mega-column">
                <div className="mega-col-title">
                  <span className="mega-pill">PERSOANE FIZICE</span>
                  <span style={{ fontSize: "12px", color: "#94A3B8" }}>CREDIT PERSONAL & IPOTECAR</span>
                </div>
                <div className="mega-items-list">
                  <button
                    type="button"
                    className="mega-item-btn"
                    onClick={() => handleIntentSelect("personal", "Am probleme în Biroul de Credit", "verificare-credit")}
                  >
                    <div className="mega-item-headline">FICO / BIROUL DE CREDIT</div>
                    <div className="mega-item-sub">Am întârzieri, scor mic sau istoric negativ.</div>
                  </button>
                  <button
                    type="button"
                    className="mega-item-btn"
                    onClick={() => handleIntentSelect("personal", "Am probleme în Biroul de Credit", "verificare-credit")}
                  >
                    <div className="mega-item-headline">AM ÎNTÂRZIERI</div>
                    <div className="mega-item-sub">Vreau să verific situația mea înainte de un nou credit.</div>
                  </button>
                  <button
                    type="button"
                    className="mega-item-btn"
                    onClick={() => handleIntentSelect("personal", "Am fost refuzat de bancă", "verificare-credit")}
                  >
                    <div className="mega-item-headline">AM FOST REFUZAT</div>
                    <div className="mega-item-sub">Dosar respins de bancă sau IFN.</div>
                  </button>
                  <button
                    type="button"
                    className="mega-item-btn"
                    onClick={() => handleIntentSelect("personal", "Am nevoie de o sumă nouă", "verificare-credit")}
                  >
                    <div className="mega-item-headline">VREAU UN CREDIT NOU</div>
                    <div className="mega-item-sub">Nevoi personale, auto sau ipotecar.</div>
                  </button>
                  <button
                    type="button"
                    className="mega-item-btn"
                    onClick={() => handleIntentSelect("personal", "Vreau să-mi reduc rata lunară", "verificare-credit")}
                  >
                    <div className="mega-item-headline">VREAU REFINANȚARE</div>
                    <div className="mega-item-sub">Consolidarea tuturor datoriilor într-o singură rată.</div>
                  </button>
                  <button
                    type="button"
                    className="mega-item-btn"
                    onClick={() => handleIntentSelect("personal", "Vreau să-mi reduc rata lunară", "verificare-credit")}
                  >
                    <div className="mega-item-headline">VREAU RATE MAI MICI</div>
                    <div className="mega-item-sub">Optimizarea dobânzii și prelungirea perioadei.</div>
                  </button>
                </div>
              </div>

              {/* BUSINESS FINANCE INTENTS */}
              <div className="mega-column">
                <div className="mega-col-title">
                  <span className="mega-pill business">BUSINESS</span>
                  <span style={{ fontSize: "12px", color: "#94A3B8" }}>FINANȚARE COMPANII & SRL</span>
                </div>
                <div className="mega-items-list">
                  <button
                    type="button"
                    className="mega-item-btn"
                    onClick={() => handleIntentSelect("business", "Finanțare firmă", "verificare-finantare-business")}
                  >
                    <div className="mega-item-headline">FINANȚARE FIRMĂ</div>
                    <div className="mega-item-sub">Capital pentru SRL, PFA sau companii mari.</div>
                  </button>
                  <button
                    type="button"
                    className="mega-item-btn"
                    onClick={() => handleIntentSelect("business", "Capital de lucru", "verificare-finantare-business")}
                  >
                    <div className="mega-item-headline">CAPITAL DE LUCRU</div>
                    <div className="mega-item-sub">Linii de credit, stocuri, materii prime.</div>
                  </button>
                  <button
                    type="button"
                    className="mega-item-btn"
                    onClick={() => handleIntentSelect("business", "Echipamente / investiții", "verificare-finantare-business")}
                  >
                    <div className="mega-item-headline">INVESTIȚII / ECHIPAMENTE</div>
                    <div className="mega-item-sub">Utilaje, flote auto, achiziție spații.</div>
                  </button>
                  <button
                    type="button"
                    className="mega-item-btn"
                    onClick={() => handleIntentSelect("business", "Extindere companie", "verificare-finantare-business")}
                  >
                    <div className="mega-item-headline">EXTINDERE BUSINESS</div>
                    <div className="mega-item-sub">Scalare, puncte de lucru noi, dezvoltare.</div>
                  </button>
                  <button
                    type="button"
                    className="mega-item-btn"
                    onClick={() => handleIntentSelect("business", "Refinanțare business", "verificare-finantare-business")}
                  >
                    <div className="mega-item-headline">REFINANȚARE BUSINESS</div>
                    <div className="mega-item-sub">Restructurare și optimizare credite companie.</div>
                  </button>
                </div>
              </div>
            </div>

            {/* BOTTOM UTILITY ACTIONS */}
            <div className="mega-utility-bar">
              <button
                type="button"
                className="mega-utility-btn"
                onClick={() => {
                  setIntentOpen(false);
                  trackEvent("referral_intent_selected", { source: "header_mega_menu" });
                  router.push("/referral");
                }}
              >
                <Gift size={16} style={{ color: "#34D399" }} />
                <span>RECOMANDĂ UN CLIENT</span>
              </button>
              <a
                href={`https://wa.me/${CONTACT.WHATSAPP}?text=${encodeURIComponent("Bună ziua, doresc o analiză financiară direct pe WhatsApp.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mega-utility-btn whatsapp"
                onClick={() => {
                  setIntentOpen(false);
                  trackEvent("direct_contact_selected", { source: "header_mega_menu" });
                }}
              >
                <MessageCircle size={16} style={{ color: "#25D366" }} />
                <span>VORBESC DIRECT PE WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE NAV DRAWER */}
      {menu && (
        <div className="mobile-nav" id="mobile-nav-menu" role="navigation" aria-label="Meniu mobil">
          <button
            type="button"
            className="mega-item-btn"
            style={{ textAlign: "left", padding: "12px", background: "rgba(52,211,153,0.10)", border: "1px solid rgba(52,211,153,0.30)", borderRadius: "8px", marginBottom: "8px" }}
            onClick={() => {
              setMenu(false);
              setIntentOpen(true);
            }}
          >
            <div style={{ fontSize: "14px", fontWeight: 800, color: "#34D399", display: "flex", alignItems: "center", gap: "6px" }}>
              <Sparkles size={16} /> CE CAUȚI? — SELECTEAZĂ SITUAȚIA TA
            </div>
            <div style={{ fontSize: "12px", color: "#CBD5E1", marginTop: "2px" }}>Alege situația și mergi direct la formular.</div>
          </button>

          <Link href="/#totul-inainte-de-credit" onClick={() => setMenu(false)}>
            Persoane Fizice
          </Link>
          <Link href="/#business-finance" onClick={() => setMenu(false)}>
            Business Finance
          </Link>
          <Link href="/#financial-intelligence" onClick={() => setMenu(false)}>
            Financial Intelligence
          </Link>
          <Link href="/#proces" onClick={() => setMenu(false)}>
            Cum funcționează
          </Link>
          <Link href="/referral" onClick={() => setMenu(false)}>
            Recomandări
          </Link>
          <Link href="/#faq" onClick={() => setMenu(false)}>
            FAQ
          </Link>
          <Link href="/#contact-direct" onClick={() => setMenu(false)}>
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
