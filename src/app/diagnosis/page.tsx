import { fetchPageLayout, CmsPageRender } from "@/lib/cms-page";
import DiagnosisPageClient from "./DiagnosisPageClient";

export default async function DiagnosisPage() {
  const cmsData = await fetchPageLayout("diagnosis");
  if (cmsData) return <CmsPageRender data={cmsData} />;
  return <DiagnosisPageClient />;
}
