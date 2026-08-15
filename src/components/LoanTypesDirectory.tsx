// @ts-nocheck
import React from 'react';

export default function LoanTypesDirectory({ loanTypesList }) {
  return (
    <section className="cv-section" id="tipuri-credite">
      <div className="cv-container">
        <span className="cv-section-marker">06 / TIPURI DE CREDITE</span>
        <div className="cv-section-header">
          <h2 className="cv-section-title">SOLUȚII ADAPTATE SITUAȚIEI TALE</h2>
          <p className="cv-section-sub">Structurăm soluția potrivită în funcție de destinația fondurilor.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
          {loanTypesList.map((item) => (
            <div key={item.code} style={{ borderTop: "2px solid #E4E8E6", paddingTop: "1.25rem" }}>
              <span className="cv-mono" style={{ color: "#087F5B", fontWeight: 700, fontSize: "0.85rem" }}>{item.code}</span>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0.5rem 0" }}>{item.title}</h3>
              <p style={{ fontSize: "0.92rem", color: "#5F6368" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
