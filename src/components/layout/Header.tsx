'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import SearchOverlay from './SearchOverlay';

/* ── Data ─────────────────────────────────── */

const QUICK_LINKS = [
  { label: '다운로드 신청', href: '/download' },
  { label: '무료교육', href: '/education' },
  { label: '방문세미나', href: '/seminar' },
];

const DATAWARE_PRODUCTS = [
  { name: 'DATAWARE', slug: 'dataware',   subtitle: 'All-in-One Package',   color: '#36c88a', isNew: false, initial: 'D' },
  { name: 'DA#',      slug: 'da-sharp',   subtitle: '데이터 모델링',         color: '#6b8cae', isNew: false, initial: 'DA' },
  { name: 'META#',    slug: 'meta-sharp', subtitle: '메타데이터 관리',       color: '#8a7cb8', isNew: true,  initial: 'M' },
  { name: 'DQ#',      slug: 'dq-sharp',  subtitle: '데이터 품질관리',       color: '#5b9a7d', isNew: true,  initial: 'DQ' },
  { name: 'AP#',      slug: 'ap-sharp',  subtitle: '애플리케이션 영향도 분석', color: '#c4975a', isNew: true,  initial: 'AP' },
  { name: 'DF#',      slug: 'df-sharp',  subtitle: '데이터 흐름 관리',     color: '#5a9aaa', isNew: true,  initial: 'DF' },
  { name: 'ETT#',     slug: 'ett-sharp', subtitle: '데이터 마이그레이션',   color: '#b07a8a', isNew: true,  initial: 'ET' },
  { name: 'DP#',      slug: 'dp-sharp',  subtitle: '데이터 포털',           color: '#b8a060', isNew: true,  initial: 'DP' },
];

const SUPPORT_LINKS = [
  { label: '공지사항', href: '/resources/notices', desc: '최신 소식 및 업데이트' },
  { label: '다운로드 신청', href: '/download', desc: 'DA# 무료 다운로드 · 소개서' },
];

const EDUCATION_LINKS = [
  { label: '무료교육', href: '/education', desc: 'DA# 활용 무료 교육 신청' },
  { label: '방문 세미나', href: '/seminar', desc: '맞춤형 방문 세미나 신청' },
  { label: '동영상 강의', href: '/resources/videos', desc: '온라인 강의 · 데모 영상' },
];

const NAV_ITEMS = [
  { label: 'DATAWARE', href: '/products', dropdownType: 'dataware' as const },
  { label: '데이터 진단', href: '/diagnosis', dropdownType: null },
  { label: '가격안내', href: '/pricing', dropdownType: null },
  { label: '고객사례', href: '/customers', dropdownType: null },
  { label: '교육', href: '/education', dropdownType: 'education' as const },
  { label: '고객지원', href: '/resources', dropdownType: 'support' as const },
  { label: '이벤트', href: '/events', dropdownType: null },
];

/* ── Component ────────────────────────────── */

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDatawareOpen, setMobileDatawareOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Legacy alias for existing code
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dropdownOpen = activeDropdown === 'dataware';
  const setDropdownOpen = (v: boolean | ((p: boolean) => boolean)) => {
    const next = typeof v === 'function' ? v(activeDropdown === 'dataware') : v;
    setActiveDropdown(next ? 'dataware' : null);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownEnter = (type: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveDropdown(type);
  };

  const handleDropdownLeave = () => {
    timerRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const handleMouseEnter = () => handleDropdownEnter('dataware');
  const handleMouseLeave = () => handleDropdownLeave();


  return (
    <>
    {/* ── Side Quick Menu (우측 고정) ── */}
    <div className="fixed right-0 top-1/2 z-50 hidden lg:flex flex-col" style={{ transform: 'translateY(-50%)' }}>
      {[
        { label: '다운로드\n신청', href: '/download', bg: '#475467' },
        { label: '무료교육\n신청', href: '/education', bg: '#475467' },
        { label: '방문\n세미나', href: '/seminar', bg: '#475467' },
        { label: '도입문의', href: '/contact', bg: '#101828' },
      ].map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center justify-center text-center text-white transition-all"
          style={{
            width: '72px', height: '72px', backgroundColor: item.bg,
            textDecoration: 'none', fontSize: '11px', fontWeight: 600,
            lineHeight: 1.25, whiteSpace: 'pre-line',
            borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            transition: 'transform 0.2s cubic-bezier(0.22,1,0.36,1), background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(-12px)'; e.currentTarget.style.backgroundColor = '#36c88a'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.backgroundColor = item.bg; }}
        >
          {item.label}
        </Link>
      ))}
    </div>

    <header
      className="sticky top-0 z-50"
      style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}
    >

      {/* Top Quick-Link Bar 제거 */}

      {/* ── Main Navigation ── */}
      <nav style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e6e8ec' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[68px]">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/dataware-logo.png"
              alt="DATAWARE™"
              width={160}
              height={32}
              priority
              style={{ height: 'auto' }}
            />
          </Link>

          {/* Desktop Nav */}
          <ul ref={dropdownRef} className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) =>
              item.dropdownType ? (
                <li key={item.href} className="relative">
                  <button
                    onMouseEnter={() => handleDropdownEnter(item.dropdownType!)}
                    onMouseLeave={handleDropdownLeave}
                    onClick={() => setActiveDropdown(activeDropdown === item.dropdownType ? null : item.dropdownType)}
                    className="flex items-center gap-1 text-[15px] font-semibold px-5 py-2 transition-colors duration-150"
                    style={{
                      color: activeDropdown === item.dropdownType ? '#36c88a' : '#33363b',
                      borderBottom: activeDropdown === item.dropdownType ? '2px solid #36c88a' : '2px solid transparent',
                    }}
                  >
                    {item.label}
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-200"
                      style={{ transform: activeDropdown === item.dropdownType ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* DATAWARE Dropdown */}
                  {activeDropdown === 'dataware' && item.dropdownType === 'dataware' && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[700px] overflow-hidden"
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e6e8ec',
                        boxShadow: '0 12px 32px rgba(0,0,0,.10)',
                        borderRadius: '0',
                        animation: 'dropdownEnter 0.18s ease-out',
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Dropdown header */}
                      <div
                        className="px-6 py-4 flex items-center justify-between"
                        style={{ borderBottom: '1px solid #e6e8ec' }}
                      >
                        <div>
                          <p className="font-bold text-sm" style={{ color: '#111111' }}>DATAWARE 제품 라인업</p>
                          <p className="text-xs mt-0.5" style={{ color: '#888d94' }}>데이터 거버넌스 All-in-One Package</p>
                        </div>
                        <Link
                          href="/products"
                          onClick={() => setDropdownOpen(false)}
                          className="text-xs flex items-center gap-1 transition-colors"
                          style={{ color: '#36c88a' }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#2ba876'; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#36c88a'; }}
                        >
                          전체보기
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>

                      {/* Product grid */}
                      <div className="grid grid-cols-2 gap-1 p-4">
                        {DATAWARE_PRODUCTS.map((product) => (
                          <Link
                            key={product.slug}
                            href={`/products/${product.slug}`}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 transition-colors duration-150 group"
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f6f8fa')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            {/* Letter-initial badge */}
                            <span
                              className="w-9 h-9 flex items-center justify-center shrink-0 font-bold"
                              style={{
                                color: product.color,
                                backgroundColor: product.color + '18',
                                fontSize: product.initial.length > 1 ? '10px' : '14px',
                                letterSpacing: product.initial.length > 1 ? '-0.5px' : '0',
                              }}
                            >
                              {product.initial}
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold" style={{ color: '#111111' }}>
                                  {product.name}
                                </span>
                              </div>
                              <p className="text-xs truncate mt-0.5" style={{ color: '#888d94' }}>{product.subtitle}</p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* CTA footer — prominent */}
                      <div
                        className="mx-4 mb-4 px-5 py-4 flex items-center justify-between"
                        style={{
                          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
                          border: '1px solid rgba(54,200,138,.25)',
                        }}
                      >
                        <div>
                          <p className="text-sm font-bold" style={{ color: '#ffffff' }}>DA# 무료 체험하기</p>
                          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>개인용 DA# 무료 다운로드 · 설치 즉시 사용</p>
                        </div>
                        <Link
                          href="/download"
                          onClick={() => setDropdownOpen(false)}
                          className="text-sm font-bold text-white px-5 py-2.5 transition-all shrink-0"
                          style={{
                            backgroundColor: '#36c88a',
                            boxShadow: '0 6px 18px rgba(54,200,138,.35)',
                          }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#2ba876'; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#36c88a'; }}
                        >
                          무료 다운로드
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Education Dropdown */}
                  {activeDropdown === 'education' && item.dropdownType === 'education' && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[380px] overflow-hidden"
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e6e8ec',
                        boxShadow: '0 8px 24px rgba(0,0,0,.08)',
                        borderRadius: '0',
                        animation: 'dropdownEnter 0.18s ease-out',
                      }}
                      onMouseEnter={() => handleDropdownEnter('education')}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <div className="px-5 py-3" style={{ borderBottom: '1px solid #e6e8ec' }}>
                        <p className="font-bold text-sm" style={{ color: '#111111' }}>교육</p>
                      </div>
                      <div className="py-2">
                        {EDUCATION_LINKS.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-3 px-5 py-3 transition-colors duration-150"
                            style={{ textDecoration: 'none' }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f6f8fa')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <div>
                              <p className="text-sm font-semibold" style={{ color: '#111111' }}>{link.label}</p>
                              <p className="text-xs" style={{ color: '#888d94' }}>{link.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Support Dropdown */}
                  {activeDropdown === 'support' && item.dropdownType === 'support' && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[380px] overflow-hidden"
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e6e8ec',
                        boxShadow: '0 8px 24px rgba(0,0,0,.08)',
                        borderRadius: '0',
                        animation: 'dropdownEnter 0.18s ease-out',
                      }}
                      onMouseEnter={() => handleDropdownEnter('support')}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <div className="px-5 py-3" style={{ borderBottom: '1px solid #e6e8ec' }}>
                        <p className="font-bold text-sm" style={{ color: '#111111' }}>고객지원</p>
                      </div>
                      <div className="py-2">
                        {SUPPORT_LINKS.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-3 px-5 py-3 transition-colors duration-150"
                            style={{ textDecoration: 'none' }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f6f8fa')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <div>
                              <p className="text-sm font-semibold" style={{ color: '#111111' }}>{link.label}</p>
                              <p className="text-xs" style={{ color: '#888d94' }}>{link.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[15px] font-semibold px-5 py-2 transition-colors duration-150 block"
                    style={{ color: '#33363b', borderBottom: '2px solid transparent' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = '#36c88a';
                      (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = '#36c88a';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = '#33363b';
                      (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'transparent';
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Right: Search + CTA + Mobile toggle */}
          <div className="flex items-center gap-6">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center justify-center w-9 h-9 mr-2 rounded-lg transition-colors"
              style={{ color: '#888d94' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#36c88a'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#888d94'; }}
              aria-label="검색"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-2 text-[15px] font-semibold text-white transition-all duration-200"
              style={{
                backgroundColor: '#36c88a',
                borderRadius: '4px',
                padding: '11px 28px',
                boxShadow: '0 6px 18px rgba(54,200,138,.28)',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#2ba876'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#36c88a'; }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              도입문의
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: '#33363b' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="메뉴 열기"
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#36c88a'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#33363b'; }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ── Search Overlay ── */}
        <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

        {/* Dropdown animation keyframes */}
        <style>{`
          @keyframes dropdownEnter {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* ── Mobile Menu ── */}
        {mobileMenuOpen && (
          <div
            className="md:hidden pb-4"
            style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e6e8ec' }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 space-y-1">
              {/* DATAWARE with accordion */}
              <div>
                <button
                  onClick={() => setMobileDatawareOpen(!mobileDatawareOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-lg transition-colors"
                  style={{ color: mobileDatawareOpen ? '#36c88a' : '#33363b' }}
                >
                  DATAWARE
                  <svg
                    className="w-4 h-4 transition-transform"
                    style={{ transform: mobileDatawareOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {mobileDatawareOpen && (
                  <div
                    className="ml-4 mt-1 space-y-1 pl-4"
                    style={{ borderLeft: '2px solid #e6e8ec' }}
                  >
                    {DATAWARE_PRODUCTS.map((product) => (
                      <Link
                        key={product.slug}
                        href={`/products/${product.slug}`}
                        onClick={() => { setMobileMenuOpen(false); setMobileDatawareOpen(false); }}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors"
                        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#f6f8fa'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'; }}
                      >
                        <span
                          className="w-7 h-7 flex items-center justify-center font-bold shrink-0"
                          style={{
                            color: product.color,
                            backgroundColor: product.color + '18',
                            fontSize: product.initial.length > 1 ? '9px' : '13px',
                            letterSpacing: product.initial.length > 1 ? '-0.5px' : '0',
                          }}
                        >
                          {product.initial}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold" style={{ color: '#111111' }}>{product.name}</span>
                          <span className="text-xs" style={{ color: '#888d94' }}>{product.subtitle}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* 교육 */}
              <div className="px-4 py-2">
                <p className="text-xs font-bold mb-2" style={{ color: '#94a3b8' }}>교육</p>
                {EDUCATION_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-semibold rounded-lg transition-colors"
                    style={{ color: '#33363b' }}
                  >{link.label}</Link>
                ))}
              </div>
              {/* 고객지원 */}
              <div className="px-4 py-2">
                <p className="text-xs font-bold mb-2" style={{ color: '#94a3b8' }}>고객지원</p>
                {SUPPORT_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-semibold rounded-lg transition-colors"
                    style={{ color: '#33363b' }}
                  >{link.label}</Link>
                ))}
              </div>
              {/* 나머지 단독 메뉴 */}
              {NAV_ITEMS.filter((i) => !i.dropdownType).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold rounded-lg transition-colors"
                  style={{ color: '#33363b' }}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center mt-2 text-sm font-semibold text-white px-4 py-3 transition-all"
                style={{
                  backgroundColor: '#36c88a',
                  borderRadius: '4px',
                  boxShadow: '0 6px 18px rgba(54,200,138,.28)',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#2ba876'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#36c88a'; }}
              >
                도입문의
              </Link>
            </div>

            {/* Mobile quick links */}
            <div
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 pt-4"
              style={{ borderTop: '1px solid #e6e8ec' }}
            >
              <p className="text-xs mb-2 px-4" style={{ color: '#888d94' }}>빠른 링크</p>
              <div className="grid grid-cols-2 gap-1">
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs rounded-lg transition-colors"
                    style={{ color: '#888d94' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#36c88a'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#888d94'; }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
    </>
  );
}
