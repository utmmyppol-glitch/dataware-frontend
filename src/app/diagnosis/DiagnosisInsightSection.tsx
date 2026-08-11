'use client';

import React from 'react';
import Link from 'next/link';
import { E } from '@/lib/editable';

const ACCENT = '#36c88a';

interface DiagnosisInsightSectionProps {
  editMode: boolean;
  sectionRef: React.RefObject<HTMLElement>;
}

export default function DiagnosisInsightSection({ editMode, sectionRef }: Readonly<DiagnosisInsightSectionProps>) {
  return (
    <section ref={sectionRef} style={{ background: 'linear-gradient(160deg, #0B1220 30%, #0a1f1a 70%, #0d2a1f)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '50vw', height: '50vw', maxWidth: 600, maxHeight: 600, borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}12 0%, transparent 50%)` }} />
      </div>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 56px 100px', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 56 }}>
          <span data-anim style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.12em', color: ACCENT, display: 'block', marginBottom: 12 }}>INSIGHT</span>
          <h2 data-anim style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#F9FAFB', lineHeight: 1.2, letterSpacing: '-0.03em' }}>
            <E id="diagnosis_insight.title" editMode={editMode}>데이터는 많은데, 왜 활용이 어려울까</E><span style={{ color: ACCENT }}>?</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { num: '72%', title: '표준 없이 쌓인 데이터', desc: '명명 규칙·도메인·코드가 제각각이면, 데이터를 모아도 연결이 안 됩니다.', product: 'DA#', productSub: '데이터 모델링' },
            { num: '3.2x', title: '원천마다 다른 구조', desc: '시스템별 구조가 제각각이라 데이터를 모아도 정합이 어렵습니다.', product: 'META#', productSub: '메타데이터 관리' },
            { num: '40%', title: '품질·흐름이 안 보인다', desc: '오류·중복이 감지되지 않고 계보가 안 보여 불신이 쌓입니다.', product: 'DQ#', productSub: '품질관리' },
          ].map((item, i) => (
            <div key={item.product} data-anim style={{
              display: 'grid', gridTemplateColumns: '120px 1fr auto',
              gap: 32, alignItems: 'center',
              padding: '36px 0',
              borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <span style={{ fontSize: 36, fontWeight: 900, color: '#F9FAFB', letterSpacing: '-0.03em' }}><E id={`diagnosis_insight${i}.num`} editMode={editMode}>{item.num}</E></span>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F9FAFB', marginBottom: 6 }}><E id={`diagnosis_insight${i}.title`} editMode={editMode}>{item.title}</E></h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}><E id={`diagnosis_insight${i}.desc`} editMode={editMode}>{item.desc}</E></p>
              </div>
              <Link href={`/products/${item.product.toLowerCase().replace('#', '-sharp')}`} style={{ textDecoration: 'none', textAlign: 'right', flexShrink: 0 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: ACCENT, display: 'block' }}><E id={`diagnosis_insight${i}.product`} editMode={editMode}>{item.product}</E></span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}><E id={`diagnosis_insight${i}.product_sub`} editMode={editMode}>{item.productSub}</E></span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
