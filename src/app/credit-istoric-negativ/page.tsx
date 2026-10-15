import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X, ShieldCheck, AlertCircle, AlertTriangle, ArrowLeft, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Credit cu Istoric Negativ & Întârzieri la Plată | Consultanță CV Finance",
  description:
    "Ghid complet și analiză realistă pentru persoane cu istoric negativ în Biroul de Credit sau întârzieri la rate. Află ce opțiuni există, ce nu se poate garanta și cum eviți spirala datoriilor.",
  keywords: [
    "credit cu istoric negativ",
    "credit intarzieri plata",
    "refuz credit banca",
    "dificultati plata rate",
    "restructurare credite",
    "biroul de credit istoric",
    "consultanta financiara credite",
  ],
  alternates: { canonical: "/credit-istoric-negativ" },
};

const faqs = [
  {
    q: "Pot obține un credit nou dacă am înregistrări negative în Biroul de Credit?",
    a: "Obținerea unui nou credit depinde de mai mulți factori: vechimea întârzierilor (dacă sunt recente sau din anii trecuți), dacă sumele restante au fost achitate integral, nivelul veniturilor tale curente și normele interne de risc ale fiecărei instituții partenere. Unele instituții analizează dosarele nuanțat, în timp ce altele resping automat orice restanță activă.",
  },
  {
    q: "Garantează CV Finance aprobarea unui credit pentru cei cu istoric negativ?",
    a: "Nu. Nicio persoană sau companie onestă nu poate garanta aprobarea unui credit. Decizia aparține exclusiv comitetului de risc al băncii sau instituției finanțatoare. Rolul nostru este să analizăm obiectiv situația ta, să evităm aplicările inutile care îți coboară scorul și să identificăm soluțiile care au șanse reale.",
  },
  {
    q: "Ce este mai bine să fac dacă nu mai pot plăti ratele lunare?",
    a: "Primul pas esențial este comunicarea timpurie cu creditorul înainte de acumularea a 30, 60 sau 90 de zile de întârziere. Poți solicita o reeșalonare, o perioadă de grație temporară sau o restructurare a contractului. Cel mai periculos gest este contractarea unui nou credit scump (de tip IFN cu dobândă zilnică) pentru a acoperi o rată existentă.",
  },
  {
    q: "Cât timp rămân înregistrate datele negative în Biroul de Credit?",
    a: "Conform reglementărilor Biroului de Credit, datele negative legate de întârzieri la plată sunt stocate și vizibile timp de 4 ani de la data achitării integrale a ultimei restanțe din contractul respectiv.",
  },
  {
    q: "Cât mă costă analiza inițială a situației mele financiare?",
    a: "Analiza preliminară a situației tale realizată de CV Finance este 100% gratuită și strict confidențială. Nu există costuri ascunse și nicio obligație de a continua dacă variantele prezentate nu ți se potrivesc.",
  },
];

export default function CreditIstoricNegativ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        name: "CV Finance — Consultanță Credite cu Istoric Negativ",
        url: "https://credite.cristianvaduva.com/credit-istoric-negativ",
        description: "Consultanță financiară responsabilă și analiză preliminară pentru persoane cu întârzieri înregistrate sau refuzuri bancare.",
        areaServed: "RO",
        serviceType: "Consultanță Credite Dificile",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Acasă", item: "https://credite.cristianvaduva.com" },
          { "@type": "ListItem", position: 2, name: "Credit cu Istoric Negativ", item: "https://credite.cristianvaduva.com/credit-istoric-negativ" },
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
              <span>CONSULTANȚĂ RESPONSABILĂ / SITUAȚII FINANCIARE DIFICILE</span>
            </span>
            <h1 className="cv-legal-title">
              Credit cu Istoric Negativ &amp; Întârzieri: Cum Abordezi Realist Situația
            </h1>
            <p className="cv-legal-sub">
              O perioadă financiară complicată din trecut nu trebuie tratată cu panică și nici cu promisiuni nerealiste. Analizăm cauzele blocajului, verificăm normele creditorilor și identificăm soluțiile posibile fără judecăți morale.
            </p>
            <div className="cv-legal-meta">
              <span>FĂRĂ ILUZII SAU GARANȚII FALSE</span>
              <span>•</span>
              <span>100% CONFIDENȚIAL</span>
            </div>
          </div>

          {/* Cuprins tematic */}
          <nav className="cv-legal-toc" aria-label="Cuprins articol">
            <div className="cv-legal-toc-title">
              <span>CUPRINS TEMATIC</span>
            </div>
            <ul className="cv-legal-toc-list">
              <li className="cv-legal-toc-item">
                <a href="#ce-inseamna-istoric-negativ"><span className="cv-legal-toc-num">01</span> Ce înseamnă un istoric negativ</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#de-ce-refuza-bancile"><span className="cv-legal-toc-num">02</span> De ce refuză băncile cererile</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#greseala-aplicarilor-haotice"><span className="cv-legal-toc-num">03</span> Capcana aplicărilor la întâmplare</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#spirala-ifn"><span className="cv-legal-toc-num">04</span> Riscul creditelor rapide în dificultate</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#ce-se-poate-face"><span className="cv-legal-toc-num">05</span> Ce soluții pot fi explorate realist</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#intrebari-frecvente"><span className="cv-legal-toc-num">06</span> Întrebări frecvente</a>
              </li>
            </ul>
          </nav>

          <article className="cv-legal-article">

            {/* Secțiunea 01 */}
            <section id="ce-inseamna-istoric-negativ" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">01</span>
                <h2 className="cv-legal-heading">Ce Înseamnă cu Adevărat un Istoric Negativ?</h2>
              </div>
              <p className="cv-legal-text">
                Oricine poate trece printr-o problemă neprevăzută: o pierdere temporară a locului de muncă, o urgență medicală sau o problemă în afacere care a provocat întârzierea ratelor. În sistemul bancar din România, aceste întârzieri sunt raportate lunar în baza de date a Biroului de Credit dacă depășesc 30 de zile de la scadență.
              </p>
              <p className="cv-legal-text">
                Nu toate raportările negative au aceeași greutate:
              </p>
              <ul className="cv-legal-list">
                <li className="cv-legal-list-item"><strong>Întârzieri mici și izolate (1–30 zile):</strong> De multe ori nu sunt raportate în Biroul de Credit sau sunt privite de anumiți finanțatori ca incidente minore de scadențar.</li>
                <li className="cv-legal-list-item"><strong>Întârzieri moderate (31–60 zile):</strong> Sunt raportate și pot reduce scorul FICO, însă pot fi explicate și compensate dacă restanța a fost achitată și ai venituri solide.</li>
                <li className="cv-legal-list-item"><strong>Restanțe severe (peste 90 de zile sau ajunse la executare/recuperare):</strong> Constituie semnalul de risc cel mai ridicat și blochează automat aprobările la majoritatea băncilor standard până la stingerea debitului.</li>
              </ul>
            </section>

            {/* Secțiunea 02 */}
            <section id="de-ce-refuza-bancile" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">02</span>
                <h2 className="cv-legal-heading">De Ce Refuză Băncile Dosarele cu Istoric Negativ?</h2>
              </div>
              <p className="cv-legal-text">
                Băncile comerciale funcționează conform unor norme stricte stabilite de Banca Națională a României (BNR) și de propriile comitete de risc. În momentul în care aplici pentru un credit, un algoritm de scoring automat interoghează baza de date. Dacă găsește un cod de întârziere activ sau un scor sub pragul minim al instituției, aplicația este respinsă adesea în mai puțin de 5 minute, fără ca vreun ofițer de credit să îți asculte povestea.
              </p>
              <p className="cv-legal-text">
                Fiecare bancă are însă apetit de risc diferit: o bancă axată exclusiv pe clienți cu profil impecabil te va respinge imediat, în timp ce o altă bancă sau o instituție financiară specializată poate accepta dosarul dacă dovedești că situația ta s-a stabilizat.
              </p>
            </section>

            {/* Secțiunea 03 */}
            <section id="greseala-aplicarilor-haotice" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">03</span>
                <h2 className="cv-legal-heading">Capcana Aplicărilor la Întâmplare: Cum se Închide Cercul</h2>
              </div>
              <p className="cv-legal-text">
                Cea mai periculoasă reacție la un refuz bancar este să aplici imediat la alte 4–5 bănci în speranța că una dintre ele va aproba cererea.
              </p>
              
              <div className="cv-legal-callout">
                <div className="cv-legal-callout-title">EFECTUL INTEROGĂRILOR REPETATE</div>
                <p className="cv-legal-callout-text">
                  Fiecare aplicare generează o interogare înscrisă în Biroul de Credit. Când un algoritm bancar vede 5 interogări consecutive în 14 zile, interpretează acest lucru drept stare acută de disperare financiară (caută bani urgent și este refuzat peste tot), coborând și mai mult scorul FICO.
                </p>
              </div>

              <p className="cv-legal-text">
                De aceea, regula de aur este: <strong>oprește aplicările haotice</strong>. Înainte să mai depui vreo cerere, trebuie să afli motivul exact al respingerii, să îți consulți raportul de credit și să stabilești dacă te încadrezi undeva cu șanse reale.
              </p>
            </section>

            {/* Secțiunea 04 */}
            <section id="spirala-ifn" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">04</span>
                <h2 className="cv-legal-heading">Pericolul Soluțiilor Temporare Scumpe (Spirala Datoriilor)</h2>
              </div>
              <p className="cv-legal-text">
                Când băncile refuză creditarea, tentația multor persoane este să apeleze la împrumuturi rapide de la IFN-uri pentru a achita rata curentă. Această mișcare rezolvă problema următoarelor 30 de zile, dar agravează dramatic situația financiară pe termen mediu:
              </p>
              <div className="cv-legal-grid">
                <div className="cv-legal-card danger">
                  <div className="cv-legal-card-header">
                    <div className="cv-legal-card-icon"><AlertTriangle size={18} /></div>
                    <h3 className="cv-legal-card-title">Costuri exorbitante</h3>
                  </div>
                  <p className="cv-legal-card-desc">
                    Creditele rapide pot avea DAE-uri de sute sau mii de procente pe an. O sumă mică împrumutată astăzi se transformă într-o povară lunară imposibil de susținut luna viitoare.
                  </p>
                </div>

                <div className="cv-legal-card danger">
                  <div className="cv-legal-card-header">
                    <div className="cv-legal-card-icon"><AlertTriangle size={18} /></div>
                    <h3 className="cv-legal-card-title">Rostogolirea soldului</h3>
                  </div>
                  <p className="cv-legal-card-desc">
                    Pentru a plăti primul IFN, iei al doilea IFN; apoi al treilea. În scurt timp, ajungi să plătești doar prelungiri și comisioane fără să scazi deloc din datoria principală.
                  </p>
                </div>
              </div>
              <p className="cv-legal-text">
                Dacă te afli deja în această situație, nu te panica și nu te învinovăți. Este un mecanism financiar în care au căzut mii de oameni. Important este să trasezi o linie, să oprești contractarea de noi împrumuturi scumpe și să analizezi o soluție de consolidare sau restructurare.
              </p>
            </section>

            {/* Secțiunea 05 */}
            <section id="ce-se-poate-face" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">05</span>
                <h2 className="cv-legal-heading">Ce Putem Evalua și Ce Opțiuni Reale Există?</h2>
              </div>
              <p className="cv-legal-text">
                Când vii la o discuție cu noi, abordăm situația cu empatie și realism. Iată ce pași urmăm:
              </p>
              <ul className="cv-legal-list">
                <li className="cv-legal-list-item"><strong>Analiza raportului de credit:</strong> Vedem exact ce creditori au raportat, ce sume sunt restante și dacă restanțele figurează ca fiind achitate.</li>
                <li className="cv-legal-list-item"><strong>Verificarea conformității raportărilor:</strong> Dacă o înregistrare a fost transmisă eronat sau fără notificarea legală prealabilă prevăzută de lege, te îndrumăm către căile legale de rectificare.</li>
                <li className="cv-legal-list-item"><strong>Calculul gradului de îndatorare:</strong> Evaluăm veniturile tale nete declarate și stabilim ce rată maximă lunară este sustenabilă.</li>
                <li className="cv-legal-list-item"><strong>Consolidare prin garant / co-plătitor:</strong> Dacă venitul propriu sau istoricul nu permit accesarea directă, aducerea unui membru al familiei cu profil curat poate debloca finanțarea.</li>
                <li className="cv-legal-list-item"><strong>Restructurarea amiabilă:</strong> Dacă nicio refinanțare bancară nu este posibilă în acest moment, îți explicăm cum să adresezi o cerere oficială de eșalonare direct către creditorii tăi actuali.</li>
              </ul>

              <div className="cv-legal-callout">
                <div className="cv-legal-callout-title">ANGAJAMENTUL CV FINANCE</div>
                <p className="cv-legal-callout-text">
                  Nu îți vom promite niciodată aprobări miraculoase și nu îți vom cere comisioane în avans. Dacă situația ta nu are o rezolvare bancară imediată, îți spunem cinstit acest lucru și îți recomandăm pașii necesari pentru refacerea profilului financiar în următoarele 6–12 luni.
                </p>
              </div>
            </section>

            {/* Secțiunea 06 — FAQ */}
            <section id="intrebari-frecvente" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">06</span>
                <h2 className="cv-legal-heading">Întrebări Frecvente Despre Istoricul Negativ</h2>
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
            <span className="cv-partner-badge">EVALUARE CONFIDENȚIALĂ &amp; FĂRĂ COSTURI</span>
            <h2 className="cv-partner-title" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", margin: "0.5rem 0 1rem" }}>
              Vrei o privire obiectivă asupra situației tale?
            </h2>
            <p className="cv-partner-text" style={{ margin: "0 auto 2rem", maxWidth: "620px" }}>
              Trimite-ne câteva detalii de bază. Analizăm cazul tău fără obligații și îți spunem cu claritate ce opțiuni există și ce pași merită făcuți.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
              <Link href="/#verificare-credit" className="cv-btn-primary" style={{ padding: "0.9rem 2rem" }}>
                SOLICITĂ O EVALUARE REALISTĂ →
              </Link>
              <Link href="/totul-inainte-de-credit" className="cv-btn-secondary" style={{ padding: "0.9rem 1.75rem" }}>
                GHIDUL TOTUL ÎNAINTE DE CREDIT
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
