'use client';

import Link from 'next/link';
import { IMAGES } from '@/data';

export default function Footer() {
  return (
    <footer>
      {/* ── CTA Banner ── */}
      <div style={{ backgroundColor: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '32px clamp(20px, 4vw, 52px)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>DATAWARE로 데이터 거버넌스를 시작하세요</h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>DA# 개인용 무료 다운로드 · 전문 컨설팅 제공 · GS인증 1등급</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link href="/download" style={{ padding: '10px 22px', backgroundColor: '#36c88a', color: '#fff', fontSize: '13px', fontWeight: 600, textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2ba876'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#36c88a'; }}
              >무료 다운로드</Link>
              <Link href="/contact" style={{ padding: '10px 22px', backgroundColor: '#36c88a', color: '#fff', fontSize: '13px', fontWeight: 600, textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2ba876'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#36c88a'; }}
              >도입문의</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Footer — 원본 스타일 ── */}
      <div style={{ backgroundColor: '#3a3a3a' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px clamp(20px, 4vw, 40px) 24px' }}>
          {/* Top row: Logo + Info + SNS */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '32px', marginBottom: '32px' }}>
            {/* Left — DATAWARE logo */}
            <div style={{ flexShrink: 0 }}>
              <img src={IMAGES.footerLogo} alt="DATAWARE" style={{ height: '28px', objectFit: 'contain', opacity: 0.9 }} />
            </div>

            {/* Center — Company info */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, margin: 0 }}>
                주식회사 유니온시스템즈 &nbsp;|&nbsp; 대표자 : 홍민석 &nbsp;|&nbsp; 사업자등록번호 : 120-87-96801
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, margin: 0 }}>
                TEL : 02-706-8999 &nbsp;|&nbsp; FAX : 02-706-8990 &nbsp;|&nbsp; E-Mail : <a href="mailto:ud@unionsystems.co.kr" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>ud@unionsystems.co.kr</a>
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, margin: 0 }}>
                서울시 성동구 아차산로17길 49, 1209~1210호 (성수동2가,성각공장대시앙플렉스)
              </p>
            </div>

            {/* Right — SNS icons */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
              <a href="https://blog.naver.com/unionsystems_" target="_blank" rel="noopener noreferrer" style={{ display: 'block', opacity: 0.7, transition: 'opacity 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; }}
              >
                <img src={IMAGES.sns.blog} alt="블로그 바로가기" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
              </a>
              <a href="https://www.facebook.com/people/%EC%9C%A0%EB%8B%88%EC%98%A8%EC%8B%9C%EC%8A%A4%ED%85%9C%EC%A6%88/100063749779619/" target="_blank" rel="noopener noreferrer" style={{ display: 'block', opacity: 0.7, transition: 'opacity 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; }}
              >
                <img src={IMAGES.sns.facebook} alt="페이스북 바로가기" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
              </a>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.12)', marginBottom: '20px' }} />

          {/* Bottom row: Copyright + Privacy + DA DQ logo */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
                Copyright 2021 UNION SYSTEMS. All rights reserved.
              </p>
              <Link href="/privacy" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '16px' }}>
                개인정보처리방침
              </Link>
            </div>
            <img src={IMAGES.footerLogo} alt="DA DQ Edition" style={{ height: '20px', objectFit: 'contain', opacity: 0.5 }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
