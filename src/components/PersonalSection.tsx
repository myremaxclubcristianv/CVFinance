import React from 'react';

export default function PersonalSection() {
  return (
    <section className="cv-section" id="personal" style={{ marginBottom: '5rem' }}>
      <div className="cv-container">
        <span className="cv-section-marker">02 / PERSONAL</span>
        <div className="cv-section-header">
          <h2 className="cv-section-title" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: '1.5rem' }}>
            HAI SĂ VEDEM<br />CE POȚI OBȚINE.
          </h2>
          <p className="cv-section-sub">
            Fiecare profil financiar este diferit. Analizăm în detaliu posibilitățile reale de finanțare înainte de a înainta vreun dosar.
          </p>
        </div>
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div style={{ borderTop: "2px solid var(--border)", paddingTop: "1.25rem" }}>
            <span className="cv-mono" style={{ color: "#087F5B", fontWeight: 700, fontSize: "0.85rem" }}>01</span>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0.5rem 0 0.25rem" }}>Îți analizez situația</h3>
            <p style={{ fontSize: "0.9rem", color: "#5F6368", lineHeight: "1.45" }}>Verificăm posibilitățile de încadrare și gradul de îndatorare.</p>
          </div>
          <div style={{ borderTop: "2px solid var(--border)", paddingTop: "1.25rem" }}>
            <span className="cv-mono" style={{ color: "#087F5B", fontWeight: 700, fontSize: "0.85rem" }}>02</span>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0.5rem 0 0.25rem" }}>Îți arăt opțiunile</h3>
            <p style={{ fontSize: "0.9rem", color: "#5F6368", lineHeight: "1.45" }}>Comparăm produsele bancare disponibile și structura ratelor.</p>
          </div>
          <div style={{ borderTop: "2px solid var(--border)", paddingTop: "1.25rem" }}>
            <span className="cv-mono" style={{ color: "#087F5B", fontWeight: 700, fontSize: "0.85rem" }}>03</span>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0.5rem 0 0.25rem" }}>Discut cu banca</h3>
            <p style={{ fontSize: "0.9rem", color: "#5F6368", lineHeight: "1.45" }}>Preluăm comunicarea și susținem dosarul în fața creditorului.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
