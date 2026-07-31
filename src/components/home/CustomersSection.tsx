'use client';

import React from 'react';
import Link from 'next/link';
import { COPY, TRUSTED_LOGOS } from '@/data';
import { E } from '@/lib/editable';

interface CustomersSectionProps {
  sectionRef: React.RefObject<HTMLElement>;
  editMode: boolean;
  content?: { title?: string };
}

export default function CustomersSection({ sectionRef, editMode, content }: CustomersSectionProps) {
  return (
    <section ref={sectionRef} style={{ position: 'relative', backgroundColor: '#fff', borderTop: '1px solid #E7E2D8', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p data-anim style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.12em', marginBottom: '16px' }}>CUSTOMERS</p>
          <h2 data-anim style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#111214', lineHeight: 1.15, marginBottom: '16px' }}>
            <E id="home_customers.title" editMode={editMode}>{content?.title ?? COPY.customers}</E>
          </h2>
          <p data-anim style={{ fontSize: '18px', color: '#6B655C' }}>
            {COPY.customerIndustries}
          </p>
        </div>

        <div data-anim style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '56px 80px', padding: '24px 0 16px' }}>
          {TRUSTED_LOGOS.map((logo, i) => (
            <img
              key={logo.id}
              src={logo.image}
              alt={logo.name}
              className="client-logo-float"
              style={{
                height: 'clamp(60px, 10vw, 100px)',
                objectFit: 'contain',
                opacity: 0.85,
                transition: 'opacity 0.3s, transform 0.3s',
                animation: `clientFloat ${3 + (i % 3) * 0.8}s ease-in-out ${(i * 0.3) % 2}s infinite alternate`,
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = ''; }}
              loading="lazy"
            />
          ))}
        </div>

        <div data-anim style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link href="/customers" style={{ fontSize: '14px', fontWeight: 600, color: '#6B655C', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#36c88a'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6B655C'; }}
          >고객사 전체 보기 &rarr;</Link>
        </div>
      </div>
    </section>
  );
}
