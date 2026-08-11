'use client';

import React from 'react';
import { useEditableContent, EDITABLE_STYLES } from '@/lib/editable';
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
const DEFAULTS = {
  home_hero: { title: `${COPY.heroDA.line1}\n${COPY.heroDA.line2}\n${COPY.heroDA.line3}`, desc: COPY.heroDA.subtitle },
  home_trusted: { title: '국내 주요 기업의 데이터 환경을 함께합니다.' },
  home_why: { title: COPY.roleSection },
  home_dataflow: { title: '데이터 분석, 설계, 활용을 한번에!' },
  home_platform: { title: 'DATAWARE\n제품 라인업.' },
  home_features: { title: COPY.whyDA + '.' },
  home_customers: { title: COPY.customers },
  home_news: { title: COPY.newsSection + '.' },
  home_cta: { title: '데이터 거버넌스\n도입이 고민이신가요?', title2: 'DA# 무료 체험\n시작하기.' },
} as const;

interface HomePageClientProps {
  ssrContent?: Record<string, string>;
}

export default function HomePageClient({ ssrContent = {} }: Readonly<HomePageClientProps>) {
  const [content, editMode] = useEditableContent(DEFAULTS, ssrContent);

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
      <HeroSection heroRef={heroRef} editMode={editMode} content={content.home_hero} />
      <TrustedBySection sectionRef={s1} editMode={editMode} content={content.home_trusted} />
      <WhySection sectionRef={s2} editMode={editMode} content={content.home_why} />
      <DataFlowSection sectionRef={s3} editMode={editMode} content={content.home_dataflow} />
      <PlatformSection sectionRef={s4} editMode={editMode} content={content.home_platform} />
      <CoreFeaturesSection sectionRef={s5} editMode={editMode} content={content.home_features} />
      <CustomersSection sectionRef={s6} editMode={editMode} content={content.home_customers} />
      <NewsSection sectionRef={s7} editMode={editMode} content={content.home_news} />
      <CtaSection editMode={editMode} content={content.home_cta} />

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
