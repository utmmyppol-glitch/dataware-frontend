import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/layout/ChatBot";

import { USE_MOCK, mockMenuItems } from "@/lib/mock";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/dataware";

export interface SsrMenuItem {
  url: string;
  sortOrder: number;
}

interface MenuApiItem {
  name: string;
  url: string;
  isExposed: boolean;
  sortOrder?: number;
  children?: MenuApiItem[];
}

async function getMenu(): Promise<SsrMenuItem[] | null> {
  if (USE_MOCK) return mockMenuItems.map((m) => ({ url: m.url, sortOrder: m.sortOrder ?? 0 }));
  try {
    const base = API_URL.replace(/\/api\/dataware\/?$/, "");
    const res = await fetch(`${base}/api/dataware/menus`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data: MenuApiItem[] = await res.json();
    if (!data || data.length === 0) return null;
    return data
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((m) => ({ url: m.url, sortOrder: m.sortOrder ?? 0 }));
  } catch {
    return null;
  }
}

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-noto",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dataware.unionsystems.co.kr';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'UNION DATAWARE - DA# 데이터 모델링 & DATAWARE 솔루션',
    template: '%s | 데이터웨어(엔코아)',
  },
  description: 'DA#, META#, DQ#, AP#, DF#, ETT#, DP# - 데이터 거버넌스 All-in-One Package. 유니온시스템즈는 엔코아 DATAWARE 공식 총판입니다.',
  keywords: ['DATAWARE', 'DA#', '데이터 모델링', '데이터 거버넌스', '엔코아', '메타데이터', '데이터 품질', '유니온시스템즈'],
  openGraph: {
    siteName: '데이터웨어(엔코아)',
    locale: 'ko_KR',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 1200,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ssrMenu = await getMenu();

  return (
    <html lang="ko">
      <head />
      <body className={`${notoSansKr.variable} antialiased`} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header ssrMenu={ssrMenu} />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
