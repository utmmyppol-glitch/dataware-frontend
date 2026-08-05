'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { api } from '@/lib/api';
import { EDUCATION_SESSIONS, getSessionStatus } from '@/data/education-sessions';
import ConsentSection from '@/components/forms/ConsentSection';

const ACCENT = '#36c88a';

import { validateCommonFields, inputBase, inputError, type FieldErrors } from '@/lib/form-validation';

export default function EducationDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const session = EDUCATION_SESSIONS.find((s) => s.id === id);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  function validate(formData: FormData): FieldErrors {
    return validateCommonFields(formData);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const errs = validate(formData);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      const consentPrivacy = formData.get('consentPrivacy') === 'on';
      if (!consentPrivacy) { setErrors({ submit: '개인정보 수집·이용에 동의해 주세요.' }); setLoading(false); return; }
      await api.submitEducation({
        name: formData.get('name') as string,
        company: formData.get('company') as string,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string,
        position: '',
        preferredDate: session?.date ?? '',
        note: session?.title ?? '',
        consentPrivacy,
        consentThirdParty: formData.get('consentThirdParty') === 'on',
      });
      setSubmitted(true);
    } catch {
      setErrors({ submit: '신청 중 오류가 발생했습니다.' });
    } finally {
      setLoading(false);
    }
  }

  if (!session) {
    return (
      <main style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 10 }}>교육을 찾을 수 없습니다</h2>
          <Link href="/education" style={{ color: ACCENT, textDecoration: 'none', fontWeight: 600 }}>교육 목록으로</Link>
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: 480, padding: '60px 24px' }}>
          <div style={{ width: 64, height: 64, backgroundColor: `${ACCENT}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="28" height="28" fill="none" stroke={ACCENT} strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#F9FAFB', marginBottom: 12 }}>신청이 완료되었습니다</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 32 }}>담당자가 일정을 확인 후 연락드리겠습니다.</p>
          <Link href="/education" style={{ padding: '14px 28px', backgroundColor: ACCENT, color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>교육 목록으로</Link>
        </div>
      </main>
    );
  }

  const isClosed = getSessionStatus(session) === '마감';

  return (
    <main style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* ── 1. 히어로 배경 ── */}
      <section style={{ position: 'relative', minHeight: 280, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0b1220 0%, #1a2b4a 100%)' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '100px 24px 60px' }}>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800, color: '#F9FAFB', lineHeight: 1.35, maxWidth: 600, margin: '0 auto' }}>
            {session.title}
          </h1>
          {isClosed && (
            <p style={{ fontSize: 14, color: '#ef4444', marginTop: 16, fontWeight: 600 }}>교육 신청이 마감되었습니다</p>
          )}
        </div>
      </section>

      {/* ── 2. 브레드크럼 ── */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '20px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#94a3b8' }}>
          <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>홈</Link>
          <span>›</span>
          <Link href="/education" style={{ color: '#94a3b8', textDecoration: 'none' }}>무료교육</Link>
          <span>›</span>
          <span style={{ color: '#101828', fontWeight: 600 }}>상세</span>
        </div>
      </div>

      {/* ── 3. 배너 이미지들 (원본처럼 크게 쭉 나열) ── */}
      <section style={{ maxWidth: 700, margin: '32px auto 0', padding: '0 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <img src={session.thumbnail} alt={session.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
          {session.detailImages.map((img, i) => (
            <img key={i} src={img} alt={`${session.title} 상세 ${i + 1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
          ))}
        </div>
      </section>

      {/* ── 4. 교육 정보 카드 ── */}
      <section style={{ maxWidth: 700, margin: '32px auto 0', padding: '0 24px' }}>
        <div style={{ backgroundColor: '#0f172a', padding: '36px 40px', color: '#fff' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, textAlign: 'center', marginBottom: 28 }}>{session.title.includes('홍우석') ? '교육 안내' : 'DA# 온라인 무료 교육'}</h2>

          {/* 교육일정 */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: ACCENT, letterSpacing: '0.06em', marginBottom: 8 }}>교육시간</p>
            <p style={{ fontSize: 18, fontWeight: 600 }}>{session.date}</p>
          </div>

          {/* 교육내용 */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: ACCENT, letterSpacing: '0.06em', marginBottom: 12 }}>교육내용 및 신청</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'left', maxWidth: 480, margin: '0 auto' }}>
              {session.curriculum.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
                  <span style={{ color: ACCENT, fontWeight: 700, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* 대상 */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: ACCENT, letterSpacing: '0.06em', marginBottom: 8 }}>교육 대상</p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{session.target.join(' / ')}</p>
          </div>
        </div>
      </section>

      {/* ── 5. 상세 설명 ── */}
      <section style={{ maxWidth: 700, margin: '40px auto 0', padding: '0 24px' }}>
        <p style={{ fontSize: 15, color: '#475467', lineHeight: 1.8, textAlign: 'center' }}>{session.content}</p>
      </section>

      {/* ── 6. 신청 STEP ── */}
      <section style={{ maxWidth: 700, margin: '48px auto 0', padding: '0 24px' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#101828', textAlign: 'center', marginBottom: 24 }}>무료교육 신청</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { step: 1, icon: <svg width="24" height="24" fill="none" stroke={ACCENT} strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>, label: '교육 일정 확인' },
            { step: 2, icon: <svg width="24" height="24" fill="none" stroke={ACCENT} strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, label: '신청서 작성' },
            { step: 3, icon: <svg width="24" height="24" fill="none" stroke={ACCENT} strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, label: '신청완료' },
          ].map((s) => (
            <div key={s.step} style={{ textAlign: 'center', padding: '24px 16px', backgroundColor: '#f9fafb', border: '1px solid #e6e8ec' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: `${ACCENT}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                {s.icon}
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#101828' }}>STEP {s.step}</p>
              <p style={{ fontSize: 13, color: '#667085', marginTop: 4 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. 신청 폼 또는 마감 안내 ── */}
      <section style={{ maxWidth: 700, margin: '48px auto', padding: '0 24px 64px' }}>
        {isClosed ? (
          <div style={{ padding: '48px', backgroundColor: '#f9fafb', border: '1px solid #e6e8ec', textAlign: 'center' }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#101828', marginBottom: 8 }}>교육 신청이 마감되었습니다</h3>
            <p style={{ fontSize: 14, color: '#667085', marginBottom: 24 }}>다른 교육 일정을 확인해보세요.</p>
            <Link href="/education" style={{ display: 'inline-flex', padding: '12px 28px', backgroundColor: ACCENT, color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              다른 교육 보기
            </Link>
          </div>
        ) : (
          <div style={{ border: '1px solid #e6e8ec', padding: 'clamp(28px, 5vw, 48px)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: ACCENT, textAlign: 'center', marginBottom: 32 }}>교육 신청서</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4" style={{ marginBottom: 20 }}>
                <div>
                  <label className="block text-[13px] font-bold mb-1" style={{ color: '#101828' }}>이름 <span style={{ color: '#ef4444' }}>*</span></label>
                  <input name="name" placeholder="이름을 입력해주세요." className={errors.name ? inputError : inputBase} />
                  {errors.name && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-[13px] font-bold mb-1" style={{ color: '#101828' }}>회사명 <span style={{ color: '#ef4444' }}>*</span></label>
                  <input name="company" placeholder="회사명을 입력해주세요." className={errors.company ? inputError : inputBase} />
                  {errors.company && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.company}</p>}
                </div>
                <div>
                  <label className="block text-[13px] font-bold mb-1" style={{ color: '#101828' }}>연락처 <span style={{ color: '#ef4444' }}>*</span></label>
                  <input name="phone" placeholder="ex) 010-0000-0000" className={errors.phone ? inputError : inputBase} />
                  {errors.phone && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-[13px] font-bold mb-1" style={{ color: '#101828' }}>이메일 <span style={{ color: '#ef4444' }}>*</span></label>
                  <input name="email" type="email" placeholder="이메일을 입력해주세요." className={errors.email ? inputError : inputBase} />
                  {errors.email && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.email}</p>}
                </div>
              </div>

              <ConsentSection errors={errors} />

              {errors.submit && <p className="text-sm text-center" style={{ color: '#ef4444', marginBottom: 16 }}>{errors.submit}</p>}

              <div style={{ textAlign: 'center' }}>
                <button type="submit" disabled={loading} style={{
                  padding: '16px 56px', backgroundColor: loading ? '#94a3b8' : ACCENT, color: '#fff',
                  fontSize: 16, fontWeight: 700, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                }}>
                  {loading ? '신청 중...' : '무료교육 신청'}
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </main>
  );
}
