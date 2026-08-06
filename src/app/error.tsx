"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Client Error boundary caught an error:", error);
  }, [error]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#050505", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px", textAlign: "center", color: "#ffffff" }}>
      <div style={{ maxWidth: "440px", width: "100%", backgroundColor: "#101311", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "24px", padding: "32px", boxShadow: "0 25px 50px rgba(0, 0, 0, 0.6)" }}>
        <div style={{ width: "56px", height: "56px", backgroundColor: "rgba(255, 59, 48, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <AlertCircle size={28} style={{ color: "#FF3B30" }} />
        </div>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "12px", color: "#ffffff" }}>
          A apărut o problemă temporară
        </h1>
        <p style={{ color: "#A1A1AA", fontSize: "0.95rem", marginBottom: "28px", lineHeight: 1.6 }}>
          Pagină întâmpină o întrerupere temporară. Te rugăm să încerci reîncărcarea sau să te întorci la pagina principală.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button
            onClick={() => reset()}
            style={{ width: "100%", backgroundColor: "#39FF88", color: "#050505", fontWeight: 800, padding: "14px 20px", borderRadius: "10px", border: "none", cursor: "pointer", fontSize: "0.9rem" }}
          >
            Reîncearcă pagina
          </button>
          
          <Link
            href="/"
            style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.12)", color: "#ffffff", fontWeight: 700, padding: "14px 20px", borderRadius: "10px", textDecoration: "none", fontSize: "0.9rem", display: "inline-block" }}
          >
            Înapoi la pagina principală
          </Link>
        </div>
      </div>
    </div>
  );
}
