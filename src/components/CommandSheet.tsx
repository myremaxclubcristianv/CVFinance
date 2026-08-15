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
    desc: "Finanțare nouă personală sau ipotecară cu analiză de eligibilitate.",
    intent: "Vreau un credit nou",
    targetId: "verificare-credit",
    type: "personal",
  },
  {
    code: "02",
    label: "AM FOST REFUZAT",
    desc: "Analiza motivului de respingere de la bancă și soluții alternative.",
    intent: "Am fost refuzat de bancă",
    targetId: "verificare-credit",
    type: "personal",
  },
  {
    code: "03",
    label: "AM ÎNTÂRZIERI / BC",
    desc: "Verificare Biroul de Credit, restanțe trecute și scor FICO.",
    intent: "Am probleme în Biroul de Credit",
    targetId: "verificare-credit",
    type: "personal",
  },
  {
    code: "04",
    label: "FINANȚARE FIRMĂ",
    desc: "Capital pentru companii SRL / PFA cu vechime și cifră de afaceri.",
    intent: "Finanțare firmă",
    targetId: "verificare-finantare-business",
    type: "business",
  },
  {
    code: "05",
    label: "CAPITAL DE LUCRU",
    desc: "Linii de credit, factoring și lichiditate pentru activitatea curentă.",
    intent: "Capital de lucru",
    targetId: "verificare-finantare-business",
    type: "business",
  },
  {
    code: "06",
    label: "REFINANȚARE",
    desc: "Consolidarea mai multor credite într-o rată unică mai mică.",
    intent: "Refinanțare și consolidare",
    targetId: "verificare-credit",
    type: "personal",
  },
  {
    code: "07",
    label: "RECOMANDĂ UN CLIENT",
    desc: "Parteneriat de recomandare direct cu echipa Cristian Văduva.",
    intent: "Recomandare client",
    targetId: "verificare-credit",
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
