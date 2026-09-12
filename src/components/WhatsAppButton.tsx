"use client";

import { MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface WhatsAppButtonProps {
  phone?: string;
  message?: string;
}

import { CONTACT } from "@/lib/constants";

export default function WhatsAppButton({
  phone = CONTACT.WHATSAPP,
  message = "Bună ziua, doresc o analiză gratuită a opțiunilor mele financiare.",
}: WhatsAppButtonProps) {
  const handleClick = () => {
    const cleanPhone = (phone || CONTACT.WHATSAPP).replace(/\D/g, "");
    trackEvent("whatsapp_click", { destination_phone: cleanPhone });
    const encodedMsg = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className="whatsapp-float"
      aria-label="Discută pe WhatsApp cu un consultant"
      title="Discută pe WhatsApp cu un consultant"
    >
      <MessageCircle size={24} />
      <span className="wa-text">Discută pe WhatsApp</span>
    </button>
  );
}
