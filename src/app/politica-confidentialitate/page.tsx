import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Politica de Confidențialitate & Cookie-uri GDPR | CV Finance",
  description:
    "Politica de confidențialitate, politica privind cookie-urile și protecția datelor cu caracter personal conform Regulamentului GDPR la CV Finance.",
  alternates: { canonical: "/politica-confidentialitate" },
  robots: { index: true, follow: true },
};

const TOC_ITEMS = [
  { id: "sec-01", num: "01", title: "Operatorul de date" },
  { id: "sec-02", num: "02", title: "Date cu caracter personal colectate" },
  { id: "sec-03", num: "03", title: "Politica privind Cookie-urile" },
  { id: "sec-04", num: "04", title: "Scopul prelucrării datelor" },
  { id: "sec-05", num: "05", title: "Temeiul juridic al prelucrării" },
  { id: "sec-06", num: "06", title: "Păstrarea și securitatea datelor" },
  { id: "sec-07", num: "07", title: "Perioada de stocare" },
  { id: "sec-08", num: "08", title: "Drepturile dumneavoastră conform GDPR" },
];

export default function PoliticaConfidentialitate() {
  return (
    <main className="cv-legal-main">
      <div className="cv-legal-container">
        {/* Page Hero */}
        <div className="cv-legal-header">
          <span className="cv-legal-eyebrow">
            LEGAL / CONFIDENȚIALITATE &amp; COOKIES
          </span>
          <h1 className="cv-legal-title">Politica de Confidențialitate &amp; Cookie-uri</h1>
          <p className="cv-legal-sub">
            Protecția datelor cu caracter personal și transparența prelucrării conform Regulamentului General privind Protecția Datelor (GDPR).
          </p>
          <div className="cv-legal-meta">
            <span>ULTIMA ACTUALIZARE: 6 AUGUST 2026</span>
            <span>REGULAMENT (UE) 2016/679</span>
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
          {/* Section 01 */}
          <section id="sec-01" className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">01</span>
              <h2 className="cv-legal-heading">Operatorul de date</h2>
            </div>
            <p className="cv-legal-text">
              Operatorul datelor cu caracter personal colectate prin intermediul platformei credite.cristianvaduva.com este <strong>CV Finance</strong> (Credit Advisory &amp; Financial Optimization), reprezentat legal prin Cristian Văduva, cu sediul în Piața Victoriei, București, România.
            </p>
          </section>

          {/* Section 02 */}
          <section id="sec-02" className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">02</span>
              <h2 className="cv-legal-heading">Ce date cu caracter personal colectăm</h2>
            </div>
            <p className="cv-legal-text">
              Colectăm exclusiv datele furnizate voluntar de dumneavoastră în formularele de analiză financiară și calificare:
            </p>
            <ul className="cv-legal-list">
              <li className="cv-legal-list-item">
                <strong>Date de identificare și contact:</strong> Nume complet, număr de telefon, adresă de email, anul nașterii.
              </li>
              <li className="cv-legal-list-item">
                <strong>Informații financiare:</strong> Venit net lunar declarat, vechime la locul de muncă actual.
              </li>
              <li className="cv-legal-list-item">
                <strong>Date despre credite și obligații:</strong> Tipul creditelor deținute (Bancă, IFN, Card credit, Leasing), valoarea ratelor lunare cumulate, istoricul întârzierilor la plată.
              </li>
              <li className="cv-legal-list-item">
                <strong>Preferințe financiare:</strong> Suma dorită și scopul creditului sau al refinanțării solicitate.
              </li>
            </ul>
          </section>

          {/* Section 03 */}
          <section id="sec-03" className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">03</span>
              <h2 className="cv-legal-heading">Politica privind Cookie-urile și Serviciile Terțe</h2>
            </div>
            <p className="cv-legal-text">
              Folosim module cookie pentru a vă oferi o experiență sigură, funcțională și optimizată. Categoriile de cookie-uri utilizate pe site sunt:
            </p>
            <div className="cv-legal-grid">
              <div className="cv-legal-card emerald">
                <h3 className="cv-legal-card-title">Necesare (Obligatorii)</h3>
                <p className="cv-legal-card-desc">
                  Asigură securitatea, integritatea sesiunii și funcționalitatea tehnică de bază a site-ului. Sunt mereu active.
                </p>
              </div>
              <div className="cv-legal-card">
                <h3 className="cv-legal-card-title">Analitice (Google Analytics)</h3>
                <p className="cv-legal-card-desc">
                  Ne ajută să înțelegem modul de navigare prin măsurători agregate și anonimizare a adresei IP. Se încarcă exclusiv cu acordul dumneavoastră.
                </p>
              </div>
              <div className="cv-legal-card">
                <h3 className="cv-legal-card-title">Marketing (Meta Pixel)</h3>
                <p className="cv-legal-card-desc">
                  Permite măsurarea eficienței campaniilor și afișarea mesajelor financiare relevante. Se activează doar la consimțământ explicit.
                </p>
              </div>
            </div>
            <div className="cv-legal-callout">
              <div className="cv-legal-callout-title">GESTIONAREA CONSIMȚĂMÂNTULUI</div>
              <p className="cv-legal-callout-text">
                Vă puteți modifica sau retrage preferințele privind modulele cookie în orice moment folosind opțiunea <strong>&bdquo;Setări Cookie-uri&rdquo;</strong> disponibilă în subsolul oricărei pagini.
              </p>
            </div>
          </section>

          {/* Section 04 */}
          <section id="sec-04" className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">04</span>
              <h2 className="cv-legal-heading">Scopul prelucrării datelor</h2>
            </div>
            <p className="cv-legal-text">
              Datele transmise sunt prelucrate exclusiv în următoarele scopuri legitime:
            </p>
            <ul className="cv-legal-list">
              <li className="cv-legal-list-item">
                Evaluarea eligibilității preliminare și efectuarea analizei financiare gratuite.
              </li>
              <li className="cv-legal-list-item">
                Contactarea dumneavoastră telefonică sau prin email pentru prezentarea opțiunilor bancare identificate.
              </li>
              <li className="cv-legal-list-item">
                Transmiterea dosarului către partenerii bancari agreați doar în momentul în care doriți aplicarea oficială.
              </li>
              <li className="cv-legal-list-item">
                Trimiterea de comunicări și recomandări financiare (exclusiv dacă ați bifat acordul opțional de marketing).
              </li>
            </ul>
          </section>

          {/* Section 05 */}
          <section id="sec-05" className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">05</span>
              <h2 className="cv-legal-heading">Temeiul juridic al prelucrării</h2>
            </div>
            <p className="cv-legal-text">
              Prelucrarea datelor se întemeiază pe <strong>Consimțământul dumneavoastră explicit</strong> (Art. 6 alin. 1 lit. a din Regulamentul GDPR) exprimat prin completarea formularului și salvarea opțiunilor de cookie-uri, precum și pe <strong>Efectuarea demersurilor precontractuale</strong> la cererea persoanei vizate (Art. 6 alin. 1 lit. b din GDPR).
            </p>
          </section>

          {/* Section 06 */}
          <section id="sec-06" className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">06</span>
              <h2 className="cv-legal-heading">Păstrarea și securitatea datelor</h2>
            </div>
            <p className="cv-legal-text">
              Aplicăm măsuri tehnice și organizatorice riguroase de securitate (criptare SSL/TLS de nivel bancar, protocoale stricte de acces, servere securizate) pentru a preveni accesul neautorizat, pierderea sau divulgarea neautorizată a informațiilor transmise.
            </p>
          </section>

          {/* Section 07 */}
          <section id="sec-07" className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">07</span>
              <h2 className="cv-legal-heading">Perioada de stocare</h2>
            </div>
            <p className="cv-legal-text">
              Păstrăm datele cu caracter personal pe o perioadă de maximum <strong>12 luni</strong> de la data ultimei interacțiuni directe, sau până în momentul în care solicitați expres ștergerea acestora (&bdquo;dreptul de a fi uitat&rdquo;).
            </p>
          </section>

          {/* Section 08 */}
          <section id="sec-08" className="cv-legal-section">
            <div className="cv-legal-section-header">
              <span className="cv-legal-num">08</span>
              <h2 className="cv-legal-heading">Drepturile dumneavoastră conform GDPR</h2>
            </div>
            <p className="cv-legal-text">
              Conform Regulamentului (UE) 2016/679, beneficiați de următoarele drepturi fundamentale:
            </p>
            <ul className="cv-legal-list">
              <li className="cv-legal-list-item">
                <strong>Dreptul de acces:</strong> Puteți solicita o confirmare privind prelucrarea și o copie a datelor dumneavoastră.
              </li>
              <li className="cv-legal-list-item">
                <strong>Dreptul la rectificare:</strong> Puteți solicita actualizarea sau corectarea oricăror date inexacte.
              </li>
              <li className="cv-legal-list-item">
                <strong>Dreptul la ștergere („dreptul de a fi uitat”):</strong> Puteți cere ștergerea definitivă a datelor din baza noastră.
              </li>
              <li className="cv-legal-list-item">
                <strong>Dreptul la restricționarea prelucrării și la portabilitatea datelor.</strong>
              </li>
              <li className="cv-legal-list-item">
                <strong>Dreptul de a vă modifica opțiunile de consimțământ oricând direct din footer.</strong>
              </li>
            </ul>
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

