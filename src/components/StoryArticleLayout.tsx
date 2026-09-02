"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck, AlertCircle } from "lucide-react";

export interface StoryMetrics {
  label: string;
  before: string;
  after: string;
  highlight?: string;
}

export interface StoryArticleProps {
  category: string;
  title: string;
  subtitle: string;
  officialSourceUrl: string;
  metrics?: StoryMetrics[];
  children: React.ReactNode;
}

export default function StoryArticleLayout({
  category,
  title,
  subtitle,
  officialSourceUrl,
  metrics,
  children,
}: StoryArticleProps) {
  return (
    <div style={{ backgroundColor: "#0E1210", color: "#F7F9F8", minHeight: "100vh", fontFamily: "var(--font-sans, Inter, sans-serif)", paddingBottom: "5rem" }}>

      {/* BARĂ SUPERIOARĂ DE NAVIGARE DISCRETĂ */}
      <nav style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", backgroundColor: "#0A0D0B", position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(8px)" }}>
        <div className="cv-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          <Link
            href="/#povesti-reale"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.84rem",
              fontWeight: 600,
              color: "#9CA3AF",
              textDecoration: "none",
              transition: "color 150ms ease"
            }}
          >
            <ArrowLeft size={16} />
            <span>ÎNAPOI LA POVEȘTI REALE</span>
          </Link>

          <Link href="/" className="brand" style={{ fontSize: "1.1rem", fontWeight: 800, color: "#FFFFFF", textDecoration: "none" }}>
            <span style={{ letterSpacing: "-1px" }}>CV</span> Finance
          </Link>
        </div>
      </nav>

      <main className="cv-container" style={{ paddingTop: "3.5rem", maxWidth: "860px" }}>

        {/* HEADER EDITORIAL */}
        <header style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <span className="cv-mono" style={{ fontSize: "0.78rem", fontWeight: 700, color: "#10B981", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              POVEȘTI REALE · {category}
            </span>
            <span style={{ color: "#4B5563" }}>•</span>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.25rem 0.75rem", backgroundColor: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "9999px", fontSize: "0.75rem", color: "#A7F3D0", fontFamily: "var(--font-mono)" }}>
              <ShieldCheck size={13} style={{ color: "#10B981" }} />
              <span>CAZ DOCUMENTAT DE SMART CREDIT ROMÂNIA</span>
            </div>
          </div>

          <h1 className="cv-serif" style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.025em", color: "#FFFFFF", marginBottom: "1.25rem" }}>
            {title}
          </h1>

          <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.3rem)", color: "#9CA3AF", lineHeight: 1.6, fontWeight: 400 }}>
            {subtitle}
          </p>
        </header>

        {/* METRICI CASE SUMMARY (DACĂ EXISTĂ) */}
        {metrics && metrics.length > 0 && (
          <div style={{ backgroundColor: "#141A17", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "6px", padding: "1.75rem", marginBottom: "3rem" }}>
            <div className="cv-mono" style={{ fontSize: "0.75rem", fontWeight: 700, color: "#10B981", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.25rem" }}>
              CASE SUMMARY — INDICATORI PARCURS
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "1.25rem" }}>
              {metrics.map((m, idx) => (
                <div key={idx} style={{ backgroundColor: "#0B0F0D", border: "1px solid rgba(255, 255, 255, 0.06)", padding: "1rem", borderRadius: "4px" }}>
                  <div style={{ fontSize: "0.75rem", color: "#9CA3AF", marginBottom: "0.35rem" }}>{m.label}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                    <span style={{ fontSize: "0.88rem", color: "#EF4444", textDecoration: "line-through", fontFamily: "var(--font-mono)" }}>{m.before}</span>
                    <span style={{ fontSize: "0.85rem", color: "#6B7280" }}>→</span>
                    <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#10B981", fontFamily: "var(--font-mono)" }}>{m.after}</span>
                  </div>
                  {m.highlight && (
                    <div style={{ fontSize: "0.72rem", color: "#A7F3D0", marginTop: "0.4rem", fontWeight: 600 }}>
                      {m.highlight}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTINUT EDITORIAL ARTICOL */}
        <article
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.8,
            color: "#D1D5DB",
            marginBottom: "3.5rem"
          }}
        >
          {children}
        </article>

        {/* BLOC SURSĂ OFICIALĂ */}
        <div style={{ backgroundColor: "#141A17", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "6px", padding: "1.75rem", marginBottom: "2rem" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#10B981", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
            SURSA OFICIALĂ
          </div>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.5rem" }}>
            Smart Credit România
          </h3>
          <p style={{ fontSize: "0.9rem", color: "#9CA3AF", marginBottom: "1.25rem", lineHeight: 1.6 }}>
            Această poveste este prezentată pe baza unui caz publicat de Smart Credit România. Rezultatele descrise sunt individuale și nu reprezintă o garanție că o situație similară va avea același rezultat.
          </p>
          <a
            href={officialSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.6rem 1.25rem",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "4px",
              color: "#F3F4F6",
              fontSize: "0.85rem",
              fontWeight: 600,
              textDecoration: "none"
            }}
          >
            VEZI SURSA ORIGINALĂ <ExternalLink size={14} />
          </a>
        </div>

        {/* DISCLAIMER LEGAL EDITORIAL */}
        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "4px", padding: "1.25rem 1.5rem", marginBottom: "3.5rem", display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
          <AlertCircle size={18} style={{ color: "#9CA3AF", flexShrink: 0, marginTop: "2px" }} />
          <p style={{ fontSize: "0.82rem", color: "#9CA3AF", lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: "#D1D5DB" }}>Important:</strong> Fiecare situație financiară este diferită. Eligibilitatea, condițiile de creditare și aprobarea finală depind de profilul solicitantului și de criteriile instituției finanțatoare. Exemplele prezentate sunt cazuri individuale documentate și nu reprezintă o promisiune sau o garanție privind obținerea unui credit.
          </p>
        </div>

        {/* CTA FINAL DE CONVERSIE PE CV FINANCE */}
        <div style={{ backgroundColor: "#141A17", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "6px", padding: "2.5rem", textAlign: "center" }}>
          <h3 className="cv-serif" style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.75rem" }}>
            Te regăsești într-o astfel de situație?
          </h3>
          <p style={{ fontSize: "1.05rem", color: "#9CA3AF", marginBottom: "1.75rem", maxWidth: "600px", margin: "0 auto 1.75rem" }}>
            Înainte să iei un nou credit pentru a acoperi alte rate, analizează-ți întreaga situație financiară.
          </p>
          <Link
            href="/#verificare-credit"
            className="cv-btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#10B981",
              color: "#0E1210",
              fontWeight: 800,
              padding: "0.9rem 2.2rem",
              borderRadius: "4px",
              textDecoration: "none",
              fontSize: "0.92rem",
              letterSpacing: "0.04em"
            }}
          >
            VERIFICĂ SITUAȚIA MEA <ArrowRight size={16} />
          </Link>
        </div>

      </main>
    </div>
  );
}
