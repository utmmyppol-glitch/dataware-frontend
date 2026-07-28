'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { IMAGES, DATAWARE_LINEUP, COPY, TRUSTED_LOGOS } from '@/data';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';
import type { Solution } from '@/data/molecular-data';

const MolecularU = dynamic(() => import('@/components/MolecularU'), { ssr: false });

/* ── Hooks ── */
function useCountUp(target: number, dur = 2400) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const ran = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !ran.current) {
        ran.current = true;
        const s = performance.now();
        const tick = (now: number) => { const p = Math.min((now - s) / dur, 1); setN(Math.floor(p * target)); if (p < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target, dur]);
  return { n, ref };
}

/* ── Data ── */
const PRODUCTS = DATAWARE_LINEUP;

// CASE_STUDIES 제거 — 원본 사이트에 고객 인용문/수치 데이터 없음

const DATA_FLOW = [
  { label: 'Source', sub: '데이터 수집', product: '' },
  { label: 'Model', sub: '구조 설계', product: 'DA#' },
  { label: 'Govern', sub: '표준 관리', product: 'META#' },
  { label: 'Quality', sub: '품질 검증', product: 'DQ#' },
  { label: 'Flow', sub: '흐름 분석', product: 'DF#' },
  { label: 'Catalog', sub: '포털 제공', product: 'DP#' },
];


/* ══════════════════════════════════════════════════════════════ */

export default function Home() {
  const heroRef = useHeroAnim() as React.RefObject<HTMLElement>;
  const s1 = useGsapReveal() as React.RefObject<HTMLElement>;
  const s2 = useGsapReveal() as React.RefObject<HTMLElement>;
  const s3 = useGsapReveal() as React.RefObject<HTMLElement>;
  const s4 = useGsapReveal() as React.RefObject<HTMLElement>;
  const s5 = useGsapReveal() as React.RefObject<HTMLElement>;
  const s6 = useGsapReveal() as React.RefObject<HTMLElement>;
  const s7 = useGsapReveal() as React.RefObject<HTMLElement>;

  const [zoomedSolution, setZoomedSolution] = useState<Solution | null>(null);
  const [explorerMode, setExplorerMode] = useState(false);
  const isZoomed = zoomedSolution !== null;

  const c1 = useCountUp(3000);
  const c2 = useCountUp(20);
  const c3 = useCountUp(80);
  useCountUp(100); // DBMS count (used in hero)

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1. HERO — 좌: 카피+메트릭 / 우: DA# 이미지+플로팅
          한 스크린에 핵심 메시지 + 수치 + 제품 + CTA 전부 보임
          ═══════════════════════════════════════════════════════ */}
      <section ref={heroRef} style={{ minHeight: '100vh', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        {/* DA 워터마크 */}
        <div aria-hidden="true" style={{ position: 'absolute', bottom: '-5%', right: '-2%', zIndex: 1, opacity: 0.04, pointerEvents: 'none' }}>
          <img src="/images/da-watermark.png" alt="" style={{ width: 'clamp(300px, 35vw, 500px)', height: 'auto' }} />
        </div>
        <div style={{
          position: 'relative',
          minHeight: '100vh', zIndex: 2,
        }}>
          <div
            className="hero-main-content"
            style={{
              width: '100%',
              padding: '72px clamp(32px, 5vw, 72px) 40px clamp(20px, 3vw, 48px)',
              display: 'grid',
              gridTemplateColumns: explorerMode && !isZoomed ? '1fr' : 'minmax(0, 0.38fr) minmax(0, 0.62fr)',
              alignItems: 'center',
              gap: 'clamp(24px, 3vw, 48px)',
              maxWidth: explorerMode && !isZoomed ? 1000 : 1520,
              margin: '0 auto',
              transition: 'max-width .5s ease, grid-template-columns .5s ease',
            }}
          >
            {/* ═══ LEFT ═══ */}
            <div style={{
              position: 'relative', minWidth: 0,
              display: explorerMode && !isZoomed ? 'none' : 'block',
            }}>
              <div style={{
                opacity: explorerMode ? 0 : 1,
                transform: explorerMode ? 'translateY(-10px)' : 'translateY(0)',
                transition: 'opacity .5s ease, transform .5s ease',
                pointerEvents: explorerMode ? 'none' : 'auto',
                position: explorerMode ? 'absolute' : 'relative',
                visibility: explorerMode ? 'hidden' : 'visible',
                width: '100%',
              }}>
                {/* Eyebrow */}
                <div data-hero style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, fontSize: 12, fontWeight: 600, letterSpacing: '.12em', color: '#36c88a' }}>
                  <span style={{ width: 20, height: 1.5, background: '#36c88a' }} />
                  ENTERPRISE DATA PLATFORM
                </div>

                <h2 data-hero style={{ fontWeight: 900, fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.05em', color: '#111', margin: '0 0 22px' }}>
                  {COPY.heroDA.line1}<br />{COPY.heroDA.line2}<br />{COPY.heroDA.line3.replace('.', '')}<span style={{ color: '#36c88a' }}>.</span>
                </h2>

                <p data-hero style={{ fontWeight: 400, fontSize: 'clamp(15px, 1.4vw, 17px)', lineHeight: 1.75, color: '#676767', maxWidth: 640, margin: '0 0 24px' }}>{COPY.heroDA.subtitle}</p>

                {/* Hint */}
                <div data-hero style={{ fontSize: 13, color: '#676767', marginBottom: 28, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'rgba(54,200,138,.04)', border: '1px solid rgba(54,200,138,.1)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#36c88a', boxShadow: '0 0 0 3px rgba(54,200,138,.15)' }} />
                  민트 노드에 올려 살펴보고, 클릭해 안으로 들어가 보세요
                </div>

                {/* CTAs */}
                <div data-hero style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  <Link href="/contact" className="hero-cta-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '18px 36px', backgroundColor: '#36c88a', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 20px -4px rgba(54,200,138,.35)', transition: 'transform .2s, box-shadow .2s' }}>
                    도입문의하기<span style={{ fontSize: 15 }}>&rarr;</span>
                  </Link>
                  <Link href="/download" className="hero-cta-secondary" style={{ display: 'inline-flex', alignItems: 'center', padding: '18px 36px', border: '1.5px solid #d5d8dd', background: 'transparent', color: '#111', fontWeight: 700, fontSize: 15, textDecoration: 'none', transition: 'transform .2s, background .2s, color .2s' }}>
                    다운로드 신청하기
                  </Link>
                </div>

                {/* Stats */}
                <div data-hero style={{ display: 'flex', gap: 0, marginTop: 36, paddingTop: 28, borderTop: '1px solid #e6e8ec' }}>
                  {[
                    { num: '3,000', label: '도입 기업', accent: true, ref: c1.ref },
                    { num: '20', label: '업력', accent: true, ref: c2.ref },
                    { num: 'GS 1등급', label: '인증', accent: false, ref: undefined },
                  ].map((s, i) => (
                    <div key={i} style={{ flex: 1, paddingLeft: i > 0 ? 24 : 0, borderLeft: i > 0 ? '1px solid #e6e8ec' : 'none' }}>
                      <span ref={s.ref} style={{ fontSize: 28, fontWeight: 800, color: '#111', lineHeight: 1, display: 'block' }}>
                        {s.accent ? <>{s.num}<span style={{ color: '#36c88a' }}>+</span></> : s.num}
                      </span>
                      <div style={{ fontSize: 12, color: '#676767', marginTop: 6, letterSpacing: '.04em' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ═══ RIGHT: Molecular U ═══ */}
            <div
              className="hero-molecular-area"
              style={{
                position: 'relative',
                minHeight: isZoomed ? 'calc(100vh - 120px)' : explorerMode ? 'calc(100vh - 180px)' : 700,
                height: isZoomed ? 'calc(100vh - 120px)' : explorerMode ? 'calc(100vh - 180px)' : 'clamp(600px, 72vh, 960px)',
                overflow: 'visible',
                transition: 'min-height .4s ease, height .4s ease',
              }}
            >
              {/* Explorer mode header */}
              {explorerMode && !isZoomed && (
                <div style={{
                  position: 'absolute', top: 8, left: 0, right: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
                  zIndex: 20, animation: 'detailFadeIn .4s ease-out',
                }}>
                  <button onClick={() => { setZoomedSolution(null); setExplorerMode(false); }} style={{
                    background: 'none', border: '1px solid #d5d8dd', padding: '8px 20px',
                    fontSize: 13, fontWeight: 600, color: '#676767', cursor: 'pointer', transition: 'all .2s',
                  }}>← 메인으로 돌아가기</button>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#111', letterSpacing: '-0.02em' }}>
                    솔루션을 선택하세요
                  </span>
                </div>
              )}
              <MolecularU
                onZoom={(sol) => { setZoomedSolution(sol); setExplorerMode(false); }}
                onClose={() => { setZoomedSolution(null); setExplorerMode(true); }}
                onBrochure={() => { window.location.href = '/download'; }}
                onContact={() => { window.location.href = '/contact'; }}
                zoomedSolution={zoomedSolution}
              />
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          2. TRUSTED BY — 4열×3행 정돈된 그리드 + 신뢰 지표
          ═══════════════════════════════════════════════════════ */}
      <section ref={s1} style={{ backgroundColor: '#fff', borderTop: '1px solid #E7E2D8', borderBottom: '1px solid #E7E2D8' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: 'clamp(56px, 8vw, 96px) clamp(24px, 4vw, 56px)' }}>
          {/* 상단: eyebrow + 제목 + 신뢰 지표 */}
          <div data-anim style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#98A2B3', letterSpacing: '0.12em', marginBottom: '16px' }}>TRUSTED BY ENTERPRISES</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#111214', lineHeight: 1.15, marginBottom: '36px' }}>
              국내 주요 기업의 데이터 환경을 함께합니다<span style={{ color: '#36c88a' }}>.</span>
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(40px, 6vw, 72px)', flexWrap: 'wrap' }}>
              {[
                { value: '3,000+', label: '도입 기업' },
                { value: '20년+', label: '데이터 전문성' },
                { value: 'GS 인증', label: '1등급' },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '28px', fontWeight: 800, color: '#111214', display: 'block' }}>{stat.value}</span>
                  <span style={{ fontSize: '15px', color: '#98A2B3' }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 고객사 로고 — 원본처럼 크고 유기적 배치 + 플로팅 애니메이션 */}
          <div data-anim style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '56px 80px', padding: '24px 0 16px' }}>
            {TRUSTED_LOGOS.map((logo, i) => (
              <img
                key={logo.id}
                src={logo.image}
                alt={logo.name}
                className="client-logo-float"
                style={{
                  height: 'clamp(60px, 10vw, 100px)',
                  objectFit: 'contain',
                  opacity: 0.85,
                  transition: 'opacity 0.3s, transform 0.3s',
                  animation: `clientFloat ${3 + (i % 3) * 0.8}s ease-in-out ${(i * 0.3) % 2}s infinite alternate`,
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = ''; }}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          3. WHY — 좌: 거대 타이포 / 우: DA# 이미지 + 오버래핑 숫자
          KonsT 래퍼런스: 이미지 위 오버래핑 배지 + 숫자 강조
          ═══════════════════════════════════════════════════════ */}
      <section ref={s2} style={{ position: 'relative', backgroundColor: '#FBFAF7', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 4vw, 56px)', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 'clamp(48px, 6vw, 96px)', alignItems: 'center' }}>
            <div>
              <p data-anim style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.12em', marginBottom: '24px' }}>WHY DATAWARE</p>
              <h2 data-anim style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900, color: '#111214', lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: '28px' }}>
                {COPY.roleSection}
              </h2>
              <p data-anim style={{ fontSize: '20px', color: '#6B655C', lineHeight: 1.8, marginBottom: '48px' }}>
                기업의 DX와 AIX를 가속화하는 데이터 거버넌스 All-in-One Package
              </p>
              <div data-anim style={{ display: 'flex', gap: '48px' }}>
                {[{ n: '8', s: '개 제품', l: '라인업' }, { n: 'GS', s: ' 1등급', l: '품질 인증' }].map(item => (
                  <div key={item.l}>
                    <span style={{ fontSize: '40px', fontWeight: 900, color: '#111214' }}>{item.n}<span style={{ fontSize: '20px', color: '#36c88a' }}>{item.s}</span></span>
                    <p style={{ fontSize: '16px', color: '#98A2B3', marginTop: '4px' }}>{item.l}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* 우: 이미지 + KonsT 오버래핑 배지 */}
            <div data-anim style={{ position: 'relative' }}>
              <div style={{ border: '1px solid #E7E2D8', backgroundColor: '#fff', padding: '24px', boxShadow: '0 10px 30px rgba(15,23,42,0.08)' }}>
                <img src={IMAGES.hero.da.img} alt="DA# Architecture" style={{ width: '100%', height: 'auto', display: 'block' }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} loading="lazy" />
              </div>
              {/* KonsT 오버래핑 — 이미지 밖으로 삐져나온 배지 */}
              <div style={{ position: 'absolute', top: '-16px', right: '-16px', backgroundColor: '#36c88a', padding: '12px 20px', boxShadow: '0 4px 12px rgba(54,200,138,0.2)' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>GS인증 1등급</span>
              </div>
              {/* KonsT 숫자 오버래핑 — 하단 좌측 */}
              <div style={{ position: 'absolute', bottom: '-20px', left: '24px', backgroundColor: '#111214', padding: '16px 28px', boxShadow: '0 10px 30px rgba(15,23,42,0.15)' }}>
                <span style={{ fontSize: '32px', fontWeight: 900, color: '#fff' }}>20<span style={{ fontSize: '16px', color: '#36c88a' }}>+</span></span>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginLeft: '12px' }}>Years</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          4. DATA FLOW — 다크, 수평 파이프라인 레이아웃
          ═══════════════════════════════════════════════════════ */}
      <section ref={s3} style={{ position: 'relative', backgroundColor: '#0B1220', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p data-anim style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.12em', marginBottom: '16px' }}>DATA GOVERNANCE FLOW</p>
            <h2 data-anim style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#F9FAFB', lineHeight: 1.15 }}>
              데이터 분석, 설계, 활용을 한번에<span style={{ color: '#36c88a' }}>!</span>
            </h2>
          </div>

          {/* 파이프라인 — 수평 flex + 화살표 구분자 */}
          <div data-anim className="flow-pipeline" style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
            {DATA_FLOW.map((step, i) => (
              <React.Fragment key={step.label}>
                {/* 스텝 카드 */}
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
                  {/* 스텝 번호 */}
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.1em', marginBottom: '16px', fontVariantNumeric: 'tabular-nums' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {/* 제품명 (있으면 강조, 없으면 점) */}
                  <div style={{ marginBottom: '12px' }}>
                    {step.product ? (
                      <span style={{ fontSize: '20px', fontWeight: 800, color: '#F9FAFB', letterSpacing: '-0.02em' }}>{step.product}</span>
                    ) : (
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em' }}>INPUT</span>
                    )}
                  </div>
                  {/* 레이블 + 설명 */}
                  <p style={{ fontSize: '15px', fontWeight: 600, color: step.product ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)', marginBottom: '4px', lineHeight: 1.4 }}>{step.label}</p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}>{step.sub}</p>
                </div>
                {/* 화살표 구분자 — 마지막 아이템 뒤에는 없음 */}
                {i < DATA_FLOW.length - 1 && (
                  <div className="flow-arrow" style={{ display: 'flex', alignItems: 'center', padding: '0 6px', flexShrink: 0 }}>
                    <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.15)', lineHeight: 1 }}>›</span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          5. PLATFORM — 제품 라인업
          좌: 제목+설명+CTA / 우: 2컬럼 제품 목록
          구도가 다른 비대칭
          ═══════════════════════════════════════════════════════ */}
      <section ref={s4} style={{ position: 'relative', backgroundColor: '#fcfbf8', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 4vw, 56px)', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '64px', alignItems: 'start' }}>
            {/* LEFT — sticky 제목 */}
            <div style={{ position: 'sticky', top: '120px' }}>
              <p data-anim style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.12em', marginBottom: '16px' }}>PLATFORM</p>
              <h2 data-anim style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, color: '#111214', lineHeight: 1.1, marginBottom: '20px' }}>
                DATAWARE<br />제품 라인업<span style={{ color: '#36c88a' }}>.</span>
              </h2>
              <p data-anim style={{ fontSize: '20px', color: '#6B655C', lineHeight: 1.8, marginBottom: '32px' }}>
                데이터 거버넌스 All-in-One Package. 8개 제품으로 전 영역 커버.
              </p>
              <Link href="/products" data-anim style={{ display: 'inline-flex', padding: '18px 36px', backgroundColor: '#111214', color: '#fff', fontSize: '18px', fontWeight: 700, textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >전체 라인업 →</Link>
            </div>

            {/* RIGHT — 2컬럼 제품 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', backgroundColor: '#E7E2D8' }}>
              {PRODUCTS.map((p) => (
                <Link key={p.slug} href={`/products/${p.slug}`} data-anim style={{ textDecoration: 'none', padding: '36px 32px', backgroundColor: '#fcfbf8', display: 'flex', flexDirection: 'column', gap: '10px', transition: 'background-color 0.3s, border-left 0.3s', borderLeft: '3px solid transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.borderLeft = '3px solid #36c88a'; const arrow = e.currentTarget.querySelector('.product-arrow') as HTMLElement; if (arrow) arrow.style.opacity = '1'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#fcfbf8'; e.currentTarget.style.borderLeft = '3px solid transparent'; const arrow = e.currentTarget.querySelector('.product-arrow') as HTMLElement; if (arrow) arrow.style.opacity = '0'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '22px', fontWeight: 800, color: '#111214' }}>{p.name}</span>
                    <span className="product-arrow" style={{ fontSize: '18px', color: '#36c88a', opacity: 0, transition: 'opacity 0.3s', marginLeft: 'auto' }}>→</span>
                  </div>
                  <p style={{ fontSize: '18px', color: '#6B655C' }}>{p.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          6. CORE FEATURES — 좌: 큰숫자 / 우: 기능 리스트
          ═══════════════════════════════════════════════════════ */}
      <section ref={s5} style={{ position: 'relative', backgroundColor: '#fff', borderTop: '1px solid #E7E2D8', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 4vw, 56px)', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '80px', alignItems: 'start' }}>
            <div>
              <p data-anim style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.12em', marginBottom: '16px' }}>CORE FEATURES</p>
              <h2 data-anim style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, color: '#111214', lineHeight: 1.1, marginBottom: '20px' }}>
                {COPY.whyDA}<span style={{ color: '#36c88a' }}>.</span>
              </h2>
              <p data-anim style={{ fontSize: '20px', color: '#6B655C', lineHeight: 1.8, marginBottom: '48px' }}>{COPY.heroDA.subtitle}</p>
              <div data-anim>
                <span ref={c3.ref} style={{ fontSize: 'clamp(80px, 12vw, 140px)', fontWeight: 900, color: '#111214', lineHeight: 0.85 }}>{c3.n}<span style={{ color: '#36c88a', fontSize: '0.35em' }}>%</span></span>
                <p style={{ fontSize: '20px', color: '#6B655C', marginTop: '12px' }}>{COPY.aiPack}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { title: '개념·논리·물리 모델링', desc: '개괄 모델부터 개념, 논리, 물리 모델까지 데이터 아키텍처 구축의 모든 단계를 지원' },
                { title: 'AI Powered Pack', desc: 'ChatGPT 기반 데이터 표준화, 모델 현행화, 비즈니스 분류 자동화' },
                { title: '리버스 엔지니어링', desc: 'ERD 자동 생성, 엔터티 간 관계 정보와 명칭 활용한 자동 관계 찾기/배치로 빠른 모델링' },
                { title: 'Repository 협업', desc: '주제 영역별 동시 모델링 지원, 모든 작업자들에게 모델 공유, 동기화' },
                { title: '다양한 산출물 자동생성', desc: '한글, 워드, PDF, CSV, EXCEL, HTML 등 보고서의 다양한 파일 형식으로 변환 가능' },
              ].map((f, i) => (
                <div key={f.title} data-anim style={{ padding: '28px 0', borderBottom: '1px solid #E7E2D8', transition: 'padding-left 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.paddingLeft = '16px'; }}
                  onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a' }}>{String(i + 1).padStart(2, '0')}</span>
                    <h4 style={{ fontSize: '22px', fontWeight: 700, color: '#111214' }}>{f.title}</h4>
                  </div>
                  <p style={{ fontSize: '20px', color: '#6B655C', lineHeight: 1.7, paddingLeft: '38px' }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* ═══════════════════════════════════════════════════════
          7. CUSTOMERS — 고객사 로고 그리드 (다크 배경)
          원본 사이트와 동일하게 로고만 표시, 가짜 인용문/수치 없음
          ═══════════════════════════════════════════════════════ */}
      <section ref={s6} style={{ position: 'relative', backgroundColor: '#fff', borderTop: '1px solid #E7E2D8', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p data-anim style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.12em', marginBottom: '16px' }}>CUSTOMERS</p>
            <h2 data-anim style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#111214', lineHeight: 1.15, marginBottom: '16px' }}>
              {COPY.customers}
            </h2>
            <p data-anim style={{ fontSize: '18px', color: '#6B655C' }}>
              {COPY.customerIndustries}
            </p>
          </div>

          {/* 고객사 로고 — 크고 유기적 + 플로팅 */}
          <div data-anim style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '56px 80px', padding: '24px 0 16px' }}>
            {TRUSTED_LOGOS.map((logo, i) => (
              <img
                key={logo.id}
                src={logo.image}
                alt={logo.name}
                className="client-logo-float"
                style={{
                  height: 'clamp(60px, 10vw, 100px)',
                  objectFit: 'contain',
                  opacity: 0.85,
                  transition: 'opacity 0.3s, transform 0.3s',
                  animation: `clientFloat ${3 + (i % 3) * 0.8}s ease-in-out ${(i * 0.3) % 2}s infinite alternate`,
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = ''; }}
                loading="lazy"
              />
            ))}
          </div>

          <div data-anim style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/customers" style={{ fontSize: '14px', fontWeight: 600, color: '#6B655C', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#36c88a'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#6B655C'; }}
            >고객사 전체 보기 →</Link>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          8. 유니온시스템즈 소식 — 강의 카드 + 공지
          ═══════════════════════════════════════════════════════ */}
      <section ref={s7} style={{ backgroundColor: '#fff', borderTop: '1px solid #E7E2D8' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(64px, 8vw, 100px) clamp(24px, 4vw, 56px)' }}>
          <div data-anim style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.12em', marginBottom: '16px' }}>NEWS & LECTURES</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#111214', lineHeight: 1.15, marginBottom: '12px' }}>
              유니온시스템즈 소식<span style={{ color: '#36c88a' }}>.</span>
            </h2>
            <p style={{ fontSize: '18px', color: '#6B655C' }}>성장하는 유니온시스템즈의 소식과 유용한 강의들을 만나보세요!</p>
          </div>

          {/* 강의 카드 그리드 */}
          <div data-anim style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '48px' }}>
            {[
              { title: '새로운 시대의 데이터모델링', speaker: '이화식 대표', thumb: '/images/uniondata/video-lecture_seminar_thum-01.jpg', href: 'https://www.uniondata.co.kr/da5%ec%9d%98-%eb%8b%ac%eb%9d%bc%ec%a7%84-%eb%aa%a8%eb%8d%b8%eb%a7%81-da5-%eb%9f%b0%ec%b9%ad-%ec%84%b8%eb%af%b8%eb%82%98/' },
              { title: 'DA#5 개발스토리', speaker: '정철원 디렉터', thumb: '/images/uniondata/video-lecture_seminar_thum-02.jpg', href: 'https://www.uniondata.co.kr/da5%ec%9d%98-%eb%8b%ac%eb%9d%bc%ec%a7%84-%eb%aa%a8%eb%8d%b8%eb%a7%81-da5-%eb%9f%b0%ec%b9%ad%ec%84%b8%eb%af%b8%eb%82%98/' },
              { title: 'DA#5 달라진 모델링', speaker: '정민수 연구원', thumb: '/images/uniondata/video-lecture_seminar_thum-03.jpg', href: 'https://www.uniondata.co.kr/da5%ec%9d%98-api-%ea%b7%b8%eb%a6%ac%ea%b3%a0-%ed%8e%b8%ec%9d%98%ea%b8%b0%eb%8a%a5-da5-%eb%9f%b0%ec%b9%ad-%ec%84%b8%eb%af%b8%eb%82%982/' },
              { title: 'DA#5 기본구조 및 개념', speaker: '최광희 연구원', thumb: '/images/uniondata/video-lecture_seminar_thum-04.jpg', href: 'https://www.uniondata.co.kr/da5%ec%9d%98-%ea%b8%b0%eb%b3%b8%ea%b5%ac%ec%a1%b0-%eb%b0%8f-%ea%b0%9c%eb%85%90-da5-%eb%9f%b0%ec%b9%ad%ec%84%b8%eb%af%b8%eb%82%98/' },
              { title: 'API 그리고 편의기능', speaker: '김기동 연구원', thumb: '/images/uniondata/video-lecture_seminar_thum-05.jpg', href: 'https://www.uniondata.co.kr/da5%ec%9d%98-%eb%8b%ac%eb%9d%bc%ec%a7%84-%eb%aa%a8%eb%8d%b8%eb%a7%81-da5-%eb%9f%b0%ec%b9%ad%ec%84%b8%eb%af%b8%eb%82%982/' },
              { title: '초보자도 할 수 있는 현행모델 파헤치기', speaker: '이임형 연구원', thumb: '/images/uniondata/video-lecture_seminar_thum-06.jpg', href: 'https://www.uniondata.co.kr/da5%ec%9d%98-%ea%b8%b0%eb%b3%b8%ea%b5%ac%ec%a1%b0-%eb%b0%8f-%ea%b0%9c%eb%85%90-da5-%eb%9f%b0%ec%b9%ad%ec%84%b8%eb%af%b8%eb%82%982/' },
            ].map((lecture) => (
              <a
                key={lecture.title}
                href={lecture.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', textDecoration: 'none', overflow: 'hidden', border: '1px solid #E7E2D8', backgroundColor: '#fff', transition: 'box-shadow 0.3s, transform 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = ''; }}
              >
                <div style={{ position: 'relative', height: 180, overflow: 'hidden', backgroundColor: '#0b1220' }}>
                  <img src={lecture.thumb} alt={lecture.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
                    loading="lazy"
                  />
                  {/* 재생 아이콘 */}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.15)', opacity: 0, transition: 'opacity 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '0'; }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(54,200,138,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="20" height="20" fill="#fff" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                  <span style={{ position: 'absolute', top: 10, left: 10, fontSize: 11, fontWeight: 700, color: '#fff', backgroundColor: 'rgba(54,200,138,0.9)', padding: '3px 10px' }}>DA#5 런칭세미나</span>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111214', lineHeight: 1.4, marginBottom: 6 }}>{lecture.title}</h3>
                  <p style={{ fontSize: 13, color: '#98A2B3', margin: 0 }}>{lecture.speaker}</p>
                </div>
              </a>
            ))}
          </div>

          {/* 공지사항 하이라이트 — 카드형 + 썸네일 */}
          <div data-anim style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              { tag: '공지', title: 'DA#_DQ_Edition 조달청 나라장터 등록', date: '2021.11.22', thumb: '/images/uniondata/0.png' },
              { tag: '리뷰', title: '[리뷰] 데이터 품질진단 DA# DQ_Edition', date: '2021.06.02', thumb: '/images/uniondata/0-1.png' },
              { tag: '공지', title: 'DA# DQ_Edition GS인증 1등급', date: '2021.05.30', thumb: '/images/uniondata/0000-1.png' },
            ].map(a => (
              <Link key={a.title} href="/resources/notices" style={{ overflow: 'hidden', backgroundColor: '#fff', border: '1px solid #E7E2D8', transition: 'box-shadow 0.3s, transform 0.3s', textDecoration: 'none', display: 'block' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = ''; }}
              >
                <div style={{ height: 160, overflow: 'hidden', backgroundColor: '#f0f2f5' }}>
                  <img src={a.thumb} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
                    loading="lazy"
                  />
                </div>
                <div style={{ padding: '18px 22px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#36c88a', marginBottom: '8px', display: 'block' }}>{a.tag}</span>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111214', lineHeight: 1.4, marginBottom: '8px' }}>{a.title}</h3>
                  <p style={{ fontSize: '13px', color: '#98A2B3' }}>{a.date}</p>
                </div>
              </Link>
            ))}
          </div>

          <div data-anim style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/resources/notices" style={{ fontSize: '14px', fontWeight: 600, color: '#6B655C', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#36c88a'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#6B655C'; }}
            >공지사항 전체 보기 →</Link>
          </div>
        </div>
      </section>

      {/* CTA 2분할 */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ backgroundColor: '#0B1220', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p data-anim style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.12em', marginBottom: '20px' }}>CONSULTING</p>
            <h2 data-anim style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 900, color: '#F9FAFB', lineHeight: 1.15, marginBottom: '20px' }}>
              데이터 거버넌스<br />도입이 고민이신가요<span style={{ color: '#36c88a' }}>?</span>
            </h2>
            <p data-anim style={{ fontSize: '20px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginBottom: '36px', maxWidth: '400px' }}>
              {COPY.ctaConsulting}
            </p>
            <Link href="/contact" data-anim style={{ display: 'inline-flex', padding: '18px 36px', backgroundColor: '#36c88a', color: '#fff', fontSize: '18px', fontWeight: 700, textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >도입 문의하기 →</Link>
          </div>
        </div>
        <div style={{ backgroundColor: '#FBFAF7', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)' }}>
          <p data-anim style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.12em', marginBottom: '20px' }}>DOWNLOAD</p>
          <h2 data-anim style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 900, color: '#111214', lineHeight: 1.15, marginBottom: '20px' }}>
            DA# 무료 체험<br />시작하기<span style={{ color: '#36c88a' }}>.</span>
          </h2>
          <p data-anim style={{ fontSize: '20px', color: '#6B655C', lineHeight: 1.8, marginBottom: '36px', maxWidth: '400px' }}>
            DATAWARE 소개서 다운로드, DA# 무료 체험을 시작해 보세요.
          </p>
          <Link href="/download" data-anim style={{ display: 'inline-flex', padding: '18px 36px', border: '1px solid #E7E2D8', color: '#111214', fontSize: '18px', fontWeight: 700, textDecoration: 'none', transition: 'border-color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#36c88a'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#E7E2D8'; }}
          >소개서 다운로드 →</Link>
        </div>
      </section>

      <style>{`
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .hero-cta-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 28px -4px rgba(54,200,138,.4) !important; }
        .hero-cta-primary:hover span { transform: translateX(3px); }
        .hero-cta-secondary:hover { background: #111 !important; color: #fff !important; transform: translateY(-3px); }
        @keyframes detailFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
}
