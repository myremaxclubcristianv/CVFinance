"use client";

import { MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";
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
  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_click", { destination_phone: phone });
    const encodedMsg = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMsg}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleAnalysisClick = () => {
    trackEvent("floating_analysis_click");
  };

  return (
    <div className="floating-cta-stack" role="region" aria-label="Opțiuni de contact rapid">
      <Link
        href="/#aplica"
        onClick={handleAnalysisClick}
        className="floating-cta-btn primary-analysis"
        aria-label="Solicită o analiză financiară gratuită"
        title="Solicită o analiză financiară gratuită"
      >
        <Sparkles size={18} className="cta-icon" />
        <span className="cta-text">Cere o analiză</span>
      </Link>

      <button
        onClick={handleWhatsAppClick}
        type="button"
        className="floating-cta-btn secondary-whatsapp"
        aria-label="Discută pe WhatsApp cu un consultant"
        title="Discută pe WhatsApp cu un consultant"
      >
        <MessageCircle size={18} className="cta-icon" />
        <span className="cta-text">Discută pe WhatsApp</span>
      </button>
    </div>
  );
}
