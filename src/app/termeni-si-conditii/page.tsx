import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Termeni și Condiții | CV Finance",
  description:
    "Termenii și condițiile de utilizare a platformei de consultanță financiară CV Finance. Informații privind natura serviciilor noastre.",
  alternates: { canonical: "/termeni-si-conditii" },
  robots: { index: true, follow: true },
};

const TOC_ITEMS = [
  { id: "sec-01", num: "01", title: "Termeni generali de utilizare" },
  { id: "sec-02", num: "02", title: "Rolul CV Finance" },
  { id: "sec-03", num: "03", title: "Responsabilitățile utilizatorului" },
  { id: "sec-04", num: "04", title: "Scopul informațiilor de pe site" },
  { id: "sec-05", num: "05", title: "Procesul de solicitare a analizei" },
  { id: "sec-06", num: "06", title: "Lipsa garanției de aprobare" },
  { id: "sec-07", num: "07", title: "Proprietate intelectuală" },
  { id: "sec-08", num: "08", title: "Limitarea răspunderii" },
  { id: "sec-09", num: "09", title: "Modificarea termenilor" },
  { id: "sec-10", num: "10", title: "Contact legal" },
];

export default function TermeniSiConditii() {
  return (
    <main className="cv-legal-main">
      <div className="cv-legal-container">
        {/* Page Hero */}
        <div className="cv-legal-header">
          <span className="cv-legal-eyebrow">
            LEGAL / TERMENI &amp; CONDIȚII
          </span>
          <h1 className="cv-legal-title">Termeni și Condiții de Utilizare</h1>
          <p className="cv-legal-sub">
            Cadrul juridic și condițiile contractuale de utilizare a platformei de consultanță financiară independentă CV Finance.
          </p>
          <div className="cv-legal-meta">
            <span>ULTIMA ACTUALIZARE: 6 AUGUST 2026</span>
            <span>CADRU CONTRACTUAL</span>
          </div>
        </div>

        {/* Table of Contents */}
        <nav className="cv-legal-toc" aria-label="Cuprins document">
          <div className="cv-legal-toc-title">INDEX DOCUMENT</div>
          <ul className="cv-legal-toc-list">
            {TOC_ITEMS.map((item) => (
              <li key={item.id} className="cv-legal-toc-item">
                <a href={`#${item.id}`}>
                  <span className="cv-legal-toc-num">{item.num}</span>
                  <span>{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="cv-legal-article">
          {/* Main Statement Callout */}
          <div className="cv-legal-callout">
            <div className="cv-legal-callout-title">PRECIZARE ESENȚIALĂ</div>
            <p className="cv-legal-callout-text">
              &ldquo;CV Finance oferă servicii de analiză și consultanță financiară independentă. Rezultatele analizelor sunt orientative și nu reprezintă o garanție de aprobare a unui credit. Decizia finală aparține exclusiv instituției financiare partenere, conform propriilor criterii de eligibilitate și de risc.&rdquo;
            </p>
          </div>

          {/* Section 01 */}
          <section id="sec-01" className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">01</span>
              <h2 className="cv-legal-heading">Termeni generali de utilizare</h2>
            </div>
            <p className="cv-legal-text">
              Accesarea și utilizarea site-ului credite.cristianvaduva.com implică acceptarea deplină și necondiționată a prezentelor Termeni și Condiții. Dacă nu sunteți de acord cu termenii stabiliți, vă rugăm să întrerupeți utilizarea platformei noastre.
            </p>
          </section>

          {/* Section 02 */}
          <section id="sec-02" className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">02</span>
              <h2 className="cv-legal-heading">Rolul CV Finance</h2>
            </div>
            <p className="cv-legal-text">
              CV Finance funcționează ca un birou de consultanță și intermediere financiară independentă. CV Finance <strong>NU este o bancă</strong>, <strong>NU este o instituție financiară nebancară (IFN)</strong> și <strong>nu acordă împrumuturi direct</strong> din fonduri proprii.
            </p>
          </section>

          {/* Section 03 */}
          <section id="sec-03" className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">03</span>
              <h2 className="cv-legal-heading">Responsabilitățile utilizatorului</h2>
            </div>
            <p className="cv-legal-text">
              Utilizatorul este pe deplin responsabil pentru furnizarea unor informații reale, corecte și complete în formularele de calificare și analiză. Furnizarea de date false, inexacte sau incomplete poate conduce la imposibilitatea analizării cererii sau la respingerea dosarului de către bănci.
            </p>
          </section>

          {/* Section 04 */}
          <section id="sec-04" className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">04</span>
              <h2 className="cv-legal-heading">Scopul informațiilor de pe site</h2>
            </div>
            <p className="cv-legal-text">
              Toate calculele, estimările, simulările de rate și exemplele afișate pe site au rol exclusiv demonstrativ și orientativ. Condițiile finale de creditare, marjele de dobândă și costurile totale sunt stabilite exclusiv în urma analizei efective a dosarului de către partenerii bancari acreditați.
            </p>
          </section>

          {/* Section 05 */}
          <section id="sec-05" className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">05</span>
              <h2 className="cv-legal-heading">Procesul de solicitare a analizei</h2>
            </div>
            <p className="cv-legal-text">
              Trimiterea formularului pe site constituie o solicitare gratuită de analiză financiară preliminară. Un consultant CV Finance vă va contacta telefonic sau prin email pentru a discuta opțiunile eligibile și pentru a stabili pașii următori, fără nicio obligație financiară din partea dumneavoastră.
            </p>
          </section>

          {/* Section 06 */}
          <section id="sec-06" className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">06</span>
              <h2 className="cv-legal-heading">Lipsa garanției de aprobare</h2>
            </div>
            <p className="cv-legal-text">
              CV Finance nu garantează aprobarea niciunui credit sau finanțare. Aprobarea depinde 100% de profilul financiar al solicitantului, de gradul de îndatorare, de istoricul din Biroul de Credit și de politica internă de risc a instituțiilor creditoare partenere.
            </p>
          </section>

          {/* Section 07 */}
          <section id="sec-07" className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">07</span>
              <h2 className="cv-legal-heading">Proprietate intelectuală</h2>
            </div>
            <p className="cv-legal-text">
              Întreg conținutul text, structura editorială, elementele grafice, logo-urile, denumirile comerciale și designul platformei CV Finance sunt protejate de legislația română și internațională privind drepturile de autor și proprietatea intelectuală.
            </p>
          </section>

          {/* Section 08 */}
          <section id="sec-08" className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">08</span>
              <h2 className="cv-legal-heading">Limitarea răspunderii</h2>
            </div>
            <p className="cv-legal-text">
              CV Finance nu poate fi trasă la răspundere pentru eventualele decizii de respingere emise de instituțiile financiare partenere, pentru întârzierile de procesare apărute din cauze bancare externe sau pentru modificările de dobândă efectuate de creditori.
            </p>
          </section>

          {/* Section 09 */}
          <section id="sec-09" className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">09</span>
              <h2 className="cv-legal-heading">Modificarea termenilor</h2>
            </div>
            <p className="cv-legal-text">
              CV Finance își rezervă dreptul de a actualiza prezenta pagină de Termeni și Condiții în orice moment. Versiunea actualizată devine aplicabilă din momentul publicării sale pe site.
            </p>
          </section>

          {/* Section 10 */}
          <section id="sec-10" className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">10</span>
              <h2 className="cv-legal-heading">Contact legal</h2>
            </div>
            <p className="cv-legal-text">
              Pentru orice întrebare juridică sau solicitare referitoare la termenii noștri de colaborare, ne puteți contacta la adresa oficială de email publicată pe site sau direct prin reprezentantul legal Cristian Văduva.
            </p>
          </section>
        </article>

        {/* Back Link */}
        <div className="cv-legal-back-row">
          <Link href="/" className="cv-legal-back-link">
            <ArrowLeft size={16} /> Înapoi la pagina principală
          </Link>
          <span className="cv-legal-meta">CV Finance — Toate drepturile rezervate</span>
        </div>
      </div>
    </main>
  );
}

