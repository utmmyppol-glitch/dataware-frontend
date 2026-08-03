import { Metadata } from 'next';
import HomePageClient from "./HomePageClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/dataware';
const CONTENT_KEYS = [
  'home_hero','home_trusted','home_why','home_dataflow',
  'home_platform','home_features','home_customers','home_news','home_cta',
  'home_seo_title','home_seo_description',
];

async function getHomeContent(): Promise<Record<string, string>> {
  try {
    const base = API_URL.replace(/\/api\/dataware\/?$/, '');
    const res = await fetch(
      `${base}/api/dataware/content?keys=${CONTENT_KEYS.join(',')}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return {};
    return res.json();
  } catch {
    return {};
  }
}

const DEF_TITLE = 'UNION DATAWARE - DA# 데이터 모델링 & DATAWARE 솔루션';
const DEF_DESC = 'DA#, META#, DQ#, AP#, DF#, ETT#, DP# - 데이터 거버넌스 All-in-One Package. 유니온시스템즈는 엔코아 DATAWARE 공식 총판입니다.';

export async function generateMetadata(): Promise<Metadata> {
  const c = await getHomeContent();
  const title = c.home_seo_title || DEF_TITLE;
  const description = c.home_seo_description || DEF_DESC;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function HomePage() {
  const content = await getHomeContent();
  return <HomePageClient ssrContent={content} />;
}
