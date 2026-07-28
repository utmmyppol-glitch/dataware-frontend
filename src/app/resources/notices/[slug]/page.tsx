'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { NOTICES } from '@/data/notices';

const ACCENT = '#36c88a';

function formatDate(d: string) {
  const dt = new Date(d);
  return `${dt.getFullYear()}.${String(dt.getMonth() + 1).padStart(2, '0')}.${String(dt.getDate()).padStart(2, '0')}`;
}

export default function NoticeDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const notice = NOTICES.find((n) => n.slug === slug);
  const currentIdx = notice ? NOTICES.findIndex((n) => n.slug === slug) : -1;
  const prev = currentIdx > 0 ? NOTICES[currentIdx - 1] : null;
  const next = currentIdx < NOTICES.length - 1 ? NOTICES[currentIdx + 1] : null;

  if (!notice) {
    return (
      <main style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 10 }}>공지사항을 찾을 수 없습니다</h2>
          <Link href="/resources/notices" style={{ color: ACCENT, textDecoration: 'none', fontWeight: 600 }}>← 목록으로</Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ backgroundColor: '#0B1220', paddingTop: 100, paddingBottom: 48 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <Link href="/" style={{ fontSize: 13, color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>홈</Link>
            <span style={{ color: 'rgba(255,255,255,.2)' }}>›</span>
            <Link href="/resources/notices" style={{ fontSize: 13, color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>공지사항</Link>
            <span style={{ color: 'rgba(255,255,255,.2)' }}>›</span>
            <span style={{ fontSize: 13, color: ACCENT, fontWeight: 600 }}>상세</span>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.3)', marginBottom: 12 }}>{formatDate(notice.date)}</p>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#F9FAFB', lineHeight: 1.3 }}>{notice.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px 64px' }}>
        {notice.thumbnail && (
          <div style={{ marginBottom: 36 }}>
            <img src={notice.thumbnail} alt={notice.title} style={{ width: '100%', maxHeight: 400, objectFit: 'contain', backgroundColor: '#f8fafc', border: '1px solid #e6e8ec' }} />
          </div>
        )}

        <div style={{ fontSize: 16, color: '#334155', lineHeight: 2, whiteSpace: 'pre-line', marginBottom: 48 }}>
          {notice.content}
        </div>

        {/* 이전/다음 */}
        <div style={{ borderTop: '1px solid #e6e8ec', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {prev && (
            <Link href={`/resources/notices/${prev.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#667085', textDecoration: 'none', padding: '12px 16px', backgroundColor: '#f9fafb', transition: 'background 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f0fdf7'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#f9fafb'; }}
            >
              <span style={{ color: '#94a3b8', fontSize: 12, width: 50 }}>이전글</span>
              <span style={{ fontWeight: 600, color: '#101828' }}>{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link href={`/resources/notices/${next.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#667085', textDecoration: 'none', padding: '12px 16px', backgroundColor: '#f9fafb', transition: 'background 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f0fdf7'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#f9fafb'; }}
            >
              <span style={{ color: '#94a3b8', fontSize: 12, width: 50 }}>다음글</span>
              <span style={{ fontWeight: 600, color: '#101828' }}>{next.title}</span>
            </Link>
          )}
        </div>

        {/* 목록 + 도입문의 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, flexWrap: 'wrap', gap: 12 }}>
          <Link href="/resources/notices" style={{ fontSize: 14, fontWeight: 600, color: '#667085', textDecoration: 'none', padding: '12px 20px', backgroundColor: '#f6f8fa', border: '1px solid #e6e8ec' }}>
            ← 목록으로
          </Link>
          <Link href="/contact" style={{ fontSize: 14, fontWeight: 600, color: '#fff', textDecoration: 'none', padding: '12px 24px', backgroundColor: ACCENT }}>
            도입문의 →
          </Link>
        </div>
      </section>
    </main>
  );
}
