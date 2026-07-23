'use client';

import { useEffect, useState, useCallback } from 'react';
import { adminApi, BannerAdmin } from '@/lib/adminApi';

type BannerFormData = Omit<BannerAdmin, 'id'>;

const EMPTY_FORM: BannerFormData = {
  title: '',
  imageUrl: '',
  linkUrl: '',
  position: 'MAIN',
  sortOrder: 0,
  active: true,
};

const POSITION_OPTIONS = [
  { value: 'MAIN', label: '메인 배너' },
  { value: 'TOP', label: '상단 배너' },
  { value: 'SIDE', label: '사이드 배너' },
  { value: 'FOOTER', label: '푸터 배너' },
];

interface BannerFormProps {
  initial?: BannerAdmin;
  onSave: (data: BannerFormData) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

function BannerForm({ initial, onSave, onCancel, saving }: BannerFormProps) {
  const [form, setForm] = useState<BannerFormData>(
    initial
      ? { title: initial.title, imageUrl: initial.imageUrl, linkUrl: initial.linkUrl, position: initial.position, sortOrder: initial.sortOrder, active: initial.active }
      : { ...EMPTY_FORM },
  );

  const set = <K extends keyof BannerFormData>(key: K, value: BannerFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  const inputCls =
    'w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors';
  const labelCls = 'block text-xs text-slate-400 font-medium mb-1';

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 space-y-4"
    >
      <h3 className="text-white font-semibold text-base">
        {initial ? '배너 수정' : '새 배너 등록'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={labelCls}>배너 제목 *</label>
          <input
            required
            className={inputCls}
            placeholder="배너 제목 또는 설명"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>이미지 URL *</label>
          <input
            required
            className={inputCls}
            placeholder="https://..."
            value={form.imageUrl}
            onChange={(e) => set('imageUrl', e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>링크 URL</label>
          <input
            className={inputCls}
            placeholder="https://..."
            value={form.linkUrl}
            onChange={(e) => set('linkUrl', e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>노출 위치</label>
          <select
            className={inputCls}
            value={form.position}
            onChange={(e) => set('position', e.target.value)}
          >
            {POSITION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>정렬 순서</label>
          <input
            type="number"
            className={inputCls}
            value={form.sortOrder}
            onChange={(e) => set('sortOrder', Number(e.target.value))}
          />
        </div>
        <div className="flex items-center gap-3">
          <input
            id="banner-active"
            type="checkbox"
            checked={form.active}
            onChange={(e) => set('active', e.target.checked)}
            className="w-4 h-4 accent-blue-500"
          />
          <label htmlFor="banner-active" className="text-sm text-slate-300 cursor-pointer">
            활성화
          </label>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
        >
          {saving ? '저장 중…' : '저장'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm font-medium px-5 py-2 rounded-lg transition-colors"
        >
          취소
        </button>
      </div>
    </form>
  );
}

export default function BannersPage() {
  const [banners, setBanners] = useState<BannerAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<BannerAdmin | null>(null);
  const [page, setPage] = useState(0);

  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(banners.length / PAGE_SIZE);
  const pagedBanners = banners.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const fetchBanners = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminApi.getBanners();
      setBanners(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '불러오기 실패');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const handleSave = async (formData: BannerFormData) => {
    setSaving(true);
    try {
      if (editTarget) {
        const updated = await adminApi.updateBanner(editTarget.id, formData);
        setBanners((prev) => prev.map((b) => (b.id === editTarget.id ? updated : b)));
      } else {
        const created = await adminApi.createBanner(formData);
        setBanners((prev) => [...prev, created]);
      }
      setShowForm(false);
      setEditTarget(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : '저장 실패');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (banner: BannerAdmin) => {
    if (!confirm(`"${banner.title}"을(를) 삭제하시겠습니까?`)) return;
    try {
      await adminApi.deleteBanner(banner.id);
      setBanners((prev) => prev.filter((b) => b.id !== banner.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : '삭제 실패');
    }
  };

  const getPositionLabel = (pos: string) =>
    POSITION_OPTIONS.find((o) => o.value === pos)?.label ?? pos;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">배너 관리</h1>
          <p className="text-slate-400 text-sm mt-1">
            전체 <span className="text-white font-medium">{banners.length}</span>개
          </p>
        </div>
        <button
          onClick={() => { setEditTarget(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + 새 배너 등록
        </button>
      </div>

      {showForm && (
        <BannerForm
          initial={editTarget ?? undefined}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditTarget(null); }}
          saving={saving}
        />
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-700/40 text-red-400 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto" style={{ minHeight: '400px' }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/50">
                <th className="text-left text-slate-400 font-medium px-4 py-3 w-14">ID</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3">제목</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3">위치</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3">링크</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3 w-16">순서</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3 w-16">상태</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3 w-24">작업</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-slate-800">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-slate-700 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : banners.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-slate-500 py-12">
                    등록된 배너가 없습니다.
                  </td>
                </tr>
              ) : (
                pagedBanners.map((banner) => (
                  <tr
                    key={banner.id}
                    className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-slate-500">{banner.id}</td>
                    <td className="px-4 py-3 text-white font-medium">
                      <div className="flex items-center gap-2">
                        {banner.imageUrl && (
                          <div className="w-10 h-6 bg-slate-700 rounded overflow-hidden flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={banner.imageUrl}
                              alt={banner.title}
                              className="w-full h-full object-cover"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                          </div>
                        )}
                        <span>{banner.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded-full">
                        {getPositionLabel(banner.position)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-blue-400 text-xs max-w-[150px] truncate" title={banner.linkUrl}>
                      {banner.linkUrl || '–'}
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-center">{banner.sortOrder}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${banner.active ? 'text-green-400' : 'text-slate-500'}`}>
                        {banner.active ? '활성' : '비활성'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditTarget(banner); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="text-xs text-blue-400 hover:text-blue-300 bg-blue-900/20 hover:bg-blue-900/40 border border-blue-700/30 px-2.5 py-1 rounded-lg transition-colors"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(banner)}
                          className="text-xs text-red-400 hover:text-red-300 bg-red-900/20 hover:bg-red-900/40 border border-red-700/30 px-2.5 py-1 rounded-lg transition-colors"
                        >
                          삭제
                        </button>
                      </div>
                    </td>
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
              <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg disabled:opacity-40 transition-colors">이전</button>
              <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
                className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg disabled:opacity-40 transition-colors">다음</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
