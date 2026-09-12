"use client";

import React from "react";

export default function FinancialIntelligence() {
  return (
    <section className="cv-section" id="financial-intelligence">
      <div className="cv-container">
        <span className="cv-section-marker">09 / FINANCIAL INTELLIGENCE</span>
        <div className="cv-section-header">
          <h2 className="cv-section-title">CE SE ÎNTÂMPLĂ ÎN PIAȚĂ?</h2>
          <p className="cv-section-sub">
            Dobânzile și condițiile de creditare se modifică în permanență. Analizăm contextul financiar pentru ca tu să iei o decizie informată.
          </p>
        </div>

        <div className="cv-terminal-box">
          <div className="cv-terminal-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <span>MARKET ADVISORY MONITOR — SNAPSHOT BNR</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Sursă: BNR · Actualizare periodică</span>
          </div>

          <div className="cv-terminal-metrics">
            <div>
              <div className="cv-term-metric-val">6.50%</div>
              <div className="cv-term-metric-lbl">DOBÂNDĂ BNR</div>
            </div>
            <div>
              <div className="cv-term-metric-val emerald">5.86%</div>
              <div className="cv-term-metric-lbl">INDICE IRCC</div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1.25rem", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
            <div>
              <span>IRCC:</span> <strong style={{ color: "var(--text-primary)" }}>5.86%</strong>
            </div>
            <div>
              <span>ROBOR 3M:</span> <strong style={{ color: "var(--text-primary)" }}>5.58%</strong>
            </div>
            <div>
              <span>RATA BNR:</span> <strong style={{ color: "var(--text-primary)" }}>6.50%</strong>
            </div>
            <div>
              <span>GRAD MAX ÎNDATORARE:</span> <strong style={{ color: "var(--text-primary)" }}>40% - 45%</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
