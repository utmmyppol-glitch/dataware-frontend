/**
 * Central mock data for DATAWARE frontend.
 * When NEXT_PUBLIC_USE_MOCK=true, all API calls return this data instead.
 */

export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

/* ── Products ── */
export const mockProducts = [
  {
    id: 1,
    name: 'DA#',
    slug: 'da-sharp',
    category: 'modeling',
    subtitle: '데이터 모델링 도구',
    description: '논리/물리 데이터 모델링, 포워드/리버스 엔지니어링, 표준 용어 사전 관리 기능을 제공하는 국내 1위 데이터 모델링 솔루션입니다.',
    features: '논리/물리 모델링,포워드/리버스 엔지니어링,표준 용어 사전,모델 비교/병합,ERD 자동 생성',
    iconUrl: '/images/products/da-icon.svg',
    thumbnailUrl: '/images/products/da-thumb.png',
    certification: 'GS인증 1등급',
    sortOrder: 1,
  },
  {
    id: 2,
    name: 'META#',
    slug: 'meta-sharp',
    category: 'metadata',
    subtitle: '메타데이터 관리 솔루션',
    description: '전사 메타데이터 수집, 카탈로그 관리, 데이터 리니지 추적, 영향도 분석 기능을 제공합니다.',
    features: '메타데이터 자동 수집,데이터 카탈로그,리니지 추적,영향도 분석,비즈니스 용어 관리',
    iconUrl: '/images/products/meta-icon.svg',
    thumbnailUrl: '/images/products/meta-thumb.png',
    certification: 'GS인증 1등급',
    sortOrder: 2,
  },
  {
    id: 3,
    name: 'DQ#',
    slug: 'dq-sharp',
    category: 'quality',
    subtitle: '데이터 품질관리 솔루션',
    description: '데이터 품질 진단, 오류 패턴 분석, 품질 지표 모니터링, 클렌징 규칙 관리를 위한 통합 솔루션입니다.',
    features: '품질 진단 자동화,오류 패턴 분석,KPI 대시보드,클렌징 규칙 관리,품질 보고서 생성',
    iconUrl: '/images/products/dq-icon.svg',
    thumbnailUrl: '/images/products/dq-thumb.png',
    certification: 'GS인증 1등급',
    sortOrder: 3,
  },
  {
    id: 4,
    name: 'AP#',
    slug: 'ap-sharp',
    category: 'architecture',
    subtitle: '데이터 아키텍처 관리',
    description: '데이터 표준, 구조, 흐름을 통합 관리하여 전사 데이터 아키텍처를 수립·운영할 수 있습니다.',
    features: '표준 관리,구조 관리,데이터 흐름 관리,아키텍처 뷰,변경 이력 관리',
    iconUrl: '/images/products/ap-icon.svg',
    thumbnailUrl: '/images/products/ap-thumb.png',
    certification: '',
    sortOrder: 4,
  },
  {
    id: 5,
    name: 'DF#',
    slug: 'df-sharp',
    category: 'flow',
    subtitle: '데이터 플로우 관리',
    description: '시스템 간 데이터 흐름을 시각화하고, 인터페이스 현황을 추적·관리할 수 있는 솔루션입니다.',
    features: '데이터 플로우 시각화,인터페이스 관리,변경 영향 분석,흐름 모니터링,보고서 생성',
    iconUrl: '/images/products/df-icon.svg',
    thumbnailUrl: '/images/products/df-thumb.png',
    certification: '',
    sortOrder: 5,
  },
  {
    id: 6,
    name: 'ETT#',
    slug: 'ett-sharp',
    category: 'test',
    subtitle: '엔터프라이즈 테스트 도구',
    description: '대용량 테스트 데이터 생성 및 데이터 마스킹 기능을 제공하여 안전한 테스트 환경을 구축할 수 있습니다.',
    features: '테스트 데이터 생성,데이터 마스킹,대용량 처리,시나리오 관리,자동화 지원',
    iconUrl: '/images/products/ett-icon.svg',
    thumbnailUrl: '/images/products/ett-thumb.png',
    certification: '',
    sortOrder: 6,
  },
  {
    id: 7,
    name: 'DP#',
    slug: 'dp-sharp',
    category: 'portal',
    subtitle: '데이터 포털',
    description: '전사 데이터 자산을 한눈에 조회·검색할 수 있는 셀프 서비스 데이터 포털입니다.',
    features: '데이터 검색,셀프 서비스,데이터 마켓,사용 현황 대시보드,권한 관리',
    iconUrl: '/images/products/dp-icon.svg',
    thumbnailUrl: '/images/products/dp-thumb.png',
    certification: '',
    sortOrder: 7,
  },
];

/* ── Posts ── */
export const mockPosts = [
  {
    id: 1,
    title: '데이터 거버넌스 도입 시 반드시 고려해야 할 5가지',
    content: '데이터 거버넌스를 도입할 때 조직 문화, 데이터 표준, 기술 인프라, 인력 양성, 성과 측정 등 5가지 핵심 요소를 살펴봅니다.',
    excerpt: '데이터 거버넌스 도입 시 조직 문화부터 성과 측정까지 반드시 점검해야 할 핵심 요소를 정리했습니다.',
    category: 'blog',
    thumbnailUrl: '/images/blog/governance.png',
    viewCount: 1240,
    createdAt: '2025-06-15T09:00:00Z',
  },
  {
    id: 2,
    title: 'DA# 7.0 신규 기능 안내',
    content: 'DA# 7.0에서는 AI 기반 모델 추천, 협업 워크스페이스, 클라우드 네이티브 지원 등 혁신적인 기능이 추가되었습니다.',
    excerpt: 'DA# 7.0 주요 업데이트 사항을 안내합니다. AI 모델 추천, 클라우드 네이티브 등 신규 기능을 확인하세요.',
    category: 'notice',
    thumbnailUrl: '/images/blog/da7.png',
    viewCount: 980,
    createdAt: '2025-05-20T09:00:00Z',
  },
  {
    id: 3,
    title: '메타데이터 관리, 왜 중요한가?',
    content: '데이터 자산의 가치를 극대화하기 위한 메타데이터 관리의 중요성과 META#을 활용한 실전 사례를 소개합니다.',
    excerpt: '메타데이터 관리의 중요성과 실전 도입 사례를 통해 데이터 자산 관리의 핵심 전략을 알아봅니다.',
    category: 'blog',
    thumbnailUrl: '/images/blog/metadata.png',
    viewCount: 856,
    createdAt: '2025-04-10T09:00:00Z',
  },
  {
    id: 4,
    title: '2025년 하반기 교육 일정 안내',
    content: '2025년 하반기 DA# 온라인 교육 일정이 확정되었습니다. 무료 교육 신청을 통해 데이터 모델링 역량을 강화하세요.',
    excerpt: '2025년 하반기 DA# 무료 온라인 교육 일정 안내입니다.',
    category: 'notice',
    thumbnailUrl: '/images/blog/education.png',
    viewCount: 632,
    createdAt: '2025-07-01T09:00:00Z',
  },
];

/* ── Customer Stories ── */
export const mockCustomerStories = [
  {
    id: 1,
    company: 'SSG닷컴',
    industry: '유통',
    title: 'SSG닷컴이 데이터를 활용하는 법',
    content: '방대한 데이터의 수집, 저장, 통합, 활용 등 전 과정을 효과적으로 관리하기 위해 따로 운영되던 유통 서비스를 단일 채널로 통합하는 용어 표준화를 진행했습니다. DA#, DQ#, META#을 활용해 기획팀과 개발팀 소통을 원활화하고 전사 데이터 현행화 및 표준화를 완성했습니다.',
    thumbnailUrl: '/images/uniondata/clients_img_ssg.png',
    logoUrl: '',
    createdAt: '2024-11-11T00:00:00Z',
  },
  {
    id: 2,
    company: '한국수자원공사',
    industry: '공공기관',
    title: '한국수자원공사, 데이터 관리 포털 구축',
    content: '현업 담당자들에게 객관적인 데이터 관련 서비스를 제공하기 위해 데이터모델 기반 테이블 변경 관리 체계를 구축했습니다. 비즈니스 분류 관리 및 시스템/DB서버/테이블/컬럼의 메타데이터를 관리하는 데이터 전문 솔루션을 도입해 개발 생산성과 데이터 활용을 극대화했습니다.',
    thumbnailUrl: '/images/uniondata/clients_img_kwater.png',
    logoUrl: '',
    createdAt: '2024-11-11T00:00:00Z',
  },
  {
    id: 3,
    company: '아모레퍼시픽',
    industry: '제조',
    title: '아모레퍼시픽, 메타데이터 관리체계 고도화',
    content: '전사 데이터 표준 및 모델관리 프로세스 개선을 위해 DATAWARE의 DA#, META#을 도입했습니다. 데이터 아키텍트 역량을 내재화하고 데이터 리터러시를 구축해 마케팅 및 영업 현장에서 데이터 기반 의사결정을 수행할 수 있는 환경을 마련했습니다.',
    thumbnailUrl: '/images/uniondata/clients_img_amore.png',
    logoUrl: '',
    createdAt: '2024-11-11T00:00:00Z',
  },
  {
    id: 4,
    company: '현대해상',
    industry: '금융',
    title: '현대해상, 메타데이터 관리시스템 재구축',
    content: '노후화된 메타데이터 시스템 교체와 운영 효율화를 위해 시스템을 재구축했습니다. 메타데이터를 통해 애플리케이션, 정보, 시스템을 통합 관리하고 비즈니스 의사결정에 데이터를 활용하는 환경을 구축했습니다.',
    thumbnailUrl: '/images/uniondata/clients_img_hyundai-marine.png',
    logoUrl: '',
    createdAt: '2024-11-10T00:00:00Z',
  },
  {
    id: 5,
    company: '동양생명',
    industry: '금융',
    title: '동양생명, 데이터 관리체계 자동화 솔루션 도입',
    content: '노후화된 메타데이터 솔루션 교체와 모델링 솔루션 도입을 병행했습니다. 모델 변경사항의 DB반영 자동화와 갭 분석 표준화를 통해 데이터 품질관리 체계를 강화하고 비즈니스 의사결정에 데이터를 활용하는 환경을 마련했습니다.',
    thumbnailUrl: '/images/uniondata/clients_img_tong-yang-life.png',
    logoUrl: '',
    createdAt: '2024-11-11T00:00:00Z',
  },
];

/* ── Banners ── */
export const mockBanners = [
  {
    id: 1,
    title: 'DA# 7.0 출시 기념 무료 체험',
    imageUrl: '/images/banners/da7-launch.png',
    linkUrl: '/download',
    position: 'main',
  },
  {
    id: 2,
    title: '2025 데이터 거버넌스 세미나',
    imageUrl: '/images/banners/seminar-2025.png',
    linkUrl: '/seminar',
    position: 'main',
  },
];

/* ── Client Logos ── */
export const mockClientLogos = [
  { id: 1, name: '삼성SDS', logoUrl: '/images/logos/samsung-sds.png' },
  { id: 2, name: 'SK텔레콤', logoUrl: '/images/logos/skt.png' },
  { id: 3, name: '카카오뱅크', logoUrl: '/images/logos/kakaobank.png' },
  { id: 4, name: '현대자동차', logoUrl: '/images/logos/hyundai.png' },
  { id: 5, name: '국민은행', logoUrl: '/images/logos/kb.png' },
  { id: 6, name: 'LG CNS', logoUrl: '/images/logos/lgcns.png' },
];

/* ── Form submission mock responses ── */
export const mockInquiryResponse = {
  id: 1,
  name: '홍길동',
  company: '테스트기업',
  status: 'RECEIVED',
  createdAt: '2025-07-01T09:00:00Z',
};

export const mockSubmitResponse = {
  message: '성공적으로 접수되었습니다.',
  id: 1,
};

/* ── Menu ── */
export const mockMenuItems = [
  { name: '제품', url: '/products', isExposed: true, sortOrder: 1 },
  { name: '고객사례', url: '/customers', isExposed: true, sortOrder: 2 },
  { name: '리소스', url: '/resources', isExposed: true, sortOrder: 3 },
  { name: '가격', url: '/pricing', isExposed: true, sortOrder: 4 },
  { name: '무료교육', url: '/education', isExposed: true, sortOrder: 5 },
  { name: '도입문의', url: '/contact', isExposed: true, sortOrder: 6 },
];

/* ── Footer Config ── */
export const mockConfig: Record<string, string> = {
  company_name: '주식회사 유니온시스템즈',
  ceo: '홍민석',
  biz_no: '120-87-96801',
  tel: '02-706-8999',
  fax: '02-706-8990',
  email: 'ud@unionsystems.co.kr',
  address: '서울시 성동구 아차산로17길 49, 1209~1210호 (성수동2가, 생각공장데시앙플렉스)',
  copyright: 'Copyright 2021 UNION SYSTEMS. All rights reserved.',
  sns_blog: 'https://blog.naver.com/unionsystems_',
  sns_facebook: '',
};

/* ── Content (CMS key-value) ── */
export const mockContent: Record<string, string> = {
  // Home
  home_hero: JSON.stringify({ title: 'DATAWARE - 데이터 거버넌스 All-in-One', desc: 'DA#, META#, DQ# 등 7개 솔루션으로 데이터 표준, 품질, 메타데이터를 통합 관리하세요.' }),
  home_trusted: JSON.stringify({ title: '3,000+ 기업이 선택한 DATAWARE' }),
  home_why: JSON.stringify({ title: 'DATAWARE를 선택해야 하는 이유' }),
  home_dataflow: JSON.stringify({ title: '데이터 흐름 관리' }),
  home_platform: JSON.stringify({ title: '데이터 거버넌스 플랫폼' }),
  home_features: JSON.stringify({ title: '핵심 기능' }),
  home_customers: JSON.stringify({ title: '고객 사례' }),
  home_news: JSON.stringify({ title: '최신 소식' }),
  home_cta: JSON.stringify({ title: '지금 시작하세요', desc: 'DA# 개인용 무료 다운로드로 데이터 모델링을 체험해 보세요.' }),
  home_seo_title: 'UNION DATAWARE - DA# 데이터 모델링 & DATAWARE 솔루션',
  home_seo_description: 'DA#, META#, DQ#, AP#, DF#, ETT#, DP# - 데이터 거버넌스 All-in-One Package. 유니온시스템즈는 엔코아 DATAWARE 공식 총판입니다.',

  // Products
  products_hero: JSON.stringify({ title: '제품 소개', desc: '데이터 거버넌스를 위한 올인원 솔루션 라인업' }),
  products_features: JSON.stringify([{ v: '8', l: '핵심 솔루션' }, { v: 'GS 1등급', l: '품질인증' }, { v: 'All-in-One', l: '통합 패키지' }]),
  products_grid: JSON.stringify({ title: '제품 라인업' }),
  products_cta: JSON.stringify({ title: '도입 문의', desc: '솔루션 도입에 관한 상담을 원하시면 문의해 주세요.' }),
  products_seo_title: '제품 소개 | UNION DATAWARE',
  products_seo_description: 'DA#, META#, DQ#, AP#, DF#, ETT#, DP# - 데이터 거버넌스 All-in-One 솔루션 라인업',

  // Customers
  customers_hero: JSON.stringify({ title: '고객사례', desc: '3,000+ 기업이 DATAWARE를 선택했습니다.' }),
  customers_cta: JSON.stringify({ title: '도입 상담', desc: '데이터 거버넌스 전문 컨설팅을 받아보세요.' }),
  customers_seo_title: '고객사례 | UNION DATAWARE',
  customers_seo_description: 'SSG닷컴, 카카오뱅크, 아모레퍼시픽 등 3,000+ 기업이 선택한 DATAWARE 도입 사례',

  // Resources
  resources_hero: JSON.stringify({ title: '리소스', desc: '데이터 거버넌스 관련 블로그, 기술 자료, 뉴스를 확인하세요.' }),
  resources_seo_title: '리소스 | UNION DATAWARE',
  resources_seo_description: '데이터 거버넌스 관련 블로그, 기술 자료, 뉴스를 확인하세요.',

  // Notices
  notices_hero: JSON.stringify({ title: '공지사항', desc: '유니온시스템즈의 최신 소식을 전합니다.' }),
  notices_seo_title: '공지사항 | UNION DATAWARE',
  notices_seo_description: '유니온시스템즈 공지사항 및 최신 소식을 확인하세요.',

  // Docs
  docs_hero: JSON.stringify({ title: '기술 문서', desc: 'DATAWARE 솔루션 매뉴얼 및 가이드 문서입니다.' }),
  docs_seo_title: '기술 문서 | UNION DATAWARE',
  docs_seo_description: 'DATAWARE 솔루션 기술 문서, 매뉴얼, 가이드를 확인하세요.',

  // Videos
  videos_hero: JSON.stringify({ title: '교육 영상', desc: 'DATAWARE 솔루션 활용 교육 영상을 시청하세요.' }),
  videos_cta: JSON.stringify({ title: '무료 교육 신청', desc: 'DA# 온라인 무료 교육에 지금 신청하세요.' }),
  videos_seo_title: '교육 영상 | UNION DATAWARE',
  videos_seo_description: 'DATAWARE 솔루션 교육 영상 및 튜토리얼을 시청하세요.',

  // Events
  events_hero: JSON.stringify({ title: '이벤트', desc: '세미나, 컨퍼런스, 프로모션 등 이벤트 정보를 확인하세요.' }),
  events_cta: JSON.stringify({ title: '이벤트 참가 신청' }),
  events_seo_title: '이벤트 | UNION DATAWARE',
  events_seo_description: 'DATAWARE 관련 세미나, 컨퍼런스, 프로모션 등 이벤트 정보를 확인하세요.',

  // Education
  education_hero: JSON.stringify({ title: '무료교육', desc: 'DA# 데이터 모델링 도구 무료 온라인 교육 프로그램' }),
  education_benefits: JSON.stringify([
    { title: '실무 중심 교육', desc: '현장에서 바로 사용할 수 있는 실습 중심 교육 프로그램' },
    { title: '전문 강사진', desc: '데이터 모델링 전문가가 직접 진행하는 심화 교육' },
    { title: '무료 수료증 발급', desc: '교육 수료 시 공식 수료증을 발급해 드립니다' },
  ]),
  education_videos: JSON.stringify([
    { title: '새로운 시대의 데이터모델링', speaker: '이화식 대표', youtubeId: '33nGO8uZOQ8' },
    { title: 'DA#5 기본구조 및 개념', speaker: '최광희 연구원', youtubeId: 'V-8w2lXyiqY' },
    { title: '초보자도 할 수 있는 현행모델 파헤치기', speaker: '이임형 연구원', youtubeId: '1qP1zbsChQc' },
  ]),
  education_seo_title: '무료교육 | UNION DATAWARE',
  education_seo_description: 'DA# 데이터 모델링 도구 무료 온라인 교육 프로그램. 실습 중심의 교육을 제공합니다.',

  // Seminar
  seminar_hero: JSON.stringify({ title: '세미나', desc: '데이터 거버넌스 및 DATAWARE 솔루션 활용 세미나' }),
  seminar_steps: JSON.stringify({ title: '세미나 진행 순서' }),
  seminar_form: JSON.stringify({ title: '세미나 신청' }),
  seminar_seo_title: '세미나 | UNION DATAWARE',
  seminar_seo_description: '데이터 거버넌스 및 DATAWARE 솔루션 활용 세미나에 참여하세요.',

  // Download
  download_hero: JSON.stringify({ title: '소개서 다운로드', desc: 'DATAWARE 솔루션 제품 소개서를 무료로 다운로드하세요.' }),
  download_seo_title: '소개서 다운로드 | UNION DATAWARE',
  download_seo_description: 'DATAWARE 솔루션 제품 소개서를 무료로 다운로드하세요.',

  // Partner
  partner_hero: JSON.stringify({ title: '파트너', desc: '함께 성장할 비즈니스 파트너를 모집합니다.' }),
  partner_benefits: JSON.stringify({ title: '파트너 혜택' }),
  partner_cta: JSON.stringify({ title: '파트너 문의' }),
  partner_seo_title: '파트너 | UNION DATAWARE',
  partner_seo_description: 'DATAWARE 파트너 프로그램 안내. 함께 성장할 비즈니스 파트너를 모집합니다.',

  // FAQ
  faq_hero: JSON.stringify({ title: '자주 묻는 질문', desc: '라이선스, 도입 절차, 기술 지원에 대한 FAQ' }),
  faq_items: JSON.stringify([
    { q: 'DA# 개인용은 무료인가요?', a: '네, DA# 개인용 에디션은 무료로 다운로드하여 사용하실 수 있습니다.' },
    { q: '도입 컨설팅은 어떻게 받나요?', a: '도입문의 페이지에서 상담 요청을 하시면 전문 컨설턴트가 연락드립니다.' },
    { q: '클라우드 환경도 지원하나요?', a: '네, AWS, Azure, GCP 등 주요 클라우드 환경을 모두 지원합니다.' },
  ]),
  faq_cta: JSON.stringify({ title: '추가 질문이 있으신가요?', desc: '도입문의를 통해 전문 상담을 받아보세요.' }),
  faq_seo_title: '자주 묻는 질문 | UNION DATAWARE',
  faq_seo_description: 'DATAWARE 솔루션 도입, 라이선스, 기술 지원에 대한 자주 묻는 질문과 답변입니다.',

  // Contact
  contact_hero: JSON.stringify({ title: '도입문의', desc: 'DATAWARE 솔루션 도입 상담 및 견적 문의' }),
  contact_cta: JSON.stringify({ title: '빠른 상담', desc: '전화 02-706-8999 또는 이메일 ud@unionsystems.co.kr로 문의하세요.' }),
  contact_seo_title: '도입문의 | UNION DATAWARE',
  contact_seo_description: 'DATAWARE 솔루션 도입 상담 및 견적 문의. 데이터 거버넌스 전문 컨설팅을 제공합니다.',

  // About
  about_hero: JSON.stringify({ title: '회사소개', desc: '유니온시스템즈는 엔코아 DATAWARE 공식 총판으로, 데이터 거버넌스 솔루션을 제공합니다.' }),
  about_seo_title: '회사소개 | UNION DATAWARE',
  about_seo_description: '유니온시스템즈는 엔코아 DATAWARE 공식 총판으로, 데이터 거버넌스 All-in-One 솔루션을 제공합니다.',

  // Diagnosis
  diagnosis_hero: JSON.stringify({ title: '데이터 품질 진단', desc: '데이터 품질 현황을 진단하고 개선 방향을 제시합니다.' }),
  diagnosis_hero_stats: JSON.stringify([{ label: '진단 기업 수', value: '500+' }, { label: '평균 품질 향상률', value: '34%' }]),
  diagnosis_why: JSON.stringify({ title: '왜 데이터 품질 진단이 필요한가?' }),
  diagnosis_why_stats: JSON.stringify([{ label: '데이터 오류로 인한 비용', value: '연간 매출의 15~25%' }]),
  diagnosis_insight: JSON.stringify({ title: '진단 인사이트' }),
  diagnosis_insights: JSON.stringify([{ title: '표준화율', desc: '전사 데이터 표준 적용 비율을 진단합니다.' }]),
  diagnosis_service: JSON.stringify({ title: '진단 서비스' }),
  diagnosis_arch: JSON.stringify({ title: '진단 아키텍처' }),
  diagnosis_metrics: JSON.stringify([{ label: '테이블 분석', value: '1,000+' }, { label: '컬럼 분석', value: '50,000+' }]),
  diagnosis_seo_title: '데이터 품질 진단 | UNION DATAWARE',
  diagnosis_seo_description: '데이터 품질 현황을 진단하고 개선 방향을 제시하는 무료 컨설팅 서비스입니다.',

  // Pricing
  pricing_hero: JSON.stringify({ title: '가격 및 도입', desc: '합리적인 가격으로 데이터 거버넌스를 시작하세요.' }),
  pricing_hero_stats: JSON.stringify([{ label: '도입 기업', value: '3,000+' }, { label: 'GS인증', value: '1등급' }]),
  pricing_why: JSON.stringify({ title: '왜 DATAWARE인가?' }),
  pricing_why_items: JSON.stringify([{ title: '통합 라이선스', desc: '7개 솔루션을 하나의 패키지로 제공합니다.' }]),
  pricing_faq: JSON.stringify([{ q: '조달 구매가 가능한가요?', a: '네, 나라장터를 통해 조달 구매가 가능합니다.' }]),
  pricing_cta_left: JSON.stringify({ title: '견적 요청', linkUrl: '/contact' }),
  pricing_cta_right: JSON.stringify({ title: '무료 체험', linkUrl: '/download' }),
  pricing_seo_title: '가격 및 도입 | UNION DATAWARE',
  pricing_seo_description: 'DATAWARE 솔루션 라이선스 가격, 조달 정보 및 도입 절차를 안내합니다.',
};

/**
 * Helper: returns mock content filtered by the requested keys.
 */
export function getMockContent(keys: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of keys) {
    if (key in mockContent) {
      result[key] = mockContent[key];
    }
  }
  return result;
}
