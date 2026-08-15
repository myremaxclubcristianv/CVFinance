import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, CheckCircle2, KeyRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Protecția Datelor GDPR Explicată Simplu | CV Finance",
  description:
    "Află cum îți protejăm datele la CV Finance. Ghid simplu și clar privind securitatea, cookie-urile și confidențialitatea datelor tale.",
  alternates: { canonical: "/gdpr" },
  robots: { index: true, follow: true },
};

export default function GDPRPage() {
  return (
    <main className="cv-legal-main">
      <div className="cv-legal-container">
        {/* Page Hero */}
        <div className="cv-legal-header">
          <span className="cv-legal-eyebrow">
            LEGAL / GHID SIMPLIFICAT
          </span>
          <h1 className="cv-legal-title">Protecția Datelor Tale (GDPR)</h1>
          <p className="cv-legal-sub">
            Transparență totală în utilizarea, prelucrarea și securizarea datelor cu caracter personal.
          </p>
          <div className="cv-legal-meta">
            <span>ULTIMA ACTUALIZARE: 6 AUGUST 2026</span>
            <span>REGULAMENT (UE) 2016/679</span>
          </div>
        </div>

        <article className="cv-legal-article">
          {/* Main Principle Callout */}
          <div className="cv-legal-callout">
            <div className="cv-legal-callout-title">PRINCIPIUL NOSTRU FUNDAMENTAL</div>
            <p className="cv-legal-callout-text" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
              &ldquo;Datele tale sunt folosite exclusiv pentru a analiza situația ta financiară și pentru a te contacta în legătură cu solicitarea trimisă.&rdquo;
            </p>
          </div>

          {/* Section 01: Core Pillars */}
          <section className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">01</span>
              <h2 className="cv-legal-heading">Garanțiile de Securitate și Confidențialitate</h2>
            </div>
            <div className="cv-legal-grid">
              <div className="cv-legal-card emerald">
                <div className="cv-legal-card-header">
                  <div className="cv-legal-card-icon">
                    <Lock size={18} />
                  </div>
                  <h3 className="cv-legal-card-title">Securitate garantată</h3>
                </div>
                <p className="cv-legal-card-desc">
                  Folosim conexiuni criptate SSL/TLS și servere securizate de nivel bancar. Nimeni neautorizat nu are acces la datele tale.
                </p>
              </div>

              <div className="cv-legal-card emerald">
                <div className="cv-legal-card-header">
                  <div className="cv-legal-card-icon">
                    <ShieldCheck size={18} />
                  </div>
                  <h3 className="cv-legal-card-title">Confidențialitate 100%</h3>
                </div>
                <p className="cv-legal-card-desc">
                  Nu vindem și nu închiriem baza de date niciunei terțe părți. Datele sunt procesate strict pentru soluționarea cererii tale.
                </p>
              </div>

              <div className="cv-legal-card emerald">
                <div className="cv-legal-card-header">
                  <div className="cv-legal-card-icon">
                    <CheckCircle2 size={18} />
                  </div>
                  <h3 className="cv-legal-card-title">Consimțământ sub controlul tău</h3>
                </div>
                <p className="cv-legal-card-desc">
                  Tu decizi dacă dorești doar analiza gratuită sau dacă permiți module cookie analitice sau de marketing.
                </p>
              </div>

              <div className="cv-legal-card emerald">
                <div className="cv-legal-card-header">
                  <div className="cv-legal-card-icon">
                    <KeyRound size={18} />
                  </div>
                  <h3 className="cv-legal-card-title">Dreptul de a fi uitat</h3>
                </div>
                <p className="cv-legal-card-desc">
                  Dacă te răzgândești, ne trimiți un simplu email și îți ștergem toate datele din sistemele noastre în termen de 24–48 de ore.
                </p>
              </div>
            </div>
          </section>

          {/* Section 02: Cookies Management */}
          <section className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">02</span>
              <h2 className="cv-legal-heading">Gestionarea preferințelor de Cookie-uri</h2>
            </div>
            <p className="cv-legal-text">
              Îți poți schimba opțiunile de consimțământ în orice moment accesând link-ul <strong>&bdquo;Setări Cookie-uri&rdquo;</strong> din subsolul oricărei pagini a site-ului.
            </p>
          </section>

          {/* Section 03: Rights Overview */}
          <section className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">03</span>
              <h2 className="cv-legal-heading">Drepturile tale pe scurt</h2>
            </div>
            <ul className="cv-legal-list">
              <li className="cv-legal-list-item">
                Poți cere oricând să vezi ce date deținem în sistem despre profilul tău.
              </li>
              <li className="cv-legal-list-item">
                Poți cere corectarea sau actualizarea numărului de telefon sau a adresei de email.
              </li>
              <li className="cv-legal-list-item">
                Poți solicita ștergerea definitivă a tuturor datelor transmise.
              </li>
              <li className="cv-legal-list-item">
                Poți opri sau porni cookie-urile analitice și de marketing oricând dorești.
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

