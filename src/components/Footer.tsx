"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [footerYear, setFooterYear] = useState(2026);

  useEffect(() => {
    setFooterYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="cv-footer">
      <div className="cv-container">
        <div className="cv-footer-top">
          <div className="cv-brand">
            <span className="cv-brand-title" style={{ fontSize: "1.4rem" }}>CV Finance</span>
            <span className="cv-brand-subtitle" style={{ fontSize: "0.8rem" }}>Credit Advisory & Financial Optimization</span>
          </div>

          <nav className="cv-legal-links">
            <Link href="/#totul-inainte-de-credit" className="cv-legal-link">Personal</Link>
            <Link href="/#business-finance" className="cv-legal-link">Business</Link>
            <Link href="/#servicii" className="cv-legal-link">Servicii</Link>
            <Link href="/#cum-functioneaza" className="cv-legal-link">Cum funcționează</Link>
            <Link href="/#despre" className="cv-legal-link">Despre mine</Link>
            <Link href="/#contact" className="cv-legal-link">Contact</Link>
          </nav>
        </div>

        <div className="cv-footer-legal">
          <div>
            © {footerYear} CV Finance — Cristian Văduva. Toate drepturile rezervate.
          </div>

          <div className="cv-legal-links">
            <Link href="/termeni-si-conditii" className="cv-legal-link">Termeni și condiții</Link>
            <Link href="/politica-confidentialitate" className="cv-legal-link">Politica de confidențialitate</Link>
            <Link href="/gdpr" className="cv-legal-link">GDPR</Link>
            <Link href="/acord-marketing" className="cv-legal-link">Acord marketing</Link>
            <Link href="/nota-legala" className="cv-legal-link">Notă legală</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
