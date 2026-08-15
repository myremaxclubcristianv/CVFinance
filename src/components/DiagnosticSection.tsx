// @ts-nocheck
import React from 'react';

export default function DiagnosticSection({ diagnosticRows }) {
  return (
    <section className="cv-section" id="diagnostic" style={{ marginBottom: '5rem' }}>
      <div className="cv-container">
        <span className="cv-section-marker">B / DIAGNOSTIC</span>
        <h3 className="cv-section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
          CE VERIFIC ÎNAINTE SĂ TE SUN?
        </h3>
        <div className="cv-diag-table">
          {diagnosticRows.map((row) => (
            <div key={row.code} className="cv-diag-row">
              <span className="cv-diag-code">{row.code}</span>
              <span className="cv-diag-name">{row.name}</span>
              <span className="cv-diag-desc">{row.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
