"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ShieldCheck,
  Lock,
  Sparkles,
  PhoneCall,
  Check,
} from "lucide-react";
import { trackEvent, getTrafficMetadata } from "@/lib/analytics";
import { CONTACT } from "@/lib/constants";
import { PROBLEM_CARDS } from "@/lib/totul-constants";

export interface TotulInainteDeCreditFunnelProps {
  initialSelectedProblems?: string[];
}

export default function TotulInainteDeCreditFunnel({
  initialSelectedProblems = [],
}: TotulInainteDeCreditFunnelProps) {
  const [step, setStep] = useState<number>(1);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Form fields
  const [problemTypes, setProblemTypes] = useState<string[]>(initialSelectedProblems);
  const [income, setIncome] = useState<string>("4500");
  const [incomeType, setIncomeType] = useState<string>("Salariu");
  const [employmentDuration, setEmploymentDuration] = useState<string>("1–3 ani");
  const [monthlyInstallments, setMonthlyInstallments] = useState<string>("1200");
  const [activeCreditCount, setActiveCreditCount] = useState<string>("1-2 credite");
  const [requestedAmount, setRequestedAmount] = useState<string>("30000");

  const [creditBureauStatus, setCreditBureauStatus] = useState<string>("Am avut întârzieri");
  const [delayPeriod, setDelayPeriod] = useState<string>("");
  const [clientMessage, setClientMessage] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gdpr, setGdpr] = useState<boolean>(true);
  const [marketing, setMarketing] = useState<boolean>(true);

  // UI States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Refs for auto-scroll and focus
  const stepContainerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Sync initial selected problems if passed
  useEffect(() => {
    if (initialSelectedProblems.length > 0) {
      setProblemTypes((prev) => {
        const set = new Set([...prev, ...initialSelectedProblems]);
        return Array.from(set);
      });
    }
  }, [initialSelectedProblems]);

  // Track initial page view event
  useEffect(() => {
    trackEvent("totul_credit_view", { source: "totul_inainte_de_credit_funnel" });
  }, []);

  const toggleProblem = (label: string) => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent("totul_credit_started");
    }

    setProblemTypes((prev) => {
      if (prev.includes(label)) {
        return prev.filter((item) => item !== label);
      } else {
        return [...prev, label];
      }
    });
    if (errors.problemTypes) {
      setErrors((prev) => ({ ...prev, problemTypes: "" }));
    }
  };

  const scrollToStepHeader = () => {
    if (stepContainerRef.current) {
      const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      stepContainerRef.current.scrollIntoView({ behavior: isReduced ? "auto" : "smooth", block: "start" });
    }
  };

  const handleNextStep = (targetStep: number) => {
    // Validation before leaving Step 1
    if (step === 1) {
      if (problemTypes.length === 0) {
        setErrors({ problemTypes: "Alege cel puțin o situație care se potrivește cazului tău." });
        return;
      }
      setErrors({});
      trackEvent("totul_credit_step_1", { problems_count: problemTypes.length });
    }

    // Validation before leaving Step 2
    if (step === 2) {
      const incNum = Number(income);
      if (isNaN(incNum) || incNum < 0) {
        setErrors({ income: "Te rugăm să introduci un venit lunar valid." });
        return;
      }
      setErrors({});
      trackEvent("totul_credit_step_2", { income, incomeType, requestedAmount });
    }

    // Step 3
    if (step === 3) {
      trackEvent("totul_credit_step_3", { creditBureauStatus, delayPeriod });
    }

    // Step 4 -> 5 AUTO SCROLL
    if (step === 4 && targetStep === 5) {
      trackEvent("totul_credit_step_4", { message_length: clientMessage.length });
      trackEvent("totul_credit_contact_started");
      setStep(5);
      
      setTimeout(() => {
        const el = contactRef.current || document.getElementById("contact-step-start");
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
      errs.gdpr = "Acordul cu privire la prelucrarea datelor este obligatoriu.";
    }

    if (!marketing) {
      errs.marketing = "Acordul privind comunicarea este obligatoriu.";
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
      source: "totul-inainte-de-credit",
      leadType: "credit_prequalification",
      problemTypes,
      income: Number(income) || 0,
      incomeType,
      employmentDuration,
      monthlyInstallments: Number(monthlyInstallments) || 0,
      activeCreditCount,
      requestedAmount: Number(requestedAmount) || 0,
      creditBureauStatus,
      delayPeriod: delayPeriod.trim() || "—",
      clientMessage: clientMessage.trim(),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      gdpr: true,
      gdprConsent: true,
      marketing: true,
      marketingConsent: true,
      website: "", // Honeypot
      utmSource: meta.utmSource,
      utmMedium: meta.utmMedium,
      utmCampaign: meta.utmCampaign,
      utmContent: meta.utmContent,
      referrer: meta.referrer,
      pageUrl: typeof window !== "undefined" ? window.location.href : "/totul-inainte-de-credit",
      deviceType: meta.deviceType,
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setSubmitted(true);
        trackEvent("totul_credit_submitted", {
          problem_types_count: problemTypes.length,
          income,
          requestedAmount,
        });
      } else {
        setErrors({
          form: data.message || "A apărut o eroare la trimiterea solicitării. Încearcă din nou.",
        });
      }
    } catch (err) {
      console.error("Funnel submission error:", err);
      setErrors({
        form: "Conexiunea a întâmpinat o problemă. Te rugăm să reîncerci.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    trackEvent("totul_credit_whatsapp", { source: "success_screen" });
    const message = encodeURIComponent(
      `Bună ziua, am trimis datele pe site pentru analiza "Totul înainte de credit". Doresc să discutăm situația mea.`
    );
    window.open(`https://wa.me/${CONTACT.WHATSAPP}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  if (submitted) {
    return (
      <div className="totul-success-card">
        <div className="success-icon-wrap">
          <CheckCircle2 size={56} className="text-emerald-500" />
        </div>
        <h1>Am primit situația ta.</h1>
        <p className="success-subtitle">O analizez înainte să te sun.</p>
        <div className="success-reassurance-box">
          <p>
            În funcție de situația prezentată, îți voi explica ce opțiuni pot exista și care sunt pașii următori.
          </p>
          <p className="highlight-note">
            <strong>Notă importantă:</strong> Nu este nevoie să mai trimiți cereri către mai mulți creditori până când discutăm. Fiecare cerere neanalizată poate afecta scorul de credit.
          </p>
        </div>

        <div className="success-actions">
          <button type="button" onClick={handleWhatsAppClick} className="totul-cta-primary whatsapp-btn">
            <MessageCircle size={20} />
            <span>DISCUTĂ ACUM PE WHATSAPP</span>
          </button>
          <Link href="/" className="totul-cta-secondary">
            ÎNAPOI LA SITE
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div id="funnel-form" ref={stepContainerRef} className="totul-funnel-card">
      {/* Progress Indicator Header */}
      <div className="totul-progress-header">
        <div className="progress-text-row">
          <span className="step-badge">Pasul {step} din 5</span>
          <span className="step-label">
            {step === 1 && "Identificare problemă"}
            {step === 2 && "Profil financiar"}
            {step === 3 && "Biroul de Credit"}
            {step === 4 && "Context personal"}
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

      {/* STEP 1: Problem Categories Multi-Select */}
      {step === 1 && (
        <div className="step-content animate-fade-in">
          <h2 className="step-title">Ce te aduce aici?</h2>
          <p className="step-desc">
            Selectează una sau mai multe situații care descriu cel mai bine prin ce treci în acest moment.
          </p>

          {errors.problemTypes && (
            <p className="inline-error" id="err-problems">
              <AlertCircle size={15} /> {errors.problemTypes}
            </p>
          )}

          <div className="problem-grid-selectable" role="group" aria-label="Selectează situația ta">
            {PROBLEM_CARDS.map((card) => {
              const isSelected = problemTypes.includes(card.label);
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => toggleProblem(card.label)}
                  className={`problem-select-card ${isSelected ? "selected" : ""}`}
                  aria-pressed={isSelected}
                >
                  <div className="card-check-box">
                    {isSelected ? <Check size={16} /> : <div className="dot-unselected" />}
                  </div>
                  <div className="card-text">
                    <span className="card-cat">{card.category}</span>
                    <span className="card-lbl">{card.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="step-footer">
            <button
              type="button"
              onClick={() => handleNextStep(2)}
              className="totul-btn-next"
            >
              <span>Continuă spre pasul 2</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Financial Situation */}
      {step === 2 && (
        <div className="step-content animate-fade-in">
          <h2 className="step-title">Care este situația ta financiară?</h2>
          <p className="step-desc">
            Aceste date sunt confidențiale și mă ajută să evaluez în mod realist capacitatea ta de rambursare.
          </p>

          <div className="fields-grid">
            <div className="field-group">
              <label htmlFor="totul-income">Venit lunar net (RON)</label>
              <input
                id="totul-income"
                type="number"
                min="0"
                step="500"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="ex: 4500"
                aria-invalid={!!errors.income}
              />
              {errors.income && <p className="inline-error"><AlertCircle size={14} /> {errors.income}</p>}
            </div>

            <div className="field-group">
              <label htmlFor="totul-income-type">Tip venit</label>
              <select
                id="totul-income-type"
                value={incomeType}
                onChange={(e) => setIncomeType(e.target.value)}
              >
                <option value="Salariu">Salariu (Contract pe perioadă nedeterminată)</option>
                <option value="Salariu determinat">Salariu (Contract pe perioadă determinată)</option>
                <option value="Pensie">Pensie</option>
                <option value="PFA / Dividende">PFA / Dividende / SRL</option>
                <option value="Chirii / Drepturi autor">Chirii / Drepturi de autor</option>
                <option value="Altele">Alte venituri</option>
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="totul-employment">Vechime la actualul loc de muncă</label>
              <select
                id="totul-employment"
                value={employmentDuration}
                onChange={(e) => setEmploymentDuration(e.target.value)}
              >
                <option value="Sub 3 luni">Sub 3 luni</option>
                <option value="3–12 luni">3–12 luni</option>
                <option value="1–3 ani">1–3 ani</option>
                <option value="Peste 3 ani">Peste 3 ani</option>
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="totul-installments">Rate lunare actuale total (RON)</label>
              <input
                id="totul-installments"
                type="number"
                min="0"
                step="100"
                value={monthlyInstallments}
                onChange={(e) => setMonthlyInstallments(e.target.value)}
                placeholder="ex: 1200"
              />
            </div>

            <div className="field-group">
              <label htmlFor="totul-credits-count">Număr credite / IFN-uri active</label>
              <select
                id="totul-credits-count"
                value={activeCreditCount}
                onChange={(e) => setActiveCreditCount(e.target.value)}
              >
                <option value="Nu am">Nu am nicio rată în prezent</option>
                <option value="1 credit">1 credit</option>
                <option value="2-3 credite">2–3 credite/IFN-uri</option>
                <option value="4+ credite">4 sau mai multe credite/IFN-uri</option>
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="totul-amount">Suma aproximativă de care ai nevoie (RON)</label>
              <input
                id="totul-amount"
                type="number"
                min="0"
                step="1000"
                value={requestedAmount}
                onChange={(e) => setRequestedAmount(e.target.value)}
                placeholder="ex: 30000"
              />
            </div>
          </div>

          <div className="step-footer nav-between">
            <button type="button" onClick={handlePrevStep} className="totul-btn-back">
              <ArrowLeft size={18} />
              <span>Înapoi</span>
            </button>
            <button type="button" onClick={() => handleNextStep(3)} className="totul-btn-next">
              <span>Continuă spre pasul 3</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Credit Bureau Status */}
      {step === 3 && (
        <div className="step-content animate-fade-in">
          <h2 className="step-title">Ce se întâmplă în Biroul de Credit?</h2>
          <p className="step-desc">
            Selectează opțiunea care descrie cel mai bine raportările sau istoricul tău.
          </p>

          <div className="radio-options-list" role="radiogroup" aria-label="Status Birou de Credit">
            {[
              "Nu știu exact",
              "Istoric bun",
              "Am avut întârzieri",
              "Am întârzieri active",
              "Am credite restante",
              "Am fost raportat",
              "Am fost refuzat din cauza istoricului",
              "Prefer să explic situația",
            ].map((opt) => (
              <label key={opt} className={`radio-card ${creditBureauStatus === opt ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="bureau-status"
                  value={opt}
                  checked={creditBureauStatus === opt}
                  onChange={(e) => setCreditBureauStatus(e.target.value)}
                />
                <span className="radio-custom-dot" />
                <span className="radio-text">{opt}</span>
              </label>
            ))}
          </div>

          <div className="field-group delay-period-field" style={{ marginTop: "24px" }}>
            <label htmlFor="totul-delay-period">
              Dacă ai avut sau ai întârzieri, aproximativ când au apărut? (Opțional)
            </label>
            <input
              id="totul-delay-period"
              type="text"
              value={delayPeriod}
              onChange={(e) => setDelayPeriod(e.target.value)}
              placeholder="ex: În ultimele 6 luni, acum 2 ani, sau nu știu exact"
            />
          </div>

          <div className="step-footer nav-between">
            <button type="button" onClick={handlePrevStep} className="totul-btn-back">
              <ArrowLeft size={18} />
              <span>Înapoi</span>
            </button>
            <button type="button" onClick={() => handleNextStep(4)} className="totul-btn-next">
              <span>Continuă spre pasul 4</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Narrative Context */}
      {step === 4 && (
        <div className="step-content animate-fade-in">
          <h2 className="step-title">Spune-mi pe scurt ce s-a întâmplat.</h2>
          <p className="step-desc">
            Oferă-mi câteva detalii utile: de ce ai fost refuzat, ce credite ai vrut să refinanțezi sau orice alt context.
          </p>

          <div className="field-group">
            <label htmlFor="totul-message">Detalierea situației tale (opțional)</label>
            <textarea
              id="totul-message"
              rows={5}
              value={clientMessage}
              onChange={(e) => setClientMessage(e.target.value)}
              placeholder="De exemplu: am avut două întârzieri acum 1 an din cauze medicale, le-am achitat integral, iar recent am fost refuzat de bancă când am cerut un credit de refinanțare..."
            />
          </div>

          <div className="step-footer nav-between">
            <button type="button" onClick={handlePrevStep} className="totul-btn-back">
              <ArrowLeft size={18} />
              <span>Înapoi</span>
            </button>
            <button
              type="button"
              onClick={() => handleNextStep(5)}
              className="totul-btn-next highlight-step-btn"
            >
              <span>Mergi la pasul de Contact</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Contact Details (Target for auto-scroll) */}
      {step === 5 && (
        <form
          ref={contactRef}
          id="contact-step-start"
          onSubmit={handleSubmit}
          className="step-content animate-fade-in contact-step-form"
          noValidate
        >
          <div className="contact-step-header">
            <h2 className="step-title">Aproape gata.</h2>
            <p className="step-desc">
              Spune-mi cum pot reveni la tine cu rezultatul analizei.
            </p>
          </div>

          <div className="fields-stack">
            <div className="field-group">
              <label htmlFor="totul-name">
                Nume complet <span className="req">*</span>
              </label>
              <input
                ref={nameInputRef}
                id="totul-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Numele și prenumele tău"
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "err-name" : undefined}
                required
              />
              {errors.name && (
                <p className="inline-error" id="err-name">
                  <AlertCircle size={14} /> {errors.name}
                </p>
              )}
            </div>

            <div className="field-group">
              <label htmlFor="totul-phone">
                Număr de telefon <span className="req">*</span>
              </label>
              <input
                id="totul-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="ex: 0722123456"
                aria-required="true"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "err-phone" : undefined}
                required
              />
              {errors.phone && (
                <p className="inline-error" id="err-phone">
                  <AlertCircle size={14} /> {errors.phone}
                </p>
              )}
            </div>

            <div className="field-group">
              <label htmlFor="totul-email">
                Adresă de email <span className="opt-tag">(opțional)</span>
              </label>
              <input
                id="totul-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemplu.ro"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "err-email" : undefined}
              />
              {errors.email && (
                <p className="inline-error" id="err-email">
                  <AlertCircle size={14} /> {errors.email}
                </p>
              )}
            </div>

            {/* Checkboxes */}
            <div className="checkboxes-group" style={{ marginTop: "12px" }}>
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={gdpr}
                  onChange={(e) => setGdpr(e.target.checked)}
                  required
                />
                <span className="checkbox-label">
                  Sunt de acord cu prelucrarea datelor cu caracter personal conform{" "}
                  <Link href="/politica-confidentialitate" target="_blank">
                    Politicii de Confidențialitate
                  </Link>{" "}
                  și{" "}
                  <Link href="/termeni-si-conditii" target="_blank">
                    Termenilor și Condițiilor
                  </Link>
                  .
                </span>
              </label>
              {errors.gdpr && <p className="inline-error"><AlertCircle size={14} /> {errors.gdpr}</p>}

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  required
                />
                <span className="checkbox-label">
                  Sunt de acord să fiu contactat telefonic sau prin mesaje pentru prezentarea opțiunilor financiare eligibile.
                </span>
              </label>
              {errors.marketing && <p className="inline-error"><AlertCircle size={14} /> {errors.marketing}</p>}
            </div>

            <div className="submit-section" style={{ marginTop: "24px" }}>
              <button
                type="submit"
                disabled={submitting}
                className="totul-submit-btn"
              >
                {submitting ? (
                  <span>SE PROCESEAZĂ...</span>
                ) : (
                  <>
                    <span>VREAU SĂ-MI VERIFIC SITUAȚIA</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              <p className="submit-disclaimer-note">
                <Lock size={14} className="inline-icon" /> Dupǎ ce primesc informațiile, analizez situația și revin personal cu telefonul.
              </p>
            </div>

            <div className="step-footer" style={{ marginTop: "16px", paddingTop: "0", borderTop: "none" }}>
              <button type="button" onClick={handlePrevStep} className="totul-btn-back">
                <ArrowLeft size={18} />
                <span>Înapoi la pasul 4</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
