"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ChevronDown,
  Lock,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { trackEvent, getTrafficMetadata } from "@/lib/analytics";
import CVFinanceHero from "@/components/CVFinanceHero";
import CommandSheet from "@/components/CommandSheet";
import FinancialIntelligence from "@/components/FinancialIntelligence";
import TotulInainteDeCreditFunnel from "@/components/TotulInainteDeCreditFunnel";
import BusinessFinanceFunnel from "@/components/BusinessFinanceFunnel";
import { CONTACT } from "@/lib/constants";

const servicesList = [
  {
    code: "01",
    title: "CONSULTANȚĂ DE CREDIT",
    desc: "Analizăm opțiunile disponibile pentru obținerea unui credit nou adaptat nevoilor tale.",
  },
  {
    code: "02",
    title: "ANALIZĂ FINANCIARĂ",
    desc: "Verificăm situația din Biroul de Credit și identificăm posibilitățile legale de corectare.",
  },
  {
    code: "03",
    title: "FINANȚARE BUSINESS",
    desc: "Soluții de finanțare pentru firme: capital de lucru, cash-flow, echipamente și investiții.",
  },
  {
    code: "04",
    title: "REFINANȚARE",
    desc: "Comasăm creditele existente într-o singură rată lunară mult mai ușor de susținut.",
  },
  {
    code: "05",
    title: "ACHIZIȚIE LOCUINȚĂ",
    desc: "Ghidaj complet pentru credite ipotecare și identificarea celor mai mici dobânzi.",
  },
  {
    code: "06",
    title: "OPTIMIZARE FINANCIARĂ",
    desc: "Identificăm rapid soluțiile optime de reducere a costurilor și negociem direct cu banca.",
  },
];

const loanTypesList = [
  {
    code: "01",
    title: "CREDIT IPOTECAR",
    desc: "Pentru achiziția unei locuințe sau a unui teren, cu dobânzi fixe sau variabile negociate.",
  },
  {
    code: "02",
    title: "CREDIT DE NEVOI PERSONALE",
    desc: "Pentru proiectele și nevoile tale neprevăzute, fără justificarea utilizării fondurilor.",
  },
  {
    code: "03",
    title: "REFINANȚARE",
    desc: "Pentru reorganizarea finanțării existente și obținerea unei rate lunare considerabil reduse.",
  },
  {
    code: "04",
    title: "CREDIT BUSINESS",
    desc: "Pentru capital de lucru, linii de credit și optimizarea fluxului de numerar al firmei.",
  },
  {
    code: "05",
    title: "CREDIT INVESTIȚII",
    desc: "Pentru proiecte de extindere, achiziție de spații comerciale sau echipamente de producție.",
  },
  {
    code: "06",
    title: "SOLUȚII PERSONALIZATE",
    desc: "Pentru situații speciale care necesită o structurare financiară atipică sau negociere directă.",
  },
];

const diagnosticRows = [
  { code: "01", name: "Biroul de Credit", desc: "Verificarea raportărilor și incidentelor înregistrate în baza de date." },
  { code: "02", name: "Istoricul întârzierilor", desc: "Analiza numărului de zile de întârziere la plată și recurența lor." },
  { code: "03", name: "Creditele și IFN-urile", desc: "Identificarea creditelor active nebancare cu costuri mari de rambursare." },
  { code: "04", name: "Nivelul actual al ratelor", desc: "Calculul sumelor totale de plată în fiecare lună către toți creditorii." },
  { code: "05", name: "Veniturile declarate", desc: "Confirmarea veniturilor raportate la ANAF sau a altor surse de venit eligibile." },
  { code: "06", name: "Necesarul de finanțare", desc: "Determinarea sumei minime necesare pentru stingerea debitelor sau achiziție." },
  { code: "07", name: "Variantele eligibile", desc: "Selectarea ofertelor bancare compatibile cu profilul rezultat în urma analizei." },
];

const personalEduQuestions = [
  {
    q: "Ce înseamnă o problemă în Biroul de Credit?",
    a: "Înregistrările negative apar atunci când au existat întârzieri la plata ratelor. Ele pot influența scorul FICO, însă existența lor nu înseamnă automat că nu poți obține finanțare.",
  },
  {
    q: "Se poate corecta o informație din Biroul de Credit?",
    a: "Dacă datele raportate de bancă sau IFN sunt eronate sau inexacte, acestea pot fi contestate și rectificate conform procedurilor legale.",
  },
  {
    q: "Ce faci dacă ai fost refuzat de bancă?",
    a: "Fiecare bancă are criterii proprii de risc. Un refuz la o bancă nu înseamnă că toate băncile te vor respinge. Analizăm motivul exact și căutăm instituția compatibilă.",
  },
  {
    q: "Ce opțiuni există după un refuz?",
    a: "Se poate opta pentru refinanțare, aducerea unui co-plătitor, schimbarea tipului de credit sau refacerea profilului financiar înainte de o nouă aplicare.",
  },
  {
    q: "Pot refinanța dacă am întârzieri la rate?",
    a: "Da, există soluții de consolidare create special pentru a scădea presiunea lunară și a comasa datoriile într-o rată unică sustenabilă.",
  },
  {
    q: "Pot obține credit după un istoric negativ?",
    a: "În funcție de vechimea întârzierilor și stadiul actual al veniturilor, se pot identifica bănci partenere cu politici mai flexibile.",
  },
  {
    q: "Ce trebuie să știu despre creditele IFN?",
    a: "IFN-urile au de regulă dobânzi mai mari. Recomandarea este refinanțarea rapidă a creditelor IFN printr-un credit bancar cu dobândă normală.",
  },
  {
    q: "De ce nu este bine să aplic la întâmplare la mai multe bănci?",
    a: "Fiecare interogare repetată scade scorul FICO. Este esențial să aplici doar acolo unde ai șanse maxime de aprobare din prima încercare.",
  },
];

const faqs = [
  [
    "Analiza inițială este cu adevărat gratuită?",
    "Da. Analiza inițială a situației tale și verificarea opțiunilor disponibile sunt 100% gratuite și nu implică nicio obligație.",
  ],
  [
    "În cât timp primesc un răspuns?",
    "După trimiterea datelor, analizez situația și revin telefonic în 24-48 de ore lucrătoare cu opțiunile concrete.",
  ],
  [
    "Care este diferența față de a merge direct la bancă?",
    "Banca îți oferă doar propriul produs. Eu analizez piața în ansamblu, compar toate ofertele și discut cu banca în interesul tău.",
  ],
  [
    "Pot refinanța dacă am întârzieri?",
    "Da. Refinanțarea este concepută special pentru a reduce presiunea ratelor și a reorganiza datoriile existente.",
  ],
  [
    "Verificarea îmi afectează scorul FICO?",
    "Nu. Discuția inițială și analiza noastră nu reprezintă o aplicare oficială la bancă, deci scorul FICO rămâne neatins.",
  ],
  [
    "Ce înseamnă analiza eligibilității?",
    "Verificăm gradul de îndatorare, istoricul de credit și veniturile pentru a stabili exact ce sumă poți obține.",
  ],
];

const ecosystemLinks = [
  { name: "AiX Media", desc: "Digital Media & Strategy", href: "https://aixmedia.cristianvaduva.com/" },
  { name: "AiX OS", desc: "Operating System & Systems", href: "https://os.cristianvaduva.com/" },
  { name: "Health", desc: "Health Education Platform", href: "https://health.cristianvaduva.com/" },
  { name: "Subventii", desc: "Non-reimbursable Business Funds", href: "https://subventii.cristianvaduva.com/" },
  { name: "Home Find", desc: "Real Estate Matching Platform", href: "https://homefind.cristianvaduva.com/" },
  { name: "CV Finance / Credite", desc: "Credit Advisory & Financial Optimization", href: "https://credite.cristianvaduva.com/" },
  { name: "Insurance", desc: "Financial Protection Advisory", href: "https://insurance.cristianvaduva.com/" },
  { name: "Cristian Văduva", desc: "Advisory & Financial Optimization", href: "https://cristianvaduva.com/" },
  { name: "AiX Luxury", desc: "Real Estate & Luxury Advisory", href: "https://aixluxury.com/" },
  { name: "Market Pulse", desc: "Macroeconomic & Real Estate Intelligence", href: "https://cristianvaduva.com/market-pulse" },
];

export default function Home() {
  const router = useRouter();

  // Interactive Calculator State
  const [calcAmount, setCalcAmount] = useState(85000);
  const [calcPayment, setCalcPayment] = useState(2200);
  const [calcIncome, setCalcIncome] = useState(4500);
  const [calcRate, setCalcRate] = useState(12.5);

  // Accordion States
  const [openEduIndex, setOpenEduIndex] = useState<number | null>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form State for Main Lead Qualification
  const [formStep, setFormStep] = useState<1 | 2 | 3>(1);
  const [formError, setFormError] = useState("");
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const [purpose, setPurpose] = useState("Reduc rata");
  const [desiredAmount, setDesiredAmount] = useState("85000");
  const [income, setIncome] = useState("");
  const [employment, setEmployment] = useState("1–3 ani");
  const [creditTypes, setCreditTypes] = useState<string[]>(["Bancă"]);
  const [monthlyPayment, setMonthlyPayment] = useState("1200");
  const [delays, setDelays] = useState("Nu am avut întârzieri");
  const [creditBureau, setCreditBureau] = useState("Curat");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthYear, setBirthYear] = useState("1990");
  const [messageText, setMessageText] = useState("");
  const [gdpr, setGdpr] = useState(true);
  const [marketing, setMarketing] = useState(true);
  const [honeypot, setHoneypot] = useState("");

  const [footerYear, setFooterYear] = useState(2026);
  useEffect(() => { setFooterYear(new Date().getFullYear()); }, []);

  // Listen to custom intent selection from header or command sheet
  useEffect(() => {
    const handleIntent = (e: Event) => {
      const customEv = e as CustomEvent;
      if (customEv.detail && customEv.detail.preselectValue) {
        setPurpose(customEv.detail.preselectValue);
      }
    };
    window.addEventListener("cv_intent_select", handleIntent);
    return () => window.removeEventListener("cv_intent_select", handleIntent);
  }, []);

  // Track page view
  useEffect(() => {
    trackEvent("page_view", getTrafficMetadata());
  }, []);

  // Calculations for calculator
  const estimatedNewPayment = Math.max(
    0,
    Math.round(calcPayment * (1 - Math.min(0.36, Math.max(0.08, (calcRate - 6.5) / 22))))
  );
  const monthlySaving = Math.max(0, calcPayment - estimatedNewPayment);
  const annualSaving = monthlySaving * 12;
  const extraCashPossibility = Math.max(0, Math.round(calcIncome * 0.4 * 60 - calcAmount));

  const parseIncomeValue = (val: string | number): number => {
    if (typeof val === "number") return val;
    if (!val) return 0;
    const cleanStr = String(val).replace(/\./g, "");
    const match = cleanStr.match(/\d+/);
    return match ? Number(match[0]) : 0;
  };

  const handleNextStep1 = () => {
    setFormError("");
    if (!purpose) {
      setFormError("Te rugăm să selectezi opțiunea dorită.");
      return;
    }
    const numAmount = Number(desiredAmount);
    if (!desiredAmount || isNaN(numAmount) || numAmount < 1000) {
      setFormError("Te rugăm să introduci o sumă dorită validă (minim 1.000 RON).");
      return;
    }
    trackEvent("form_step_1_complete", { purpose, desiredAmount });
    setFormStep(2);
  };

  const handleNextStep2 = () => {
    setFormError("");
    const numIncome = parseIncomeValue(income);
    if (!income || isNaN(numIncome) || numIncome < 500) {
      setFormError("Te rugăm să introduci venitul lunar net (minim 500 RON).");
      return;
    }
    if (!employment) {
      setFormError("Te rugăm să selectezi vechimea la locul de muncă.");
      return;
    }
    trackEvent("form_step_2_complete", { income, employment });
    setFormStep(3);
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim() || name.trim().length < 2) {
      setFormError("Te rugăm să introduci numele complet (minimum 2 caractere).");
      setFormState("error");
      return;
    }

    const cleanPhone = phone.replace(/\s+/g, "");
    if (!cleanPhone || !/^(?:\+40|0040|0)7\d{8}$/.test(cleanPhone)) {
      setFormError("Te rugăm să introduci un număr de telefon valid din România (ex: 0722123456).");
      setFormState("error");
      return;
    }

    if (email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        setFormError("Adresa de email nu are un format valid.");
        setFormState("error");
        return;
      }
    }

    if (!gdpr) {
      setFormError("Trebuie să accepți politica de confidențialitate.");
      setFormState("error");
      return;
    }

    const trafficMeta = typeof window !== "undefined" ? getTrafficMetadata() : {};
    const numericIncome = parseIncomeValue(income) || 4500;

    const payload = {
      purpose,
      desiredAmount: Number(desiredAmount) || 85000,
      income: numericIncome,
      employment: employment || "1–3 ani",
      creditTypes: creditTypes.length > 0 ? creditTypes : ["Bancă"],
      monthlyPayment: Number(monthlyPayment) || 0,
      delays: delays || "Nu",
      creditBureau: creditBureau || "Nu știu",
      name: name.trim(),
      phone: cleanPhone,
      email: email.trim() || undefined,
      birthYear: Number(birthYear) || 1990,
      message: messageText.trim(),
      gdpr: true,
      gdprConsent: true,
      marketing: Boolean(marketing),
      marketingConsent: Boolean(marketing),
      website: honeypot || "",
      ...trafficMeta,
      pageUrl: typeof window !== "undefined" ? window.location.href : "https://credite.cristianvaduva.com",
    };

    setFormState("submitting");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        setFormError(result.message || "Solicitarea nu a putut fi trimisă. Încearcă din nou.");
        setFormState("error");
        return;
      }
      trackEvent("lead_success", { purpose, desiredAmount });
      setFormState("success");
    } catch (err) {
      setFormError("Conexiunea a fost întreruptă. Încearcă din nou.");
      setFormState("error");
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "CV Finance",
        url: "https://credite.cristianvaduva.com",
        description: "Consultant financiar autorizat și consultanță financiară independentă în România.",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: CONTACT.PHONE,
          contactType: "customer service",
          areaServed: "RO",
          availableLanguage: "Romanian",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://smart-credit.ro/#organization",
        name: "Smart Credit România",
        url: "https://smart-credit.ro/",
      },
      {
        "@type": "FinancialService",
        name: "CV Finance",
        description: "Consultanță și intermediere financiară pentru refinanțare credite și finanțare business.",
        priceRange: "0 RON (Analiză Gratuită)",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(([name, text]) => ({
          "@type": "Question",
          name,
          acceptedAnswer: { "@type": "Answer", text },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        {/* 08 — HERO */}
        <CVFinanceHero />

        {/* 09 — CORE PROMISE */}
        <section className="cv-promise-section">
          <div className="cv-container">
            <h2 className="cv-promise-headline">
              <span className="cv-promise-line-muted">TU ÎMI SPUI SITUAȚIA.</span><br />
              <span className="cv-promise-line-dark">EU MĂ UIT LA CIFRE.</span><br />
              <span className="cv-promise-line-emerald">ÎȚI SPUN CE SE POATE FACE.</span><br />
              <span className="cv-promise-line-bold">APOI VORBESC CU BANCA.</span>
            </h2>
          </div>
        </section>

        {/* PARTENERIAT STRATEGIC SMART CREDIT */}
        <section id="parteneriat-smart-credit" className="cv-partner-section">
          <div className="cv-container">
            <div className="cv-partner-card">
              <span className="cv-partner-badge">PARTENERIAT STRATEGIC</span>
              <h2 className="cv-partner-title">CV Finance × Smart Credit România</h2>
              <p className="cv-partner-text">
                CV Finance colaborează exclusiv cu Smart Credit România pentru intermedierea creditelor bancare și refinanțare. Oferim consultanță financiară dedicată și acces la soluțiile optime de creditare negociate direct cu instituțiile partenere.
              </p>
              <a
                href="https://smart-credit.ro/"
                target="_blank"
                rel="noopener noreferrer"
                className="cv-partner-cta"
                aria-label="Descoperă Smart Credit România - deschide site-ul oficial într-o filă nouă"
              >
                DESCOPERĂ SMART CREDIT →
              </a>
            </div>
          </div>
        </section>

        {/* 10 — 01 / DE UNDE ÎNCEPEM */}
        <CommandSheet />

        {/* 11 — 02 / CUM FUNCȚIONEAZĂ */}
        <section className="cv-section" id="cum-functioneaza">
          <div className="cv-container">
            <span className="cv-section-marker">02 / CUM FUNCȚIONEAZĂ</span>
            
            <div style={{ marginBottom: "2.5rem" }}>
              <h2 className="cv-section-title" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.15, marginBottom: "1rem", letterSpacing: "-0.025em" }}>
                NU TREBUIE SĂ ȘTII TU<br />
                <span style={{ color: "#087F5B" }}>CE BANCĂ ESTE POTRIVITĂ.</span>
              </h2>
              <p className="cv-section-sub" style={{ fontSize: "1.15rem", color: "var(--text-secondary)", maxWidth: "680px" }}>
                Trebuie doar să-mi spui ce vrei să faci.
              </p>
            </div>

            {/* CORE PROMISE EDITORIAL BANNER */}
            <div className="cv-promise-banner" style={{
              padding: "1.75rem 0",
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
              marginBottom: "3.5rem",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "1.25rem"
            }}>
              <div>
                <span style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "#087F5B",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "0.35rem"
                }}>
                  PRINCIPIU
                </span>
                <span style={{
                  fontFamily: "var(--font-sans, 'Inter', sans-serif)",
                  fontSize: "clamp(1.25rem, 2.8vw, 1.6rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)"
                }}>
                  EU TE SUN. <span style={{ color: "#087F5B" }}>BANCA NU.</span>
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "0.98rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                 Tu îmi spui ce vrei să faci. Eu mă ocup de restul.
               </p>
            </div>
            
            {/* 4-STEP EDITORIAL PROCESS */}
            <div className="cv-process-grid">
              <div className="cv-process-item active">
                <span className="cv-process-num">01</span>
                <h3 className="cv-process-title">TU VORBEȘTI CU MINE.</h3>
                <p className="cv-process-desc">&bdquo;Îmi spui ce vrei să faci și care este situația ta actuală.&rdquo;</p>
              </div>
              <div className="cv-process-item">
                <span className="cv-process-num">02</span>
                <h3 className="cv-process-title">EU ANALIZEZ SITUAȚIA.</h3>
                <p className="cv-process-desc">&bdquo;Mă uit la venituri, obligații, istoricul de credit și obiectiv.&rdquo;</p>
              </div>
              <div className="cv-process-item">
                <span className="cv-process-num">03</span>
                <h3 className="cv-process-title">EU DISCUT CU BANCA.</h3>
                <p className="cv-process-desc">&bdquo;Caut varianta potrivită și negociez condițiile în locul tău.&rdquo;</p>
              </div>
              <div className="cv-process-item">
                <span className="cv-process-num">04</span>
                <h3 className="cv-process-title">TU PRIMEȘTI RĂSPUNSUL.</h3>
                <p className="cv-process-desc">&bdquo;Știi exact unde te încadrezi și ce opțiuni ai fără drumuri inutile.&rdquo;</p>
              </div>
            </div>
          </div>
        </section>

        {/* 12 — 03 / PERSONAL FINANCE CHAPTER */}
        <section className="cv-section" id="totul-inainte-de-credit">
          <div className="cv-container">
            <span className="cv-section-marker">03 / PERSONAL FINANCE</span>
            
            {/* MODULE A — INTRO */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" style={{ marginBottom: "5rem" }}>
              <div className="lg:col-span-5">
                <h2 className="cv-section-title" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", marginBottom: "1.25rem" }}>
                  HAI SĂ VEDEM<br />
                  CE POȚI OBȚINE.
                </h2>
                <p className="cv-section-sub">
                  Fiecare profil financiar este diferit. Analizăm în detaliu posibilitățile reale de finanțare înainte de a înainta vreun dosar.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div style={{ borderTop: "2px solid var(--border)", paddingTop: "1.25rem" }}>
                  <span className="cv-mono" style={{ color: "#087F5B", fontWeight: 700, fontSize: "0.85rem" }}>01</span>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0.5rem 0 0.25rem" }}>Îți analizez situația</h3>
                  <p style={{ fontSize: "0.9rem", color: "#5F6368", lineHeight: "1.45" }}>Verificăm posibilitățile de încadrare și gradul de îndatorare.</p>
                </div>
                <div style={{ borderTop: "2px solid var(--border)", paddingTop: "1.25rem" }}>
                  <span className="cv-mono" style={{ color: "#087F5B", fontWeight: 700, fontSize: "0.85rem" }}>02</span>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0.5rem 0 0.25rem" }}>Îți arăt opțiunile</h3>
                  <p style={{ fontSize: "0.9rem", color: "#5F6368", lineHeight: "1.45" }}>Comparăm produsele bancare disponibile și structura ratelor.</p>
                </div>
                <div style={{ borderTop: "2px solid var(--border)", paddingTop: "1.25rem" }}>
                  <span className="cv-mono" style={{ color: "#087F5B", fontWeight: 700, fontSize: "0.85rem" }}>03</span>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0.5rem 0 0.25rem" }}>Discut cu banca</h3>
                  <p style={{ fontSize: "0.9rem", color: "#5F6368", lineHeight: "1.45" }}>Preluăm comunicarea și susținerea dosarului în fața creditorului.</p>
                </div>
              </div>
            </div>

            {/* MODULE B — DIAGNOSTIC */}
            <div style={{ marginBottom: "5rem" }}>
              <h3 className="cv-section-title" style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
                CE VERIFIC ÎNAINTE SĂ TE SUN?
              </h3>
              <div className="cv-diag-table">
                {diagnosticRows.map((row) => (
                  <div key={row.code} className="cv-diag-row">
                    <span className="cv-diag-code">{row.code}</span>
                    <span className="cv-diag-name">{row.name}</span>
                    <span className="cv-diag-desc">{row.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* MODULE C — EDUCATIONAL GUIDE */}
            <div style={{ marginBottom: "5rem" }}>
              <h3 className="cv-section-title" style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
                ÎNAINTE SĂ APLICI, TREBUIE SĂ ȘTII
              </h3>
              <div className="cv-accordion-list">
                {personalEduQuestions.map((item, idx) => {
                  const isOpen = openEduIndex === idx;
                  const numStr = String(idx + 1).padStart(2, "0");
                  return (
                    <div key={idx} className="cv-accordion-item">
                      <button
                        className="cv-accordion-trigger"
                        onClick={() => setOpenEduIndex(isOpen ? null : idx)}
                        style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                          <span className="cv-mono" style={{ fontSize: "0.85rem", color: "#087F5B", fontWeight: 700 }}>{numStr}</span>
                          <span style={{ fontWeight: 600 }}>{item.q}</span>
                        </div>
                        <span className="cv-mono" style={{ fontSize: "1.25rem", fontWeight: 500, color: "#5F6368" }}>
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="cv-accordion-content" style={{ paddingLeft: "3.25rem" }}>
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MODULE D — PERSONAL FUNNEL INTEGRATION */}
            <TotulInainteDeCreditFunnel />
          </div>
        </section>

        {/* 13 — 04 / BUSINESS FINANCE CHAPTER */}
        <section className="cv-section" id="business-finance" style={{ backgroundColor: "#F7F9F8" }}>
          <div className="cv-container">
            <span className="cv-section-marker">04 / BUSINESS FINANCE</span>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" style={{ marginBottom: "4rem" }}>
              <div className="lg:col-span-6">
                <h2 className="cv-section-title" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", marginBottom: "1.25rem" }}>
                  AI O FIRMĂ?<br />
                  HAI SĂ VEDEM CUM O PUTEM FINANȚA.
                </h2>
                <p className="cv-section-sub" style={{ marginBottom: "2rem" }}>
                  Soluții de finanțare pentru companii (SRL, PFA). Analizăm bilanțul, rulajul și obiectivul de dezvoltare pentru a obține capitalul necesar.
                </p>
                <a
                  href="#verificare-finantare-business"
                  className="cv-btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("verificare-finantare-business")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  VERIFICĂ FINANȚAREA →
                </a>
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "2rem 0" }}>
                <div>
                  <span className="cv-mono" style={{ color: "#087F5B", fontWeight: 700, fontSize: "0.85rem", display: "block", marginBottom: "0.5rem" }}>01 / CAPITAL DE LUCRU</span>
                  <h3 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.25rem" }}>CAPITAL DE LUCRU</h3>
                  <p style={{ fontSize: "0.88rem", color: "#5F6368", lineHeight: "1.4" }}>Cash-flow, stocuri, materii prime sau furnizori.</p>
                </div>
                <div>
                  <span className="cv-mono" style={{ color: "#087F5B", fontWeight: 700, fontSize: "0.85rem", display: "block", marginBottom: "0.5rem" }}>02 / ECHIPAMENTE</span>
                  <h3 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.25rem" }}>ECHIPAMENTE</h3>
                  <p style={{ fontSize: "0.88rem", color: "#5F6368", lineHeight: "1.4" }}>Utilaje industriale, flote auto, echipamente IT sau medicale.</p>
                </div>
                <div>
                  <span className="cv-mono" style={{ color: "#087F5B", fontWeight: 700, fontSize: "0.85rem", display: "block", marginBottom: "0.5rem" }}>03 / INVESTIȚII</span>
                  <h3 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.25rem" }}>INVESTIȚII</h3>
                  <p style={{ fontSize: "0.88rem", color: "#5F6368", lineHeight: "1.4" }}>Spații comerciale, hale de producție sau clădiri de birouri.</p>
                </div>
                <div>
                  <span className="cv-mono" style={{ color: "#087F5B", fontWeight: 700, fontSize: "0.85rem", display: "block", marginBottom: "0.5rem" }}>04 / DEZVOLTARE</span>
                  <h3 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.25rem" }}>DEZVOLTARE AFACERE</h3>
                  <p style={{ fontSize: "0.88rem", color: "#5F6368", lineHeight: "1.4" }}>Extinderea punctelor de lucru, fuziuni sau proiecte noi de amploare.</p>
                </div>
              </div>
            </div>

            {/* SEPARATE BUSINESS QUALIFICATION FUNNEL */}
            <div id="verificare-finantare-business">
              <BusinessFinanceFunnel />
            </div>
          </div>
        </section>

        {/* 14 — 05 / SERVICII DIRECTORY */}
        <section className="cv-section" id="servicii">
          <div className="cv-container">
            <span className="cv-section-marker">05 / SERVICII</span>
            <div className="cv-section-header">
              <h2 className="cv-section-title">SERVICII FINANCIARE</h2>
              <p className="cv-section-sub">Consultanță financiară specializată, structurată pe obiective clare.</p>
            </div>

            <div className="cv-directory-list">
              {servicesList.map((svc) => (
                <div key={svc.code} className="cv-dir-row">
                  <span className="cv-dir-code">{svc.code}</span>
                  <span className="cv-dir-title">{svc.title}</span>
                  <span className="cv-dir-desc">{svc.desc}</span>
                  <ArrowRight size={18} className="cv-dir-arrow" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 15 — 06 / TIPURI DE CREDITE */}
        <section className="cv-section" id="tipuri-credite">
          <div className="cv-container">
            <span className="cv-section-marker">06 / TIPURI DE CREDITE</span>
            <div className="cv-section-header">
              <h2 className="cv-section-title">SOLUȚII ADAPTATE SITUAȚIEI TALE</h2>
              <p className="cv-section-sub">Structurăm soluția potrivită în funcție de destinația fondurilor.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
              {loanTypesList.map((item) => (
                <div key={item.code} style={{ borderTop: "2px solid #E4E8E6", paddingTop: "1.25rem" }}>
                  <span className="cv-mono" style={{ color: "#087F5B", fontWeight: 700, fontSize: "0.85rem" }}>{item.code}</span>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0.5rem 0" }}>{item.title}</h3>
                  <p style={{ fontSize: "0.92rem", color: "#5F6368" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 16 — 07 / CALCULATOR FINANCIAL INSTRUMENT */}
        <section className="cv-section" id="calculator">
          <div className="cv-container">
            <span className="cv-section-marker">07 / CALCULATOR</span>
            <div className="cv-section-header">
              <h2 className="cv-section-title">ESTIMEAZĂ ECONOMIA SAU FINANȚAREA POSIBILĂ</h2>
              <p className="cv-section-sub">Află cât poți economisi lunar sau ce sumă suplimentară poți obține prin optimizare.</p>
            </div>

            <div className="cv-calc-grid">
              <div className="cv-calc-inputs">
                <div className="cv-calc-field">
                  <div className="cv-calc-label">
                    <span>Sold credit / Sumă dorită</span>
                    <span className="cv-calc-val-badge">{calcAmount.toLocaleString("ro-RO")} RON</span>
                  </div>
                  <input
                      type="range"
                      id="calcAmountRangePage"
                      aria-label="Credit amount range"
                      min="10000"
                      max="500000"
                      step="5000"
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(Number(e.target.value))}
                      className="cv-calc-range"
                    />
                </div>

                <div className="cv-calc-field">
                  <div className="cv-calc-label">
                    <span>Rată actuală lunară</span>
                    <span className="cv-calc-val-badge">{calcPayment.toLocaleString("ro-RO")} RON</span>
                  </div>
                  <input
                      type="range"
                      id="calcPaymentRangePage"
                      aria-label="Current monthly payment range"
                      min="500"
                      max="10000"
                      step="100"
                      value={calcPayment}
                      onChange={(e) => setCalcPayment(Number(e.target.value))}
                      className="cv-calc-range"
                    />
                </div>

                <div className="cv-calc-field">
                  <div className="cv-calc-label">
                    <span>Venit lunar net</span>
                    <span className="cv-calc-val-badge">{calcIncome.toLocaleString("ro-RO")} RON</span>
                  </div>
                  <input
                      type="range"
                      id="calcIncomeRangePage"
                      aria-label="Monthly net income range"
                      min="2500"
                      max="30000"
                      step="500"
                      value={calcIncome}
                      onChange={(e) => setCalcIncome(Number(e.target.value))}
                      className="cv-calc-range"
                    />
                </div>

                <div className="cv-calc-field">
                  <div className="cv-calc-label">
                    <span>Dobândă actuală estimată</span>
                    <span className="cv-calc-val-badge">{calcRate}%</span>
                  </div>
                  <input
                      type="range"
                      id="calcRateRangePage"
                      aria-label="Estimated interest rate range"
                      min="6"
                      max="25"
                      step="0.5"
                      value={calcRate}
                      onChange={(e) => setCalcRate(Number(e.target.value))}
                      className="cv-calc-range"
                    />
                </div>
              </div>

              {/* DOMINANT CALCULATOR TERMINAL OUTPUT */}
              <div className="cv-calc-terminal">
                <div>
                  <div className="cv-calc-output-main">
                    <div className="cv-calc-output-label">RATĂ ESTIMATĂ NOUĂ</div>
                    <div className="cv-calc-output-big">{estimatedNewPayment.toLocaleString("ro-RO")} lei</div>
                    <div className="cv-mono" style={{ fontSize: "0.82rem", color: "#087F5B", fontWeight: 700, marginTop: "0.5rem", letterSpacing: "0.02em" }}>
                      6,10% DOBÂNDĂ ESTIMATĂ
                    </div>
                  </div>

                  <div className="cv-calc-stat-group">
                    <div className="cv-calc-stat-row">
                      <span style={{ color: "#5F6368" }}>SOLD CREDIT / SUMĂ</span>
                      <span>{calcAmount.toLocaleString("ro-RO")} lei</span>
                    </div>
                    <div className="cv-calc-stat-row">
                      <span style={{ color: "#5F6368" }}>ECONOMISIRE LUNARĂ</span>
                      <span className="cv-calc-stat-val">−{monthlySaving.toLocaleString("ro-RO")} lei / lună</span>
                    </div>
                    <div className="cv-calc-stat-row">
                      <span style={{ color: "#5F6368" }}>ECONOMISIRE ANUALĂ</span>
                      <span className="cv-calc-stat-val">−{annualSaving.toLocaleString("ro-RO")} lei / an</span>
                    </div>
                    <div className="cv-calc-stat-row">
                      <span style={{ color: "#5F6368" }}>FINANȚARE SUPLIMENTARĂ</span>
                      <span className="cv-calc-stat-val">până la {extraCashPossibility.toLocaleString("ro-RO")} lei</span>
                    </div>
                  </div>
                </div>

                <a
                  href="#verificare-credit"
                  className="cv-btn-primary w-full text-center mt-4"
                  onClick={() => {
                    trackEvent("calculator_complete", { amount: calcAmount, payment: calcPayment });
                    document.getElementById("verificare-credit")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  APLICĂ CU ACESTE CIFRE →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 17 — 08 / REZULTATE */}
        <section className="cv-section" id="rezultate">
          <div className="cv-container">
            <span className="cv-section-marker">08 / REZULTATE</span>
            <div className="cv-section-header">
              <h2 className="cv-section-title">CE CÂȘTIGI?</h2>
              <p className="cv-section-sub">Valoarea adăugată a unei consultanțe financiare independente.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>
              <div style={{ borderTop: "2px solid #E4E8E6", paddingTop: "1.25rem" }}>
                <span className="cv-mono" style={{ color: "#087F5B", fontWeight: 700 }}>01</span>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0.5rem 0" }}>CLARITATE</h3>
                <p style={{ fontSize: "0.92rem", color: "#5F6368" }}>Știi exact unde te încadrezi și ce opțiuni ai.</p>
              </div>

              <div style={{ borderTop: "2px solid #E4E8E6", paddingTop: "1.25rem" }}>
                <span className="cv-mono" style={{ color: "#087F5B", fontWeight: 700 }}>02</span>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0.5rem 0" }}>OPȚIUNI</h3>
                <p style={{ fontSize: "0.92rem", color: "#5F6368" }}>Nu depinzi de oferta unei singure bănci.</p>
              </div>

              <div style={{ borderTop: "2px solid #E4E8E6", paddingTop: "1.25rem" }}>
                <span className="cv-mono" style={{ color: "#087F5B", fontWeight: 700 }}>03</span>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0.5rem 0" }}>TIMP</h3>
                <p style={{ fontSize: "0.92rem", color: "#5F6368" }}>Nu pierzi zile întregi făcând drumuri între bănci.</p>
              </div>

              <div style={{ borderTop: "2px solid #E4E8E6", paddingTop: "1.25rem" }}>
                <span className="cv-mono" style={{ color: "#087F5B", fontWeight: 700 }}>04</span>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0.5rem 0" }}>NEGOCIERE</h3>
                <p style={{ fontSize: "0.92rem", color: "#5F6368" }}>Ai un reprezentant dedicat care discută cu banca.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 18 — 09 / FINANCIAL INTELLIGENCE */}
        <FinancialIntelligence />

        {/* 19 — 10 / DESPRE MINE EXECUTIVE BIOGRAPHY */}
        <section className="cv-section" id="despre">
          <div className="cv-container">
            <span className="cv-section-marker">10 / DESPRE MINE</span>
            
            <div className="cv-hero-grid">
              <div>
                <h2 className="cv-section-title" style={{ fontSize: "2.4rem" }}>Cristian Văduva</h2>
                <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "#087F5B", marginBottom: "1.5rem" }}>
                  Credit Advisory & Financial Optimization
                </p>
                <div style={{ fontSize: "1rem", color: "#5F6368", display: "flex", flexDirection: "column", gap: "1rem", lineHeight: "1.65" }}>
                  <p>
                    Lucrez în domeniul financiar cu o filozofie simplă: nu valorific produse bancare, ci ofer consultanță obiectivă celor care vor să ia decizii financiare inteligente.
                  </p>
                  <p>
                    Analizez cifrele în detaliu, înțeleg provocările fiecărui dosar și pregătesc cea mai bună strategie de finanțare înainte de orice aplicare la bancă.
                  </p>
                </div>
                <a
                  href="#verificare-credit"
                  className="cv-btn-secondary mt-6"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("verificare-credit")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  AFLĂ CUM LUCREZ →
                </a>
              </div>

              <div style={{ borderLeft: "2px solid #087F5B", paddingLeft: "2rem", display: "flex", alignItems: "center" }}>
                <blockquote className="cv-serif" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.25rem)", fontWeight: 700, lineHeight: "1.3", color: "#111111", letterSpacing: "-0.02em" }}>
                  „Nu valorific primul credit.<br />
                  <span style={{ color: "#087F5B" }}>Caut varianta care are sens pentru tine.”</span>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* 20 — TRUST / CREDIBILITY REPORT */}
        <section className="cv-section" id="credibilitate">
          <div className="cv-container">
            <span className="cv-section-marker">TRUST & CREDIBILITY</span>
            <div className="cv-section-header">
              <h2 className="cv-section-title">GARANȚIA PROCESULUI NOSTRU</h2>
              <p className="cv-section-sub">Standarde de lucru transparente și obiective.</p>
            </div>

            <div className="cv-diag-table">
              <div className="cv-diag-row">
                <span className="cv-diag-code">01</span>
                <span className="cv-diag-name">Consultanță personalizată</span>
                <span className="cv-diag-status">GARANTAT</span>
              </div>
              <div className="cv-diag-row">
                <span className="cv-diag-code">02</span>
                <span className="cv-diag-name">Acces la multiple oferte bancare</span>
                <span className="cv-diag-status">20+ BĂNCI</span>
              </div>
              <div className="cv-diag-row">
                <span className="cv-diag-code">03</span>
                <span className="cv-diag-name">Experiență și expertiză financiară</span>
                <span className="cv-diag-status">DEDICAT</span>
              </div>
              <div className="cv-diag-row">
                <span className="cv-diag-code">04</span>
                <span className="cv-diag-name">Analiză inițială fără obligații</span>
                <span className="cv-diag-status">100% GRATUIT</span>
              </div>
              <div className="cv-diag-row">
                <span className="cv-diag-code">05</span>
                <span className="cv-diag-name">Consultant dedicat pe tot procesul</span>
                <span className="cv-diag-status">DIRECT</span>
              </div>
              <div className="cv-diag-row">
                <span className="cv-diag-code">06</span>
                <span className="cv-diag-name">Confidențialitate garantată</span>
                <span className="cv-diag-status">CONFIDENȚIAL</span>
              </div>
            </div>
          </div>
        </section>

        {/* 21 — REFERRAL PROGRAM */}
        <section className="cv-section" id="recomandari" style={{ backgroundColor: "#F7F9F8" }}>
          <div className="cv-container">
            <span className="cv-section-marker">PROGRAM RECOMANDĂRI</span>
            
            <div id="n6h4kr" className="progress-bar-bg" role="progressbar" aria-label="Credit verification progress" aria-valuenow={formStep} aria-valuemin={1} aria-valuemax={5}>
              <div>
                <h2 className="cv-section-title" style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)" }}>
                  500 – 3.000 RON
                </h2>
                <span className="cv-mono" style={{ color: "#087F5B", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: "1rem" }}>
                  / RECOMANDARE
                </span>
                <p className="cv-section-sub">
                  Cunoști pe cineva care dorește să-și reducă ratele sau are nevoie de credit? Recomandă un client și primești comision garantat după acordarea creditului.
                </p>
                <Link href="/referral" className="cv-btn-primary mt-6">
                  RECOMANDĂ UN CLIENT →
                </Link>
              </div>

              <div style={{ backgroundColor: "#FFFFFF", padding: "2rem", border: "1px solid #E4E8E6" }}>
                <h3 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "1rem" }}>CUM FUNCȚIONEAZĂ?</h3>
                <ol className="cv-mono" style={{ fontSize: "0.88rem", display: "flex", flexDirection: "column", gap: "0.75rem", color: "#5F6368" }}>
                  <li>1. COMPLETEZI FORMULARUL DE RECOMANDARE</li>
                  <li>2. PRELUĂM ȘI ANALIZĂM DOSARUL CLIENTULUI</li>
                  <li>3. LA ACORDAREA CREDITULUI PRIMEȘTI COMISIONUL</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* 22 — FAQ */}
        <section className="cv-section" id="faq">
          <div className="cv-container">
            <div className="cv-hero-grid">
              <div>
                <span className="cv-section-marker">ÎNTREBĂRI FRECVENTE</span>
                <h2 className="cv-section-title" style={{ fontSize: "2.4rem" }}>
                  ÎNTREBĂRI<br />FRECVENTE
                </h2>
                <p className="cv-section-sub">
                  Răspunsuri la cele mai comune clarificări legate de analiza și intermedierea creditelor.
                </p>
              </div>

              <div className="cv-accordion-list">
                {faqs.map(([q, a], idx) => {
                  const isOpen = openFaqIndex === idx;
                  const numStr = String(idx + 1).padStart(2, "0");
                  return (
                    <div key={idx} className="cv-accordion-item">
                      <button
                        className="cv-accordion-trigger"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                          <span className="cv-mono" style={{ fontSize: "0.85rem", color: "#087F5B", fontWeight: 700 }}>{numStr}</span>
                          <span style={{ fontWeight: 600 }}>{q}</span>
                        </div>
                        <span className="cv-mono" style={{ fontSize: "1.25rem", fontWeight: 500, color: "#5F6368" }}>
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="cv-accordion-content" style={{ paddingLeft: "3.25rem" }}>
                          {a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 24 — 12 / CONTACT DIRECT */}
        <section className="cv-section" id="contact">
          <div className="cv-container">
            <span className="cv-section-marker">12 / CONTACT DIRECT</span>
            <div className="cv-section-header">
              <h2 className="cv-section-title">DISCUTĂ DIRECT CU MINE</h2>
              <p className="cv-section-sub">Alege canalul preferat de comunicare.</p>
            </div>

            <div className="cv-contact-rows">
              <a
                href={`https://wa.me/${CONTACT.WHATSAPP}?text=${encodeURIComponent("Bună ziua, doresc o analiză financiară.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cv-contact-row"
              >
                <span className="cv-contact-type">WHATSAPP</span>
                <span className="cv-contact-sub">Vorbește direct cu mine pe WhatsApp</span>
                <span className="cv-contact-action">+43 650 953 6345 →</span>
              </a>

              <a href={`tel:${CONTACT.PHONE}`} className="cv-contact-row">
                <span className="cv-contact-type">TELEFON</span>
                <span className="cv-contact-sub">Discutăm situația ta la telefon</span>
                <span className="cv-contact-action">0767 110 439 →</span>
              </a>

              <a href={`mailto:${CONTACT.EMAIL}`} className="cv-contact-row">
                <span className="cv-contact-type">EMAIL</span>
                <span className="cv-contact-sub">Trimite-mi detaliile pe mail</span>
                <span className="cv-contact-action">cristianvaduva@duck.com →</span>
              </a>
            </div>
          </div>
        </section>

        {/* 25 — 13 / ECOSISTEM */}
        <section className="cv-section" id="ecosistem" style={{ backgroundColor: "#F7F9F8" }}>
          <div className="cv-container">
            <span className="cv-section-marker">13 / ECOSISTEM</span>
            <div className="cv-section-header">
              <h2 className="cv-section-title">REȚEAUA CV ADVISORY</h2>
              <p className="cv-section-sub">Parteneriate și ecosistemul integrat de servicii conexe.</p>
            </div>

            <div className="cv-directory-list">
              {ecosystemLinks.map((item, idx) => {
                const numStr = String(idx + 1).padStart(2, "0");
                const isInternal = item.href.startsWith("/") || item.href === "https://cristianvaduva.com/market-pulse";
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    {...(!isInternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="cv-dir-row"
                    aria-label={`${item.name} — ${item.desc}`}
                  >
                    <span className="cv-dir-code">{numStr}</span>
                    <span className="cv-dir-title">{item.name}</span>
                    <span className="cv-dir-desc">{item.desc}</span>
                    <span className="cv-dir-arrow" style={{ fontSize: "1.1rem" }} aria-hidden="true">↗</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* 26 — 14 / ANALIZĂ & CALIFICARE (MAIN CONVERSION MODULE) */}
        <section className="cv-section" id="verificare-credit">
          <div className="cv-container" style={{ maxWidth: "800px" }}>
            <span className="cv-section-marker">14 / ANALIZĂ & CALIFICARE</span>
            
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <h2 className="cv-section-title" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}>
                ÎNCEPEM CU SITUAȚIA TA.
              </h2>
              <p className="cv-section-sub">
                Câteva întrebări. O analiză clară. Apoi îți spun ce putem face.
              </p>
            </div>

            <div className="cv-form-card">
              {formState === "success" ? (
                <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
                  <CheckCircle2 size={48} style={{ color: "#087F5B", margin: "0 auto 1rem" }} />
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                    SOLICITARE ÎNREGISTRATĂ CU SUCCES!
                  </h3>
                  <p style={{ color: "#5F6368" }}>
                    Am primit datele tale. Te voi contacta personal în cel mai scurt timp posibil.
                  </p>
                </div>
              ) : (
                <form onSubmit={submitForm}>
                  <div className="cv-form-step-badge">
                    PASUL 0{formStep} / 03
                  </div>

                  {formError && (
                    <div style={{ padding: "0.75rem 1rem", backgroundColor: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: "2px", color: "#991B1B", fontSize: "0.88rem", marginBottom: "1.5rem" }}>
                      {formError}
                    </div>
                  )}

                  {/* STEP 1: OBJECTIVE & AMOUNT */}
                  {formStep === 1 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                      <div className="cv-input-group">
                        <label className="cv-input-label">Ce dorești să obții?</label>
                        <div className="cv-select-grid">
                          {[
                            "Reduc rata",
                            "Refinanțare",
                            "Credit nou",
                            "Bani suplimentari",
                            "Am întârzieri",
                          ].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={`cv-option-btn ${purpose === opt ? "selected" : ""}`}
                              onClick={() => setPurpose(opt)}
                            >
                              <span>{opt}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="cv-input-group">
                        <label className="cv-input-label">Suma dorită (RON)</label>
                        <input
                          type="number"
                          value={desiredAmount}
                          onChange={(e) => setDesiredAmount(e.target.value)}
                          placeholder="85000"
                          className="cv-input"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleNextStep1}
                        className="cv-btn-primary w-full mt-2"
                      >
                        CONTINUĂ SPRE PASUL 2 →
                      </button>
                    </div>
                  )}

                  {/* STEP 2: FINANCIAL CONTEXT */}
                  {formStep === 2 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                      <div className="cv-input-group">
                        <label className="cv-input-label">Venit lunar net (RON)</label>
                        <input
                          type="number"
                          value={income}
                          onChange={(e) => setIncome(e.target.value)}
                          placeholder="4500"
                          className="cv-input"
                        />
                      </div>

                      <div className="cv-input-group">
                        <label className="cv-input-label">Vechime la locul de muncă</label>
                        <div className="cv-select-grid">
                          {["Sub 3 luni", "3–12 luni", "1–3 ani", "Peste 3 ani"].map((v) => (
                            <button
                              key={v}
                              type="button"
                              className={`cv-option-btn ${employment === v ? "selected" : ""}`}
                              onClick={() => setEmployment(v)}
                            >
                              <span>{v}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "1rem" }}>
                        <button
                          type="button"
                          onClick={() => setFormStep(1)}
                          className="cv-btn-secondary"
                        >
                          ← ÎNAPOI
                        </button>
                        <button
                          type="button"
                          onClick={handleNextStep2}
                          className="cv-btn-primary flex-1"
                        >
                          CONTINUĂ SPRE PASUL 3 →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: CONTACT DETAILS & SUBMIT */}
                  {formStep === 3 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      <div className="cv-input-group">
                        <label className="cv-input-label">Nume complet</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ion Popescu"
                          className="cv-input"
                          required
                        />
                      </div>

                      <div className="cv-input-group">
                        <label className="cv-input-label">Număr de telefon</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="0722123456"
                          className="cv-input"
                          required
                        />
                      </div>

                      <div className="cv-input-group">
                        <label className="cv-input-label">Adresă de email (opțional)</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="email@exemplu.ro"
                          className="cv-input"
                        />
                      </div>

                      <input
                        type="text"
                        name="website"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        style={{ display: "none" }}
                        tabIndex={-1}
                        autoComplete="off"
                      />

                      <div style={{ marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.82rem", color: "#5F6368" }}>
                        <label style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            checked={gdpr}
                            onChange={(e) => setGdpr(e.target.checked)}
                            required
                            style={{ marginTop: "0.2rem" }}
                          />
                          <span>
                            Sunt de acord cu prelucrarea datelor mele conform{" "}
                            <Link href="/politica-confidentialitate" target="_blank" style={{ color: "#087F5B", textDecoration: "underline" }}>
                              Politicii de Confidențialitate
                            </Link>.
                          </span>
                        </label>
                      </div>

                      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                        <button
                          type="button"
                          onClick={() => setFormStep(2)}
                          className="cv-btn-secondary"
                        >
                          ← ÎNAPOI
                        </button>
                        <button
                          type="submit"
                          disabled={formState === "submitting"}
                          className="cv-btn-primary flex-1"
                        >
                          {formState === "submitting" ? "SE PROCESEAZĂ..." : "VEZI CE OPȚIUNI EXISTĂ →"}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </section>

        {/* 27 — FINAL CTA EDITORIAL WHITESPACE */}
        <section className="cv-section" style={{ padding: "8rem 0", textAlign: "center" }}>
          <div className="cv-container">
            <h2 className="cv-section-title" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", marginBottom: "1rem" }}>
              NU TREBUIE SĂ ȘTII TU<br />
              CE BANCĂ ESTE POTRIVITĂ.
            </h2>
            <p className="cv-section-sub" style={{ fontSize: "1.25rem", marginBottom: "2.5rem" }}>
              Trebuie doar să-mi spui ce vrei să faci.
            </p>
            <a
              href="#verificare-credit"
              className="cv-btn-primary"
              style={{ fontSize: "1rem", padding: "1rem 2rem" }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("verificare-credit")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              VERIFICĂ SITUAȚIA →
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
