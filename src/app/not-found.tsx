import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="legal" style={{ textAlign: "center", paddingTop: "120px" }}>
      <Link href="/" className="brand" style={{ justifyContent: "center" }}>
        <span style={{ letterSpacing: "-1px" }}>CV</span> Finance
      </Link>
      <p className="eyebrow" style={{ justifyContent: "center", marginTop: "32px" }}>
        <span /> EROARE 404
      </p>
      <h1>Pagina nu a fost găsită</h1>
      <p style={{ margin: "0 auto 40px", maxWidth: "500px", color: "var(--muted)", lineHeight: 1.6 }}>
        Pagina căutată nu mai există sau adresa a fost introdusă greșit. Te rugăm să te întorci pe pagina principală pentru a continua.
      </p>

      <Link href="/" className="button" style={{ display: "inline-flex" }}>
        <Home size={18} /> Înapoi la pagina principală <ArrowLeft size={18} />
      </Link>
    </main>
  );
}
