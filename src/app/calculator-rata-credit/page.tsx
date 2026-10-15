import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ArrowLeft, Calculator, ShieldCheck, HelpCircle, TrendingDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Calculator Rată Credit & Simulare Refinanțare | CV Finance",
  description:
    "Calculator orientativ pentru rate bancare și simulare de refinanțare. Înțelege cum se calculează dobânda, DAE și economia potențială la rata lunară.",
  keywords: [
    "calculator rata credit",
    "simulare credit nevoi personale",
    "calculator refinantare",
    "calcul dobanda credit",
    "economie rata credit",
    "grad de indatorare calculator",
  ],
  alternates: { canonical: "/calculator-rata-credit" },
};

const faqs = [
  {
    q: "Cât de exacte sunt estimările dintr-un calculator online?",
    a: "Calculatorul online oferă o simulare orientativă valoroasă, bazată pe formule financiare standard și nivelul mediu al dobânzilor din piață. Oferta bancară exactă se stabilește însă în urma analizei dosarului, deoarece dobânda finală poate depinde de virarea salariului la banca respectivă, scorul FICO și alegerea unei asigurări atașate.",
  },
  {
    q: "Care este diferența dintre rate egale (anuități) și rate descrescătoare?",
    a: "În sistemul cu rate egale (cel mai utilizat în România), suma pe care o plătești în fiecare lună este constantă, însă la început achiți mai multă dobândă și mai puțin principal. În sistemul cu rate descrescătoare, rambursezi o cotă egală de principal în fiecare lună, iar dobânda scade progresiv; rata inițială este mai mare, dar costul total cu dobânda pe întreaga durată a creditului este mai redus.",
  },
  {
    q: "Cum se calculează gradul maxim de îndatorare permis de BNR?",
    a: "Conform regulamentelor Băncii Naționale a României, gradul maxim de îndatorare pentru creditele de consum și refinanțare este în general de 40% din venitul net lunar al familiei (sau 45% pentru creditele ipotecare la prima locuință). Acest procent include toate obligațiile lunare active din Biroul de Credit.",
  },
  {
    q: "Mă obligă o simulare de credit la vreo plată sau demers bancar?",
    a: "Absolut deloc. Simularea este un instrument de informare gratuit și fără nicio obligație. Datele tale nu sunt transmise băncilor și scorul tău de credit rămâne neatins.",
  },
];

export default function CalculatorRataCredit() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        name: "CV Finance — Calculator & Simulare Credite",
        url: "https://credite.cristianvaduva.com/calculator-rata-credit",
        description: "Instrument de calcul orientativ pentru rate bancare, simulare de refinanțare și estimare a costului total de creditare.",
        areaServed: "RO",
        serviceType: "Simulator Financiar",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Acasă", item: "https://credite.cristianvaduva.com" },
          { "@type": "ListItem", position: 2, name: "Calculator Rată Credit", item: "https://credite.cristianvaduva.com/calculator-rata-credit" },
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
              <Calculator size={16} />
              <span>INSTRUMENTE FINANCIARE / CALCULATOR &amp; SIMULARE</span>
            </span>
            <h1 className="cv-legal-title">
              Calculator Rată Credit: Cum Evaluezi Cifrele Înainte de Contractare
            </h1>
            <p className="cv-legal-sub">
              Înainte de a lua o decizie de creditare, o simulare corectă îți oferă imaginea completă a costurilor: rata lunară, dobânda totală și impactul asupra bugetului pe termen lung.
            </p>
            <div className="cv-legal-meta">
              <span>SIMULARE ORIENTATIVĂ</span>
              <span>•</span>
              <span>FĂRĂ AFECTARE SCOR BIROUL DE CREDIT</span>
            </div>
          </div>

          <article className="cv-legal-article">

            {/* Secțiunea 01 */}
            <section className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">01</span>
                <h2 className="cv-legal-heading">Ce Factori Influențează Rata Lunară?</h2>
              </div>
              <p className="cv-legal-text">
                Rata lunară pe care o plătești la bancă nu este o cifră fixată la întâmplare. Ea este rezultatul unei formule financiare compuse din trei elemente fundamentale:
              </p>
              <ul className="cv-legal-list">
                <li className="cv-legal-list-item"><strong>Suma împrumutată (soldul principal):</strong> Cu cât capitalul inițial este mai mare, cu atât baza pe care se calculează dobânda lunară este mai ridicată.</li>
                <li className="cv-legal-list-item"><strong>Perioada de creditare (scadența):</strong> O perioadă mai lungă (de exemplu 5 ani în loc de 3 ani) micșorează rata lunară, dar mărește dobânda totală plătită băncii.</li>
                <li className="cv-legal-list-item"><strong>Dobânda Anuală Efectivă (DAE):</strong> Suma tuturor costurilor anuale (marjă, indice de referință, comisioane de gestiune și asigurări obligatorii).</li>
              </ul>
            </section>

            {/* Secțiunea 02 */}
            <section className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">02</span>
                <h2 className="cv-legal-heading">Exemplu Ilustrativ: Cum se Schimbă Rata și Costul Total</h2>
              </div>
              <p className="cv-legal-text">
                Pentru a înțelege compromisul dintre o rată lunară confortabilă și costul total al banilor, să privim un exemplu ipotetic pentru un credit de <strong>50.000 RON</strong> la o dobândă anuală de 9%:
              </p>

              <div className="cv-legal-table-wrapper">
                <table className="cv-legal-table">
                  <thead>
                    <tr>
                      <th>Perioadă</th>
                      <th>Rată Lunară Estimată</th>
                      <th>Total Dobândă Achitată</th>
                      <th>Total Sumă Rambursată</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>3 ani (36 luni)</strong></td>
                      <td>≈ 1.590 lei / lună</td>
                      <td>≈ 7.240 lei</td>
                      <td>≈ 57.240 lei</td>
                    </tr>
                    <tr>
                      <td><strong>5 ani (60 luni)</strong></td>
                      <td>≈ 1.038 lei / lună</td>
                      <td>≈ 12.280 lei</td>
                      <td>≈ 62.280 lei</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="cv-legal-callout">
                <div className="cv-legal-callout-title">CONCLUZIE PRACTICĂ</div>
                <p className="cv-legal-callout-text">
                  Extinderea perioadei de la 3 la 5 ani reduce rata lunară cu aproximativ 550 lei/lună, oferind un respiro imediat în buget. În același timp, costul total crește cu aproximativ 5.040 lei din dobânda acumulată pe cei 2 ani suplimentari. Nu există o alegere „corectă” universală — important este să alegi varianta care corespunde capacității tale financiare reale.
                </p>
              </div>
            </section>

            {/* Secțiunea 03 — FAQ */}
            <section className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">03</span>
                <h2 className="cv-legal-heading">Întrebări Frecvente Despre Calculul Ratelor</h2>
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

          {/* CTA Box către calculatorul interactiv de pe prima pagină */}
          <div className="cv-partner-card" style={{ marginTop: "4rem", textAlign: "center", backgroundColor: "var(--bg-secondary, #F7F9F8)" }}>
            <span className="cv-partner-badge">INSTRUMENT ONLINE INTERACTIV</span>
            <h2 className="cv-partner-title" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", margin: "0.5rem 0 1rem" }}>
              Testează Calculatorul Interactiv CV Finance
            </h2>
            <p className="cv-partner-text" style={{ margin: "0 auto 2rem", maxWidth: "620px" }}>
              Ajustează soldul creditului, rata curentă și venitul tău pentru a estima pe loc economia lunară sau finanțarea suplimentară posibilă.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
              <Link href="/#calculator" className="cv-btn-primary" style={{ padding: "0.9rem 2rem" }}>
                DESCHIDE CALCULATORUL PE HOMEPAGE →
              </Link>
              <Link href="/#verificare-credit" className="cv-btn-secondary" style={{ padding: "0.9rem 1.75rem" }}>
                SOLICITĂ O ANALIZĂ EXACTĂ
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
