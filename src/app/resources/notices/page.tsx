'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';

interface Notice {
  id: number;
  title: { rendered: string };
  date: string;
  slug: string;
  excerpt: { rendered: string };
  content?: string;
  thumbnail?: string;
}

const STATIC_NOTICES: Notice[] = [
  {
    id: 1,
    title: { rendered: 'DA#_DQ_Edition 조달청 나라장터 등록' },
    date: '2021-11-22',
    slug: 'da-dq-edition-g2b',
    excerpt: { rendered: 'DA#-DQ# 패키지로 구성해 데이터 표준화 기반의 체계적인 품질진단 지원. 공공데이터 품질관리 수준평가에 대응하기 위한 최적의 툴 제공.' },
    content: '\'DA#\'-\'DQ#\' 패키지로 구성해 데이터 표준화 기반의 체계적인 품질진단 지원\n공공데이터 품질관리 수준평가에 대응하기 위한 최적의 툴 제공\n\n데이터 비즈니스 전문기업 엔코아(대표 이화식)가 자사의 \'데이터웨어 디에이샵 디큐에디션(DATAWARE DA#_DQ Edition)\'이 조달청 나라장터에 등록되었다고 밝혔다.',
    thumbnail: '/images/uniondata/0.png',
  },
  {
    id: 2,
    title: { rendered: '[리뷰] 데이터 품질진단 DA# DQ_Edition' },
    date: '2021-06-02',
    slug: 'review-da-dq-edition',
    excerpt: { rendered: '데이터 모델링과 품질진단 자동화로 관리 효율성 향상. 코로나19 팬데믹 사태로 비대면 활성화와 클라우드 활용이 필수적인 시대.' },
    content: '데이터 모델링과 품질진단 자동화로 관리 효율성 향상\n\n[아이티데일리] 지속되고 있는 코로나19 팬더믹 사태는 비즈니스 환경을 빠르게 변화시키고 있다. 비대면이 활성화되고 재택근무가 일상이 되면서 정보를 공유할 수 있는 클라우드의 활용은 필수적이 되었고, 공유된 정보와 온라인상에서 정보 보호를 위하여 개인정보보호를 위한 컴퓨팅도 많이 활용되고 있다.\n\n엔코아가 제안하는 디에이샵 디큐 에디션은 데이터 모델링과 품질진단을 한 번에 지원하는 솔루션으로 데이터 모델링 툴 DA#과 데이터 품질관리 솔루션 DQ#의 품질진단 기능을 하나의 패키지로 구성한 제품이다.\n\n출처: IT DAILY',
    thumbnail: '/images/uniondata/0-1.png',
  },
  {
    id: 3,
    title: { rendered: '[리뷰] 데이터모델링 DA#' },
    date: '2021-06-01',
    slug: 'review-da-sharp',
    excerpt: { rendered: '차세대 프로젝트에서 단위 업무 모델링까지, 개발 생산성과 성능 제고. 데이터 비즈니스의 기본, 데이터 모델링 툴.' },
    content: '차세대 프로젝트에서 단위 업무 모델링까지, 개발 생산성과 성능 제고\n\n[아이티데일리] 데이터 비즈니스의 기본, 데이터 모델링 툴. 체계적인 기업의 데이터 품질 관리는 데이터 모델링에서 시작된다.\n\n출처: IT DAILY',
    thumbnail: '/images/uniondata/0000.png',
  },
  {
    id: 4,
    title: { rendered: 'DA# DQ_Edition GS인증 1등급' },
    date: '2021-05-30',
    slug: 'da-dq-edition-gs-cert',
    excerpt: { rendered: '엔코아가 데이터 표준화 기반 데이터 품질진단 솔루션 DA# DQ Edition이 굿소프트웨어(GS)인증 1등급을 획득했다고 밝혔다.' },
    content: '엔코아(대표 이화식)가 데이터 표준화 기반 데이터 품질진단 솔루션 \'디에이샵 디큐 에디션\'이 굿소프트웨어(GS)인증 1등급을 획득했다고 24일 밝혔다.',
    thumbnail: '/images/uniondata/0000-1.png',
  },
  {
    id: 5,
    title: { rendered: '유니온시스템즈 DA# 리뉴얼 오픈' },
    date: '2021-05-01',
    slug: 'da-sharp-renewal-open',
    excerpt: { rendered: '넓어진 화면, 모바일 검색, 디지털 환경 변화에 맞춰 정보를 전달하는데 기존 홈페이지는 부족함이 있었습니다.' },
    content: '넓어진 화면, 모바일 검색, 디지털 환경 변화에 맞춰 정보를 전달하는데 기존의 홈페이지는 부족함이 있었습니다.\n\n이번 리뉴얼을 통해 DA#과 DA# DQ_Edition 기능, 모델링도구 팁과 활용법, 칼럼, 온&오프라인 참여 가능한 교육 등 다양한 정보를 보다 쉽게 확인하실 수 있습니다.',
    thumbnail: '/images/uniondata/board__notice.png',
  },
  {
    id: 6,
    title: { rendered: '엔코아·유니온시스템즈 DA# 총판 협약' },
    date: '2021-02-24',
    slug: 'encore-unionsystems-dealer-agreement',
    excerpt: { rendered: '엔코아가 데이터 통합관리 솔루션 DATAWARE 주력 제품인 데이터 모델링 툴 DA# 시장 확대를 위해 유니온시스템즈와 총판 협약을 체결했다.' },
    content: '엔코아(대표 이화식)가 데이터 통합관리 솔루션 \'데이터웨어\' 주력 제품인 데이터 모델링 툴 \'디에이샵(DA#)\' 시장 확대를 위해 유니온시스템즈와 총판 협약을 체결했다.',
    thumbnail: '/images/uniondata/education-list_img-01.png',
  },
];

function formatDate(d: string) {
  const dt = new Date(d);
  return `${dt.getFullYear()}.${String(dt.getMonth() + 1).padStart(2, '0')}.${String(dt.getDate()).padStart(2, '0')}`;
}

function stripHtml(html: string) { return html.replace(/<[^>]*>/g, '').trim(); }

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>(STATIC_NOTICES);
  const [loading, setLoading] = useState(false);
  const [openId, setOpenId] = useState<number | null>(null);
  const heroRef = useHeroAnim();
  const listRef = useGsapReveal();

  const PER_PAGE = 8;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(notices.length / PER_PAGE);
  const paged = notices.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/posts?category=NOTICE&per_page=20', { cache: 'no-store' });
        if (res.ok) { const data = await res.json(); if (Array.isArray(data) && data.length > 0) setNotices(data); }
      } catch { /* static fallback */ } finally { setLoading(false); }
    })();
  }, []);

  return (
    <div style={{ background: '#ffffff' }}>

      {/* ── 1. Dark Hero Banner ── */}
      <section
        className="grid-bg"
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

      {/* ── 2. Notices List ── */}
      <section className="section-pad">
        <div ref={listRef} className="wrap" style={{ maxWidth: 900, margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
              <div style={{ width: 32, height: 32, border: '3px solid #e2e8f0', borderTopColor: '#36c88a', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
              <p style={{ fontSize: 14 }}>불러오는 중...</p>
            </div>
          ) : (
            <div>
              {/* Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 120px', gap: 16, padding: '12px 20px', backgroundColor: '#f8fafc', borderBottom: '2px solid var(--line)' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>이미지</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>제목</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'right' }}>날짜</span>
              </div>

              <div key={page} style={{ minHeight: '480px' }}>
                {paged.map((notice, idx) => {
                  const isOpen = openId === notice.id;
                  return (
                    <div key={notice.id} data-anim style={{ borderBottom: '1px solid var(--line)' }}>
                      {/* Row */}
                      <div
                        style={{ display: 'grid', gridTemplateColumns: '80px 1fr 120px', gap: 16, padding: '16px 20px', transition: 'background 0.15s', cursor: 'pointer', alignItems: 'center', backgroundColor: isOpen ? '#f8fafc' : 'transparent' }}
                        onClick={() => setOpenId(isOpen ? null : notice.id)}
                        onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.backgroundColor = '#f8fafc'; }}
                        onMouseLeave={(e) => { if (!isOpen) e.currentTarget.style.backgroundColor = 'transparent'; }}
                      >
                        {/* Thumbnail */}
                        <div style={{ width: 72, height: 52, flexShrink: 0, backgroundColor: '#f1f5f9', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {notice.thumbnail ? (
                            <img src={notice.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                          ) : (
                            <span style={{ fontSize: 20, color: '#cbd5e1' }}>📄</span>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', width: 28, flexShrink: 0, paddingTop: 2 }}>{String(page * PER_PAGE + idx + 1).padStart(2, '0')}</span>
                          <div>
                            <h3 style={{ fontSize: 15, fontWeight: 600, color: isOpen ? '#36c88a' : '#0f172a', lineHeight: 1.4, marginBottom: 4 }}>{notice.title.rendered}</h3>
                            <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{stripHtml(notice.excerpt.rendered)}</p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                          <span style={{ fontSize: 13, color: '#94a3b8', textAlign: 'right', paddingTop: 2 }}>{formatDate(notice.date)}</span>
                          {/* Chevron */}
                          <svg
                            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
                            style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
                          >
                            <path d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      {/* Expanded content */}
                      {isOpen && (
                        <div style={{ padding: '0 20px 28px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                          {/* Large thumbnail */}
                          {notice.thumbnail && (
                            <div style={{ marginTop: 24, marginBottom: 20, borderRadius: 8, overflow: 'hidden', maxWidth: 480 }}>
                              <img
                                src={notice.thumbnail}
                                alt={notice.title.rendered}
                                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                              />
                            </div>
                          )}
                          {/* Full content */}
                          <div style={{ fontSize: 14, color: '#334155', lineHeight: 1.8, whiteSpace: 'pre-line', marginBottom: 24 }}>
                            {notice.content ?? stripHtml(notice.excerpt.rendered)}
                          </div>
                          {/* CTA */}
                          <Link
                            href="/contact"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 6,
                              backgroundColor: '#36c88a', color: '#ffffff',
                              fontSize: 13, fontWeight: 700,
                              padding: '10px 22px', borderRadius: 6,
                              textDecoration: 'none',
                              boxShadow: '0 4px 14px rgba(54,200,138,.28)',
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#2ba876'; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#36c88a'; }}
                          >
                            도입문의
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--line)' }}>
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
          )}
        </div>
      </section>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
