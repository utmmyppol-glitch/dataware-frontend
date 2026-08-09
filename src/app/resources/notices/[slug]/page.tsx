'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api, type PostResponse } from '@/lib/api';
import { formatDateDot as formatDate } from '@/lib/format';
import EditMarker from '@/components/EditMarker';
import { useEditMode, useEditableManifest, EDITABLE_STYLES, E } from '@/lib/editable';

const ACCENT = '#36c88a';

export default function NoticeDetailPage() {
  const editMode = useEditMode();
  useEditableManifest(editMode);
  const params = useParams();
  const slug = params.slug as string;
  const [notice, setNotice] = useState<PostResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const id = Number(slug);
    const fetcher = isNaN(id) ? api.getPostBySlug(slug) : api.getPost(id);
    fetcher
      .then(setNotice)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#94a3b8' }}><E id="notice_detail.loading" editMode={editMode}>불러오는 중...</E></p>
      </main>
    );
  }

  if (error || !notice) {
    return (
      <main style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 10 }}><E id="notice_detail.not_found" editMode={editMode}>공지사항을 찾을 수 없습니다</E></h2>
          <Link href="/resources/notices" style={{ color: ACCENT, textDecoration: 'none', fontWeight: 600 }}><E id="notice_detail.back_link" editMode={editMode}>← 목록으로</E></Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: '#fff', minHeight: '100vh', position: 'relative' }}>
      <EditMarker path="/dataware/posts" id={notice.id} />
      {/* Hero */}
      <section style={{ backgroundColor: '#0B1220', paddingTop: 100, paddingBottom: 48 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <Link href="/" style={{ fontSize: 13, color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}><E id="notice_detail_breadcrumb.home" editMode={editMode}>홈</E></Link>
            <span style={{ color: 'rgba(255,255,255,.2)' }}>›</span>
            <Link href="/resources/notices" style={{ fontSize: 13, color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}><E id="notice_detail_breadcrumb.notices" editMode={editMode}>공지사항</E></Link>
            <span style={{ color: 'rgba(255,255,255,.2)' }}>›</span>
            <span style={{ fontSize: 13, color: ACCENT, fontWeight: 600 }}><E id="notice_detail_breadcrumb.current" editMode={editMode}>상세</E></span>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.3)', marginBottom: 12 }}>{formatDate(notice.createdAt)}</p>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#F9FAFB', lineHeight: 1.3 }}>{notice.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px 64px' }}>
        {notice.thumbnailUrl && (
          <div style={{ marginBottom: 36 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={notice.thumbnailUrl} alt={notice.title} style={{ width: '100%', maxHeight: 400, objectFit: 'contain', backgroundColor: '#f8fafc', border: '1px solid #e6e8ec' }} />
          </div>
        )}

        <div className="rich-html" style={{ fontSize: 16, color: '#334155', lineHeight: 2, marginBottom: 48 }}
          dangerouslySetInnerHTML={{ __html: notice.content || '' }} />

        {/* 목록 + 도입문의 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, flexWrap: 'wrap', gap: 12 }}>
          <Link href="/resources/notices" style={{ fontSize: 14, fontWeight: 600, color: '#667085', textDecoration: 'none', padding: '12px 20px', backgroundColor: '#f6f8fa', border: '1px solid #e6e8ec' }}>
            <E id="notice_detail.list_btn" editMode={editMode}>← 목록으로</E>
          </Link>
          <Link href="/contact" style={{ fontSize: 14, fontWeight: 600, color: '#fff', textDecoration: 'none', padding: '12px 24px', backgroundColor: ACCENT }}>
            <E id="notice_detail.contact_btn" editMode={editMode}>도입문의 →</E>
          </Link>
        </div>
      </section>
      {editMode && <style>{EDITABLE_STYLES}</style>}
    </main>
  );
}
