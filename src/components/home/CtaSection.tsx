'use client';

import React from 'react';
import Link from 'next/link';
import { COPY } from '@/data';

export default function CtaSection() {
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div style={{ backgroundColor: '#0B1220', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <p data-anim style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.12em', marginBottom: '20px' }}>CONSULTING</p>
          <h2 data-anim style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 900, color: '#F9FAFB', lineHeight: 1.15, marginBottom: '20px' }}>
            데이터 거버넌스<br />도입이 고민이신가요<span style={{ color: '#36c88a' }}>?</span>
          </h2>
          <p data-anim style={{ fontSize: '20px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginBottom: '36px', maxWidth: '400px' }}>
            {COPY.ctaConsulting}
          </p>
          <Link href="/contact" data-anim style={{ display: 'inline-flex', padding: '18px 36px', backgroundColor: '#36c88a', color: '#fff', fontSize: '18px', fontWeight: 700, textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >도입 문의하기 &rarr;</Link>
        </div>
      </div>
      <div style={{ backgroundColor: '#FBFAF7', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)' }}>
        <p data-anim style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.12em', marginBottom: '20px' }}>DOWNLOAD</p>
        <h2 data-anim style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 900, color: '#111214', lineHeight: 1.15, marginBottom: '20px' }}>
          DA# 무료 체험<br />시작하기<span style={{ color: '#36c88a' }}>.</span>
        </h2>
        <p data-anim style={{ fontSize: '20px', color: '#6B655C', lineHeight: 1.8, marginBottom: '36px', maxWidth: '400px' }}>
          DATAWARE 소개서 다운로드, DA# 무료 체험을 시작해 보세요.
        </p>
        <Link href="/download" data-anim style={{ display: 'inline-flex', padding: '18px 36px', border: '1px solid #E7E2D8', color: '#111214', fontSize: '18px', fontWeight: 700, textDecoration: 'none', transition: 'border-color 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#36c88a'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#E7E2D8'; }}
        >소개서 다운로드 &rarr;</Link>
      </div>
    </section>
  );
}
