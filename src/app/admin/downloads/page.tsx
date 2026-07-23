'use client';

import { useEffect, useState, useCallback } from 'react';
import { adminApi, DownloadAdmin } from '@/lib/adminApi';

function formatDate(dateStr?: string) {
  if (!dateStr) return '–';
  return new Date(dateStr).toLocaleDateString('ko-KR');
}

const FILE_TYPE_LABELS: Record<string, string> = {
  'DA#_FREE': 'DA# 개인용',
  'DATAWARE_BROCHURE': 'DATAWARE 소개서',
  'DA#_BROCHURE': 'DA# 소개서',
};

export default function DownloadsPage() {
  const [items, setItems] = useState<DownloadAdmin[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const PAGE_SIZE = 20;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminApi.getDownloads(page, PAGE_SIZE);
      setItems(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      setError(err instanceof Error ? err.message : '불러오기 실패');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">다운로드 신청 관리</h1>
          <p className="text-slate-400 text-sm mt-1">
            전체 <span className="text-white font-medium">{totalElements}</span>건
          </p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-lg transition-colors"
        >
          새로고침
        </button>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-700/40 text-red-400 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto" style={{ minHeight: '400px' }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/50">
                <th className="text-left text-slate-400 font-medium px-4 py-3 w-16">ID</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3">이름</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3">회사</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3">연락처</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3">이메일</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3">다운로드 항목</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3">동의</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3">날짜</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="border-b border-slate-800">
                    {Array.from({ length: 8 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-slate-700 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center text-slate-500 py-12">
                    다운로드 신청 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 text-slate-500">{item.id}</td>
                    <td className="px-4 py-3 text-white font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-slate-300">{item.company}</td>
                    <td className="px-4 py-3 text-slate-300">{item.phone}</td>
                    <td className="px-4 py-3 text-slate-300">{item.email}</td>
                    <td className="px-4 py-3 text-slate-300">
                      {FILE_TYPE_LABELS[item.fileType || ''] || item.fileType || '–'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {item.consentPrivacy && <span className="text-xs px-1.5 py-0.5 rounded bg-green-900/30 text-green-400 border border-green-700/30">개인정보</span>}
                        {item.consentThirdParty && <span className="text-xs px-1.5 py-0.5 rounded bg-blue-900/30 text-blue-400 border border-blue-700/30">제3자</span>}
                        {item.consentMarketing && <span className="text-xs px-1.5 py-0.5 rounded bg-purple-900/30 text-purple-400 border border-purple-700/30">마케팅</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{formatDate(item.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-700">
            <span className="text-xs text-slate-500">{page + 1} / {totalPages} 페이지</span>
            <div className="flex gap-2">
              <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}
                className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg disabled:opacity-40 transition-colors">이전</button>
              <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
                className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg disabled:opacity-40 transition-colors">다음</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
