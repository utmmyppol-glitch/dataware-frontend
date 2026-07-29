'use client';

import React, { useState, useRef, useEffect } from 'react';
import { COPY } from '@/data';

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
  { title: 'AI Powered Pack', desc: 'ChatGPT 기반 데이터 표준화, 모델 현행화, 비즈니스 분류 자동화' },
  { title: '리버스 엔지니어링', desc: 'ERD 자동 생성, 엔터티 간 관계 정보와 명칭 활용한 자동 관계 찾기/배치로 빠른 모델링' },
  { title: 'Repository 협업', desc: '주제 영역별 동시 모델링 지원, 모든 작업자들에게 모델 공유, 동기화' },
  { title: '다양한 산출물 자동생성', desc: '한글, 워드, PDF, CSV, EXCEL, HTML 등 보고서의 다양한 파일 형식으로 변환 가능' },
];

interface CoreFeaturesSectionProps {
  sectionRef: React.RefObject<HTMLElement>;
}

export default function CoreFeaturesSection({ sectionRef }: CoreFeaturesSectionProps) {
  const c3 = useCountUp(80);

  return (
    <section ref={sectionRef} style={{ position: 'relative', backgroundColor: '#fff', borderTop: '1px solid #E7E2D8', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 4vw, 56px)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '80px', alignItems: 'start' }}>
          <div>
            <p data-anim style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.12em', marginBottom: '16px' }}>CORE FEATURES</p>
            <h2 data-anim style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, color: '#111214', lineHeight: 1.1, marginBottom: '20px' }}>
              {COPY.whyDA}<span style={{ color: '#36c88a' }}>.</span>
            </h2>
            <p data-anim style={{ fontSize: '20px', color: '#6B655C', lineHeight: 1.8, marginBottom: '48px' }}>{COPY.heroDA.subtitle}</p>
            <div data-anim>
              <span ref={c3.ref} style={{ fontSize: 'clamp(80px, 12vw, 140px)', fontWeight: 900, color: '#111214', lineHeight: 0.85 }}>{c3.n}<span style={{ color: '#36c88a', fontSize: '0.35em' }}>%</span></span>
              <p style={{ fontSize: '20px', color: '#6B655C', marginTop: '12px' }}>{COPY.aiPack}</p>
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
                  <h4 style={{ fontSize: '22px', fontWeight: 700, color: '#111214' }}>{f.title}</h4>
                </div>
                <p style={{ fontSize: '20px', color: '#6B655C', lineHeight: 1.7, paddingLeft: '38px' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
