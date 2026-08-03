'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';
import { COMPANY } from '@/data';
import { E, safeParse, useEditMode, useEditableManifest, EDITABLE_STYLES } from '@/lib/editable';

const ACCENT = '#36c88a';

const BENEFITS = [
  { num: '01', title: '합리적인 수익', desc: '유니온시스템즈는 DATAWARE™ 영업 파트너의 효과적인 영업을 지원하고, 합리적이고 명확한 수익 배분으로 영업 파트너의 안정적인 활동을 지원합니다.' },
  { num: '02', title: '영업 지원', desc: '유니온시스템즈는 DATAWARE™ 영업 파트너의 원활한 영업 활동을 위하여 최신 세일즈킷을 제공합니다.' },
  { num: '03', title: '제품 교육', desc: '유니온시스템즈는 DATAWARE™ 영업 파트너에게 무료 제품 교육을 정기 또는 수시로 제공합니다. 영업 파트너는 필요에 따라 교육을 신청한 후 제품 전반에 대한 정보와 지식을 제공받을 수 있습니다.' },
  { num: '04', title: '마케팅', desc: '유니온시스템즈는 DATAWARE™ 판매 확대를 위하여 본사 차원의 마케팅 활동을 지속적으로 진행하며 전략적으로 영업 활동이 가능하도록 지원합니다.' },
  { num: '05', title: '프로모션', desc: '유니온시스템즈는 DATAWARE™ 판매 확대를 위하여 타겟, 산업, 트렌드 등에 적합한 프로모션 활동을 본사 차원에서 지원하며, 영업 파트너의 요청에 따라 공동 프로모션도 지원합니다.' },
  { num: '06', title: '인센티브', desc: '유니온시스템즈는 DATAWARE™ 영업 파트너의 판매 실적에 따라 소정의 인센티브를 제공함으로써 영업 파트너를 지원할 수 있습니다.' },
];

const DEFAULT_HERO = { title: '유니온시스템즈는 파트너와 함께\n성장하는 기술과 서비스를\n지속적으로 제시합니다', desc: 'End-to-End 데이터 매니지먼트 솔루션 DATAWARE™ 판매 자격과 유니온시스템즈 파트너만의 혜택으로 다양한 솔루션 구성과 제안이 가능합니다.' };
const DEFAULT_BENEFITS = {
  title: '유니온시스템즈\n솔루션 파트너 혜택',
  desc: '고객의 디지털 트랜스포메이션 구축을 지원할 수 있는 기술과 인사이트를 보유한 유니온시스템즈는 파트너의 단기적인 성과보다 장기적으로 함께 성장할 수 있는 파트너 프로그램을 제공합니다.',
  '01': { title: '합리적인 수익', desc: BENEFITS[0].desc },
  '02': { title: '영업 지원', desc: BENEFITS[1].desc },
  '03': { title: '제품 교육', desc: BENEFITS[2].desc },
  '04': { title: '마케팅', desc: BENEFITS[3].desc },
  '05': { title: '프로모션', desc: BENEFITS[4].desc },
  '06': { title: '인센티브', desc: BENEFITS[5].desc },
};
const DEFAULT_CTA = { title: '파트너 제휴에 관심이 있으신가요', desc: '유니온시스템즈의 전문 스태프가\n파트너 문의 사항에 신속하게 대응하겠습니다.' };

export default function PartnerPageClient({ ssrContent }: { ssrContent: Record<string, string> }) {
  const heroRef = useHeroAnim() as React.RefObject<HTMLElement>;
  const benefitRef = useGsapReveal() as React.RefObject<HTMLElement>;
  const ctaRef = useGsapReveal() as React.RefObject<HTMLElement>;
  const editMode = useEditMode();
  useEditableManifest(editMode);

  const [hero, setHero] = useState(() => safeParse(ssrContent.partner_hero, DEFAULT_HERO));
  const [benefits, setBenefits] = useState(() => safeParse(ssrContent.partner_benefits, DEFAULT_BENEFITS));
  const [cta, setCta] = useState(() => safeParse(ssrContent.partner_cta, DEFAULT_CTA));

  useEffect(() => {
    if (!editMode) return;
    const setters: Record<string, (v: unknown) => void> = {
      partner_hero: setHero as (v: unknown) => void,
      partner_benefits: setBenefits as (v: unknown) => void,
      partner_cta: setCta as (v: unknown) => void,
    };
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'content-update') {
        const fn = setters[e.data.section];
        if (fn) fn(e.data.data);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [editMode]);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} style={{ position: 'relative', backgroundColor: '#07111F', overflow: 'hidden', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent 15%, ${ACCENT}40, transparent 85%)` }} />
        </div>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '160px 56px 120px', position: 'relative', zIndex: 1 }}>
          <div data-hero style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, fontSize: 12, fontWeight: 600, letterSpacing: '.12em', color: ACCENT }}>
            <span style={{ width: 20, height: 1.5, background: ACCENT }} />
            SOLUTION PARTNERSHIP
          </div>
          <h1 data-hero style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900, color: '#F9FAFB', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 24 }}>
            <E id="partner_hero.title" editMode={editMode}>{hero.title}</E><span style={{ color: ACCENT }}>.</span>
          </h1>
          <p data-hero style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 600, marginBottom: 40 }}>
            <E id="partner_hero.desc" editMode={editMode}>{hero.desc}</E>
          </p>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '18px 36px', backgroundColor: ACCENT, color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none', transition: 'background 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2ba876'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = ACCENT; }}
          >
            파트너 문의하기<span>&rarr;</span>
          </Link>
        </div>
      </section>

      {/* ═══ BENEFITS ═══ */}
      <section ref={benefitRef} style={{ backgroundColor: '#FBFAF7' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 56px' }}>
          <div data-anim style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start', marginBottom: 64 }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.12em', color: ACCENT, display: 'block', marginBottom: 12 }}>BENEFITS</span>
              <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                <E id="partner_benefits.title" editMode={editMode}>{benefits.title}</E>
              </h2>
            </div>
            <p style={{ fontSize: 15, color: '#676767', lineHeight: 1.8, paddingTop: 32 }}>
              <E id="partner_benefits.desc" editMode={editMode}>{benefits.desc}</E>
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 48' }}>
            {BENEFITS.map((b) => (
              <div key={b.num} data-anim style={{
                padding: '36px 0',
                borderTop: '1px solid #e6e8ec',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 12 }}>
                  <span style={{ fontSize: 32, fontWeight: 900, color: ACCENT, letterSpacing: '-0.03em', lineHeight: 1 }}>{b.num}</span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111' }}><E id={`partner_benefits.${b.num}.title`} editMode={editMode}>{(benefits as unknown as Record<string, Record<string, string>>)[b.num]?.title ?? b.title}</E></h3>
                </div>
                <p style={{ fontSize: 14, color: '#676767', lineHeight: 1.8, paddingLeft: 48 }}><E id={`partner_benefits.${b.num}.desc`} editMode={editMode}>{(benefits as unknown as Record<string, Record<string, string>>)[b.num]?.desc ?? b.desc}</E></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section ref={ctaRef} style={{ backgroundColor: '#0B1220', padding: '80px 56px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <p data-anim style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.12em', color: ACCENT, marginBottom: 16 }}>CONTACT US</p>
          <h2 data-anim style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 800, color: '#F9FAFB', letterSpacing: '-0.02em', marginBottom: 16 }}>
            <E id="partner_cta.title" editMode={editMode}>{cta.title}</E><span style={{ color: ACCENT }}>?</span>
          </h2>
          <p data-anim style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 36 }}>
            <E id="partner_cta.desc" editMode={editMode}>{cta.desc}</E>
          </p>
          <div data-anim style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 48 }}>
            <Link href="/contact" style={{ padding: '16px 36px', backgroundColor: ACCENT, color: '#fff', fontSize: 15, fontWeight: 700, textDecoration: 'none', transition: 'background 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2ba876'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = ACCENT; }}
            >도입문의 →</Link>
            <a href={`tel:${COMPANY.tel}`} style={{ padding: '16px 36px', border: '1px solid rgba(255,255,255,0.12)', color: '#F9FAFB', fontSize: 15, fontWeight: 700, textDecoration: 'none', transition: 'border-color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
            >{COMPANY.tel}</a>
          </div>
          <div data-anim style={{ display: 'flex', justifyContent: 'center', gap: 32, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {[
              { label: 'TEL', value: COMPANY.tel },
              { label: 'EMAIL', value: COMPANY.email },
              { label: 'FAX', value: COMPANY.fax },
            ].map(c => (
              <div key={c.label}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>{c.label}</span>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#F9FAFB', marginTop: 4 }}>{c.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {editMode && <style>{EDITABLE_STYLES}</style>}
    </>
  );
}
