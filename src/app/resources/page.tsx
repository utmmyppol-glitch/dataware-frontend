'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, PostResponse } from '@/lib/api';

const CATEGORIES = [
  { key: '', label: '전체' },
  { key: 'NOTICE', label: '공지사항' },
  { key: 'EVENT', label: '이벤트' },
  { key: 'VIDEO', label: '동영상 강의' },
  { key: 'DOCUMENTATION', label: 'Documentation' },
];

const QUICK_LINKS = [
  { href: '/download', label: '다운로드' },
  { href: '/education', label: '무료교육' },
  { href: '/seminar', label: '세미나' },
  { href: '/resources', label: '동영상' },
];

export default function ResourcesPage() {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    const category = activeCategory || undefined;
    api.getPosts(category).then((res) => setPosts(res.content)).catch(console.error);
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16" style={{ backgroundColor: '#ffffff' }}>
      <h1 className="text-4xl font-bold text-center mb-4" style={{ color: '#111111' }}>자료실</h1>
      <p className="text-center mb-8" style={{ color: '#676767' }}>공지사항, 동영상 강의, Documentation</p>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {QUICK_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="rounded-lg p-4 text-center font-semibold transition-colors"
            style={{ backgroundColor: '#e9f9f1', color: '#36c88a', border: '1px solid #d5d8dd' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#36c88a';
              (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#e9f9f1';
              (e.currentTarget as HTMLAnchorElement).style.color = '#36c88a';
            }}
          >
            <p className="font-semibold">{label}</p>
          </Link>
        ))}
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1 mb-8" style={{ borderBottom: '1px solid #e6e8ec' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className="px-4 py-2 text-sm font-medium transition-colors relative"
            style={
              activeCategory === cat.key
                ? {
                    color: '#36c88a',
                    borderBottom: '2px solid #36c88a',
                    marginBottom: '-1px',
                    backgroundColor: 'transparent',
                  }
                : {
                    color: '#888d94',
                    borderBottom: '2px solid transparent',
                    marginBottom: '-1px',
                    backgroundColor: 'transparent',
                  }
            }
            onMouseEnter={(e) => {
              if (activeCategory !== cat.key) {
                (e.currentTarget as HTMLButtonElement).style.color = '#676767';
              }
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== cat.key) {
                (e.currentTarget as HTMLButtonElement).style.color = '#888d94';
              }
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-2xl p-6 transition-all"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e6e8ec',
              borderRadius: '0',
              boxShadow: '0 4px 20px rgba(24,39,33,.07)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = '#36c88a';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(54,200,138,.12)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = '#e6e8ec';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(24,39,33,.07)';
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <span
                  className="text-xs px-2 py-1 rounded font-medium"
                  style={{ backgroundColor: '#e9f9f1', color: '#36c88a' }}
                >
                  {post.category}
                </span>
                <h3 className="text-lg font-semibold mt-2" style={{ color: '#111111' }}>{post.title}</h3>
                <p className="text-sm mt-1" style={{ color: '#676767' }}>{post.excerpt}</p>
              </div>
              <span className="text-xs ml-4 shrink-0" style={{ color: '#a6abb2' }}>
                {new Date(post.createdAt).toLocaleDateString('ko-KR')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
