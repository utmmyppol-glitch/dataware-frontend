'use client';

import { useEffect, useState, useCallback } from 'react';
import { adminApi, ProductAdmin } from '@/lib/adminApi';

const EMPTY_FORM: Omit<ProductAdmin, 'id'> = {
  name: '',
  slug: '',
  category: '',
  subtitle: '',
  description: '',
  features: '',
  iconUrl: '',
  thumbnailUrl: '',
  certification: '',
  sortOrder: 0,
};

type FormData = Omit<ProductAdmin, 'id'>;

interface ProductFormProps {
  initial?: ProductAdmin;
  onSave: (data: FormData) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

function ProductForm({ initial, onSave, onCancel, saving }: ProductFormProps) {
  const [form, setForm] = useState<FormData>(initial ? { ...initial } : { ...EMPTY_FORM });

  const set = (key: keyof FormData, value: string | number) =>
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
        {initial ? '제품 수정' : '새 제품 등록'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>제품명 *</label>
          <input
            required
            className={inputCls}
            placeholder="DA#"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>슬러그 (slug) *</label>
          <input
            required
            className={inputCls}
            placeholder="da-sharp"
            value={form.slug}
            onChange={(e) => set('slug', e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>카테고리</label>
          <input
            className={inputCls}
            placeholder="modeling"
            value={form.category}
            onChange={(e) => set('category', e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>서브타이틀</label>
          <input
            className={inputCls}
            placeholder="데이터 모델링 전문 도구"
            value={form.subtitle}
            onChange={(e) => set('subtitle', e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>설명</label>
          <textarea
            rows={3}
            className={inputCls}
            placeholder="제품 설명을 입력하세요"
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>기능 (JSON 또는 텍스트)</label>
          <textarea
            rows={3}
            className={inputCls}
            placeholder='["기능1","기능2"]'
            value={form.features}
            onChange={(e) => set('features', e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>아이콘 URL</label>
          <input
            className={inputCls}
            placeholder="https://..."
            value={form.iconUrl}
            onChange={(e) => set('iconUrl', e.target.value)}
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
        <div>
          <label className={labelCls}>인증 (GS인증 등)</label>
          <input
            className={inputCls}
            placeholder="GS인증 1등급"
            value={form.certification}
            onChange={(e) => set('certification', e.target.value)}
          />
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

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<ProductAdmin | null>(null);
  const [page, setPage] = useState(0);

  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const pagedProducts = products.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminApi.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '불러오기 실패');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSave = async (formData: FormData) => {
    setSaving(true);
    try {
      if (editTarget) {
        const updated = await adminApi.updateProduct(editTarget.id, formData as Partial<ProductAdmin>);
        setProducts((prev) => prev.map((p) => (p.id === editTarget.id ? updated : p)));
      } else {
        const created = await adminApi.createProduct(formData as Omit<ProductAdmin, 'id'>);
        setProducts((prev) => [...prev, created]);
      }
      setShowForm(false);
      setEditTarget(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : '저장 실패');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product: ProductAdmin) => {
    if (!confirm(`"${product.name}"을(를) 삭제하시겠습니까?`)) return;
    try {
      await adminApi.deleteProduct(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : '삭제 실패');
    }
  };

  const openEdit = (product: ProductAdmin) => {
    setEditTarget(product);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">제품 관리</h1>
          <p className="text-slate-400 text-sm mt-1">
            전체 <span className="text-white font-medium">{products.length}</span>개
          </p>
        </div>
        <button
          onClick={() => { setEditTarget(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + 새 제품 등록
        </button>
      </div>

      {/* Inline form */}
      {showForm && (
        <ProductForm
          initial={editTarget ?? undefined}
          onSave={handleSave}
          onCancel={closeForm}
          saving={saving}
        />
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-700/40 text-red-400 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Product list */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto" style={{ minHeight: '400px' }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/50">
                <th className="text-left text-slate-400 font-medium px-4 py-3 w-14">ID</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3">제품명</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3">슬러그</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3">카테고리</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3">서브타이틀</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3">인증</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3 w-20">순서</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3 w-24">작업</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-slate-800">
                    {Array.from({ length: 8 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-slate-700 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center text-slate-500 py-12">
                    등록된 제품이 없습니다. 위에서 새 제품을 등록해보세요.
                  </td>
                </tr>
              ) : (
                pagedProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-slate-500">{product.id}</td>
                    <td className="px-4 py-3 text-white font-semibold">{product.name}</td>
                    <td className="px-4 py-3 text-blue-400 font-mono text-xs">{product.slug}</td>
                    <td className="px-4 py-3 text-slate-300">{product.category || '–'}</td>
                    <td className="px-4 py-3 text-slate-300 max-w-[200px] truncate" title={product.subtitle}>
                      {product.subtitle || '–'}
                    </td>
                    <td className="px-4 py-3 text-slate-300">{product.certification || '–'}</td>
                    <td className="px-4 py-3 text-slate-400 text-center">{product.sortOrder}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="text-xs text-blue-400 hover:text-blue-300 bg-blue-900/20 hover:bg-blue-900/40 border border-blue-700/30 px-2.5 py-1 rounded-lg transition-colors"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(product)}
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
