import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#050505", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px", color: "#ffffff" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, backgroundColor: "#39FF88", opacity: 0.15, filter: "blur(20px)", borderRadius: "50%" }} />
          <div style={{ position: "relative", backgroundColor: "#101311", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "16px", borderRadius: "50%", boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}>
            <Loader2 size={32} style={{ color: "#39FF88", animation: "spin 1s linear infinite" }} />
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "1.3rem", fontWeight: 800, margin: "0 0 6px 0", letterSpacing: "-0.04em" }}>
            CV Finance
          </p>
          <p style={{ color: "#A1A1AA", fontSize: "0.9rem", margin: 0 }}>
            Se pregătesc informațiile...
          </p>
        </div>
      </div>
    </div>
  );
}
