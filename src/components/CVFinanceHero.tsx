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
      <div className="cv-container cv-hero-grid">
        <div className="cv-hero-left">
          <span className="cv-eyebrow">
            CV FINANCE / CREDIT ADVISORY / 2026
          </span>

          <h1 className="cv-hero-title cv-serif">
            NU LUA PRIMUL CREDIT.<br />
            ÎNȚELEGE CE POȚI OBȚINE.
            <br />
            <span className="emerald-accent cv-mono">
              GĂSEȘTE VARIANTA CARE ARE SENS PENTRU TINE.
            </span>
          </h1>

          <p className="cv-hero-desc cv-mono">
            Îmi spui ce vrei să faci. Eu analizez situația, găsesc opțiunile potrivite și discut cu banca în locul tău.
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

        <div className="cv-hero-right">
          <div className="cv-readout-panel">
            <div className="cv-readout-title">
              <span>SITUAȚIA TA</span>
              <span className="technical-badge">STATEMENT READOUT</span>
            </div>
            <div className="cv-readout-rows">
              <div className="cv-readout-row">
                <span className="cv-readout-label cv-mono">VENIT NET</span>
                <span className="cv-readout-value cv-mono">— — — lei</span>
              </div>
              <div className="cv-readout-row">
                <span className="cv-readout-label cv-mono">GRAD DE ÎNDATORARE</span>
                <span className="cv-readout-value cv-mono">— — %</span>
              </div>
              <div className="cv-readout-row">
                <span className="cv-readout-label cv-mono">FINANȚARE POSIBILĂ</span>
                <span className="cv-readout-value cv-mono emerald">— — — lei</span>
              </div>
            </div>
            <div className="cv-readout-footer cv-mono">
              • ANALIZĂ 100% CONFIDENȚIALĂ<br />
              • FĂRĂ AFECTARE SCOR FICO
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
