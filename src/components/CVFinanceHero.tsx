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
    <section className="hero-section" id="hero">
      <div className="hero-container hero-split-layout">
        <div className="hero-left-col">
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
            <a href="#cum-functioneaza" className="hero-btn-secondary" onClick={handleSecondaryClick}>
              CUM FUNCȚIONEAZĂ
            </a>
          </div>
        </div>

        <div className="hero-right-col">
          <div className="hero-snapshot-panel">
            <h3 className="snapshot-title">SITUAȚIA TA</h3>
            <div className="snapshot-divider" />
            <div className="snapshot-rows">
              <div className="snapshot-row">
                <span className="snapshot-label">VENIT NET</span>
                <span className="snapshot-value">—</span>
              </div>
              <div className="snapshot-row">
                <span className="snapshot-label">GRAD DE ÎNDATORARE</span>
                <span className="snapshot-value">—</span>
              </div>
              <div className="snapshot-row">
                <span className="snapshot-label">FINANȚARE POSIBILĂ</span>
                <span className="snapshot-value highlight-emerald">—</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

