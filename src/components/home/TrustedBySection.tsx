'use client';

import React from 'react';
import { TRUSTED_LOGOS } from '@/data';
import { E } from '@/lib/editable';

interface TrustedBySectionProps {
  sectionRef: React.RefObject<HTMLElement>;
  editMode: boolean;
  content?: { title?: string };
}

export default function TrustedBySection({ sectionRef, editMode, content }: TrustedBySectionProps) {
  return (
    <section ref={sectionRef} style={{ backgroundColor: '#fff', borderTop: '1px solid #E7E2D8', borderBottom: '1px solid #E7E2D8' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: 'clamp(56px, 8vw, 96px) clamp(24px, 4vw, 56px)' }}>
        <div data-anim style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#98A2B3', letterSpacing: '0.12em', marginBottom: '16px' }}>TRUSTED BY ENTERPRISES</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#111214', lineHeight: 1.15, marginBottom: '36px' }}>
            <E id="home_trusted.title" editMode={editMode}>{content?.title ?? '국내 주요 기업의 데이터 환경을 함께합니다.'}</E>
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(40px, 6vw, 72px)', flexWrap: 'wrap' }}>
            {[
              { value: '3,000+', label: '도입 기업' },
              { value: '20년+', label: '데이터 전문성' },
              { value: 'GS 인증', label: '1등급' },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '28px', fontWeight: 800, color: '#111214', display: 'block' }}>{stat.value}</span>
                <span style={{ fontSize: '15px', color: '#98A2B3' }}>{stat.label}</span>
              </div>
            ))}
          </div>
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
      </div>
    </section>
  );
}
