import EventsPageClient from "./EventsPageClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';
const CONTENT_KEYS = ['events_hero', 'events_cta'];

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

export default async function EventsPage() {
  const content = await getContent();
  return <EventsPageClient ssrContent={content} />;
}
