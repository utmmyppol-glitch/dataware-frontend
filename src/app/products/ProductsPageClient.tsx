'use client';

import Link from 'next/link';
import { ProductResponse } from '@/lib/api';
import { useEditMode, useEditableManifest, EDITABLE_STYLES, E } from '@/lib/editable';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';

const PRODUCT_COLORS: Record<string, string> = {
  'da-sharp': '#6b8cae',
  'meta-sharp': '#8a7cb8',
  'dq-sharp': '#5b9a7d',
  'ap-sharp': '#c4975a',
  'dp-sharp': '#b8a060',
};

export default function ProductsPageClient({ products }: { products: ProductResponse[] }) {
  const editMode = useEditMode();
  useEditableManifest(editMode);
  const heroRef = useHeroAnim();
  const gridRef = useGsapReveal();
  const ctaRef = useGsapReveal();

  return (
    <div style={{ background: '#ffffff' }}>

      {/* ── 1. Dark Hero Banner ── */}
      <section
        className="grid-bg"
        style={{ background: 'linear-gradient(180deg, #0b1220 0%, #0f172a 100%)', paddingTop: 120, paddingBottom: 80, minHeight: 280, display: 'flex', alignItems: 'center' }}
      >
        <div ref={heroRef} className="wrap" style={{ width: '100%' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <Link href="/" style={{ fontSize: 13, color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}><E id="products_hero.breadcrumb_home" editMode={editMode}>홈</E></Link>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.2)' }}>›</span>
            <span style={{ fontSize: 13, color: '#36c88a', fontWeight: 600 }}><E id="products_hero.breadcrumb_current" editMode={editMode}>DATAWARE</E></span>
          </div>

          <p data-hero className="eyebrow" style={{ marginBottom: 16 }}><E id="products_hero.eyebrow" editMode={editMode}>PRODUCT LINEUP</E></p>
          <h1 data-hero className="headline-lg" style={{ color: '#ffffff', marginBottom: 16 }}>
            <E id="products_hero.title" editMode={editMode}>DATAWARE</E>
          </h1>
          <p data-hero style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, maxWidth: 520 }}>
            <E id="products_hero.desc" editMode={editMode}>기업의 DX와 AIX를 가속화하는 데이터 거버넌스 All-in-One Package</E>
          </p>

          {/* Key features bar */}
          <div data-hero style={{ display: 'flex', gap: 32, marginTop: 40, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.06)' }}>
            {[
              { v: '5', l: '핵심 솔루션' },
              { v: 'GS 1등급', l: '품질인증' },
              { v: 'All-in-One', l: '통합 패키지' },
            ].map((s, i) => (
              <div key={s.l}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}><E id={`products_hero.stat${i}_value`} editMode={editMode}>{s.v}</E></div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', marginTop: 4 }}><E id={`products_hero.stat${i}_label`} editMode={editMode}>{s.l}</E></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Product Grid — Colored tiles ── */}
      <section className="section-pad" style={{ background: '#f8fafc' }}>
        <div ref={gridRef} className="wrap">
          <p style={{ textAlign: 'center', color: '#36c88a', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 40 }}>
            <E id="products_grid.label" editMode={editMode}>제품 라인업</E>
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {products.map((product, i) => {
              const color = PRODUCT_COLORS[product.slug] || '#36c88a';
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  data-anim
                  style={{
                    display: 'grid', gridTemplateColumns: '200px 1fr auto',
                    gap: 24, alignItems: 'center',
                    padding: '28px 0',
                    borderBottom: i < products.length - 1 ? '1px solid #e6e8ec' : 'none',
                    textDecoration: 'none',
                    transition: 'padding-left 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = '12px'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = '0'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 4, height: 32, background: color, flexShrink: 0 }} />
                    <div>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>{product.name}</h3>
                      {product.certification && (
                        <span style={{ fontSize: 10, color: color, fontWeight: 600 }}>{product.certification}</span>
                      )}
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.5 }}>{product.subtitle}</p>
                  <span style={{ fontSize: 13, fontWeight: 600, color: color, flexShrink: 0 }}><E id={`products_grid.detail${i}`} editMode={editMode}>자세히 →</E></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. CTA — Dark ── */}
      <section ref={ctaRef as React.RefObject<HTMLElement>} className="section-dark section-pad" style={{ textAlign: 'center' }}>
        <div className="wrap">
          <h2 className="headline-md" style={{ marginBottom: 16 }}><E id="products_cta.title" editMode={editMode}>DATAWARE 도입을 고민하고 계신가요?</E></h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, marginBottom: 32 }}><E id="products_cta.desc" editMode={editMode}>전문 컨설턴트가 귀사에 맞는 솔루션을 안내해 드립니다.</E></p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
            <Link href="/contact" className="btn-accent" style={{ textDecoration: 'none', borderRadius: 0 }}><E id="products_cta.contact_btn" editMode={editMode}>도입 문의하기</E></Link>
            <Link href="/download" className="btn-outline-light" style={{ textDecoration: 'none', borderRadius: 0 }}><E id="products_cta.download_btn" editMode={editMode}>소개서 다운로드</E></Link>
          </div>
        </div>
      </section>
      {editMode && <style>{EDITABLE_STYLES}</style>}
    </div>
  );
}
