'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-init';
import Link from 'next/link';

interface ShowcaseSlide {
  title: string;
  subtitle: string;
  img: string;
  href: string;
  accent: string;
}

interface HorizontalShowcaseProps {
  slides: ShowcaseSlide[];
  headline: string;
  subheadline: string;
  description: string;
}

export default function HorizontalShowcase({ slides, headline, subheadline, description }: HorizontalShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    if (typeof window === 'undefined') return;

    // Only enable pin on desktop
    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const totalScroll = track.scrollWidth - window.innerWidth * 0.55;

      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-hidden" style={{ backgroundColor: '#0b1220' }}>
      <div className="flex items-center" style={{ minHeight: '100vh' }}>
        {/* LEFT — 고정 텍스트 영역 */}
        <div
          className="shrink-0 relative z-10 hidden lg:flex flex-col justify-center"
          style={{
            width: '45vw',
            padding: '0 clamp(40px, 5vw, 80px)',
          }}
        >
          <p className="eyebrow mb-4">{subheadline}</p>
          <h2
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 700,
              color: '#f1f5f9',
              lineHeight: 1.15,
              marginBottom: '20px',
              whiteSpace: 'pre-line',
            }}
          >
            {headline}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', lineHeight: 1.7, maxWidth: '400px', marginBottom: '32px' }}>
            {description}
          </p>
          <Link
            href="/products"
            className="btn-accent rounded-xl w-fit"
            style={{ padding: '14px 28px', fontSize: '15px' }}
          >
            전체 제품 보기
          </Link>

          {/* Scroll indicator */}
          <div className="mt-12 flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.25)' }}>
            <div style={{ width: '40px', height: '2px', backgroundColor: 'rgba(255,255,255,0.15)', position: 'relative', overflow: 'hidden', borderRadius: '1px' }}>
              <div style={{ width: '100%', height: '100%', backgroundColor: '#36c88a', animation: 'scrollIndicator 2s ease-in-out infinite' }} />
            </div>
            <span className="text-xs">스크롤하여 탐색</span>
          </div>
        </div>

        {/* RIGHT — 수평 슬라이드 트랙 */}
        <div
          ref={trackRef}
          className="flex items-center gap-8"
          style={{ paddingRight: '10vw', paddingLeft: '20px' }}
        >
          {slides.map((slide, i) => (
            <Link
              key={i}
              href={slide.href}
              className="shrink-0 group relative overflow-hidden rounded-3xl block"
              style={{
                width: '420px',
                height: '520px',
                textDecoration: 'none',
                transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.03)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; }}
            >
              {/* Background image */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(180deg, ${slide.accent}18 0%, ${slide.accent}08 50%, #0f172a 100%)`,
                }}
              />
              <div
                className="absolute inset-0"
                style={{ border: `1px solid ${slide.accent}25`, borderRadius: '24px', pointerEvents: 'none' }}
              />

              {/* Product image — 크게 */}
              <div className="relative z-10 flex items-center justify-center" style={{ height: '320px', padding: '32px' }}>
                <img
                  src={slide.img}
                  alt={slide.title}
                  style={{
                    maxHeight: '260px',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
                    transition: 'transform 0.4s',
                  }}
                  className="group-hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className="relative z-10 px-8 pb-8">
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#f1f5f9', marginBottom: '8px' }}>
                  {slide.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  {slide.subtitle}
                </p>
                <span
                  className="inline-flex items-center gap-1 mt-4 text-sm font-semibold group-hover:gap-2 transition-all"
                  style={{ color: slide.accent }}
                >
                  자세히 보기
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile fallback — 일반 그리드 */}
      <div className="lg:hidden px-5 py-16">
        <div className="text-center mb-10">
          <p className="eyebrow mb-3">{subheadline}</p>
          <h2 className="headline-lg mb-4" style={{ color: '#f1f5f9' }}>{headline}</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>{description}</p>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
          {slides.map((slide, i) => (
            <Link
              key={i}
              href={slide.href}
              className="shrink-0 snap-start rounded-2xl overflow-hidden block"
              style={{
                width: '280px',
                backgroundColor: '#111827',
                border: `1px solid ${slide.accent}20`,
                textDecoration: 'none',
              }}
            >
              <div className="flex items-center justify-center p-6" style={{ height: '180px', background: `linear-gradient(180deg, ${slide.accent}12 0%, transparent 100%)` }}>
                <img src={slide.img} alt={slide.title} style={{ maxHeight: '140px', objectFit: 'contain' }} />
              </div>
              <div className="p-5">
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f1f5f9', marginBottom: '4px' }}>{slide.title}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{slide.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollIndicator {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
