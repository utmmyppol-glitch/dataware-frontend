import { useState, useRef, FormEvent } from 'react';
import { api } from '@/lib/api';

/* ── 타입 ── */
export type DbScale = '10미만' | '10~50' | '50~200' | '200+';

export interface DiagnosisResult {
  level: number;
  title: string;
  description: string;
  products: string[];
}

type FieldErrors = Record<string, string>;

/* ── 진단 알고리즘 ── */
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

/* ── 커스텀 훅 ── */
export function useDiagnosis() {
  /* 진단 폼 상태 */
  const [dbCount, setDbCount] = useState<DbScale | null>(null);
  const [hasStandard, setHasStandard] = useState<boolean | null>(null);
  const [hasMeta, setHasMeta] = useState<boolean | null>(null);
  const [hasQuality, setHasQuality] = useState<boolean | null>(null);
  const [diagStep, setDiagStep] = useState(0);

  const result = diagnose(dbCount, hasStandard, hasMeta, hasQuality);

  /* 제품 상세 토글 */
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  /* 스텝 자동 진행 */
  function advanceStep(step: number) {
    setTimeout(() => setDiagStep(step + 1), 350);
  }

  /* 이메일 폼 상태 */
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

  function resetDiagnosis() {
    setDiagStep(0);
    setDbCount(null);
    setHasStandard(null);
    setHasMeta(null);
    setHasQuality(null);
    setExpandedProduct(null);
  }

  return {
    /* 퀴즈 상태 */
    dbCount, setDbCount,
    hasStandard, setHasStandard,
    hasMeta, setHasMeta,
    hasQuality, setHasQuality,
    diagStep, setDiagStep,
    result,
    advanceStep,
    resetDiagnosis,
    /* 제품 토글 */
    expandedProduct, setExpandedProduct,
    /* 이메일 폼 */
    company, setCompany,
    email, setEmail,
    emailSubmitted, emailLoading,
    errors,
    formRef,
    handleEmailSubmit,
  };
}
