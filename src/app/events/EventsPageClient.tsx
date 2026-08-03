'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';
import { formatDateDot as formatDate } from '@/lib/format';
import { E, safeParse, useEditMode, useEditableManifest, EDITABLE_STYLES } from '@/lib/editable';

const STATIC_EVENTS = [
  {
    id: 19,
    title: '2025 DA# 조달 캠페인',
    date: '2025-11-03',
    excerpt: '2025 연말 맞이 DA# 조달 구매 캠페인. NO.1 데이터 모델링 툴 DA# 도입과 함께 따뜻한 한 끼를 전하세요! 솔루션 도입을 넘어 사회적 가치 실현까지!',
    detail: '2025 연말 맞이 DA# 조달 구매 캠페인입니다.\n\nNO.1 데이터 모델링 툴 DA# 도입과 함께 따뜻한 한 끼를 전하세요!\n솔루션 도입을 넘어 사회적 가치 실현까지!\n\n• 대상: 조달청 나라장터를 통한 DA# 신규 구매 고객\n• 혜택: 구매 고객 전원 기부 참여 + 무료 교육 제공\n• 문의: 02-706-8999',
    image: '/images/uniondata/%EC%9C%A0%EB%8B%88%EC%98%A82025DA_%EC%A1%B0%EB%8B%AC%EA%B5%AC%EB%A7%A4%EC%BA%A0%ED%8E%98%EC%9D%B8.png',
    tag: '이벤트',
    tagColor: '#36c88a',
    status: '진행중',
  },
  {
    id: 18,
    title: 'DA~드리는 DA# 여름 할인 이벤트',
    date: '2025-07-01',
    excerpt: 'AI 시대 데이터 자산화 전략 START! DA# 여름 할인 이벤트. 빠른 결정, 더욱 합리적인 혜택! 2025년 8월 29일까지 이번 여름 마지막 기회를 놓치지 마세요~!',
    detail: 'AI 시대 데이터 자산화 전략 START!\n\nDA# 여름 할인 이벤트\n빠른 결정, 더욱 합리적인 혜택!\n\n• 기간: 2025년 7월 1일 ~ 8월 29일\n• 대상: DA# 신규 구매 고객\n• 혜택: 특별 할인가 적용\n• 문의: 02-706-8999',
    image: '/images/uniondata/0707_head.png',
    tag: '프로모션',
    tagColor: '#f59e0b',
    status: '진행중',
  },
  {
    id: 17,
    title: '2025 을사년 맞이 BBAM! 프로모션',
    date: '2025-02-03',
    excerpt: '2025년 을사년 맞이 기간 내 신규 구매 고객께 BBAM!하게 드리는 구매 프로모션. 견적 문의 02-706-8999',
    detail: '2025년 을사년 맞이 BBAM! 프로모션\n\n기간 내 신규 구매 고객께 BBAM!하게 드리는 구매 프로모션입니다.\n\n• 기간: 2025년 2월 3일 ~ 3월 31일\n• 대상: DA# 신규 구매 고객\n• 견적 문의: 02-706-8999',
    image: '/images/uniondata/0000.png',
    tag: '프로모션',
    tagColor: '#f59e0b',
    status: '종료',
  },
  {
    id: 16,
    title: 'DATAWARE DA# 통합 패키지 출시 이벤트',
    date: '2024-11-29',
    excerpt: '4개 제품 스펙을 하나의 라이선스로! DA# 통합 패키지 출시 기념 이벤트. 제품 구매 문의 고객 선착순 30분께 모바일 주유권을 제공합니다.',
    detail: 'DATAWARE DA# 통합 패키지 출시 이벤트\n\n4개 제품 스펙을 하나의 라이선스로!\nDA# 통합 패키지 출시 기념 이벤트입니다.\n\n• 혜택: 제품 구매 문의 고객 선착순 30분께 모바일 주유권 제공\n• 포함 제품: DA# Architecture + DQ Edition + Contents Builder + AI Powered Pack\n• 문의: 02-706-8999',
    image: '/images/uniondata/0000-1.png',
    tag: '이벤트',
    tagColor: '#36c88a',
    status: '종료',
  },
  {
    id: 14,
    title: 'DA# 보상판매 이벤트',
    date: '2024-03-31',
    excerpt: '국산 모델링 S/W 시장 점유율 및 인지도 1위 기념! 2024 데이터 모델링 툴 DA# 보상판매 이벤트. 최대 55% 할인!',
    detail: '국산 모델링 S/W 시장 점유율 및 인지도 1위 기념!\n\n2024 데이터 모델링 툴 DA# 보상판매 이벤트\n최대 55% 할인!\n\n• 기간: 2024년 10월 1일 ~ 12월 31일\n• 조건: 기존 타 브랜드 정품 보유 시 인증 조건으로 할인 구매 가능\n• 할인가: 8,970,000원 → 4,000,000원\n• 문의: 02-706-8999',
    image: '/images/uniondata/2023_thum.jpg',
    tag: '프로모션',
    tagColor: '#f59e0b',
    status: '종료',
  },
  {
    id: 15,
    title: '2024 갑진년 맞이 값진 구매 프로모션',
    date: '2024-01-23',
    excerpt: '2024 청룡의 해 갑진년 맞이 유니온시스템즈와 함께 하는 값진 구매 프로모션! 선착순 24분께만 드리는 특별 혜택.',
    detail: '2024 갑진년 맞이 값진 구매 프로모션\n\n2024 청룡의 해 갑진년 맞이\n유니온시스템즈와 함께 하는 값진 구매 프로모션!\n\n• 혜택: 선착순 24분께만 드리는 특별 혜택\n• 문의: 02-706-8999',
    image: '',
    tag: '프로모션',
    tagColor: '#f59e0b',
    status: '종료',
  },
  {
    id: 13,
    title: 'DA# 프로젝트 라이선스 출시 이벤트',
    date: '2022-12-06',
    excerpt: 'DA# 프로젝트 라이선스 출시 이벤트',
    detail: 'DA# 프로젝트 라이선스 출시 이벤트\n\n• 기간: 2023.01.01 ~ 2023.12.31\n• 문의: 02-706-8999',
    image: '',
    tag: '이벤트',
    tagColor: '#36c88a',
    status: '종료',
  },
  {
    id: 12,
    title: '공공데이터 품질관리 수준평가 대응 설명회',
    date: '2022-08-26',
    excerpt: '공공데이터 품질관리 수준평가 대응 설명회',
    detail: '공공데이터 품질관리 수준평가 대응 설명회\n\n• 문의: 02-706-8999',
    image: '/images/uniondata/0922-001.png',
    tag: '설명회',
    tagColor: '#8b5cf6',
    status: '종료',
  },
  {
    id: 11,
    title: 'ERD 시연, 데이터 관계파악 설명회',
    date: '2022-03-14',
    excerpt: 'ERD 시연, 데이터 관계파악 설명회',
    detail: 'ERD 시연, 데이터 관계파악 설명회\n\n• 문의: 02-706-8999',
    image: '',
    tag: '설명회',
    tagColor: '#8b5cf6',
    status: '종료',
  },
  {
    id: 10,
    title: '찾아가는 데이터모델링 DA# 설명회',
    date: '2022-02-08',
    excerpt: '찾아가는 데이터모델링 DA# 설명회',
    detail: '찾아가는 데이터모델링 DA# 설명회\n\n• 문의: 02-706-8999',
    image: '',
    tag: '설명회',
    tagColor: '#8b5cf6',
    status: '종료',
  },
];

const DEFAULT_HERO = { title: '이벤트', desc: 'DATAWARE 최신 이벤트, 웨비나, 프로모션 소식을 확인하세요.' };

export default function EventsPageClient({ ssrContent }: { ssrContent: Record<string, string> }) {
  const [events] = useState(STATIC_EVENTS);
  const [openId, setOpenId] = useState<number | null>(null);
  const heroRef = useHeroAnim();
  const editMode = useEditMode();
  useEditableManifest(editMode);
  const contentRef = useGsapReveal();

  const [hero, setHero] = useState(() => safeParse(ssrContent.events_hero, DEFAULT_HERO));

  useEffect(() => {
    if (!editMode) return;
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'content-update' && e.data.section === 'events_hero') {
        setHero(e.data.data);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [editMode]);

  const PER_PAGE = 4;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(events.length / PER_PAGE);
  const paged = events.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

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
            <E id="events_hero.title" editMode={editMode}>{hero.title}</E><span style={{ color: '#36c88a', fontSize: '1.1em' }}>.</span>
          </h1>
          <p data-hero style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: '460px' }}>
            <E id="events_hero.desc" editMode={editMode}>{hero.desc}</E>
          </p>

          {/* Quick stats */}
          <div data-hero style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '40px' }}>
            <div>
              <span style={{ fontSize: '28px', fontWeight: 700, color: '#F9FAFB' }}>{events.length}</span>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '2px' }}>전체 이벤트</p>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(54,200,138,0.3), transparent)' }} />
      </section>

      {/* ═══════════════════════════════════════════
          CONTENT — Featured + List
          ═══════════════════════════════════════════ */}
      <div ref={contentRef} style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 24px' }}>
        <div key={page} className="page-fade" style={{ minHeight: '600px' }}>

        {/* Events — clickable list with detail */}
        <div style={{ borderTop: '1px solid rgba(15,23,42,0.08)' }}>
          {paged.map((event) => {
            const isOpen = openId === event.id;
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
                  <span style={{ fontSize: '13px', color: '#98A2B3', fontWeight: 500 }}>{formatDate(event.date)}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: event.tagColor }}>
                    <span style={{ width: '6px', height: '6px', backgroundColor: event.tagColor }} />
                    {event.tag}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: event.status === '진행중' ? '#5b9a7d' : '#98A2B3' }}>{event.status}</span>
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
                    <div style={{ display: 'grid', gridTemplateColumns: event.image ? '280px 1fr' : '1fr', gap: '32px', alignItems: 'start' }}>
                      {event.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={event.image} alt={event.title} style={{ width: '100%', height: 'auto', border: '1px solid rgba(15,23,42,0.06)' }} loading="lazy"
                          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                        />
                      )}
                      <div>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: '#fff', backgroundColor: event.tagColor, padding: '3px 10px' }}>{event.tag}</span>
                          <span style={{ fontSize: 11, fontWeight: 600, color: event.status === '진행중' ? '#fff' : '#98A2B3', backgroundColor: event.status === '진행중' ? '#5b9a7d' : '#f1f5f9', padding: '3px 10px' }}>{event.status}</span>
                        </div>
                        <p style={{ fontSize: 15, color: '#475467', lineHeight: 1.8, whiteSpace: 'pre-line', marginBottom: 24 }}>{event.detail}</p>
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

      {editMode && <style>{EDITABLE_STYLES}</style>}
    </main>
  );
}
