import type { Metadata } from "next";
import StoryArticleLayout, { StoryMetrics } from "@/components/StoryArticleLayout";

export const metadata: Metadata = {
  title: "Un istoric dificil nu înseamnă automat că povestea s-a terminat. — Biroul de Credit | CV Finance",
  description:
    "Caz documentat de Smart Credit: clientă cu restanță veche din 2019. Cu rectificare legală la Biroul de Credit, a obținut ulterior 57.000 lei prin BRD.",
  keywords: [
    "credit cu istoric negativ",
    "rectificare Biroul de Credit",
    "ștergere restanțe vechi",
    "credit BRD 57000 lei",
    "consultanță juridică credite",
  ],
  alternates: { canonical: "/povesti-reale/istoric-negativ-biroul-de-credit" },
  openGraph: {
    title: "Un istoric dificil nu înseamnă automat că povestea s-a terminat. — Biroul de Credit",
    description:
      "Studiu de caz documentat de Smart Credit România. Cum o restanță din 2019 rectificată legal a permis obținerea unui credit bancar de 57.000 lei.",
    url: "https://credite.cristianvaduva.com/povesti-reale/istoric-negativ-biroul-de-credit",
    siteName: "CV Finance",
    locale: "ro_RO",
    type: "article",
  },
};

export default function NegativeHistoryStoryPage() {
  const metrics: StoryMetrics[] = [
    { label: "Restanță veche înregistrată", before: "Din 2019", after: "Rectificată", highlight: "Ștergere legală" },
    { label: "Raport Biroul de Credit", before: "Înregistrări negative", after: "Raport Curat", highlight: "După contestare" },
    { label: "Finanțare bancară obținută", before: "Refuzat anterior", after: "57.000 LEI", highlight: "Aprobat BRD" },
  ];

  return (
    <StoryArticleLayout
      category="Biroul de Credit & Finanțare"
      title="Un istoric dificil nu înseamnă automat că povestea s-a terminat."
      subtitle="Cum s-a deblocat accesul la finanțare bancară după rectificarea legală a Biroului de Credit."
      officialSourceUrl="https://smart-credit.ro/smart-info/povestea-clientei-noastre-credit-dupa-stergere-din-biroul-de-credit.html"
      metrics={metrics}
    >
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 className="cv-serif" style={{ fontSize: "1.75rem", color: "#FFFFFF", marginBottom: "1rem" }}>
          Contextul: O restanță din trecut care bloca viitorul
        </h2>
        <p style={{ marginBottom: "1.25rem" }}>
          O problemă financiară aparută cu ani în urmă poate lăsa o amprentă de lungă durată în istoricul de creditare. În cazul prezentat oficial de Smart Credit, clienta se confrunta cu o restanță veche, datând din 2019, care fusese cesionată către o firmă de recuperare debite.
        </p>
        <p style={{ marginBottom: "1.25rem" }}>
          Această mențiune negativă rămasă activă în baza de date a Biroului de Credit acționa ca un semnal roșu pentru toate băncile. Deși venitul său actual era stabil și permitea plata fără probleme a unei rate, cererile sale anterioare de creditare se loveau automat de refuzuri.
        </p>
      </section>

      {/* BOX RESPONSABILITATE LEGALĂ */}
      <div style={{ backgroundColor: "#141A17", borderLeft: "4px solid #10B981", padding: "1.5rem", borderRadius: "0 4px 4px 0", marginBottom: "2.5rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#10B981", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Clarificare privind rectificarea Biroului de Credit
        </h3>
        <p style={{ fontSize: "0.92rem", color: "#E5E7EB", margin: 0, lineHeight: 1.6 }}>
          Rectificarea sau eliminarea înregistrărilor din Biroul de Credit se poate realiza <strong>exclusiv pe cale legală</strong>, atunci când datele raportate de finanțatori sunt eronate, incomplete sau încalcă normele legale în vigoare. Fiecare dosar necesită o analiză juridică individuală. Nicio entitate nu poate garanta ștergerea automată a restanțelor reale și valide fără fundament legal.
        </p>
      </div>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 className="cv-serif" style={{ fontSize: "1.75rem", color: "#FFFFFF", marginBottom: "1rem" }}>
          Demersul juridic și remedierea raportului de credit
        </h2>
        <p style={{ marginBottom: "1.25rem" }}>
          Recomandată de domnul Iulian (un alt client mulțumit), doamna a solicitat sprijinul echipei Smart Credit. Primul pas nu a fost depunerea unei noi cereri de credit, ci curățarea istoricului.
        </p>
        <p style={{ marginBottom: "1.25rem" }}>
          Cu sprijinul departamentului juridic, restanța veche din 2019 a fost analizată, iar înregistrările inexacte au fost contestate conform normelor legale. În urma demersului, raportul de la Biroul de Credit a fost rectificat, figurând fără restanțe active.
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 className="cv-serif" style={{ fontSize: "1.75rem", color: "#FFFFFF", marginBottom: "1rem" }}>
          Rezultatul: Obținerea creditului de 57.000 lei prin BRD
        </h2>
        <p style={{ marginBottom: "1.25rem" }}>
          Având un raport de credit curat, echipa a putut înainta dosarul către băncile partenere. În scurt timp, clienta a obținut aprobarea pentru creditul de care avea nevoie: <strong>57.000 de lei prin BRD</strong> (soluția denumită „creditul pentru orice”).
        </p>
        <p style={{ marginBottom: "1.25rem" }}>
          Clienta a declarat că se simte profund eliberată și liniștită după ce presiunea istoricului vechi a dispărut complet.
        </p>
      </section>

      {/* PULL QUOTE REALA */}
      <blockquote style={{ borderLeft: "3px solid #10B981", paddingLeft: "1.5rem", margin: "0 0 2.5rem 0", fontStyle: "italic", fontSize: "1.15rem", color: "#F3F4F6", lineHeight: 1.7 }}>
        „Acum sunt mult mai liniștită și mai fericită. Le spun tuturor celor care trec prin ce am trecut eu, cu întârzieri la Biroul de Credit și povară financiară: apelați cu încredere.”
        <footer style={{ fontStyle: "normal", fontSize: "0.85rem", color: "#9CA3AF", marginTop: "0.5rem" }}>
          — Clientă Smart Credit România
        </footer>
      </blockquote>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 className="cv-serif" style={{ fontSize: "1.75rem", color: "#FFFFFF", marginBottom: "1rem" }}>
          Lecțiile educaționale ale acestui caz
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ backgroundColor: "#0B0F0D", padding: "1.25rem", borderRadius: "4px", borderLeft: "3px solid #10B981" }}>
            <strong style={{ color: "#FFFFFF", display: "block", marginBottom: "0.35rem" }}>1. Istoricul negativ din trecut nu este neapărat o condamnare pe viață.</strong>
            <p style={{ fontSize: "0.9rem", color: "#9CA3AF", margin: 0 }}>
              Dacă înregistrările din Biroul de Credit conțin neconcordanțe sau depășesc cadrul normativ, ele pot fi rectificate pe cale legală.
            </p>
          </div>
          <div style={{ backgroundColor: "#0B0F0D", padding: "1.25rem", borderRadius: "4px", borderLeft: "3px solid #10B981" }}>
            <strong style={{ color: "#FFFFFF", display: "block", marginBottom: "0.35rem" }}>2. Ordinea pașilor este esențială.</strong>
            <p style={{ fontSize: "0.9rem", color: "#9CA3AF", margin: 0 }}>
              Aplicarea la bancă înainte de rectificarea Biroului de Credit duce la un nou refuz care scade suplimentar scorul FICO. Soluția corectă este curățarea prealabilă a istoricului.
            </p>
          </div>
        </div>
      </section>
    </StoryArticleLayout>
  );
}
