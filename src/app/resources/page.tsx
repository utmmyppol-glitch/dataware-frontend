import { PostResponse } from '@/lib/api';
import ResourcesPageClient from './ResourcesPageClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';

async function getPosts(): Promise<PostResponse[]> {
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

const CONTENT_KEYS = ['resources_hero'];

async function getContent(): Promise<Record<string, string>> {
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

export default async function ResourcesPage() {
  const [posts, content] = await Promise.all([getPosts(), getContent()]);
  return <ResourcesPageClient initialPosts={posts} ssrContent={content} />;
}
