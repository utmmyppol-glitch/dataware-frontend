import { Metadata } from 'next';
import { ProductResponse } from '@/lib/api';
import ProductsPageClient from './ProductsPageClient';

export const metadata: Metadata = {
  title: '제품 소개 | UNION DATAWARE',
  description: 'DA#, META#, DQ#, AP#, DF#, ETT#, DP# - 데이터 거버넌스 All-in-One 솔루션 라인업',
  openGraph: {
    title: '제품 소개 | UNION DATAWARE',
    description: 'DA#, META#, DQ#, AP#, DF#, ETT#, DP# - 데이터 거버넌스 All-in-One 솔루션 라인업',
  },
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';

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

export default async function ProductsPage() {

  const products = await getProducts();
  return <ProductsPageClient products={products} />;
}
