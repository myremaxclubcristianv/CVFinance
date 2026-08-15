"use client";

import React from "react";

export default function FinancialIntelligence() {
  return (
    <section className="fi-terminal-section" id="financial-intelligence">
      <div className="fi-terminal-container">
        {/* HEADER */}
        <div className="fi-terminal-header">
          <p className="fi-eyebrow">05 / FINANCIAL INTELLIGENCE</p>
          <h2 className="fi-title">COSTUL BANILOR SE SCHIMBĂ.</h2>
          <p className="fi-subtitle">
            BENCHMARK ROMÂNIA · EXECUTIV MORTGAGE DATASET (SURSA: BNR & DATE DE PIAȚĂ)
          </p>
        </div>

        {/* DATA RESEARCH TERMINAL GRID */}
        <div className="fi-dataset-grid">
          {/* 2023 COL */}
          <div className="fi-data-card fi-card-past">
            <div className="fi-year-badge">2023</div>
            <div className="fi-stat-main">6,70%</div>
            <div className="fi-stat-sub">
              Rată estimată: <strong>~3.430 RON / lună</strong>
            </div>
            <div className="fi-stat-sub">
              Total plătit: <strong>~1.029.000 RON</strong>
            </div>
            <span className="fi-meta-tag">VÂRF DE DOBÂNDĂ</span>
          </div>

          {/* 2025 COL (ACTIVE BENCHMARK) */}
          <div className="fi-data-card fi-card-current">
            <div className="fi-year-badge active">2025</div>
            <div className="fi-stat-main active">6,30%</div>
            <div className="fi-stat-sub">
              Rată estimată: <strong style={{ color: "#0F172A" }}>~3.290 RON / lună</strong>
            </div>
            <div className="fi-stat-sub">
              Total plătit: <strong style={{ color: "#0F172A" }}>~987.000 RON</strong>
            </div>
            <span className="fi-meta-tag active">CONDIȚII ACTUALE</span>
          </div>

          {/* 2026 COL */}
          <div className="fi-data-card fi-card-future">
            <div className="fi-year-badge">2026</div>
            <div className="fi-stat-main">6,10%</div>
            <div className="fi-stat-sub green">
              Tendință: <strong>−0,20% referință</strong>
            </div>
            <div className="fi-stat-sub">
              Evoluție prognozată dobânzi fixe
            </div>
            <span className="fi-meta-tag">TREND DESCENDENT</span>
          </div>
        </div>

        {/* INSTITUTIONAL FOOTNOTE */}
        <p className="fi-disclaimer-note">
          * EXEMPLU ORIENTATIV — VALORILE SUNT ILUSTRATIVE PENTRU UN CREDIT IPOTECAR BENCHMARK PE 30 ANI ȘI NU REPREZINTĂ O OFERTĂ DE CREDIT.
        </p>
      </div>
    </section>
  );
}
