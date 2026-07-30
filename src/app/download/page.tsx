import { fetchPageLayout, CmsPageRender } from "@/lib/cms-page";
import DownloadPageClient from "./DownloadPageClient";

export default async function DownloadPage() {
  const cmsData = await fetchPageLayout("download");
  if (cmsData) return <CmsPageRender data={cmsData} />;
  return <DownloadPageClient />;
}
