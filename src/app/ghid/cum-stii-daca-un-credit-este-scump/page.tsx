import type { Metadata } from "next";
import Link from "next/link";
import EducationalArticleLayout from "@/components/EducationalArticleLayout";
import { Check, X, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Cum Îți Dai Seama Dacă un Credit Este Scump? | Ghid CV Finance",
  description:
    "Află cum recunoști un credit costisitor: diferența dintre dobândă și DAE, capcana comisioanelor ascunse, asigurările obligatorii și analiza scadențarului.",
  keywords: [
    "credit scump",
    "cum calculezi DAE",
    "dobanda vs DAE",
    "comisioane credit",
    "cost real credit",
    "scadentar credit anuitati",
  ],
  alternates: { canonical: "/ghid/cum-stii-daca-un-credit-este-scump" },
};

const faqs = [
  {
    q: "Ce este mai important: rata lunară sau DAE-ul?",
    a: "Pentru bugetul de zi cu zi, rata lunară determină dacă îți permiți plata. Însă pentru costul real al împrumutului, DAE-ul este indicatorul decisiv. Un credit cu o rată lunară mică obținută pe 5 ani poate fi mult mai scump în total decât un credit cu o rată lunară ușor mai mare achitat în 3 ani.",
  },
  {
    q: "Sunt asigurările de viață obligatorii la creditele de consum?",
    a: "Nu toate băncile impun asigurarea ca o condiție obligatorie de acordare, însă multe bănci oferă o dobândă nominală redusă doar dacă accepți pachetul cu asigurare. Trebuie să calculezi dacă reducerea de dobândă acoperă costul lunar al primei de asigurare.",
  },
  {
    q: "Unde găsesc DAE-ul creditului meu actual?",
    a: "DAE-ul este menționat obligatoriu în contractul de credit inițial, în Fișa Europeană de Informații Standardizate (SECCI) primită la semnare și pe extrasele periodice de cont emise de bancă.",
  },
];

export default function GhidCreditScump() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Cum îți dai seama dacă un credit este scump: Dobândă vs DAE, comisioane și costul real",
        description: "Ghid practic pentru evaluarea costurilor reale ale unui credit bancar sau nebancar.",
        author: { "@type": "Person", name: "Cristian Văduva" },
        publisher: { "@type": "Organization", name: "CV Finance", url: "https://credite.cristianvaduva.com" },
        mainEntityOfPage: "https://credite.cristianvaduva.com/ghid/cum-stii-daca-un-credit-este-scump",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Acasă", item: "https://credite.cristianvaduva.com" },
          { "@type": "ListItem", position: 2, name: "Ghiduri", item: "https://credite.cristianvaduva.com/ghid" },
          { "@type": "ListItem", position: 3, name: "Credit Scump", item: "https://credite.cristianvaduva.com/ghid/cum-stii-daca-un-credit-este-scump" },
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
        slug="cum-stii-daca-un-credit-este-scump"
        category="COSTURI ȘI COMPARARE"
        title="Cum Îți Dai Seama Dacă un Credit Este Scump?"
        subtitle="De ce rata lunară afișată pe fluturașul promoțional nu spune toată povestea și cum calculezi costul real al banilor împrumutați."
        readingTime="6 MIN"
        relatedServiceUrl="/refinantare-credit"
        relatedServiceLabel="Consolidare și refinanțare credite cu costuri reduse"
      >
        <section className="cv-legal-section">
          <p className="cv-legal-text">
            Foarte mulți oameni semnează un contract de credit uitându-se la un singur număr: rata lunară pe care o au de plată în ziua de salariu. Dacă rata pare suportabilă în raport cu venitul actual, creditul este considerat automat „bun”.
          </p>
          <p className="cv-legal-text">
            Această abordare este însă motivul pentru care mii de debitori ajung să plătească de două sau trei ori suma împrumutată. Un credit nu este ieftin doar pentru că rata lui este mică; el poate fi extins pe o perioadă nejustificat de lungă sau poate include comisioane recurente care erodează masiv economiile familiei.
          </p>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">01</span>
            <h2 className="cv-legal-heading">Dobânda Nominală vs. DAE (Dobânda Anuală Efectivă)</h2>
          </div>
          <p className="cv-legal-text">
            Primul pas pentru a evalua un credit este să nu te lași impresionat de dobânda nominală promovată cu litere mari în reclame. Dobânda nominală reprezintă doar costul pur al banilor, exprimat ca procent anual din soldul rămas de achitat.
          </p>
          <p className="cv-legal-text">
            <strong>DAE-ul</strong> include însă toate componentele obligatorii ale creditului:
          </p>
          <ul className="cv-legal-list">
            <li className="cv-legal-list-item"><strong>Marja băncii și indicele de referință</strong> (IRCC la lei sau EURIBOR la euro).</li>
            <li className="cv-legal-list-item"><strong>Comisionul de analiză dosar:</strong> cost fix perceput la acordare (de regulă între 0 și 500 RON).</li>
            <li className="cv-legal-list-item"><strong>Comisionul lunar de gestiune / administrare:</strong> dacă există, chiar și o taxă de 15–25 lei/lună ridică semnificativ DAE-ul la credite mici.</li>
            <li className="cv-legal-list-item"><strong>Primele de asigurare obligatorii:</strong> dacă banca îți condiționează dobânda promoțională de achiziția unei asigurări de viață sau șomaj.</li>
          </ul>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">02</span>
            <h2 className="cv-legal-heading">Exemplu Ilustrativ: Capcana Dobânzii Mici cu Asigurare Scumpă</h2>
          </div>
          <p className="cv-legal-text">
            Să comparăm două oferte reale pentru un credit de consum în valoare de <strong>40.000 RON</strong> acordat pe <strong>5 ani (60 de luni)</strong>:
          </p>

          <div className="cv-legal-table-wrapper">
            <table className="cv-legal-table">
              <thead>
                <tr>
                  <th>Indicator Financiar</th>
                  <th>Oferta A (Aparent Ieftină)</th>
                  <th>Oferta B (Transparentă)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Dobândă Nominală</strong></td>
                  <td><strong>6,99%</strong> / an</td>
                  <td><strong>8,50%</strong> / an</td>
                </tr>
                <tr>
                  <td><strong>Asigurare inclusă în rată</strong></td>
                  <td>Da (0,15% pe lună din sold)</td>
                  <td>Nu (opțională / 0 lei)</td>
                </tr>
                <tr>
                  <td><strong>Comision administrare</strong></td>
                  <td>15 lei / lună</td>
                  <td>0 lei</td>
                </tr>
                <tr>
                  <td><strong>Rată lunară inițială</strong></td>
                  <td>≈ 865 lei / lună</td>
                  <td>≈ 820 lei / lună</td>
                </tr>
                <tr>
                  <td><strong>DAE Real</strong></td>
                  <td><strong>≈ 11,4%</strong></td>
                  <td><strong>≈ 8,8%</strong></td>
                </tr>
                <tr>
                  <td><strong>Total de Rambursat</strong></td>
                  <td><strong>≈ 51.900 lei</strong></td>
                  <td><strong>≈ 49.200 lei</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="cv-legal-callout">
            <div className="cv-legal-callout-title">CONCLUZIA EXEMPLULUI</div>
            <p className="cv-legal-callout-text">
              Deși Oferta A afișa o dobândă nominală cu 1,5% mai mică, adăugarea asigurării și a comisionului lunar a făcut ca Oferta A să coste cu <strong>2.700 lei mai mult</strong> pe durata contractului decât Oferta B. Singurul indicator care a arătat adevărul de la început a fost <strong>DAE</strong> (11,4% vs. 8,8%).
            </p>
          </div>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">03</span>
            <h2 className="cv-legal-heading">Graficul de Rambursare: În Ce Fază a Creditului Te Afli?</h2>
          </div>
          <p className="cv-legal-text">
            În România, majoritatea covârșitoare a creditelor se rambursează în rate lunare egale (sistem anuitant). Structura internă a fiecărei rate se modifică de la lună la lună:
          </p>
          <ul className="cv-legal-list">
            <li className="cv-legal-list-item"><strong>În prima treime a perioadei de creditare:</strong> Rata este formată în proporție de 60–80% din dobândă și comisioane, și doar 20–40% din principalul datorat.</li>
            <li className="cv-legal-list-item"><strong>În ultima treime a creditului:</strong> Ai achitat deja aproape toată dobânda aferentă banilor; rata lunară este compusă în proporție de 80–90% din rambursarea efectivă a sumei împrumutate.</li>
          </ul>
          <p className="cv-legal-text">
            De aceea, un credit devine cu adevărat „scump” dacă îl refinanțezi fără noimă aproape de finalul scadenței, deoarece vei reîncepe să plătești dobândă nouă pe un nou contract. În schimb, refinanțarea unui credit aflat în primii 1–2 ani poate economisi sume considerabile.
          </p>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">04</span>
            <h2 className="cv-legal-heading">Semnale de Alarmă că Plătești Prea Mult</h2>
          </div>
          <div className="cv-legal-grid">
            <div className="cv-legal-card danger">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><X size={18} /></div>
                <h3 className="cv-legal-card-title">Credit contractat cu dobândă IFN</h3>
              </div>
              <p className="cv-legal-card-desc">
                Dacă împrumutul este la o instituție nebancară cu rate săptămânale sau dobândă exprimată zilnic, DAE-ul tău depășește cel mai probabil 50% sau 100% pe an.
              </p>
            </div>

            <div className="cv-legal-card danger">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><X size={18} /></div>
                <h3 className="cv-legal-card-title">Credit vechi cu marjă fixă ridicată</h3>
              </div>
              <p className="cv-legal-card-desc">
                Dacă ai luat creditul în urmă cu 3–4 ani când dobânzile erau la vârf și nu l-ai renegociat niciodată, este foarte probabil ca piața actuală să ofere marje mult mai bune.
              </p>
            </div>

            <div className="cv-legal-card danger">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><X size={18} /></div>
                <h3 className="cv-legal-card-title">Sold restant care nu scade</h3>
              </div>
              <p className="cv-legal-card-desc">
                La cardurile de credit și overdrafturi unde plătești doar „suma minimă de rambursat”, aproape toți banii tăi se duc pe dobândă, iar datoria principală rămâne neschimbată.
              </p>
            </div>
          </div>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">05</span>
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
