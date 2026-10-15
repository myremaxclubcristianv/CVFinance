import type { Metadata } from "next";
import Link from "next/link";
import EducationalArticleLayout from "@/components/EducationalArticleLayout";
import { Check, X, Calculator, ShieldCheck, Scale, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Când Are Sens Refinanțarea unui Credit? | Ghid CV Finance",
  description:
    "Ghid de analiză financiară: când merită cu adevărat să refinanțezi un credit, când este o decizie neprofitabilă, ce taxe notariale și comisioane trebuie luate în calcul.",
  keywords: [
    "cand are sens refinantarea",
    "merita sa refinantez",
    "costuri refinantare credit",
    "economie refinantare rata",
    "refinantare cand nu merita",
    "calcul eficienta refinantare",
  ],
  alternates: { canonical: "/ghid/cand-are-sens-refinantarea-unui-credit" },
};

const faqs = [
  {
    q: "Ce diferență de dobândă justifică o refinanțare?",
    a: "La creditele de consum și nevoi personale (fără ipotecă), o reducere de chiar 1,5%–2% a dobânzii poate aduce economii vizibile, deoarece costurile de transfer sunt minime (adesea doar comisionul de analiză al noii bănci). La creditele ipotecare, unde apar taxe notariale, intabulare și evaluare (1.500–3.000 lei), este recomandată o diferență de cel puțin 1%–1,5% la dobândă și o perioadă rămasă de peste 5 ani pentru a amortiza cheltuielile.",
  },
  {
    q: "Pot refinanța un credit de la o bancă la aceeași bancă?",
    a: "Da, acest proces poartă denumirea de renegociere internă sau restructurare. Unele bănci acceptă actualizarea dobânzii la noile oferte promoționale pentru a păstra clientul, scutindu-te de cheltuielile de transfer către o altă instituție.",
  },
  {
    q: "Dacă mai am 18 luni de plată, are rost să refinanțez?",
    a: "În marea majoritate a cazurilor, nu. Pe finalul creditului plătești aproape exclusiv suma împrumutată (principalul), iar dobânda lunară este deja foarte mică. Deschiderea unui credit nou va presupune noi costuri inițiale care depășesc economia nesemnificativă de dobândă.",
  },
];

export default function GhidCandAreSensRefinantarea() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Refinanțarea: când are sens financiar și în ce situații nu este avantajoasă",
        description: "Analiză comparativă privind rentabilitatea refinanțării, costurile ascunse de transfer și pragul de rentabilitate.",
        author: { "@type": "Person", name: "Cristian Văduva" },
        publisher: { "@type": "Organization", name: "CV Finance", url: "https://credite.cristianvaduva.com" },
        mainEntityOfPage: "https://credite.cristianvaduva.com/ghid/cand-are-sens-refinantarea-unui-credit",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Acasă", item: "https://credite.cristianvaduva.com" },
          { "@type": "ListItem", position: 2, name: "Ghiduri", item: "https://credite.cristianvaduva.com/ghid" },
          { "@type": "ListItem", position: 3, name: "Când Merită Refinanțarea", item: "https://credite.cristianvaduva.com/ghid/cand-are-sens-refinantarea-unui-credit" },
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
        slug="cand-are-sens-refinantarea-unui-credit"
        category="REFINANȚARE ȘI OPTIMIZARE"
        title="Când Are Sens Refinanțarea și Când NU Merită?"
        subtitle="Cum pui în balanță reducerea ratei lunare cu suma totală de rambursat, noile comisioane, taxele notariale și perioada rămasă."
        readingTime="7 MIN"
        relatedServiceUrl="/refinantare-credit"
        relatedServiceLabel="Analiză gratuită refinanțare și simulare costuri"
      >
        <section className="cv-legal-section">
          <p className="cv-legal-text">
            Refinanțarea este adesea prezentată în campaniile de marketing ca un pas obligatoriu spre prosperitate: &bdquo;vino la noi și îți tăiem rata!&rdquo;. În practica financiară responsabilă, refinanțarea este o tranzacție matematică: schimbi un contract existent pe unul nou, iar acest schimb implică atât oportunități, cât și costuri fixe de transfer.
          </p>
          <p className="cv-legal-text">
            Pentru a stabili dacă o refinanțare merită efortul, trebuie să calculăm ceea ce economiștii numesc <strong>punctul de amortizare</strong>: în câte luni economia lunară din rată acoperă complet toate costurile generate de închiderea creditului vechi și deschiderea celui nou.
          </p>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">01</span>
            <h2 className="cv-legal-heading">Situațiile în Care Refinanțarea Are Sens Indiscutabil</h2>
          </div>
          <div className="cv-legal-grid">
            <div className="cv-legal-card emerald">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><Check size={18} /></div>
                <h3 className="cv-legal-card-title">1. Ai credite scumpe nebancare (IFN)</h3>
              </div>
              <p className="cv-legal-card-desc">
                Dacă plătești dobânzi IFN de zeci sau sute de procente pe an, trecerea la un credit bancar standard (chiar și la o dobândă medie de 8%–10%) este cea mai rentabilă mișcare financiară posibilă, economisind mii de lei încă din prima lună.
              </p>
            </div>

            <div className="cv-legal-card emerald">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><Check size={18} /></div>
                <h3 className="cv-legal-card-title">2. Ești în primii 2–3 ani dintr-un credit pe 25–30 ani</h3>
              </div>
              <p className="cv-legal-card-desc">
                La un credit ipotecar recent, unde plătești aproape 80% dobândă lunară, o scădere cu doar 1% a marjei băncii poate reduce totalul dobânzii plătite cu peste 50.000 – 100.000 lei pe parcursul vieții împrumutului.
              </p>
            </div>

            <div className="cv-legal-card emerald">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><Check size={18} /></div>
                <h3 className="cv-legal-card-title">3. Trecerea de la variabil la fix într-un context volatil</h3>
              </div>
              <p className="cv-legal-card-desc">
                Refinanțarea unui credit cu dobândă variabilă legată de IRCC sau ROBOR într-un credit cu dobândă fixă pe 3–5 ani îți oferă predictibilitate totală a cheltuielilor lunare.
              </p>
            </div>
          </div>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">02</span>
            <h2 className="cv-legal-heading">Situațiile în Care Refinanțarea NU Este Recomandată</h2>
          </div>
          <div className="cv-legal-grid">
            <div className="cv-legal-card danger">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><X size={18} /></div>
                <h3 className="cv-legal-card-title">1. Creditul este aproape achitat</h3>
              </div>
              <p className="cv-legal-card-desc">
                Dacă ești în ultimele 12–24 de luni ale contractului, dobânda a fost plătită aproape integral în primii ani conform graficului anuitant. Comisioanele noului credit vor depăși economia infimă de dobândă rămasă.
              </p>
            </div>

            <div className="cv-legal-card danger">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><X size={18} /></div>
                <h3 className="cv-legal-card-title">2. Costurile notariale și de evaluare sunt prea mari</h3>
              </div>
              <p className="cv-legal-card-desc">
                La ipotecare, cheltuielile cu notariatul, radierea ipotecii vechi, reînscrierea ipotecii noi și raportul de evaluare se ridică la 2.000–3.500 lei. Dacă diferența de rată este de doar 40 lei/lună, vei avea nevoie de peste 6 ani doar pentru a-ți recupera cheltuielile!
              </p>
            </div>

            <div className="cv-legal-card danger">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><X size={18} /></div>
                <h3 className="cv-legal-card-title">3. Schimbul unei rate mici pe o durată dublată</h3>
              </div>
              <p className="cv-legal-card-desc">
                Dacă refinanțezi un credit care mai avea 2 ani pentru a-l întinde pe 5 ani noi, rata lunară va scădea, dar vei returna băncii o sumă totală considerabil mai mare. Este o decizie acceptabilă doar în caz de criză acută de lichiditate.
              </p>
            </div>
          </div>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">03</span>
            <h2 className="cv-legal-heading">Exemplu Ilustrativ de Calcul: Când se Amortizează Costurile?</h2>
          </div>
          <p className="cv-legal-text">
            Să presupunem că refinanțezi un credit ipotecar cu sold de <strong>250.000 lei</strong>, rămas pe <strong>20 de ani</strong>:
          </p>
          <ul className="cv-legal-list">
            <li className="cv-legal-list-item"><strong>Rată lunară veche:</strong> 2.250 lei / lună</li>
            <li className="cv-legal-list-item"><strong>Rată lunară nouă (negociată):</strong> 1.950 lei / lună (economie de <strong>300 lei / lună</strong>)</li>
            <li className="cv-legal-list-item"><strong>Costuri totale de transfer:</strong> Evaluare imobil (500 lei) + Notar și carte funciară (1.800 lei) + Taxă dosar (300 lei) = <strong>2.600 lei</strong></li>
            <li className="cv-legal-list-item"><strong>Timp de amortizare:</strong> 2.600 lei ÷ 300 lei/lună = <strong>≈ 8,6 luni</strong>.</li>
          </ul>

          <div className="cv-legal-callout">
            <div className="cv-legal-callout-title">DECIZIE CLARĂ PE BAZĂ DE CIFRE</div>
            <p className="cv-legal-callout-text">
              În acest scenariu, refinanțarea își recuperează complet cheltuielile în primele 9 luni. Începând cu luna a 10-a și până la finalul celor 20 de ani, economia netă adunată în bugetul familiei depășește <strong>68.000 lei</strong>. Aceasta este o refinanțare justificată economic.
            </p>
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
