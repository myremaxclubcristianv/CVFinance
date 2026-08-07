"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function Header() {
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenu(false);
    trackEvent("cta_analysis_clicked", { source: "header_nav_cta" });

    const scrollToForm = () => {
      const el = document.getElementById("aplica");
      if (el) {
        const isReducedMotion =
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({
          behavior: isReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    };

    if (pathname === "/") {
      scrollToForm();
    } else {
      router.push("/#aplica");
      setTimeout(scrollToForm, 300);
    }
  };

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
        <Link href="/#contact-direct">Contact</Link>
        <Link href="/#ecosistem">Ecosistem</Link>
      </nav>
      <a className="nav-cta" href="/#aplica" onClick={handleCtaClick}>
        Solicită analiza gratuită <ArrowRight size={15} />
      </a>
      <button
        className="menu"
        onClick={() => setMenu(!menu)}
        aria-label={menu ? "Închide meniul de navigație" : "Deschide meniul de navigație"}
        aria-expanded={menu}
        aria-controls="mobile-nav-menu"
      >
        {menu ? <X size={22} /> : <Menu size={22} />}
      </button>
      {menu && (
        <div className="mobile-nav" id="mobile-nav-menu" role="navigation" aria-label="Meniu mobil">
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
          <Link href="/#contact-direct" onClick={() => setMenu(false)}>
            Contact
          </Link>
          <Link href="/#ecosistem" onClick={() => setMenu(false)}>
            Ecosistem
          </Link>
        </div>
      )}
    </header>
  );
}
