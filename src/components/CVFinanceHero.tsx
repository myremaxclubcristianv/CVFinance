"use client";

import React from "react";
import { trackEvent } from "@/lib/analytics";

export default function CVFinanceHero() {
  const handlePrimaryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent("hero_primary_cta_click", { location: "cv_finance_hero" });
    document.getElementById("verificare-credit")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSecondaryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent("hero_secondary_cta_click", { location: "cv_finance_hero" });
    document.getElementById("proces")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-eyebrow">CREDIT • FINANȚARE • STRATEGIE</p>
          <h1 className="hero-title">
            Nu lua primul credit care ți se oferă.
            <span className="hero-title-secondary">Găsește varianta care are sens pentru tine.</span>
          </h1>
          <p className="hero-desc">
            Îmi spui ce vrei să faci.
            <br />
            Eu analizez situația, caut opțiunile potrivite și discut cu banca în locul tău.
          </p>
          <div className="hero-actions">
            <a href="#verificare-credit" className="hero-btn-primary" onClick={handlePrimaryClick}>
              VERIFICĂ SITUAȚIA →
            </a>
            <a href="#proces" className="hero-btn-secondary" onClick={handleSecondaryClick}>
              Cum funcționează ↓
            </a>
          </div>
        </div>

        <div className="hero-visual-wrapper">
          <div className="hero-visual-card">
            <div className="visual-header">
              <span className="visual-title">SITUAȚIA TA</span>
              <span className="visual-indicator-dot" />
            </div>
            <div className="visual-body">
              <div className="visual-metric">
                <span className="metric-label">Venit</span>
                <span className="metric-value">7.500 RON</span>
              </div>
              <div className="visual-metric">
                <span className="metric-label">Obligații</span>
                <span className="metric-value">1.200 RON</span>
              </div>
              <div className="visual-metric highlight">
                <span className="metric-label">Finanțare posibilă</span>
                <span className="metric-value emerald">→ analizăm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
