import { fetchPageLayout, CmsPageRender } from "@/lib/cms-page";
import EducationPageClient from "./EducationPageClient";

export default async function EducationPage() {
  const cmsData = await fetchPageLayout("education");
  if (cmsData) return <CmsPageRender data={cmsData} />;
  return <EducationPageClient />;
}
