import { Metadata } from 'next';
import EventsPageClient from "./EventsPageClient";
import { USE_MOCK, getMockContent } from '@/lib/mock';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';
const CONTENT_KEYS = ['events_hero', 'events_cta', 'events_seo_title', 'events_seo_description'];

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
  const title = c.events_seo_title || '이벤트 | UNION DATAWARE';
  const description = c.events_seo_description || 'DATAWARE 관련 세미나, 컨퍼런스, 프로모션 등 이벤트 정보를 확인하세요.';
  return { title, description, openGraph: { title, description } };
}

export default async function EventsPage() {
  const content = await getContent();
  return <EventsPageClient ssrContent={content} />;
}
