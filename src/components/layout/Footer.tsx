import Link from 'next/link';
import { IMAGES } from '@/data';
import { E } from '@/lib/editable';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';

async function fetchConfig(): Promise<Record<string, string>> {
  try {
    const baseUrl = API_URL.replace('/api/dataware', '');
    const res = await fetch(`${baseUrl}/api/dataware/config`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return {};
    return res.json();
  } catch {
    return {};
  }
}

export default async function Footer() {
  const cfg = await fetchConfig();

  const companyName = cfg.company_name || '주식회사 유니온시스템즈';
  const ceo = cfg.ceo || '홍민석';
  const bizNo = cfg.biz_no || '120-87-96801';
  const tel = cfg.tel || '02-706-8999';
  const fax = cfg.fax || '02-706-8990';
  const email = cfg.email || 'ud@unionsystems.co.kr';
  const address = cfg.address || '서울시 성동구 아차산로17길 49, 1209~1210호 (성수동2가, 생각공장데시앙플렉스)';
  const copyright = cfg.copyright || 'Copyright 2021 UNION SYSTEMS. All rights reserved.';
  const snsBlog = cfg.sns_blog || 'https://blog.naver.com/unionsystems_';
  const snsFacebook = cfg.sns_facebook || '';

  return (
    <footer>
      {/* ── CTA Banner ── */}
      <div style={{ backgroundColor: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '32px clamp(20px, 4vw, 52px)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}><E id="footer_cta.headline" editMode={false}>DATAWARE로 데이터 거버넌스를 시작하세요</E></h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0 }}><E id="footer_cta.desc" editMode={false}>DA# 개인용 무료 다운로드 · 전문 컨설팅 제공 · GS인증 1등급</E></p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link href="/download" style={{ padding: '10px 22px', backgroundColor: '#36c88a', color: '#fff', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}><E id="footer_cta.download" editMode={false}>무료 다운로드</E></Link>
              <Link href="/contact" style={{ padding: '10px 22px', backgroundColor: '#36c88a', color: '#fff', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}><E id="footer_cta.contact" editMode={false}>도입문의</E></Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div style={{ backgroundColor: '#3a3a3a' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px clamp(20px, 4vw, 40px) 24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '32px', marginBottom: '32px' }}>
            <div style={{ flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMAGES.footerLogo} alt="DATAWARE" style={{ height: '28px', objectFit: 'contain', opacity: 0.9 }} />
            </div>

            <div style={{ flex: 1, minWidth: '300px' }}>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, margin: 0 }}>
                {companyName} &nbsp;|&nbsp; 대표자 : {ceo} &nbsp;|&nbsp; 사업자등록번호 : {bizNo}
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, margin: 0 }}>
                TEL : {tel} &nbsp;|&nbsp; FAX : {fax} &nbsp;|&nbsp; E-Mail : <a href={`mailto:${email}`} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>{email}</a>
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, margin: 0 }}>
                {address}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
              {snsBlog && (
                <a href={snsBlog} target="_blank" rel="noopener noreferrer" style={{ display: 'block', opacity: 0.7 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={IMAGES.sns.blog} alt="블로그 바로가기" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
                </a>
              )}
              {snsFacebook && (
                <a href={snsFacebook} target="_blank" rel="noopener noreferrer" style={{ display: 'block', opacity: 0.7 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={IMAGES.sns.facebook} alt="페이스북 바로가기" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
                </a>
              )}
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.12)', marginBottom: '20px' }} />

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
                {copyright}
              </p>
              <Link href="/privacy" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '16px' }}>
                <E id="footer_legal.privacy" editMode={false}>개인정보처리방침</E>
              </Link>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.footerLogo} alt="DA DQ Edition" style={{ height: '20px', objectFit: 'contain', opacity: 0.5 }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
