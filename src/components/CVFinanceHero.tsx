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
    <section className="cv-hero-section" id="hero" style={{ borderBottom: "1px solid var(--border)", backgroundColor: "#FFFFFF" }}>
      <div className="cv-container cv-hero-grid">
        {/* LEFT COLUMN: EDITORIAL STATEMENT & ACTIONS */}
        <div className="cv-hero-left">
          <span className="cv-eyebrow" style={{ fontSize: "0.72rem", color: "#5F6368", letterSpacing: "0.1em", fontWeight: 700 }}>
            CREDIT ADVISORY & FINANCIAL OPTIMIZATION
          </span>
          
          <h1 className="cv-hero-title" style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 800, color: "#111111", letterSpacing: "-0.03em", lineHeight: "1.15", margin: "1rem 0 1.5rem" }}>
            Nu lua primul credit<br />
            care ți se oferă.<br />
            <span style={{ color: "#087F5B" }}>Găsește varianta care<br />
            are sens pentru tine.</span>
          </h1>

          <p className="cv-hero-desc" style={{ fontSize: "1.125rem", color: "#5F6368", lineHeight: "1.6", marginBottom: "2.25rem", maxWidth: "540px" }}>
            Îmi spui ce vrei să faci. Eu analizez situația, caut opțiunile potrivite și discut cu banca în locul tău.
          </p>

          <div className="cv-hero-actions" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <a href="#verificare-credit" className="cv-btn-primary" style={{ padding: "0.9rem 2.25rem", height: "52px", display: "inline-flex", alignItems: "center", borderRadius: "4px", backgroundColor: "#087F5B", color: "#FFFFFF", fontWeight: 700, border: "none" }} onClick={handlePrimaryClick}>
              VERIFICĂ SITUAȚIA →
            </a>
            <a href="#cum-functioneaza" className="cv-btn-secondary" style={{ padding: "0.9rem 2.25rem", height: "52px", display: "inline-flex", alignItems: "center", borderRadius: "4px", border: "1px solid #111111", color: "#111111", fontWeight: 700, background: "none" }} onClick={handleSecondaryClick}>
              CUM FUNCȚIONEAZĂ
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: INSTITUTIONAL STATEMENT READOUT */}
        <div className="cv-hero-right">
          <div className="cv-readout-panel" style={{ borderLeft: "none", borderRight: "none", borderTop: "1px solid #E4E8E6", borderBottom: "1px solid #E4E8E6", background: "none", padding: "2rem 0", borderRadius: 0 }}>
            <div className="cv-readout-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#111111", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "1.5rem" }}>
              <span>SITUAȚIA TA</span>
              <span style={{ color: "#5F6368", fontWeight: 500 }}>STATEMENT READOUT</span>
            </div>

            <div className="cv-readout-rows" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="cv-readout-row" style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.85rem", borderBottom: "1px dashed #E4E8E6" }}>
                <span className="cv-readout-label" style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "#5F6368", fontWeight: 600 }}>VENIT NET</span>
                <span className="cv-readout-value" style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", color: "#111111", fontWeight: 700 }}>—</span>
              </div>
              <div className="cv-readout-row" style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.85rem", borderBottom: "1px dashed #E4E8E6" }}>
                <span className="cv-readout-label" style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "#5F6368", fontWeight: 600 }}>GRAD DE ÎNDATORARE</span>
                <span className="cv-readout-value" style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", color: "#111111", fontWeight: 700 }}>—</span>
              </div>
              <div className="cv-readout-row" style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.85rem" }}>
                <span className="cv-readout-label" style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "#5F6368", fontWeight: 600 }}>FINANȚARE POSIBILĂ</span>
                <span className="cv-readout-value emerald" style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", color: "#087F5B", fontWeight: 700 }}>—</span>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid #E4E8E6", fontSize: "0.72rem", color: "#5F6368", fontFamily: "var(--font-mono)", letterSpacing: "0.02em" }}>
              • ANALIZĂ 100% CONFIDENȚIALĂ<br />
              • FĂRĂ AFECTARE SCOR FICO
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
