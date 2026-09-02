import type { Metadata } from "next";
import StoryArticleLayout, { StoryMetrics } from "@/components/StoryArticleLayout";

export const metadata: Metadata = {
  title: "A încercat mai multe variante. Soluția a venit după o analiză diferită. — Raluca | CV Finance",
  description:
    "Caz real documentat de Smart Credit: Raluca încercase mai multe opțiuni respinse pentru cardurile de credit până a găsit o analiză transparentă și sprijin continuu.",
  keywords: [
    "refinanțare carduri credit",
    "soluții refuz bănci",
    "comasare datorii carduri",
    "broker credit recomandare",
    "analiză financiară transparentă",
  ],
  alternates: { canonical: "/povesti-reale/raluca-solutie-finantare" },
  openGraph: {
    title: "A încercat mai multe variante. Soluția a venit după o analiză diferită. — Raluca",
    description:
      "Studiu de caz documentat de Smart Credit România. De la uși închise și refuzuri la o soluție de refinanțare adaptată.",
    url: "https://credite.cristianvaduva.com/povesti-reale/raluca-solutie-finantare",
    siteName: "CV Finance",
    locale: "ro_RO",
    type: "article",
  },
};

export default function RalucaStoryPage() {
  const metrics: StoryMetrics[] = [
    { label: "Încercări anterioare", before: "Refuzuri", after: "Aprobat", highlight: "După analiză nouă" },
    { label: "Sursă contact", before: "Căutare directă", after: "Recomandare", highlight: "Încredere confirmată" },
    { label: "Situație carduri credit", before: "Apăsare lunară", after: "Consolidation", highlight: "Scăpare de povară" },
  ];

  return (
    <StoryArticleLayout
      category="Carduri de Credit"
      title="A încercat mai multe variante. Soluția a venit după o analiză diferită."
      subtitle="Cum poți scăpa de povara cardurilor de credit când ai primit deja răspunsuri negative din alte părți."
      officialSourceUrl="https://smart-credit.ro/smart-info/povestea-ralucai-solutia-la-smart-credit.html"
      metrics={metrics}
    >
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 className="cv-serif" style={{ fontSize: "1.75rem", color: "#FFFFFF", marginBottom: "1rem" }}>
          Contextul și încercările anterioare fara succes
        </h2>
        <p style={{ marginBottom: "1.25rem" }}>
          Când ai nevoie de finanțare sau dorești să îți reorganizezi datoriile, este firesc să încerci prima dată pe cont propriu. Asta a făcut și Raluca: a bătut la mai multe uși bancare, încercând să găsească o variantă de refinanțare pentru mai multe carduri de credit care o încurcau lună de lună.
        </p>
        <p style={{ marginBottom: "1.25rem" }}>
          Din păcate, încercările sale directe s-au lovit de răspunsuri negative. Fiecare bancă aplică un algoritm rigid de risc, iar la ghișeu, dacă profilul nu se potrivește perfect tiparului standard, răspunsul este de cele mai multe ori un „nu” scurt, fără explicații suplimentare.
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 className="cv-serif" style={{ fontSize: "1.75rem", color: "#FFFFFF", marginBottom: "1rem" }}>
          Pasul decisiv: Recomandarea și abordarea transparentă
        </h2>
        <p style={{ marginBottom: "1.25rem" }}>
          Aflată într-un moment de impas, Raluca a ajuns la Smart Credit România în urma recomandării unei cunoștințe care îi sugerase să nu renunțe și să ceară o părere avizată.
        </p>
        <p style={{ marginBottom: "1.25rem" }}>
          Ceea ce i-a recâștigat încrederea nu au fost promisiunile comerciale, ci transparența de la prima discuție. Consultantul dedicat (Mihai) i-a analizat atent venitul și datoriile, explicându-i întregul proces pas cu pas, exact așa cum funcționează, fără termeni inaccesibili.
        </p>
      </section>

      {/* PULL QUOTE REALA */}
      <blockquote style={{ borderLeft: "3px solid #10B981", paddingLeft: "1.5rem", margin: "0 0 2.5rem 0", fontStyle: "italic", fontSize: "1.15rem", color: "#F3F4F6", lineHeight: 1.7 }}>
        „Am fost recomandată de o cunoștință, după ce încercasem mai multe variante și nimeni nu reușea să mă ajute. Mi s-a explicat tot procesul de la început și am primit sprijin la fiecare pas.”
        <footer style={{ fontStyle: "normal", fontSize: "0.85rem", color: "#9CA3AF", marginTop: "0.5rem" }}>
          — Raluca, clientă Smart Credit România
        </footer>
      </blockquote>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 className="cv-serif" style={{ fontSize: "1.75rem", color: "#FFFFFF", marginBottom: "1rem" }}>
          Rezultatul și liniștea recâștigată
        </h2>
        <p style={{ marginBottom: "1.25rem" }}>
          După structurarea corectă a dosarului, s-a obținut finanțarea de refinanțare potrivită. Cardurile de credit au fost acoperite și comasate, iar scadențele multiple au fost înlocuite de o singură rată lunară previzibilă.
        </p>
        <p style={{ marginBottom: "1.25rem" }}>
          Întrebată dacă, privind în urmă, ar lua aceeași decizie de a cere sprijinul unui broker specializat, Raluca a confirmat fără ezitare că ar relua oricând procesul.
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 className="cv-serif" style={{ fontSize: "1.75rem", color: "#FFFFFF", marginBottom: "1rem" }}>
          Lecțiile acestui caz
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ backgroundColor: "#0B0F0D", padding: "1.25rem", borderRadius: "4px", borderLeft: "3px solid #10B981" }}>
            <strong style={{ color: "#FFFFFF", display: "block", marginBottom: "0.35rem" }}>1. Un „nu” primit într-un loc nu e un verdict definitiv.</strong>
            <p style={{ fontSize: "0.9rem", color: "#9CA3AF", margin: 0 }}>
              Politica de creditare difera semnificativ de la o bancă la alta. Un dosar respins la un ghișeu poate fi încadrat cu succes la alt finanțator dacă este prezentat corect.
            </p>
          </div>
          <div style={{ backgroundColor: "#0B0F0D", padding: "1.25rem", borderRadius: "4px", borderLeft: "3px solid #10B981" }}>
            <strong style={{ color: "#FFFFFF", display: "block", marginBottom: "0.35rem" }}>2. Cardurile de credit netestate pot deveni o povară permanentă.</strong>
            <p style={{ fontSize: "0.9rem", color: "#9CA3AF", margin: 0 }}>
              Plata doar a minimului de plată pe cardurile de credit menține datoria aproape intactă. Refinanțarea lor într-un credit de nevoi personale fixează o dată clară de finalizare a debitului.
            </p>
          </div>
        </div>
      </section>
    </StoryArticleLayout>
  );
}
