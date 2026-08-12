'use client';

import React, { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
/* DOMPurify: 클라이언트에서만 사용, SSG 시에는 fallback */
function sanitize(html: string): string {
  if (typeof window === 'undefined') return html;
  try {
    const DOMPurify = (window as unknown as Record<string, unknown>).__DOMPurify as { sanitize: (s: string) => string } | undefined;
    if (DOMPurify) return DOMPurify.sanitize(html);
  } catch { /* ignore */ }
  return html;
}

/* DOMPurify 초기화 (클라이언트 전용) */
if (typeof window !== 'undefined') {
  import('dompurify').then(mod => {
    (window as unknown as Record<string, unknown>).__DOMPurify = mod.default;
  }).catch(() => { /* ignore */ });
}
import { usePathname } from 'next/navigation';
import { ContentProvider, useContent } from '@/lib/content-provider';

export { ContentProvider };

/* ── postMessage origin (보안: "*" 대신 명시) ── */
const BACKOFFICE_ORIGIN = process.env.NEXT_PUBLIC_BACKOFFICE_URL || 'http://localhost:3002';

/* ── JSON 안전 파싱 ── */
export function safeParse<T>(json: string | undefined | null, fallback: T): T {
  if (!json) return fallback;
  try { return JSON.parse(json); } catch { return fallback; }
}

/* ── 편집모드 감지 훅 (sessionStorage로 클라이언트 네비게이션 시에도 유지) ── */
const EDIT_STORAGE_KEY = '__cms_edit';

export function useEditMode(): boolean {
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('_edit') === '1';
    const inIframe = window.self !== window.top;
    if (fromUrl) {
      if (inIframe) sessionStorage.setItem(EDIT_STORAGE_KEY, '1');
      setEditMode(true);
    } else if (inIframe && sessionStorage.getItem(EDIT_STORAGE_KEY) === '1') {
      setEditMode(true);
    }
  }, []);
  return editMode;
}

/* ── content-update → React 스토어 (DOM 직접 조작 제거) ── */
function flattenToFields(prefix: string, obj: unknown): Array<{ id: string; value: string }> {
  const result: Array<{ id: string; value: string }> = [];
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      if (item != null && typeof item === 'object') {
        for (const [k, v] of Object.entries(item as Record<string, unknown>)) {
          result.push({ id: `${prefix}.${i}.${k}`, value: String(v ?? '') });
        }
      } else {
        result.push({ id: `${prefix}.${i}`, value: String(item ?? '') });
      }
    });
  } else if (obj != null && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      if (v != null && typeof v === 'object') {
        result.push(...flattenToFields(`${prefix}.${k}`, v));
      } else {
        result.push({ id: `${prefix}.${k}`, value: String(v ?? '') });
      }
    }
  }
  return result;
}

/* ── 편집 오버라이드 스토어 (content-update ↔ E 컴포넌트 연결) ── */
let _editOverrides: Record<string, string> = {};
const _overrideListeners = new Set<() => void>();

function _notifyOverrides() {
  _overrideListeners.forEach(l => l());
}

function _setEditOverrides(updates: Record<string, string>) {
  _editOverrides = { ..._editOverrides, ...updates };
  _notifyOverrides();
}

function _resetEditOverrides() {
  _editOverrides = {};
  _notifyOverrides();
}

function _subscribeOverrides(listener: () => void) {
  _overrideListeners.add(listener);
  return () => { _overrideListeners.delete(listener); };
}

function _getOverridesSnapshot() {
  return _editOverrides;
}

const _emptyOverrides: Record<string, string> = {};
function _getServerSnapshot() {
  return _emptyOverrides;
}

/* ── 편집모드 매니페스트 전송 훅 (pathname 변화마다 재전송) ── */
export function useEditableManifest(editMode: boolean) {
  const pathname = usePathname();

  useEffect(() => {
    if (!editMode) return;

    const sendManifest = () => {
      const fields = Array.from(document.querySelectorAll('[data-editable]')).map(el => ({
        id: el.getAttribute('data-editable')!,
        type: el.classList.contains('editable-image') ? 'image' as const : 'text' as const,
        value: el.classList.contains('editable-image')
          ? (el as HTMLImageElement).src
          : el.innerHTML || '',
      }));
      window.parent.postMessage({
        type: 'editable-manifest',
        fields,
        path: pathname,
      }, BACKOFFICE_ORIGIN);
    };

    const timer = setTimeout(sendManifest, 400);
    const handler = (e: MessageEvent) => {
      if (e.origin !== BACKOFFICE_ORIGIN) return;
      if (e.data?.type === 'request-manifest') sendManifest();
      if (e.data?.type === 'highlight-field') {
        const el = document.querySelector(`[data-editable="${e.data.id}"]`) as HTMLElement | null;
        if (el) { el.style.outline = '2px solid #36c88a'; el.style.outlineOffset = '4px'; }
      }
      if (e.data?.type === 'clear-highlight') {
        const el = document.querySelector(`[data-editable="${e.data.id}"]`) as HTMLElement | null;
        if (el) { el.style.outline = ''; el.style.outlineOffset = ''; }
      }
      if (e.data?.type === 'scroll-to-field') {
        const el = document.querySelector(`[data-editable="${e.data.id}"]`) as HTMLElement | null;
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.style.outline = '2px solid #36c88a'; el.style.outlineOffset = '4px';
          setTimeout(() => { el.style.outline = ''; el.style.outlineOffset = ''; }, 2000);
        }
      }
      if (e.data?.type === 'content-update') {
        const section = e.data.section as string;
        const data = e.data.data;
        if (section && data != null) {
          const fields = flattenToFields(section, data);
          const updates: Record<string, string> = {};
          for (const { id, value } of fields) {
            updates[id] = value;
          }
          _setEditOverrides(updates);
        }
      }
    };
    window.addEventListener('message', handler);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('message', handler);
      _resetEditOverrides();
    };
  }, [editMode, pathname]);
}

/* ── 편집 콘텐츠 통합 훅 ──
 *  safeParse 초기화 + useEditMode + useEditableManifest + content-update 리스너를 한 줄로.
 *
 *  사용법:
 *    const DEFAULTS = { home_hero: DEFAULT_HERO, home_cta: DEFAULT_CTA } as const;
 *    const [content, editMode] = useEditableContent(DEFAULTS, ssrContent);
 */
export function useEditableContent<D extends Record<string, unknown>>(
  defaults: D,
  ssrContent: Record<string, string>,
): [D, boolean] {
  const editMode = useEditMode();
  useEditableManifest(editMode);

  const [values, setValues] = useState<D>(() => {
    const parsed = {} as Record<string, unknown>;
    for (const key of Object.keys(defaults)) {
      parsed[key] = safeParse(ssrContent[key], defaults[key]);
    }
    return parsed as D;
  });

  useEffect(() => {
    if (!editMode) return;
    const handler = (e: MessageEvent) => {
      if (e.origin !== BACKOFFICE_ORIGIN) return;
      if (e.data?.type === 'content-update') {
        const section = e.data.section as string;
        if (section in defaults) {
          setValues(prev => ({ ...prev, [section]: e.data.data }));
        }
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

  return [values, editMode];
}

/* ── HTML 태그 포함 여부 판별 ── */
function containsHtml(v: React.ReactNode): v is string {
  return typeof v === 'string' && /<[a-z][\s\S]*>/i.test(v);
}

/* ── 블록 레벨 HTML 태그 포함 여부 (hydration 안전 래퍼 선택용) ── */
const BLOCK_RE = /<(?:p|div|ul|ol|table|h[1-6]|blockquote|section|article|header|footer|nav|pre|hr|dl|figure)[\s>/]/i;
function hasBlockHtml(html: string): boolean {
  return BLOCK_RE.test(html);
}

/* ── E component (EditableText — HTML 서식 지원) ── */
interface EProps {
  id: string;
  editMode?: boolean;
  children: React.ReactNode;
}

export function E({ id, editMode, children }: EProps) {
  const contextOverrides = useContent();
  const editOverrides = useSyncExternalStore(_subscribeOverrides, _getOverridesSnapshot, _getServerSnapshot);
  const override = contextOverrides[id] ?? editOverrides[id];
  const display = override !== undefined ? override : children;

  const sanitized = useMemo(
    () => (containsHtml(display) ? sanitize(display) : null),
    [display],
  );

  /* 블록 HTML이 포함된 경우 <div>로 래핑해야 hydration 오류 방지 */
  const useDiv = sanitized !== null && hasBlockHtml(sanitized);

  if (!editMode) {
    if (sanitized !== null) {
      const Tag = useDiv ? 'div' : 'span';
      return React.createElement(Tag, {
        className: 'rich-html',
        style: { whiteSpace: 'pre-wrap' },
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: { __html: sanitized },
      });
    }
    return React.createElement('span', {
      style: { whiteSpace: 'pre-wrap' },
      suppressHydrationWarning: true,
    }, display);
  }

  if (sanitized !== null) {
    const Tag = useDiv ? 'div' : 'span';
    return React.createElement(Tag, {
      'data-editable': id,
      className: 'editable-field rich-html',
      style: { cursor: 'pointer', position: 'relative', whiteSpace: 'pre-wrap' },
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: { __html: sanitized },
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        const value = (e.currentTarget as HTMLElement).innerHTML || '';
        window.parent.postMessage({ type: 'field-click', id, fieldType: 'text', value }, BACKOFFICE_ORIGIN);
      },
    });
  }

  return React.createElement('span', {
    'data-editable': id,
    className: 'editable-field',
    style: { cursor: 'pointer', position: 'relative', whiteSpace: 'pre-wrap' },
    suppressHydrationWarning: true,
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      const value = (e.currentTarget as HTMLElement).innerHTML || '';
      window.parent.postMessage({ type: 'field-click', id, fieldType: 'text', value }, BACKOFFICE_ORIGIN);
    },
  }, display);
}

/* ── 편집모드 CSS (editMode일 때만 렌더) ── */
export const EDITABLE_STYLES = `
  .editable-field { transition: outline .15s, outline-offset .15s; outline: 2px solid transparent; outline-offset: 2px; border-radius: 2px; }
  .editable-field:hover { outline: 2px dashed #36c88a !important; outline-offset: 4px; }
  .editable-image { display: block; cursor: pointer; }
  .editable-image:hover { outline-offset: -2px; }
`;
