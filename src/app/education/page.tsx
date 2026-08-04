import { Metadata } from 'next';
import EducationPageClient from "./EducationPageClient";
import { USE_MOCK, getMockContent } from '@/lib/mock';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';
const CONTENT_KEYS = ['education_hero', 'education_benefits', 'education_videos', 'education_seo_title', 'education_seo_description'];

async function getContent(): Promise<Record<string, string>> {
  if (USE_MOCK) return getMockContent(CONTENT_KEYS);
  try {
    const base = API_URL.replace(/\/api\/dataware\/?$/, '');
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

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  const title = c.education_seo_title || '무료교육 | UNION DATAWARE';
  const description = c.education_seo_description || 'DA# 데이터 모델링 도구 무료 온라인 교육 프로그램. 실습 중심의 교육을 제공합니다.';
  return { title, description, openGraph: { title, description } };
}

export default async function EducationPage() {
  const content = await getContent();
  return <EducationPageClient ssrContent={content} />;
}
