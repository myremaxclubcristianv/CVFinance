import React from 'react';

export default function ResultsSection() {
  return (
    <section className="cv-section" id="rezultate">
      <div className="cv-container">
        <span className="cv-section-marker">08 / REZULTATE</span>
        <div className="cv-section-header">
          <h2 className="cv-section-title">CE CÂȘTIGI?</h2>
          <p className="cv-section-sub">Valoarea adăugată a unei consultanțe financiare independente.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>
          <div style={{ borderTop: "2px solid #E4E8E6", paddingTop: "1.25rem" }}>
            <span className="cv-mono" style={{ color: "#087F5B", fontWeight: 700 }}>01</span>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0.5rem 0" }}>CLARITATE</h3>
            <p style={{ fontSize: "0.92rem", color: "#5F6368" }}>Știi exact unde te încadrezi și ce opțiuni ai.</p>
          </div>
          <div style={{ borderTop: "2px solid #E4E8E6", paddingTop: "1.25rem" }}>
            <span className="cv-mono" style={{ color: "#087F5B", fontWeight: 700 }}>02</span>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0.5rem 0" }}>OPȚIUNI</h3>
            <p style={{ fontSize: "0.92rem", color: "#5F6368" }}>Nu depinzi de oferta unei singure bănci.</p>
          </div>
          <div style={{ borderTop: "2px solid #E4E8E6", paddingTop: "1.25rem" }}>
            <span className="cv-mono" style={{ color: "#087F5B", fontWeight: 700 }}>03</span>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0.5rem 0" }}>TIMP</h3>
            <p style={{ fontSize: "0.92rem", color: "#5F6368" }}>Nu pierzi zile întregi făcând drumuri între bănci.</p>
          </div>
          <div style={{ borderTop: "2px solid #E4E8E6", paddingTop: "1.25rem" }}>
            <span className="cv-mono" style={{ color: "#087F5B", fontWeight: 700 }}>04</span>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0.5rem 0" }}>NEGOCIERE</h3>
            <p style={{ fontSize: "0.92rem", color: "#5F6368" }}>Ai un reprezentant dedicat care discută cu banca.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
