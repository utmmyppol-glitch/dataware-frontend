'use client';

import React from 'react';
import { E } from '@/lib/editable';
import { PRODUCT_DETAILS } from './diagnosis-data';
import type { DbScale, DiagnosisResult } from './useDiagnosis';

const ACCENT = '#36c88a';

interface DiagnosisQuizProps {
  editMode: boolean;
  sectionRef: React.RefObject<HTMLElement>;
  diagStep: number;
  setDiagStep: (s: number) => void;
  dbCount: DbScale | null;
  setDbCount: (v: DbScale) => void;
  hasStandard: boolean | null;
  setHasStandard: (v: boolean) => void;
  hasMeta: boolean | null;
  setHasMeta: (v: boolean) => void;
  hasQuality: boolean | null;
  setHasQuality: (v: boolean) => void;
  advanceStep: (step: number) => void;
  result: DiagnosisResult | null;
  resetDiagnosis: () => void;
  expandedProduct: string | null;
  setExpandedProduct: (p: string | null) => void;
  /* 이메일 폼 */
  company: string;
  setCompany: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  emailSubmitted: boolean;
  emailLoading: boolean;
  errors: Record<string, string>;
  formRef: React.RefObject<HTMLFormElement>;
  handleEmailSubmit: (e: React.FormEvent) => void;
}

function ChoiceButton({ selected, onClick, children }: Readonly<{ selected: boolean; onClick: () => void; children: React.ReactNode }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '20px 36px',
        fontSize: 15,
        fontWeight: 600,
        border: selected ? `1px solid ${ACCENT}` : '1px solid rgba(255,255,255,0.08)',
        background: selected ? `${ACCENT}12` : 'rgba(255,255,255,0.02)',
        color: selected ? ACCENT : 'rgba(255,255,255,0.5)',
        cursor: 'pointer',
        transition: 'all 0.25s',
        minWidth: 120,
        letterSpacing: '-0.01em',
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
        }
      }}
    >
      {children}
    </button>
  );
}

export default function DiagnosisQuiz({
  editMode, sectionRef,
  diagStep, setDiagStep,
  dbCount, setDbCount,
  hasStandard, setHasStandard,
  hasMeta, setHasMeta,
  hasQuality, setHasQuality,
  advanceStep,
  result, resetDiagnosis,
  expandedProduct, setExpandedProduct,
  company, setCompany,
  email, setEmail,
  emailSubmitted, emailLoading,
  errors, formRef, handleEmailSubmit,
}: Readonly<DiagnosisQuizProps>) {
  return (
    <section id="diagnosis-form" ref={sectionRef} style={{ position: 'relative', background: 'linear-gradient(160deg, #0B1220 30%, #0a1f1a 70%, #0d2a1f)', overflow: 'hidden' }}>
      {/* 배경 */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent 15%, ${ACCENT}40, transparent 85%)` }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '140px 56px 100px' }}>

          {/* 프로그레스 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 64 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.12em', color: ACCENT }}>DIAGNOSIS</span>
            <div style={{ flex: 1, maxWidth: 240, height: 1, background: 'rgba(255,255,255,0.06)', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${((diagStep >= 4 ? 4 : diagStep) / 4) * 100}%`, background: ACCENT, transition: 'width 0.5s ease' }} />
            </div>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
              {diagStep >= 4 ? 'COMPLETE' : `${String(diagStep + 1).padStart(2, '0')} / 04`}
            </span>
          </div>

          {/* ── 질문 스텝들 ── */}
          {diagStep < 4 && (
            <div key={diagStep} style={{ animation: 'fadeIn 0.4s ease', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64, alignItems: 'start' }}>
              {/* 좌: 질문 */}
              <div>
                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontSize: 'clamp(48px, 6vw, 72px)', fontWeight: 900, color: 'rgba(255,255,255,0.04)', lineHeight: 1, letterSpacing: '-0.04em' }}>
                    {String(diagStep + 1).padStart(2, '0')}
                  </span>
                </div>

                <h2 style={{ fontSize: 'clamp(30px, 4.5vw, 44px)', fontWeight: 800, color: '#F9FAFB', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: 14 }}>
                  {diagStep === 0 && <><E id="diagnosis_quiz.q0_title" editMode={editMode}>운용 중인 DB는<br />몇 개인가요</E><span style={{ color: ACCENT }}>?</span></>}
                  {diagStep === 1 && <><E id="diagnosis_quiz.q1_title" editMode={editMode}>데이터 표준이<br />수립되어 있나요</E><span style={{ color: ACCENT }}>?</span></>}
                  {diagStep === 2 && <><E id="diagnosis_quiz.q2_title" editMode={editMode}>메타데이터를<br />관리하고 있나요</E><span style={{ color: ACCENT }}>?</span></>}
                  {diagStep === 3 && <><E id="diagnosis_quiz.q3_title" editMode={editMode}>데이터 품질 진단 체계가<br />갖춰져 있나요</E><span style={{ color: ACCENT }}>?</span></>}
                </h2>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 48, maxWidth: 480 }}>
                  {diagStep === 0 && <E id="diagnosis_quiz.q0_desc" editMode={editMode}>현재 사내에서 운용 중인 <span style={{ color: ACCENT }}>데이터베이스의 수</span>를 선택하세요.</E>}
                  {diagStep === 1 && <E id="diagnosis_quiz.q1_desc" editMode={editMode}>용어 사전, 도메인 정의 등 <span style={{ color: ACCENT }}>데이터 표준</span>이 정의·관리되고 있는지 선택하세요.</E>}
                  {diagStep === 2 && <E id="diagnosis_quiz.q2_desc" editMode={editMode}><span style={{ color: ACCENT }}>메타데이터 수집·관리</span> 또는 시스템 간 영향도를 파악하고 있는지 선택하세요.</E>}
                  {diagStep === 3 && <E id="diagnosis_quiz.q3_desc" editMode={editMode}>데이터 품질을 정기적으로 진단하고 <span style={{ color: ACCENT }}>오류를 모니터링</span>하는 체계가 있는지 선택하세요.</E>}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {diagStep === 0 && (['10미만', '10~50', '50~200', '200+'] as DbScale[]).map((v, vi) => (
                    <ChoiceButton key={v} selected={dbCount === v} onClick={() => { setDbCount(v); advanceStep(0); }}>
                      <E id={`diagnosis_quiz.db_opt${vi}`} editMode={editMode}>{v === '10미만' ? '10개 미만' : v}</E>
                    </ChoiceButton>
                  ))}
                  {diagStep === 1 && <>
                    <ChoiceButton selected={hasStandard === true} onClick={() => { setHasStandard(true); advanceStep(1); }}><E id="diagnosis_quiz.q1_yes" editMode={editMode}>있음</E></ChoiceButton>
                    <ChoiceButton selected={hasStandard === false} onClick={() => { setHasStandard(false); advanceStep(1); }}><E id="diagnosis_quiz.q1_no" editMode={editMode}>없음</E></ChoiceButton>
                  </>}
                  {diagStep === 2 && <>
                    <ChoiceButton selected={hasMeta === true} onClick={() => { setHasMeta(true); advanceStep(2); }}><E id="diagnosis_quiz.q2_yes" editMode={editMode}>있음</E></ChoiceButton>
                    <ChoiceButton selected={hasMeta === false} onClick={() => { setHasMeta(false); advanceStep(2); }}><E id="diagnosis_quiz.q2_no" editMode={editMode}>없음</E></ChoiceButton>
                  </>}
                  {diagStep === 3 && <>
                    <ChoiceButton selected={hasQuality === true} onClick={() => { setHasQuality(true); advanceStep(3); }}><E id="diagnosis_quiz.q3_yes" editMode={editMode}>있음</E></ChoiceButton>
                    <ChoiceButton selected={hasQuality === false} onClick={() => { setHasQuality(false); advanceStep(3); }}><E id="diagnosis_quiz.q3_no" editMode={editMode}>없음</E></ChoiceButton>
                  </>}
                </div>

                {diagStep > 0 && (
                  <button
                    type="button"
                    onClick={() => setDiagStep(diagStep - 1)}
                    style={{ marginTop: 48, fontSize: 13, color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.25)'; }}
                  >
                    <E id="diagnosis_quiz.prev_btn" editMode={editMode}>← 이전</E>
                  </button>
                )}
              </div>

              {/* 우: 스텝 인디케이터 + 컨텍스트 */}
              <div style={{ paddingTop: 80 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 48 }}>
                  {['보유 DB', '데이터 표준', '메타데이터', '품질 진단'].map((label, i: number) => {
                    const isCurrent = i === diagStep;
                    const isPast = i < diagStep;
                    const stepColor = isCurrent ? '#F9FAFB' : (isPast ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.3)');
                    return (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <div style={{ width: 8, height: 8, background: i <= diagStep ? ACCENT : 'rgba(255,255,255,0.08)', boxShadow: isCurrent ? `0 0 12px ${ACCENT}60` : 'none', transition: 'all 0.3s' }} />
                      <span style={{ fontSize: 15, fontWeight: isCurrent ? 600 : 400, color: stepColor, transition: 'color 0.3s' }}>
                        <E id={`diagnosis_step${i}.label`} editMode={editMode}>{label}</E>
                      </span>
                      {i < diagStep && (
                        <span style={{ marginLeft: 'auto', fontSize: 11, color: ACCENT }}>✓</span>
                      )}
                    </div>
                    );
                  })}
                </div>

                <div style={{ padding: '20px', background: `linear-gradient(135deg, ${ACCENT}08, transparent 60%)`, border: `1px solid ${ACCENT}15`, borderLeft: `2px solid ${ACCENT}` }}>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', marginBottom: 8 }}><E id="diagnosis_hint.label" editMode={editMode}>진단 후 제공</E></p>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                    <E id="diagnosis_hint.content" editMode={editMode}>거버넌스 성숙도 레벨<br />우선 과제 및 추천 제품<br />이메일 상세 리포트</E>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── 결과 ── */}
          {diagStep >= 4 && result && (
            <div style={{ animation: 'fadeIn 0.5s ease', background: `linear-gradient(160deg, ${ACCENT}06 0%, transparent 40%)`, padding: '48px', margin: '-48px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
                {/* 좌: 레벨 + 설명 */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                    <div style={{ width: 48, height: 2, background: ACCENT, opacity: 0.6 }} />
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.08em', color: 'rgba(255,255,255,0.3)' }}><E id="diagnosis_result.label" editMode={editMode}>진단 리포트</E></span>
                  </div>
                  <h2 style={{ fontSize: 'clamp(52px, 7vw, 80px)', fontWeight: 800, color: '#F9FAFB', letterSpacing: '-0.05em', lineHeight: 0.9, marginBottom: 20 }}>
                    LEVEL {result.level}<span style={{ color: ACCENT, fontSize: '1.1em' }}>.</span>
                  </h2>
                  <p style={{ fontSize: 20, fontWeight: 500, color: ACCENT, marginBottom: 24 }}>{result.title}</p>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 40, maxWidth: 440 }}>
                    {result.description}
                  </p>
                  <button
                    type="button"
                    onClick={resetDiagnosis}
                    style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.25)'; }}
                  >
                    <E id="diagnosis_result.retry_btn" editMode={editMode}>← 다시 진단하기</E>
                  </button>
                </div>

                {/* 우: 추천 제품 + 이메일 */}
                <div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '.06em', marginBottom: 16, display: 'block' }}><E id="diagnosis_result.recommend_label" editMode={editMode}>추천 제품</E></span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 40 }}>
                    {result.products.map((p, pi) => {
                      const detail = PRODUCT_DETAILS[p];
                      const isExpanded = expandedProduct === p;
                      return (
                        <div key={p}>
                          <button
                            type="button"
                            onClick={() => setExpandedProduct(isExpanded ? null : p)}
                            style={{
                              width: '100%',
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              padding: '16px 20px',
                              background: 'rgba(255,255,255,0.02)',
                              border: '1px solid',
                              borderColor: isExpanded ? ACCENT : 'rgba(255,255,255,0.06)',
                              borderBottom: isExpanded ? 'none' : '1px solid rgba(255,255,255,0.06)',
                              fontSize: 15, fontWeight: 700,
                              color: isExpanded ? ACCENT : '#F9FAFB',
                              cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left',
                            }}
                            onMouseEnter={(e) => { if (!isExpanded) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                            onMouseLeave={(e) => { if (!isExpanded) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
                          >
                            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <span style={{ display: 'inline-block', width: 5, height: 5, background: detail?.color || ACCENT }} />
                              {p}
                              <span style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.3)' }}>{detail?.subtitle}</span>
                            </span>
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                              style={{ transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {isExpanded && detail && (
                            <div style={{ padding: '20px 24px', background: 'rgba(255,255,255,0.02)', border: `1px solid ${ACCENT}`, borderTop: 'none' }}>
                              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 16 }}>{detail.desc}</p>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                                {detail.features.map((f) => (
                                  <span key={f} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', background: 'rgba(255,255,255,0.04)', fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                                    {f}
                                  </span>
                                ))}
                              </div>
                              <a href={`/products/${p.toLowerCase().replace('#', '-sharp')}`}
                                target="_blank" rel="noopener noreferrer"
                                style={{ fontSize: 13, fontWeight: 600, color: ACCENT, textDecoration: 'none' }}
                              ><E id={`diagnosis_result.product_link${pi}`} editMode={editMode}>제품 상세 보기 →</E></a>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* 이메일 리포트 */}
                  {!emailSubmitted ? (
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 32 }}>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}><E id="diagnosis_report.desc" editMode={editMode}>상세 리포트를 이메일로 받아보세요.</E></p>
                      <form ref={formRef} onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <input placeholder="회사명" value={company} onChange={(e) => setCompany(e.target.value)}
                          style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.04)', border: errors.company ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.06)', color: '#fff', fontSize: 14, outline: 'none', transition: 'border 0.2s' }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = ACCENT; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = errors.company ? '#ef4444' : 'rgba(255,255,255,0.06)'; }}
                        />
                        {errors.company && <p style={{ fontSize: 12, color: '#ef4444' }}>{errors.company}</p>}
                        <input type="email" placeholder="담당자 이메일" value={email} onChange={(e) => setEmail(e.target.value)}
                          style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.04)', border: errors.email ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.06)', color: '#fff', fontSize: 14, outline: 'none', transition: 'border 0.2s' }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = ACCENT; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = errors.email ? '#ef4444' : 'rgba(255,255,255,0.06)'; }}
                        />
                        {errors.email && <p style={{ fontSize: 12, color: '#ef4444' }}>{errors.email}</p>}
                        {errors.submit && <p style={{ fontSize: 13, color: '#ef4444' }}>{errors.submit}</p>}
                        <button type="submit" disabled={emailLoading}
                          style={{ padding: '14px 28px', backgroundColor: emailLoading ? '#475467' : ACCENT, color: '#fff', fontSize: 14, fontWeight: 600, border: 'none', cursor: emailLoading ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}
                        >
                          {emailLoading ? <E id="diagnosis_report.loading" editMode={editMode}>전송 중...</E> : <E id="diagnosis_report.submit_btn" editMode={editMode}>리포트 받기 →</E>}
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 32 }}>
                      <p style={{ fontSize: 15, fontWeight: 600, color: '#F9FAFB', marginBottom: 6 }}><E id="diagnosis_report.success_title" editMode={editMode}>접수 완료</E></p>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}><E id="diagnosis_report.success_desc" editMode={editMode}>입력하신 이메일로 상세 진단 리포트를 보내드리겠습니다.</E></p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
