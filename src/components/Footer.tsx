"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  const navLinks = [
    { href: "/#totul-inainte-de-credit", label: "Personal" },
    { href: "/#business-finance", label: "Business" },
    { href: "/#servicii", label: "Servicii" },
    { href: "/#cum-functioneaza", label: "Cum funcționează" },
    { href: "/#despre", label: "Despre mine" },
    { href: "/#contact", label: "Contact" },
  ];
  const legalLinks = [
    { href: "/termeni-si-conditii", label: "Termeni și condiții" },
    { href: "/politica-confidentialitate", label: "Politica de confidențialitate" },
    { href: "/gdpr", label: "GDPR" },
    { href: "/acord-marketing", label: "Acord marketing" },
    { href: "/nota-legala", label: "Notă legală" },
  ];
  return (
    <footer className="cv-footer">
      <div className="cv-container cv-footer-grid">
        <div className="cv-footer-brand">
          <span className="cv-brand-title">CV Finance</span>
          <span className="cv-brand-subtitle">Credit Advisory &amp; Financial Optimization</span>
        </div>
        <nav className="cv-footer-nav">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="cv-footer-link">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="cv-container cv-footer-legal">
        <div className="cv-footer-copy">© {year} CV Finance — Cristian Văduva. Toate drepturile rezervate.</div>
        <nav className="cv-footer-legal-links">
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="cv-footer-link">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
