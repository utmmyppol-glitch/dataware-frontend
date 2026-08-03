import { Metadata } from 'next';
import { ProductResponse } from '@/lib/api';
import ProductsPageClient from './ProductsPageClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';
const CONTENT_KEYS = ['products_hero', 'products_features', 'products_grid', 'products_cta', 'products_seo_title', 'products_seo_description'];

async function getProducts(): Promise<ProductResponse[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

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

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  const title = c.products_seo_title || '제품 소개 | UNION DATAWARE';
  const description = c.products_seo_description || 'DA#, META#, DQ#, AP#, DF#, ETT#, DP# - 데이터 거버넌스 All-in-One 솔루션 라인업';
  return { title, description, openGraph: { title, description } };
}

export default async function ProductsPage() {
  const [products, content] = await Promise.all([getProducts(), getContent()]);
  return <ProductsPageClient products={products} ssrContent={content} />;
}
