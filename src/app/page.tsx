import { fetchPageLayout, CmsPageRender } from "@/lib/cms-page";
import HomePageClient from "./HomePageClient";

export default async function HomePage() {
  const cmsData = await fetchPageLayout("home");
  if (cmsData) return <CmsPageRender data={cmsData} />;
  return <HomePageClient />;
}
