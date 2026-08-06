import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck, Database, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Politica de Confidențialitate & Cookie-uri GDPR | CV Finance",
  description:
    "Politica de confidențialitate, politica privind cookie-urile și protecția datelor cu caracter personal conform Regulamentului GDPR la CV Finance.",
  alternates: { canonical: "/politica-confidentialitate" },
  robots: { index: true, follow: true },
};

export default function PoliticaConfidentialitate() {
  return (
    <main className="legal">
      <Link href="/" className="brand" style={{ letterSpacing: "-1px", display: "inline-block", marginBottom: "24px" }}>
        <span>CV</span> Finance
      </Link>

      <p className="eyebrow"><span /> PROTECȚIA DATELOR GDPR</p>
      <h1>Politica de Confidențialitate & Cookie-uri</h1>
      <p style={{ color: "var(--muted)", marginBottom: "40px" }}>Ultima actualizare: 6 august 2026</p>

      <h2>1. Operatorul de date</h2>
      <p>
        Operatorul datelor cu caracter personal colectate prin intermediul platformei credite.cristianvaduva.com este <strong>CV Finance</strong> (Credit Advisory & Financial Optimization), cu sediul în Piața Victoriei, București, România.
      </p>

      <h2>2. Ce date cu caracter personal colectăm</h2>
      <p>
        Colectăm exclusiv datele furnizate voluntar în formularele de analiză financiară:
      </p>
      <ul style={{ color: "var(--muted)", paddingLeft: "20px" }}>
        <li><strong>Date de identificare și contact:</strong> Nume complet, număr de telefon, adresă de email, anul nașterii.</li>
        <li><strong>Informații financiare:</strong> Venit net lunar, vechime la locul de muncă.</li>
        <li><strong>Date despre credite:</strong> Tipul creditelor deținute (Bancă, IFN, Card credit, Leasing), valoarea ratelor lunare, istoricul întârzierilor.</li>
        <li><strong>Preferințe financiare:</strong> Suma dorită și scopul creditului / refinanțării.</li>
      </ul>

      <h2>3. Politica privind Cookie-urile și Serviciile Terțe</h2>
      <p>
        Folosim cookie-uri pentru a vă oferi o experiență sigură și optimizată. Categoriile de cookie-uri utilizate sunt:
      </p>
      <ul style={{ color: "var(--muted)", paddingLeft: "20px" }}>
        <li><strong>Necesare (Obligatorii):</strong> Asigură securitatea și funcționalitatea de bază a site-ului.</li>
        <li><strong>Analitice (Google Analytics):</strong> Ne ajută să înțelegem modul în care utilizatorii interacționează cu site-ul, anonimizând IP-ul. Codul se încarcă exclusiv cu acordul dumneavoastră.</li>
        <li><strong>Marketing (Meta Pixel):</strong> Permite măsurarea conversiilor din campanii și afișarea de mesaje relevante. Codul se încarcă exclusiv cu acordul dumneavoastră.</li>
      </ul>
      <p>
        Vă puteți modifica sau retrage preferințele privind cookie-urile în orice moment folosind link-ul <strong>&bdquo;Setări Cookie-uri&rdquo;</strong> disponibil în subsolul fiecărei pagini.
      </p>

      <h2>4. Scopul prelucrării datelor</h2>
      <p>Datele sunt prelucrate exclusiv pentru:</p>
      <ul style={{ color: "var(--muted)", paddingLeft: "20px" }}>
        <li>Evaluarea eligibilității și efectuarea analizei financiare gratuite.</li>
        <li>Contactarea dumneavoastră telefonică sau prin email pentru prezentarea opțiunilor disponibile.</li>
        <li>Transmiterea către partenerii financiari doar în momentul în care doriți aplicarea oficială.</li>
        <li>Trimiterea de comunicări comerciale (doar dacă ați bifat acordul opțional de marketing).</li>
      </ul>

      <h2>5. Temeiul juridic al prelucrării</h2>
      <p>
        Prelucrarea se întemeiază pe <strong>Consimțământul dumneavoastră</strong> (Art. 6 alin. 1 lit. a din GDPR) exprimat prin trimiterea formularului și gestionarea opțiunilor de cookie, precum și pe <strong>Demersurile precontractuale</strong> efectuate la cererea dumneavoastră.
      </p>

      <h2>6. Păstrarea și securitatea datelor</h2>
      <p>
        Aplicăm măsuri tehnice și organizatorice avansate (criptare SSL, servere securizate, acces restricționat) pentru a preveni accesul neautorizat, pierderea sau divulgarea datelor.
      </p>

      <h2>7. Perioada de stocare</h2>
      <p>
        Păstrăm datele cu caracter personal pe o perioadă de maximum 12 luni de la ultima interacțiune, sau până la retragerea consimțământului dumneavoastră.
      </p>

      <h2>8. Drepturile dumneavoastră conform GDPR</h2>
      <p>Conform Regulamentului (UE) 2016/679, beneficiați de următoarele drepturi:</p>
      <ul style={{ color: "var(--muted)", paddingLeft: "20px" }}>
        <li><strong>Dreptul de acces:</strong> Puteți solicita o copie a datelor colectate.</li>
        <li><strong>Dreptul la rectificare:</strong> Puteți solicita corectarea datelor inexacte.</li>
        <li><strong>Dreptul la ștergere („dreptul de a fi uitat”):</strong> Puteți solicita ștergerea completă a datelor.</li>
        <li><strong>Dreptul la restricționarea prelucrării și portabilitatea datelor.</strong></li>
        <li><strong>Dreptul de a vă modifica consimțământul pentru cookie-uri oricând din footer.</strong></li>
      </ul>

      <div style={{ marginTop: "48px" }}>
        <Link href="/" className="button white" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <ArrowLeft size={16} /> Înapoi la pagina principală
        </Link>
      </div>
    </main>
  );
}
