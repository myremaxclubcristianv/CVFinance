import type { Metadata } from "next";
import Link from "next/link";
import EducationalArticleLayout from "@/components/EducationalArticleLayout";
import { Scale, Check, X, ShieldCheck, AlertCircle, FileText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Istoricul de Credit: Rectificări Legale și Opțiuni Realiste | Ghid CV Finance",
  description:
    "Ghid despre funcționarea Biroului de Credit: cum verifici corectitudinea datelor, când există motive legale de rectificare și cum îți refaci scorul FICO pas cu pas.",
  keywords: [
    "istoricul de credit explicat",
    "rectificare legala biroul de credit",
    "scor fico refacere",
    "cum stergi date eronate birou credit",
    "raport biroul de credit online",
    "intarzieri biroul de credit",
  ],
  alternates: { canonical: "/ghid/istoricul-de-credit-biroul-de-credit-optiuni" },
};

const faqs = [
  {
    q: "Cum pot verifica gratuit datele mele din Biroul de Credit?",
    a: "Conform Regulamentului GDPR și legislației românești, ai dreptul de a obține gratuit un raport complet o dată pe an direct de pe site-ul oficial birouldecredit.ro, înrolându-te în portalul securizat pentru persoane fizice pe baza CNP-ului și a unui cod de validare primit prin SMS.",
  },
  {
    q: "Dacă achit integral o datorie restantă, se șterge automat din raport?",
    a: "Nu. Plata restanței nu șterge istoricul trecut, ci actualizează starea contractului: soldul restant devine 0 lei, iar numărul zilelor de întârziere nu mai crește. Din momentul achitării integrale, începe să curgă termenul legal de 4 ani după care înregistrarea este arhivată și ștearsă din sistem.",
  },
  {
    q: "Cum pot îmbunătăți un scor FICO scăzut?",
    a: "Scorul FICO se reface prin comportament consecvent: achită toate ratele și facturile înainte de scadență, redu gradul de utilizare a cardurilor de credit (ideal sub 30% din limita aprobată), închide conturile inactive și evită depunerea de cereri noi de credit timp de minimum 6 luni.",
  },
];

export default function GhidIstoricCreditOptiuni() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Istoricul de credit: rectificări legale, întârzieri și opțiuni realiste de finanțare",
        description: "Ghid detaliat despre verificarea raportului de credit, temeiurile legale de contestare și pașii de redresare financiară.",
        author: { "@type": "Person", name: "Cristian Văduva" },
        publisher: { "@type": "Organization", name: "CV Finance", url: "https://credite.cristianvaduva.com" },
        mainEntityOfPage: "https://credite.cristianvaduva.com/ghid/istoricul-de-credit-biroul-de-credit-optiuni",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Acasă", item: "https://credite.cristianvaduva.com" },
          { "@type": "ListItem", position: 2, name: "Ghiduri", item: "https://credite.cristianvaduva.com/ghid" },
          { "@type": "ListItem", position: 3, name: "Istoric de Credit", item: "https://credite.cristianvaduva.com/ghid/istoricul-de-credit-biroul-de-credit-optiuni" },
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
        slug="istoricul-de-credit-biroul-de-credit-optiuni"
        category="BIROUL DE CREDIT"
        title="Istoricul de Credit: Rectificări Legale și Opțiuni Realiste"
        subtitle="Cum funcționează baza de date a Biroului de Credit, când există temei juridic pentru corectarea raportărilor și cum îți reconstruiești profilul bancar."
        readingTime="8 MIN"
        relatedServiceUrl="/stergere-birou-credit"
        relatedServiceLabel="Consultanță și analiză Biroul de Credit"
      >
        <section className="cv-legal-section">
          <p className="cv-legal-text">
            Istoricul de credit este „cartea de vizită” financiară a oricărui cetățean care a interacționat vreodată cu sistemul bancar sau nebancar din România. Fiecare rată plătită la timp construiește reputație, în timp ce fiecare scadență depășită cu peste 30 de zile lasă o amprentă vizibilă în baza de date centralizată.
          </p>
          <p className="cv-legal-text">
            Există însă multă confuzie și dezinformare legată de ce se poate și ce nu se poate face cu aceste raportări. Unii cred că orice restanță înseamnă excludere pe viață din bănci, în timp ce alții cad pradă iluziei că cineva le poate „șterge istoricul” contra cost în câteva ore. Realitatea este ghidată de proceduri juridice clare.
          </p>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">01</span>
            <h2 className="cv-legal-heading">Verificarea Acurateței: Cum Citești Raportul Tău</h2>
          </div>
          <p className="cv-legal-text">
            Înainte de a bănui vreo problemă, primul pas rațional este să îți consulți raportul oficial de credit. În acest document vei găsi:
          </p>
          <ul className="cv-legal-list">
            <li className="cv-legal-list-item"><strong>Scorul FICO (între 300 și 850 puncte):</strong> O formulă statistică care evaluează probabilitatea ca debitorul să își achite ratele la timp în următoarele 12 luni.</li>
            <li className="cv-legal-list-item"><strong>Starea fiecărui cont:</strong> credite active, credite închise, descoperiri de cont și carduri de cumpărături.</li>
            <li className="cv-legal-list-item"><strong>Codurile de întârziere (1, 2, 3, 4, 5, 6):</strong> fiecare cifră reprezintă tranșa de întârziere (1 = 30-59 zile, 2 = 60-89 zile etc.), iar literele speciale indică trecerea la recuperare de creanțe sau executare silită.</li>
          </ul>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">02</span>
            <h2 className="cv-legal-heading">Când Poți Solicita Legal Rectificarea sau Radierea?</h2>
          </div>
          <p className="cv-legal-text">
            O cerere de rectificare are șanse de succes exclusiv dacă este motivată pe nerespectarea dispozițiilor legale de către instituția raportoare:
          </p>

          <div className="cv-legal-grid">
            <div className="cv-legal-card emerald">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><Scale size={18} /></div>
                <h3 className="cv-legal-card-title">1. Viciu de procedură (Lipsa preavizului)</h3>
              </div>
              <p className="cv-legal-card-desc">
                Creditorul este obligat prin lege să trimită o înștiințare scrisă cu cel puțin 15 zile calendaristice înainte de raportare. Dacă banca nu poate dovedi transmiterea dovezii de notificare, raportarea este lovită de nulitate procedurală.
              </p>
            </div>

            <div className="cv-legal-card emerald">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><Scale size={18} /></div>
                <h3 className="cv-legal-card-title">2. Erori materiale de evidență</h3>
              </div>
              <p className="cv-legal-card-desc">
                Situații în care ai achitat rata, dar banii au rămas blocați într-un cont tranzitoriu sau au fost alocați cu întârziere din cauza unor probleme IT, generând un incident de plată inexistent în fapt.
              </p>
            </div>

            <div className="cv-legal-card emerald">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><Scale size={18} /></div>
                <h3 className="cv-legal-card-title">3. Depășirea termenului de 4 ani</h3>
              </div>
              <p className="cv-legal-card-desc">
                Dacă au trecut mai mult de 4 ani de la stingerea completă a debitului și închiderea contului, iar raportarea figurează încă activă, radierea se efectuează de drept la simpla sesizare.
              </p>
            </div>
          </div>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">03</span>
            <h2 className="cv-legal-heading">Planul în 4 Pași pentru Refacerea Profilului Bancar</h2>
          </div>
          <p className="cv-legal-text">
            Dacă raportarea negativă este corectă și nu poate fi contestată, nu înseamnă că nu vei mai putea accesa niciodată un credit. Iată cum se reconstruiește treptat bonitatea financiară:
          </p>
          <ul className="cv-legal-list">
            <li className="cv-legal-list-item"><strong>Pasul 1 — Stingerea tuturor restanțelor curente:</strong> Cât timp ai chiar și 50 de lei restanți la un creditor, nicio bancă responsabilă nu va analiza un dosar nou. Închide mai întâi orice sumă restantă.</li>
            <li className="cv-legal-list-item"><strong>Pasul 2 — Oprirea aplicărilor consecutive:</strong> Fiecare refuz bancar adaugă o interogare în sistem. Fă o pauză totală de minimum 3–6 luni fără nicio cerere de creditare nouă.</li>
            <li className="cv-legal-list-item"><strong>Pasul 3 — Comportament impecabil pe produsele rămase:</strong> Dacă deții un card de salariu sau un abonament, achită totul cu 2–3 zile înainte de termenul limită.</li>
            <li className="cv-legal-list-item"><strong>Pasul 4 — Abordarea instituțiilor cu norme flexibile:</strong> Când revii în piață, adresează-te unui consultant care știe ce bănci acceptă dosare cu istoric reabilitat sau folosește un codebitor/girant cu profil curat pentru garantare.</li>
          </ul>

          <div className="cv-legal-callout">
            <div className="cv-legal-callout-title">REALISM ȘI DEMNITATE</div>
            <p className="cv-legal-callout-text">
              Trecerea timpului și disciplina financiară vindecă orice istoric negativ. Biroul de Credit nu este o pedeapsă veșnică, ci un istoric dinamic care se îmbunătățește constant odată ce comportamentul tău de plată devine stabil.
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
