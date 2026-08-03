import { Metadata } from 'next';
import {
  DATAWARE_OVERVIEW, DA_SHARP, META_SHARP, DQ_SHARP,
  AP_SHARP, DF_SHARP, ETT_SHARP, DP_SHARP,
  DA_DQ_EDITION, DA_TOTAL_PACKAGE,
} from '@/data';
import ProductDetailClient from './ProductDetailClient';

const PRODUCT_SEO: Record<string, { title: string; description: string }> = {
  'dataware': { title: DATAWARE_OVERVIEW.name, description: DATAWARE_OVERVIEW.description },
  'da-sharp': { title: DA_SHARP.name, description: DA_SHARP.subtitle },
  'da-dq-edition': { title: DA_DQ_EDITION.name, description: DA_DQ_EDITION.subtitle },
  'da-total-package': { title: DA_TOTAL_PACKAGE.name, description: DA_TOTAL_PACKAGE.subtitle },
  'meta-sharp': { title: META_SHARP.name, description: META_SHARP.subtitle },
  'dq-sharp': { title: DQ_SHARP.name, description: DQ_SHARP.subtitle },
  'ap-sharp': { title: AP_SHARP.name, description: AP_SHARP.subtitle },
  'df-sharp': { title: DF_SHARP.name, description: DF_SHARP.subtitle },
  'ett-sharp': { title: ETT_SHARP.name, description: ETT_SHARP.subtitle },
  'dp-sharp': { title: DP_SHARP.name, description: DP_SHARP.subtitle },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const seo = PRODUCT_SEO[params.slug];
  const title = seo ? `${seo.title} | UNION DATAWARE` : '제품 상세 | UNION DATAWARE';
  const description = seo?.description || 'DATAWARE 솔루션 제품 상세 정보';
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
