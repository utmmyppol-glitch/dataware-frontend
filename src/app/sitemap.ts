import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dataware.unionsystems.co.kr';

const PRODUCT_SLUGS = [
  'da-sharp', 'meta-sharp', 'dq-sharp',
  'ap-sharp', 'dp-sharp',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/products`, changeFrequency: 'weekly', priority: 0.9 },
    ...PRODUCT_SLUGS.map(slug => ({
      url: `${SITE_URL}/products/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/pricing`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/customers`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/resources`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/resources/notices`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/resources/videos`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/events`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/education`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/seminar`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/download`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.8 },
  ];

  // Dynamically add customer story pages
  let storyPages: MetadataRoute.Sitemap = [];
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';
    const res = await fetch(`${apiUrl}/customer-stories?page=0&size=100`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      const stories = data.content || [];
      storyPages = stories.map((story: { id: number; company?: string; createdAt?: string }) => ({
        url: `${SITE_URL}/customers/${story.id}`,
        lastModified: story.createdAt,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
    }
  } catch {
    // silently skip
  }

  return [...staticPages, ...storyPages];
}
