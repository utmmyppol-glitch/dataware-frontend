/**
 * 회사 정보 + 카피라이팅 — 원본 기준
 */

export const COMPANY = {
  name: '주식회사 유니온시스템즈',
  role: 'DA# 총판',
  developer: '㈜엔코아',
  developerSite: 'https://www.en-core.com/',
  representative: '홍민석',
  tel: '02-706-8999',
  fax: '02-706-8990',
  email: 'ud@unionsystems.co.kr',
  address: '서울시 성동구 아차산로17길 49, 1209~1210호 (성수동2가,생각공장데시앙플렉스)',
  buildingName: '생각공장데시앙플렉스',
  businessRegistration: '120-87-96801',
  copyright: 'Copyright 2021 UNION SYSTEMS. All rights reserved.',
  sns: {
    blog: 'https://blog.naver.com/unionsystems_',
    facebook: 'https://www.facebook.com/%EC%9C%A0%EB%8B%88%EC%98%A8%EC%8B%9C%EC%8A%A4%ED%85%9C%EC%A6%88-407065599829009/',
  },
  youtube: {
    channel: 'https://www.youtube.com/channel/UCeesWbZ2-pAiB__LQkmkJNA',
    channelName: 'Korea EN-CORE',
  },
};

/* ─── 핵심 카피라이팅 (원본 유지) ─── */
export const COPY = {
  // 메인 히어로
  heroDA: {
    line1: '규칙적으로',
    line2: '설계를',
    line3: '디자인하다.',
    subtitle: '데이터 비즈니스의 시작, 데이터 모델링 툴 DA#',
  },
  heroDQ: {
    line1: '쌓여있던',
    line2: '데이터 품질을',
    line3: '높이다.',
    subtitle: '데이터 퀄리티의 시작, 데이터 품질진단 DA# DQ Edition',
  },

  // 섹션 헤딩
  roleSection: '데이터 분석, 설계, 활용을 한번에!',
  whyDA: 'DA#을 선택하는 이유',
  whyDASub: 'DA#을 사용하면 직관적 표현으로 논리적 설계와 생산의 효율이 올라갑니다.',
  aiPack: 'AI 기반 업무 프로세스 자동화를 통해 80% 이상 공수 절감 효과',
  customers: '좋은 데이터는 매출로 연결됩니다.',
  customerIndustries: '금융, 공공, 제조, 서비스, 유통, 교육, 병원이 DA#를 선택했습니다.',
  customerHeading: 'DA#을 선택한 고객사례',
  newsSection: '유니온시스템즈 소식',
  newsSub: '성장하는 유니온시스템즈의 소식과 유용한 강의들을 만나보세요!',
  totalPackage: '하나의 라이선스로 4개 제품 스펙 제공!',

  // CTA
  ctaConsulting: '데이터모델링 도입 고민이신가요?',
  ctaConsultingLabel: '컨설팅받기',
  ctaBrochure: '더 많은 기능들이 궁금하신가요?',
  ctaBrochureLabel: '소개서받기',
  ctaData: '데이터를 알아야 비즈니스가 보입니다.',
  ctaQuality: '측정되지 않으면 관리할 수 없고, 관리되지 않으면 개선할 수 없다.',
  ctaStart: '데이터 시작과 끝 DA#으로 해결하세요!',

  // 교육 섹션
  educationHeading: '교육 컨설팅',
  educationSub: 'DA# 입문부터 설계, 활용까지! 전문가들의 세미나도 놓치지 마세요.',
  educationCta: '아직 시작이 어려우신가요?',
  educationCtaSub: '데이터 아키텍처 기본개념, 현장에서 사용할 수 있는 고급 활용 방법, 노하우를 알려드립니다.',

  // 다운로드 섹션
  downloadHeading: '다운로드 신청',
  downloadSub: 'DA# 제품 소개서 및 무료 라이선스를 신청하실 수 있습니다.',

  // 방문세미나 섹션
  seminarHeading: '방문 세미나',
  seminarSub: '맞춤형 교육이 필요하신 분들을 위한 방문교육',
  seminarDesc: '유니온시스템즈는 고객사에 방문하여 맞춤형 방문 세미나를 제안드립니다.',

  // 공지사항 섹션
  noticeHeading: '공지사항',
  noticeSub: '유니온시스템의 다양한 소식과 교육들을 알아보세요.',

  // 무료교육 섹션
  freeEducationHeading: '무료교육',
  freeEducationSub: '데이터 아키텍처 기본개념, 현장에서 사용할 수 있는 고급 활용 방법, 노하우를 알려드립니다.',
};

/* ─── 교육 프로그램 ─── */
export const EDUCATION_BENEFITS = [
  { title: '쉬운도구', desc: '1시간이면 기초 사용 하루 교육으로 마스터' },
  { title: '온라인강좌', desc: '듀토리얼 영상, 웨비나 데이터 비즈니스 정보' },
  { title: '전문가그룹', desc: '데이터 전문서적 출판 데이터 컨설팅, 구축, 활용' },
];

export const EDUCATION_STEPS = [
  { step: 1, label: '무료교육 일정 확인', desc: '무료교육 일정 확인' },
  { step: 2, label: '신청서 작성', desc: '무료교육 신청서 작성' },
  { step: 3, label: '신청완료', desc: '신청완료' },
];

export const SEMINAR_STEPS = [
  { step: 1, label: '제품 및 기능소개', desc: '제품 및 기능소개' },
  { step: 2, label: '제품 시연', desc: '제품 시연' },
  { step: 3, label: '질의응답', desc: '질의응답' },
];

/* ─── 무료교육 일정 목록 ─── */
export const EDUCATION_SCHEDULE = [
  {
    title: '홍우석의 실전! 데이터 모델링 DA# & META#',
    date: '2026-06-24',
    time: '2026.06.24(수) 13:00 ~ 17:00(1DAY)',
    postedDate: '2026-05-28',
    status: 'closed' as const,
    category: '무료교육',
  },
  {
    title: 'DA#, 1DAY 온라인 사용자 무료 교육',
    date: '2026-06-19',
    time: '2026.06.19(금) 09:30 ~ 17:00(1Day)',
    postedDate: '2026-05-18',
    status: 'closed' as const,
    category: '무료교육',
  },
  {
    title: '2026 기업 자산 보호를 위한 단계별 보안 고도화 전략',
    date: '2026-05-20',
    time: '2026.05.20(수) 13:00~15:10(1DAY)',
    postedDate: '2026-04-17',
    status: 'closed' as const,
    category: '무료교육',
  },
  {
    title: '홍우석의 실전! 데이터 모델링 DA# & META#',
    date: '2026-04-24',
    time: '2026.04.24(금) 13:00 ~ 17:00(1Day)',
    postedDate: '2026-03-24',
    status: 'closed' as const,
    category: '무료교육',
  },
  {
    title: 'DA#, 1DAY 온라인 사용자 무료 교육',
    date: '2026-04-10',
    time: '2026.04.10(금) 09:30 ~ 17:00(1Day)',
    postedDate: '2026-01-21',
    status: 'closed' as const,
    category: '무료교육',
  },
  {
    title: 'DA#, 1DAY 온라인 사용자 무료 교육',
    date: '2026-02-06',
    time: '2026.02.06(금) 09:30 ~ 17:00(1Day)',
    postedDate: '2026-01-06',
    status: 'closed' as const,
    category: '무료교육',
  },
  {
    title: 'DA#, 1DAY 온라인 사용자 무료 교육',
    date: '2025-11-28',
    time: '2025.11.28(금) 09:30 ~ 17:00(1Day)',
    postedDate: '2025-10-27',
    status: 'closed' as const,
    category: '무료교육',
  },
  {
    title: '2025 데이터 모델링 클래스 데.모.클 with DA#',
    date: '2025-11-14',
    time: '2025.11.14(금) 13:00 ~ 17:00(1Day)',
    postedDate: '2025-10-15',
    status: 'closed' as const,
    category: '무료교육',
  },
  {
    title: '2025 데이터 모델링 클래스 데.모.클 with DA#',
    date: '2025-10-17',
    time: '2025.10.17(금) 13:00 ~ 17:00(1Day)',
    postedDate: '2025-09-22',
    status: 'closed' as const,
    category: '무료교육',
  },
  {
    title: 'DA#, 1DAY 온라인 사용자 무료 교육',
    date: '2025-09-05',
    time: '2025.09.05(금) 09:30 ~ 17:00(1Day)',
    postedDate: '2025-08-04',
    status: 'closed' as const,
    category: '무료교육',
  },
  {
    title: '2025 데이터 모델링 클래스 데.모.클 with DA#',
    date: '2025-09-12',
    time: '2025.09.12(금) 13:00 ~ 17:00(1Day)',
    postedDate: '2025-08-11',
    status: 'closed' as const,
    category: '무료교육',
  },
  {
    title: '2024 홍우석의 실전! 데이터 모델링 세미나',
    date: '2024-09-10',
    time: '2024.09.10(화) 13:00 ~ 17:00(1DAY)',
    postedDate: '2024-08-10',
    status: 'closed' as const,
    category: '무료교육',
  },
  {
    title: 'DA#, 1DAY 온라인 사용자 무료 교육',
    date: '2024-10-18',
    time: '2024.10.18(금) 09:30 ~ 17:00(1Day)',
    postedDate: '2024-09-18',
    status: 'closed' as const,
    category: '무료교육',
  },
  {
    title: 'DA#, 1DAY 온라인 사용자 무료 교육',
    date: '2024-04-19',
    time: '2024.04.19(금) 09:30 ~ 17:00(1Day)',
    postedDate: '2024-03-19',
    status: 'closed' as const,
    category: '무료교육',
  },
  {
    title: '2024 데이터 모델링 클래스 데.모.클 with DA#',
    date: '2024-07-12',
    time: '2024.07.12(금) 13:00 ~ 17:00(1Day)',
    postedDate: '2024-06-12',
    status: 'closed' as const,
    category: '무료교육',
  },
  {
    title: 'DA#, 1DAY 온라인 사용자 무료 교육',
    date: '2023-11-01',
    time: '2023.11(1Day)',
    postedDate: '2023-10-01',
    status: 'closed' as const,
    category: '무료교육',
  },
  {
    title: 'DA#, 1DAY 온라인 사용자 무료 교육',
    date: '2023-09-01',
    time: '2023.09(1Day)',
    postedDate: '2023-08-01',
    status: 'closed' as const,
    category: '무료교육',
  },
  {
    title: 'DA#, 1DAY 온라인 사용자 무료 교육',
    date: '2023-02-01',
    time: '2023.02(1Day)',
    postedDate: '2023-01-01',
    status: 'closed' as const,
    category: '무료교육',
  },
  {
    title: '2023 데이터 모델링 클래스 데.모.클 with DA#',
    date: '2023-09-22',
    time: '2023.09.22(금)',
    postedDate: '2023-08-22',
    status: 'closed' as const,
    category: '무료교육',
  },
  {
    title: '2023 데이터 모델링 클래스 데.모.클 with DA#',
    date: '2023-07-07',
    time: '2023.07.07(금)',
    postedDate: '2023-06-07',
    status: 'closed' as const,
    category: '무료교육',
  },
];

/* ─── 동영상 강의 목록 ─── */
export const VIDEO_LECTURES = [
  // DA#5 런칭 세미나
  {
    category: 'seminar' as const,
    categoryLabel: 'DA#5 런칭 세미나',
    speaker: '이화식 대표',
    title: '새로운 시대의 데이터모델링',
    youtubeId: '1qP1zbsChQc',
    youtubeUrl: 'https://www.youtube.com/watch?v=1qP1zbsChQc',
    date: '2021-11-10',
  },
  {
    category: 'seminar' as const,
    categoryLabel: 'DA#5 런칭 세미나',
    speaker: '정철원 디렉터',
    title: '개발스토리',
    youtubeId: 'YMyKMXM3m4U',
    youtubeUrl: 'https://www.youtube.com/watch?v=YMyKMXM3m4U',
    date: '2021-11-11',
  },
  {
    category: 'seminar' as const,
    categoryLabel: 'DA#5 런칭 세미나',
    speaker: '최광희 연구원',
    title: '기본구조 및 개념',
    youtubeId: 'T1ZCYyOyL3Q',
    youtubeUrl: 'https://www.youtube.com/watch?v=T1ZCYyOyL3Q',
    date: '2021-11-11',
  },
  {
    category: 'seminar' as const,
    categoryLabel: 'DA#5 런칭 세미나',
    speaker: '정민수 연구원',
    title: '달라진 모델링',
    youtubeId: 'CN93yT8UL44',
    youtubeUrl: 'https://www.youtube.com/watch?v=CN93yT8UL44',
    date: '2021-11-11',
  },
  {
    category: 'seminar' as const,
    categoryLabel: 'DA#5 런칭 세미나',
    speaker: '김기동 연구원',
    title: 'API 그리고 편의기능',
    youtubeId: 'iGS7B-hJE-4',
    youtubeUrl: 'https://www.youtube.com/watch?v=iGS7B-hJE-4',
    date: '2021-11-11',
  },
  {
    category: 'seminar' as const,
    categoryLabel: 'DA#5 런칭 세미나',
    speaker: '이임형 연구원',
    title: '초보자도 할 수 있는 현행모델 파헤치기',
    youtubeId: '33nGO8uZOQ8',
    youtubeUrl: 'https://www.youtube.com/watch?v=33nGO8uZOQ8',
    date: '2021-11-11',
  },
  // DA#5 튜토리얼
  {
    category: 'tutorial' as const,
    categoryLabel: 'DA#5 튜토리얼',
    title: '물리객체생성',
    youtubeId: 'HA7kcXJ3IIo',
    youtubeUrl: 'https://www.youtube.com/watch?v=HA7kcXJ3IIo',
    date: '2021-11-22',
  },
  {
    category: 'tutorial' as const,
    categoryLabel: 'DA#5 튜토리얼',
    title: '여러물리모델',
    youtubeId: 'CLsXPIB6EH4',
    youtubeUrl: 'https://www.youtube.com/watch?v=CLsXPIB6EH4',
    date: '2021-11-22',
  },
  {
    category: 'tutorial' as const,
    categoryLabel: 'DA#5 튜토리얼',
    title: '서식적용',
    youtubeId: 'RXHDtaAUBKs',
    youtubeUrl: 'https://www.youtube.com/watch?v=RXHDtaAUBKs',
    date: '2021-11-22',
  },
  {
    category: 'tutorial' as const,
    categoryLabel: 'DA#5 튜토리얼',
    title: 'DB 리버스',
    youtubeId: 'jwNKCliYAEw',
    youtubeUrl: 'https://www.youtube.com/watch?v=jwNKCliYAEw',
    date: '2021-11-22',
  },
  {
    category: 'tutorial' as const,
    categoryLabel: 'DA#5 튜토리얼',
    title: '리버스 후 모델 자동 배치',
    youtubeId: 'OAFBHAElESQ',
    youtubeUrl: 'https://www.youtube.com/watch?v=OAFBHAElESQ',
    date: '2021-11-22',
  },
  {
    category: 'tutorial' as const,
    categoryLabel: 'DA#5 튜토리얼',
    title: '자동관계생성',
    youtubeId: 't12UZTlIR80',
    youtubeUrl: 'https://www.youtube.com/watch?v=t12UZTlIR80',
    date: '2021-11-22',
  },
  {
    category: 'tutorial' as const,
    categoryLabel: 'DA#5 튜토리얼',
    title: 'COMMENT 활용한 리버스',
    youtubeId: 'V-8w2lXyiqY',
    youtubeUrl: 'https://www.youtube.com/watch?v=V-8w2lXyiqY',
    date: '2021-11-22',
  },
  {
    category: 'tutorial' as const,
    categoryLabel: 'DA#5 튜토리얼',
    title: '자동 배치',
    youtubeId: '_Wjhv7ZlpCE',
    youtubeUrl: 'https://www.youtube.com/watch?v=_Wjhv7ZlpCE',
    date: '2021-11-22',
  },
  {
    category: 'tutorial' as const,
    categoryLabel: 'DA#5 튜토리얼',
    title: 'API를 활용한 IMPORT, EXPORT',
    youtubeId: 'bmmD0yhnSkw',
    youtubeUrl: 'https://www.youtube.com/watch?v=bmmD0yhnSkw',
    date: '2021-11-22',
  },
];

/* ─── 공지사항 ─── */
export const NOTICES = [
  {
    date: '2021-11-22',
    title: 'DA#_DQ_Edition 조달청 나라장터 등록',
    summary: '\'DA#\'-\'DQ#\' 패키지로 구성해 데이터 표준화 기반의 체계적인 품질진단 지원 공공데이터 품질관리 수준평가에 대응하기 위한 최적의 툴 제공 데이터 비즈니스 전문기업 엔코아(대표 이화식)가 자사의 \'데이터웨어 디에이샵 디큐에디션(DATAWARE DA#_DQ Edition)\'이 조달청 나라장터…',
  },
  {
    date: '2021-06-02',
    title: '[리뷰] 데이터 품질진단 DA# DQ_Edition',
    summary: '데이터 모델링과 품질진단 자동화로 관리 효율성 향상 [아이티데일리] 지속되고 있는 코로나19 팬더믹 사태는 비즈니스 환경을 빠르게 변화시키고 있다. 비대면이 활성화되고 재택근무가 일상이 되면서 정보를 공유할 수 있는 클라우드의 활용은 필수적이…',
  },
  {
    date: '2021-06-01',
    title: '[리뷰] 데이터모델링 DA#',
    summary: '차세대 프로젝트에서 단위 업무 모델링까지, 개발 생산성과 성능 제고 [아이티데일리] 데이터 비즈니스의 기본, 데이터 모델링 툴 체계적인 기업의 데이터 품질 관리는 기업의 경험과 지식, 업무, 프로세스, 규칙 등 다양한…',
  },
  {
    date: '2021-05-30',
    title: 'DA# DQ_Edition GS인증 1등급',
    summary: '엔코아(대표 이화식)가 데이터 표준화 기반 데이터 품질진단 솔루션 \'디에이샵 디큐 에디션\'이 굿소프트웨어(GS)인증 1등급을 획득했다고 24일 밝혔다. 지난 3월 출시한 디에이샵 디큐에디션은 엔코아의 데이터 모델링 툴, 데이터웨어 디에이샵(DA#)과 데이터 품질관리 솔루션,…',
  },
  {
    date: '2021-05-01',
    title: '유니온시스템즈 DA# 리뉴얼 오픈',
    summary: '넓어진 화면, 모바일 검색, 디지털 환경 변화에 맞춰 정보를 전달하는데 기존의 홈페이지는 부족함이 있었습니다. 이번 리뉴얼을 통해 DA#과 DA# DQ_Edition 기능, 모델링도구 팁과 활용법, 칼럼, 온&오프라인 참여 가능한 교육…',
  },
  {
    date: '2021-02-24',
    title: '엔코아 · 유니온시스템즈 \'DA#\' 총판 협약',
    summary: '엔코아(대표 이화식)가 데이터 통합관리 솔루션 \'데이터웨어\' 주력 제품인 데이터 모델링 툴 \'디에이샵(DA#)\' 시장 확대를 위해 유니온시스템즈와 총판 협약을 체결했다. 최근 다양한 산업군에서 체계적인 데이터 거버넌스를 위해 전문 데이터 모델링 툴…',
  },
];
