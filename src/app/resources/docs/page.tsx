import { fetchPageLayout, CmsPageRender } from "@/lib/cms-page";
import DocsPageClient from "./DocsPageClient";

export default async function DocsPage() {
  const cmsData = await fetchPageLayout("docs");
  if (cmsData) return <CmsPageRender data={cmsData} />;
  return <DocsPageClient />;
}
