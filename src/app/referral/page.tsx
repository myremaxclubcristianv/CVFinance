"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ReferralForm from "@/components/ReferralForm";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight, ShieldCheck, Check } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export default function ReferralPage() {
  const [footerYear, setFooterYear] = useState(2026);
  
  useEffect(() => {
    trackEvent("referral_page_viewed");
    setFooterYear(new Date().getFullYear());
  }, []);

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent("referral_hero_cta_clicked");
    document.getElementById("form-recomandare")?.scrollIntoView({ behavior: "smooth" });
  };

  const stepsList = [
    {
      code: "01",
      title: "RECOMANZI",
      desc: "Completezi datele de contact ale persoanei și detaliile despre nevoia sa financiară."
    },
    {
      code: "02",
      title: "ANALIZEZ",
      desc: "Contactez persoana recomandată, analizăm situația și identificăm ofertele potrivite."
    },
    {
      code: "03",
      title: "PRIMEȘTI",
      desc: "Primești comisionul stabilit de 500 – 3.000 RON imediat după acordarea creditului de către bancă."
    }
  ];

  const whoToReferList = [
    "Persoană care vrea un credit nou (ipotecar, imobiliar sau de nevoi personale)",
    "Persoană care vrea refinanțare (pentru consolidare rate sau dobândă mai mică)",
    "Antreprenor care are nevoie de finanțare business (capital de lucru, investiții)",
    "Persoană care dorește să cumpere o locuință nouă și are nevoie de pre-aprobare",
    "Client refuzat recent de bănci care nu știe dacă se mai încadrează în actualele norme"
  ];

  return (
    <>
      <main className="cv-main-wrapper" style={{ paddingTop: "80px" }}>
        
        {/* HERO SECTION */}
        <section className="cv-hero-section" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "5rem" }}>
          <div className="cv-container cv-hero-grid">
            <div className="cv-hero-left">
              <span className="cv-eyebrow">CV FINANCE / RECOMANDĂRI</span>
              <h1 className="cv-hero-title" style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", lineHeight: "1.15" }}>
                RECOMANDĂ<br />
                UN CLIENT.
              </h1>
              <p className="cv-hero-desc" style={{ fontSize: "1.15rem", marginBottom: "2.5rem" }}>
                Cunoști pe cineva care are nevoie de finanțare sau vrea să-și optimizeze ratele? Trimite-mi situația lui. Eu mă ocup de restul, iar tu ești recompensat direct.
              </p>
              <div className="cv-hero-actions">
                <a href="#form-recomandare" onClick={handleCtaClick} className="cv-btn-primary">
                  RECOMANDĂ UN CLIENT →
                </a>
              </div>
            </div>

            <div className="cv-hero-right" style={{ display: "flex", alignItems: "center" }}>
              <div className="cv-readout-panel" style={{ width: "100%", padding: "2.5rem", border: "1px solid var(--border)", backgroundColor: "var(--bg-secondary)" }}>
                <span className="cv-mono" style={{ color: "var(--text-secondary)", fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}>COMISION DE RECOMANDARE</span>
                <div className="cv-mono" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "var(--emerald)", lineHeight: "1", marginBottom: "0.5rem" }}>
                  500 – 3.000 RON
                </div>
                <span className="cv-mono" style={{ color: "var(--text-secondary)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "1.5rem" }}>
                  PENTRU FIECARE RECOMANDARE ELIGIBILĂ ACORDATĂ
                </span>
                
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.8rem", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                    <Check size={16} style={{ color: "var(--emerald)", marginTop: "0.15rem", flexShrink: 0 }} />
                    <span>Plată garantată prin contract de recomandare.</span>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                    <Check size={16} style={{ color: "var(--emerald)", marginTop: "0.15rem", flexShrink: 0 }} />
                    <span>Proces 100% transparent: ești notificat la fiecare etapă.</span>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                    <Check size={16} style={{ color: "var(--emerald)", marginTop: "0.15rem", flexShrink: 0 }} />
                    <span>Consiliere gratuită pentru persoana recomandată.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="cv-section" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="cv-container">
            <span className="cv-section-marker">01 / CUM FUNCȚIONEAZĂ</span>
            <div className="cv-section-header">
              <h2 className="cv-section-title">PROCES DE RECOMANDARE SIMPLU</h2>
              <p className="cv-section-sub">Trei pași clari de la trimiterea datelor până la încasarea recompensei.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ marginTop: "3rem" }}>
              {stepsList.map((step) => (
                <div key={step.code} style={{ borderTop: "2px solid var(--border)", paddingTop: "1.5rem" }}>
                  <span className="cv-mono" style={{ color: "var(--emerald)", fontWeight: 700, fontSize: "0.85rem" }}>{step.code}</span>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0.6rem 0 0.4rem" }}>{step.title}</h3>
                  <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHO TO REFER */}
        <section className="cv-section" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="cv-container">
            <span className="cv-section-marker">02 / CINE ESTE ELIGIBIL</span>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5">
                <h2 className="cv-section-title" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
                  PE CINE POȚI<br />
                  RECOMANDA?
                </h2>
                <p className="cv-section-sub" style={{ marginTop: "1rem" }}>
                  Recomandările se aplică atât pentru persoane fizice care caută credite personale sau ipotecare, cât și pentru companii care au nevoie de linii de finanțare.
                </p>
              </div>

              <div className="lg:col-span-7 cv-directory-list">
                {whoToReferList.map((item, idx) => {
                  const numStr = String(idx + 1).padStart(2, "0");
                  return (
                    <div key={idx} className="cv-dir-row" style={{ display: "grid", gridTemplateColumns: "50px 1fr", alignItems: "center", padding: "1.25rem 0", cursor: "default", background: "none" }}>
                      <span className="cv-dir-code">{numStr}</span>
                      <span style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* REFERRAL FORM SECTION */}
        <section className="cv-section" id="form-recomandare" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="cv-container" style={{ maxWidth: "800px" }}>
            <span className="cv-section-marker">03 / FORMULAR RECOMANDARE</span>
            
            <div className="cv-section-header" style={{ marginBottom: "3rem" }}>
              <h2 className="cv-section-title">TRIMITE O RECOMANDARE</h2>
              <p className="cv-section-sub">Introdu datele tale și ale persoanei pe care o recomanzi. Te voi contacta pentru confirmare.</p>
            </div>

            <div className="cv-form-card" style={{ padding: "3rem 2.5rem" }}>
              <ReferralForm />
            </div>
          </div>
        </section>

        {/* TERMS / TRUST SECTION */}
        <section className="cv-section" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="cv-container" style={{ maxWidth: "880px" }}>
            <span className="cv-section-marker">LEGAL / TERMENI RECOMANDĂRI</span>
            <div className="cv-section-header" style={{ marginBottom: "2.5rem" }}>
              <h2 className="cv-section-title">CONDIȚII DE RECOMPENSARE TRANSPARENTE</h2>
              <p className="cv-section-sub">Regulamentul clar privind eligibilitatea recomandărilor, calculul comisionului și plata.</p>
            </div>

            <div className="cv-legal-callout" style={{ marginBottom: "2.5rem" }}>
              <div className="cv-legal-callout-title">GARANȚIA PARTENERIATULUI</div>
              <p className="cv-legal-callout-text">
                Fiecare recomandare este înregistrată oficial în sistemul CV Finance, cu protecția datelor și asigurarea plății comisionului imediat după acordarea creditului.
              </p>
            </div>

            <div className="cv-legal-article" style={{ gap: "2rem" }}>
              <div className="cv-legal-section">
                <span className="cv-legal-num">01</span>
                <h3 className="cv-legal-heading" style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Validarea Recomandării</h3>
                <p className="cv-legal-text" style={{ fontSize: "0.95rem" }}>
                  Recompensa se acordă pentru persoanele fizice sau juridice recomandate care nu sunt deja în discuții active cu CV Finance și care finalizează cu succes un dosar de finanțare (creditul este aprobat și decontat de bancă).
                </p>
              </div>

              <div className="cv-legal-section">
                <span className="cv-legal-num">02</span>
                <h3 className="cv-legal-heading" style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Valoarea Comisionului</h3>
                <p className="cv-legal-text" style={{ fontSize: "0.95rem" }}>
                  Comisionul variază între <strong>500 RON</strong> (pentru credite de nevoi personale / sume mai mici) și <strong>3.000 RON</strong> (pentru credite ipotecare de valori mari sau finanțări business corporative complexe), în funcție de volumul finanțării acordate.
                </p>
              </div>

              <div className="cv-legal-section">
                <span className="cv-legal-num">03</span>
                <h3 className="cv-legal-heading" style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Momentul Plății</h3>
                <p className="cv-legal-text" style={{ fontSize: "0.95rem" }}>
                  Plata se efectuează în termen de maximum <strong>5 zile lucrătoare</strong> de la momentul în care banca parteneră virează fondurile creditului către client și încheie decontul cu CV Finance.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
