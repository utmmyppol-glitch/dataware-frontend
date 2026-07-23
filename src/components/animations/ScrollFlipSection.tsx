'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-init';

interface ScrollFlipSectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Biocomputer-style: 스크롤 시 섹션이 3D perspective로
 * 위로 기울어지며 사라지고, 다음 콘텐츠가 드러나는 효과.
 */
export default function ScrollFlipSection({ children, className = '', style = {} }: ScrollFlipSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current!, {
        rotateX: -8,
        scale: 0.92,
        opacity: 0.3,
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current!,
          start: 'bottom 90%',
          end: 'bottom 10%',
          scrub: 1,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        perspective: '1200px',
        transformOrigin: 'center top',
        willChange: 'transform, opacity',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
