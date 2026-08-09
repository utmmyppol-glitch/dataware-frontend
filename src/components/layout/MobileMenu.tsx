'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { DATAWARE_PRODUCTS, EDUCATION_LINKS, SUPPORT_LINKS, NAV_ITEMS, QUICK_LINKS } from './header-data';
import type { SsrMenuItem } from '@/app/layout';
import { useEditMode, E } from '@/lib/editable';

interface MobileMenuProps {
  onClose: () => void;
  ssrMenu?: SsrMenuItem[] | null;
}

export default function MobileMenu({ onClose, ssrMenu }: MobileMenuProps) {
  const editMode = useEditMode();
  const [datawareOpen, setDatawareOpen] = useState(false);

  // SSR 메뉴 기반 visibility — null이면 전부 노출 (fallback)
  const visibleUrls = useMemo(() => {
    if (!ssrMenu || ssrMenu.length === 0) return null;
    return new Set(ssrMenu.map((m) => m.url));
  }, [ssrMenu]);

  const isVisible = (href: string) => visibleUrls === null || visibleUrls.has(href);

  return (
    <div
      className="md:hidden pb-4"
      style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e6e8ec' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 space-y-1">
        {/* DATAWARE accordion */}
        {isVisible('/products') && <div>
          <button
            onClick={() => setDatawareOpen(!datawareOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-lg transition-colors"
            style={{ color: datawareOpen ? '#36c88a' : '#33363b' }}
          >
            <E id="mobilemenu_dataware.title" editMode={editMode}>DATAWARE</E>
            <svg
              className="w-4 h-4 transition-transform"
              style={{ transform: datawareOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {datawareOpen && (
            <div
              className="ml-4 mt-1 space-y-1 pl-4"
              style={{ borderLeft: '2px solid #e6e8ec' }}
            >
              <p className="text-xs font-bold mt-1 mb-1 px-3" style={{ color: '#94a3b8', letterSpacing: '0.08em' }}><E id="mobilemenu_dataware.section_label" editMode={editMode}>DATA</E></p>
              {DATAWARE_PRODUCTS.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  onClick={() => { onClose(); setDatawareOpen(false); }}
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
        </div>}

        {/* Education */}
        {isVisible('/education') && (
        <div className="px-4 py-2">
          <p className="text-xs font-bold mb-2" style={{ color: '#94a3b8' }}><E id="mobilemenu_education.title" editMode={editMode}>교육</E></p>
          {EDUCATION_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={onClose}
              className="block px-3 py-2 text-sm font-semibold rounded-lg transition-colors"
              style={{ color: '#33363b' }}
            >{link.label}</Link>
          ))}
        </div>
        )}

        {/* Support */}
        {isVisible('/resources') && (
        <div className="px-4 py-2">
          <p className="text-xs font-bold mb-2" style={{ color: '#94a3b8' }}><E id="mobilemenu_support.title" editMode={editMode}>고객지원</E></p>
          {SUPPORT_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={onClose}
              className="block px-3 py-2 text-sm font-semibold rounded-lg transition-colors"
              style={{ color: '#33363b' }}
            >{link.label}</Link>
          ))}
        </div>
        )}

        {/* Standalone items */}
        {NAV_ITEMS.filter((i) => !i.dropdownType && isVisible(i.href)).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="block px-4 py-3 text-sm font-semibold rounded-lg transition-colors"
            style={{ color: '#33363b' }}
          >
            {item.label}
          </Link>
        ))}

        <Link
          href="/contact"
          onClick={onClose}
          className="block text-center mt-2 text-sm font-semibold text-white px-4 py-3 transition-all"
          style={{
            backgroundColor: '#36c88a',
            borderRadius: '4px',
            boxShadow: '0 6px 18px rgba(54,200,138,.28)',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#2ba876'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#36c88a'; }}
        >
          <E id="mobilemenu_cta.contact" editMode={editMode}>도입문의</E>
        </Link>
      </div>

      {/* Quick links */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 pt-4"
        style={{ borderTop: '1px solid #e6e8ec' }}
      >
        <p className="text-xs mb-2 px-4" style={{ color: '#888d94' }}><E id="mobilemenu_quick.title" editMode={editMode}>빠른 링크</E></p>
        <div className="grid grid-cols-2 gap-1">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
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
  );
}
