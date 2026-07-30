import { fetchPageLayout, CmsPageRender } from "@/lib/cms-page";
import PricingPageClient from "./PricingPageClient";

export default async function PricingPage() {
  const cmsData = await fetchPageLayout("pricing");
  if (cmsData) return <CmsPageRender data={cmsData} />;
  return <PricingPageClient />;
}
