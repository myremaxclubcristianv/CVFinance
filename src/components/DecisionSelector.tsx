import React from 'react';

export default function DecisionSelector() {
  return (
    <section className="cv-section" id="cum-functioneaza">
      <div className="cv-container">
        <span className="cv-section-marker">02 / CUM LUCRĂM</span>
        <h2 className="cv-section-title">
          EU TE SUN.<br />
          <span style={{ color: "#087F5B" }}>BANCA NU.</span>
        </h2>
        <div className="cv-process-grid">
          <div className="cv-process-item active">
            <span className="cv-process-num">01</span>
            <h3 className="cv-process-title">Tu vorbești cu mine.</h3>
            <p className="cv-process-desc">Îmi spui ce vrei să faci și care este situația ta actuală.</p>
          </div>
          <div className="cv-process-item">
            <span className="cv-process-num">02</span>
            <h3 className="cv-process-title">Eu analizez situația.</h3>
            <p className="cv-process-desc">Mă uit la venituri, obligații, istoricul de credit și obiectiv.</p>
          </div>
          <div className="cv-process-item">
            <span className="cv-process-num">03</span>
            <h3 className="cv-process-title">Eu discut cu banca.</h3>
            <p className="cv-process-desc">Caut varianta potrivită și negociez condițiile în locul tău.</p>
          </div>
          <div className="cv-process-item">
            <span className="cv-process-num">04</span>
            <h3 className="cv-process-title">Tu primești răspunsul.</h3>
            <p className="cv-process-desc">Știi exact unde te încadrezi și ce opțiuni ai fără drumuri inutile.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
