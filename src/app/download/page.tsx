'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { DOWNLOAD_CARDS, DOWNLOAD_PAGE, IMAGES } from '@/data';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';
import ConsentSection from '@/components/forms/ConsentSection';

const inputBase =
  'w-full bg-white border border-[#d5d8dd] px-4 py-4 text-[16px] text-[#111111] focus:border-[#36c88a] focus:ring-1 focus:ring-[#36c88a] focus:outline-none transition-colors';
const inputError =
  'w-full bg-white border border-red-400 px-4 py-4 text-[16px] text-[#111111] focus:border-red-400 focus:ring-1 focus:ring-red-400 focus:outline-none transition-colors';

type FieldErrors = Record<string, string>;

export default function DownloadPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [selectedFileType, setSelectedFileType] = useState('DA#_BROCHURE');
  const heroRef = useHeroAnim();
  const cardsRef = useGsapReveal();
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
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await api.submitDownload({
        name: formData.get('name') as string,
        company: formData.get('company') as string,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string,
        fileType: formData.get('fileType') as string,
        consentPrivacy: formData.get('consentPrivacy') === 'on',
        consentThirdParty: formData.get('consentThirdParty') === 'on',
        consentMarketing: formData.get('consentMarketing') === 'on',
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
        <div className="grid-bg" style={{ paddingTop: 120, paddingBottom: 80, textAlign: 'center' }}>
          <div className="wrap">
            <p className="eyebrow" style={{ marginBottom: 16 }}>다운로드</p>
            <h1 className="headline-lg" style={{ color: '#ffffff', marginBottom: 12 }}>다운로드 신청</h1>
          </div>
        </div>
        <div className="wrap" style={{ paddingTop: 64, paddingBottom: 120 }}>
          <div className="card" style={{ maxWidth: 560, margin: '0 auto', borderRadius: 0, padding: '56px 48px', textAlign: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--accent-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <span style={{ color: '#36c88a', fontSize: 32, lineHeight: 1 }}>✓</span>
            </div>
            <h2 className="headline-md" style={{ color: '#0f172a', marginBottom: 12 }}>다운로드 신청 완료</h2>
            <p style={{ color: '#64748b', fontSize: 16 }}>입력하신 이메일로 다운로드 링크를 발송해드립니다.</p>
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
          <div style={{ position: 'absolute', top: '10%', right: '5%', width: '30vw', height: '30vw', maxWidth: '400px', maxHeight: '400px', background: 'radial-gradient(circle, rgba(54,200,138,0.04) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: '-5%', right: '2%', fontSize: 'clamp(120px, 16vw, 280px)', fontWeight: 900, color: 'rgba(255,255,255,0.012)', lineHeight: 1 }}>DL</div>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(54,200,138,0.2), transparent)' }} />
          {[['top', 'left'], ['top', 'right']].map(([v, h], i) => (
            <div key={i} style={{ position: 'absolute', [v]: '20px', [h]: '20px', width: '18px', height: '18px', [`border${v === 'top' ? 'Top' : 'Bottom'}`]: '1px solid rgba(54,200,138,0.08)', [`border${h === 'left' ? 'Left' : 'Right'}`]: '1px solid rgba(54,200,138,0.08)' }} />
          ))}
        </div>
        <div ref={heroRef} style={{ padding: '0 56px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <Link href="/" style={{ fontSize: 13, color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>홈</Link>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.2)' }}>›</span>
            <span style={{ fontSize: 13, color: '#36c88a', fontWeight: 600 }}>다운로드</span>
          </div>
          <div data-hero style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em' }}>01</span>
            <div style={{ width: '32px', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <span style={{ fontSize: '10px', color: '#36c88a', letterSpacing: '0.08em' }}>DOWNLOAD</span>
          </div>
          <h1 data-hero style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 800, color: '#F9FAFB', letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: '16px' }}>
            다운로드 신청<span style={{ color: '#36c88a', fontSize: '1.1em' }}>.</span>
          </h1>
          <p data-hero style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: '480px' }}>DA# 무료 다운로드 및 제품 소개서를 신청하세요.</p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(54,200,138,0.2), transparent)' }} />
      </section>

      {/* ── 2. Download Cards — Bento layout ── */}
      <section className="section-pad" style={{ background: '#f8fafc' }}>
        <div ref={cardsRef} className="wrap">
          <p style={{ textAlign: 'center', color: '#36c88a', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 40 }}>
            다운로드 항목
          </p>

          {DOWNLOAD_PAGE.sections.map((section) => {
            const sectionCards = DOWNLOAD_CARDS.filter((c) => c.section === section.id);
            const thumbMap: Record<string, string> = {
              'da-intro': IMAGES.download.daIntro,
              'dq-intro': IMAGES.download.dqIntro,
              'da-personal': IMAGES.download.daPersonal,
              'da-business': IMAGES.download.daBusiness,
            };
            const fileTypeMap: Record<string, string> = {
              'da-intro': 'DA#_BROCHURE',
              'dq-intro': 'DQ_BROCHURE',
              'da-personal': 'DA#_FREE',
              'da-business': 'DA#_BUSINESS',
            };
            return (
              <div key={section.id} data-anim style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{section.label}</h3>
                  {section.notice && (
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>{section.notice}</span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16 }}>
                  {sectionCards.map((card) => (
                    <div
                      key={card.id}
                      className="card"
                      style={{ borderRadius: 0, padding: '28px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                      <img src={thumbMap[card.id]} alt={card.title} style={{ width: '100%', height: 80, objectFit: 'contain', marginBottom: 16 }} loading="lazy" />
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 6, minHeight: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{card.title}</h3>
                      <p style={{ fontSize: 13, color: '#64748b', flex: 1 }}>{card.desc}</p>
                      <a
                        href="#download-form"
                        className="btn-accent"
                        style={{ fontSize: 13, padding: '8px 18px', borderRadius: 0, textDecoration: 'none', marginTop: 16 }}
                        onClick={() => setSelectedFileType(fileTypeMap[card.id])}
                      >{card.ctaLabel}</a>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3. Form Section ── */}
      <section id="download-form" className="section-pad" style={{ background: '#ffffff' }}>
        <div ref={formRef} className="wrap">
          <p style={{ textAlign: 'center', color: '#36c88a', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
            신청하기
          </p>
          <h2 className="headline-md" style={{ textAlign: 'center', color: '#0f172a', marginBottom: 48 }}>다운로드 신청서</h2>

          <div className="card" style={{ maxWidth: 960, margin: '0 auto', borderRadius: 0, padding: 'clamp(28px, 5vw, 48px)' }}>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#0f172a' }}>다운로드 항목</label>
                <select
                  name="fileType"
                  className={inputBase}
                  style={{ appearance: 'auto' }}
                  value={selectedFileType}
                  onChange={(e) => setSelectedFileType(e.target.value)}
                >
                  <option value="DA#_BROCHURE">DA# 소개서</option>
                  <option value="DQ_BROCHURE">DA# DQ Edition 소개서</option>
                  <option value="DA#_FREE">DA#5 개인용 (무료)</option>
                  <option value="DA#_BUSINESS">DA#5 기업용</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'name', label: '이름 *' },
                  { name: 'company', label: '회사명 *' },
                  { name: 'phone', label: '연락처 *' },
                  { name: 'email', label: '이메일 *', type: 'email' },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-sm font-medium mb-1" style={{ color: '#0f172a' }}>{f.label}</label>
                    <input name={f.name} type={f.type || 'text'} className={errors[f.name] ? inputError : inputBase} />
                    {errors[f.name] && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors[f.name]}</p>}
                  </div>
                ))}
              </div>

              <ConsentSection errors={errors} showThirdParty />

              {errors.submit && <p className="text-sm text-center" style={{ color: '#ef4444' }}>{errors.submit}</p>}

              <button
                type="submit"
                disabled={loading}
                className="btn-accent w-full"
                style={{ borderRadius: 0, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer', fontSize: 16, padding: '16px 0' }}
              >
                {loading ? '신청 중...' : '다운로드 신청'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
