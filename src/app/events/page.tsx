import { fetchPageLayout, CmsPageRender } from "@/lib/cms-page";
import EventsPageClient from "./EventsPageClient";

export default async function EventsPage() {
  const cmsData = await fetchPageLayout("events");
  if (cmsData) return <CmsPageRender data={cmsData} />;
  return <EventsPageClient />;
}
