import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Analiză Birou de CV Finance | Soluții Legale Întârzieri Plată",
  description:
    "Analiză Birou de Credit și identificarea soluțiilor disponibile pentru corectarea informațiilor eligibile. Consultanță financiară transparentă 100% gratuită.",
  keywords: ["biroul de credit", "analiza birou de credit", "corectare date birou credit", "stergere birou de credit legal"],
  alternates: { canonical: "/stergere-birou-credit" },
};

export default function StergereBirouCredit() {
  const faqs = [
    [
      "Cum funcționează analiza datelor din Biroul de Credit?",
      "Analizăm înregistrările tale din baza de date a Biroului de Credit pentru a verifica dacă raportările au respectat procedurile legale și dacă există motive întemeiate pentru rectificarea sau actualizarea informațiilor eligibile.",
    ],
    [
      "Promiteți ștergerea garantată a tuturor datelor?",
      "Nu. Nicio entitate legală nu poate garanta ștergerea automată a datelor raportate corect. Noi identificăm exclusiv soluțiile legale disponibile pentru informațiile raportate eronat sau care pot fi contestate legal.",
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

        <p className="eyebrow"><span /> REGLEMENTĂRI & TRANSPARENȚĂ</p>
        <h1>Analiză Birou de Credit & Soluții de Rectificare Legală</h1>
        <p>
          Analiză Birou de Credit și identificarea soluțiilor disponibile pentru corectarea informațiilor eligibile conform legislației în vigoare.
        </p>

        <h2>Cum te putem sprijini?</h2>
        <ul>
          <li><Check size={16} className="green" /> <b>Verificare conformitate:</b> Verificăm dacă raportările băncii sau IFN-ului au respectat normele legale.</li>
          <li><Check size={16} className="green" /> <b>Consultanță transparentă:</b> Îți prezentăm clar ce date pot fi rectificate și ce opțiuni ai.</li>
          <li><Check size={16} className="green" /> <b>Drumul spre creditare:</b> Redeschidem accesul la soluțiile bancare adecvate.</li>
        </ul>

        <h2>Întrebări frecvente — Biroul de Credit</h2>
        {faqs.map(([q, a]) => (
          <div key={q} style={{ marginBottom: "20px" }}>
            <h3>{q}</h3>
            <p>{a}</p>
          </div>
        ))}

        <div className="faq-cta-box" style={{ marginTop: "40px" }}>
          <div>
            <h3>Solicită o analiză gratuită a situației tale</h3>
            <p>Echipa noastră te va îndruma pas cu pas.</p>
          </div>
          <Link href="/#aplica" className="button">
            Solicită analiza gratuită <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    </>
  );
}
