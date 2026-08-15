import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Notă Legală & Disclaimer | CV Finance",
  description:
    "Notă legală și responsabilități financiare ale platformei CV Finance. Află ce facem și ce nu facem în calitatea noastră de consultanți.",
  alternates: { canonical: "/nota-legala" },
  robots: { index: true, follow: true },
};

export default function NotaLegala() {
  return (
    <main className="legal">
      <Link href="/" className="brand" style={{ letterSpacing: "-1px", display: "inline-block", marginBottom: "24px" }}>
        <span>CV</span> Finance
      </Link>

      <p className="eyebrow"><span /> TRANSPARENȚĂ FINANCIARĂ</p>
      <h1>Notă Legală & Disclaimer</h1>
      <p style={{ color: "var(--muted)", marginBottom: "40px" }}>Ultima actualizare: 6 august 2026</p>

      <div className="grid grid-2" style={{ marginBottom: "40px" }}>
        <div className="card" style={{ borderColor: "rgba(255, 59, 48, 0.3)" }}>
          <div className="icon" style={{ background: "rgba(255, 59, 48, 0.1)", color: "var(--danger)", borderColor: "rgba(255, 59, 48, 0.2)" }}>
            <X size={24} />
          </div>
          <h3 style={{ color: "var(--danger)" }}>Ce NU face CV Finance:</h3>
          <ul style={{ paddingLeft: "18px", color: "var(--muted)", margin: 0 }}>
            <li style={{ marginBottom: "8px" }}>Nu aprobă credite direct</li>
            <li style={{ marginBottom: "8px" }}>Nu acordă împrumuturi sau fonduri din surse proprii</li>
            <li style={{ marginBottom: "8px" }}>Nu garantează aprobarea niciunei solicitări</li>
            <li>Nu modifică deciziile interne ale băncilor partenere</li>
          </ul>
        </div>

        <div className="card" style={{ borderColor: "var(--border)" }}>
          <div className="icon" style={{ background: "var(--surface)", color: "var(--emerald)", borderColor: "var(--border)" }}>
            <Check size={24} />
          </div>
          <h3 style={{ color: "var(--emerald)" }}>Ce FACE CV Finance:</h3>
          <ul style={{ paddingLeft: "18px", color: "var(--muted)", margin: 0 }}>
            <li style={{ marginBottom: "8px" }}>Analizează gratuit situația ta financiară</li>
            <li style={{ marginBottom: "8px" }}>Compară opțiunile disponibile de la peste 20 de bănci</li>
            <li style={{ marginBottom: "8px" }}>Oferă ghidaj și consultanță financiară personalizată</li>
            <li>Conectează clienții cu partenerii potriviți profilului lor</li>
          </ul>
        </div>
      </div>

      <h2>Disclaimer privind riscurile financiare</h2>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "24px", marginBottom: "32px" }}>
        <p style={{ color: "var(--ink)", fontWeight: 600, margin: 0 }}>
          &ldquo;Orice decizie financiară trebuie luată după analiza situației personale.&rdquo;
        </p>
      </div>
      <p>
        Contractarea unui credit sau refinanțarea implică obligații financiare pe termen lung. Vă recomandăm să evaluați capacitatea de rambursare înainte de a semna orice contract bancar.
      </p>

      <h2>Independență și Comisioane</h2>
      <p>
        Analiza inițială oferită de CV Finance este 100% gratuită pentru client. CV Finance nu percepe niciun comision direct de la utilizatori pentru analiza financiară inițială.
      </p>

      <div style={{ marginTop: "48px" }}>
        <Link href="/" className="button white" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <ArrowLeft size={16} /> Înapoi la pagina principală
        </Link>
      </div>
    </main>
  );
}
