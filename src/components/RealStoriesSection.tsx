"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, TrendingDown, CheckCircle2, AlertCircle } from "lucide-react";

export default function RealStoriesSection() {
  const scrollToVerification = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("verificare-credit") || document.getElementById("cum-functioneaza");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="povesti-reale" className="cv-section" style={{ backgroundColor: "#0E1210", color: "#F7F9F8", borderTop: "1px solid rgba(255, 255, 255, 0.08)", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", padding: "5rem 0" }}>
      <div className="cv-container">
        {/* HEADER EDIȚIE EDITORIALĂ */}
        <div style={{ marginBottom: "3.5rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "1rem" }}>
            <span className="cv-section-marker" style={{ color: "#10B981", margin: 0 }}>
              03 / POVEȘTI REALE
            </span>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.85rem", backgroundColor: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "9999px", fontSize: "0.78rem", color: "#A7F3D0", fontFamily: "var(--font-mono)" }}>
              <ShieldCheck size={14} style={{ color: "#10B981" }} />
              <span>Cazuri documentate de Smart Credit România</span>
            </div>
          </div>

          <h2 className="cv-serif" style={{ fontSize: "clamp(2.1rem, 4.5vw, 3.4rem)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.025em", color: "#FFFFFF", marginBottom: "1.25rem" }}>
            POVEȘTI REALE
          </h2>

          <p style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)", color: "#9CA3AF", maxWidth: "760px", lineHeight: 1.6, fontWeight: 400 }}>
            Când ratele scapă de sub control, primul pas este să înțelegi situația. În spatele fiecărui dosar de credit există un om, o familie și o situație financiară concretă care merită o analiză responsabilă, nu un răspuns automat.
          </p>
        </div>

        {/* REȚEA CARDURI EDITORIALE (CASE STUDIES) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>
          {/* STORY 01 — DAVID */}
          <article
            style={{
              backgroundColor: "#141A17",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 200ms ease, border-color 200ms ease"
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <span className="cv-mono" style={{ fontSize: "0.75rem", fontWeight: 700, color: "#10B981", letterSpacing: "0.08em" }}>
                  01 / CASE STUDY
                </span>
                <span style={{ fontSize: "0.72rem", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Refinanțare Credite IFN
                </span>
              </div>

              <h3 className="cv-serif" style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.25, color: "#FFFFFF", marginBottom: "1rem" }}>
                21 de credite. O singură rată.
              </h3>

              <p style={{ fontSize: "0.92rem", color: "#9CA3AF", lineHeight: 1.65, marginBottom: "1.75rem" }}>
                Caz real publicat de Smart Credit România: domnul David plătea totul la timp, fără nicio restanță, dar avea 21 de împrumuturi deschise la 10 instituții nebancare (IFN-uri). Ratele îi înghițeau peste 76% din salariu. Prin refinanțare bancară și consolidare, datoria a fost trecută într-un singur credit sustenabil.
              </p>

              {/* GRID INDICATORI CHEIE */}
              <div style={{ backgroundColor: "#0B0F0D", border: "1px solid rgba(255, 255, 255, 0.06)", padding: "1.25rem", borderRadius: "4px", marginBottom: "1.75rem" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <TrendingDown size={14} style={{ color: "#10B981" }} />
                  <span>Indicatori Caz Real (Smart Credit)</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>Rate lunare IFN</div>
                    <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#EF4444", fontFamily: "var(--font-mono)" }}>6.476 lei</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>Rată bancară nouă</div>
                    <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#10B981", fontFamily: "var(--font-mono)" }}>2.577 lei</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>Grad de îndatorare</div>
                    <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#F3F4F6" }}>≈ 76% → ≈ 30%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>Scor Birou Credit</div>
                    <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#10B981" }}>582 → 643</div>
                  </div>
                </div>
                <div style={{ marginTop: "0.85rem", paddingTop: "0.65rem", borderTop: "1px solid rgba(255, 255, 255, 0.06)", fontSize: "0.78rem", color: "#10B981", fontWeight: 600 }}>
                  Povară lunară redusă cu aproximativ 3.899 lei/lună
                </div>
              </div>
            </div>

            <div>
              <Link
                href="/povesti-reale/david-21-credite-ifn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  color: "#10B981",
                  textDecoration: "none"
                }}
              >
                VEZI POVESTEA →
              </Link>
            </div>
          </article>

          {/* STORY 02 — GEORGETA */}
          <article
            style={{
              backgroundColor: "#141A17",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <span className="cv-mono" style={{ fontSize: "0.75rem", fontWeight: 700, color: "#10B981", letterSpacing: "0.08em" }}>
                  02 / CASE STUDY
                </span>
                <span style={{ fontSize: "0.72rem", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Comasare Rate Mari
                </span>
              </div>

              <h3 className="cv-serif" style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.25, color: "#FFFFFF", marginBottom: "1rem" }}>
                Când ratele îți mănâncă aproape 70% din venit.
              </h3>

              <p style={{ fontSize: "0.92rem", color: "#9CA3AF", lineHeight: 1.65, marginBottom: "1.5rem" }}>
                Caz documentat de Smart Credit: doamna Georgeta avea datorii acumulate la mai multe IFN-uri, iar ratele lunare ajunseseră să consume aproape 70% din venituri. Sceptică inițial, a făcut pasul spre o evaluare dedicată.
              </p>

              {/* STRUCTURĂ: PROBLEMĂ → ANALIZĂ → SOLUȚIE → REZULTAT */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.75rem" }}>
                <div style={{ padding: "0.75rem 1rem", backgroundColor: "#0B0F0D", borderLeft: "3px solid #EF4444", fontSize: "0.84rem" }}>
                  <strong style={{ color: "#F87171", display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>PROBLEMĂ</strong>
                  <span style={{ color: "#D1D5DB" }}>Ratele lunare IFN consumau aproape 70% din veniturile totale.</span>
                </div>
                <div style={{ padding: "0.75rem 1rem", backgroundColor: "#0B0F0D", borderLeft: "3px solid #F59E0B", fontSize: "0.84rem" }}>
                  <strong style={{ color: "#FBBF24", display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>ANALIZĂ</strong>
                  <span style={{ color: "#D1D5DB" }}>Evaluarea atentă a veniturilor și posibilităților de refinanțare.</span>
                </div>
                <div style={{ padding: "0.75rem 1rem", backgroundColor: "#0B0F0D", borderLeft: "3px solid #3B82F6", fontSize: "0.84rem" }}>
                  <strong style={{ color: "#60A5FA", display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>SOLUȚIE</strong>
                  <span style={{ color: "#D1D5DB" }}>Structurarea completă a dosarului și depunerea către finanțator.</span>
                </div>
                <div style={{ padding: "0.75rem 1rem", backgroundColor: "#0B0F0D", borderLeft: "3px solid #10B981", fontSize: "0.84rem" }}>
                  <strong style={{ color: "#34D399", display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>REZULTAT</strong>
                  <span style={{ color: "#D1D5DB" }}>Aprobare obținută chiar în ziua în care a depus actele.</span>
                </div>
              </div>
            </div>

            <div>
              <Link
                href="/povesti-reale/georgeta-refinantare-rate-mari"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  color: "#10B981",
                  textDecoration: "none"
                }}
              >
                VEZI POVESTEA →
              </Link>
            </div>
          </article>

          {/* STORY 03 — RALUCA */}
          <article
            style={{
              backgroundColor: "#141A17",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <span className="cv-mono" style={{ fontSize: "0.75rem", fontWeight: 700, color: "#10B981", letterSpacing: "0.08em" }}>
                  03 / CASE STUDY
                </span>
                <span style={{ fontSize: "0.72rem", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Carduri de Credit & Recomandare
                </span>
              </div>

              <h3 className="cv-serif" style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.25, color: "#FFFFFF", marginBottom: "1rem" }}>
                A încercat mai multe variante. Soluția a venit după o analiză diferită.
              </h3>

              <p style={{ fontSize: "0.92rem", color: "#9CA3AF", lineHeight: 1.65, marginBottom: "1.5rem" }}>
                Înainte de a ajunge la Smart Credit România prin recomandarea unei cunoștințe, Raluca încercase alte opțiuni de finanțare fără succes. Avea o apăsare legată de cardurile de credit care îi încurcau bugetul.
              </p>

              <div style={{ backgroundColor: "#0B0F0D", border: "1px solid rgba(255, 255, 255, 0.06)", padding: "1.25rem", borderRadius: "4px", marginBottom: "1.75rem" }}>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.85rem", color: "#D1D5DB" }}>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                    <CheckCircle2 size={16} style={{ color: "#10B981", flexShrink: 0, marginTop: "2px" }} />
                    <span><strong>Situație inițială:</strong> Încercări anterioare respinse și presiunea cardurilor de credit.</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                    <CheckCircle2 size={16} style={{ color: "#10B981", flexShrink: 0, marginTop: "2px" }} />
                    <span><strong>Proces transparent:</strong> Pași explicați clar de la bun început, fără promisiuni nerealiste.</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                    <CheckCircle2 size={16} style={{ color: "#10B981", flexShrink: 0, marginTop: "2px" }} />
                    <span><strong>Rezultat:</strong> Reorganizarea datoriilor și eliberarea bugetului lunar.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <Link
                href="/povesti-reale/raluca-solutie-finantare"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  color: "#10B981",
                  textDecoration: "none"
                }}
              >
                VEZI POVESTEA →
              </Link>
            </div>
          </article>

          {/* STORY 04 — ISTORIC NEGATIV (CLIENTA) */}
          <article
            style={{
              backgroundColor: "#141A17",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <span className="cv-mono" style={{ fontSize: "0.75rem", fontWeight: 700, color: "#10B981", letterSpacing: "0.08em" }}>
                  04 / CASE STUDY
                </span>
                <span style={{ fontSize: "0.72rem", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Biroul de Credit & Finanțare
                </span>
              </div>

              <h3 className="cv-serif" style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.25, color: "#FFFFFF", marginBottom: "1rem" }}>
                Un istoric dificil nu înseamnă automat că povestea s-a terminat.
              </h3>

              <p style={{ fontSize: "0.92rem", color: "#9CA3AF", lineHeight: 1.65, marginBottom: "1.5rem" }}>
                Caz oficial Smart Credit: clienta avea o restanță veche din 2019 ajunsă la recuperare și o înregistrare negativă în Biroul de Credit. Cu sprijin juridic pe cale legală, situația a fost analizată și remediată, obținând ulterior un credit de 57.000 lei prin BRD.
              </p>

              <div style={{ backgroundColor: "#0B0F0D", border: "1px solid rgba(255, 255, 255, 0.06)", padding: "1.25rem", borderRadius: "4px", marginBottom: "1.75rem" }}>
                <div style={{ fontSize: "0.78rem", color: "#F3F4F6", fontWeight: 600, marginBottom: "0.5rem" }}>
                  Restanță veche din 2019 → Rezolvare legală → Credit 57.000 lei BRD
                </div>
                <p style={{ fontSize: "0.78rem", color: "#9CA3AF", lineHeight: 1.5 }}>
                  <strong style={{ color: "#10B981" }}>Notă legală responsabilă:</strong> Eligibilitatea depinde de situația fiecărui client și de criteriile stricte ale creditorului. Nu se garantează ștergerea automată sau aprobarea fără analiză prealabilă.
                </p>
              </div>
            </div>

            <div>
              <Link
                href="/povesti-reale/istoric-negativ-biroul-de-credit"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  color: "#10B981",
                  textDecoration: "none"
                }}
              >
                VEZI POVESTEA →
              </Link>
            </div>
          </article>
        </div>

        {/* DISCLAIMER EDITORIAL OFICIAL */}
        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "4px", padding: "1.25rem 1.5rem", marginBottom: "3.5rem", display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
          <AlertCircle size={18} style={{ color: "#9CA3AF", flexShrink: 0, marginTop: "2px" }} />
          <p style={{ fontSize: "0.82rem", color: "#9CA3AF", lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: "#D1D5DB" }}>Disclaimer legal & responsabilitate:</strong> Rezultatele prezentate provin din cazuri reale publicate de Smart Credit România și nu reprezintă o garanție de aprobare, reducere a ratei sau obținere a unei anumite finanțări. Fiecare situație financiară este analizată individual, iar decizia finală de creditare aparține exclusiv instituției finanțatoare partenere.
          </p>
        </div>

        {/* CTA FINAL DE CONVERSIE */}
        <div style={{ backgroundColor: "#141A17", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "6px", padding: "2.5rem", textAlign: "center", maxWidth: "840px", margin: "0 auto" }}>
          <h3 className="cv-serif" style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.75rem" }}>
            Ai mai multe rate și nu mai știi care este soluția?
          </h3>
          <p style={{ fontSize: "1.05rem", color: "#9CA3AF", marginBottom: "1.75rem" }}>
            Înainte să mai iei un credit, verifică-ți situația.
          </p>
          <a
            href="#verificare-credit"
            onClick={scrollToVerification}
            className="cv-btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#10B981",
              color: "#0E1210",
              fontWeight: 800,
              padding: "0.9rem 2rem",
              borderRadius: "4px",
              textDecoration: "none",
              fontSize: "0.92rem",
              letterSpacing: "0.04em"
            }}
          >
            VERIFICĂ SITUAȚIA MEA <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
