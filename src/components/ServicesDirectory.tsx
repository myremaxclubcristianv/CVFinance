// @ts-nocheck
import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ServicesDirectory({ servicesList }) {
  return (
    <section className="cv-section" id="servicii">
      <div className="cv-container">
        <span className="cv-section-marker">05 / SERVICII</span>
        <div className="cv-section-header">
          <h2 className="cv-section-title">SERVICII FINANCIARE</h2>
          <p className="cv-section-sub">Consultanță financiară specializată, structurată pe obiective clare.</p>
        </div>
        <div className="cv-directory-list">
          {servicesList.map((svc) => (
            <div key={svc.code} className="cv-dir-row">
              <span className="cv-dir-code">{svc.code}</span>
              <span className="cv-dir-title">{svc.title}</span>
              <span className="cv-dir-desc">{svc.desc}</span>
              <ArrowRight size={18} className="cv-dir-arrow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
