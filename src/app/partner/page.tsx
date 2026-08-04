import { Metadata } from 'next';
import PartnerPageClient from "./PartnerPageClient";
import { USE_MOCK, getMockContent } from '@/lib/mock';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';
const CONTENT_KEYS = ['partner_hero', 'partner_benefits', 'partner_cta', 'partner_seo_title', 'partner_seo_description'];

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
  const title = c.partner_seo_title || '파트너 | UNION DATAWARE';
  const description = c.partner_seo_description || 'DATAWARE 파트너 프로그램 안내. 함께 성장할 비즈니스 파트너를 모집합니다.';
  return { title, description, openGraph: { title, description } };
}

export default async function PartnerPage() {
  const content = await getContent();
  return <PartnerPageClient ssrContent={content} />;
}
