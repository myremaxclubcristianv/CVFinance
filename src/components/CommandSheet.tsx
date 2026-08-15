"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface CommandRow {
  code: string;
  label: string;
  intent: string;
  desc: string;
  targetId: string;
  type: "personal" | "business";
}

const COMMAND_ROWS: CommandRow[] = [
  {
    code: "01",
    label: "Vreau bani",
    intent: "Am nevoie de o sumă nouă",
    desc: "Analizăm varianta optimă pentru obținerea unei sume noi de bani.",
    targetId: "verificare-credit",
    type: "personal",
  },
  {
    code: "02",
    label: "Vreau să cumpăr o locuință",
    intent: "Credit nou",
    desc: "Găsim creditul ipotecar potrivit cu cele mai bune condiții de piață.",
    targetId: "verificare-credit",
    type: "personal",
  },
  {
    code: "03",
    label: "Vreau să refinanțez",
    intent: "Refinanțare",
    desc: "Reducem rata lunară și comasăm toate creditele într-unul singur.",
    targetId: "verificare-credit",
    type: "personal",
  },
  {
    code: "04",
    label: "Am nevoie de bani pentru mine",
    intent: "Am nevoie de o sumă nouă",
    desc: "Credit de nevoi personale cu acordare rapidă și dobândă optimă.",
    targetId: "verificare-credit",
    type: "personal",
  },
  {
    code: "05",
    label: "Am nevoie de finanțare pentru firmă",
    intent: "Finanțare firmă",
    desc: "Capital de lucru, echipamente, linii de credit sau leasing business.",
    targetId: "business-finance",
    type: "business",
  },
  {
    code: "06",
    label: "Vreau să știu dacă mă încadrez",
    intent: "Reduc rata",
    desc: "Calculăm gradul de îndatorare și eligibilitatea maximă în raport cu banca.",
    targetId: "verificare-credit",
    type: "personal",
  },
  {
    code: "07",
    label: "Vreau să recomand un client",
    intent: "Recomandare client",
    desc: "Recomanzi o persoană sau o firmă și obții comision garantat la acordare.",
    targetId: "recomandari",
    type: "personal",
  },
];

export default function CommandSheet() {
  const handleSelect = (row: CommandRow) => {
    trackEvent("command_row_click", { code: row.code, label: row.label });

    if (row.targetId === "recomandari") {
      const targetEl = document.getElementById("recomandari");
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/referral";
      }
      return;
    }

    const targetEl = document.getElementById(row.targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
    window.dispatchEvent(
      new CustomEvent("cv_intent_select", {
        detail: { type: row.type, preselectValue: row.intent },
      })
    );
  };

  return (
    <section className="cv-section" id="ce-cauti">
      <div className="cv-container">
        <div className="cv-section-header">
          <span className="cv-section-marker">01 / DE UNDE ÎNCEPEM</span>
          <h2 className="cv-section-title">DE UNDE ÎNCEPEM?</h2>
          <p className="cv-section-sub">Spune-mi ce vrei să faci. De acolo începem.</p>
        </div>

        <div className="cv-directory-list">
          {COMMAND_ROWS.map((row) => (
            <button
              key={row.code}
              type="button"
              className="cv-dir-row"
              onClick={() => handleSelect(row)}
            >
              <span className="cv-dir-code">{row.code}</span>
              <span className="cv-dir-title">{row.label}</span>
              <span className="cv-dir-desc">{row.desc}</span>
              <ArrowRight size={18} className="cv-dir-arrow" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
