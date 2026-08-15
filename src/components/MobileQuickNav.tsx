"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function MobileQuickNav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    { label: "Personal", href: "/#totul-inainte-de-credit", id: "totul-inainte-de-credit" },
    { label: "Business", href: "/#business-finance", id: "business-finance" },
    { label: "Servicii", href: "/#servicii", id: "servicii" },
    { label: "Cum lucrăm", href: "/#cum-functioneaza", id: "cum-functioneaza" },
  ];

  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      let current = "";
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section top is near the top of viewport
          if (rect.top <= 120) {
            current = item.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    if (pathname === "/") {
      const targetEl = document.getElementById(id);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="cv-mobile-quick-nav md:hidden">
      <div className="cv-mobile-quick-nav-inner">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href, item.id)}
              className={`cv-mobile-quick-nav-item ${isActive ? "active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
