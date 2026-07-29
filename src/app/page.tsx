'use client';

import React from 'react';
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

export default function Home() {
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
      <HeroSection heroRef={heroRef} />
      <TrustedBySection sectionRef={s1} />
      <WhySection sectionRef={s2} />
      <DataFlowSection sectionRef={s3} />
      <PlatformSection sectionRef={s4} />
      <CoreFeaturesSection sectionRef={s5} />
      <CustomersSection sectionRef={s6} />
      <NewsSection sectionRef={s7} />
      <CtaSection />

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
