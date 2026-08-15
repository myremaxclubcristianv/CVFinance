"use client";

import React from "react";

const TICKER_ITEMS = [
  "CV FINANCE",
  "CREDIT CONSULTING",
  "CREDIT IPOTECAR",
  "REFINANȚARE",
  "CREDIT PERSONAL",
  "CREDIT BUSINESS",
  "ANALIZĂ FINANCIARĂ",
  "FINANCIAL OPTIMIZATION",
  "RECOMANDĂ UN CLIENT",
  "INSURANCE",
  "REAL ESTATE",
  "INVESTMENTS",
];

export default function LiveServicesTicker() {
  const renderItemsGroup = (isAriaHidden = false) => (
    <div
      className="cv-ticker-content"
      {...(isAriaHidden ? { "aria-hidden": "true" } : {})}
    >
      {TICKER_ITEMS.map((item, idx) => (
        <span key={`${item}-${idx}`} className="cv-ticker-item">
          {idx === 0 && (
            <span className="cv-ticker-live">
              <span className="cv-ticker-live-dot" aria-hidden="true" />
              LIVE
            </span>
          )}
          <span>{item}</span>
          <span className="cv-ticker-dot" aria-hidden="true">
            •
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <aside
      className="cv-ticker-wrapper"
      aria-label="Servicii și Actualizări Financiare CV Finance"
    >
      <div className="cv-ticker-track">
        {renderItemsGroup(false)}
        {renderItemsGroup(true)}
      </div>
    </aside>
  );
}
