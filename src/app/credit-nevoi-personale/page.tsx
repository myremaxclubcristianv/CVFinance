import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X, ShieldCheck, ArrowLeft, Landmark, Car, Home, GraduationCap, HeartPulse, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Credit de Nevoi Personale România | Ghid & Comparare Oferte | CV Finance",
  description:
    "Ghid complet pentru credite de nevoi personale. Compară dobânzile fixe și variabile, DAE, gradul de îndatorare și află soluțiile potrivite pentru proiecte personale, auto, renovări sau studii.",
  keywords: [
    "credit nevoi personale",
    "credit consum",
    "dobanda credit nevoi personale",
    "credit nevoi personale dae",
    "credit auto",
    "credit renovare",
    "calculator credit nevoi personale",
    "broker credite romania",
  ],
  alternates: { canonical: "/credit-nevoi-personale" },
};

const loanCategories = [
  {
    icon: Home,
    title: "Renovare & Amenajare Locuință",
    desc: "Finanțare pentru modernizarea locuinței, achiziție de mobilier sau materiale de construcții, fără necesitatea ipotecării imobilului.",
  },
  {
    icon: Car,
    title: "Finanțare Auto & Mobilitate",
    desc: "Pentru achiziția unui autoturism nou sau rulat, cu posibilitatea de a deține proprietatea directă pe numele tău din prima zi, fără CASCO obligatoriu în anumite oferte.",
  },
  {
    icon: GraduationCap,
    title: "Studii & Formare Profesională",
    desc: "Acoperirea costurilor pentru cursuri de specializare, masterat, studii universitare sau certificări internaționale care îți sporesc potențialul de venit.",
  },
  {
    icon: HeartPulse,
    title: "Cheltuieli Medicale & Tratamente",
    desc: "Lichidități rapide pentru intervenții chirurgicale, tratamente stomatologice sau recuperare medicală urgentă, cu rambursare flexibilă.",
  },
  {
    icon: Landmark,
    title: "Nevoi Generale & Planuri Personale",
    desc: "Fonduri fără justificarea destinației către bancă, utilizabile conform priorităților familiei tale.",
  },
  {
    icon: ShieldCheck,
    title: "Soluții pentru Istoric Dificil (unde este permis)",
    desc: "Pentru aplicanți care au avut mici întârzieri în trecut, identificăm finanțatorii parteneri ale căror norme interne acceptă profilul respectiv.",
  },
];

const faqs = [
  {
    q: "Care este suma maximă ce poate fi obținută printr-un credit de nevoi personale?",
    a: "Suma maximă depinde de venitul tău net lunar eligibil, de gradul de îndatorare stabilit conform reglementărilor BNR (în general maximum 40% din venitul net) și de politicile băncii alese. În practică, sumele se situează de regulă între 10.000 RON și 150.000 – 200.000 RON, pe o perioadă de până la 5 ani.",
  },
  {
    q: "Ce condiții generale de eligibilitate trebuie îndeplinite?",
    a: "În mod standard, creditorii solicită: contract de muncă pe perioadă nedeterminată (sau venituri stabile din PFA, pensii, dividende etc.), o vechime de minimum 3–6 luni la actualul angajator și minimum 12 luni vechime totală în muncă, precum și lipsa unor restanțe severe active în Biroul de Credit.",
  },
  {
    q: "Ce este mai avantajos: dobândă fixă sau dobândă variabilă?",
    a: "La creditele de nevoi personale pe 5 ani, dobânda fixă este adesea recomandată deoarece oferă predictibilitate totală: rata ta lunară rămâne neschimbată indiferent de fluctuațiile indicelui IRCC sau ale pieței financiare. Dobânda variabilă poate porni de la un nivel inițial mai redus, dar implică riscul creșterii ratei în viitor.",
  },
  {
    q: "Toate categoriile de credite sunt disponibile la toți partenerii?",
    a: "Nu. Fiecare instituție financiară are propriul portofoliu de produse și criterii distincte de risc. Anumite bănci oferă condiții excelente pentru sume mari cu dobândă fixă, în timp ce altele sunt mai flexibile în evaluarea veniturilor suplimentare (ore suplimentare, tichete, diurne) sau a clienților cu mici incidente din trecut.",
  },
  {
    q: "Cât durează procesul de la discuția inițială până la primirea banilor?",
    a: "După verificarea documentelor și alegerea ofertei optime, aprobarea bancară se obține în general între 24 de ore și 3 zile lucrătoare, în funcție de creditor și de modul în care datele tale de venit sunt raportate la ANAF.",
  },
];

export default function CreditNevoiPersonale() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        name: "CV Finance — Credit de Nevoi Personale",
        url: "https://credite.cristianvaduva.com/credit-nevoi-personale",
        description: "Serviciu independent de comparare, selecție și intermediere a creditelor de nevoi personale și de consum în România.",
        areaServed: "RO",
        serviceType: "Credit de Nevoi Personale",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Acasă", item: "https://credite.cristianvaduva.com" },
          { "@type": "ListItem", position: 2, name: "Credit de Nevoi Personale", item: "https://credite.cristianvaduva.com/credit-nevoi-personale" },
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
              <span>SERVICII DE FINANȚARE / PERSOANE FIZICE</span>
            </span>
            <h1 className="cv-legal-title">
              Credit de Nevoi Personale: Compară Ofertele Înainte Să Alegi
            </h1>
            <p className="cv-legal-sub">
              Nu toate creditele de consum sunt la fel. Analizăm DAE-ul, comisioanele ascunse, asigurările obligatorii și gradul tău de îndatorare pentru a identifica varianta care are sens pentru bugetul tău.
            </p>
            <div className="cv-legal-meta">
              <span>CONSULTANȚĂ FINANCIARĂ INDEPENDENTĂ</span>
              <span>•</span>
              <span>ANALIZĂ FĂRĂ COSTURI INIȚIALE</span>
            </div>
          </div>

          {/* Cuprins tematic */}
          <nav className="cv-legal-toc" aria-label="Cuprins articol">
            <div className="cv-legal-toc-title">
              <span>CUPRINS TEMATIC</span>
            </div>
            <ul className="cv-legal-toc-list">
              <li className="cv-legal-toc-item">
                <a href="#cum-functioneaza-creditul"><span className="cv-legal-toc-num">01</span> Caracteristicile creditului de consum</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#destinatii-finantare"><span className="cv-legal-toc-num">02</span> Categorii de finanțare disponibile</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#dobanda-fixa-sau-variabila"><span className="cv-legal-toc-num">03</span> Dobândă fixă vs. variabilă</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#de-ce-prin-consultant"><span className="cv-legal-toc-num">04</span> De ce să compari printr-un consultant</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#intrebari-frecvente"><span className="cv-legal-toc-num">05</span> Întrebări frecvente</a>
              </li>
            </ul>
          </nav>

          <article className="cv-legal-article">

            {/* Secțiunea 01 */}
            <section id="cum-functioneaza-creditul" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">01</span>
                <h2 className="cv-legal-heading">Cum Funcționează Creditul de Nevoi Personale?</h2>
              </div>
              <p className="cv-legal-text">
                Creditul de nevoi personale (fără ipotecă) este cel mai accesat produs financiar de retail din România. Principalul său avantaj este libertatea de utilizare: banca nu îți solicită facturi sau documente justificative privind modul în care cheltuiești suma împrumutată.
              </p>
              <p className="cv-legal-text">
                Însă această simplitate vine cu diferențe semnificative de preț între creditori. Două bănci diferite pot oferi pentru aceeași sumă împrumutată rate lunare diferite cu câteva sute de lei, din cauza diferențelor de DAE, marje și comisioane de administrare.
              </p>

              <div className="cv-legal-callout">
                <div className="cv-legal-callout-title">CLARITATE ÎNAINTE DE APLICARE</div>
                <p className="cv-legal-callout-text">
                  Înainte de a semna un contract pe 5 ani, verifică întotdeauna suma totală de rambursat. O dobândă care pare mică poate ascunde o asigurare scumpă inclusă în rată sau comisioane lunare de administrare a contului care cresc simțitor costul final.
                </p>
              </div>
            </section>

            {/* Secțiunea 02 */}
            <section id="destinatii-finantare" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">02</span>
                <h2 className="cv-legal-heading">Categorii de Finanțare: În Funcție de Obiectivul Tău</h2>
              </div>
              <p className="cv-legal-text">
                Chiar dacă din punct de vedere tehnic este vorba despre un credit negarantat, structura optimă diferă în funcție de destinația fondurilor. Iată principalele categorii pe care le analizăm:
              </p>

              <div className="cv-legal-grid">
                {loanCategories.map((cat, idx) => {
                  const Icon = cat.icon;
                  return (
                    <div key={idx} className="cv-legal-card emerald">
                      <div className="cv-legal-card-header">
                        <div className="cv-legal-card-icon"><Icon size={18} /></div>
                        <h3 className="cv-legal-card-title">{cat.title}</h3>
                      </div>
                      <p className="cv-legal-card-desc">{cat.desc}</p>
                    </div>
                  );
                })}
              </div>

              <p className="cv-legal-text" style={{ fontSize: "0.9rem", color: "var(--text-secondary, #5F6368)", marginTop: "1rem" }}>
                <em>Notă de transparență:</em> Nu toate categoriile sunt oferite de toate instituțiile partenere, iar eligibilitatea finală depinde de profilul de risc și documentele justificative de venit ale fiecărui solicitant în parte.
              </p>
            </section>

            {/* Secțiunea 03 */}
            <section id="dobanda-fixa-sau-variabila" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">03</span>
                <h2 className="cv-legal-heading">Dobândă Fixă vs. Dobândă Variabilă: Cum Alegi?</h2>
              </div>
              <p className="cv-legal-text">
                Alegerea tipului de dobândă influențează direct gradul tău de liniște financiară pe durata creditului:
              </p>

              <div className="cv-legal-table-wrapper">
                <table className="cv-legal-table">
                  <thead>
                    <tr>
                      <th>Tip Dobândă</th>
                      <th>Avantaje</th>
                      <th>Dezavantaje / Riscuri</th>
                      <th>Cui i se potrivește</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Dobândă Fixă</strong></td>
                      <td>Predictibilitate totală: rata rămâne exact aceeași timp de 5 ani, indiferent de inflație sau indici.</td>
                      <td>Rata de pornire poate fi ușor mai mare decât la o dobândă variabilă în momentul scăderii pieței.</td>
                      <td>Persoanelor care doresc siguranță bugetară și nu doresc să urmărească evoluția IRCC.</td>
                    </tr>
                    <tr>
                      <td><strong>Dobândă Variabilă</strong></td>
                      <td>Poate fi mai avantajoasă în perioadele în care ratele interbancare (IRCC) scad accelerat.</td>
                      <td>Rata lunară se actualizează trimestrial; dacă indicele crește, rata ta crește automat.</td>
                      <td>Celor care își permit o marjă de fluctuație în buget sau care intenționează să ramburseze anticipat.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Secțiunea 04 */}
            <section id="de-ce-prin-consultant" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">04</span>
                <h2 className="cv-legal-heading">De Ce Să Compari Prin CV Finance?</h2>
              </div>
              <p className="cv-legal-text">
                Când mergi direct la o bancă, funcționarul de la ghișeu îți poate prezenta exclusiv produsul acelei bănci, chiar dacă în piață există o variantă considerabil mai ieftină pentru profilul tău.
              </p>
              <ul className="cv-legal-list">
                <li className="cv-legal-list-item"><strong>Comparație obiectivă:</strong> Evaluăm normele mai multor instituții financiare partenere dintr-o singură privire.</li>
                <li className="cv-legal-list-item"><strong>Protejarea scorului de credit:</strong> Nu aplicăm la întâmplare; trimitem dosarul doar la instituția compatibilă cu veniturile și istoricul tău.</li>
                <li className="cv-legal-list-item"><strong>Sprijin complet pe documentație:</strong> Te ajutăm cu verificarea adeverinței, a acordului ANAF și răspundem întrebărilor băncii în locul tău.</li>
                <li className="cv-legal-list-item"><strong>Zero costuri pentru client:</strong> Analiza inițială și intermedierea dosarului sunt 100% gratuite pentru tine.</li>
              </ul>
            </section>

            {/* Secțiunea 05 — FAQ */}
            <section id="intrebari-frecvente" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">05</span>
                <h2 className="cv-legal-heading">Întrebări Frecvente Despre Creditul de Nevoi Personale</h2>
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
            <span className="cv-partner-badge">ANALIZĂ GRATUITĂ &amp; FĂRĂ OBLIGAȚII</span>
            <h2 className="cv-partner-title" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", margin: "0.5rem 0 1rem" }}>
              Vrei să afli ce rată poți obține pentru proiectul tău?
            </h2>
            <p className="cv-partner-text" style={{ margin: "0 auto 2rem", maxWidth: "620px" }}>
              Completează datele financiare de bază în formularul nostru. Analizăm opțiunile disponibile și îți transmitem o simulare clară și realistă.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
              <Link href="/#verificare-credit" className="cv-btn-primary" style={{ padding: "0.9rem 2rem" }}>
                VERIFICĂ OPȚIUNILE DE CREDIT →
              </Link>
              <Link href="/calculator-rata-credit" className="cv-btn-secondary" style={{ padding: "0.9rem 1.75rem" }}>
                CALCULATOR ORIENTATIV
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
