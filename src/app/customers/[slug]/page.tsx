'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface CustomerStory {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  slug: string;
  acf?: {
    company?: string;
    industry?: string;
    challenge?: string;
    result?: string;
    logo?: string;
  };
}

// Static fallback data
const STATIC_STORIES: Record<string, CustomerStory> = {
  'kakaobank': {
    id: 1,
    slug: 'kakaobank',
    title: { rendered: '카카오뱅크 — DA# 기반 데이터 모델 표준화' },
    date: '2025-10-01T00:00:00',
    content: {
      rendered: `
        <h3>도입 배경</h3>
        <p>카카오뱅크는 빠른 성장과 함께 늘어난 데이터 모델의 일관성 유지에 어려움을 겪고 있었습니다. 다양한 부서에서 개별적으로 관리되던 모델이 중복·충돌을 일으켜 데이터 품질 저하로 이어졌습니다.</p>
        <h3>솔루션 적용</h3>
        <p>DA# Repository를 도입하여 전사 데이터 모델을 단일 저장소에서 통합 관리하기 시작했습니다. 버전 관리, 변경 이력 추적, 팀원 간 동시 협업이 가능해졌으며 META#와 연계하여 메타데이터 표준도 함께 정비하였습니다.</p>
        <h3>도입 효과</h3>
        <p>모델 검색 시간 70% 단축, 신규 테이블 설계 시 표준 준수율 98% 달성, 데이터 모델 리뷰 소요 시간이 평균 3일에서 반나절로 감소하였습니다.</p>
      `,
    },
    acf: {
      company: '카카오뱅크',
      industry: '금융',
      challenge: '전사 데이터 모델 통합 관리 및 표준화',
      result: '모델 검색 시간 70% 단축, 표준 준수율 98%',
    },
  },
  'amore-pacific': {
    id: 2,
    slug: 'amore-pacific',
    title: { rendered: '아모레퍼시픽 — DATAWARE 통합 데이터 거버넌스 구축' },
    date: '2025-08-15T00:00:00',
    content: {
      rendered: `
        <h3>도입 배경</h3>
        <p>아모레퍼시픽은 뷰티·생활용품 다양한 브랜드를 운영하며 브랜드별로 분산된 데이터 환경을 통합하고자 하였습니다. 이기종 시스템 간 데이터 흐름을 가시화하고 품질을 체계적으로 관리할 필요가 있었습니다.</p>
        <h3>솔루션 적용</h3>
        <p>DA#, META#, DQ#, DF#를 패키지로 도입하여 모델링부터 메타관리, 품질진단, 흐름 추적까지 통합 거버넌스 체계를 구축하였습니다.</p>
        <h3>도입 효과</h3>
        <p>데이터 이슈 원인 분석 시간 60% 단축, 법정 보고용 데이터 산출 소요일 5일에서 1일로 감소, 공급망 데이터 정합성 오류율 85% 감소.</p>
      `,
    },
    acf: {
      company: '아모레퍼시픽',
      industry: '유통/제조',
      challenge: '브랜드별 분산 데이터 환경 통합 및 품질 관리',
      result: '데이터 이슈 분석 시간 60% 단축, 오류율 85% 감소',
    },
  },
};

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').trim();
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

const INDUSTRY_COLORS: Record<string, string> = {
  금융: '#60a5fa',
  공공: '#34d399',
  유통: '#fb923c',
  제조: '#a78bfa',
  '유통/제조': '#fb923c',
  서비스: '#f472b6',
  교육: '#fbbf24',
  병원: '#22d3ee',
};

export default function CustomerStoryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [story, setStory] = useState<CustomerStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchStory = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/posts?slug=${slug}&category=CUSTOMER`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setStory(data[0]);
            return;
          }
        }
      } catch {
        // fall through to static
      }

      // Try static fallback
      const staticStory = STATIC_STORIES[slug];
      if (staticStory) {
        setStory(staticStory);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    };

    fetchStory();
  }, [slug]);

  useEffect(() => {
    if (story) setLoading(false);
  }, [story]);

  if (loading) {
    return (
      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#888d94' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              border: '3px solid #e6e8ec',
              borderTopColor: '#36c88a',
              borderRadius: '50%',
              margin: '0 auto 16px',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <p style={{ fontSize: '14px' }}>불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (notFound || !story) {
    return (
      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
          <svg width="56" height="56" fill="none" stroke="#e6e8ec" viewBox="0 0 24 24" style={{ margin: '0 auto 20px', display: 'block' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111111', margin: '0 0 10px' }}>
            페이지를 찾을 수 없습니다
          </h2>
          <p style={{ fontSize: '14px', color: '#676767', margin: '0 0 24px' }}>
            요청하신 고객사례를 찾을 수 없습니다.
          </p>
          <Link
            href="/customers"
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
            }}
          >
            고객사례 목록으로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  const company = story.acf?.company ?? stripHtml(story.title.rendered).split(' — ')[0];
  const industry = story.acf?.industry ?? '서비스';
  const industryColor = INDUSTRY_COLORS[industry] ?? '#36c88a';

  return (
    <main style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Page Header */}
      <div style={{ backgroundColor: '#f6f8fa', borderBottom: '1px solid #e6e8ec', padding: '52px 24px 48px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
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
              href="/customers"
              style={{ fontSize: '13px', color: '#888d94', textDecoration: 'none' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#36c88a'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#888d94'; }}
            >
              고객사례
            </Link>
            <svg width="14" height="14" fill="none" stroke="#cccccc" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span style={{ fontSize: '13px', color: '#36c88a', fontWeight: '600' }}>{company}</span>
          </div>

          {/* Industry tag */}
          <div style={{ marginBottom: '14px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: '700',
                color: industryColor,
                backgroundColor: industryColor + '18',
                borderRadius: '4px',
                padding: '3px 10px',
              }}
            >
              {industry}
            </span>
          </div>

          <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#111111', margin: '0 0 12px', lineHeight: 1.3 }}>
            {stripHtml(story.title.rendered)}
          </h1>
          <p style={{ fontSize: '14px', color: '#888d94', margin: 0 }}>
            게시일: {formatDate(story.date)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '52px 24px' }}>
        {/* Stats row */}
        {(story.acf?.challenge || story.acf?.result) && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '48px',
              padding: '24px',
              backgroundColor: '#f6f8fa',
              border: '1px solid #e6e8ec',
              borderRadius: '12px',
            }}
          >
            {story.acf.challenge && (
              <div>
                <p style={{ fontSize: '11px', fontWeight: '700', color: '#888d94', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>
                  도입 과제
                </p>
                <p style={{ fontSize: '14px', color: '#111111', fontWeight: '600', margin: 0, lineHeight: 1.5 }}>
                  {story.acf.challenge}
                </p>
              </div>
            )}
            {story.acf.result && (
              <div>
                <p style={{ fontSize: '11px', fontWeight: '700', color: '#36c88a', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>
                  도입 효과
                </p>
                <p style={{ fontSize: '14px', color: '#111111', fontWeight: '600', margin: 0, lineHeight: 1.5 }}>
                  {story.acf.result}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Main content */}
        <div
          style={{
            fontSize: '15px',
            color: '#333333',
            lineHeight: '1.8',
          }}
          dangerouslySetInnerHTML={{ __html: story.content.rendered }}
        />

        {/* Back link */}
        <div style={{ marginTop: '60px', paddingTop: '32px', borderTop: '1px solid #e6e8ec', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link
            href="/customers"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#676767',
              textDecoration: 'none',
              backgroundColor: '#f6f8fa',
              border: '1px solid #e6e8ec',
              borderRadius: '6px',
              padding: '10px 18px',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#36c88a';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = '#36c88a';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#676767';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = '#e6e8ec';
            }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            고객사례 목록으로
          </Link>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#ffffff',
              textDecoration: 'none',
              backgroundColor: '#36c88a',
              borderRadius: '6px',
              padding: '10px 22px',
              boxShadow: '0 4px 12px rgba(54,200,138,0.28)',
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#2ba876'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#36c88a'; }}
          >
            도입문의 하기
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
