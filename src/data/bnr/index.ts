// BNR Economic Intelligence Registry
// CV Finance — Verified official economic and financial data from Banca Națională a României (BNR) and INS
// Data ultimei verificări factuale: 16 Octombrie 2026

import { BnrCategoryMeta, BnrDataCategory, BnrDataSeries, BnrEditorialAnalysis } from "./types";
import {
  BNR_CURRENT_POLICY,
  BNR_POLICY_DECISIONS,
  bnrPolicyRateSeries,
  bnrStandingFacilitiesSeries
} from "./monetaryPolicy";
import {
  irccQuarterlySeries,
  robor3mSeries,
  roborTenorSnapshot,
  IRCC_VS_ROBOR_COMPARISON
} from "./irccRobor";
import {
  bnrFxEurSeries,
  bnrFxUsdSeries,
  bnrFxCurrenciesSnapshot,
  FX_DISCLAIMER
} from "./exchangeRates";
import {
  bnrConsumerLoanRateSeries,
  bnrHousingLoanRateSeries,
  bnrDepositRateSeries,
  bnrCreditStructure
} from "./bankingCreditRates";
import {
  bnrMoneySupplyM3Series,
  bnrNonGovCreditSeries,
  bnrResidentDepositsSeries
} from "./monetaryAggregates";
import {
  bnrInternationalReservesSeries,
  bnrCurrentAccountDeficitSeries,
  bnrExternalDebtSnapshot
} from "./balanceOfPayments";
import { FINANCIAL_STABILITY_SERIES } from "./financialStability";
import { BNR_EDITORIAL_ANALYSES } from "./editorialAnalyses";

// Export everything from submodules
export * from "./types";
export * from "./monetaryPolicy";
export * from "./irccRobor";
export * from "./exchangeRates";
export * from "./bankingCreditRates";
export * from "./monetaryAggregates";
export * from "./balanceOfPayments";
export * from "./financialStability";
export * from "./editorialAnalyses";

// Catalog complet al seriilor oficiale BNR
export const ALL_BNR_SERIES: BnrDataSeries[] = [
  // A. Politica monetară BNR
  bnrPolicyRateSeries,
  bnrStandingFacilitiesSeries,
  // B. IRCC și ROBOR
  irccQuarterlySeries,
  robor3mSeries,
  // C. Cursuri valutare BNR
  bnrFxEurSeries,
  bnrFxUsdSeries,
  // D. Dobânzi bancare și creditare
  bnrHousingLoanRateSeries,
  bnrConsumerLoanRateSeries,
  bnrDepositRateSeries,
  // E. Monedă și lichiditate
  bnrMoneySupplyM3Series,
  bnrNonGovCreditSeries,
  bnrResidentDepositsSeries,
  // F. Balanță de plăți și rezerve
  bnrInternationalReservesSeries,
  bnrCurrentAccountDeficitSeries,
  // G. Stabilitate financiară și sistem bancar
  ...FINANCIAL_STABILITY_SERIES
];

// Metadatele celor 7 categorii de date oficiale
export const BNR_CATEGORIES_META: BnrCategoryMeta[] = [
  {
    id: "monetary_policy",
    title: "Politica Monetară BNR",
    shortTitle: "Politică Monetară",
    iconName: "Landmark",
    description: "Rata dobânzii de politică monetară (6,50%), facilitățile permanente Lombard (7,50%) și Depozit (5,50%), deciziile CA al BNR și coridorul simetric.",
    indicatorsCount: 2,
    source: "Banca Națională a României (BNR)"
  },
  {
    id: "ircc_robor",
    title: "Indici Credite: IRCC & ROBOR",
    shortTitle: "IRCC & ROBOR",
    iconName: "TrendingUp",
    description: "Seria istorică completă a celor 31 de trimestre IRCC (2019–2026), cotațiile scadențelor ROBOR (ON, 1M, 3M, 6M, 12M) și diferențele metodologice.",
    indicatorsCount: 2,
    source: "Banca Națională a României (BNR)"
  },
  {
    id: "exchange_rates",
    title: "Cursuri Valutare BNR",
    shortTitle: "Curs Valutar",
    iconName: "Coins",
    description: "Cotațiile oficiale de referință EUR/RON (5,3370), USD/RON (4,7571), GBP și CHF, medii anuale 2020–2025 și media provizorie YTD 2026.",
    indicatorsCount: 2,
    source: "Banca Națională a României (BNR)"
  },
  {
    id: "banking_rates",
    title: "Dobânzi Bancare & Creditare",
    shortTitle: "Dobânzi & Credite",
    iconName: "Percent",
    description: "Dobânzi medii nominale la creditele noi pentru locuințe (7,42%), credite de consum (10,85%), depozite (5,45%) și structura creditului în lei (68,4%) vs valută (31,6%).",
    indicatorsCount: 3,
    source: "Banca Națională a României (BNR)"
  },
  {
    id: "monetary_aggregates",
    title: "Masă Monetară & Lichiditate",
    shortTitle: "Masă Monetară",
    iconName: "BarChart3",
    description: "Masa monetară M3 (702,4 mld. lei), soldul creditului neguvernamental (401,5 mld. lei) și depozitele rezidenților (594,2 mld. lei) la 31 august 2026.",
    indicatorsCount: 3,
    source: "Banca Națională a României (BNR)"
  },
  {
    id: "balance_reserves",
    title: "Rezerve & Balanță de Plăți",
    shortTitle: "Rezerve & Cont Curent",
    iconName: "ShieldCheck",
    description: "Rezervele internaționale ale României la 30 septembrie 2026 (72,34 mld. EUR: 60,06 mld. EUR valută + 103,6 tone aur), deficitul contului curent și datoria externă.",
    indicatorsCount: 2,
    source: "Banca Națională a României (BNR)"
  },
  {
    id: "financial_stability",
    title: "Stabilitate Financiară & Sistem Bancar",
    shortTitle: "Stabilitate Bancară",
    iconName: "Shield",
    description: "Solvabilitatea bancară (25,80%), rata creditelor neperformante NPL (2,70%), acoperirea lichidității LCR (268,0%) și plafonul de îndatorare DSTI (40% / 45%).",
    indicatorsCount: 5,
    source: "Banca Națională a României (BNR)"
  }
];

export function getBnrSeriesByCategory(category: BnrDataCategory): BnrDataSeries[] {
  return ALL_BNR_SERIES.filter((s) => s.category === category);
}

export function getBnrSeriesById(id: string): BnrDataSeries | undefined {
  return ALL_BNR_SERIES.find((s) => s.id === id);
}

export function searchBnrSeries(query: string): BnrDataSeries[] {
  const q = query.trim().toLowerCase();
  if (!q) return ALL_BNR_SERIES;
  return ALL_BNR_SERIES.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.shortName.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
  );
}

export function getBnrEditorialBySlug(slug: string): BnrEditorialAnalysis | undefined {
  return BNR_EDITORIAL_ANALYSES.find((a) => a.slug === slug);
}

export interface BnrTickerItem {
  id: string;
  name: string;
  value: string;
  period: string;
  changeBadge?: string;
  isPositive?: boolean;
}

// Ultimele valori oficiale disponibile BNR (cu perioadă exactă de referință)
export function getBnrTickerItems(): BnrTickerItem[] {
  return [
    {
      id: "ircc_ticker",
      name: "IRCC Trimestrial",
      value: "5,57%",
      period: "În vigoare T4 2026 (1 oct – 31 dec)",
      changeBadge: "+0,01 pp",
      isPositive: true
    },
    {
      id: "robor_ticker",
      name: "ROBOR 3M",
      value: "6,08%",
      period: "15 Oct 2026 (Fixing 11:00)",
      changeBadge: "-0,01 pp",
      isPositive: true
    },
    {
      id: "policy_rate_ticker",
      name: "Dobândă BNR",
      value: "6,50%",
      period: "În vigoare (CA BNR)",
      changeBadge: "Menținută",
      isPositive: true
    },
    {
      id: "eur_ron_ticker",
      name: "EUR/RON BNR",
      value: "5,3370",
      period: "15 Oct 2026 (ora 13:00)",
      changeBadge: "-0,0023 lei",
      isPositive: true
    },
    {
      id: "usd_ron_ticker",
      name: "USD/RON BNR",
      value: "4,7571",
      period: "15 Oct 2026 (ora 13:00)",
      changeBadge: "-0,0135 lei",
      isPositive: true
    },
    {
      id: "reserves_ticker",
      name: "Rezerve BNR",
      value: "72,34 mld. €",
      period: "La 30 Sept 2026",
      changeBadge: "103,6 t aur",
      isPositive: true
    },
    {
      id: "solvency_ticker",
      name: "Solvabilitate",
      value: "25,80%",
      period: "T2 2026 (BNR)",
      changeBadge: "Minim legal: 8%",
      isPositive: true
    },
    {
      id: "npl_ticker",
      name: "Credite Neperformante",
      value: "2,70%",
      period: "Iun 2026 (EBA)",
      changeBadge: "Agregat bănci",
      isPositive: true
    }
  ];
}

// Statistici globale ale centrului de date
export const BNR_DATASET_STATS = {
  totalSeries: ALL_BNR_SERIES.length,
  totalObservations: ALL_BNR_SERIES.reduce((acc, s) => acc + s.observations.length, 0),
  categoriesCount: BNR_CATEGORIES_META.length,
  policyDecisionsCount: BNR_POLICY_DECISIONS.length,
  editorialAnalysesCount: BNR_EDITORIAL_ANALYSES.length,
  lastVerifiedDate: "16 Octombrie 2026",
  primarySources: [
    "Banca Națională a României (BNR) — www.bnr.ro",
    "Institutul Național de Statistică (INS) — www.insse.ro",
    "Autoritatea Bancară Europeană (EBA)",
    "Fondul de Garantare a Depozitelor Bancare (FGDB) — www.fgdb.ro"
  ]
};
