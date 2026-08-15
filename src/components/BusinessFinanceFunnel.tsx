"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Building2,
  Check,
} from "lucide-react";
import { trackEvent, getTrafficMetadata } from "@/lib/analytics";
import { CONTACT } from "@/lib/constants";
import {
  BUSINESS_PURPOSES_STEP1,
  COMPANY_TYPES,
  COMPANY_AGE_RANGES,
  EMPLOYEE_RANGES,
  REVENUE_RANGES,
  REQUESTED_AMOUNT_RANGES,
  URGENCY_OPTIONS,
} from "@/lib/business-constants";

export interface BusinessFinanceFunnelProps {
  initialSelectedPurposes?: string[];
  source?: string;
}

export default function BusinessFinanceFunnel({
  initialSelectedPurposes = [],
  source = "homepage-business-finance",
}: BusinessFinanceFunnelProps) {
  const [step, setStep] = useState<number>(1);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Step 1: Purposes
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>(initialSelectedPurposes);

  // Step 2: About business
  const [companyType, setCompanyType] = useState<string>("SRL");
  const [companyAge, setCompanyAge] = useState<string>("1–3 ani");
  const [industry, setIndustry] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [employeeRange, setEmployeeRange] = useState<string>("1-5 angajați");
  const [companyName, setCompanyName] = useState<string>("");

  // Step 3: Financial profile
  const [annualRevenue, setAnnualRevenue] = useState<string>("500.000–1M RON");
  const [approximateProfit, setApproximateProfit] = useState<string>("Profit stabil");
  const [existingCredits, setExistingCredits] = useState<string>("1 credit active");
  const [monthlyInstallments, setMonthlyInstallments] = useState<string>("2500");
  const [requestedAmountRange, setRequestedAmountRange] = useState<string>("100.000–250.000 RON");
  const [currency, setCurrency] = useState<string>("RON");

  // Step 4: Financial situation & Risk context
  const [hasActiveCredits, setHasActiveCredits] = useState<string>("Da, avem credite active");
  const [hasDelays, setHasDelays] = useState<string>("Fără întârzieri recente");
  const [previousRefusal, setPreviousRefusal] = useState<string>("Nu am fost refuzați");
  const [bureauStatus, setBureauStatus] = useState<string>("Curat / Fără probleme");
  const [urgency, setUrgency] = useState<string>("URGENT — sub 30 zile");
  const [clientMessage, setClientMessage] = useState<string>("");

  // Step 5: Contact
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gdpr, setGdpr] = useState<boolean>(true);
  const [marketing, setMarketing] = useState<boolean>(true);

  useEffect(() => {
    const handleIntent = (e: Event) => {
      const customEv = e as CustomEvent;
      if (customEv.detail && customEv.detail.type === "business" && customEv.detail.preselectValue) {
        setSelectedPurposes([customEv.detail.preselectValue]);
        setHasStarted(true);
      }
    };
    window.addEventListener("cv_intent_select", handleIntent);
    return () => window.removeEventListener("cv_intent_select", handleIntent);
  }, []);

  // UI States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Refs
  const stepContainerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Sync initial purposes
  useEffect(() => {
    if (initialSelectedPurposes.length > 0) {
      setSelectedPurposes((prev) => Array.from(new Set([...prev, ...initialSelectedPurposes])));
    }
  }, [initialSelectedPurposes]);

  useEffect(() => {
    trackEvent("business_finance_view", { source });
  }, [source]);

  const togglePurpose = (label: string) => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent("business_finance_started");
    }

    setSelectedPurposes((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );

    if (errors.selectedPurposes) {
      setErrors((prev) => ({ ...prev, selectedPurposes: "" }));
    }
  };

  const scrollToStepHeader = () => {
    if (stepContainerRef.current) {
      const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      stepContainerRef.current.scrollIntoView({ behavior: isReduced ? "auto" : "smooth", block: "start" });
    }
  };

  const handleNextStep = (targetStep: number) => {
    if (step === 1) {
      if (selectedPurposes.length === 0) {
        setErrors({ selectedPurposes: "Selectează cel puțin un scop pentru finanțare." });
        return;
      }
      setErrors({});
      trackEvent("business_finance_step_1", { count: selectedPurposes.length });
    }

    if (step === 2) {
      trackEvent("business_finance_step_2", { companyType, companyAge, industry, location });
    }

    if (step === 3) {
      trackEvent("business_finance_step_3", { annualRevenue, requestedAmountRange, currency });
    }

    if (step === 4 && targetStep === 5) {
      trackEvent("business_finance_step_4", { urgency });
      setStep(5);
      setTimeout(() => {
        const el = contactRef.current || document.getElementById("biz-contact-start");
        if (el) {
          const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          el.scrollIntoView({ behavior: isReduced ? "auto" : "smooth", block: "start" });
        }
        nameInputRef.current?.focus();
      }, 50);
      return;
    }

    setStep(targetStep);
    scrollToStepHeader();
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      scrollToStepHeader();
    }
  };

  const validateContactStep = (): boolean => {
    const errs: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 2) {
      errs.name = "Te rugăm să introduci numele complet (minimum 2 caractere).";
    }

    const cleanPhone = phone.replace(/\s+/g, "");
    const phoneRegex = /^(?:\+40|0040|0)7\d{8}$/;
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      errs.phone = "Te rugăm să introduci un număr de telefon valid din România (ex: 0722123456).";
    }

    if (email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errs.email = "Adresa de email nu are un format valid.";
      }
    }

    if (!gdpr) {
      errs.gdpr = "Acordul de prelucrare este obligatoriu.";
    }

    if (!marketing) {
      errs.marketing = "Acordul de comunicare este obligatoriu.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContactStep()) return;

    setSubmitting(true);
    setErrors({});

    const meta = getTrafficMetadata();

    const payload = {
      source,
      leadType: "business_finance_prequalification",
      selectedPurposes,
      companyType,
      companyAge,
      industry: industry.trim() || "Nepecificat",
      location: location.trim() || "Nespecificat",
      employeeRange,
      companyName: companyName.trim() || "Nespecificat",

      annualRevenue,
      approximateProfit,
      existingCredits,
      monthlyInstallments: Number(monthlyInstallments) || 0,
      requestedAmountRange,
      currency,

      hasActiveCredits,
      hasDelays,
      previousRefusal,
      bureauStatus,
      urgency,
      clientMessage: clientMessage.trim(),

      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      gdpr: true,
      gdprConsent: true,
      marketing: true,
      marketingConsent: true,

      website: "",
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      deviceType: meta.deviceType,
      utmSource: meta.utmSource,
      utmMedium: meta.utmMedium,
      utmCampaign: meta.utmCampaign,
      utmContent: meta.utmContent,
      referral: meta.referrer || "direct",
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrors({ form: data.message || "A intervenit o eroare. Te rugăm să reîncerci." });
        return;
      }

      setSubmitted(true);
      trackEvent("business_finance_submitted", { source, currency, urgency });
    } catch (err) {
      console.error("Business funnel error:", err);
      setErrors({ form: "Conexiunea a întâmpinat o problemă. Te rugăm să reîncerci." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    trackEvent("business_finance_whatsapp", { source: "success_screen" });
    const text = encodeURIComponent(
      "Bună ziua, am completat datele pentru finanțarea companiei pe site și doresc o discuție directă."
    );
    window.open(`https://wa.me/${CONTACT.WHATSAPP}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  if (submitted) {
    return (
      <div className="totul-success-card">
        <div className="success-icon-wrap">
          <CheckCircle2 size={56} style={{ color: "#34D399" }} />
        </div>
        <h1>Am primit situația companiei tale.</h1>
        <p className="success-subtitle">
          Analizez informațiile pe care mi le-ai trimis și revin către tine telefonic pentru a discuta variantele care pot avea sens pentru profilul companiei și obiectivul tău.
        </p>

        <div className="success-actions">
          <button type="button" onClick={handleWhatsAppClick} className="totul-cta-primary whatsapp-btn">
            <MessageCircle size={20} />
            <span>DISCUTĂ DIRECT PE WHATSAPP</span>
          </button>
          <Link href="/" className="totul-cta-secondary">
            ÎNAPOI PE SITE
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div id="biz-funnel-form" ref={stepContainerRef} className="totul-funnel-card">
      {/* Progress Header */}
      <div className="totul-progress-header">
        <div className="progress-text-row">
          <span className="step-badge">0{step} / 05</span>
          <span className="step-label">
            {step === 1 && "Ce vrei să finanțezi?"}
            {step === 2 && "Despre business"}
            {step === 3 && "Profil financiar"}
            {step === 4 && "Situație & Urgență"}
            {step === 5 && "Date de contact"}
          </span>
        </div>
        <div className="progress-bar-bg" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={5}>
          <div className="progress-bar-fill" style={{ width: `${(step / 5) * 100}%` }} />
        </div>
      </div>

      {errors.form && (
        <div className="totul-error-banner" role="alert">
          <AlertCircle size={18} />
          <span>{errors.form}</span>
        </div>
      )}

      {/* STEP 1: Purposes */}
      {step === 1 && (
        <div className="step-content animate-fade-in">
          <h2 className="step-title">Ce vrei să finanțezi?</h2>
          <p className="step-desc">
            Selectează una sau mai multe destinații ale finanțării pentru companie sau antreprenor.
          </p>

          {errors.selectedPurposes && (
            <p className="inline-error">
              <AlertCircle size={15} /> {errors.selectedPurposes}
            </p>
          )}

          <div className="problem-grid-selectable" role="group" aria-label="Destinație finanțare">
            {BUSINESS_PURPOSES_STEP1.map((purpose) => {
              const isSelected = selectedPurposes.includes(purpose);
              return (
                <button
                  key={purpose}
                  type="button"
                  onClick={() => togglePurpose(purpose)}
                  className={`problem-select-card ${isSelected ? "selected" : ""}`}
                  aria-pressed={isSelected}
                >
                  <div className="card-check-box">
                    {isSelected ? <Check size={16} /> : <div className="dot-unselected" />}
                  </div>
                  <div className="card-text">
                    <span className="card-cat">FINANȚARE</span>
                    <span className="card-lbl">{purpose}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="step-footer">
            <button type="button" onClick={() => handleNextStep(2)} className="totul-btn-next">
              <span>CONTINUĂ →</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: About Business */}
      {step === 2 && (
        <div className="step-content animate-fade-in">
          <h2 className="step-title">Despre afacerea ta</h2>
          <p className="step-desc">Oferă-ne câteva repere generale despre structura companiei tăi.</p>

          <div className="fields-grid">
            <div className="field-group">
              <label htmlFor="biz-type">Tip companie</label>
              <select id="biz-type" value={companyType} onChange={(e) => setCompanyType(e.target.value)}>
                {COMPANY_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="biz-age">Vechime companie</label>
              <select id="biz-age" value={companyAge} onChange={(e) => setCompanyAge(e.target.value)}>
                {COMPANY_AGE_RANGES.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="biz-industry">Domeniu de activitate (ex: Construcții, IT, Transport)</label>
              <input
                id="biz-industry"
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="ex: Comerț / Producție / Servicii"
              />
            </div>

            <div className="field-group">
              <label htmlFor="biz-location">Județ / localitate sediu</label>
              <input
                id="biz-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="ex: București, Ilfov, Cluj"
              />
            </div>

            <div className="field-group">
              <label htmlFor="biz-employees">Număr aproximativ de angajați</label>
              <select id="biz-employees" value={employeeRange} onChange={(e) => setEmployeeRange(e.target.value)}>
                {EMPLOYEE_RANGES.map((eRange) => (
                  <option key={eRange} value={eRange}>{eRange}</option>
                ))}
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="biz-company-name">Numele firmei (opțional)</label>
              <input
                id="biz-company-name"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="ex: Business Exemplu SRL"
              />
            </div>
          </div>

          <div className="step-footer nav-between">
            <button type="button" onClick={handlePrevStep} className="totul-btn-back">
              <ArrowLeft size={18} />
              <span>Înapoi</span>
            </button>
            <button type="button" onClick={() => handleNextStep(3)} className="totul-btn-next">
              <span>CONTINUĂ →</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Financial Profile */}
      {step === 3 && (
        <div className="step-content animate-fade-in">
          <h2 className="step-title">Profilul financiar aproximativ</h2>
          <p className="step-desc">Informații orientative pentru calibrarea opțiunilor disponibile.</p>

          <div className="fields-grid">
            <div className="field-group">
              <label htmlFor="biz-revenue">Cifră de afaceri anuală (estimat)</label>
              <select id="biz-revenue" value={annualRevenue} onChange={(e) => setAnnualRevenue(e.target.value)}>
                {REVENUE_RANGES.map((rev) => (
                  <option key={rev} value={rev}>{rev}</option>
                ))}
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="biz-profit">Profit / rezultat aproximativ</label>
              <select id="biz-profit" value={approximateProfit} onChange={(e) => setApproximateProfit(e.target.value)}>
                <option value="Profit stabil">Profit stabil</option>
                <option value="Break-even / Echilibru">Break-even / Pe zero</option>
                <option value="Pierdere temporară">Pierdere temporară (investiții)</option>
                <option value="Prefer să discut">Prefer să discut în analiză</option>
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="biz-amount-range">Suma orientativă solicitată</label>
              <select
                id="biz-amount-range"
                value={requestedAmountRange}
                onChange={(e) => setRequestedAmountRange(e.target.value)}
              >
                {REQUESTED_AMOUNT_RANGES.map((amt) => (
                  <option key={amt} value={amt}>{amt}</option>
                ))}
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="biz-currency">Monedă preferată</label>
              <select id="biz-currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="RON">RON (Lei)</option>
                <option value="EUR">EUR (Euro)</option>
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="biz-installments">Total rate lunare actuale firmă (RON)</label>
              <input
                id="biz-installments"
                type="number"
                min="0"
                step="500"
                value={monthlyInstallments}
                onChange={(e) => setMonthlyInstallments(e.target.value)}
                placeholder="ex: 2500"
              />
            </div>

            <div className="field-group">
              <label htmlFor="biz-credits-status">Credite active firmă</label>
              <input
                id="biz-credits-status"
                type="text"
                value={existingCredits}
                onChange={(e) => setExistingCredits(e.target.value)}
                placeholder="ex: 1 leasing + 1 linie de credit"
              />
            </div>
          </div>

          <div className="step-footer nav-between">
            <button type="button" onClick={handlePrevStep} className="totul-btn-back">
              <ArrowLeft size={18} />
              <span>Înapoi</span>
            </button>
            <button type="button" onClick={() => handleNextStep(4)} className="totul-btn-next">
              <span>CONTINUĂ →</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Financial Situation & Urgency */}
      {step === 4 && (
        <div className="step-content animate-fade-in">
          <h2 className="step-title">Situație de credit & Urgență</h2>
          <p className="step-desc">Ajută-ne să înțelegem dacă există aspecte specifice de verificat.</p>

          <div className="fields-grid">
            <div className="field-group">
              <label htmlFor="biz-urgency">Cât de urgentă este finanțarea?</label>
              <select id="biz-urgency" value={urgency} onChange={(e) => setUrgency(e.target.value)}>
                {URGENCY_OPTIONS.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="biz-bureau">Status Biroul de Credit / Centrala Riscurilor</label>
              <select id="biz-bureau" value={bureauStatus} onChange={(e) => setBureauStatus(e.target.value)}>
                <option value="Curat / Fără probleme">Curat / Fără probleme</option>
                <option value="Am avut mici întârzieri">Am avut mici întârzieri (achitate)</option>
                <option value="Există întârzieri active">Există întârzieri active</option>
                <option value="Prefer să explic">Prefer să explic la telefon</option>
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="biz-refusals">Ați fost refuzați anterior de bănci / IFN?</label>
              <select id="biz-refusals" value={previousRefusal} onChange={(e) => setPreviousRefusal(e.target.value)}>
                <option value="Nu am fost refuzați">Nu am fost refuzați</option>
                <option value="Refuzat de bancă recente">Refuzat de bancă recent</option>
                <option value="Refuzat de IFN">Refuzat de IFN</option>
                <option value="Condiții prea scumpe oferite">Condiții prea scumpe oferite</option>
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="biz-delays">Întârzieri sau incidente financiare?</label>
              <input
                id="biz-delays"
                type="text"
                value={hasDelays}
                onChange={(e) => setHasDelays(e.target.value)}
                placeholder="ex: Fără întârzieri sau mențiuni"
              />
            </div>
          </div>

          <div className="field-group" style={{ marginTop: "16px" }}>
            <label htmlFor="biz-message">Spune-mi pe scurt ce dorești să construiești (opțional)</label>
            <textarea
              id="biz-message"
              rows={4}
              value={clientMessage}
              onChange={(e) => setClientMessage(e.target.value)}
              placeholder="Detaliază contextul proiectului sau al nevoii financiare..."
            />
          </div>

          <div className="step-footer nav-between">
            <button type="button" onClick={handlePrevStep} className="totul-btn-back">
              <ArrowLeft size={18} />
              <span>Înapoi</span>
            </button>
            <button type="button" onClick={() => handleNextStep(5)} className="totul-btn-next highlight-step-btn">
              <span>CONTINUĂ →</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Contact */}
      {step === 5 && (
        <form
          ref={contactRef}
          id="biz-contact-start"
          onSubmit={handleSubmit}
          className="step-content animate-fade-in contact-step-form"
          noValidate
        >
          <div className="contact-step-header">
            <h2 className="step-title">Date de contact antreprenor</h2>
            <p className="step-desc">Spune-mi pe ce număr pot reveni cu rezultatul evaluării.</p>
          </div>

          <div className="fields-stack">
            <div className="field-group">
              <label htmlFor="biz-name">
                Nume complet antreprenor / administrator <span className="req">*</span>
              </label>
              <input
                ref={nameInputRef}
                id="biz-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Numele și prenumele tău"
                aria-required="true"
                aria-invalid={!!errors.name}
                required
              />
              {errors.name && <p className="inline-error"><AlertCircle size={14} /> {errors.name}</p>}
            </div>

            <div className="field-group">
              <label htmlFor="biz-phone">
                Număr de telefon <span className="req">*</span>
              </label>
              <input
                id="biz-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="ex: 0722123456"
                aria-required="true"
                aria-invalid={!!errors.phone}
                required
              />
              {errors.phone && <p className="inline-error"><AlertCircle size={14} /> {errors.phone}</p>}
            </div>

            <div className="field-group">
              <label htmlFor="biz-email">
                Adresă de email <span className="opt-tag">(opțional)</span>
              </label>
              <input
                id="biz-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@firmata.ro"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="inline-error"><AlertCircle size={14} /> {errors.email}</p>}
            </div>

            <div className="field-group">
              <label htmlFor="biz-company">Numele firmei <span className="opt-tag">(opțional)</span></label>
              <input
                id="biz-company"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="ex: Denumire SRL / PFA"
              />
            </div>

            {/* Checkboxes */}
            <div className="consent-checkboxes">
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={gdpr}
                  onChange={(e) => setGdpr(e.target.checked)}
                  required
                />
                <span>Sunt de acord cu prelucrarea datelor în scopul realizării analizei financiare. *</span>
              </label>
              {errors.gdpr && <p className="inline-error"><AlertCircle size={14} /> {errors.gdpr}</p>}

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  required
                />
                <span>Sunt de acord să fiu contactat telefonic sau prin mesaj pentru această solicitare. *</span>
              </label>
              {errors.marketing && <p className="inline-error"><AlertCircle size={14} /> {errors.marketing}</p>}
            </div>

            <button type="submit" disabled={submitting} className="totul-submit-btn">
              {submitting ? "Trimitere date..." : "Trimite solicitarea de analiză →"}
            </button>

            <p className="submit-disclaimer-note">
              * Evaluarea identifică opțiunile legale posibile pentru companie fără comisioane ascunse sau garanții nefondate.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
