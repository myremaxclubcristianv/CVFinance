"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface CommandRow {
  code: string;
  label: string;
  desc: string;
  intent: string;
  targetId: string;
  type: "personal" | "business";
}

const COMMAND_ROWS: CommandRow[] = [
  {
    code: "01",
    label: "VREAU BANI",
    desc: "Finanțare nouă personală sau nevoi personale cu analiză rapidă.",
    intent: "Am nevoie de o sumă nouă",
    targetId: "verificare-credit",
    type: "personal",
  },
  {
    code: "02",
    label: "CUMPĂR O LOCUINȚĂ",
    desc: "Pregătire dosar precalificare credit ipotecar sau imobiliar.",
    intent: "Credit nou",
    targetId: "verificare-credit",
    type: "personal",
  },
  {
    code: "03",
    label: "REFINANȚARE",
    desc: "Consolidarea mai multor credite scumpe într-o rată unică mai mică.",
    intent: "Refinanțare",
    targetId: "verificare-credit",
    type: "personal",
  },
  {
    code: "04",
    label: "CREDIT DE NEVOI PERSONALE",
    desc: "Credit rapid pentru orice destinație fără ipotecă.",
    intent: "Credit nou",
    targetId: "verificare-credit",
    type: "personal",
  },
  {
    code: "05",
    label: "FINANȚARE BUSINESS",
    desc: "Capital de lucru, leasing și linii de credit pentru companii SRL / PFA.",
    intent: "Finanțare firmă",
    targetId: "verificare-finantare-business",
    type: "business",
  },
  {
    code: "06",
    label: "VREAU SĂ ȘTIU DACĂ MĂ ÎNCADREZ",
    desc: "Calcul grad maxim de îndatorare permise de normele actuale BNR.",
    intent: "Reduc rata",
    targetId: "verificare-credit",
    type: "personal",
  },
  {
    code: "07",
    label: "RECOMANDĂ UN CLIENT",
    desc: "Câștigă între 500 și 3.000 RON trimițând clienți eligibili.",
    intent: "Recomandare client",
    targetId: "recomandari",
    type: "personal",
  },
];

export default function CommandSheet() {
  const handleSelect = (row: CommandRow) => {
    trackEvent("command_row_click", { code: row.code, label: row.label });

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
    <section className="command-sheet-section" id="ce-cauti">
      <div className="command-sheet-container">
        <div className="command-sheet-header">
          <p className="command-eyebrow">02 / IDENTIFY</p>
          <h2 className="command-title">CE CAUȚI?</h2>
          <p className="command-subtitle">
            Alege intenția ta financiară pentru a deschide direct analiza corespunzătoare.
          </p>
        </div>

        <div className="command-rows-list">
          {COMMAND_ROWS.map((row) => (
            <button
              key={row.code}
              type="button"
              className="command-row-btn"
              onClick={() => handleSelect(row)}
            >
              <div className="command-row-left">
                <span className="command-row-code">{row.code}</span>
                <div className="command-row-content">
                  <span className="command-row-label">{row.label}</span>
                  <span className="command-row-desc">{row.desc}</span>
                </div>
              </div>
              <ArrowRight size={20} className="command-row-arrow" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
