import PricingPageClient from "./PricingPageClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';

interface PricingPlanEntity {
  id: number; name: string; licenseType: string; price: number | null;
  originalPrice: number | null; priceDisplay: string; features: string;
  badge: string; isPopular: boolean; sortOrder: number; isActive: boolean;
}

async function getPricingPlans(): Promise<PricingPlanEntity[] | null> {
  try {
    const base = API_URL.replace(/\/api\/dataware\/?$/, '');
    const res = await fetch(`${base}/api/dataware/pricing`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const items: PricingPlanEntity[] = await res.json();
    return items.length ? items : null;
  } catch {
    return null;
  }
}

export default async function PricingPage() {
  const dbPlans = await getPricingPlans();
  return <PricingPageClient dbPlans={dbPlans} />;
}
