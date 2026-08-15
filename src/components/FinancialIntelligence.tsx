"use client";

import React from "react";

export default function FinancialIntelligence() {
  return (
    <section className="fi-section" id="financial-intelligence">
      <div className="fi-container">
        <h2 className="fi-title">Ce se întâmplă în piață?</h2>

        <div className="fi-grid">
          <div className="fi-card">
            <span className="fi-value">6,10%</span>
            <span className="fi-label">REFERINȚĂ 2026</span>
          </div>
          <div className="fi-card">
            <span className="fi-value emerald">−0,20%</span>
            <span className="fi-label">EVOLUȚIE</span>
          </div>
        </div>

        <p className="fi-lead-text">
          Dobânzile se schimbă. O ofertă bună pentru altcineva nu înseamnă automat că este bună și pentru tine.
        </p>
      </div>
    </section>
  );
}
