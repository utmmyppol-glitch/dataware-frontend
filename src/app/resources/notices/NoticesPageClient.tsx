'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';
import { useEditMode, useEditableManifest, EDITABLE_STYLES, E } from '@/lib/editable';
import { api, type PostResponse, type PageResponse } from '@/lib/api';
import { formatDateDot as formatDate } from '@/lib/format';
import EditMarker from '@/components/EditMarker';
import OptImg from '@/components/OptImg';

export default function NoticesPageClient() {
  const editMode = useEditMode();
  useEditableManifest(editMode);
  const PER_PAGE = 6;
  const [page, setPage] = useState(0);
  const [notices, setNotices] = useState<PostResponse[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const heroRef = useHeroAnim();
  const listRef = useGsapReveal();

  useEffect(() => {
    setLoading(true);
    api.getPosts('NOTICE', page, PER_PAGE)
      .then((data: PageResponse<PostResponse>) => {
        setNotices(data.content);
        setTotalPages(data.totalPages);
      })
      .catch(() => setNotices([]))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div style={{ background: '#ffffff' }}>

      {/* ── 1. Dark Hero Banner ── */}
      <section
        style={{ background: 'linear-gradient(180deg, #0b1220 0%, #0f172a 100%)', paddingTop: 120, paddingBottom: 80, minHeight: 240, display: 'flex', alignItems: 'center' }}
      >
        <div ref={heroRef} className="wrap" style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <Link href="/" style={{ fontSize: 13, color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}><E id="notices_breadcrumb.home" editMode={editMode}>홈</E></Link>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.2)' }}>›</span>
            <Link href="/resources" style={{ fontSize: 13, color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}><E id="notices_breadcrumb.resources" editMode={editMode}>자료실</E></Link>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.2)' }}>›</span>
            <span style={{ fontSize: 13, color: '#36c88a', fontWeight: 600 }}><E id="notices_breadcrumb.current" editMode={editMode}>공지사항</E></span>
          </div>
          <p data-hero className="eyebrow" style={{ marginBottom: 16 }}><E id="notices_hero.badge" editMode={editMode}>NOTICES</E></p>
          <h1 data-hero className="headline-lg" style={{ color: '#ffffff', marginBottom: 16 }}><E id="notices_hero.title" editMode={editMode}>공지사항</E></h1>
          <p data-hero style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, maxWidth: 480 }}>
            <E id="notices_hero.desc" editMode={editMode}>DA# 및 DATAWARE 관련 공지사항, 업데이트, 점검 안내</E>
          </p>
        </div>
      </section>

      {/* ── 2. Notices Card Grid ── */}
      <section className="section-pad" style={{ backgroundColor: '#f8fafc', minHeight: '60vh', position: 'relative' }}>
        <EditMarker path="/dataware/posts" label="N" />
        <div ref={listRef} style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div key={page} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {loading && <p style={{ color: '#94a3b8', gridColumn: '1 / -1', textAlign: 'center', padding: 40 }}><E id="notices_content.loading" editMode={editMode}>불러오는 중...</E></p>}
            {!loading && notices.length === 0 && <p style={{ color: '#94a3b8', gridColumn: '1 / -1', textAlign: 'center', padding: 40 }}><E id="notices_content.empty" editMode={editMode}>등록된 공지사항이 없습니다.</E></p>}
            {notices.map((notice) => (
              <Link
                key={notice.id}
                href={`/resources/notices/${notice.slug || notice.id}`}
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
                  {notice.thumbnailUrl ? (
                    <OptImg src={notice.thumbnailUrl} alt={notice.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
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
                  <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>{formatDate(notice.createdAt)}</p>
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
              ><E id="notices_pagination.prev" editMode={editMode}>이전</E></button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i)}
                  style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: page === i ? 'none' : '1px solid rgba(15,23,42,0.1)', backgroundColor: page === i ? '#101828' : '#fff', color: page === i ? '#fff' : '#667085', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
                >{i + 1}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
                style={{ padding: '10px 20px', border: '1px solid rgba(15,23,42,0.1)', backgroundColor: page === totalPages - 1 ? '#F7F7F5' : '#fff', color: page === totalPages - 1 ? '#D0D5DD' : '#101828', fontSize: '13px', fontWeight: 600, cursor: page === totalPages - 1 ? 'default' : 'pointer' }}
              ><E id="notices_pagination.next" editMode={editMode}>다음</E></button>
            </div>
          )}
        </div>
      </section>
      {editMode && <style>{EDITABLE_STYLES}</style>}
    </div>
  );
}
