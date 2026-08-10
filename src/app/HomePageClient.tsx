'use client';

import React, { useState, useEffect } from 'react';
import { safeParse, useEditMode, useEditableManifest, EDITABLE_STYLES } from '@/lib/editable';
import { COPY } from '@/data';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';
import HeroSection from '@/components/home/HeroSection';
import TrustedBySection from '@/components/home/TrustedBySection';
import WhySection from '@/components/home/WhySection';
import DataFlowSection from '@/components/home/DataFlowSection';
import PlatformSection from '@/components/home/PlatformSection';
import CoreFeaturesSection from '@/components/home/CoreFeaturesSection';
import CustomersSection from '@/components/home/CustomersSection';
import NewsSection from '@/components/home/NewsSection';
import CtaSection from '@/components/home/CtaSection';

/* ── 섹션별 기본 콘텐츠 ── */
const DEFAULT_HERO = { title: `${COPY.heroDA.line1}\n${COPY.heroDA.line2}\n${COPY.heroDA.line3}`, desc: COPY.heroDA.subtitle };
const DEFAULT_TRUSTED = { title: '국내 주요 기업의 데이터 환경을 함께합니다.' };
const DEFAULT_WHY = { title: COPY.roleSection };
const DEFAULT_DATAFLOW = { title: '데이터 분석, 설계, 활용을 한번에!' };
const DEFAULT_PLATFORM = { title: 'DATAWARE\n제품 라인업.' };
const DEFAULT_FEATURES = { title: COPY.whyDA + '.' };
const DEFAULT_CUSTOMERS = { title: COPY.customers };
const DEFAULT_NEWS = { title: COPY.newsSection + '.' };
const DEFAULT_CTA = { title: '데이터 거버넌스\n도입이 고민이신가요?', title2: 'DA# 무료 체험\n시작하기.' };

interface HomePageClientProps {
  ssrContent?: Record<string, string>;
}

export default function HomePageClient({ ssrContent = {} }: Readonly<HomePageClientProps>) {
  const editMode = useEditMode();
  useEditableManifest(editMode);

  /* ── 섹션 콘텐츠 state (SSR → postMessage 업데이트) ── */
  const [heroContent, setHeroContent] = useState(() => safeParse(ssrContent['home_hero'], DEFAULT_HERO));
  const [trustedContent, setTrustedContent] = useState(() => safeParse(ssrContent['home_trusted'], DEFAULT_TRUSTED));
  const [whyContent, setWhyContent] = useState(() => safeParse(ssrContent['home_why'], DEFAULT_WHY));
  const [dataflowContent, setDataflowContent] = useState(() => safeParse(ssrContent['home_dataflow'], DEFAULT_DATAFLOW));
  const [platformContent, setPlatformContent] = useState(() => safeParse(ssrContent['home_platform'], DEFAULT_PLATFORM));
  const [featuresContent, setFeaturesContent] = useState(() => safeParse(ssrContent['home_features'], DEFAULT_FEATURES));
  const [customersContent, setCustomersContent] = useState(() => safeParse(ssrContent['home_customers'], DEFAULT_CUSTOMERS));
  const [newsContent, setNewsContent] = useState(() => safeParse(ssrContent['home_news'], DEFAULT_NEWS));
  const [ctaContent, setCtaContent] = useState(() => safeParse(ssrContent['home_cta'], DEFAULT_CTA));

  /* ── content-update 리스너 (편집 모드에서 실시간 반영) ── */
  useEffect(() => {
    if (!editMode) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setters: Record<string, (v: any) => void> = {
      home_hero: setHeroContent,
      home_trusted: setTrustedContent,
      home_why: setWhyContent,
      home_dataflow: setDataflowContent,
      home_platform: setPlatformContent,
      home_features: setFeaturesContent,
      home_customers: setCustomersContent,
      home_news: setNewsContent,
      home_cta: setCtaContent,
    };
    const handler = (e: MessageEvent) => {
      if (e.data?.type !== 'content-update') return;
      const fn = setters[e.data.section];
      if (fn) fn(e.data.data);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [editMode]);

  const heroRef = useHeroAnim() as React.RefObject<HTMLElement>;
  const s1 = useGsapReveal() as React.RefObject<HTMLElement>;
  const s2 = useGsapReveal() as React.RefObject<HTMLElement>;
  const s3 = useGsapReveal() as React.RefObject<HTMLElement>;
  const s4 = useGsapReveal() as React.RefObject<HTMLElement>;
  const s5 = useGsapReveal() as React.RefObject<HTMLElement>;
  const s6 = useGsapReveal() as React.RefObject<HTMLElement>;
  const s7 = useGsapReveal() as React.RefObject<HTMLElement>;

  return (
    <>
      <HeroSection heroRef={heroRef} editMode={editMode} content={heroContent} />
      <TrustedBySection sectionRef={s1} editMode={editMode} content={trustedContent} />
      <WhySection sectionRef={s2} editMode={editMode} content={whyContent} />
      <DataFlowSection sectionRef={s3} editMode={editMode} content={dataflowContent} />
      <PlatformSection sectionRef={s4} editMode={editMode} content={platformContent} />
      <CoreFeaturesSection sectionRef={s5} editMode={editMode} content={featuresContent} />
      <CustomersSection sectionRef={s6} editMode={editMode} content={customersContent} />
      <NewsSection sectionRef={s7} editMode={editMode} content={newsContent} />
      <CtaSection editMode={editMode} content={ctaContent} />

      {editMode && <style>{EDITABLE_STYLES}</style>}
      <style>{`
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .hero-cta-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 28px -4px rgba(54,200,138,.4) !important; }
        .hero-cta-primary:hover span { transform: translateX(3px); }
        .hero-cta-secondary:hover { background: #111 !important; color: #fff !important; transform: translateY(-3px); }
        @keyframes detailFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
}
