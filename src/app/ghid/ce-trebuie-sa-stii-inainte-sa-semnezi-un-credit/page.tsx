import type { Metadata } from "next";
import Link from "next/link";
import EducationalArticleLayout from "@/components/EducationalArticleLayout";
import { Check, X, CreditCard, ShieldCheck, AlertCircle, FileText, Landmark } from "lucide-react";

export const metadata: Metadata = {
  title: "Ce Trebuie să Înțelegi Înainte Să Semnezi un Credit | Ghid CV Finance",
  description:
    "Ghid complet înainte de semnarea unui credit: dobândă fixă vs variabilă, capcana retragerilor de pe cardul de credit, overdraft, scadențe și comisioane esențiale.",
  keywords: [
    "inainte sa semnezi credit",
    "clauze contract credit",
    "card de credit perioada de gratie",
    "overdraft capcane",
    "retragere numerar card credit",
    "minim de plata card",
  ],
  alternates: { canonical: "/ghid/ce-trebuie-sa-stii-inainte-sa-semnezi-un-credit" },
};

const faqs = [
  {
    q: "De ce nu este recomandat să retragi bani cash de pe un card de credit?",
    a: "Cardul de credit este conceput exclusiv pentru plăți la comercianți (POS sau online). Dacă retragi numerar de la bancomat, pierzi instantaneu perioada de grație, banca începe să calculeze dobândă chiar din ziua retragerii și percepe un comision suplimentar de retragere (adesea 1%–2,5% din sumă plus o taxă fixă).",
  },
  {
    q: "Pot rambursa creditul anticipat în orice moment?",
    a: "Da. Conform legislației europene și românești (OUG 50/2010), ai dreptul legal de a efectua rambursări anticipate oricând dorești, fie parțial, fie total. La creditele cu dobândă variabilă comisionul de rambursare este 0%, iar la cele cu dobândă fixă este de maximum 1% (sau 0,5% dacă a rămas sub 1 an din contract).",
  },
  {
    q: "Ce se întâmplă dacă semnez contractul și mă răzgândesc după câteva zile?",
    a: "La creditele de consum ai un drept legal de retragere în termen de 14 zile calendaristice de la data semnării contractului, fără a trebui să invoci vreun motiv. Va trebui doar să returnezi băncii suma trasă și dobânda acumulată pe cele câteva zile de utilizare.",
  },
];

export default function GhidInainteDeSemnare() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Ce trebuie să înțelegi înainte să semnezi un credit: carduri, overdraft, scadențe și clauze esențiale",
        description: "Ghid practic și explicativ despre clauzele contractuale esențiale, funcționarea cardurilor de credit și a descoperitului de cont.",
        author: { "@type": "Person", name: "Cristian Văduva" },
        publisher: { "@type": "Organization", name: "CV Finance", url: "https://credite.cristianvaduva.com" },
        mainEntityOfPage: "https://credite.cristianvaduva.com/ghid/ce-trebuie-sa-stii-inainte-sa-semnezi-un-credit",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Acasă", item: "https://credite.cristianvaduva.com" },
          { "@type": "ListItem", position: 2, name: "Ghiduri", item: "https://credite.cristianvaduva.com/ghid" },
          { "@type": "ListItem", position: 3, name: "Înainte de Semnare", item: "https://credite.cristianvaduva.com/ghid/ce-trebuie-sa-stii-inainte-sa-semnezi-un-credit" },
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
        slug="ce-trebuie-sa-stii-inainte-sa-semnezi-un-credit"
        category="CONTRACTE ȘI CLAUZE"
        title="Ce Trebuie Să Știi Înainte Să Semnezi un Credit"
        subtitle="Diferențele dintre creditul pe termen fix, cardul de credit și overdraft. Clauzele esențiale pe care trebuie să le citești cu atenție înainte de a pune semnătura."
        readingTime="7 MIN"
        relatedServiceUrl="/credit-nevoi-personale"
        relatedServiceLabel="Consultanță credit de nevoi personale și verificare contracte"
      >
        <section className="cv-legal-section">
          <p className="cv-legal-text">
            Semnarea unui contract de credit este un angajament financiar pe mai mulți ani. De multe ori însă, debitorul primește un dosar de zeci de pagini redactate într-un limbaj juridic dens și este invitat să semneze rapid &bdquo;unde este bifat&rdquo;.
          </p>
          <p className="cv-legal-text">
            O decizie financiară înțeleaptă presupune să înțelegi exact mecanismul prin care funcționează produsul respectiv. Nu toate instrumentele de împrumut sunt la fel: un card de credit funcționează complet diferit față de un credit cu anuități, iar un descoperit de cont ascunde reguli proprii de scadență.
          </p>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">01</span>
            <h2 className="cv-legal-heading">Cele 3 Mari Tipuri de Finanțare pentru Persoane Fizice</h2>
          </div>
          <p className="cv-legal-text">
            Înainte de a alege un produs, asigură-te că folosești instrumentul potrivit pentru nevoia ta:
          </p>

          <div className="cv-legal-grid">
            <div className="cv-legal-card emerald">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><Landmark size={18} /></div>
                <h3 className="cv-legal-card-title">1. Creditul de Nevoi Personale (Termen Fix)</h3>
              </div>
              <p className="cv-legal-card-desc">
                Primești întreaga sumă în cont dintr-o dată și o rambursezi într-un număr fix de luni (până la 60 de luni), prin rate lunare clare.
                <br /><br />
                <strong>Ideal pentru:</strong> achiziții mari, renovări, evenimente sau refinanțarea altor datorii.
              </p>
            </div>

            <div className="cv-legal-card emerald">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><CreditCard size={18} /></div>
                <h3 className="cv-legal-card-title">2. Cardul de Credit (Cardul de Cumpărături)</h3>
              </div>
              <p className="cv-legal-card-desc">
                O linie de credit &bdquo;revolving&rdquo; atașată unui card plastic, concepută pentru tranzacții comerciale și rate fără dobândă la magazine partenere.
                <br /><br />
                <strong>Ideal pentru:</strong> cumpărături curente plătite în perioada de grație (dobândă 0%).
              </p>
            </div>

            <div className="cv-legal-card emerald">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><FileText size={18} /></div>
                <h3 className="cv-legal-card-title">3. Descoperitul de Cont (Overdraft pe Salariu)</h3>
              </div>
              <p className="cv-legal-card-desc">
                Posibilitatea de a cheltui bani peste soldul disponibil din contul curent de salariu (de regulă 1–3 salarii nete).
                <br /><br />
                <strong>Ideal pentru:</strong> tampon de urgență pe câteva zile până la următorul salariu.
              </p>
            </div>
          </div>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">02</span>
            <h2 className="cv-legal-heading">Capcanele Majore ale Cardurilor de Credit</h2>
          </div>
          <p className="cv-legal-text">
            Cardul de credit este un instrument excelent dacă este folosit conform destinației sale și extrem de costisitor dacă este utilizat greșit:
          </p>

          <div className="cv-legal-grid">
            <div className="cv-legal-card danger">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><X size={18} /></div>
                <h3 className="cv-legal-card-title">Retragerile de numerar de la bancomat</h3>
              </div>
              <p className="cv-legal-card-desc">
                Perioada de grație cu dobândă 0% se aplică <strong>exclusiv la plățile cu cardul la comercianți</strong>. Dacă scoți bani cash din bancomat, banca îți percepe comision de retragere imediat (adesea 1%–2,5%) și începe să calculeze dobândă chiar din ziua respectivă.
              </p>
            </div>

            <div className="cv-legal-card danger">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><X size={18} /></div>
                <h3 className="cv-legal-card-title">Iluzia sumei minime de plată</h3>
              </div>
              <p className="cv-legal-card-desc">
                În fiecare lună, extrasul îți arată o &bdquo;sumă minimă de plată&rdquo; (de exemplu 2%–5% din soldul utilizat). Dacă achiți doar această sumă minimă, plătești aproape exclusiv dobânda acumulată; vei avea nevoie de zeci de ani pentru a închide datoria, plătind de câteva ori suma cheltuită inițial.
              </p>
            </div>
          </div>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">03</span>
            <h2 className="cv-legal-heading">Lista de Verificare Înainte de Semnătură (Checklist)</h2>
          </div>
          <p className="cv-legal-text">
            Înainte de a semna contractul definitiv de credit, verifică punctual aceste 6 aspecte:
          </p>
          <ul className="cv-legal-list">
            <li className="cv-legal-list-item"><strong>DAE și valoarea totală de plată:</strong> Asigură-te că ai primit Fișa Europeană Standardizată (SECCI) și cunoști suma totală pe care o vei returna băncii.</li>
            <li className="cv-legal-list-item"><strong>Natura dobânzii:</strong> Este fixă pe toată durata sau variabilă după primii ani? Dacă este variabilă, care este marja băncii și la ce indice este raportată?</li>
            <li className="cv-legal-list-item"><strong>Pachetul de cont curent:</strong> Ce costuri lunare de administrare are contul în care virezi rata? Există cerințe de încasare lunară a unui anumit venit?</li>
            <li className="cv-legal-list-item"><strong>Asigurarea atașată:</strong> Este obligatorie sau facultativă? Cât costă prima lunară și ce riscuri acoperă cu adevărat?</li>
            <li className="cv-legal-list-item"><strong>Data scadenței:</strong> Setează data de plată a ratei la 2–3 zile după data în care încasezi de regulă salariul, pentru a evita întârzieri accidentale cauzate de zile libere legale sau weekenduri.</li>
            <li className="cv-legal-list-item"><strong>Dreptul de retragere în 14 zile:</strong> Ține minte că legea îți acordă 14 zile calendaristice de la semnare pentru a te răzgândi fără nicio justificare.</li>
          </ul>
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
