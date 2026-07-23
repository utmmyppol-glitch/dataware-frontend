'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { IMAGES, DATAWARE_LINEUP, COPY, TRUSTED_LOGOS } from '@/data';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';

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
      <section ref={heroRef} style={{ position: 'relative', height: '100vh', backgroundColor: '#0B1220', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: '140px', position: 'relative', zIndex: 2 }}>
          <div className="hero-grid" style={{ flex: 1, display: 'grid', alignItems: 'center', maxWidth: '1320px', margin: '0 auto', width: '100%', padding: '0 clamp(24px, 4vw, 56px)' }}>
            {/* LEFT */}
            <div>
              <div data-hero style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                <div style={{ width: '6px', height: '6px', backgroundColor: '#36c88a' }} />
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em' }}>Enterprise Data Platform</span>
              </div>

              <h1 data-hero style={{ fontSize: 'clamp(48px, 5.5vw, 72px)', fontWeight: 900, color: '#F9FAFB', lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: '28px' }}>
                {COPY.heroDA.line1}<br />{COPY.heroDA.line2}<br />{COPY.heroDA.line3.replace('.', '')}<span style={{ color: '#36c88a' }}>.</span>
              </h1>

              <p data-hero style={{ fontSize: '20px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '40px', maxWidth: '400px' }}>{COPY.heroDA.subtitle}</p>

              <div data-hero style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
                <Link href="/download" style={{ padding: '18px 36px', backgroundColor: '#36c88a', color: '#fff', fontSize: '18px', fontWeight: 700, textDecoration: 'none', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                >무료 체험하기</Link>
                <Link href="/contact" style={{ padding: '18px 36px', border: '1px solid rgba(255,255,255,0.2)', color: '#F9FAFB', fontSize: '18px', fontWeight: 700, textDecoration: 'none', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#36c88a'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                >도입문의 →</Link>
              </div>

              {/* 메트릭 — 히어로 안에 */}
              <div data-hero style={{ display: 'flex', gap: '32px' }}>
                {[
                  { ref: c1.ref, val: `${c1.n.toLocaleString()}+`, label: '도입 기업' },
                  { ref: c2.ref, val: `${c2.n}+`, label: '업력' },
                  { ref: undefined, val: 'GS 1등급', label: '인증' },
                ].map((s, i) => (
                  <div key={i}>
                    <span ref={s.ref} style={{ fontSize: '28px', fontWeight: 800, color: '#F9FAFB', display: 'block' }}>{s.val}</span>
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)' }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — DA# 이미지 */}
            <div data-hero className="hidden lg:block" style={{ position: 'relative' }}>
              {/* 배경 레이어 — 원본 사이트와 동일한 구성 */}
              <img src={IMAGES.hero.da.bg} alt="" style={{ position: 'absolute', top: '-10%', right: '-5%', width: '110%', height: 'auto', opacity: 0.3, pointerEvents: 'none' }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
              <img src={IMAGES.hero.da.img} alt="DA#" style={{ width: '100%', height: 'auto', display: 'block', position: 'relative', zIndex: 2 }} />
              {/* 3개 어드밴티지 아이콘 — 원본 사이트 구성 */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px', position: 'relative', zIndex: 2 }}>
                {[IMAGES.hero.da.advantage1, IMAGES.hero.da.advantage2, IMAGES.hero.da.advantage3].map((src, i) => (
                  <img key={i} src={src} alt="" style={{ height: '56px', objectFit: 'contain' }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} loading="lazy" />
                ))}
              </div>
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
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#98A2B3', letterSpacing: '0.12em', marginBottom: '16px' }}>TRUSTED BY ENTERPRISES</p>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 800, color: '#111214', lineHeight: 1.3, marginBottom: '32px' }}>
              국내 주요 기업의 데이터 환경을 함께합니다<span style={{ color: '#36c88a' }}>.</span>
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(32px, 5vw, 64px)', flexWrap: 'wrap' }}>
              {[
                { value: '3,000+', label: '도입 기업' },
                { value: '20년+', label: '데이터 전문성' },
                { value: 'GS 인증', label: '1등급' },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#111214', display: 'block' }}>{stat.value}</span>
                  <span style={{ fontSize: '13px', color: '#98A2B3' }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 고객사 로고 마퀴 — 무한 스크롤 */}
          <div data-anim style={{ overflow: 'hidden', position: 'relative', maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}>
            <div style={{ display: 'flex', gap: '56px', alignItems: 'center', animation: 'marquee 40s linear infinite', width: 'max-content' }}>
              {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((logo, i) => (
                <img key={i} src={logo.image} alt={logo.name} style={{ height: '44px', objectFit: 'contain', flexShrink: 0, opacity: 0.7 }} loading="lazy" />
              ))}
            </div>
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

          {/* 고객사 로고 마퀴 — 무한 스크롤 (2줄) */}
          <div data-anim style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 1줄: 왼쪽으로 스크롤 */}
            <div style={{ overflow: 'hidden', position: 'relative', maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}>
              <div style={{ display: 'flex', gap: '64px', alignItems: 'center', animation: 'marquee 35s linear infinite', width: 'max-content' }}>
                {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((logo, i) => (
                  <img key={`row1-${i}`} src={logo.image} alt={logo.name} style={{ height: '48px', objectFit: 'contain', flexShrink: 0, opacity: 0.85 }} loading="lazy" />
                ))}
              </div>
            </div>
            {/* 2줄: 오른쪽으로 스크롤 (역방향) */}
            <div style={{ overflow: 'hidden', position: 'relative', maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}>
              <div style={{ display: 'flex', gap: '64px', alignItems: 'center', animation: 'marquee 35s linear infinite reverse', width: 'max-content' }}>
                {[...IMAGES.clientLogoNumbered, ...IMAGES.clientLogoNumbered].map((src: string, i: number) => (
                  <img key={`row2-${i}`} src={src} alt="" style={{ height: '48px', objectFit: 'contain', flexShrink: 0, opacity: 0.85 }} loading="lazy" />
                ))}
              </div>
            </div>
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
          8. NEWS + CTA — 비대칭 그리드 + 2분할 CTA
          ═══════════════════════════════════════════════════════ */}
      <section ref={s7} style={{ backgroundColor: '#F7F6F2', borderTop: '1px solid #E7E2D8' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(64px, 8vw, 100px) clamp(24px, 4vw, 56px)' }}>
          <div data-anim style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 900, color: '#111214' }}>{COPY.newsSection}<span style={{ color: '#36c88a' }}>.</span></h2>
            <Link href="/resources/notices" style={{ fontSize: '18px', fontWeight: 600, color: '#36c88a', textDecoration: 'none' }}>전체 보기 →</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
            <Link href="/resources/notices" data-anim style={{ padding: '48px', backgroundColor: '#fff', border: '1px solid #E7E2D8', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: '280px', transition: 'border-color 0.3s', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#36c88a'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E7E2D8'; }}
            >
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', marginBottom: '16px' }}>공지</span>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#111214', lineHeight: 1.3, marginBottom: '12px' }}>DA#_DQ_Edition 조달청 나라장터 등록</h3>
              <p style={{ fontSize: '16px', color: '#98A2B3' }}>2021.11.22</p>
            </Link>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { tag: '리뷰', title: '[리뷰] 데이터 품질진단 DA# DQ_Edition', date: '2021.06.02', href: '/resources/notices' },
                { tag: '공지', title: 'DA# DQ_Edition GS인증 1등급', date: '2021.05.30', href: '/resources/notices' },
              ].map(a => (
                <Link key={a.title} href={a.href} data-anim style={{ padding: '32px', backgroundColor: '#fff', border: '1px solid #E7E2D8', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', transition: 'border-color 0.3s', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#36c88a'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#E7E2D8'; }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', marginBottom: '12px' }}>{a.tag}</span>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111214', lineHeight: 1.4 }}>{a.title}</h3>
                  <p style={{ fontSize: '14px', color: '#98A2B3', marginTop: '8px' }}>{a.date}</p>
                </Link>
              ))}
            </div>
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
        .hero-grid { grid-template-columns: 40% 60%; }
        @media (max-width: 1023px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
        /* Data flow pipeline — mobile: 2x3 grid */
        @media (max-width: 768px) {
          .flow-pipeline { flex-wrap: wrap !important; gap: 1px !important; }
          .flow-step-card { flex: 0 0 calc(50% - 24px) !important; min-width: 0 !important; }
          .flow-arrow { display: none !important; }
        }
        @media (max-width: 480px) {
          .flow-step-card { flex: 0 0 100% !important; }
        }
      `}</style>
    </>
  );
}
