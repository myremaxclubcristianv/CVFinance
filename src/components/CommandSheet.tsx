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
    desc: "Analizăm varianta optimă pentru o sumă nouă.",
    targetId: "verificare-credit",
    type: "personal",
  },
  {
    code: "02",
    label: "Vreau să cumpăr o locuință",
    intent: "Credit nou",
    desc: "Găsim creditul ipotecar potrivit cu avans minim.",
    targetId: "verificare-credit",
    type: "personal",
  },
  {
    code: "03",
    label: "Vreau să refinanțez",
    intent: "Refinanțare",
    desc: "Reducem rata lunară și comasăm creditele existente.",
    targetId: "verificare-credit",
    type: "personal",
  },
  {
    code: "04",
    label: "Am nevoie de bani pentru mine",
    intent: "Am nevoie de o sumă nouă",
    desc: "Credit de nevoi personale cu aprobare rapidă.",
    targetId: "verificare-credit",
    type: "personal",
  },
  {
    code: "05",
    label: "Am nevoie de finanțare pentru firmă",
    intent: "Finanțare firmă",
    desc: "Capital de lucru, leasing sau credite de investiții.",
    targetId: "verificare-finantare-business",
    type: "business",
  },
  {
    code: "06",
    label: "Vreau să știu dacă mă încadrez",
    intent: "Reduc rata",
    desc: "Calculăm gradul de îndatorare maxim admis de bănci.",
    targetId: "verificare-credit",
    type: "personal",
  },
  {
    code: "07",
    label: "Vreau să recomand un client",
    intent: "Recomandare client",
    desc: "Recomandă un prieten și obții comision la acordare.",
    targetId: "recomandari",
    type: "personal",
  },
];

export default function CommandSheet() {
  const handleSelect = (row: CommandRow) => {
    trackEvent("command_row_click", { code: row.code, label: row.label });

    if (row.targetId === "recomandari") {
      window.location.href = "/referral";
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
    <section className="command-sheet-section" id="ce-cauti">
      <div className="command-sheet-container">
        <div className="command-sheet-header">
          <span className="section-marker">01 / DE UNDE ÎNCEPEM</span>
          <h2 className="command-title">DE UNDE ÎNCEPEM?</h2>
          <p className="command-subtitle">Spune-mi ce vrei să faci. De acolo începem.</p>
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
                <div className="command-row-text-group">
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
