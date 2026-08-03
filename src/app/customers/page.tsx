import { Metadata } from 'next';
import { CustomerStoryResponse } from '@/lib/api';
import CustomersPageClient from './CustomersPageClient';

export const metadata: Metadata = {
  title: '고객사례 | UNION DATAWARE',
  description: 'SSG닷컴, 카카오뱅크, 아모레퍼시픽 등 3,000+ 기업이 선택한 DATAWARE 도입 사례',
  openGraph: {
    title: '고객사례 | UNION DATAWARE',
    description: 'SSG닷컴, 카카오뱅크, 아모레퍼시픽 등 3,000+ 기업이 선택한 DATAWARE 도입 사례',
  },
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';

// Static fallback data
const STATIC_STORIES: CustomerStoryResponse[] = [
  { id: 1, company: 'SSG닷컴', industry: '유통', title: 'SSG닷컴이 데이터를 활용하는 법', content: '방대한 데이터의 수집·저장·통합·활용 등 전 과정을 효과적으로 관리하기 위해 따로 운영되던 유통 서비스를 단일 채널로 통합하는 용어 표준화를 진행했습니다. DA#, DQ#, META#을 활용해 기획팀–개발팀 소통을 원활화하고 전사 데이터 현행화·표준화를 완성했습니다.', logoUrl: '', thumbnailUrl: '/images/uniondata/clients_img_ssg.png', createdAt: '2021-11-11' },
  { id: 2, company: '한국수자원공사', industry: '공공기관', title: '한국수자원공사, 데이터 관리 포털 구축', content: '현업 담당자들에게 객관적인 데이터 관련 서비스를 제공하기 위해 데이터모델 기반 테이블 변경 관리 체계를 구축했습니다. 비즈니스 분류 관리 및 시스템/DB서버/테이블/컬럼의 메타데이터를 관리하는 데이터 전문 솔루션을 도입해 개발 생산성과 데이터 활용을 극대화했습니다.', logoUrl: '', thumbnailUrl: '/images/uniondata/clients_img_kwater.png', createdAt: '2021-11-11' },
  { id: 3, company: '아모레퍼시픽', industry: '제조', title: '아모레퍼시픽, 메타데이터 관리체계 고도화', content: '전사 데이터 표준 및 모델관리 프로세스 개선을 위해 DATAWARE의 DA#, META#을 도입했습니다. 데이터 아키텍트 역량을 내재화하고 데이터 리터러시를 구축해 마케팅·영업 현장에서 데이터 기반 의사결정을 직접 수행할 수 있는 환경을 마련했습니다.', logoUrl: '', thumbnailUrl: '/images/uniondata/clients_img_amore.png', createdAt: '2021-11-11' },
  { id: 4, company: '현대해상', industry: '금융', title: '현대해상, 메타데이터 관리시스템 재구축', content: '노후화된 메타데이터 시스템 교체와 운영 효율화를 위해 시스템을 재구축했습니다. 메타데이터를 통해 애플리케이션·정보·시스템을 통합 관리하고 비즈니스 의사결정에 데이터를 활용하는 환경을 구축했습니다.', logoUrl: '', thumbnailUrl: '/images/uniondata/clients_img_hyundai-marine.png', createdAt: '2021-11-10' },
  { id: 5, company: '동양생명', industry: '금융', title: '동양생명, 데이터 관리체계 자동화 솔루션 도입', content: '노후화된 메타데이터 솔루션 교체와 모델링 솔루션 도입을 병행했습니다. 모델 변경사항의 DB반영 자동화와 갭 분석 표준화를 통해 데이터 품질관리 체계를 강화하고 비즈니스 의사결정에 데이터를 활용하는 환경을 마련했습니다.', logoUrl: '', thumbnailUrl: '/images/uniondata/clients_img_tong-yang-life.png', createdAt: '2021-11-11' },
  { id: 6, company: '오늘의집', industry: '유통', title: '버킷플레이스, 데이터 품질진단 솔루션 공급', content: '컨텐츠·커머스·커뮤니티가 유기적으로 결합된 서비스 특성상 빠르게 증가하는 데이터의 명확한 표준 관리와 품질관리가 필요했습니다. DA# DQ_Edition을 도입해 데이터 모델링과 품질진단을 하나의 패키지로 해결하고 개발 생산성과 편의성을 높였습니다.', logoUrl: '', thumbnailUrl: '/images/uniondata/clients_img_ssg.png', createdAt: '2021-11-26' },
];

async function getCustomerStories(): Promise<CustomerStoryResponse[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/customer-stories?page=0&size=100`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return STATIC_STORIES;
    const data = await res.json();
    return data.content && data.content.length > 0 ? data.content : STATIC_STORIES;
  } catch {
    return STATIC_STORIES;
  }
}

const CONTENT_KEYS = ['customers_hero', 'customers_cta'];

async function getContent(): Promise<Record<string, string>> {
  try {
    const base = API_BASE_URL.replace(/\/api\/dataware\/?$/, '');
    const res = await fetch(
      `${base}/api/dataware/content?keys=${CONTENT_KEYS.join(',')}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return {};
    return res.json();
  } catch {
    return {};
  }
}

export default async function CustomersPage() {
  const [stories, content] = await Promise.all([getCustomerStories(), getContent()]);
  return <CustomersPageClient initialStories={stories} ssrContent={content} />;
}
