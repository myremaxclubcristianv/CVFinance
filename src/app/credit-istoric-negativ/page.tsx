import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Credit cu Istoric Negativ | Consultanță Soluții Financiare România",
  description:
    "Ai avut întârzieri la plăți în trecut? Analizăm situația ta și identificăm soluțiile financiare disponibile în piață. Fără falsuri, consultanță transparentă.",
  keywords: ["credit cu istoric negativ", "credit intarzieri", "solutii biroul de credit", "broker credit intarziati"],
  alternates: { canonical: "/credit-istoric-negativ" },
};

export default function CreditIstoricNegativ() {
  const faqs = [
    [
      "Pot obține un credit dacă am avut întârzieri în trecut?",
      "Da, există soluții în funcție de vechimea întârzierilor, suma restantă și profilul tău financiar actual. Anumite bănci și instituții au criterii mai flexibile.",
    ],
    [
      "Costă ceva analiza inițială a situației mele?",
      "Nu. Analiza este 100% gratuită și confidențială. Îți explicăm realist șansele înainte de orice pas.",
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

        <p className="eyebrow"><span /> CONSULTANȚĂ SPECIALIZATĂ</p>
        <h1>Credit cu Istoric Negativ & Întârzieri la Plată</h1>
        <p>
          O problemă financiară din trecut nu trebuie să îți blocheze viitorul. Analizăm situația ta în mod realist și identificăm instituțiile financiare partenere deschise către profilul tău.
        </p>

        <h2>Cum te sprijină un broker în această situație?</h2>
        <ul>
          <li><Check size={16} className="green" /> <b>Evaluare obiectivă:</b> Analizăm raportul Biroului de Credit și istoricul plăților.</li>
          <li><Check size={16} className="green" /> <b>Fără promisiuni false:</b> Îți prezentăm transparent soluțiile reale disponibile.</li>
          <li><Check size={16} className="green" /> <b>Consolidare & Refacere:</b> Te ajutăm să îți refaci scorul financiar.</li>
        </ul>

        <h2>Întrebări frecvente — Istoric Negativ</h2>
        {faqs.map(([q, a]) => (
          <div key={q} style={{ marginBottom: "20px" }}>
            <h3>{q}</h3>
            <p>{a}</p>
          </div>
        ))}

        <div className="faq-cta-box" style={{ marginTop: "40px" }}>
          <div>
            <h3>Verifică opțiunile disponibile pentru tine</h3>
            <p>Completează formularul în mai puțin de 2 minute.</p>
          </div>
          <Link href="/#aplica" className="button">
            Solicită analiza gratuită <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    </>
  );
}
