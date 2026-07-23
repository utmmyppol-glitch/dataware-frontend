'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, CustomerStoryResponse } from '@/lib/api';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';
import { IMAGES } from '@/data';

const ACCENT = '#36c88a';
const INDUSTRIES = ['전체', '공공기관', '금융', '유통', '제조', '서비스'];

// STATIC_STORIES — 원본 사이트(uniondata.co.kr/portfolio/) 크롤링 기준
// title·content는 원본 페이지에 실제로 존재하는 텍스트만 사용 (가짜 수치·인용문 금지)
const STATIC_STORIES: CustomerStoryResponse[] = [
  {
    id: 1,
    company: 'SSG닷컴',
    industry: '유통',
    title: 'SSG닷컴이 데이터를 활용하는 법',
    content: '방대한 데이터의 수집·저장·통합·활용 등 전 과정을 효과적으로 관리하기 위해 따로 운영되던 유통 서비스를 단일 채널로 통합하는 용어 표준화를 진행했습니다. DA#, DQ#, META#을 활용해 기획팀–개발팀 소통을 원활화하고 전사 데이터 현행화·표준화를 완성했습니다.',
    logoUrl: '',
    thumbnailUrl: '/images/uniondata/clients_img_ssg.png',
    createdAt: '2021-11-11',
  },
  {
    id: 2,
    company: '한국수자원공사',
    industry: '공공기관',
    title: '한국수자원공사, 데이터 관리 포털 구축',
    content: '현업 담당자들에게 객관적인 데이터 관련 서비스를 제공하기 위해 데이터모델 기반 테이블 변경 관리 체계를 구축했습니다. 비즈니스 분류 관리 및 시스템/DB서버/테이블/컬럼의 메타데이터를 관리하는 데이터 전문 솔루션을 도입해 개발 생산성과 데이터 활용을 극대화했습니다.',
    logoUrl: '',
    thumbnailUrl: '/images/uniondata/clients_img_kwater.png',
    createdAt: '2021-11-11',
  },
  {
    id: 3,
    company: '아모레퍼시픽',
    industry: '제조',
    title: '아모레퍼시픽, 메타데이터 관리체계 고도화',
    content: '전사 데이터 표준 및 모델관리 프로세스 개선을 위해 DATAWARE의 DA#, META#을 도입했습니다. 데이터 아키텍트 역량을 내재화하고 데이터 리터러시를 구축해 마케팅·영업 현장에서 데이터 기반 의사결정을 직접 수행할 수 있는 환경을 마련했습니다.',
    logoUrl: '',
    thumbnailUrl: '/images/uniondata/clients_img_amore.png',
    createdAt: '2021-11-11',
  },
  {
    id: 4,
    company: '현대해상',
    industry: '금융',
    title: '현대해상, 메타데이터 관리시스템 재구축',
    content: '노후화된 메타데이터 시스템 교체와 운영 효율화를 위해 시스템을 재구축했습니다. 메타데이터를 통해 애플리케이션·정보·시스템을 통합 관리하고 비즈니스 의사결정에 데이터를 활용하는 환경을 구축했습니다.',
    logoUrl: '',
    thumbnailUrl: '/images/uniondata/clients_img_hyundai-marine.png',
    createdAt: '2021-11-10',
  },
  {
    id: 5,
    company: '동양생명',
    industry: '금융',
    title: '동양생명, 데이터 관리체계 자동화 솔루션 도입',
    content: '노후화된 메타데이터 솔루션 교체와 모델링 솔루션 도입을 병행했습니다. 모델 변경사항의 DB반영 자동화와 갭 분석 표준화를 통해 데이터 품질관리 체계를 강화하고 비즈니스 의사결정에 데이터를 활용하는 환경을 마련했습니다.',
    logoUrl: '',
    thumbnailUrl: '/images/uniondata/clients_img_tong-yang-life.png',
    createdAt: '2021-11-11',
  },
  {
    id: 6,
    company: '버킷플레이스(오늘의집)',
    industry: '유통',
    title: '버킷플레이스, 데이터 품질진단 솔루션 공급',
    content: '컨텐츠·커머스·커뮤니티가 유기적으로 결합된 서비스 특성상 빠르게 증가하는 데이터의 명확한 표준 관리와 품질관리가 필요했습니다. DA# DQ_Edition을 도입해 데이터 모델링과 품질진단을 하나의 패키지로 해결하고 개발 생산성과 편의성을 높였습니다.',
    logoUrl: '',
    thumbnailUrl: '',
    createdAt: '2021-11-26',
  },
  {
    id: 7,
    company: 'LG유플러스',
    industry: '서비스',
    title: '',
    content: '',
    logoUrl: '',
    thumbnailUrl: '',
    createdAt: '2026-01-01',
  },
  {
    id: 8,
    company: '카카오뱅크',
    industry: '금융',
    title: '',
    content: '',
    logoUrl: '',
    thumbnailUrl: '',
    createdAt: '2026-01-01',
  },
];

const INDUSTRY_COLORS: Record<string, string> = {
  '유통': '#ef4444', '공공기관': '#1d4ed8', '제조': '#059669',
  '금융': '#7c3aed', '서비스': '#ea580c',
};

export default function CustomersPage() {
  const [stories, setStories] = useState<CustomerStoryResponse[]>(STATIC_STORIES);
  const [activeIndustry, setActiveIndustry] = useState('전체');
  const [page, setPage] = useState(0);
  const heroRef = useHeroAnim() as React.RefObject<HTMLElement>;
  const gridRef = useGsapReveal() as React.RefObject<HTMLElement>;

  const PER_PAGE = 6;

  useEffect(() => {
    const industry = activeIndustry === '전체' ? undefined : activeIndustry;
    api.getCustomerStories(industry)
      .then((res) => { if (res.content && res.content.length > 0) setStories(res.content); })
      .catch(() => {
        if (activeIndustry === '전체') setStories(STATIC_STORIES);
        else setStories(STATIC_STORIES.filter(s => s.industry === activeIndustry));
      });
  }, [activeIndustry]);

  const filtered = activeIndustry === '전체' ? stories : stories.filter(s => s.industry === activeIndustry);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} style={{ position: 'relative', backgroundColor: '#0B1220', overflow: 'hidden', paddingTop: 120, paddingBottom: 80 }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
          {[5, 95].map(p => <div key={p} style={{ position: 'absolute', left: `${p}%`, top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.025)' }} />)}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent 15%, ${ACCENT}40, transparent 85%)` }} />
          {['16px 16px borderTop borderLeft', '16px calc(100% - 36px) borderTop borderRight', 'calc(100% - 36px) 16px borderBottom borderLeft', 'calc(100% - 36px) calc(100% - 36px) borderBottom borderRight'].map((cfg, i) => {
            const [t, l] = cfg.split(' ');
            return <div key={i} style={{ position: 'absolute', top: t, left: l, width: '20px', height: '20px', [`border${i < 2 ? 'Top' : 'Bottom'}`]: `1px solid ${ACCENT}20`, [`border${i % 2 === 0 ? 'Left' : 'Right'}`]: `1px solid ${ACCENT}20` }} />;
          })}
          <div style={{ position: 'absolute', bottom: '-8%', right: '-1%', fontSize: 'clamp(120px, 18vw, 300px)', fontWeight: 900, color: 'rgba(255,255,255,0.015)', letterSpacing: '-0.06em', lineHeight: 0.85 }}>CASES</div>
        </div>

        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 56px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <Link href="/" style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>홈</Link>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.15)' }}>›</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>고객사례</span>
          </div>

          <span data-hero style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em', display: 'block', marginBottom: 12 }}>CUSTOMER STORIES</span>
          <h1 data-hero style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 800, color: '#F9FAFB', letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 20 }}>
            고객사례<span style={{ color: ACCENT }}>.</span>
          </h1>
          <p data-hero style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, maxWidth: 480, marginBottom: 48 }}>
            금융·공공·제조·유통 등 다양한 산업에서 DATAWARE를 도입하고 운영하고 있습니다.
          </p>

          <div data-hero style={{ paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 48 }}>
            {[
              { v: '3,000+', l: '도입 기업' },
              { v: 'GS 1등급', l: '품질인증' },
              { v: '20+', l: '업력' },
              { v: '6개', l: '산업군' },
            ].map(s => (
              <div key={s.l}>
                <span style={{ fontSize: 28, fontWeight: 700, color: '#F9FAFB' }}>{s.v}</span>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LOGO BAR ═══ */}
      <section style={{ position: 'relative', backgroundColor: '#F7F7F5', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(15,23,42,0.012) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        </div>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '32px 56px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, alignItems: 'center' }}>
            {IMAGES.clientLogoNumbered.slice(0, 8).map((src: string, i: number) => (
              <img key={i} src={src} alt={`고객사 ${i + 1}`} style={{ height: 36, objectFit: 'contain', opacity: 0.8, transition: 'opacity 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.8'; }}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FILTERS + STORIES ═══ */}
      <section ref={gridRef} style={{ position: 'relative', backgroundColor: '#fff', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '64px 56px 80px' }}>
          {/* Filters */}
          <div data-anim style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 48 }}>
            {INDUSTRIES.map((industry) => (
              <button key={industry} onClick={() => { setActiveIndustry(industry); setPage(0); }}
                style={{
                  padding: '8px 20px', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                  ...(activeIndustry === industry
                    ? { backgroundColor: '#101828', color: '#fff' }
                    : { backgroundColor: 'transparent', color: '#98A2B3', border: '1px solid rgba(15,23,42,0.08)' }),
                }}
                onMouseEnter={e => { if (activeIndustry !== industry) e.currentTarget.style.borderColor = 'rgba(15,23,42,0.2)'; }}
                onMouseLeave={e => { if (activeIndustry !== industry) e.currentTarget.style.borderColor = 'rgba(15,23,42,0.08)'; }}
              >
                {industry}
              </button>
            ))}
          </div>

          {/* Story rows */}
          <div key={`${activeIndustry}-${page}`} style={{ display: 'flex', flexDirection: 'column', minHeight: '480px' }}>
            {paged.map((story, i) => {
              const color = INDUSTRY_COLORS[story.industry] || ACCENT;
              return (
                <div key={story.id} data-anim style={{
                  display: 'grid', gridTemplateColumns: '220px 1fr', gap: 32,
                  padding: '28px 20px', borderBottom: i < paged.length - 1 ? '1px solid rgba(15,23,42,0.06)' : 'none',
                  transition: 'background 0.25s, padding-left 0.25s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FAFAF8'; e.currentTarget.style.paddingLeft = '28px'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.paddingLeft = '20px'; }}
                >
                  {/* Left: company info */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    {story.thumbnailUrl ? (
                      <img
                        src={story.thumbnailUrl}
                        alt={story.company}
                        style={{ width: 56, height: 56, objectFit: 'cover', flexShrink: 0, border: '1px solid rgba(15,23,42,0.06)' }}
                        loading="lazy"
                      />
                    ) : (
                      <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: color, color: '#fff', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
                        {story.company.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 700, color: '#101828', marginBottom: 4 }}>{story.company}</p>
                      <span style={{ fontSize: 11, fontWeight: 600, color: color, padding: '2px 8px', border: `1px solid ${color}30`, display: 'inline-block' }}>{story.industry}</span>
                    </div>
                  </div>
                  {/* Right: content — title/content가 있을 때만 표시 */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {story.title || story.content ? (
                      <div>
                        {story.title && <h3 style={{ fontSize: 16, fontWeight: 700, color: '#101828', marginBottom: 8, lineHeight: 1.4 }}>{story.title}</h3>}
                        {story.content && <p style={{ fontSize: 14, color: '#667085', lineHeight: 1.7 }}>{story.content}</p>}
                      </div>
                    ) : (
                      <p style={{ fontSize: 14, color: '#D0D5DD', fontStyle: 'italic' }}>고객사례 준비 중입니다.</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#98A2B3' }}>
              <p style={{ fontSize: 15 }}>해당 업종의 고객사례가 없습니다.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 48 }}>
              <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                style={{ padding: '8px 18px', border: '1px solid rgba(15,23,42,0.08)', backgroundColor: '#fff', color: page === 0 ? '#D0D5DD' : '#101828', fontSize: 13, fontWeight: 600, cursor: page === 0 ? 'default' : 'pointer' }}
              >이전</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i)}
                  style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', border: page === i ? 'none' : '1px solid rgba(15,23,42,0.08)', backgroundColor: page === i ? '#101828' : '#fff', color: page === i ? '#fff' : '#667085', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                >{i + 1}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
                style={{ padding: '8px 18px', border: '1px solid rgba(15,23,42,0.08)', backgroundColor: '#fff', color: page === totalPages - 1 ? '#D0D5DD' : '#101828', fontSize: 13, fontWeight: 600, cursor: page === totalPages - 1 ? 'default' : 'pointer' }}
              >다음</button>
            </div>
          )}
        </div>
      </section>

      {/* ═══ 2-SPLIT CTA ═══ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 280 }}>
        <Link href="/contact" style={{ backgroundColor: '#101828', padding: 56, textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'background 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1e293b'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#101828'; }}
        >
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>CONSULTATION</span>
          <h3 style={{ fontSize: 24, fontWeight: 700, color: '#F9FAFB', marginTop: 12, lineHeight: 1.2 }}>
            DATAWARE 도입을<br />검토하고 계신가요<span style={{ color: ACCENT }}>?</span>
          </h3>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20, fontSize: 14, fontWeight: 600, color: ACCENT }}>도입문의 →</span>
        </Link>
        <Link href="/download" style={{ backgroundColor: ACCENT, padding: 56, textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'filter 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.92)'; }}
          onMouseLeave={e => { e.currentTarget.style.filter = ''; }}
        >
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}>DOWNLOAD</span>
          <h3 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginTop: 12, lineHeight: 1.2 }}>
            소개서를<br />받아보세요<span style={{ opacity: 0.6 }}>.</span>
          </h3>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20, fontSize: 14, fontWeight: 600, color: '#fff' }}>무료 다운로드 →</span>
        </Link>
      </div>
    </>
  );
}
