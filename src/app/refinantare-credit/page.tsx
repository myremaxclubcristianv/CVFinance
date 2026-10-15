import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X, HelpCircle, AlertTriangle, ShieldCheck, Calculator, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Refinanțare Credit & Consolidare Rate | Consultanță CV Finance",
  description:
    "Ghid complet și analiză independentă pentru refinanțarea creditelor. Află când are sens refinanțarea, cum compari DAE și durata, și dacă o rată mai mică îți reduce cu adevărat costul total.",
  keywords: [
    "refinanțare credit",
    "consolidare credite",
    "reducere rată credit",
    "refinanțare IFN",
    "credit refinanțare nevoi personale",
    "DAE refinanțare",
    "analiză gratuită credit",
  ],
  alternates: { canonical: "/refinantare-credit" },
};

const faqs = [
  {
    q: "Ce înseamnă mai exact o refinanțare de credit?",
    a: "Refinanțarea presupune contractarea unui nou împrumut (de regulă bancar) pentru a achita integral unul sau mai multe credite existente. Scopul poate fi obținerea unei dobânzi mai avantajoase, reunirea mai multor scadențe într-o singură rată lunară sau extinderea/scurtarea perioadei de rambursare.",
  },
  {
    q: "O rată lunară mai mică înseamnă automat un credit mai ieftin?",
    a: "Nu neapărat. Dacă obții o rată lunară mai mică exclusiv prin prelungirea termenului de creditare (de exemplu, de la 2 ani la 5 ani), s-ar putea ca suma totală pe care o returnezi băncii pe întreaga durată să crească. O reducere reală a costului apare atunci când scade DAE-ul (dobânda și comisioanele) pe o perioadă similară de rambursare.",
  },
  {
    q: "Se pot refinanța creditele luate de la IFN-uri?",
    a: "Da, aceasta este adesea una dintre cele mai avantajoase mutări financiare. Creditele nebancare (IFN) au de regulă dobânzi anuale efective considerabil mai mari decât creditele bancare. Înlocuirea lor printr-un credit bancar standard poate reduce masiv presiunea lunară pe buget.",
  },
  {
    q: "Pot obține și o sumă suplimentară de bani prin refinanțare?",
    a: "Da, dacă venitul tău net eligibil și gradul de îndatorare stabilit conform normelor BNR permit acest lucru, poți solicita refinanțare cu lichidități suplimentare în cadrul aceleiași rate lunare.",
  },
  {
    q: "Când NU are sens să refinanțezi un credit?",
    a: "Dacă mai ai doar câteva luni sau 1-2 ani până la finalizarea creditului (perioadă în care ai plătit deja aproape toată dobânda aferentă graficului anuitant), costurile de dosar, evaluare sau comisioanele noului credit pot depăși economia realizată.",
  },
  {
    q: "Analiza inițială mă obligă să accept oferta propusă?",
    a: "Absolut deloc. Analiza dosarului tău și simularea variantelor disponibile sunt realizate fără nicio obligație contractuală. Tu decizi dacă varianta identificată are sens pentru situația ta financiară.",
  },
];

export default function RefinantareCredit() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        name: "CV Finance — Refinanțare & Consolidare Credite",
        url: "https://credite.cristianvaduva.com/refinantare-credit",
        description: "Serviciu independent de analiză financiară, evaluare a contractelor de credit și consultanță pentru refinanțare și consolidare.",
        areaServed: "RO",
        serviceType: "Refinanțare Credite",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Acasă", item: "https://credite.cristianvaduva.com" },
          { "@type": "ListItem", position: 2, name: "Refinanțare Credit", item: "https://credite.cristianvaduva.com/refinantare-credit" },
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
              <ShieldCheck size={16} />
              <span>SERVICII DE CREDITARE / OPTIMIZARE &amp; REFINANȚARE</span>
            </span>
            <h1 className="cv-legal-title">
              Refinanțarea Creditelor: Când Are Sens și Cum Compari Corect
            </h1>
            <p className="cv-legal-sub">
              Nu ne uităm doar la cât plătești luna aceasta. Analizăm cât mai ai de rambursat, ce costuri presupune schimbarea creditorului și cum se modifică suma totală pe care o vei plăti.
            </p>
            <div className="cv-legal-meta">
              <span>CONSULTANȚĂ FINANCIARĂ INDEPENDENTĂ</span>
              <span>•</span>
              <span>ANALIZĂ OBIECTIVĂ A CONTRACTELOR</span>
            </div>
          </div>

          {/* Cuprins tematic */}
          <nav className="cv-legal-toc" aria-label="Cuprins articol">
            <div className="cv-legal-toc-title">
              <span>CUPRINS TEMATIC</span>
            </div>
            <ul className="cv-legal-toc-list">
              <li className="cv-legal-toc-item">
                <a href="#ce-este-refinantarea"><span className="cv-legal-toc-num">01</span> Ce presupune refinanțarea</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#dobanda-vs-dae"><span className="cv-legal-toc-num">02</span> Dobândă nominală vs. DAE</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#rata-vs-cost-total"><span className="cv-legal-toc-num">03</span> Rata lunară vs. Costul total</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#cand-nu-merita"><span className="cv-legal-toc-num">04</span> Când refinanțarea NU este indicată</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#procesul-nostru"><span className="cv-legal-toc-num">05</span> Cum decurge analiza dosarului</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#intrebari-frecvente"><span className="cv-legal-toc-num">06</span> Întrebări frecvente</a>
              </li>
            </ul>
          </nav>

          <article className="cv-legal-article">

            {/* Secțiunea 01 */}
            <section id="ce-este-refinantarea" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">01</span>
                <h2 className="cv-legal-heading">Ce Presupune Refinanțarea și Consolidarea Datoriilor?</h2>
              </div>
              <p className="cv-legal-text">
                Înainte de a adăuga o rată nouă la bugetul lunar, merită să înțelegi în detaliu cât te costă împrumuturile pe care le ai deja. Refinanțarea nu este o formulă magică, ci un instrument strict financiar: înlocuirea unuia sau mai multor credite vechi cu un credit nou, contractat în condiții mai bine adaptate pieței sau situației tale actuale.
              </p>
              <p className="cv-legal-text">
                Dacă ai acumulat mai multe credite de nevoi personale, carduri de cumpărături sau descoperiri de cont (overdraft) la diferite bănci sau IFN-uri, <strong>consolidarea</strong> îți permite să le unifici într-o singură scadență lunară, la o singură instituție bancară.
              </p>

              <div className="cv-legal-grid">
                <div className="cv-legal-card emerald">
                  <div className="cv-legal-card-header">
                    <div className="cv-legal-card-icon"><Check size={18} /></div>
                    <h3 className="cv-legal-card-title">Situația înainte de consolidare</h3>
                  </div>
                  <p className="cv-legal-card-desc">
                    3–5 scadențe dispersate pe parcursul lunii, dobânzi diferite, comisioane multiple de administrare de cont și risc constant de a uita o plată și a atrage penalizări.
                  </p>
                </div>

                <div className="cv-legal-card emerald">
                  <div className="cv-legal-card-header">
                    <div className="cv-legal-card-icon"><Check size={18} /></div>
                    <h3 className="cv-legal-card-title">Situația după refinanțare</h3>
                  </div>
                  <p className="cv-legal-card-desc">
                    O singură rată lunară la o dată fixă, o singură dobândă negociată și un grafic de rambursare clar, transparent și mai ușor de gestionat în bugetul familiei.
                  </p>
                </div>
              </div>
            </section>

            {/* Secțiunea 02 */}
            <section id="dobanda-vs-dae" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">02</span>
                <h2 className="cv-legal-heading">Dobândă Nominală vs. DAE: Ce Cifre Comparăm?</h2>
              </div>
              <p className="cv-legal-text">
                Cea mai frecventă greșeală în compararea creditelor este analiza exclusivă a dobânzii nominale (de exemplu, 7% sau 8%). Dobânda nominală reprezintă doar prețul banilor împrumutați, ignorând toate celelalte costuri obligatorii.
              </p>
              <p className="cv-legal-text">
                <strong>Dobânda Anuală Efectivă (DAE)</strong> este singurul indicator care include costul complet al creditului:
              </p>
              <ul className="cv-legal-list">
                <li className="cv-legal-list-item"><strong>Marja băncii și indicele de referință</strong> (IRCC sau ROBOR la creditele cu dobândă variabilă).</li>
                <li className="cv-legal-list-item"><strong>Comisioanele inițiale:</strong> analiza dosarului, emiterea documentelor sau comisioanele de deschidere.</li>
                <li className="cv-legal-list-item"><strong>Comisioanele recurente:</strong> administrare lunară sau anuală a creditului și a contului curent asociat.</li>
                <li className="cv-legal-list-item"><strong>Costurile asigurărilor obligatorii:</strong> asigurare de viață sau de șomaj asociată pachetului de creditare.</li>
              </ul>

              <div className="cv-legal-callout">
                <div className="cv-legal-callout-title">RECOMANDARE PRACTICĂ</div>
                <p className="cv-legal-callout-text">
                  Nu compara două oferte doar după rata lunară estimată în calculator. Solicită întotdeauna fișa standard de informații europene (ESIS/SECCI) și verifică DAE-ul și totalul de rambursat pe aceeași perioadă de timp.
                </p>
              </div>
            </section>

            {/* Secțiunea 03 */}
            <section id="rata-vs-cost-total" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">03</span>
                <h2 className="cv-legal-heading">Rata Lunară Redusă vs. Costul Total de Rambursare</h2>
              </div>
              <p className="cv-legal-text">
                Există două modalități prin care poți obține o rată lunară mai mică prin refinanțare, însă efectul lor asupra finanțelor tale este fundamental diferit:
              </p>

              <div className="cv-legal-table-wrapper">
                <table className="cv-legal-table">
                  <thead>
                    <tr>
                      <th>Strategie</th>
                      <th>Cum funcționează</th>
                      <th>Impact asupra ratei lunare</th>
                      <th>Impact asupra sumei totale plătite</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>1. Reducerea dobânzii (DAE mai mic)</strong></td>
                      <td>Păstrezi aceeași durată de rambursare, dar negociezi o dobândă mai mică.</td>
                      <td>Scade rata lunară.</td>
                      <td><strong>Scade considerabil suma totală</strong> de plată. Este varianta ideală.</td>
                    </tr>
                    <tr>
                      <td><strong>2. Extinderea perioadei de rambursare</strong></td>
                      <td>Mărești perioada (de exemplu de la 2 ani rămași la 5 ani noi).</td>
                      <td>Scade imediat rata lunară, oferind oxigen bugetului.</td>
                      <td><strong>Crește costul total</strong>, deoarece plătești dobândă pe un interval de timp mai lung.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="cv-legal-text">
                Extinderea termenului este o decizie justificată atunci când te afli sub o presiune sufocantă a ratelor și ai nevoie de stabilitate pe termen scurt. Însă consultantul tău trebuie să îți prezinte ambele cifre transparent, fără a ascunde diferența de cost total.
              </p>
            </section>

            {/* Secțiunea 04 */}
            <section id="cand-nu-merita" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">04</span>
                <h2 className="cv-legal-heading">Când Refinanțarea NU Este Avantajoasă?</h2>
              </div>
              <p className="cv-legal-text">
                O consultanță corectă înseamnă să știi când este mai bine să <em>nu</em> schimbi creditul. În mod realist, refinanțarea nu aduce avantaje în următoarele cazuri:
              </p>
              <div className="cv-legal-grid">
                <div className="cv-legal-card danger">
                  <div className="cv-legal-card-header">
                    <div className="cv-legal-card-icon"><X size={18} /></div>
                    <h3 className="cv-legal-card-title">Ești pe final de credit</h3>
                  </div>
                  <p className="cv-legal-card-desc">
                    În graficele bancare cu rate egale (anuitare), dobânda se achită în proporție majoritară în prima jumătate a contractului. Dacă ești în ultimii 1-2 ani, plătești aproape exclusiv principalul; refinanțarea nu va aduce economii din dobândă.
                  </p>
                </div>

                <div className="cv-legal-card danger">
                  <div className="cv-legal-card-header">
                    <div className="cv-legal-card-icon"><X size={18} /></div>
                    <h3 className="cv-legal-card-title">Costurile de transfer depășesc economia</h3>
                  </div>
                  <p className="cv-legal-card-desc">
                    La creditele ipotecare, refinanțarea presupune costuri notariale, radiere și reînscriere ipotecă, raport de evaluare și taxe de dosar. Dacă diferența de dobândă este foarte mică, aceste taxe pot anula economia estimată.
                  </p>
                </div>

                <div className="cv-legal-card danger">
                  <div className="cv-legal-card-header">
                    <div className="cv-legal-card-icon"><X size={18} /></div>
                    <h3 className="cv-legal-card-title">Scădere temporară a veniturilor</h3>
                  </div>
                  <p className="cv-legal-card-desc">
                    Dacă gradul tău actual de îndatorare depășește normele BNR (40% din venitul net) din cauza unei schimbări de job recente sau scăderi de venit, o nouă aplicare riscă respingerea. Este mai prudentă restructurarea directă cu banca actuală.
                  </p>
                </div>
              </div>
            </section>

            {/* Secțiunea 05 */}
            <section id="procesul-nostru" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">05</span>
                <h2 className="cv-legal-heading">Cum Decurge Analiza Dosarului la CV Finance?</h2>
              </div>
              <p className="cv-legal-text">
                Procesul nostru de lucru este structurat în 4 pași clari, concepuți pentru a-ți oferi siguranță și transparență completă:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", margin: "1.5rem 0" }}>
                <div style={{ padding: "1.25rem 1.5rem", backgroundColor: "var(--bg-secondary, #F7F9F8)", borderLeft: "3px solid var(--emerald, #087F5B)" }}>
                  <strong style={{ display: "block", color: "var(--text-primary, #111111)", marginBottom: "0.25rem" }}>
                    Pasul 1 — Preluarea datelor și contractelor
                  </strong>
                  <span style={{ fontSize: "0.95rem", color: "var(--text-secondary, #5F6368)" }}>
                    Ne transmiți soldul actual, ratele pe care le plătești și obiectivele tale (rată mai mică, bani în plus sau închiderea IFN-urilor).
                  </span>
                </div>

                <div style={{ padding: "1.25rem 1.5rem", backgroundColor: "var(--bg-secondary, #F7F9F8)", borderLeft: "3px solid var(--emerald, #087F5B)" }}>
                  <strong style={{ display: "block", color: "var(--text-primary, #111111)", marginBottom: "0.25rem" }}>
                    Pasul 2 — Simularea comparativă a pieței
                  </strong>
                  <span style={{ fontSize: "0.95rem", color: "var(--text-secondary, #5F6368)" }}>
                    Verificăm normele de risc ale băncilor partenere și comparăm opțiunile disponibile pentru profilul tău de venit și istoric.
                  </span>
                </div>

                <div style={{ padding: "1.25rem 1.5rem", backgroundColor: "var(--bg-secondary, #F7F9F8)", borderLeft: "3px solid var(--emerald, #087F5B)" }}>
                  <strong style={{ display: "block", color: "var(--text-primary, #111111)", marginBottom: "0.25rem" }}>
                    Pasul 3 — Prezentarea opțiunilor pe cifre reale
                  </strong>
                  <span style={{ fontSize: "0.95rem", color: "var(--text-secondary, #5F6368)" }}>
                    Discutăm concret: cât scade rata, ce comisioane există, cum se schimbă costul total și care este varianta optimă pentru tine.
                  </span>
                </div>

                <div style={{ padding: "1.25rem 1.5rem", backgroundColor: "var(--bg-secondary, #F7F9F8)", borderLeft: "3px solid var(--emerald, #087F5B)" }}>
                  <strong style={{ display: "block", color: "var(--text-primary, #111111)", marginBottom: "0.25rem" }}>
                    Pasul 4 — Gestionarea dosarului până la decontare
                  </strong>
                  <span style={{ fontSize: "0.95rem", color: "var(--text-secondary, #5F6368)" }}>
                    Pregătim documentația completă, intermediem relația cu banca aleasă și ne asigurăm că vechile credite sunt închise corect.
                  </span>
                </div>
              </div>
            </section>

            {/* Secțiunea 06 — FAQ */}
            <section id="intrebari-frecvente" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">06</span>
                <h2 className="cv-legal-heading">Întrebări Frecvente Despre Refinanțare</h2>
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

          {/* CTA Box de conversie */}
          <div className="cv-partner-card" style={{ marginTop: "4rem", textAlign: "center", backgroundColor: "var(--bg-secondary, #F7F9F8)" }}>
            <span className="cv-partner-badge">ANALIZĂ GRATUITĂ &amp; FĂRĂ OBLIGAȚII</span>
            <h2 className="cv-partner-title" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", margin: "0.5rem 0 1rem" }}>
              Vrei să afli dacă refinanțarea are sens pentru tine?
            </h2>
            <p className="cv-partner-text" style={{ margin: "0 auto 2rem", maxWidth: "620px" }}>
              Completează datele esențiale în formularul de calificare. Ne uităm pe cifre și îți explicăm dacă poți obține o reducere reală a costurilor.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
              <Link href="/#verificare-credit" className="cv-btn-primary" style={{ padding: "0.9rem 2rem" }}>
                VERIFICĂ SITUAȚIA TA →
              </Link>
              <Link href="/#calculator" className="cv-btn-secondary" style={{ padding: "0.9rem 1.75rem" }}>
                DESCHIDE CALCULATORUL INTERACTIV
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
