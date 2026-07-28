'use client';

import { useState, useRef, FormEvent } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { EDUCATION_STEPS, EDUCATION_BENEFITS } from '@/data';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';
import ConsentSection from '@/components/forms/ConsentSection';
import { EDUCATION_SESSIONS, getSessionStatus } from '@/data/education-sessions';

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
  const [eduTab, setEduTab] = useState<'upcoming' | 'past'>(() => {
    const upcoming = EDUCATION_SESSIONS.filter(s => getSessionStatus(s) === '신청가능');
    return upcoming.length > 0 ? 'upcoming' : 'past';
  });
  const [notifySubmitted, setNotifySubmitted] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const formAreaRef = useRef<HTMLDivElement>(null);
  const heroRef = useHeroAnim();
  const sessionsRef = useGsapReveal();
  const benefitsRef = useGsapReveal();
  const stepsRef = useGsapReveal();
  const formRef = useGsapReveal();

  const upcomingSessions = EDUCATION_SESSIONS.filter(s => getSessionStatus(s) === '신청가능');
  const pastSessions = EDUCATION_SESSIONS.filter(s => getSessionStatus(s) === '마감');
  const activeSessions = eduTab === 'upcoming' ? upcomingSessions : pastSessions;
  const totalEduPages = Math.ceil(activeSessions.length / PER_PAGE_EDU);
  const pagedSessions = activeSessions.slice(eduPage * PER_PAGE_EDU, (eduPage + 1) * PER_PAGE_EDU);

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
            DA# 무료교육<span style={{ color: '#36c88a', fontSize: '1.1em' }}>.</span>
          </h1>
          <p data-hero style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: '480px' }}>데이터 아키텍처 기본개념, 현장에서 사용할 수 있는 고급 활용 방법, 노하우를 알려드립니다.</p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(54,200,138,0.2), transparent)' }} />
      </section>

      {/* ── 2. Education Sessions — 탭 분리 ── */}
      <section className="section-pad" style={{ background: '#ffffff', minHeight: '50vh' }}>
        <div ref={sessionsRef} className="wrap">
          <p style={{ textAlign: 'center', color: '#36c88a', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>SCHEDULE</p>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', marginBottom: 32, letterSpacing: '-0.02em' }}>교육 일정</h2>

          {/* 탭 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: 40 }}>
            {([['upcoming', `예정 교육 (${upcomingSessions.length})`], ['past', `지난 교육 (${pastSessions.length})`]] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => { setEduTab(key); setEduPage(0); }}
                style={{
                  padding: '14px 36px', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: eduTab === key ? '#101828' : '#f0f2f5',
                  color: eduTab === key ? '#fff' : '#667085',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* 예정 교육이 없을 때 — 알림 신청 */}
          {eduTab === 'upcoming' && upcomingSessions.length === 0 && (
            <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', padding: '48px 24px' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', backgroundColor: '#f0fdf7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="32" height="32" fill="none" stroke="#36c88a" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: '#101828', marginBottom: 10 }}>현재 예정된 교육이 없습니다</h3>
              <p style={{ fontSize: 15, color: '#667085', lineHeight: 1.7, marginBottom: 32 }}>
                새로운 교육이 등록되면 가장 먼저 안내해 드립니다.<br />아래에 정보를 남겨주세요.
              </p>

              {notifySubmitted ? (
                <div style={{ padding: '24px', backgroundColor: '#f0fdf7', border: '1px solid #bbf7d0' }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#166534' }}>등록이 완료되었습니다. 새 교육이 열리면 안내드리겠습니다.</p>
                </div>
              ) : (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  try {
                    await api.submitEducation({
                      name: fd.get('name') as string,
                      company: fd.get('company') as string,
                      phone: fd.get('phone') as string,
                      email: fd.get('email') as string,
                      position: '',
                      preferredDate: '교육 알림 신청',
                      note: '새 교육 알림 요청',
                      consentPrivacy: true,
                      consentThirdParty: false,
                    });
                    setNotifySubmitted(true);
                  } catch { setNotifySubmitted(true); }
                }} style={{ textAlign: 'left' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginBottom: 16 }}>
                    <div>
                      <label className="block text-[13px] font-bold mb-1" style={{ color: '#101828' }}>이름 <span style={{ color: '#ef4444' }}>*</span></label>
                      <input name="name" required placeholder="이름" className={inputBase} />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold mb-1" style={{ color: '#101828' }}>회사명 <span style={{ color: '#ef4444' }}>*</span></label>
                      <input name="company" required placeholder="회사명" className={inputBase} />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold mb-1" style={{ color: '#101828' }}>연락처 <span style={{ color: '#ef4444' }}>*</span></label>
                      <input name="phone" required placeholder="010-0000-0000" className={inputBase} />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold mb-1" style={{ color: '#101828' }}>이메일 <span style={{ color: '#ef4444' }}>*</span></label>
                      <input name="email" type="email" required placeholder="이메일" className={inputBase} value={notifyEmail} onChange={e => setNotifyEmail(e.target.value)} />
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <button type="submit" style={{ padding: '14px 40px', backgroundColor: '#36c88a', color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                      교육 알림 신청하기
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* 교육 카드 그리드 */}
          {(eduTab === 'past' || (eduTab === 'upcoming' && upcomingSessions.length > 0)) && (
            <>
              <div key={`${eduTab}-${eduPage}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24, minHeight: 360 }}>
                {pagedSessions.map((session) => {
                  const status = getSessionStatus(session);
                  const isOpen = status === '신청가능';
                  return (
                    <Link
                      key={session.id}
                      href={`/education/${session.id}`}
                      data-anim
                      style={{
                        display: 'block', textDecoration: 'none', color: 'inherit',
                        backgroundColor: '#fff', border: '1px solid #e6e8ec', overflow: 'hidden',
                        transition: 'box-shadow 0.3s, transform 0.3s',
                        opacity: isOpen ? 1 : 0.7,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.10)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = ''; }}
                    >
                      <div style={{ height: 190, overflow: 'hidden', backgroundColor: '#0b1220', position: 'relative' }}>
                        <img src={session.thumbnail} alt={session.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                          onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
                          loading="lazy"
                        />
                        <span style={{ position: 'absolute', top: 12, left: 12, fontSize: 11, fontWeight: 700, color: '#fff', backgroundColor: 'rgba(54,200,138,0.9)', padding: '4px 10px' }}>{session.tag}</span>
                        <span style={{
                          position: 'absolute', top: 12, right: 12, fontSize: 11, fontWeight: 700, color: '#fff',
                          backgroundColor: isOpen ? '#36c88a' : 'rgba(150,150,150,0.75)',
                          padding: '4px 10px',
                        }}>{status}</span>
                        {!isOpen && (
                          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)' }} />
                        )}
                      </div>
                      <div style={{ padding: '20px 22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                          <svg width="14" height="14" fill="none" stroke="#94a3b8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <p style={{ fontSize: 13, color: '#667085', margin: 0 }}>{session.date}</p>
                        </div>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', lineHeight: 1.4, marginBottom: 6 }}>{session.title}</h3>
                        <p style={{ fontSize: 13, color: '#94a3b8', margin: 0 }}>{session.desc}</p>
                        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #f0f2f5' }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: isOpen ? '#36c88a' : '#94a3b8' }}>
                            {isOpen ? '상세보기 · 신청하기 →' : '상세보기 →'}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
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
            </>
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

      {/* ── 4. Step Process — 카드형 + 아이콘 ── */}
      <section className="section-pad" style={{ backgroundColor: '#0f172a', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(54,200,138,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(54,200,138,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div ref={stepsRef} className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p data-anim style={{ color: '#36c88a', fontWeight: 700, fontSize: 14, letterSpacing: '0.12em', marginBottom: 12 }}>HOW TO APPLY</p>
            <h2 data-anim style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#F9FAFB', marginBottom: 12 }}>
              신청 프로세스<span style={{ color: '#36c88a' }}>.</span>
            </h2>
            <p data-anim style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)' }}>3단계로 간편하게 신청하세요</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 900, margin: '0 auto' }}>
            {EDUCATION_STEPS.map((s, idx) => {
              const icons = [
                <svg key="i1" width="32" height="32" fill="none" stroke="#36c88a" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M10 7v6l4 2" /></svg>,
                <svg key="i2" width="32" height="32" fill="none" stroke="#36c88a" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
                <svg key="i3" width="32" height="32" fill="none" stroke="#36c88a" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
              ];
              return (
                <div
                  key={s.step}
                  data-anim
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(54,200,138,0.12)',
                    padding: '36px 28px',
                    textAlign: 'center',
                    position: 'relative',
                    transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(54,200,138,0.4)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(54,200,138,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'rgba(54,200,138,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  {/* STEP 번호 */}
                  <span style={{ position: 'absolute', top: 16, left: 20, fontSize: 11, fontWeight: 700, color: '#36c88a', letterSpacing: '0.08em' }}>STEP</span>
                  <span style={{ position: 'absolute', top: 12, right: 20, fontSize: 28, fontWeight: 900, color: 'rgba(54,200,138,0.15)' }}>{s.step}</span>

                  {/* 아이콘 */}
                  <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(54,200,138,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px auto 20px' }}>
                    {icons[idx]}
                  </div>

                  <h4 style={{ color: '#F9FAFB', fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{s.label}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>

                  {/* 화살표 커넥터 (마지막 제외) */}
                  {idx < EDUCATION_STEPS.length - 1 && (
                    <div style={{ position: 'absolute', top: '50%', right: -14, transform: 'translateY(-50%)', zIndex: 2 }}>
                      <svg width="28" height="28" fill="none" stroke="rgba(54,200,138,0.4)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. 예정 교육 있을 때만 신청서 / 없으면 동영상 강의 추천 ── */}
      {upcomingSessions.length > 0 ? (
        <section ref={formAreaRef} id="education-form" className="section-pad" style={{ background: '#ffffff' }}>
          <div ref={formRef} className="wrap">
            <p style={{ textAlign: 'center', color: '#36c88a', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>신청하기</p>
            <h2 className="headline-md" style={{ textAlign: 'center', color: '#0f172a', marginBottom: 48 }}>무료교육 신청서</h2>
            <div className="card" style={{ maxWidth: 960, margin: '0 auto', borderRadius: 0, padding: 'clamp(28px, 5vw, 48px)' }}>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {selectedSession && (
                  <div style={{ padding: '14px 20px', backgroundColor: 'rgba(54,200,138,0.06)', border: '1px solid rgba(54,200,138,0.15)', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#36c88a', letterSpacing: '0.06em' }}>선택된 교육</span>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#101828', marginTop: 2 }}>{selectedSession}</p>
                    </div>
                    <button type="button" onClick={() => setSelectedSession('')} style={{ fontSize: 12, color: '#98A2B3', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
                  </div>
                )}
                <input type="hidden" name="selectedSession" value={selectedSession} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'name', label: '이름 *' },
                    { name: 'company', label: '회사명 *' },
                    { name: 'phone', label: '연락처 *' },
                    { name: 'email', label: '이메일 *', type: 'email' },
                    { name: 'position', label: '직책' },
                    { name: 'preferredDate', label: '희망 교육일', type: 'date' },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-sm font-medium mb-1" style={{ color: '#0f172a' }}>{f.label}</label>
                      <input name={f.name} type={f.type || 'text'} className={errors[f.name] ? inputError : inputBase} />
                      {errors[f.name] && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors[f.name]}</p>}
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#0f172a' }}>비고</label>
                  <textarea name="note" rows={3} className={`${inputBase} resize-none`} />
                </div>
                <ConsentSection errors={errors} />
                {errors.submit && <p className="text-sm text-center" style={{ color: '#ef4444' }}>{errors.submit}</p>}
                <button type="submit" disabled={loading} className="btn-accent w-full" style={{ borderRadius: 0, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer', fontSize: 16, padding: '16px 0' }}>
                  {loading ? '신청 중...' : '무료교육 신청'}
                </button>
              </form>
            </div>
          </div>
        </section>
      ) : (
        /* 예정 교육 없을 때 → 동영상 강의 추천 */
        <section ref={formAreaRef} className="section-pad" style={{ background: '#ffffff' }}>
          <div ref={formRef} className="wrap">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ color: '#36c88a', fontWeight: 700, fontSize: 14, letterSpacing: '0.12em', marginBottom: 12 }}>VIDEO LECTURES</p>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>
                DA# 전문가의 인사이트<span style={{ color: '#36c88a' }}>.</span>
              </h2>
              <p style={{ fontSize: 16, color: '#667085' }}>DA# 활용 노하우를 영상으로 만나보세요</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, maxWidth: 960, margin: '0 auto' }}>
              {[
                { title: '새로운 시대의 데이터모델링', speaker: '이화식 대표', youtubeId: '33nGO8uZOQ8' },
                { title: 'DA#5 기본구조 및 개념', speaker: '최광희 연구원', youtubeId: 'V-8w2lXyiqY' },
                { title: '초보자도 할 수 있는 현행모델 파헤치기', speaker: '이임형 연구원', youtubeId: '1qP1zbsChQc' },
              ].map((v) => (
                <a
                  key={v.youtubeId}
                  href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', textDecoration: 'none', border: '1px solid #e6e8ec', overflow: 'hidden', transition: 'box-shadow 0.3s, transform 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = ''; }}
                >
                  <div style={{ position: 'relative', height: 180, backgroundColor: '#0b1220', overflow: 'hidden' }}>
                    <img src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 52, height: 52, borderRadius: '50%', backgroundColor: 'rgba(54,200,138,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(54,200,138,0.4)' }}>
                        <svg width="20" height="20" fill="#fff" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                    <span style={{ position: 'absolute', top: 10, left: 10, fontSize: 11, fontWeight: 700, color: '#fff', backgroundColor: 'rgba(54,200,138,0.9)', padding: '3px 10px' }}>DA#5 세미나</span>
                  </div>
                  <div style={{ padding: '16px 20px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', lineHeight: 1.4, marginBottom: 6 }}>{v.title}</h3>
                    <p style={{ fontSize: 13, color: '#94a3b8', margin: 0 }}>{v.speaker}</p>
                  </div>
                </a>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <Link href="/resources/videos" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', backgroundColor: '#101828', color: '#fff', fontSize: 15, fontWeight: 700, textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#1e293b'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#101828'; }}
              >
                전체 강의 보기
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
