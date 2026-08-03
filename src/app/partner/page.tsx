import PartnerPageClient from "./PartnerPageClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';
const CONTENT_KEYS = ['partner_hero', 'partner_benefits', 'partner_cta'];

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

export default async function PartnerPage() {
  const content = await getContent();
  return <PartnerPageClient ssrContent={content} />;
}
