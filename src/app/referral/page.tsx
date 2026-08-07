"use client";
import Header from "@/components/Header";
import ReferralForm from "@/components/ReferralForm";

export default function ReferralPage() {
  return (
    <main className="container">
      {/* Hero Section */}
      <section className="hero section">
        <div className="hero-copy">
          <h1>Recomandă un client</h1>
          <p className="lead">
            Completează formularul și vom contacta persoana recomandată pentru o analiză financiară personalizată.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="section">
        <div className="card">
          <ReferralForm />
        </div>
      </section>
    </main>
  );
}
