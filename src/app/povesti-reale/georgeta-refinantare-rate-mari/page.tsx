import type { Metadata } from "next";
import StoryArticleLayout, { StoryMetrics } from "@/components/StoryArticleLayout";

export const metadata: Metadata = {
  title: "Când ratele ajung să consume aproape 70% din venit — Povestea Georgetei | CV Finance",
  description:
    "Caz real documentat de Smart Credit: Doamna Georgeta avea datorii la IFN-uri ce consumau 70% din venit. Refinanțarea a fost aprobată chiar în ziua depunerii actelor.",
  keywords: [
    "refinanțare credite IFN",
    "rate 70% din venit",
    "comasare datorii IFN",
    "aprobare refinanțare rapidă",
    "scăpare de rate mari",
  ],
  alternates: { canonical: "/povesti-reale/georgeta-refinantare-rate-mari" },
  openGraph: {
    title: "Când ratele ajung să consume aproape 70% din venit — Povestea Georgetei",
    description:
      "Studiu de caz documentat de Smart Credit România. De la ezitare la aprobarea refinanțării obținută chiar în ziua depunerii actelor.",
    url: "https://credite.cristianvaduva.com/povesti-reale/georgeta-refinantare-rate-mari",
    siteName: "CV Finance",
    locale: "ro_RO",
    type: "article",
  },
};

export default function GeorgetaStoryPage() {
  const metrics: StoryMetrics[] = [
    { label: "Ponderea ratelor inițiale", before: "≈ 70%", after: "Sustenabilă", highlight: "Reducere presiune" },
    { label: "Tipul creditelor vechi", before: "IFN Multiple", after: "1 Credit", highlight: "Comasare totală" },
    { label: "Timp aprobare dosar", before: "Amânare", after: "În aceeași zi", highlight: "Aprobat la depunere" },
  ];

  return (
    <StoryArticleLayout
      category="Comasare Rate Mari"
      title="Când ratele ajung să consume aproape 70% din venit."
      subtitle="De la scepticism și amânare la refinanțarea aprobată chiar în ziua depunerii actelor."
      officialSourceUrl="https://smart-credit.ro/smart-info/povestea-georgetei-refinantare-si-scapare-de-ratele-mari.html"
      metrics={metrics}
    >
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 className="cv-serif" style={{ fontSize: "1.75rem", color: "#FFFFFF", marginBottom: "1rem" }}>
          Contextul și spirala ratelor mari
        </h2>
        <p style={{ marginBottom: "1.25rem" }}>
          Situația doamnei Georgeta este una des întâlnită în rândul celor care apelează la împrumuturi nebancare rapide. Căutând soluții punctuale la nevoi neprevăzute, a ajuns să acumuleze datorii la mai multe IFN-uri. În scurt timp, sumele lunare de plată au crescut până când au ajuns să înghiță <strong>aproape 70% din veniturile sale lunare</strong>.
        </p>
        <p style={{ marginBottom: "1.25rem" }}>
          Când aproape trei sferturi din salariu merg direct către rate, bugetul de familie este blocat. Orice cheltuială neașteptată devine o urgență, iar stresul financiar afectează direct calitatea vieții și liniștea de zi cu zi.
        </p>
      </section>

      {/* PARCURS STRUCTURAT PROBLEMĂ -> ANALIZĂ -> SOLUȚIE -> REZULTAT */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 className="cv-serif" style={{ fontSize: "1.75rem", color: "#FFFFFF", marginBottom: "1.5rem" }}>
          Structura Parcursului: De la problemă la rezolvare
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* PROBLEMĂ */}
          <div style={{ backgroundColor: "#141A17", borderLeft: "4px solid #EF4444", padding: "1.5rem", borderRadius: "0 4px 4px 0" }}>
            <span className="cv-mono" style={{ fontSize: "0.75rem", fontWeight: 700, color: "#EF4444", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              ETAPA 1: PROBLEMĂ
            </span>
            <h3 style={{ fontSize: "1.25rem", color: "#FFFFFF", margin: "0.4rem 0 0.6rem" }}>
              Rate lunare ce consumau 70% din venit
            </h3>
            <p style={{ fontSize: "0.95rem", color: "#D1D5DB", margin: 0, lineHeight: 1.65 }}>
              Datoriile dispersate la mai multe IFN-uri au generat o rată lunară cumulat uriașă. Din salariu nu mai rămâneau bani suficienți pentru cheltuielile curente, obligând clienta să amâne deciziile importante.
            </p>
          </div>

          {/* ANALIZĂ */}
          <div style={{ backgroundColor: "#141A17", borderLeft: "4px solid #F59E0B", padding: "1.5rem", borderRadius: "0 4px 4px 0" }}>
            <span className="cv-mono" style={{ fontSize: "0.75rem", fontWeight: 700, color: "#F59E0B", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              ETAPA 2: ANALIZĂ & DEPASIREA SCEPTICISMULUI
            </span>
            <h3 style={{ fontSize: "1.25rem", color: "#FFFFFF", margin: "0.4rem 0 0.6rem" }}>
              Ezitarea inițială și evaluarea profesionistă
            </h3>
            <p style={{ fontSize: "0.95rem", color: "#D1D5DB", margin: 0, lineHeight: 1.65 }}>
              Inițial, doamna Georgeta a fost sceptică. A amânat decizia și a crezut că va rezolva situația prin „ajutor din familie”. Când acea variantă nu a funcționat, s-a decis să lase un specialist de la Smart Credit să îi analizeze complet veniturile și datoriile.
            </p>
          </div>

          {/* SOLUȚIE */}
          <div style={{ backgroundColor: "#141A17", borderLeft: "4px solid #3B82F6", padding: "1.5rem", borderRadius: "0 4px 4px 0" }}>
            <span className="cv-mono" style={{ fontSize: "0.75rem", fontWeight: 700, color: "#3B82F6", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              ETAPA 3: SOLUȚIE
            </span>
            <h3 style={{ fontSize: "1.25rem", color: "#FFFFFF", margin: "0.4rem 0 0.6rem" }}>
              Structurarea dosarului de refinanțare
            </h3>
            <p style={{ fontSize: "0.95rem", color: "#D1D5DB", margin: 0, lineHeight: 1.65 }}>
              Dosarul a fost pregătit minuțios pentru a demonstra stabilitatea veniturilor și posibilitatea reală de a susține o singură rată lunară, comasând toate împrumuturile nebancare existente într-un singur credit.
            </p>
          </div>

          {/* REZULTAT */}
          <div style={{ backgroundColor: "#141A17", borderLeft: "4px solid #10B981", padding: "1.5rem", borderRadius: "0 4px 4px 0" }}>
            <span className="cv-mono" style={{ fontSize: "0.75rem", fontWeight: 700, color: "#10B981", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              ETAPA 4: REZULTAT
            </span>
            <h3 style={{ fontSize: "1.25rem", color: "#FFFFFF", margin: "0.4rem 0 0.6rem" }}>
              Aprobare obținută chiar în ziua depunerii actelor
            </h3>
            <p style={{ fontSize: "0.95rem", color: "#D1D5DB", margin: 0, lineHeight: 1.65 }}>
              Surpriza clientei a fost imensă: creditul de refinanțare a fost aprobat chiar în ziua în care au fost depuse actele! Datoriile IFN au fost comasate, rata lunară a scăzut drastic, iar doamna Georgeta și-a recăpătat independența financiară.
            </p>
          </div>

        </div>
      </section>

      {/* PULL QUOTE REALA SI PARAFRAZATA */}
      <blockquote style={{ borderLeft: "3px solid #10B981", paddingLeft: "1.5rem", margin: "0 0 2.5rem 0", fontStyle: "italic", fontSize: "1.15rem", color: "#F3F4F6", lineHeight: 1.7 }}>
        „În ziua în care am depus actele, în aceeași zi s-a rezolvat. Mi-am câștigat independența, deși credeam inițial că nu o să meargă.”
        <footer style={{ fontStyle: "normal", fontSize: "0.85rem", color: "#9CA3AF", marginTop: "0.5rem" }}>
          — Doamna Georgeta, clientă Smart Credit România
        </footer>
      </blockquote>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 className="cv-serif" style={{ fontSize: "1.75rem", color: "#FFFFFF", marginBottom: "1rem" }}>
          Lecțiile acestui caz
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ backgroundColor: "#0B0F0D", padding: "1.25rem", borderRadius: "4px", borderLeft: "3px solid #10B981" }}>
            <strong style={{ color: "#FFFFFF", display: "block", marginBottom: "0.35rem" }}>1. Amânarea are un cost real.</strong>
            <p style={{ fontSize: "0.9rem", color: "#9CA3AF", margin: 0 }}>
              Cu cât amâni mai mult refinanțarea unor rate scumpe, cu atât plătești mai multe dobânzi penalizatoare la IFN-uri. Decizia luată mai devreme eliberează imediat bani în buget.
            </p>
          </div>
          <div style={{ backgroundColor: "#0B0F0D", padding: "1.25rem", borderRadius: "4px", borderLeft: "3px solid #10B981" }}>
            <strong style={{ color: "#FFFFFF", display: "block", marginBottom: "0.35rem" }}>2. Gândul că „nu o să meargă” este cea mai mare barieră.</strong>
            <p style={{ fontSize: "0.9rem", color: "#9CA3AF", margin: 0 }}>
              Multe persoane își pun singure bariere, presupunând că vor fi respinse. Un specialist care analizează obiectiv dosarul poate identifica soluția potrivită acolo unde clientul nu mai vede nicio ieșire.
            </p>
          </div>
        </div>
      </section>
    </StoryArticleLayout>
  );
}
