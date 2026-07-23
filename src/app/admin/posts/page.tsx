'use client';

import { useEffect, useState, useCallback } from 'react';
import { adminApi, PostAdmin } from '@/lib/adminApi';

type PostFormData = Omit<PostAdmin, 'id' | 'viewCount' | 'createdAt'>;

const EMPTY_FORM: PostFormData = {
  title: '',
  content: '',
  excerpt: '',
  category: '',
  thumbnailUrl: '',
};

const CATEGORY_OPTIONS = [
  { value: '', label: '카테고리 선택' },
  { value: 'NOTICE', label: '공지사항' },
  { value: 'NEWS', label: '뉴스' },
  { value: 'BLOG', label: '블로그' },
  { value: 'CASE_STUDY', label: '고객사례' },
  { value: 'DOCUMENTATION', label: '문서/자료' },
];

function formatDate(dateStr?: string) {
  if (!dateStr) return '–';
  return new Date(dateStr).toLocaleDateString('ko-KR');
}

interface PostFormProps {
  initial?: PostAdmin;
  onSave: (data: PostFormData) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

function PostForm({ initial, onSave, onCancel, saving }: PostFormProps) {
  const [form, setForm] = useState<PostFormData>(
    initial
      ? { title: initial.title, content: initial.content, excerpt: initial.excerpt, category: initial.category, thumbnailUrl: initial.thumbnailUrl }
      : { ...EMPTY_FORM },
  );

  const set = (key: keyof PostFormData, value: string) =>
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
        {initial ? '게시글 수정' : '새 게시글 작성'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={labelCls}>제목 *</label>
          <input
            required
            className={inputCls}
            placeholder="게시글 제목을 입력하세요"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>카테고리</label>
          <select
            className={inputCls}
            value={form.category}
            onChange={(e) => set('category', e.target.value)}
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
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
          <label className={labelCls}>요약 (excerpt)</label>
          <textarea
            rows={2}
            className={inputCls}
            placeholder="게시글 목록에 표시될 짧은 설명"
            value={form.excerpt}
            onChange={(e) => set('excerpt', e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>본문 *</label>
          <textarea
            required
            rows={8}
            className={inputCls}
            placeholder="게시글 본문을 입력하세요 (HTML 또는 Markdown 지원)"
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

export default function PostsPage() {
  const [posts, setPosts] = useState<PostAdmin[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<PostAdmin | null>(null);

  const PAGE_SIZE = 20;

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminApi.getPosts(page, PAGE_SIZE);
      setPosts(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      setError(err instanceof Error ? err.message : '불러오기 실패');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSave = async (formData: PostFormData) => {
    setSaving(true);
    try {
      if (editTarget) {
        const updated = await adminApi.updatePost(editTarget.id, formData);
        setPosts((prev) => prev.map((p) => (p.id === editTarget.id ? updated : p)));
      } else {
        const created = await adminApi.createPost(formData);
        setPosts((prev) => [created, ...prev]);
      }
      setShowForm(false);
      setEditTarget(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : '저장 실패');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (post: PostAdmin) => {
    if (!confirm(`"${post.title}"을(를) 삭제하시겠습니까?`)) return;
    try {
      await adminApi.deletePost(post.id);
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
      setTotalElements((n) => n - 1);
    } catch (err) {
      alert(err instanceof Error ? err.message : '삭제 실패');
    }
  };

  const openEdit = (post: PostAdmin) => {
    setEditTarget(post);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryLabel = (cat: string) =>
    CATEGORY_OPTIONS.find((o) => o.value === cat)?.label ?? cat;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">게시글 관리</h1>
          <p className="text-slate-400 text-sm mt-1">
            전체 <span className="text-white font-medium">{totalElements}</span>개
          </p>
        </div>
        <button
          onClick={() => { setEditTarget(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + 새 게시글 작성
        </button>
      </div>

      {/* Inline form */}
      {showForm && (
        <PostForm
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
                <th className="text-left text-slate-400 font-medium px-4 py-3 w-28">카테고리</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3 w-20">조회수</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3 w-28">작성일</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3 w-24">작업</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="border-b border-slate-800">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-slate-700 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-slate-500 py-12">
                    게시글이 없습니다. 새 게시글을 작성해보세요.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-slate-500">{post.id}</td>
                    <td className="px-4 py-3 text-white font-medium max-w-[300px]">
                      <span className="truncate block" title={post.title}>
                        {post.title}
                      </span>
                      {post.excerpt && (
                        <span className="text-slate-500 text-xs truncate block mt-0.5" title={post.excerpt}>
                          {post.excerpt}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded-full">
                        {getCategoryLabel(post.category)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-center">{post.viewCount ?? 0}</td>
                    <td className="px-4 py-3 text-slate-400">{formatDate(post.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(post)}
                          className="text-xs text-blue-400 hover:text-blue-300 bg-blue-900/20 hover:bg-blue-900/40 border border-blue-700/30 px-2.5 py-1 rounded-lg transition-colors"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(post)}
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
