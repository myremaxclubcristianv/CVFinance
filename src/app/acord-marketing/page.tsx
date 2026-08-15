import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, Bell, Sparkles, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Acord Comunicări Comerciale & Marketing | CV Finance",
  description:
    "Informații privind acordul opțional pentru primirea de comunicări comerciale, oferte financiare și noutăți de la CV Finance.",
  alternates: { canonical: "/acord-marketing" },
  robots: { index: true, follow: true },
};

export default function AcordMarketingPage() {
  return (
    <main className="legal">
      <Link href="/" className="brand" style={{ letterSpacing: "-1px", display: "inline-block", marginBottom: "24px" }}>
        <span>CV</span> Finance
      </Link>

      <p className="eyebrow"><span /> OPTIONAL MARKETING</p>
      <h1>Acord Comunicări Comerciale</h1>
      <p style={{ color: "var(--muted)", marginBottom: "40px" }}>Detalii privind abonarea la noutăți și oferte financiare.</p>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "32px", marginBottom: "40px" }}>
        <h3 style={{ marginTop: 0 }}>Acordul de marketing este 100% opțional</h3>
        <p style={{ color: "var(--muted)", margin: 0 }}>
          Bifarea căsuței de comunicări comerciale nu este obligatorie pentru a primi analiza financiară gratuită. Puteți solicita analiza gratuită fără a vă abona la noutăți.
        </p>
      </div>

      <h2>Ce fel de materiale puteți primi dacă acceptați:</h2>
      <div className="grid grid-2" style={{ marginBottom: "40px" }}>
        <div className="card">
          <div className="icon">
            <Sparkles size={24} />
          </div>
          <h3>Informații și ghiduri financiare</h3>
          <p>Sfaturi practice pentru reducerea ratelor, optimizarea datoriilor și gestionarea eficientă a creditelor.</p>
        </div>

        <div className="card">
          <div className="icon">
            <Bell size={24} />
          </div>
          <h3>Oferte promoționale de la bănci</h3>
          <p>Notificări privind reduceri de dobândă sau campanii speciale derulate de bănci partenere.</p>
        </div>
      </div>

      <h2>Cum vă puteți dezabona</h2>
      <p>
        Vă puteți retrage consimțământul de marketing în orice moment, fără niciun cost. Aveți la dispoziție următoarele modalități simple:
      </p>
      <ul style={{ color: "var(--muted)", paddingLeft: "20px" }}>
        <li>Faceți clic pe linkul de dezabonare din subsolul oricărui email primit de la noi.</li>
        <li>Trimiteți un email cu subiectul &bdquo;Dezabonare&rdquo; către adresa noastră oficială.</li>
      </ul>

      <div style={{ marginTop: "48px" }}>
        <Link href="/" className="button white" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <ArrowLeft size={16} /> Înapoi la pagina principală
        </Link>
      </div>
    </main>
  );
}
