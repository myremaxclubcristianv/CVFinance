import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Notă Legală & Disclaimer | CV Finance",
  description:
    "Notă legală și responsabilități financiare ale platformei CV Finance. Află ce facem și ce nu facem în calitatea noastră de consultanți.",
  alternates: { canonical: "/nota-legala" },
  robots: { index: true, follow: true },
};

export default function NotaLegala() {
  return (
    <main className="cv-legal-main">
      <div className="cv-legal-container">
        {/* Page Hero */}
        <div className="cv-legal-header">
          <span className="cv-legal-eyebrow">
            LEGAL / TRANSPARENȚĂ &amp; DISCLAIMER
          </span>
          <h1 className="cv-legal-title">Notă Legală &amp; Disclaimer</h1>
          <p className="cv-legal-sub">
            Clarificarea rolului de consultant financiar independent și limitele de responsabilitate.
          </p>
          <div className="cv-legal-meta">
            <span>ULTIMA ACTUALIZARE: 6 AUGUST 2026</span>
            <span>TRANSPARENȚĂ FINANCIARĂ</span>
          </div>
        </div>

        <article className="cv-legal-article">
          {/* Section 01: Scope of Services */}
          <section className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">01</span>
              <h2 className="cv-legal-heading">Rolul și Atribuțiile Noastre</h2>
            </div>
            <div className="cv-legal-grid">
              <div className="cv-legal-card danger">
                <div className="cv-legal-card-header">
                  <div className="cv-legal-card-icon">
                    <X size={18} />
                  </div>
                  <h3 className="cv-legal-card-title">Ce NU face CV Finance:</h3>
                </div>
                <ul className="cv-legal-list" style={{ margin: "0.5rem 0 0 0" }}>
                  <li className="cv-legal-list-item">Nu aprobă credite direct în nume propriu</li>
                  <li className="cv-legal-list-item">Nu acordă împrumuturi sau fonduri din surse financiare proprii</li>
                  <li className="cv-legal-list-item">Nu garantează aprobarea automată a niciunei solicitări</li>
                  <li className="cv-legal-list-item">Nu modifică deciziile interne de risc ale băncilor partenere</li>
                </ul>
              </div>

              <div className="cv-legal-card emerald">
                <div className="cv-legal-card-header">
                  <div className="cv-legal-card-icon">
                    <Check size={18} />
                  </div>
                  <h3 className="cv-legal-card-title">Ce FACE CV Finance:</h3>
                </div>
                <ul className="cv-legal-list" style={{ margin: "0.5rem 0 0 0" }}>
                  <li className="cv-legal-list-item">Analizează gratuit și independent situația ta financiară</li>
                  <li className="cv-legal-list-item">Compară ofertele de finanțare de la peste 20 de instituții bancare</li>
                  <li className="cv-legal-list-item">Oferă ghidaj și consultanță financiară personalizată fiecărui caz</li>
                  <li className="cv-legal-list-item">Conectează dosarul tău cu banca potrivită profilului tău de risc</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 02: Risks */}
          <section className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">02</span>
              <h2 className="cv-legal-heading">Disclaimer privind riscurile financiare</h2>
            </div>
            <div className="cv-legal-callout">
              <div className="cv-legal-callout-title">AVERTISMENT PRIVIND RISCURILE</div>
              <p className="cv-legal-callout-text">
                &ldquo;Orice decizie financiară de creditare sau refinanțare trebuie luată exclusiv după analiza atentă a bugetului personal și a capacității reale de rambursare.&rdquo;
              </p>
            </div>
            <p className="cv-legal-text">
              Contractarea unui credit bancar sau refinanțarea unor datorii implică obligații ferme de plată pe termen mediu și lung. Vă recomandăm să evaluați cu prudență stabilitatea veniturilor și variațiile posibile ale dobânzilor de referință (IRCC / ROBOR) înainte de semnarea oricărui contract de creditare.
            </p>
          </section>

          {/* Section 03: Commissions & Independence */}
          <section className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">03</span>
              <h2 className="cv-legal-heading">Independență și Comisioane</h2>
            </div>
            <p className="cv-legal-text">
              Analiza financiară inițială oferită de CV Finance este <strong>100% gratuită</strong> pentru utilizator. CV Finance nu percepe niciun fel de comision direct, taxă ascunsă sau plată în avans de la solicitanți pentru efectuarea evaluării preliminare și intermedierea dialogului cu băncile partenere.
            </p>
          </section>
        </article>

        {/* Back Link */}
        <div className="cv-legal-back-row">
          <Link href="/" className="cv-legal-back-link">
            <ArrowLeft size={16} /> Înapoi la pagina principală
          </Link>
          <span className="cv-legal-meta">CV Finance — Toate drepturile rezervate</span>
        </div>
      </div>
    </main>
  );
}

