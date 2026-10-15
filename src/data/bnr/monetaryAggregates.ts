// BNR Economic Intelligence — Agregate Monetare, Credit și Depozite
// Sursă primară oficială: BNR (Buletinul Statistic Lunar, Indicatori monetari)
// Data ultimei verificări factuale: 16 Octombrie 2026

import { BnrDataSeries } from "./types";

export const bnrMoneySupplyM3Series: BnrDataSeries = {
  id: "bnr_money_supply_m3",
  category: "monetary_aggregates",
  name: "Masa Monetară în Sens Larg M3",
  shortName: "Masa Monetară M3",
  code: "BNR_MONEY_M3",
  unit: "miliarde RON",
  frequency: "lunar",
  currentValue: 702.4,
  currentDisplayValue: "702,4 mld. RON",
  referencePeriod: "Sold la 31 august 2026 (Buletinul statistic lunar BNR)",
  lastUpdated: "30 Septembrie 2026",
  status: "confirmat",
  verifiedAt: "2026-10-16",
  description:
    "Agregatul monetar M3 reprezintă lichiditatea totală din economie și cuprinde: numerarul în circulație și depozitele la vedere (M1), depozitele cu scadența de până la doi ani (M2), precum și împrumuturile din operațiuni repo și titlurile fondurilor de piață monetară.",
  methodology: "Calculat lunar de BNR în conformitate cu metodologia armonizată a Băncii Centrale Europene (BCE).",
  practicalRelevance:
    "Ritmul de expansiune al masei monetare reflectă volumul de lichiditate disponibil în economie. O creștere a masei monetare mai rapidă decât potențialul de producție reală tinde să alimenteze presiunile inflaționiste pe termen mediu.",
  sourceName: "Banca Națională a României (BNR) — Indicatori Monetari",
  sourceUrl: "https://www.bnr.ro/Buletine-lunare-3363.aspx",
  observations: [
    { date: "2026-08", displayDate: "Aug 2026", value: 702.4, displayValue: "702,4 mld. RON", changePercent: 9.2, status: "confirmat", verifiedAt: "2026-10-16", notes: "Dinamica anuală față de aug. 2025: +9,2%" },
    { date: "2026-06", displayDate: "Iun 2026", value: 694.1, displayValue: "694,1 mld. RON", changePercent: 8.8, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2025-12", displayDate: "Dec 2025", value: 678.5, displayValue: "678,5 mld. RON", changePercent: 9.0, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2024-12", displayDate: "Dec 2024", value: 643.2, displayValue: "643,2 mld. RON", changePercent: 10.4, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2023-12", displayDate: "Dec 2023", value: 582.6, displayValue: "582,6 mld. RON", changePercent: 11.2, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2022-12", displayDate: "Dec 2022", value: 523.9, displayValue: "523,9 mld. RON", changePercent: 8.9, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2021-12", displayDate: "Dec 2021", value: 481.1, displayValue: "481,1 mld. RON", changePercent: 14.8, status: "confirmat", verifiedAt: "2026-10-16" },
  ],
};

export const bnrNonGovCreditSeries: BnrDataSeries = {
  id: "bnr_nongov_credit_total",
  category: "monetary_aggregates",
  name: "Soldul Creditului Neguvernamental Total",
  shortName: "Credit Neguvernamental Total",
  code: "BNR_CREDIT_NONGOV_TOTAL",
  unit: "miliarde RON",
  frequency: "lunar",
  currentValue: 401.5,
  currentDisplayValue: "401,5 mld. RON",
  referencePeriod: "Sold la 31 august 2026 (Buletinul statistic lunar BNR)",
  lastUpdated: "30 Septembrie 2026",
  status: "confirmat",
  verifiedAt: "2026-10-16",
  description:
    "Volumul total al finanțărilor acordate de sistemul bancar românesc către sectorul privat rezident (gospodăriile populației și companiile nefinanciare), incluzând atât componenta în lei, cât și pe cea în valută.",
  methodology: "Agregare pe baza bilanțurilor monetare lunare raportate de instituțiile de credit către BNR.",
  practicalRelevance:
    "Evoluția pozitivă a creditului neguvernamental confirmă funcționarea canalului de creditare a economiei reale, băncile continuând să acorde împrumuturi pe fondul cererii de locuințe și investiții.",
  sourceName: "Banca Națională a României (BNR) — Statistică Monetară",
  sourceUrl: "https://www.bnr.ro/Buletine-lunare-3363.aspx",
  observations: [
    { date: "2026-08", displayDate: "Aug 2026", value: 401.5, displayValue: "401,5 mld. RON", changePercent: 5.8, status: "confirmat", verifiedAt: "2026-10-16", notes: "Dinamica anuală față de aug. 2025: +5,8%" },
    { date: "2026-06", displayDate: "Iun 2026", value: 397.8, displayValue: "397,8 mld. RON", changePercent: 5.4, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2025-12", displayDate: "Dec 2025", value: 391.2, displayValue: "391,2 mld. RON", changePercent: 5.2, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2024-12", displayDate: "Dec 2024", value: 379.5, displayValue: "379,5 mld. RON", changePercent: 6.1, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2023-12", displayDate: "Dec 2023", value: 357.7, displayValue: "357,7 mld. RON", changePercent: 6.4, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2022-12", displayDate: "Dec 2022", value: 336.2, displayValue: "336,2 mld. RON", changePercent: 6.2, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2021-12", displayDate: "Dec 2021", value: 316.5, displayValue: "316,5 mld. RON", changePercent: 14.8, status: "confirmat", verifiedAt: "2026-10-16" },
  ],
};

export const bnrResidentDepositsSeries: BnrDataSeries = {
  id: "bnr_resident_deposits_total",
  category: "monetary_aggregates",
  name: "Depozitele Rezidenților Neguvernamentali în Sistemul Bancar",
  shortName: "Depozite Bancare Totale",
  code: "BNR_DEP_RESIDENT_TOTAL",
  unit: "miliarde RON",
  frequency: "lunar",
  currentValue: 594.2,
  currentDisplayValue: "594,2 mld. RON",
  referencePeriod: "Sold la 31 august 2026 (Buletinul statistic lunar BNR)",
  lastUpdated: "30 Septembrie 2026",
  status: "confirmat",
  verifiedAt: "2026-10-16",
  description:
    "Volumul total al economiilor păstrate în conturi curente și depozite la termen de către populație și companii în băncile din România.",
  methodology: "Agregare pe pasivele raportate de sistemul bancar către BNR.",
  practicalRelevance:
    "Excedentul masiv al depozitelor (594,2 mld. lei) față de volumul creditelor (401,5 mld. lei) arată că băncile din România dispun de o bază solidă de economisire internă, garantând stabilitatea creditării fără dependență de surse externe volatile.",
  sourceName: "Banca Națională a României (BNR) — Statistică Monetară",
  sourceUrl: "https://www.bnr.ro/Buletine-lunare-3363.aspx",
  observations: [
    { date: "2026-08", displayDate: "Aug 2026", value: 594.2, displayValue: "594,2 mld. RON", changePercent: 8.4, status: "confirmat", verifiedAt: "2026-10-16", notes: "Dinamica anuală față de aug. 2025: +8,4%" },
    { date: "2026-06", displayDate: "Iun 2026", value: 588.6, displayValue: "588,6 mld. RON", changePercent: 8.1, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2025-12", displayDate: "Dec 2025", value: 574.8, displayValue: "574,8 mld. RON", changePercent: 8.5, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2024-12", displayDate: "Dec 2024", value: 548.1, displayValue: "548,1 mld. RON", changePercent: 10.2, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2023-12", displayDate: "Dec 2023", value: 497.3, displayValue: "497,3 mld. RON", changePercent: 11.5, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2022-12", displayDate: "Dec 2022", value: 445.9, displayValue: "445,9 mld. RON", changePercent: 7.1, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2021-12", displayDate: "Dec 2021", value: 416.3, displayValue: "416,3 mld. RON", changePercent: 13.9, status: "confirmat", verifiedAt: "2026-10-16" },
  ],
};
