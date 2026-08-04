'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  DATAWARE_OVERVIEW, DA_SHARP, META_SHARP, DQ_SHARP,
  AP_SHARP, DF_SHARP, ETT_SHARP, DP_SHARP,
  DA_DQ_EDITION, DA_TOTAL_PACKAGE, IMAGES, ENCORE_IMAGES,
} from '@/data';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';

/* ── slug → product data (enriched) ── */
type ProductData = {
  name: string; tagline: string; subtitle: string;
  certification?: string;
  description?: string;
  strengths?: { category: string; items: string[] }[];
  integrations?: string[];
  featuresSummary?: string;
  architectureCaption?: string;
  screenshotCaption?: string;
  features: { num: string; title: string; desc: string }[];
};

const PRODUCT_MAP: Record<string, ProductData> = {
  'dataware': { name: DATAWARE_OVERVIEW.name, tagline: DATAWARE_OVERVIEW.tagline, subtitle: DATAWARE_OVERVIEW.description, description: DATAWARE_OVERVIEW.description, features: DATAWARE_OVERVIEW.components.map((c, i) => ({ num: String(i + 1).padStart(2, '0'), title: `${c.product} — ${c.desc}`, desc: c.features.join(', ') })) },
  'da-sharp': { name: DA_SHARP.name, tagline: DA_SHARP.tagline, subtitle: DA_SHARP.subtitle, features: Object.values(DA_SHARP.features).map((g, i) => ({ num: String(i + 1).padStart(2, '0'), title: g.label, desc: g.tabs.map(t => t.title).join(' · ') })) },
  'da-dq-edition': { name: DA_DQ_EDITION.name, tagline: DA_DQ_EDITION.tagline, subtitle: DA_DQ_EDITION.subtitle, certification: DA_DQ_EDITION.certifications.join(' · '), features: Object.values(DA_DQ_EDITION.features).map((g, i) => ({ num: String(i + 1).padStart(2, '0'), title: g.label, desc: g.tabs.map(t => t.title).join(' · ') })) },
  'da-total-package': { name: DA_TOTAL_PACKAGE.name, tagline: DA_TOTAL_PACKAGE.tagline, subtitle: DA_TOTAL_PACKAGE.subtitle, features: DA_TOTAL_PACKAGE.solutions.map(s => ({ num: s.num, title: s.title, desc: s.desc })) },
  'meta-sharp': { ...META_SHARP, features: META_SHARP.features },
  'dq-sharp': { ...DQ_SHARP, features: DQ_SHARP.features },
  'ap-sharp': { ...AP_SHARP, features: AP_SHARP.features },
  'df-sharp': { ...DF_SHARP, features: DF_SHARP.features },
  'ett-sharp': { ...ETT_SHARP, features: ETT_SHARP.features },
  'dp-sharp': { ...DP_SHARP, features: DP_SHARP.features },
};

const IMAGE_MAP: Record<string, { main?: string; screenshot?: string; architecture?: string; logo?: string }> = {
  'dataware': { main: ENCORE_IMAGES.dataware.overview },
  'da-sharp': { main: IMAGES.hero.da.img },
  'meta-sharp': { main: ENCORE_IMAGES.meta.main, screenshot: ENCORE_IMAGES.meta.screenshot, architecture: ENCORE_IMAGES.meta.architecture, logo: ENCORE_IMAGES.meta.logo },
  'dq-sharp': { main: ENCORE_IMAGES.dq.main, screenshot: ENCORE_IMAGES.dq.screenshot, architecture: ENCORE_IMAGES.dq.architecture, logo: ENCORE_IMAGES.dq.logo },
  'ap-sharp': { main: ENCORE_IMAGES.ap.main, screenshot: ENCORE_IMAGES.ap.screenshot, architecture: ENCORE_IMAGES.ap.architecture, logo: ENCORE_IMAGES.ap.logo },
  'df-sharp': { main: ENCORE_IMAGES.df.main, screenshot: ENCORE_IMAGES.df.screenshot, architecture: ENCORE_IMAGES.df.architecture, logo: ENCORE_IMAGES.df.logo },
  'ett-sharp': { main: ENCORE_IMAGES.ett.main, screenshot: ENCORE_IMAGES.ett.screenshot, architecture: ENCORE_IMAGES.ett.architecture, logo: ENCORE_IMAGES.ett.logo },
  'dp-sharp': { main: ENCORE_IMAGES.dp.main, screenshot: ENCORE_IMAGES.dp.screenshot, architecture: ENCORE_IMAGES.dp.architecture, logo: ENCORE_IMAGES.dp.logo },
};

const ACCENT_MAP: Record<string, string> = {
  'dataware': '#36c88a',
  'da-sharp': '#6b8cae',
  'meta-sharp': '#8a7cb8',
  'dq-sharp': '#5b9a7d',
  'ap-sharp': '#c4975a',
  'df-sharp': '#5a9aaa',
  'ett-sharp': '#b07a8a',
  'dp-sharp': '#b8a060',
  'da-dq-edition': '#5b9a7d',
  'da-total-package': '#c4975a',
};

export default function ProductDetailClient() {
  const params = useParams();
  const slug = params.slug as string;
  const product = PRODUCT_MAP[slug];
  const images = IMAGE_MAP[slug];
  const accent = ACCENT_MAP[slug] || '#36c88a';
  const heroRef = useHeroAnim();
  const r1 = useGsapReveal();
  const r2 = useGsapReveal();
  const r3 = useGsapReveal();
  const r4 = useGsapReveal();

  if (!product) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', paddingTop: '120px' }}>
        <p style={{ color: '#98A2B3', fontSize: '16px' }}>제품을 찾을 수 없습니다.</p>
        <Link href="/products" style={{ padding: '12px 24px', backgroundColor: '#101828', color: '#fff', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>제품 목록으로</Link>
      </div>
    );
  }

  const featureCount = product.features.length;

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SCENE 1 — HERO
          ═══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100vh', width: '100%', backgroundColor: '#0B1220', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
          <div style={{ position: 'absolute', top: '10%', right: '5%', width: '40vw', height: '40vw', maxWidth: '600px', maxHeight: '600px', background: `radial-gradient(circle, ${accent}08 0%, transparent 50%)` }} />
          <div style={{ position: 'absolute', bottom: '5%', left: '10%', width: '25vw', height: '25vw', maxWidth: '350px', maxHeight: '350px', background: `radial-gradient(circle, ${accent}05 0%, transparent 60%)` }} />
          {[5, 95].map(p => <div key={p} style={{ position: 'absolute', left: `${p}%`, top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.025)' }} />)}
          <div style={{ position: 'absolute', bottom: '-8%', right: '-1%', fontSize: 'clamp(150px, 20vw, 380px)', fontWeight: 900, color: 'rgba(255,255,255,0.015)', letterSpacing: '-0.06em', lineHeight: 0.85, whiteSpace: 'nowrap' }}>{product.name.replace('#', '')}</div>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent 15%, ${accent}40, transparent 85%)` }} />
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => {
            const [v, h] = pos.split('-');
            return <div key={pos} style={{ position: 'absolute', [v]: '20px', [h]: '20px', width: '20px', height: '20px', [`border${v === 'top' ? 'Top' : 'Bottom'}`]: `1px solid ${accent}20`, [`border${h === 'left' ? 'Left' : 'Right'}`]: `1px solid ${accent}20` }} />;
          })}
          <div style={{ position: 'absolute', left: '18px', top: '50%', transform: 'rotate(-90deg)', transformOrigin: 'left center', fontSize: '9px', fontWeight: 500, color: 'rgba(255,255,255,0.1)', letterSpacing: '0.12em', whiteSpace: 'nowrap' }}>DATAWARE LINEUP</div>
        </div>

        <div style={{ width: '100%', paddingTop: '140px', paddingBottom: '60px', position: 'relative', zIndex: 1 }}>
          <div style={{ padding: '0 56px', marginBottom: '56px' }}>
            <div data-hero style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link href="/products" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = accent; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
                >DATAWARE</Link>
                <svg width="12" height="12" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{product.name}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '45% 55%', alignItems: 'center' }}>
            <div style={{ paddingLeft: '56px', paddingRight: '48px' }}>
              <h1 data-hero style={{ fontSize: 'clamp(52px, 7vw, 96px)', fontWeight: 800, color: '#F9FAFB', letterSpacing: '-0.05em', lineHeight: 0.88, marginBottom: '24px' }}>
                {product.name}<span style={{ color: accent, fontSize: '1.1em' }}>.</span>
              </h1>
              <p data-hero style={{ fontSize: '17px', fontWeight: 500, color: accent, marginBottom: '20px', lineHeight: 1.4 }}>{product.tagline}</p>
              <div data-hero style={{ width: '48px', height: '2px', backgroundColor: accent, marginBottom: '24px', opacity: 0.6 }} />
              <p data-hero style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, maxWidth: '420px', marginBottom: '32px' }}>{product.subtitle}</p>

              {product.certification && (
                <div data-hero style={{ marginBottom: '32px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: `${accent}10`, border: `1px solid ${accent}25`, color: accent, fontSize: '13px', fontWeight: 600 }}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {product.certification}
                  </span>
                </div>
              )}

              <div data-hero style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <Link href="/download" style={{ padding: '14px 32px', backgroundColor: accent, color: '#fff', fontSize: '14px', fontWeight: 600, textDecoration: 'none', transition: 'all 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${accent}30`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                >소개서 다운로드</Link>
                <Link href="/contact" style={{ padding: '14px 32px', border: '1px solid rgba(255,255,255,0.12)', color: '#F9FAFB', fontSize: '14px', fontWeight: 600, textDecoration: 'none', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${accent}50`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                >도입문의 →</Link>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: accent }} />
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em' }}>DATAWARE ALL-IN-ONE PACKAGE</span>
                <div style={{ width: '24px', height: '1px', backgroundColor: 'rgba(255,255,255,0.06)' }} />
              </div>
            </div>

            <div data-hero className="hidden lg:block" style={{ position: 'relative' }}>
              {images?.main ? (
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: '-12px', border: `1px solid ${accent}12`, pointerEvents: 'none', zIndex: 1 }} />
                  <div style={{ position: 'absolute', top: '-12px', left: '-12px', width: '24px', height: '24px', borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}`, zIndex: 2 }} />
                  <div style={{ position: 'absolute', bottom: '-12px', right: '24px', width: '24px', height: '24px', borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}`, zIndex: 2 }} />
                  <Image src={images.main} alt={product.name} width={800} height={480} style={{ width: '100%', height: 'auto', maxHeight: '480px', objectFit: 'contain', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.3))' }} />
                  <div style={{ position: 'absolute', bottom: '-24px', left: '20px', zIndex: 3, backgroundColor: accent, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#fff', animation: 'pulse-ring 2s infinite' }} />
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>DATAWARE LINEUP</span>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <span style={{ fontSize: 'clamp(100px, 14vw, 200px)', fontWeight: 900, color: `${accent}06`, letterSpacing: '-0.05em', lineHeight: 1 }}>{product.name.replace('#', '')}</span>
                </div>
              )}
            </div>
          </div>

          <div style={{ padding: '0 56px', marginTop: '72px' }}>
            <div data-hero style={{ paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              <div>
                <span style={{ fontSize: '32px', fontWeight: 700, color: '#F9FAFB', letterSpacing: '-0.03em' }}>{featureCount}</span>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '2px' }}>핵심 기능</p>
              </div>
              {product.certification && (
                <div>
                  <span style={{ fontSize: '32px', fontWeight: 700, color: accent }}>1등급</span>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '2px' }}>GS인증</p>
                </div>
              )}
              <div>
                <span style={{ fontSize: '32px', fontWeight: 700, color: '#F9FAFB' }}>3,000+</span>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '2px' }}>도입 기업</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.1em' }}>SCROLL</span>
                  <div style={{ width: '1px', height: '16px', background: `linear-gradient(transparent, ${accent}40)` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          SCENE 2 — ABOUT (제품 설명 + 강점)
          description + strengths + integrations. Light bg.
          ═══════════════════════════════════════════════════════════ */}
      {(product.description || product.strengths) && (
        <section ref={r1} style={{ position: 'relative', width: '100%', backgroundColor: '#F7F7F5', overflow: 'hidden' }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(15,23,42,0.012) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            {[5, 50, 95].map(p => <div key={p} style={{ position: 'absolute', left: `${p}%`, top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(15,23,42,0.02)' }} />)}
            <div style={{ position: 'absolute', top: '16px', left: '16px', width: '16px', height: '16px', borderTop: '1px solid rgba(15,23,42,0.04)', borderLeft: '1px solid rgba(15,23,42,0.04)' }} />
            <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '16px', height: '16px', borderBottom: '1px solid rgba(15,23,42,0.04)', borderRight: '1px solid rgba(15,23,42,0.04)' }} />
          </div>

          <div style={{ padding: '80px 56px', position: 'relative', zIndex: 1, maxWidth: '1320px', margin: '0 auto' }}>
            {/* Product logo + description */}
            <div style={{ display: 'grid', gridTemplateColumns: images?.logo ? '200px 1fr' : '1fr', gap: '48px', alignItems: 'start', marginBottom: '56px' }}>
              {images?.logo && (
                <div data-anim style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <Image src={images.logo} alt={`${product.name} logo`} width={160} height={60} style={{ width: '160px', height: 'auto' }} />
                </div>
              )}
              <div>
                <span data-anim style={{ fontSize: '10px', fontWeight: 500, color: '#98A2B3', letterSpacing: '0.14em', display: 'block', marginBottom: '12px' }}>ABOUT</span>
                <h2 data-anim style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: '#101828', letterSpacing: '-0.02em', marginBottom: '20px' }}>
                  DATAWARE™ {product.name}<span style={{ color: accent }}>.</span>
                </h2>
                {product.description && (
                  <p data-anim style={{ fontSize: '15px', color: '#475467', lineHeight: 1.8, maxWidth: '720px' }}>{product.description}</p>
                )}
              </div>
            </div>

            {/* Strengths grid */}
            {product.strengths && product.strengths.length > 0 && (
              <div data-anim style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(product.strengths.length, 3)}, 1fr)`, gap: '20px', marginBottom: '40px' }}>
                {product.strengths.map((s, i) => (
                  <div key={i} style={{ padding: '28px 24px', backgroundColor: '#fff', border: '1px solid rgba(15,23,42,0.04)', position: 'relative', overflow: 'hidden', transition: 'box-shadow 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.04)'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; }}
                  >
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', backgroundColor: accent, opacity: 0.5 }} />
                    <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#101828', marginBottom: '14px', letterSpacing: '-0.01em' }}>{s.category}</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {s.items.map((item, j) => (
                        <li key={j} style={{ fontSize: '13px', color: '#475467', lineHeight: 1.6, paddingLeft: '14px', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, top: '8px', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: accent, opacity: 0.5 }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Integrations */}
            {product.integrations && product.integrations.length > 0 && (
              <div data-anim style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#98A2B3', letterSpacing: '0.06em' }}>연계 솔루션</span>
                <div style={{ width: '1px', height: '16px', backgroundColor: '#E4E7EC' }} />
                {product.integrations.map((int, i) => (
                  <span key={i} style={{ padding: '4px 12px', backgroundColor: '#fff', border: '1px solid rgba(15,23,42,0.06)', fontSize: '12px', fontWeight: 500, color: '#475467' }}>{int}</span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}


      {/* ═══════════════════════════════════════════════════════════
          SCENE 3 — FEATURES (compact table)
          전체 feature를 하나의 섹션에. 100vh 없음.
          ═══════════════════════════════════════════════════════════ */}
      <section ref={r2} style={{ position: 'relative', width: '100%', backgroundColor: '#0B1220', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${accent}06 1px, transparent 1px), linear-gradient(90deg, ${accent}06 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50vw', height: '50vw', maxWidth: '600px', maxHeight: '600px', background: `radial-gradient(circle, ${accent}05 0%, transparent 50%)` }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${accent}25, transparent)` }} />
          {[5, 95].map(p => <div key={p} style={{ position: 'absolute', left: `${p}%`, top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.02)' }} />)}
          <div style={{ position: 'absolute', top: '16px', left: '16px', width: '16px', height: '16px', borderTop: `1px solid ${accent}15`, borderLeft: `1px solid ${accent}15` }} />
          <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '16px', height: '16px', borderBottom: `1px solid ${accent}15`, borderRight: `1px solid ${accent}15` }} />
        </div>

        <div style={{ padding: '80px 56px', position: 'relative', zIndex: 1, maxWidth: '1320px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <span data-anim style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em' }}>CORE FEATURES</span>
              <h2 data-anim style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: '#F9FAFB', marginTop: '8px', letterSpacing: '-0.02em' }}>
                {product.featuresSummary || '핵심 기능'}<span style={{ color: accent }}>.</span>
              </h2>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '999px', backgroundColor: `${accent}10`, border: `1px solid ${accent}20`, fontSize: '10px', fontWeight: 600, color: accent }}>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: accent }} />
              {featureCount} FEATURES
            </div>
          </div>

          {/* Feature rows */}
          <div data-anim style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {product.features.map((f, i) => (
              <div key={f.num} style={{
                display: 'grid', gridTemplateColumns: '56px 1fr', gap: '24px',
                padding: '24px 20px', backgroundColor: 'rgba(255,255,255,0.02)',
                borderBottom: i < featureCount - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                transition: 'background 0.25s, padding-left 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.paddingLeft = '28px'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'; e.currentTarget.style.paddingLeft = '20px'; }}
              >
                <span style={{ fontSize: '28px', fontWeight: 700, color: accent, opacity: 0.25, lineHeight: 1.2 }}>{f.num}</span>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#F9FAFB', marginBottom: '6px' }}>{f.title}</h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div data-anim style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '32px', paddingTop: '24px', borderTop: `1px solid ${accent}15` }}>
            <Link href="/download" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: `${accent}12`, border: `1px solid ${accent}25`, fontSize: '13px', fontWeight: 600, color: accent, textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${accent}20`; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = `${accent}12`; }}
            >소개서 받기 →</Link>
            <Link href="/contact" style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = accent; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
            >도입문의</Link>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          SCENE 4 — ARCHITECTURE + SCREENSHOT (compact)
          ═══════════════════════════════════════════════════════════ */}
      {(images?.architecture || images?.screenshot) && (
        <section ref={r3} style={{ position: 'relative', width: '100%', backgroundColor: '#fff', overflow: 'hidden' }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(15,23,42,0.012) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            {[5, 95].map(p => <div key={p} style={{ position: 'absolute', left: `${p}%`, top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(15,23,42,0.02)' }} />)}
          </div>

          <div style={{ padding: '80px 56px', position: 'relative', zIndex: 1, maxWidth: '1320px', margin: '0 auto' }}>
            {images?.architecture && (
              <div style={{ marginBottom: images?.screenshot ? '64px' : '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
                  <div>
                    <span data-anim style={{ fontSize: '10px', fontWeight: 500, color: '#98A2B3', letterSpacing: '0.14em' }}>ARCHITECTURE</span>
                    <h2 data-anim style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, color: '#101828', marginTop: '8px', letterSpacing: '-0.02em' }}>
                      {product.architectureCaption || '시스템 아키텍처'}<span style={{ color: accent }}>.</span>
                    </h2>
                  </div>
                  <span style={{ fontSize: '10px', color: '#D0D5DD', letterSpacing: '0.08em' }}>{product.name} SYSTEM</span>
                </div>
                <div data-anim style={{ position: 'relative', border: '1px solid rgba(15,23,42,0.06)' }}>
                  <Image src={images.architecture} alt={`${product.name} 아키텍처`} width={1200} height={600} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </div>
            )}

            {images?.screenshot && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
                  <div>
                    <span data-anim style={{ fontSize: '10px', fontWeight: 500, color: '#98A2B3', letterSpacing: '0.14em' }}>PREVIEW</span>
                    <h2 data-anim style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, color: '#101828', marginTop: '8px', letterSpacing: '-0.02em' }}>
                      {product.screenshotCaption || '화면 구성'}<span style={{ color: accent }}>.</span>
                    </h2>
                  </div>
                  <span style={{ fontSize: '10px', color: '#D0D5DD', letterSpacing: '0.08em' }}>SCREEN PREVIEW</span>
                </div>
                <div data-anim style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(15,23,42,0.08)', boxShadow: '0 16px 48px rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 14px', backgroundColor: '#f8f8f8', borderBottom: '1px solid rgba(15,23,42,0.06)' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#ef4444', opacity: 0.5 }} />
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#eab308', opacity: 0.5 }} />
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#22c55e', opacity: 0.5 }} />
                    <div style={{ marginLeft: '10px', flex: 1, maxWidth: '260px', height: '18px', backgroundColor: '#eee', borderRadius: '3px', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                      <span style={{ fontSize: '9px', color: '#98A2B3' }}>{product.name.toLowerCase().replace('#', '')}.dataware.co.kr</span>
                    </div>
                  </div>
                  <Image src={images.screenshot} alt={`${product.name} 화면`} width={1200} height={600} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </div>
            )}
          </div>
        </section>
      )}


      {/* ═══════════════════════════════════════════════════════════
          SCENE 5 — RELATED PRODUCTS + CTA
          ═══════════════════════════════════════════════════════════ */}
      <section ref={r4} style={{ position: 'relative', width: '100%', backgroundColor: '#F7F7F5', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(15,23,42,0.012) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          {[5, 95].map(p => <div key={p} style={{ position: 'absolute', left: `${p}%`, top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(15,23,42,0.02)' }} />)}
        </div>

        <div style={{ padding: '80px 56px', position: 'relative', zIndex: 1, maxWidth: '1320px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <span data-anim style={{ fontSize: '10px', fontWeight: 500, color: '#98A2B3', letterSpacing: '0.14em' }}>LINEUP</span>
              <h2 data-anim style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: '#101828', marginTop: '8px', letterSpacing: '-0.02em' }}>
                다른 제품도 살펴보세요<span style={{ color: '#36c88a' }}>.</span>
              </h2>
            </div>
            <Link href="/products" style={{ fontSize: '12px', color: '#98A2B3', textDecoration: 'none' }}>전체 라인업 →</Link>
          </div>

          <div data-anim style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {[
              { name: 'DA#', slug: 'da-sharp', sub: '데이터 모델링', color: '#6b8cae' },
              { name: 'META#', slug: 'meta-sharp', sub: '메타데이터 관리', color: '#8a7cb8' },
              { name: 'DQ#', slug: 'dq-sharp', sub: '품질관리', color: '#5b9a7d' },
              { name: 'DF#', slug: 'df-sharp', sub: '흐름관리', color: '#5a9aaa' },
              { name: 'AP#', slug: 'ap-sharp', sub: '영향도 분석', color: '#c4975a' },
              { name: 'ETT#', slug: 'ett-sharp', sub: '마이그레이션', color: '#b07a8a' },
              { name: 'DP#', slug: 'dp-sharp', sub: '데이터 포털', color: '#b8a060' },
              { name: 'DATAWARE', slug: 'dataware', sub: 'All-in-One', color: '#36c88a' },
            ].filter(p => p.slug !== slug).slice(0, 4).map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} style={{
                padding: '24px 20px', backgroundColor: '#fff', textDecoration: 'none', position: 'relative', overflow: 'hidden', display: 'block',
                border: '1px solid rgba(15,23,42,0.04)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: p.color, marginBottom: '12px', opacity: 0.7 }} />
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#101828', marginBottom: '4px' }}>{p.name}</h3>
                <p style={{ fontSize: '12px', color: '#98A2B3' }}>{p.sub}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '300px' }}>
          <Link href="/contact" style={{ backgroundColor: '#101828', padding: '56px', textDecoration: 'none', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'background 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1e293b'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#101828'; }}
          >
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span data-anim style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>CONSULTATION</span>
              <h3 data-anim style={{ fontSize: '24px', fontWeight: 700, color: '#F9FAFB', marginTop: '12px', lineHeight: 1.2 }}>
                {product.name} 도입을<br />검토하고 계신가요<span style={{ color: accent }}>?</span>
              </h3>
              <div data-anim style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '20px', fontSize: '14px', fontWeight: 600, color: accent }}>도입문의 →</div>
            </div>
          </Link>

          <Link href="/download" style={{ backgroundColor: accent, padding: '56px', textDecoration: 'none', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'filter 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.92)'; }}
            onMouseLeave={e => { e.currentTarget.style.filter = ''; }}
          >
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span data-anim style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}>DOWNLOAD</span>
              <h3 data-anim style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginTop: '12px', lineHeight: 1.2 }}>
                소개서를<br />받아보세요<span style={{ opacity: 0.6 }}>.</span>
              </h3>
              <div data-anim style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '20px', fontSize: '14px', fontWeight: 600, color: '#fff' }}>무료 다운로드 →</div>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
