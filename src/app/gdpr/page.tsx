import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, CheckCircle2, KeyRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Protecția Datelor GDPR Explicată Simplu | CV Finance",
  description:
    "Află cum îți protejăm datele la CV Finance. Ghid simplu și clar privind securitatea, cookie-urile și confidențialitatea datelor tale.",
  alternates: { canonical: "/gdpr" },
  robots: { index: true, follow: true },
};

export default function GDPRPage() {
  return (
    <main className="legal">
      <Link href="/" className="brand" style={{ letterSpacing: "-1px", display: "inline-block", marginBottom: "24px" }}>
        <span>CV</span> Finance
      </Link>

      <p className="eyebrow"><span /> GHID SIMPLIFICAT</p>
      <h1>Protecția Datelor Tale (GDPR)</h1>
      <p style={{ color: "var(--muted)", marginBottom: "40px" }}>Transparență totală în utilizarea datelor personale.</p>

      <div style={{ background: "var(--card-bg)", border: "1px solid var(--neon-green)", borderRadius: "20px", padding: "32px", marginBottom: "40px" }}>
        <h3 style={{ color: "var(--neon-green)", marginTop: 0 }}>Principiul nostru principal:</h3>
        <p style={{ fontSize: "1.2rem", color: "var(--ink)", fontWeight: 600, margin: 0 }}>
          &ldquo;Datele tale sunt folosite doar pentru a analiza situația ta și pentru a te contacta în legătură cu solicitarea trimisă.&rdquo;
        </p>
      </div>

      <div className="grid grid-2" style={{ marginBottom: "40px" }}>
        <div className="card">
          <div className="icon">
            <Lock size={24} />
          </div>
          <h3>Securitate garantată</h3>
          <p>Folosim conexiuni criptate SSL și servere securizate de nivel bancar. Nimeni neautorizat nu are acces la datele tale.</p>
        </div>

        <div className="card">
          <div className="icon">
            <ShieldCheck size={24} />
          </div>
          <h3>Confidențialitate 100%</h3>
          <p>Nu vindem și nu închiriem baza de date niciunei terțe părți. Datele sunt procesate strict pentru solicitarea ta.</p>
        </div>

        <div className="card">
          <div className="icon">
            <CheckCircle2 size={24} />
          </div>
          <h3>Consimțământ sub controlul tău</h3>
          <p>Tu decizi dacă dorești doar analiza gratuită sau dacă permiți cookie-uri analitice sau de marketing.</p>
        </div>

        <div className="card">
          <div className="icon">
            <KeyRound size={24} />
          </div>
          <h3>Dreptul de a fi uitat</h3>
          <p>Dacă te răzgândești, ne trimiți un simplu email și îți ștergem toate datele din sistemele noastre în 24-48h.</p>
        </div>
      </div>

      <h2>Gestionarea preferințelor de Cookie-uri</h2>
      <div style={{ background: "var(--card-bg)", border: "1px solid var(--line)", borderRadius: "16px", padding: "24px", marginBottom: "32px" }}>
        <p style={{ color: "var(--ink)", margin: 0, fontSize: "1.05rem", fontWeight: 600 }}>
          &ldquo;Îți poți schimba preferințele de cookie-uri în orice moment accesând link-ul <strong>Setări Cookie-uri</strong> din subsolul paginii.&rdquo;
        </p>
      </div>

      <h2>Drepturile tale pe scurt</h2>
      <ul style={{ color: "var(--muted)", paddingLeft: "20px" }}>
        <li>Poți cere oricând să vezi ce date avem despre tine.</li>
        <li>Poți cere corectarea numărului de telefon sau a adresei de email.</li>
        <li>Poți solicita ștergerea definitivă a datelor.</li>
        <li>Poți opri sau porni cookie-urile analitice și de marketing oricând dorești.</li>
      </ul>

      <div style={{ marginTop: "48px" }}>
        <Link href="/" className="button white" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <ArrowLeft size={16} /> Înapoi la pagina principală
        </Link>
      </div>
    </main>
  );
}
