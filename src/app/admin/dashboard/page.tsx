'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/adminApi';

interface StatCard {
  label: string;
  value: number | null;
  icon: string;
  color: string;
  href: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<{
    inquiries: number | null;
    educations: number | null;
    seminars: number | null;
    downloads: number | null;
    products: number | null;
  }>({
    inquiries: null,
    educations: null,
    seminars: null,
    downloads: null,
    products: null,
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const results = await Promise.allSettled([
        adminApi.getInquiries(0, 1),
        adminApi.getEducations(0, 1),
        adminApi.getSeminars(0, 1),
        adminApi.getDownloads(0, 1),
        adminApi.getProducts(),
      ]);

      const errs: string[] = [];

      const inquiries =
        results[0].status === 'fulfilled' ? results[0].value.totalElements : null;
      const educations =
        results[1].status === 'fulfilled' ? results[1].value.totalElements : null;
      const seminars =
        results[2].status === 'fulfilled' ? results[2].value.totalElements : null;
      const downloads =
        results[3].status === 'fulfilled' ? results[3].value.totalElements : null;
      const products =
        results[4].status === 'fulfilled' ? results[4].value.length : null;

      results.forEach((r, i) => {
        if (r.status === 'rejected') {
          errs.push(`통계 로딩 실패 (${i + 1}번째): ${r.reason?.message ?? '알 수 없는 오류'}`);
        }
      });

      setStats({ inquiries, educations, seminars, downloads, products });
      setErrors(errs);
      setLoading(false);
    };

    fetchStats();
  }, []);

  const cards: StatCard[] = [
    {
      label: '신규 문의',
      value: stats.inquiries,
      icon: '📬',
      color: 'from-blue-600/20 to-blue-700/10 border-blue-600/30',
      href: '/admin/inquiries',
    },
    {
      label: '교육 신청',
      value: stats.educations,
      icon: '🎓',
      color: 'from-purple-600/20 to-purple-700/10 border-purple-600/30',
      href: '/admin/educations',
    },
    {
      label: '세미나 신청',
      value: stats.seminars,
      icon: '📅',
      color: 'from-teal-600/20 to-teal-700/10 border-teal-600/30',
      href: '/admin/seminars',
    },
    {
      label: '다운로드 신청',
      value: stats.downloads,
      icon: '📥',
      color: 'from-cyan-600/20 to-cyan-700/10 border-cyan-600/30',
      href: '/admin/downloads',
    },
    {
      label: '등록 제품 수',
      value: stats.products,
      icon: '📦',
      color: 'from-orange-600/20 to-orange-700/10 border-orange-600/30',
      href: '/admin/products',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-white">대시보드</h1>
        <p className="text-slate-400 text-sm mt-1">전체 현황을 한 눈에 확인하세요.</p>
      </div>

      {/* Error alerts */}
      {errors.length > 0 && (
        <div className="space-y-2">
          {errors.map((err, i) => (
            <div
              key={i}
              className="bg-red-900/20 border border-red-700/40 text-red-400 text-sm px-4 py-3 rounded-lg"
            >
              {err}
            </div>
          ))}
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            className={`bg-gradient-to-br ${card.color} border rounded-2xl p-6 block hover:scale-[1.02] transition-transform`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm">{card.label}</p>
                {loading ? (
                  <div className="mt-2 h-9 w-20 bg-slate-700 rounded animate-pulse" />
                ) : (
                  <p className="text-white text-4xl font-bold mt-1">
                    {card.value ?? '–'}
                  </p>
                )}
              </div>
              <span className="text-3xl opacity-80">{card.icon}</span>
            </div>
            <p className="text-slate-500 text-xs mt-4">자세히 보기 →</p>
          </a>
        ))}
      </div>

      {/* Quick links */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-4">빠른 이동</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: '/admin/inquiries', label: '문의관리', icon: '📬' },
            { href: '/admin/downloads', label: '다운로드관리', icon: '📥' },
            { href: '/admin/educations', label: '교육관리', icon: '🎓' },
            { href: '/admin/seminars', label: '세미나관리', icon: '📅' },
            { href: '/admin/products', label: '제품관리', icon: '📦' },
            { href: '/admin/posts', label: '게시글관리', icon: '📝' },
            { href: '/admin/banners', label: '배너관리', icon: '🖼️' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-300 hover:text-white transition-colors"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
