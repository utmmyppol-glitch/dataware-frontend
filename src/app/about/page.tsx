import { Metadata } from 'next';
import AboutPageClient from "./AboutPageClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';
const CONTENT_KEYS = ['about_hero', 'about_seo_title', 'about_seo_description'];

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
  const title = c.about_seo_title || '회사소개 | UNION DATAWARE';
  const description = c.about_seo_description || '유니온시스템즈는 엔코아 DATAWARE 공식 총판으로, 데이터 거버넌스 All-in-One 솔루션을 제공합니다.';
  return { title, description, openGraph: { title, description } };
}

export default async function AboutPage() {
  const content = await getContent();
  return <AboutPageClient ssrContent={content} />;
}
