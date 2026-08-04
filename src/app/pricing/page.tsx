import { Metadata } from 'next';
import PricingPageClient from "./PricingPageClient";
import { USE_MOCK, getMockContent } from '@/lib/mock';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';
const CONTENT_KEYS = ['pricing_hero', 'pricing_hero_stats', 'pricing_why', 'pricing_why_items', 'pricing_faq', 'pricing_cta_left', 'pricing_cta_right', 'pricing_seo_title', 'pricing_seo_description'];

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
  const title = c.pricing_seo_title || '가격 및 도입 | UNION DATAWARE';
  const description = c.pricing_seo_description || 'DATAWARE 솔루션 라이선스 가격, 조달 정보 및 도입 절차를 안내합니다.';
  return { title, description, openGraph: { title, description } };
}

export default async function PricingPage() {
  const content = await getContent();
  return <PricingPageClient ssrContent={content} />;
}
