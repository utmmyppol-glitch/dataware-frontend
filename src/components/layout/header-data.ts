export const QUICK_LINKS = [
  { label: '다운로드 신청', href: '/download' },
  { label: '무료교육', href: '/education' },
  { label: '방문세미나', href: '/seminar' },
];

export const DATAWARE_PRODUCTS = [
  { name: 'DATAWARE', slug: 'dataware',   subtitle: 'All-in-One Package',   color: '#36c88a', isNew: false, initial: 'D' },
  { name: 'DA#',      slug: 'da-sharp',   subtitle: '데이터 모델링',         color: '#6b8cae', isNew: false, initial: 'DA' },
  { name: 'META#',    slug: 'meta-sharp', subtitle: '메타데이터 관리',       color: '#8a7cb8', isNew: true,  initial: 'M' },
  { name: 'DQ#',      slug: 'dq-sharp',  subtitle: '데이터 품질관리',       color: '#5b9a7d', isNew: true,  initial: 'DQ' },
  { name: 'AP#',      slug: 'ap-sharp',  subtitle: '애플리케이션 영향도 분석', color: '#c4975a', isNew: true,  initial: 'AP' },
  { name: 'DF#',      slug: 'df-sharp',  subtitle: '데이터 흐름 관리',     color: '#5a9aaa', isNew: true,  initial: 'DF' },
  { name: 'ETT#',     slug: 'ett-sharp', subtitle: '데이터 마이그레이션',   color: '#b07a8a', isNew: true,  initial: 'ET' },
  { name: 'DP#',      slug: 'dp-sharp',  subtitle: '데이터 포털',           color: '#b8a060', isNew: true,  initial: 'DP' },
];

export const SUPPORT_LINKS = [
  { label: '공지사항', href: '/resources/notices', desc: '최신 소식 및 업데이트' },
  { label: '다운로드 신청', href: '/download', desc: 'DA# 무료 다운로드 · 소개서' },
  { label: '데이터 진단', href: '/diagnosis', desc: '거버넌스 성숙도 진단' },
  { label: '파트너 제휴', href: '/partner', desc: '솔루션 파트너 프로그램 안내' },
];

export const EDUCATION_LINKS = [
  { label: '무료교육', href: '/education', desc: 'DA# 활용 무료 교육 신청' },
  { label: '방문 세미나', href: '/seminar', desc: '맞춤형 방문 세미나 신청' },
  { label: '동영상 강의', href: '/resources/videos', desc: '온라인 강의 · 데모 영상' },
];

export const NAV_ITEMS = [
  { label: 'DATAWARE', href: '/products', dropdownType: 'dataware' as const },
  { label: '교육', href: '/education', dropdownType: 'education' as const },
  { label: '고객지원', href: '/resources', dropdownType: 'support' as const },
  { label: '가격안내', href: '/pricing', dropdownType: null },
  { label: '고객사례', href: '/customers', dropdownType: null },
  { label: '이벤트', href: '/events', dropdownType: null },
];
