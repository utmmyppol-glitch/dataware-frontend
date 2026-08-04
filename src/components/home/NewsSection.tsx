'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { E } from '@/lib/editable';

const LECTURES = [
  { title: '새로운 시대의 데이터모델링', speaker: '이화식 대표', thumb: '/images/uniondata/video-lecture_seminar_thum-01.jpg', href: 'https://www.uniondata.co.kr/da5%ec%9d%98-%eb%8b%ac%eb%9d%bc%ec%a7%84-%eb%aa%a8%eb%8d%b8%eb%a7%81-da5-%eb%9f%b0%ec%b9%ad-%ec%84%b8%eb%af%b8%eb%82%98/' },
  { title: 'DA#5 개발스토리', speaker: '정철원 디렉터', thumb: '/images/uniondata/video-lecture_seminar_thum-02.jpg', href: 'https://www.uniondata.co.kr/da5%ec%9d%98-%eb%8b%ac%eb%9d%bc%ec%a7%84-%eb%aa%a8%eb%8d%b8%eb%a7%81-da5-%eb%9f%b0%ec%b9%ad%ec%84%b8%eb%af%b8%eb%82%98/' },
  { title: 'DA#5 달라진 모델링', speaker: '정민수 연구원', thumb: '/images/uniondata/video-lecture_seminar_thum-03.jpg', href: 'https://www.uniondata.co.kr/da5%ec%9d%98-api-%ea%b7%b8%eb%a6%ac%ea%b3%a0-%ed%8e%b8%ec%9d%98%ea%b8%b0%eb%8a%a5-da5-%eb%9f%b0%ec%b9%ad-%ec%84%b8%eb%af%b8%eb%82%982/' },
  { title: 'DA#5 기본구조 및 개념', speaker: '최광희 연구원', thumb: '/images/uniondata/video-lecture_seminar_thum-04.jpg', href: 'https://www.uniondata.co.kr/da5%ec%9d%98-%ea%b8%b0%eb%b3%b8%ea%b5%ac%ec%a1%b0-%eb%b0%8f-%ea%b0%9c%eb%85%90-da5-%eb%9f%b0%ec%b9%ad%ec%84%b8%eb%af%b8%eb%82%98/' },
  { title: 'API 그리고 편의기능', speaker: '김기동 연구원', thumb: '/images/uniondata/video-lecture_seminar_thum-05.jpg', href: 'https://www.uniondata.co.kr/da5%ec%9d%98-%eb%8b%ac%eb%9d%bc%ec%a7%84-%eb%aa%a8%eb%8d%b8%eb%a7%81-da5-%eb%9f%b0%ec%b9%ad%ec%84%b8%eb%af%b8%eb%82%982/' },
  { title: '초보자도 할 수 있는 현행모델 파헤치기', speaker: '이임형 연구원', thumb: '/images/uniondata/video-lecture_seminar_thum-06.jpg', href: 'https://www.uniondata.co.kr/da5%ec%9d%98-%ea%b8%b0%eb%b3%b8%ea%b5%ac%ec%a1%b0-%eb%b0%8f-%ea%b0%9c%eb%85%90-da5-%eb%9f%b0%ec%b9%ad%ec%84%b8%eb%af%b8%eb%82%982/' },
];

const NOTICES = [
  { tag: '공지', title: 'DA#_DQ_Edition 조달청 나라장터 등록', date: '2021.11.22', thumb: '/images/uniondata/0.png' },
  { tag: '리뷰', title: '[리뷰] 데이터 품질진단 DA# DQ_Edition', date: '2021.06.02', thumb: '/images/uniondata/0-1.png' },
  { tag: '공지', title: 'DA# DQ_Edition GS인증 1등급', date: '2021.05.30', thumb: '/images/uniondata/0000-1.png' },
];

interface NewsSectionProps {
  sectionRef: React.RefObject<HTMLElement>;
  editMode: boolean;
  content?: { title?: string };
}

export default function NewsSection({ sectionRef, editMode, content }: NewsSectionProps) {
  return (
    <section ref={sectionRef} style={{ backgroundColor: '#fff', borderTop: '1px solid #E7E2D8' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(64px, 8vw, 100px) clamp(24px, 4vw, 56px)' }}>
        <div data-anim style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.12em', marginBottom: '16px' }}>NEWS & LECTURES</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#111214', lineHeight: 1.15, marginBottom: '12px' }}>
            <E id="home_news.title" editMode={editMode}>{content?.title ?? '유니온시스템즈 소식.'}</E>
          </h2>
          <p style={{ fontSize: '18px', color: '#6B655C' }}>성장하는 유니온시스템즈의 소식과 유용한 강의들을 만나보세요!</p>
        </div>

        {/* Lectures */}
        <div data-anim style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '48px' }}>
          {LECTURES.map((lecture) => (
            <a
              key={lecture.title}
              href={lecture.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', textDecoration: 'none', overflow: 'hidden', border: '1px solid #E7E2D8', backgroundColor: '#fff', transition: 'box-shadow 0.3s, transform 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = ''; }}
            >
              <div style={{ position: 'relative', height: 180, overflow: 'hidden', backgroundColor: '#0b1220' }}>
                <Image src={lecture.thumb} alt={lecture.title} width={400} height={180} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = ''; }}
                />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.15)', opacity: 0, transition: 'opacity 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '0'; }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(54,200,138,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" fill="#fff" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
                <span style={{ position: 'absolute', top: 10, left: 10, fontSize: 11, fontWeight: 700, color: '#fff', backgroundColor: 'rgba(54,200,138,0.9)', padding: '3px 10px' }}>DA#5 런칭세미나</span>
              </div>
              <div style={{ padding: '16px 20px' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111214', lineHeight: 1.4, marginBottom: 6 }}>{lecture.title}</h3>
                <p style={{ fontSize: 13, color: '#98A2B3', margin: 0 }}>{lecture.speaker}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Notices */}
        <div data-anim style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {NOTICES.map(a => (
            <Link key={a.title} href="/resources/notices" style={{ overflow: 'hidden', backgroundColor: '#fff', border: '1px solid #E7E2D8', transition: 'box-shadow 0.3s, transform 0.3s', textDecoration: 'none', display: 'block' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = ''; }}
            >
              <div style={{ height: 160, overflow: 'hidden', backgroundColor: '#f0f2f5' }}>
                <Image src={a.thumb} alt={a.title} width={400} height={160} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = ''; }}
                />
              </div>
              <div style={{ padding: '18px 22px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#36c88a', marginBottom: '8px', display: 'block' }}>{a.tag}</span>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111214', lineHeight: 1.4, marginBottom: '8px' }}>{a.title}</h3>
                <p style={{ fontSize: '13px', color: '#98A2B3' }}>{a.date}</p>
              </div>
            </Link>
          ))}
        </div>

        <div data-anim style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/resources/notices" style={{ fontSize: '14px', fontWeight: 600, color: '#6B655C', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#36c88a'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6B655C'; }}
          >공지사항 전체 보기 &rarr;</Link>
        </div>
      </div>
    </section>
  );
}
