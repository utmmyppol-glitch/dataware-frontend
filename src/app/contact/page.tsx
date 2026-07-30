import { fetchPageLayout, CmsPageRender } from "@/lib/cms-page";
import ContactPageClient from "./ContactPageClient";

export default async function ContactPage() {
  const cmsData = await fetchPageLayout("contact");
  if (cmsData) return <CmsPageRender data={cmsData} />;
  return <ContactPageClient />;
}
