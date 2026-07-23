import { Metadata } from 'next';
import CustomerDetailClient from './CustomerDetailClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';

const STATIC_STORIES: Record<string, { id: number; slug: string; title: { rendered: string }; date: string; content: { rendered: string }; acf?: { company?: string; industry?: string; challenge?: string; result?: string } }> = {
  'kakaobank': {
    id: 1, slug: 'kakaobank',
    title: { rendered: '카카오뱅크 — DA# 기반 데이터 모델 표준화' },
    date: '2025-10-01T00:00:00',
    content: { rendered: '<h3>도입 배경</h3><p>카카오뱅크는 빠른 성장과 함께 늘어난 데이터 모델의 일관성 유지에 어려움을 겪고 있었습니다.</p><h3>솔루션 적용</h3><p>DA# Repository를 도입하여 전사 데이터 모델을 단일 저장소에서 통합 관리하기 시작했습니다.</p><h3>도입 효과</h3><p>모델 검색 시간 70% 단축, 신규 테이블 설계 시 표준 준수율 98% 달성.</p>' },
    acf: { company: '카카오뱅크', industry: '금융', challenge: '전사 데이터 모델 통합 관리 및 표준화', result: '모델 검색 시간 70% 단축, 표준 준수율 98%' },
  },
  'amore-pacific': {
    id: 2, slug: 'amore-pacific',
    title: { rendered: '아모레퍼시픽 — DATAWARE 통합 데이터 거버넌스 구축' },
    date: '2025-08-15T00:00:00',
    content: { rendered: '<h3>도입 배경</h3><p>아모레퍼시픽은 브랜드별로 분산된 데이터 환경을 통합하고자 하였습니다.</p><h3>솔루션 적용</h3><p>DA#, META#, DQ#, DF#를 패키지로 도입하여 통합 거버넌스 체계를 구축하였습니다.</p><h3>도입 효과</h3><p>데이터 이슈 원인 분석 시간 60% 단축, 오류율 85% 감소.</p>' },
    acf: { company: '아모레퍼시픽', industry: '유통/제조', challenge: '브랜드별 분산 데이터 환경 통합 및 품질 관리', result: '데이터 이슈 분석 시간 60% 단축, 오류율 85% 감소' },
  },
};

async function getStory(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/posts?slug=${slug}&category=CUSTOMER`, {
      next: { revalidate: 60 },
      cache: 'no-store' as RequestCache,
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data[0];
    }
  } catch {
    // fall through to static
  }
  return STATIC_STORIES[slug] || null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const story = await getStory(params.slug);
  const title = story?.title?.rendered || story?.company || '고객사례';
  const desc = story?.acf?.challenge || `${title} 도입 사례`;
  return {
    title: `${title} | 고객사례`,
    description: desc,
    openGraph: { title, description: desc, type: 'article' },
  };
}

export default async function CustomerStoryDetailPage({ params }: { params: { slug: string } }) {
  const story = await getStory(params.slug);
  return <CustomerDetailClient story={story} />;
}
