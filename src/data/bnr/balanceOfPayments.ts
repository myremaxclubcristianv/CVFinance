// BNR Economic Intelligence — Balanța de Plăți, Rezerve Internaționale și Datorie Externă
// Sursă primară oficială: BNR (Statistica Rezervelor Internaționale, Balanța de Plăți)
// Data ultimei verificări factuale: 16 Octombrie 2026

import { BnrDataSeries } from "./types";

export const bnrInternationalReservesSeries: BnrDataSeries = {
  id: "bnr_international_reserves_total",
  category: "balance_reserves",
  name: "Rezervele Internaționale ale României (Valute + Aur)",
  shortName: "Rezerve Internaționale BNR",
  code: "BNR_RESERVES_TOTAL",
  unit: "milioane EUR",
  frequency: "lunar",
  currentValue: 72340,
  currentDisplayValue: "72.340 mil. EUR",
  referencePeriod: "30 Septembrie 2026 (Comunicat oficial BNR din 1 oct. 2026)",
  lastUpdated: "1 Octombrie 2026",
  status: "confirmat",
  verifiedAt: "2026-10-16",
  description:
    "Valoarea totală a activelor de rezervă internațională administrate de BNR, structurate în rezerve valutare în monede liber convertibile (60.060 mil. euro) și rezerva de 103,6 tone de aur monetar (evaluată la 12.280 mil. euro).",
  methodology: "Raportat lunar de BNR în conformitate cu standardul FMI Data Template on International Reserves.",
  practicalRelevance:
    "Rezervele internaționale reprezintă pilonul fundamental de stabilitate pentru moneda națională. Un volum de peste 72 de miliarde de euro (care acoperă peste 5 luni de importuri de bunuri și servicii) conferă BNR spațiul necesar pentru a asigura lichiditatea externă a statului și a netezi volatilitatea cursului valutar.",
  sourceName: "Banca Națională a României (BNR) — Rezerve Internaționale",
  sourceUrl: "https://www.bnr.ro/Statistica-rezervelor-internationale-3595.aspx",
  observations: [
    { date: "2026-09-30", displayDate: "30 Sept 2026", value: 72340, displayValue: "72.340 mil. EUR", changePercent: -6.81, status: "confirmat", verifiedAt: "2026-10-16", notes: "Valute: 60.060 mil. EUR | Aur: 103,6 t (12.280 mil. EUR)" },
    { date: "2026-08-31", displayDate: "31 Aug 2026", value: 77627, displayValue: "77.627 mil. EUR", changePercent: 1.20, status: "confirmat", verifiedAt: "2026-10-16", notes: "Valute: 64.865 mil. EUR | Aur: 12.762 mil. EUR" },
    { date: "2025-12-31", displayDate: "31 Dec 2025", value: 71400, displayValue: "71.400 mil. EUR", changePercent: 9.65, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2024-12-31", displayDate: "31 Dec 2024", value: 65115, displayValue: "65.115 mil. EUR", changePercent: 9.77, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2023-12-31", displayDate: "31 Dec 2023", value: 59317, displayValue: "59.317 mil. EUR", changePercent: 28.10, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2022-12-31", displayDate: "31 Dec 2022", value: 46305, displayValue: "46.305 mil. EUR", changePercent: 14.40, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2021-12-31", displayDate: "31 Dec 2021", value: 40475, displayValue: "40.475 mil. EUR", changePercent: 8.20, status: "confirmat", verifiedAt: "2026-10-16" },
  ],
};

export const bnrCurrentAccountDeficitSeries: BnrDataSeries = {
  id: "bnr_current_account_deficit",
  category: "balance_reserves",
  name: "Deficitul Contului Curent al Balanței de Plăți",
  shortName: "Deficit Cont Curent",
  code: "BNR_BOP_CURRENT_ACCOUNT",
  unit: "milioane EUR",
  frequency: "lunar",
  currentValue: -16450,
  currentDisplayValue: "-16.450 mil. EUR",
  referencePeriod: "Ianuarie – August 2026 (date provizorii BNR)",
  lastUpdated: "30 Septembrie 2026",
  status: "provizoriu",
  verifiedAt: "2026-10-16",
  description:
    "Soldul net al tranzacțiilor externe curente ale României cu restul lumii pe fluxurile de bunuri, servicii, venituri primare (remunerații, dividende) și venituri secundare (remiteri, transferuri UE).",
  methodology: "Calculat lunar de BNR în conformitate cu Manualul FMI privind Balanța de Plăți (BPM6).",
  practicalRelevance:
    "Un deficit de cont curent persistent arată dependența de capital extern (investiții directe, fonduri europene sau împrumuturi externe) pentru finanțarea consumului intern și a investițiilor, reprezentând un factor de presiune structurală asupra monedei naționale.",
  sourceName: "Banca Națională a României (BNR) — Balanța de Plăți",
  sourceUrl: "https://www.bnr.ro/Buletine-lunare-3363.aspx",
  observations: [
    { date: "2026-08", displayDate: "Ian–Aug 2026 (cumulat)", value: -16450, displayValue: "-16.450 mil. EUR", status: "provizoriu", verifiedAt: "2026-10-16", notes: "Deficit provizoriu 8 luni 2026" },
    { date: "2025-12", displayDate: "An 2025", value: -22800, displayValue: "-22.800 mil. EUR", status: "confirmat", verifiedAt: "2026-10-16", notes: "~7,0% din PIB" },
    { date: "2024-12", displayDate: "An 2024", value: -24100, displayValue: "-24.100 mil. EUR", status: "confirmat", verifiedAt: "2026-10-16", notes: "~7,2% din PIB" },
    { date: "2023-12", displayDate: "An 2023", value: -22560, displayValue: "-22.560 mil. EUR", status: "confirmat", verifiedAt: "2026-10-16", notes: "~7,1% din PIB" },
    { date: "2022-12", displayDate: "An 2022", value: -26570, displayValue: "-26.570 mil. EUR", status: "confirmat", verifiedAt: "2026-10-16", notes: "Vârf al deficitului generat de șocul prețurilor energetice" },
    { date: "2021-12", displayDate: "An 2021", value: -16840, displayValue: "-16.840 mil. EUR", status: "confirmat", verifiedAt: "2026-10-16" },
  ],
};

// Structura datoriei externe totale la 31 august 2026 (date provizorii BNR)
export const bnrExternalDebtSnapshot = {
  totalDebtMillionEur: 178520,
  displayTotal: "178,52 miliarde EUR",
  referenceDate: "31 August 2026 (date provizorii BNR)",
  longTermMillionEur: 132140,
  displayLongTerm: "132,14 miliarde EUR (74,0%)",
  shortTermMillionEur: 46380,
  displayShortTerm: "46,38 miliarde EUR (26,0%)",
  directInvestmentMillionEur: 5820,
  displayFdi: "5,82 miliarde EUR (ISD ian–aug 2026)",
  notes: "Datoria externă include atât datoria publică a administrației, cât și datoria privată negarantată a băncilor și companiilor.",
};
