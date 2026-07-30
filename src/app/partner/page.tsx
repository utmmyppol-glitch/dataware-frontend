import { fetchPageLayout, CmsPageRender } from "@/lib/cms-page";
import PartnerPageClient from "./PartnerPageClient";

export default async function PartnerPage() {
  const cmsData = await fetchPageLayout("partner");
  if (cmsData) return <CmsPageRender data={cmsData} />;
  return <PartnerPageClient />;
}
