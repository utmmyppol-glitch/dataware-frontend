'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ─────────────────────────────────────────────
// 타입 정의
// ─────────────────────────────────────────────

type MessageRole = 'bot' | 'user';
type InputMode = 'choices' | 'email' | 'company' | 'name' | 'phone' | 'email_or_phone' | 'none';

interface Message {
  id: number;
  role: MessageRole;
  text: string;
  typing?: boolean; // 타이핑 중 표시용
}

interface Choice {
  label: string;
  value: string;
}

interface ChatState {
  inputMode: InputMode;
  choices: Choice[];
  inputPlaceholder: string;
  step: Step;
}

// 시나리오 단계 열거
type Step =
  | 'initial'
  // 분기 1: 제품
  | 'product_which'
  | 'product_dq_brochure'
  | 'product_da_brochure'
  | 'collect_email_brochure'
  | 'brochure_done'
  // 분기 2: 가격
  | 'pricing_show'
  | 'pricing_quote_ask'
  | 'collect_email_quote'
  | 'collect_company_quote'
  | 'quote_done'
  // 분기 3: 무료 체험
  | 'trial_ask'
  | 'trial_brochure'
  | 'collect_email_trial'
  | 'trial_done'
  // 분기 4: 도입 상담
  | 'consult_company'
  | 'consult_name'
  | 'consult_contact'
  | 'consult_done';

// ─────────────────────────────────────────────
// localStorage 저장 유틸
// ─────────────────────────────────────────────

interface LeadData {
  type: string;
  email?: string;
  company?: string;
  name?: string;
  contact?: string;
  collectedAt: string;
}

function saveLead(data: Omit<LeadData, 'collectedAt'>) {
  try {
    const existing: LeadData[] = JSON.parse(localStorage.getItem('chatbot_leads') || '[]');
    existing.push({ ...data, collectedAt: new Date().toISOString() });
    localStorage.setItem('chatbot_leads', JSON.stringify(existing));
  } catch {
    // localStorage 사용 불가 환경 무시
  }
}

// ─────────────────────────────────────────────
// 시나리오 정의
// ─────────────────────────────────────────────

const INITIAL_STATE: ChatState = {
  step: 'initial',
  inputMode: 'choices',
  choices: [
    { label: '제품이 궁금해요', value: 'product' },
    { label: '가격이 궁금해요', value: 'pricing' },
    { label: '무료 체험하고 싶어요', value: 'trial' },
    { label: '도입 상담 받고 싶어요', value: 'consult' },
  ],
  inputPlaceholder: '',
};

// ─────────────────────────────────────────────
// 컴포넌트
// ─────────────────────────────────────────────

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatState, setChatState] = useState<ChatState>(INITIAL_STATE);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [leadBuffer, setLeadBuffer] = useState<Partial<LeadData>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const msgIdRef = useRef(0);

  const nextId = () => ++msgIdRef.current;

  // 스크롤 최하단
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // 챗봇 최초 오픈 시 인사
  useEffect(() => {
    if (open && messages.length === 0) {
      addBotMessage(
        '안녕하세요! DATAWARE 상담 챗봇입니다.\n무엇이 궁금하신가요?',
        INITIAL_STATE,
        0
      );
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // 입력창 포커스
  useEffect(() => {
    if (open && chatState.inputMode !== 'choices' && chatState.inputMode !== 'none') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, chatState.inputMode]);

  // ─── 메시지 추가 헬퍼 ───────────────────────

  const addBotMessage = useCallback(
    (text: string, nextState: ChatState, delay = 400) => {
      const id = nextId();

      // 타이핑 인디케이터 추가
      setIsTyping(true);
      setMessages((prev) => [...prev, { id, role: 'bot', text: '', typing: true }]);

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, text, typing: false } : m))
        );
        setChatState(nextState);
      }, delay);
    },
    []
  );

  const addUserMessage = useCallback((text: string) => {
    setMessages((prev) => [...prev, { id: nextId(), role: 'user', text }]);
  }, []);

  // ─── 선택지 클릭 핸들러 ──────────────────────

  const handleChoice = useCallback(
    (value: string) => {
      const step = chatState.step;

      // 선택지 잠금 (중복 클릭 방지)
      setChatState((prev) => ({ ...prev, choices: [], inputMode: 'none' }));

      switch (step) {
        // ── 초기 선택 ──
        case 'initial': {
          if (value === 'product') {
            addUserMessage('제품이 궁금해요');
            addBotMessage(
              'DATAWARE는 데이터 거버넌스 All-in-One Package입니다.\n어떤 제품이 궁금하신가요?',
              {
                step: 'product_which',
                inputMode: 'choices',
                choices: [
                  { label: 'DA# (데이터 모델링)', value: 'da' },
                  { label: 'DA# DQ Edition (품질진단)', value: 'dq' },
                  { label: '전체 라인업 보기', value: 'lineup' },
                ],
                inputPlaceholder: '',
              }
            );
          } else if (value === 'pricing') {
            addUserMessage('가격이 궁금해요');
            addBotMessage(
              'DA# 가격 안내드립니다.\n\n• DA# Architecture: 연 240만원 (정가 600만원)\n• DA# 통합 패키지: 600만원 — 평생 (정가 1,200만원)\n• DA# Repository: 1,500만원 — 평생 (정가 2,500만원)\n\n모두 VAT 별도입니다.',
              {
                step: 'pricing_quote_ask',
                inputMode: 'choices',
                choices: [
                  { label: '네, 견적 받을게요', value: 'yes' },
                  { label: '아니요, 괜찮아요', value: 'no' },
                ],
                inputPlaceholder: '',
              },
              700
            );
          } else if (value === 'trial') {
            addUserMessage('무료 체험하고 싶어요');
            addBotMessage(
              'DA# 개인용 무료 버전을 다운로드하실 수 있습니다!\n다운로드 신청 페이지로 이동하시겠어요?',
              {
                step: 'trial_ask',
                inputMode: 'choices',
                choices: [
                  { label: '네, 이동할게요', value: 'yes' },
                  { label: '먼저 소개서를 보고 싶어요', value: 'brochure' },
                ],
                inputPlaceholder: '',
              }
            );
          } else if (value === 'consult') {
            addUserMessage('도입 상담 받고 싶어요');
            addBotMessage(
              '도입 상담을 도와드리겠습니다!\n먼저 회사명을 알려주세요.',
              {
                step: 'consult_company',
                inputMode: 'company',
                choices: [],
                inputPlaceholder: '회사명을 입력하세요',
              }
            );
          }
          break;
        }

        // ── 분기 1: 제품 ──
        case 'product_which': {
          if (value === 'da') {
            addUserMessage('DA# (데이터 모델링)');
            addBotMessage(
              'DA#은 국내 시장점유율 1위 데이터 모델링 툴입니다.\n자세한 소개서를 보내드릴까요?',
              {
                step: 'product_da_brochure',
                inputMode: 'choices',
                choices: [
                  { label: '네, 보내주세요', value: 'yes' },
                  { label: '아니요, 괜찮아요', value: 'no' },
                ],
                inputPlaceholder: '',
              }
            );
          } else if (value === 'dq') {
            addUserMessage('DA# DQ Edition (품질진단)');
            addBotMessage(
              'DA# DQ Edition은 데이터 품질 진단에 특화된 에디션입니다. GS인증 1등급을 획득했습니다.\n소개서를 보내드릴까요?',
              {
                step: 'product_dq_brochure',
                inputMode: 'choices',
                choices: [
                  { label: '네, 보내주세요', value: 'yes' },
                  { label: '아니요, 괜찮아요', value: 'no' },
                ],
                inputPlaceholder: '',
              }
            );
          } else if (value === 'lineup') {
            addUserMessage('전체 라인업 보기');
            addBotMessage(
              'DATAWARE 전체 제품을 확인해보세요!',
              {
                step: 'initial',
                inputMode: 'choices',
                choices: [{ label: '전체 제품 보러 가기 →', value: '__link__/products' }],
                inputPlaceholder: '',
              }
            );
          }
          break;
        }

        case 'product_da_brochure':
        case 'product_dq_brochure': {
          if (value === 'yes') {
            addUserMessage('네, 보내주세요');
            addBotMessage(
              '이메일 주소를 알려주시면 바로 보내드릴게요!',
              {
                step: 'collect_email_brochure',
                inputMode: 'email',
                choices: [],
                inputPlaceholder: '이메일 주소를 입력하세요',
              }
            );
          } else {
            addUserMessage('아니요, 괜찮아요');
            addBotMessage(
              '더 궁금한 게 있으시면 말씀해주세요!',
              INITIAL_STATE
            );
          }
          break;
        }

        // ── 분기 2: 가격 ──
        case 'pricing_quote_ask': {
          if (value === 'yes') {
            addUserMessage('네, 견적 받을게요');
            addBotMessage(
              '이메일 주소를 알려주세요.',
              {
                step: 'collect_email_quote',
                inputMode: 'email',
                choices: [],
                inputPlaceholder: '이메일 주소를 입력하세요',
              }
            );
          } else {
            addUserMessage('아니요, 괜찮아요');
            addBotMessage('더 궁금한 게 있으시면 말씀해주세요!', INITIAL_STATE);
          }
          break;
        }

        // ── 분기 3: 무료 체험 ──
        case 'trial_ask': {
          if (value === 'yes') {
            addUserMessage('네, 이동할게요');
            addBotMessage(
              '다운로드 신청 페이지로 이동해드릴게요!',
              {
                step: 'trial_done',
                inputMode: 'choices',
                choices: [{ label: '다운로드 신청하기 →', value: '__link__/download' }],
                inputPlaceholder: '',
              }
            );
          } else {
            addUserMessage('먼저 소개서를 보고 싶어요');
            addBotMessage(
              '이메일 주소를 알려주시면 소개서를 보내드릴게요!',
              {
                step: 'collect_email_trial',
                inputMode: 'email',
                choices: [],
                inputPlaceholder: '이메일 주소를 입력하세요',
              }
            );
          }
          break;
        }

        default:
          break;
      }
    },
    [chatState, addUserMessage, addBotMessage]
  );

  // ─── 텍스트 입력 제출 핸들러 ─────────────────

  const handleSubmit = useCallback(() => {
    const val = inputValue.trim();
    if (!val || isTyping) return;
    setInputValue('');

    const step = chatState.step;

    switch (step) {
      // ── 소개서 이메일 수집 ──
      case 'collect_email_brochure': {
        addUserMessage(val);
        const newLead: Partial<LeadData> = { type: 'brochure', email: val };
        saveLead(newLead as Omit<LeadData, 'collectedAt'>);
        addBotMessage(
          '감사합니다! 소개서를 보내드리겠습니다.\n추가로 궁금한 점이 있으시면 말씀해주세요.',
          INITIAL_STATE
        );
        break;
      }

      // ── 견적 이메일 수집 ──
      case 'collect_email_quote': {
        addUserMessage(val);
        setLeadBuffer({ type: 'quote', email: val });
        addBotMessage(
          '회사명도 알려주시면 맞춤 견적을 드릴 수 있어요.',
          {
            step: 'collect_company_quote',
            inputMode: 'company',
            choices: [],
            inputPlaceholder: '회사명을 입력하세요',
          }
        );
        break;
      }

      case 'collect_company_quote': {
        addUserMessage(val);
        const fullLead = { ...leadBuffer, company: val };
        saveLead(fullLead as Omit<LeadData, 'collectedAt'>);
        setLeadBuffer({});
        addBotMessage(
          '감사합니다! 담당자가 견적을 보내드리겠습니다.\n추가 문의는 언제든 말씀해주세요.',
          INITIAL_STATE
        );
        break;
      }

      // ── 체험 소개서 이메일 수집 ──
      case 'collect_email_trial': {
        addUserMessage(val);
        saveLead({ type: 'trial_brochure', email: val });
        addBotMessage(
          '감사합니다! 소개서를 보내드리겠습니다.\n무료 체험도 바로 신청하실 수 있어요.',
          {
            step: 'trial_done',
            inputMode: 'choices',
            choices: [{ label: '다운로드 신청하기 →', value: '__link__/download' }],
            inputPlaceholder: '',
          }
        );
        break;
      }

      // ── 도입 상담: 회사명 ──
      case 'consult_company': {
        addUserMessage(val);
        setLeadBuffer({ type: 'consult', company: val });
        addBotMessage(
          '담당자 성함을 알려주세요.',
          {
            step: 'consult_name',
            inputMode: 'name',
            choices: [],
            inputPlaceholder: '성함을 입력하세요',
          }
        );
        break;
      }

      // ── 도입 상담: 이름 ──
      case 'consult_name': {
        addUserMessage(val);
        setLeadBuffer((prev) => ({ ...prev, name: val }));
        addBotMessage(
          '연락 받으실 이메일 또는 전화번호를 알려주세요.',
          {
            step: 'consult_contact',
            inputMode: 'email_or_phone',
            choices: [],
            inputPlaceholder: '이메일 또는 전화번호',
          }
        );
        break;
      }

      // ── 도입 상담: 연락처 ──
      case 'consult_contact': {
        addUserMessage(val);
        const finalLead = { ...leadBuffer, contact: val };
        saveLead(finalLead as Omit<LeadData, 'collectedAt'>);
        setLeadBuffer({});
        addBotMessage(
          '감사합니다! 담당자가 곧 연락드리겠습니다.\n빠른 상담을 원하시면 02-706-8999로 전화 주세요.',
          {
            step: 'consult_done',
            inputMode: 'choices',
            choices: [{ label: '처음으로 돌아가기', value: '__reset__' }],
            inputPlaceholder: '',
          }
        );
        break;
      }

      default:
        break;
    }
  }, [inputValue, isTyping, chatState.step, leadBuffer, addUserMessage, addBotMessage]);

  // 링크/리셋 처리 포함 선택지 핸들러
  const handleChoiceClick = useCallback(
    (value: string) => {
      if (value.startsWith('__link__')) {
        const path = value.replace('__link__', '');
        window.location.href = path;
        return;
      }
      if (value === '__reset__') {
        setChatState(INITIAL_STATE);
        return;
      }
      handleChoice(value);
    },
    [handleChoice]
  );

  // Enter 제출
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
  };

  // 챗봇 열고 닫기 — 닫을 때 대화 초기화
  const handleToggle = () => {
    if (open) {
      setOpen(false);
      // 닫을 때 대화 초기화 (재오픈 시 처음부터)
      setMessages([]);
      setChatState(INITIAL_STATE);
      setInputValue('');
      setLeadBuffer({});
    } else {
      setOpen(true);
    }
  };

  // ─────────────────────────────────────────────
  // 렌더링
  // ─────────────────────────────────────────────

  const showInput =
    chatState.inputMode !== 'choices' && chatState.inputMode !== 'none';

  return (
    <>
      {/* ── 채팅 창 ── */}
      {open && (
        <div
          role="dialog"
          aria-label="DATAWARE 상담 챗봇"
          style={{
            position: 'fixed',
            bottom: '88px',
            right: '24px',
            width: '360px',
            height: '520px',
            backgroundColor: '#fff',
            border: '1px solid rgba(15,23,42,0.1)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.14)',
            zIndex: 60,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: '12px',
          }}
        >
          {/* 헤더 */}
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: '#101828',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* 아바타 */}
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: '#36c88a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#F9FAFB', margin: 0 }}>
                  DATAWARE 상담
                </p>
                <p style={{ fontSize: '11px', color: '#36c88a', margin: '1px 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#36c88a', display: 'inline-block' }} />
                  온라인
                </p>
              </div>
            </div>
            <button
              onClick={handleToggle}
              aria-label="챗봇 닫기"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.5)',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 메시지 영역 */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              backgroundColor: '#F8F9FB',
            }}
          >
            {messages.map((msg) => (
              <div key={msg.id}>
                {msg.role === 'bot' ? (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                    {/* 봇 아바타 (작은 것) */}
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: '#101828',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginBottom: '2px',
                      }}
                    >
                      <svg width="12" height="12" fill="none" stroke="#36c88a" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div
                      style={{
                        maxWidth: '75%',
                        padding: '10px 14px',
                        backgroundColor: '#fff',
                        borderRadius: '4px 16px 16px 16px',
                        fontSize: '13px',
                        lineHeight: '1.6',
                        color: '#1F2937',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {msg.typing ? <TypingDots /> : msg.text}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div
                      style={{
                        maxWidth: '75%',
                        padding: '10px 14px',
                        backgroundColor: '#36c88a',
                        borderRadius: '16px 4px 16px 16px',
                        fontSize: '13px',
                        lineHeight: '1.6',
                        color: '#fff',
                        fontWeight: 500,
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* 선택지 버튼 */}
            {!isTyping && chatState.inputMode === 'choices' && chatState.choices.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '34px', marginTop: '4px' }}>
                {chatState.choices.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => handleChoiceClick(c.value)}
                    style={{
                      padding: '9px 14px',
                      backgroundColor: '#fff',
                      border: '1.5px solid #36c88a',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#101828',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s, color 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#36c88a';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#fff';
                      e.currentTarget.style.color = '#101828';
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 텍스트 입력 영역 */}
          {showInput && (
            <div
              style={{
                padding: '12px 16px',
                borderTop: '1px solid rgba(15,23,42,0.08)',
                backgroundColor: '#fff',
                display: 'flex',
                gap: '8px',
                flexShrink: 0,
              }}
            >
              <input
                ref={inputRef}
                type={chatState.inputMode === 'email' ? 'email' : 'text'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={chatState.inputPlaceholder}
                disabled={isTyping}
                style={{
                  flex: 1,
                  padding: '9px 14px',
                  border: '1.5px solid #E5E7EB',
                  borderRadius: '20px',
                  fontSize: '13px',
                  outline: 'none',
                  color: '#1F2937',
                  backgroundColor: isTyping ? '#F3F4F6' : '#fff',
                  transition: 'border 0.15s',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#36c88a'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; }}
              />
              <button
                onClick={handleSubmit}
                disabled={isTyping || !inputValue.trim()}
                aria-label="전송"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: inputValue.trim() ? '#36c88a' : '#E5E7EB',
                  border: 'none',
                  cursor: inputValue.trim() ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background 0.15s',
                }}
              >
                <svg width="16" height="16" fill="none" stroke={inputValue.trim() ? '#fff' : '#9CA3AF'} strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          )}

          {/* 푸터 */}
          <div
            style={{
              padding: '8px 16px',
              borderTop: '1px solid rgba(15,23,42,0.06)',
              backgroundColor: '#fff',
              flexShrink: 0,
            }}
          >
            <p style={{ fontSize: '10px', color: '#98A2B3', margin: 0, textAlign: 'center' }}>
              02-706-8999 · ud@unionsystems.co.kr
            </p>
          </div>
        </div>
      )}

      {/* ── 플로팅 버튼 ── */}
      <button
        onClick={handleToggle}
        aria-label={open ? '챗봇 닫기' : '상담 챗봇 열기'}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: '#101828',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,0,0,0.16)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 60,
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.22)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.16)';
        }}
      >
        {open ? (
          <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </>
  );
}

// ─────────────────────────────────────────────
// 타이핑 점 애니메이션
// ─────────────────────────────────────────────

function TypingDots() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', height: '16px' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#9CA3AF',
            display: 'inline-block',
            animation: `chatbotTyping 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes chatbotTyping {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-3px); }
        }
      `}</style>
    </span>
  );
}
