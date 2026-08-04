import { Metadata } from 'next';
import FaqPageClient from "./FaqPageClient";
import { USE_MOCK, getMockContent } from '@/lib/mock';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';
const CONTENT_KEYS = ['faq_hero', 'faq_items', 'faq_cta', 'faq_seo_title', 'faq_seo_description'];

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
  const title = c.faq_seo_title || '자주 묻는 질문 | UNION DATAWARE';
  const description = c.faq_seo_description || 'DATAWARE 솔루션 도입, 라이선스, 기술 지원에 대한 자주 묻는 질문과 답변입니다.';
  return { title, description, openGraph: { title, description } };
}

export default async function FaqPage() {
  const content = await getContent();
  return <FaqPageClient ssrContent={content} />;
}
