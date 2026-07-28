import { Metadata } from 'next';
import { CUSTOMER_STORIES } from '@/data/customers';
import CustomerDetailClient from './CustomerDetailClient';

function findStory(slug: string) {
  return CUSTOMER_STORIES.find((s) => s.slug === slug) ?? null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const story = findStory(params.slug);
  const title = story?.detail?.pageHeading ?? story?.company ?? '고객사례';
  const desc = story?.summary || `${title} 도입 사례`;
  return {
    title: `${title} | 고객사례`,
    description: desc,
    openGraph: { title, description: desc, type: 'article' },
  };
}

export default function CustomerStoryDetailPage({ params }: { params: { slug: string } }) {
  const story = findStory(params.slug);
  return <CustomerDetailClient story={story} />;
}
