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
          <div className="cv-terminal-header">
            <span>MARKET ADVISORY TERMINAL — REAL TIME MONITOR</span>
          </div>

          <div className="cv-terminal-metrics">
            <div>
              <div className="cv-term-metric-val">6,10%</div>
              <div className="cv-term-metric-lbl">REFERINȚĂ 2026</div>
            </div>
            <div>
              <div className="cv-term-metric-val emerald">−0,20%</div>
              <div className="cv-term-metric-lbl">EVOLUȚIE</div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #333333", paddingTop: "1.25rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1.25rem", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#A1A1AA" }}>
            <div>
              <span style={{ color: "#71717A" }}>IRCC ACTUAL:</span> <strong style={{ color: "#FFFFFF" }}>5.99%</strong>
            </div>
            <div>
              <span style={{ color: "#71717A" }}>ROBOR 3M:</span> <strong style={{ color: "#FFFFFF" }}>5.82%</strong>
            </div>
            <div>
              <span style={{ color: "#71717A" }}>MARJĂ MEDIE BĂNCI:</span> <strong style={{ color: "#FFFFFF" }}>2.10%</strong>
            </div>
            <div>
              <span style={{ color: "#71717A" }}>GRAD MAX ÎNDATORARE:</span> <strong style={{ color: "#FFFFFF" }}>40% NET</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
