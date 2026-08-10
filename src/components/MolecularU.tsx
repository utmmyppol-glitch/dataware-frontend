'use client';

import { E } from '@/lib/editable';

/*
 * MolecularU.tsx — DATAWARE 버전 (유니온 원본과 구조/애니메이션 100% 동일, 색상만 그린)
 *
 * ★ U가 잘리지 않게 하는 핵심 규칙 (유니온과 동일):
 *   1) 이 컴포넌트는 부모 안에서 position:absolute; inset:0 로 꽉 찬다.
 *   2) U 이미지는 objectFit:'contain' → 컨테이너 안에 "항상 통째로" 들어온다(잘림 0).
 *   3) 따라서 절대 이미지에 고정 px width/height나 scale-up 주지 말 것.
 *   4) 부모(.hero-molecular-area)는 height: clamp(600px,72vh,960px); overflow:visible.
 *   → 이 4가지만 지키면 어떤 화면에서도 하단 노드(DP#)와 반사까지 다 보인다.
 *
 * ★ DATAWARE 초록 U 이미지의 원본 픽셀 크기를 IMG_NAT_W/H에 정확히 넣을 것.
 *   (유니온 union-u-v2.png = 1269×1239. DATAWARE 이미지가 다르면 그 값으로 교체)
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Solution, SOLUTIONS } from '@/data/molecular-data';
import SolutionDiagram from '@/components/SolutionDiagram';

const IMG_NAT_W = 1269;
const IMG_NAT_H = 1239;
const ZOOM = 2.4;
const LENS_R = 78;

const ACCENT = '#36c88a';        // DATAWARE 브랜드 그린
// const ACCENT_DARK = '#2ba876';
const U_IMAGE = '/images/dataware-u.png';   // ★ DATAWARE 초록 U 이미지 경로

type Phase = 'idle' | 'sucking' | 'zoomed' | 'unsucking';

interface Props {
  onZoom: (sol: Solution) => void;
  onClose: () => void;
  onBrochure: () => void;
  onContact: () => void;
  zoomedSolution: Solution | null;
}

/* ═══ Micro Structure (zoomed) — 좌우 2단 + SolutionDiagram ═══ */
function MicroStructure({ solution, onClose, onBrochure, onContact }: {
  solution: Solution;
  onClose: () => void;
  onBrochure: () => void;
  onContact: () => void;
}) {
  const feats = solution.feats;
  const accent = ACCENT;

  /* ── 데스크톱: 좌/우 2단 레이아웃 (DC 레퍼런스 그대로) ── */
  const checkSvg = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#36c88a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 40,
        cursor: 'default', overflowY: 'auto',
        background: '#ffffff',
        display: 'flex', alignItems: 'center',
        padding: '96px clamp(24px, 4vw, 64px) 40px',
      }}
    >
      <div style={{ width: '100%', maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0,0.42fr) minmax(0,0.58fr)', gap: 'clamp(32px,4vw,64px)', alignItems: 'center', minHeight: 'calc(100vh - 200px)' }}>

        {/* ── 좌측: 텍스트 상세 ── */}
        <div style={{ maxWidth: 520, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* 네비 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 13, fontWeight: 600, marginBottom: 26 }}>
            <button onClick={() => { window.location.href = '/'; }} style={{ color: '#888d94', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}><E id="molecular_nav.back" editMode={false}>← 메인으로 돌아가기</E></button>
            <button onClick={onClose} style={{ color: accent, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}><E id="molecular_nav.other" editMode={false}>다른 솔루션 보기 →</E></button>
          </div>

          {/* eyebrow */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 800, letterSpacing: '.16em', color: accent }}>
            <span style={{ width: 22, height: 2, background: accent, display: 'inline-block' }} />
            WHY {solution.vendor}
          </div>

          {/* 대형 타이틀 */}
          <h1 style={{ fontSize: 'clamp(38px, 4.4vw, 58px)', fontWeight: 900, color: '#111', letterSpacing: '-0.035em', lineHeight: 1.12, marginTop: 16 }}>
            {solution.area.split(' ').map((w, i, a) => <span key={i}>{w}{i < a.length - 1 ? <br /> : ''}</span>)}
            <span style={{ color: accent }}>.</span>
          </h1>

          {/* 부제 */}
          <p style={{ fontSize: 17, color: '#676767', marginTop: 20, lineHeight: 1.65 }}>{solution.desc}</p>

          {/* 태그칩 5개 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginTop: 26 }}>
            {feats.map((f, k) => (
              <span key={k} style={{ fontSize: 13, fontWeight: 700, color: '#111', padding: '8px 15px', border: '1px solid #d5d8dd', borderRadius: 999 }}>{f.n}</span>
            ))}
          </div>

          {/* 체크리스트 혜택 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 26, paddingTop: 24, borderTop: '1px solid #e6e8ec' }}>
            {solution.gain.map((g, k) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 11, fontSize: 15, color: '#333' }}>{checkSvg}{g}</div>
            ))}
          </div>

          {/* 스탯 */}
          <div style={{ display: 'flex', gap: 40, marginTop: 30 }}>
            <div><div style={{ fontSize: 32, fontWeight: 900, color: '#111' }}><E id="molecular_stat0.num" editMode={false}>3,000<span style={{ color: accent }}>+</span></E></div><div style={{ fontSize: 13, color: '#888d94', marginTop: 2 }}><E id="molecular_stat0.label" editMode={false}>도입 기업</E></div></div>
            <div><div style={{ fontSize: 32, fontWeight: 900, color: '#111' }}><E id="molecular_stat1.num" editMode={false}>20<span style={{ color: accent }}>+</span></E></div><div style={{ fontSize: 13, color: '#888d94', marginTop: 2 }}><E id="molecular_stat1.label" editMode={false}>업력</E></div></div>
            <div><div style={{ fontSize: 32, fontWeight: 900, color: '#111' }}><E id="molecular_stat2.num" editMode={false}>GS 1등급</E></div><div style={{ fontSize: 13, color: '#888d94', marginTop: 2 }}><E id="molecular_stat2.label" editMode={false}>인증</E></div></div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
            <button onClick={onContact} style={{ background: accent, color: '#fff', fontWeight: 700, fontFamily: 'inherit', fontSize: 15, padding: '14px 28px', border: 'none', borderRadius: 4, boxShadow: '0 6px 18px rgba(54,200,138,.28)', cursor: 'pointer' }}><E id="molecular_cta.contact" editMode={false}>도입문의하기 →</E></button>
            <button onClick={onBrochure} style={{ background: '#fff', color: '#111', fontWeight: 700, fontFamily: 'inherit', fontSize: 15, padding: '14px 26px', borderRadius: 4, border: '1px solid #d5d8dd', cursor: 'pointer' }}><E id="molecular_cta.brochure" editMode={false}>소개서 요청</E></button>
          </div>
        </div>

        {/* ── 우측: 다이어그램 (SolutionDiagram 컴포넌트) ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <SolutionDiagram
            vendor={solution.vendor}
            area={solution.area}
            desc={solution.desc}
            feats={feats}
            gainCount={solution.gain.length}
            size="560px"
          />
        </div>
      </div>
    </div>
  );
}

/* ═══ Portal Burst Effect ═══ */
function PortalBurst({ x, y }: { x: number; y: number }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', left: x, top: y, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.98) 0%, rgba(54,200,138,.6) 40%, transparent 72%)', animation: 'pCore .9s cubic-bezier(.4,0,.2,1) forwards' }} />
      <div style={{ position: 'absolute', left: x, top: y, width: 120, height: 120, borderRadius: '50%', border: '2px solid rgba(54,200,138,.7)', animation: 'pRing .85s cubic-bezier(.2,.7,.3,1) forwards' }} />
      {Array.from({ length: 8 }).map((_, a) => (
        <div key={a} style={{
          position: 'absolute', left: x, top: y, width: 5, height: 90, borderRadius: 3,
          background: 'linear-gradient(to bottom, rgba(54,200,138,.8), transparent)',
          // @ts-expect-error CSS custom property
          '--r': `${a * 45}deg`,
          animation: 'pRay .8s ease-out forwards',
        }} />
      ))}
    </div>
  );
}

function getContainedRect(containerW: number, containerH: number) {
  const imgRatio = IMG_NAT_W / IMG_NAT_H;
  const containerRatio = containerW / containerH;
  let w: number, h: number, offsetX: number, offsetY: number;
  if (containerRatio > imgRatio) {
    h = containerH; w = h * imgRatio; offsetX = (containerW - w) / 2; offsetY = 0;
  } else {
    w = containerW; h = w / imgRatio; offsetX = 0; offsetY = (containerH - h) / 2;
  }
  return { w, h, offsetX, offsetY };
}

/* ═══ Main Component ═══ */
export default function MolecularU({ onZoom, onClose, onBrochure, onContact, zoomedSolution }: Readonly<Props>) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [suckOrigin, setSuckOrigin] = useState('50% 50%');
  const [burst, setBurst] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const imgRect = useMemo(() => {
    if (containerSize.w === 0) return { w: 0, h: 0, offsetX: 0, offsetY: 0 };
    return getContainedRect(containerSize.w, containerSize.h);
  }, [containerSize]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setContainerSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!zoomedSolution && phase !== 'idle') {
      setPhase('unsucking');
      const t = setTimeout(() => setPhase('idle'), 800);
      return () => clearTimeout(t);
    }
  }, [zoomedSolution, phase]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMove = (e: PointerEvent) => {
      if (phase !== 'idle') return;
      const rc = el.getBoundingClientRect();
      const nx = (e.clientX - rc.left) / rc.width - 0.5;
      const ny = (e.clientY - rc.top) / rc.height - 0.5;
      setTilt({ x: nx * 6, y: -ny * 5 });
    };
    const handleLeave = () => { if (phase === 'idle') setTilt({ x: 0, y: 0 }); };
    el.addEventListener('pointermove', handleMove, { passive: true });
    el.addEventListener('pointerleave', handleLeave);
    return () => { el.removeEventListener('pointermove', handleMove); el.removeEventListener('pointerleave', handleLeave); };
  }, [phase]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape' && phase === 'zoomed') doClose(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const doClose = useCallback(() => {
    if (phase !== 'zoomed') return;
    setPhase('unsucking');
    onClose();
    setTimeout(() => setPhase('idle'), 800);
  }, [phase, onClose]);

  const doClick = useCallback((sol: Solution) => {
    if (phase !== 'idle' || imgRect.w === 0) return;
    const px = imgRect.offsetX + sol.x / 100 * imgRect.w;
    const py = imgRect.offsetY + sol.y / 100 * imgRect.h;
    const origin = `${(px / containerSize.w * 100).toFixed(1)}% ${(py / containerSize.h * 100).toFixed(1)}%`;
    setSuckOrigin(origin);
    setBurst({ x: px, y: py });
    setTimeout(() => setBurst(null), 950);
    setHoveredIdx(null);
    setPhase('sucking');
    onZoom(sol);
    setTimeout(() => setPhase('zoomed'), 1100);
  }, [phase, imgRect, containerSize, onZoom]);

  const stageStyle = (() => {
    if (phase === 'sucking') {
      return { transformOrigin: suckOrigin, animation: 'uSuck 1.1s cubic-bezier(.4,0,.2,1) forwards' as const, willChange: 'transform, opacity' as const, pointerEvents: 'none' as const };
    }
    if (phase === 'unsucking') {
      return { transformOrigin: suckOrigin, animation: 'uUnsuck 1s cubic-bezier(.25,.46,.45,.94) forwards' as const, willChange: 'transform, opacity' as const, pointerEvents: 'none' as const };
    }
    if (phase === 'zoomed') {
      return { transformOrigin: suckOrigin, visibility: 'hidden' as const, pointerEvents: 'none' as const };
    }
    return { transformOrigin: '50% 50%', transform: `rotateY(${tilt.x.toFixed(2)}deg) rotateX(${tilt.y.toFixed(2)}deg)`, transition: 'transform .3s ease-out', willChange: 'transform' as const, pointerEvents: 'auto' as const };
  })();

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, perspective: 1500, overflow: 'visible' }}>
      <div ref={stageRef} style={{ position: 'absolute', inset: 0, ...stageStyle }}>
        {/* Ripple */}
        <div style={{ position: 'absolute', left: '50%', bottom: 12, width: '60%', height: 120, transform: 'translateX(-50%)', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', left: '50%', bottom: 30, width: '88%', height: 40, borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(120,140,130,.14) 0%, rgba(120,140,130,.04) 45%, transparent 72%)', transform: 'translateX(-50%)', filter: 'blur(2px)' }} />
          {[
            { w: '100%', h: 90, b: 24, delay: '0s', color: 'rgba(150,170,160,.2)' },
            { w: '76%', h: 68, b: 32, delay: '1.5s', color: 'rgba(150,170,160,.28)' },
            { w: '52%', h: 46, b: 40, delay: '3s', color: 'rgba(150,170,160,.36)' },
            { w: '34%', h: 30, b: 48, delay: '4.5s', color: 'rgba(54,200,138,.28)' },
          ].map((r, i) => (
            <div key={i} style={{ position: 'absolute', left: '50%', bottom: r.b, width: r.w, height: r.h, borderRadius: '50%', border: `1px solid ${r.color}`, transform: 'translateX(-50%)', animation: `uRip 6s cubic-bezier(.33,0,.2,1) infinite ${r.delay}` }} />
          ))}
        </div>

        {/* Float container — U image + hotspots */}
        <div style={{ position: 'absolute', inset: 0, animation: phase === 'idle' ? 'flU 6s ease-in-out infinite, uSway 11s ease-in-out infinite' : 'none' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={U_IMAGE}
            alt="DATAWARE 데이터 거버넌스 플랫폼"
            draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 26px 42px rgba(50,80,65,.10))', userSelect: 'none' }}
          />

          {imgRect.w > 0 && SOLUTIONS.map((sol, i) => {
            const bd = (sol.r || 42) * (imgRect.w / IMG_NAT_W);
            const px = imgRect.offsetX + sol.x / 100 * imgRect.w;
            const py = imgRect.offsetY + sol.y / 100 * imgRect.h;
            const isHovered = hoveredIdx === i;
            const side: 'r' | 'l' | 'b' = sol.x < 40 ? 'r' : sol.x > 60 ? 'l' : 'b';

            return (
              <button
                key={sol.id}
                aria-label={sol.area}
                onClick={() => doClick(sol)}
                onMouseEnter={() => phase === 'idle' && setHoveredIdx(i)}
                onMouseLeave={() => phase === 'idle' && setHoveredIdx(null)}
                style={{
                  position: 'absolute', left: px, top: py, transform: 'translate(-50%, -50%)',
                  width: bd * 2 + 22, height: bd * 2 + 22,
                  display: phase === 'idle' ? 'flex' : 'none',
                  alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', zIndex: 16,
                  background: 'none', border: 'none', padding: 0, outline: 'none',
                }}
              >
                <div style={{
                  position: 'absolute', left: '50%', top: '50%',
                  width: bd * 3, height: bd * 3, borderRadius: '50%', transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, rgba(54,200,138,.34) 0%, rgba(54,200,138,.14) 38%, transparent 66%)',
                  animation: `hsPulse 3s ease-in-out infinite ${(i * 0.3).toFixed(2)}s`,
                  opacity: isHovered ? 0 : 1, transition: 'opacity .25s',
                }} />

                <div style={{
                  position: 'absolute', left: '50%', top: '50%',
                  width: isHovered ? LENS_R * 2 : 0, height: isHovered ? LENS_R * 2 : 0,
                  borderRadius: '50%', transform: 'translate(-50%, -50%)',
                  overflow: 'hidden', opacity: isHovered ? 1 : 0, pointerEvents: 'none',
                  transition: 'width .32s cubic-bezier(.34,1.4,.5,1), height .32s cubic-bezier(.34,1.4,.5,1), opacity .25s ease',
                  boxShadow: '0 16px 38px rgba(50,70,60,.26)', border: '3px solid #fff',
                  backgroundImage: `url(${U_IMAGE})`, backgroundRepeat: 'no-repeat',
                  backgroundSize: `${imgRect.w * ZOOM}px ${imgRect.h * ZOOM}px`,
                  backgroundPosition: `${-(sol.x / 100 * imgRect.w * ZOOM - LENS_R)}px ${-(sol.y / 100 * imgRect.h * ZOOM - LENS_R)}px`,
                }} />

                <div style={{
                  position: 'absolute',
                  ...(side === 'r' ? { right: '108%', top: '50%', transform: 'translateY(-50%)' }
                    : side === 'l' ? { left: '108%', top: '50%', transform: 'translateY(-50%)' }
                    : { top: '112%', left: '50%', transform: 'translateX(-50%)' }),
                  whiteSpace: 'nowrap',
                  opacity: hoveredIdx === null ? 1 : isHovered ? 1 : 0.3,
                  transition: 'opacity .3s ease', pointerEvents: 'none',
                }}>
                  <div style={{
                    display: 'flex', flexDirection: side === 'r' ? 'row-reverse' : 'row',
                    alignItems: 'flex-start', gap: 8, padding: '9px 14px',
                    background: 'rgba(255,255,255,.85)', backdropFilter: 'blur(13px)',
                    border: '1px solid rgba(255,255,255,.9)', borderRadius: 11,
                    boxShadow: '0 8px 22px rgba(50,70,60,.14)',
                    textAlign: (side === 'r' ? 'right' : 'left') as 'right' | 'left',
                  }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', marginTop: 5, flex: 'none', background: ACCENT }} />
                    <span>
                      <span style={{ display: 'block', fontSize: 14, fontWeight: 800, color: '#111' }}>{sol.area}</span>
                      <span style={{ display: 'block', fontSize: 11, color: '#7a8090', marginTop: 1 }}>{sol.vendor}</span>
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {burst && <PortalBurst x={burst.x} y={burst.y} />}

      {phase === 'zoomed' && zoomedSolution && typeof document !== 'undefined' && createPortal(
        <MicroStructure solution={zoomedSolution} onClose={doClose} onBrochure={onBrochure} onContact={onContact} />,
        document.body
      )}

      <style jsx global>{`
        @keyframes flU{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-24px) rotate(1.2deg)}}
        @keyframes uSway{0%,100%{transform:translate(0,0)}25%{transform:translate(10px,-6px)}50%{transform:translate(3px,7px)}75%{transform:translate(-9px,-3px)}}
        @keyframes hsPulse{0%,100%{opacity:.35}50%{opacity:.95}}
        @keyframes uRip{0%{transform:translateX(-50%) scale(.5);opacity:0}22%{opacity:.75}100%{transform:translateX(-50%) scale(1.5);opacity:0}}
        @keyframes pCore{0%{transform:translate(-50%,-50%) scale(.2);opacity:0}20%{opacity:.6}100%{transform:translate(-50%,-50%) scale(4);opacity:0}}
        @keyframes pRing{0%{transform:translate(-50%,-50%) scale(.3);opacity:.6}100%{transform:translate(-50%,-50%) scale(3.5);opacity:0}}
        @keyframes pRay{0%{transform:translate(-50%,-50%) rotate(var(--r)) scaleY(.3);opacity:.5}100%{transform:translate(-50%,-50%) rotate(var(--r)) scaleY(2);opacity:0}}
        @keyframes uSuck{0%{transform:scale(1);opacity:1;filter:blur(0)}40%{transform:scale(1.05);opacity:.8;filter:blur(1px)}100%{transform:scale(2.5);opacity:0;filter:blur(6px)}}
        @keyframes uUnsuck{0%{transform:scale(2.5);opacity:0;filter:blur(6px)}60%{transform:scale(.98);opacity:.9;filter:blur(0)}100%{transform:scale(1);opacity:1;filter:blur(0)}}
        @media(prefers-reduced-motion:reduce){*{animation-duration:0.01s!important;transition-duration:0.01s!important;}}
      `}</style>
    </div>
  );
}
