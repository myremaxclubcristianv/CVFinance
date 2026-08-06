import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Landmark, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Broker Credite București | Consultanță Financiară Gratuită Piața Victoriei",
  description:
    "Consultant financiar autorizat în București. Consultanță gratuită pentru refinanțare și credite nevoi personale. Experiență financiară acumulată și 20+ bănci partenere.",
  keywords: ["broker credite bucuresti", "broker credit piata victoriei", "consultant financiar bucuresti", "intermediar credite bucuresti"],
  alternates: { canonical: "/broker-credite-bucuresti" },
};

export default function BrokerCrediteBucuresti() {
  const faqs = [
    [
      "Unde este situat sediul Broker CV Finance?",
      "Sediul nostru principal este situat în zona Piața Victoriei, București. Oferim consultanță atât fizic la birou, cât și 100% online/telefonic pe tot teritoriul României.",
    ],
    [
      "Cât mă costă serviciile brokerului?",
      "Consultanța și analiza inițială sunt 100% gratuite pentru client.",
    ],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Broker Credite București — CV Finance",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Piața Victoriei",
      addressLocality: "București",
      addressCountry: "RO",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="legal">
        <Link href="/" className="brand">
          <span style={{ letterSpacing: "-1px" }}>CV</span> Finance
        </Link>

        <p className="eyebrow"><span /> Consultant financiar BUCUREȘTI</p>
        <h1>Broker Credite București — Consultanță Financiară Independentă</h1>
        <p>
          CV Finance este brokerul tău de încredere în București. Echipa noastră de experți financiari te ajută să navighezi rapid prin oferta celor peste 20 de bănci partenere.
        </p>

        <h2>De ce să lucrezi cu echipa noastră din București?</h2>
        <ul>
          <li><Check size={16} className="green" /> <b>Locație accesibilă:</b> Birou ultracentral în zona Piața Victoriei.</li>
          <li><Check size={16} className="green" /> <b>Consultanță la distanță:</b> Posibilitate de derulare 100% online și telefonic.</li>
          <li><Check size={16} className="green" /> <b>Expertiză financiară:</b> Experiență vastă acumulată pe piața financiar-bancară.</li>
        </ul>

        <h2>Întrebări frecvente — București</h2>
        {faqs.map(([q, a]) => (
          <div key={q} style={{ marginBottom: "20px" }}>
            <h3>{q}</h3>
            <p>{a}</p>
          </div>
        ))}

        <div className="faq-cta-box" style={{ marginTop: "40px" }}>
          <div>
            <h3>Programează o consultanță gratuită</h3>
            <p>Echipa noastră te va contacta în maximum 24-48 ore.</p>
          </div>
          <Link href="/#aplica" className="button">
            Solicită analiza gratuită <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    </>
  );
}
