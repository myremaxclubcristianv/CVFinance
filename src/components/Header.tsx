"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

export default function Header() {
  const [menu, setMenu] = useState(false);

  return (
    <header className="nav">
      <Link href="/" className="brand" style={{ letterSpacing: "-1px" }}>
        <span>CV</span> Finance
      </Link>
      <nav>
        <Link href="/#beneficii">Beneficii</Link>
        <Link href="/#servicii">Servicii</Link>
        <Link href="/#calculator">Calculator</Link>
        <Link href="/#proces">Cum funcționează</Link>
        <Link href="/referral">Recomandări</Link>
        <Link href="/#faq">FAQ</Link>
      </nav>
      <Link className="nav-cta" href="/#aplica">
        Solicită analiza gratuită <ArrowRight size={15} />
      </Link>
      <button
        className="menu"
        onClick={() => setMenu(!menu)}
        aria-label="Meniu navigație"
      >
        {menu ? <X size={22} /> : <Menu size={22} />}
      </button>
      {menu && (
        <div className="mobile-nav">
          <Link href="/#beneficii" onClick={() => setMenu(false)}>
            Beneficii
          </Link>
          <Link href="/#servicii" onClick={() => setMenu(false)}>
            Servicii
          </Link>
          <Link href="/#calculator" onClick={() => setMenu(false)}>
            Calculator
          </Link>
          <Link href="/#proces" onClick={() => setMenu(false)}>
            Cum funcționează
          </Link>
          <Link href="/referral" onClick={() => setMenu(false)}>
            Recomandări
          </Link>
          <Link href="/#faq" onClick={() => setMenu(false)}>
            FAQ
          </Link>
          <Link href="/#aplica" onClick={() => setMenu(false)}>
            Solicită analiza gratuită
          </Link>
        </div>
      )}
    </header>
  );
}
