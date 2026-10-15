import type { Metadata } from "next";
import Link from "next/link";
import EducationalArticleLayout from "@/components/EducationalArticleLayout";
import { AlertTriangle, Check, X, Calculator, ShieldAlert, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Credite Rapide și IFN-uri: Cum Înțelegi Costul Real | Ghid CV Finance",
  description:
    "Află cum se calculează dobânda la creditele IFN: diferența dintre dobânda zilnică (1%/zi), dobânda simplă anualizată (365%) și DAE compusă. Cum eviți spirala datoriilor.",
  keywords: [
    "credite rapide cost real",
    "dobanda zilnica ifn",
    "calcul dae ifn",
    "1 la suta pe zi dae",
    "rostogolire sold ifn",
    "refinantare ifn bancar",
  ],
  alternates: { canonical: "/ghid/credite-rapide-ifn-cost-real" },
};

const faqs = [
  {
    q: "De ce promovează IFN-urile dobânda pe zi în loc de dobândă pe an?",
    a: "Exprimarea costului „la zi” (de exemplu 0,8% sau 1% pe zi) are un puternic efect psihologic: 1 leu la 100 de lei împrumutați sună nesemnificativ. Însă raportat la 365 de zile dintr-un an, acest procent se traduce într-o dobândă nominală simplă de 365% și într-un DAE compus astronomic.",
  },
  {
    q: "Ce înseamnă „comision de prelungire” sau rostogolire de sold?",
    a: "Dacă la scadență nu poți returna întreaga sumă, multe IFN-uri îți oferă posibilitatea de a plăti o taxă de prelungire (de exemplu 300–500 lei pentru încă 30 de zile). Această plată reprezintă un cost pur: nu scade nici măcar cu 1 leu din datoria inițială, amânând doar problema cu o lună.",
  },
  {
    q: "Se pot închide mai multe credite IFN printr-un singur credit bancar?",
    a: "Da. Dacă deții un venit stabil declarat și nu ai restanțe grave înregistrate la Biroul de Credit în acest moment, refinanțarea creditelor IFN printr-un credit bancar de nevoi personale reduce costul anual de la sute de procente la o dobândă bancară standard (de regulă 7%–10% pe an).",
  },
];

export default function GhidCrediteRapideIFN() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Credite rapide și IFN-uri: cum înțelegi costul real (dobândă zilnică, DAE și riscuri)",
        description: "Analiză matematică și practică a costurilor creditelor nebancare rapide și soluții de ieșire din supraîndatorare.",
        author: { "@type": "Person", name: "Cristian Văduva" },
        publisher: { "@type": "Organization", name: "CV Finance", url: "https://credite.cristianvaduva.com" },
        mainEntityOfPage: "https://credite.cristianvaduva.com/ghid/credite-rapide-ifn-cost-real",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Acasă", item: "https://credite.cristianvaduva.com" },
          { "@type": "ListItem", position: 2, name: "Ghiduri", item: "https://credite.cristianvaduva.com/ghid" },
          { "@type": "ListItem", position: 3, name: "Cost Real IFN", item: "https://credite.cristianvaduva.com/ghid/credite-rapide-ifn-cost-real" },
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
        slug="credite-rapide-ifn-cost-real"
        category="CREDITE NEBANCARE (IFN)"
        title="Credite Rapide și IFN-uri: Cum Înțelegi Costul Real"
        subtitle="De la „1% pe zi” la mii de procente DAE. Cum funcționează matematica împrumuturilor nebancare și cum eviți capcana prelungirilor repetate."
        readingTime="7 MIN"
        relatedServiceUrl="/refinantare-credit"
        relatedServiceLabel="Refinanțarea creditelor IFN printr-un credit bancar standard"
      >
        <section className="cv-legal-section">
          <p className="cv-legal-text">
            Creditele rapide acordate de instituțiile financiare nebancare (IFN) răspund unei nevoi urgente: bani virați pe card în câteva ore, adesea doar cu buletinul și un extras de cont, fără birocrația îndelungată a unei bănci mari.
          </p>
          <p className="cv-legal-text">
            Această viteză vine însă cu cel mai scump preț din întreaga piață financiară. În timp ce un credit bancar standard de nevoi personale are un DAE de aproximativ 8% – 12% pe an, un credit IFN poate atinge DAE-uri de sute sau chiar mii de procente pe an. Pentru a lua decizii mature, trebuie să înțelegem matematica din spatele acestor oferte.
          </p>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">01</span>
            <h2 className="cv-legal-heading">Matematica Dobânzii de 1% pe Zi: Simplă vs. Compusă</h2>
          </div>
          <p className="cv-legal-text">
            Când vezi un mesaj de tipul „doar 1% dobândă pe zi”, mintea umană percepe o cifră mică. În realitate, există o diferență matematică fundamentală între <em>anualizarea simplă</em> și <em>capitalizarea compusă</em>:
          </p>

          <div className="cv-legal-grid">
            <div className="cv-legal-card danger">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><Calculator size={18} /></div>
                <h3 className="cv-legal-card-title">1. Dobânda simplă anualizată</h3>
              </div>
              <p className="cv-legal-card-desc">
                Calcul liniar: 1% pe zi × 365 de zile = <strong>365% pe an</strong>.
                <br /><br />
                Asta înseamnă că la 5.000 lei împrumutați, doar dobânda brută pe un an ar fi de 18.250 lei, returnând în total 23.250 lei fără a lua în calcul comisioanele.
              </p>
            </div>

            <div className="cv-legal-card danger">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><Calculator size={18} /></div>
                <h3 className="cv-legal-card-title">2. Dobânda compusă (formula DAE)</h3>
              </div>
              <p className="cv-legal-card-desc">
                Dacă dobânda neachitată zilnic se adaugă la soldul datorat: (1 + 0,01)<sup>365</sup> − 1 = <strong>peste 3.678% DAE</strong>.
                <br /><br />
                Aceasta este formula oficială a Dobânzii Anuale Efective, care reflectă costul capitalizării dobânzilor pe termen lung.
              </p>
            </div>
          </div>

          <p className="cv-legal-text">
            Deși un credit rapid este gândit să dureze doar 30 de zile, gravitatea apare atunci când debitorul nu poate rambursa suma la scadență și începe să prelungească datoria de la o lună la alta.
          </p>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">02</span>
            <h2 className="cv-legal-heading">Exemplu Ilustrativ: Capcana Prelungirii (Rostogolirea Soldului)</h2>
          </div>
          <p className="cv-legal-text">
            Să analizăm cazul ipotetic al unui împrumut de <strong>3.000 RON</strong> contractat pentru 30 de zile la un IFN:
          </p>
          <ul className="cv-legal-list">
            <li className="cv-legal-list-item"><strong>La scadență (ziua 30):</strong> Ai de returnat 3.000 lei (principal) + 900 lei (dobândă) = <strong>3.900 lei</strong>.</li>
            <li className="cv-legal-list-item"><strong>Dacă nu ai 3.900 lei disponibili:</strong> Ți se propune plata unei „taxe de amânare” de 900 lei pentru încă 30 de zile.</li>
            <li className="cv-legal-list-item"><strong>După 6 luni de prelungiri repetate:</strong> Ai plătit 6 × 900 lei = <strong>5.400 lei doar în comisioane de amânare</strong>, dar datorezi în continuare exact 3.000 lei la fel ca în prima zi!</li>
          </ul>

          <div className="cv-legal-callout">
            <div className="cv-legal-callout-title">AVERTISMENT PRIVIND SUPRAÎNDATORAREA</div>
            <p className="cv-legal-callout-text">
              Comisioanele de prelungire nu reduc datoria. Ele reprezintă doar prețul amânării scadenței. Dacă plătești prelungiri lunare la 2 sau 3 IFN-uri simultan, banii tăi de salariu dispar fără ca nivelul datoriilor să scadă cu vreun leu.
            </p>
          </div>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">03</span>
            <h2 className="cv-legal-heading">Alternative Reale Înainte Să Semnezi cu un IFN</h2>
          </div>
          <p className="cv-legal-text">
            Dacă ai nevoie urgentă de lichidități, explorează întotdeauna aceste alternative înainte de a accesa un credit cu dobândă zilnică:
          </p>
          <div className="cv-legal-grid">
            <div className="cv-legal-card emerald">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><Check size={18} /></div>
                <h3 className="cv-legal-card-title">Descoperit de cont (Overdraft bancar)</h3>
              </div>
              <p className="cv-legal-card-desc">
                Aproape toate băncile unde încasezi salariul oferă o linie de 1–3 salarii pe card. Dobânda anuală este de 10%–14% pe an (adică sub 0,04% pe zi), de 25 de ori mai ieftin decât un IFN.
              </p>
            </div>

            <div className="cv-legal-card emerald">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><Check size={18} /></div>
                <h3 className="cv-legal-card-title">Card de credit cu perioadă de grație</h3>
              </div>
              <p className="cv-legal-card-desc">
                Dacă plătești comercianți sau facturi, ai până la 45–55 de zile dobândă 0% dacă rambursezi integral suma în perioada de grație.
              </p>
            </div>

            <div className="cv-legal-card emerald">
              <div className="cv-legal-card-header">
                <div className="cv-legal-card-icon"><Check size={18} /></div>
                <h3 className="cv-legal-card-title">Avans din salariu sau sprijin familial</h3>
              </div>
              <p className="cv-legal-card-desc">
                O discuție sinceră cu angajatorul pentru un avans din munca deja prestată este întotdeauna mai demnă și infinit mai ieftină decât un contract nebancar împovărător.
              </p>
            </div>
          </div>
        </section>

        <section className="cv-legal-section">
          <div className="cv-legal-section-header">
            <span className="cv-legal-num">04</span>
            <h2 className="cv-legal-heading">Cum Ieși Dintr-o Situație cu Credite IFN Multiple?</h2>
          </div>
          <p className="cv-legal-text">
            Dacă ai acumulat deja mai multe împrumuturi IFN, cel mai periculos lucru pe care îl poți face este să iei un alt IFN pentru a le stinge. Strategia corectă este:
          </p>
          <ul className="cv-legal-list">
            <li className="cv-legal-list-item"><strong>1. Oprește cererile noi de creditare:</strong> Fiecare refuz suplimentar îți reduce șansele de redresare.</li>
            <li className="cv-legal-list-item"><strong>2. Centralizează toate soldurile:</strong> Adună contractele, află exact ce sumă principală mai ai de plătit la fiecare și care sunt dobânzile acumulate.</li>
            <li className="cv-legal-list-item"><strong>3. Verifică posibilitatea unei refinanțări bancare:</strong> Dacă ai venituri raportate la ANAF și nu ai întârzieri mari active, un credit bancar de nevoi personale poate stinge toate IFN-urile dintr-o singură mișcare, înlocuindu-le cu o singură rată lunară de câteva ori mai mică.</li>
          </ul>
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
