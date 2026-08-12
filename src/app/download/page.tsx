import { Metadata } from 'next';
import DownloadPageClient from "./DownloadPageClient";
import { USE_MOCK, getMockContent } from '@/lib/mock';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';
const CONTENT_KEYS = ['download_hero', 'download_seo_title', 'download_seo_description'];

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
  const title = c.download_seo_title || '소개서 다운로드 | UNION DATAWARE';
  const description = c.download_seo_description || 'DATAWARE 솔루션 제품 소개서를 무료로 다운로드하세요.';
  return { title, description, openGraph: { title, description } };
}

export default async function DownloadPage() {
  const content = await getContent();
  return <DownloadPageClient ssrContent={content} />;
}
