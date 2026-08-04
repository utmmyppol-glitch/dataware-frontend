import { Metadata } from 'next';
import ContactPageClient from "./ContactPageClient";
import { USE_MOCK, getMockContent } from '@/lib/mock';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';
const CONTENT_KEYS = ['contact_hero', 'contact_cta', 'contact_seo_title', 'contact_seo_description'];

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
  const title = c.contact_seo_title || '도입문의 | UNION DATAWARE';
  const description = c.contact_seo_description || 'DATAWARE 솔루션 도입 상담 및 견적 문의. 데이터 거버넌스 전문 컨설팅을 제공합니다.';
  return { title, description, openGraph: { title, description } };
}

export default async function ContactPage() {
  const content = await getContent();
  return <ContactPageClient ssrContent={content} />;
}
