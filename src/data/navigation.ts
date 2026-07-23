/**
 * 네비게이션 데이터 — 원본 uniondata.co.kr GNB 구조
 */

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

/* ─── GNB 메뉴 구조 ─── */
export const GNB_MENU: NavItem[] = [
  {
    label: '제품소개',
    href: '/products',
    children: [
      { label: 'DA#', href: '/products/da-shop' },
      { label: 'DA# 통합 패키지', href: '/products/da-shop-total-package' },
    ],
  },
  { label: '가격안내', href: '/pricing' },
  { label: '고객사례', href: '/customers' },
  {
    label: '자료실',
    href: '/resources',
    children: [
      { label: '공지사항', href: '/resources/notices' },
      { label: '다운로드 신청', href: '/download' },
      { label: '무료교육', href: '/education' },
      { label: '방문 세미나', href: '/seminar' },
      { label: '동영상 강의', href: '/resources/videos' },
    ],
  },
  { label: '이벤트', href: '/events' },
  { label: '도입문의', href: '/contact' },
];

/* ─── 상단 퀵 메뉴 (CTA 바) ─── */
export const QUICK_MENU = [
  { label: '무료교육신청', href: '/education' },
  { label: '방문세미나', href: '/seminar' },
  { label: '다운로드 신청', href: '/download' },
  { label: '도입문의', href: '/contact' },
];

/* ─── 플로팅 퀵 메뉴 (사이드바 아이콘) ─── */
export const FLOATING_QUICK_MENU = [
  { label: '다운로드 신청', href: '/download', iconKey: 'download' as const },
  { label: '무료교육신청', href: '/education', iconKey: 'education' as const },
  { label: '방문세미나', href: '/seminar', iconKey: 'seminar' as const },
];

/* ─── 하단 고정 CTA ─── */
export const BOTTOM_CTA = {
  label: '도입문의',
  href: '/contact',
};
