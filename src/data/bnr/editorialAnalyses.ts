// BNR Economic Intelligence — Analize Editoriale Financiare
// Conținut bazat pe date statistice oficiale verificate BNR, INS și legislația aplicabilă
// Data ultimei verificări factuale: 16 Octombrie 2026

import { BnrEditorialAnalysis } from "./types";

export const BNR_EDITORIAL_ANALYSES: BnrEditorialAnalysis[] = [
  {
    id: "analiza_ircc_vs_robor_decalaj",
    slug: "cum-se-diferentiaza-dobanda-bnr-ircc-si-robor",
    title: "Cum se diferențiază Dobânda BNR, IRCC și ROBOR: Mecanisme, Decalaje și Impact în Rată",
    summary:
      "Înțelege distincția esențială dintre rata dobânzii de politică monetară a BNR, indicele IRCC (aplicat creditelor retail contractate după mai 2019) și indicele ROBOR, precum și de ce deciziile de dobândă nu modifică instantaneu rata lunară a împrumutului tău.",
    publishedDate: "2026-09-15",
    lastUpdated: "2026-10-16",
    referencePeriod: "T4 2026 (IRCC 5,57%) / Octombrie 2026 (ROBOR 3M 6,08%, BNR 6,50%)",
    relatedCategory: "ircc_robor",
    primaryIndicators: [
      { name: "Dobânda de politică monetară BNR", value: "6,50%", period: "În vigoare din 8 august 2024 (reconfirmată de CA BNR)" },
      { name: "IRCC trimestrial (credite retail)", value: "5,57%", period: "În vigoare T4 2026 (1 oct – 31 dec 2026, calculat pe T2 2026)" },
      { name: "ROBOR 3M (credite acordate pre-mai 2019)", value: "6,08%", period: "15 Octombrie 2026 (Fixing oficial BNR ora 11:00)" },
      { name: "Facilitatea de depozit BNR (ancoră monetară)", value: "5,50%", period: "Octombrie 2026" }
    ],
    contentParagraphs: [
      "Pentru orice persoană care deține sau intenționează să contracteze un credit ipotecar sau de consum în lei, este esențială distincția riguroasă între trei indicatori monetari adesea confundați: rata dobânzii de politică monetară stabilită de CA al BNR, indicele ROBOR și indicele IRCC.",
      "1. Rata dobânzii de politică monetară (în prezent 6,50%) reprezintă rata de semnal a Băncii Centrale pentru operațiunile principale de piață monetară (repo/reverse repo). Alături de facilitatea de depozit (5,50%) și facilitatea de creditare Lombard (7,50%), aceasta definește coridorul simetric de ±1,00 puncte procentuale în jurul căruia fluctuează costul lichidității pe piața interbancară.",
      "2. ROBOR (Romanian Interbank Offered Rate) reprezintă media cotațiilor orientative la care băncile comerciale participante declară că sunt dispuse să se împrumute reciproc pe piața monetară. Cotația ROBOR 3M (6,08% la 15 octombrie 2026) se aplică contractelor de credit cu dobândă variabilă semnate înainte de 2 mai 2019 (conform OUG 50/2010). Reacționează prompt la condițiile curente de lichiditate și semnalele de politică monetară.",
      "3. IRCC (Indicele de Referință pentru Creditele Consumatorilor), introdus prin OUG 19/2019, nu este o cotație orientativă de cerere/ofertă, ci o medie ponderată a tranzacțiilor reale efectiv decontate între bănci. Metodologia legală impune o dublă întârziere: valoarea aplicabilă în Trimestrul 4 2026 (5,57%) a fost calculată pe baza tranzacțiilor efectuate în Trimestrul 2 2026 (aprilie – iunie 2026).",
      "Această întârziere structurală de 3 până la 6 luni explică de ce o decizie BNR de reducere sau creștere a ratei de dobândă se transmite în ratele lunare ale creditelor legate de IRCC abia după două trimestre, în timp ce la creditele legate de ROBOR ajustarea survine la prima dată de resetare din contract."
    ],
    takeaways: [
      "Decizia BNR de politică monetară nu modifică a doua zi rata la credit; ea influențează costul lichidității pe piața interbancară.",
      "IRCC are un decalaj structural de 3–6 luni decurgând din calculul trimestrial bazat pe tranzacțiile decontate în trimestrul anterior-anterior.",
      "La un credit ipotecar de 300.000 lei pe 25 de ani, o modificare de 1 punct procentual a indicelui de referință influențează rata lunară cu aproximativ 190–210 lei.",
      "Marja fixă a băncii (ex: 2,10% - 2,50%) rămâne neschimbată pe întreaga durată a contractului; doar indicele de referință (IRCC sau ROBOR) variază periodic."
    ],
    limitations:
      "Periodicitatea efectivă a resetării ratelor depinde de clauzele contractuale individuale (la 1 ianuarie / 1 aprilie / 1 iulie / 1 octombrie pentru IRCC, sau la scadența contractuală de 3/6 luni pentru ROBOR).",
    disclaimer:
      "Informațiile prezentate au scop exclusiv educațional și financiar-informativ. Nu constituie o ofertă contractuală și nu garantează evoluția viitoare a indicilor de piață.",
    sources: [
      { name: "BNR — Cotațiile ROBOR și Indicele IRCC", url: "https://www.bnr.ro/IRCC---Indicele-de-referinta-21937.aspx", organization: "Banca Națională a României" },
      { name: "Ordonanța de Urgență nr. 19/2019 pentru modificarea cadrului de creditare", url: "https://legislatie.just.ro", organization: "Monitorul Oficial al României" }
    ]
  },
  {
    id: "analiza_politica_monetara_cicluri",
    slug: "ce-inseamna-o-decizie-bnr-privind-dobanda-cheie",
    title: "Ciclul de Politică Monetară al BNR: De la Combaterea Inflației la Relaxare Prudențială",
    summary:
      "Cum interpretează un solicitant de credit comunicatele Consiliului de Administrație al BNR, care este rolul coridorului simetric de rate și cum se corelează decizia de politică monetară cu dinamica inflației anuale IPC.",
    publishedDate: "2026-08-20",
    lastUpdated: "2026-10-16",
    referencePeriod: "2021–2026 (Cronologia deciziilor de politică monetară BNR)",
    relatedCategory: "monetary_policy",
    primaryIndicators: [
      { name: "Rata de politică monetară", value: "6,50%", period: "În vigoare din 8 august 2024 (menținută în ședințele CA din toamna 2024 și ciclul 2025–2026)" },
      { name: "Facilitatea de creditare Lombard", value: "7,50%", period: "Plafonul superior al coridorului" },
      { name: "Facilitatea de depozit", value: "5,50%", period: "Plafonul inferior (ancora dobânzilor interbancare)" },
      { name: "Rata rezervelor minime obligatorii (lei / valută)", value: "8,0% / 5,0%", period: "Pasive bancare atrase" }
    ],
    contentParagraphs: [
      "Banca Națională a României utilizează rata dobânzii de politică monetară ca instrument principal pentru menținerea stabilității prețurilor pe termen mediu, ținta strategică fiind o rată anuală a inflației de 2,5% ± 1 punct procentual.",
      "În ciclul 2021–2023, confruntată cu șocul inflaționist global generat de prețurile energiei și materiilor prime, BNR a urcat treptat rata de la 1,25% (ianuarie 2021) până la 7,00% (ianuarie 2023). Această înăsprire a politicii monetare a avut ca rol temperarea cererii excedentare și ancorarea anticipațiilor inflaționiste.",
      "În a doua jumătate a anului 2024, pe fondul dezinflației continue, BNR a inițiat ciclul de relaxare monetară, operând două reduceri succesive de câte 25 puncte de bază: la 6,75% în iulie 2024 și ulterior la 6,50% în august 2024. În ședințele CA din 4 octombrie și 8 noiembrie 2024, precum și pe parcursul ciclului 2025–2026, CA al BNR a menținut rata la 6,50% pe an, evaluând riscurile asociate conduitei fiscale și contextului geopolitic.",
      "Un element practic determinant este rolul facilității de depozit (5,50%). În perioadele de excedent de lichiditate interbancară, băncile plasează sumele neîmprumutate la facilitatea de depozit a BNR, ceea ce ancorează costul efectiv al banilor din piață în apropierea acestui nivel de 5,50%, sub rata de semnal de 6,50%."
    ],
    takeaways: [
      "Rata-cheie este semnalul strategic; facilitatea de depozit (5,50%) este nivelul de ancorare practică în condiții de surplus de lichiditate în bănci.",
      "Deciziile CA al BNR se fundamentează pe Rapoartele trimestriale asupra inflației, analizând cererea internă, dinamica salariilor și orientarea politicii fiscal-bugetare.",
      "Pentru un credit contractat pe 25–30 de ani, ciclurile economice alternează: perioadele cu dobânzi minime sunt succedate de perioade restrictive și etape de stabilizare."
    ],
    limitations:
      "Deciziile de politică monetară ale BNR depind de datele macroeconomice publicate ulterior, deciziile BCE/Fed și tensiunile geopolitice internaționale. Nu reprezintă un angajament invariabil.",
    disclaimer:
      "Analiza reflectă datele istorice oficiale publicate de BNR și nu reprezintă o prognoză garantată sau o recomandare individuală de investiții.",
    sources: [
      { name: "BNR — Decizii de politică monetară ale CA", url: "https://www.bnr.ro/Deciziile-de-politica-monetara-ale-Consiliului-de-administratie-al-BNR-3004.aspx", organization: "Banca Națională a României" },
      { name: "BNR — Rapoarte asupra inflației", url: "https://www.bnr.ro/Rapoarte-asupra-inflatiei-3097.aspx", organization: "Banca Națională a României" }
    ]
  },
  {
    id: "analiza_creditare_lei_valuta",
    slug: "cum-evolueaza-creditarea-populatiei-in-lei-si-in-valuta",
    title: "Creditarea în Lei vs. Valută: De ce Moneda Națională Dominează 68,4% din Soldul Neguvernamental",
    summary:
      "Analiza structurii portofoliului de credite din România: cum au protejat reglementările prudențiale BNR populația de riscul valutar și care sunt diferențele practice dintre împrumuturile în lei și cele în euro.",
    publishedDate: "2026-09-01",
    lastUpdated: "2026-10-16",
    referencePeriod: "August 2026 (Buletinul statistic lunar BNR nr. 8/2026)",
    relatedCategory: "banking_rates",
    primaryIndicators: [
      { name: "Ponderea creditului neguvernamental în lei", value: "68,4%", period: "Sold la 31 august 2026 (274,6 mld. lei)" },
      { name: "Ponderea creditului în valută", value: "31,6%", period: "Sold la 31 august 2026 (126,9 mld. lei echivalent)" },
      { name: "Sold total credit neguvernamental", value: "401,5 mld. lei", period: "Sold la 31 august 2026 (+5,8% dinamică anuală)" },
      { name: "Plafon DSTI credite valută (fără venit în valută)", value: "20,0%", period: "Regulamentul BNR nr. 17/2012 cu modif. ulterioare" }
    ],
    contentParagraphs: [
      "Una dintre cele mai importante transformări structurale din sistemul financiar românesc din ultimul deceniu este orientarea covârșitoare spre împrumuturi în moneda națională. Dacă în anii 2008–2010 creditele în valută reprezentau peste 60% din totalul creditelor acordate populației, în prezent raportul este inversat: 68,4% din stocul total este denominat în lei (iar la populație proporția depășește 80%).",
      "Această transformare a fost susținută de măsurile macroprudențiale ale BNR:",
      "1. Limitarea gradului de îndatorare (DSTI) pentru creditele în valută contractate de debitori fără acoperire naturală la riscul valutar la maximum 20% din venitul net (față de 40% pentru creditele în lei), conform Regulamentului BNR nr. 17/2012 modificat prin Regulamentul nr. 6/2018.",
      "2. Cerințe mai prudente de capital și provizionare pentru expunerile în monedă străină.",
      "3. Protecția împotriva volatilității cursului: deși rata nominală la un credit în euro poate părea comparabilă sau mai mică, orice depreciere a leului majorează automat efortul lunar în moneda venitului salarial. Contractarea creditului în moneda în care se obțin veniturile elimină riscul de dezechilibru valutar."
    ],
    takeaways: [
      "Recomandarea financiară fundamentală: contractează creditul în moneda în care îți încasezi venitul principal.",
      "Pentru un salariat cu venituri exclusiv în lei, creditul în euro are un plafon de îndatorare restrictiv (20% DSTI), reducând suma maximă ce poate fi împrumutată la jumătate față de un credit în lei.",
      "Protecția împotriva fluctuațiilor cursului valutar compensează orice eventual diferențial marginal de dobândă nominală pe termen lung."
    ],
    limitations:
      "Pentru companiile exportatoare sau persoanele fizice cu venituri certe denominate în euro, creditarea în valută poate rămâne justificată economic, existând acoperire naturală la risc.",
    disclaimer:
      "Analiza are caracter pur informativ și nu substituie o consiliere financiară individuală realizată în funcție de situația specifică a veniturilor fiecărui debitor.",
    sources: [
      { name: "BNR — Buletin Statistic Lunar", url: "https://www.bnr.ro/Buletine-lunare-3363.aspx", organization: "Banca Națională a României" },
      { name: "Regulamentul BNR nr. 17/2012 privind condițiile de creditare", url: "https://www.bnr.ro/Legislatie-4160.aspx", organization: "Banca Națională a României" }
    ]
  },
  {
    id: "analiza_marje_depozite_credite",
    slug: "ce-ne-arata-diferenta-dintre-dobanzile-la-credite-si-depozite",
    title: "Marja Bancară de Intermediere: Cum se Explică Diferența Dintre Dobânzile la Depozite și Credite",
    summary:
      "Înțelege spread-ul bancar de intermediere din România: de ce băncile plătesc în medie 5,45% la depozitele noi ale populației și percep 7,42% la creditele noi pentru locuințe sau 10,85% la consum.",
    publishedDate: "2026-08-10",
    lastUpdated: "2026-10-16",
    referencePeriod: "August 2026 (Dobânzi medii raportate de BNR)",
    relatedCategory: "banking_rates",
    primaryIndicators: [
      { name: "Dobândă medie depozite noi la termen (populație)", value: "5,45%", period: "August 2026 (fluxuri noi contractate în lei)" },
      { name: "Dobândă medie credite noi pentru locuințe", value: "7,42%", period: "August 2026 (credite noi în lei)" },
      { name: "Dobândă medie credite noi de consum", value: "10,85%", period: "August 2026 (credite noi în lei)" },
      { name: "Spread mediu brut de intermediere ipotecară", value: "1,97 pp", period: "Calculat din mediile ponderate oficiale BNR" }
    ],
    contentParagraphs: [
      "Intermedierea bancară presupune atragerea resurselor financiare excedentare de la deponenți și plasarea lor sub formă de credite către debitori.",
      "Diferența dintre dobânda medie percepută la creditele noi și dobânda plătită la depozitele noi reprezintă marja brută de intermediere a pieței. Conform datelor statistice raportate de BNR pentru august 2026:",
      "1. La creditele pentru locuințe, dobânda medie ponderată pe piață este de 7,42%, în timp ce depozitele noi la termen ale populației sunt remunerate în medie cu 5,45%, rezultând un spread brut de circa 1,97 puncte procentuale.",
      "Acest spread acoperă costul rezervelor minime obligatorii (8% din fondurile atrase în lei sunt păstrate obligatoriu la BNR cu remunerare redusă), contribuțiile legale la Fondul de Garantare a Depozitelor Bancare (FGDB), costul riscului de credit (provizioane prudențiale), cheltuielile operaționale și marja de rentabilitate.",
      "2. La creditele de consum, dobânda medie urcă la 10,85%, generând un spread mai amplu de circa 5,40 puncte procentuale. Această diferență reflectă riscul statistic net superior al împrumuturilor negarantate imobiliar."
    ],
    takeaways: [
      "Creditele ipotecare au marje semnificativ mai reduse decât creditele de consum datorită garanției imobiliare care diminuează riscul de pierdere în caz de neplată.",
      "Concurența bancară menține marjele fixe la creditele ipotecare variabile în intervalul 2,00% – 2,60% peste indicele legal (IRCC).",
      "În perioadele cu oferte promoționale de dobândă fixă inițială (5,50%–6,10% pe primii 3 sau 5 ani), debitorul beneficiază de un cost apropiat de dobânda medie a depozitelor, băncile comprimându-și temporar marja pentru a câștiga cotă de piață."
    ],
    limitations:
      "Valorile raportate de BNR sunt medii ponderate agregate la nivelul întregului sistem bancar și cuprind atât oferte de listă, cât și oferte promoționale sau refinanțări punctuale.",
    disclaimer:
      "Statisticile agregate ale pieței nu constituie o ofertă comercială garantată pentru un client individual. Nivelul contractual depinde de scoringul de credit, istoricul financiar și valoarea garanției.",
    sources: [
      { name: "BNR — Buletin Statistic Lunar (Statistica dobânzilor)", url: "https://www.bnr.ro/Buletine-lunare-3363.aspx", organization: "Banca Națională a României" },
      { name: "Fondul de Garantare a Depozitelor Bancare (FGDB)", url: "https://www.fgdb.ro", organization: "FGDB" }
    ]
  },
  {
    id: "analiza_rezerve_si_curs_valutar",
    slug: "ce-ne-spun-rezervele-internationale-si-cursul-eur-ron",
    title: "Rezervele Internaționale ale BNR și Cursul EUR/RON: Mecanisme Prudențiale și Reper de Credit",
    summary:
      "Cum acționează rezerva de peste 72 miliarde euro a Băncii Naționale pentru susținerea stabilității monedei naționale și de ce cursul oficial BNR diferă de cel comercial aplicat la plata ratelor.",
    publishedDate: "2026-10-05",
    lastUpdated: "2026-10-16",
    referencePeriod: "30 Septembrie 2026 (72.340 mil. EUR rezerve internaționale BNR)",
    relatedCategory: "balance_reserves",
    primaryIndicators: [
      { name: "Rezerve internaționale totale BNR", value: "72.340 mil. EUR", period: "La 30 septembrie 2026 (60.060 mil. EUR valută + 103,6 t aur)" },
      { name: "Rezerva valutară BNR", value: "60.060 mil. EUR", period: "La 30 septembrie 2026" },
      { name: "Rezerva de aur a României", value: "103,6 tone (12.280 mil. EUR)", period: "La 30 septembrie 2026" },
      { name: "Curs oficial de referință EUR/RON", value: "5,3370 RON", period: "15 Octombrie 2026 (ședința oficială BNR ora 13:00)" }
    ],
    contentParagraphs: [
      "Stabilitatea monedei naționale este un factor cheie de predictibilitate pentru debitorii din România, având în vedere că prețurile multor bunuri (locuințe, autovehicule, servicii) sunt ancorate în euro.",
      "La data de 30 septembrie 2026, rezervele internaționale administrate de BNR s-au situat la 72,34 miliarde de euro. Această rezervă este compusă din 60,06 miliarde euro în disponibilități și titluri lichide în valută și 103,6 tone de aur monetar, evaluat la 12,28 miliarde euro pe fondul cotațiilor internaționale ale aurului.",
      "Relevanța rezervelor pentru debitori și solicitanții de credite:",
      "1. Amortizor împotriva șocurilor externe: Un nivel al rezervelor ce acoperă peste 5 luni de importuri de bunuri și servicii permite BNR să intervină pe piața valutară pentru a preveni volatilitatea excesivă a cursului de schimb.",
      "2. Curs oficial vs. Curs comercial: Cursul comunicat de BNR la ora 13:00 (5,3370 RON pentru 1 EUR la 15 octombrie 2026) este un curs de referință statistică. Atunci când un debitor achită rata la un credit în euro din contul curent în lei, banca aplică propriul curs comercial de vânzare, care include marja de schimb valutar a băncii (spread)."
    ],
    takeaways: [
      "Rezervele internaționale confortabile ale României consolidează capacitatea de plată externă și stabilitatea monedei naționale.",
      "Verifică întotdeauna cursul comercial de vânzare al băncii tale la data debitării ratelor în euro sau utilizează plafoanele de conversie la curs BNR oferite de unele bănci.",
      "Pentru planificarea bugetului familial la un credit în valută, este prudent să iei în calcul o marjă de siguranță de 5%–10% față de cursul curent."
    ],
    limitations:
      "În pofida rezervelor solide, cursul de schimb rămâne influențat pe termen mediu de dezechilibrele structurale ale balanței comerciale și deficitului de cont curent.",
    disclaimer:
      "Evoluțiile istorice ale cursului valutar nu reprezintă o garanție pentru traiectoria viitoare a cotațiilor.",
    sources: [
      { name: "BNR — Statistica rezervelor internaționale", url: "https://www.bnr.ro/Statistica-rezervelor-internationale-3595.aspx", organization: "Banca Națională a României" },
      { name: "BNR — Cursul de schimb al pieței valutare", url: "https://www.bnr.ro/Cursul-de-schimb-524.aspx", organization: "Banca Națională a României" }
    ]
  },
  {
    id: "analiza_stabilitate_si_siguranta_depozite",
    slug: "cum-se-citesc-indicatorii-de-stabilitate-financiara-si-siguranta-bancara",
    title: "Stabilitatea Sistemului Bancar: Solvabilitate, NPL și Siguranța Economiilor Populației",
    summary:
      "De ce indicatorii prudențiali ai sistemului bancar românesc sunt evaluați ca robuști: solvabilitate agregată de 25,80%, NPL la 2,70% și protecția legală prin FGDB de 100.000 EUR per deponent.",
    publishedDate: "2026-07-25",
    lastUpdated: "2026-10-16",
    referencePeriod: "T2 2026 (Indicatori de stabilitate prudențială BNR)",
    relatedCategory: "financial_stability",
    primaryIndicators: [
      { name: "Solvabilitatea bancară agregată (fonduri proprii)", value: "25,80%", period: "T2 2026 (Minim reglementat: 8%)" },
      { name: "Rata creditelor neperformante (NPL - EBA)", value: "2,70%", period: "Iunie 2026 (Nivel agregat sistem)" },
      { name: "Indicatorul de lichiditate (LCR)", value: "268,0%", period: "T2 2026 (Prag minim legal: 100%)" },
      { name: "Plafon de garantare a depozitelor FGDB", value: "100.000 EUR (echiv. lei)", period: "Legea nr. 311/2015 per deponent eligibil" }
    ],
    contentParagraphs: [
      "Stabilitatea financiară a sistemului bancar reprezintă cadrul necesar pentru ca cetățenii și companiile să poată economisi și accesa credite în deplină siguranță.",
      "1. Solvabilitatea (rata fondurilor proprii totale): la nivelul agregat de 25,80%, băncile din România dispun de o capitalizare de trei ori superioară pragului minim reglementat de 8% impus de cadrul internațional Basel III / CRR, asigurând o rezervă consistentă de absorbție a riscurilor.",
      "2. Calitatea activelor (Rata NPL): creditele neperformante reprezintă 2,70% din totalul expunerilor brute la jumătatea anului 2026 (conform definiției armonizate EBA). Nivelul agregat scăzut reflectă asanarea creditelor problematice din anii anteriori și standarde prudențiale consecvente.",
      "3. Lichiditatea (LCR): indicatorul de acoperire a necesarului de lichiditate de 268,0% atestă că băncile dețin de peste 2,6 ori mai multe active lichide de înaltă calitate decât ieșirile nete estimate într-un scenariu de criză de lichiditate pe 30 de zile.",
      "4. Garantarea depozitelor: Depozitele eligibile ale persoanelor fizice și juridice din băncile participante sunt garantate legal prin Fondul de Garantare a Depozitelor Bancare (FGDB) până la limita echivalentului în lei a 100.000 euro per deponent per instituție de credit, conform Legii nr. 311/2015."
    ],
    takeaways: [
      "Sistemul bancar românesc este bine capitalizat și autonom, finanțat preponderent din economisirea internă.",
      "Economiile eligibile sunt garantate legal până la echivalentul a 100.000 euro per persoană în fiecare bancă participantă la schema FGDB.",
      "Ratele scăzute de neperformanță la nivel de sistem sprijină continuarea creditării în condiții competitive."
    ],
    limitations:
      "Indicatorii agregați reflectă media întregului sistem bancar. Respectarea cerințelor prudențiale este generală, dar performanțele financiare și costurile comerciale diferă între instituțiile de credit.",
    disclaimer:
      "Datele agregate de stabilitate au caracter statistic și nu constituie o garanție comercială sau o recomandare individuală de plasament financiar.",
    sources: [
      { name: "BNR — Raportul asupra stabilității financiare", url: "https://www.bnr.ro/Rapoarte-asupra-stabilitatii-financiare-3379.aspx", organization: "Banca Națională a României" },
      { name: "Fondul de Garantare a Depozitelor Bancare (FGDB)", url: "https://www.fgdb.ro", organization: "FGDB" }
    ]
  }
];
