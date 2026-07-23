'use client';

import { useState, useRef, FormEvent } from 'react';
import { api } from '@/lib/api';
import { EDUCATION_STEPS, EDUCATION_BENEFITS } from '@/data';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';

const EDUCATION_SESSIONS = [
  { id: 1, title: '2026 DA# 실전 데이터모델링 (3월)', date: '2026-03', thumbnail: '/images/uniondata/2026DA_head-1.png', tag: '실전', status: '신청가능' },
  { id: 2, title: '2026 DA# 실전 데이터모델링 (4월)', date: '2026-04', thumbnail: '/images/uniondata/2026DA_head-2.png', tag: '실전', status: '신청가능' },
  { id: 3, title: '2026 DA# 실전 데이터모델링 (6월)', date: '2026-06', thumbnail: '/images/uniondata/2026DA_head-3.png', tag: '실전', status: '신청가능' },
  { id: 4, title: '2026 홍우석의 실전데이터모델링 (6월)', date: '2026-06', thumbnail: '/images/uniondata/2606%ED%99%8D%EC%9A%B0%EC%84%9D%EC%9D%98-%EC%8B%A4%EC%A0%84%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%AA%A8%EB%8D%B8%EB%A7%81_head.png', tag: '특강', status: '신청가능' },
  { id: 5, title: '2026 홍우석의 실전데이터모델링 (4월)', date: '2026-04', thumbnail: '/images/uniondata/260424-%EC%8B%A4%EC%A0%84%EB%8D%B0%EB%AA%A8_head.png', tag: '특강', status: '마감' },
  { id: 6, title: '2025 DA# 실전 데이터모델링 (11월)', date: '2025-11', thumbnail: '/images/uniondata/202511DA__head.png', tag: '실전', status: '마감' },
  { id: 7, title: '2025 DA# 실전 데이터모델링 (9월)', date: '2025-09', thumbnail: '/images/uniondata/202509DA__head.png', tag: '실전', status: '마감' },
  { id: 8, title: '2025 데모클 데이터모델링 (11월)', date: '2025-11', thumbnail: '/images/uniondata/20251114_%EB%8D%B0%EB%AA%A8%ED%81%B4-head.png', tag: '데모클', status: '마감' },
  { id: 9, title: '2025 데모클 데이터모델링 (10월)', date: '2025-10', thumbnail: '/images/uniondata/20251017_%EB%8D%B0%EB%AA%A8%ED%81%B4-head-1.png', tag: '데모클', status: '마감' },
  { id: 10, title: '2024 DA# 실전 데이터모델링', date: '2024-10', thumbnail: '/images/uniondata/2024DA__head-001-2-1.png', tag: '실전', status: '마감' },
];

const inputBase =
  'w-full bg-white border border-[#d5d8dd] px-4 py-4 text-[16px] text-[#111111] focus:border-[#36c88a] focus:ring-1 focus:ring-[#36c88a] focus:outline-none transition-colors';
const inputError =
  'w-full bg-white border border-red-400 px-4 py-4 text-[16px] text-[#111111] focus:border-red-400 focus:ring-1 focus:ring-red-400 focus:outline-none transition-colors';

type FieldErrors = Record<string, string>;

const PER_PAGE_EDU = 6;

export default function EducationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [eduPage, setEduPage] = useState(0);
  const [selectedSession, setSelectedSession] = useState('');
  const formAreaRef = useRef<HTMLDivElement>(null);
  const heroRef = useHeroAnim();
  const sessionsRef = useGsapReveal();
  const benefitsRef = useGsapReveal();
  const stepsRef = useGsapReveal();
  const formRef = useGsapReveal();

  const totalEduPages = Math.ceil(EDUCATION_SESSIONS.length / PER_PAGE_EDU);
  const pagedSessions = EDUCATION_SESSIONS.slice(eduPage * PER_PAGE_EDU, (eduPage + 1) * PER_PAGE_EDU);

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
      await api.submitEducation({
        name: formData.get('name') as string,
        company: formData.get('company') as string,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string,
        position: formData.get('position') as string,
        preferredDate: formData.get('preferredDate') as string,
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

  if (submitted) {
    return (
      <div style={{ background: 'linear-gradient(180deg, #0b1220, #0f172a)', minHeight: '100vh' }}>
        {/* Dark Hero */}
        <div
          className="grid-bg"
          style={{
            paddingTop: 120,
            paddingBottom: 80,
            textAlign: 'center',
          }}
        >
          <div className="wrap">
            <p className="eyebrow" style={{ marginBottom: 16 }}>무료교육</p>
            <h1 className="headline-lg" style={{ color: '#ffffff', marginBottom: 12 }}>무료교육 신청</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17 }}>
              DA# 데이터 모델링 전문가 교육을 무료로 받아보세요
            </p>
          </div>
        </div>

        {/* Success card */}
        <div className="wrap" style={{ paddingTop: 64, paddingBottom: 120 }}>
          <div
            className="card"
            style={{
              maxWidth: 560,
              margin: '0 auto',
              borderRadius: 0,
              padding: '56px 48px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'var(--accent-pale)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}
            >
              <span style={{ color: '#36c88a', fontSize: 32, lineHeight: 1 }}>✓</span>
            </div>
            <h2 className="headline-md" style={{ color: '#0f172a', marginBottom: 12 }}>
              신청이 완료되었습니다
            </h2>
            <p style={{ color: '#64748b', fontSize: 16 }}>
              담당자가 일정을 확인 후 연락드리겠습니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#ffffff' }}>
      {/* ── 1. Dark Hero Banner ── */}
      <section
        style={{ position: 'relative', background: 'linear-gradient(180deg, #0b1220 0%, #0f172a 100%)', paddingTop: 160, paddingBottom: 80, overflow: 'hidden' }}
      >
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(54,200,138,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(54,200,138,0.015) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
          <div style={{ position: 'absolute', top: '15%', right: '8%', width: '30vw', height: '30vw', maxWidth: '400px', maxHeight: '400px', background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: '-5%', right: '2%', fontSize: 'clamp(120px, 16vw, 280px)', fontWeight: 900, color: 'rgba(255,255,255,0.012)', lineHeight: 1 }}>EDU</div>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(54,200,138,0.2), transparent)' }} />
        </div>
        <div ref={heroRef} style={{ padding: '0 56px', position: 'relative', zIndex: 1 }}>
          <div data-hero style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em' }}>01</span>
            <div style={{ width: '32px', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <span style={{ fontSize: '10px', color: '#36c88a', letterSpacing: '0.08em' }}>FREE EDUCATION</span>
          </div>
          <h1 data-hero style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 800, color: '#F9FAFB', letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: '16px' }}>
            무료교육 신청<span style={{ color: '#36c88a', fontSize: '1.1em' }}>.</span>
          </h1>
          <p data-hero style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: '480px' }}>DA# 데이터 모델링 전문가 교육을 무료로 받아보세요.</p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(54,200,138,0.2), transparent)' }} />
      </section>

      {/* ── 2. Education Sessions Grid ── */}
      <section className="section-pad" style={{ background: '#ffffff' }}>
        <div ref={sessionsRef} className="wrap">
          <p style={{ textAlign: 'center', color: '#36c88a', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>교육 일정</p>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', marginBottom: 48, letterSpacing: '-0.02em' }}>최신 교육 일정</h2>

          <div key={eduPage} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24, minHeight: 360 }}>
            {pagedSessions.map((session) => (
              <div
                key={session.id}
                style={{ border: '1px solid rgba(15,23,42,0.08)', overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.2s, transform 0.2s' }}
                onClick={() => {
                  if (session.status === '신청가능') {
                    setSelectedSession(session.title);
                    formAreaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ height: 168, overflow: 'hidden', backgroundColor: '#0b1220', position: 'relative' }}>
                  <img src={session.thumbnail} alt={session.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  <span style={{ position: 'absolute', top: 10, left: 10, fontSize: 11, fontWeight: 700, color: '#fff', backgroundColor: 'rgba(54,200,138,0.9)', padding: '2px 8px' }}>{session.tag}</span>
                  <span style={{ position: 'absolute', top: 10, right: 10, fontSize: 11, fontWeight: 700, color: '#fff', backgroundColor: session.status === '신청가능' ? 'rgba(15,23,42,0.75)' : 'rgba(150,150,150,0.75)', padding: '2px 8px' }}>{session.status}</span>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 6 }}>{session.date}</p>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', lineHeight: 1.45, margin: 0 }}>{session.title}</h3>
                  {session.status === '신청가능' && (
                    <div style={{ marginTop: 12 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#36c88a' }}>신청하기 →</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {totalEduPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 40 }}>
              <button onClick={() => setEduPage(p => Math.max(0, p - 1))} disabled={eduPage === 0}
                style={{ padding: '10px 20px', border: '1px solid rgba(15,23,42,0.1)', backgroundColor: eduPage === 0 ? '#F7F7F5' : '#fff', color: eduPage === 0 ? '#D0D5DD' : '#101828', fontSize: 13, fontWeight: 600, cursor: eduPage === 0 ? 'default' : 'pointer' }}
              >이전</button>
              {Array.from({ length: totalEduPages }, (_, i) => (
                <button key={i} onClick={() => setEduPage(i)}
                  style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: eduPage === i ? 'none' : '1px solid rgba(15,23,42,0.1)', backgroundColor: eduPage === i ? '#101828' : '#fff', color: eduPage === i ? '#fff' : '#667085', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
                >{i + 1}</button>
              ))}
              <button onClick={() => setEduPage(p => Math.min(totalEduPages - 1, p + 1))} disabled={eduPage === totalEduPages - 1}
                style={{ padding: '10px 20px', border: '1px solid rgba(15,23,42,0.1)', backgroundColor: eduPage === totalEduPages - 1 ? '#F7F7F5' : '#fff', color: eduPage === totalEduPages - 1 ? '#D0D5DD' : '#101828', fontSize: 13, fontWeight: 600, cursor: eduPage === totalEduPages - 1 ? 'default' : 'pointer' }}
              >다음</button>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. Benefits Section — Bento layout ── */}
      <section className="section-pad" style={{ background: '#f8fafc' }}>
        <div ref={benefitsRef} className="wrap">
          <p
            style={{
              textAlign: 'center',
              color: '#36c88a',
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 40,
            }}
          >
            교육 혜택
          </p>

          {/* First card: full-width horizontal */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 0,
              borderLeft: '4px solid #36c88a',
              padding: '28px 32px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 24,
              marginBottom: 16,
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 0,
                background: 'var(--accent-pale)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 700, color: '#36c88a' }}>01</span>
            </div>
            <div>
              <h3
                style={{
                  color: '#0f172a',
                  fontWeight: 700,
                  fontSize: 18,
                  marginBottom: 6,
                }}
              >
                {EDUCATION_BENEFITS[0].title}
              </h3>
              <p style={{ color: '#64748b', fontSize: 15, lineHeight: 1.6, margin: 0 }}>
                {EDUCATION_BENEFITS[0].desc}
              </p>
            </div>
          </div>

          {/* Second and third cards: side by side */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {[
              { benefit: EDUCATION_BENEFITS[1], icon: '02' },
              { benefit: EDUCATION_BENEFITS[2], icon: '03' },
            ].map(({ benefit, icon }) => (
              <div
                key={benefit.title}
                style={{
                  background: '#ffffff',
                  borderRadius: 0,
                  borderLeft: '4px solid #36c88a',
                  padding: '24px 28px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 20,
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 0,
                    background: 'var(--accent-pale)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#36c88a' }}>{icon}</span>
                </div>
                <div>
                  <h3
                    style={{
                      color: '#0f172a',
                      fontWeight: 700,
                      fontSize: 16,
                      marginBottom: 4,
                    }}
                  >
                    {benefit.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Step Process — Dark section, horizontal ── */}
      <section className="section-dark section-pad">
        <div ref={stepsRef} className="wrap">
          <p
            style={{
              textAlign: 'center',
              color: '#36c88a',
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 48,
            }}
          >
            신청 프로세스
          </p>

          {/* Horizontal step row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              gap: 0,
              flexWrap: 'wrap',
            }}
          >
            {EDUCATION_STEPS.map((s, idx) => (
              <div
                key={s.step}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  flex: '0 0 auto',
                }}
              >
                {/* Step item */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    width: 180,
                    padding: '0 8px',
                  }}
                >
                  {/* Circle */}
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      background: '#36c88a',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: 18,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 16,
                      boxShadow: '0 0 0 6px rgba(54,200,138,0.15)',
                    }}
                  >
                    {s.step}
                  </div>
                  <h4
                    style={{
                      color: '#f1f5f9',
                      fontWeight: 700,
                      fontSize: 15,
                      marginBottom: 8,
                    }}
                  >
                    {s.label}
                  </h4>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>

                {/* Connecting line (not after last step) */}
                {idx < EDUCATION_STEPS.length - 1 && (
                  <div
                    style={{
                      width: 60,
                      height: 2,
                      background: 'linear-gradient(90deg, #36c88a, rgba(54,200,138,0.2))',
                      marginTop: 25,
                      flexShrink: 0,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Form Section ── */}
      <section ref={formAreaRef} className="section-pad" style={{ background: '#ffffff' }}>
        <div ref={formRef} className="wrap">
          <p
            style={{
              textAlign: 'center',
              color: '#36c88a',
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            신청하기
          </p>
          <h2
            className="headline-md"
            style={{ textAlign: 'center', color: '#0f172a', marginBottom: 48 }}
          >
            무료교육 신청서
          </h2>

          {/* Form card */}
          <div
            className="card"
            style={{
              maxWidth: 960,
              margin: '0 auto',
              borderRadius: 0,
              padding: 'clamp(28px, 5vw, 48px)',
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* 선택된 세션 표시 */}
              {selectedSession && (
                <div style={{ padding: '14px 20px', backgroundColor: 'rgba(54,200,138,0.06)', border: '1px solid rgba(54,200,138,0.15)', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#36c88a', letterSpacing: '0.06em' }}>선택된 교육</span>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#101828', marginTop: 2 }}>{selectedSession}</p>
                  </div>
                  <button type="button" onClick={() => setSelectedSession('')} style={{ fontSize: 12, color: '#98A2B3', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
                </div>
              )}
              <input type="hidden" name="selectedSession" value={selectedSession} />
              {/* 2-col grid for field pairs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: '#0f172a' }}
                  >
                    이름 *
                  </label>
                  <input name="name" className={errors.name ? inputError : inputBase} />
                  {errors.name && (
                    <p className="text-xs mt-1" style={{ color: '#ef4444' }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: '#0f172a' }}
                  >
                    회사명 *
                  </label>
                  <input name="company" className={errors.company ? inputError : inputBase} />
                  {errors.company && (
                    <p className="text-xs mt-1" style={{ color: '#ef4444' }}>
                      {errors.company}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: '#0f172a' }}
                  >
                    연락처 *
                  </label>
                  <input name="phone" className={errors.phone ? inputError : inputBase} />
                  {errors.phone && (
                    <p className="text-xs mt-1" style={{ color: '#ef4444' }}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: '#0f172a' }}
                  >
                    이메일 *
                  </label>
                  <input
                    name="email"
                    type="email"
                    className={errors.email ? inputError : inputBase}
                  />
                  {errors.email && (
                    <p className="text-xs mt-1" style={{ color: '#ef4444' }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: '#0f172a' }}
                  >
                    직책
                  </label>
                  <input name="position" className={inputBase} />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: '#0f172a' }}
                  >
                    희망 교육일
                  </label>
                  <input name="preferredDate" type="date" className={inputBase} />
                </div>
              </div>

              {/* Note — full width */}
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: '#0f172a' }}
                >
                  비고
                </label>
                <textarea
                  name="note"
                  rows={3}
                  className="w-full bg-white border border-[#d5d8dd] px-4 py-4 text-[16px] text-[#111111] focus:border-[#36c88a] focus:ring-1 focus:ring-[#36c88a] focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Consent group */}
              <div
                style={{
                  background: '#f8fafc',
                  borderRadius: 0,
                  padding: '20px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: 4,
                  }}
                >
                  동의 항목
                </p>

                <div>
                  <label
                    className="flex items-start gap-2 text-sm cursor-pointer"
                    style={{ color: '#334155' }}
                  >
                    <input
                      type="checkbox"
                      name="consentPrivacy"
                      className="mt-1"
                      style={{ accentColor: '#36c88a' }}
                    />
                    <span>[필수] 개인정보 수집 및 이용에 동의합니다.</span>
                  </label>
                  {errors.consentPrivacy && (
                    <p className="text-xs mt-1 ml-5" style={{ color: '#ef4444' }}>
                      {errors.consentPrivacy}
                    </p>
                  )}
                </div>

                <label
                  className="flex items-start gap-2 text-sm cursor-pointer"
                  style={{ color: '#334155' }}
                >
                  <input
                    type="checkbox"
                    name="consentThirdParty"
                    className="mt-1"
                    style={{ accentColor: '#36c88a' }}
                  />
                  <span>[필수] 제3자(㈜엔코아) 정보 제공에 동의합니다.</span>
                </label>

                <label
                  className="flex items-start gap-2 text-sm cursor-pointer"
                  style={{ color: '#334155' }}
                >
                  <input
                    type="checkbox"
                    name="consentMarketing"
                    className="mt-1"
                    style={{ accentColor: '#36c88a' }}
                  />
                  <span>[선택] 세미나개최, 제품 업데이트 소식 정보수신에 동의합니다.</span>
                </label>
              </div>

              {errors.submit && (
                <p className="text-sm text-center" style={{ color: '#ef4444' }}>
                  {errors.submit}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-accent w-full"
                style={{
                  borderRadius: 0,
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: 16,
                  padding: '16px 0',
                }}
              >
                {loading ? '신청 중...' : '무료교육 신청'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
