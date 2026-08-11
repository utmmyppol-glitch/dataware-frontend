const ACCENT = '#36c88a';

/* ── 제품 상세 정보 (인라인 표시용) ── */
export const PRODUCT_DETAILS: Record<string, { subtitle: string; desc: string; color: string; features: string[] }> = {
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
export const SERVICE_LINEUP = [
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
