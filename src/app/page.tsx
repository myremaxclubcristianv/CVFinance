"use client";

import React, { useEffect, useState, useRef, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Landmark,
  Menu,
  Phone,
  ShieldCheck,
  X,
  Building2,
  Sparkles,
  Lock,
  FileCheck,
  TrendingDown,
  Award,
  Gift,
  UserCheck,
  Zap,
  Percent,
  Coins,
  Shield,
  HelpCircle,
  Share2,
  MessageCircle,
} from "lucide-react";
import { trackEvent, getTrafficMetadata } from "@/lib/analytics";
import WhatsAppButton from "@/components/WhatsAppButton";
import Header from "@/components/Header";
import TotulInainteDeCreditFunnel from "@/components/TotulInainteDeCreditFunnel";
import BusinessFinanceFunnel from "@/components/BusinessFinanceFunnel";
import CVFinanceHero from "@/components/CVFinanceHero";
import CommandSheet from "@/components/CommandSheet";
import FinancialIntelligence from "@/components/FinancialIntelligence";
import { PROBLEM_CARDS } from "@/lib/totul-constants";
import { BUSINESS_PURPOSE_CARDS, INTENT_PILLS, DIAGNOSTIC_MATRIX_ITEMS } from "@/lib/business-constants";
import { CONTACT } from "@/lib/constants";

const servicesList = [
  {
    title: "CONSULTANȚĂ DE CREDIT",
    desc: "Analizăm opțiunile disponibile pentru obținerea unui credit nou adaptat nevoilor tale.",
    icon: Zap,
  },
  {
    title: "ANALIZĂ FINANCIARĂ",
    desc: "Verificăm situația din Biroul de Credit și identificăm posibilitățile legale de corectare.",
    icon: FileCheck,
  },
  {
    title: "FINANȚARE BUSINESS",
    desc: "Soluții de finanțare pentru firme: capital de lucru, cash-flow, echipamente și investiții.",
    icon: Landmark,
  },
  {
    title: "REFINANȚARE",
    desc: "Comasăm creditele existente într-o singură rată lunară mult mai ușor de susținut.",
    icon: TrendingDown,
  },
  {
    title: "ACHIZIȚIE LOCUINȚĂ",
    desc: "Ghidaj complet pentru credite ipotecare și identificarea celor mai mici dobânzi.",
    icon: Coins,
  },
  {
    title: "OPTIMIZARE FINANCIARĂ",
    desc: "Identificăm rapid soluțiile optime de reducere a costurilor și negociem direct cu banca.",
    icon: Clock3,
  },
];

const loanTypesList = [
  {
    code: "01",
    title: "CREDIT IPOTECAR",
    desc: "Pentru achiziția unei locuințe.",
  },
  {
    code: "02",
    title: "CREDIT DE NEVOI PERSONALE",
    desc: "Pentru proiectele și nevoile tale.",
  },
  {
    code: "03",
    title: "REFINANȚARE",
    desc: "Pentru reorganizarea finanțării existente.",
  },
  {
    code: "04",
    title: "CREDIT BUSINESS",
    desc: "Pentru capital de lucru și dezvoltare.",
  },
  {
    code: "05",
    title: "CREDIT INVESTIȚII",
    desc: "Pentru proiecte și active.",
  },
  {
    code: "06",
    title: "SOLUȚII PERSONALIZATE",
    desc: "Pentru situații care nu intră într-o categorie standard.",
  },
];

const faqs = [
  [
    "Analiza inițială este cu adevărat 100% gratuită?",
    "Da, absolut. Analiza inițială și verificarea ofertelor din piață sunt 100% gratuite și nu implică nicio obligație din partea ta.",
  ],
  [
    "În cât timp primesc un răspuns sau un plan de acțiune?",
    "Echipa noastră analizează datele trimise și revine telefonic sau pe email în maximum 24-48 de ore lucrătoare cu opțiunile eligibile.",
  ],
  [
    "Care este diferența între a merge direct la o bancă și a lucra cu CV Finance?",
    "Banca îți oferă un singur produs propriu. CV Finance analizează ofertele de la peste 20 de bănci partenere, negociind în interesul tău cea mai mică rată.",
  ],
  [
    "Pot refinanța dacă am întârzieri sau mai multe rate de achitat?",
    "Da. Refinanțarea și consolidarea datoriilor sunt create special pentru a scădea presiunea ratelor lunare, unificând totul într-o singură rată accesibilă.",
  ],
  [
    "Verificarea inițială îmi afectează scorul FICO sau Biroul de Credit?",
    "Nu. Discuția și analiza inițială cu noi nu reprezintă o solicitare oficială de credit la bancă, deci nu îți afectează scorul de credit.",
  ],
  [
    "Ce înseamnă analiza eligibilității pentru Biroul de Credit?",
    "Analizăm istoricul înregistrărilor tale și identificăm soluțiile disponibile conform reglementărilor în vigoare pentru clarificarea situației tău.",
  ],
];

const formatMoney = (number: number) =>
  new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(number);

const TICKER_SERVICES = [
  { label: "FINANȚARE PENTRU ANTREPRENORI", href: "#business-finance" },
  { label: "FINANȚARE COMPANII", href: "#business-finance" },
  { label: "CAPITAL DE LUCRU", href: "#verificare-finantare-business" },
  { label: "INVESTIȚII & ECHIPAMENTE", href: "#verificare-finantare-business" },
  { label: "REFINANȚARE", href: "#verificare-credit" },
  { label: "CREDITARE", href: "#verificare-credit" },
  { label: "OPTIMIZARE FINANCIARĂ", href: "#verificare-credit" },
  { label: "ANALIZĂ FINANCIARĂ", href: "#verificare-credit" },
  { label: "PRECALIFICARE", href: "#verificare-credit" },
  { label: "CONSULTANȚĂ FINANCIARĂ", href: "#proces" },
];

function ServiceTicker() {
  const handleTickerClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
      trackEvent("homepage_service_ticker_click", { destination: targetId });
    }
  };

  return (
    <nav aria-label="Servicii financiare" className="cv-service-ticker-bar">
      <div className="cv-ticker-track-wrapper">
        <div className="cv-ticker-track">
          {[...TICKER_SERVICES, ...TICKER_SERVICES].map((service, index) => (
            <Fragment key={index}>
              <a
                href={service.href}
                className="cv-ticker-item"
                onClick={(e) => handleTickerClick(e, service.href)}
              >
                {service.label}
              </a>
              <span className="cv-ticker-separator" aria-hidden="true">•</span>
            </Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default function Home() {
  const router = useRouter();
  const [menu, setMenu] = useState(false);

  // Calculator State
  const [amount, setAmount] = useState(85000);
  const [payment, setPayment] = useState(2200);
  const [rate, setRate] = useState(12.5);
  const [years, setYears] = useState(4);
  const [calcIncome, setCalcIncome] = useState(4500);
  const [calcInteracted, setCalcInteracted] = useState(false);

  // Multi-step Form State (3 Steps)
  const [formStep, setFormStep] = useState<1 | 2 | 3>(1);
  const [formError, setFormError] = useState("");
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Form Fields State
  const [purpose, setPurpose] = useState("Reduc rata");
  const [desiredAmount, setDesiredAmount] = useState("85000");
  const [income, setIncome] = useState("");
  const [employment, setEmployment] = useState("");
  const [creditTypes, setCreditTypes] = useState<string[]>(["Bancă"]);
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [delays, setDelays] = useState("");
  const [creditBureau, setCreditBureau] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [messageText, setMessageText] = useState("");
  const [contactPreference, setContactPreference] = useState("WhatsApp");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [gdpr, setGdpr] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [selectedProblemPill, setSelectedProblemPill] = useState<string | null>(null);
  const [selectedBusinessIntent, setSelectedBusinessIntent] = useState<string | null>(null);

  const [footerYear, setFooterYear] = useState(2026);
  useEffect(() => { setFooterYear(new Date().getFullYear()); }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contactStepRef = useRef<HTMLDivElement>(null);
  const contactHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (formStep === 3) {
      trackEvent("lead_form_step_3");
      const isReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() => {
        contactStepRef.current?.scrollIntoView({
          behavior: isReducedMotion ? "auto" : "smooth",
          block: "start",
        });
        contactHeadingRef.current?.focus({ preventScroll: true });
      });
    }
  }, [formStep]);

  // Track Page View on Mount
  useEffect(() => {
    trackEvent("page_view", getTrafficMetadata());
  }, []);

  // Calculator estimations
  const newPayment = Math.max(
    0,
    Math.round(payment * (1 - Math.min(0.36, Math.max(0.08, (rate - 6.5) / 22))))
  );
  const saving = payment - newPayment;
  const extraCashPossibility = Math.max(
    0,
    Math.round(calcIncome * 0.4 * 60 - amount)
  );

  const handleCalcChange = () => {
    if (!calcInteracted) {
      setCalcInteracted(true);
      trackEvent("calculator_start");
    }
  };

  const handleCalcSubmit = () => {
    trackEvent("calculator_complete", {
      amount,
      payment,
      saving_monthly: saving,
      saving_annual: saving * 12,
    });
    const el = document.getElementById("aplica");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleCheckboxChange = (val: string) => {
    if (val === "Nu am") {
      setCreditTypes(["Nu am"]);
      return;
    }
    const filtered = creditTypes.filter((item) => item !== "Nu am");
    if (filtered.includes(val)) {
      const next = filtered.filter((item) => item !== val);
      setCreditTypes(next.length === 0 ? ["Nu am"] : next);
    } else {
      setCreditTypes([...filtered, val]);
    }
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

  const parseIncomeValue = (val: string | number): number => {
    if (typeof val === "number") return val;
    if (!val) return 0;
    const cleanStr = String(val).replace(/\./g, "");
    const match = cleanStr.match(/\d+/);
    return match ? Number(match[0]) : 0;
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
    if (creditTypes.length === 0) {
      setFormError("Te rugăm să selectezi creditele active sau opțiunea 'Nu am'.");
      return;
    }
    const numPayment = Number(monthlyPayment);
    if (monthlyPayment === "" || isNaN(numPayment) || numPayment < 0) {
      setFormError("Te rugăm să introduci valoarea ratelor lunare actuale.");
      return;
    }
    if (!delays) {
      setFormError("Te rugăm să specifici dacă ai avut întârzieri.");
      return;
    }
    trackEvent("form_step_2_complete", { income, employment, creditTypes });
    setFormStep(3);
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("PREVENT DEFAULT OK");
    console.log("[FORM] submit fired");
    

    
    setFormError("");

    if (!name.trim() || name.trim().length < 2) {
      console.log("VALIDATION FAILED: name");
      setFormError("Te rugăm să introduceți numele complet.");
      setFormState("error");
      
      return;
    }

    const cleanPhone = phone.replace(/\s+/g, "");
    if (!cleanPhone || !/^(?:\+40|0040|0)7\d{8}$/.test(cleanPhone)) {
      console.log("VALIDATION FAILED: phone");
      setFormError("Te rugăm să introduceți un număr de telefon valid din România (ex: 0722123456).");
      setFormState("error");
      
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      console.log("VALIDATION FAILED: email");
      setFormError("Te rugăm să introduceți o adresă de email validă.");
      setFormState("error");
      
      return;
    }

    const yearNum = Number(birthYear);
    // const currentYear removed to avoid hydration mismatch
    if (!birthYear || isNaN(yearNum) || yearNum < 1930 || yearNum > new Date().getFullYear() - 18) {
      console.log("VALIDATION FAILED: birthYear");
      setFormError(`Te rugăm să introduceți anul nașterii (vârsta minimă 18 ani).`);
      setFormState("error");
      
      return;
    }

    if (!gdpr) {
      console.log("VALIDATION FAILED: gdpr");
      setFormError("Trebuie să accepți politica de confidențialitate și termenii pentru a continua.");
      setFormState("error");
      return;
    }

    if (!marketing) {
      console.log("VALIDATION FAILED: marketing");
      setFormError("Trebuie să îți exprimi acordul pentru comunicările de marketing pentru a continua.");
      setFormState("error");
      return;
    }

    
    const trafficMeta = typeof window !== "undefined" ? getTrafficMetadata() : {};
    const currentYear = new Date().getFullYear();

      const CREDIT_TYPE_MAP: Record<string, string> = {
        "Rate la bancă": "Bancă",
        "Carduri de credit / IFN": "IFN",
        "Mai multe credite": "Card de credit",
        "Leasing": "Leasing",
        "Nu am credite active": "Nu am",
      };

      const leadCreditTypes = creditTypes.map((type) => CREDIT_TYPE_MAP[type] || type);

    const numericIncome = parseIncomeValue(income) || 4500;

    const payload = {
      purpose,
      desiredAmount: Number(desiredAmount),
      income: numericIncome,
      employment,
      creditTypes: leadCreditTypes,
      monthlyPayment: Number(monthlyPayment),
      delays,
      creditBureau: creditBureau || "Nu știu",
      name: name.trim(),
      phone: cleanPhone,
      email: email.trim(),
      birthYear: Number(birthYear),
      message: messageText.trim(),
      gdpr,
      gdprConsent: gdpr,
      marketing,
      marketingConsent: marketing,
      website: honeypot,
      ...trafficMeta,
      pageUrl: typeof window !== "undefined" ? window.location.href : "https://credite.cristianvaduva.com",
    };

    console.log("[FORM] PAYLOAD:", payload);

    setFormState("submitting");
    console.log("[FORM] FETCH START", payload);
    if (typeof window !== "undefined") trackEvent("form_submit");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log("[FORM] RESPONSE", response.status, result);
      if (!response.ok) {
        let msg = result.message || "Solicitarea nu a putut fi trimisă. Încearcă din nou.";
        if (result.errors?.fieldErrors) {
          const firstKey = Object.keys(result.errors.fieldErrors)[0];
          if (firstKey && result.errors.fieldErrors[firstKey]?.[0]) {
            msg = `Eroare [${firstKey}]: ${result.errors.fieldErrors[firstKey][0]}`;
          }
        }
        setFormError(msg);
        setFormState("error");
        return;
      }
      trackEvent("lead_success", { purpose, desiredAmount });
      setFormState("success");
    } catch (err) {
      console.error("[FORM] ERROR", err);
      setFormError("Conexiunea a fost întreruptă. Verifică rețeaua și încearcă din nou.");
      setFormState("error");
    } finally {
      // no action needed; formState reflects final state
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
        termsOfService: "https://credite.cristianvaduva.com/termeni-si-conditii",
        privacyPolicy: "https://credite.cristianvaduva.com/politica-confidentialitate",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+40700000000",
          contactType: "customer service",
          areaServed: "RO",
          availableLanguage: "Romanian",
        },
      },
      {
        "@type": "FinancialService",
        name: "CV Finance",
        description:
          "Consultanță și intermediere financiară pentru refinanțare credite, credite nevoi personale și optimizare financiară.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Piața Victoriei",
          addressLocality: "București",
          addressCountry: "RO",
        },
        areaServed: "RO",
        priceRange: "0 RON (Analiză Gratuită)",
      },
      {
        "@type": "LocalBusiness",
        name: "CV Finance",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Piața Victoriei",
          addressLocality: "București",
          addressCountry: "RO",
        },
        openingHours: "Mo-Fr 09:00-18:00",
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
        {/* EXECUTIVE SERVICE TICKER / MARQUEE */}
        <ServiceTicker />

        {/* 01 / ARRIVE — UNBOXED EDITORIAL HERO */}
        <CVFinanceHero />

        {/* 02 / THE CORE PROMISE */}
        <section className="promise-section">
          <div className="promise-container">
            <h2 className="promise-headline">
              <span className="promise-line-muted">TU ÎMI SPUI SITUAȚIA.</span><br />
              <span className="promise-line-dark">EU MĂ UIT LA CIFRE.</span><br />
              <span className="promise-line-emerald">ÎȚI SPUN CE SE POATE FACE.</span><br />
              <span className="promise-line-bold">APOI VORBESC CU BANCA.</span>
            </h2>
          </div>
        </section>

        {/* 01 / DE UNDE ÎNCEPEM — COMMAND SHEET DIRECTORY */}
        <CommandSheet />

        {/* 02 / CUM LUCRĂM — EU TE SUN. BANCA NU. */}
        <section className="philosophy-section">
          <div className="philosophy-container">
            <span className="section-marker">02 / CUM LUCRĂM</span>
            <h2 className="philosophy-title">
              EU TE SUN.<br />
              <span className="highlight-emerald">BANCA NU.</span>
            </h2>
            
            <div className="philosophy-grid">
              <div className="philosophy-step-item">
                <span className="step-number">01</span>
                <h3 className="step-title">Tu vorbești cu mine.</h3>
                <p className="step-desc">Îmi spui ce vrei să faci.</p>
              </div>
              <div className="philosophy-step-item">
                <span className="step-number">02</span>
                <h3 className="step-title">Eu analizez situația.</h3>
                <p className="step-desc">Mă uit la venituri, obligații și obiectiv.</p>
              </div>
              <div className="philosophy-step-item">
                <span className="step-number">03</span>
                <h3 className="step-title">Eu discut cu banca.</h3>
                <p className="step-desc">Caut varianta potrivită și clarific opțiunile.</p>
              </div>
              <div className="philosophy-step-item">
                <span className="step-number">04</span>
                <h3 className="step-title">Tu primești răspunsul.</h3>
                <p className="step-desc">Știi exact unde te încadrezi și ce poți face.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 03 / DIAGNOSE — PERSONAL FINANCE */}
        <section id="totul-inainte-de-credit" className="personal-section">
          <div className="personal-container">
            {/* Centered Editorial Intro */}
            <div className="personal-header">
              <span className="section-marker">03 / PERSONAL</span>
              <h2 className="personal-title">
                HAI SĂ VEDEM<br />
                CE POȚI OBȚINE.
              </h2>
              <p className="personal-subtitle">
                Nu trebuie să știi tu ce bancă îți acceptă situația. Spune-mi ce ai nevoie și pornim de acolo.
              </p>
            </div>

            {/* Three Benefits Grid */}
            <div className="personal-benefits-grid">
              <div className="benefit-item">
                <span className="benefit-number">01</span>
                <h3 className="benefit-title">Îți analizez situația</h3>
                <p className="benefit-desc">Venituri, obligații, istoric și obiectiv.</p>
              </div>
              <div className="benefit-item">
                <span className="benefit-number">02</span>
                <h3 className="benefit-title">Îți arăt opțiunile</h3>
                <p className="benefit-desc">Vezi ce variante au sens pentru tine.</p>
              </div>
              <div className="benefit-item">
                <span className="benefit-number">03</span>
                <h3 className="benefit-title">Discut cu banca</h3>
                <p className="benefit-desc">Tu nu pierzi timp încercând uși care nu se deschid.</p>
              </div>
            </div>

            {/* Centered CTA */}
            <div className="personal-cta-box">
              <a
                href="#verificare-credit"
                className="personal-cta-link"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("verificare-credit")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                VERIFICĂ SITUAȚIA →
              </a>
            </div>

            {/* Checklist Section */}
            <div className="personal-checklist">
              <h3 className="checklist-title">CE VERIFIC ÎNAINTE SĂ TE SUN?</h3>
              <p className="checklist-subtitle">
                Analiza pe care o realizez este una riguroasă, bazată pe date reale și norme bancare actualizate.
              </p>
              <div className="checklist-lines">
                {[
                  { code: "01", title: "Situația din Biroul de Credit", desc: "Verific raportările existente, scorul FICO și eventualele înregistrări active." },
                  { code: "02", title: "Istoricul întârzierilor", desc: "Evaluez vechimea întârzierilor și dacă restanțele au fost stinse." },
                  { code: "03", title: "Creditele și IFN-urile", desc: "Analizez totalul datoriilor curente și structura ratelor de la fiecare creditor." },
                  { code: "04", title: "Nivelul actual al ratelor", desc: "Calculez gradul tău real de îndatorare raportat la veniturile nete eligibile." },
                  { code: "05", title: "Veniturile declarate", desc: "Verific ce tipuri de venituri pot fi luate în calcul (salarii, pensii, PFA, chirii)." },
                  { code: "06", title: "Necesarul de finanțare", desc: "Stabilesc dacă suma dorită este realistă raportată la profilul tău de risc." },
                  { code: "07", title: "Variantele eligibile", desc: "Identific opțiunile care merită analizate fără aplicații inutile." },
                ].map((item) => (
                  <div key={item.code} className="checklist-line">
                    <span className="checklist-line-code">{item.code}</span>
                    <div className="checklist-line-main">
                      <span className="checklist-line-title">{item.title}</span>
                      <span className="checklist-line-desc">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ghid Accordion Section */}
            <div className="personal-accordions-section">
              <h3 className="accordions-title">ÎNAINTE SĂ APLICI, TREBUIE SĂ ȘTII</h3>
              <p className="accordions-subtitle">
                Află cum funcționează evaluarea financiară și ce opțiuni ai când te confrunți cu obstacole de creditare:
              </p>
              <div className="editorial-accordions">
                {[
                  { q: "Ce înseamnă o problemă în Biroul de Credit?", a: "O raportare negativă în Biroul de Credit apare atunci când ai avut întârzieri la plata ratelor de peste 30 de zile. Aceste date rămân vizibile timp de 4 ani de la data achitării ultimei restanțe și pot influența decizia băncilor." },
                  { q: "Se poate corecta o informație din Biroul de Credit?", a: "Verificăm dacă există informații care pot fi corectate sau contestate legal atunci când există temei juridic (raportări eronate, nerespectarea notificării prealabile sau erori ale creditorului). Datele raportate corect nu pot fi șterse garantat." },
                  { q: "Ce faci dacă ai fost refuzat de bancă?", a: "Refuzul unei bănci nu înseamnă că toate ușile sunt închise. Fiecare bancă are norme proprii de risc. Important este să afli motivul exact al respingerii înainte de a trimite noi cereri." },
                  { q: "Ce opțiuni există după un refuz?", a: "Opțiunile pot include: refinanțarea creditelor actuale cu aducerea unui girant/co-plătitor, refacerea scorului FICO prin stingerea datoriilor mici sau orientarea către instituții cu norme mai flexibile." },
                  { q: "Pot refinanța după întârzieri?", a: "Dacă ai stins restanțele și ai venituri constante, refinanțarea îți poate permite să unifici ratele scumpe într-o singură rată lunară sustenabilă, scăzând presiunea financiară." },
                  { q: "Pot obține un credit nou după un istoric negativ?", a: "Obținerea unui credit nou depinde de vechimea problemelor din trecut. Dacă întârzierile au fost ocazionale și reduse ca valoare, anumite instituții pot aproba dosarul după o analiză amănunțită." },
                  { q: "Ce trebuie să știu despre IFN?", a: "Creditele de la IFN-uri reprezintă o variantă accesibilă pe termen scurt, dar vin cu costuri ridicate. Analizăm dacă o astfel de soluție este oportună sau dacă există alternative bancare mai avantajoase." },
                  { q: "De ce nu este bine să aplic la întâmplare?", a: "Trimiterea simultană de aplicații la 5-10 bănci creează interogări repetate în Biroul de Credit. Sistemul FICO interpretează acest comportament drept stare de urgență financiară și scade automat scorul de credit." },
                ].map((guide, idx) => (
                  <details key={idx} className="editorial-details">
                    <summary className="editorial-summary">{guide.q}</summary>
                    <p className="editorial-details-content">{guide.a}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* Embedded Funnel Container */}
            <div id="verificare-credit" className="personal-funnel-wrapper">
              <div className="funnel-intro-box">
                <h3 className="funnel-intro-title">ANALIZĂ CONFIDENȚIALĂ & PRECALIFICARE FINANCIARĂ</h3>
                <p className="funnel-intro-desc">
                  Înainte să mai trimiți o cerere către un creditor, trimite-mi situația ta. Analizez informațiile și revin telefonic.
                </p>
              </div>
              <TotulInainteDeCreditFunnel
                source="homepage-totul-inainte-de-credit"
                initialSelectedProblems={selectedProblemPill ? [selectedProblemPill] : []}
              />
              <p className="funnel-legal-note">
                * Evaluarea identifică opțiunile legale disponibile conform reglementărilor în vigoare, fără promisiuni nerealiste de aprobare garantată sau ștergere nefondată din Biroul de Credit.
              </p>
            </div>

            {/* Principles Section */}
            <div className="personal-principles">
              <div className="personal-principle-item">
                <span className="principle-code">01 / ANALIZEZ</span>
                <h4 className="principle-heading">Înțeleg situația ta</h4>
                <p className="principle-desc">Înțeleg situația ta înainte de următoarea cerere.</p>
              </div>
              <div className="personal-principle-item">
                <span className="principle-code">02 / VERIFIC</span>
                <h4 className="principle-heading">Caut variante reale</h4>
                <p className="principle-desc">Caut variantele care pot avea sens pentru profilul tău.</p>
              </div>
              <div className="personal-principle-item">
                <span className="principle-code">03 / ÎȚI SPUN CE URMEAZĂ</span>
                <h4 className="principle-heading">Revin cu răspuns</h4>
                <p className="principle-desc">Revin către tine telefonic după analiză.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 04 / BUSINESS FINANCE — PREMIUM CHAPTER */}
        <section id="business-finance" className="business-section">
          <div className="business-container">
            <span className="section-marker">04 / BUSINESS</span>
            
            <div className="business-two-col">
              <div className="business-left-col">
                <h2 className="business-title">
                  AI O FIRMĂ?<br />
                  HAI SĂ VEDEM CUM O PUTEM FINANȚA.
                </h2>
                <p className="business-desc">
                  Susținem creșterea companiei tale prin soluții de finanțare adaptate nevoilor tale. Fie că ai nevoie de fonduri pentru <strong>dezvoltare</strong>, optimizarea <strong>cash-flow-ului</strong>, achiziția de <strong>echipamente</strong>, noi <strong>investiții</strong> sau demararea unor <strong>proiecte</strong> strategice.
                </p>
                <div className="business-cta-box">
                  <a
                    href="#verificare-finantare-business"
                    className="business-cta-link"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("verificare-finantare-business")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    VERIFICĂ FINANȚAREA PENTRU FIRMĂ →
                  </a>
                </div>
              </div>
              <div className="business-right-col">
                <div className="business-categories">
                  <div className="category-item">
                    <span className="category-num">01</span>
                    <div className="category-info">
                      <h4 className="category-title">CAPITAL DE LUCRU</h4>
                      <p className="category-desc">Lichiditate operațională și cash-flow curent.</p>
                    </div>
                  </div>
                  <div className="category-item">
                    <span className="category-num">02</span>
                    <div className="category-info">
                      <h4 className="category-title">ECHIPAMENTE</h4>
                      <p className="category-desc">Leasing tehnic și achiziții de utilaje productive.</p>
                    </div>
                  </div>
                  <div className="category-item">
                    <span className="category-num">03</span>
                    <div className="category-info">
                      <h4 className="category-title">INVESTIȚII</h4>
                      <p className="category-desc">Finanțare pentru active imobiliare și proiecte noi.</p>
                    </div>
                  </div>
                  <div className="category-item">
                    <span className="category-num">04</span>
                    <div className="category-info">
                      <h4 className="category-title">DEZVOLTARE</h4>
                      <p className="category-desc">Linii de credit pe termen lung pentru extindere.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EMBEDDED HOMEPAGE BUSINESS FUNNEL CONTAINER */}
        <div id="verificare-finantare-business" className="bf-homepage-funnel-wrapper">
          <div className="funnel-intro-box">
            <h3>ANALIZĂ CONFIDENȚIALĂ & PRECALIFICARE BUSINESS</h3>
            <p>
              Completează detaliile despre compania ta. Analizăm opțiunile de finanțare și revenim cu un apel telefonic.
            </p>
          </div>
          <BusinessFinanceFunnel
            source="homepage-business-finance"
            initialSelectedPurposes={selectedBusinessIntent ? [selectedBusinessIntent] : []}
          />
        </div>

        {/* 05 / SERVICES SECTION */}
        <section id="servicii" className="section">
          <div className="section-intro">
            <div>
              <span className="section-marker">05 / SERVICII</span>
              <h2>Serviciile noastre de optimizare</h2>
            </div>
          </div>

          <div className="services-index">
            {servicesList.map((s, i) => {
              const IconComp = s.icon;
              return (
                <div key={i} className="service-row">
                  <div className="service-left">
                    <span className="service-number">0{i+1}</span>
                    <div className="service-title-box">
                      <IconComp size={20} className="service-icon" />
                      <h3 className="service-title">{s.title}</h3>
                    </div>
                  </div>
                  <p className="service-desc">{s.desc}</p>
                  <span className="service-arrow">→</span>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <a className="button" href="#verificare-credit" onClick={() => trackEvent("services_click")}>
              VERIFICĂ SITUAȚIA →
            </a>
          </div>
        </section>

        {/* 06 / CREDIT TYPES */}
        <section id="tipuri-credite" className="section" style={{ paddingTop: "40px" }}>
          <div className="section-intro">
            <div>
              <span className="section-marker">06 / TIPURI DE CREDITE</span>
              <h2>Tipuri de credite</h2>
            </div>
          </div>

          <div className="loan-types-editorial">
            {loanTypesList.map((item, idx) => (
              <div key={idx} className="loan-type-item">
                <span className="loan-type-num">{item.code}</span>
                <div className="loan-type-body">
                  <h3 className="loan-type-heading">{item.title}</h3>
                  <p className="loan-type-text">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 07 / CALCULATOR FINANCIAR */}
        <section id="calculator" className="section calculator-section">
          <div className="calculator-box">
            <div className="calc-copy">
              <span className="section-marker">07 / CALCULATOR</span>
              <h2>Vezi cât poți economisi</h2>
              <p>
                Află în câteva secunde cum îți poți reduce rata lunară sau cum poți obține fonduri suplimentare.
              </p>

              <div className="calc-inputs">
                <div className="input-group">
                  <div className="input-label">
                    <span>Rată actuală lunară</span>
                    <strong>{formatMoney(payment)} RON</strong>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="15000"
                    step="100"
                    value={payment}
                    onChange={(e) => {
                      setPayment(Number(e.target.value));
                      handleCalcChange();
                    }}
                  />
                </div>

                <div className="input-group">
                  <div className="input-label">
                    <span>Sold credit / Sumă dorită</span>
                    <strong>{formatMoney(amount)} RON</strong>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="500000"
                    step="5000"
                    value={amount}
                    onChange={(e) => {
                      setAmount(Number(e.target.value));
                      handleCalcChange();
                    }}
                  />
                </div>

                <div className="input-group">
                  <div className="input-label">
                    <span>Venit lunar net</span>
                    <strong>{formatMoney(calcIncome)} RON</strong>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="30000"
                    step="500"
                    value={calcIncome}
                    onChange={(e) => {
                      setCalcIncome(Number(e.target.value));
                      handleCalcChange();
                    }}
                  />
                </div>

                <div className="input-group">
                  <div className="input-label">
                    <span>Dobânda actuală estimată</span>
                    <strong>{rate}%</strong>
                  </div>
                  <input
                    type="range"
                    min="7"
                    max="25"
                    step="0.5"
                    value={rate}
                    onChange={(e) => {
                      setRate(Number(e.target.value));
                      handleCalcChange();
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="calc-result">
              <span className="badge">Rezultat Estimativ</span>

              <div className="result-main">
                <small>RATĂ ESTIMATĂ</small>
                <strong>{formatMoney(newPayment)} lei</strong>
                <span className="per-year">
                  Noua rată estimată în urma analizei de optimizare.
                </span>
              </div>

              <div className="result-details">
                <div>
                  <span>SOLD CREDIT / SUMĂ</span>
                  <b>{formatMoney(amount)} lei</b>
                </div>
                <div>
                  <span>ECONOMISIRE LUNARĂ</span>
                  <b className="highlight-emerald">−{formatMoney(saving)} lei / lună</b>
                </div>
                <div>
                  <span>ECONOMISIRE ANUALĂ</span>
                  <b className="highlight-emerald">−{formatMoney(saving * 12)} lei / an</b>
                </div>
                <div>
                  <span>FINANȚARE SUPLIMENTARĂ</span>
                  <b>până la {formatMoney(extraCashPossibility)} lei</b>
                </div>
              </div>

              <button className="button full" onClick={handleCalcSubmit}>
                Verifică analiza <ArrowRight size={18} />
              </button>

              <div style={{ background: "#F1F6F3", border: "1px solid var(--border)", borderRadius: "12px", padding: "12px 16px", marginTop: "16px" }}>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--emerald)", fontWeight: 600 }}>
                  Acesta este doar un calcul orientativ. Dacă analiza confirmă aceste valori, diferența anuală poate fi semnificativă.
                </p>
              </div>

              <p className="disclaimer" style={{ marginTop: "12px" }}>
                * Estimarea este orientativă și are rol informativ. Soluțiile disponibile depind de veniturile, istoricul financiar și criteriile fiecărei instituții financiare.
              </p>
            </div>
          </div>
        </section>

        {/* 08 / OUTCOMES SECTION: CE CÂȘTIGI? */}
        <section id="proces" className="outcomes-section">
          <div className="outcomes-container">
            <span className="section-marker">08 / REZULTATE</span>
            <h2 className="outcomes-main-title">CE CÂȘTIGI?</h2>
            
            <div className="outcomes-grid">
              <div className="outcome-item">
                <span className="outcome-number">01</span>
                <span className="outcome-label">CLARITATE</span>
                <p className="outcome-text">Știi unde te încadrezi.</p>
              </div>

              <div className="outcome-item">
                <span className="outcome-number">02</span>
                <span className="outcome-label">OPȚIUNI</span>
                <p className="outcome-text">Nu depinzi de prima ofertă.</p>
              </div>

              <div className="outcome-item">
                <span className="outcome-number">03</span>
                <span className="outcome-label">TIMP</span>
                <p className="outcome-text">Nu pierzi zile între bănci.</p>
              </div>

              <div className="outcome-item">
                <span className="outcome-number">04</span>
                <span className="outcome-label">NEGOCIERE</span>
                <p className="outcome-text">Ai pe cineva care discută cu banca.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 09 / FINANCIAL INTELLIGENCE — BLOOMBERG / FT RESEARCH TERMINAL */}
        <FinancialIntelligence />
        <section id="despre" className="about-section">
          <div className="about-container">
            <div className="about-left-col">
              <span className="section-marker">10 / DESPRE MINE</span>
              <h2 className="about-title">
                Cristian Văduva
              </h2>
              <p className="about-story-lead">
                Eu nu vreau să îți spun ce credit să iei înainte să înțeleg ce vrei să faci.
              </p>
              <p className="about-story-text">
                Începem cu situația ta. Analizez cifrele, caut variantele și apoi discut cu banca. Scopul este simplu: să înțelegi ce poți obține și să alegi informat.
              </p>
              <a className="button" href="#cum-functioneaza" style={{ marginTop: "16px" }}>
                AFLĂ CUM LUCREZ →
              </a>
            </div>
            <div className="about-right-col">
              <div className="about-statement-box">
                <h3 className="about-statement-headline">
                  Nu vând primul credit.
                </h3>
                <h3 className="about-statement-subheadline">
                  Caut varianta care are sens pentru tine.
                </h3>
                <div className="about-statement-divider" />
              </div>
            </div>
          </div>
        </section>

        {/* TRUST REPORT SECTION */}
        <section id="incredere" className="section">
          <div className="section-intro">
            <div>
              <p className="eyebrow">
                <span /> DE CE CLIENȚII ALEG CV FINANCE
              </p>
              <h2>Partenerul tău independent de încredere</h2>
            </div>
          </div>

          <div className="trust-report-grid">
            {[
              { icon: UserCheck, title: "Consultanță personalizată", desc: "Analizăm situația ta individual și găsim strategia potrivită profilului tău." },
              { icon: Building2, title: "Acces la multiple oferte", desc: "Comparăm direct ofertele celor peste 20 de instituții financiare partenere." },
              { icon: Award, title: "Experiență și expertiză", desc: "Echipa noastră oferă recomandări obiective și orientate către rezultate." },
              { icon: ShieldCheck, title: "Analiză fără obligații", desc: "Evaluezi soluțiile gratuit, fără niciun cost ascuns sau obligație contractuală." },
              { icon: BadgeCheck, title: "Consultant dedicat", desc: "Un singur punct de contact competent pe parcursul întregului proces." },
              { icon: Lock, title: "Confidențialitate garantată", desc: "Datele tale sunt complet asigurate și protejate conform GDPR." },
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="trust-column">
                  <div className="trust-column-header">
                    <IconComp size={20} className="trust-column-icon" />
                    <h3 className="trust-column-title">{item.title}</h3>
                  </div>
                  <p className="trust-column-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* REFERRAL PROGRAM */}
        <section id="recomandari" className="section">
          <div className="referral-panel">
            <div className="referral-header">
              <div className="referral-icon">
                <Gift size={28} />
              </div>
              <div className="referral-header-text">
                <span className="referral-label">PROGRAM DE RECOMANDĂRI</span>
                <h2 className="referral-title">Recomandă și câștigă</h2>
              </div>
            </div>

            <p className="referral-desc">
              Recomandă o persoană interesată de optimizarea unui credit și poți primi un bonus pentru fiecare recomandare eligibilă.
            </p>

            <div className="referral-action-row">
              <div className="referral-badge">
                500 – 3.000 RON / recomandare
              </div>

              <a className="button" href="/referral" onClick={() => trackEvent("referral_click")}>
                Recomandă un client <Share2 size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="section faq-section">
          <div className="faq-split-container">
            <div className="section-intro" style={{ margin: 0, padding: 0 }}>
              <div>
                <p className="eyebrow">
                  <span /> ÎNTREBĂRI FRECVENTE
                </p>
                <h2>Răspunsuri la întrebările tale</h2>
              </div>
            </div>

            <div className="faq-list">
              {faqs.map(([question, answer], index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className={`faq-item ${isOpen ? "open" : ""}`}>
                    <button
                      className="faq-question"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span>{question}</span>
                      <ChevronDown size={20} className={`arrow ${isOpen ? "rotated" : ""}`} />
                    </button>
                    {isOpen && <div className="faq-answer"><p>{answer}</p></div>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 11. PROCESS SECTION */}
        <section id="cum-functioneaza" className="section">
          <div className="section-intro">
            <div>
              <span className="section-marker">11 / CUM FUNCȚIONEAZĂ</span>
              <h2>Cum funcționează</h2>
            </div>
          </div>

          <div className="process-steps-row">
            <div className="process-step-item">
              <span className="process-step-num">01</span>
              <h3 className="process-step-title">Completezi analiza gratuită</h3>
              <p className="process-step-desc">Durează sub 2 minute să introduci datele tale financiare de bază.</p>
            </div>
            <div className="process-step-item">
              <span className="process-step-num">02</span>
              <h3 className="process-step-title">Un consultant analizează situația ta</h3>
              <p className="process-step-desc">Evaluăm opțiunile disponibile din piață de la peste 20 de bănci partenere.</p>
            </div>
            <div className="process-step-item">
              <span className="process-step-num">03</span>
              <h3 className="process-step-title">Primești soluțiile potrivite</h3>
              <p className="process-step-desc">Alegi varianta optimă pentru reducerea ratelor sau obținerea fondurilor.</p>
            </div>
          </div>
        </section>

        {/* 12. CONTACT DIRECT SECTION */}
        <section id="contact-direct" className="section" style={{ paddingTop: "40px" }}>
          <div className="section-intro">
            <div>
              <span className="section-marker">12 / CONTACT DIRECT</span>
              <h2>Contact direct</h2>
              <p style={{ color: "var(--muted)", maxWidth: "600px", marginTop: "8px" }}>
                Discutăm situația ta financiară și identificăm opțiunile potrivite pentru cazul tău.
              </p>
            </div>
          </div>

          <div className="contact-rows-list">
            <a
              href="https://wa.me/436509536345?text=Bun%C4%83%20ziua%2C%20doresc%20o%20analiz%C4%83%20gratuit%C4%83%20a%20op%C8%9Biunilor%20mele%20financiare."
              target="_blank"
              rel="noopener noreferrer"
              className="contact-row-item"
            >
              <div className="contact-row-left">
                <MessageCircle size={24} className="contact-row-icon" />
                <div className="contact-row-info">
                  <span className="contact-row-label">WhatsApp</span>
                  <h3 className="contact-row-title">Vorbește direct cu mine</h3>
                  <p className="contact-row-desc">Preferat pentru întrebări rapide și trimiterea informațiilor de credit.</p>
                </div>
              </div>
              <div className="contact-row-value">
                +43 650 953 6345 →
              </div>
            </a>

            <a
              href="tel:+40767110439"
              className="contact-row-item"
            >
              <div className="contact-row-left">
                <UserCheck size={24} className="contact-row-icon" />
                <div className="contact-row-info">
                  <span className="contact-row-label">Telefon</span>
                  <h3 className="contact-row-title">Discutăm situația ta</h3>
                  <p className="contact-row-desc">Luni – Vineri 09:00 – 18:00 pentru convorbiri directe.</p>
                </div>
              </div>
              <div className="contact-row-value">
                0767 110 439 →
              </div>
            </a>

            <a
              href="mailto:cristianvaduva@duck.com"
              className="contact-row-item"
            >
              <div className="contact-row-left">
                <Landmark size={24} className="contact-row-icon" />
                <div className="contact-row-info">
                  <span className="contact-row-label">Email</span>
                  <h3 className="contact-row-title">Trimite-mi detaliile</h3>
                  <p className="contact-row-desc">Trimite întrebări detaliate sau documente necesare analizei dosarului.</p>
                </div>
              </div>
              <div className="contact-row-value">
                cristianvaduva@duck.com →
              </div>
            </a>
          </div>
        </section>

        {/* 13. ECOSYSTEM AUTHORITY SECTION */}
        <section id="ecosistem" className="section" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
          <div className="section-intro">
            <div>
              <span className="section-marker">13 / ECOSISTEM</span>
              <h2>Parte din ecosistemul Cristian Văduva Intelligence</h2>
              <p style={{ color: "var(--muted)", maxWidth: "680px", marginTop: "8px", lineHeight: 1.6 }}>
                CV Finance face parte dintr-un ecosistem digital construit pentru decizii mai bune în domeniul financiar, imobiliar, asigurări, business intelligence și sănătate.
              </p>
            </div>
          </div>

          <div className="ecosystem-inline-list">
            {[
              { name: "cristianvaduva.com", url: "https://cristianvaduva.com", desc: "Personal brand, professional profile and advisory platform." },
              { name: "AiXLuxury.com", url: "https://AiXLuxury.com", desc: "Luxury real estate, premium properties and private advisory." },
              { name: "HomeFind", url: "https://homefind.cristianvaduva.com", desc: "Real estate intelligence, proprietăți și analiză de piață." },
              { name: "Insurance", url: "https://insurance.cristianvaduva.com", desc: "Analiză și soluții de protecție financiară." },
              { name: "Subvenții", url: "https://subventii.cristianvaduva.com", desc: "Platformă de intelligence pentru finanțări și programe guvernamentale." },
              { name: "AiX Media", url: "https://aixmedia.cristianvaduva.com", desc: "Business, economie, tehnologie și intelligence." },
              { name: "Health", url: "https://health.cristianvaduva.com", desc: "Tehnologie și intelligence pentru sănătate." },
              { name: "OS", url: "https://os.cristianvaduva.com", desc: "Ecosistem operațional și instrumente digitale inteligente." },
            ].map((eco, idx) => (
              <a
                key={idx}
                href={eco.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ecosystem-link-item"
              >
                <div className="ecosystem-link-left">
                  <span className="ecosystem-link-name">{eco.name}</span>
                  <span className="ecosystem-link-desc">{eco.desc}</span>
                </div>
                <span className="ecosystem-link-arrow">↗</span>
              </a>
            ))}
          </div>
        </section>

        {/* 14. QUALIFICATION TERMINAL */}
        <section id="aplica" className="qualification-section">
          <div className="qualification-container">
            <span className="section-marker">14 / ANALIZĂ & CALIFICARE</span>
            <h2 className="qualification-title">ÎNCEPEM CU SITUAȚIA TA.</h2>
            <p className="qualification-subtitle">
              Câteva întrebări. O analiză clară. Apoi îți spun ce putem face.
            </p>
          </div>

          <div className="form-card">
            <div className="form-header">
              {/* Progress Step Indicator */}
              <div className="form-step-indicator" style={{ textAlign: "center", fontSize: "14px", fontWeight: 800, fontFamily: "monospace", color: "var(--emerald)", letterSpacing: "0.1em", marginBottom: "32px" }}>
                0{formStep} / 03
              </div>
            </div>

            {formState === "success" ? (
              <div className="success-screen" role="status" aria-live="polite" style={{ textAlign: "center", padding: "40px 20px" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "#E8F5EF",
                    color: "#087F5B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                  }}
                >
                  <Check size={32} />
                </div>
                <h3 style={{ fontSize: "1.8rem", marginBottom: "12px", color: "#111827" }}>Solicitarea a fost transmisă cu succes. Vom contacta în curând.</h3>
                <p style={{ color: "var(--muted)", maxWidth: "520px", margin: "0 auto 16px", lineHeight: 1.6 }}>
                  Analizăm informațiile trimise și revenim cu variantele disponibile, dacă există.
                </p>
                <div style={{ display: "inline-block", background: "#E8F5EF", border: "1px solid #CBD5E1", color: "#087F5B", padding: "8px 18px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 700, marginBottom: "16px" }}>
                  Nu ai nicio obligație să accepți o ofertă.
                </div>
                <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                  <a
                    href={`https://wa.me/${CONTACT.WHATSAPP}?text=${encodeURIComponent("Bună ziua, am trimis o solicitare de analiză pe site și doresc mai multe informații.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                    style={{ background: "#25D366", borderColor: "#25D366", color: "#FFFFFF" }}
                  >
                    Discută pe WhatsApp
                  </a>
                  <button
                    type="button"
                    className="button"
                    onClick={() => {
                      setFormState("idle");
                      setFormStep(1);
                    }}
                  >
                    Trimite o nouă solicitare
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submitForm} className="multi-step-form">
                {formState === "error" && (
                  <div className="form-error" role="alert" aria-live="assertive" style={{ marginBottom: "16px", color: "var(--error)", fontWeight: "bold" }}>
                    {formError}
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
                  autoComplete="off"
                />

                {/* STEP 1: Purpose & Amount */}
                {formStep === 1 && (
                  <div className="step-content">
                    <label className="field-label">Ce dorești să obții?</label>
                    <div className="options-grid">
                      {[
                        "Reduc rata",
                        "Refinanțare",
                        "Credit nou",
                        "Bani suplimentari",
                        "Am întârzieri",
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          className={`option-btn ${purpose === item ? "selected" : ""}`}
                          onClick={() => setPurpose(item)}
                        >
                          <Check size={16} /> {item}
                        </button>
                      ))}
                    </div>

                    <div className="field-group" style={{ marginTop: "24px" }}>
                      <label className="field-label">Suma dorită sau soldul creditelor (RON)</label>
                      <input
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="input-field"
                        placeholder="Ex: 85000"
                        value={desiredAmount}
                        onChange={(e) => setDesiredAmount(e.target.value)}
                      />
                    </div>

                    {formError && <div className="form-error">{formError}</div>}

                    <button type="button" className="button full" onClick={handleNextStep1} disabled={formState === "submitting"}>
                    Vezi ce opțiuni există →
                  </button>
                  </div>
                )}

                {/* STEP 2: Financial Situation */}
                {formStep === 2 && (
                  <div className="step-content">
                    <div className="field-group">
                      <label className="field-label">Venitul lunar aproximativ</label>
                      <div className="options-grid" style={{ marginBottom: "12px" }}>
                        {["Sub 3.000 lei", "3.000 - 5.000 lei", "5.000 - 8.000 lei", "Peste 8.000 lei"].map((bracket) => (
                          <button
                            key={bracket}
                            type="button"
                            className={`option-btn ${income === bracket ? "selected" : ""}`}
                            onClick={() => setIncome(bracket)}
                          >
                            {bracket}
                          </button>
                        ))}
                      </div>
                      <input
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="input-field"
                        placeholder="Sau introdu suma exactă (ex: 4500 RON)"
                        value={income}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        onChange={(e) => setIncome(e.target.value)}
                      />
                      <span style={{ fontSize: "11px", color: "var(--muted)", marginTop: "4px", display: "block" }}>
                        Ne ajută să înțelegem ce opțiuni pot exista.
                      </span>
                    </div>

                    <div className="field-group">
                      <label className="field-label">Vechime la locul de muncă</label>
                      <select
                        className="input-field"
                        value={employment}
                        onChange={(e) => setEmployment(e.target.value)}
                      >
                        <option value="">Selectează vechimea</option>
                        <option value="Sub 3 luni">Sub 3 luni</option>
                        <option value="3–12 luni">3–12 luni</option>
                        <option value="1–3 ani">1–3 ani</option>
                        <option value="Peste 3 ani">Peste 3 ani</option>
                      </select>
                    </div>

                    <div className="field-group">
                      <label className="field-label">Credite actuale deținute</label>
                      <div className="options-grid">
                        {[
                          "Rate la bancă",
                          "Carduri de credit / IFN",
                          "Mai multe credite",
                          "Nu am credite active",
                        ].map((type) => (
                          <button
                            key={type}
                            type="button"
                            className={`option-btn ${creditTypes.includes(type) ? "selected" : ""}`}
                            onClick={() => handleCheckboxChange(type)}
                          >
                            <Check size={16} /> {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="field-group">
                      <label className="field-label" htmlFor="leadMonthlyPayment">Rata lunară actuală totală (RON)</label>
                      <input
                        id="leadMonthlyPayment"
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="input-field"
                        placeholder="Ex: 2200"
                        value={monthlyPayment}
                        onChange={(e) => setMonthlyPayment(e.target.value)}
                      />
                    </div>

                    <div className="field-group">
                      <label className="field-label">Ai avut întârzieri la plăți?</label>
                      <div className="options-grid">
                        {["Nu", "Da"].map((item) => (
                          <button
                            key={item}
                            type="button"
                            className={`option-btn ${delays === item ? "selected" : ""}`}
                            onClick={() => setDelays(item)}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    {formError && <div className="form-error">{formError}</div>}

                    <div className="form-actions">
                      <button type="button" className="back" onClick={() => setFormStep(1)}>
                        ← Înapoi
                      </button>
                      <button type="button" className="button" onClick={handleNextStep2}>
                        Aproape gata →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Contact Details & Submit */}
                {formStep === 3 && (
                  <div id="contact-step-start" ref={contactStepRef} className="step-content">
                    <h3 ref={contactHeadingRef} tabIndex={-1} style={{ outline: "none", fontSize: "1.2rem", marginBottom: "16px" }}>
                      Date de contact
                    </h3>
                    <div className="field-group">
                      <label className="field-label" htmlFor="leadName">Nume complet</label>
                      <input
                        id="leadName"
                        type="text"
                        autoComplete="name"
                        className="input-field"
                        placeholder="Ion Popescu"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="field-group">
                      <label className="field-label" htmlFor="leadPhone">Număr de telefon</label>
                      <input
                        id="leadPhone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        className="input-field"
                        placeholder="0722123456"
                        value={phone}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <span style={{ fontSize: "11px", color: "var(--muted)", marginTop: "4px", display: "block" }}>
                        Te contactăm doar pentru solicitarea ta. Fără apeluri promoționale.
                      </span>
                    </div>

                    <div className="field-group">
                      <label className="field-label">Cum preferi să fii contactat?</label>
                      <div className="options-grid">
                        {["WhatsApp", "Telefon"].map((mode) => (
                          <button
                            key={mode}
                            type="button"
                            className={`option-btn ${contactPreference === mode ? "selected" : ""}`}
                            onClick={() => setContactPreference(mode)}
                          >
                            {mode === "WhatsApp" ? "💬 WhatsApp" : "📞 Telefon"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="field-group">
                      <label className="field-label" htmlFor="leadEmail">Adresă de email</label>
                      <input
                        id="leadEmail"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        className="input-field"
                        placeholder="ion.popescu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span style={{ fontSize: "11px", color: "var(--muted)", marginTop: "4px", display: "block" }}>
                        Îți trimitem doar informații despre analiza ta.
                      </span>
                    </div>

                    <div className="field-group">
                      <label className="field-label" htmlFor="leadBirthYear">Anul nașterii</label>
                      <input
                        id="leadBirthYear"
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        autoComplete="bday-year"
                        className="input-field"
                        placeholder="Ex: 1988"
                        value={birthYear}
                        onChange={(e) => setBirthYear(e.target.value)}
                      />
                      <span style={{ fontSize: "11px", color: "var(--muted)", marginTop: "4px", display: "block" }}>
                        Ne ajută să verificăm vârsta minimă legală (18 ani).
                      </span>
                    </div>

                    <div className="field-group">
                      <label className="checkbox-label" htmlFor="gdprConsentCheck">
                        <input
                          id="gdprConsentCheck"
                          type="checkbox"
                          checked={gdpr}
                          onChange={(e) => setGdpr(e.target.checked)}
                          required
                          aria-required="true"
                          aria-invalid={!gdpr && formState === "error"}
                        />
                        <span>
                          Am citit și accept <a href="/termeni-si-conditii" target="_blank" style={{ textDecoration: "underline" }}>Termenii și Condițiile</a> și <a href="/politica-confidentialitate" target="_blank" style={{ textDecoration: "underline" }}>Politica de Confidențialitate</a>. (Obligatoriu)
                        </span>
                      </label>
                    </div>

                    <div className="field-group">
                      <label className="checkbox-label" htmlFor="marketingConsentCheck">
                        <input
                          id="marketingConsentCheck"
                          type="checkbox"
                          checked={marketing}
                          onChange={(e) => setMarketing(e.target.checked)}
                          required
                          aria-required="true"
                          aria-invalid={!marketing && formState === "error"}
                        />
                        <span>
                          Sunt de acord să primesc comunicări comerciale, oferte și informații financiare de la CV Finance. (<a href="/acord-marketing" target="_blank" style={{ textDecoration: "underline" }}>Detalii acord</a>) (Obligatoriu)
                        </span>
                      </label>
                    </div>

                    <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "8px", textAlign: "center" }}>
                      Nu trebuie să iei nicio decizie acum. Începem doar cu analiza.
                    </p>
                    <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "16px", textAlign: "center" }}>
                      Un consultant CV Finance te va contacta pentru a analiza situația ta. Nu ești obligat să accepți nicio ofertă.
                    </p>

                    {/* BIROUL DE CREDIT TRUST BLOCK */}
                    <div style={{ background: "#F1F6F3", border: "1px solid var(--border)", borderRadius: "12px", padding: "14px 16px", marginBottom: "24px", fontSize: "0.85rem", color: "var(--ink)" }}>
                      <strong style={{ color: "var(--emerald)" }}>🔒 Analiza inițială nu afectează scorul tău la Biroul de Credit.</strong>
                      <p style={{ margin: "4px 0 0", color: "var(--muted)", fontSize: "0.8rem" }}>Începem doar cu o evaluare a situației tale.</p>
                    </div>

                    <div className="form-actions">
                      <button type="button" className="back" onClick={() => setFormStep(2)}>
                        ← Înapoi
                      </button>
                      <button type="submit" className="button" disabled={formState === "submitting"}>
                        {formState === "submitting" ? "Se trimite..." : "Trimite solicitarea"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </section>

        {/* 13 / ECOSISTEM */}
        <section id="ecosistem" className="section" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
          <div className="section-intro">
            <div>
              <span className="section-marker">13 / ECOSISTEM</span>
              <h2>Parte din ecosistemul Cristian Văduva Intelligence</h2>
              <p style={{ color: "var(--muted)", maxWidth: "680px", marginTop: "8px", lineHeight: 1.6 }}>
                CV Finance face parte dintr-un ecosistem digital construit pentru decizii mai bune în domeniul financiar, imobiliar, asigurări, business intelligence și sănătate.
              </p>
            </div>
          </div>

          <div className="ecosystem-inline-list">
            {[
              { name: "cristianvaduva.com", url: "https://cristianvaduva.com", desc: "Personal brand, professional profile and advisory platform." },
              { name: "AiXLuxury.com", url: "https://AiXLuxury.com", desc: "Luxury real estate, premium properties and private advisory." },
              { name: "HomeFind", url: "https://homefind.cristianvaduva.com", desc: "Real estate intelligence, proprietăți și analiză de piață." },
              { name: "Insurance", url: "https://insurance.cristianvaduva.com", desc: "Analiză și soluții de protecție financiară." },
              { name: "Subvenții", url: "https://subventii.cristianvaduva.com", desc: "Platformă de intelligence pentru finanțări și programe guvernamentale." },
              { name: "AiX Media", url: "https://aixmedia.cristianvaduva.com", desc: "Business, economie, tehnologie și intelligence." },
              { name: "Health", url: "https://health.cristianvaduva.com", desc: "Tehnologie și intelligence pentru sănătate." },
              { name: "OS", url: "https://os.cristianvaduva.com", desc: "Ecosistem operațional și instrumente digitale inteligente." },
            ].map((eco, idx) => (
              <a
                key={idx}
                href={eco.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ecosystem-link-item"
              >
                <div className="ecosystem-link-left">
                  <span className="ecosystem-link-name">{eco.name}</span>
                  <span className="ecosystem-link-desc">{eco.desc}</span>
                </div>
                <span className="ecosystem-link-arrow">↗</span>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="editorial-footer">
          <div className="footer-container">
            <div className="footer-left">
              <span className="footer-brand">CV Finance</span>
              <p className="footer-tagline">Credit Advisory & Financial Optimization</p>
            </div>
            <div className="footer-right">
              <div className="footer-links">
                <a href="#totul-inainte-de-credit">Personal</a>
                <a href="#business-finance">Business</a>
                <a href="#cum-functioneaza">Cum funcționează</a>
                <a href="#contact-direct">Despre mine</a>
                <a href="#contact-direct">Contact</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-legal">
            <div className="footer-legal-links">
              <a href="/termeni-si-conditii">Termeni și condiții</a>
              <span className="dot">•</span>
              <a href="/politica-confidentialitate">Politica de confidențialitate</a>
              <span className="dot">•</span>
              <a href="/gdpr">GDPR</a>
              <span className="dot">•</span>
              <a href="/acord-marketing">Acord marketing</a>
              <span className="dot">•</span>
              <a href="/nota-legala">Notă legală</a>
              <span className="dot">•</span>
              <button
                onClick={() => typeof window !== "undefined" && window.dispatchEvent(new Event("cv_open_cookie_settings"))}
                className="cookie-btn"
              >
                Cookies
              </button>
            </div>
            <p className="footer-copy-text">
              © {footerYear} CV Finance. Parte din Cristian Văduva Intelligence Ecosystem.
            </p>
            <p className="footer-disclaimer-text">
              * Disclaimer legal: CV Finance funcționează ca birou de consultanță financiară independentă fondat de Cristian Văduva. Birou în zona centrală — Piața Victoriei, București. Analiza este gratuită și nu garantează aprobarea unui credit. Soluțiile financiare depind direct de criteriile și evaluarea bancară.
            </p>
          </div>
        </footer>

        {/* Mobile Sticky CTA Bar */}
        {!isInputFocused && (
          <a className="mobile-cta" href="#aplica" onClick={() => trackEvent("form_start", { source: "mobile_sticky_cta" })}>
            Află ce opțiuni ai <ArrowRight size={18} />
          </a>
        )}
      </main>
    </>
  );
}
