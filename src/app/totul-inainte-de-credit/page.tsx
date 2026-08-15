import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Check,
  FileCheck,
  Building2,
  AlertTriangle,
  HelpCircle,
  TrendingDown,
  Coins,
  Scale,
  Lock,
  MessageCircle,
  PhoneCall,
  CheckCircle2,
  Zap,
} from "lucide-react";
import TotulInainteDeCreditFunnel from "@/components/TotulInainteDeCreditFunnel";
import { PROBLEM_CARDS } from "@/lib/totul-constants";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Totul înainte de credit | Biroul de Credit, Refinanțare & Opțiuni de Finanțare",
  description:
    "Verifică-ți situația înainte să aplici pentru un credit. Analizăm Biroul de Credit, întârzierile, ratele existente, refinanțarea și opțiunile de finanțare disponibile.",
  keywords: [
    "probleme Biroul de Credit",
    "Biroul de Credit",
    "ștergere Biroul de Credit",
    "corectare Biroul de Credit",
    "contestare Biroul de Credit",
    "întârzieri Biroul de Credit",
    "credit după Biroul de Credit",
    "credit cu istoric negativ",
    "credit după refuz bancar",
    "IFN după refuz bancar",
    "refinanțare după întârzieri",
    "refinanțare credit",
    "rate prea mari",
    "credit respins",
    "credit refuzat",
    "de ce am fost refuzat la credit",
    "ce pot face dacă am fost refuzat de bancă",
    "credit cu întârzieri",
    "finanțare după probleme în Biroul de Credit",
  ],
  alternates: { canonical: "/totul-inainte-de-credit" },
  openGraph: {
    title: "Totul înainte de credit | Analiză Situație Financiară",
    description:
      "Înainte să mai aplici la un credit, verifică-ți situația. Analiză confidențială a Biroului de Credit și opțiuni de finanțare.",
    url: "https://credite.cristianvaduva.com/totul-inainte-de-credit",
    type: "website",
  },
};

const faqsList = [
  {
    q: "Se poate șterge istoricul din Biroul de Credit?",
    a: "Dacă raportarea a fost efectuată cu nerespectarea prevederilor legale sau dacă datele sunt eronate, există temei juridic pentru rectificare sau contestație. Nu există nicio garanție automată de ștergere a datelor raportate corect.",
  },
  {
    q: "Pot obține credit dacă am avut întârzieri la plăți?",
    a: "Da, în anumite condiții. Șansele depind de vechimea întârzierilor, dacă au fost achitate integral, nivelul actual al veniturilor și instituția financiară aleasă. Unele bănci sau IFN-uri au criterii de eligibilitate mai flexibile.",
  },
  {
    q: "Ce fac dacă am fost refuzat de bancă?",
    a: "Primul pas este să nu aplici la întâmplare la alte instituții. Fiecare refuz sau interogare consecutivă poate reduce scorul de credit. Verificăm mai întâi motivul refuzului pentru a identifica opțiunile eligibile.",
  },
  {
    q: "Pot refinanța dacă am avut întârzieri?",
    a: "Refinanțarea este posibilă în special dacă întârzierile au fost remediate, iar scopul este consolidarea tuturor ratelor existente într-o singură rată lunară mai mică și mai ușor de susținut.",
  },
  {
    q: "Pot obține finanțare prin IFN după un refuz bancar?",
    a: "IFN-urile au criterii mai flexibile față de bănci, însă costurile pot fi mai mari. Înainte de a contracta un credit IFN, este esențial să evaluăm dacă există opțiuni bancare sau dacă refinanțarea are sens financiar.",
  },
  {
    q: "De ce sunt refuzat repetat la solicitările de credit?",
    a: "Refuzul repetat apare adesea din cauza scorului FICO scăzut, a numărului mare de interogări recente, a gradului depășit de îndatorare sau a veniturilor neeligibile conform normelor băncii.",
  },
  {
    q: "Ce trebuie să verific înainte să trimit o nouă aplicație?",
    a: "Trebuie să verifici raportul Biroului de Credit, venitul net eligibil, totalul ratelor actuale și criteriile exacte ale finanțatorului la care dorești să aplici.",
  },
];

export default function TotulInainteDeCreditPage() {
  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Totul înainte de credit — Analiză Financiară & Biroul de Credit",
    url: "https://credite.cristianvaduva.com/totul-inainte-de-credit",
    description:
      "Serviciu independent de evaluare a situației financiare, analiza istoricului din Biroul de Credit și identificare opțiuni de refinanțare.",
    isPartOf: {
      "@type": "WebSite",
      name: "CV Finance",
      url: "https://credite.cristianvaduva.com",
    },
  };

  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Consultanță Financiară & Evaluare Biroul de Credit",
    provider: {
      "@type": "FinancialService",
      name: "CV Finance — Cristian Văduva",
      telephone: CONTACT.PHONE,
      email: CONTACT.EMAIL,
      url: "https://credite.cristianvaduva.com",
    },
    areaServed: "RO",
    description:
      "Evaluare confidențială a dosarului de credit, verificare date Biroul de Credit și analiza variantelor de creditare sau refinanțare.",
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Acasă",
        item: "https://credite.cristianvaduva.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Totul înainte de credit",
        item: "https://credite.cristianvaduva.com/totul-inainte-de-credit",
      },
    ],
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsList.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const footerYear = new Date().getFullYear();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />

      <main className="totul-page-wrapper">
        {/* HERO SECTION */}
        <section className="totul-hero-section">
          <div className="totul-hero-container">
            <div className="totul-hero-badge">
              <ShieldCheck size={16} style={{ color: "var(--emerald)" }} />
              <span>PRIVATE CREDIT SITUATION REVIEW</span>
            </div>

            <h1 className="totul-hero-h1">
              Ai fost refuzat pentru un credit?
            </h1>

            <p className="totul-hero-subheadline">
              Înainte să aplici din nou, verifică ce se întâmplă cu adevărat în situația ta financiară.
            </p>

            <p className="totul-hero-copy">
              Analizez istoricul din Biroul de Credit, întârzierile, creditele existente, veniturile și situația ta actuală pentru a identifica ce opțiuni pot exista pentru profilul tău.
            </p>

            <div className="totul-hero-cta-area">
              <a href="#funnel-form" className="totul-hero-cta-btn">
                <span>VREAU SĂ-MI VERIFIC SITUAȚIA</span>
                <ArrowRight size={20} />
              </a>
              <p className="totul-hero-microcopy">
                Analiză preliminară personalizată • 100% Confidențial • Fără promisiuni nerealiste
              </p>
            </div>
          </div>
        </section>

        {/* PROBLEM RECOGNITION SECTION */}
        <section className="totul-section totul-problem-recognition">
          <div className="totul-container">
            <div className="totul-section-header">
              <span className="totul-tag">SITUAȚII FRECVENTE</span>
              <h2>Dacă te regăsești în una dintre situațiile de mai jos, începe de aici.</h2>
              <p>
                Nu aplica la întâmplare la încă un creditor. Selectează cazurile în care te încadrezi:
              </p>
            </div>

            <div className="problem-recognition-grid">
              {PROBLEM_CARDS.map((card) => (
                <a
                  key={card.id}
                  href="#funnel-form"
                  className="problem-card-anchor"
                >
                  <div className="card-badge">{card.category}</div>
                  <h3>{card.label}</h3>
                  <div className="card-link-action">
                    <span>Verifică opțiunile</span>
                    <ArrowRight size={14} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* MAIN FUNNEL FORM SECTION */}
        <section className="totul-section totul-funnel-section">
          <div className="totul-container">
            <TotulInainteDeCreditFunnel />
          </div>
        </section>

        {/* TRUST / POSITIONING SECTION */}
        <section className="totul-section totul-trust-section">
          <div className="totul-container">
            <div className="totul-trust-box">
              <div className="trust-header">
                <span className="totul-tag">TRANSPARENȚĂ TOTALĂ</span>
                <h2>Ce verific înainte să te sun?</h2>
                <p>
                  Analiza pe care o realizez este una riguroasă, bazată pe date reale și norme bancare actualizate:
                </p>
              </div>

              <div className="trust-checklist-grid">
                <div className="trust-check-item">
                  <CheckCircle2 size={20} className="check-icon" />
                  <div>
                    <strong>Situația din Biroul de Credit:</strong>
                    <p>Verific raportările existente, scorul FICO și eventualele înregistrări active.</p>
                  </div>
                </div>

                <div className="trust-check-item">
                  <CheckCircle2 size={20} className="check-icon" />
                  <div>
                    <strong>Istoricul întârzierilor:</strong>
                    <p>Evaluez vechimea zilelor de întârziere și dacă restanțele au fost stinse.</p>
                  </div>
                </div>

                <div className="trust-check-item">
                  <CheckCircle2 size={20} className="check-icon" />
                  <div>
                    <strong>Creditele și IFN-urile existente:</strong>
                    <p>Analizez totalul datoriilor curente și structura ratelor de la fiecare creditor.</p>
                  </div>
                </div>

                <div className="trust-check-item">
                  <CheckCircle2 size={20} className="check-icon" />
                  <div>
                    <strong>Nivelul actual al ratelor:</strong>
                    <p>Calculez gradul tău real de îndatorare raportat la veniturile nete eligibile.</p>
                  </div>
                </div>

                <div className="trust-check-item">
                  <CheckCircle2 size={20} className="check-icon" />
                  <div>
                    <strong>Veniturile declarate:</strong>
                    <p>Verific ce tipuri de venituri pot fi luate în calcul (salarii, pensii, PFA, chirii).</p>
                  </div>
                </div>

                <div className="trust-check-item">
                  <CheckCircle2 size={20} className="check-icon" />
                  <div>
                    <strong>Necesarul de finanțare:</strong>
                    <p>Stabilesc dacă suma dorită este realistă raportată la profilul tău de risc.</p>
                  </div>
                </div>

                <div className="trust-check-item">
                  <CheckCircle2 size={20} className="check-icon" />
                  <div>
                    <strong>Variantele care merită analizate:</strong>
                    <p>Identific instituțiile care acceptă profilul tău fără risc inutil de refuz.</p>
                  </div>
                </div>
              </div>

              <div className="trust-closing-banner">
                <p>
                  Nu există o soluție garantată pentru fiecare situație. Îți spun însă cu claritate ce merită verificat înainte să faci următorul pas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEO EDUCATIONAL CONTENT SECTION */}
        <section className="totul-section totul-seo-content-section">
          <div className="totul-container">
            <div className="totul-section-header">
              <span className="totul-tag">GHID DE ÎNȚELEGERE</span>
              <h2>Hai să vedem ce înseamnă situația ta.</h2>
              <p>
                Află cum funcționează evaluarea financiară și ce opțiuni ai când te confrunți cu obstacole de creditare:
              </p>
            </div>

            <div className="seo-articles-grid">
              <article className="seo-article-card">
                <h3>Ce înseamnă o problemă în Biroul de Credit?</h3>
                <p>
                  O raportare negativă în Biroul de Credit apare atunci când ai avut întârzieri la plata ratelor de peste 30 de zile. Aceste date rămân vizibile timp de 4 ani de la data achitării ultimei restanțe și pot influența decizia băncilor.
                </p>
              </article>

              <article className="seo-article-card">
                <h3>Se poate corecta o informație din Biroul de Credit?</h3>
                <p>
                  Verificăm dacă există informații care pot fi corectate sau contestate legal atunci când există temei juridic (raportări eronate, nerespectarea notificării prealabile sau erori ale creditorului). Datele raportate corect nu pot fi șterse garantat.
                </p>
              </article>

              <article className="seo-article-card">
                <h3>Ce faci dacă ai fost refuzat de bancă?</h3>
                <p>
                  Refuzul unei bănci nu înseamnă că toate ușile sunt închise. Fiecare bancă are norme proprii de risc. Important este să afli motivul exact al respingerii înainte de a trimite noi cereri.
                </p>
              </article>

              <article className="seo-article-card">
                <h3>Ce opțiuni există după un refuz?</h3>
                <p>
                  Opțiunile pot include: refinanțarea creditelor actuale cu aducerea unui girant/co-plătitor, refacerea scorului FICO prin stingerea datoriilor mici sau orientarea către instituții cu norme mai flexibile.
                </p>
              </article>

              <article className="seo-article-card">
                <h3>Refinanțarea creditelor după întârzieri</h3>
                <p>
                  Dacă ai stins restanțele și ai venituri constante, refinanțarea îți poate permite să unifici ratele scumpe într-o singură rată lunară sustenabilă, scăzând presiunea financiară.
                </p>
              </article>

              <article className="seo-article-card">
                <h3>Credit nou după un istoric negativ</h3>
                <p>
                  Obținerea unui credit nou depinde de vechimea problemelor din trecut. Dacă întârzierile au fost ocazionale și reduse ca valoare, anumite instituții pot aproba dosarul după o analiză amănunțită.
                </p>
              </article>

              <article className="seo-article-card">
                <h3>IFN și alternative de finanțare</h3>
                <p>
                  Creditele de la IFN-uri reprezintă o variantă accesibilă pe termen scurt, dar vin cu costuri ridicate. Analizăm dacă o astfel de soluție este oportună sau dacă există alternative bancare mai avantajoase.
                </p>
              </article>

              <article className="seo-article-card">
                <h3>De ce nu este bine să aplici la întâmplare?</h3>
                <p>
                  Trimiterea simultană de aplicații la 5-10 bănci creează interogări repetate în Biroul de Credit. Sistemul FICO interpretează acest comportament drept stare de urgență financiară și scade automat scorul de credit.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="totul-section totul-faq-section" id="faq">
          <div className="totul-container">
            <div className="totul-section-header">
              <span className="totul-tag">ÎNTREBĂRI FRECVENTE</span>
              <h2>Tot ce trebuie să știi înainte de a aplica</h2>
            </div>

            <div className="totul-faq-grid">
              {faqsList.map((item, idx) => (
                <div key={idx} className="totul-faq-card">
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERNAL LINKING SECTION */}
        <section className="totul-section totul-internal-links-section">
          <div className="totul-container">
            <h3 className="internal-links-title">Servicii conexe și resurse de consultanță:</h3>
            <div className="internal-links-grid">
              <Link href="/credit-nevoi-personale">Credit nevoi personale</Link>
              <Link href="/refinantare-credit">Refinanțare credit</Link>
              <Link href="/credit-istoric-negativ">Credit cu istoric negativ</Link>
              <Link href="/stergere-birou-credit">Analiză Biroul de Credit</Link>
              <Link href="/broker-credite-bucuresti">Broker credite București</Link>
              <Link href="/calculator-rata-credit">Calculator rată credit</Link>
            </div>
          </div>
        </section>

        {/* FINAL BOTTOM CTA SECTION */}
        <section className="totul-section totul-final-cta-section">
          <div className="totul-container">
            <div className="final-cta-card">
              <h2>Ai fost refuzat din cauza istoricului de credit?</h2>
              <p className="final-cta-sub">
                Nu aplica la întâmplare la încă un creditor. În primul rând, verifică-ți situația.
              </p>
              <p className="final-cta-desc">
                Mai întâi înțelegem situația ta financiară și raportările din Biroul de Credit. Apoi identificăm ce opțiuni pot exista.
              </p>

              <a href="#funnel-form" className="totul-hero-cta-btn final-btn">
                <span>VREAU SĂ-MI VERIFIC SITUAȚIA</span>
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="footer-cols">
            <div className="footer-col brand-col">
              <Link href="/" className="brand" style={{ letterSpacing: "-1px" }}>
                <span>CV</span> Finance
              </Link>
              <p className="brand-desc">
                Credit Advisory & Financial Optimization. Consultanță și intermediere financiară independentă fondată de Cristian Văduva.
              </p>
              <div className="brand-meta">
                <strong>Cristian Văduva</strong>
                <span>Senior Sales · Credit & Financial Advisory</span>
              </div>
              <div className="contact-inline">
                <a href={`tel:${CONTACT.PHONE}`}>Telefon</a>
                <span className="dot">•</span>
                <a href={`https://wa.me/${CONTACT.WHATSAPP}?text=Bun%C4%83%20ziua%2C%20doresc%20o%20analiz%C4%83.`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                <span className="dot">•</span>
                <a href={`mailto:${CONTACT.EMAIL}`}>Email</a>
              </div>
            </div>

            <div className="footer-col">
              <strong className="col-title">Navigație</strong>
              <div className="link-strip">
                <Link href="/">Acasă</Link>
                <Link href="/credit-nevoi-personale">Credit nevoi personale</Link>
                <Link href="/refinantare-credit">Refinanțare</Link>
                <Link href="/credit-istoric-negativ">Istoric negativ</Link>
                <Link href="/totul-inainte-de-credit">Totul înainte de credit</Link>
                <Link href="/referral">Recomandări</Link>
              </div>
            </div>

            <div className="footer-col">
              <strong className="col-title">Legal</strong>
              <div className="link-strip">
                <Link href="/termeni-si-conditii">Termeni și condiții</Link>
                <Link href="/politica-confidentialitate">Confidențialitate</Link>
                <Link href="/gdpr">GDPR</Link>
                <Link href="/nota-legala">Notă legală</Link>
                <Link href="/acord-marketing">Acord marketing</Link>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copyright">
              <span>© {footerYear} CV Finance. Parte din Cristian Văduva Intelligence Ecosystem.</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
