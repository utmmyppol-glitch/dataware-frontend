'use client';

import React from 'react';
import { E } from '@/lib/editable';

const ACCENT = '#36c88a';

interface DiagnosisWhySectionProps {
  editMode: boolean;
  sectionRef: React.RefObject<HTMLElement>;
}

export default function DiagnosisWhySection({ editMode, sectionRef }: Readonly<DiagnosisWhySectionProps>) {
  return (
    <section ref={sectionRef} style={{ background: 'linear-gradient(160deg, #0f172a 30%, #0a1f1a 70%, #0d2a1f)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div style={{ position: 'absolute', top: '-30%', right: '-15%', width: '60vw', height: '60vw', maxWidth: 700, maxHeight: 700, borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}10 0%, transparent 50%)` }} />
      </div>

      <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '160px clamp(24px, 4vw, 72px) 100px', position: 'relative', zIndex: 1 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20" style={{ alignItems: 'start' }}>

          {/* 좌측: 카피 + CTA */}
          <div>
            <span data-anim style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.12em', color: ACCENT, display: 'block', marginBottom: 16 }}>WHY DIAGNOSE</span>
            <h2 data-anim style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: '#F9FAFB', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 20 }}>
              <E id="diagnosis_why.title" editMode={editMode}>진단이 먼저입니다</E><span style={{ color: ACCENT }}>.</span>
            </h2>
            <p data-anim style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: 36, maxWidth: 420 }}>
              <E id="diagnosis_why.desc" editMode={editMode}>막연한 소개서 대신, 우리 회사 데이터의 <span style={{ color: ACCENT, fontWeight: 600 }}>현재 위치를 숫자로</span> 확인하세요. 어디부터 손대야 할지가 분명해집니다.</E>
            </p>

            <div data-anim style={{ display: 'flex', gap: 32, marginBottom: 36 }}>
              {[
                { num: '4', label: '진단 항목' },
                { num: '30초', label: '소요 시간' },
                { num: '즉시', label: '결과 확인' },
              ].map((s, i) => (
                <div key={s.label}>
                  <span style={{ fontSize: 24, fontWeight: 800, color: ACCENT, lineHeight: 1, display: 'block' }}><E id={`diagnosis_why.stat${i}_num`} editMode={editMode}>{s.num}</E></span>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 6, letterSpacing: '.04em' }}><E id={`diagnosis_why.stat${i}_label`} editMode={editMode}>{s.label}</E></p>
                </div>
              ))}
            </div>

            <a
              data-anim
              href="#diagnosis-form"
              onClick={(e) => { e.preventDefault(); document.getElementById('diagnosis-form')?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 32px', backgroundColor: ACCENT, color: '#fff', fontSize: 15, fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#2ba876'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ACCENT; }}
            >
              <E id="diagnosis_why.cta" editMode={editMode}>지금 바로 진단하기</E>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </a>
          </div>

          {/* 우측: 거버넌스 휠 */}
          <div data-anim style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <div style={{ width: 5, height: 5, background: ACCENT }} />
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>DATA GOVERNANCE CYCLE</span>
            </div>
            <div style={{ position: 'relative', width: 360, height: 360, margin: '0 auto' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 2 }}>
                <p style={{ fontSize: 10, fontWeight: 600, color: ACCENT, letterSpacing: '0.1em', marginBottom: 4 }}><E id="diagnosis_wheel.brand" editMode={editMode}>DATAWARE™</E></p>
                <p style={{ fontSize: 16, fontWeight: 800, color: '#F9FAFB' }}><E id="diagnosis_wheel.title1" editMode={editMode}>Data</E></p>
                <p style={{ fontSize: 16, fontWeight: 800, color: '#F9FAFB' }}><E id="diagnosis_wheel.title2" editMode={editMode}>Governance</E></p>
              </div>
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 360 360">
                <circle cx="180" cy="180" r="140" fill="none" stroke={`${ACCENT}15`} strokeWidth="1" />
                <circle cx="180" cy="180" r="100" fill="none" stroke={`${ACCENT}10`} strokeWidth="1" />
              </svg>
              {[
                { label: '메타데이터', sub: '정보 관리', angle: -90, num: '01' },
                { label: '품질진단', sub: '규칙 관리', angle: -30, num: '02' },
                { label: '오류 분석', sub: '원인 개선', angle: 30, num: '03' },
                { label: '영향도', sub: '소스코드 분석', angle: 90, num: '04' },
                { label: '데이터 흐름', sub: '시각화', angle: 150, num: '05' },
                { label: '데이터 포털', sub: '검색 포털', angle: 210, num: '06' },
              ].map((node, i) => {
                const rad = (node.angle * Math.PI) / 180;
                const x = 180 + 140 * Math.cos(rad);
                const y = 180 + 140 * Math.sin(rad);
                return (
                  <div key={node.num} style={{ position: 'absolute', left: x - 48, top: y - 28, width: 96, textAlign: 'center' }}>
                    <span style={{ fontSize: 9, color: ACCENT, fontWeight: 600, display: 'block', marginBottom: 2 }}>{node.num}</span>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#F9FAFB', lineHeight: 1.2 }}><E id={`diagnosis_wheel.node${i}_label`} editMode={editMode}>{node.label}</E></p>
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}><E id={`diagnosis_wheel.node${i}_sub`} editMode={editMode}>{node.sub}</E></p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
