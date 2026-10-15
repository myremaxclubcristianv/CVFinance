// BNR Economic Intelligence — Cursuri Valutare Oficiale BNR
// Sursă primară oficială: BNR (Piața Valutară, Cursul de schimb al pieței valutare)
// Data ultimei verificări factuale: 16 Octombrie 2026

import { BnrDataSeries } from "./types";

export const bnrFxEurSeries: BnrDataSeries = {
  id: "bnr_fx_eur_ron",
  category: "exchange_rates",
  name: "Cursul de Schimb Oficial EUR/RON (Euro în Lei)",
  shortName: "EUR/RON",
  code: "BNR_FX_EUR",
  unit: "RON / 1 EUR",
  frequency: "zilnic",
  currentValue: 5.3370,
  currentDisplayValue: "5,3370 RON",
  referencePeriod: "15 Octombrie 2026 (ședința oficială BNR ora 13:00)",
  lastUpdated: "15 Octombrie 2026",
  status: "confirmat",
  verifiedAt: "2026-10-16",
  description:
    "Cursul de referință calculat zilnic de Banca Națională a României pe baza cotațiilor pieței valutare interbancare. Reprezintă etalonul oficial pentru contracte, evaluări imobiliare și decontări exprimate în euro.",
  methodology:
    "Calculat ca medie a cotațiilor transmise între orele 12:45 și 13:00 de către băncile comerciale participante pe piața valutară internă. Este publicat la ora 13:00 și este valabil pentru tranzacțiile zilei bancare următoare.",
  practicalRelevance:
    "Un debitor cu un credit ipotecar în euro suportă direct riscul valutar: orice depreciere a leului majorează automat efortul lunar în moneda salariului. La plata ratelor, băncile aplică propriul curs comercial de vânzare, care include marja proprie peste cursul BNR.",
  sourceName: "Banca Națională a României (BNR) — Piața Valutară",
  sourceUrl: "https://www.bnr.ro/Cursul-de-schimb-524.aspx",
  observations: [
    { date: "2026-10-15", displayDate: "15 Oct 2026", value: 5.3370, displayValue: "5,3370 RON", changePercent: -0.04, status: "confirmat", verifiedAt: "2026-10-16", notes: "Cotație oficială BNR (-0,0023 lei față de 14 oct 2026)" },
    { date: "2026-10-14", displayDate: "14 Oct 2026", value: 5.3393, displayValue: "5,3393 RON", changePercent: 0.02, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2026-06-30", displayDate: "30 Iun 2026", value: 5.2850, displayValue: "5,2850 RON", changePercent: 0.15, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2026-YTD", displayDate: "Medie YTD (până la 15 oct. 2026)", value: 5.2140, displayValue: "5,2140 RON", changePercent: 4.81, status: "provizoriu", verifiedAt: "2026-10-16", notes: "Medie aritmetică YTD provizorie a cotațiilor zilnice BNR (1 ianuarie – 15 octombrie 2026). Media anuală definitivă 2026 este publicată de BNR exclusiv după încheierea anului calendaristic." },
    { date: "2025-12-31", displayDate: "An 2025 (medie)", value: 5.0820, displayValue: "5,0820 RON", changePercent: 2.16, status: "confirmat", verifiedAt: "2026-10-16", notes: "Medie anuală definitivă 2025" },
    { date: "2024-12-31", displayDate: "An 2024 (medie)", value: 4.9746, displayValue: "4,9746 RON", changePercent: 0.57, status: "confirmat", verifiedAt: "2026-10-16", notes: "Medie anuală definitivă 2024" },
    { date: "2023-12-31", displayDate: "An 2023 (medie)", value: 4.9465, displayValue: "4,9465 RON", changePercent: 0.30, status: "confirmat", verifiedAt: "2026-10-16", notes: "Medie anuală definitivă 2023" },
    { date: "2022-12-31", displayDate: "An 2022 (medie)", value: 4.9315, displayValue: "4,9315 RON", changePercent: 0.23, status: "confirmat", verifiedAt: "2026-10-16", notes: "Medie anuală definitivă 2022" },
    { date: "2021-12-31", displayDate: "An 2021 (medie)", value: 4.9204, displayValue: "4,9204 RON", changePercent: 1.72, status: "confirmat", verifiedAt: "2026-10-16", notes: "Medie anuală definitivă 2021" },
    { date: "2020-12-31", displayDate: "An 2020 (medie)", value: 4.8371, displayValue: "4,8371 RON", changePercent: 1.94, status: "confirmat", verifiedAt: "2026-10-16", notes: "Medie anuală definitivă 2020" },
  ],
};

export const bnrFxUsdSeries: BnrDataSeries = {
  id: "bnr_fx_usd_ron",
  category: "exchange_rates",
  name: "Cursul de Schimb Oficial USD/RON (Dolar SUA în Lei)",
  shortName: "USD/RON",
  code: "BNR_FX_USD",
  unit: "RON / 1 USD",
  frequency: "zilnic",
  currentValue: 4.7571,
  currentDisplayValue: "4,7571 RON",
  referencePeriod: "15 Octombrie 2026 (ședința oficială BNR ora 13:00)",
  lastUpdated: "15 Octombrie 2026",
  status: "confirmat",
  verifiedAt: "2026-10-16",
  description:
    "Cursul oficial de referință al dolarului american calculat de BNR indirect prin raportul dintre cursul EUR/RON și cotația EUR/USD de pe piețele internaționale.",
  methodology: "Calculat indirect pe baza cotației EUR/USD de pe piețele financiare internaționale de la ora 13:00.",
  practicalRelevance:
    "Influențează costul materiilor prime, al energiei și al componentelor electronice importate, având impact indirect asupra dinamicii indicelui prețurilor de consum (inflația IPC).",
  sourceName: "Banca Națională a României (BNR)",
  sourceUrl: "https://www.bnr.ro/Cursul-de-schimb-524.aspx",
  observations: [
    { date: "2026-10-15", displayDate: "15 Oct 2026", value: 4.7571, displayValue: "4,7571 RON", changePercent: -0.28, status: "confirmat", verifiedAt: "2026-10-16", notes: "Cotație oficială BNR (-0,0135 lei față de 14 oct 2026)" },
    { date: "2026-10-14", displayDate: "14 Oct 2026", value: 4.7706, displayValue: "4,7706 RON", changePercent: 0.12, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2026-06-30", displayDate: "30 Iun 2026", value: 4.7120, displayValue: "4,7120 RON", changePercent: 0.18, status: "confirmat", verifiedAt: "2026-10-16" },
    { date: "2026-YTD", displayDate: "Medie YTD (până la 15 oct. 2026)", value: 4.6850, displayValue: "4,6850 RON", changePercent: 1.88, status: "provizoriu", verifiedAt: "2026-10-16", notes: "Medie aritmetică YTD provizorie a cotațiilor zilnice BNR (1 ianuarie – 15 octombrie 2026). Media anuală definitivă 2026 este publicată de BNR exclusiv după încheierea anului calendaristic." },
    { date: "2025-12-31", displayDate: "An 2025 (medie)", value: 4.6420, displayValue: "4,6420 RON", changePercent: 0.95, status: "confirmat", verifiedAt: "2026-10-16", notes: "Medie anuală definitivă 2025" },
    { date: "2024-12-31", displayDate: "An 2024 (medie)", value: 4.5984, displayValue: "4,5984 RON", changePercent: 0.53, status: "confirmat", verifiedAt: "2026-10-16", notes: "Medie anuală definitivă 2024" },
    { date: "2023-12-31", displayDate: "An 2023 (medie)", value: 4.5743, displayValue: "4,5743 RON", changePercent: -2.43, status: "confirmat", verifiedAt: "2026-10-16", notes: "Medie anuală definitivă 2023" },
    { date: "2022-12-31", displayDate: "An 2022 (medie)", value: 4.6885, displayValue: "4,6885 RON", changePercent: 12.69, status: "confirmat", verifiedAt: "2026-10-16", notes: "Vârful aprecierii globale a dolarului" },
    { date: "2021-12-31", displayDate: "An 2021 (medie)", value: 4.1604, displayValue: "4,1604 RON", changePercent: -1.97, status: "confirmat", verifiedAt: "2026-10-16", notes: "Medie anuală definitivă 2021" },
    { date: "2020-12-31", displayDate: "An 2020 (medie)", value: 4.2440, displayValue: "4,2440 RON", changePercent: 0.08, status: "confirmat", verifiedAt: "2026-10-16", notes: "Medie anuală definitivă 2020" },
  ],
};

// Snapshot oficial al cotațiilor BNR pentru principalele valute la data de 15 Octombrie 2026
export const bnrFxCurrenciesSnapshot = [
  { currency: "EUR / RON", value: 5.3370, displayValue: "5,3370 RON", changeDaily: "-0,0023", changeAnnual: "+4,81%", role: "Moneda etalon de referință în contracte", date: "15 Octombrie 2026" },
  { currency: "USD / RON", value: 4.7571, displayValue: "4,7571 RON", changeDaily: "-0,0135", changeAnnual: "+1,88%", role: "Comerț internațional, energie & tehnologie", date: "15 Octombrie 2026" },
  { currency: "GBP / RON", value: 6.3104, displayValue: "6,3104 RON", changeDaily: "-0,0169", changeAnnual: "+3,12%", role: "Remiteri și comerț cu Regatul Unit", date: "15 Octombrie 2026" },
  { currency: "CHF / RON", value: 5.7356, displayValue: "5,7356 RON", changeDaily: "+0,0117", changeAnnual: "+5,40%", role: "Activ de refugiu financiar internațional", date: "15 Octombrie 2026" },
];

export const FX_DISCLAIMER =
  "Cursurile publicate de BNR sunt cotații oficiale de referință statistică și decontare. Cursurile comerciale aplicate la ghișeele instituțiilor de credit sau în aplicațiile de schimb valutar includ marje de schimb proprii (spread) și diferă de cotația oficială a Băncii Naționale.";
