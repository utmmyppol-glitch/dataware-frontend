'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-init';

/**
 * Scroll-triggered reveal animation hook.
 * Attach the returned ref to any container element.
 * Children with [data-anim] will animate in with stagger.
 */
export function useGsapReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate all [data-anim] children
      const items = containerRef.current!.querySelectorAll('[data-anim]');
      if (items.length === 0) {
        // If no [data-anim] children, animate the container itself
        gsap.from(containerRef.current!, {
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current!,
            start: 'top 85%',
            once: true,
          },
        });
      } else {
        gsap.from(items, {
          y: 32,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: containerRef.current!,
            start: 'top 85%',
            once: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
}

/**
 * Hero entrance animation — immediate, no scroll trigger.
 */
export function useHeroAnim() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      const items = containerRef.current!.querySelectorAll('[data-hero]');

      tl.from(items, {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
}

/**
 * Parallax effect on scroll.
 */
export function useParallax(speed: number = -15) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current!, {
        yPercent: speed,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current!,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

/**
 * Counter animation (replaces useCountUp hook).
 */
export function useGsapCounter(target: number, suffix: string = '') {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          const display = obj.val >= 1000
            ? Math.floor(obj.val).toLocaleString('ko-KR')
            : String(Math.floor(obj.val));
          el.textContent = display + suffix;
        },
      });
    });

    return () => ctx.revert();
  }, [target, suffix]);

  return ref;
}
