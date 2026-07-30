import { fetchPageLayout, CmsPageRender } from "@/lib/cms-page";
import FaqPageClient from "./FaqPageClient";

export default async function FaqPage() {
  const cmsData = await fetchPageLayout("faq");
  if (cmsData) return <CmsPageRender data={cmsData} />;
  return <FaqPageClient />;
}
