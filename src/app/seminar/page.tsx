import { fetchPageLayout, CmsPageRender } from "@/lib/cms-page";
import SeminarPageClient from "./SeminarPageClient";

export default async function SeminarPage() {
  const cmsData = await fetchPageLayout("seminar");

  // CMS에 발행된 콘텐츠가 있으면 그걸로 렌더
  if (cmsData) {
    return <CmsPageRender data={cmsData} />;
  }

  // 없으면 기존 하드코딩 페이지
  return <SeminarPageClient />;
}
