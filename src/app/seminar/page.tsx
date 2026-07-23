'use client';

import { useState, FormEvent } from 'react';
import { api } from '@/lib/api';
import { SEMINAR_STEPS } from '@/data';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';

const inputBase =
  'w-full bg-white border border-[#d5d8dd] px-4 py-4 text-[16px] text-[#111111] focus:border-[#36c88a] focus:ring-1 focus:ring-[#36c88a] focus:outline-none transition-colors';
const inputError =
  'w-full bg-white border border-red-400 px-4 py-4 text-[16px] text-[#111111] focus:border-red-400 focus:ring-1 focus:ring-red-400 focus:outline-none transition-colors';

type FieldErrors = Record<string, string>;

export default function SeminarPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const heroRef = useHeroAnim();
  const stepsRef = useGsapReveal();
  const formRef = useGsapReveal();

  function validate(formData: FormData): FieldErrors {
    const errs: FieldErrors = {};
    if (!String(formData.get('name') ?? '').trim()) errs.name = '이름을 입력해주세요.';
    if (!String(formData.get('company') ?? '').trim()) errs.company = '회사명을 입력해주세요.';
    if (!String(formData.get('phone') ?? '').trim()) errs.phone = '연락처를 입력해주세요.';
    if (!String(formData.get('email') ?? '').trim()) errs.email = '이메일을 입력해주세요.';
    if (formData.get('consentPrivacy') !== 'on') errs.consentPrivacy = '개인정보 수집 및 이용에 동의해주세요.';
    return errs;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const errs = validate(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await api.submitSeminar({
        name: formData.get('name') as string,
        company: formData.get('company') as string,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string,
        department: formData.get('department') as string,
        preferredDate: formData.get('preferredDate') as string,
        attendees: Number(formData.get('attendees')) || undefined,
        topic: formData.get('topic') as string,
        note: formData.get('note') as string,
        consentPrivacy: formData.get('consentPrivacy') === 'on',
        consentThirdParty: formData.get('consentThirdParty') === 'on',
      });
      setSubmitted(true);
    } catch {
      setErrors({ submit: '신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
    } finally {
      setLoading(false);
    }
  }

  /* ── Success State ── */
  if (submitted) {
    return (
      <div
        style={{
          background: 'linear-gradient(160deg, #0b1220 0%, #0f172a 100%)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 16px',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: '0',
            boxShadow: '0 24px 64px rgba(0,0,0,0.32)',
            padding: '64px 48px',
            textAlign: 'center',
            maxWidth: '480px',
            width: '100%',
          }}
        >
          {/* Success icon */}
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #36c88a, #2ba876)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 28px',
              boxShadow: '0 8px 24px rgba(54,200,138,0.35)',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M7 16.5l6 6 12-12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1
            className="headline-lg"
            style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}
          >
            세미나 신청이 완료되었습니다
          </h1>
          <p style={{ color: '#64748b', lineHeight: 1.7 }}>
            담당자가 일정을 확인 후 연락드리겠습니다.<br />
            빠른 시일 내에 연락 드리겠습니다.
          </p>
        </div>
      </div>
    );
  }

  /* ── Main Page ── */
  return (
    <div style={{ background: '#ffffff' }}>

      {/* ── 1. Dark Hero ── */}
      <section
        style={{ position: 'relative', background: 'linear-gradient(180deg, #0b1220 0%, #0f172a 100%)', paddingTop: 160, paddingBottom: 80, overflow: 'hidden' }}
      >
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(54,200,138,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(54,200,138,0.015) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
          <div style={{ position: 'absolute', top: '10%', left: '5%', width: '30vw', height: '30vw', maxWidth: '400px', maxHeight: '400px', background: 'radial-gradient(circle, rgba(54,200,138,0.04) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: '-5%', right: '2%', fontSize: 'clamp(120px, 16vw, 280px)', fontWeight: 900, color: 'rgba(255,255,255,0.012)', lineHeight: 1 }}>SEM</div>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(54,200,138,0.2), transparent)' }} />
        </div>
        <div ref={heroRef} style={{ padding: '0 56px', position: 'relative', zIndex: 1 }}>
          <div data-hero style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em' }}>01</span>
            <div style={{ width: '32px', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <span style={{ fontSize: '10px', color: '#36c88a', letterSpacing: '0.08em' }}>VISIT SEMINAR</span>
          </div>
          <h1 data-hero style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 800, color: '#F9FAFB', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '16px' }}>
            DATAWARE 맞춤형<br />방문 세미나<span style={{ color: '#36c88a', fontSize: '1.1em' }}>.</span>
          </h1>
          <p data-hero style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: '520px' }}>전문 컨설턴트가 직접 방문하여 귀사의 데이터 환경에 맞는 최적의 솔루션을 제안해 드립니다.</p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(54,200,138,0.2), transparent)' }} />
      </section>

      {/* ── 2. Seminar Steps (Left-Right Alternating) ── */}
      <section
        className="section-dark section-pad"
        style={{
          background: '#0f172a',
          padding: '100px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div ref={stepsRef} className="wrap" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>

          {/* Section label */}
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <p style={{ color: '#36c88a', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
              세미나 진행 프로세스
            </p>
            <h2 style={{ color: '#ffffff', fontSize: '1.75rem', fontWeight: 700 }}>
              신청부터 완료까지 3단계
            </h2>
          </div>

          {/* Vertical connector line */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '50%',
              top: '180px',
              bottom: '80px',
              width: '2px',
              background: 'linear-gradient(to bottom, rgba(54,200,138,0.6), rgba(54,200,138,0.1))',
              transform: 'translateX(-50%)',
              zIndex: 0,
            }}
          />

          {/* Steps */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '72px' }}>
            {SEMINAR_STEPS.map((s, idx) => {
              const isEven = idx % 2 === 0; /* even → text left, icon right */
              return (
                <div
                  key={s.step}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    alignItems: 'center',
                    gap: '0 40px',
                  }}
                >
                  {/* Left slot */}
                  {isEven ? (
                    /* text block on the left */
                    <div style={{ textAlign: 'right', paddingRight: '8px' }}>
                      <p style={{ color: '#36c88a', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.06em', marginBottom: '8px' }}>
                        STEP {s.step}
                      </p>
                      <h3 style={{ color: '#ffffff', fontSize: '1.375rem', fontWeight: 700, marginBottom: '10px' }}>
                        {s.label}
                      </h3>
                      <p style={{ color: '#94a3b8', fontSize: '0.9375rem', lineHeight: 1.65 }}>
                        {s.desc}
                      </p>
                    </div>
                  ) : (
                    /* icon block on the left */
                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '8px' }}>
                      <div
                        style={{
                          width: '88px',
                          height: '88px',
                          borderRadius: '0',
                          background: 'rgba(54,200,138,0.1)',
                          border: '1px solid rgba(54,200,138,0.25)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#36c88a' }}>{String(s.step).padStart(2, '0')}</span>
                      </div>
                    </div>
                  )}

                  {/* Center node */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #36c88a, #2ba876)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 0 6px rgba(54,200,138,0.12), 0 8px 20px rgba(54,200,138,0.3)',
                        zIndex: 2,
                        position: 'relative',
                      }}
                    >
                      <span
                        style={{
                          color: '#fff',
                          fontSize: '1rem',
                          fontWeight: 700,
                          fontFamily: 'monospace',
                        }}
                      >
                        {s.step}
                      </span>
                    </div>
                    {/* Watermark number */}
                    <span
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        fontSize: '7rem',
                        fontWeight: 700,
                        color: 'rgba(54,200,138,0.04)',
                        lineHeight: 1,
                        userSelect: 'none',
                        pointerEvents: 'none',
                        letterSpacing: '-0.04em',
                      }}
                    >
                      {String(s.step).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Right slot */}
                  {isEven ? (
                    /* icon block on the right */
                    <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '8px' }}>
                      <div
                        style={{
                          width: '88px',
                          height: '88px',
                          borderRadius: '0',
                          background: 'rgba(54,200,138,0.1)',
                          border: '1px solid rgba(54,200,138,0.25)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#36c88a' }}>{String(s.step).padStart(2, '0')}</span>
                      </div>
                    </div>
                  ) : (
                    /* text block on the right */
                    <div style={{ textAlign: 'left', paddingLeft: '8px' }}>
                      <p style={{ color: '#36c88a', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.06em', marginBottom: '8px' }}>
                        STEP {s.step}
                      </p>
                      <h3 style={{ color: '#ffffff', fontSize: '1.375rem', fontWeight: 700, marginBottom: '10px' }}>
                        {s.label}
                      </h3>
                      <p style={{ color: '#94a3b8', fontSize: '0.9375rem', lineHeight: 1.65 }}>
                        {s.desc}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Form Section ── */}
      <section
        className="section-pad"
        style={{
          background: '#f8fafc',
          padding: '96px 24px',
        }}
      >
        <div ref={formRef} className="wrap" style={{ maxWidth: '960px', margin: '0 auto' }}>

          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '12px',
              }}
            >
              세미나 신청서 작성
            </h2>
            <p style={{ color: '#64748b' }}>
              아래 양식을 작성해 주시면 담당자가 확인 후 연락드립니다.
            </p>
          </div>

          {/* Card */}
          <div
            className="card"
            style={{
              background: '#ffffff',
              borderRadius: '0',
              boxShadow: '0 8px 40px rgba(15,23,42,0.10)',
              padding: '48px',
            }}
          >
            <form onSubmit={handleSubmit} noValidate>

              {/* 2-column field grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '20px',
                  marginBottom: '20px',
                }}
              >
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#0f172a', marginBottom: '6px', display: 'block', fontSize: '0.875rem', fontWeight: 600 }}>이름 *</label>
                  <input
                    name="name"
                    className={errors.name ? inputError : inputBase}
                  />
                  {errors.name && <p className="text-xs mt-1" style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.name}</p>}
                </div>
                <div>
                  <label style={{ color: '#0f172a', marginBottom: '6px', display: 'block', fontSize: '0.875rem', fontWeight: 600 }}>회사명 *</label>
                  <input
                    name="company"
                    className={errors.company ? inputError : inputBase}
                  />
                  {errors.company && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.company}</p>}
                </div>
                <div>
                  <label style={{ color: '#0f172a', marginBottom: '6px', display: 'block', fontSize: '0.875rem', fontWeight: 600 }}>연락처 *</label>
                  <input
                    name="phone"
                    className={errors.phone ? inputError : inputBase}
                  />
                  {errors.phone && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.phone}</p>}
                </div>
                <div>
                  <label style={{ color: '#0f172a', marginBottom: '6px', display: 'block', fontSize: '0.875rem', fontWeight: 600 }}>이메일 *</label>
                  <input
                    name="email"
                    type="email"
                    className={errors.email ? inputError : inputBase}
                  />
                  {errors.email && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.email}</p>}
                </div>
                <div>
                  <label style={{ color: '#0f172a', marginBottom: '6px', display: 'block', fontSize: '0.875rem', fontWeight: 600 }}>부서</label>
                  <input
                    name="department"
                    className={inputBase}
                  />
                </div>
                <div>
                  <label style={{ color: '#0f172a', marginBottom: '6px', display: 'block', fontSize: '0.875rem', fontWeight: 600 }}>희망 방문일</label>
                  <input
                    name="preferredDate"
                    type="date"
                    className={inputBase}
                  />
                </div>
                <div>
                  <label style={{ color: '#0f172a', marginBottom: '6px', display: 'block', fontSize: '0.875rem', fontWeight: 600 }}>참석 인원</label>
                  <input
                    name="attendees"
                    type="number"
                    min="1"
                    className={inputBase}
                  />
                </div>
                <div>
                  <label style={{ color: '#0f172a', marginBottom: '6px', display: 'block', fontSize: '0.875rem', fontWeight: 600 }}>관심 주제</label>
                  <input
                    name="topic"
                    placeholder="예: 데이터 모델링, 품질관리"
                    className={inputBase}
                  />
                </div>
              </div>

              {/* Full-width textarea */}
              <div style={{ marginBottom: '28px' }}>
                <label style={{ color: '#0f172a', marginBottom: '6px', display: 'block', fontSize: '0.875rem', fontWeight: 600 }}>비고</label>
                <textarea
                  name="note"
                  rows={3}
                  className="w-full bg-white border border-[#d5d8dd] px-4 py-4 text-[16px] text-[#111111] focus:border-[#36c88a] focus:ring-1 focus:ring-[#36c88a] focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Consent grouped container */}
              <div
                style={{
                  background: '#f1f5f9',
                  borderRadius: '14px',
                  padding: '24px',
                  marginBottom: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <p style={{ color: '#0f172a', fontSize: '0.875rem', fontWeight: 600, marginBottom: '4px' }}>
                  개인정보 동의
                </p>
                <div>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      cursor: 'pointer',
                      color: '#475569',
                      fontSize: '0.875rem',
                    }}
                  >
                    <input
                      type="checkbox"
                      name="consentPrivacy"
                      style={{ marginTop: '2px', accentColor: '#36c88a', flexShrink: 0 }}
                    />
                    <span>[필수] 개인정보 수집 및 이용에 동의합니다.</span>
                  </label>
                  {errors.consentPrivacy && (
                    <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', paddingLeft: '22px' }}>
                      {errors.consentPrivacy}
                    </p>
                  )}
                </div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    cursor: 'pointer',
                    color: '#475569',
                    fontSize: '0.875rem',
                  }}
                >
                  <input
                    type="checkbox"
                    name="consentThirdParty"
                    style={{ marginTop: '2px', accentColor: '#36c88a', flexShrink: 0 }}
                  />
                  <span>[필수] 제3자(㈜엔코아) 정보 제공에 동의합니다.</span>
                </label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    cursor: 'pointer',
                    color: '#475569',
                    fontSize: '0.875rem',
                  }}
                >
                  <input
                    type="checkbox"
                    name="consentMarketing"
                    style={{ marginTop: '2px', accentColor: '#36c88a', flexShrink: 0 }}
                  />
                  <span>[선택] 세미나개최, 제품 업데이트 소식 정보수신에 동의합니다.</span>
                </label>
              </div>

              {errors.submit && (
                <p style={{ color: '#ef4444', fontSize: '0.875rem', textAlign: 'center', marginBottom: '16px' }}>
                  {errors.submit}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-accent"
                style={{
                  width: '100%',
                  background: loading
                    ? '#a6abb2'
                    : 'linear-gradient(135deg, #36c88a, #2ba876)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '16px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: loading ? 'none' : '0 8px 24px rgba(54,200,138,0.32)',
                  transition: 'opacity 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!loading) (e.currentTarget as HTMLButtonElement).style.opacity = '0.88';
                }}
                onMouseLeave={(e) => {
                  if (!loading) (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                }}
              >
                {loading ? '신청 중...' : '세미나 신청'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
