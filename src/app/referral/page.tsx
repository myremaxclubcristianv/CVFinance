// src/app/referral/page.tsx
"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { getTrafficMetadata, trackEvent } from "@/lib/analytics";
import { CONTACT } from "@/lib/constants";

export default function Referral() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [formError, setFormError] = useState("");

  // Referrer fields
  const [referrerName, setReferrerName] = useState("");
  const [referrerPhone, setReferrerPhone] = useState("");
  const [referrerEmail, setReferrerEmail] = useState("");

  // Client fields
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [financialNeed, setFinancialNeed] = useState("");
  const [referralMessage, setReferralMessage] = useState("");
  const [gdpr, setGdpr] = useState(false);

  const [honeypot, setHoneypot] = useState("");

  const validate = () => {
    if (!referrerName.trim() || referrerName.trim().length < 2) {
      setFormError("Te rugăm să introduci numele complet al recomandantului.");
      return false;
    }
    const cleanReferrerPhone = referrerPhone.replace(/\s+/g, "");
    if (!cleanReferrerPhone || !/^(?:\\+40|0040|0)7\d{8}$/.test(cleanReferrerPhone)) {
      setFormError("Telefonul recomandantului nu este valid.");
      return false;
    }
    if (referrerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(referrerEmail)) {
      setFormError("Emailul recomandantului nu este valid.");
      return false;
    }
    if (!clientName.trim() || clientName.trim().length < 2) {
      setFormError("Te rugăm să introduci numele complet al clientului.");
      return false;
    }
    const cleanClientPhone = clientPhone.replace(/\s+/g, "");
    if (!cleanClientPhone || !/^(?:\\+40|0040|0)7\d{8}$/.test(cleanClientPhone)) {
      setFormError("Telefonul clientului nu este valid.");
      return false;
    }
    if (clientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
      setFormError("Emailul clientului nu este valid.");
      return false;
    }
    if (!financialNeed.trim()) {
      setFormError("Specifică ce nevoie financiară are clientul.");
      return false;
    }
    if (!gdpr) {
      setFormError("Trebuie să accepți termenii și condițiile GDPR.");
      return false;
    }
    setFormError("");
    return true;
  };

  const submitReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const trafficMeta = typeof window !== "undefined" ? getTrafficMetadata() : {};
    const payload = {
      referrer_name: referrerName.trim(),
      referrer_phone: referrerPhone.replace(/\s+/g, ""),
      referrer_email: referrerEmail?.trim() || "",
      client_name: clientName.trim(),
      client_phone: clientPhone.replace(/\s+/g, ""),
      client_email: clientEmail?.trim() || "",
      financial_need: financialNeed.trim(),
      referral_message: referralMessage.trim(),
      gdpr,
      gdprConsent: gdpr,
      website: honeypot,
      ...trafficMeta,
    };

    setFormState("submitting");
    if (typeof window !== "undefined") trackEvent("referral_submit");

    try {
      const response = await fetch("/api/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        setFormError(result.message || "Recomandarea nu a putut fi trimisă. Încearcă din nou.");
        setFormState("error");
        return;
      }
      if (typeof window !== "undefined") trackEvent("referral_success");
      setFormState("success");
    } catch {
      setFormError("Conexiunea a fost întreruptă. Verifică rețeaua și încearcă din nou.");
      setFormState("error");
    }
  };

  return (
    <section className="section referral-section">
      <div className="container">
        <div className="form-card">
          <div className="form-header">
            <h2>Recomandă un client care are nevoie de soluții financiare</h2>
            <p>Completează informațiile de mai jos și noi vom contacta clientul pentru o analiză gratuită.</p>
          </div>
          {formState === "success" ? (
            <div className="success-screen" style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <Check size={32} />
              </div>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "12px" }}>Recomandarea a fost înregistrată cu succes.</h3>
              <p style={{ color: "var(--muted)", maxWidth: "520px", margin: "0 auto 16px", lineHeight: 1.6 }}>
                Vom contacta clientul în cel mai scurt timp pentru a discuta opțiunile de finanțare.
              </p>
              <button className="button" onClick={() => setFormState("idle")}>Trimite o nouă recomandare</button>
            </div>
          ) : (
            <form onSubmit={submitReferral} className="form-card">
              {formState === "error" && <div className="form-error">{formError}</div>}
              {/* Honeypot */}
              <input type="text" name="website" value={honeypot} onChange={e => setHoneypot(e.target.value)} style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
              <fieldset className="field-group">
                <legend className="field-label">Persoană care recomandă</legend>
                <input className="input-field" type="text" placeholder="Nume complet" value={referrerName} onChange={e => setReferrerName(e.target.value)} required />
                <input className="input-field" type="tel" placeholder="Telefon" value={referrerPhone} onChange={e => setReferrerPhone(e.target.value)} required />
                <input className="input-field" type="email" placeholder="Email (opțional)" value={referrerEmail} onChange={e => setReferrerEmail(e.target.value)} />
              </fieldset>
              <fieldset className="field-group">
                <legend className="field-label">Client recomandat</legend>
                <input className="input-field" type="text" placeholder="Nume complet" value={clientName} onChange={e => setClientName(e.target.value)} required />
                <input className="input-field" type="tel" placeholder="Telefon" value={clientPhone} onChange={e => setClientPhone(e.target.value)} required />
                <input className="input-field" type="email" placeholder="Email (opțional)" value={clientEmail} onChange={e => setClientEmail(e.target.value)} />
                <input className="input-field" type="text" placeholder="Ce dorește / nevoie financiară" value={financialNeed} onChange={e => setFinancialNeed(e.target.value)} required />
                <textarea className="input-field" placeholder="Mesaj (opțional)" rows={3} value={referralMessage} onChange={e => setReferralMessage(e.target.value)} />
              </fieldset>
              <label className="checkbox-label">
                <input type="checkbox" checked={gdpr} onChange={e => setGdpr(e.target.checked)} />
                <span>Accept termenii și condițiile GDPR</span>
              </label>
              <button type="submit" className="button" disabled={formState === "submitting"}>
                {formState === "submitting" ? "Se trimite..." : "Trimite recomandarea"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
