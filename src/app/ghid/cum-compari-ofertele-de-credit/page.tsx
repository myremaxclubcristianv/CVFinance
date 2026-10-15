import type { Metadata } from "next";
import Link from "next/link";
import EducationalArticleLayout from "@/components/EducationalArticleLayout";
import { Check, X, ShieldCheck, Scale, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Cum Compari Ofertele de Credit în Mod Inteligent | Ghid CV Finance",
  description:
    "Ghid complet pentru compararea ofertelor bancare: DAE, dobândă fixă vs variabilă, cost total de rambursare, asigurări atașate și ordinea corectă a aplicărilor.",
  keywords: [
    "cum compari credite",
    "comparare oferte bancare",
    "dobanda fixa vs variabila",
    "fisa europeana secci",
    "interogari biroul de credit",
    "cost total de rambursat",
  ],
  alternates: { canonical: "/ghid/cum-compari-ofertele-de-credit" },
};

const faqs = [
  {
    q: "Ce document trebuie să cer băncii pentru o comparație obiectivă?",
    a: "Solicită întotdeauna Fișa Europeană de Informații Standardizate privind Creditul de Consum (cunoscută sub acronimul SECCI sau ESIS). Toate băncile din România sunt obligate prin lege să ți-o ofere gratuit înainte de semnarea contractului. Această fișă conține DAE-ul calculat oficial, rata lunară și suma totală pe care o vei returna.",
  },
  {
    q: "Verificarea ofertelor îmi afectează scorul FICO din Biroul de Credit?",
    a: "Dacă discuți cu un consultant financiar independent care face simulări orientative pe baza veniturilor tale declarate, scorul tău nu este afectat deloc. În schimb, dacă mergi din bancă în bancă și permiți fiecărei agenții să îți facă o &bdquo;pre-aprobare financiară oficială&rdquo;, fiecare bancă va trimite o interogare în Biroul de Credit, ceea ce poate reduce temporar scorul FICO.",
  },
  {
    q: "Merită să îmi mut salariul la banca de la care iau creditul?",
    a: "În majoritatea cazurilor, da. Băncile oferă o reducere a marjei de dobândă între 0,5% și 2% pe an dacă virezi lunar salariul în contul lor. Economia realizată la dobândă depășește de regulă eventualele mici comisioane de administrare a pachetului de cont curent.",
  },
];

export default function GhidComparareOferte() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Cum compari ofertele de credit în mod inteligent: DAE, dobândă fixă vs variabilă și cost total",
        description: "Metodologie practică pentru analiza și compararea ofertelor de creditare bancară fără riscul scăderii scorului FICO.",
        author: { "@type": "Person", name: "Cristian Văduva" },
        publisher: { "@type": "Organization", name: "CV Finance", url: "https://credite.cristianvaduva.com" },
        mainEntityOfPage: "https://credite.cristianvaduva.com/ghid/cum-compari-ofertele-de-credit",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Acasă", item: "https://credite.cristianvaduva.com" },
          { "@type": "ListItem", position: 2, name: "Ghiduri", item: "https://credite.cristianvaduva.com/ghid" },
          { "@type": "ListItem", position: 3, name: "Comparare Credite", item: "https://credite.cristianvaduva.com/ghid/cum-compari-ofertele-de-credit" },
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
      <EducationalArticleLayout
        slug="cum-compari-ofertele-de-credit"
        category="STRATEGIE DE CREDITARE"
        title="Cum Compari Ofertele de Credit în Mod Inteligent"
        subtitle="DAE, dobândă fixă sau variabilă, comisioane ascunse și secvențierea corectă a aplicărilor pentru a nu-ți periclita șansele de aprobare."
        readingTime="7 MIN"
        relatedServiceUrl="/credit-nevoi-personale"
        relatedServiceLabel="Comparație oferte credite de nevoi personale"
      >
        <section className="cv-legal-section">
          <p className="cv-legal-text">
            Să compari credite pare la prima vedere un exercițiu simplu: cauți banca cu cea mai mică dobândă afișată și depui cererea. În practică însă, piața creditelor bancare este plină de nuanțe și clauze specifice: pachete de cont, condiții de încasare venit, asigurări de viață cu costuri variabile și praguri diferite de scoring.
          </p>
          <p className="cv-legal-text">
            O comparație inteligentă nu se oprește la prima pagină a unui pliant publicitar. Ea analizează cifrele într-un cadru unitar și protejează profilul financiar al solicitantului de aplicări impulsive.
          </p>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">01</span>
            <h2 className="cv-legal-heading">Cele 5 Criterii Obligatorii ale Unei Comparații Reale</h2>
          </div>
          <p className="cv-legal-text">
            Ori de câte ori analizezi două sau mai multe propuneri de finanțare, pune-le față în față pe baza acestor 5 indicatori:
          </p>
          <ul className="cv-legal-list">
            <li className="cv-legal-list-item"><strong>1. Dobânda Anuală Efectivă (DAE):</strong> Singurul indicator legal care adună dobânda, comisioanele de analiză și administrare și costurile asigurărilor obligatorii.</li>
            <li className="cv-legal-list-item"><strong>2. Valoarea totală plătibilă:</strong> Suma exactă în lei pe care o vei returna pe toată durata contractului (capital împrumutat + total dobânzi + total comisioane).</li>
            <li className="cv-legal-list-item"><strong>3. Tipul dobânzii (fixă vs. variabilă):</strong> Asigură-te că nu compari o dobândă fixă pe 5 ani cu o dobândă variabilă legată de IRCC care poate crește trimestrul viitor.</li>
            <li className="cv-legal-list-item"><strong>4. Condiționalități atașate:</strong> Verifică ce trebuie să faci pentru a păstra dobânda mică: virare salariu, rulaj lunar minim pe card sau asigurare facultativă.</li>
            <li className="cv-legal-list-item"><strong>5. Costuri de rambursare anticipată:</strong> La creditele de consum cu dobândă fixă, comisionul legal de rambursare anticipată este de maximum 1% (dacă a rămas mai mult de 1 an) sau 0,5% (sub 1 an), iar la dobândă variabilă este 0%.</li>
          </ul>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">02</span>
            <h2 className="cv-legal-heading">Secvențierea Aplicărilor: Cum Eviți Degradarea Scorului FICO</h2>
          </div>
          <p className="cv-legal-text">
            Unul dintre cele mai mari riscuri în căutarea unui credit este <strong>depunerea simultană de dosare</strong> la mai multe bănci.
          </p>
          
          <div className="cv-legal-callout">
            <div className="cv-legal-callout-title">DISTINCȚIA DINTRE SIMULARE ȘI APLICARE OFICIALĂ</div>
            <p className="cv-legal-callout-text">
              O discuție de consultanță sau o simulare pe calculator <strong>nu</strong> atinge Biroul de Credit. Însă în momentul în care semnezi un formular de acord ANAF și cerere de creditare la o bancă, instituția efectuează o interogare cu scop de creditare. Dacă acumulezi 3–4 interogări în câteva săptămâni, scorul tău FICO poate scădea cu zeci de puncte, transformând un client eligibil într-unul refuzat automat de sistemele de risc.
            </p>
          </div>

          <p className="cv-legal-text">
            <strong>Regula de bune practici:</strong> Analizează piața preliminar pe cifre și norme, alege instituția cu probabilitatea cea mai mare de compatibilitate și aplică mai întâi la acea opțiune. Dacă dosarul este bine pregătit, prima aplicare ar trebui să fie și cea aprobată.
          </p>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">03</span>
            <h2 className="cv-legal-heading">Tabel Comparativ: Matrice de Decizie</h2>
          </div>
          <div className="cv-legal-table-wrapper">
            <table className="cv-legal-table">
              <thead>
                <tr>
                  <th>Element de Analiză</th>
                  <th>Banca A (Focus pe Rata Lunară)</th>
                  <th>Banca B (Focus pe Cost Total)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Durată creditare</strong></td>
                  <td>5 ani (termen maxim)</td>
                  <td>3 ani (termen optimizat)</td>
                </tr>
                <tr>
                  <td><strong>Rată lunară</strong></td>
                  <td>Mai mică (confort imediat)</td>
                  <td>Mai mare (solicită disciplină)</td>
                </tr>
                <tr>
                  <td><strong>Dobândă totală achitată</strong></td>
                  <td>Semnificativ mai ridicată</td>
                  <td>Redusă cu până la 40%</td>
                </tr>
                <tr>
                  <td><strong>Recomandare</strong></td>
                  <td>Potrivită când bugetul este strâns și ai nevoie de marjă de siguranță.</td>
                  <td>Recomandată dacă venitul îți permite plata confortabilă a unei rate mai mari.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">04</span>
            <h2 className="cv-legal-heading">Întrebări Frecvente</h2>
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
      </EducationalArticleLayout>
    </>
  );
}
