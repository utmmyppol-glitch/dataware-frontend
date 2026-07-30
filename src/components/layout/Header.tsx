'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import SearchOverlay from './SearchOverlay';
import SideQuickMenu from './SideQuickMenu';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';

export default function Header({ ssrVisibleUrls }: { ssrVisibleUrls?: string[] | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <SideQuickMenu />

      <header
        className="sticky top-0 z-50"
        style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}
      >
        <nav style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e6e8ec' }}>
          <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0" style={{ marginRight: 48 }}>
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
            <DesktopNav ssrVisibleUrls={ssrVisibleUrls} />

            {/* Right: CTA + Search + Mobile toggle */}
            <div className="flex items-center gap-4" style={{ marginLeft: 48 }}>
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

              {/* Search toggle */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
                style={{ color: '#888d94' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#36c88a'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#888d94'; }}
                aria-label="검색"
              >
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

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

          <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

          <style>{`
            @keyframes dropdownEnter {
              from { opacity: 0; transform: translateY(-8px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          {mobileMenuOpen && <MobileMenu onClose={() => setMobileMenuOpen(false)} />}
        </nav>
      </header>
    </>
  );
}
