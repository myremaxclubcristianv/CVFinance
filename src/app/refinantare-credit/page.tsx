import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Refinanțare CV Finance | Scade Rata Lunară & Consolidează Datoriile",
  description:
    "Refinanțare credite bancare și IFN. Reunește toate ratele într-o singură rată lunară mai mică. Analiză gratuită și ofertă personalizată în max 48h.",
  keywords: ["refinanțare credit", "reducere rata credit", "refinanțare rate bancare", "consolidare credite"],
  alternates: { canonical: "/refinantare-credit" },
};

export default function RefinantareCredit() {
  const faqs = [
    [
      "Mă ajută refinanțarea să obțin o rată mai mică?",
      "Da. Prin refinanțare poți înlocui unul sau mai multe credite vechi cu dobânzi mari printr-un nou credit cu o dobândă negociată mai favorabilă.",
    ],
    [
      "Pot obține și o sumă suplimentară de bani prin refinanțare?",
      "Da, dacă gradul tău de îndatorare permite, poți solicita refinanțare cu sumă suplimentară de bani în mână pentru diverse proiecte.",
    ],
    [
      "Se pot refinanța și creditele de la IFN-uri?",
      "Da. Una dintre principalele noastre specializări este refinanțarea creditelor IFN scumpe cu un credit bancar standard, scăzând drastic costul total.",
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

        <p className="eyebrow"><span /> REFINANȚARE OPTIMIZATĂ</p>
        <h1>Refinanțare Credit — Reducerea Ratei Lunare & Consolidare</h1>
        <p>
          Dacă ai mai multe rate lunare sau plătești o dobândă prea mare la un credit existent, refinanțarea este cea mai eficientă cale de a pune bani înapoi în bugetul tău.
        </p>

        <h2>Beneficiile refinanțării prin Broker CV Finance</h2>
        <ul>
          <li><Check size={16} className="green" /> <b>O singură rată lunară:</b> Scapi de grija scadențelor multiple în fiecare lună.</li>
          <li><Check size={16} className="green" /> <b>Dobândă mai mică:</b> Negociem condiții mai avantajoase adaptate pieței actuale.</li>
          <li><Check size={16} className="green" /> <b>Bani suplimentari:</b> Posibilitate de obținere lichidități suplimentare în cadrul aceleiași rate.</li>
        </ul>

        <h2>Întrebări frecvente — Refinanțare</h2>
        {faqs.map(([q, a]) => (
          <div key={q} style={{ marginBottom: "20px" }}>
            <h3>{q}</h3>
            <p>{a}</p>
          </div>
        ))}

        <div className="faq-cta-box" style={{ marginTop: "40px" }}>
          <div>
            <h3>Calculează cât poți economisi la rată</h3>
            <p>Echipa noastră compară gratuit opțiunile disponibile din piață.</p>
          </div>
          <Link href="/#calculator" className="button">
            Calculează economia <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    </>
  );
}
