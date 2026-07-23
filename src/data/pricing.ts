/**
 * 가격 데이터 — 원본 uniondata.co.kr 기준
 */

export const PRICING_PLANS = [
  {
    name: 'DA# Architecture',
    license: '1년 라이선스',
    price: 2_400_000,
    originalPrice: 6_000_000,
    priceDisplay: '2,400,000원',
    originalDisplay: '6,000,000원',
    vatNote: 'VAT 별도',
    ctaLabel: '구매하기',
    ctaLink: 'https://smartstore.naver.com/unionsystems/products/6059610938',
    ctaType: 'external' as const,
  },
  {
    name: 'DA# 통합 패키지',
    license: '평생 라이선스',
    price: 6_000_000,
    originalPrice: 12_000_000,
    priceDisplay: '6,000,000원',
    originalDisplay: '12,000,000원',
    vatNote: 'VAT 별도',
    ctaLabel: '구매하기',
    ctaLink: 'https://smartstore.naver.com/unionsystems/products/6575655371',
    ctaType: 'external' as const,
  },
  {
    name: 'DA# Repository',
    license: '평생 라이선스',
    price: 15_000_000,
    originalPrice: 25_000_000,
    priceDisplay: '15,000,000원',
    originalDisplay: '25,000,000원',
    vatNote: 'VAT 별도',
    ctaLabel: '문의하기',
    ctaLink: '/contact',
    ctaType: 'internal' as const,
  },
];

export const SYSTEM_REQUIREMENTS = {
  client: {
    os: 'Windows 10 이상',
    memory: 'RAM 8GB 이상',
    disk: '디스크 300MB 이상',
  },
  server: {
    os: 'Linux 계열 (Rocky 9.x 권장)',
    db: 'PostgreSQL 14 이상',
    disk: '디스크 1.5GB 이상',
  },
};

export const PROCUREMENT = {
  da: {
    label: 'DA# 조달청 바로가기',
    link: 'https://digitalmall.g2b.go.kr:8058/dm/dp/dm_dpprdinfo.do?oprtCtrtItemMngNo=002460933_1030000017',
  },
  dq: {
    label: 'DQ_Edition 조달청 바로가기',
    link: 'https://digitalmall.g2b.go.kr:8058/dm/dp/dm_dpprdinfo.do?oprtCtrtItemMngNo=002460933_1030000016',
  },
};

export const FAQ = [
  {
    question: 'DA# 패키지를 한 종류만 구입할 경우, 다른 패키지의 서비스도 받을 수 있나요?',
    answer: '패치 서비스와 업그레이드 DC 등은 서비스 특성상 기본적으로 해당 구입 제품에만 적용되며 지원받을 수 있습니다. 유료 서비스팩(DA SP)을 통해 추가 서비스를 지원받을 수 있습니다.',
  },
  {
    question: '소규모 회사입니다. DA#의 경우, LT버전(저가용)이 있나요?',
    answer: 'Light 버전과 같이 기능 제한 저가용으로 개발된 제품 라인은 없으나, 사용자수를 규모에 맞춰 선택할 수 있으므로 비용 대비 효과를 높일 수 있습니다.',
  },
  {
    question: 'DA# 구매시 User수에 따른 할인정책이 있나요?',
    answer: '사용자수에 따라 사용자 라이센스로 판매되며, Sliding DC 정책으로 사용자수가 증가할수록 사용자당 단가 할인 비율이 높아집니다.',
  },
  {
    question: 'DA#의 경우, 대기업용 사이트 라이선스가 있나요?',
    answer: '기본적으로 사용자수에 따라 계약하나, 사용자수가 일정 수 이상인 경우 사이트 라이선스를 부여합니다.',
  },
];

export const INQUIRY_STEPS = [
  { step: 1, label: 'DA#도입 문의 신청', desc: '문의서를 작성하여 신청합니다.' },
  { step: 2, label: 'DA#도입 문의 검토', desc: '담당자가 문의를 검토합니다.' },
  { step: 3, label: '맞춤 제안 제시', desc: '맞춤 솔루션을 제안드립니다.' },
];

export const INQUIRY_CATEGORIES = [
  'DA# 제품소개서',
  'DQ Edition 제품소개서',
  'DA# 도입문의',
  'DQ Edition 도입문의',
];
