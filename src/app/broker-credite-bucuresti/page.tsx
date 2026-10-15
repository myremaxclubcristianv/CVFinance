import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, ArrowLeft, MapPin, Phone, Mail, Clock, FileText } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Broker Credite București | Consultanță Financiară Piața Victoriei | CV Finance",
  description:
    "Consultanță financiară independentă și brokeraj de credite în București (Piața Victoriei) și la distanță. Analiză gratuită a veniturilor, comparare oferte bancare și negociere fără costuri.",
  keywords: [
    "broker credite bucuresti",
    "consultant financiar bucuresti",
    "broker credite piata victoriei",
    "intermediere credite bucuresti",
    "refinantare credit bucuresti",
    "credit nevoi personale bucuresti",
    "analiza financiara gratuita",
  ],
  alternates: { canonical: "/broker-credite-bucuresti" },
};

const faqs = [
  {
    q: "Unde vă pot întâlni pentru o discuție directă în București?",
    a: "Biroul nostru este situat ultracentral, în zona Piața Victoriei, București. Întâlnirile se desfășoară pe bază de programare prealabilă. În egală măsură, oferim consultanță completă la distanță (telefonic, email sau WhatsApp) pentru clienți din toată țara sau din diaspora.",
  },
  {
    q: "Cât mă costă serviciile oferite de brokerul de credite?",
    a: "Analiza dosarului, consultanța și asistența pe tot parcursul procesului de creditare sunt 100% gratuite pentru client. În România, activitatea de intermediere de credite este remunerată de către instituția bancară parteneră la finalizarea dosarului, fără ca aceste costuri să fie transferate sau adăugate la creditul tău.",
  },
  {
    q: "Care este diferența dintre a merge direct la bancă și a lucra cu un broker?",
    a: "Fiecare sucursală bancară îți va recomanda strict produsele sale interne, chiar dacă nu sunt cele mai avantajoase pentru situația ta. Un broker independent analizează piața în ansamblu, cunoaște normele specifice fiecărui creditor și selectează instituția care se potrivește cel mai bine profilului tău, economisindu-ți zile întregi de drumuri inutile.",
  },
  {
    q: "Garantează brokerul aprobarea creditului?",
    a: "Nu. Nicio entitate legală nu poate garanta aprobarea unui dosar, decizia aparținând exclusiv comitetului de analiză de risc al băncii finanțatoare. Ceea ce garantăm noi este o evaluare riguroasă, întocmirea fără cusur a documentației și evitarea greșelilor care duc la refuzuri automate.",
  },
];

export default function BrokerCrediteBucuresti() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        name: "CV Finance — Broker Credite București",
        telephone: CONTACT.PHONE,
        email: CONTACT.EMAIL,
        url: "https://credite.cristianvaduva.com/broker-credite-bucuresti",
        description: "Consultanță financiară independentă, intermediere credite de nevoi personale și refinanțare în București și la nivel național.",
        areaServed: ["București", "RO"],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Piața Victoriei",
          addressLocality: "București",
          addressRegion: "București",
          addressCountry: "RO",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Acasă", item: "https://credite.cristianvaduva.com" },
          { "@type": "ListItem", position: 2, name: "Broker Credite București", item: "https://credite.cristianvaduva.com/broker-credite-bucuresti" },
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
              <MapPin size={16} />
              <span>CONSULTANȚĂ FINANCIARĂ LOCALĂ &amp; LA DISTANȚĂ / BUCUREȘTI</span>
            </span>
            <h1 className="cv-legal-title">
              Broker Credite București: Consultanță Obiectivă și Sprijin Dedicat
            </h1>
            <p className="cv-legal-sub">
              Fie că vrei să refinanțezi credite scumpe sau cauți o soluție de finanțare adaptată veniturilor tale, analizăm cifrele pe baze reale. Birou în Piața Victoriei și asistență completă online.
            </p>
            <div className="cv-legal-meta">
              <span>CRISTIAN VĂDUVA — ADVISORY</span>
              <span>•</span>
              <span>0 RON COST PENTRU CLIENT</span>
            </div>
          </div>

          {/* Cuprins tematic */}
          <nav className="cv-legal-toc" aria-label="Cuprins articol">
            <div className="cv-legal-toc-title">
              <span>CUPRINS TEMATIC</span>
            </div>
            <ul className="cv-legal-toc-list">
              <li className="cv-legal-toc-item">
                <a href="#rolul-brokerului"><span className="cv-legal-toc-num">01</span> Ce face un consultant dedicat</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#analiza-circumstantelor"><span className="cv-legal-toc-num">02</span> Analiza profilului tău financiar</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#fizic-sau-la-distanta"><span className="cv-legal-toc-num">03</span> Consultanță în București &amp; online</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#de-ce-fara-costuri"><span className="cv-legal-toc-num">04</span> De ce serviciul este gratuit</a>
              </li>
              <li className="cv-legal-toc-item">
                <a href="#intrebari-frecvente"><span className="cv-legal-toc-num">05</span> Întrebări frecvente</a>
              </li>
            </ul>
          </nav>

          <article className="cv-legal-article">

            {/* Secțiunea 01 */}
            <section id="rolul-brokerului" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">01</span>
                <h2 className="cv-legal-heading">Ce Face un Consultant Financiar Dedicat?</h2>
              </div>
              <p className="cv-legal-text">
                Într-o piață bancară cu zeci de oferte, zeci de tipuri de dobânzi și clauze contractuale complicate, alegerea unui credit pe cont propriu poate fi o experiență consumatoare de timp și plină de riscuri.
              </p>
              <p className="cv-legal-text">
                Rolul nostru nu este să îți vindem primul produs apărut în cale, ci să acționăm ca un filtru obiectiv între tine și instituțiile finanțatoare:
              </p>
              <ul className="cv-legal-list">
                <li className="cv-legal-list-item"><strong>Analiză fără grabă:</strong> Înțelegem contextul veniturilor tale, cheltuielile lunare și obiectivele reale.</li>
                <li className="cv-legal-list-item"><strong>Comparare realistă a costurilor:</strong> Calculăm DAE-ul efectiv și costul total de rambursare pe fiecare scenariu.</li>
                <li className="cv-legal-list-item"><strong>Pregătirea impecabilă a dosarului:</strong> Ne asigurăm că adeverințele, acordurile ANAF și declarațiile respectă cu strictețe normele de acceptare ale finanțatorului.</li>
                <li className="cv-legal-list-item"><strong>Intermedierea comunicării:</strong> Discutăm direct cu departamentele de analiză bancară pentru clarificarea rapidă a eventualelor neconcordanțe.</li>
              </ul>
            </section>

            {/* Secțiunea 02 */}
            <section id="analiza-circumstantelor" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">02</span>
                <h2 className="cv-legal-heading">Structura Analizei Financiare: Cum Privim Cifrele Tale</h2>
              </div>
              <p className="cv-legal-text">
                O evaluare corectă presupune parcurgerea unei grile clare de verificare a eligibilității:
              </p>

              <div className="cv-legal-grid">
                <div className="cv-legal-card emerald">
                  <div className="cv-legal-card-header">
                    <div className="cv-legal-card-icon"><Check size={18} /></div>
                    <h3 className="cv-legal-card-title">1. Venituri și Stabilitate</h3>
                  </div>
                  <p className="cv-legal-card-desc">
                    Evaluăm salariile de bază, sporurile, diurnele, veniturile din dividende, PFA sau chirii, raportate la cerințele de vechime ale fiecărui creditor.
                  </p>
                </div>

                <div className="cv-legal-card emerald">
                  <div className="cv-legal-card-header">
                    <div className="cv-legal-card-icon"><Check size={18} /></div>
                    <h3 className="cv-legal-card-title">2. Obligații Curente &amp; DTI</h3>
                  </div>
                  <p className="cv-legal-card-desc">
                    Calculăm gradul real de îndatorare, ținând cont de toate ratele existente, cardurile de credit și descoperirile de cont active.
                  </p>
                </div>

                <div className="cv-legal-card emerald">
                  <div className="cv-legal-card-header">
                    <div className="cv-legal-card-icon"><Check size={18} /></div>
                    <h3 className="cv-legal-card-title">3. Istoricul din Biroul de Credit</h3>
                  </div>
                  <p className="cv-legal-card-desc">
                    Verificăm scorul de credit și eventualele incidente din trecut pentru a alege banca a cărei politică tolerează profilul rezultat.
                  </p>
                </div>

                <div className="cv-legal-card emerald">
                  <div className="cv-legal-card-header">
                    <div className="cv-legal-card-icon"><Check size={18} /></div>
                    <h3 className="cv-legal-card-title">4. Limite și Transparență</h3>
                  </div>
                  <p className="cv-legal-card-desc">
                    Dacă gradul de îndatorare este depășit sau există blocaje majore, îți spunem deschis acest lucru și trasăm pașii necesari pentru refacere.
                  </p>
                </div>
              </div>
            </section>

            {/* Secțiunea 03 */}
            <section id="fizic-sau-la-distanta" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">03</span>
                <h2 className="cv-legal-heading">Consultanță în București (Piața Victoriei) și la Distanță</h2>
              </div>
              <p className="cv-legal-text">
                Flexibilitatea comunicării este esențială într-un ritm de viață alert. Ai la dispoziție două moduri confortabile de colaborare:
              </p>
              <ul className="cv-legal-list">
                <li className="cv-legal-list-item"><strong>La birou în București:</strong> Ne putem întâlni în zona Piața Victoriei pentru a discuta aplicat pe documentele tale financiare, într-un cadru privat și liniștit.</li>
                <li className="cv-legal-list-item"><strong>100% Online și Telefonic:</strong> Analiza, colectarea documentelor cu acord GDPR și simulările se pot derula integral de la distanță, prin telefon, WhatsApp securizat și email, indiferent dacă locuiești în alt oraș din România sau în afara granițelor.</li>
              </ul>
            </section>

            {/* Secțiunea 04 */}
            <section id="de-ce-fara-costuri" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">04</span>
                <h2 className="cv-legal-heading">De Ce Serviciul Nostru Este Fără Costuri pentru Tine?</h2>
              </div>
              <div className="cv-legal-callout">
                <div className="cv-legal-callout-title">CADRU LEGAL DE REMUNERARE</div>
                <p className="cv-legal-callout-text">
                  Consultanța oferită de CV Finance este 100% gratuită pentru solicitantul de credit. Nu percepem taxe de deschidere de dosar, comisioane de consultanță sau plăți ascunse. Remunerația noastră provine exclusiv din contractele de intermediere financiară încheiate cu instituțiile creditoare la finalizarea și decontarea creditului, în condiții reglementate strict de legislație.
                </p>
              </div>
            </section>

            {/* Secțiunea 05 — FAQ */}
            <section id="intrebari-frecvente" className="cv-legal-section">
              <div className="cv-legal-section-header">
                <span className="cv-legal-num">05</span>
                <h2 className="cv-legal-heading">Întrebări Frecvente Despre Consultanță în București</h2>
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
            <span className="cv-partner-badge">DISCUTĂ DIRECT CU CONSULTANTUL</span>
            <h2 className="cv-partner-title" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", margin: "0.5rem 0 1rem" }}>
              Vrei o evaluare independentă a situației tale?
            </h2>
            <p className="cv-partner-text" style={{ margin: "0 auto 2rem", maxWidth: "620px" }}>
              Programează o discuție telefonică sau o întâlnire la birou. Îți analizăm veniturile și opțiunile fără nicio obligație.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
              <Link href="/#verificare-credit" className="cv-btn-primary" style={{ padding: "0.9rem 2rem" }}>
                SOLICITĂ O ANALIZĂ GRATUITĂ →
              </Link>
              <a
                href={`https://wa.me/${CONTACT.WHATSAPP}?text=${encodeURIComponent("Bună ziua, doresc o consultanță financiară.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cv-btn-secondary"
                style={{ padding: "0.9rem 1.75rem" }}
              >
                DISCUTĂ PE WHATSAPP
              </a>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
