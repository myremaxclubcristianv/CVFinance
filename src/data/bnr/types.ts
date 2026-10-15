// Types for BNR Economic Intelligence & Data Architecture
// CV Finance — Verified official financial data from Banca Națională a României (BNR) and INS

export type BnrDataCategory =
  | "monetary_policy"
  | "ircc_robor"
  | "exchange_rates"
  | "banking_rates"
  | "monetary_aggregates"
  | "balance_reserves"
  | "financial_stability";

export type BnrDataStatus =
  | "confirmat"
  | "provizoriu"
  | "revizuit"
  | "estimat"
  | "neverificat";

export interface BnrObservation {
  date: string; // ISO format YYYY-MM-DD, monthly YYYY-MM, or quarterly YYYY-QX
  displayDate: string; // Readable Romanian date (ex: "T4 2026 (aplicabil)", "15 Octombrie 2026")
  value: number;
  displayValue: string; // Formatted value with unit (ex: "5,57%", "5,3370 RON")
  changePp?: number; // Change in percentage points
  changePercent?: number; // Percentage change
  notes?: string;
  status?: BnrDataStatus; // Explicit verification status
  sourceUrl?: string;
  publicationDate?: string;
  verifiedAt?: string; // Date when verified against primary official source
  calculationPeriod?: string; // For IRCC: quarter when underlying transactions took place
  applicationPeriod?: string; // For IRCC: quarter when rate is applied in loan contracts
}

export interface BnrDataSeries {
  id: string;
  category: BnrDataCategory;
  name: string;
  shortName: string;
  code: string; // Official BNR series code (e.g., BNRDOBO_DPM, ROBOR3M, IRCC_TRIM)
  unit: string; // "% pe an", "RON", "milioane EUR", etc.
  frequency: "zilnic" | "lunar" | "trimestrial" | "la decizie";
  currentValue: number;
  currentDisplayValue: string;
  referencePeriod: string;
  lastUpdated: string;
  status?: BnrDataStatus;
  verifiedAt?: string;
  description: string;
  methodology: string;
  practicalRelevance: string; // Explanation of impact on individual credit decisions
  sourceName: string; // "Banca Națională a României (BNR)", "INS"
  sourceUrl: string;
  observations: BnrObservation[];
}

export interface BnrPolicyDecision {
  decisionDate: string;
  effectiveDate: string;
  keyRate: number;
  lombardRate: number;
  depositRate: number;
  minReserveLei: number;
  minReserveFx: number;
  changeBps: number; // in basis points (+25, -25, 0)
  action: "majorare" | "reducere" | "mentinere";
  priorKeyRate: number;
  summary: string;
  pressReleaseUrl: string;
}

export interface BnrEditorialAnalysis {
  id: string;
  slug: string;
  title: string;
  summary: string;
  publishedDate: string;
  lastUpdated: string;
  referencePeriod: string;
  relatedCategory: BnrDataCategory;
  primaryIndicators: { name: string; value: string; period: string }[];
  contentParagraphs: string[];
  takeaways: string[];
  limitations: string;
  disclaimer: string;
  sources: { name: string; url: string; organization: string }[];
}

export interface BnrCategoryMeta {
  id: BnrDataCategory;
  title: string;
  shortTitle: string;
  iconName: string;
  description: string;
  indicatorsCount: number;
  source: string;
}
