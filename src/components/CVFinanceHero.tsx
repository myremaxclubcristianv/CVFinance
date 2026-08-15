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
        <p className="hero-eyebrow">CREDIT ADVISORY & FINANCIAL OPTIMIZATION</p>
        
        <h1 className="hero-title">
          Nu lua primul credit<br />
          care ți se oferă.
          <span className="hero-title-emphasis">
            Găsește varianta care<br />
            are sens pentru tine.
          </span>
        </h1>

        <p className="hero-desc">
          Îmi spui ce vrei să faci. Eu analizez situația, caut opțiunile potrivite și discut cu banca în locul tău.
        </p>

        <div className="hero-actions">
          <a href="#verificare-credit" className="hero-btn-primary" onClick={handlePrimaryClick}>
            VERIFICĂ SITUAȚIA →
          </a>
          <a href="#proces" className="hero-btn-secondary" onClick={handleSecondaryClick}>
            CUM FUNCȚIONEAZĂ
          </a>
        </div>

        {/* SITUAȚIA TA Visual snapshot */}
        <div className="hero-visual-card">
          <h3 className="visual-card-title">SITUAȚIA TA</h3>
          <div className="visual-metrics-grid">
            <div className="visual-metric-item">
              <span className="metric-label">VENIT NET</span>
              <span className="metric-value">7.500 RON</span>
            </div>
            <div className="visual-metric-item">
              <span className="metric-label">GRAD DE ÎNDATORARE</span>
              <span className="metric-value">16%</span>
            </div>
            <div className="visual-metric-item">
              <span className="metric-label">FINANȚARE POSIBILĂ</span>
              <span className="metric-value highlight-emerald">→ analizăm</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
