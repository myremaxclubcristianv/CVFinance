"use client";
import React, { useState } from "react";
import { trackEvent } from "@/lib/analytics";

const ReferralForm: React.FC = () => {
  const [referrerName, setReferrerName] = useState("");
  const [referrerPhone, setReferrerPhone] = useState("");
  const [referrerEmail, setReferrerEmail] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [financialNeed, setFinancialNeed] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const cleanPhone = (val: string) => val.replace(/\s+/g, "");
  const phoneRegex = /^(?:\+40|0040|0)7\d{8}$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!referrerName.trim() || referrerName.trim().length < 2) {
      setError("Numele tău este obligatoriu.");
      return;
    }
    if (!phoneRegex.test(cleanPhone(referrerPhone))) {
      setError("Telefonul tău este invalid.");
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
    setSubmitting(true);
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
        setError(data.message || "Eroare la trimitere.");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Probleme de rețea. Încercați din nou.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="success-message">
        Mulțumesc. Recomandarea a fost transmisă. Vom reveni către persoana recomandată în cel mai scurt timp.
      </div>
    );
  }

  return (
    <form className="referral-form" onSubmit={handleSubmit} noValidate>
      {error && <p className="error" style={{ color: "red" }}>{error}</p>}
      {/* Hidden honeypot */}
      <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ display: "none" }} />

      <h2>Recomandă un client</h2>
      <label>
        Numele tău*
        <input type="text" value={referrerName} onChange={(e) => setReferrerName(e.target.value)} required />
      </label>
      <label>
        Telefonul tău* (<code>07xxxxxxxx</code>)
        <input type="tel" value={referrerPhone} onChange={(e) => setReferrerPhone(e.target.value)} required />
      </label>
      <label>
        Emailul tău (opțional)
        <input type="email" value={referrerEmail} onChange={(e) => setReferrerEmail(e.target.value)} />
      </label>

      <label>
        Numele persoanei recomandate*
        <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} required />
      </label>
      <label>
        Telefonul persoanei recomandate* (<code>07xxxxxxxx</code>)
        <input type="tel" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} required />
      </label>
      <label>
        Emailul persoanei recomandate (opțional)
        <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
      </label>

      <label>
        Ce tip de finanțare caută?
        <input type="text" value={financialNeed} onChange={(e) => setFinancialNeed(e.target.value)} required />
      </label>
      <label>
        Detalii / mesaj (opțional)
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} />
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
        Confirm că am dreptul să transmit datele persoanei recomandate și că aceasta a consimțit.
      </label>

      <button type="submit" disabled={submitting} className="button">
        {submitting ? "Trimitere..." : "Trimite recomandarea"}
      </button>
    </form>
  );
};

export default ReferralForm;
