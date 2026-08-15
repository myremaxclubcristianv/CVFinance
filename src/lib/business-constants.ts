export interface BusinessPurposeCard {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  ctaText: string;
}

export const BUSINESS_PURPOSE_CARDS: BusinessPurposeCard[] = [
  {
    id: "capital-lucru",
    category: "01 / CAPITAL DE LUCRU",
    title: "CAPITAL DE LUCRU",
    description: "Finanțare pentru cash-flow, furnizori, stocuri și necesități operaționale ale companiei.",
    tags: ["CASH-FLOW", "FURNIZORI", "STOCURI"],
    ctaText: "Analizez situația →",
  },
  {
    id: "investitii-echipamente",
    category: "02 / INVESTIȚII",
    title: "INVESTIȚII & ECHIPAMENTE",
    description: "Pentru utilaje, echipamente, tehnologie, spații sau investiții care pot susține dezvoltarea companiei.",
    tags: ["UTILAJE", "ECHIPAMENTE", "EXTINDERE"],
    ctaText: "Verific opțiunile →",
  },
  {
    id: "finantare-companie",
    category: "03 / FINANȚARE FIRMĂ",
    title: "FINANȚARE PENTRU COMPANIE",
    description: "Analizăm profilul companiei și identificăm tipurile de finanțare care pot avea sens pentru situația prezentată.",
    tags: ["SRL", "PFA", "COMPANIE"],
    ctaText: "Verific situația →",
  },
  {
    id: "finantare-antreprenor",
    category: "04 / ANTREPRENOR",
    title: "FINANȚARE PENTRU ANTREPRENOR",
    description: "Când nevoia este personală, dar obiectivul financiar este legat de business, analizăm separat situația antreprenorului.",
    tags: ["NEVOI PERSONALE", "BUSINESS OWNER", "PROFIL FINANCIAR"],
    ctaText: "Analizez situația →",
  },
  {
    id: "refinantare-optimizare",
    category: "05 / REFINANȚARE",
    title: "REFINANȚARE & OPTIMIZARE",
    description: "Analizăm finanțările existente și dacă există posibilitatea unei structuri mai eficiente pentru companie.",
    tags: ["RATE", "CONSOLIDARE", "OPTIMIZARE"],
    ctaText: "Verific variantele →",
  },
  {
    id: "capital-crestere",
    category: "06 / CREȘTERE",
    title: "CAPITAL PENTRU CREȘTERE",
    description: "Pentru extindere, proiecte noi, deschiderea unei locații sau următoarea etapă de dezvoltare.",
    tags: ["EXPANSIUNE", "PROIECTE NOI", "CAPITAL"],
    ctaText: "Discutăm situația →",
  },
];

export const BUSINESS_PURPOSES_STEP1 = [
  "Capital de lucru",
  "Echipamente / utilaje",
  "Extindere",
  "Spațiu / achiziție imobil",
  "Refinanțare",
  "Stocuri",
  "Proiect nou",
  "Finanțare personală antreprenor",
  "Altă nevoie",
];

export const COMPANY_TYPES = ["SRL", "PFA", "SA", "Altul"];

export const COMPANY_AGE_RANGES = ["Sub 1 an", "1–3 ani", "3–5 ani", "Peste 5 ani"];

export const EMPLOYEE_RANGES = ["1-5 angajați", "6-20 angajați", "21-50 angajați", "50+ angajați"];

export const REVENUE_RANGES = [
  "< 100.000 RON",
  "100.000–500.000 RON",
  "500.000–1M RON",
  "1M–5M RON",
  "5M+ RON",
];

export const REQUESTED_AMOUNT_RANGES = [
  "< 50.000 RON",
  "50.000–100.000 RON",
  "100.000–250.000 RON",
  "250.000–500.000 RON",
  "500.000+ RON",
];

export const URGENCY_OPTIONS = [
  "URGENT — sub 30 zile",
  "1–3 luni",
  "3–6 luni",
  "Doar analizez opțiunile",
];

export const INTENT_PILLS = [
  "AM NEVOIE DE CAPITAL DE LUCRU",
  "VREAU SĂ INVESTESC ÎN ECHIPAMENTE",
  "VREAU SĂ ÎMI EXTIND AFACEREA",
  "VREAU FINANȚARE PENTRU FIRMĂ",
  "VREAU SĂ REFINANȚEZ CREDITE EXISTENTE",
  "VREAU SĂ DESCHID O NOUĂ LOCAȚIE",
  "AM NEVOIE DE FINANȚARE PERSONALĂ CA ANTREPRENOR",
  "NU ȘTIU CE TIP DE FINANȚARE MI SE POTRIVEȘTE",
];

export interface DiagnosticItem {
  code: string;
  title: string;
  sub: string;
}

export const DIAGNOSTIC_MATRIX_ITEMS: DiagnosticItem[] = [
  { code: "01", title: "COMPANY AGE", sub: "Vechimea companiei" },
  { code: "02", title: "TURNOVER", sub: "Cifra de afaceri" },
  { code: "03", title: "PROFITABILITY", sub: "Profitabilitate" },
  { code: "04", title: "CASH-FLOW", sub: "Cash-flow" },
  { code: "05", title: "EXISTING CREDIT", sub: "Credite existente" },
  { code: "06", title: "MONTHLY PAYMENTS", sub: "Rate lunare" },
  { code: "07", title: "DEBT LEVEL", sub: "Grad de îndatorare" },
  { code: "08", title: "REQUIRED CAPITAL", sub: "Suma necesară" },
  { code: "09", title: "FUNDING PURPOSE", sub: "Destinația finanțării" },
  { code: "10", title: "ENTREPRENEUR PROFILE", sub: "Profilul antreprenorului" },
  { code: "11", title: "CREDIT HISTORY", sub: "Istoricul de credit" },
  { code: "12", title: "FUNDING TIMELINE", sub: "Urgența finanțării" },
];
