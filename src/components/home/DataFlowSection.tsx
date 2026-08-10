'use client';

import React from 'react';
import { E } from '@/lib/editable';

const DATA_FLOW = [
  { label: 'Model', sub: '구조 설계', product: 'DA#' },
  { label: 'Govern', sub: '표준 관리', product: 'META#' },
  { label: 'Quality', sub: '품질 검증', product: 'DQ#' },
  { label: 'Impact', sub: '영향도 분석', product: 'AP#' },
  { label: 'Catalog', sub: '포털 제공', product: 'DP#' },
];

interface DataFlowSectionProps {
  sectionRef: React.RefObject<HTMLElement>;
  editMode?: boolean;
  content?: { title?: string };
}

export default function DataFlowSection({ sectionRef, editMode = false, content }: Readonly<DataFlowSectionProps>) {
  return (
    <section ref={sectionRef} style={{ position: 'relative', backgroundColor: '#0B1220', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p data-anim style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.12em', marginBottom: '16px' }}><E id="home_dataflow.badge" editMode={editMode}>DATA GOVERNANCE FLOW</E></p>
          <h2 data-anim style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#F9FAFB', lineHeight: 1.15 }}>
            <E id="home_dataflow.title" editMode={editMode}>{content?.title ?? '데이터 분석, 설계, 활용을 한번에!'}</E>
          </h2>
        </div>

        <div data-anim className="flow-pipeline" style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
          {DATA_FLOW.map((step, i) => (
            <React.Fragment key={step.label}>
              <div
                className="flow-step-card"
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '28px 20px 24px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  transition: 'border-color 0.2s, background-color 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.1em', marginBottom: '16px', fontVariantNumeric: 'tabular-nums' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ marginBottom: '12px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#F9FAFB', letterSpacing: '-0.02em' }}><E id={`home_dataflow.step${i}_product`} editMode={editMode}>{step.product}</E></span>
                </div>
                <p style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '4px', lineHeight: 1.4 }}><E id={`home_dataflow.step${i}_label`} editMode={editMode}>{step.label}</E></p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}><E id={`home_dataflow.step${i}_sub`} editMode={editMode}>{step.sub}</E></p>
              </div>
              {i < DATA_FLOW.length - 1 && (
                <div className="flow-arrow" style={{ display: 'flex', alignItems: 'center', padding: '0 6px', flexShrink: 0 }}>
                  <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.15)', lineHeight: 1 }}>&rsaquo;</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
