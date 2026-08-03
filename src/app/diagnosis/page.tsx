import { Metadata } from 'next';
import DiagnosisPageClient from "./DiagnosisPageClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';
const CONTENT_KEYS = ['diagnosis_hero', 'diagnosis_hero_stats', 'diagnosis_why', 'diagnosis_why_stats', 'diagnosis_insight', 'diagnosis_insights', 'diagnosis_service', 'diagnosis_arch', 'diagnosis_metrics', 'diagnosis_seo_title', 'diagnosis_seo_description'];

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
  const title = c.diagnosis_seo_title || '데이터 품질 진단 | UNION DATAWARE';
  const description = c.diagnosis_seo_description || '데이터 품질 현황을 진단하고 개선 방향을 제시하는 무료 컨설팅 서비스입니다.';
  return { title, description, openGraph: { title, description } };
}

export default async function DiagnosisPage() {
  const content = await getContent();
  return <DiagnosisPageClient ssrContent={content} />;
}
