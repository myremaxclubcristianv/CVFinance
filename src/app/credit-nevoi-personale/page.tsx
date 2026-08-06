import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Landmark } from "lucide-react";

export const metadata: Metadata = {
  title: "Credit Nevoi Personale România | Dobânzi Bune & Analiză Gratuită 100%",
  description:
    "Comparație și negociere pentru credit nevoi personale de la peste 20 de bănci partenere. Află în 2 minute ce sumă poți obține și cea mai mică rată lunară.",
  keywords: ["credit nevoi personale", "broker credit nevoi personale", "banca nevoi personale", "dobanda credit nevoi personale"],
  alternates: { canonical: "/credit-nevoi-personale" },
};

export default function CreditNevoiPersonale() {
  const faqs = [
    [
      "Care este suma maximă pe care o pot obține pentru un credit de nevoi personale?",
      "Suma maximă depinde de veniturile tale nete lunare și gradul de îndatorare permis de BNR. De regulă, băncile partenere acordă până la 150.000 - 200.000 RON pe o perioadă de până la 5 ani.",
    ],
    [
      "Ce condiții trebuie să îndeplinesc?",
      "Vechime minimă de 3-6 luni la actualul loc de muncă, venituri nete declarate la ANAF și un grad de îndatorare adecvat.",
    ],
    [
      "Cât durează aprobarea dosarului?",
      "Cu sprijinul brokerului nostru, pregătirea și depunerea dosarului se realizează rapid, iar aprobarea bancară poate dura între 24 de ore și 3 zile lucrătoare.",
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

        <p className="eyebrow"><span></span> CV FINANCE</p>
        <h1>Credit Nevoi Personale — Negociere & Oferte de la 20+ Bănci</h1>
        <p>
          Cauți un credit de nevoi personale cu cea mai mică rată din piață? Ca broker independent de credite, comparăm ofertele instituțiilor financiare și negociem condiții optimizate pentru tine.
        </p>

        <h2>De ce să obții un credit de nevoi personale prin broker?</h2>
        <ul>
          <li><Check size={16} className="green" /> <b>Economie de timp:</b> Nu mai mergi din bancă în bancă. Noi centralizăm toate opțiunile.</li>
          <li><Check size={16} className="green" /> <b>Șanse crescute de aprobare:</b> Identificăm banca ale cărei norme se potrivesc perfect profilului tău.</li>
          <li><Check size={16} className="green" /> <b>0 RON cost inițial:</b> Analiza și consultanța noastră sunt 100% gratuite.</li>
        </ul>

        <h2>Întrebări frecvente — Credit Nevoi Personale</h2>
        {faqs.map(([q, a]) => (
          <div key={q} style={{ marginBottom: "20px" }}>
            <h3>{q}</h3>
            <p>{a}</p>
          </div>
        ))}

        <div className="faq-cta-box" style={{ marginTop: "40px" }}>
          <div>
            <h3>Ești pregătit să afli ce rată poți obține?</h3>
            <p>Completează formularul în mai puțin de 2 minute pentru o analiză gratuită.</p>
          </div>
          <Link href="/#aplica" className="button">
            Solicită analiza gratuită <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    </>
  );
}
