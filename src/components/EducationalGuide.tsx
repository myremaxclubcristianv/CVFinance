
import React from 'react';

interface EducationalItem {
  q: string;
  a: React.ReactNode;
}

interface EducationalGuideProps {
  personalEduQuestions: EducationalItem[];
  openEduIndex: number | null;
  setOpenEduIndex: (index: number | null) => void;
}

export default function EducationalGuide({ personalEduQuestions, openEduIndex, setOpenEduIndex }: EducationalGuideProps) {
  return (
    <div style={{ marginBottom: '5rem' }}>
      <h3 className="cv-section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
        ÎNAINTE SĂ APLICI, TREBUIE SĂ ȘTII
      </h3>
      <div className="cv-accordion-list">
        {personalEduQuestions.map((item, idx) => {
          const isOpen = openEduIndex === idx;
          const numStr = String(idx + 1).padStart(2, '0');
          return (
            <div key={idx} className="cv-accordion-item">
              <button
                className="cv-accordion-trigger"
                onClick={() => setOpenEduIndex(isOpen ? null : idx)}
                style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <span className="cv-mono" style={{ fontSize: '0.85rem', color: '#087F5B', fontWeight: 700 }}>{numStr}</span>
                  <span style={{ fontWeight: 600 }}>{item.q}</span>
                </div>
                <span className="cv-mono" style={{ fontSize: '1.25rem', fontWeight: 500, color: '#5F6368' }}>
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen && (
                <div className="cv-accordion-content" style={{ paddingLeft: '3.25rem' }}>
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
