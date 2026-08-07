"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Sparkles } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { CONTACT } from "@/lib/constants";

interface FloatingConversionCTAProps {
  phone?: string;
  whatsappMessage?: string;
}

export default function FloatingConversionCTA({
  phone = CONTACT.WHATSAPP,
  whatsappMessage = "Bună ziua, doresc o analiză gratuită a opțiunilor mele financiare.",
}: FloatingConversionCTAProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Close on Escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    trackEvent("floating_cta_toggle", { state: !isOpen ? "open" : "close" });
  };

  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_click", { destination_phone: phone });
    const encodedMsg = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMsg}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const handleAnalysisClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent("floating_analysis_click");
    setIsOpen(false);

    const scrollToForm = () => {
      const el = document.getElementById("aplica");
      if (el) {
        const isReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    <div ref={containerRef} className="floating-conversion-container">
      {isOpen && (
        <div
          id="floating-contact-menu"
          role="menu"
          aria-label="Opțiuni de contact"
          className="floating-action-popup"
        >
          <button
            type="button"
            role="menuitem"
            onClick={handleWhatsAppClick}
            className="popup-action-btn whatsapp-action"
          >
            <MessageCircle size={18} className="action-icon" />
            <span>Discută pe WhatsApp</span>
          </button>

          <a
            href="/#aplica"
            role="menuitem"
            onClick={handleAnalysisClick}
            className="popup-action-btn analysis-action"
          >
            <Sparkles size={18} className="action-icon" />
            <span>Cere o analiză</span>
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={handleToggle}
        className={`floating-trigger-btn ${isOpen ? "active" : ""}`}
        aria-label="Deschide opțiunile de contact"
        aria-expanded={isOpen}
        aria-controls="floating-contact-menu"
      >
        <MessageCircle size={26} />
      </button>
    </div>
  );
}
