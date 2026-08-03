import { Metadata } from 'next';
import NoticesPageClient from "./NoticesPageClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';
const CONTENT_KEYS = ['notices_hero', 'notices_seo_title', 'notices_seo_description'];

async function getContent(): Promise<Record<string, string>> {
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
  const title = c.notices_seo_title || '공지사항 | UNION DATAWARE';
  const description = c.notices_seo_description || '유니온시스템즈 공지사항 및 최신 소식을 확인하세요.';
  return { title, description, openGraph: { title, description } };
}

export default async function NoticesPage() {
  const content = await getContent();
  return <NoticesPageClient ssrContent={content} />;
}
