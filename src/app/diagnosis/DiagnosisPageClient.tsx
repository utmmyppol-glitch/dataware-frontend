'use client';

import React from 'react';
import Link from 'next/link';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';
import { useEditMode, useEditableManifest, EDITABLE_STYLES, E } from '@/lib/editable';
import OptImg from '@/components/OptImg';
import { useDiagnosis } from './useDiagnosis';
import DiagnosisQuiz from './DiagnosisQuiz';
import DiagnosisWhySection from './DiagnosisWhySection';
import DiagnosisInsightSection from './DiagnosisInsightSection';
import DiagnosisProductsSection from './DiagnosisProductsSection';

const ACCENT = '#36c88a';

export default function DiagnosisPageClient() {
  const editMode = useEditMode();
  useEditableManifest(editMode);
  const heroRef = useHeroAnim() as React.RefObject<HTMLElement>;
  const diagRef = useGsapReveal() as React.RefObject<HTMLElement>;
  const whyRef = useGsapReveal() as React.RefObject<HTMLElement>;
  const insightRef = useGsapReveal() as React.RefObject<HTMLElement>;
  const serviceRef = useGsapReveal() as React.RefObject<HTMLElement>;

  const diagnosis = useDiagnosis();

  return (
    <>
      {/* ═══ 1. HERO ═══ */}
      <section
        ref={heroRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          backgroundColor: '#07111F',
          overflow: 'hidden',
        }}
      >
        {/* 그리드 배경 */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent 20%, ${ACCENT}30, transparent 80%)` }} />
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
            <path d="M-100 850 Q 400 200 1600 100" stroke={ACCENT} strokeWidth="2" opacity="0.5" />
            <path d="M-100 870 Q 400 240 1600 140" stroke={ACCENT} strokeWidth="1" opacity="0.2" />
            <path d="M-100 850 Q 400 200 1600 100" stroke={`url(#heroArcGlow)`} strokeWidth="20" opacity="0.08" />
            <defs>
              <linearGradient id="heroArcGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={ACCENT} stopOpacity="0" />
                <stop offset="40%" stopColor={ACCENT} stopOpacity="1" />
                <stop offset="70%" stopColor={ACCENT} stopOpacity="0.6" />
                <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <div style={{ position: 'absolute', bottom: '10%', left: '20%', width: '40vw', height: '40vw', maxWidth: 500, maxHeight: 500, background: `radial-gradient(circle, ${ACCENT}12 0%, transparent 60%)`, pointerEvents: 'none' }} />
        </div>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '140px 56px 100px', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48, alignItems: 'center' }}>
          <div>
            <div data-hero style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, fontSize: 12, fontWeight: 600, letterSpacing: '.12em', color: ACCENT }}>
              <span style={{ width: 20, height: 1.5, background: ACCENT }} />
              <E id="diagnosis_hero.badge" editMode={editMode}>DATA GOVERNANCE DIAGNOSIS</E>
            </div>

            <h1 data-hero style={{ fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: 900, color: '#F9FAFB', letterSpacing: '-0.05em', lineHeight: 1.05, marginBottom: 22 }}>
              <E id="diagnosis_hero.title" editMode={editMode}>데이터 거버넌스 진단</E><span style={{ color: ACCENT }}>.</span>
            </h1>

            <p data-hero style={{ fontSize: 'clamp(15px, 1.4vw, 17px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: 480, marginBottom: 28 }}>
              <E id="diagnosis_hero.desc" editMode={editMode}>4가지 질문에 답하면 <span style={{ color: ACCENT, fontWeight: 600 }}>30초 안에</span> 데이터 거버넌스 성숙도와 우선 과제를 알려드립니다.</E>
            </p>

            <div data-hero style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 0 }}>
              <a href="#diagnosis-form" onClick={(e) => { e.preventDefault(); document.getElementById('diagnosis-form')?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '18px 36px', backgroundColor: ACCENT, color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: `0 0 30px ${ACCENT}30`, transition: 'transform .2s, box-shadow .2s' }}
              ><E id="diagnosis_hero.cta_primary" editMode={editMode}>무료 진단 시작</E><span style={{ fontSize: 15 }}>&rarr;</span></a>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', padding: '18px 36px', border: '1.5px solid rgba(255,255,255,0.12)', color: '#F9FAFB', fontWeight: 700, fontSize: 15, textDecoration: 'none', transition: 'border-color .2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
              ><E id="diagnosis_hero.cta_secondary" editMode={editMode}>도입문의</E></Link>
            </div>

            <div data-hero style={{ display: 'flex', gap: 0, marginTop: 36, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {[
                { num: '4항목', label: '핵심 진단 기준' },
                { num: '30초', label: '소요 시간' },
                { num: '즉시', label: '결과 · 추천 제공' },
              ].map((s, i) => (
                <div key={s.label} style={{ flex: 1, paddingLeft: i > 0 ? 24 : 0, borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                  <span style={{ fontSize: 28, fontWeight: 800, color: '#F9FAFB', lineHeight: 1, display: 'block' }}><E id={`diagnosis_hero.stat${i}_num`} editMode={editMode}>{s.num}</E></span>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 6, letterSpacing: '.04em' }}><E id={`diagnosis_hero.stat${i}_label`} editMode={editMode}>{s.label}</E></div>
                </div>
              ))}
            </div>
          </div>

          <div data-hero style={{ marginRight: -56, position: 'relative' }}>
            <OptImg
              src="/images/uniondata/main_01-da_img.png"
              alt="DA# 데이터 모델링"
              style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
            />
          </div>
        </div>
      </section>

      {/* ═══ 2. QUIZ + RESULT ═══ */}
      <DiagnosisQuiz
        editMode={editMode}
        sectionRef={diagRef}
        {...diagnosis}
      />

      {/* ═══ 3. WHY DIAGNOSE ═══ */}
      <DiagnosisWhySection editMode={editMode} sectionRef={whyRef} />

      {/* ═══ 4. INSIGHT ═══ */}
      <DiagnosisInsightSection editMode={editMode} sectionRef={insightRef} />

      {/* ═══ 5. PRODUCTS + STATS + CTA ═══ */}
      <DiagnosisProductsSection editMode={editMode} sectionRef={serviceRef} />

      {editMode && <style>{EDITABLE_STYLES}</style>}
    </>
  );
}
