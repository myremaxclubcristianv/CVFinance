import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, Bell } from "lucide-react";

export const metadata: Metadata = {
  title: "Acord Comunicări Comerciale & Marketing | CV Finance",
  description:
    "Informații privind acordul opțional pentru primirea de comunicări comerciale, oferte financiare și noutăți de la CV Finance.",
  alternates: { canonical: "/acord-marketing" },
  robots: { index: true, follow: true },
};

export default function AcordMarketingPage() {
  return (
    <main className="cv-legal-main">
      <div className="cv-legal-container">
        {/* Page Hero */}
        <div className="cv-legal-header">
          <span className="cv-legal-eyebrow">
            LEGAL / COMUNICĂRI COMERCIALE
          </span>
          <h1 className="cv-legal-title">Acord Comunicări Comerciale</h1>
          <p className="cv-legal-sub">
            Informații transparente privind abonarea opțională la noutăți și oferte financiare.
          </p>
          <div className="cv-legal-meta">
            <span>ULTIMA ACTUALIZARE: 6 AUGUST 2026</span>
            <span>VERSIUNE: 1.0</span>
          </div>
        </div>

        <article className="cv-legal-article">
          {/* Important Callout */}
          <div className="cv-legal-callout">
            <div className="cv-legal-callout-title">NOTĂ IMPORTANTĂ</div>
            <p className="cv-legal-callout-text">
              Acordul de marketing este <strong>100% opțional</strong>. Bifarea căsuței de comunicări comerciale nu este obligatorie pentru a primi analiza financiară gratuită. Puteți solicita analiza gratuită fără a vă abona la noutăți.
            </p>
          </div>

          {/* Section 01 */}
          <section className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">01</span>
              <h2 className="cv-legal-heading">Ce fel de materiale puteți primi dacă acceptați</h2>
            </div>
            <p className="cv-legal-text">
              Comunicările noastre au caracter strict informativ și de optimizare a costurilor de creditare:
            </p>
            <div className="cv-legal-grid">
              <div className="cv-legal-card emerald">
                <div className="cv-legal-card-header">
                  <div className="cv-legal-card-icon">
                    <Sparkles size={18} />
                  </div>
                  <h3 className="cv-legal-card-title">Informații și ghiduri financiare</h3>
                </div>
                <p className="cv-legal-card-desc">
                  Sfaturi practice pentru reducerea ratelor, optimizarea datoriilor și gestionarea eficientă a creditelor.
                </p>
              </div>

              <div className="cv-legal-card emerald">
                <div className="cv-legal-card-header">
                  <div className="cv-legal-card-icon">
                    <Bell size={18} />
                  </div>
                  <h3 className="cv-legal-card-title">Oferte promoționale de la bănci</h3>
                </div>
                <p className="cv-legal-card-desc">
                  Notificări privind reduceri de dobândă sau campanii speciale derulate de bănci partenere.
                </p>
              </div>
            </div>
          </section>

          {/* Section 02 */}
          <section className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">02</span>
              <h2 className="cv-legal-heading">Cum vă puteți dezabona</h2>
            </div>
            <p className="cv-legal-text">
              Vă puteți retrage consimțământul de marketing în orice moment, fără niciun cost. Aveți la dispoziție următoarele modalități simple:
            </p>
            <ul className="cv-legal-list">
              <li className="cv-legal-list-item">
                Faceți clic pe linkul de dezabonare din subsolul oricărui email primit de la noi.
              </li>
              <li className="cv-legal-list-item">
                Trimiteți un email cu subiectul &bdquo;Dezabonare&rdquo; către adresa noastră oficială de contact.
              </li>
            </ul>
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

