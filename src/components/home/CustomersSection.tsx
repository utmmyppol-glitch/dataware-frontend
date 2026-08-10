'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { COPY, TRUSTED_LOGOS } from '@/data';
import { api } from '@/lib/api';
import { E } from '@/lib/editable';
import OptImg from '@/components/OptImg';

interface CustomersSectionProps {
  sectionRef: React.RefObject<HTMLElement>;
  editMode?: boolean;
  content?: { title?: string };
}

type Logo = { id: string | number; name: string; image: string };
const FALLBACK_LOGOS: Logo[] = TRUSTED_LOGOS.map(l => ({ id: l.id, name: l.name, image: l.image }));

export default function CustomersSection({ sectionRef, editMode = false, content }: Readonly<CustomersSectionProps>) {
  // 백오피스(고객사 로고 관리) → API 로 불러오고, 실패/비어있으면 기존 로고로 폴백
  const [logos, setLogos] = useState<Logo[]>(FALLBACK_LOGOS);

  useEffect(() => {
    let alive = true;
    api.getClientLogos()
      .then(list => {
        if (alive && Array.isArray(list) && list.length > 0) {
          const typed = list as { id: string | number; name: string; logoUrl: string; showOnHome?: boolean; sortOrder?: number }[];
          // showOnHome 필드가 있으면 그걸로 필터, 없으면(V24 미적용) sortOrder<=24 폴백
          const hasField = typed.some(l => l.showOnHome !== undefined);
          const filtered = hasField ? typed.filter(l => l.showOnHome === true) : typed.filter(l => (l.sortOrder ?? 0) <= 24);
          setLogos(filtered.map(l => ({ id: l.id, name: l.name, image: l.logoUrl })));
        }
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  return (
    <section ref={sectionRef} style={{ position: 'relative', backgroundColor: '#fff', borderTop: '1px solid #E7E2D8', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p data-anim style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.12em', marginBottom: '16px' }}><E id="home_customers.badge" editMode={editMode}>CUSTOMERS</E></p>
          <h2 data-anim style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#111214', lineHeight: 1.15, marginBottom: '16px' }}>
            <E id="home_customers.title" editMode={editMode}>{content?.title ?? COPY.customers}</E>
          </h2>
          <p data-anim style={{ fontSize: '18px', color: '#6B655C' }}>
            <E id="home_customers.desc" editMode={editMode}>{COPY.customerIndustries}</E>
          </p>
        </div>

        <div data-anim style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '44px 24px', alignItems: 'center', maxWidth: 1200, margin: '0 auto', padding: '20px 0 8px' }}>
          {logos.map((logo, i) => (
            <div key={logo.id} className="client-logo-float" style={{ height: 92, width: 'calc(25% - 18px)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: `clientFloat ${2.6 + (i % 4) * 0.5}s ease-in-out ${(i % 5) * 0.35}s infinite alternate` }}>
              <OptImg
                src={logo.image}
                alt={logo.name}
                style={{ maxHeight: 72, maxWidth: 220, objectFit: 'contain', opacity: 0.85, transition: 'transform 0.25s, opacity 0.25s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.opacity = '1'; (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.08)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0.95'; (e.currentTarget as HTMLImageElement).style.transform = ''; }}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div data-anim style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link href="/customers" style={{ fontSize: '14px', fontWeight: 600, color: '#6B655C', textDecoration: 'none' }}><E id="home_customers.cta" editMode={editMode}>고객사례 전체 보기 &rarr;</E></Link>
        </div>
      </div>
    </section>
  );
}
