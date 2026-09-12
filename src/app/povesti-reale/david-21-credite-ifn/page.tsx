import type { Metadata } from "next";
import StoryArticleLayout, { StoryMetrics } from "@/components/StoryArticleLayout";

export const metadata: Metadata = {
  title: "21 de credite. O singură rată. — Studiu de Caz Refinanțare | CV Finance",
  description:
    "Caz real documentat de Smart Credit România. Smart Credit România menționează în cazul publicat un scor FICO de 582 la 643 puncte după consolidarea a 21 de credite IFN.",
  keywords: [
    "refinanțare credite IFN",
    "21 credite IFN",
    "reducere rată credit",
    "scor de credit Biroul de Credit",
    "supraîndatorare credite",
  ],
  alternates: { canonical: "/povesti-reale/david-21-credite-ifn" },
  openGraph: {
    title: "21 de credite. O singură rată. — Studiu de Caz Refinanțare",
    description:
      "Studiu de caz real documentat de Smart Credit România. De la 6.476 lei la 2.577 lei pe lună prin consolidare bancară.",
    url: "https://credite.cristianvaduva.com/povesti-reale/david-21-credite-ifn",
    siteName: "CV Finance",
    locale: "ro_RO",
    type: "article",
  },
};

export default function DavidStoryPage() {
  const metrics: StoryMetrics[] = [
    { label: "Număr total credite", before: "21 IFN", after: "1 Bancar", highlight: "Comasare totală" },
    { label: "Rată lunară de plată", before: "6.476 lei", after: "2.577 lei", highlight: "−3.899 lei / lună" },
    { label: "Grad de îndatorare", before: "≈ 76%", after: "≈ 30%", highlight: "Sub pragul de risc" },
    { label: "Scor Birou (studiu)", before: "582", after: "643", highlight: "+61 puncte (Smart Credit)" },
  ];

  return (
    <StoryArticleLayout
      category="Studiu de Caz IFN"
      title="21 de credite. O singură rată."
      subtitle="Cum o situație de supraîndatorare poate fi restructurată printr-o analiză corectă a situației financiare."
      officialSourceUrl="https://smart-credit.ro/smart-info/refinantare-credite-ifn-studiu-de-caz.html"
      metrics={metrics}
    >
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 className="cv-serif" style={{ fontSize: "1.75rem", color: "#FFFFFF", marginBottom: "1rem" }}>
          Contextul financiar și problema de fond
        </h2>
        <p style={{ marginBottom: "1.25rem" }}>
          Mulți oameni cred că dacă își achită la timp toate scadențele lunare, situația lor financiară este într-un echilibru deplin. Cazul domnului David (43 de ani) demonstrează însă contrariul: chiar și un platnic impecabil, fără nicio zi de întârziere în istoric, poate ajunge sufocat de structura produselor financiare alese.
        </p>
        <p style={{ marginBottom: "1.25rem" }}>
          La momentul primei analize, David acumularase <strong>21 de împrumuturi active deschise la 10 instituții financiare nebancare (IFN)</strong>. Dintre acestea, 18 conturi fuseseră deschise într-un interval scurt de doar 24 de luni. Cu toate că nu avea restanțe raportate, dobânzile mari și termenele scurte ale creditelor nebancare generau o presiune uriașă pe veniturile sale.
        </p>
      </section>

      {/* BOX PARCURS INIȚIAL */}
      <div style={{ backgroundColor: "#141A17", borderLeft: "4px solid #EF4444", padding: "1.5rem", borderRadius: "0 4px 4px 0", marginBottom: "2.5rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F87171", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Tabloul financiar inițial
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.85rem", fontSize: "0.92rem", color: "#E5E7EB" }}>
          <li>• <strong>Vârstă:</strong> 43 de ani</li>
          <li>• <strong>Credite active:</strong> 21 împrumuturi IFN</li>
          <li>• <strong>Creditori:</strong> 10 IFN-uri diferite</li>
          <li>• <strong>Venit net lunar:</strong> ≈ 8.500 lei</li>
          <li>• <strong>Rate lunare cumulate:</strong> 6.476 lei/lună</li>
          <li>• <strong>Grad de îndatorare:</strong> ≈ 76% din venit</li>
          <li>• <strong>Scor inițial (menționat):</strong> 582 puncte</li>
          <li>• <strong>Solicitare inițială:</strong> 100.000 lei / 5 ani</li>
        </ul>
      </div>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 className="cv-serif" style={{ fontSize: "1.75rem", color: "#FFFFFF", marginBottom: "1rem" }}>
          De ce scăzuse scorul de credit la 582 deși nu existau restanțe?
        </h2>
        <p style={{ marginBottom: "1.25rem" }}>
          Smart Credit România menționează în cazul publicat un scor FICO de <strong>582 puncte</strong> în raportul inițial. Deși David își achita ratele la timp, mai mulți factori îi trăgeau scorul în jos:
        </p>
        <div style={{ backgroundColor: "#0B0F0D", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "1.25rem 1.5rem", borderRadius: "4px", marginBottom: "1.5rem" }}>
          <ul style={{ paddingLeft: "1.25rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.92rem" }}>
            <li><strong>Multe interogări recente:</strong> Cererile repetate de credit lasă urme ce semnalează nevoie urgentă de lichidități.</li>
            <li><strong>Deschiderea rapidă de conturi noi:</strong> 18 împrumuturi noi în 24 de luni indică o dependență crescută de creditare.</li>
            <li><strong>Grad maxim de utilizare:</strong> Utilizarea intensivă a tuturor liniilor de credit deschise.</li>
            <li><strong>Lipsa unei relații bancare solide:</strong> Absența unui credit bancar pe termen lung cu istoric pozitiv.</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 className="cv-serif" style={{ fontSize: "1.75rem", color: "#FFFFFF", marginBottom: "1rem" }}>
          Soluția identificată și rezultatul obținut
        </h2>
        <p style={{ marginBottom: "1.25rem" }}>
          David a apelat la echipa Smart Credit România pentru o evaluare profesionistă. În urma analizei dosarului și a structurării corecte a veniturilor, în doar <strong>9 zile de la aplicare</strong> s-a obținut aprobarea pentru un credit bancar de nevoi personale la ING Bank în valoare de 100.000 lei.
        </p>
        <p style={{ marginBottom: "1.25rem" }}>
          Prin acest nou credit bancar, toate cele 21 de împrumuturi nebancare (IFN) au fost achitate integral și închise, iar clientul a primit în plus o sumă suplimentară de lichidități de aproximativ 60.000 lei.
        </p>
      </section>

      {/* COMPARATIE VIZUALA INAINTE SI DUPĂ */}
      <div style={{ backgroundColor: "#141A17", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "6px", padding: "1.75rem", marginBottom: "3rem" }}>
        <h3 className="cv-serif" style={{ fontSize: "1.35rem", color: "#FFFFFF", marginBottom: "1.25rem", textAlign: "center" }}>
          Evoluția Situației Financiare: ÎNAINTE vs DUPĂ
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {/* COLOANA INAINTE */}
          <div style={{ backgroundColor: "rgba(239, 68, 68, 0.06)", border: "1px solid rgba(239, 68, 68, 0.2)", padding: "1.25rem", borderRadius: "4px" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#EF4444", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
              ÎNAINTE (24.03.2026)
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.9rem" }}>
              <div><strong>Rate IFN/lună:</strong> <span style={{ color: "#EF4444" }}>6.476 lei</span></div>
              <div><strong>Număr rate:</strong> 21 scadențe dispersate</div>
              <div><strong>Credite bancare:</strong> 0</div>
              <div><strong>Grad îndatorare:</strong> ≈ 76% din venit</div>
              <div><strong>Scor inițial:</strong> 582 puncte (studiu Smart Credit)</div>
            </div>
          </div>

          {/* COLOANA DUPA */}
          <div style={{ backgroundColor: "rgba(16, 185, 129, 0.06)", border: "1px solid rgba(16, 185, 129, 0.2)", padding: "1.25rem", borderRadius: "4px" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#10B981", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
              DUPĂ REFINANȚARE (01.04.2026)
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.9rem" }}>
              <div><strong>Rată bancară/lună:</strong> <span style={{ color: "#10B981", fontWeight: 700 }}>2.577 lei</span></div>
              <div><strong>Număr rate:</strong> 1 rată unică bancară</div>
              <div><strong>Credite IFN rămase:</strong> 0 (închise)</div>
              <div><strong>Grad îndatorare:</strong> ≈ 30% din venit</div>
              <div><strong>Scor rectificat:</strong> 643 puncte (+61 pts Smart Credit)</div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "0.95rem", color: "#A7F3D0", fontWeight: 600 }}>
          Economie lunară realizată: 3.899 lei lăsați în fiecare lună în bugetul familiei
        </div>
      </div>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 className="cv-serif" style={{ fontSize: "1.75rem", color: "#FFFFFF", marginBottom: "1rem" }}>
          Lecțiile educaționale ale acestui caz
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ backgroundColor: "#0B0F0D", padding: "1.25rem", borderRadius: "4px", borderLeft: "3px solid #10B981" }}>
            <strong style={{ color: "#FFFFFF", display: "block", marginBottom: "0.35rem" }}>1. Contează produsele financiare în care te afli.</strong>
            <p style={{ fontSize: "0.9rem", color: "#9CA3AF", margin: 0 }}>
              Chiar și un platnic disciplinat poate ajunge la impas dacă deține produse scumpe pe termen scurt. Mutarea ratelor într-un credit bancar pe termen mai lung scade imediat rata lunară.
            </p>
          </div>
          <div style={{ backgroundColor: "#0B0F0D", padding: "1.25rem", borderRadius: "4px", borderLeft: "3px solid #10B981" }}>
            <strong style={{ color: "#FFFFFF", display: "block", marginBottom: "0.35rem" }}>2. Scorul de credit se îmbunătățește prin consolidare.</strong>
            <p style={{ fontSize: "0.9rem", color: "#9CA3AF", margin: 0 }}>
              Smart Credit România menționează în cazul publicat că închiderea conturilor nebancare și trecerea la o singură rată bancară achitată la timp a ridicat scorul FICO al domnului David cu 61 de puncte într-un timp scurt.
            </p>
          </div>
          <div style={{ backgroundColor: "#0B0F0D", padding: "1.25rem", borderRadius: "4px", borderLeft: "3px solid #10B981" }}>
            <strong style={{ color: "#FFFFFF", display: "block", marginBottom: "0.35rem" }}>3. Prezentarea corectă a dosarului schimbă rezultatul.</strong>
            <p style={{ fontSize: "0.9rem", color: "#9CA3AF", margin: 0 }}>
              Mergând singur la un ghișeu bancar cu 21 de credite IFN și scor 582, David ar fi întâmpinat refuzuri automate. Un intermediar profesionist știe cum să pună în valoare istoricul fără întârzieri al clientului.
            </p>
          </div>
        </div>
      </section>
    </StoryArticleLayout>
  );
}
