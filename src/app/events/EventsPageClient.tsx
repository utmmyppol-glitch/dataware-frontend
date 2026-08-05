'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';
import { api, type PostResponse, type PageResponse } from '@/lib/api';
import { formatDateDot as formatDate } from '@/lib/format';
import EditMarker from '@/components/EditMarker';

interface EventDetail {
  tag?: string;
  tagColor?: string;
  status?: string;
}

function parseDetail(post: PostResponse): EventDetail {
  if (!post.detailJson) return { tag: '이벤트', tagColor: '#36c88a', status: '종료' };
  try { return JSON.parse(post.detailJson); } catch { return { tag: '이벤트', tagColor: '#36c88a', status: '종료' }; }
}

export default function EventsPageClient() {
  const PER_PAGE = 4;
  const [events, setEvents] = useState<PostResponse[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [openId, setOpenId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const heroRef = useHeroAnim();
  const contentRef = useGsapReveal();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setLoading(true);
    api.getPosts('EVENT', page, PER_PAGE)
      .then((data: PageResponse<PostResponse>) => {
        setEvents(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
      })
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, [page]);

  const paged = events;

  return (
    <main style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* ═══════════════════════════════════════════
          HERO — Dark cinematic
          ═══════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#0B1220', paddingTop: '160px', paddingBottom: '100px', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
          <div style={{ position: 'absolute', top: '10%', right: '15%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(54,200,138,0.05) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: '-5%', right: '-2%', fontSize: 'clamp(100px, 16vw, 240px)', fontWeight: 900, color: 'rgba(255,255,255,0.015)', letterSpacing: '-0.05em', lineHeight: 1 }}>EVENT</div>
        </div>

        <div ref={heroRef} style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div data-hero style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em' }}>01</span>
            <div style={{ width: '32px', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.14em' }}>EVENTS</span>
          </div>

          <h1 data-hero style={{ fontSize: 'clamp(40px, 5.5vw, 64px)', fontWeight: 800, color: '#F9FAFB', letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: '20px' }}>
            이벤트<span style={{ color: '#36c88a', fontSize: '1.1em' }}>.</span>
          </h1>
          <p data-hero style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: '460px' }}>
            DATAWARE 최신 이벤트, 웨비나, 프로모션 소식을 확인하세요.
          </p>

          {/* Quick stats */}
          <div data-hero style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '40px' }}>
            <div>
              <span style={{ fontSize: '28px', fontWeight: 700, color: '#F9FAFB' }}>{totalElements}</span>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '2px' }}>전체 이벤트</p>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(54,200,138,0.3), transparent)' }} />
      </section>

      {/* ═══════════════════════════════════════════
          CONTENT — Featured + List
          ═══════════════════════════════════════════ */}
      <div ref={contentRef} style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 24px', position: 'relative' }}>
        <EditMarker path="/dataware/posts" />
        <div key={page} className="page-fade" style={{ minHeight: '600px' }}>

        {/* Events — clickable list with detail */}
        {loading && <p style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>불러오는 중...</p>}
        <div style={{ borderTop: '1px solid rgba(15,23,42,0.08)' }}>
          {paged.map((event) => {
            const isOpen = openId === event.id;
            const detail = parseDetail(event);
            const tag = detail.tag || '이벤트';
            const tagColor = detail.tagColor || '#36c88a';
            const status = detail.status || '종료';
            return (
              <article key={event.id} data-anim style={{ borderBottom: '1px solid rgba(15,23,42,0.06)' }}>
                {/* Row header — always visible */}
                <div
                  onClick={() => setOpenId(isOpen ? null : event.id)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '100px 80px 56px 1fr auto',
                    gap: '20px',
                    alignItems: 'center',
                    padding: '28px 0',
                    transition: 'padding-left 0.25s, background 0.2s',
                    cursor: 'pointer',
                    backgroundColor: isOpen ? '#fafafa' : 'transparent',
                    paddingLeft: isOpen ? '16px' : '0',
                  }}
                  onMouseEnter={e => { if (!isOpen) { e.currentTarget.style.paddingLeft = '16px'; e.currentTarget.style.backgroundColor = '#fafafa'; } }}
                  onMouseLeave={e => { if (!isOpen) { e.currentTarget.style.paddingLeft = '0'; e.currentTarget.style.backgroundColor = ''; } }}
                >
                  <span style={{ fontSize: '13px', color: '#98A2B3', fontWeight: 500 }}>{formatDate(event.createdAt)}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: tagColor }}>
                    <span style={{ width: '6px', height: '6px', backgroundColor: tagColor }} />
                    {tag}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: status === '진행중' ? '#5b9a7d' : '#98A2B3' }}>{status}</span>
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#101828', marginBottom: '4px', lineHeight: 1.3 }}>{event.title}</h3>
                    {!isOpen && <p style={{ fontSize: '14px', color: '#98A2B3', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.excerpt}</p>}
                  </div>
                  <svg width="16" height="16" fill="none" stroke="#D0D5DD" strokeWidth="1.5" viewBox="0 0 24 24" style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Detail — expanded */}
                {isOpen && (
                  <div style={{ padding: '0 0 32px 16px', animation: 'fadeInUp 0.3s ease-out' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: event.thumbnailUrl ? '280px 1fr' : '1fr', gap: '32px', alignItems: 'start' }}>
                      {event.thumbnailUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={event.thumbnailUrl} alt={event.title} style={{ width: '100%', height: 'auto', border: '1px solid rgba(15,23,42,0.06)' }} loading="lazy"
                          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                        />
                      )}
                      <div>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: '#fff', backgroundColor: tagColor, padding: '3px 10px' }}>{tag}</span>
                          <span style={{ fontSize: 11, fontWeight: 600, color: status === '진행중' ? '#fff' : '#98A2B3', backgroundColor: status === '진행중' ? '#5b9a7d' : '#f1f5f9', padding: '3px 10px' }}>{status}</span>
                        </div>
                        <p style={{ fontSize: 15, color: '#475467', lineHeight: 1.8, whiteSpace: 'pre-line', marginBottom: 24 }}>{event.content}</p>
                        <div style={{ display: 'flex', gap: 12 }}>
                          <Link href="/contact" style={{ padding: '12px 24px', backgroundColor: '#101828', color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none', transition: 'opacity 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
                            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                          >문의하기</Link>
                          <Link href="/download" style={{ padding: '12px 24px', border: '1px solid rgba(15,23,42,0.08)', color: '#101828', fontSize: 14, fontWeight: 600, textDecoration: 'none', transition: 'border-color 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#36c88a'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(15,23,42,0.08)'; }}
                          >소개서 다운로드</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
        </div>{/* close page-fade */}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '56px' }}>
            <button onClick={() => { setPage(p => Math.max(0, p - 1)); }} disabled={page === 0}
              style={{ padding: '10px 20px', border: '1px solid rgba(15,23,42,0.1)', backgroundColor: page === 0 ? '#F7F7F5' : '#fff', color: page === 0 ? '#D0D5DD' : '#101828', fontSize: '13px', fontWeight: 600, cursor: page === 0 ? 'default' : 'pointer' }}
            >이전</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => { setPage(i); }}
                style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: page === i ? 'none' : '1px solid rgba(15,23,42,0.1)', backgroundColor: page === i ? '#101828' : '#fff', color: page === i ? '#fff' : '#667085', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
              >{i + 1}</button>
            ))}
            <button onClick={() => { setPage(p => Math.min(totalPages - 1, p + 1)); }} disabled={page === totalPages - 1}
              style={{ padding: '10px 20px', border: '1px solid rgba(15,23,42,0.1)', backgroundColor: page === totalPages - 1 ? '#F7F7F5' : '#fff', color: page === totalPages - 1 ? '#D0D5DD' : '#101828', fontSize: '13px', fontWeight: 600, cursor: page === totalPages - 1 ? 'default' : 'pointer' }}
            >다음</button>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════
          CTA — 2-column split
          ═══════════════════════════════════════════ */}
      <div className="grid md:grid-cols-2">
        <Link href="/contact" className="group" style={{ backgroundColor: '#101828', padding: '72px 48px', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '280px', position: 'relative', overflow: 'hidden', transition: 'background 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1e293b'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#101828'; }}
        >
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.01) 1px, transparent 1px)', backgroundSize: '20px 20px', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>STAY UPDATED</span>
            <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#F9FAFB', marginTop: '12px', lineHeight: 1.3, letterSpacing: '-0.02em' }}>이벤트 소식을<br />놓치지 마세요</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginTop: '12px', lineHeight: 1.6, maxWidth: '320px' }}>도입문의 신청 시 최신 이벤트 및 프로모션 정보를 먼저 받아보실 수 있습니다.</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '24px', fontSize: '14px', fontWeight: 600, color: '#36c88a' }}>
              도입문의 신청 <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
            </div>
          </div>
        </Link>

        <Link href="/download" className="group" style={{ backgroundColor: '#36c88a', padding: '72px 48px', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '280px', position: 'relative', overflow: 'hidden', transition: 'filter 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.92)'; }}
          onMouseLeave={e => { e.currentTarget.style.filter = ''; }}
        >
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}>DOWNLOAD</span>
            <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginTop: '12px', lineHeight: 1.3 }}>무료 다운로드</h3>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '24px', fontSize: '14px', fontWeight: 600, color: '#fff' }}>
              소개서 받기 <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
            </div>
          </div>
          <div aria-hidden="true" style={{ position: 'absolute', bottom: '-10px', right: '20px', fontSize: '120px', fontWeight: 900, color: 'rgba(255,255,255,0.1)', lineHeight: 1, pointerEvents: 'none' }}>DL</div>
        </Link>
      </div>
    </main>
  );
}
