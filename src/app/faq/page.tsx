'use client';

import { useState } from 'react';
import Link from 'next/link';

// 원본 uniondata.co.kr 가격안내 페이지(price/) FAQ 4개
const FAQ_ITEMS = [
  {
    id: 1,
    category: '가격',
    question: 'DA# 패키지를 한 종류만 구입할 경우, 다른 패키지의 서비스도 받을 수 있나요?',
    answer:
      '패치 서비스와 업그레이드 DC 등은 서비스 특성상 기본적으로 해당 구입 제품에만 적용되며 지원받을 수 있습니다. 유료 서비스팩(DA SP)을 통해 추가 서비스를 지원받을 수 있습니다.',
  },
  {
    id: 2,
    category: '가격',
    question: '소규모 회사입니다. DA#의 경우, LT버전(저가용)이 있나요?',
    answer:
      'Light 버전과 같이 기능 제한 저가용으로 개발된 제품 라인은 없으나, 사용자수를 규모에 맞춰 선택할 수 있으므로 비용 대비 효과를 높일 수 있습니다.',
  },
  {
    id: 3,
    category: '가격',
    question: 'DA# 구매시 User수에 따른 할인정책이 있나요?',
    answer:
      '사용자수에 따라 사용자 라이센스로 판매되며, Sliding DC 정책으로 사용자수가 증가할수록 사용자당 단가 할인 비율이 높아집니다.',
  },
  {
    id: 4,
    category: '가격',
    question: 'DA#의 경우, 대기업용 사이트 라이선스가 있나요?',
    answer:
      '기본적으로 사용자수에 따라 계약하나, 사용자수가 일정 수 이상인 경우 사이트 라이선스를 부여합니다.',
  },
];

const CATEGORIES = ['전체', '가격'];

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('전체');

  const filtered = activeCategory === '전체'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <main style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Page Header */}
      <div style={{ backgroundColor: '#f6f8fa', borderBottom: '1px solid #e6e8ec', padding: '52px 24px 48px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Link
              href="/"
              style={{ fontSize: '13px', color: '#888d94', textDecoration: 'none' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#36c88a'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#888d94'; }}
            >
              홈
            </Link>
            <svg width="14" height="14" fill="none" stroke="#cccccc" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span style={{ fontSize: '13px', color: '#36c88a', fontWeight: '600' }}>자주 묻는 질문</span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#111111', margin: '0 0 10px' }}>
            자주 묻는 질문
          </h1>
          <p style={{ fontSize: '16px', color: '#676767', margin: 0 }}>
            DA# 및 DATAWARE에 관해 자주 문의하시는 내용을 모았습니다.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Category Filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '36px' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontSize: '13px',
                fontWeight: '600',
                padding: '7px 18px',
                borderRadius: '100px',
                border: activeCategory === cat ? '1.5px solid #36c88a' : '1.5px solid #e6e8ec',
                backgroundColor: activeCategory === cat ? '#36c88a' : '#ffffff',
                color: activeCategory === cat ? '#ffffff' : '#676767',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {filtered.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                style={{
                  borderTop: idx === 0 ? '1px solid #e6e8ec' : 'none',
                  borderBottom: '1px solid #e6e8ec',
                }}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    padding: '20px 4px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
                    <span
                      style={{
                        flexShrink: 0,
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: isOpen ? '#36c88a' : '#f0fdf7',
                        color: isOpen ? '#ffffff' : '#36c88a',
                        fontSize: '13px',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '1px',
                        border: isOpen ? 'none' : '1.5px solid #36c88a',
                        transition: 'all 0.2s',
                      }}
                    >
                      Q
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: '600', color: '#111111', lineHeight: 1.5 }}>
                      {item.question}
                    </span>
                  </div>
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke={isOpen ? '#36c88a' : '#888d94'}
                    viewBox="0 0 24 24"
                    style={{
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease, stroke 0.2s',
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Answer panel */}
                <div
                  style={{
                    overflow: 'hidden',
                    maxHeight: isOpen ? '600px' : '0px',
                    transition: 'max-height 0.35s ease',
                  }}
                >
                  <div
                    style={{
                      padding: '0 4px 24px 36px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: '#f6f8fa',
                        color: '#888d94',
                        fontSize: '13px',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: '-24px',
                      }}
                    >
                      A
                    </span>
                    <p
                      style={{
                        fontSize: '14px',
                        color: '#676767',
                        lineHeight: 1.75,
                        margin: 0,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div
          style={{
            marginTop: '52px',
            padding: '32px 36px',
            backgroundColor: '#f0fdf7',
            border: '1.5px solid #b6f0d9',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111111', margin: '0 0 8px' }}>
            원하시는 답변을 찾지 못하셨나요?
          </h3>
          <p style={{ fontSize: '14px', color: '#676767', margin: '0 0 20px' }}>
            도입문의 또는 전화(02-706-8999)로 연락 주시면 전문 컨설턴트가 직접 안내해 드립니다.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#36c88a',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                padding: '10px 22px',
                borderRadius: '6px',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(54,200,138,0.28)',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#2ba876'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#36c88a'; }}
            >
              도입문의 바로가기
            </Link>
            <a
              href="tel:027068999"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#ffffff',
                color: '#111111',
                fontSize: '14px',
                fontWeight: '600',
                padding: '10px 22px',
                borderRadius: '6px',
                textDecoration: 'none',
                border: '1.5px solid #e6e8ec',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#36c88a'; (e.currentTarget as HTMLAnchorElement).style.color = '#36c88a'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#e6e8ec'; (e.currentTarget as HTMLAnchorElement).style.color = '#111111'; }}
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              02-706-8999
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
