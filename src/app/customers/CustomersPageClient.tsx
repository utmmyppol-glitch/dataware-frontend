'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CustomerStoryResponse } from '@/lib/api';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';
import EditMarker from '@/components/EditMarker';

const ACCENT = '#36c88a';
const INDUSTRIES = ['전체', '공공기관', '금융', '유통', '제조'];

export default function CustomersPageClient({ initialStories }: { initialStories: CustomerStoryResponse[] }) {
  const [activeIndustry, setActiveIndustry] = useState('전체');
  const heroRef = useHeroAnim() as React.RefObject<HTMLElement>;
  const gridRef = useGsapReveal() as React.RefObject<HTMLElement>;

  // 실데이터만 (title이 있는 것)
  const realStories = initialStories.filter(s => s.title);
  const filtered = activeIndustry === '전체' ? realStories : realStories.filter(s => s.industry === activeIndustry);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} style={{ position: 'relative', backgroundColor: '#0B1220', overflow: 'hidden', paddingTop: 120, paddingBottom: 80 }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent 15%, ${ACCENT}40, transparent 85%)` }} />
          <div style={{ position: 'absolute', bottom: '-8%', right: '-1%', fontSize: 'clamp(120px, 18vw, 300px)', fontWeight: 900, color: 'rgba(255,255,255,0.015)', letterSpacing: '-0.06em', lineHeight: 0.85 }}>CASES</div>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <p data-hero style={{ fontSize: 13, fontWeight: 600, color: ACCENT, letterSpacing: '0.12em', marginBottom: 16 }}>CUSTOMER STORIES</p>
          <h1 data-hero style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, color: '#F9FAFB', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 20 }}>
            고객사례<span style={{ color: ACCENT }}>.</span>
          </h1>
          <p data-hero style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
            금융 · 공공 · 제조 · 유통 등 다양한 산업에서 DATAWARE를 도입하고 있습니다.
          </p>
        </div>
      </section>

      {/* ═══ FILTERS + CARD GRID ═══ */}
      <section ref={gridRef} style={{ backgroundColor: '#f8fafc', minHeight: '60vh', position: 'relative' }}>
        <EditMarker path="/dataware/customer-stories" />
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '56px 24px 80px' }}>
          {/* 필터 */}
          <div data-anim style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 48 }}>
            {INDUSTRIES.map((industry) => (
              <button key={industry} onClick={() => setActiveIndustry(industry)}
                style={{
                  padding: '10px 24px', fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                  ...(activeIndustry === industry
                    ? { backgroundColor: '#101828', color: '#fff' }
                    : { backgroundColor: '#fff', color: '#667085', border: '1px solid #e6e8ec' }),
                }}
              >
                {industry}
              </button>
            ))}
          </div>

          {/* 카드 그리드 — 원본 사이트처럼 썸네일 카드 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {filtered.map((story) => {
              const slug = story.slug;
              const hasDetail = !!(slug);

              const card = (
                <div
                  data-anim
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e6e8ec',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.3s, transform 0.3s',
                    cursor: hasDetail ? 'pointer' : 'default',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = ''; }}
                >
                  {/* 썸네일 */}
                  <div style={{ height: 160, backgroundColor: '#f0f2f5', overflow: 'hidden' }}>
                    {story.thumbnailUrl ? (
                      <img src={story.thumbnailUrl} alt={story.company} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e6e8ec' }}>
                        <span style={{ fontSize: 48, fontWeight: 800, color: '#d0d5dd' }}>{story.company.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  {/* 정보 */}
                  <div style={{ padding: '20px 24px' }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: '#101828', marginBottom: 8 }}>{story.company}</h3>
                    <p style={{ fontSize: 13, color: '#667085', lineHeight: 1.6, marginBottom: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {story.title}
                    </p>
                  </div>
                </div>
              );

              return hasDetail && slug ? (
                <Link key={story.id} href={`/customers/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {card}
                </Link>
              ) : (
                <div key={story.id}>{card}</div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#98A2B3' }}>
              <p style={{ fontSize: 15 }}>해당 업종의 고객사례가 없습니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: 240 }}>
        <Link href="/contact" style={{ backgroundColor: '#101828', padding: '48px 56px', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'background 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1e293b'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#101828'; }}
        >
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>CONSULTATION</span>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#F9FAFB', marginTop: 10, lineHeight: 1.3 }}>
            DATAWARE 도입을 검토하고 계신가요<span style={{ color: ACCENT }}>?</span>
          </h3>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16, fontSize: 14, fontWeight: 600, color: ACCENT }}>도입문의 →</span>
        </Link>
        <Link href="/download" style={{ backgroundColor: ACCENT, padding: '48px 56px', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'filter 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.92)'; }}
          onMouseLeave={e => { e.currentTarget.style.filter = ''; }}
        >
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}>DOWNLOAD</span>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginTop: 10, lineHeight: 1.3 }}>
            소개서를 받아보세요<span style={{ opacity: 0.6 }}>.</span>
          </h3>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16, fontSize: 14, fontWeight: 600, color: '#fff' }}>무료 다운로드 →</span>
        </Link>
      </div>
    </>
  );
}
