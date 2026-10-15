"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Landmark,
  Coins,
  Percent,
  BarChart3,
  ShieldCheck,
  Shield,
  FileText,
  Search,
  Calendar,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Info,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  Sparkles
} from "lucide-react";
import {
  ALL_BNR_SERIES,
  BNR_CATEGORIES_META,
  BNR_CURRENT_POLICY,
  BNR_POLICY_DECISIONS,
  BNR_EDITORIAL_ANALYSES,
  BNR_DATASET_STATS,
  IRCC_VS_ROBOR_COMPARISON,
  roborTenorSnapshot,
  bnrFxCurrenciesSnapshot,
  bnrCreditStructure,
  bnrExternalDebtSnapshot,
  FX_DISCLAIMER,
  getBnrTickerItems,
  BnrDataCategory,
  BnrDataSeries,
  BnrObservation,
  BnrEditorialAnalysis
} from "@/data/bnr";

type TimeRange = "30z" | "90z" | "1an" | "5ani" | "max";

export default function BnrDataIntelligenceHub() {
  const [activeTab, setActiveTab] = useState<BnrDataCategory | "editorial">("ircc_robor");
  const [selectedSeriesId, setSelectedSeriesId] = useState<string>("bnr_ircc_quarterly");
  const [timeRange, setTimeRange] = useState<TimeRange>("max");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hoveredPoint, setHoveredPoint] = useState<BnrObservation | null>(null);
  const [tablePage, setTablePage] = useState<number>(1);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const itemsPerPage = 8;

  // Filtered series based on search or category
  const displayedSeriesList = useMemo(() => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return ALL_BNR_SERIES.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.shortName.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }
    if (activeTab === "editorial") return [];
    return ALL_BNR_SERIES.filter((s) => s.category === activeTab);
  }, [searchQuery, activeTab]);

  // Current selected series object
  const currentSeries = useMemo(() => {
    const found = ALL_BNR_SERIES.find((s) => s.id === selectedSeriesId);
    if (found) return found;
    return displayedSeriesList[0] || ALL_BNR_SERIES[0];
  }, [selectedSeriesId, displayedSeriesList]);

  // Standardize observations chronologically (oldest to newest) for chart and stats
  const chronologicalObservations = useMemo(() => {
    return [...currentSeries.observations].sort((a, b) => a.date.localeCompare(b.date));
  }, [currentSeries]);

  // Filter observations by selected time range (maintaining chronological ascending order)
  const filteredObservations = useMemo(() => {
    const obs = chronologicalObservations;
    if (timeRange === "max") return obs;

    const count = obs.length;
    if (timeRange === "30z") return obs.slice(Math.max(0, count - 4));
    if (timeRange === "90z") return obs.slice(Math.max(0, count - 6));
    if (timeRange === "1an") return obs.slice(Math.max(0, count - 8));
    if (timeRange === "5ani") return obs.slice(Math.max(0, count - 20));
    return obs;
  }, [chronologicalObservations, timeRange]);

  // Summary statistics for the filtered range (diff = latest in range - oldest in range)
  const rangeStats = useMemo(() => {
    if (!filteredObservations.length) return { min: 0, max: 0, avg: 0, first: 0, last: 0, diff: 0 };
    const values = filteredObservations.map((o) => o.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    const first = values[0]; // oldest in filtered range
    const last = values[values.length - 1]; // newest in filtered range
    const diff = last - first;
    return { min, max, avg, first, last, diff };
  }, [filteredObservations]);

  // Paginated table data: sorted descending (newest observations first)
  const tableObservationsDesc = useMemo(() => {
    return [...filteredObservations].sort((a, b) => b.date.localeCompare(a.date));
  }, [filteredObservations]);

  const totalTablePages = Math.ceil(tableObservationsDesc.length / itemsPerPage);
  const paginatedObservations = useMemo(() => {
    const start = (tablePage - 1) * itemsPerPage;
    return tableObservationsDesc.slice(start, start + itemsPerPage);
  }, [tableObservationsDesc, tablePage]);

  // SVG Chart Dimensions
  const chartWidth = 720;
  const chartHeight = 260;
  const padding = { top: 25, right: 30, bottom: 35, left: 55 };
  const graphWidth = chartWidth - padding.left - padding.right;
  const graphHeight = chartHeight - padding.top - padding.bottom;

  // Chart coordinate calculations (strictly chronological: oldest on left, newest on right)
  const chartData = useMemo(() => {
    if (filteredObservations.length === 0) return { points: [], minVal: 0, maxVal: 1, pathString: "", areaString: "" };

    const values = filteredObservations.map((d) => d.value);
    let minVal = Math.min(...values);
    let maxVal = Math.max(...values);

    // Add 10% breathing room to min/max
    const span = maxVal - minVal || 1;
    minVal = Math.max(0, minVal - span * 0.1);
    maxVal = maxVal + span * 0.1;

    const points = filteredObservations.map((obs, idx) => {
      const x =
        padding.left +
        (filteredObservations.length > 1
          ? (idx / (filteredObservations.length - 1)) * graphWidth
          : graphWidth / 2);
      const y =
        padding.top +
        graphHeight -
        ((obs.value - minVal) / (maxVal - minVal)) * graphHeight;
      return { x, y, obs };
    });

    const pathString = points.reduce((acc, curr, idx) => {
      return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
    }, "");

    const firstPt = points[0];
    const lastPt = points[points.length - 1];
    const baselineY = padding.top + graphHeight;
    const areaString = points.length > 0
      ? `${pathString} L ${lastPt.x} ${baselineY} L ${firstPt.x} ${baselineY} Z`
      : "";

    return { points, minVal, maxVal, pathString, areaString };
  }, [filteredObservations, graphWidth, graphHeight, padding.left, padding.top]);

  // Tab change handler
  const handleTabChange = (tab: BnrDataCategory | "editorial") => {
    setActiveTab(tab);
    setSearchQuery("");
    setTablePage(1);
    if (tab !== "editorial") {
      const firstSeries = ALL_BNR_SERIES.find((s) => s.category === tab);
      if (firstSeries) setSelectedSeriesId(firstSeries.id);
    }
  };

  return (
    <div
      id="bnr-data-intelligence-hub"
      style={{
        backgroundColor: "#0A0D0B",
        border: "1px solid rgba(57, 255, 136, 0.25)",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 20px 45px rgba(0, 0, 0, 0.45)",
        color: "#FFFFFF",
        margin: "2.5rem 0 3.5rem",
        fontFamily: "var(--font-sans, Inter, sans-serif)",
      }}
    >
      {/* 1. TOP TICKER — Ultimele valori oficiale disponibile BNR */}
      <div
        style={{
          backgroundColor: "#111613",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          overflowX: "auto",
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "rgba(57, 255, 136, 0.12)",
            border: "1px solid rgba(57, 255, 136, 0.3)",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "0.7rem",
            fontWeight: 800,
            color: "#39FF88",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#39FF88",
              display: "inline-block",
              boxShadow: "0 0 8px #39FF88",
            }}
          />
          ULTIMELE VALORI OFICIALE BNR
        </div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: "16px", fontSize: "0.78rem" }}>
          {getBnrTickerItems().map((item, idx) => (
            <React.Fragment key={item.id}>
              {idx > 0 && <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>|</span>}
              <span style={{ color: "#E3E7E5" }}>
                <strong style={{ color: "#FFFFFF" }}>{item.name}:</strong>{" "}
                <span style={{ color: "#39FF88", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{item.value}</span>{" "}
                <span style={{ color: "#9CA3AF", fontSize: "0.7rem" }}>
                  ({item.period} · {item.changeBadge})
                </span>
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 2. HUB HEADER — Title, Search & Summary */}
      <div style={{ padding: "clamp(1.5rem, 3vw, 2.25rem)", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <Landmark size={20} style={{ color: "#39FF88" }} />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "#39FF88",
                  letterSpacing: "0.08em",
                  fontWeight: 700,
                }}
              >
                CENTRUL DE DATE ECONOMICE &amp; STATISTICĂ OFICIALĂ BNR
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 800,
                color: "#FFFFFF",
                margin: 0,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Monitorul Oficial al Dobânzilor și Pieței Financiare
            </h2>
            <p
              style={{
                fontSize: "0.92rem",
                color: "#9CA3AF",
                margin: "8px 0 0",
                maxWidth: "760px",
                lineHeight: 1.5,
              }}
            >
              Date reale și serii istorice complete extrase din publicațiile Băncii Naționale a României și INS. Fiecare serie afișează perioada exactă de referință, metodologia de calcul și utilitatea practică pentru creditele tale.
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              padding: "10px 14px",
              borderRadius: "8px",
            }}
          >
            <div style={{ textAlign: "center", padding: "0 8px" }}>
              <span style={{ fontSize: "0.68rem", color: "#9CA3AF", display: "block" }}>SERII OFICIALE</span>
              <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#39FF88", fontFamily: "var(--font-mono)" }}>
                {BNR_DATASET_STATS.totalSeries}
              </span>
            </div>
            <div style={{ width: "1px", backgroundColor: "rgba(255, 255, 255, 0.08)" }} />
            <div style={{ textAlign: "center", padding: "0 8px" }}>
              <span style={{ fontSize: "0.68rem", color: "#9CA3AF", display: "block" }}>OBSERVAȚII REALE</span>
              <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#FFFFFF", fontFamily: "var(--font-mono)" }}>
                {BNR_DATASET_STATS.totalObservations}
              </span>
            </div>
            <div style={{ width: "1px", backgroundColor: "rgba(255, 255, 255, 0.08)" }} />
            <div style={{ textAlign: "center", padding: "0 8px" }}>
              <span style={{ fontSize: "0.68rem", color: "#9CA3AF", display: "block" }}>SINCRONIZARE</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#FFFFFF", display: "block", marginTop: "3px" }}>
                Oct. 2026
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ marginTop: "1.25rem", position: "relative", maxWidth: "480px" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9CA3AF",
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Caută serie oficială (ex: IRCC, ROBOR, curs EUR, depozite, M3)..."
            style={{
              width: "100%",
              backgroundColor: "#111613",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "8px",
              padding: "10px 14px 10px 40px",
              color: "#FFFFFF",
              fontSize: "0.88rem",
              outline: "none",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: "#9CA3AF",
                cursor: "pointer",
                fontSize: "0.8rem",
              }}
            >
              Șterge
            </button>
          )}
        </div>
      </div>

      {/* 3. CATEGORY TABS NAVIGATION */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          backgroundColor: "#0D110E",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {BNR_CATEGORIES_META.map((cat) => {
          const isActive = activeTab === cat.id && !searchQuery;
          return (
            <button
              key={cat.id}
              onClick={() => handleTabChange(cat.id)}
              style={{
                padding: "14px 18px",
                backgroundColor: isActive ? "#161D18" : "transparent",
                color: isActive ? "#39FF88" : "#9CA3AF",
                border: "none",
                borderBottom: isActive ? "2px solid #39FF88" : "2px solid transparent",
                cursor: "pointer",
                fontSize: "0.84rem",
                fontWeight: isActive ? 700 : 500,
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 150ms ease",
              }}
            >
              <span>{cat.shortTitle}</span>
              <span
                style={{
                  fontSize: "0.68rem",
                  padding: "1px 6px",
                  borderRadius: "10px",
                  backgroundColor: isActive ? "rgba(57, 255, 136, 0.2)" : "rgba(255, 255, 255, 0.06)",
                  color: isActive ? "#39FF88" : "#9CA3AF",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {cat.indicatorsCount}
              </span>
            </button>
          );
        })}

        {/* Editorial Analyses Tab */}
        <button
          onClick={() => handleTabChange("editorial")}
          style={{
            padding: "14px 18px",
            backgroundColor: activeTab === "editorial" && !searchQuery ? "#161D18" : "transparent",
            color: activeTab === "editorial" && !searchQuery ? "#39FF88" : "#9CA3AF",
            border: "none",
            borderBottom: activeTab === "editorial" && !searchQuery ? "2px solid #39FF88" : "2px solid transparent",
            cursor: "pointer",
            fontSize: "0.84rem",
            fontWeight: activeTab === "editorial" && !searchQuery ? 700 : 500,
            whiteSpace: "nowrap",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 150ms ease",
          }}
        >
          <FileText size={15} />
          <span>Analize Editoriale</span>
          <span
            style={{
              fontSize: "0.68rem",
              padding: "1px 6px",
              borderRadius: "10px",
              backgroundColor: activeTab === "editorial" ? "rgba(57, 255, 136, 0.2)" : "rgba(255, 255, 255, 0.06)",
              color: activeTab === "editorial" ? "#39FF88" : "#9CA3AF",
              fontFamily: "var(--font-mono)",
            }}
          >
            {BNR_EDITORIAL_ANALYSES.length}
          </span>
        </button>
      </div>

      {/* 4. MAIN CONTENT AREA */}
      <div style={{ padding: "clamp(1.25rem, 2.5vw, 2rem)" }}>

        {/* EDITORIAL TAB VIEW */}
        {activeTab === "editorial" && !searchQuery ? (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <span className="cv-mono" style={{ fontSize: "0.75rem", color: "#39FF88", letterSpacing: "0.08em", fontWeight: 700 }}>
                BIBLIOTECĂ DE ANALIZĂ FINANCIARĂ FONDATĂ PE DATE OFICIALE
              </span>
              <h3 style={{ fontSize: "1.45rem", fontWeight: 800, margin: "6px 0 8px 0" }}>
                Cum Se Traduc Indicatorii Macroeconomici în Deciziile Tale de Creditare
              </h3>
              <p style={{ color: "#9CA3AF", fontSize: "0.92rem", maxWidth: "780px" }}>
                Fiecare analiză din această secțiune descompune un mecanism financiar real, calculează impactul asupra ratelor lunare și precizează limitele de interpretare.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
              {BNR_EDITORIAL_ANALYSES.map((analysis) => {
                const isExpanded = selectedArticleId === analysis.id;
                return (
                  <article
                    key={analysis.id}
                    style={{
                      backgroundColor: "#111613",
                      border: isExpanded ? "1px solid #39FF88" : "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "12px",
                      padding: "clamp(1.25rem, 2vw, 1.75rem)",
                      transition: "border-color 200ms ease",
                    }}
                  >
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.75rem" }}>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: "#39FF88",
                          backgroundColor: "rgba(57, 255, 136, 0.1)",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {analysis.referencePeriod}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#9CA3AF", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={12} /> Actualizat la: {analysis.lastUpdated}
                      </span>
                    </div>

                    <h4 style={{ fontSize: "clamp(1.2rem, 2vw, 1.45rem)", fontWeight: 700, color: "#FFFFFF", margin: "0 0 0.6rem 0", lineHeight: 1.3 }}>
                      {analysis.title}
                    </h4>

                    <p style={{ color: "#D1D5DB", fontSize: "0.93rem", lineHeight: 1.6, margin: "0 0 1.25rem 0" }}>
                      {analysis.summary}
                    </p>

                    {/* Primary indicators snapshot */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "10px",
                        marginBottom: "1.25rem",
                      }}
                    >
                      {analysis.primaryIndicators.map((ind) => (
                        <div
                          key={ind.name}
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.06)",
                            borderRadius: "6px",
                            padding: "8px 12px",
                          }}
                        >
                          <span style={{ fontSize: "0.72rem", color: "#9CA3AF", display: "block" }}>{ind.name}</span>
                          <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#39FF88", fontFamily: "var(--font-mono)" }}>
                            {ind.value}
                          </span>
                          <span style={{ fontSize: "0.68rem", color: "#6B7280", display: "block" }}>{ind.period}</span>
                        </div>
                      ))}
                    </div>

                    {/* Expanded Article Body */}
                    {isExpanded && (
                      <div
                        style={{
                          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                          paddingTop: "1.25rem",
                          marginTop: "1.25rem",
                        }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "#E5E7EB", fontSize: "0.95rem", lineHeight: 1.65 }}>
                          {analysis.contentParagraphs.map((par, pIdx) => (
                            <p key={pIdx} style={{ margin: 0 }}>
                              {par}
                            </p>
                          ))}
                        </div>

                        {/* Practical Takeaways */}
                        <div
                          style={{
                            margin: "1.5rem 0",
                            backgroundColor: "rgba(57, 255, 136, 0.05)",
                            borderLeft: "3px solid #39FF88",
                            padding: "1rem 1.25rem",
                            borderRadius: "0 8px 8px 0",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.78rem",
                              fontWeight: 800,
                              color: "#39FF88",
                              letterSpacing: "0.06em",
                              display: "block",
                              marginBottom: "0.5rem",
                              fontFamily: "var(--font-mono)",
                            }}
                          >
                            CONCLUZII PRACTICE PENTRU DEBITOR:
                          </span>
                          <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#E5E7EB", fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                            {analysis.takeaways.map((point, ptIdx) => (
                              <li key={ptIdx}>{point}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Limits & Disclaimer */}
                        <div
                          style={{
                            fontSize: "0.78rem",
                            color: "#9CA3AF",
                            backgroundColor: "rgba(0, 0, 0, 0.25)",
                            padding: "10px 14px",
                            borderRadius: "6px",
                            marginBottom: "1rem",
                            lineHeight: 1.5,
                          }}
                        >
                          <strong>Limite de interpretare:</strong> {analysis.limitations}
                          <br />
                          <span style={{ color: "#6B7280", marginTop: "4px", display: "inline-block" }}>
                            {analysis.disclaimer}
                          </span>
                        </div>

                        {/* Primary Sources */}
                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
                          <span style={{ fontSize: "0.72rem", color: "#9CA3AF", fontFamily: "var(--font-mono)" }}>
                            SURSE PRIMARE:
                          </span>
                          {analysis.sources.map((src) => (
                            <a
                              key={src.url}
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                fontSize: "0.78rem",
                                color: "#39FF88",
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                backgroundColor: "rgba(57, 255, 136, 0.08)",
                                padding: "4px 8px",
                                borderRadius: "4px",
                              }}
                            >
                              <span>{src.name}</span>
                              <ExternalLink size={12} />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Toggle Button */}
                    <div style={{ marginTop: "1rem" }}>
                      <button
                        onClick={() => setSelectedArticleId(isExpanded ? null : analysis.id)}
                        style={{
                          backgroundColor: isExpanded ? "rgba(255, 255, 255, 0.08)" : "#39FF88",
                          color: isExpanded ? "#FFFFFF" : "#0A0D0B",
                          fontWeight: 700,
                          fontSize: "0.82rem",
                          padding: "8px 16px",
                          borderRadius: "6px",
                          border: "none",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span>{isExpanded ? "Restrânge analiza" : "Citește analiza completă și concluziile"}</span>
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : (
          /* INDICATORS & INTERACTIVE GRAPH VIEW */
          <div>
            {/* Top Indicator Selection Cards */}
            <div style={{ marginBottom: "1.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem" }}>
                <span className="cv-mono" style={{ fontSize: "0.75rem", color: "#9CA3AF", letterSpacing: "0.06em", fontWeight: 700 }}>
                  INDICATORI DISPONIBILI ÎN ACEASTĂ SECȚIUNE:
                </span>
                <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>
                  Apasă pe un indicator pentru a încărca seria istorică în grafic
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "12px",
                }}
              >
                {displayedSeriesList.map((series) => {
                  const isSelected = series.id === currentSeries.id;
                  const lastObs = series.observations[series.observations.length - 1];
                  const hasPpChange = lastObs && typeof lastObs.changePp === "number";

                  return (
                    <div
                      key={series.id}
                      onClick={() => {
                        setSelectedSeriesId(series.id);
                        setTablePage(1);
                      }}
                      style={{
                        backgroundColor: isSelected ? "#141A16" : "#111613",
                        border: isSelected ? "1px solid #39FF88" : "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "10px",
                        padding: "14px 16px",
                        cursor: "pointer",
                        transition: "all 150ms ease",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "2px",
                            backgroundColor: "#39FF88",
                            boxShadow: "0 0 10px #39FF88",
                          }}
                        />
                      )}

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            fontFamily: "var(--font-mono)",
                            color: isSelected ? "#39FF88" : "#9CA3AF",
                            fontWeight: 700,
                          }}
                        >
                          {series.code}
                        </span>
                        <span
                          style={{
                            fontSize: "0.68rem",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            backgroundColor: "rgba(255, 255, 255, 0.06)",
                            color: "#9CA3AF",
                          }}
                        >
                          {series.frequency}
                        </span>
                      </div>

                      <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF", margin: "0 0 8px 0", lineHeight: 1.3 }}>
                        {series.shortName}
                      </h4>

                      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "8px" }}>
                        <span
                          style={{
                            fontSize: "1.45rem",
                            fontWeight: 800,
                            color: isSelected ? "#39FF88" : "#FFFFFF",
                            fontFamily: "var(--font-mono)",
                            lineHeight: 1,
                          }}
                        >
                          {series.currentDisplayValue}
                        </span>

                        {hasPpChange && (
                          <span
                            style={{
                              fontSize: "0.74rem",
                              fontWeight: 700,
                              fontFamily: "var(--font-mono)",
                              color:
                                (lastObs.changePp ?? 0) < 0
                                  ? "#39FF88"
                                  : (lastObs.changePp ?? 0) > 0
                                  ? "#FF3B30"
                                  : "#9CA3AF",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "2px",
                            }}
                          >
                            {(lastObs.changePp ?? 0) > 0 ? "+" : ""}
                            {lastObs.changePp} pp
                          </span>
                        )}
                      </div>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px", fontSize: "0.7rem", color: "#6B7280" }}>
                        <span>Ref: {series.referencePeriod}</span>
                        <span style={{ color: isSelected ? "#39FF88" : "#9CA3AF" }}>
                          {series.observations.length} obs.
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CHART & CONTROLS BOX */}
            <div
              style={{
                backgroundColor: "#111613",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "clamp(1rem, 2vw, 1.5rem)",
                marginBottom: "1.75rem",
              }}
            >
              {/* Chart Header Bar: Title, Source & Time Range Selectors */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  marginBottom: "1rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                  paddingBottom: "0.85rem",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <BarChart3 size={17} style={{ color: "#39FF88" }} />
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: 0, color: "#FFFFFF" }}>
                      Evoluție Istorică: {currentSeries.name}
                    </h3>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "#9CA3AF", marginTop: "2px", display: "block" }}>
                    Sursă: {currentSeries.sourceName} · Unitate: {currentSeries.unit} · Cod: {currentSeries.code}
                  </span>
                </div>

                {/* Time Range Selector */}
                <div style={{ display: "inline-flex", gap: "4px", backgroundColor: "#0A0D0B", padding: "3px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                  {(["max", "5ani", "1an", "90z", "30z"] as TimeRange[]).map((range) => {
                    const labels: Record<TimeRange, string> = {
                      max: "Tot Istoricul",
                      "5ani": "5 Ani",
                      "1an": "12 Luni",
                      "90z": "90 Zile",
                      "30z": "Recent"
                    };
                    const isActive = timeRange === range;
                    return (
                      <button
                        key={range}
                        onClick={() => {
                          setTimeRange(range);
                          setTablePage(1);
                        }}
                        style={{
                          backgroundColor: isActive ? "#39FF88" : "transparent",
                          color: isActive ? "#0A0D0B" : "#9CA3AF",
                          fontWeight: isActive ? 700 : 500,
                          fontSize: "0.74rem",
                          border: "none",
                          borderRadius: "5px",
                          padding: "5px 10px",
                          cursor: "pointer",
                          transition: "all 150ms ease",
                        }}
                      >
                        {labels[range]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Range Stats Bar */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: "8px",
                  marginBottom: "1rem",
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid rgba(255, 255, 255, 0.04)",
                }}
              >
                <div>
                  <span style={{ fontSize: "0.68rem", color: "#9CA3AF", display: "block" }}>VALOARE CURENTĂ</span>
                  <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#39FF88", fontFamily: "var(--font-mono)" }}>
                    {currentSeries.currentDisplayValue}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: "0.68rem", color: "#9CA3AF", display: "block" }}>MINIM PERIOADĂ</span>
                  <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF", fontFamily: "var(--font-mono)" }}>
                    {rangeStats.min.toFixed(2)} {currentSeries.unit.includes("%") ? "%" : ""}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: "0.68rem", color: "#9CA3AF", display: "block" }}>MAXIM PERIOADĂ</span>
                  <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF", fontFamily: "var(--font-mono)" }}>
                    {rangeStats.max.toFixed(2)} {currentSeries.unit.includes("%") ? "%" : ""}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: "0.68rem", color: "#9CA3AF", display: "block" }}>MEDIE INTERVAL</span>
                  <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF", fontFamily: "var(--font-mono)" }}>
                    {rangeStats.avg.toFixed(2)} {currentSeries.unit.includes("%") ? "%" : ""}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: "0.68rem", color: "#9CA3AF", display: "block" }}>VARIAȚIE INTERVAL</span>
                  <span
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-mono)",
                      color: "#FFFFFF",
                    }}
                  >
                    {filteredObservations.length < 2
                      ? "—"
                      : `${rangeStats.diff > 0 ? "+" : ""}${rangeStats.diff.toFixed(2)} ${
                          currentSeries.unit.includes("%") ? "pp" : currentSeries.unit
                        }`}
                  </span>
                  <span style={{ fontSize: "0.65rem", color: "#6B7280", display: "block" }}>
                    {filteredObservations.length < 2
                      ? "punct unic"
                      : currentSeries.unit.includes("%")
                      ? "puncte procentuale"
                      : "variație absolută"}
                  </span>
                </div>
              </div>

              {/* Responsive SVG Chart */}
              <div style={{ position: "relative", width: "100%", height: `${chartHeight}px`, overflow: "hidden" }}>
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  style={{ width: "100%", height: "100%", overflow: "visible" }}
                >
                  <defs>
                    <linearGradient id="bnrChartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#39FF88" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#39FF88" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid Lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
                    const y = padding.top + graphHeight * pct;
                    const val = chartData.maxVal - pct * (chartData.maxVal - chartData.minVal);
                    return (
                      <g key={idx}>
                        <line
                          x1={padding.left}
                          y1={y}
                          x2={chartWidth - padding.right}
                          y2={y}
                          stroke="rgba(255, 255, 255, 0.07)"
                          strokeDasharray="3 3"
                        />
                        <text
                          x={padding.left - 8}
                          y={y + 4}
                          fill="#9CA3AF"
                          fontSize="10"
                          textAnchor="end"
                          fontFamily="var(--font-mono)"
                        >
                          {val.toFixed(2)}
                        </text>
                      </g>
                    );
                  })}

                  {/* Filled Area Gradient */}
                  {chartData.areaString && (
                    <path d={chartData.areaString} fill="url(#bnrChartGradient)" />
                  )}

                  {/* Stroke Line */}
                  {chartData.pathString && (
                    <path
                      d={chartData.pathString}
                      fill="none"
                      stroke="#39FF88"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}

                  {/* Data Point Circles */}
                  {chartData.points.map((pt, idx) => {
                    const isHovered = hoveredPoint?.date === pt.obs.date;
                    return (
                      <g key={idx}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isHovered ? 6 : 3.5}
                          fill={isHovered ? "#FFFFFF" : "#39FF88"}
                          stroke="#0A0D0B"
                          strokeWidth="2"
                          style={{ cursor: "pointer", transition: "r 150ms ease" }}
                          onMouseEnter={() => setHoveredPoint(pt.obs)}
                          onMouseLeave={() => setHoveredPoint(null)}
                        />
                      </g>
                    );
                  })}

                  {/* X-Axis labels for first, middle and last */}
                  {chartData.points.length > 0 && (
                    <>
                      <text
                        x={chartData.points[0].x}
                        y={chartHeight - 8}
                        fill="#9CA3AF"
                        fontSize="10"
                        textAnchor="start"
                        fontFamily="var(--font-mono)"
                      >
                        {chartData.points[0].obs.displayDate}
                      </text>
                      {chartData.points.length > 2 && (
                        <text
                          x={chartData.points[Math.floor(chartData.points.length / 2)].x}
                          y={chartHeight - 8}
                          fill="#9CA3AF"
                          fontSize="10"
                          textAnchor="middle"
                          fontFamily="var(--font-mono)"
                        >
                          {chartData.points[Math.floor(chartData.points.length / 2)].obs.displayDate}
                        </text>
                      )}
                      <text
                        x={chartData.points[chartData.points.length - 1].x}
                        y={chartHeight - 8}
                        fill="#9CA3AF"
                        fontSize="10"
                        textAnchor="end"
                        fontFamily="var(--font-mono)"
                      >
                        {chartData.points[chartData.points.length - 1].obs.displayDate}
                      </text>
                    </>
                  )}
                </svg>

                {/* Floating Interactive Tooltip */}
                {hoveredPoint && (
                  <div
                    style={{
                      position: "absolute",
                      top: "14px",
                      right: "14px",
                      backgroundColor: "#0A0D0B",
                      border: "1px solid #39FF88",
                      borderRadius: "8px",
                      padding: "8px 12px",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.6)",
                      pointerEvents: "none",
                      fontSize: "0.78rem",
                    }}
                  >
                    <span style={{ color: "#9CA3AF", display: "block" }}>{hoveredPoint.displayDate}</span>
                    <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#39FF88", fontFamily: "var(--font-mono)" }}>
                      {hoveredPoint.displayValue}
                    </span>
                    {typeof hoveredPoint.changePp === "number" && (
                      <span
                        style={{
                          display: "block",
                          color: hoveredPoint.changePp < 0 ? "#39FF88" : hoveredPoint.changePp > 0 ? "#FF3B30" : "#9CA3AF",
                          fontWeight: 700,
                          fontSize: "0.72rem",
                        }}
                      >
                        Variație: {hoveredPoint.changePp > 0 ? "+" : ""}{hoveredPoint.changePp} pp
                      </span>
                    )}
                    {hoveredPoint.notes && (
                      <span style={{ color: "#D1D5DB", fontSize: "0.7rem", display: "block", marginTop: "2px" }}>
                        {hoveredPoint.notes}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Methodology & Practical Borrower Relevance Box */}
              <div
                style={{
                  marginTop: "1.25rem",
                  padding: "1rem 1.25rem",
                  backgroundColor: "rgba(57, 255, 136, 0.04)",
                  border: "1px solid rgba(57, 255, 136, 0.15)",
                  borderRadius: "8px",
                  fontSize: "0.86rem",
                  lineHeight: 1.55,
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
                  <Info size={16} style={{ color: "#39FF88", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <strong style={{ color: "#FFFFFF" }}>Relevanță practică pentru credite: </strong>
                    <span style={{ color: "#D1D5DB" }}>{currentSeries.practicalRelevance}</span>
                  </div>
                </div>
                <div style={{ fontSize: "0.78rem", color: "#9CA3AF", paddingLeft: "24px" }}>
                  <strong>Metodologie oficială:</strong> {currentSeries.methodology}
                </div>
              </div>
            </div>

            {/* SPECIAL CONTEXTUAL WIDGETS BY CATEGORY */}

            {/* A. Politică Monetară: Cronologie Decizii CA BNR */}
            {activeTab === "monetary_policy" && (
              <div
                style={{
                  backgroundColor: "#111613",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  padding: "clamp(1rem, 2vw, 1.5rem)",
                  marginBottom: "1.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                  <Landmark size={18} style={{ color: "#39FF88" }} />
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, color: "#FFFFFF" }}>
                    Cronologia Deciziilor Consiliului de Administrație al BNR (2021–2026)
                  </h4>
                </div>
                <p style={{ fontSize: "0.84rem", color: "#9CA3AF", margin: "0 0 1rem 0" }}>
                  Istoricul complet al ședințelor de politică monetară, evoluția ratei de politică monetară și comunicatele oficiale de presă BNR.
                </p>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.12)", color: "#9CA3AF" }}>
                        <th style={{ padding: "8px 10px" }}>Data deciziei</th>
                        <th style={{ padding: "8px 10px" }}>Rată cheie</th>
                        <th style={{ padding: "8px 10px" }}>Lombard</th>
                        <th style={{ padding: "8px 10px" }}>Depozit</th>
                        <th style={{ padding: "8px 10px" }}>Modificare</th>
                        <th style={{ padding: "8px 10px" }}>Context și motivare BNR</th>
                        <th style={{ padding: "8px 10px" }}>Sursă</th>
                      </tr>
                    </thead>
                    <tbody>
                      {BNR_POLICY_DECISIONS.map((dec) => (
                        <tr
                          key={dec.decisionDate}
                          style={{
                            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                            backgroundColor: dec.changeBps !== 0 ? "rgba(255, 255, 255, 0.02)" : "transparent",
                          }}
                        >
                          <td style={{ padding: "10px", fontWeight: 700, color: "#FFFFFF", fontFamily: "var(--font-mono)" }}>
                            {dec.decisionDate}
                          </td>
                          <td style={{ padding: "10px", color: "#39FF88", fontWeight: 800, fontFamily: "var(--font-mono)" }}>
                            {dec.keyRate.toFixed(2)}%
                          </td>
                          <td style={{ padding: "10px", color: "#D1D5DB", fontFamily: "var(--font-mono)" }}>
                            {dec.lombardRate.toFixed(2)}%
                          </td>
                          <td style={{ padding: "10px", color: "#D1D5DB", fontFamily: "var(--font-mono)" }}>
                            {dec.depositRate.toFixed(2)}%
                          </td>
                          <td style={{ padding: "10px" }}>
                            <span
                              style={{
                                padding: "2px 6px",
                                borderRadius: "4px",
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                fontFamily: "var(--font-mono)",
                                backgroundColor:
                                  dec.changeBps < 0
                                    ? "rgba(57, 255, 136, 0.15)"
                                    : dec.changeBps > 0
                                    ? "rgba(255, 59, 48, 0.15)"
                                    : "rgba(255, 255, 255, 0.06)",
                                color:
                                  dec.changeBps < 0
                                    ? "#39FF88"
                                    : dec.changeBps > 0
                                    ? "#FF3B30"
                                    : "#9CA3AF",
                              }}
                            >
                              {dec.changeBps > 0 ? `+${dec.changeBps}` : dec.changeBps} bps
                            </span>
                          </td>
                          <td style={{ padding: "10px", color: "#9CA3AF", fontSize: "0.78rem" }}>
                            {dec.summary}
                          </td>
                          <td style={{ padding: "10px" }}>
                            <a
                              href={dec.pressReleaseUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#39FF88", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "2px" }}
                            >
                              <ExternalLink size={12} />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* B. IRCC & ROBOR: Comparativ și Structură Scadențe */}
            {activeTab === "ircc_robor" && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "1.25rem",
                  marginBottom: "1.75rem",
                }}
              >
                {/* Comparativ IRCC vs ROBOR */}
                <div
                  style={{
                    backgroundColor: "#111613",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    padding: "16px",
                  }}
                >
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 10px 0", color: "#FFFFFF" }}>
                    Diferența Esențială: IRCC vs. ROBOR
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.82rem" }}>
                    {IRCC_VS_ROBOR_COMPARISON.points.map((pt, idx) => (
                      <div key={idx} style={{ backgroundColor: "rgba(255, 255, 255, 0.02)", padding: "8px 10px", borderRadius: "6px" }}>
                        <strong style={{ color: "#39FF88" }}>{pt.title}:</strong>
                        <div style={{ color: "#D1D5DB", marginTop: "2px" }}>
                          <span style={{ color: "#39FF88", fontWeight: 600 }}>IRCC:</span> {pt.ircc}
                        </div>
                        <div style={{ color: "#9CA3AF", fontSize: "0.76rem", marginTop: "2px" }}>
                          <span style={{ color: "#6B7280" }}>ROBOR:</span> {pt.robor}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scadențe ROBOR snapshot */}
                <div
                  style={{
                    backgroundColor: "#111613",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    padding: "16px",
                  }}
                >
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 10px 0", color: "#FFFFFF" }}>
                    Cotațiile Scadențelor ROBOR (Piața Interbancară)
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {roborTenorSnapshot.map((r) => (
                      <div
                        key={r.tenor}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "6px 10px",
                          borderRadius: "4px",
                          backgroundColor: r.tenor.includes("3M") ? "rgba(57, 255, 136, 0.1)" : "rgba(255, 255, 255, 0.02)",
                          border: r.tenor.includes("3M") ? "1px solid rgba(57, 255, 136, 0.3)" : "none",
                        }}
                      >
                        <div>
                          <span style={{ fontWeight: 700, color: r.tenor.includes("3M") ? "#39FF88" : "#FFFFFF", fontSize: "0.84rem" }}>
                            {r.tenor}
                          </span>
                          <span style={{ fontSize: "0.7rem", color: "#6B7280", marginLeft: "6px" }}>{r.maturity}</span>
                        </div>
                        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 800, color: r.tenor.includes("3M") ? "#39FF88" : "#FFFFFF", fontSize: "0.95rem" }}>
                          {r.displayValue}
                        </span>
                      </div>
                    ))}
                  </div>
                  <span style={{ fontSize: "0.7rem", color: "#6B7280", marginTop: "8px", display: "block" }}>
                    Notă: ROBOR 3M este indicele contractual folosit preponderent pentru creditele ipotecare acordate înainte de mai 2019.
                  </span>
                </div>
              </div>
            )}

            {/* C. Cursuri Valutare BNR: Valute Reper și Medii Multianuale */}
            {activeTab === "exchange_rates" && (
              <div
                style={{
                  backgroundColor: "#111613",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  padding: "clamp(1rem, 2vw, 1.5rem)",
                  marginBottom: "1.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                  <Coins size={18} style={{ color: "#39FF88" }} />
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, color: "#FFFFFF" }}>
                    Cotațiile Valutare Oficiale BNR (Reper de Schimb)
                  </h4>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "10px",
                    marginBottom: "1.25rem",
                  }}
                >
                  {bnrFxCurrenciesSnapshot.map((fx) => (
                    <div
                      key={fx.currency}
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        borderRadius: "8px",
                        padding: "12px",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#FFFFFF" }}>{fx.currency}</span>
                        <span style={{ fontSize: "0.7rem", color: "#9CA3AF" }}>{fx.role}</span>
                      </div>
                      <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "#39FF88", fontFamily: "var(--font-mono)", display: "block", margin: "4px 0" }}>
                        {fx.displayValue}
                      </span>
                      <span style={{ fontSize: "0.72rem", color: fx.changeDaily.startsWith("-") ? "#39FF88" : "#FF3B30", fontFamily: "var(--font-mono)" }}>
                        Variație zilnică: {fx.changeDaily} RON
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    padding: "10px 14px",
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    borderLeft: "3px solid #39FF88",
                    fontSize: "0.78rem",
                    color: "#9CA3AF",
                    lineHeight: 1.45,
                  }}
                >
                  {FX_DISCLAIMER}
                </div>
              </div>
            )}

            {/* D. Dobânzi & Credite: Structură Monedă Lei vs Valută */}
            {activeTab === "banking_rates" && (
              <div
                style={{
                  backgroundColor: "#111613",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  padding: "clamp(1rem, 2vw, 1.5rem)",
                  marginBottom: "1.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.75rem" }}>
                  <Percent size={18} style={{ color: "#39FF88" }} />
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, color: "#FFFFFF" }}>
                    Structura Creditului Neguvernamental: Lei (68,4%) vs. Valută (31,6%)
                  </h4>
                </div>
                <p style={{ fontSize: "0.84rem", color: "#9CA3AF", margin: "0 0 1rem 0" }}>
                  Sold total: {bnrCreditStructure.displayTotal}. Moneda națională predomină masiv, eliminând riscul valutar pentru majoritatea debitorilor din România.
                </p>

                {/* Progress bar visual */}
                <div style={{ height: "18px", borderRadius: "9px", overflow: "hidden", display: "flex", marginBottom: "8px" }}>
                  <div style={{ width: "68.4%", backgroundColor: "#39FF88" }} title="Lei: 68.4%" />
                  <div style={{ width: "31.6%", backgroundColor: "#6B7280" }} title="Valută: 31.6%" />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem" }}>
                  <span style={{ color: "#39FF88", fontWeight: 700 }}>
                    Credit în Lei: {bnrCreditStructure.currencyBreakdown[0].displayShare} ({bnrCreditStructure.currencyBreakdown[0].valueBillion} mld. lei)
                  </span>
                  <span style={{ color: "#9CA3AF" }}>
                    Credit în Valută: {bnrCreditStructure.currencyBreakdown[1].displayShare} ({bnrCreditStructure.currencyBreakdown[1].valueBillion} mld. lei echiv.)
                  </span>
                </div>
              </div>
            )}

            {/* F. Balanță & Rezerve: Structură Rezerve Aur & Valută */}
            {activeTab === "balance_reserves" && (
              <div
                style={{
                  backgroundColor: "#111613",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  padding: "clamp(1rem, 2vw, 1.5rem)",
                  marginBottom: "1.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.75rem" }}>
                  <ShieldCheck size={18} style={{ color: "#39FF88" }} />
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, color: "#FFFFFF" }}>
                    Structura Rezervelor Internaționale ale României (30 Septembrie 2026)
                  </h4>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "10px",
                    margin: "1rem 0",
                  }}
                >
                  <div style={{ backgroundColor: "rgba(57, 255, 136, 0.08)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(57, 255, 136, 0.2)" }}>
                    <span style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>TOTAL REZERVE INTERNAȚIONALE</span>
                    <span style={{ fontSize: "1.35rem", fontWeight: 800, color: "#39FF88", fontFamily: "var(--font-mono)", display: "block" }}>
                      72.340 mil. €
                    </span>
                    <span style={{ fontSize: "0.68rem", color: "#6B7280" }}>la 30 Septembrie 2026</span>
                  </div>
                  <div style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", padding: "12px", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>REZERVA VALUTARĂ</span>
                    <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#FFFFFF", fontFamily: "var(--font-mono)", display: "block" }}>
                      60.060 mil. €
                    </span>
                    <span style={{ fontSize: "0.68rem", color: "#6B7280" }}>Disponibilități și titluri lichide</span>
                  </div>
                  <div style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", padding: "12px", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>REZERVA DE AUR</span>
                    <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#FFFFFF", fontFamily: "var(--font-mono)", display: "block" }}>
                      103,6 tone
                    </span>
                    <span style={{ fontSize: "0.68rem", color: "#39FF88" }}>Valoare: 12.280 mil. €</span>
                  </div>
                </div>
              </div>
            )}

            {/* G. Stabilitate Financiară: Praguri Prudențiale */}
            {activeTab === "financial_stability" && (
              <div
                style={{
                  backgroundColor: "#111613",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  padding: "clamp(1rem, 2vw, 1.5rem)",
                  marginBottom: "1.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.75rem" }}>
                  <Shield size={18} style={{ color: "#39FF88" }} />
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, color: "#FFFFFF" }}>
                    Cadrul Prudențial și Siguranța Depozitelor Bancare
                  </h4>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "10px",
                  }}
                >
                  <div style={{ backgroundColor: "rgba(255, 255, 255, 0.02)", padding: "12px", borderRadius: "6px" }}>
                    <span style={{ fontSize: "0.7rem", color: "#9CA3AF" }}>PLAFON DE ÎNDATORARE DSTI</span>
                    <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "#39FF88", fontFamily: "var(--font-mono)", display: "block" }}>
                      40% (45% Prima Casă)
                    </span>
                    <span style={{ fontSize: "0.68rem", color: "#6B7280" }}>Regulamentul BNR nr. 17/2012 (modificat prin Regulamentul nr. 6/2018)</span>
                  </div>
                  <div style={{ backgroundColor: "rgba(255, 255, 255, 0.02)", padding: "12px", borderRadius: "6px" }}>
                    <span style={{ fontSize: "0.7rem", color: "#9CA3AF" }}>GARANȚIE DEPOZITE FGDB</span>
                    <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "#FFFFFF", fontFamily: "var(--font-mono)", display: "block" }}>
                      100.000 € / deponent
                    </span>
                    <span style={{ fontSize: "0.68rem", color: "#6B7280" }}>Directiva UE / Legea 311/2015</span>
                  </div>
                  <div style={{ backgroundColor: "rgba(255, 255, 255, 0.02)", padding: "12px", borderRadius: "6px" }}>
                    <span style={{ fontSize: "0.7rem", color: "#9CA3AF" }}>ACOPERIRE LICHIDITATE (LCR)</span>
                    <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "#39FF88", fontFamily: "var(--font-mono)", display: "block" }}>
                      268,0%
                    </span>
                    <span style={{ fontSize: "0.68rem", color: "#6B7280" }}>Minim legal obligatoriu: 100%</span>
                  </div>
                </div>
              </div>
            )}

            {/* HISTORICAL OBSERVATIONS DATA TABLE WITH PAGINATION */}
            <div
              style={{
                backgroundColor: "#111613",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "clamp(1rem, 2vw, 1.5rem)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 700, margin: 0, color: "#FFFFFF" }}>
                    Date Istorice Autentice: {currentSeries.shortName}
                  </h4>
                  <span style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>
                    Total: {filteredObservations.length} observații verificate · Sursă: {currentSeries.sourceName}
                  </span>
                </div>

                {/* Direct Source Link */}
                <a
                  href={currentSeries.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.76rem",
                    color: "#39FF88",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    backgroundColor: "rgba(57, 255, 136, 0.08)",
                    border: "1px solid rgba(57, 255, 136, 0.2)",
                    padding: "5px 10px",
                    borderRadius: "6px",
                  }}
                >
                  <span>Verifică pe site-ul oficial BNR</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Table */}
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.12)", color: "#9CA3AF" }}>
                      <th style={{ padding: "8px 10px" }}>Perioadă</th>
                      <th style={{ padding: "8px 10px" }}>Valoare înregistrată</th>
                      <th style={{ padding: "8px 10px" }}>Variație</th>
                      <th style={{ padding: "8px 10px" }}>Note &amp; Detalii metodologice</th>
                      <th style={{ padding: "8px 10px", textAlign: "right" }}>Stare</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedObservations.map((obs) => {
                      const hasPp = typeof obs.changePp === "number";
                      return (
                        <tr
                          key={obs.date}
                          style={{
                            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                          }}
                        >
                          <td style={{ padding: "9px 10px", fontWeight: 700, color: "#FFFFFF", fontFamily: "var(--font-mono)" }}>
                            {obs.displayDate}
                          </td>
                          <td style={{ padding: "9px 10px", color: "#39FF88", fontWeight: 800, fontFamily: "var(--font-mono)" }}>
                            {obs.displayValue}
                          </td>
                          <td style={{ padding: "9px 10px" }}>
                            {hasPp ? (
                              <span
                                style={{
                                  fontSize: "0.74rem",
                                  fontWeight: 700,
                                  fontFamily: "var(--font-mono)",
                                  color:
                                    (obs.changePp ?? 0) < 0
                                      ? "#39FF88"
                                      : (obs.changePp ?? 0) > 0
                                      ? "#FF3B30"
                                      : "#9CA3AF",
                                }}
                              >
                                {(obs.changePp ?? 0) > 0 ? "+" : ""}
                                {obs.changePp} pp
                              </span>
                            ) : (
                              <span style={{ color: "#6B7280" }}>—</span>
                            )}
                          </td>
                          <td style={{ padding: "9px 10px", color: "#9CA3AF", fontSize: "0.78rem" }}>
                            {obs.notes || "Publicare statistică oficială confirmată"}
                          </td>
                          <td style={{ padding: "9px 10px", textAlign: "right" }}>
                            {obs.status === "provizoriu" ? (
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "3px",
                                  fontSize: "0.7rem",
                                  color: "#38BDF8",
                                  backgroundColor: "rgba(56, 189, 248, 0.12)",
                                  padding: "2px 6px",
                                  borderRadius: "4px",
                                  fontFamily: "var(--font-mono)",
                                }}
                              >
                                <Info size={11} />
                                Provizoriu YTD
                              </span>
                            ) : obs.status === "revizuit" ? (
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "3px",
                                  fontSize: "0.7rem",
                                  color: "#FBBF24",
                                  backgroundColor: "rgba(251, 191, 36, 0.12)",
                                  padding: "2px 6px",
                                  borderRadius: "4px",
                                  fontFamily: "var(--font-mono)",
                                }}
                              >
                                Revizuit
                              </span>
                            ) : obs.status === "estimat" ? (
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "3px",
                                  fontSize: "0.7rem",
                                  color: "#C084FC",
                                  backgroundColor: "rgba(192, 132, 252, 0.12)",
                                  padding: "2px 6px",
                                  borderRadius: "4px",
                                  fontFamily: "var(--font-mono)",
                                }}
                              >
                                Estimat
                              </span>
                            ) : (
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "3px",
                                  fontSize: "0.7rem",
                                  color: "#39FF88",
                                  backgroundColor: "rgba(57, 255, 136, 0.12)",
                                  padding: "2px 6px",
                                  borderRadius: "4px",
                                  fontFamily: "var(--font-mono)",
                                }}
                              >
                                <CheckCircle2 size={11} />
                                Confirmat
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalTablePages > 1 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "1rem",
                    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                    paddingTop: "0.75rem",
                    fontSize: "0.78rem",
                  }}
                >
                  <span style={{ color: "#9CA3AF" }}>
                    Pagina {tablePage} din {totalTablePages} ({filteredObservations.length} înregistrări)
                  </span>

                  <div style={{ display: "inline-flex", gap: "6px" }}>
                    <button
                      onClick={() => setTablePage((p) => Math.max(1, p - 1))}
                      disabled={tablePage === 1}
                      style={{
                        padding: "4px 10px",
                        borderRadius: "4px",
                        backgroundColor: tablePage === 1 ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.08)",
                        color: tablePage === 1 ? "#52525B" : "#FFFFFF",
                        border: "none",
                        cursor: tablePage === 1 ? "not-allowed" : "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <ChevronLeft size={14} /> Anterior
                    </button>
                    <button
                      onClick={() => setTablePage((p) => Math.min(totalTablePages, p + 1))}
                      disabled={tablePage === totalTablePages}
                      style={{
                        padding: "4px 10px",
                        borderRadius: "4px",
                        backgroundColor: tablePage === totalTablePages ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.08)",
                        color: tablePage === totalTablePages ? "#52525B" : "#FFFFFF",
                        border: "none",
                        cursor: tablePage === totalTablePages ? "not-allowed" : "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      Următor <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 5. FOOTER DISCLAIMER & INTEGRITY COMMITMENT */}
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem 1.25rem",
            backgroundColor: "#0D110E",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: "8px",
            fontSize: "0.76rem",
            color: "#9CA3AF",
            lineHeight: 1.5,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <AlertCircle size={15} style={{ color: "#39FF88", flexShrink: 0, marginTop: "2px" }} />
            <div>
              <strong style={{ color: "#FFFFFF" }}>Notă legală privind proveniența datelor: </strong>
              Toate seriile statistice, cotațiile indicilor monetari și deciziile de politică monetară sunt extrase direct din sursele oficiale primare ale Băncii Naționale a României (www.bnr.ro) și ale Institutului Național de Statistică (INS). Valorile curente nu sunt interpolate artificial și reflectă exclusiv datele definitive sau provizorii confirmate oficial. Cursurile valutare și dobânzile medii de piață constituie repere statistice și nu reprezintă oferte comerciale garantate pentru un contract individual.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
