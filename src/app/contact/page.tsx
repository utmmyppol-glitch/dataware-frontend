'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { INQUIRY_CATEGORIES, COMPANY } from '@/data';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';

const ACCENT = '#36c88a';

const inputBase =
  'w-full bg-white border border-[#d5d8dd] px-4 py-4 text-[16px] text-[#111111] focus:border-[#36c88a] focus:ring-1 focus:ring-[#36c88a] focus:outline-none transition-colors';
const inputError =
  'w-full bg-white border border-red-400 px-4 py-3 text-[#111111] focus:border-red-400 focus:ring-1 focus:ring-red-400 focus:outline-none transition-colors';

type FieldErrors = Record<string, string>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const heroRef = useHeroAnim() as React.RefObject<HTMLElement>;
  const contentRef = useGsapReveal() as React.RefObject<HTMLElement>;

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
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await api.submitInquiry({
        name: formData.get('name') as string,
        company: formData.get('company') as string,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string,
        message: formData.get('message') as string,
        product: formData.get('product') as string,
        consentPrivacy: formData.get('consentPrivacy') === 'on',
        consentThirdParty: formData.get('consentThirdParty') === 'on',
      });
      setSubmitted(true);
    } catch {
      setErrors({ submit: '문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ backgroundColor: '#0B1220', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ width: '64px', height: '64px', backgroundColor: `${ACCENT}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
            <svg width="28" height="28" fill="none" stroke={ACCENT} strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#F9FAFB', marginBottom: '12px' }}>문의가 접수되었습니다</h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: '32px' }}>담당자가 빠른 시일 내에 연락드리겠습니다.</p>
          <Link href="/" style={{ padding: '14px 28px', backgroundColor: ACCENT, color: '#fff', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>홈으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} style={{ position: 'relative', backgroundColor: '#0B1220', overflow: 'hidden', paddingTop: 120, paddingBottom: 72 }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
          {[5, 95].map(p => <div key={p} style={{ position: 'absolute', left: `${p}%`, top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.025)' }} />)}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent 15%, ${ACCENT}40, transparent 85%)` }} />
          <div style={{ position: 'absolute', top: 16, left: 16, width: 20, height: 20, borderTop: `1px solid ${ACCENT}20`, borderLeft: `1px solid ${ACCENT}20` }} />
          <div style={{ position: 'absolute', top: 16, right: 16, width: 20, height: 20, borderTop: `1px solid ${ACCENT}20`, borderRight: `1px solid ${ACCENT}20` }} />
          <div style={{ position: 'absolute', bottom: 16, left: 16, width: 20, height: 20, borderBottom: `1px solid ${ACCENT}20`, borderLeft: `1px solid ${ACCENT}20` }} />
          <div style={{ position: 'absolute', bottom: 16, right: 16, width: 20, height: 20, borderBottom: `1px solid ${ACCENT}20`, borderRight: `1px solid ${ACCENT}20` }} />
          <div style={{ position: 'absolute', bottom: '-8%', right: '-1%', fontSize: 'clamp(120px, 18vw, 300px)', fontWeight: 900, color: 'rgba(255,255,255,0.015)', letterSpacing: '-0.06em', lineHeight: 0.85 }}>CONTACT</div>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span data-hero style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em', display: 'block', marginBottom: 12 }}>CONTACT US</span>
          <h1 data-hero style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 800, color: '#F9FAFB', letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 20 }}>
            도입문의<span style={{ color: ACCENT }}>.</span>
          </h1>
          <p data-hero style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, maxWidth: 480, margin: '0 auto 40px' }}>
            DA# 도입에 관한 문의를 남겨주세요.
          </p>
          <div data-hero style={{ display: 'flex', justifyContent: 'center', gap: 40 }}>
            {[
              { label: 'TEL', value: COMPANY.tel },
              { label: 'E-MAIL', value: COMPANY.email },
              { label: '영업시간', value: '평일 09:00 - 18:00' },
            ].map(info => (
              <div key={info.label}>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>{info.label}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#F9FAFB' }}>{info.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FORM — 중앙 큼지막하게 ═══ */}
      <section ref={contentRef} style={{ position: 'relative', backgroundColor: '#F7F7F5', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(15,23,42,0.012) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div style={{ position: 'absolute', top: 16, left: 16, width: 16, height: 16, borderTop: '1px solid rgba(15,23,42,0.04)', borderLeft: '1px solid rgba(15,23,42,0.04)' }} />
          <div style={{ position: 'absolute', bottom: 16, right: 16, width: 16, height: 16, borderBottom: '1px solid rgba(15,23,42,0.04)', borderRight: '1px solid rgba(15,23,42,0.04)' }} />
        </div>

        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '80px 24px', position: 'relative', zIndex: 1 }}>
          <div data-anim style={{ backgroundColor: '#fff', padding: 'clamp(40px, 6vw, 72px)', border: '1px solid rgba(15,23,42,0.06)', boxShadow: '0 16px 64px rgba(0,0,0,0.06)' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <span style={{ fontSize: 10, fontWeight: 500, color: '#98A2B3', letterSpacing: '0.14em' }}>INQUIRY FORM</span>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#101828', marginTop: 8 }}>문의 양식</h2>
              <div style={{ width: 40, height: 2, backgroundColor: ACCENT, margin: '16px auto 0', opacity: 0.6 }} />
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ marginBottom: 20 }}>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#101828' }}>이름 <span style={{ color: ACCENT }}>*</span></label>
                  <input name="name" placeholder="홍길동" className={errors.name ? inputError : inputBase} />
                  {errors.name && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#101828' }}>회사명 <span style={{ color: ACCENT }}>*</span></label>
                  <input name="company" placeholder="주식회사 OOO" className={errors.company ? inputError : inputBase} />
                  {errors.company && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.company}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#101828' }}>연락처 <span style={{ color: ACCENT }}>*</span></label>
                  <input name="phone" placeholder="010-0000-0000" className={errors.phone ? inputError : inputBase} />
                  {errors.phone && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#101828' }}>이메일 <span style={{ color: ACCENT }}>*</span></label>
                  <input name="email" type="email" placeholder="example@company.com" className={errors.email ? inputError : inputBase} />
                  {errors.email && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.email}</p>}
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#101828' }}>구분 <span style={{ color: ACCENT }}>*</span></label>
                <select name="product" className={inputBase} style={{ appearance: 'auto' }}>
                  <option value="">상담 구분을 선택해주세요.</option>
                  {INQUIRY_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: 28 }}>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#101828' }}>문의 내용</label>
                <textarea name="message" rows={5} placeholder="문의하실 내용을 자유롭게 작성해주세요." className={`${inputBase} resize-none`} />
              </div>

              {/* 동의 영역 */}
              <div style={{ backgroundColor: '#F7F7F5', padding: '20px 24px', marginBottom: 28, border: '1px solid rgba(15,23,42,0.04)' }}>
                <div style={{ marginBottom: 12 }}>
                  <label className="flex items-start gap-3 cursor-pointer" style={{ fontSize: 14, color: '#475467' }}>
                    <input type="checkbox" name="consentPrivacy" className="mt-1" style={{ accentColor: ACCENT, width: 18, height: 18 }} />
                    <span><span style={{ color: ACCENT, fontWeight: 600 }}>[필수]</span> 개인정보 수집 및 이용에 동의합니다.</span>
                  </label>
                  {errors.consentPrivacy && <p className="text-xs mt-1 ml-8" style={{ color: '#ef4444' }}>{errors.consentPrivacy}</p>}
                </div>
                <label className="flex items-start gap-3 cursor-pointer" style={{ fontSize: 14, color: '#475467' }}>
                  <input type="checkbox" name="consentThirdParty" className="mt-1" style={{ accentColor: ACCENT, width: 18, height: 18 }} />
                  <span><span style={{ color: ACCENT, fontWeight: 600 }}>[필수]</span> 제3자(㈜엔코어) 정보 제공에 동의합니다.</span>
                </label>
              </div>

              {errors.submit && <p className="text-sm text-center" style={{ color: '#ef4444', marginBottom: 16 }}>{errors.submit}</p>}

              <button type="submit" disabled={loading} style={{
                width: '100%', padding: '20px', backgroundColor: loading ? '#94a3b8' : ACCENT, color: '#fff',
                fontSize: 17, fontWeight: 700, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : `0 8px 24px ${ACCENT}30`, transition: 'all 0.25s',
                letterSpacing: '0.02em',
              }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.backgroundColor = '#2ba876'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                onMouseLeave={e => { if (!loading) { e.currentTarget.style.backgroundColor = ACCENT; e.currentTarget.style.transform = ''; } }}
              >{loading ? '접수 중...' : '문의하기'}</button>
            </form>
          </div>

          {/* 하단 회사 정보 — 작고 절제되게 */}
          <div data-anim style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 40, flexWrap: 'wrap' }}>
            {[
              { icon: '📞', value: COMPANY.tel },
              { icon: '✉️', value: COMPANY.email },
              { icon: '📍', value: '서울 성동구 아차산로17길 49' },
            ].map(info => (
              <span key={info.value} style={{ fontSize: 13, color: '#98A2B3', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 14 }}>{info.icon}</span> {info.value}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 2-SPLIT CTA ═══ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 260 }}>
        <Link href="/download" style={{ backgroundColor: '#101828', padding: '48px 56px', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'background 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1e293b'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#101828'; }}
        >
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>DOWNLOAD</span>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#F9FAFB', marginTop: 10, lineHeight: 1.3 }}>
            DA# 소개서를<br />먼저 받아보세요<span style={{ color: ACCENT }}>.</span>
          </h3>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16, fontSize: 14, fontWeight: 600, color: ACCENT }}>소개서 다운로드 →</span>
        </Link>
        <Link href="/education" style={{ backgroundColor: ACCENT, padding: '48px 56px', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'filter 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.92)'; }}
          onMouseLeave={e => { e.currentTarget.style.filter = ''; }}
        >
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}>EDUCATION</span>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginTop: 10, lineHeight: 1.3 }}>
            DA# 무료교육도<br />신청하세요<span style={{ opacity: 0.6 }}>.</span>
          </h3>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16, fontSize: 14, fontWeight: 600, color: '#fff' }}>무료교육 신청 →</span>
        </Link>
      </div>
    </>
  );
}
