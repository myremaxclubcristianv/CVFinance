import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Calculator Rătă Credit & Refinanțare | Calculează Economia Lunară",
  description:
    "Calculator de rată credit și refinanțare. Estimează în timp real reducerea posibilității de rată și economiile anuale. Consultanță 100% gratuită.",
  keywords: ["calculator rata credit", "calculator refinantare credit", "simulare credit nevoi personale", "calcul economie rata"],
  alternates: { canonical: "/calculator-rata-credit" },
};

export default function CalculatorRataCredit() {
  const faqs = [
    [
      "Cât de exacte sunt calculele din calculatorul online?",
      "Calculatorul nostru oferă o simulare orientativă bazată pe mediile dobânzilor actuale din piață. Oferta exactă se stabilește în urma analizei dosarului tău de către un consultant.",
    ],
    [
      "Mă obligă simularea la ceva?",
      "Nu, simularea este strict un instrument informativ 100% gratuit și fără nicio obligație.",
    ],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="legal">
        <Link href="/" className="brand">
          <span style={{ letterSpacing: "-1px" }}>CV</span> Finance
        </Link>

        <p className="eyebrow"><span /> SIMULATOR & CALCULATOR ONLINE</p>
        <h1>Calculator Rătă Credit & Simulare Refinanțare</h1>
        <p>
          Utilizează calculatorul nostru orientativ pentru a vedea cât poți economisi în fiecare lună prin refinanțarea sau negocierea creditelor tale actuale.
        </p>

        <h2>De ce să faci o simulare de refinanțare?</h2>
        <ul>
          <li><Check size={16} className="green" /> <b>Estimare instantanee:</b> Vezi imediat impactul potențial asupra bugetului lunar.</li>
          <li><Check size={16} className="green" /> <b>Economii anuale:</b> Afli suma totală care poate rămâne în contul tău pe parcursul unui an.</li>
          <li><Check size={16} className="green" /> <b>Pasul spre oferta reală:</b> Trimiți simularea echipei noastre pentru verificarea ofertelor bancare exacte.</li>
        </ul>

        <h2>Întrebări frecvente — Calculator</h2>
        {faqs.map(([q, a]) => (
          <div key={q} style={{ marginBottom: "20px" }}>
            <h3>{q}</h3>
            <p>{a}</p>
          </div>
        ))}

        <div className="faq-cta-box" style={{ marginTop: "40px" }}>
          <div>
            <h3>Mergi direct la calculatorul interactiv</h3>
            <p>Testează suma dorită și rata actuală pe pagina noastră principală.</p>
          </div>
          <Link href="/#calculator" className="button">
            Deschide calculatorul <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    </>
  );
}
