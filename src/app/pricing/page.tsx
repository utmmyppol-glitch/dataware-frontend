import PricingPageClient from "./PricingPageClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';
const CONTENT_KEYS = ['pricing_hero', 'pricing_hero_stats', 'pricing_why', 'pricing_why_items', 'pricing_faq', 'pricing_cta_left', 'pricing_cta_right'];

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

export default async function PricingPage() {
  const content = await getContent();
  return <PricingPageClient ssrContent={content} />;
}
