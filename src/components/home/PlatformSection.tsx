'use client';

import React from 'react';
import Link from 'next/link';
import { DATAWARE_LINEUP } from '@/data';
import { E } from '@/lib/editable';

interface PlatformSectionProps {
  sectionRef: React.RefObject<HTMLElement>;
  editMode?: boolean;
  content?: { title?: string };
}

export default function PlatformSection({ sectionRef, editMode = false, content }: Readonly<PlatformSectionProps>) {
  return (
    <section ref={sectionRef} style={{ position: 'relative', backgroundColor: '#fcfbf8', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 4vw, 56px)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '64px', alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: '120px' }}>
            <p data-anim style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.12em', marginBottom: '16px' }}><E id="home_platform.badge" editMode={editMode}>PLATFORM</E></p>
            <h2 data-anim style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, color: '#111214', lineHeight: 1.1, marginBottom: '20px' }}>
              <E id="home_platform.title" editMode={editMode}>{content?.title ?? 'DATAWARE\n제품 라인업.'}</E>
            </h2>
            <p data-anim style={{ fontSize: '20px', color: '#6B655C', lineHeight: 1.8, marginBottom: '32px' }}>
              <E id="home_platform.desc" editMode={editMode}>데이터 거버넌스 All-in-One Package. 5개 제품으로 전 영역 커버.</E>
            </p>
            <Link href="/products" data-anim style={{ display: 'inline-flex', padding: '18px 36px', backgroundColor: '#111214', color: '#fff', fontSize: '18px', fontWeight: 700, textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            ><E id="home_platform.cta" editMode={editMode}>전체 라인업 &rarr;</E></Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', backgroundColor: '#E7E2D8' }}>
            {DATAWARE_LINEUP.map((p, i) => {
              const isLast = i === DATAWARE_LINEUP.length - 1;
              const isOdd = DATAWARE_LINEUP.length % 2 === 1;
              return (
                <Link key={p.slug} href={`/products/${p.slug}`} data-anim style={{ textDecoration: 'none', padding: '36px 32px', backgroundColor: '#fcfbf8', display: 'flex', flexDirection: 'column', gap: '10px', transition: 'background-color 0.3s, border-left 0.3s', borderLeft: '3px solid transparent', ...(isLast && isOdd ? { gridColumn: '1 / -1' } : {}) }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.borderLeft = '3px solid #36c88a'; const arrow = e.currentTarget.querySelector('.product-arrow') as HTMLElement; if (arrow) arrow.style.opacity = '1'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#fcfbf8'; e.currentTarget.style.borderLeft = '3px solid transparent'; const arrow = e.currentTarget.querySelector('.product-arrow') as HTMLElement; if (arrow) arrow.style.opacity = '0'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '22px', fontWeight: 800, color: '#111214' }}><E id={`home_platform.product_${i}_name`} editMode={editMode}>{p.name}</E></span>
                    <span className="product-arrow" style={{ fontSize: '18px', color: '#36c88a', opacity: 0, transition: 'opacity 0.3s', marginLeft: 'auto' }}>&rarr;</span>
                  </div>
                  <p style={{ fontSize: '18px', color: '#6B655C' }}><E id={`home_platform.product_${i}_subtitle`} editMode={editMode}>{p.subtitle}</E></p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
