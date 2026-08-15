"use client";
import React, { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const ReferralForm: React.FC = () => {
  // Form fields
  const [referrerName, setReferrerName] = useState("");
  const [referrerPhone, setReferrerPhone] = useState("");
  const [referrerEmail, setReferrerEmail] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [financialNeed, setFinancialNeed] = useState("");
  const [message, setMessage] = useState("");

  const [honeypot, setHoneypot] = useState("");
  const [consent, setConsent] = useState(false);

  // UI state
  const [error, setError] = useState("");
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const cleanPhone = (val: string) => val.replace(/\s+/g, "");
  const phoneRegex = /^(?:\+40|0040|0)7\d{8}$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!referrerName.trim() || referrerName.trim().length < 2) {
      setError("Numele complet al recomandantului este obligatoriu.");
      return;
    }
    if (!phoneRegex.test(cleanPhone(referrerPhone))) {
      setError("Telefonul recomandantului este invalid (ex: 07xxxxxxxx).");
      return;
    }
    if (referrerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(referrerEmail)) {
      setError("Emailul tău nu este valid.");
      return;
    }
    if (!clientName.trim() || clientName.trim().length < 2) {
      setError("Numele persoanei recomandate este obligatoriu.");
      return;
    }
    if (!phoneRegex.test(cleanPhone(clientPhone))) {
      setError("Telefonul persoanei recomandate este invalid (ex: 07xxxxxxxx).");
      return;
    }
    if (clientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
      setError("Emailul persoanei recomandate nu este valid.");
      return;
    }
    if (!financialNeed.trim()) {
      setError("Tipul de finanțare este obligatoriu.");
      return;
    }
    if (!consent) {
      setError("Trebuie să confirmați consimțământul pentru datele de contact.");
      return;
    }
    if (honeypot) {
      return;
    }

    setFormState("submitting");
    trackEvent("referral_form_submit");
    try {
      const payload = {
        referrer_name: referrerName.trim(),
        referrer_phone: cleanPhone(referrerPhone),
        referrer_email: referrerEmail?.trim() || "",
        client_name: clientName.trim(),
        client_phone: cleanPhone(clientPhone),
        client_email: clientEmail?.trim() || "",
        financial_need: financialNeed.trim(),
        referral_message: message.trim(),
        consent: true,
        website: honeypot,
      };
      const resp = await fetch("/api/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await resp.json();
      if (!resp.ok) {
        let msg = data.message || "Eroare la trimitere.";
        if (data.errors?.fieldErrors) {
          const firstKey = Object.keys(data.errors.fieldErrors)[0];
          if (firstKey && data.errors.fieldErrors[firstKey]?.[0]) {
            msg = `Eroare [${firstKey}]: ${data.errors.fieldErrors[firstKey][0]}`;
          }
        }
        setError(msg);
        setFormState("error");
        return;
      }
      setFormState("success");
    } catch (e) {
      setError("Probleme de rețea. Încercați din nou.");
      setFormState("error");
    }
  };

  const resetForm = () => {
    setReferrerName("");
    setReferrerPhone("");
    setReferrerEmail("");
    setClientName("");
    setClientPhone("");
    setClientEmail("");
    setFinancialNeed("");
    setMessage("");
    setConsent(false);
    setError("");
    setFormState("idle");
  };

  if (formState === "success") {
    return (
      <div className="totul-success-card">
        <div className="success-icon-wrap">
          <CheckCircle2 size={56} style={{ color: "var(--emerald)" }} />
        </div>
        <h1>Recomandare înregistrată</h1>
        <p className="success-subtitle" style={{ maxWidth: "550px", margin: "0 auto 2rem" }}>
          Datele au fost transmise cu succes. Vom analiza detaliile primite și vom contacta persoana recomandată pentru a structura cea mai bună strategie financiară.
        </p>
        <button type="button" className="totul-btn-next" onClick={resetForm}>
          Trimite o altă recomandare
        </button>
      </div>
    );
  }

  return (
    <form className="referral-form" onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="totul-error-banner" style={{ marginBottom: "2rem" }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: "none" }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        
        {/* SECTION 1: Date Recomandant */}
        <div>
          <h3 className="cv-mono" style={{ color: "var(--emerald)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "1rem", letterSpacing: "0.06em" }}>
            01 / DATELE TALE (RECOMANDANT)
          </h3>
          <div className="fields-grid">
            <div className="field-group">
              <label htmlFor="referrerName">Nume complet*</label>
              <input
                id="referrerName"
                type="text"
                value={referrerName}
                onChange={(e) => setReferrerName(e.target.value)}
                placeholder="Numele tău complet"
                required
              />
            </div>
            <div className="field-group">
              <label htmlFor="referrerPhone">Număr telefon*</label>
              <input
                id="referrerPhone"
                type="tel"
                value={referrerPhone}
                onChange={(e) => setReferrerPhone(e.target.value)}
                placeholder="ex: 07xxxxxxxx"
                required
              />
            </div>
            <div className="field-group">
              <label htmlFor="referrerEmail">Email (opțional)</label>
              <input
                id="referrerEmail"
                type="email"
                value={referrerEmail}
                onChange={(e) => setReferrerEmail(e.target.value)}
                placeholder="adresa.ta@email.com"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Date Client Recomandat */}
        <div>
          <h3 className="cv-mono" style={{ color: "var(--emerald)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "1rem", letterSpacing: "0.06em" }}>
            02 / DATELE CLIENTULUI RECOMANDAT
          </h3>
          <div className="fields-grid">
            <div className="field-group">
              <label htmlFor="clientName">Nume complet client*</label>
              <input
                id="clientName"
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Numele complet al persoanei recomandate"
                required
              />
            </div>
            <div className="field-group">
              <label htmlFor="clientPhone">Număr telefon client*</label>
              <input
                id="clientPhone"
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="ex: 07xxxxxxxx"
                required
              />
            </div>
            <div className="field-group">
              <label htmlFor="clientEmail">Email client (opțional)</label>
              <input
                id="clientEmail"
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="adresa.client@email.com"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Finanțare & Detalii */}
        <div>
          <h3 className="cv-mono" style={{ color: "var(--emerald)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "1rem", letterSpacing: "0.06em" }}>
            03 / NEVOIE FINANCIARĂ & CONTEXT
          </h3>
          <div className="fields-stack">
            <div className="field-group">
              <label htmlFor="financialNeed">Ce tip de finanțare are nevoie?*</label>
              <input
                id="financialNeed"
                type="text"
                value={financialNeed}
                onChange={(e) => setFinancialNeed(e.target.value)}
                placeholder="ex: Credit ipotecar, Refinanțare urgentă, Linii capital de lucru..."
                required
              />
            </div>
            <div className="field-group">
              <label htmlFor="message">Detalii suplimentare (opțional)</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Orice alte detalii despre istoric, venituri sau urgență..."
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* GDPR Consent */}
        <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
          <div className="checkboxes-group">
            <label className="checkbox-row" htmlFor="consent">
              <input
                id="consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
              />
              <span className="checkbox-label" style={{ fontSize: "0.9rem" }}>
                Confirm că am dreptul să transmit datele persoanei recomandate și că aceasta este de acord să fie contactată în scopul consilierii financiare.
              </span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
          <button
            type="submit"
            disabled={formState === "submitting"}
            className="totul-submit-btn"
            style={{ width: "fit-content", padding: "1rem 2.5rem" }}
          >
            {formState === "submitting" ? "Se transmite..." : "TRIMITE RECOMANDAREA →"}
          </button>
          <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
            * CÂMPURI OBLIGATORII. INFORMAȚIILE SUNT ENCRIPTATE ȘI PROTEJATE SECURED.
          </p>
        </div>

      </div>
    </form>
  );
};

export default ReferralForm;
