import HomePageClient from "./HomePageClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api/dataware';
const CONTENT_KEYS = [
  'home_hero','home_trusted','home_why','home_dataflow',
  'home_platform','home_features','home_customers','home_news','home_cta',
];

async function getHomeContent(): Promise<Record<string, string>> {
  try {
    const base = API_URL.replace(/\/api\/dataware\/?$/, '');
    const res = await fetch(
      `${base}/api/dataware/content?keys=${CONTENT_KEYS.join(',')}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return {};
    return res.json();
  } catch {
    return {};
  }
}

export default async function HomePage() {
  const content = await getHomeContent();
  return <HomePageClient ssrContent={content} />;
}
