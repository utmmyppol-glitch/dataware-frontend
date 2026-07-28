'use client';

import Link from 'next/link';
import { ProductResponse } from '@/lib/api';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';

const PRODUCT_COLORS: Record<string, string> = {
  'dataware': '#36c88a',
  'da-sharp': '#6b8cae',
  'meta-sharp': '#8a7cb8',
  'dq-sharp': '#5b9a7d',
  'ap-sharp': '#c4975a',
  'df-sharp': '#5a9aaa',
  'ett-sharp': '#b07a8a',
  'dp-sharp': '#b8a060',
};

export default function ProductsPageClient({ products }: { products: ProductResponse[] }) {
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
            <Link href="/" style={{ fontSize: 13, color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>홈</Link>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.2)' }}>›</span>
            <span style={{ fontSize: 13, color: '#36c88a', fontWeight: 600 }}>DATAWARE</span>
          </div>

          <p data-hero className="eyebrow" style={{ marginBottom: 16 }}>PRODUCT LINEUP</p>
          <h1 data-hero className="headline-lg" style={{ color: '#ffffff', marginBottom: 16 }}>
            DATAWARE
          </h1>
          <p data-hero style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, maxWidth: 520 }}>
            기업의 DX와 AIX를 가속화하는 데이터 거버넌스 All-in-One Package
          </p>

          {/* Key features bar */}
          <div data-hero style={{ display: 'flex', gap: 32, marginTop: 40, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.06)' }}>
            {[
              { v: '8', l: '핵심 솔루션' },
              { v: 'GS 1등급', l: '품질인증' },
              { v: 'All-in-One', l: '통합 패키지' },
            ].map(s => (
              <div key={s.l}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>{s.v}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Product Grid — Colored tiles ── */}
      <section className="section-pad" style={{ background: '#f8fafc' }}>
        <div ref={gridRef} className="wrap">
          <p style={{ textAlign: 'center', color: '#36c88a', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 40 }}>
            제품 라인업
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
                  <span style={{ fontSize: 13, fontWeight: 600, color: color, flexShrink: 0 }}>자세히 →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. CTA — Dark ── */}
      <section ref={ctaRef as React.RefObject<HTMLElement>} className="section-dark section-pad" style={{ textAlign: 'center' }}>
        <div className="wrap">
          <h2 className="headline-md" style={{ marginBottom: 16 }}>DATAWARE 도입을 고민하고 계신가요?</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, marginBottom: 32 }}>전문 컨설턴트가 귀사에 맞는 솔루션을 안내해 드립니다.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
            <Link href="/contact" className="btn-accent" style={{ textDecoration: 'none', borderRadius: 0 }}>도입 문의하기</Link>
            <Link href="/download" className="btn-outline-light" style={{ textDecoration: 'none', borderRadius: 0 }}>소개서 다운로드</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
