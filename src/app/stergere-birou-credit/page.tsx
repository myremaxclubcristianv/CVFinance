import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X, ShieldCheck, AlertCircle, AlertTriangle, ArrowLeft, FileText, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Analiză Biroul de Credit & Rectificare Legală | Consultanță CV Finance",
  description:
    "Ghid complet și analiză independentă privind înregistrările din Biroul de Credit. Află ce date pot fi contestate sau rectificate legal, ce spune legislația și de ce ștergerea garantată este un mit periculos.",
  keywords: [
    "biroul de credit",
    "rectificare biroul de credit",
    "contestare date birou credit",
    "stergere biroul de credit legal",
    "notificare prealabila biroul de credit",
    "gdpr biroul de credit",
    "istoric negativ birou credit",
  ],
  alternates: { canonical: "/stergere-birou-credit" },
};

const faqs = [
  {
    q: "Poate cineva să garanteze ștergerea datelor din Biroul de Credit?",
    a: "Nu. Nicio persoană, avocat sau companie privată nu poate garanta ștergerea datelor înregistrate corect și legal. Baza de date a Biroului de Credit este guvernată de reglementări stricte. Doar înregistrările efectuate cu încălcarea procedurilor legale sau care conțin erori materiale de calcul și identificare pot face obiectul unei rectificări sau radieri legitime.",
  },
  {
    q: "Ce înseamnă nerespectarea procedurii de notificare prealabilă?",
    a: "Conform reglementărilor ANSPDCP și normelor bancare, creditorul este obligat să transmită debitorului o notificare în scris (prin scrisoare recomandată, SMS sau email confirmat) cu cel puțin 15 zile calendaristice înainte de transmiterea datelor negative către Biroul de Credit. Lipsa dovedită a acestei notificări constituie un temei legal valid pentru contestarea raportării.",
  },
  {
    q: "Ce tip de erori pot fi corectate în Biroul de Credit?",
    a: "Pot fi rectificate date transmise eronat privind sumele restante, credite raportate ca fiind active deși au fost achitate integral, întârzieri atribuite greșit din cauza unor suprapuneri de nume sau CNP, ori raportări menținute peste termenul legal de stocare de 4 ani de la plata ultimei restanțe.",
  },
  {
    q: "Dacă raportarea negativă este corectă, ce opțiuni am?",
    a: "Dacă datele au fost transmise cu respectarea strictă a legii, ele vor rămâne active pe perioada prevăzută de regulamente. În această situație, strategia constă în achitarea datoriilor restante, aducerea unui codebitor sau girant, ori orientarea dosarului către instituții financiare care analizează și compensează istoricul prin alte garanții.",
  },
  {
    q: "Cât durează procedura legală de contestare și verificare?",
    a: "Instituția financiară care a efectuat raportarea este obligată conform Regulamentului GDPR și legislației bancare să răspundă la o cerere oficială de rectificare în termen de 30 de zile calendaristice de la primire.",
  },
];

export default function StergereBirouCredit() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        name: "CV Finance — Analiză & Rectificare Date Biroul de Credit",
        url: "https://credite.cristianvaduva.com/stergere-birou-credit",
        description: "Evaluare independentă a conformității raportărilor din Biroul de Credit și consultanță privind rectificarea legală a datelor eronate.",
        areaServed: "RO",
        serviceType: "Consultanță Biroul de Credit",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Acasă", item: "https://credite.cristianvaduva.com" },
          { "@type": "ListItem", position: 2, name: "Analiză Biroul de Credit", item: "https://credite.cristianvaduva.com/stergere-birou-credit" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="cv-legal-main">
        <div className="cv-legal-container">

          {/* Navigare Înapoi */}
          <div style={{ marginBottom: "2rem" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.88rem",
                fontWeight: 600,
                color: "var(--text-secondary, #5F6368)",
                textDecoration: "none",
              }}
            >
              <ArrowLeft size={16} />
              <span>Înapoi la pagina principală</span>
            </Link>
          </div>

          {/* Header Editorial */}
          <div className="cv-legal-header">
            <span className="cv-legal-eyebrow">
              <Scale size={16} />
              <span>CADRU LEGAL &amp; TRANSPARENȚĂ / BIROUL DE CREDIT</span>
            </span>
            <h1 className="cv-legal-title">
              Analiză Biroul de Credit: Rectificare Legală, Realități și Limite
            </h1>
            <p className="cv-legal-sub">
              Diferența dintre o promisiune falsă de „ștergere garantată” și o analiză juridică profesionistă. Înțelege cum funcționează raportările, ce date pot fi contestate legal și ce nu poate promite niciun consultant responsabil.
            </p>
            <div className="cv-legal-meta">
              <span>LEGISLAȚIA PRIVIND PROTECȚIA DATELOR (GDPR)</span>
              <span>•</span>
              <span>TRANSPARENȚĂ FINANCIARĂ TOTALĂ</span>
            </div>
          </div>

          {/* Cuprins tematic */}
          <nav className="cv-legal-toc" aria-label="Cuprins articol">
            <div className="cv-legal-toc-title">
              <span>CUPRINS TEMATIC</span>
            </div>
            <ul className="cv-legal-toc-list">
              <li className="cv-legal-toc-item">
                <a href="#mitul-stergerii-garantate"><span className="cv-legal-toc-num">01</span> Mitul „ștergerii garantate”</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#cum-functioneaza-biroul"><span className="cv-legal-toc-num">02</span> Cum funcționează Biroul de Credit</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#motive-legale-rectificare"><span className="cv-legal-toc-num">03</span> Când există temei legal de rectificare</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#procedura-pas-cu-pas"><span className="cv-legal-toc-num">04</span> Procedura legală pas cu pas</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#ce-face-cv-finance"><span className="cv-legal-toc-num">05</span> Rolul CV Finance în acest proces</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#intrebari-frecvente"><span className="cv-legal-toc-num">06</span> Întrebări frecvente</a>
              </li>
            </ul>
          </nav>

          <article className="cv-legal-article">

            {/* Secțiunea 01 */}
            <section id="mitul-stergerii-garantate" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">01</span>
                <h2 className="cv-legal-heading">De Ce „Ștergerea Garantată” Este o Iluzie Periculoasă?</h2>
              </div>
              <p className="cv-legal-text">
                Internetul abundă de reclame care promit „ștergerea dosarului din Biroul de Credit în 24 de ore, garantat 100%” în schimbul unor sume de bani plătite în avans. Din punct de vedere juridic și operațional, această promisiune este <strong>complet nerealistă</strong>.
              </p>
              <p className="cv-legal-text">
                Biroul de Credit S.A. este o entitate privată a băncilor, supusă unor reglementări extrem de stricte. Nicio terță parte nu are acces direct de modificare a bazei de date. Singura entitate care poate radia sau corecta o înregistrare este <strong>chiar instituția creditoare care a trimis raportarea</strong> (banca sau IFN-ul respectiv), și o face doar în baza unei justificări legale temeinice.
              </p>

              <div className="cv-legal-grid">
                <div className="cv-legal-card danger">
                  <div className="cv-legal-card-header">
                    <div className="cv-legal-card-icon"><X size={18} /></div>
                    <h3 className="cv-legal-card-title">Promisiuni false pe piață:</h3>
                  </div>
                  <ul className="cv-legal-list" style={{ margin: "0.5rem 0 0" }}>
                    <li className="cv-legal-list-item">Ștergere garantată pentru orice client, indiferent de caz</li>
                    <li className="cv-legal-list-item">Acces direct în serverele Biroului de Credit</li>
                    <li className="cv-legal-list-item">Comisioane mari cerute înainte de orice verificare</li>
                  </ul>
                </div>

                <div className="cv-legal-card emerald">
                  <div className="cv-legal-card-header">
                    <div className="cv-legal-card-icon"><Check size={18} /></div>
                    <h3 className="cv-legal-card-title">Abordarea reală și legală:</h3>
                  </div>
                  <ul className="cv-legal-list" style={{ margin: "0.5rem 0 0" }}>
                    <li className="cv-legal-list-item">Verificarea respectării procedurilor legale de raportare</li>
                    <li className="cv-legal-list-item">Contestarea oficială a erorilor de fond sau de formă</li>
                    <li className="cv-legal-list-item">Transparență: spunem clar când o cerere nu are șanse</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Secțiunea 02 */}
            <section id="cum-functioneaza-biroul" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">02</span>
                <h2 className="cv-legal-heading">Cum Funcționează Înregistrările din Biroul de Credit?</h2>
              </div>
              <p className="cv-legal-text">
                Băncile și instituțiile financiare nebancare (IFN) transmit lunar către Biroul de Credit date referitoare la împrumuturile aflate în derulare. Raportările includ:
              </p>
              <ul className="cv-legal-list">
                <li className="cv-legal-list-item"><strong>Date de identificare:</strong> nume, prenume, CNP, adresă și angajator.</li>
                <li className="cv-legal-list-item"><strong>Date despre credit:</strong> tipul contractului, data acordării, suma împrumutată, scadența și soldul rămas de achitat.</li>
                <li className="cv-legal-list-item"><strong>Comportamentul de plată:</strong> numărul de zile de întârziere la plată și sumele restante, clasificate pe categorii de vechime (30, 60, 90, peste 180 de zile).</li>
              </ul>
              <p className="cv-legal-text">
                Conform legii, datele negative rămân stocate timp de <strong>4 ani</strong> calculați de la data la care ai achitat integral ultima restanță înregistrată la contractul respectiv. După împlinirea acestui termen de 4 ani, înregistrările sunt radiate automat din sistem.
              </p>
            </section>

            {/* Secțiunea 03 */}
            <section id="motive-legale-rectificare" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">03</span>
                <h2 className="cv-legal-heading">Când Există Temei Legal Justificat pentru Rectificare?</h2>
              </div>
              <p className="cv-legal-text">
                O înregistrare din Biroul de Credit poate fi contestată și rectificată exclusiv dacă există motive de nelegalitate sau erori de fapt. Cele mai frecvente situații justificate legal sunt:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", margin: "1.5rem 0" }}>
                <div style={{ padding: "1.25rem 1.5rem", backgroundColor: "var(--bg-secondary, #F7F9F8)", borderLeft: "3px solid var(--emerald, #087F5B)" }}>
                  <strong style={{ display: "block", color: "var(--text-primary, #111111)", marginBottom: "0.35rem" }}>
                    1. Lipsa notificării prealabile obligatorii (15 zile)
                  </strong>
                  <span style={{ fontSize: "0.95rem", color: "var(--text-secondary, #5F6368)", lineHeight: 1.6 }}>
                    Instituția creditoare este obligată legal să notifice clientul cu minimum 15 zile calendaristice înainte de a transmite datele negative către Biroul de Credit. Dacă notificarea nu a fost transmisă sau creditorul nu poate dovedi transmiterea ei conform legii, raportarea este viciată de procedură și poate fi contestată.
                  </span>
                </div>

                <div style={{ padding: "1.25rem 1.5rem", backgroundColor: "var(--bg-secondary, #F7F9F8)", borderLeft: "3px solid var(--emerald, #087F5B)" }}>
                  <strong style={{ display: "block", color: "var(--text-primary, #111111)", marginBottom: "0.35rem" }}>
                    2. Erori materiale de calcul sau suprapuneri de identitate
                  </strong>
                  <span style={{ fontSize: "0.95rem", color: "var(--text-secondary, #5F6368)", lineHeight: 1.6 }}>
                    Există situații în care plăți efectuate la timp nu au fost înregistrate corect din cauza unor erori tehnice de procesare bancară, generând penalizări fictive, sau situații de confuzie de nume și date la nivelul bazelor de date.
                  </span>
                </div>

                <div style={{ padding: "1.25rem 1.5rem", backgroundColor: "var(--bg-secondary, #F7F9F8)", borderLeft: "3px solid var(--emerald, #087F5B)" }}>
                  <strong style={{ display: "block", color: "var(--text-primary, #111111)", marginBottom: "0.35rem" }}>
                    3. Menținerea raportărilor după expirarea termenului de 4 ani
                  </strong>
                  <span style={{ fontSize: "0.95rem", color: "var(--text-secondary, #5F6368)", lineHeight: 1.6 }}>
                    Dacă au trecut peste 4 ani de la stingerea completă a datoriilor și înregistrarea figurează în continuare activă din neglijența creditorului, solicitarea de radiere imediată este pe deplin întemeiată.
                  </span>
                </div>

                <div style={{ padding: "1.25rem 1.5rem", backgroundColor: "var(--bg-secondary, #F7F9F8)", borderLeft: "3px solid var(--emerald, #087F5B)" }}>
                  <strong style={{ display: "block", color: "var(--text-primary, #111111)", marginBottom: "0.35rem" }}>
                    4. Fraude sau credite contractate în numele tău fără consimțământ
                  </strong>
                  <span style={{ fontSize: "0.95rem", color: "var(--text-secondary, #5F6368)", lineHeight: 1.6 }}>
                    În cazurile grave de furt de identitate (credite online contractate pe baza copiei buletinului tău de către persoane neautorizate), după depunerea plângerii penale, raportările sunt suspendate și ulterior radiate.
                  </span>
                </div>
              </div>
            </section>

            {/* Secțiunea 04 */}
            <section id="procedura-pas-cu-pas" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">04</span>
                <h2 className="cv-legal-heading">Procedura Legală de Contestare Pas cu Pas</h2>
              </div>
              <p className="cv-legal-text">
                Contestarea se realizează exclusiv pe canale oficiale, conform Regulamentului General privind Protecția Datelor (GDPR nr. 679/2016) și legislației bancare românești:
              </p>
              <ul className="cv-legal-list">
                <li className="cv-legal-list-item"><strong>1. Obținerea raportului complet:</strong> Se extrage situația la zi din baza de date a Biroului de Credit pentru a cunoaște cu exactitate codul raportării, data și creditorul.</li>
                <li className="cv-legal-list-item"><strong>2. Verificarea documentelor justificative:</strong> Se examinează contractul de credit, istoricul tranzacțiilor și existența oricăror notificări transmise de creditor.</li>
                <li className="cv-legal-list-item"><strong>3. Formularea cererii către responsabilul cu protecția datelor (DPO):</strong> Se redactează o solicitare formală motivată în drept, adresată creditorului participant.</li>
                <li className="cv-legal-list-item"><strong>4. Soluționarea în termenul legal:</strong> Creditorul are obligația legală de a răspunde în maximum 30 de zile. Dacă admite eroarea sau lipsa procedurii, transmite către Biroul de Credit dispoziția de rectificare sau radiere.</li>
              </ul>
            </section>

            {/* Secțiunea 05 */}
            <section id="ce-face-cv-finance" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">05</span>
                <h2 className="cv-legal-heading">Rolul CV Finance: Ce Putem și Ce Nu Putem Face</h2>
              </div>
              <div className="cv-legal-callout">
                <div className="cv-legal-callout-title">DECLARAȚIE DE ETICĂ ȘI PROFESIONALISM</div>
                <p className="cv-legal-callout-text">
                  CV Finance analizează situația ta în mod obiectiv. Dacă descoperim vicii de procedură sau date raportate eronat, te îndrumăm către căile legale de rezolvare. Dacă raportarea este conformă cu legea, nu îți vom vinde iluzii și nu îți vom lua bani pentru demersuri fără șanse; îți vom explica în schimb ce soluții alternative de finanțare poți aborda în acest context.
                </p>
              </div>
            </section>

            {/* Secțiunea 06 — FAQ */}
            <section id="intrebari-frecvente" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">06</span>
                <h2 className="cv-legal-heading">Întrebări Frecvente Despre Biroul de Credit</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", margin: "1.5rem 0" }}>
                {faqs.map((faq, idx) => (
                  <div key={idx} style={{ padding: "1.25rem 1.5rem", backgroundColor: "#FFFFFF", border: "1px solid var(--border)", borderRadius: "2px" }}>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary, #111111)", marginBottom: "0.5rem" }}>
                      {faq.q}
                    </h3>
                    <p style={{ fontSize: "0.95rem", color: "var(--text-secondary, #5F6368)", lineHeight: "1.6", margin: 0 }}>
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </article>

          {/* CTA Box */}
          <div className="cv-partner-card" style={{ marginTop: "4rem", textAlign: "center", backgroundColor: "var(--bg-secondary, #F7F9F8)" }}>
            <span className="cv-partner-badge">ANALIZĂ PROFESIONISTĂ &amp; CONFIDENȚIALĂ</span>
            <h2 className="cv-partner-title" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", margin: "0.5rem 0 1rem" }}>
              Vrei să verificăm situația ta din Biroul de Credit?
            </h2>
            <p className="cv-partner-text" style={{ margin: "0 auto 2rem", maxWidth: "620px" }}>
              Trimite datele tale pentru o evaluare preliminară. Îți spunem exact ce înseamnă datele tale, dacă există temei pentru rectificare sau ce opțiuni de creditare sunt viabile.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
              <Link href="/#verificare-credit" className="cv-btn-primary" style={{ padding: "0.9rem 2rem" }}>
                SOLICITĂ O ANALIZĂ OBIECTIVĂ →
              </Link>
              <Link href="/credit-istoric-negativ" className="cv-btn-secondary" style={{ padding: "0.9rem 1.75rem" }}>
                OPȚIUNI PENTRU ISTORIC NEGATIV
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
