import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/layout/ChatBot";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/dataware";

async function getVisibleUrls(): Promise<string[] | null> {
  try {
    const base = API_URL.replace(/\/api\/dataware\/?$/, "");
    const res = await fetch(`${base}/api/dataware/menu`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data: { url: string; isExposed: boolean }[] = await res.json();
    return data.filter((m) => m.isExposed !== false).map((m) => m.url);
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

export const metadata: Metadata = {
  title: "UNION DATAWARE - DA# 데이터 모델링 & DATAWARE 솔루션",
  description: "DA#, META#, DQ#, AP#, DF#, ETT#, DP# - 데이터 거버넌스 All-in-One Package. 유니온시스템즈는 엔코아 DATAWARE 공식 총판입니다.",
};

export const viewport: Viewport = {
  width: 1200,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ssrVisibleUrls = await getVisibleUrls();

  return (
    <html lang="ko">
      <head />
      <body className={`${notoSansKr.variable} antialiased`} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header ssrVisibleUrls={ssrVisibleUrls} />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
