'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';
import { formatDateDot as formatDate } from '@/lib/format';
import { E, safeParse, useEditMode, useEditableManifest, EDITABLE_STYLES } from '@/lib/editable';

const DOCS = [
  { id: 1, title: 'DA# 5.0 사용자 가이드', desc: 'DA# 5.0 전체 기능에 대한 상세 사용자 매뉴얼입니다.', category: 'DA#', categoryColor: '#36c88a', fileSize: '12.4 MB', fileType: 'PDF', updated: '2026-03-15' },
  { id: 2, title: 'DA# Repository 관리자 가이드', desc: 'DA# Repository 서버 설치, 사용자 권한 관리, 백업/복원 방법을 설명합니다.', category: 'DA#', categoryColor: '#36c88a', fileSize: '8.7 MB', fileType: 'PDF', updated: '2026-02-28' },
  { id: 3, title: 'DATAWARE 설치 매뉴얼', desc: 'DATAWARE 전 제품군의 서버 및 클라이언트 설치 절차를 안내합니다.', category: 'DATAWARE', categoryColor: '#3b82f6', fileSize: '15.2 MB', fileType: 'PDF', updated: '2026-01-20' },
  { id: 4, title: 'META# 사용자 가이드', desc: '메타데이터 표준 정의, DB 정보 등록, 영향도 분석 등 META# 전 기능을 안내합니다.', category: 'META#', categoryColor: '#8b5cf6', fileSize: '9.1 MB', fileType: 'PDF', updated: '2026-01-10' },
  { id: 5, title: 'DQ# 운영 가이드', desc: '데이터 품질 기준 정의, 프로파일링, 규칙 설정, 오류 분석 등을 다룹니다.', category: 'DQ#', categoryColor: '#10b981', fileSize: '7.8 MB', fileType: 'PDF', updated: '2025-12-20' },
  { id: 6, title: 'DATAWARE API 레퍼런스', desc: 'DATAWARE 외부 연계를 위한 REST API 명세서입니다.', category: 'API', categoryColor: '#f59e0b', fileSize: '3.2 MB', fileType: 'PDF', updated: '2025-12-01' },
  { id: 7, title: 'DA# AI Powered Pack 가이드', desc: 'ChatGPT 기반 자동 모델링 기능 활성화 및 사용 방법을 안내합니다.', category: 'DA#', categoryColor: '#36c88a', fileSize: '5.5 MB', fileType: 'PDF', updated: '2025-11-15' },
  { id: 8, title: 'ETT# 마이그레이션 가이드', desc: '이기종 RDBMS 및 Cloud DB 간 데이터 마이그레이션 방법을 설명합니다.', category: 'ETT#', categoryColor: '#ec4899', fileSize: '6.3 MB', fileType: 'PDF', updated: '2025-10-30' },
];

const DEFAULT_HERO = { title: '기술문서', desc: 'DA# 및 DATAWARE 제품의 사용자 가이드, 설치 매뉴얼, API 레퍼런스' };

export default function DocsPageClient({ ssrContent }: { ssrContent: Record<string, string> }) {
  const heroRef = useHeroAnim();
  const gridRef = useGsapReveal();
  const editMode = useEditMode();
  useEditableManifest(editMode);

  const [hero, setHero] = useState(() => safeParse(ssrContent.docs_hero, DEFAULT_HERO));

  useEffect(() => {
    if (!editMode) return;
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'content-update' && e.data.section === 'docs_hero') {
        setHero(e.data.data);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [editMode]);

  return (
    <div style={{ background: '#ffffff' }}>

      {/* ── 1. Dark Hero Banner ── */}
      <section
        className="grid-bg"
        style={{ background: 'linear-gradient(180deg, #0b1220 0%, #0f172a 100%)', paddingTop: 120, paddingBottom: 80, minHeight: 240, display: 'flex', alignItems: 'center' }}
      >
        <div ref={heroRef} className="wrap" style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <Link href="/" style={{ fontSize: 13, color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>홈</Link>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.2)' }}>›</span>
            <Link href="/resources" style={{ fontSize: 13, color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>자료실</Link>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.2)' }}>›</span>
            <span style={{ fontSize: 13, color: '#36c88a', fontWeight: 600 }}>기술문서</span>
          </div>
          <p data-hero className="eyebrow" style={{ marginBottom: 16 }}>DOCUMENTATION</p>
          <h1 data-hero className="headline-lg" style={{ color: '#ffffff', marginBottom: 16 }}><E id="docs_hero.title" editMode={editMode}>{hero.title}</E></h1>
          <p data-hero style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, maxWidth: 520 }}>
            <E id="docs_hero.desc" editMode={editMode}>{hero.desc}</E>
          </p>
        </div>
      </section>

      {/* ── 2. Docs Grid ── */}
      <section className="section-pad">
        <div ref={gridRef} className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {DOCS.map((doc) => (
              <div
                key={doc.id}
                data-anim
                className="card"
                style={{ borderRadius: 0, padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: doc.categoryColor, backgroundColor: `${doc.categoryColor}15`, padding: '4px 10px' }}>{doc.category}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 11, color: '#94a3b8', backgroundColor: '#f8fafc', border: '1px solid var(--line)', padding: '2px 8px' }}>{doc.fileType}</span>
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>{doc.fileSize}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 44, height: 44, background: '#f8fafc', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="20" height="20" fill="none" stroke="#64748b" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', lineHeight: 1.4, marginBottom: 4 }}>{doc.title}</h3>
                    <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{doc.desc}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--line)' }}>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>{formatDate(doc.updated)}</span>
                  <button className="btn-accent" style={{ fontSize: 12, padding: '6px 16px', borderRadius: 0 }}>다운로드</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {editMode && <style>{EDITABLE_STYLES}</style>}
    </div>
  );
}
