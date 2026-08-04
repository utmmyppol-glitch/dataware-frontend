import { Metadata } from 'next';
import { PostResponse } from '@/lib/api';
import ResourcesPageClient from './ResourcesPageClient';
import { USE_MOCK, mockPosts, getMockContent } from '@/lib/mock';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';

async function getPosts(): Promise<PostResponse[]> {
  if (USE_MOCK) return mockPosts;
  try {
    const res = await fetch(`${API_BASE_URL}/posts?page=0&size=50`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.content || [];
  } catch {
    return [];
  }
}

const CONTENT_KEYS = ['resources_hero', 'resources_seo_title', 'resources_seo_description'];

async function getContent(): Promise<Record<string, string>> {
  if (USE_MOCK) return getMockContent(CONTENT_KEYS);
  try {
    const base = API_BASE_URL.replace(/\/api\/dataware\/?$/, '');
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
  const title = c.resources_seo_title || '리소스 | UNION DATAWARE';
  const description = c.resources_seo_description || '데이터 거버넌스 관련 블로그, 기술 자료, 뉴스를 확인하세요.';
  return { title, description, openGraph: { title, description } };
}

export default async function ResourcesPage() {
  const [posts, content] = await Promise.all([getPosts(), getContent()]);
  return <ResourcesPageClient initialPosts={posts} ssrContent={content} />;
}
