'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRICING_PLANS, SYSTEM_REQUIREMENTS, PROCUREMENT } from '@/data';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';

const G = '#36c88a';

const COMPARE = [
  { feature: '데이터 모델링 (개념/논리/물리)', a: true, t: true, r: false },
  { feature: '표준 관리 / 데이터 사전', a: true, t: true, r: false },
  { feature: 'DQ Edition (품질진단)', a: false, t: true, r: false },
  { feature: 'Contents Builder Edition', a: false, t: true, r: false },
  { feature: 'AI Powered Pack', a: false, t: true, r: false },
  { feature: 'Repository (모델 저장소)', a: false, t: true, r: true },
  { feature: '버전 관리 / 변경 이력', a: false, t: true, r: true },
  { feature: '팀 협업 / 권한 관리', a: false, t: true, r: true },
  { feature: '100+ DBMS 역공학/순공학', a: true, t: true, r: true },
  { feature: '리포트 출력 (HTML/PDF/Excel)', a: true, t: true, r: false },
];

const FAQ = [
  { q: 'DA# 패키지를 한 종류만 구입할 경우, 다른 패키지의 서비스를 받을 수 있나요?', a: '패치 서비스와 업그레이드 DC 등은 서비스 특성상 기본적으로 해당 구입 제품에만 적용되며 지원받을 수 있습니다. 유료 서비스팩(DA SP)을 통해 추가 서비스를 지원받을 수 있습니다.' },
  { q: '소규모 회사용 저가 버전이 있나요?', a: 'Light 버전과 같이 기능 제한 저가용으로 개발된 제품 라인은 없으나, 사용자수를 규모에 맞춰 선택할 수 있으므로 비용 대비 효과를 높일 수 있습니다.' },
  { q: '사용자수에 따른 할인정책이 있나요?', a: '사용자수에 따라 사용자 라이센스로 판매되며, Sliding DC 정책으로 사용자수가 증가할수록 사용자당 단가 할인 비율이 높아집니다.' },
  { q: '대기업용 사이트 라이선스가 있나요?', a: '기본적으로 사용자수에 따라 계약하나, 사용자수가 일정 수 이상인 경우 사이트 라이선스를 부여합니다.' },
];

const Check = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Dash = () => <span style={{ color: 'rgba(255,255,255,0.12)' }}>—</span>;

export default function PricingPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useHeroAnim() as React.RefObject<HTMLElement>;
  const cardsRef = useGsapReveal() as React.RefObject<HTMLDivElement>;
  const compareRef = useGsapReveal() as React.RefObject<HTMLDivElement>;
  const whyRef = useGsapReveal() as React.RefObject<HTMLDivElement>;
  const reqRef = useGsapReveal() as React.RefObject<HTMLDivElement>;
  const faqRef = useGsapReveal() as React.RefObject<HTMLDivElement>;

  return (
    <>
      {/* ═══ 1. HERO ═══ */}
      <section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#07111F', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent 20%, ${G}30, transparent 80%)` }} />
        </div>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '160px 56px 96px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <p data-hero style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 32 }}>PRICING</p>
          <h1 data-hero style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 800, color: '#F9FAFB', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 24 }}>
            Enterprise licensing<br />for every stage<br />of data governance<span style={{ color: G }}>.</span>
          </h1>
          <p data-hero style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 48px' }}>
            업무 환경에 맞춰 영구, 1년 구독형으로 구매할 수 있습니다.
          </p>
          <div data-hero style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 72 }}>
            <a href="#plans" style={{ padding: '16px 36px', backgroundColor: G, color: '#fff', fontSize: 15, fontWeight: 700, textDecoration: 'none', transition: 'opacity 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >요금제 비교</a>
            <Link href="/download" style={{ padding: '16px 36px', border: '1px solid rgba(255,255,255,0.12)', color: '#F9FAFB', fontSize: 15, fontWeight: 700, textDecoration: 'none', transition: 'border-color 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
            >무료 체험</Link>
          </div>
          <div data-hero style={{ display: 'flex', justifyContent: 'center', gap: 64 }}>
            {[
              { v: '3,000+', l: 'Enterprise Customers' },
              { v: 'GS 인증', l: 'Certified Quality' },
              { v: '20년+', l: 'Partner Experience' },
            ].map(s => (
              <div key={s.l}>
                <span style={{ fontSize: 28, fontWeight: 700, color: '#F9FAFB', display: 'block' }}>{s.v}</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 2. PRICING CARDS ═══ */}
      <section id="plans" style={{ backgroundColor: '#F7F7F5' }}>
        <div ref={cardsRef} style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 56px' }}>
          <div data-anim style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontSize: 13, color: '#98A2B3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>PLANS</p>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 700, color: '#101828', letterSpacing: '-0.02em' }}>조직의 규모에 맞는 요금제를 선택하세요</h2>
          </div>

          <div data-anim style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, alignItems: 'start' }}>
            {PRICING_PLANS.map((plan, i) => (
              <div key={plan.name} style={{
                backgroundColor: '#fff', padding: '48px 36px', display: 'flex', flexDirection: 'column',
                border: i === 1 ? `2px solid ${G}` : '1px solid rgba(15,23,42,0.06)',
                position: 'relative', transition: 'transform 0.12s, border-color 0.12s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; if (i !== 1) e.currentTarget.style.borderColor = 'rgba(15,23,42,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; if (i !== 1) e.currentTarget.style.borderColor = 'rgba(15,23,42,0.06)'; }}
              >
                {i === 1 && <span style={{ position: 'absolute', top: -1, left: 36, right: 36, height: 3, backgroundColor: G }} />}
                {i === 1 && <span style={{ position: 'absolute', top: 16, right: 20, fontSize: 11, fontWeight: 600, color: G, backgroundColor: `${G}10`, padding: '3px 10px', letterSpacing: '0.04em' }}>RECOMMENDED</span>}

                <p style={{ fontSize: 13, color: '#98A2B3', fontWeight: 500, letterSpacing: '0.06em', marginBottom: 8 }}>{plan.license}</p>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#101828', marginBottom: 32 }}>{plan.name}</h3>

                <div style={{ marginBottom: 32 }}>
                  <span style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, color: '#101828', letterSpacing: '-0.03em' }}>{plan.priceDisplay}</span>
                  <p style={{ fontSize: 13, color: '#D0D5DD', textDecoration: 'line-through', marginTop: 6 }}>정가 {plan.originalDisplay}</p>
                  <p style={{ fontSize: 12, color: '#98A2B3', marginTop: 2 }}>{plan.vatNote}</p>
                </div>

                <div style={{ borderTop: '1px solid rgba(15,23,42,0.06)', paddingTop: 24, marginBottom: 32, flex: 1 }}>
                  {(i === 0 ? ['개념/논리/물리 모델링', '표준 관리', '100+ DBMS 지원', '리포트 출력'] :
                    i === 1 ? ['Architecture 전 기능 포함', 'DQ Edition', 'Contents Builder', 'AI Powered Pack', 'Repository 포함'] :
                    ['중앙 모델 저장소', '버전 관리', '팀 협업/권한', '100+ DBMS 지원']).map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <Check />
                      <span style={{ fontSize: 15, color: '#475467' }}>{f}</span>
                    </div>
                  ))}
                </div>

                {plan.ctaType === 'external' ? (
                  <a href={plan.ctaLink} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', backgroundColor: i === 1 ? G : '#101828', color: '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none', transition: 'opacity 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                  >{plan.ctaLabel}</a>
                ) : (
                  <Link href={plan.ctaLink}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', border: '1px solid rgba(15,23,42,0.08)', color: '#101828', fontSize: 15, fontWeight: 600, textDecoration: 'none', transition: 'border-color 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = G; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(15,23,42,0.08)'; }}
                  >{plan.ctaLabel}</Link>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 32 }}>
            <a href={PROCUREMENT.da.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: G, fontWeight: 600, textDecoration: 'none' }}>{PROCUREMENT.da.label} →</a>
            <span style={{ color: '#E7E2D8' }}>|</span>
            <a href={PROCUREMENT.dq.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: G, fontWeight: 600, textDecoration: 'none' }}>{PROCUREMENT.dq.label} →</a>
          </div>
        </div>
      </section>

      {/* ═══ 3. FEATURE COMPARISON — 풀스크린 카드형 ═══ */}
      <section style={{ backgroundColor: '#0B1220', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div ref={compareRef} style={{ width: '100%', maxWidth: 1440, margin: '0 auto', padding: 'clamp(64px, 8vw, 100px) clamp(24px, 4vw, 72px)' }}>
          <div data-anim style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontSize: 14, color: G, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 16 }}>COMPARE</p>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#F9FAFB', letterSpacing: '-0.03em' }}>제품별 기능 비교</h2>
          </div>

          <div data-anim style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { name: 'DA# Architecture', key: 'a' as const, desc: 'DB 모델링의 필수', count: COMPARE.filter(r => r.a).length, price: '₩2,400,000', period: '1년' },
              { name: 'DA# 통합 패키지', key: 't' as const, desc: '올인원 데이터 모델링', count: COMPARE.filter(r => r.t).length, best: true, price: '₩6,000,000', period: '평생' },
              { name: 'DA# Repository', key: 'r' as const, desc: '통합 모델링의 시작', count: COMPARE.filter(r => r.r).length, price: '₩15,000,000', period: '평생' },
            ].map((plan) => (
              <div key={plan.name} style={{
                display: 'flex', flexDirection: 'column',
                border: plan.best ? `2px solid ${G}` : '1px solid rgba(255,255,255,0.08)',
                backgroundColor: plan.best ? 'rgba(54,200,138,0.04)' : 'rgba(255,255,255,0.02)',
                position: 'relative',
              }}>
                {/* BEST 라벨 */}
                {plan.best && (
                  <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: G, padding: '4px 20px', fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '0.08em' }}>BEST</div>
                )}
                {/* 카드 헤더 */}
                <div style={{ padding: '40px 32px 28px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: '#F9FAFB', marginBottom: 6 }}>{plan.name}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>{plan.desc}</p>
                  <p style={{ fontSize: 32, fontWeight: 800, color: plan.best ? G : '#F9FAFB' }}>{plan.price}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{plan.period} 라이선스 · VAT 별도</p>
                </div>
                {/* 기능 목록 */}
                <div style={{ padding: '24px 28px 32px', flex: 1 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginBottom: 16 }}>{plan.count}개 기능 포함</p>
                  {COMPARE.map((row) => {
                    const included = row[plan.key];
                    return (
                      <div key={row.feature} style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '12px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                      }}>
                        <span style={{
                          width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, fontSize: 14, fontWeight: 700,
                          backgroundColor: included ? (plan.best ? G : 'rgba(54,200,138,0.15)') : 'transparent',
                          color: included ? (plan.best ? '#fff' : G) : 'rgba(255,255,255,0.12)',
                        }}>
                          {included ? '✓' : '—'}
                        </span>
                        <span style={{ fontSize: 15, color: included ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)', fontWeight: included ? 500 : 400 }}>
                          {row.feature}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {/* CTA */}
                <div style={{ padding: '0 28px 32px' }}>
                  <a href={plan.best ? '/download' : '/contact'} style={{
                    display: 'block', textAlign: 'center', padding: '16px',
                    backgroundColor: plan.best ? G : 'transparent',
                    border: plan.best ? 'none' : '1px solid rgba(255,255,255,0.15)',
                    color: plan.best ? '#fff' : 'rgba(255,255,255,0.6)',
                    fontSize: 15, fontWeight: 700, textDecoration: 'none',
                    transition: 'opacity 0.2s, border-color 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; if (!plan.best) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; if (!plan.best) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                  >{plan.best ? '무료 체험하기' : '견적 문의'}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. WHY DATAWARE ═══ */}
      <section style={{ backgroundColor: '#F7F7F5' }}>
        <div ref={whyRef} style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 56px' }}>
          <div data-anim style={{ marginBottom: 64 }}>
            <p style={{ fontSize: 13, color: '#98A2B3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>WHY DATAWARE</p>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 700, color: '#101828', letterSpacing: '-0.02em' }}>DATAWARE를 선택하는 이유</h2>
          </div>

          <div data-anim style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px 96px' }}>
            {[
              { n: '01', t: '논리적인 설계', d: '개괄 모델부터 개념, 논리, 물리 모델까지 데이터 아키텍처 구축의 모든 단계를 지원' },
              { n: '02', t: '효율적인 생산', d: 'M:M 해소, 테이블 구조 변경 가능, 변경 내용 논리/물리 모델 실시간 반영' },
              { n: '03', t: '직관적인 표현', d: '엔터티 상태, 관계, 목적 등 의미를 분명하게 파악할 수 있는 다양한 유형 설정 기능' },
              { n: '04', t: '원활한 협업', d: '주제 영역별 동시 모델링 지원, 모든 작업자들에게 모델 공유, 동기화' },
            ].map(item => (
              <div key={item.n}>
                <span style={{ fontSize: 48, fontWeight: 800, color: 'rgba(15,23,42,0.06)', display: 'block', marginBottom: 16, letterSpacing: '-0.04em' }}>{item.n}</span>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#101828', marginBottom: 12 }}>{item.t}</h3>
                <p style={{ fontSize: 16, color: '#475467', lineHeight: 1.7 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. SYSTEM REQUIREMENTS ═══ */}
      <section style={{ backgroundColor: '#fff' }}>
        <div ref={reqRef} style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 56px' }}>
          <div data-anim style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 13, color: '#98A2B3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>REQUIREMENTS</p>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: '#101828', letterSpacing: '-0.02em' }}>시스템 요구사항</h2>
          </div>

          <div data-anim style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {[
              { title: 'Client', items: [`OS: ${SYSTEM_REQUIREMENTS.client.os}`, `Memory: ${SYSTEM_REQUIREMENTS.client.memory}`, `Disk: ${SYSTEM_REQUIREMENTS.client.disk}`] },
              { title: 'Server (Repository)', items: [`OS: ${SYSTEM_REQUIREMENTS.server.os}`, `DB: ${SYSTEM_REQUIREMENTS.server.db}`, `Disk: ${SYSTEM_REQUIREMENTS.server.disk}`] },
            ].map(sec => (
              <div key={sec.title} style={{ padding: '36px 32px', border: '1px solid rgba(15,23,42,0.06)' }}>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: '#98A2B3', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>{sec.title}</h4>
                {sec.items.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 4, height: 4, backgroundColor: G, flexShrink: 0 }} />
                    <span style={{ fontSize: 15, color: '#475467' }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. FAQ ═══ */}
      <section style={{ backgroundColor: '#F7F7F5' }}>
        <div ref={faqRef} style={{ maxWidth: 800, margin: '0 auto', padding: '96px 56px' }}>
          <div data-anim style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 13, color: '#98A2B3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>FAQ</p>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: '#101828', letterSpacing: '-0.02em' }}>자주 묻는 질문</h2>
          </div>

          <div>
            {FAQ.map((item, i) => (
              <div key={i} data-anim style={{ borderBottom: '1px solid rgba(15,23,42,0.06)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', textAlign: 'left', padding: '24px 0', fontSize: 16, fontWeight: 600, color: '#101828', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {item.q}
                  <span style={{ fontSize: 18, color: G, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0, marginLeft: 16 }}>+</span>
                </button>
                {openFaq === i && <div style={{ padding: '0 0 24px', fontSize: 15, color: '#475467', lineHeight: 1.8 }}>{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. SPLIT CTA ═══ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <Link href="/contact" style={{ backgroundColor: '#07111F', padding: '72px 56px', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 320, transition: 'background 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0D1728'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#07111F'; }}
        >
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>CONTACT SALES</p>
          <h3 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: '#F9FAFB', lineHeight: 1.2, marginBottom: 16 }}>
            요금제 선택이<br />어려우신가요<span style={{ color: G }}>?</span>
          </h3>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, maxWidth: 360, marginBottom: 28 }}>전문 컨설턴트가 귀사에 맞는 최적의 구성을 제안합니다.</p>
          <span style={{ fontSize: 15, fontWeight: 600, color: G }}>무료 상담 신청 →</span>
        </Link>
        <Link href="/download" style={{ backgroundColor: G, padding: '72px 56px', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 320, transition: 'filter 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.92)'; }}
          onMouseLeave={e => { e.currentTarget.style.filter = ''; }}
        >
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>FREE DOWNLOAD</p>
          <h3 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
            DA# 무료 체험<br />시작하기<span style={{ opacity: 0.5 }}>.</span>
          </h3>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: 360, marginBottom: 28 }}>개인용 DA#을 무료로 다운로드하고 직접 체험해보세요.</p>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>소개서 다운로드 →</span>
        </Link>
      </div>
    </>
  );
}
