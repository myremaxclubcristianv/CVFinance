"use client";

import React from "react";
import { ArrowRight, MessageCircle, TrendingDown, ShieldCheck } from "lucide-react";
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
        {/* ASYMMETRIC 2-COLUMN LAYOUT */}
        <div className="cv-hero-grid">
          {/* LEFT COLUMN: EDITORIAL HEADLINE & CONTENT */}
          <div className="cv-hero-left">
            <div className="cv-hero-meta-bar">
              <span className="cv-hero-badge">01 / CV FINANCE</span>
              <span className="cv-hero-meta-item">CREDIT ADVISORY · PRIVATE CLIENT</span>
            </div>

            <h1 className="cv-hero-title">
              FINANȚARE.<br />
              CLARĂ.<br />
              <span className="emerald">STRATEGICĂ.</span>
            </h1>

            <p className="cv-hero-copy">
              Nu alegem un credit înainte să înțelegem situația ta financiară. Analizăm profilul, contextul și obiectivul tău pentru a identifica variantele optime din piață.
            </p>

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
                <MessageCircle size={18} style={{ color: "#087F5B" }} />
                <span>Discută direct →</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: INSTITUTIONAL FINANCIAL ANCHOR BLOCK */}
          <div className="cv-hero-right">
            <div className="cv-hero-anchor-card">
              <div className="anchor-header">
                <ShieldCheck size={18} style={{ color: "#087F5B" }} />
                <span>BENCHMARK IPOTECAR 2025–2026</span>
              </div>
              <div className="anchor-metric">
                <span className="metric-val">6,10%</span>
                <span className="metric-tag">TENDINȚĂ REFERINȚĂ</span>
              </div>
              <div className="anchor-rows">
                <div className="anchor-row">
                  <span className="row-label">2023 VÂRF</span>
                  <span className="row-val">6,70% (~3.430 RON)</span>
                </div>
                <div className="anchor-row">
                  <span className="row-label">2025 ACTUAL</span>
                  <span className="row-val active">6,30% (~3.290 RON)</span>
                </div>
                <div className="anchor-row">
                  <span className="row-label">TENDINȚĂ 2026</span>
                  <span className="row-val green">−0,20% referință</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM FINANCIAL DATA STRIP */}
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
