import { Metadata } from 'next';
import SeminarPageClient from "./SeminarPageClient";
import { USE_MOCK, getMockContent } from '@/lib/mock';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';
const CONTENT_KEYS = ['seminar_hero', 'seminar_steps', 'seminar_form', 'seminar_seo_title', 'seminar_seo_description'];

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
  const title = c.seminar_seo_title || '세미나 | UNION DATAWARE';
  const description = c.seminar_seo_description || '데이터 거버넌스 및 DATAWARE 솔루션 활용 세미나에 참여하세요.';
  return { title, description, openGraph: { title, description } };
}

export default async function SeminarPage() {
  const content = await getContent();
  return <SeminarPageClient ssrContent={content} />;
}
