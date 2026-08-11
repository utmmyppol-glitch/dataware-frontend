'use client';

import React from 'react';
import Link from 'next/link';
import { E } from '@/lib/editable';
import OptImg from '@/components/OptImg';
import { SERVICE_LINEUP } from './diagnosis-data';

const ACCENT = '#36c88a';

interface DiagnosisProductsSectionProps {
  editMode: boolean;
  sectionRef: React.RefObject<HTMLElement>;
}

export default function DiagnosisProductsSection({ editMode, sectionRef }: Readonly<DiagnosisProductsSectionProps>) {
  return (
    <>
      <section ref={sectionRef} style={{ backgroundColor: '#FBFAF7' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 56px 0' }}>
          {/* 헤더 */}
          <div style={{ marginBottom: 48, textAlign: 'right' }}>
            <span data-anim style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.12em', color: ACCENT, display: 'block', marginBottom: 12 }}>PRODUCTS</span>
            <h2 data-anim style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 800, color: '#111', lineHeight: 1.2, letterSpacing: '-0.03em' }}>
              <E id="diagnosis_products.title" editMode={editMode}>8종의 솔루션, 하나의 플랫폼</E><span style={{ color: ACCENT }}>.</span>
            </h2>
            <p data-anim style={{ fontSize: 15, color: '#676767', lineHeight: 1.8, marginTop: 14, maxWidth: 480, marginLeft: 'auto' }}>
              <E id="diagnosis_products.desc" editMode={editMode}>수집부터 포털까지, 데이터 라이프사이클 전체를 커버합니다.</E>
            </p>
          </div>

          {/* 데이터 파이프라인 시각화 */}
          <div data-anim style={{ background: '#0B1220', border: `1px solid ${ACCENT}15`, padding: 'clamp(40px, 5vw, 56px) clamp(32px, 4vw, 48px)', marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.1em', color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>DATA LIFECYCLE</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, alignItems: 'start' }}>
              {[
                { step: 'Model', label: '구조 설계', product: 'DA#' },
                { step: 'Govern', label: '표준 관리', product: 'META#' },
                { step: 'Quality', label: '품질 검증', product: 'DQ#' },
                { step: 'Impact', label: '영향도 분석', product: 'AP#' },
                { step: 'Portal', label: '포털 제공', product: 'DP#' },
              ].map((s, i) => (
                <div key={s.step} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center', flex: 1, padding: '16px 8px', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#F9FAFB', marginBottom: 6, letterSpacing: '0.02em' }}><E id={`diagnosis_lifecycle${i}.step`} editMode={editMode}>{s.step}</E></p>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}><E id={`diagnosis_lifecycle${i}.label`} editMode={editMode}>{s.label}</E></p>
                    <span style={{ fontSize: 11, fontWeight: 600, color: ACCENT, letterSpacing: '0.04em' }}><E id={`diagnosis_lifecycle${i}.product`} editMode={editMode}>{s.product}</E></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 아키텍처 이미지 */}
          <div data-anim style={{ marginBottom: 40, background: '#fff', border: '1px solid #e6e8ec', borderLeft: `3px solid ${ACCENT}`, padding: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', color: ACCENT, display: 'block', marginBottom: 12 }}>META# ARCHITECTURE</span>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#111', marginBottom: 12, letterSpacing: '-0.02em' }}><E id="diagnosis_arch.title" editMode={editMode}>메타데이터 통합 관리 체계</E></h3>
              <p style={{ fontSize: 13, color: '#676767', lineHeight: 1.7 }}><E id="diagnosis_arch.desc" editMode={editMode}>데이터 표준부터 모델, DB 관리, 영향도, 포털까지 — 전체 라이프사이클의 메타데이터를 하나의 플랫폼에서 관리합니다.</E></p>
            </div>
            <OptImg src="/images/encore/solutions_data3-img3.jpg" alt="META# 아키텍처" style={{ width: '100%', height: 'auto' }} />
          </div>

          {/* 제품 라인업 전체 */}
          <div data-anim style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 20 }}><E id="diagnosis_lineup.title" editMode={editMode}>제품 라인업</E></p>

            <Link
              href="/products/dataware"
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '40px 36px', background: '#0B1220', borderTop: `3px solid ${ACCENT}`,
                marginBottom: 12, boxShadow: `0 -4px 20px ${ACCENT}15`, textDecoration: 'none', transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#0e1628'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#0B1220'; }}
            >
              <div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}><E id="diagnosis_dataware.badge" editMode={editMode}>ALL-IN-ONE</E></span>
                <h3 style={{ fontSize: 28, fontWeight: 800, color: '#F9FAFB', marginTop: 8, letterSpacing: '-0.03em' }}><E id="diagnosis_dataware.title" editMode={editMode}>DATAWARE</E></h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginTop: 8 }}><E id="diagnosis_dataware.desc" editMode={editMode}>8개 솔루션을 하나의 패키지로</E></p>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: ACCENT }}><E id="diagnosis_dataware.link" editMode={editMode}>자세히 →</E></span>
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 1 }}>
              {[
                { name: 'DA#', sub: '데이터 모델링', color: '#6b8cae', slug: 'da-sharp' },
                { name: 'META#', sub: '메타데이터 관리', color: '#8a7cb8', slug: 'meta-sharp' },
                { name: 'DQ#', sub: '데이터 품질관리', color: '#5b9a7d', slug: 'dq-sharp' },
                { name: 'AP#', sub: '영향도 분석', color: '#c4975a', slug: 'ap-sharp' },
                { name: 'DP#', sub: '데이터 포털', color: '#b8a060', slug: 'dp-sharp' },
              ].map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px', background: '#fff', border: '1px solid #eee', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.background = '#fafbfc'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#eee'; e.currentTarget.style.background = '#fff'; }}
                >
                  <div style={{ width: 6, height: 6, background: p.color, borderRadius: '50%', flexShrink: 0 }} />
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>{p.name}</span>
                  <span style={{ fontSize: 12, color: '#98A2B3' }}>{p.sub}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* 인증 */}
          <div data-anim style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40, paddingTop: 8 }}>
            {['GS인증 1등급', '나라장터', 'Multi OS', '전자정부 호환'].map((badge) => (
              <span key={badge} style={{ padding: '5px 12px', fontSize: 11, color: '#98A2B3', fontWeight: 500, border: '1px solid #e6e8ec', letterSpacing: '0.02em' }}>
                {badge}
              </span>
            ))}
          </div>

          {/* 바로가기 */}
          <div data-anim style={{ borderTop: '1px solid #e0e2e6', paddingTop: 24, paddingBottom: 40 }}>
            {SERVICE_LINEUP.map((s, i) => (
              <Link
                key={s.label}
                href={s.href}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: i < SERVICE_LINEUP.length - 1 ? '1px solid #eeeff2' : 'none', textDecoration: 'none', transition: 'padding-left 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = '8px'; }}
                onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = '0'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#111' }}><E id={`diagnosis_service${i}.label`} editMode={editMode}>{s.label}</E></span>
                  <span style={{ fontSize: 12, color: '#b0b4bc' }}><E id={`diagnosis_service${i}.sub`} editMode={editMode}>{s.sub}</E></span>
                </div>
                <svg width="16" height="16" fill="none" stroke="#b0b4bc" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 실적 */}
      <div style={{ background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 56px 80px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {[
              { num: '3,000', suffix: '+', label: '도입 기업', sub: '공공·금융·제조·유통' },
              { num: '20', suffix: '년+', label: '축적된 구축 경험', sub: '2005년 설립' },
              { num: '8', suffix: '종', label: '솔루션 라인업', sub: 'All-in-One 패키지' },
              { num: 'GS', suffix: ' 1등급', label: '품질 인증', sub: 'TTA 인증' },
            ].map((s, i) => (
              <div key={s.label} style={{ padding: '0 32px', borderLeft: i > 0 ? '1px solid #e6e8ec' : 'none' }}>
                <span style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 900, color: '#111', lineHeight: 1, letterSpacing: '-0.03em' }}>
                  <E id={`diagnosis_stats${i}.num`} editMode={editMode}>{s.num}</E><span style={{ color: ACCENT }}><E id={`diagnosis_stats${i}.suffix`} editMode={editMode}>{s.suffix}</E></span>
                </span>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#475467', marginTop: 12 }}><E id={`diagnosis_stats${i}.label`} editMode={editMode}>{s.label}</E></p>
                <p style={{ fontSize: 12, color: '#98A2B3', marginTop: 4 }}><E id={`diagnosis_stats${i}.sub`} editMode={editMode}>{s.sub}</E></p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: 220 }}>
        <Link
          href="/contact"
          style={{ backgroundColor: '#101828', padding: '56px 48px', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'background 0.3s' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1e293b'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#101828'; }}
        >
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: 16 }}>CONTACT</span>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#F9FAFB', lineHeight: 1.4 }}>
            <E id="diagnosis_cta.contact" editMode={editMode}>무료 상담 신청</E><span style={{ color: ACCENT }}>.</span>
          </h3>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 8 }}><E id="diagnosis_cta.contact_desc" editMode={editMode}>전문 컨설턴트가 48시간 내 연락드립니다</E></p>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20, fontSize: 14, fontWeight: 600, color: ACCENT }}><E id="diagnosis_cta.contact_link" editMode={editMode}>상담 신청하기 →</E></span>
        </Link>
        <a
          href="#diagnosis-form"
          onClick={(e) => { e.preventDefault(); document.getElementById('diagnosis-form')?.scrollIntoView({ behavior: 'smooth' }); }}
          style={{ backgroundColor: ACCENT, padding: '56px 48px', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'filter 0.3s', cursor: 'pointer', boxShadow: 'inset 0 0 60px rgba(0,0,0,0.15)' }}
          onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(0.92)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
        >
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', marginBottom: 16 }}>DIAGNOSIS</span>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
            <E id="diagnosis_cta.diagnosis" editMode={editMode}>무료 진단 시작</E><span style={{ opacity: 0.5 }}>.</span>
          </h3>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 8 }}><E id="diagnosis_cta.diagnosis_desc" editMode={editMode}>30초 후 결과 확인 · 이메일 리포트 제공</E></p>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20, fontSize: 14, fontWeight: 600, color: '#fff' }}><E id="diagnosis_cta.diagnosis_link" editMode={editMode}>지금 진단하기 →</E></span>
        </a>
      </div>
    </>
  );
}
