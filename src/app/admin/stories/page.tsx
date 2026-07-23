'use client';

import { useEffect, useState, useCallback } from 'react';
import { adminApi, CustomerStoryAdmin } from '@/lib/adminApi';

type StoryFormData = Omit<CustomerStoryAdmin, 'id' | 'createdAt'>;

const EMPTY_FORM: StoryFormData = {
  company: '',
  industry: '',
  title: '',
  content: '',
  thumbnailUrl: '',
  logoUrl: '',
};

const INDUSTRY_OPTIONS = [
  { value: '', label: '업종 선택' },
  { value: 'PUBLIC', label: '공공' },
  { value: 'FINANCE', label: '금융' },
  { value: 'RETAIL', label: '유통' },
  { value: 'MANUFACTURING', label: '제조' },
  { value: 'SERVICE', label: '서비스' },
  { value: 'EDUCATION', label: '교육' },
  { value: 'HEALTHCARE', label: '병원/의료' },
];

function formatDate(dateStr?: string) {
  if (!dateStr) return '–';
  return new Date(dateStr).toLocaleDateString('ko-KR');
}

interface StoryFormProps {
  initial?: CustomerStoryAdmin;
  onSave: (data: StoryFormData) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

function StoryForm({ initial, onSave, onCancel, saving }: StoryFormProps) {
  const [form, setForm] = useState<StoryFormData>(
    initial
      ? { company: initial.company, industry: initial.industry, title: initial.title, content: initial.content, thumbnailUrl: initial.thumbnailUrl, logoUrl: initial.logoUrl }
      : { ...EMPTY_FORM },
  );

  const set = (key: keyof StoryFormData, value: string) =>
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
        {initial ? '고객사례 수정' : '새 고객사례 등록'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>고객사명 *</label>
          <input
            required
            className={inputCls}
            placeholder="㈜예시기업"
            value={form.company}
            onChange={(e) => set('company', e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>업종</label>
          <select
            className={inputCls}
            value={form.industry}
            onChange={(e) => set('industry', e.target.value)}
          >
            {INDUSTRY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>제목 *</label>
          <input
            required
            className={inputCls}
            placeholder="고객사례 제목"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>로고 URL</label>
          <input
            className={inputCls}
            placeholder="https://..."
            value={form.logoUrl}
            onChange={(e) => set('logoUrl', e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>썸네일 URL</label>
          <input
            className={inputCls}
            placeholder="https://..."
            value={form.thumbnailUrl}
            onChange={(e) => set('thumbnailUrl', e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>내용 *</label>
          <textarea
            required
            rows={6}
            className={inputCls}
            placeholder="고객사례 내용을 입력하세요"
            value={form.content}
            onChange={(e) => set('content', e.target.value)}
          />
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

export default function StoriesPage() {
  const [stories, setStories] = useState<CustomerStoryAdmin[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<CustomerStoryAdmin | null>(null);

  const PAGE_SIZE = 20;

  const fetchStories = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminApi.getCustomerStories(page, PAGE_SIZE);
      setStories(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      setError(err instanceof Error ? err.message : '불러오기 실패');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const handleSave = async (formData: StoryFormData) => {
    setSaving(true);
    try {
      if (editTarget) {
        const updated = await adminApi.updateCustomerStory(editTarget.id, formData);
        setStories((prev) => prev.map((s) => (s.id === editTarget.id ? updated : s)));
      } else {
        const created = await adminApi.createCustomerStory(formData);
        setStories((prev) => [created, ...prev]);
      }
      setShowForm(false);
      setEditTarget(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : '저장 실패');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (story: CustomerStoryAdmin) => {
    if (!confirm(`"${story.company} - ${story.title}"을(를) 삭제하시겠습니까?`)) return;
    try {
      await adminApi.deleteCustomerStory(story.id);
      setStories((prev) => prev.filter((s) => s.id !== story.id));
      setTotalElements((n) => n - 1);
    } catch (err) {
      alert(err instanceof Error ? err.message : '삭제 실패');
    }
  };

  const getIndustryLabel = (val: string) =>
    INDUSTRY_OPTIONS.find((o) => o.value === val)?.label ?? val;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">고객사례 관리</h1>
          <p className="text-slate-400 text-sm mt-1">
            전체 <span className="text-white font-medium">{totalElements}</span>건
          </p>
        </div>
        <button
          onClick={() => { setEditTarget(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + 새 고객사례 등록
        </button>
      </div>

      {showForm && (
        <StoryForm
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
                <th className="text-left text-slate-400 font-medium px-4 py-3">고객사</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3">업종</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3">제목</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3 w-28">등록일</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3 w-24">작업</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-slate-800">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-slate-700 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : stories.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-slate-500 py-12">
                    등록된 고객사례가 없습니다.
                  </td>
                </tr>
              ) : (
                stories.map((story) => (
                  <tr
                    key={story.id}
                    className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-slate-500">{story.id}</td>
                    <td className="px-4 py-3 text-white font-medium">
                      <div className="flex items-center gap-2">
                        {story.logoUrl && (
                          <div className="w-8 h-8 bg-white rounded overflow-hidden flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={story.logoUrl}
                              alt={story.company}
                              className="w-full h-full object-contain"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                          </div>
                        )}
                        <span>{story.company}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded-full">
                        {getIndustryLabel(story.industry)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-300 max-w-[250px] truncate" title={story.title}>
                      {story.title}
                    </td>
                    <td className="px-4 py-3 text-slate-400">{formatDate(story.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditTarget(story); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="text-xs text-blue-400 hover:text-blue-300 bg-blue-900/20 hover:bg-blue-900/40 border border-blue-700/30 px-2.5 py-1 rounded-lg transition-colors"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(story)}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-700">
            <span className="text-xs text-slate-500">
              {page + 1} / {totalPages} 페이지
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg disabled:opacity-40 transition-colors"
              >
                이전
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg disabled:opacity-40 transition-colors"
              >
                다음
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
