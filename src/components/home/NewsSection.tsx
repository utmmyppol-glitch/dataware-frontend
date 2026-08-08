'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api, type PostResponse, type PageResponse } from '@/lib/api';
import { E } from '@/lib/editable';

interface VideoDetail {
  youtubeId?: string;
  speaker?: string;
}

function parseVideoDetail(post: PostResponse): VideoDetail {
  if (!post.detailJson) return {};
  try { return JSON.parse(post.detailJson); } catch { return {}; }
}

interface NewsSectionProps {
  sectionRef: React.RefObject<HTMLElement>;
  editMode?: boolean;
  content?: { title?: string };
}

export default function NewsSection({ sectionRef, editMode = false, content }: NewsSectionProps) {
  const [lectures, setLectures] = useState<PostResponse[]>([]);
  const [notices, setNotices] = useState<PostResponse[]>([]);

  useEffect(() => {
    api.getPosts('VIDEO', 0, 6)
      .then((data: PageResponse<PostResponse>) => setLectures(data.content))
      .catch(() => {});
    api.getPosts('NOTICE', 0, 3)
      .then((data: PageResponse<PostResponse>) => setNotices(data.content))
      .catch(() => {});
  }, []);

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#fff', borderTop: '1px solid #E7E2D8' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(64px, 8vw, 100px) clamp(24px, 4vw, 56px)' }}>
        <div data-anim style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.12em', marginBottom: '16px' }}><E id="home_news.badge" editMode={editMode}>NEWS &amp; LECTURES</E></p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#111214', lineHeight: 1.15, marginBottom: '12px' }}>
            <E id="home_news.title" editMode={editMode}>{content?.title ?? '유니온시스템즈 소식.'}</E>
          </h2>
          <p style={{ fontSize: '18px', color: '#6B655C' }}><E id="home_news.desc" editMode={editMode}>성장하는 유니온시스템즈의 소식과 유용한 강의들을 만나보세요!</E></p>
        </div>

        {/* Lectures (Videos from API) */}
        {lectures.length > 0 && (
          <div data-anim style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '48px' }}>
            {lectures.slice(0, 3).map((lecture) => {
              const vd = parseVideoDetail(lecture);
              const youtubeId = vd.youtubeId || '';
              const speaker = vd.speaker || '';
              return (
                <Link
                  key={lecture.id}
                  href="/resources/videos"
                  style={{ display: 'block', textDecoration: 'none', overflow: 'hidden', border: '1px solid #E7E2D8', backgroundColor: '#fff', transition: 'box-shadow 0.3s, transform 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = ''; }}
                >
                  <div style={{ position: 'relative', height: 180, overflow: 'hidden', backgroundColor: '#0b1220' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : (lecture.thumbnailUrl || '/images/uniondata/board__notice.png')}
                      alt={lecture.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.15)' }}>
                      <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(54,200,138,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="20" height="20" fill="#fff" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                    <span style={{ position: 'absolute', top: 10, left: 10, fontSize: 11, fontWeight: 700, color: '#fff', backgroundColor: 'rgba(54,200,138,0.9)', padding: '3px 10px' }}><E id="home_news.video_badge" editMode={editMode}>동영상 강의</E></span>
                  </div>
                  <div style={{ padding: '16px 20px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111214', lineHeight: 1.4, marginBottom: 6 }}>{lecture.title}</h3>
                    <p style={{ fontSize: 13, color: '#98A2B3', margin: 0 }}>{speaker}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Notices from API */}
        {notices.length > 0 && (
          <div data-anim style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {notices.map(a => (
              <Link key={a.id} href={`/resources/notices/${a.slug || a.id}`} style={{ overflow: 'hidden', backgroundColor: '#fff', border: '1px solid #E7E2D8', transition: 'box-shadow 0.3s, transform 0.3s', textDecoration: 'none', display: 'block' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = ''; }}
              >
                <div style={{ height: 160, overflow: 'hidden', backgroundColor: '#f0f2f5' }}>
                  {a.thumbnailUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={a.thumbnailUrl} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  )}
                </div>
                <div style={{ padding: '18px 22px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#36c88a', marginBottom: '8px', display: 'block' }}><E id="home_news.notice_badge" editMode={editMode}>공지</E></span>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111214', lineHeight: 1.4, marginBottom: '8px' }}>{a.title}</h3>
                  <p style={{ fontSize: '13px', color: '#98A2B3' }}>{a.createdAt?.slice(0, 10).replace(/-/g, '.')}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div data-anim style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/resources/notices" style={{ fontSize: '14px', fontWeight: 600, color: '#6B655C', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#36c88a'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6B655C'; }}
          ><E id="home_news.cta" editMode={editMode}>공지사항 전체 보기 &rarr;</E></Link>
        </div>
      </div>
    </section>
  );
}
