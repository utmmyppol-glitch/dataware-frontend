'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';
import { NOTICES } from '@/data/notices';
import { formatDateDot as formatDate } from '@/lib/format';

export default function NoticesPageClient() {
  const PER_PAGE = 6;
  const [page, setPage] = useState(0);
  const heroRef = useHeroAnim();
  const listRef = useGsapReveal();

  const totalPages = Math.ceil(NOTICES.length / PER_PAGE);
  const paged = NOTICES.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <div style={{ background: '#ffffff' }}>

      {/* ── 1. Dark Hero Banner ── */}
      <section
        style={{ background: 'linear-gradient(180deg, #0b1220 0%, #0f172a 100%)', paddingTop: 120, paddingBottom: 80, minHeight: 240, display: 'flex', alignItems: 'center' }}
      >
        <div ref={heroRef} className="wrap" style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <Link href="/" style={{ fontSize: 13, color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>홈</Link>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.2)' }}>›</span>
            <Link href="/resources" style={{ fontSize: 13, color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>자료실</Link>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.2)' }}>›</span>
            <span style={{ fontSize: 13, color: '#36c88a', fontWeight: 600 }}>공지사항</span>
          </div>
          <p data-hero className="eyebrow" style={{ marginBottom: 16 }}>NOTICES</p>
          <h1 data-hero className="headline-lg" style={{ color: '#ffffff', marginBottom: 16 }}>공지사항</h1>
          <p data-hero style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, maxWidth: 480 }}>
            DA# 및 DATAWARE 관련 공지사항, 업데이트, 점검 안내
          </p>
        </div>
      </section>

      {/* ── 2. Notices Card Grid ── */}
      <section className="section-pad" style={{ backgroundColor: '#f8fafc', minHeight: '60vh' }}>
        <div ref={listRef} style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div key={page} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {paged.map((notice) => (
              <Link
                key={notice.id}
                href={`/resources/notices/${notice.slug}`}
                data-anim
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit',
                  backgroundColor: '#fff',
                  border: '1px solid #e6e8ec',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.3s, transform 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = ''; }}
              >
                {/* 썸네일 */}
                <div style={{ height: 180, backgroundColor: '#f0f2f5', overflow: 'hidden' }}>
                  {notice.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={notice.thumbnail} alt={notice.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
                      loading="lazy"
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 48, color: '#d0d5dd' }}>📄</span>
                    </div>
                  )}
                </div>
                {/* 카드 바디 */}
                <div style={{ padding: '20px 24px' }}>
                  <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>{formatDate(notice.date)}</p>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#101828', lineHeight: 1.4, marginBottom: 10 }}>
                    {notice.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#667085', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {notice.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '48px' }}>
              <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                style={{ padding: '10px 20px', border: '1px solid rgba(15,23,42,0.1)', backgroundColor: page === 0 ? '#F7F7F5' : '#fff', color: page === 0 ? '#D0D5DD' : '#101828', fontSize: '13px', fontWeight: 600, cursor: page === 0 ? 'default' : 'pointer' }}
              >이전</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i)}
                  style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: page === i ? 'none' : '1px solid rgba(15,23,42,0.1)', backgroundColor: page === i ? '#101828' : '#fff', color: page === i ? '#fff' : '#667085', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
                >{i + 1}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
                style={{ padding: '10px 20px', border: '1px solid rgba(15,23,42,0.1)', backgroundColor: page === totalPages - 1 ? '#F7F7F5' : '#fff', color: page === totalPages - 1 ? '#D0D5DD' : '#101828', fontSize: '13px', fontWeight: 600, cursor: page === totalPages - 1 ? 'default' : 'pointer' }}
              >다음</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
