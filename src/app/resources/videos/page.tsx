import { Metadata } from 'next';
import VideosPageClient from "./VideosPageClient";
import { USE_MOCK, getMockContent } from '@/lib/mock';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';
const CONTENT_KEYS = ['videos_hero', 'videos_cta', 'videos_seo_title', 'videos_seo_description'];

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
  const title = c.videos_seo_title || '교육 영상 | UNION DATAWARE';
  const description = c.videos_seo_description || 'DATAWARE 솔루션 교육 영상 및 튜토리얼을 시청하세요.';
  return { title, description, openGraph: { title, description } };
}

export default async function VideosPage() {
  const content = await getContent();
  return <VideosPageClient ssrContent={content} />;
}
