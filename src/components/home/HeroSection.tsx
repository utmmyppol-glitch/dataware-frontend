'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { COPY } from '@/data';
import { E } from '@/lib/editable';
import type { Solution } from '@/data/molecular-data';

const MolecularU = dynamic(() => import('@/components/MolecularU'), { ssr: false });

function useCountUp(target: number, dur = 2400) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const ran = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !ran.current) {
        ran.current = true;
        const s = performance.now();
        const tick = (now: number) => { const p = Math.min((now - s) / dur, 1); setN(Math.floor(p * target)); if (p < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target, dur]);
  return { n, ref };
}

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLElement>;
  editMode: boolean;
  content?: { title?: string; desc?: string };
}

export default function HeroSection({ heroRef, editMode, content }: HeroSectionProps) {
  const [zoomedSolution, setZoomedSolution] = useState<Solution | null>(null);
  const [explorerMode, setExplorerMode] = useState(false);
  const isZoomed = zoomedSolution !== null;

  const c1 = useCountUp(3000);
  const c2 = useCountUp(20);
  useCountUp(100);

  return (
    <section ref={heroRef} style={{ minHeight: '100vh', background: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '-5%', right: '-2%', zIndex: 1, opacity: 0.04, pointerEvents: 'none' }}>
        <Image src="/images/da-watermark.png" alt="" width={500} height={500} style={{ width: 'clamp(300px, 35vw, 500px)', height: 'auto' }} />
      </div>
      <div style={{ position: 'relative', minHeight: '100vh', zIndex: 2 }}>
        <div
          className="hero-main-content"
          style={{
            width: '100%',
            padding: '72px clamp(32px, 5vw, 72px) 40px clamp(20px, 3vw, 48px)',
            display: 'grid',
            gridTemplateColumns: explorerMode && !isZoomed ? '1fr' : 'minmax(0, 0.38fr) minmax(0, 0.62fr)',
            alignItems: 'center',
            gap: 'clamp(24px, 3vw, 48px)',
            maxWidth: explorerMode && !isZoomed ? 1000 : 1520,
            margin: '0 auto',
            transition: 'max-width .5s ease, grid-template-columns .5s ease',
          }}
        >
          {/* LEFT */}
          <div style={{
            position: 'relative', minWidth: 0,
            display: explorerMode && !isZoomed ? 'none' : 'block',
          }}>
            <div style={{
              opacity: explorerMode ? 0 : 1,
              transform: explorerMode ? 'translateY(-10px)' : 'translateY(0)',
              transition: 'opacity .5s ease, transform .5s ease',
              pointerEvents: explorerMode ? 'none' : 'auto',
              position: explorerMode ? 'absolute' : 'relative',
              visibility: explorerMode ? 'hidden' : 'visible',
              width: '100%',
            }}>
              <div data-hero style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, fontSize: 12, fontWeight: 600, letterSpacing: '.12em', color: '#36c88a' }}>
                <span style={{ width: 20, height: 1.5, background: '#36c88a' }} />
                ENTERPRISE DATA PLATFORM
              </div>

              <h2 data-hero style={{ fontWeight: 900, fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.05em', color: '#111', margin: '0 0 22px' }}>
                <E id="home_hero.title" editMode={editMode}>{content?.title ?? `${COPY.heroDA.line1}\n${COPY.heroDA.line2}\n${COPY.heroDA.line3}`}</E>
              </h2>

              <p data-hero style={{ fontWeight: 400, fontSize: 'clamp(15px, 1.4vw, 17px)', lineHeight: 1.75, color: '#676767', maxWidth: 640, margin: '0 0 24px' }}><E id="home_hero.desc" editMode={editMode}>{content?.desc ?? COPY.heroDA.subtitle}</E></p>

              <div data-hero style={{ fontSize: 13, color: '#676767', marginBottom: 28, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'rgba(54,200,138,.04)', border: '1px solid rgba(54,200,138,.1)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#36c88a', boxShadow: '0 0 0 3px rgba(54,200,138,.15)' }} />
                민트 노드에 올려 살펴보고, 클릭해 안으로 들어가 보세요
              </div>

              <div data-hero style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/contact" className="hero-cta-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '18px 36px', backgroundColor: '#36c88a', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 20px -4px rgba(54,200,138,.35)', transition: 'transform .2s, box-shadow .2s' }}>
                  도입문의하기<span style={{ fontSize: 15 }}>&rarr;</span>
                </Link>
                <Link href="/download" className="hero-cta-secondary" style={{ display: 'inline-flex', alignItems: 'center', padding: '18px 36px', border: '1.5px solid #d5d8dd', background: 'transparent', color: '#111', fontWeight: 700, fontSize: 15, textDecoration: 'none', transition: 'transform .2s, background .2s, color .2s' }}>
                  다운로드 신청하기
                </Link>
              </div>

              <div data-hero style={{ display: 'flex', gap: 0, marginTop: 36, paddingTop: 28, borderTop: '1px solid #e6e8ec' }}>
                {[
                  { num: '3,000', label: '도입 기업', accent: true, ref: c1.ref },
                  { num: '20', label: '업력', accent: true, ref: c2.ref },
                  { num: 'GS 1등급', label: '인증', accent: false, ref: undefined },
                ].map((s, i) => (
                  <div key={i} style={{ flex: 1, paddingLeft: i > 0 ? 24 : 0, borderLeft: i > 0 ? '1px solid #e6e8ec' : 'none' }}>
                    <span ref={s.ref} style={{ fontSize: 28, fontWeight: 800, color: '#111', lineHeight: 1, display: 'block' }}>
                      {s.accent ? <>{s.num}<span style={{ color: '#36c88a' }}>+</span></> : s.num}
                    </span>
                    <div style={{ fontSize: 12, color: '#676767', marginTop: 6, letterSpacing: '.04em' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Molecular U */}
          <div
            className="hero-molecular-area"
            style={{
              position: 'relative',
              minHeight: isZoomed ? 'calc(100vh - 120px)' : explorerMode ? 'calc(100vh - 180px)' : 700,
              height: isZoomed ? 'calc(100vh - 120px)' : explorerMode ? 'calc(100vh - 180px)' : 'clamp(600px, 72vh, 960px)',
              overflow: 'visible',
              transition: 'min-height .4s ease, height .4s ease',
            }}
          >
            {explorerMode && !isZoomed && (
              <div style={{
                position: 'absolute', top: 8, left: 0, right: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
                zIndex: 20, animation: 'detailFadeIn .4s ease-out',
              }}>
                <button onClick={() => { setZoomedSolution(null); setExplorerMode(false); }} style={{
                  background: 'none', border: '1px solid #d5d8dd', padding: '8px 20px',
                  fontSize: 13, fontWeight: 600, color: '#676767', cursor: 'pointer', transition: 'all .2s',
                }}>← 메인으로 돌아가기</button>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#111', letterSpacing: '-0.02em' }}>
                  솔루션을 선택하세요
                </span>
              </div>
            )}
            <MolecularU
              onZoom={(sol) => { setZoomedSolution(sol); setExplorerMode(false); }}
              onClose={() => { setZoomedSolution(null); setExplorerMode(true); }}
              onBrochure={() => { window.location.href = '/download'; }}
              onContact={() => { window.location.href = '/contact'; }}
              zoomedSolution={zoomedSolution}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
