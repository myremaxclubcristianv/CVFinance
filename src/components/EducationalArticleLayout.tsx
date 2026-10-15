"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, BookOpen, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export interface EducationalArticleProps {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  readingTime: string;
  relatedServiceUrl: string;
  relatedServiceLabel: string;
  children: React.ReactNode;
}

export default function EducationalArticleLayout({
  slug,
  category,
  title,
  subtitle,
  readingTime,
  relatedServiceUrl,
  relatedServiceLabel,
  children,
}: EducationalArticleProps) {
  useEffect(() => {
    trackEvent("guide_view", { title, category, slug });
  }, [title, category, slug]);

  return (
    <main className="cv-legal-main">
      <div className="cv-legal-container">

        {/* BREADCRUMB / NAVIGARE */}
        <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", fontSize: "0.85rem", color: "var(--text-secondary, #5F6368)" }}>
          <Link
            href="/"
            style={{ color: "var(--text-secondary, #5F6368)", textDecoration: "none", fontWeight: 500 }}
          >
            Acasă
          </Link>
          <span>/</span>
          <Link
            href="/ghid"
            style={{ color: "var(--text-secondary, #5F6368)", textDecoration: "none", fontWeight: 500 }}
          >
            Ghiduri Financiare
          </Link>
          <span>/</span>
          <span style={{ color: "var(--emerald, #087F5B)", fontWeight: 600 }}>{category}</span>
        </div>

        {/* HEADER EDITORIAL */}
        <div className="cv-legal-header">
          <span className="cv-legal-eyebrow">
            <BookOpen size={16} />
            <span>GHID FINANCIAR INDEPENDENT · {category}</span>
          </span>
          <h1 className="cv-legal-title">
            {title}
          </h1>
          <p className="cv-legal-sub">
            {subtitle}
          </p>
          <div className="cv-legal-meta" style={{ flexWrap: "wrap", gap: "1rem" }}>
            <span>AUTOR: CRISTIAN VĂDUVA (CV FINANCE)</span>
            <span>•</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
              <Clock size={13} /> {readingTime} TIMP DE LECTURĂ
            </span>
            <span>•</span>
            <span>EDUCAȚIE FINANCIARĂ OBIECTIVĂ</span>
          </div>
        </div>

        {/* CONTINUT ARTICOL */}
        <article className="cv-legal-article">
          {children}
        </article>

        {/* LINK SERVICIU ASOCIAT */}
        <div style={{ marginTop: "3.5rem", padding: "1.5rem 1.75rem", backgroundColor: "#FFFFFF", border: "1px solid var(--border)", borderRadius: "2px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <span className="cv-mono" style={{ fontSize: "0.75rem", color: "var(--emerald)", fontWeight: 700, display: "block", marginBottom: "0.25rem", letterSpacing: "0.05em" }}>
              SERVICIU ASOCIAT ACESTUI SUBIECT
            </span>
            <p style={{ margin: 0, fontSize: "0.98rem", color: "var(--text-primary)", fontWeight: 600 }}>
              {relatedServiceLabel}
            </p>
          </div>
          <Link href={relatedServiceUrl} className="cv-btn-secondary" style={{ fontSize: "0.85rem", padding: "0.65rem 1.35rem", whiteSpace: "nowrap" }}>
            AFLĂ MAI MULTE →
          </Link>
        </div>

        {/* CTA FINAL DE CONVERSIE */}
        <div className="cv-partner-card" style={{ marginTop: "3.5rem", textAlign: "center", backgroundColor: "var(--bg-secondary, #F7F9F8)" }}>
          <span className="cv-partner-badge">ANALIZĂ PERSONALIZATĂ PE CIFRELE TALE</span>
          <h2 className="cv-partner-title" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", margin: "0.5rem 0 1rem" }}>
            Vrei să verificăm contractele tale de credit?
          </h2>
          <p className="cv-partner-text" style={{ margin: "0 auto 2rem", maxWidth: "620px" }}>
            Înainte de a lua o nouă decizie de împrumut, lasă-ne să analizăm cifrele. Îți explicăm ce opțiuni merită investigate, ce costuri presupun și ce alternative ai.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
            <Link
              href="/#verificare-credit"
              className="cv-btn-primary"
              onClick={() => trackEvent("guide_bottom_cta_clicked", { title, slug })}
              style={{ padding: "0.9rem 2rem" }}
            >
              VERIFICĂ SITUAȚIA TA →
            </Link>
            <Link href="/ghid" className="cv-btn-secondary" style={{ padding: "0.9rem 1.75rem" }}>
              TOATE GHIDURILE FINANCIARE
            </Link>
          </div>
        </div>

        {/* INAPOI LA GHIDURI */}
        <div className="cv-legal-back-row">
          <Link href="/ghid" className="cv-legal-back-link">
            <ArrowLeft size={16} /> Înapoi la indexul de ghiduri
          </Link>
          <Link href="/" className="cv-legal-back-link">
            Acasă CV Finance →
          </Link>
        </div>

      </div>
    </main>
  );
}
