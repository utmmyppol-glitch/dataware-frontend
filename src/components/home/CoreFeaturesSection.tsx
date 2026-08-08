'use client';

import React, { useState, useRef, useEffect } from 'react';
import { COPY } from '@/data';
import { E } from '@/lib/editable';

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

const FEATURES = [
  { title: '개념·논리·물리 모델링', desc: '개괄 모델부터 개념, 논리, 물리 모델까지 데이터 아키텍처 구축의 모든 단계를 지원' },
  { title: '메타데이터 통합 관리', desc: '데이터 표준, 구조, DBMS 정보를 일관성 있게 통제·관리하여 데이터 신뢰성 확보' },
  { title: '데이터 품질관리', desc: '프로파일링, 업무 규칙 관리, 지속적인 품질 측정으로 고품질 데이터 유지' },
  { title: '영향도 분석', desc: 'DB에서 소스코드까지 상호 영향도 분석으로 변경 리스크 예방 및 유지보수 효율화' },
  { title: '데이터 포털', desc: '통합 검색, 데이터 요청, 현황 대시보드로 전사 데이터 활용 극대화' },
];

interface CoreFeaturesSectionProps {
  sectionRef: React.RefObject<HTMLElement>;
  editMode?: boolean;
  content?: { title?: string };
}

export default function CoreFeaturesSection({ sectionRef, editMode = false, content }: CoreFeaturesSectionProps) {
  const c3 = useCountUp(80);

  return (
    <section ref={sectionRef} style={{ position: 'relative', backgroundColor: '#fff', borderTop: '1px solid #E7E2D8', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 4vw, 56px)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '80px', alignItems: 'start' }}>
          <div>
            <p data-anim style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.12em', marginBottom: '16px' }}><E id="home_features.badge" editMode={editMode}>CORE FEATURES</E></p>
            <h2 data-anim style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, color: '#111214', lineHeight: 1.1, marginBottom: '20px' }}>
              <E id="home_features.title" editMode={editMode}>{content?.title ?? (COPY.whyDA + '.')}</E>
            </h2>
            <p data-anim style={{ fontSize: '20px', color: '#6B655C', lineHeight: 1.8, marginBottom: '48px' }}><E id="home_features.desc" editMode={editMode}>{COPY.heroDA.subtitle}</E></p>
            <div data-anim>
              <span ref={c3.ref} style={{ fontSize: 'clamp(80px, 12vw, 140px)', fontWeight: 900, color: '#111214', lineHeight: 0.85 }}>{c3.n}<span style={{ color: '#36c88a', fontSize: '0.35em' }}>%</span></span>
              <p style={{ fontSize: '20px', color: '#6B655C', marginTop: '12px' }}><E id="home_features.ai_label" editMode={editMode}>{COPY.aiPack}</E></p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {FEATURES.map((f, i) => (
              <div key={f.title} data-anim style={{ padding: '28px 0', borderBottom: '1px solid #E7E2D8', transition: 'padding-left 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.paddingLeft = '16px'; }}
                onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0'; }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a' }}>{String(i + 1).padStart(2, '0')}</span>
                  <h4 style={{ fontSize: '22px', fontWeight: 700, color: '#111214' }}><E id={`home_features.feat_${i}_title`} editMode={editMode}>{f.title}</E></h4>
                </div>
                <p style={{ fontSize: '20px', color: '#6B655C', lineHeight: 1.7, paddingLeft: '38px' }}><E id={`home_features.feat_${i}_desc`} editMode={editMode}>{f.desc}</E></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
