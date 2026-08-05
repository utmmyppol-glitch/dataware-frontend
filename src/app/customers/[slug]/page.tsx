import { Metadata } from 'next';
import CustomerDetailClient from './CustomerDetailClient';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `고객사례 | DATAWARE`,
    description: '고객사례 상세',
  };
}

export default function CustomerStoryDetailPage({ params }: { params: { slug: string } }) {
  return <CustomerDetailClient slug={params.slug} />;
}
