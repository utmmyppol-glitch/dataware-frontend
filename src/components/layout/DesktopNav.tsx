'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { NAV_ITEMS, DATAWARE_PRODUCTS, EDUCATION_LINKS, SUPPORT_LINKS } from './header-data';

export default function DesktopNav() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const closeDropdown = () => setActiveDropdown(null);

  return (
    <ul ref={dropdownRef} className="hidden lg:flex items-center gap-6" style={{ whiteSpace: 'nowrap' }}>
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
                className="absolute top-full left-0 mt-2 overflow-hidden"
                style={{
                  width: 520,
                  backgroundColor: '#ffffff',
                  border: '1px solid #e6e8ec',
                  boxShadow: '0 12px 32px rgba(0,0,0,.10)',
                  animation: 'dropdownEnter 0.18s ease-out',
                }}
                onMouseEnter={() => handleDropdownEnter('dataware')}
                onMouseLeave={handleDropdownLeave}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr' }}>
                  <div style={{ background: '#f8f9fa', borderRight: '1px solid #e6e8ec', padding: '20px 0' }}>
                    <Link href="/products" onClick={closeDropdown}
                      style={{ display: 'block', padding: '10px 20px', fontSize: 13, fontWeight: 700, color: '#36c88a', textDecoration: 'none' }}>
                      전체보기 &rarr;
                    </Link>
                    <div style={{ margin: '8px 20px', height: 1, background: '#e6e8ec' }} />
                    <p style={{ padding: '10px 20px 6px', fontSize: 10, fontWeight: 600, color: '#98A2B3', letterSpacing: '0.08em' }}>DATA</p>
                    {DATAWARE_PRODUCTS.map(p => (
                      <Link key={p.slug} href={`/products/${p.slug}`} onClick={closeDropdown}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px', fontSize: 13, fontWeight: 600, color: '#33363b', textDecoration: 'none', transition: 'background 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#eef0f2'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                        <span style={{ width: 4, height: 4, background: p.color, flexShrink: 0 }} />
                        {p.name}
                      </Link>
                    ))}
                  </div>
                  <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 4 }}>DATAWARE&trade;</p>
                    <p style={{ fontSize: 12, color: '#888d94', marginBottom: 16 }}>데이터 거버넌스 All-in-One Package</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 'auto' }}>
                      {[
                        { label: '데이터 진단', href: '/diagnosis', desc: '거버넌스 성숙도 진단' },
                        { label: '가격안내', href: '/pricing', desc: '라이선스 비교' },
                        { label: '다운로드', href: '/download', desc: 'DA# 무료 체험' },
                      ].map((link, i) => (
                        <Link key={link.href} href={link.href} onClick={closeDropdown}
                          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 2 ? '1px solid #f0f1f3' : 'none', textDecoration: 'none', transition: 'padding-left 0.15s' }}
                          onMouseEnter={e => { e.currentTarget.style.paddingLeft = '4px'; }}
                          onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0'; }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: '#33363b' }}>{link.label}</span>
                          <span style={{ fontSize: 11, color: '#b0b4bc' }}>{link.desc}</span>
                        </Link>
                      ))}
                    </div>
                    <Link href="/contact" onClick={closeDropdown}
                      style={{ display: 'block', marginTop: 16, padding: '12px', background: '#0B1220', textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#fff', textDecoration: 'none', transition: 'background 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#36c88a'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#0B1220'; }}>
                      도입문의 &rarr;
                    </Link>
                  </div>
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
                      onClick={closeDropdown}
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
                      onClick={closeDropdown}
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
  );
}
