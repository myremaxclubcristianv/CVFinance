"use client";

import React from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { CONTACT } from "@/lib/constants";

export default function CVFinanceHero() {
  const handlePrimaryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent("hero_primary_cta_click", { location: "cv_finance_hero" });
    document.getElementById("verificare-credit")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWhatsappClick = () => {
    trackEvent("hero_whatsapp_click", { location: "cv_finance_hero" });
  };

  return (
    <section className="cv-hero-section">
      <div className="cv-hero-container">
        {/* TOP METADATA BAR */}
        <div className="cv-hero-meta-bar">
          <span className="cv-hero-badge">01 / CV FINANCE</span>
          <span className="cv-hero-meta-item">CREDIT ADVISORY · PRIVATE CLIENT · ROMÂNIA</span>
        </div>

        {/* EDITORIAL DISPLAY HEADLINE */}
        <h1 className="cv-hero-title">
          FINANȚARE.<br />
          CLARĂ.<br />
          <span className="emerald">STRATEGICĂ.</span>
        </h1>

        {/* EDITORIAL MEASURE BODY COPY */}
        <p className="cv-hero-copy">
          Nu alegem un credit înainte să înțelegem situația ta financiară. Analizăm istoricul de credit, veniturile, gradul de îndatorare și obiectivele înainte de a recomanda o strategie de finanțare.
        </p>

        {/* CTA BUTTON SYSTEM */}
        <div className="cv-hero-cta-group">
          <a
            href="#verificare-credit"
            className="cv-hero-primary-btn"
            onClick={handlePrimaryClick}
          >
            <span>VERIFICĂ SITUAȚIA →</span>
          </a>

          <a
            href={`https://wa.me/${CONTACT.WHATSAPP}?text=${encodeURIComponent("Bună ziua, doresc o analiză a situației mele financiare.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cv-hero-secondary-link"
            onClick={handleWhatsappClick}
          >
            <MessageCircle size={18} style={{ color: "#34D399" }} />
            <span>Discută direct →</span>
          </a>
        </div>

        {/* FINANCIAL DATA ANCHOR STRIP */}
        <div className="cv-hero-data-strip">
          <div className="cv-data-cell">
            <span className="cv-data-label">ANALIZĂ PREALABILĂ</span>
            <span className="cv-data-val">FĂRĂ COSTURI</span>
          </div>
          <div className="cv-data-cell">
            <span className="cv-data-label">SIMULARE INTERNET</span>
            <span className="cv-data-val">OFFICIAL DATA</span>
          </div>
          <div className="cv-data-cell">
            <span className="cv-data-label">OPTIMIZARE RATĂ</span>
            <span className="cv-data-val">BENCHMARK 2025</span>
          </div>
        </div>
      </div>
    </section>
  );
}
