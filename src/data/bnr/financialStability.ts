// BNR Economic Intelligence — Stabilitate Financiară și Sistem Bancar
// Sursă primară oficială: BNR (Rapoartele asupra Stabilității Financiare, Indicatori de solvabilitate și calitatea activelor, Cadrul de reglementare prudențială)
// Data ultimei verificări factuale: 16 Octombrie 2026

import { BnrDataSeries } from "./types";

export const FINANCIAL_STABILITY_SERIES: BnrDataSeries[] = [
  {
    id: "bnr_solvency_ratio",
    category: "financial_stability",
    name: "Rata Fondurilor Proprii Totale (Solvabilitatea Bancară)",
    shortName: "Solvabilitate bancară",
    code: "BNR_STAB_SOLV",
    unit: "%",
    frequency: "trimestrial",
    currentValue: 25.8,
    currentDisplayValue: "25,80%",
    referencePeriod: "T2 2026 (Raportări prudențiale BNR)",
    lastUpdated: "30 Septembrie 2026",
    status: "confirmat",
    verifiedAt: "2026-10-16",
    description:
      "Raportul dintre fondurile proprii totale ale instituțiilor de credit din România și cuantumul total al expunerii ponderate la risc (RWA), conform cadrului de reglementare Basel III / CRR.",
    methodology:
      "Calculat trimestrial de BNR pe baza raportărilor prudențiale ale băncilor comerciale. Cerința minimă de reglementare este de 8%, la care se adaugă amortizoarele de capital (amortizorul de conservare a capitalului, amortizorul anticiclic, amortizorul de risc sistemic).",
    practicalRelevance:
      "Nivelul agregat de 25,80% indică o capitalizare robustă a sistemului bancar românesc, semnificativ peste media UE (circa 19-20%), oferind o pernă confortabilă de absorbție a potențialelor pierderi din creditare fără a periclita economiile deponenților.",
    sourceName: "Banca Națională a României (BNR) — Stabilitate Financiară",
    sourceUrl: "https://www.bnr.ro/Rapoarte-asupra-stabilitatii-financiare-3379.aspx",
    observations: [
      { date: "2026-Q2", displayDate: "T2 2026", value: 25.8, displayValue: "25,80%", changePp: 0.1, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2026-Q1", displayDate: "T1 2026", value: 25.7, displayValue: "25,70%", changePp: 0.1, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2025-Q4", displayDate: "T4 2025", value: 25.6, displayValue: "25,60%", changePp: 0.5, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2025-Q2", displayDate: "T2 2025", value: 25.1, displayValue: "25,10%", changePp: -0.1, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2024-Q4", displayDate: "T4 2024", value: 25.2, displayValue: "25,20%", changePp: 0.7, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2024-Q2", displayDate: "T2 2024", value: 24.5, displayValue: "24,50%", changePp: 0.6, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2023-Q4", displayDate: "T4 2023", value: 23.9, displayValue: "23,90%", changePp: 1.1, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2023-Q2", displayDate: "T2 2023", value: 22.8, displayValue: "22,80%", changePp: -0.6, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2022-Q4", displayDate: "T4 2022", value: 23.4, displayValue: "23,40%", changePp: 0.8, status: "confirmat", verifiedAt: "2026-10-16" },
    ]
  },
  {
    id: "bnr_npl_ratio",
    category: "financial_stability",
    name: "Rata Creditelor Neperformante (NPL - Metodologie EBA)",
    shortName: "Credite Neperformante (NPL)",
    code: "BNR_STAB_NPL",
    unit: "%",
    frequency: "trimestrial",
    currentValue: 2.7,
    currentDisplayValue: "2,70%",
    referencePeriod: "Iunie 2026 (Raport BNR / metodologie EBA)",
    lastUpdated: "30 Septembrie 2026",
    status: "confirmat",
    verifiedAt: "2026-10-16",
    description:
      "Ponderea expunerilor neperformante în totalul portofoliului brut de credite și avansuri bancare din România, determinată pe baza definiției standardizate a Autorității Bancare Europene (EBA).",
    methodology:
      "Include împrumuturile cu întârzieri la plată de peste 90 de zile sau pentru care este improbabilă rambursarea integrală fără executarea garanțiilor imobiliare. Nu include dobânzile acumulate.",
    practicalRelevance:
      "Scăderea NPL la 2,70% (față de peste 21% în 2014) reflectă asanarea bilanțurilor băncilor din România și prudența sporită în acordarea de noi împrumuturi. Nivelul agregat scăzut menține deschise fluxurile de creditare și previne creșterea marjelor de risc.",
    sourceName: "Banca Națională a României (BNR) — Stabilitate Financiară",
    sourceUrl: "https://www.bnr.ro/Rapoarte-asupra-stabilitatii-financiare-3379.aspx",
    observations: [
      { date: "2026-Q2", displayDate: "T2 2026 (Iunie)", value: 2.70, displayValue: "2,70%", changePp: -0.02, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2026-Q1", displayDate: "T1 2026 (Martie)", value: 2.72, displayValue: "2,72%", changePp: 0.04, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2025-Q4", displayDate: "T4 2025", value: 2.68, displayValue: "2,68%", changePp: 0.06, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2025-Q2", displayDate: "T2 2025", value: 2.62, displayValue: "2,62%", changePp: 0.07, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2024-Q4", displayDate: "T4 2024", value: 2.55, displayValue: "2,55%", changePp: 0.07, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2024-Q2", displayDate: "T2 2024", value: 2.48, displayValue: "2,48%", changePp: 0.15, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2023-Q4", displayDate: "T4 2023", value: 2.33, displayValue: "2,33%", changePp: -0.38, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2023-Q2", displayDate: "T2 2023", value: 2.71, displayValue: "2,71%", changePp: 0.06, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2022-Q4", displayDate: "T4 2022", value: 2.65, displayValue: "2,65%", changePp: -0.70, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2021-Q4", displayDate: "T4 2021", value: 3.35, displayValue: "3,35%", changePp: -0.45, status: "confirmat", verifiedAt: "2026-10-16" },
    ]
  },
  {
    id: "bnr_lcr_ratio",
    category: "financial_stability",
    name: "Indicatorul de Acoperire a Necesarului de Lichiditate (LCR)",
    shortName: "Lichiditate Bancară (LCR)",
    code: "BNR_STAB_LCR",
    unit: "%",
    frequency: "trimestrial",
    currentValue: 268.0,
    currentDisplayValue: "268,0%",
    referencePeriod: "T2 2026 (Raportări prudențiale BNR)",
    lastUpdated: "30 Septembrie 2026",
    status: "confirmat",
    verifiedAt: "2026-10-16",
    description:
      "Măsoară capacitatea băncilor de a rezista la ieșiri nete de fonduri pe un orizont de 30 de zile calendaristice, prin deținerea unui stoc adecvat de active lichide de înaltă calitate (HQLA).",
    methodology:
      "Calculat ca raport procentual între activele lichide neafectate de sarcini și ieșirile nete de numerar estimate într-un scenariu de criză pe 30 de zile. Nivelul minim reglementat obligatoriu este de 100%.",
    practicalRelevance:
      "Nivelul agregat de 268,0% (de peste 2,6 ori cerința legală) confirmă că băncile dispun de lichidități excedentare substanțiale plasate în titluri de stat și depozite la BNR, eliminând riscul de blocaj în decontarea plăților sau retragerea depozitelor.",
    sourceName: "Banca Națională a României (BNR) — Stabilitate Financiară",
    sourceUrl: "https://www.bnr.ro/Rapoarte-asupra-stabilitatii-financiare-3379.aspx",
    observations: [
      { date: "2026-Q2", displayDate: "T2 2026", value: 268.0, displayValue: "268,0%", changePp: 3.0, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2025-Q4", displayDate: "T4 2025", value: 265.0, displayValue: "265,0%", changePp: 3.0, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2025-Q2", displayDate: "T2 2025", value: 262.0, displayValue: "262,0%", changePp: 4.0, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2024-Q4", displayDate: "T4 2024", value: 258.0, displayValue: "258,0%", changePp: 11.0, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2023-Q4", displayDate: "T4 2023", value: 247.0, displayValue: "247,0%", changePp: 23.0, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2022-Q4", displayDate: "T4 2022", value: 224.0, displayValue: "224,0%", changePp: -12.0, status: "confirmat", verifiedAt: "2026-10-16" },
    ]
  },
  {
    id: "bnr_loan_to_deposit",
    category: "financial_stability",
    name: "Raportul Credite / Depozite (L/D Ratio)",
    shortName: "Raport Credite / Depozite",
    code: "BNR_STAB_LTD",
    unit: "%",
    frequency: "lunar",
    currentValue: 67.6,
    currentDisplayValue: "67,60%",
    referencePeriod: "August 2026 (Bilanț monetar BNR)",
    lastUpdated: "30 Septembrie 2026",
    status: "confirmat",
    verifiedAt: "2026-10-16",
    description:
      "Raportul dintre volumul total al creditelor acordate sectorului privat și volumul depozitelor atrase de la rezidenți neguvernamentali.",
    methodology: "Calculat lunar de BNR pe baza balanței monetare a instituțiilor de credit rezidente.",
    practicalRelevance:
      "La 67,60%, băncile din România dispun de o bază excedentară de economisire internă (peste 192 miliarde lei peste creditele acordate), menținând autonomia deplină față de finanțarea externă și sprijinind competitivitatea ofertelor de creditare.",
    sourceName: "Banca Națională a României (BNR)",
    sourceUrl: "https://www.bnr.ro/Buletine-lunare-3363.aspx",
    observations: [
      { date: "2026-08-31", displayDate: "31 Aug 2026", value: 67.6, displayValue: "67,60%", changePp: 0.1, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2026-06-30", displayDate: "30 Iun 2026", value: 67.5, displayValue: "67,50%", changePp: 0.1, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2025-12-31", displayDate: "31 Dec 2025", value: 67.4, displayValue: "67,40%", changePp: 0.3, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2024-12-31", displayDate: "31 Dec 2024", value: 67.1, displayValue: "67,10%", changePp: 0.3, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2023-12-31", displayDate: "31 Dec 2023", value: 66.8, displayValue: "66,80%", changePp: -1.4, status: "confirmat", verifiedAt: "2026-10-16" },
      { date: "2022-12-31", displayDate: "31 Dec 2022", value: 68.2, displayValue: "68,20%", changePp: 0.1, status: "confirmat", verifiedAt: "2026-10-16" },
    ]
  },
  {
    id: "bnr_indebtedness_dsti",
    category: "financial_stability",
    name: "Plafonul Maxim de Îndatorare DSTI (Regulamentul BNR nr. 17/2012 modificat prin Regulamentul nr. 6/2018)",
    shortName: "Plafon Îndatorare BNR (DSTI)",
    code: "BNR_REG_DSTI",
    unit: "% din venitul net",
    frequency: "la decizie",
    currentValue: 40.0,
    currentDisplayValue: "40,0%",
    referencePeriod: "În vigoare (Regulamentul BNR nr. 17/2012 cu modif. ulterioare)",
    lastUpdated: "1 Ianuarie 2019 (în vigoare la data auditului)",
    status: "confirmat",
    verifiedAt: "2026-10-16",
    description:
      "Gradul maxim de îndatorare (Debt-Service-to-Income): ponderea maximă pe care o pot reprezenta ratele lunare totale din venitul net eligibil al solicitantului de credit.",
    methodology:
      "Instituit de BNR prin Regulamentul nr. 6/2018 pentru modificarea Regulamentului nr. 17/2012: 40% pentru creditele în lei (cu o derogare de 45% exclusiv pentru prima locuință cumpărată de către persoane care nu dețin alt imobil de locuit) și 20% pentru creditele în valută contractate de debitori neacoperiți natural la riscul valutar.",
    practicalRelevance:
      "Pilon central de protecție împotriva supraîndatorării: pentru un venit net lunar de 6.000 lei, rata lunară totală la toate împrumuturile nu poate depăși legal 2.400 lei (sau 2.700 lei pentru prima locuință). Această regulă limitează riscul de incapacitate de plată în ciclurile de creștere a dobânzilor.",
    sourceName: "Banca Națională a României (BNR) — Cadrul Legislativ",
    sourceUrl: "https://www.bnr.ro/Legislatie-4160.aspx",
    observations: [
      { date: "2019-01-01", displayDate: "1 Ianuarie 2019", value: 40.0, displayValue: "40,0%", status: "confirmat", verifiedAt: "2026-10-16", notes: "Intrare în vigoare Regulament BNR nr. 6/2018 (modificare Regulament nr. 17/2012)" },
      { date: "2020-07-01", displayDate: "1 Iulie 2020", value: 40.0, displayValue: "40,0%", status: "confirmat", verifiedAt: "2026-10-16", notes: "Regulamentul BNR nr. 12/2020 (ajustări tehnice de consolidare, menținere plafon 40% / 45%)" },
      { date: "2024-01-01", displayDate: "1 Ianuarie 2024", value: 40.0, displayValue: "40,0%", status: "confirmat", verifiedAt: "2026-10-16", notes: "Menținut neschimbat ca măsură macroprudențială activă" },
      { date: "2026-01-01", displayDate: "1 Ianuarie 2026", value: 40.0, displayValue: "40,0%", status: "confirmat", verifiedAt: "2026-10-16", notes: "Plafon de referință prudențială în vigoare la data auditului" }
    ]
  }
];
