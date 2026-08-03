import { Metadata } from 'next';
import DocsPageClient from "./DocsPageClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';
const CONTENT_KEYS = ['docs_hero', 'docs_seo_title', 'docs_seo_description'];

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
  const title = c.docs_seo_title || '기술 문서 | UNION DATAWARE';
  const description = c.docs_seo_description || 'DATAWARE 솔루션 기술 문서, 매뉴얼, 가이드를 확인하세요.';
  return { title, description, openGraph: { title, description } };
}

export default async function DocsPage() {
  const content = await getContent();
  return <DocsPageClient ssrContent={content} />;
}
