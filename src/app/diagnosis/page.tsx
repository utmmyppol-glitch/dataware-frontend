import DiagnosisPageClient from "./DiagnosisPageClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';
const CONTENT_KEYS = ['diagnosis_hero', 'diagnosis_hero_stats', 'diagnosis_why', 'diagnosis_why_stats', 'diagnosis_insight', 'diagnosis_insights', 'diagnosis_service', 'diagnosis_arch', 'diagnosis_metrics'];

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

export default async function DiagnosisPage() {
  const content = await getContent();
  return <DiagnosisPageClient ssrContent={content} />;
}
