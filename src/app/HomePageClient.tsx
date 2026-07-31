'use client';

import React, { useState, useEffect } from 'react';
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
import { safeParse, useEditMode, useEditableManifest, EDITABLE_STYLES } from '@/lib/editable';
import { COPY } from '@/data';

/* ── 기본값 (DB에 값이 없을 때 fallback) ── */
const DEFAULT_HOME_HERO = { title: `${COPY.heroDA.line1}\n${COPY.heroDA.line2}\n${COPY.heroDA.line3}`, desc: COPY.heroDA.subtitle };
const DEFAULT_HOME_TRUSTED = { title: '국내 주요 기업의 데이터 환경을 함께합니다.' };
const DEFAULT_HOME_WHY = { title: COPY.roleSection };
const DEFAULT_HOME_DATAFLOW = { title: '데이터 분석, 설계, 활용을 한번에!' };
const DEFAULT_HOME_PLATFORM = { title: 'DATAWARE\n제품 라인업.' };
const DEFAULT_HOME_FEATURES = { title: COPY.whyDA };
const DEFAULT_HOME_CUSTOMERS = { title: COPY.customers };
const DEFAULT_HOME_NEWS = { title: '유니온시스템즈 소식.' };
const DEFAULT_HOME_CTA = { title: '데이터 거버넌스\n도입이 고민이신가요?', title2: 'DA# 무료 체험\n시작하기.' };

export default function HomePageClient({ ssrContent }: { ssrContent: Record<string, string> }) {
  const heroRef = useHeroAnim() as React.RefObject<HTMLElement>;
  const s1 = useGsapReveal() as React.RefObject<HTMLElement>;
  const s2 = useGsapReveal() as React.RefObject<HTMLElement>;
  const s3 = useGsapReveal() as React.RefObject<HTMLElement>;
  const s4 = useGsapReveal() as React.RefObject<HTMLElement>;
  const s5 = useGsapReveal() as React.RefObject<HTMLElement>;
  const s6 = useGsapReveal() as React.RefObject<HTMLElement>;
  const s7 = useGsapReveal() as React.RefObject<HTMLElement>;
  const editMode = useEditMode();
  useEditableManifest(editMode);

  // SSR에서 받은 데이터로 초기화 (hydration 즉시)
  const [homeHero, setHomeHero] = useState(() => safeParse(ssrContent.home_hero, DEFAULT_HOME_HERO));
  const [homeTrusted, setHomeTrusted] = useState(() => safeParse(ssrContent.home_trusted, DEFAULT_HOME_TRUSTED));
  const [homeWhy, setHomeWhy] = useState(() => safeParse(ssrContent.home_why, DEFAULT_HOME_WHY));
  const [homeDataflow, setHomeDataflow] = useState(() => safeParse(ssrContent.home_dataflow, DEFAULT_HOME_DATAFLOW));
  const [homePlatform, setHomePlatform] = useState(() => safeParse(ssrContent.home_platform, DEFAULT_HOME_PLATFORM));
  const [homeFeatures, setHomeFeatures] = useState(() => safeParse(ssrContent.home_features, DEFAULT_HOME_FEATURES));
  const [homeCustomers, setHomeCustomers] = useState(() => safeParse(ssrContent.home_customers, DEFAULT_HOME_CUSTOMERS));
  const [homeNews, setHomeNews] = useState(() => safeParse(ssrContent.home_news, DEFAULT_HOME_NEWS));
  const [homeCta, setHomeCta] = useState(() => safeParse(ssrContent.home_cta, DEFAULT_HOME_CTA));

  // postMessage 수신 (편집모드에서만)
  useEffect(() => {
    if (!editMode) return;
    const setters: Record<string, (v: unknown) => void> = {
      home_hero: setHomeHero as (v: unknown) => void,
      home_trusted: setHomeTrusted as (v: unknown) => void,
      home_why: setHomeWhy as (v: unknown) => void,
      home_dataflow: setHomeDataflow as (v: unknown) => void,
      home_platform: setHomePlatform as (v: unknown) => void,
      home_features: setHomeFeatures as (v: unknown) => void,
      home_customers: setHomeCustomers as (v: unknown) => void,
      home_news: setHomeNews as (v: unknown) => void,
      home_cta: setHomeCta as (v: unknown) => void,
    };
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'content-update') {
        const fn = setters[e.data.section];
        if (fn) fn(e.data.data);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [editMode]);

  return (
    <>
      <HeroSection heroRef={heroRef} editMode={editMode} content={homeHero} />
      <TrustedBySection sectionRef={s1} editMode={editMode} content={homeTrusted} />
      <WhySection sectionRef={s2} editMode={editMode} content={homeWhy} />
      <DataFlowSection sectionRef={s3} editMode={editMode} content={homeDataflow} />
      <PlatformSection sectionRef={s4} editMode={editMode} content={homePlatform} />
      <CoreFeaturesSection sectionRef={s5} editMode={editMode} content={homeFeatures} />
      <CustomersSection sectionRef={s6} editMode={editMode} content={homeCustomers} />
      <NewsSection sectionRef={s7} editMode={editMode} content={homeNews} />
      <CtaSection editMode={editMode} content={homeCta} />

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
