import React from 'react';

interface CalculatorSectionProps {
  calcAmount: number;
  setCalcAmount: (value: number) => void;
  calcPayment: number;
  setCalcPayment: (value: number) => void;
  calcIncome: number;
  setCalcIncome: (value: number) => void;
  calcRate: number;
  setCalcRate: (value: number) => void;
  estimatedNewPayment: number;
  monthlySaving: number;
  annualSaving: number;
  extraCashPossibility: number;
  trackEvent: (event: string, data?: any) => void;
}

export default function CalculatorSection({
  calcAmount,
  setCalcAmount,
  calcPayment,
  setCalcPayment,
  calcIncome,
  setCalcIncome,
  calcRate,
  setCalcRate,
  estimatedNewPayment,
  monthlySaving,
  annualSaving,
  extraCashPossibility,
  trackEvent,
}: CalculatorSectionProps) {
  return (
    <section className="cv-section" id="calculator">
      <div className="cv-container">
        <span className="cv-section-marker">07 / CALCULATOR</span>
        <div className="cv-section-header">
          <h2 className="cv-section-title">ESTIMEAZĂ ECONOMIA SAU FINANȚAREA POSIBILĂ</h2>
          <p className="cv-section-sub">Află cât poți economisi lunar sau ce sumă suplimentară poți obține prin optimizare.</p>
        </div>
        <div className="cv-calc-grid">
          <div className="cv-calc-inputs">
            {/* Amount */}
            <div className="cv-calc-field">
              <div className="cv-calc-label">
                <span>Sold credit / Sumă dorită</span>
                <span className="cv-calc-val-badge">{calcAmount.toLocaleString('ro-RO')} RON</span>
              </div>
              <input
                type="range"
                id="calcAmountRange"
                aria-label="Credit amount range"
                min="10000"
                max="500000"
                step="5000"
                value={calcAmount}
                onChange={(e) => setCalcAmount(Number(e.target.value))}
                className="cv-calc-range"
              />
            </div>
            {/* Current payment */}
            <div className="cv-calc-field">
              <div className="cv-calc-label">
                <span>Rată actuală lunară</span>
                <span className="cv-calc-val-badge">{calcPayment.toLocaleString('ro-RO')} RON</span>
              </div>
              <input
                type="range"
                id="calcPaymentRange"
                aria-label="Current monthly payment range"
                min="500"
                max="10000"
                step="100"
                value={calcPayment}
                onChange={(e) => setCalcPayment(Number(e.target.value))}
                className="cv-calc-range"
              />
            </div>
            {/* Income */}
            <div className="cv-calc-field">
              <div className="cv-calc-label">
                <span>Venit lunar net</span>
                <span className="cv-calc-val-badge">{calcIncome.toLocaleString('ro-RO')} RON</span>
              </div>
              <input
                type="range"
                id="calcIncomeRange"
                aria-label="Monthly net income range"
                min="2500"
                max="30000"
                step="500"
                value={calcIncome}
                onChange={(e) => setCalcIncome(Number(e.target.value))}
                className="cv-calc-range"
              />
            </div>
            {/* Rate */}
            <div className="cv-calc-field">
              <div className="cv-calc-label">
                <span>Dobândă actuală estimată</span>
                <span className="cv-calc-val-badge">{calcRate}%</span>
              </div>
              <input
                type="range"
                id="calcRateRange"
                aria-label="Estimated interest rate range"
                min="6"
                max="25"
                step="0.5"
                value={calcRate}
                onChange={(e) => setCalcRate(Number(e.target.value))}
                className="cv-calc-range"
              />
            </div>
          </div>
          {/* Result terminal */}
          <div className="cv-calc-terminal">
            <div>
              <div className="cv-calc-output-main">
                <div className="cv-calc-output-label">RATĂ ESTIMATĂ NOUĂ</div>
                <div className="cv-calc-output-big">{estimatedNewPayment.toLocaleString('ro-RO')} lei</div>
                <div
                  className="cv-mono"
                  style={{
                    fontSize: '0.82rem',
                    color: '#087F5B',
                    fontWeight: 700,
                    marginTop: '0.5rem',
                    letterSpacing: '0.02em',
                  }}
                >
                  6,10% DOBÂNDĂ ESTIMATĂ
                </div>
              </div>
              <div className="cv-calc-stat-group">
                <div className="cv-calc-stat-row">
                  <span style={{ color: '#5F6368' }}>SOLD CREDIT / SUMĂ</span>
                  <span>{calcAmount.toLocaleString('ro-RO')} lei</span>
                </div>
                <div className="cv-calc-stat-row">
                  <span style={{ color: '#5F6368' }}>ECONOMISIRE LUNARĂ</span>
                  <span className="cv-calc-stat-val">‑{monthlySaving.toLocaleString('ro-RO')} lei / lună</span>
                </div>
                <div className="cv-calc-stat-row">
                  <span style={{ color: '#5F7368' }}>ECONOMISIRE ANUALĂ</span>
                  <span className="cv-calc-stat-val">‑{annualSaving.toLocaleString('ro-RO')} lei / an</span>
                </div>
                <div className="cv-calc-stat-row">
                  <span style={{ color: '#5F6368' }}>FINANȚARE SUPLIMENTARĂ</span>
                  <span className="cv-calc-stat-val">până la {extraCashPossibility.toLocaleString('ro-RO')} lei</span>
                </div>
              </div>
            </div>
            <a
              href="#verificare-credit"
              className="cv-btn-primary w-full text-center mt-4"
              onClick={() => {
                trackEvent('calculator_complete', { amount: calcAmount, payment: calcPayment });
                document.getElementById('verificare-credit')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              APLICĂ CU ACESTE CIFRE →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
