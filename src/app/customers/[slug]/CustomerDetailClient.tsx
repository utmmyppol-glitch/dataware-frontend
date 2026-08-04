'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IMAGES } from '@/data';

const ACCENT = '#36c88a';

interface CustomerDetail {
  companyDesc: string;
  pageHeading: string;
  background: string[];
  features?: string[];
  effects: string[];
  quote: string;
  quoteSource?: string;
  meta: {
    date: string;
    industry: string;
    purpose: string;
  };
}

interface Story {
  company: string;
  industry: string;
  slug: string;
  summary: string;
  detail?: CustomerDetail;
}

const STORY_IMAGES: Record<string, { main: string; detail?: string }> = {
  ohouse: { main: '/images/uniondata/clients_img_ssg.png' },
  ssg: { main: IMAGES.customerStory.ssg },
  kwater: { main: IMAGES.customerStory.kwater, detail: IMAGES.customerStory.kwaterDetail },
  amore: { main: IMAGES.customerStory.amore, detail: IMAGES.customerStory.amoreDetail },
  'hyundai-marine': { main: IMAGES.customerStory.hyundaiMarine, detail: IMAGES.customerStory.hyundaiMarineDetail },
  'dongyang-life': { main: IMAGES.customerStory.dongyangLife, detail: IMAGES.customerStory.dongyangLifeDetail },
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return `${m}월 ${String(day).padStart(2, '0')}, ${d.getFullYear()}`;
}

export default function CustomerDetailClient({ story }: { story: Story | null }) {
  if (!story || !story.detail) {
    return (
      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111111', margin: '0 0 10px' }}>페이지를 찾을 수 없습니다</h2>
          <p style={{ fontSize: '14px', color: '#676767', margin: '0 0 24px' }}>요청하신 고객사례를 찾을 수 없습니다.</p>
          <Link href="/customers" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: ACCENT, color: '#ffffff', fontSize: '14px', fontWeight: '600', padding: '10px 22px', textDecoration: 'none' }}>
            고객사례 목록으로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  const { detail } = story;
  const images = STORY_IMAGES[story.slug];

  return (
    <main style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* ── 회사명 대제목 ── */}
      <section style={{ borderBottom: '1px solid #e6e8ec', padding: '80px 24px 48px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Link href="/customers" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#667085', textDecoration: 'none', marginBottom: 24, transition: 'color 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = ACCENT; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#667085'; }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            고객사례 목록으로
          </Link>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, color: '#101828', letterSpacing: '-0.03em', margin: 0, textAlign: 'center' }}>
            {story.company}
          </h1>
        </div>
      </section>

      {/* ── 날짜 + 메타 / 제목 + 메인 이미지 ── */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 48, alignItems: 'start' }}>
          {/* 좌측: 날짜 + 업종 + 효과 */}
          <div>
            <span style={{ display: 'inline-block', fontSize: 13, color: '#667085', border: '1px solid #e6e8ec', padding: '6px 14px', marginBottom: 28 }}>
              {formatDate(detail.meta.date)}
            </span>

            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#101828', marginBottom: 6 }}>{story.company}</h3>

            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#101828', marginBottom: 2 }}>업종:</p>
              <p style={{ fontSize: 13, color: '#667085' }}>{detail.meta.industry}</p>
            </div>

            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#101828', marginBottom: 2 }}>목적 · 효과:</p>
              <p style={{ fontSize: 13, color: '#667085', lineHeight: 1.6 }}>{detail.meta.purpose}</p>
            </div>
          </div>

          {/* 우측: 제목 + 이미지 */}
          <div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: '#101828', lineHeight: 1.35, marginBottom: 28, textAlign: 'center' }}>
              {detail.pageHeading}
            </h2>
            {images?.main && (
              <Image src={images.main} alt={story.company} width={800} height={500} style={{ width: '100%', height: 'auto', display: 'block' }} />
            )}
          </div>
        </div>
      </section>

      {/* ── 상세 내용 ── */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 64px' }}>

        {/* 회사 설명 */}
        <div style={{ borderTop: '1px solid #e6e8ec', paddingTop: 40, marginBottom: 40 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#101828', marginBottom: 12, paddingLeft: 16, borderLeft: `3px solid ${ACCENT}` }}>{story.company}</h3>
          <p style={{ fontSize: 15, color: '#475467', lineHeight: 1.8 }}>{detail.companyDesc}</p>
        </div>

        {/* 도입 배경 */}
        <div style={{ marginBottom: 40 }}>
          <span style={{ display: 'inline-block', fontSize: 14, fontWeight: 700, color: ACCENT, border: `1px solid ${ACCENT}`, padding: '8px 20px', marginBottom: 20 }}>도입 배경</span>
          <ul style={{ margin: 0, paddingLeft: 20, listStyle: 'disc' }}>
            {detail.background.map((item, i) => (
              <li key={i} style={{ fontSize: 15, color: '#475467', lineHeight: 1.8, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
        </div>

        {/* 적용 솔루션 */}
        {detail.features && detail.features.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <span style={{ display: 'inline-block', fontSize: 14, fontWeight: 700, color: ACCENT, border: `1px solid ${ACCENT}`, padding: '8px 20px', marginBottom: 20 }}>적용 솔루션</span>
            <ul style={{ margin: 0, paddingLeft: 20, listStyle: 'disc' }}>
              {detail.features.map((feat, i) => (
                <li key={i} style={{ fontSize: 15, color: '#475467', lineHeight: 1.8, marginBottom: 6 }}>{feat}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 상세 이미지 */}
        {images?.detail && (
          <div style={{ marginBottom: 40 }}>
            <Image src={images.detail} alt={`${story.company} 시스템 구성`} width={800} height={500} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        )}

        {/* 도입 효과 */}
        <div style={{ marginBottom: 40 }}>
          <span style={{ display: 'inline-block', fontSize: 14, fontWeight: 700, color: ACCENT, border: `1px solid ${ACCENT}`, padding: '8px 20px', marginBottom: 20 }}>도입 효과</span>
          <ul style={{ margin: 0, paddingLeft: 20, listStyle: 'disc' }}>
            {detail.effects.map((effect, i) => (
              <li key={i} style={{ fontSize: 15, color: '#475467', lineHeight: 1.8, marginBottom: 6 }}>{effect}</li>
            ))}
          </ul>
        </div>

        {/* 인용 */}
        {detail.quote && (
          <div style={{ padding: '32px', backgroundColor: '#f9fafb', borderLeft: `4px solid ${ACCENT}`, marginBottom: 40 }}>
            <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.9, margin: 0, whiteSpace: 'pre-line' }}>{detail.quote}</p>
            {detail.quoteSource && (
              <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 16, textAlign: 'right' }}>— {detail.quoteSource}</p>
            )}
          </div>
        )}

        {/* 목록으로 */}
        <div style={{ paddingTop: 32, borderTop: '1px solid #e6e8ec' }}>
          <Link href="/customers" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#676767', textDecoration: 'none', backgroundColor: '#f6f8fa', border: '1px solid #e6e8ec', padding: '12px 20px' }}>
            ← 고객사례 목록으로
          </Link>
        </div>
      </section>

      {/* ═══ 임팩트 CTA ═══ */}
      <section style={{ position: 'relative', background: 'linear-gradient(135deg, #0b1220 0%, #0f172a 60%, #101828 100%)', overflow: 'hidden', padding: 'clamp(64px, 10vw, 100px) 24px', textAlign: 'center' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(54,200,138,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(54,200,138,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '600px', height: '600px', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(54,200,138,0.06) 0%, transparent 60%)', animation: 'ctaPulse 4s ease-in-out infinite' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: ACCENT, letterSpacing: '0.12em', marginBottom: 20 }}>NEXT STEP</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#F9FAFB', lineHeight: 1.2, marginBottom: 20 }}>
            다음 성공사례의<br />주인공이 되어보세요<span style={{ color: ACCENT }}>.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 40 }}>
            3,000+ 기업이 선택한 데이터 거버넌스 솔루션,<br />지금 바로 전문가와 상담하세요.
          </p>
          <Link
            href="/contact"
            className="cta-glow-btn"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '18px 48px', fontSize: 17, fontWeight: 700,
              color: '#fff', backgroundColor: ACCENT, textDecoration: 'none',
              boxShadow: `0 0 24px ${ACCENT}50, 0 8px 32px rgba(0,0,0,0.3)`,
              animation: 'ctaBtnPulse 2s ease-in-out infinite',
              transition: 'transform 0.2s',
            }}
          >
            도입문의 하기
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 48 }}>
            {[
              { v: '3,000+', l: '도입 기업' },
              { v: 'GS 1등급', l: '품질인증' },
              { v: '20+', l: '업력(년)' },
            ].map(s => (
              <div key={s.l}>
                <span style={{ fontSize: 24, fontWeight: 800, color: '#F9FAFB' }}>{s.v}</span>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes ctaPulse {
            0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
          }
          @keyframes ctaBtnPulse {
            0%, 100% { box-shadow: 0 0 24px ${ACCENT}50, 0 8px 32px rgba(0,0,0,0.3); }
            50% { box-shadow: 0 0 40px ${ACCENT}70, 0 12px 40px rgba(0,0,0,0.4); transform: translateY(-2px); }
          }
        `}</style>
      </section>
    </main>
  );
}
