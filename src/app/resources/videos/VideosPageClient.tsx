'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDateDot as formatDate } from '@/lib/format';
import { E, safeParse, useEditMode, useEditableManifest, EDITABLE_STYLES } from '@/lib/editable';

interface Video {
  id: number;
  series: string;
  episode: string;
  title: string;
  speaker: string;
  duration: string;
  date: string;
  views: string;
  youtubeId: string;
  tag: string;
  tagColor: string;
}

const VIDEOS: Video[] = [
  {
    id: 1,
    series: 'DA#5 런칭 세미나',
    episode: 'Episode 1',
    title: '새로운 시대의 데이터모델링 — 이화식 대표',
    speaker: '이화식 대표 (엔코아)',
    duration: '',
    date: '2021-11-10',
    views: '',
    youtubeId: '33nGO8uZOQ8',
    tag: '세미나',
    tagColor: '#36c88a',
  },
  {
    id: 2,
    series: 'DA#5 런칭 세미나',
    episode: 'Episode 2',
    title: '개발스토리 — 정철원 디렉터',
    speaker: '정철원 디렉터 (엔코아)',
    duration: '',
    date: '2021-11-11',
    views: '',
    youtubeId: 'CLsXPIB6EH4',
    tag: '세미나',
    tagColor: '#36c88a',
  },
  {
    id: 3,
    series: 'DA#5 런칭 세미나',
    episode: 'Episode 3',
    title: '기본구조 및 개념 — 최광희 연구원',
    speaker: '최광희 연구원 (엔코아)',
    duration: '',
    date: '2021-11-11',
    views: '',
    youtubeId: 'V-8w2lXyiqY',
    tag: '세미나',
    tagColor: '#36c88a',
  },
  {
    id: 4,
    series: 'DA#5 런칭 세미나',
    episode: 'Episode 4',
    title: '달라진 모델링 — 정민수 연구원',
    speaker: '정민수 연구원 (엔코아)',
    duration: '',
    date: '2021-11-11',
    views: '',
    youtubeId: 'YMyKMXM3m4U',
    tag: '세미나',
    tagColor: '#36c88a',
  },
  {
    id: 5,
    series: 'DA#5 런칭 세미나',
    episode: 'Episode 5',
    title: 'API 그리고 편의기능 — 김기동 연구원',
    speaker: '김기동 연구원 (엔코아)',
    duration: '',
    date: '2021-11-11',
    views: '',
    youtubeId: 'CN93yT8UL44',
    tag: '세미나',
    tagColor: '#36c88a',
  },
  {
    id: 6,
    series: 'DA#5 런칭 세미나',
    episode: 'Episode 6',
    title: '초보자도 할 수 있는 현행모델 파헤치기 — 이임형 연구원',
    speaker: '이임형 연구원 (엔코아)',
    duration: '',
    date: '2021-11-11',
    views: '',
    youtubeId: '1qP1zbsChQc',
    tag: '세미나',
    tagColor: '#36c88a',
  },
  {
    id: 7,
    series: 'DA#5 튜토리얼',
    episode: 'Tutorial 1',
    title: '물리객체생성',
    speaker: '엔코아 기술지원팀',
    duration: '',
    date: '2021-11-22',
    views: '',
    youtubeId: 'HA7kcXJ3IIo',
    tag: '튜토리얼',
    tagColor: '#60a5fa',
  },
  {
    id: 8,
    series: 'DA#5 튜토리얼',
    episode: 'Tutorial 2',
    title: '여러물리모델',
    speaker: '엔코아 기술지원팀',
    duration: '',
    date: '2021-11-22',
    views: '',
    youtubeId: 'T1ZCYyOyL3Q',
    tag: '튜토리얼',
    tagColor: '#60a5fa',
  },
  {
    id: 9,
    series: 'DA#5 튜토리얼',
    episode: 'Tutorial 3',
    title: '서식적용',
    speaker: '엔코아 기술지원팀',
    duration: '',
    date: '2021-11-22',
    views: '',
    youtubeId: 'RXHDtaAUBKs',
    tag: '튜토리얼',
    tagColor: '#60a5fa',
  },
  {
    id: 10,
    series: 'DA#5 튜토리얼',
    episode: 'Tutorial 4',
    title: 'DB 리버스',
    speaker: '엔코아 기술지원팀',
    duration: '',
    date: '2021-11-22',
    views: '',
    youtubeId: 'jwNKCliYAEw',
    tag: '튜토리얼',
    tagColor: '#60a5fa',
  },
  {
    id: 11,
    series: 'DA#5 튜토리얼',
    episode: 'Tutorial 5',
    title: '리버스 후 모델 자동 배치',
    speaker: '엔코아 기술지원팀',
    duration: '',
    date: '2021-11-22',
    views: '',
    youtubeId: 'OAFBHAElESQ',
    tag: '튜토리얼',
    tagColor: '#60a5fa',
  },
  {
    id: 12,
    series: 'DA#5 튜토리얼',
    episode: 'Tutorial 6',
    title: '자동관계생성',
    speaker: '엔코아 기술지원팀',
    duration: '',
    date: '2021-11-22',
    views: '',
    youtubeId: 't12UZTlIR80',
    tag: '튜토리얼',
    tagColor: '#60a5fa',
  },
];

const DEFAULT_HERO = { title: '동영상 강의', desc: 'DA#5 런칭 세미나 및 튜토리얼 강의를 무료로 시청하세요.' };
const DEFAULT_CTA = { title: 'DA# 무료 교육도 신청해 보세요', desc: '강의 수강 후 실습 교육을 원하시면 무료교육 신청을 이용해 주세요.' };

export default function VideosPageClient({ ssrContent }: { ssrContent: Record<string, string> }) {
  const PER_PAGE = 6;
  const [page, setPage] = useState(0);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const editMode = useEditMode();
  useEditableManifest(editMode);

  const [hero, setHero] = useState(() => safeParse(ssrContent.videos_hero, DEFAULT_HERO));
  const [cta, setCta] = useState(() => safeParse(ssrContent.videos_cta, DEFAULT_CTA));

  useEffect(() => {
    if (!editMode) return;
    const setters: Record<string, (v: unknown) => void> = {
      videos_hero: setHero as (v: unknown) => void,
      videos_cta: setCta as (v: unknown) => void,
    };
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'content-update') {
        const fn = setters[e.data.section];
        if (fn) fn(e.data.data);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [editMode]);

  const totalPages = Math.ceil(VIDEOS.length / PER_PAGE);
  const paged = VIDEOS.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <main style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Page Header */}
      <div style={{ backgroundColor: '#f6f8fa', borderBottom: '1px solid #e6e8ec', padding: '52px 24px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Link
              href="/"
              style={{ fontSize: '13px', color: '#888d94', textDecoration: 'none' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#36c88a'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#888d94'; }}
            >
              홈
            </Link>
            <svg width="14" height="14" fill="none" stroke="#cccccc" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link
              href="/resources"
              style={{ fontSize: '13px', color: '#888d94', textDecoration: 'none' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#36c88a'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#888d94'; }}
            >
              자료실
            </Link>
            <svg width="14" height="14" fill="none" stroke="#cccccc" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span style={{ fontSize: '13px', color: '#36c88a', fontWeight: '600' }}>동영상 강의</span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#111111', margin: '0 0 10px' }}><E id="videos_hero.title" editMode={editMode}>{hero.title}</E></h1>
          <p style={{ fontSize: '16px', color: '#676767', margin: 0 }}>
            <E id="videos_hero.desc" editMode={editMode}>{hero.desc}</E>
          </p>
        </div>
      </div>

      {/* Series Banner */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px 0' }}>
        <div
          style={{
            padding: '24px 28px',
            background: 'linear-gradient(135deg, #1a2b4a 0%, #0f3460 100%)',
            borderRadius: '0',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#36c88a',
                  backgroundColor: 'rgba(54,200,138,0.15)',
                  borderRadius: '4px',
                  padding: '2px 8px',
                }}
              >
                시리즈
              </span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', margin: '0 0 6px' }}>
              DA#5 런칭 세미나 · 튜토리얼 시리즈
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              세미나 6편 + 튜토리얼 6편 · 엔코아 전문 강사진 · 2021년 11월 진행
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {[
              { label: '총 강의', value: `${VIDEOS.length}편` },
              { label: '세미나', value: `${VIDEOS.filter(v => v.tag === '세미나').length}편` },
              { label: '튜토리얼', value: `${VIDEOS.filter(v => v.tag === '튜토리얼').length}편` },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '28px', fontWeight: '800', color: '#36c88a', margin: '0 0 4px' }}>{stat.value}</p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '36px 24px 52px' }}>
        <div key={page} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px', minHeight: '500px' }}>
          {paged.map((video) => (
            <article
              key={video.id}
              role="button"
              tabIndex={0}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e6e8ec',
                borderRadius: '0',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
              onClick={() => setPlayingId(video.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPlayingId(video.id); } }}
            >
              {/* Thumbnail / Player area */}
              <div
                style={{
                  height: '200px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#1a2b4a',
                  overflow: 'hidden',
                }}
              >
                {playingId === video.id ? (
                  /* YouTube embed */
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                  />
                ) : (
                  <>
                    {/* YouTube thumbnail */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.title}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />

                    {/* Dark overlay */}
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)' }} />

                    {/* Play button */}
                    <div
                      style={{
                        position: 'relative',
                        zIndex: 1,
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(54,200,138,0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 16px rgba(54,200,138,0.4)',
                        transition: 'transform 0.15s, background 0.15s',
                      }}
                    >
                      <svg width="20" height="20" fill="white" viewBox="0 0 24 24" style={{ marginLeft: '3px' }}>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>

                    {/* Duration badge */}
                    {video.duration && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          zIndex: 1,
                          fontSize: '11px',
                          fontWeight: '700',
                          color: '#ffffff',
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          borderRadius: '3px',
                          padding: '2px 7px',
                        }}
                      >
                        {video.duration}
                      </span>
                    )}

                    {/* Episode badge */}
                    <span
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        zIndex: 1,
                        fontSize: '11px',
                        fontWeight: '700',
                        color: '#ffffff',
                        backgroundColor: 'rgba(54,200,138,0.85)',
                        borderRadius: '3px',
                        padding: '2px 8px',
                      }}
                    >
                      {video.episode}
                    </span>
                  </>
                )}
              </div>

              {/* Card body */}
              <div style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: video.tagColor,
                      backgroundColor: video.tagColor + '18',
                      borderRadius: '4px',
                      padding: '2px 8px',
                    }}
                  >
                    {video.tag}
                  </span>
                  <span style={{ fontSize: '12px', color: '#888d94' }}>{formatDate(video.date)}</span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111111', margin: '0 0 8px', lineHeight: 1.45 }}>
                  {video.title}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      backgroundColor: '#f0fdf7',
                      border: '1px solid #b6f0d9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="12" height="12" fill="none" stroke="#36c88a" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span style={{ fontSize: '12px', color: '#676767' }}>{video.speaker}</span>
                </div>

                {video.views && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '12px' }}>
                    <svg width="13" height="13" fill="none" stroke="#888d94" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span style={{ fontSize: '12px', color: '#888d94' }}>조회수 {video.views}</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '40px' }}>
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

        {/* CTA */}
        <div
          style={{
            marginTop: '52px',
            padding: '32px 36px',
            backgroundColor: '#f6f8fa',
            border: '1px solid #e6e8ec',
            borderRadius: '0',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#111111', margin: '0 0 6px' }}>
              <E id="videos_cta.title" editMode={editMode}>{cta.title}</E>
            </h3>
            <p style={{ fontSize: '14px', color: '#676767', margin: 0 }}>
              <E id="videos_cta.desc" editMode={editMode}>{cta.desc}</E>
            </p>
          </div>
          <Link
            href="/education"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#36c88a',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '600',
              padding: '10px 22px',
              borderRadius: '6px',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(54,200,138,0.28)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#2ba876'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#36c88a'; }}
          >
            무료교육 신청
          </Link>
        </div>
      </div>
      {editMode && <style>{EDITABLE_STYLES}</style>}
    </main>
  );
}
