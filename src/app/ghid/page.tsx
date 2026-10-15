import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight, ShieldCheck, Clock, ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Ghiduri & Educație Financiară | CV Finance",
  description:
    "Centrul editorial CV Finance: ghiduri practice, independente și obiective despre credite, dobânzi, DAE, refinanțare, Biroul de Credit și gestionarea ratelor lunare.",
  keywords: [
    "ghiduri credite romania",
    "educatie financiara credite",
    "cum functioneaza creditele",
    "ghid refinantare",
    "ghid biroul de credit",
    "sfaturi broker credite",
  ],
  alternates: { canonical: "/ghid" },
};

const guidesList = [
  {
    slug: "cum-stii-daca-un-credit-este-scump",
    title: "Cum Îți Dai Seama Dacă un Credit Este Scump?",
    subtitle: "Diferența dintre dobânda nominală și DAE, comisioane ascunse, asigurări obligatorii și scadențarul anuitant.",
    category: "COSTURI ȘI COMPARARE",
    readingTime: "6 MIN",
  },
  {
    slug: "credite-rapide-ifn-cost-real",
    title: "Credite Rapide și IFN-uri: Cum Înțelegi Costul Real",
    subtitle: "De la 1% pe zi la mii de procente DAE. Matematica dobânzii simple vs. compuse și capcana prelungirilor repetate.",
    category: "CREDITE NEBANCARE (IFN)",
    readingTime: "7 MIN",
  },
  {
    slug: "cum-compari-ofertele-de-credit",
    title: "Cum Compari Ofertele de Credit în Mod Inteligent",
    subtitle: "DAE, dobândă fixă vs. variabilă, cost total de rambursare și secvențierea corectă a aplicărilor pentru protejarea scorului FICO.",
    category: "STRATEGIE DE CREDITARE",
    readingTime: "7 MIN",
  },
  {
    slug: "stresul-ratelor-multiple-solutii",
    title: "Stresul Ratelor Multiple: Cum Oprești Presiunea Financiară",
    subtitle: "Semnale de alarmă timpurii, gradul real de îndatorare și soluțiile concrete înainte de acumularea restanțelor.",
    category: "SĂNĂTATE FINANCIARĂ",
    readingTime: "6 MIN",
  },
  {
    slug: "ce-trebuie-sa-stii-inainte-sa-semnezi-un-credit",
    title: "Ce Trebuie Să Știi Înainte Să Semnezi un Credit",
    subtitle: "Credit de consum, card de cumpărături sau overdraft. Clauze contractuale critice și capcana retragerilor de numerar.",
    category: "CONTRACTE ȘI CLAUZE",
    readingTime: "7 MIN",
  },
  {
    slug: "cand-are-sens-refinantarea-unui-credit",
    title: "Când Are Sens Refinanțarea și Când NU Merită?",
    subtitle: "Analiza punctului de amortizare: costuri de transfer, taxe notariale, perioada rămasă și diferența reală de rată.",
    category: "REFINANȚARE ȘI OPTIMIZARE",
    readingTime: "7 MIN",
  },
  {
    slug: "istoricul-de-credit-biroul-de-credit-optiuni",
    title: "Istoricul de Credit: Rectificări Legale și Opțiuni Realiste",
    subtitle: "Cum funcționează Biroul de Credit, când există temei legal de rectificare și planul practic de reconstruire a scorului bancar.",
    category: "BIROUL DE CREDIT",
    readingTime: "8 MIN",
  },
];

export default function GhidIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Centrul de Ghiduri & Educație Financiară CV Finance",
        url: "https://credite.cristianvaduva.com/ghid",
        description: "Articole și analize financiare independente redactate de Cristian Văduva pentru o înțelegere clară a pieței de creditare.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Acasă", item: "https://credite.cristianvaduva.com" },
          { "@type": "ListItem", position: 2, name: "Ghiduri Financiare", item: "https://credite.cristianvaduva.com/ghid" },
        ],
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
              <BookOpen size={16} />
              <span>CENTRUL EDITORIAL / EDUCAȚIE FINANCIARĂ</span>
            </span>
            <h1 className="cv-legal-title">
              Ghiduri Financiare: Claritate Înainte Să Semnezi
            </h1>
            <p className="cv-legal-sub">
              Înainte de a lua orice decizie de creditare sau refinanțare, informează-te direct pe cifre reale. Am structurat aceste ghiduri practice pentru a demonta miturile și a-ți oferi instrumentele de calcul necesare.
            </p>
            <div className="cv-legal-meta">
              <span>EDITORIAL CRISTIAN VĂDUVA</span>
              <span>•</span>
              <span>7 GHIDURI PRACTICE DISPONIBILE</span>
            </div>
          </div>

          {/* Grid de Ghiduri */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.75rem", margin: "2rem 0 4rem" }}>
            {guidesList.map((guide, idx) => {
              const numStr = String(idx + 1).padStart(2, "0");
              return (
                <article
                  key={guide.slug}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    padding: "2rem",
                    transition: "border-color 150ms ease, box-shadow 150ms ease",
                  }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    <span className="cv-mono" style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--emerald, #087F5B)", letterSpacing: "0.06em" }}>
                      GHID {numStr} · {guide.category}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary, #5F6368)", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                      <Clock size={13} /> {guide.readingTime}
                    </span>
                  </div>

                  <h2 style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.55rem)", fontWeight: 700, margin: "0 0 0.6rem 0", color: "var(--text-primary, #111111)", lineHeight: "1.25" }}>
                    <Link
                      href={`/ghid/${guide.slug}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {guide.title}
                    </Link>
                  </h2>

                  <p style={{ fontSize: "0.98rem", color: "var(--text-secondary, #5F6368)", lineHeight: "1.6", margin: "0 0 1.5rem 0" }}>
                    {guide.subtitle}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
                    <Link
                      href={`/ghid/${guide.slug}`}
                      className="cv-btn-secondary"
                      style={{ fontSize: "0.85rem", padding: "0.6rem 1.25rem" }}
                    >
                      CITEȘTE GHIDUL COMPLET →
                    </Link>
                    <span className="cv-mono" style={{ fontSize: "0.8rem", color: "var(--emerald, #087F5B)", fontWeight: 600 }}>
                      ARTICOL ORIGINAL CV FINANCE
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* CTA Box Final */}
          <div className="cv-partner-card" style={{ textAlign: "center", backgroundColor: "var(--bg-secondary, #F7F9F8)" }}>
            <span className="cv-partner-badge">ANALIZĂ PERSONALIZATĂ PE CIFRELE TALE</span>
            <h2 className="cv-partner-title" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", margin: "0.5rem 0 1rem" }}>
              Preferi o discuție directă cu un consultant?
            </h2>
            <p className="cv-partner-text" style={{ margin: "0 auto 2rem", maxWidth: "620px" }}>
              Dacă ai o situație specifică sau mai multe credite care necesită o analiză comparativă, completează formularul de calificare. Îți spunem clar ce variante există.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
              <Link href="/#verificare-credit" className="cv-btn-primary" style={{ padding: "0.9rem 2rem" }}>
                SOLICITĂ O ANALIZĂ GRATUITĂ →
              </Link>
              <Link href="/#calculator" className="cv-btn-secondary" style={{ padding: "0.9rem 1.75rem" }}>
                CALCULATOR RATE PE HOMEPAGE
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
