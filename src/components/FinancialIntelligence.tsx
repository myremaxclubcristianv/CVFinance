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

        {/* EDITORIAL RESEARCH TABLE */}
        <div className="fi-table-wrapper">
          <table className="fi-editorial-table">
            <thead>
              <tr>
                <th>ANUL</th>
                <th>DOBÂNDĂ REFERINȚĂ</th>
                <th>RATĂ LUNARĂ ESTIMATĂ</th>
                <th>TOTAL DE RAMBURSAT</th>
                <th>STATUT MARKET</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="year-col">2023</td>
                <td className="rate-col">6,70%</td>
                <td className="monthly-col">~3.430 RON / lună</td>
                <td className="total-col">~1.029.000 RON</td>
                <td><span className="status-pill gray">VÂRF DE DOBÂNDĂ</span></td>
              </tr>
              <tr className="highlight-row">
                <td className="year-col green">2025</td>
                <td className="rate-col green">6,30%</td>
                <td className="monthly-col bold">~3.290 RON / lună</td>
                <td className="total-col bold">~987.000 RON</td>
                <td><span className="status-pill green">CONDIȚII ACTUALE</span></td>
              </tr>
              <tr>
                <td className="year-col">2026</td>
                <td className="rate-col">6,10%</td>
                <td className="monthly-col green">−0,20% referință</td>
                <td className="total-col">—</td>
                <td><span className="status-pill green">TREND DESCENDENT</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* FOOTNOTE */}
        <p className="fi-disclaimer-note">
          * EXEMPLU ORIENTATIV — VALORILE SUNT ILUSTRATIVE PENTRU UN CREDIT IPOTECAR BENCHMARK PE 30 ANI ȘI NU REPREZINTĂ O OFERTĂ DE CREDIT.
        </p>
      </div>
    </section>
  );
}
