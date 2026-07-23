'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { hasCredentials, clearCredentials } from '@/lib/adminApi';

const NAV_ITEMS = [
  { href: '/admin/dashboard',  label: '대시보드',       icon: '📊' },
  { href: '/admin/inquiries',  label: '문의관리',       icon: '📬' },
  { href: '/admin/downloads',  label: '다운로드관리',   icon: '📥' },
  { href: '/admin/educations', label: '교육신청',       icon: '🎓' },
  { href: '/admin/seminars',   label: '세미나신청',     icon: '📅' },
  { href: '/admin/products',   label: '제품관리',       icon: '📦' },
  { href: '/admin/posts',      label: '게시글관리',     icon: '📝' },
  { href: '/admin/banners',    label: '배너관리',       icon: '🖼️' },
  { href: '/admin/stories',    label: '고객사례관리',   icon: '🏢' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Login page doesn't need auth check
    if (pathname === '/admin') {
      setReady(true);
      return;
    }
    if (!hasCredentials()) {
      router.replace('/admin');
      return;
    }
    setReady(true);
  }, [pathname, router]);

  const handleLogout = () => {
    clearCredentials();
    router.push('/admin');
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400 text-sm">로딩 중…</div>
      </div>
    );
  }

  // Login page — render without sidebar
  if (pathname === '/admin') {
    return (
      <div className="min-h-screen bg-slate-950">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-700 z-30 flex flex-col
          transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:static lg:translate-x-0 lg:flex`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-slate-700">
          <div className="text-white font-bold text-lg leading-tight">
            UNION DATAWARE
          </div>
          <div className="text-slate-400 text-xs mt-0.5">관리자 백오피스</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors
                  ${active
                    ? 'bg-blue-600/20 text-blue-400 border-r-2 border-blue-500'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-red-900/30 hover:text-red-400 transition-colors"
          >
            <span>🚪</span>
            <span>로그아웃</span>
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="lg:hidden flex items-center gap-4 px-4 py-3 bg-slate-900 border-b border-slate-700">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-400 hover:text-white p-1"
            aria-label="메뉴 열기"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-white text-sm font-medium">UNION DATAWARE 관리자</span>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
