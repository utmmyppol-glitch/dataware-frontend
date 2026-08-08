'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api, type CustomerStoryResponse } from '@/lib/api';
import EditMarker from '@/components/EditMarker';
import { useEditMode, useEditableManifest, EDITABLE_STYLES, E } from '@/lib/editable';

const ACCENT = '#36c88a';

interface CustomerDetail {
  companyDesc?: string;
  pageHeading?: string;
  background?: string[];
  features?: string[];
  effects?: string[];
  quote?: string;
  quoteSource?: string;
  mainImage?: string;
  detailImage?: string;
  meta?: {
    date?: string;
    industry?: string;
    purpose?: string;
  };
}

function parseDetail(json: string | null): CustomerDetail {
  if (!json) return {};
  try { return JSON.parse(json); } catch { return {}; }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return `${m}월 ${String(day).padStart(2, '0')}, ${d.getFullYear()}`;
}

export default function CustomerDetailClient({ slug }: { slug: string }) {
  const editMode = useEditMode();
  useEditableManifest(editMode);
  const [story, setStory] = useState<CustomerStoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const id = Number(slug);
    const fetcher = isNaN(id) ? api.getCustomerStoryBySlug(slug) : api.getCustomerStory(id);
    fetcher
      .then(setStory)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#94a3b8' }}><E id="customer_detail.loading" editMode={editMode}>불러오는 중...</E></p>
      </main>
    );
  }

  if (error || !story) {
    return (
      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111111', margin: '0 0 10px' }}><E id="customer_detail.error_title" editMode={editMode}>페이지를 찾을 수 없습니다</E></h2>
          <p style={{ fontSize: '14px', color: '#676767', margin: '0 0 24px' }}><E id="customer_detail.error_desc" editMode={editMode}>요청하신 고객사례를 찾을 수 없습니다.</E></p>
          <Link href="/customers" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: ACCENT, color: '#ffffff', fontSize: '14px', fontWeight: '600', padding: '10px 22px', textDecoration: 'none' }}>
            <E id="customer_detail.error_link" editMode={editMode}>고객사례 목록으로 돌아가기</E>
          </Link>
        </div>
      </main>
    );
  }

  const detail = parseDetail(story.detailJson);
  const metaDate = detail.meta?.date || story.createdAt;
  const metaIndustry = detail.meta?.industry || story.industry || '';
  const metaPurpose = detail.meta?.purpose || '';

  return (
    <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', position: 'relative' }}>
      <EditMarker path="/dataware/customer-stories" id={story.id} />
      {/* ── 회사명 대제목 ── */}
      <section style={{ borderBottom: '1px solid #e6e8ec', padding: '80px 24px 48px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Link href="/customers" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#667085', textDecoration: 'none', marginBottom: 24, transition: 'color 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = ACCENT; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#667085'; }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            <E id="customer_detail.back_link" editMode={editMode}>고객사례 목록으로</E>
          </Link>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, color: '#101828', letterSpacing: '-0.03em', margin: 0, textAlign: 'center' }}>
            <E id="customer_detail.company" editMode={editMode}>{story.company}</E>
          </h1>
        </div>
      </section>

      {/* ── 날짜 + 메타 / 제목 + 메인 이미지 ── */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 48, alignItems: 'start' }}>
          <div>
            <span style={{ display: 'inline-block', fontSize: 13, color: '#667085', border: '1px solid #e6e8ec', padding: '6px 14px', marginBottom: 28 }}>
              {formatDate(metaDate)}
            </span>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#101828', marginBottom: 6 }}>{story.company}</h3>
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#101828', marginBottom: 2 }}><E id="customer_detail.label_industry" editMode={editMode}>업종:</E></p>
              <p style={{ fontSize: 13, color: '#667085' }}>{metaIndustry}</p>
            </div>
            {metaPurpose && (
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#101828', marginBottom: 2 }}><E id="customer_detail.label_purpose" editMode={editMode}>목적 · 효과:</E></p>
                <p style={{ fontSize: 13, color: '#667085', lineHeight: 1.6 }}>{metaPurpose}</p>
              </div>
            )}
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: '#101828', lineHeight: 1.35, marginBottom: 28, textAlign: 'center' }}>
              {detail.pageHeading || story.title}
            </h2>
            {(detail.mainImage || story.thumbnailUrl) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={detail.mainImage || story.thumbnailUrl} alt={story.company} style={{ width: '100%', height: 'auto', display: 'block' }} />
            )}
          </div>
        </div>
      </section>

      {/* ── 상세 내용 ── */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 64px' }}>
        {detail.companyDesc && (
          <div style={{ borderTop: '1px solid #e6e8ec', paddingTop: 40, marginBottom: 40 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#101828', marginBottom: 12, paddingLeft: 16, borderLeft: `3px solid ${ACCENT}` }}>{story.company}</h3>
            <p style={{ fontSize: 15, color: '#475467', lineHeight: 1.8 }}>{detail.companyDesc}</p>
          </div>
        )}

        {detail.background && detail.background.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <span style={{ display: 'inline-block', fontSize: 14, fontWeight: 700, color: ACCENT, border: `1px solid ${ACCENT}`, padding: '8px 20px', marginBottom: 20 }}><E id="customer_detail.badge_background" editMode={editMode}>도입 배경</E></span>
            <ul style={{ margin: 0, paddingLeft: 20, listStyle: 'disc' }}>
              {detail.background.map((item, i) => (
                <li key={i} style={{ fontSize: 15, color: '#475467', lineHeight: 1.8, marginBottom: 6 }}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {detail.features && detail.features.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <span style={{ display: 'inline-block', fontSize: 14, fontWeight: 700, color: ACCENT, border: `1px solid ${ACCENT}`, padding: '8px 20px', marginBottom: 20 }}><E id="customer_detail.badge_solutions" editMode={editMode}>적용 솔루션</E></span>
            <ul style={{ margin: 0, paddingLeft: 20, listStyle: 'disc' }}>
              {detail.features.map((feat, i) => (
                <li key={i} style={{ fontSize: 15, color: '#475467', lineHeight: 1.8, marginBottom: 6 }}>{feat}</li>
              ))}
            </ul>
          </div>
        )}

        {detail.detailImage && (
          <div style={{ marginBottom: 40 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={detail.detailImage} alt={`${story.company} 시스템 구성`} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        )}

        {detail.effects && detail.effects.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <span style={{ display: 'inline-block', fontSize: 14, fontWeight: 700, color: ACCENT, border: `1px solid ${ACCENT}`, padding: '8px 20px', marginBottom: 20 }}><E id="customer_detail.badge_effects" editMode={editMode}>도입 효과</E></span>
            <ul style={{ margin: 0, paddingLeft: 20, listStyle: 'disc' }}>
              {detail.effects.map((effect, i) => (
                <li key={i} style={{ fontSize: 15, color: '#475467', lineHeight: 1.8, marginBottom: 6 }}>{effect}</li>
              ))}
            </ul>
          </div>
        )}

        {detail.quote && (
          <div style={{ padding: '32px', backgroundColor: '#f9fafb', borderLeft: `4px solid ${ACCENT}`, marginBottom: 40 }}>
            <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.9, margin: 0, whiteSpace: 'pre-line' }}>{detail.quote}</p>
            {detail.quoteSource && (
              <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 16, textAlign: 'right' }}>— {detail.quoteSource}</p>
            )}
          </div>
        )}

        {/* detailJson 없으면 content 본문 표시 */}
        {!story.detailJson && story.content && (
          <div style={{ marginBottom: 40 }}>
            <div className="rich-html" style={{ fontSize: 15, color: '#475467', lineHeight: 1.8 }}
              dangerouslySetInnerHTML={{ __html: story.content || '' }} />
          </div>
        )}

        <div style={{ paddingTop: 32, borderTop: '1px solid #e6e8ec' }}>
          <Link href="/customers" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#676767', textDecoration: 'none', backgroundColor: '#f6f8fa', border: '1px solid #e6e8ec', padding: '12px 20px' }}>
            <E id="customer_detail.back_btn" editMode={editMode}>← 고객사례 목록으로</E>
          </Link>
        </div>
      </section>

      {/* ═══ 임팩트 CTA ═══ */}
      <section style={{ position: 'relative', background: 'linear-gradient(135deg, #0b1220 0%, #0f172a 60%, #101828 100%)', overflow: 'hidden', padding: 'clamp(64px, 10vw, 100px) 24px', textAlign: 'center' }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: ACCENT, letterSpacing: '0.12em', marginBottom: 20 }}><E id="customer_detail_cta.badge" editMode={editMode}>NEXT STEP</E></p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#F9FAFB', lineHeight: 1.2, marginBottom: 20 }}>
            <E id="customer_detail_cta.title" editMode={editMode}>다음 성공사례의 주인공이 되어보세요</E><span style={{ color: ACCENT }}>.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 40 }}>
            <E id="customer_detail_cta.desc" editMode={editMode}>3,000+ 기업이 선택한 데이터 거버넌스 솔루션, 지금 바로 전문가와 상담하세요.</E>
          </p>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '18px 48px', fontSize: 17, fontWeight: 700, color: '#fff', backgroundColor: ACCENT, textDecoration: 'none', boxShadow: `0 0 24px ${ACCENT}50, 0 8px 32px rgba(0,0,0,0.3)` }}>
            <E id="customer_detail_cta.btn" editMode={editMode}>도입문의 하기</E>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>
      {editMode && <style>{EDITABLE_STYLES}</style>}
    </main>
  );
}
