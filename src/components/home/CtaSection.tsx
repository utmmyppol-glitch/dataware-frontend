'use client';

import React from 'react';
import Link from 'next/link';
import { COPY } from '@/data';
import { E } from '@/lib/editable';

interface CtaSectionProps {
  editMode?: boolean;
  content?: { title?: string; title2?: string };
}

export default function CtaSection({ editMode = false, content }: CtaSectionProps) {
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div style={{ backgroundColor: '#0B1220', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <p data-anim style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.12em', marginBottom: '20px' }}><E id="home_cta.badge_left" editMode={editMode}>CONSULTING</E></p>
          <h2 data-anim style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 900, color: '#F9FAFB', lineHeight: 1.15, marginBottom: '20px' }}>
            <E id="home_cta.title" editMode={editMode}>{content?.title ?? '데이터 거버넌스\n도입이 고민이신가요?'}</E>
          </h2>
          <p data-anim style={{ fontSize: '20px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginBottom: '36px', maxWidth: '400px' }}>
            <E id="home_cta.desc_left" editMode={editMode}>{COPY.ctaConsulting}</E>
          </p>
          <Link href="/contact" data-anim style={{ display: 'inline-flex', padding: '18px 36px', backgroundColor: '#36c88a', color: '#fff', fontSize: '18px', fontWeight: 700, textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          ><E id="home_cta.cta_left" editMode={editMode}>도입 문의하기 &rarr;</E></Link>
        </div>
      </div>
      <div style={{ backgroundColor: '#FBFAF7', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)' }}>
        <p data-anim style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.12em', marginBottom: '20px' }}><E id="home_cta.badge_right" editMode={editMode}>DOWNLOAD</E></p>
        <h2 data-anim style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 900, color: '#111214', lineHeight: 1.15, marginBottom: '20px' }}>
          <E id="home_cta.title2" editMode={editMode}>{content?.title2 ?? 'DA# 무료 체험\n시작하기.'}</E>
        </h2>
        <p data-anim style={{ fontSize: '20px', color: '#6B655C', lineHeight: 1.8, marginBottom: '36px', maxWidth: '400px' }}>
          <E id="home_cta.desc_right" editMode={editMode}>DATAWARE 소개서 다운로드, DA# 무료 체험을 시작해 보세요.</E>
        </p>
        <Link href="/download" data-anim style={{ display: 'inline-flex', padding: '18px 36px', border: '1px solid #E7E2D8', color: '#111214', fontSize: '18px', fontWeight: 700, textDecoration: 'none', transition: 'border-color 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#36c88a'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#E7E2D8'; }}
        ><E id="home_cta.cta_right" editMode={editMode}>소개서 다운로드 &rarr;</E></Link>
      </div>
    </section>
  );
}
