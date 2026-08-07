"use client";
import React, { useState } from "react";
import { trackEvent } from "@/lib/analytics";

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
      setError("Telefonul recomandantului este invalid.");
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
      setError("Telefonul persoanei recomandate este invalid.");
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
      setError("Trebuie să confirmați consimțământul.");
      return;
    }
    if (honeypot) {
      // bot detected – silently ignore
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
      <div className="success-message" style={{ textAlign: "center", padding: "24px" }}>
        <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>
          Recomandarea a fost transmisă cu succes. Vom reveni către persoana recomandată în cel mai scurt timp.
        </p>
        <button type="button" className="button" onClick={resetForm}>
          Trimite o altă recomandare
        </button>
      </div>
    );
  }

  return (
    <form className="referral-form" onSubmit={handleSubmit} noValidate>
      {error && <p className="error" style={{ color: "red" }}>{error}</p>}
      {/* Hidden honeypot */}
      <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ display: "none" }} />

      <h2 className="form-title">Recomandă un client</h2>
      <div className="field-group">
        <label className="field-label" htmlFor="referrerName">Numele tău*</label>
        <input id="referrerName" className="input-field" type="text" value={referrerName} onChange={(e) => setReferrerName(e.target.value)} required />
      </div>
      <div className="field-group">
        <label className="field-label" htmlFor="referrerPhone">Telefonul tău* ( <code>07xxxxxxxx</code> )</label>
        <input id="referrerPhone" className="input-field" type="tel" value={referrerPhone} onChange={(e) => setReferrerPhone(e.target.value)} required />
      </div>
      <div className="field-group">
        <label className="field-label" htmlFor="referrerEmail">Emailul tău (opțional)</label>
        <input id="referrerEmail" className="input-field" type="email" value={referrerEmail} onChange={(e) => setReferrerEmail(e.target.value)} />
      </div>
      <div className="field-group">
        <label className="field-label" htmlFor="clientName">Numele persoanei recomandate*</label>
        <input id="clientName" className="input-field" type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} required />
      </div>
      <div className="field-group">
        <label className="field-label" htmlFor="clientPhone">Telefonul persoanei recomandate* ( <code>07xxxxxxxx</code> )</label>
        <input id="clientPhone" className="input-field" type="tel" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} required />
      </div>
      <div className="field-group">
        <label className="field-label" htmlFor="clientEmail">Emailul persoanei recomandate (opțional)</label>
        <input id="clientEmail" className="input-field" type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
      </div>
      <div className="field-group">
        <label className="field-label" htmlFor="financialNeed">Ce tip de finanțare caută?</label>
        <input id="financialNeed" className="input-field" type="text" value={financialNeed} onChange={(e) => setFinancialNeed(e.target.value)} required />
      </div>
      <div className="field-group">
        <label className="field-label" htmlFor="message">Detalii / mesaj (opțional)</label>
        <textarea id="message" className="input-field" value={message} onChange={(e) => setMessage(e.target.value)} rows={3} />
      </div>
      <div className="field-group" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input id="consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
        <label htmlFor="consent" className="field-label">Confirm că am dreptul să transmit datele persoanei recomandate și că aceasta a consimțat.</label>
      </div>

      <button type="submit" disabled={formState === "submitting"} className="button">
        {formState === "submitting" ? "Trimitere..." : "Trimite recomandarea"}
      </button>
    </form>
  );
};

export default ReferralForm;
