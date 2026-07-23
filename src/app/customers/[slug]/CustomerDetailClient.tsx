'use client';

import Link from 'next/link';

interface CustomerStory {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  slug: string;
  acf?: {
    company?: string;
    industry?: string;
    challenge?: string;
    result?: string;
    logo?: string;
  };
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').trim();
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

const INDUSTRY_COLORS: Record<string, string> = {
  금융: '#60a5fa',
  공공: '#34d399',
  유통: '#fb923c',
  제조: '#a78bfa',
  '유통/제조': '#fb923c',
  서비스: '#f472b6',
  교육: '#fbbf24',
  병원: '#22d3ee',
};

export default function CustomerDetailClient({ story }: { story: CustomerStory | null }) {
  if (!story) {
    return (
      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
          <svg width="56" height="56" fill="none" stroke="#e6e8ec" viewBox="0 0 24 24" style={{ margin: '0 auto 20px', display: 'block' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111111', margin: '0 0 10px' }}>
            페이지를 찾을 수 없습니다
          </h2>
          <p style={{ fontSize: '14px', color: '#676767', margin: '0 0 24px' }}>
            요청하신 고객사례를 찾을 수 없습니다.
          </p>
          <Link href="/customers" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#36c88a', color: '#ffffff', fontSize: '14px', fontWeight: '600', padding: '10px 22px', borderRadius: '6px', textDecoration: 'none' }}>
            고객사례 목록으로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  const company = story.acf?.company ?? stripHtml(story.title.rendered).split(' — ')[0];
  const industry = story.acf?.industry ?? '서비스';
  const industryColor = INDUSTRY_COLORS[industry] ?? '#36c88a';

  return (
    <main style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#f6f8fa', borderBottom: '1px solid #e6e8ec', padding: '52px 24px 48px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Link href="/" style={{ fontSize: '13px', color: '#888d94', textDecoration: 'none' }}>홈</Link>
            <svg width="14" height="14" fill="none" stroke="#cccccc" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <Link href="/customers" style={{ fontSize: '13px', color: '#888d94', textDecoration: 'none' }}>고객사례</Link>
            <svg width="14" height="14" fill="none" stroke="#cccccc" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span style={{ fontSize: '13px', color: '#36c88a', fontWeight: '600' }}>{company}</span>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: industryColor, backgroundColor: industryColor + '18', borderRadius: '4px', padding: '3px 10px' }}>{industry}</span>
          </div>

          <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#111111', margin: '0 0 12px', lineHeight: 1.3 }}>{stripHtml(story.title.rendered)}</h1>
          <p style={{ fontSize: '14px', color: '#888d94', margin: 0 }}>게시일: {formatDate(story.date)}</p>
        </div>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '52px 24px' }}>
        {(story.acf?.challenge || story.acf?.result) && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '48px', padding: '24px', backgroundColor: '#f6f8fa', border: '1px solid #e6e8ec', borderRadius: '12px' }}>
            {story.acf?.challenge && (
              <div>
                <p style={{ fontSize: '11px', fontWeight: '700', color: '#888d94', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>도입 과제</p>
                <p style={{ fontSize: '14px', color: '#111111', fontWeight: '600', margin: 0, lineHeight: 1.5 }}>{story.acf.challenge}</p>
              </div>
            )}
            {story.acf?.result && (
              <div>
                <p style={{ fontSize: '11px', fontWeight: '700', color: '#36c88a', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>도입 효과</p>
                <p style={{ fontSize: '14px', color: '#111111', fontWeight: '600', margin: 0, lineHeight: 1.5 }}>{story.acf.result}</p>
              </div>
            )}
          </div>
        )}

        <div style={{ fontSize: '15px', color: '#333333', lineHeight: '1.8' }} dangerouslySetInnerHTML={{ __html: story.content.rendered }} />

        <div style={{ marginTop: '60px', paddingTop: '32px', borderTop: '1px solid #e6e8ec', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/customers" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600', color: '#676767', textDecoration: 'none', backgroundColor: '#f6f8fa', border: '1px solid #e6e8ec', borderRadius: '6px', padding: '10px 18px' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            고객사례 목록으로
          </Link>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '600', color: '#ffffff', textDecoration: 'none', backgroundColor: '#36c88a', borderRadius: '6px', padding: '10px 22px', boxShadow: '0 4px 12px rgba(54,200,138,0.28)' }}>
            도입문의 하기
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
