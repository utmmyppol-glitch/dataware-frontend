export interface EducationSession {
  id: number;
  title: string;
  date: string;
  thumbnail: string;
  tag: string;
  status: string;
  desc: string;
  content: string;
  curriculum: string[];
  target: string[];
  location: string;
  price: string;
  detailImages: string[];
}

/**
 * 교육 날짜 문자열에서 Date 객체 추출
 * "2026.06.24(Wed) 13:00~17:00" → 2026-06-24
 */
function parseEducationDate(dateStr: string): Date | null {
  const match = dateStr.match(/^(\d{4})\.(\d{2})\.(\d{2})/);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

/**
 * 교육 날짜가 오늘 이전이면 자동으로 '마감' 처리
 */
export function getSessionStatus(session: EducationSession): string {
  if (session.status === '마감') return '마감';
  const d = parseEducationDate(session.date);
  if (!d) return session.status;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d < today ? '마감' : '신청가능';
}

export const EDUCATION_SESSIONS: EducationSession[] = [
  {
    id: 1, title: '2026 DA# 실전 데이터모델링 (3월)', date: '2026.03.20(Thu) 09:30~17:00',
    thumbnail: '/images/uniondata/2026DA_head-1.png', tag: '실전', status: '신청가능',
    desc: '데이터 아키텍처 기본개념부터 고급 활용까지 1DAY',
    content: 'DA#을 활용한 데이터 모델링의 기본 개념부터 실무 활용까지 하루 만에 마스터할 수 있는 교육 과정입니다.',
    curriculum: ['데이터 아키텍처 기본 개념', '논리/물리 모델 설계 실습', 'DA# 주요 기능 활용', '팀 모델링 및 Repository 활용', '산출물 생성 및 활용'],
    target: ['데이터 모델링 입문자', 'DA# 신규 사용자', '데이터 아키텍트 지망생'],
    location: '온라인 (Zoom)', price: '무료',
    detailImages: ['/images/uniondata/2026DA_detail-1.png', '/images/uniondata/2026DA_detail-2.png', '/images/uniondata/2026DA_detail-3.png'],
  },
  {
    id: 2, title: '2026 DA# 실전 데이터모델링 (4월)', date: '2026.04.17(Thu) 09:30~17:00',
    thumbnail: '/images/uniondata/2026DA_head-2.png', tag: '실전', status: '신청가능',
    desc: '데이터 아키텍처 기본개념부터 고급 활용까지 1DAY',
    content: 'DA#을 활용한 데이터 모델링의 기본 개념부터 실무 활용까지 하루 만에 마스터할 수 있는 교육 과정입니다.',
    curriculum: ['데이터 아키텍처 기본 개념', '논리/물리 모델 설계 실습', 'DA# 주요 기능 활용', '팀 모델링 및 Repository 활용', '산출물 생성 및 활용'],
    target: ['데이터 모델링 입문자', 'DA# 신규 사용자', '데이터 아키텍트 지망생'],
    location: '온라인 (Zoom)', price: '무료',
    detailImages: ['/images/uniondata/2026DA_detail-1.png', '/images/uniondata/2026DA_detail-2.png', '/images/uniondata/2026DA_detail-3.png'],
  },
  {
    id: 3, title: '2026 DA# 실전 데이터모델링 (6월)', date: '2026.06.19(Thu) 09:30~17:00',
    thumbnail: '/images/uniondata/2026DA_head-3.png', tag: '실전', status: '신청가능',
    desc: '데이터 아키텍처 기본개념부터 고급 활용까지 1DAY',
    content: 'DA#을 활용한 데이터 모델링의 기본 개념부터 실무 활용까지 하루 만에 마스터할 수 있는 교육 과정입니다.',
    curriculum: ['데이터 아키텍처 기본 개념', '논리/물리 모델 설계 실습', 'DA# 주요 기능 활용', '팀 모델링 및 Repository 활용', '산출물 생성 및 활용'],
    target: ['데이터 모델링 입문자', 'DA# 신규 사용자', '데이터 아키텍트 지망생'],
    location: '온라인 (Zoom)', price: '무료',
    detailImages: ['/images/uniondata/2026DA_detail-1.png', '/images/uniondata/2026DA_detail-2.png', '/images/uniondata/2026DA_detail-3.png'],
  },
  {
    id: 4, title: '2026 홍우석의 실전데이터모델링 (6월)', date: '2026.06.24(Wed) 13:00~17:00',
    thumbnail: '/images/uniondata/2606%ED%99%8D%EC%9A%B0%EC%84%9D%EC%9D%98-%EC%8B%A4%EC%A0%84%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%AA%A8%EB%8D%B8%EB%A7%81_head.png',
    tag: '특강', status: '신청가능',
    desc: '현장에서 사용하는 실전 데이터 모델링 노하우',
    content: '데이터 모델링 전문가 홍우석 강사의 실전 데이터 모델링 특강입니다. 현장에서 바로 적용할 수 있는 모델링 기법과 DA# & META# 활용 노하우를 전수합니다.',
    curriculum: ['실전 데이터 모델링 방법론', '현행 모델 분석 및 개선 기법', 'DA# & META# 고급 활용', '사례 기반 모델링 실습'],
    target: ['데이터 모델링 실무자', '현행화 프로젝트 담당자', 'DA# 중급 이상 사용자'],
    location: '온라인 (Zoom)', price: '무료',
    detailImages: ['/images/uniondata/2606-hongwoseok-detail-1.png', '/images/uniondata/hongwoseok-detail-2.png'],
  },
  {
    id: 5, title: '2026 홍우석의 실전데이터모델링 (4월)', date: '2026.04.24(Thu) 13:00~17:00',
    thumbnail: '/images/uniondata/260424-%EC%8B%A4%EC%A0%84%EB%8D%B0%EB%AA%A8_head.png',
    tag: '특강', status: '마감',
    desc: '현장에서 사용하는 실전 데이터 모델링 노하우',
    content: '데이터 모델링 전문가 홍우석 강사의 실전 데이터 모델링 특강입니다.',
    curriculum: ['실전 데이터 모델링 방법론', '현행 모델 분석 및 개선 기법', 'DA# & META# 고급 활용'],
    target: ['데이터 모델링 실무자'],
    location: '온라인 (Zoom)', price: '무료',
    detailImages: ['/images/uniondata/260424-hongwoseok-detail-1.png', '/images/uniondata/260424-hongwoseok-detail-2.png'],
  },
  {
    id: 6, title: '2025 DA# 실전 데이터모델링 (11월)', date: '2025.11.20(Thu) 09:30~17:00',
    thumbnail: '/images/uniondata/202511DA__head.png', tag: '실전', status: '마감',
    desc: '데이터 아키텍처 기본개념부터 고급 활용까지 1DAY',
    content: 'DA#을 활용한 데이터 모델링 교육 과정입니다.',
    curriculum: ['데이터 아키텍처 기본 개념', '논리/물리 모델 설계 실습', 'DA# 주요 기능 활용'],
    target: ['데이터 모델링 입문자'],
    location: '온라인 (Zoom)', price: '무료',
    detailImages: ['/images/uniondata/202511DA__detail.png'],
  },
  {
    id: 7, title: '2025 DA# 실전 데이터모델링 (9월)', date: '2025.09.18(Thu) 09:30~17:00',
    thumbnail: '/images/uniondata/202509DA__head.png', tag: '실전', status: '마감',
    desc: '데이터 아키텍처 기본개념부터 고급 활용까지 1DAY',
    content: 'DA#을 활용한 데이터 모델링 교육 과정입니다.',
    curriculum: ['데이터 아키텍처 기본 개념', '논리/물리 모델 설계 실습', 'DA# 주요 기능 활용'],
    target: ['데이터 모델링 입문자'],
    location: '온라인 (Zoom)', price: '무료',
    detailImages: ['/images/uniondata/202509DA__detail.png'],
  },
  {
    id: 8, title: '2025 데모클 데이터모델링 (11월)', date: '2025.11.14(Fri) 14:00~16:00',
    thumbnail: '/images/uniondata/20251114_%EB%8D%B0%EB%AA%A8%ED%81%B4-head.png', tag: '데모클', status: '마감',
    desc: 'DA# 데모 클래스 온라인 세션',
    content: 'DA#의 주요 기능을 라이브 데모로 확인하는 온라인 세션입니다.',
    curriculum: ['DA# 주요 기능 라이브 데모', '실시간 Q&A'],
    target: ['DA# 도입 검토 중인 분'],
    location: '온라인 (Zoom)', price: '무료',
    detailImages: ['/images/uniondata/20251114_데모클-detail-1.png', '/images/uniondata/20251114_데모클-detail-2.png'],
  },
  {
    id: 9, title: '2025 데모클 데이터모델링 (10월)', date: '2025.10.17(Fri) 14:00~16:00',
    thumbnail: '/images/uniondata/20251017_%EB%8D%B0%EB%AA%A8%ED%81%B4-head-1.png', tag: '데모클', status: '마감',
    desc: 'DA# 데모 클래스 온라인 세션',
    content: 'DA#의 주요 기능을 라이브 데모로 확인하는 온라인 세션입니다.',
    curriculum: ['DA# 주요 기능 라이브 데모', '실시간 Q&A'],
    target: ['DA# 도입 검토 중인 분'],
    location: '온라인 (Zoom)', price: '무료',
    detailImages: ['/images/uniondata/20251017-데모클-detail-1.png', '/images/uniondata/20251017-데모클-detail-2.png'],
  },
  {
    id: 10, title: '2024 DA# 실전 데이터모델링', date: '2024.10.24(Thu) 09:30~17:00',
    thumbnail: '/images/uniondata/2024DA__head-001-2-1.png', tag: '실전', status: '마감',
    desc: '데이터 아키텍처 기본개념부터 고급 활용까지 1DAY',
    content: 'DA#을 활용한 데이터 모델링 교육 과정입니다.',
    curriculum: ['데이터 아키텍처 기본 개념', '논리/물리 모델 설계 실습', 'DA# 주요 기능 활용'],
    target: ['데이터 모델링 입문자'],
    location: '온라인 (Zoom)', price: '무료',
    detailImages: ['/images/uniondata/2024DA__detail-001-1.png', '/images/uniondata/2024DA__커리큘럼-001.png'],
  },
];
