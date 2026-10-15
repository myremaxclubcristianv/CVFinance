import type { Metadata } from "next";
import Link from "next/link";
import EducationalArticleLayout from "@/components/EducationalArticleLayout";
import { AlertTriangle, Check, X, ShieldAlert, HeartHandshake, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Stresul Ratelor Multiple: Semnale de Alarmă și Soluții | Ghid CV Finance",
  description:
    "Ghid de gestionare a supraîndatorării: cum recunoști semnalele de alarmă când ratele devin sufocante, ce opțiuni ai înainte de restanțe și când te ajută consolidarea datoriilor.",
  keywords: [
    "rate multiple stres",
    "supraindatorare solutii",
    "consolidare datorii",
    "ce faci cand nu poti plati ratele",
    "grad de indatorare mare",
    "refinantare credite multiple",
  ],
  alternates: { canonical: "/ghid/stresul-ratelor-multiple-solutii" },
};

const faqs = [
  {
    q: "Ce înseamnă că sunt supraîndatorat?",
    a: "Din punct de vedere financiar, supraîndatorarea apare atunci când totalul ratelor lunare depășește 40%–50% din venitul net al familiei, lăsând o sumă insuficientă pentru cheltuielile curente de viață (hrană, utilități, sănătate). În acest punct, orice cheltuială neprevăzută poate declanșa întârzieri la plată.",
  },
  {
    q: "Banca poate refuza o cerere de refinanțare dacă am prea multe rate?",
    a: "Da. Dacă gradul tău de îndatorare depășește normele legale sau dacă ai acumulat deja întârzieri mari, banca poate considera riscul prea ridicat. De aceea este esențial să acționezi înainte ca ratele să ajungă la scadențe depășite cu peste 30 de zile.",
  },
  {
    q: "Poate consolidarea să îmi rezolve definitiv problemele financiare?",
    a: "Consolidarea este un instrument excelent de reducere a ratei lunare și de reorganizare a datoriilor. Însă ea funcționează cu adevărat doar dacă este însoțită de o decizie fermă de a nu mai contracta noi împrumuturi și de a ține cheltuielile sub control.",
  },
];

export default function GhidStresRateMultiple() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Stresul ratelor multiple: semnale de alarmă, grad de îndatorare și opțiuni de consolidare",
        description: "Ghid empatic și practic pentru persoanele care se confruntă cu dificultăți la plata ratelor lunare.",
        author: { "@type": "Person", name: "Cristian Văduva" },
        publisher: { "@type": "Organization", name: "CV Finance", url: "https://credite.cristianvaduva.com" },
        mainEntityOfPage: "https://credite.cristianvaduva.com/ghid/stresul-ratelor-multiple-solutii",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Acasă", item: "https://credite.cristianvaduva.com" },
          { "@type": "ListItem", position: 2, name: "Ghiduri", item: "https://credite.cristianvaduva.com/ghid" },
          { "@type": "ListItem", position: 3, name: "Stresul Ratelor", item: "https://credite.cristianvaduva.com/ghid/stresul-ratelor-multiple-solutii" },
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
        slug="stresul-ratelor-multiple-solutii"
        category="SĂNĂTATE FINANCIARĂ"
        title="Stresul Ratelor Multiple: Cum Oprești Presiunea Financiară"
        subtitle="Semnale de alarmă timpurii, gestionarea gradului de îndatorare și soluțiile concrete pe care le poți explora înainte de a ajunge la restanțe."
        readingTime="6 MIN"
        relatedServiceUrl="/totul-inainte-de-credit"
        relatedServiceLabel="Diagnostic financiar și evaluarea situației înainte de credit"
      >
        <section className="cv-legal-section">
          <p className="cv-legal-text">
            Presiunea ratelor multiple nu apare peste noapte. De cele mai multe ori, începe cu un credit ipotecar sau de nevoi personale luat în condiții normale. Apoi apare o reparație auto neprevăzută acoperită printr-un card de credit, o achiziție în rate la un magazin și, eventual, un mic împrumut rapid pentru o urgență.
          </p>
          <p className="cv-legal-text">
            În scurt timp, te trezești jonglând cu 4 sau 5 scadențe diferite în fiecare lună. Banii de salariu dispar în primele trei zile de la încasare, iar anxietatea legată de ziua de mâine devine o stare permanentă. Dacă te afli în acest punct, primul lucru pe care trebuie să îl știi este că nu ești singur și că există căi practice de ieșire.
          </p>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">01</span>
            <h2 className="cv-legal-heading">Cele 4 Semnale de Alarmă Timpurii</h2>
          </div>
          <p className="cv-legal-text">
            Nu aștepta să acumulezi întârzieri de 30 sau 60 de zile pentru a recunoaște că situația a devenit nesustenabilă. Iată semnalele clare că bugetul tău este în zona roșie:
          </p>
          <div className="cv-legal-grid">
            <div className="cv-legal-card danger">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><AlertTriangle size={18} /></div>
                <h3 className="cv-legal-card-title">1. Plătești rate amânând utilitățile</h3>
              </div>
              <p className="cv-legal-card-desc">
                Când începi să amâni factura de curent sau întreținerea pentru a putea plăti ratele bancare, echilibrul tău financiar s-a rupt deja.
              </p>
            </div>

            <div className="cv-legal-card danger">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><AlertTriangle size={18} /></div>
                <h3 className="cv-legal-card-title">2. Folosești cardul de credit pentru hrană</h3>
              </div>
              <p className="cv-legal-card-desc">
                Dacă linia de credit este utilizată lună de lună pentru cumpărături curente de alimente deoarece salariul a fost înghițit de alte rate, trăiești pe datorie viitoare.
              </p>
            </div>

            <div className="cv-legal-card danger">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><AlertTriangle size={18} /></div>
                <h3 className="cv-legal-card-title">3. Achitarea exclusivă a minimului de plată</h3>
              </div>
              <p className="cv-legal-card-desc">
                Plata doar a sumei minime obligatorii pe cardul de credit nu reduce datoria; ea acoperă în principal dobânzile acumulate, menținând datoria activă pe termen nedefinit.
              </p>
            </div>

            <div className="cv-legal-card danger">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><AlertTriangle size={18} /></div>
                <h3 className="cv-legal-card-title">4. Tentația de a lua un nou credit pentru rate</h3>
              </div>
              <p className="cv-legal-card-desc">
                Contractarea unui credit nou (în special de la un IFN) pentru a achita rata curentă este cel mai periculos pas, declanșând spirala insolvenței personale.
              </p>
            </div>
          </div>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">02</span>
            <h2 className="cv-legal-heading">Opțiuni Concreate: Ce Poți Face Înainte Să Apară Restanțele?</h2>
          </div>
          <p className="cv-legal-text">
            Băncile și creditorii sunt mult mai deschiși să găsească o soluție atunci când soliciți sprijin <strong>înainte</strong> de a figura cu plăți întârziate:
          </p>
          <ul className="cv-legal-list">
            <li className="cv-legal-list-item"><strong>1. Consolidarea bancară a tuturor creditelor:</strong> Dacă veniturile tale sunt încă eligibile, comasarea tuturor datoriilor (rate, carduri, descoperiri de cont) într-un singur credit bancar pe 5 ani poate reduce rata totală lunară cu 30%–50%, eliberând o sumă importantă pentru viața de zi cu zi.</li>
            <li className="cv-legal-list-item"><strong>2. Restructurarea directă cu banca actuală:</strong> Dacă nu te mai califici pentru o refinanțare nouă, poți depune o cerere oficială la banca creditoare actuală pentru prelungirea duratei sau o perioadă de grație de 3–6 luni la plata principalului.</li>
            <li className="cv-legal-list-item"><strong>3. Renunțarea la produsele de tip „revolving”:</strong> Închiderea definitivă a limitelor de card de credit și a overdrafturilor pe măsură ce sunt achitate, pentru a nu cădea din nou în tentația de a le folosi.</li>
          </ul>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">03</span>
            <h2 className="cv-legal-heading">Când Te Ajută Consolidarea și Când NU Rezolvă Problema?</h2>
          </div>
          <div className="cv-legal-grid">
            <div className="cv-legal-card emerald">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><Check size={18} /></div>
                <h3 className="cv-legal-card-title">Consolidarea FUNCȚIONEAZĂ când:</h3>
              </div>
              <p className="cv-legal-card-desc">
                Venitul tău este stabil, dar datoriile erau dispersate la dobânzi mari (IFN, carduri). Prin aducerea lor la o dobândă bancară unică, presiunea lunară scade imediat, permițându-ți să revii la un echilibru financiar sănătos.
              </p>
            </div>

            <div className="cv-legal-card danger">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><X size={18} /></div>
                <h3 className="cv-legal-card-title">Consolidarea NU rezolvă dacă:</h3>
              </div>
              <p className="cv-legal-card-desc">
                Cheltuielile familiei continuă să depășească veniturile reale în fiecare lună. Dacă după comasarea ratelor folosești din nou cardurile eliberate pentru a cumpăra pe credit, datoria totală se va dubla în mai puțin de un an.
              </p>
            </div>
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
