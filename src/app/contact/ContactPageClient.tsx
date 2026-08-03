'use client';

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { INQUIRY_CATEGORIES, COMPANY } from '@/data';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';
import ConsentSection from '@/components/forms/ConsentSection';
import { E, safeParse, useEditMode, useEditableManifest, EDITABLE_STYLES } from '@/lib/editable';

const ACCENT = '#36c88a';

import { validateCommonFields, inputBase, inputError, type FieldErrors } from '@/lib/form-validation';

const DEFAULT_HERO = { title: '도입문의' };
const DEFAULT_CTA = { download: 'DA# 소개서를 먼저 받아보세요', education: 'DA# 무료교육도 신청하세요', btn_download: '소개서 다운로드 →', btn_edu: '무료교육 신청 →' };

export default function ContactPageClient({ ssrContent }: { ssrContent: Record<string, string> }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const heroRef = useHeroAnim() as React.RefObject<HTMLElement>;
  const contentRef = useGsapReveal() as React.RefObject<HTMLElement>;
  const editMode = useEditMode();
  useEditableManifest(editMode);

  const [hero, setHero] = useState(() => safeParse(ssrContent.contact_hero, DEFAULT_HERO));
  const [cta, setCta] = useState(() => safeParse(ssrContent.contact_cta, DEFAULT_CTA));

  useEffect(() => {
    if (!editMode) return;
    const setters: Record<string, (v: unknown) => void> = {
      contact_hero: setHero as (v: unknown) => void,
      contact_cta: setCta as (v: unknown) => void,
    };
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'content-update') {
        const fn = setters[e.data.section];
        if (fn) fn(e.data.data);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [editMode]);

  function validate(formData: FormData): FieldErrors {
    const errs = validateCommonFields(formData);
    if (!String(formData.get('product') ?? '').trim()) errs.product = '상담 구분을 선택해주세요.';
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
      const file = formData.get('file') as File;
      if (file && file.size > 0) {
        const submitData = new FormData();
        submitData.append('name', formData.get('name') as string);
        submitData.append('company', formData.get('company') as string);
        submitData.append('phone', formData.get('phone') as string);
        submitData.append('email', formData.get('email') as string);
        submitData.append('message', formData.get('message') as string);
        submitData.append('product', formData.get('product') as string);
        submitData.append('consentPrivacy', 'true');
        submitData.append('consentThirdParty', 'true');
        submitData.append('consentMarketing', 'false');
        submitData.append('file', file);
        await api.submitInquiryWithFile(submitData);
      } else {
        await api.submitInquiry({
          name: formData.get('name') as string,
          company: formData.get('company') as string,
          phone: formData.get('phone') as string,
          email: formData.get('email') as string,
          message: formData.get('message') as string,
          product: formData.get('product') as string,
          consentPrivacy: true,
          consentThirdParty: true,
        });
      }
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
      {/* ═══ HERO (컴팩트) ═══ */}
      <section ref={heroRef} style={{ position: 'relative', backgroundColor: '#0B1220', overflow: 'hidden', paddingTop: 100, paddingBottom: 48 }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent 15%, ${ACCENT}40, transparent 85%)` }} />
        </div>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 data-hero style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: '#F9FAFB', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 16 }}>
            <E id="contact_hero.title" editMode={editMode}>{hero.title}</E><span style={{ color: ACCENT }}>.</span>
          </h1>
          <p data-hero style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
            DA# 도입에 관한 문의를 남겨주세요. &nbsp;|&nbsp; TEL {COMPANY.tel} &nbsp;|&nbsp; {COMPANY.email}
          </p>
        </div>
      </section>

      {/* ═══ FORM (화면 꽉 차게) ═══ */}
      <section ref={contentRef} style={{ backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px 64px' }}>
          <h2 data-anim style={{ fontSize: 22, fontWeight: 700, color: ACCENT, textAlign: 'center', marginBottom: 32 }}>도입문의</h2>

          <form onSubmit={handleSubmit} noValidate>
            {/* 구분 */}
            <div style={{ marginBottom: 20 }}>
              <label className="block text-[13px] font-bold mb-1" style={{ color: '#101828' }}>구분 <span style={{ color: '#ef4444' }}>*</span></label>
              <p className="text-[12px] mb-1.5" style={{ color: '#98A2B3' }}>상담 구분을 선택해주세요.</p>
              <select name="product" className={errors.product ? inputError : inputBase} style={{ appearance: 'auto' }}>
                <option value="">상담 구분 선택</option>
                {INQUIRY_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              {errors.product && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.product}</p>}
            </div>

            {/* 회사명 + 이름 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4" style={{ marginBottom: 20 }}>
              <div>
                <label className="block text-[13px] font-bold mb-1" style={{ color: '#101828' }}>회사명 <span style={{ color: '#ef4444' }}>*</span></label>
                <p className="text-[12px] mb-1.5" style={{ color: '#98A2B3' }}>회사명을 입력해주세요.</p>
                <input name="company" className={errors.company ? inputError : inputBase} />
                {errors.company && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.company}</p>}
              </div>
              <div>
                <label className="block text-[13px] font-bold mb-1" style={{ color: '#101828' }}>이름 <span style={{ color: '#ef4444' }}>*</span></label>
                <p className="text-[12px] mb-1.5" style={{ color: '#98A2B3' }}>이름을 입력해주세요.</p>
                <input name="name" className={errors.name ? inputError : inputBase} />
                {errors.name && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.name}</p>}
              </div>
            </div>

            {/* 연락처 + 이메일 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4" style={{ marginBottom: 20 }}>
              <div>
                <label className="block text-[13px] font-bold mb-1" style={{ color: '#101828' }}>연락처 <span style={{ color: '#ef4444' }}>*</span></label>
                <p className="text-[12px] mb-1.5" style={{ color: '#98A2B3' }}>ex) 010-0000-0000</p>
                <input name="phone" className={errors.phone ? inputError : inputBase} />
                {errors.phone && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-[13px] font-bold mb-1" style={{ color: '#101828' }}>이메일 <span style={{ color: '#ef4444' }}>*</span></label>
                <p className="text-[12px] mb-1.5" style={{ color: '#98A2B3' }}>이메일을 입력해주세요.</p>
                <input name="email" type="email" className={errors.email ? inputError : inputBase} />
                {errors.email && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.email}</p>}
              </div>
            </div>

            {/* 문의작성 */}
            <div style={{ marginBottom: 20 }}>
              <label className="block text-[13px] font-bold mb-1" style={{ color: '#101828' }}>문의작성</label>
              <p className="text-[12px] mb-1.5" style={{ color: '#98A2B3' }}>DA#도입에 궁금하신 점을 자세히 남겨주시면 빠른 상담이 가능합니다.</p>
              <textarea name="message" rows={4} className={`${inputBase} resize-none`} />
            </div>

            {/* 파일첨부 */}
            <div style={{ marginBottom: 28 }}>
              <label className="block text-[13px] font-bold mb-1" style={{ color: '#101828' }}>파일첨부</label>
              <p className="text-[12px] mb-2" style={{ color: '#98A2B3' }}>첨부하고자 하는 파일을 선택하여 업로드 해주세요. (jpg, png, pdf 첨부 가능)</p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 shrink-0 transition-colors"
                  style={{ padding: '10px 18px', backgroundColor: ACCENT, color: '#fff', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', borderRadius: 4 }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2ba876'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = ACCENT; }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  파일첨부
                </button>
                <span className="text-[13px] truncate" style={{ color: fileName ? '#101828' : '#98A2B3' }}>
                  {fileName || '선택된 파일 없음'}
                </span>
                {fileName && (
                  <button
                    type="button"
                    onClick={() => { setFileName(''); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                    className="shrink-0 p-1"
                    style={{ color: '#98A2B3' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                name="file"
                accept=".jpg,.jpeg,.png,.pdf"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
              />
            </div>

            <ConsentSection errors={errors} />

            {errors.submit && <p className="text-sm text-center" style={{ color: '#ef4444', marginBottom: 16 }}>{errors.submit}</p>}

            {/* 제출 버튼 */}
            <div style={{ textAlign: 'center' }}>
              <button type="submit" disabled={loading} style={{
                padding: '16px 56px', backgroundColor: loading ? '#94a3b8' : ACCENT, color: '#fff',
                fontSize: 16, fontWeight: 700, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : `0 6px 20px ${ACCENT}30`, transition: 'all 0.25s',
              }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.backgroundColor = '#2ba876'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                onMouseLeave={e => { if (!loading) { e.currentTarget.style.backgroundColor = ACCENT; e.currentTarget.style.transform = ''; } }}
              >{loading ? '접수 중...' : '도입문의서 제출'}</button>
            </div>
          </form>
        </div>
      </section>

      {/* ═══ 2-SPLIT CTA ═══ */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: 220 }}>
        <Link href="/download" style={{ backgroundColor: '#101828', padding: '40px 48px', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'background 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1e293b'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#101828'; }}
        >
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>DOWNLOAD</span>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#F9FAFB', marginTop: 8, lineHeight: 1.3 }}>
            <E id="contact_cta.download" editMode={editMode}>{cta.download}</E><span style={{ color: ACCENT }}>.</span>
          </h3>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 12, fontSize: 13, fontWeight: 600, color: ACCENT }}><E id="contact_cta.btn_download" editMode={editMode}>{cta.btn_download}</E></span>
        </Link>
        <Link href="/education" style={{ backgroundColor: ACCENT, padding: '40px 48px', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'filter 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.92)'; }}
          onMouseLeave={e => { e.currentTarget.style.filter = ''; }}
        >
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}>EDUCATION</span>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 8, lineHeight: 1.3 }}>
            <E id="contact_cta.education" editMode={editMode}>{cta.education}</E><span style={{ opacity: 0.6 }}>.</span>
          </h3>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 12, fontSize: 13, fontWeight: 600, color: '#fff' }}><E id="contact_cta.btn_edu" editMode={editMode}>{cta.btn_edu}</E></span>
        </Link>
      </div>

      {editMode && <style>{EDITABLE_STYLES}</style>}
    </>
  );
}
