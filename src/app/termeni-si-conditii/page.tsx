import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, FileText, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Termeni și Condiții | CV Finance",
  description:
    "Termenii și condițiile de utilizare a platformei de consultanță financiară CV Finance. Informații privind natura serviciilor noastre.",
  alternates: { canonical: "/termeni-si-conditii" },
  robots: { index: true, follow: true },
};

export default function TermeniSiConditii() {
  return (
    <main className="legal">
      <Link href="/" className="brand" style={{ letterSpacing: "-1px", display: "inline-block", marginBottom: "24px" }}>
        <span>CV</span> Finance
      </Link>

      <p className="eyebrow"><span /> TRANSPARENȚĂ ȘI RESPECT</p>
      <h1>Termeni și Condiții</h1>
      <p style={{ color: "var(--muted)", marginBottom: "32px" }}>Ultima actualizare: 6 august 2026</p>

      <div style={{ background: "var(--card-bg)", border: "1px solid var(--neon-green)", borderRadius: "16px", padding: "24px", marginBottom: "40px" }}>
        <p style={{ color: "var(--ink)", fontWeight: 600, margin: 0, fontSize: "0.95rem" }}>
          &ldquo;CV Finance oferă servicii de analiză și consultanță financiară. Rezultatele analizelor sunt orientative și nu reprezintă o garanție de aprobare a unui credit. Decizia finală aparține exclusiv instituției financiare partenere, conform propriilor criterii de eligibilitate.&rdquo;
        </p>
      </div>

      <h2>1. Termeni generali de utilizare</h2>
      <p>
        Accesarea și utilizarea site-ului credite.cristianvaduva.com implică acceptarea deplină a prezentelor Termeni și Condiții. Dacă nu sunteți de acord cu termenii stabiliți, vă rugăm să întrerupeți utilizarea platformei.
      </p>

      <h2>2. Rolul CV Finance</h2>
      <p>
        CV Finance funcționează ca un birou de consultanță și intermediere financiară independentă. CV Finance NU este o bancă, o instituție financiară nebancară (IFN) și nu acordă împrumuturi direct.
      </p>

      <h2>3. Responsabilitățile utilizatorului</h2>
      <p>
        Utilizatorul este responsabil pentru furnizarea unor informații reale, corecte și complete în formularele de analiză. Furnizarea de date false sau eronate poate conduce la imposibilitatea analizării cererii.
      </p>

      <h2>4. Scopul informațiilor de pe site</h2>
      <p>
        Toate calculele, estimările și exemplele afișate pe site au rol exclusiv demonstrativ și orientativ. Condițiile finale de creditare sunt stabilite exclusiv în urma analizei dosarului de către partenerii bancari.
      </p>

      <h2>5. Procesul de solicitare a analizei</h2>
      <p>
        Trimiterea formularului constituie o solicitare gratuită de analiză financiară. Un consultant CV Finance vă va contacta telefonic sau prin email pentru a discuta opțiunile eligibile.
      </p>

      <h2>6. Lipsa garanției de aprobare</h2>
      <p>
        CV Finance nu garantează aprobarea niciunui credit. Aprobarea depinde 100% de profilul financiar al solicitantului și de politica internă de risc a instituțiilor partenere.
      </p>

      <h2>7. Proprietate intelectuală</h2>
      <p>
        Întreg conținutul text, elemente grafice, logo-uri și design ale platformei CV Finance sunt protejate de legislația privind drepturile de autor.
      </p>

      <h2>8. Limitarea răspunderii</h2>
      <p>
        CV Finance nu poate fi trasă la răspundere pentru eventualele decizii de respingere emise de instituțiile financiare sau pentru modificările de dobândă efectuate de bănci.
      </p>

      <h2>9. Modificarea termenilor</h2>
      <p>
        CV Finance își rezervă dreptul de a actualiza prezenta pagină în orice moment. Versiunea actualizată devine aplicabilă din momentul publicării pe site.
      </p>

      <h2>10. Contact legal</h2>
      <p>
        Pentru orice întrebare legală referitoare la termenii noștri, ne puteți contacta la adresa de email publicată pe site sau direct prin reprezentant legal Cristian Văduva.
      </p>

      <div style={{ marginTop: "48px" }}>
        <Link href="/" className="button white" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <ArrowLeft size={16} /> Înapoi la pagina principală
        </Link>
      </div>
    </main>
  );
}
