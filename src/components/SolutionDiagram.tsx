'use client';

import { E } from '@/lib/editable';

/*
 * SolutionDiagram.tsx — 방사형 5노드 구성도 (내가 디자인한 그 모양 그대로)
 * DATAWARE 솔루션 상세/구성도 자리에 이 컴포넌트를 그대로 사용.
 * 클로드 코드가 임의로 다시 그리지 말 것 — 이 파일이 유일한 정답 모양이다.
 *
 * 사용:
 *   <SolutionDiagram
 *     vendor="DA#"
 *     area="데이터 모델링"
 *     desc="개념·논리·물리 전 단계를 하나의 흐름으로 설계·현행화합니다."
 *     gainCount={3}
 *     feats={[
 *       { n: '개념·논리·물리', e: '아키텍처 전 단계 설계' },
 *       { n: 'AI Powered Pack', e: 'ChatGPT 기반 표준화·현행화' },
 *       { n: 'Repository', e: '동시 모델링·공유·동기화' },
 *       { n: '리버스', e: 'ERD 자동 생성·관계 분석' },
 *       { n: '산출물', e: 'HWP·PDF·Excel 자동생성' },
 *     ]}
 *     size="min(680px, 50vw)"   // ← 크기 조절은 여기만
 *   />
 *
 * 크게: size를 "min(680px, 50vw)" 등으로. 뷰포트 높이 잘림 방지하려면
 *      부모 컬럼 min-height 확보 + size에 vh clamp 병행 권장.
 */

import { useState, useEffect, useRef, useMemo } from 'react';

interface Feat { n: string; e: string; }
interface Props {
  vendor: string;
  area: string;
  desc?: string;
  feats: Feat[];
  gainCount?: number;
  size?: string;          // 다이어그램 스테이지 폭 (기본 min(560px,94vw))
  accent?: string;        // 기본 DATAWARE 그린
  showHeader?: boolean;   // eyebrow/제목/부제 표시 여부 (기본 true)
}

const GREEN = '#36c88a';

export default function SolutionDiagram({
  vendor, area, desc, feats,
  gainCount = 3,
  size = '560px',
  accent = GREEN,
  showHeader = true,
}: Props) {
  const [play, setPlay] = useState(false);
  const [hovIdx, setHovIdx] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const N = feats.length;
  const VB = 720, CX = 360, CY = 360, ORBIT = 230, NODE_R = VB * 0.116, CORE_R = 86;

  const nodePositions = useMemo(() =>
    feats.map((_, k) => {
      const a = (-90 + k * (360 / N)) * (Math.PI / 180);
      return { x: CX + Math.cos(a) * ORBIT, y: CY + Math.sin(a) * ORBIT };
    }), [N, feats]);

  // 각 노드 뒤 halo 아크 (반지름 100, 노드 바깥쪽 ±92°)
  const R_ARC = 100, ARC_SPAN = 92;
  const arcPaths = useMemo(() =>
    feats.map((_, k) => {
      const deg = -90 + k * (360 / N);
      const a0 = (deg - ARC_SPAN) * (Math.PI / 180);
      const a1 = (deg + ARC_SPAN) * (Math.PI / 180);
      const nx = CX + Math.cos(deg * Math.PI / 180) * ORBIT;
      const ny = CY + Math.sin(deg * Math.PI / 180) * ORBIT;
      const p0x = nx + R_ARC * Math.cos(a0), p0y = ny + R_ARC * Math.sin(a0);
      const p1x = nx + R_ARC * Math.cos(a1), p1y = ny + R_ARC * Math.sin(a1);
      return `M ${p0x.toFixed(1)} ${p0y.toFixed(1)} A ${R_ARC} ${R_ARC} 0 0 1 ${p1x.toFixed(1)} ${p1y.toFixed(1)}`;
    }), [N, feats]);

  // 마운트 시 즉시 재생 (Portal 안에서도 동작)
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPlay(true));
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {showHeader && (
        <div style={{ textAlign: 'center', marginBottom: 'clamp(10px,1.5vh,18px)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 12, fontWeight: 800, letterSpacing: '.16em', color: accent,
            textTransform: 'uppercase',
          }}>
            <span style={{ width: 22, height: 2, background: accent, display: 'inline-block' }} />
            WHY {vendor}
          </div>
          <h2 style={{
            fontSize: 'clamp(22px,3vw,30px)', fontWeight: 900, color: '#111',
            letterSpacing: '-0.02em', marginTop: 10, lineHeight: 1.2,
          }}>{vendor} {area} 구성도</h2>
          {desc && <p style={{
            fontSize: 14, color: '#676767', marginTop: 8, lineHeight: 1.6,
            maxWidth: 460, marginLeft: 'auto', marginRight: 'auto',
          }}>{desc}</p>}
        </div>
      )}

      <div ref={stageRef} className={play ? 'dg-play' : ''}
        style={{ position: 'relative', width: size, aspectRatio: '1/1', margin: '0 auto' }}>

        <svg viewBox={`0 0 ${VB} ${VB}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }} aria-hidden="true">
          <defs>
            <radialGradient id="sdCore" cx="42%" cy="34%" r="72%">
              <stop offset="0%" stopColor="#f0fbf6" />
              <stop offset="55%" stopColor="#d3f3e5" />
              <stop offset="100%" stopColor="#b6ebd3" />
            </radialGradient>
            <filter id="sdSoft" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#183a2b" floodOpacity="0.14" />
            </filter>
            <linearGradient id="sdArc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c4f0dc" />
              <stop offset="100%" stopColor="#8fe0bd" />
            </linearGradient>
          </defs>

          {arcPaths.map((d, k) => (
            <path key={`a${k}`} className="dg-arc" style={{ animationDelay: `${0.18 + k * 0.09}s` }}
              d={d} fill="none" stroke="url(#sdArc)" strokeWidth="3" strokeLinecap="round" pathLength={1} />
          ))}

          <g stroke="#d5ebe2" strokeWidth="1.5" strokeDasharray="3 8" strokeLinecap="round">
            {nodePositions.map((pos, k) => {
              const dx = pos.x - CX, dy = pos.y - CY, dist = Math.hypot(dx, dy);
              return <line key={`l${k}`} className="dg-line" style={{ animationDelay: `${0.6 + k * 0.06}s` }}
                x1={CX + (dx / dist) * CORE_R} y1={CY + (dy / dist) * CORE_R}
                x2={pos.x - (dx / dist) * NODE_R} y2={pos.y - (dy / dist) * NODE_R} pathLength={1} />;
            })}
          </g>
          <g fill="#b0dcc8">
            {nodePositions.map((pos, k) => {
              const dx = pos.x - CX, dy = pos.y - CY, dist = Math.hypot(dx, dy);
              return <circle key={`d${k}`} className="dg-dot" style={{ animationDelay: `${0.6 + k * 0.06}s` }}
                cx={pos.x - (dx / dist) * NODE_R} cy={pos.y - (dy / dist) * NODE_R} r="4" />;
            })}
          </g>

          <g className="dg-hex-g">
            <circle cx={CX} cy={CY} r={CORE_R} fill="url(#sdCore)" stroke="#bfead4" strokeWidth="2" filter="url(#sdSoft)" />
          </g>
        </svg>

        {/* 중앙 레이블 */}
        <div className="dg-center" style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
          textAlign: 'center', pointerEvents: 'none', width: 160,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ fontSize: 'clamp(22px,3.5vw,30px)', fontWeight: 900, color: '#111', letterSpacing: '-0.02em', lineHeight: 1 }}>{vendor}</div>
          <div style={{ fontSize: 'clamp(12px,2vw,15px)', fontWeight: 800, color: '#111', marginTop: 5 }}>{area}</div>
          <div style={{ fontSize: 'clamp(10px,1.4vw,13px)', color: '#7a828d', marginTop: 5 }}>기능 {N} · 도입효과 {gainCount}</div>
        </div>

        {/* 기능 노드 */}
        {nodePositions.map((pos, k) => {
          const isHov = hovIdx === k, isDim = hovIdx !== null && !isHov;
          return (
            <div key={k} className="dg-node"
              onMouseEnter={() => setHovIdx(k)} onMouseLeave={() => setHovIdx(null)}
              style={{
                // @ts-expect-error css var
                '--fx': `${((pos.x / VB) * 100).toFixed(1)}%`, '--fy': `${((pos.y / VB) * 100).toFixed(1)}%`,
                animationDelay: `${0.38 + k * 0.09}s`,
                position: 'absolute', width: '23.3%', aspectRatio: '1', borderRadius: '50%',
                background: '#fff',
                border: isHov ? '2px solid rgba(54,200,138,.4)' : '1.5px solid #e0e4e8',
                boxShadow: isHov
                  ? '0 12px 32px rgba(24,39,33,.15), 0 0 0 4px rgba(54,200,138,.08)'
                  : '0 6px 20px rgba(24,39,33,.08)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', padding: '10px 8px', cursor: 'pointer',
                opacity: isDim ? 0.4 : 1, transition: 'box-shadow .25s, opacity .25s, border-color .25s',
                zIndex: isHov ? 5 : 3,
              }}>
              <div style={{ fontSize: 'clamp(12px,1.6vw,16px)', fontWeight: 900, color: '#111', letterSpacing: '-0.02em', lineHeight: 1.2, wordBreak: 'keep-all' }}>{feats[k].n}</div>
              <div style={{ fontSize: 'clamp(9px,1.1vw,11px)', color: '#676767', marginTop: 3, lineHeight: 1.3, wordBreak: 'keep-all' }}>{feats[k].e}</div>
              <div style={{
                fontSize: 'clamp(8px,1vw,11px)', fontWeight: 700, color: accent, marginTop: 6, lineHeight: 1.2,
                maxHeight: isHov ? 30 : 0, opacity: isHov ? 1 : 0, overflow: 'hidden',
                transition: 'max-height .25s ease, opacity .2s ease',
              }}><E id="solutiondiag.brochure_cta" editMode={false}>자세한 내용은 소개서에서 →</E></div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .dg-node { opacity: 0; }
        .dg-arc, .dg-line { stroke-dasharray: 1; stroke-dashoffset: 1; }
        .dg-dot { opacity: 0; }
        .dg-hex-g { opacity: 0; transform-box: fill-box; transform-origin: center; }
        .dg-center { opacity: 0; }
        .dg-play .dg-node { animation: dgSpread .62s cubic-bezier(.22,1,.36,1) both; }
        .dg-play .dg-hex-g { animation: dgHex .55s cubic-bezier(.34,1.4,.5,1) .05s both; }
        .dg-play .dg-arc { animation: dgDraw .5s cubic-bezier(.4,0,.2,1) both; }
        .dg-play .dg-line { animation: dgDraw .4s ease both; }
        .dg-play .dg-dot { animation: dgFade .3s ease both; }
        .dg-play .dg-center { animation: dgFade .4s ease .3s both; }
        .dg-node { transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s; }
        .dg-play .dg-node:hover { transform: translate(-50%,-50%) scale(1.05) !important; z-index: 5; }
        @keyframes dgSpread { 0%{left:50%;top:50%;transform:translate(-50%,-50%) scale(.22);opacity:0} 55%{opacity:1} 100%{left:var(--fx);top:var(--fy);transform:translate(-50%,-50%) scale(1);opacity:1} }
        @keyframes dgDraw { from{stroke-dashoffset:1} to{stroke-dashoffset:0} }
        @keyframes dgHex { 0%{transform:scale(.4);opacity:0} 60%{opacity:1} 100%{transform:scale(1);opacity:1} }
        @keyframes dgFade { from{opacity:0} to{opacity:1} }
      `}</style>
    </div>
  );
}
