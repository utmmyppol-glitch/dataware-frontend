'use client';

import React, { useState, useRef, FormEvent } from 'react';
import Link from 'next/link';
import { useGsapReveal, useHeroAnim } from '@/components/animations/useGsapReveal';
import { useEditMode, useEditableManifest, EDITABLE_STYLES, E } from '@/lib/editable';
import { api } from '@/lib/api';
import OptImg from '@/components/OptImg';

const ACCENT = '#36c88a';

/* ── 진단 로직 ── */
type DbScale = '10미만' | '10~50' | '50~200' | '200+';

interface DiagnosisResult {
  level: number;
  title: string;
  description: string;
  products: string[];
}

function diagnose(
  dbCount: DbScale | null,
  hasStandard: boolean | null,
  hasMeta: boolean | null,
  hasQuality: boolean | null,
): DiagnosisResult | null {
  if (dbCount === null || hasStandard === null || hasMeta === null || hasQuality === null) return null;

  const score =
    (hasStandard ? 1 : 0) + (hasMeta ? 1 : 0) + (hasQuality ? 1 : 0);

  if (score === 0) {
    return {
      level: 1,
      title: '초기 단계',
      description:
        '데이터 관리 체계가 아직 갖춰지지 않은 상태입니다. 데이터 표준화부터 시작하면, 이후 품질·메타데이터 관리까지 체계적으로 확장할 수 있습니다.',
      products: ['DA#', 'META#'],
    };
  }

  if (score === 1) {
    if (hasStandard) {
      return {
        level: 2,
        title: '표준화 진행 단계',
        description:
          dbCount === '10미만' || dbCount === '10~50'
            ? '중소규모 데이터 환경에서 표준화가 진행 중입니다. 메타데이터·품질 진단 영역을 정비하면 데이터 활용도와 신뢰도를 빠르게 끌어올릴 수 있습니다.'
            : '대규모 데이터 환경에서 표준화가 진행 중입니다. 메타데이터 관리와 품질 진단 체계를 병행해야 거버넌스 효과가 극대화됩니다.',
        products: ['DQ#', 'META#'],
      };
    }
    return {
      level: 2,
      title: '부분 관리 단계',
      description:
        '일부 관리 체계는 갖춰져 있으나, 데이터 표준이 없어 조직 간 정합성이 떨어집니다. 용어·도메인 표준을 먼저 정립하면 기존 체계의 효과가 배가됩니다.',
      products: ['DA#', 'META#'],
    };
  }

  if (score === 2) {
    const missing = !hasStandard
      ? '표준화'
      : !hasMeta
        ? '메타데이터 관리'
        : '품질 진단';
    const product = !hasStandard ? 'DA#' : !hasMeta ? 'META#' : 'DQ#';
    return {
      level: 3,
      title: '체계 구축 단계',
      description: `대부분의 관리 체계가 갖춰져 있으나, ${missing} 영역이 보완되면 데이터 거버넌스를 완성할 수 있습니다.`,
      products: [product],
    };
  }

  return {
    level: 4,
    title: '고도화 단계',
    description:
      '핵심 거버넌스 체계가 모두 갖춰져 있습니다. 데이터 흐름 분석과 영향도 관리를 통해 거버넌스를 고도화하고, 데이터 포털로 조직 전체의 데이터 접근성을 높이세요.',
    products: ['AP#', 'DP#'],
  };
}


/* ── 제품 상세 정보 (인라인 표시용) ── */
const PRODUCT_DETAILS: Record<string, { subtitle: string; desc: string; color: string; features: string[] }> = {
  'DA#': {
    subtitle: '데이터 모델링',
    desc: '개괄·개념·논리·물리 모델링 Full Spec을 제공하고, LLM 기반 자동화로 데이터 표준화와 모델 현행화를 지원합니다.',
    color: '#6b8cae',
    features: ['다계층 모델링 Full Spec', 'LLM 기반 자동화', '리버스 엔지니어링', '다중 DBMS 지원'],
  },
  'META#': {
    subtitle: '메타데이터 관리',
    desc: '효율적이고 체계적인 메타데이터 관리를 통해 고품질 데이터 활용을 지원하며, 데이터 아키텍처 전 프로세스의 메타데이터를 관리합니다.',
    color: '#8a7cb8',
    features: ['데이터 표준 관리', '데이터 구조 관리', 'DB 정보 관리', '영향도 분석'],
  },
  'DQ#': {
    subtitle: '데이터 품질관리',
    desc: '산재된 기업 데이터의 지속적 품질 관리로 데이터 가치를 향상시키고, 대용량 데이터를 빠르고 안정적으로 처리합니다.',
    color: '#5b9a7d',
    features: ['품질 기준 정의', '프로파일링·BR 검증', '오류 원인 분석·개선', '품질 현황 모니터링'],
  },
  'AP#': {
    subtitle: '애플리케이션 영향도 분석',
    desc: 'DB와 애플리케이션 소스 코드를 자동 수집·분석하여, 변경에 따른 영향 범위를 사전에 파악합니다.',
    color: '#c4975a',
    features: ['소스 영향 분석', '매트릭스 분석', 'SQL·문자열 검색', '보고서·산출물'],
  },
  'DP#': {
    subtitle: '데이터 포털',
    desc: '손쉬운 데이터 탐색, 요청, 분석 및 활용이 가능한 데이터 포털로 기업 데이터 활용을 극대화합니다.',
    color: '#b8a060',
    features: ['데이터 통합 검색', '데이터 작업 신청', '데이터 맵', '산출물 실시간 제공'],
  },
};

/* ── 서비스 라인업 ── */
const SERVICE_LINEUP = [
  {
    label: '제품 라인업',
    sub: 'DA# · META# · DQ#',
    desc: '데이터 모델링부터 품질관리까지, 거버넌스에 필요한 전 제품을 한눈에 비교하세요.',
    href: '/products',
    icon: (
      <svg width="24" height="24" fill="none" stroke={ACCENT} strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    label: 'All-in-One 8종',
    sub: '통합 패키지',
    desc: '8개 솔루션을 하나의 패키지로 도입해 라이선스 비용과 운영 부담을 줄이세요.',
    href: '/products/dataware',
    icon: (
      <svg width="24" height="24" fill="none" stroke={ACCENT} strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    label: '가격안내',
    sub: '라이선스 3종',
    desc: '영구·기간제·구독형 라이선스를 비교하고 우리 조직에 맞는 플랜을 선택하세요.',
    href: '/pricing',
    icon: (
      <svg width="24" height="24" fill="none" stroke={ACCENT} strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: '도입지원',
    sub: '도입문의 · 교육 · 세미나',
    desc: '전문 컨설턴트의 무료 상담, 실습 교육, 방문 세미나까지 도입 전 과정을 지원합니다.',
    href: '/contact',
    icon: (
      <svg width="24" height="24" fill="none" stroke={ACCENT} strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];


type FieldErrors = Record<string, string>;

/* ══════════════════════════════════════════════════════════════ */
export default function DiagnosisPageClient() {
  const editMode = useEditMode();
  useEditableManifest(editMode);
  const heroRef = useHeroAnim() as React.RefObject<HTMLElement>;
  const diagRef = useGsapReveal() as React.RefObject<HTMLElement>;
  const whyRef = useGsapReveal() as React.RefObject<HTMLElement>;
  const insightRef = useGsapReveal() as React.RefObject<HTMLElement>;
  const serviceRef = useGsapReveal() as React.RefObject<HTMLElement>;

  /* ── 진단 폼 상태 ── */
  const [dbCount, setDbCount] = useState<DbScale | null>(null);
  const [hasStandard, setHasStandard] = useState<boolean | null>(null);
  const [hasMeta, setHasMeta] = useState<boolean | null>(null);
  const [hasQuality, setHasQuality] = useState<boolean | null>(null);
  const [diagStep, setDiagStep] = useState(0);

  const result = diagnose(dbCount, hasStandard, hasMeta, hasQuality);

  /* ── 제품 상세 토글 ── */
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  /* ── 스텝 자동 진행 ── */
  function advanceStep(step: number) {
    setTimeout(() => setDiagStep(step + 1), 350);
  }

  /* ── 이메일 폼 상태 ── */
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    const errs: FieldErrors = {};
    if (!company.trim()) errs.company = '회사명을 입력해주세요.';
    if (!email.trim()) errs.email = '이메일을 입력해주세요.';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setEmailLoading(true);

    try {
      await api.submitInquiry({
        name: '데이터 진단 리포트 요청',
        company,
        phone: '-',
        email,
        message: `[데이터 거버넌스 진단 결과]\n레벨: ${result?.level}\n단계: ${result?.title}\n보유DB: ${dbCount}\n표준: ${hasStandard ? '있음' : '없음'}\n메타데이터: ${hasMeta ? '있음' : '없음'}\n품질진단: ${hasQuality ? '있음' : '없음'}\n추천제품: ${result?.products.join(', ')}`,
        product: '데이터 거버넌스 진단',
        consentPrivacy: true,
      });
      setEmailSubmitted(true);
    } catch {
      setErrors({ submit: '전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
    } finally {
      setEmailLoading(false);
    }
  }

  /* ── 선택 버튼 컴포넌트 (다크 프리미엄) ── */
  function ChoiceButton({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
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

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1. HERO
          ═══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          backgroundColor: '#07111F',
          overflow: 'hidden',
        }}
      >
        {/* 그리드 배경 */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent 20%, ${ACCENT}30, transparent 80%)` }} />
          {/* 초록 스위핑 아크 — 레퍼런스 핵심 */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
            <path d="M-100 850 Q 400 200 1600 100" stroke={ACCENT} strokeWidth="2" opacity="0.5" />
            <path d="M-100 870 Q 400 240 1600 140" stroke={ACCENT} strokeWidth="1" opacity="0.2" />
            <path d="M-100 850 Q 400 200 1600 100" stroke={`url(#heroArcGlow)`} strokeWidth="20" opacity="0.08" />
            <defs>
              <linearGradient id="heroArcGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={ACCENT} stopOpacity="0" />
                <stop offset="40%" stopColor={ACCENT} stopOpacity="1" />
                <stop offset="70%" stopColor={ACCENT} stopOpacity="0.6" />
                <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          {/* 아크 주변 글로우 */}
          <div style={{ position: 'absolute', bottom: '10%', left: '20%', width: '40vw', height: '40vw', maxWidth: 500, maxHeight: 500, background: `radial-gradient(circle, ${ACCENT}12 0%, transparent 60%)`, pointerEvents: 'none' }} />
        </div>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '140px 56px 100px', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48, alignItems: 'center' }}>
          <div>
          {/* Eyebrow */}
          <div data-hero style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, fontSize: 12, fontWeight: 600, letterSpacing: '.12em', color: ACCENT }}>
            <span style={{ width: 20, height: 1.5, background: ACCENT }} />
            <E id="diagnosis_hero.badge" editMode={editMode}>DATA GOVERNANCE DIAGNOSIS</E>
          </div>

          <h1
            data-hero
            style={{
              fontSize: 'clamp(44px, 6vw, 72px)',
              fontWeight: 900,
              color: '#F9FAFB',
              letterSpacing: '-0.05em',
              lineHeight: 1.05,
              marginBottom: 22,
            }}
          >
            <E id="diagnosis_hero.title" editMode={editMode}>데이터 거버넌스 진단</E><span style={{ color: ACCENT }}>.</span>
          </h1>

          <p data-hero style={{ fontSize: 'clamp(15px, 1.4vw, 17px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: 480, marginBottom: 28 }}>
            <E id="diagnosis_hero.desc" editMode={editMode}>4가지 질문에 답하면 <span style={{ color: ACCENT, fontWeight: 600 }}>30초 안에</span> 데이터 거버넌스 성숙도와 우선 과제를 알려드립니다.</E>
          </p>

          {/* CTAs */}
          <div data-hero style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 0 }}>
            <a href="#diagnosis-form" onClick={(e) => { e.preventDefault(); document.getElementById('diagnosis-form')?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '18px 36px', backgroundColor: ACCENT, color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: `0 0 30px ${ACCENT}30`, transition: 'transform .2s, box-shadow .2s' }}
            ><E id="diagnosis_hero.cta_primary" editMode={editMode}>무료 진단 시작</E><span style={{ fontSize: 15 }}>&rarr;</span></a>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', padding: '18px 36px', border: '1.5px solid rgba(255,255,255,0.12)', color: '#F9FAFB', fontWeight: 700, fontSize: 15, textDecoration: 'none', transition: 'border-color .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
            ><E id="diagnosis_hero.cta_secondary" editMode={editMode}>도입문의</E></Link>
          </div>

          {/* Stats */}
          <div data-hero style={{ display: 'flex', gap: 0, marginTop: 36, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {[
              { num: '4항목', label: '핵심 진단 기준' },
              { num: '30초', label: '소요 시간' },
              { num: '즉시', label: '결과 · 추천 제공' },
            ].map((s, i) => (
              <div key={s.label} style={{ flex: 1, paddingLeft: i > 0 ? 24 : 0, borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: '#F9FAFB', lineHeight: 1, display: 'block' }}><E id={`diagnosis_hero.stat${i}_num`} editMode={editMode}>{s.num}</E></span>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 6, letterSpacing: '.04em' }}><E id={`diagnosis_hero.stat${i}_label`} editMode={editMode}>{s.label}</E></div>
              </div>
            ))}
          </div>
          </div>

          {/* 우: 제품 목업 — 블리드 */}
          <div data-hero style={{ marginRight: -56, position: 'relative' }}>
            <OptImg
              src="/images/uniondata/main_01-da_img.png"
              alt="DA# 데이터 모델링"
              style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
            />
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          2. 진단 폼 + 결과 — 스텝 바이 스텝
          ═══════════════════════════════════════════════════════ */}
      <section id="diagnosis-form" ref={diagRef} style={{ position: 'relative', background: 'linear-gradient(160deg, #0B1220 30%, #0a1f1a 70%, #0d2a1f)', overflow: 'hidden' }}>
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
                  {/* 스텝 도트 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 48 }}>
                    {['보유 DB', '데이터 표준', '메타데이터', '품질 진단'].map((label, i: number) => (
                      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                        <div style={{ width: 8, height: 8, background: i <= diagStep ? ACCENT : 'rgba(255,255,255,0.08)', boxShadow: i === diagStep ? `0 0 12px ${ACCENT}60` : 'none', transition: 'all 0.3s' }} />
                        <span style={{ fontSize: 15, fontWeight: i === diagStep ? 600 : 400, color: i === diagStep ? '#F9FAFB' : i < diagStep ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.3)', transition: 'color 0.3s' }}>
                          <E id={`diagnosis_step${i}.label`} editMode={editMode}>{label}</E>
                        </span>
                        {i < diagStep && (
                          <span style={{ marginLeft: 'auto', fontSize: 11, color: ACCENT }}>✓</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 컨텍스트 힌트 */}
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
                      onClick={() => { setDiagStep(0); setDbCount(null); setHasStandard(null); setHasMeta(null); setHasQuality(null); setExpandedProduct(null); }}
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

      {/* ═══════════════════════════════════════════════════════
          3. WHY DIAGNOSE
          ═══════════════════════════════════════════════════════ */}
      <section ref={whyRef} style={{ background: 'linear-gradient(160deg, #0f172a 30%, #0a1f1a 70%, #0d2a1f)', position: 'relative', overflow: 'hidden' }}>
        {/* 배경 그리드 */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div style={{ position: 'absolute', top: '-30%', right: '-15%', width: '60vw', height: '60vw', maxWidth: 700, maxHeight: 700, borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}10 0%, transparent 50%)` }} />
        </div>

        <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '160px clamp(24px, 4vw, 72px) 100px', position: 'relative', zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20" style={{ alignItems: 'start' }}>

            {/* ── 좌측: 카피 + CTA ── */}
            <div>
              <span data-anim style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.12em', color: ACCENT, display: 'block', marginBottom: 16 }}>WHY DIAGNOSE</span>
              <h2 data-anim style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: '#F9FAFB', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 20 }}>
                <E id="diagnosis_why.title" editMode={editMode}>진단이 먼저입니다</E><span style={{ color: ACCENT }}>.</span>
              </h2>
              <p data-anim style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: 36, maxWidth: 420 }}>
                <E id="diagnosis_why.desc" editMode={editMode}>막연한 소개서 대신, 우리 회사 데이터의 <span style={{ color: ACCENT, fontWeight: 600 }}>현재 위치를 숫자로</span> 확인하세요. 어디부터 손대야 할지가 분명해집니다.</E>
              </p>

              {/* 키 넘버 */}
              <div data-anim style={{ display: 'flex', gap: 32, marginBottom: 36 }}>
                {[
                  { num: '4', label: '진단 항목' },
                  { num: '30초', label: '소요 시간' },
                  { num: '즉시', label: '결과 확인' },
                ].map((s, i) => (
                  <div key={s.label}>
                    <span style={{ fontSize: 24, fontWeight: 800, color: ACCENT, lineHeight: 1, display: 'block' }}><E id={`diagnosis_why.stat${i}_num`} editMode={editMode}>{s.num}</E></span>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 6, letterSpacing: '.04em' }}><E id={`diagnosis_why.stat${i}_label`} editMode={editMode}>{s.label}</E></p>
                  </div>
                ))}
              </div>

              <a
                data-anim
                href="#diagnosis-form"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('diagnosis-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '16px 32px', backgroundColor: ACCENT, color: '#fff',
                  fontSize: 15, fontWeight: 700, textDecoration: 'none',
                   transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#2ba876'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ACCENT; }}
              >
                <E id="diagnosis_why.cta" editMode={editMode}>지금 바로 진단하기</E>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </a>
            </div>

            {/* ── 우측: 거버넌스 휠 (CSS) ── */}
            <div data-anim style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <div style={{ width: 5, height: 5, background: ACCENT }} />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>DATA GOVERNANCE CYCLE</span>
              </div>
              {/* 원형 중앙 */}
              <div style={{ position: 'relative', width: 360, height: 360, margin: '0 auto' }}>
                {/* 중앙 레이블 */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 2 }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: ACCENT, letterSpacing: '0.1em', marginBottom: 4 }}><E id="diagnosis_wheel.brand" editMode={editMode}>DATAWARE™</E></p>
                  <p style={{ fontSize: 16, fontWeight: 800, color: '#F9FAFB' }}><E id="diagnosis_wheel.title1" editMode={editMode}>Data</E></p>
                  <p style={{ fontSize: 16, fontWeight: 800, color: '#F9FAFB' }}><E id="diagnosis_wheel.title2" editMode={editMode}>Governance</E></p>
                </div>
                {/* 원형 트랙 */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 360 360">
                  <circle cx="180" cy="180" r="140" fill="none" stroke={`${ACCENT}15`} strokeWidth="1" />
                  <circle cx="180" cy="180" r="100" fill="none" stroke={`${ACCENT}10`} strokeWidth="1" />
                </svg>
                {/* 6개 노드 */}
                {[
                  { label: '메타데이터', sub: '정보 관리', angle: -90, num: '01' },
                  { label: '품질진단', sub: '규칙 관리', angle: -30, num: '02' },
                  { label: '오류 분석', sub: '원인 개선', angle: 30, num: '03' },
                  { label: '영향도', sub: '소스코드 분석', angle: 90, num: '04' },
                  { label: '데이터 흐름', sub: '시각화', angle: 150, num: '05' },
                  { label: '데이터 포털', sub: '검색 포털', angle: 210, num: '06' },
                ].map((node, i) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const x = 180 + 140 * Math.cos(rad);
                  const y = 180 + 140 * Math.sin(rad);
                  return (
                    <div key={node.num} style={{
                      position: 'absolute',
                      left: x - 48, top: y - 28,
                      width: 96, textAlign: 'center',
                    }}>
                      <span style={{ fontSize: 9, color: ACCENT, fontWeight: 600, display: 'block', marginBottom: 2 }}>{node.num}</span>
                      <p style={{ fontSize: 12, fontWeight: 700, color: '#F9FAFB', lineHeight: 1.2 }}><E id={`diagnosis_wheel.node${i}_label`} editMode={editMode}>{node.label}</E></p>
                      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}><E id={`diagnosis_wheel.node${i}_sub`} editMode={editMode}>{node.sub}</E></p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          4. INSIGHT — 데이터 활용이 어려운 이유
          ═══════════════════════════════════════════════════════ */}
      <section ref={insightRef} style={{ background: 'linear-gradient(160deg, #0B1220 30%, #0a1f1a 70%, #0d2a1f)', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '50vw', height: '50vw', maxWidth: 600, maxHeight: 600, borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}12 0%, transparent 50%)` }} />
        </div>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 56px 100px', position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: 56 }}>
            <span data-anim style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.12em', color: ACCENT, display: 'block', marginBottom: 12 }}>INSIGHT</span>
            <h2 data-anim style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#F9FAFB', lineHeight: 1.2, letterSpacing: '-0.03em' }}>
              <E id="diagnosis_insight.title" editMode={editMode}>데이터는 많은데, 왜 활용이 어려울까</E><span style={{ color: ACCENT }}>?</span>
            </h2>
          </div>

          {/* 가로 리스트 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { num: '72%', title: '표준 없이 쌓인 데이터', desc: '명명 규칙·도메인·코드가 제각각이면, 데이터를 모아도 연결이 안 됩니다.', product: 'DA#', productSub: '데이터 모델링' },
              { num: '3.2x', title: '원천마다 다른 구조', desc: '시스템별 구조가 제각각이라 데이터를 모아도 정합이 어렵습니다.', product: 'META#', productSub: '메타데이터 관리' },
              { num: '40%', title: '품질·흐름이 안 보인다', desc: '오류·중복이 감지되지 않고 계보가 안 보여 불신이 쌓입니다.', product: 'DQ#', productSub: '품질관리' },
            ].map((item, i) => (
              <div key={item.product} data-anim style={{
                display: 'grid', gridTemplateColumns: '120px 1fr auto',
                gap: 32, alignItems: 'center',
                padding: '36px 0',
                borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}>
                <span style={{ fontSize: 36, fontWeight: 900, color: '#F9FAFB', letterSpacing: '-0.03em' }}><E id={`diagnosis_insight${i}.num`} editMode={editMode}>{item.num}</E></span>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F9FAFB', marginBottom: 6 }}><E id={`diagnosis_insight${i}.title`} editMode={editMode}>{item.title}</E></h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}><E id={`diagnosis_insight${i}.desc`} editMode={editMode}>{item.desc}</E></p>
                </div>
                <Link href={`/products/${item.product.toLowerCase().replace('#', '-sharp')}`} style={{ textDecoration: 'none', textAlign: 'right', flexShrink: 0 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: ACCENT, display: 'block' }}><E id={`diagnosis_insight${i}.product`} editMode={editMode}>{item.product}</E></span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}><E id={`diagnosis_insight${i}.product_sub`} editMode={editMode}>{item.productSub}</E></span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. 서비스 라인업 — 풀 섹션
          ═══════════════════════════════════════════════════════ */}
      <section ref={serviceRef} style={{ backgroundColor: '#FBFAF7' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 56px 0' }}>
          {/* 헤더 */}
          <div style={{ marginBottom: 48, textAlign: 'right' }}>
            <span data-anim style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.12em', color: ACCENT, display: 'block', marginBottom: 12 }}>PRODUCTS</span>
            <h2 data-anim style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 800, color: '#111', lineHeight: 1.2, letterSpacing: '-0.03em' }}>
              <E id="diagnosis_products.title" editMode={editMode}>8종의 솔루션, 하나의 플랫폼</E><span style={{ color: ACCENT }}>.</span>
            </h2>
            <p data-anim style={{ fontSize: 15, color: '#676767', lineHeight: 1.8, marginTop: 14, maxWidth: 480, marginLeft: 'auto' }}>
              <E id="diagnosis_products.desc" editMode={editMode}>수집부터 포털까지, 데이터 라이프사이클 전체를 커버합니다.</E>
            </p>
          </div>

          {/* ── 데이터 파이프라인 시각화 ── */}
          <div data-anim style={{ background: '#0B1220', border: `1px solid ${ACCENT}15`, padding: 'clamp(40px, 5vw, 56px) clamp(32px, 4vw, 48px)', marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.1em', color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>DATA LIFECYCLE</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, alignItems: 'start' }}>
              {[
                { step: 'Model', label: '구조 설계', product: 'DA#' },
                { step: 'Govern', label: '표준 관리', product: 'META#' },
                { step: 'Quality', label: '품질 검증', product: 'DQ#' },
                { step: 'Impact', label: '영향도 분석', product: 'AP#' },
                { step: 'Portal', label: '포털 제공', product: 'DP#' },
              ].map((s, i) => (
                <div key={s.step} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center', flex: 1, padding: '16px 8px', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#F9FAFB', marginBottom: 6, letterSpacing: '0.02em' }}><E id={`diagnosis_lifecycle${i}.step`} editMode={editMode}>{s.step}</E></p>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}><E id={`diagnosis_lifecycle${i}.label`} editMode={editMode}>{s.label}</E></p>
                    <span style={{ fontSize: 11, fontWeight: 600, color: ACCENT, letterSpacing: '0.04em' }}><E id={`diagnosis_lifecycle${i}.product`} editMode={editMode}>{s.product}</E></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 아키텍처 이미지 ── */}
          <div data-anim style={{ marginBottom: 40, background: '#fff', border: '1px solid #e6e8ec', borderLeft: `3px solid ${ACCENT}`, padding: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', color: ACCENT, display: 'block', marginBottom: 12 }}>META# ARCHITECTURE</span>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#111', marginBottom: 12, letterSpacing: '-0.02em' }}><E id="diagnosis_arch.title" editMode={editMode}>메타데이터 통합 관리 체계</E></h3>
              <p style={{ fontSize: 13, color: '#676767', lineHeight: 1.7 }}><E id="diagnosis_arch.desc" editMode={editMode}>데이터 표준부터 모델, DB 관리, 영향도, 포털까지 — 전체 라이프사이클의 메타데이터를 하나의 플랫폼에서 관리합니다.</E></p>
            </div>
            <OptImg src="/images/encore/solutions_data3-img3.jpg" alt="META# 아키텍처" style={{ width: '100%', height: 'auto' }} />
          </div>

          {/* ── 제품 라인업 전체 ── */}
          <div data-anim style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 20 }}><E id="diagnosis_lineup.title" editMode={editMode}>제품 라인업</E></p>

            {/* DATAWARE: 대형 피처 카드 */}
            <Link
              href="/products/dataware"
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '40px 36px',
                background: '#0B1220',
                borderTop: `3px solid ${ACCENT}`,
                marginBottom: 12,
                boxShadow: `0 -4px 20px ${ACCENT}15`,
                textDecoration: 'none',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#0e1628'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#0B1220'; }}
            >
              <div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}><E id="diagnosis_dataware.badge" editMode={editMode}>ALL-IN-ONE</E></span>
                <h3 style={{ fontSize: 28, fontWeight: 800, color: '#F9FAFB', marginTop: 8, letterSpacing: '-0.03em' }}><E id="diagnosis_dataware.title" editMode={editMode}>DATAWARE</E></h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginTop: 8 }}><E id="diagnosis_dataware.desc" editMode={editMode}>8개 솔루션을 하나의 패키지로</E></p>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: ACCENT }}><E id="diagnosis_dataware.link" editMode={editMode}>자세히 →</E></span>
            </Link>

            {/* 나머지: 컴팩트 라인 카드 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 1 }}>
              {[
                { name: 'DA#', sub: '데이터 모델링', color: '#6b8cae', slug: 'da-sharp' },
                { name: 'META#', sub: '메타데이터 관리', color: '#8a7cb8', slug: 'meta-sharp' },
                { name: 'DQ#', sub: '데이터 품질관리', color: '#5b9a7d', slug: 'dq-sharp' },
                { name: 'AP#', sub: '영향도 분석', color: '#c4975a', slug: 'ap-sharp' },
                { name: 'DP#', sub: '데이터 포털', color: '#b8a060', slug: 'dp-sharp' },
              ].map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '18px 20px',
                    background: '#fff',
                    border: '1px solid #eee',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = p.color;
                    e.currentTarget.style.background = '#fafbfc';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#eee';
                    e.currentTarget.style.background = '#fff';
                  }}
                >
                  <div style={{ width: 6, height: 6, background: p.color, borderRadius: '50%', flexShrink: 0 }} />
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>{p.name}</span>
                  <span style={{ fontSize: 12, color: '#98A2B3' }}>{p.sub}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* ── 인증 ── */}
          <div data-anim style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40, paddingTop: 8 }}>
            {['GS인증 1등급', '나라장터', 'Multi OS', '전자정부 호환'].map((badge) => (
              <span key={badge} style={{
                padding: '5px 12px', fontSize: 11, color: '#98A2B3', fontWeight: 500,
                border: '1px solid #e6e8ec', letterSpacing: '0.02em',
              }}>
                {badge}
              </span>
            ))}
          </div>

          {/* ── 바로가기 ── */}
          <div data-anim style={{ borderTop: '1px solid #e0e2e6', paddingTop: 24, paddingBottom: 40 }}>
            {SERVICE_LINEUP.map((s, i) => (
              <Link
                key={s.label}
                href={s.href}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: i < SERVICE_LINEUP.length - 1 ? '1px solid #eeeff2' : 'none',
                  textDecoration: 'none',
                  transition: 'padding-left 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = '8px'; }}
                onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = '0'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#111' }}><E id={`diagnosis_service${i}.label`} editMode={editMode}>{s.label}</E></span>
                  <span style={{ fontSize: 12, color: '#b0b4bc' }}><E id={`diagnosis_service${i}.sub`} editMode={editMode}>{s.sub}</E></span>
                </div>
                <svg width="16" height="16" fill="none" stroke="#b0b4bc" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 실적 ── */}
      <div style={{ background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 56px 80px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {[
              { num: '3,000', suffix: '+', label: '도입 기업', sub: '공공·금융·제조·유통' },
              { num: '20', suffix: '년+', label: '축적된 구축 경험', sub: '2005년 설립' },
              { num: '8', suffix: '종', label: '솔루션 라인업', sub: 'All-in-One 패키지' },
              { num: 'GS', suffix: ' 1등급', label: '품질 인증', sub: 'TTA 인증' },
            ].map((s, i) => (
              <div key={s.label} style={{
                padding: '0 32px',
                borderLeft: i > 0 ? '1px solid #e6e8ec' : 'none',
              }}>
                <span style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 900, color: '#111', lineHeight: 1, letterSpacing: '-0.03em' }}>
                  <E id={`diagnosis_stats${i}.num`} editMode={editMode}>{s.num}</E><span style={{ color: ACCENT }}><E id={`diagnosis_stats${i}.suffix`} editMode={editMode}>{s.suffix}</E></span>
                </span>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#475467', marginTop: 12 }}><E id={`diagnosis_stats${i}.label`} editMode={editMode}>{s.label}</E></p>
                <p style={{ fontSize: 12, color: '#98A2B3', marginTop: 4 }}><E id={`diagnosis_stats${i}.sub`} editMode={editMode}>{s.sub}</E></p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ BOTTOM CTA ═══ */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: 220 }}>
        <Link
          href="/contact"
          style={{ backgroundColor: '#101828', padding: '56px 48px', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'background 0.3s' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1e293b'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#101828'; }}
        >
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: 16 }}>CONTACT</span>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#F9FAFB', lineHeight: 1.4 }}>
            <E id="diagnosis_cta.contact" editMode={editMode}>무료 상담 신청</E><span style={{ color: ACCENT }}>.</span>
          </h3>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 8 }}><E id="diagnosis_cta.contact_desc" editMode={editMode}>전문 컨설턴트가 48시간 내 연락드립니다</E></p>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20, fontSize: 14, fontWeight: 600, color: ACCENT }}><E id="diagnosis_cta.contact_link" editMode={editMode}>상담 신청하기 →</E></span>
        </Link>
        <a
          href="#diagnosis-form"
          onClick={(e) => { e.preventDefault(); document.getElementById('diagnosis-form')?.scrollIntoView({ behavior: 'smooth' }); }}
          style={{ backgroundColor: ACCENT, padding: '56px 48px', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'filter 0.3s', cursor: 'pointer', boxShadow: `inset 0 0 60px rgba(0,0,0,0.15)` }}
          onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(0.92)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
        >
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', marginBottom: 16 }}>DIAGNOSIS</span>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
            <E id="diagnosis_cta.diagnosis" editMode={editMode}>무료 진단 시작</E><span style={{ opacity: 0.5 }}>.</span>
          </h3>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 8 }}><E id="diagnosis_cta.diagnosis_desc" editMode={editMode}>30초 후 결과 확인 · 이메일 리포트 제공</E></p>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20, fontSize: 14, fontWeight: 600, color: '#fff' }}><E id="diagnosis_cta.diagnosis_link" editMode={editMode}>지금 진단하기 →</E></span>
        </a>
      </div>
      {editMode && <style>{EDITABLE_STYLES}</style>}
    </>
  );
}
