'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CustomerStoryResponse, api } from '@/lib/api';
import { useEditMode, useEditableManifest, EDITABLE_STYLES, E } from '@/lib/editable';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';
import EditMarker from '@/components/EditMarker';

const ACCENT = '#36c88a';
const INDUSTRIES = ['전체', '공공기관', '금융', '유통'];

export default function CustomersPageClient({ initialStories }: { initialStories: CustomerStoryResponse[] }) {
  const editMode = useEditMode();
  useEditableManifest(editMode);
  const [activeIndustry, setActiveIndustry] = useState('전체');
  const heroRef = useHeroAnim() as React.RefObject<HTMLElement>;
  const gridRef = useGsapReveal() as React.RefObject<HTMLElement>;

  // 전체 고객사 로고 (백오피스 고객사 로고 관리 → DB)
  const [logos, setLogos] = useState<{ id: string | number; name: string; image: string }[]>([]);
  useEffect(() => {
    let alive = true;
    api.getClientLogos()
      .then(list => { if (alive && Array.isArray(list)) setLogos(list.map(l => ({ id: l.id, name: l.name, image: l.logoUrl }))); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

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
          <p data-hero style={{ fontSize: 13, fontWeight: 600, color: ACCENT, letterSpacing: '0.12em', marginBottom: 16 }}><E id="customers_hero.badge" editMode={editMode}>CUSTOMER STORIES</E></p>
          <h1 data-hero style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, color: '#F9FAFB', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 20 }}>
            <E id="customers_hero.title" editMode={editMode}>고객사례</E><span style={{ color: ACCENT }}>.</span>
          </h1>
          <p data-hero style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
            <E id="customers_hero.desc" editMode={editMode}>금융 · 공공 · 제조 · 유통 등 다양한 산업에서 DATAWARE를 도입하고 있습니다.</E>
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
              const detailHref = `/customers/${story.slug || story.id}`;

              const card = (
                <div
                  data-anim
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e6e8ec',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.3s, transform 0.3s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = ''; }}
                >
                  {/* 썸네일 */}
                  <div style={{ height: 240, backgroundColor: '#f0f2f5', overflow: 'hidden' }}>
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

              return (
                <Link key={story.id} href={detailHref} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {card}
                </Link>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#98A2B3' }}>
              <p style={{ fontSize: 15 }}><E id="customers_empty.text" editMode={editMode}>해당 업종의 고객사례가 없습니다.</E></p>
            </div>
          )}
        </div>
      </section>

      {/* ═══ ALL CUSTOMERS (로고월) ═══ */}
      {logos.length > 0 && (
        <section style={{ backgroundColor: '#fff', borderTop: '1px solid #EAECF0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(64px, 8vw, 96px) 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: ACCENT, letterSpacing: '0.12em', marginBottom: 12 }}><E id="customers_logowall.badge" editMode={editMode}>ALL CUSTOMERS</E></p>
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, color: '#101828', letterSpacing: '-0.02em' }}><E id="customers_logowall.title" editMode={editMode}>금융부터 공공까지, 전 산업이 신뢰하는 데이터 파트너</E><span style={{ color: ACCENT }}>.</span></h2>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '48px 24px', alignItems: 'center', maxWidth: 1120, margin: '0 auto' }}>
              {logos.map((logo, i) => (
                <div key={logo.id} className="client-logo-float" style={{ height: 96, width: 'calc(25% - 18px)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: `clientFloat ${3 + (i % 5) * 0.45}s ease-in-out ${(i % 6) * 0.3}s infinite alternate` }}>
                  <img src={logo.image} alt={logo.name}
                    style={{ maxHeight: 64, maxWidth: 210, objectFit: 'contain', opacity: 0.85, transition: 'transform 0.3s, opacity 0.3s' }}
                    onMouseEnter={e => { const t = e.currentTarget as HTMLImageElement; t.style.opacity = '1'; t.style.transform = 'scale(1.1) translateY(-2px)'; t.style.filter = 'drop-shadow(0 10px 20px rgba(16,24,40,0.14))'; }}
                    onMouseLeave={e => { const t = e.currentTarget as HTMLImageElement; t.style.opacity = '0.9'; t.style.transform = ''; t.style.filter = 'drop-shadow(0 2px 6px rgba(16,24,40,0.05))'; }}
                    loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CTA ═══ */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: 240 }}>
        <Link href="/contact" style={{ backgroundColor: '#101828', padding: '48px 56px', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'background 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1e293b'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#101828'; }}
        >
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}><E id="customers_cta.consultation_badge" editMode={editMode}>CONSULTATION</E></span>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#F9FAFB', marginTop: 10, lineHeight: 1.3 }}>
            <E id="customers_cta.consultation" editMode={editMode}>DATAWARE 도입을 검토하고 계신가요</E><span style={{ color: ACCENT }}>?</span>
          </h3>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16, fontSize: 14, fontWeight: 600, color: ACCENT }}><E id="customers_cta.consultation_link" editMode={editMode}>도입문의 →</E></span>
        </Link>
        <Link href="/download" style={{ backgroundColor: ACCENT, padding: '48px 56px', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'filter 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.92)'; }}
          onMouseLeave={e => { e.currentTarget.style.filter = ''; }}
        >
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}><E id="customers_cta.download_badge" editMode={editMode}>DOWNLOAD</E></span>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginTop: 10, lineHeight: 1.3 }}>
            <E id="customers_cta.download" editMode={editMode}>소개서를 받아보세요</E><span style={{ opacity: 0.6 }}>.</span>
          </h3>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16, fontSize: 14, fontWeight: 600, color: '#fff' }}><E id="customers_cta.download_link" editMode={editMode}>무료 다운로드 →</E></span>
        </Link>
      </div>
      {editMode && <style>{EDITABLE_STYLES}</style>}
    </>
  );
}
