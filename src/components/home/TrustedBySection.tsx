'use client';

import React from 'react';
import { E } from '@/lib/editable';

interface TrustedBySectionProps {
  sectionRef: React.RefObject<HTMLElement>;
  editMode?: boolean;
  content?: { title?: string };
}

export default function TrustedBySection({ sectionRef, editMode = false, content }: Readonly<TrustedBySectionProps>) {
  return (
    <section ref={sectionRef} style={{ backgroundColor: '#fff', borderTop: '1px solid #E7E2D8', borderBottom: '1px solid #E7E2D8' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: 'clamp(56px, 8vw, 96px) clamp(24px, 4vw, 56px)' }}>
        <div data-anim style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#98A2B3', letterSpacing: '0.12em', marginBottom: '16px' }}><E id="home_trusted.badge" editMode={editMode}>TRUSTED BY ENTERPRISES</E></p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#111214', lineHeight: 1.15, marginBottom: '36px' }}>
            <E id="home_trusted.title" editMode={editMode}>{content?.title ?? '국내 주요 기업의 데이터 환경을 함께합니다.'}</E>
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(40px, 6vw, 72px)', flexWrap: 'wrap' }}>
            {[
              { value: '3,000+', label: '도입 기업' },
              { value: '20년+', label: '데이터 전문성' },
              { value: 'GS 인증', label: '1등급' },
            ].map((stat, i) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '28px', fontWeight: 800, color: '#111214', display: 'block' }}><E id={`home_trusted.stat${i}_num`} editMode={editMode}>{stat.value}</E></span>
                <span style={{ fontSize: '15px', color: '#98A2B3' }}><E id={`home_trusted.stat${i}_label`} editMode={editMode}>{stat.label}</E></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
