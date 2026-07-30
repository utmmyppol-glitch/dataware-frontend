import { fetchPageLayout, CmsPageRender } from "@/lib/cms-page";
import VideosPageClient from "./VideosPageClient";

export default async function VideosPage() {
  const cmsData = await fetchPageLayout("videos");
  if (cmsData) return <CmsPageRender data={cmsData} />;
  return <VideosPageClient />;
}
