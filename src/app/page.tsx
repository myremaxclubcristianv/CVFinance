"use client";

import { useEffect, useState, useRef } from "react";
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
} from "lucide-react";
import { trackEvent, getTrafficMetadata } from "@/lib/analytics";
import WhatsAppButton from "@/components/WhatsAppButton";
import Header from "@/components/Header";
import { CONTACT } from "@/lib/constants";

const servicesList = [
  {
    title: "Biroul de Credit",
    desc: "Analizez situația din Biroul de Credit și identific dacă există posibilități legale de corectare sau ștergere a unor informații, atunci când există temei.",
    icon: FileCheck,
  },
  {
    title: "Credit nou",
    desc: "Verific opțiunile disponibile pentru obținerea unui credit nou adaptat nevoilor tale.",
    icon: Zap,
  },
  {
    title: "Refinanțare",
    desc: "Analizez dacă refinanțarea poate însemna condiții mai potrivite sau o rată lunară mai ușor de susținut.",
    icon: TrendingDown,
  },
  {
    title: "Optimizarea ratelor",
    desc: "Caut variante prin care costul lunar al creditelor tale poate fi optimizat, dacă situația permite.",
    icon: Coins,
  },
  {
    title: "Analiză rapidă",
    desc: "Te ajut să identifici rapid variantele disponibile și pașii potriviți pentru situația ta.",
    icon: Clock3,
  },
  {
    title: "Acces la oferte multiple",
    desc: "Compar opțiuni de la mai mulți finanțatori pentru a identifica variante potrivite profilului tău.",
    icon: Landmark,
  },
];

const loanTypesList = [
  "Credit pentru orice",
  "Credit nevoi personale",
  "Credit auto & Leasing",
  "Renovare casă",
  "Studii & Educație",
  "Cheltuieli medicale",
  "Istoric negativ sau întârzieri",
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

export default function Home() {
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
        {/* 1. HERO SECTION REWRITE */}
        <section id="top" className="hero section">
          <div className="hero-copy">
            <p className="eyebrow">
              <span /> ✓ Analiză gratuită · Fără obligații · Durează 2 minute
            </p>
            <h1>
              Banca nu te sună să îți spună că există o variantă mai bună. <i>Eu da.</i>
            </h1>
            <p className="lead">
              Verific dacă există variante mai potrivite pentru creditul tău.
            </p>

            <div className="hero-actions" style={{ marginTop: "24px" }}>
              <a className="button" href="#calculator" onClick={() => trackEvent("calculator_start")}>
                Află ce opțiuni ai <ArrowRight size={18} />
              </a>
              <a className="button" href="#aplica" onClick={() => trackEvent("form_start")}>Solicită analiza gratuită <ArrowRight size={18} /></a>
      <a className="button" href="/referral" onClick={() => trackEvent("referral_form_start")}>Recomandă un client <ArrowRight size={18} /></a>
            </div>

            <div className="trust-row">
              <span>
                <Check /> Analiză gratuită
              </span>
              <span>
                <Check /> Peste 20 de bănci partenere
              </span>
              <span>
                <Check /> Fără obligații
              </span>
            </div>
          </div>

          {/* Interactive Financial Dashboard */}
          <div className="dashboard">
            <div className="dash-top">
              <span>Simularea ta financiară</span>
              <span className="live">
                <i /> ONLINE VERIFICATION
              </span>
            </div>
            <div className="dash-main">
              <p>Economie anuală estimată</p>
              <strong>
                + {formatMoney(saving * 12 || 5400)} <small>RON / an</small>
              </strong>
              <div className="bars">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="dash-grid">
              <div>
                <p>Rată lunară actuală</p>
                <b className="danger-text">{formatMoney(payment)} RON</b>
              </div>
              <div>
                <p>Rată estimată refinanțare</p>
                <b className="green">{formatMoney(newPayment)} RON</b>
              </div>
              <div>
                <p>Economie lunară</p>
                <b>{formatMoney(saving)} RON</b>
              </div>
              <div>
                <p>Status eligibilitate</p>
                <b className="status">Eligibil verificare</b>
              </div>
            </div>
            <div className="dash-footer">
              <BadgeCheck size={16} /> Datele tale sunt confidențiale și protejate.
            </div>
          </div>
        </section>

        {/* 2. SECTION: CE SE SCHIMBĂ ÎN TIMP? (BENEFICII) */}
        <section id="beneficii" className="section">
          <div className="section-intro">
            <div>
              <p className="eyebrow">
                <span /> EVOLUȚIE FINANCIARĂ
              </p>
              <h2>Ce se schimbă în timp?</h2>
            </div>
          </div>

          <div className="grid grid-3" style={{ gap: "20px" }}>
            <div className="card">
              <div className="icon"><Coins size={22} /></div>
              <h3>Veniturile tale</h3>
              <p>Venitul net sau vechimea actuală îți pot deschide accesul la variante diferite față de momentul inițial.</p>
            </div>
            <div className="card">
              <div className="icon"><TrendingDown size={22} /></div>
              <h3>Ofertele băncilor</h3>
              <p>Instituțiile financiare își actualizează pachetele de creditare și structurile de costuri.</p>
            </div>
            <div className="card">
              <div className="icon"><Clock3 size={22} /></div>
              <h3>Dobânzile din piață</h3>
              <p>Contextul economic se modifică, iar dobânzile din prezent pot difera de cele anterioare.</p>
            </div>
            <div className="card">
              <div className="icon"><ShieldCheck size={22} /></div>
              <h3>Politicile de creditare</h3>
              <p>Criteriile de evaluare ale instituțiilor financiare evoluează periodic.</p>
            </div>
            <div className="card">
              <div className="icon"><Check size={22} /></div>
              <h3>Profilul tău financiar</h3>
              <p>Rambursările efectuate la timp schimbă gradul de încredere și opțiunile de finanțare.</p>
            </div>
          </div>
        </section>

        {/* 3. SECTION: SITUAȚII PE CARE LE ÎNȚELEGEM CU TOȚII */}
        <section id="analogii" className="section">
          <div className="section-intro">
            <div>
              <p className="eyebrow">
                <span /> ANALOGII DIN VIAȚA REALĂ
              </p>
              <h2>Situații pe care le înțelegem cu toții</h2>
            </div>
          </div>

          <div className="grid grid-2" style={{ gap: "20px" }}>
            <div className="card">
              <div className="icon"><Clock3 size={24} /></div>
              <h3>Abonamentul la internet</h3>
              <p style={{ fontSize: "0.98rem", lineHeight: 1.6, color: "var(--ink)", margin: 0 }}>
                &ldquo;Dacă ai afla că există un abonament mai avantajos la internet, probabil ai compara ofertele.&rdquo;
              </p>
            </div>

            <div className="card">
              <div className="icon"><ShieldCheck size={24} /></div>
              <h3>Asigurarea auto sau de locuință</h3>
              <p style={{ fontSize: "0.98rem", lineHeight: 1.6, color: "var(--ink)", margin: 0 }}>
                &ldquo;Mulți români caută anual o asigurare mai bună, dar păstrează același credit ani întregi fără să îl mai analizeze.&rdquo;
              </p>
            </div>

            <div className="card">
              <div className="icon"><Coins size={24} /></div>
              <h3>Cumpărarea unui telefon</h3>
              <p style={{ fontSize: "0.98rem", lineHeight: 1.6, color: "var(--ink)", margin: 0 }}>
                &ldquo;Comparăm telefoane timp de câteva zile înainte să cumpărăm unul. Un credit ne poate însoți ani întregi.&rdquo;
              </p>
            </div>

            <div className="card">
              <div className="icon"><TrendingDown size={24} /></div>
              <h3>Scurgerea discretă de apă</h3>
              <p style={{ fontSize: "0.98rem", lineHeight: 1.6, color: "var(--ink)", margin: 0 }}>
                &ldquo;O scurgere mică de apă nu pare gravă în prima lună. În timp însă poate produce costuri importante.&rdquo;
              </p>
            </div>
          </div>

          <div
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--line)",
              borderRadius: "16px",
              padding: "24px 32px",
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Sparkles size={24} style={{ color: "var(--neon-green)", flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: "0.98rem", color: "var(--ink)", fontWeight: 600 }}>
              Dacă ai observa că dispar câteva sute de lei din portofel în fiecare lună, ai încerca să afli de ce. Finanțele personale merită aceeași atenție.
            </p>
          </div>
        </section>

        {/* 4. SECTION: LUCRURI PE CARE PUȚINI OAMENI LE VERIFICĂ */}
        <section id="verificari" className="section">
          <div className="section-intro">
            <div>
              <p className="eyebrow">
                <span /> CLARITATE FINANCIARĂ
              </p>
              <h2>Lucruri pe care puțini oameni le verifică</h2>
            </div>
          </div>

          <div className="grid grid-3" style={{ gap: "16px" }}>
            {[
              { title: "Costul total al creditului", desc: "Suma totală rambursată pe întreaga perioadă derulată." },
              { title: "Condițiile actuale din piață", desc: "Pachetele și dobânzile curente oferite de bănci." },
              { title: "Posibilitatea refinanțării", desc: "Dacă este oportună înlocuirea creditului actual." },
              { title: "Consolidarea ratelor", desc: "Comasarea mai multor credite într-o singură rată." },
              { title: "Veniturile actuale", desc: "Dacă venitul curent permite condiții de creditare diferite." },
              { title: "Eligibilitatea actualizată", desc: "Cum influențează istoricul financiar noile opțiuni." },
            ].map((item, idx) => (
              <div key={idx} className="card">
                <h3 style={{ fontSize: "1.05rem", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ fontSize: "0.88rem", margin: 0, color: "var(--muted)" }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <a className="button" href="#aplica" onClick={() => trackEvent("outcomes_click")}>
              Vreau să văd dacă mă calific <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* 5. SECTION: DE CE OAMENII ALEG O ANALIZĂ FINANCIARĂ? */}
        <section id="de-ce-analiza" className="section" style={{ paddingTop: "20px" }}>
          <div className="section-intro">
            <div>
              <p className="eyebrow">
                <span /> BENEFICII REALE
              </p>
              <h2>De ce oamenii aleg o analiză financiară?</h2>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              "Înțelegi exact situația ta financiară",
              "Descoperi dacă există alternative mai bune",
              "Economisești timp și eviți drumurile inutile",
              "Comparații clare între mai multe variante într-un singur loc",
              "Vei discuta cu aceeași persoană pe tot parcursul procesului",
              "Primești explicații simple pe înțelesul tău",
            ].map((text, i) => (
              <div
                key={i}
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--line)",
                  borderRadius: "16px",
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "rgba(57, 255, 136, 0.1)",
                    color: "var(--neon-green)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Check size={16} />
                </div>
                <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)" }}>{text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PROCES TRANSPARENT PAS CU PAS */}
        <section id="proces" className="section" style={{ paddingTop: "20px" }}>
          <div className="section-intro">
            <div>
              <p className="eyebrow">
                <span /> PROCES TRANSPARENT
              </p>
              <h2>Cum funcționează pas cu pas?</h2>
            </div>
          </div>

          <div className="grid grid-4" style={{ gap: "16px" }}>
            <div className="card" style={{ padding: "24px" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--neon-green)" }}>PASUL 1</span>
              <h3 style={{ fontSize: "1.05rem", margin: "8px 0 6px" }}>Completezi formularul</h3>
              <p style={{ fontSize: "0.88rem", margin: 0, color: "var(--muted)" }}>Durează aproximativ 2 minute. Completezi doar informațiile de bază.</p>
            </div>

            <div className="card" style={{ padding: "24px" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--neon-green)" }}>PASUL 2</span>
              <h3 style={{ fontSize: "1.05rem", margin: "8px 0 6px" }}>Analizăm informațiile</h3>
              <p style={{ fontSize: "0.88rem", margin: 0, color: "var(--muted)" }}>Verificăm opțiunile disponibile în piață conform profilului tău.</p>
            </div>

            <div className="card" style={{ padding: "24px" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--neon-green)" }}>PASUL 3</span>
              <h3 style={{ fontSize: "1.05rem", margin: "8px 0 6px" }}>Te contactăm</h3>
              <p style={{ fontSize: "0.88rem", margin: 0, color: "var(--muted)" }}>Dacă identificăm variante potrivite, îți prezentăm opțiunile pe înțelesul tău.</p>
            </div>

            <div className="card" style={{ padding: "24px" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--neon-green)" }}>PASUL 4</span>
              <h3 style={{ fontSize: "1.05rem", margin: "8px 0 6px" }}>Tu decizi</h3>
              <p style={{ fontSize: "0.88rem", margin: 0, color: "var(--muted)" }}>Alegi dacă dorești să mergi mai departe. Nu ai nicio obligație.</p>
            </div>
          </div>
        </section>

        {/* 4. SERVICES SECTION */}
        <section id="servicii" className="section">
          <div className="section-intro">
            <div>
              <p className="eyebrow">
                <span /> CUM TE PUTEM AJUTA
              </p>
              <h2>Serviciile noastre de optimizare</h2>
            </div>
          </div>

          <div className="grid grid-3">
            {servicesList.map((s, i) => {
              const IconComp = s.icon;
              return (
                <div key={i} className="card">
                  <div className="icon">
                    <IconComp size={24} />
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <a className="button" href="#aplica" onClick={() => trackEvent("services_click")}>
              Încep analiza <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* 5. CREDIT TYPES */}
        <section id="tipuri-credite" className="section" style={{ paddingTop: "40px" }}>
          <div className="section-intro">
            <div>
              <p className="eyebrow">
                <span /> PENTRU ORICE NEVOIE
              </p>
              <h2>Adaptat obiectivelor tale</h2>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            {loanTypesList.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid var(--line)",
                  borderRadius: "18px",
                  padding: "20px 24px",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  boxShadow: "0 4px 14px rgba(15, 23, 42, 0.04)",
                  color: "var(--ink)",
                }}
              >
                <Check size={18} style={{ color: "var(--neon-green)" }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 6. CALCULATOR FINANCIAR */}
        <section id="calculator" className="section calculator-section">
          <div className="calculator-box">
            <div className="calc-copy">
              <p className="eyebrow">
                <span /> CALCULATOR OPTIMIZARE
              </p>
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
              <p className="label">Este posibil să economisești:</p>

              <div className="result-main">
                <small>Economisire lunară</small>
                <strong>+ {formatMoney(saving)} RON</strong>
                <span className="per-year">
                  Echivalent cu <b>+ {formatMoney(saving * 12)} RON / an</b>
                </span>
              </div>

              <div className="result-details">
                <div>
                  <span>Noua rată estimată</span>
                  <b>{formatMoney(newPayment)} RON / lună</b>
                </div>
                <div>
                  <span>Finanțare suplimentară posibilitate</span>
                  <b>până la {formatMoney(extraCashPossibility)} RON</b>
                </div>
              </div>

              <button className="button full" onClick={handleCalcSubmit}>
                Verifică analiza <ArrowRight size={18} />
              </button>

              <div style={{ background: "rgba(57, 255, 136, 0.05)", border: "1px solid rgba(57, 255, 136, 0.15)", borderRadius: "12px", padding: "12px 16px", marginTop: "16px" }}>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--neon-green)", fontWeight: 600 }}>
                  Acesta este doar un calcul orientativ. Dacă analiza confirmă aceste valori, diferența anuală poate fi semnificativă.
                </p>
              </div>

              <p className="disclaimer" style={{ marginTop: "12px" }}>
                * Estimarea este orientativă și are rol informativ. Soluțiile disponibile depind de veniturile, istoricul financiar și criteriile fiecărei instituții financiare.
              </p>
            </div>
          </div>
        </section>

        {/* 7. FORMULAR SIMPLIFICATION (Multi-step Form) */}
        <section id="aplica" className="section form-section">
          <div className="form-card">
            <div className="trust-row" style={{ marginTop: 0, marginBottom: "24px", justifyContent: "center" }}>
              <span><Check size={14} /> Analiză gratuită</span>
              <span><Check size={14} /> Date protejate GDPR</span>
              <span><Check size={14} /> Fără obligații</span>
              <span><Check size={14} /> Consultant dedicat</span>
            </div>

            <div className="form-header">
              <p className="eyebrow">
                <span /> ANALIZĂ GRATUITĂ 100%
              </p>
              <h2>Solicită analiza gratuită</h2>
              <p>
                {formStep === 1 && "Pasul 1 din 3 — Obiectiv. Durează sub 2 minute. Fără drumuri la bancă."}
                {formStep === 2 && "Pasul 2 din 3 — Situație financiară. Perfect. Mai este un singur pas."}
                {formStep === 3 && "Ultimul pas — Date de contact. Aproape gata. Sub un minut."}
              </p>

              {/* Progress Steps */}
              <div className="form-steps">
                <div className={`step-item ${formStep >= 1 ? "active" : ""}`}>
                  <span>1</span> Obiectiv
                </div>
                <div className={`step-item ${formStep >= 2 ? "active" : ""}`}>
                  <span>2</span> Situație
                </div>
                <div className={`step-item ${formStep >= 3 ? "active" : ""}`}>
                  <span>3</span> Contact
                </div>
              </div>
            </div>

            {formState === "success" ? (
              <div className="success-screen" role="status" aria-live="polite" style={{ textAlign: "center", padding: "40px 20px" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "rgba(16, 185, 129, 0.1)",
                    color: "#10b981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                  }}
                >
                  <Check size={32} />
                </div>
                <h3 style={{ fontSize: "1.8rem", marginBottom: "12px" }}>Solicitarea a fost transmisă cu succes. Vom contacta în curând.</h3>
                <p style={{ color: "var(--muted)", maxWidth: "520px", margin: "0 auto 16px", lineHeight: 1.6 }}>
                  Analizăm informațiile trimise și revenim cu variantele disponibile, dacă există.
                </p>
                <div style={{ display: "inline-block", background: "rgba(57, 255, 136, 0.1)", border: "1px solid rgba(57, 255, 136, 0.3)", color: "var(--neon-green)", padding: "8px 18px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 700, marginBottom: "16px" }}>
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
                    <div style={{ background: "rgba(57, 255, 136, 0.05)", border: "1px solid rgba(57, 255, 136, 0.15)", borderRadius: "12px", padding: "14px 16px", marginBottom: "24px", fontSize: "0.85rem", color: "var(--ink)" }}>
                      <strong style={{ color: "var(--neon-green)" }}>🔒 Analiza inițială nu afectează scorul tău la Biroul de Credit.</strong>
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

        {/* 8. PROCESS SECTION */}
        <section id="proces" className="section">
          <div className="section-intro">
            <div>
              <p className="eyebrow">
                <span /> PAS CU PAS
              </p>
              <h2>Cum funcționează</h2>
            </div>
          </div>

          <div className="grid grid-3">
            <div className="card">
              <div className="step-num">1</div>
              <h3>Completezi analiza gratuită</h3>
              <p>Durează sub 2 minute să introduci datele tale financiare de bază.</p>
            </div>
            <div className="card">
              <div className="step-num">2</div>
              <h3>Un consultant analizează situația ta</h3>
              <p>Evaluăm opțiunile disponibile din piață de la peste 20 de bănci partenere.</p>
            </div>
            <div className="card">
              <div className="step-num">3</div>
              <h3>Primești soluțiile potrivite</h3>
              <p>Alegi varianta optimă pentru reducerea ratelor sau obținerea fondurilor.</p>
            </div>
          </div>
        </section>

        {/* 9. TRANSPARENCY SECTION */}
        <section id="despre" className="section">
          <div className="section-intro">
            <div>
              <p className="eyebrow">
                <span /> TRANSPARENȚĂ FINANCIARĂ
              </p>
              <h2>Despre CV Finance</h2>
            </div>
          </div>
          <div className="card" style={{ padding: "36px", maxWidth: "960px" }}>
            <p style={{ fontSize: "1.15rem", lineHeight: "1.7", color: "var(--ink)", margin: 0 }}>
              CV Finance este o platformă de consultanță financiară care ajută clienții să analizeze opțiunile disponibile pentru credite, refinanțări și optimizarea costurilor financiare.
            </p>
          </div>
        </section>

        {/* 10. TRUST SECTION */}
        <section id="incredere" className="section">
          <div className="section-intro">
            <div>
              <p className="eyebrow">
                <span /> DE CE CLIENȚII ALEG CV FINANCE
              </p>
              <h2>Partenerul tău independent de încredere</h2>
            </div>
          </div>

          <div className="grid grid-3">
            <div className="card">
              <div className="icon">
                <UserCheck size={24} />
              </div>
              <h3>Consultanță personalizată</h3>
              <p>Analizăm situația ta individual și găsim strategia potrivită profilului tău.</p>
            </div>
            <div className="card">
              <div className="icon">
                <Building2 size={24} />
              </div>
              <h3>Acces la multiple oferte</h3>
              <p>Comparăm direct ofertele celor peste 20 de instituții financiare partenere.</p>
            </div>
            <div className="card">
              <div className="icon">
                <Award size={24} />
              </div>
              <h3>Experiență și expertiză financiară</h3>
              <p>Echipa noastră oferă recomandări obiective și orientate către rezultate.</p>
            </div>
            <div className="card">
              <div className="icon">
                <ShieldCheck size={24} />
              </div>
              <h3>Analiză fără obligații</h3>
              <p>Evaluezi soluțiile gratuit, fără niciun cost ascuns sau obligație contractuală.</p>
            </div>
            <div className="card">
              <div className="icon">
                <BadgeCheck size={24} />
              </div>
              <h3>Consultant dedicat</h3>
              <p>Un singur punct de contact pe parcursul întregului proces de finanțare.</p>
            </div>
            <div className="card">
              <div className="icon">
                <Lock size={24} />
              </div>
              <h3>Confidențialitate garantată</h3>
              <p>Datele tale sunt protejate conform celor mai înalte standarde GDPR.</p>
            </div>
          </div>
        </section>

        {/* 10. REFERRAL PROGRAM */}
        <section id="recomandari" className="section">
          <div
            style={{
              background: "linear-gradient(135deg, #1d1e1b 0%, #141513 100%)",
              border: "1px solid var(--dark-border, #2e302b)",
              borderRadius: "28px",
              padding: "48px 36px",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  background: "rgba(200, 250, 80, 0.15)",
                  color: "var(--lime, #c8fa50)",
                  padding: "10px",
                  borderRadius: "14px",
                }}
              >
                <Gift size={28} />
              </div>
              <div>
                <p className="eyebrow" style={{ color: "var(--lime, #c8fa50)", marginBottom: "4px" }}>
                  <span style={{ background: "var(--lime, #c8fa50)" }} /> PROGRAM DE RECOMANDĂRI
                </p>
                <h2 style={{ color: "#ffffff", margin: 0, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
                  Recomandă și câștigă
                </h2>
              </div>
            </div>

            <p style={{ fontSize: "1.15rem", color: "#a0a29a", maxWidth: "720px", margin: 0 }}>
              Recomandă o persoană interesată de optimizarea unui credit și poți primi un bonus pentru fiecare recomandare eligibilă.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px", marginTop: "12px" }}>
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  padding: "12px 24px",
                  fontSize: "1.2rem",
                  fontWeight: "800",
                  color: "var(--lime, #c8fa50)",
                }}
              >
                500 – 3.000 RON / recomandare
              </div>

              <a className="button" href="/referral" onClick={() => trackEvent("referral_click")}>
                Recomandă un client <Share2 size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* 11. FAQ SECTION */}
        <section id="faq" className="section faq-section">
          <div className="section-intro">
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
        </section>

        {/* 12. CONTACT DIRECT SECTION */}
        <section id="contact-direct" className="section" style={{ paddingTop: "40px" }}>
          <div className="section-intro">
            <div>
              <p className="eyebrow">
                <span /> CANALE OFICIALE
              </p>
              <h2>Contact direct</h2>
              <p style={{ color: "var(--muted)", maxWidth: "600px", marginTop: "8px" }}>
                Discutăm situația ta financiară și identificăm opțiunile potrivite pentru cazul tău.
              </p>
            </div>
          </div>

          <div className="grid grid-3" style={{ gap: "20px" }}>
            <a
              href="https://wa.me/436509536345?text=Bun%C4%83%20ziua%2C%20doresc%20o%20analiz%C4%83%20gratuit%C4%83%20a%20op%C8%9Biunilor%20mele%20financiare."
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{ padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
              <div>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--finance-green)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "8px" }}>
                  WhatsApp
                </span>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "6px" }}>Răspuns rapid prin mesaj</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>Preferat pentru întrebări rapide și trimiterea informațiilor.</p>
              </div>
              <div style={{ marginTop: "20px", fontSize: "1.05rem", fontWeight: 800, color: "var(--bloomberg-navy)", fontFamily: "var(--font-numbers)" }}>
                +43 650 953 6345 →
              </div>
            </a>

            <a
              href="tel:+40767110439"
              className="card"
              style={{ padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
              <div>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--finance-green)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "8px" }}>
                  Telefon
                </span>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "6px" }}>Consultanță directă</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>Luni – Vineri 09:00 – 18:00 pentru conversații telefonice direct cu consultantul.</p>
              </div>
              <div style={{ marginTop: "20px", fontSize: "1.05rem", fontWeight: 800, color: "var(--bloomberg-navy)", fontFamily: "var(--font-numbers)" }}>
                0767 110 439 →
              </div>
            </a>

            <a
              href="mailto:cristianvaduva@duck.com"
              className="card"
              style={{ padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
              <div>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--finance-green)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "8px" }}>
                  Email
                </span>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "6px" }}>Solicitări și documente</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>Trimite întrebări detaliate sau documente necesare pentru analiza dosarului.</p>
              </div>
              <div style={{ marginTop: "20px", fontSize: "1rem", fontWeight: 800, color: "var(--bloomberg-navy)", fontFamily: "var(--font-numbers)", wordBreak: "break-all" }}>
                cristianvaduva@duck.com →
              </div>
            </a>
          </div>
        </section>

        {/* 13. ECOSYSTEM AUTHORITY SECTION */}
        <section id="ecosistem" className="section" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
          <div className="section-intro">
            <div>
              <p className="eyebrow">
                <span /> CRISTIAN VĂDUVA INTELLIGENCE
              </p>
              <h2>Parte din ecosistemul Cristian Văduva Intelligence</h2>
              <p style={{ color: "var(--muted)", maxWidth: "680px", marginTop: "8px", lineHeight: 1.6 }}>
                CV Finance face parte dintr-un ecosistem digital construit pentru decizii mai bune în domeniul financiar, imobiliar, asigurări, business intelligence și sănătate.
              </p>
            </div>
          </div>

          <div className="grid grid-3" style={{ gap: "16px" }}>
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
                className="card"
                style={{ padding: "20px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <strong style={{ fontSize: "1.05rem", color: "var(--bloomberg-navy)" }}>{eco.name}</strong>
                    <span style={{ fontSize: "12px", color: "var(--finance-green)", fontWeight: 700 }}>{eco.url.replace("https://", "")} ↗</span>
                  </div>
                  <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>{eco.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer id="contact">
          <div className="footer-main">
            {/* Zone 01: Cristian Văduva */}
            <div className="footer-col brand-col">
              <a href="#top" className="brand" style={{ letterSpacing: "-1px" }}>
                <span>CV</span> Finance
              </a>
              <p className="brand-desc">
                Credit Advisory & Financial Optimization. Consultanță și intermediere financiară independentă fondată de Cristian Văduva.
              </p>
              <div className="brand-meta">
                <strong>Cristian Văduva</strong>
                <span>Senior Sales · Credit & Financial Advisory</span>
              </div>
              <div className="contact-inline">
                <a href={`tel:${CONTACT.PHONE}`}>Telefon</a>
                <span className="dot">•</span>
                <a href={`https://wa.me/${CONTACT.WHATSAPP}?text=Bun%C4%83%20ziua%2C%20doresc%20o%20analiz%C4%83%20gratuit%C4%83.`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                <span className="dot">•</span>
                <a href={`mailto:${CONTACT.EMAIL}`}>Email</a>
              </div>
              <div className="office-badge">
                <strong>Birou — Piața Victoriei</strong>
                <span>Zonă centrală, București</span>
              </div>
            </div>

            {/* Zone 02: Navigație */}
            <div className="footer-col">
              <strong className="col-title">Navigație</strong>
              <div className="link-strip">
                <a href="#beneficii">Beneficii</a>
                <a href="#servicii">Servicii</a>
                <a href="#calculator">Calculator</a>
                <a href="#proces">Proces</a>
                <a href="/referral">Recomandări</a>
                <a href="#faq">FAQ</a>
                <a href="#contact-direct">Contact</a>
                <a href="#ecosistem">Ecosistem</a>
              </div>
            </div>

            {/* Zone 03: Servicii */}
            <div className="footer-col">
              <strong className="col-title">Servicii</strong>
              <div className="link-strip">
                <a href="#servicii">Credit nou</a>
                <a href="#servicii">Refinanțare</a>
                <a href="#servicii">Optimizarea ratelor</a>
                <a href="#servicii">Biroul de Credit</a>
                <a href="#aplica">Analiză financiară</a>
                <a href="#servicii">Oferte multiple</a>
              </div>
            </div>

            {/* Zone 04: Contact & Birou (Desktop) */}
            <div className="footer-col desktop-contact-col">
              <strong className="col-title">Contact & Birou</strong>
              <div className="desktop-contact-details">
                <div>
                  <strong>Telefon:</strong> <a href={`tel:${CONTACT.PHONE}`}>0767 110 439</a>
                </div>
                <div>
                  <strong>Email:</strong> <a href={`mailto:${CONTACT.EMAIL}`}>{CONTACT.EMAIL}</a>
                </div>
                <div>
                  <strong>WhatsApp:</strong> <a href={`https://wa.me/${CONTACT.WHATSAPP}?text=Bun%C4%83%20ziua%2C%20doresc%20o%20analiz%C4%83%20gratuit%C4%83.`} target="_blank" rel="noopener noreferrer">+43 650 953 6345</a>
                </div>
                <div className="office-card">
                  <strong>Birou — Piața Victoriei</strong>
                  <span>Zonă centrală, București</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-legal-strip">
              <a href="/termeni-si-conditii">Termeni și condiții</a>
              <span className="dot">•</span>
              <a href="/politica-confidentialitate">Politica de confidențialitate</a>
              <span className="dot">•</span>
              <a href="/gdpr">GDPR</a>
              <span className="dot">•</span>
              <button
                onClick={() => typeof window !== "undefined" && window.dispatchEvent(new Event("cv_open_cookie_settings"))}
                className="cookie-btn"
              >
                Cookies
              </button>
              <span className="dot">•</span>
              <a href="/acord-marketing">Acord marketing</a>
              <span className="dot">•</span>
              <a href="/nota-legala">Notă legală</a>
            </div>
            <div className="footer-copyright">
              <span>© {footerYear} CV Finance. Parte din Cristian Văduva Intelligence Ecosystem.</span>
              <span className="tagline">Credit Advisory & Financial Optimization</span>
            </div>
          </div>

          <div className="legal-disclaimer">
            * Disclaimer legal: CV Finance funcționează ca birou de consultanță financiară independentă fondat de Cristian Văduva. Birou în zona centrală — Piața Victoriei, București. Analiza este gratuită și nu garantează aprobarea unui credit. Soluțiile financiare depind direct de criteriile și evaluarea individuală a instituțiilor bancare partenere.
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
