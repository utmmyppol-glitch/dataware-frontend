import { fetchPageLayout, CmsPageRender } from "@/lib/cms-page";
import NoticesPageClient from "./NoticesPageClient";

export default async function NoticesPage() {
  const cmsData = await fetchPageLayout("notices");
  if (cmsData) return <CmsPageRender data={cmsData} />;
  return <NoticesPageClient />;
}
