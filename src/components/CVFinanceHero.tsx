"use client";

import React from "react";
import { trackEvent } from "@/lib/analytics";

export default function CVFinanceHero() {
  const handlePrimaryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent("hero_primary_cta_click", { location: "cv_finance_hero" });
    const target = document.getElementById("verificare-credit") || document.getElementById("aplica");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSecondaryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent("hero_secondary_cta_click", { location: "cv_finance_hero" });
    document.getElementById("cum-functioneaza")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="cv-hero-section" id="hero">
      <div className="cv-section-inner cv-hero-grid">
        {/* LEFT COLUMN: EDITORIAL STATEMENT & ACTIONS */}
        <div className="cv-hero-left">
          <span className="cv-eyebrow">
            CREDIT ADVISORY &amp; FINANCIAL OPTIMIZATION
          </span>

          <h1 className="cv-hero-title">
            Nu lua primul credit<br />
            care ți se oferă.<br />
            <span className="emerald-accent">Găsește varianta care<br />
            are sens pentru tine.</span>
          </h1>

          <p className="cv-hero-desc">
            Îmi spui ce vrei să faci. Eu analizez situația, caut opțiunile potrivite și discut cu banca în locul tău.
          </p>

          <div className="cv-hero-actions">
            <a href="#verificare-credit" className="cv-btn-primary" onClick={handlePrimaryClick}>
              VERIFICĂ SITUAȚIA →
            </a>
            <a href="#cum-functioneaza" className="cv-btn-secondary" onClick={handleSecondaryClick}>
              CUM FUNCȚIONEAZĂ
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: INSTITUTIONAL STATEMENT READOUT */}
        <div className="cv-hero-right">
          <div className="cv-readout-panel">
            <div className="cv-readout-title">
              <span>SITUAȚIA TA</span>
              <span className="technical-badge">STATEMENT READOUT</span>
            </div>

            <div className="cv-readout-rows">
              <div className="cv-readout-row">
                <span className="cv-readout-label">VENIT NET</span>
                <span className="cv-readout-value">12.500 lei</span>
              </div>
              <div className="cv-readout-row">
                <span className="cv-readout-label">GRAD DE ÎNDATORARE</span>
                <span className="cv-readout-value">35 %</span>
              </div>
              <div className="cv-readout-row">
                <span className="cv-readout-label">FINANȚARE POSIBILĂ</span>
                <span className="cv-readout-value emerald">≈ 300.000 lei</span>
              </div>
            </div>

            <div className="cv-readout-disclaimer">
              EXEMPLU ORIENTATIV
            </div>

            <div className="cv-readout-footer">
              • ANALIZĂ 100% CONFIDENȚIALĂ<br />
              • FĂRĂ AFECTARE SCOR FICO
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
