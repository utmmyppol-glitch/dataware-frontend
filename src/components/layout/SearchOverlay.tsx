'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { DATAWARE_LINEUP } from '@/data';
import { CUSTOMER_STORIES } from '@/data/customers';
import { useEditMode, E } from '@/lib/editable';

/* ── 검색 가능 데이터 정의 ── */

type SearchCategory = 'product' | 'resource' | 'story';

interface SearchItem {
  category: SearchCategory;
  title: string;
  desc: string;
  href: string;
  keywords: string[];
}

const CATEGORY_META: Record<SearchCategory, { label: string; icon: JSX.Element }> = {
  product: {
    label: '제품',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  resource: {
    label: '자료',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  story: {
    label: '고객사례',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
};

function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  // 제품
  DATAWARE_LINEUP.forEach((p) => {
    items.push({
      category: 'product',
      title: p.name,
      desc: p.subtitle,
      href: `/products/${p.slug}`,
      keywords: [p.name.toLowerCase(), p.subtitle, p.slug],
    });
  });

  // 자료
  const resources = [
    { title: '다운로드 신청', desc: 'DA# 무료 다운로드 · 소개서', href: '/download', keywords: ['다운로드', 'download', '소개서', '설치'] },
    { title: '무료교육', desc: 'DA# 활용 무료 교육 신청', href: '/education', keywords: ['교육', 'education', '무료', '강의'] },
    { title: '방문 세미나', desc: '맞춤형 방문 세미나 신청', href: '/seminar', keywords: ['세미나', 'seminar', '방문'] },
    { title: '동영상 강의', desc: '온라인 강의 · 데모 영상', href: '/resources/videos', keywords: ['동영상', 'video', '강의', '영상'] },
    { title: '공지사항', desc: '최신 소식 및 업데이트', href: '/resources/notices', keywords: ['공지', 'notice', '소식'] },
    { title: '가격안내', desc: '라이선스 가격 및 구매 방법', href: '/pricing', keywords: ['가격', 'price', '구매', '라이선스', '비용'] },
    { title: '도입문의', desc: '제품 도입 상담 신청', href: '/contact', keywords: ['문의', 'contact', '도입', '상담'] },
    { title: '데이터 진단', desc: '데이터 거버넌스 수준 진단 · 맞춤 리포트', href: '/diagnosis', keywords: ['진단', 'diagnosis', '거버넌스', '데이터', '리포트'] },
  ];
  resources.forEach((r) => {
    items.push({
      category: 'resource',
      title: r.title,
      desc: r.desc,
      href: r.href,
      keywords: [r.title, ...r.keywords],
    });
  });

  // 고객사례
  CUSTOMER_STORIES.forEach((s) => {
    if (!s.summary) return;
    items.push({
      category: 'story',
      title: s.company,
      desc: s.summary.slice(0, 60) + (s.summary.length > 60 ? '…' : ''),
      href: `/customers/${s.slug}`,
      keywords: [s.company, s.industry, s.summary],
    });
  });

  return items;
}

const SEARCH_INDEX = buildSearchIndex();

const SUGGESTIONS = [
  { label: 'DA# 다운로드', href: '/download' },
  { label: '무료교육', href: '/education' },
  { label: '가격안내', href: '/pricing' },
  { label: '고객사례', href: '/customers' },
  { label: '도입문의', href: '/contact' },
];

const RECENT_KEY = 'dataware-recent-search';

function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveRecentSearch(q: string) {
  const list = getRecentSearches().filter((s) => s !== q);
  list.unshift(q);
  localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 5)));
}

function clearRecentSearches() {
  localStorage.removeItem(RECENT_KEY);
}

/* ── Highlight helper ── */

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} style={{ background: 'rgba(54,200,138,0.2)', color: '#0f172a', borderRadius: 2, padding: '0 1px' }}>
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* ── Search function ── */

function search(query: string): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SEARCH_INDEX.filter((item) =>
    item.keywords.some((kw) => kw.toLowerCase().includes(q)) ||
    item.title.toLowerCase().includes(q) ||
    item.desc.toLowerCase().includes(q)
  );
}

/* ── Component ── */

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const editMode = useEditMode();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setRecentSearches(getRecentSearches());
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
      setActiveIndex(-1);
    }
  }, [open]);

  // Debounced search
  const doSearch = useCallback((q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setResults(search(q));
      setActiveIndex(-1);
    }, 200);
  }, []);

  const handleChange = (val: string) => {
    setQuery(val);
    doSearch(val);
  };

  // Build flat navigable list
  const grouped = (['product', 'resource', 'story'] as SearchCategory[])
    .map((cat) => ({ cat, items: results.filter((r) => r.category === cat) }))
    .filter((g) => g.items.length > 0);

  const flatItems = grouped.flatMap((g) => g.items);

  const navigate = (item: SearchItem) => {
    if (query.trim()) saveRecentSearch(query.trim());
    onClose();
    router.push(item.href);
  };

  // Keyboard
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (query) {
        setQuery('');
        setResults([]);
        setActiveIndex(-1);
      } else {
        onClose();
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < flatItems.length - 1 ? prev + 1 : 0));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : flatItems.length - 1));
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < flatItems.length) {
        navigate(flatItems[activeIndex]);
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return;
    const el = listRef.current.querySelector(`[data-idx="${activeIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  if (!open) return null;

  const hasQuery = query.trim().length > 0;
  const noResults = hasQuery && results.length === 0;

  let flatIdx = -1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center"
      style={{ backgroundColor: 'rgba(11,18,32,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-2xl mx-4 overflow-hidden"
        style={{
          marginTop: 'clamp(80px, 12vh, 160px)',
          backgroundColor: '#ffffff',
          boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
          border: '1px solid #e6e8ec',
          animation: 'searchSlideIn 0.25s cubic-bezier(0.22,1,0.36,1)',
        }}
        onKeyDown={handleKeyDown}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: '1px solid #edf2f7' }}>
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="#94a3b8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="제품, 자료, 고객사례 검색..."
            className="flex-1 text-[15px] outline-none bg-transparent"
            style={{ color: '#0f172a' }}
          />
          {hasQuery && (
            <>
              <button
                onClick={() => { setQuery(''); setResults([]); setActiveIndex(-1); inputRef.current?.focus(); }}
                className="p-1 transition-colors"
                style={{ color: '#94a3b8' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#0f172a'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#94a3b8'; }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button
                onClick={() => {
                  if (flatItems.length > 0) {
                    navigate(activeIndex >= 0 ? flatItems[activeIndex] : flatItems[0]);
                  }
                }}
                className="flex items-center justify-center shrink-0 transition-colors"
                style={{ width: 34, height: 34, backgroundColor: '#36c88a', color: '#ffffff' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#2ba876'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#36c88a'; }}
                aria-label="검색"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="text-[11px] font-medium px-2 py-1"
            style={{ color: '#94a3b8', backgroundColor: '#f7f8f9', border: '1px solid #edf2f7', lineHeight: 1 }}
          >
            ESC
          </button>
        </div>

        {/* Body */}
        <div ref={listRef} style={{ maxHeight: '60vh', overflowY: 'auto' }}>

          {/* ── Empty state: recent + popular ── */}
          {!hasQuery && (
            <div className="px-5 py-4">
              {recentSearches.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[11px] font-bold uppercase" style={{ color: '#94a3b8', letterSpacing: '0.08em' }}><E id="search_empty.recent_label" editMode={editMode}>최근 검색</E></p>
                    <button
                      onClick={() => { clearRecentSearches(); setRecentSearches([]); }}
                      className="text-[11px] transition-colors"
                      style={{ color: '#94a3b8' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#ef4444'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#94a3b8'; }}
                    >
                      <E id="search_empty.clear_btn" editMode={editMode}>전체 삭제</E>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleChange(s)}
                        className="flex items-center gap-1.5 text-[13px] px-3 py-1.5 transition-colors"
                        style={{ color: '#334155', backgroundColor: '#f7f8f9', border: '1px solid #edf2f7' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#36c88a'; (e.currentTarget as HTMLButtonElement).style.color = '#36c88a'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#edf2f7'; (e.currentTarget as HTMLButtonElement).style.color = '#334155'; }}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-[11px] font-bold uppercase mb-2" style={{ color: '#94a3b8', letterSpacing: '0.08em' }}><E id="search_empty.popular_label" editMode={editMode}>인기 링크</E></p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => { onClose(); router.push(link.href); }}
                    className="text-[13px] px-3 py-1.5 transition-colors"
                    style={{ color: '#334155', backgroundColor: '#f7f8f9', border: '1px solid #edf2f7' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#36c88a'; (e.currentTarget as HTMLButtonElement).style.color = '#36c88a'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#edf2f7'; (e.currentTarget as HTMLButtonElement).style.color = '#334155'; }}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Results grouped by category ── */}
          {hasQuery && !noResults && (
            <div className="py-2">
              {grouped.map((group) => {
                const meta = CATEGORY_META[group.cat];
                return (
                  <div key={group.cat}>
                    <div className="flex items-center gap-2 px-5 pt-3 pb-1">
                      <span style={{ color: '#36c88a' }}>{meta.icon}</span>
                      <span className="text-[11px] font-bold uppercase" style={{ color: '#94a3b8', letterSpacing: '0.08em' }}>{meta.label}</span>
                      <span className="text-[11px]" style={{ color: '#cbd5e1' }}>{group.items.length}</span>
                    </div>
                    {group.items.map((item) => {
                      flatIdx++;
                      const idx = flatIdx;
                      const isActive = idx === activeIndex;
                      return (
                        <button
                          key={item.href}
                          data-idx={idx}
                          onClick={() => navigate(item)}
                          className="w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors"
                          style={{
                            backgroundColor: isActive ? '#f0fdf7' : 'transparent',
                            borderLeft: isActive ? '2px solid #36c88a' : '2px solid transparent',
                          }}
                          onMouseEnter={() => setActiveIndex(idx)}
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-semibold truncate" style={{ color: '#0f172a' }}>
                              <Highlight text={item.title} query={query} />
                            </p>
                            <p className="text-[12px] truncate" style={{ color: '#64748b' }}>
                              <Highlight text={item.desc} query={query} />
                            </p>
                          </div>
                          {isActive && (
                            <svg className="w-4 h-4 shrink-0" fill="none" stroke="#36c88a" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}

          {/* ── No results ── */}
          {noResults && (
            <div className="px-5 py-8 text-center">
              <div
                className="mx-auto mb-4 flex items-center justify-center"
                style={{ width: 48, height: 48, backgroundColor: '#f7f8f9', borderRadius: '50%' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="#94a3b8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-[15px] font-semibold mb-1" style={{ color: '#0f172a' }}>
                &ldquo;{query}&rdquo;에 대한 결과가 없습니다
              </p>
              <p className="text-[13px] mb-5" style={{ color: '#64748b' }}><E id="search_noresult.desc" editMode={editMode}>다른 키워드로 검색하거나, 아래 링크를 확인해보세요.</E></p>

              <p className="text-[11px] font-bold uppercase mb-2" style={{ color: '#94a3b8', letterSpacing: '0.08em' }}><E id="search_noresult.suggest_label" editMode={editMode}>이런 걸 찾으시나요?</E></p>
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => { onClose(); router.push(link.href); }}
                    className="text-[13px] px-3 py-1.5 transition-colors"
                    style={{ color: '#334155', backgroundColor: '#f7f8f9', border: '1px solid #edf2f7' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#36c88a'; (e.currentTarget as HTMLButtonElement).style.color = '#36c88a'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#edf2f7'; (e.currentTarget as HTMLButtonElement).style.color = '#334155'; }}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {hasQuery && !noResults && (
          <div
            className="flex items-center justify-between px-5 py-2.5"
            style={{ borderTop: '1px solid #edf2f7', backgroundColor: '#f9fafb' }}
          >
            <div className="flex items-center gap-3 text-[11px]" style={{ color: '#94a3b8' }}>
              <span className="flex items-center gap-1">
                <kbd style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, border: '1px solid #dfe6ee', backgroundColor: '#fff', fontSize: 10, lineHeight: 1 }}>↑</kbd>
                <kbd style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, border: '1px solid #dfe6ee', backgroundColor: '#fff', fontSize: 10, lineHeight: 1 }}>↓</kbd>
                이동
              </span>
              <span className="flex items-center gap-1">
                <kbd style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 18, height: 18, border: '1px solid #dfe6ee', backgroundColor: '#fff', fontSize: 9, lineHeight: 1, padding: '0 4px' }}>Enter</kbd>
                선택
              </span>
              <span className="flex items-center gap-1">
                <kbd style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 18, height: 18, border: '1px solid #dfe6ee', backgroundColor: '#fff', fontSize: 9, lineHeight: 1, padding: '0 4px' }}>ESC</kbd>
                닫기
              </span>
            </div>
            <p className="text-[11px]" style={{ color: '#94a3b8' }}>{results.length}개 결과</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes searchSlideIn {
          from { opacity: 0; transform: translateY(-16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
