'use client';

import React from 'react';
import { COPY, IMAGES } from '@/data';
import { E } from '@/lib/editable';
import OptImg from '@/components/OptImg';

interface WhySectionProps {
  sectionRef: React.RefObject<HTMLElement>;
  editMode?: boolean;
  content?: { title?: string };
}

export default function WhySection({ sectionRef, editMode = false, content }: Readonly<WhySectionProps>) {
  return (
    <section ref={sectionRef} style={{ position: 'relative', backgroundColor: '#FBFAF7', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 4vw, 56px)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 'clamp(48px, 6vw, 96px)', alignItems: 'center' }}>
          <div>
            <p data-anim style={{ fontSize: '14px', fontWeight: 600, color: '#36c88a', letterSpacing: '0.12em', marginBottom: '24px' }}><E id="home_why.badge" editMode={editMode}>WHY DATAWARE</E></p>
            <h2 data-anim style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900, color: '#111214', lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: '28px' }}>
              <E id="home_why.title" editMode={editMode}>{content?.title ?? COPY.roleSection}</E>
            </h2>
            <p data-anim style={{ fontSize: '20px', color: '#6B655C', lineHeight: 1.8, marginBottom: '48px' }}>
              <E id="home_why.desc" editMode={editMode}>기업의 DX와 AIX를 가속화하는 데이터 거버넌스 All-in-One Package</E>
            </p>
            <div data-anim style={{ display: 'flex', gap: '48px' }}>
              {[{ n: '8', s: '개 제품', l: '라인업' }, { n: 'GS', s: ' 1등급', l: '품질 인증' }].map((item, i) => (
                <div key={item.l}>
                  <span style={{ fontSize: '40px', fontWeight: 900, color: '#111214' }}><E id={`home_why.stat${i}_num`} editMode={editMode}>{item.n}</E><span style={{ fontSize: '20px', color: '#36c88a' }}><E id={`home_why.stat${i}_sub`} editMode={editMode}>{item.s}</E></span></span>
                  <p style={{ fontSize: '16px', color: '#98A2B3', marginTop: '4px' }}><E id={`home_why.stat${i}_label`} editMode={editMode}>{item.l}</E></p>
                </div>
              ))}
            </div>
          </div>
          <div data-anim style={{ position: 'relative' }}>
            <div style={{ border: '1px solid #E7E2D8', backgroundColor: '#fff', padding: '24px', boxShadow: '0 10px 30px rgba(15,23,42,0.08)' }}>
              <OptImg src={IMAGES.hero.da.img} alt="DA# Architecture" style={{ width: '100%', height: 'auto', display: 'block' }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} loading="lazy" />
            </div>
            <div style={{ position: 'absolute', top: '-16px', right: '-16px', backgroundColor: '#36c88a', padding: '12px 20px', boxShadow: '0 4px 12px rgba(54,200,138,0.2)' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}><E id="home_why.gs_badge" editMode={editMode}>GS인증 1등급</E></span>
            </div>
            <div style={{ position: 'absolute', bottom: '-20px', left: '24px', backgroundColor: '#111214', padding: '16px 28px', boxShadow: '0 10px 30px rgba(15,23,42,0.15)' }}>
              <span style={{ fontSize: '32px', fontWeight: 900, color: '#fff' }}><E id="home_why.years_num" editMode={editMode}>20<span style={{ fontSize: '16px', color: '#36c88a' }}>+</span></E></span>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginLeft: '12px' }}><E id="home_why.years_label" editMode={editMode}>Years</E></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
