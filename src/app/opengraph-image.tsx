import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CV Finance — Broker Credite & Refinanțare";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#151614",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 800,
              letterSpacing: "-1px",
              color: "#E5D3B3",
            }}
          >
            CV FINANCE
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              margin: 0,
              color: "#ffffff",
              maxWidth: "1000px",
            }}
          >
            Optimizează-ți creditul.<br/>Recâștigă controlul financiar.
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "#a0a29a",
              margin: 0,
              maxWidth: "900px",
            }}
          >
            Credit Advisory & Financial Optimization · Peste 20 de bănci partenere
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "32px",
            fontSize: "20px",
            fontWeight: 700,
            color: "#E5D3B3",
            borderTop: "1px solid #2e302b",
            paddingTop: "32px",
            width: "100%",
          }}
        >
          <span>✓ Analiză Gratuită</span>
          <span>✓ Refinanțare & Optimizare</span>
          <span>✓ Strategii Personalizate</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
