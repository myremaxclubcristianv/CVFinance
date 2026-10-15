// BNR Economic Intelligence — Dobânzi Medii Bancare și Structura Creditării
// Sursă primară oficială: BNR (Buletinul Statistic Lunar, Statistica ratelor dobânzilor instituțiilor de credit)
// Data ultimei verificări factuale: 16 Octombrie 2026

import { BnrDataSeries } from "./types";

export const bnrConsumerLoanRateSeries: BnrDataSeries = {
  id: "bnr_rate_consumer_loans_new",
  category: "banking_rates",
  name: "Rata Medie a Dobânzii la Creditele Noi de Consum în Lei (Populație)",
  shortName: "Dobândă Medie Consum (Lei)",
  code: "BNR_IR_NEW_HH_CONS_RON",
  unit: "% pe an",
  frequency: "lunar",
  currentValue: 10.85,
  currentDisplayValue: "10,85%",
  referencePeriod: "August 2026 (Buletinul statistic lunar al BNR nr. 8/2026)",
  lastUpdated: "30 Septembrie 2026",
  status: "confirmat",
  verifiedAt: "2026-10-16",
  description:
    "Media ponderată a ratelor dobânzilor nominale anuale practicate de băncile din România pentru contractele noi de credit de consum acordate gospodăriilor populației în moneda națională (lei). Nu include comisioanele și nu reprezintă DAE.",
  methodology:
    "Ponderare statistică realizată de BNR pe baza volumelor efective de credite noi contractate în luna de raportare de toate băncile comerciale autorizate.",
  practicalRelevance:
    "Oferă reperul statistic general al costului împrumuturilor negarantate. O ofertă comercială de credit de consum cu dobândă sub 9,0%–9,5% pe an se plasează sub media pieței, în timp ce niveluri peste 13%–14% indică un cost ridicat sau un profil de risc crescut.",
  sourceName: "Banca Națională a României (BNR) — Statistică Monetară",
  sourceUrl: "https://www.bnr.ro/Buletine-lunare-3363.aspx",
  observations: [
    { date: "2026-08", displayDate: "Aug 2026", value: 10.85, displayValue: "10,85%", changePp: -0.15, status: "confirmat", verifiedAt: "2026-10-16", notes: "Flux lunar credite noi consum lei" },
    { date: "2026-06", displayDate: "Iun 2026", value: 11.00, displayValue: "11,00%", changePp: -0.20, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2025-12", displayDate: "Dec 2025", value: 11.20, displayValue: "11,20%", changePp: -0.35, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2024-12", displayDate: "Dec 2024", value: 11.55, displayValue: "11,55%", changePp: -0.80, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2023-12", displayDate: "Dec 2023", value: 12.35, displayValue: "12,35%", changePp: -1.25, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2022-12", displayDate: "Dec 2022", value: 13.60, displayValue: "13,60%", changePp: 4.80, status: "confirmat", verifiedAt: "2026-10-16", notes: "Vârful scumpirii împrumuturilor negarantate" },
    { date: "2021-12", displayDate: "Dec 2021", value: 8.80, displayValue: "8,80%", changePp: 0.60, status: "confirmat", verifiedAt: "2026-10-16" },
  ],
};

export const bnrHousingLoanRateSeries: BnrDataSeries = {
  id: "bnr_rate_housing_loans_new",
  category: "banking_rates",
  name: "Rata Medie a Dobânzii la Creditele Noi pentru Locuințe în Lei (Populație)",
  shortName: "Dobândă Medie Ipotecar (Lei)",
  code: "BNR_IR_NEW_HH_HOUSE_RON",
  unit: "% pe an",
  frequency: "lunar",
  currentValue: 7.42,
  currentDisplayValue: "7,42%",
  referencePeriod: "August 2026 (Buletinul statistic lunar al BNR nr. 8/2026)",
  lastUpdated: "30 Septembrie 2026",
  status: "confirmat",
  verifiedAt: "2026-10-16",
  description:
    "Media ponderată a ratelor dobânzilor nominale anuale pentru contractele noi de credite pentru locuințe (ipotecare și imobiliare) acordate gospodăriilor populației în moneda națională (lei).",
  methodology:
    "Calculată lunar de BNR prin agregarea ratelor din contractele noi raportate de băncile comerciale. Reflectă atât credite cu dobândă fixă inițială, cât și credite cu dobândă variabilă.",
  practicalRelevance:
    "Reper de bază pentru compararea ofertelor de credit ipotecar și refinanțare. Ofertele promoționale cu dobândă fixă pe 3–5 ani gravitează în jurul a 5,50%–6,10%, în timp ce dobânzile variabile (IRCC + marjă de 2,2%–2,8%) se situează în jurul mediei de 7,4%–8,0%.",
  sourceName: "Banca Națională a României (BNR) — Statistică Monetară",
  sourceUrl: "https://www.bnr.ro/Buletine-lunare-3363.aspx",
  observations: [
    { date: "2026-08", displayDate: "Aug 2026", value: 7.42, displayValue: "7,42%", changePp: -0.10, status: "confirmat", verifiedAt: "2026-10-16", notes: "Flux lunar credite noi locuințe lei" },
    { date: "2026-06", displayDate: "Iun 2026", value: 7.52, displayValue: "7,52%", changePp: -0.18, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2025-12", displayDate: "Dec 2025", value: 7.70, displayValue: "7,70%", changePp: -0.30, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2024-12", displayDate: "Dec 2024", value: 8.00, displayValue: "8,00%", changePp: -0.45, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2023-12", displayDate: "Dec 2023", value: 8.45, displayValue: "8,45%", changePp: 0.15, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2022-12", displayDate: "Dec 2022", value: 8.30, displayValue: "8,30%", changePp: 4.10, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2021-12", displayDate: "Dec 2021", value: 4.20, displayValue: "4,20%", changePp: 0.20, status: "confirmat", verifiedAt: "2026-10-16" },
  ],
};

export const bnrDepositRateSeries: BnrDataSeries = {
  id: "bnr_rate_term_deposits_hh",
  category: "banking_rates",
  name: "Rata Medie a Dobânzii la Depozitele Noi la Termen ale Populației (Lei)",
  shortName: "Dobândă Medie Depozite Populație",
  code: "BNR_IR_NEW_HH_DEP_RON",
  unit: "% pe an",
  frequency: "lunar",
  currentValue: 5.45,
  currentDisplayValue: "5,45%",
  referencePeriod: "August 2026 (Buletinul statistic lunar al BNR nr. 8/2026)",
  lastUpdated: "30 Septembrie 2026",
  status: "confirmat",
  verifiedAt: "2026-10-16",
  description:
    "Remunerația medie plătită de instituțiile de credit din România pentru depozitele la termen nou constituite de gospodăriile populației în moneda națională (lei).",
  methodology: "Ponderare pe volumele de depozite nou atrase în luna de raportare.",
  practicalRelevance:
    "Marja brută de intermediere bancară pentru creditele ipotecare (diferența dintre 7,42% la locuințe și 5,45% la depozite) este de circa 1,97 puncte procentuale, reflectând costul rezervelor minime obligatorii, contribuțiile FGDB, riscul de credit și cheltuielile operaționale.",
  sourceName: "Banca Națională a României (BNR) — Statistică Monetară",
  sourceUrl: "https://www.bnr.ro/Buletine-lunare-3363.aspx",
  observations: [
    { date: "2026-08", displayDate: "Aug 2026", value: 5.45, displayValue: "5,45%", changePp: -0.15, status: "confirmat", verifiedAt: "2026-10-16", notes: "Flux lunar depozite noi la termen lei" },
    { date: "2026-06", displayDate: "Iun 2026", value: 5.60, displayValue: "5,60%", changePp: -0.10, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2025-12", displayDate: "Dec 2025", value: 5.70, displayValue: "5,70%", changePp: -0.30, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2024-12", displayDate: "Dec 2024", value: 6.00, displayValue: "6,00%", changePp: -0.75, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2023-12", displayDate: "Dec 2023", value: 6.75, displayValue: "6,75%", changePp: -0.50, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2022-12", displayDate: "Dec 2022", value: 7.25, displayValue: "7,25%", changePp: 5.15, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2021-12", displayDate: "Dec 2021", value: 2.10, displayValue: "2,10%", changePp: 0.70, status: "confirmat", verifiedAt: "2026-10-16" },
  ],
};

// Structura soldului creditului neguvernamental la 31 august 2026 (date confirmate BNR)
export const bnrCreditStructure = {
  totalCreditBillionRon: 401.5,
  displayTotal: "401,5 miliarde RON",
  referenceDate: "31 August 2026 (Buletin statistic BNR)",
  currencyBreakdown: [
    { currency: "Credite în Lei (RON)", share: 68.4, displayShare: "68,4%", valueBillion: 274.6, annualGrowth: "+7,2%", trend: "dominant" },
    { currency: "Credite în Valută (EUR/USD)", share: 31.6, displayShare: "31,6%", valueBillion: 126.9, annualGrowth: "+1,8%", trend: "restrâns" },
  ],
  sectorBreakdown: [
    { sector: "Populație (Gospodării)", share: 44.5, displayShare: "44,5%", valueBillion: 178.7, mainUse: "Locuințe (72%) și Consum (28%)" },
    { sector: "Societăți Nefinanciare (Companii)", share: 55.5, displayShare: "55,5%", valueBillion: 222.8, mainUse: "Capital de lucru și investiții productive" },
  ],
  disclaimer:
    "Datele statistice BNR prezintă mediile ponderate pe întregul sistem bancar românesc. Acestea nu constituie oferte comerciale garantate pentru solicitanți individuali.",
};
