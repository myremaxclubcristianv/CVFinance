import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Clock,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  ExternalLink,
  Calendar,
  BarChart3,
  AlertCircle,
  Landmark,
} from "lucide-react";
import BnrDataIntelligenceHub from "@/components/bnr/BnrDataIntelligenceHub";

export const metadata: Metadata = {
  title: "Date Economice BNR, Ghiduri & Educație Financiară | CV Finance",
  description:
    "Centrul de date economice BNR și ghiduri CV Finance: serii istorice IRCC și ROBOR, politica monetară BNR, dobânzi medii bancare, cursuri valutare și analize independente.",
  keywords: [
    "date economice bnr",
    "serii istorice ircc",
    "robor 3m 6m bnr",
    "politica monetara bnr",
    "ghiduri credite romania",
    "educatie financiara credite",
    "inflatie romania septembrie 2026",
    "indicatori economici romania",
    "stabilitate bancara romania",
    "rezerve internationale bnr",
    "ghid refinantare",
    "ghid biroul de credit",
  ],
  alternates: { canonical: "/ghid" },
};

interface EconomicNewsItem {
  id: string;
  title: string;
  publishedDate: string;
  sourceDateDisplay: string;
  indicatorName: string;
  primaryValue: string;
  comparisonText: string;
  referencePeriod: string;
  metrics: { label: string; value: string }[];
  summary: string;
  creditContext: string;
  sources: { name: string; url: string; label: string }[];
  disclaimer: string;
}

const economicNews: EconomicNewsItem[] = [
  {
    id: "inflatie-ins-septembrie-2026",
    title: "Inflația anuală din România a ajuns la 6,61% în septembrie 2026",
    publishedDate: "13 Octombrie 2026",
    sourceDateDisplay: "Publicat de INS la 13 octombrie 2026, 09:35",
    indicatorName: "Rata Anuală a Inflației (Indicele Prețurilor de Consum — IPC)",
    primaryValue: "6,61%",
    comparisonText: "în creștere de la 6,17% în luna august 2026",
    referencePeriod: "Septembrie 2026 (anual)",
    metrics: [
      { label: "Servicii", value: "+11,12%" },
      { label: "Mărfuri nealimentare", value: "+7,06%" },
      { label: "Mărfuri alimentare", value: "+3,00%" },
      { label: "Cumulat de la începutul anului (sept. 2026 vs. dec. 2025)", value: "+5,4%" },
    ],
    summary:
      "Conform datelor oficiale publicate de Institutul Național de Statistică (INS) la 13 octombrie 2026, rata anuală a inflației a urcat la 6,61% în luna septembrie 2026, față de 6,17% în august 2026. Scumpirile au fost impulsionate în principal de sectorul serviciilor (+11,12%) și de mărfurile nealimentare (+7,06%), în timp ce mărfurile alimentare au crescut cu 3,00%.",
    creditContext:
      "Relevanță pentru credite și dobânzi: Rata inflației este indicatorul determinant pe care Banca Națională a României (BNR) îl monitorizează în politica sa monetară. Când inflația rămâne la niveluri ridicate, relaxarea dobânzilor de politică monetară devine prudentă sau este amânată, menținând ridicat costul de finanțare al creditelor noi și al celor cu dobânzi variabile (calculate pe baza indicilor IRCC și ROBOR).",
    sources: [
      {
        name: "Radio România Actualități",
        label: "Rata anuală a inflației a urcat la 6,61% în luna septembrie",
        url: "https://www.romania-actualitati.ro/stiri/economie/rata-anuala-a-inflatiei-a-urcat-la-6-61-in-luna-septembrie-id235774.html",
      },
      {
        name: "Radio România",
        label: "INS: Rata anuală a inflației a crescut în septembrie la 6,61%",
        url: "https://www.radioromania.ro/economic/ins-rata-anuala-a-inflatiei-a-crescut-in-septembrie-la-6-61-id227406.html",
      },
    ],
    disclaimer:
      "Date oficiale statistice istorice realizate, furnizate de INS la 13 octombrie 2026. Informația are rol exclusiv educativ și informativ economic, nu reprezintă o prognoză și nu constituie o recomandare de investiții sau o promisiune privind condițiile de creditare.",
  },
];

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
        description: "Articole, indicatori economici oficiali și analize financiare independente redactate de Cristian Văduva.",
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
              Înainte de a lua orice decizie de creditare sau refinanțare, informează-te direct pe cifre reale. Am structurat aceste ghiduri practice și indicatori macroeconomici pentru a demonta miturile și a-ți oferi instrumentele de calcul necesare.
            </p>
            <div className="cv-legal-meta">
              <span>EDITORIAL CRISTIAN VĂDUVA</span>
              <span>•</span>
              <span>DATE OFICIALE VERIFICATE</span>
              <span>•</span>
              <span>CENTRUL DE DATE BNR (7 CATEGORII)</span>
              <span>•</span>
              <span>7 GHIDURI PRACTICE DISPONIBILE</span>
            </div>
          </div>

          {/* SECȚIUNEA 1: CENTRUL DE DATE ECONOMICE BNR & INDICATORI STATISTICI OFICIALI */}
          <section id="indicatori-macroeconomici" style={{ margin: "2rem 0 3.5rem" }}>
            {/* Componenta Interactivă BNR Data Intelligence Hub */}
            <BnrDataIntelligenceHub />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", margin: "2.5rem 0 1.25rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <TrendingUp size={18} style={{ color: "var(--emerald, #087F5B)" }} />
                <span className="cv-mono" style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.06em", color: "var(--emerald, #087F5B)" }}>
                  BULETIN STATISTIC OFICIAL: INFLAȚIA IPC (SURSA PRIMARĂ INS)
                </span>
              </div>
              <span style={{ fontSize: "0.78rem", color: "var(--text-secondary, #5F6368)" }}>
                SURSE OFICIALE: INS · ACTUALIZAT LA ZI
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {economicNews.map((item) => (
                <article
                  key={item.id}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    padding: "clamp(1.5rem, 3vw, 2.25rem)",
                  }}
                >
                  {/* Top Meta Bar */}
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", marginBottom: "1rem" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        padding: "0.3rem 0.65rem",
                        backgroundColor: "rgba(8, 127, 91, 0.08)",
                        color: "var(--emerald, #087F5B)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        borderRadius: "2px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      <BarChart3 size={13} />
                      STATISTICĂ OFICIALĂ INS
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-secondary, #5F6368)", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                      <Calendar size={13} />
                      {item.sourceDateDisplay}
                    </span>
                  </div>

                  {/* News Title */}
                  <h2 style={{ fontSize: "clamp(1.35rem, 2.8vw, 1.75rem)", fontWeight: 700, color: "var(--text-primary, #111111)", lineHeight: "1.25", margin: "0 0 1rem 0" }}>
                    {item.title}
                  </h2>

                  {/* Primary Indicator Stat Box */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1.25rem",
                      backgroundColor: "var(--bg-secondary, #F7F9F8)",
                      border: "1px solid var(--border)",
                      padding: "1.25rem 1.5rem",
                      borderRadius: "2px",
                      margin: "1.25rem 0",
                    }}
                  >
                    <div>
                      <span className="cv-mono" style={{ fontSize: "0.75rem", color: "var(--text-secondary, #5F6368)", display: "block", marginBottom: "0.25rem", textTransform: "uppercase" }}>
                        {item.indicatorName}
                      </span>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 800, color: "var(--emerald, #087F5B)", lineHeight: 1 }}>
                          {item.primaryValue}
                        </span>
                        <span style={{ fontSize: "0.88rem", color: "var(--text-secondary, #5F6368)" }}>
                          ({item.comparisonText})
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span className="cv-mono" style={{ fontSize: "0.75rem", color: "var(--text-secondary, #5F6368)", display: "block", marginBottom: "0.25rem" }}>
                        PERIOADĂ DE REFERINȚĂ
                      </span>
                      <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary, #111111)" }}>
                        {item.referencePeriod}
                      </span>
                    </div>
                  </div>

                  {/* Metrics Breakdown Grid */}
                  <div style={{ margin: "1.5rem 0" }}>
                    <span className="cv-mono" style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary, #5F6368)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.75rem" }}>
                      Defalcare oficială pe categorii de consum:
                    </span>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.85rem" }}>
                      {item.metrics.map((m) => (
                        <div
                          key={m.label}
                          style={{
                            padding: "0.85rem 1rem",
                            border: "1px solid var(--border)",
                            borderRadius: "2px",
                            backgroundColor: "#FFFFFF",
                          }}
                        >
                          <span style={{ fontSize: "0.8rem", color: "var(--text-secondary, #5F6368)", display: "block", marginBottom: "0.25rem" }}>
                            {m.label}
                          </span>
                          <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary, #111111)" }}>
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary & Impact Paragraphs */}
                  <p style={{ fontSize: "0.98rem", color: "var(--text-primary, #111111)", lineHeight: "1.65", margin: "0 0 1rem 0" }}>
                    {item.summary}
                  </p>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-secondary, #5F6368)", lineHeight: "1.6", margin: "0 0 1.5rem 0" }}>
                    {item.creditContext}
                  </p>

                  {/* Sources Bar */}
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
                      <span className="cv-mono" style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary, #5F6368)" }}>
                        SURSE VERIFICATE:
                      </span>
                      {item.sources.map((src) => (
                        <a
                          key={src.url}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: "0.82rem",
                            color: "var(--emerald, #087F5B)",
                            textDecoration: "none",
                            fontWeight: 600,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.3rem",
                          }}
                        >
                          <span>{src.name}</span>
                          <ExternalLink size={12} />
                        </a>
                      ))}
                    </div>

                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary, #5F6368)", fontStyle: "italic" }}>
                      Confirmare documentară INS
                    </span>
                  </div>

                  {/* Transparency Note */}
                  <div style={{ marginTop: "1rem", padding: "0.65rem 0.85rem", backgroundColor: "var(--bg-secondary, #F7F9F8)", borderLeft: "3px solid var(--border)", fontSize: "0.78rem", color: "var(--text-secondary, #5F6368)", lineHeight: "1.4" }}>
                    {item.disclaimer}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* SECȚIUNEA 2: GHIDURI PRACTICE FINANCIARE (EVERGREEN) */}
          <section id="ghiduri-practice" style={{ margin: "2rem 0 4rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <BookOpen size={18} style={{ color: "var(--emerald, #087F5B)" }} />
                <span className="cv-mono" style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.06em", color: "var(--emerald, #087F5B)" }}>
                  GHIDURI FINANCIARE PRACTICE
                </span>
              </div>
              <span style={{ fontSize: "0.78rem", color: "var(--text-secondary, #5F6368)" }}>
                7 ARTICOLE DE CONSULTANȚĂ OBIECTIVĂ
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.75rem" }}>
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
                        Ghid financiar
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

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
