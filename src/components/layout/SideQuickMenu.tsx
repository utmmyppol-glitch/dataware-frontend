'use client';

import Link from 'next/link';

const SIDE_ITEMS = [
  { label: '다운로드\n신청', href: '/download', bg: '#475467' },
  { label: '무료교육\n신청', href: '/education', bg: '#475467' },
  { label: '방문\n세미나', href: '/seminar', bg: '#475467' },
  { label: '도입문의', href: '/contact', bg: '#101828' },
];

export default function SideQuickMenu() {
  return (
    <div className="fixed right-0 top-1/2 z-50 hidden lg:flex flex-col" style={{ transform: 'translateY(-50%)' }}>
      {SIDE_ITEMS.map((item, i) => (
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
  );
}
