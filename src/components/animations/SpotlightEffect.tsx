'use client';

import { useEffect, useRef, useCallback } from 'react';

interface SpotlightEffectProps {
  children: React.ReactNode;
  radius?: number;
  intensity?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function SpotlightEffect({
  children,
  radius = 300,
  intensity = 0.25,
  color = '54, 200, 138',
  className = '',
  style = {},
}: SpotlightEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mousePos = useRef({ x: -1000, y: -1000 });

  const updateSpotlight = useCallback(() => {
    if (!containerRef.current) return;
    const { x, y } = mousePos.current;
    containerRef.current.style.setProperty('--spot-x', `${x}px`);
    containerRef.current.style.setProperty('--spot-y', `${y}px`);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateSpotlight);
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -1000, y: -1000 };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateSpotlight);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateSpotlight]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        '--spot-x': '-1000px',
        '--spot-y': '-1000px',
        '--spot-r': `${radius}px`,
        '--spot-color': color,
        '--spot-intensity': String(intensity),
        ...style,
      } as React.CSSProperties}
    >
      {children}
      <style>{`
        [style*="--spot-x"]::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 5;
          border-radius: inherit;
          background: radial-gradient(
            var(--spot-r) circle at var(--spot-x) var(--spot-y),
            rgba(var(--spot-color), var(--spot-intensity)) 0%,
            rgba(var(--spot-color), calc(var(--spot-intensity) * 0.4)) 25%,
            rgba(var(--spot-color), calc(var(--spot-intensity) * 0.1)) 45%,
            transparent 70%
          );
          transition: none;
        }
      `}</style>
    </div>
  );
}
