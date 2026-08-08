'use client';

import React, { useEffect, useMemo, useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { usePathname } from 'next/navigation';

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

/* ── content-update → DOM 직접 반영 ── */
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

function applyContentUpdate(section: string, data: unknown) {
  const fields = flattenToFields(section, data);
  for (const { id, value } of fields) {
    const el = document.querySelector(`[data-editable="${id}"]`) as HTMLElement | null;
    if (!el) continue;
    if (el.classList.contains('editable-image')) {
      (el as HTMLImageElement).src = value;
    } else {
      // HTML 태그 포함 여부에 따라 innerHTML 또는 textContent 사용
      if (/<[a-z][\s\S]*>/i.test(value)) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    }
  }
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
      }, '*');
    };

    const timer = setTimeout(sendManifest, 400);
    const handler = (e: MessageEvent) => {
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
          applyContentUpdate(section, data);
        }
      }
    };
    window.addEventListener('message', handler);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('message', handler);
    };
  }, [editMode, pathname]);
}

/* ── HTML 태그 포함 여부 판별 ── */
function containsHtml(v: React.ReactNode): v is string {
  return typeof v === 'string' && /<[a-z][\s\S]*>/i.test(v);
}

/* ── E component (EditableText — HTML 서식 지원) ── */
interface EProps {
  id: string;
  editMode?: boolean;
  children: React.ReactNode;
}

export function E({ id, editMode, children }: EProps) {
  const sanitized = useMemo(
    () => (containsHtml(children) ? DOMPurify.sanitize(children) : null),
    [children],
  );

  if (!editMode) {
    if (sanitized !== null) {
      return React.createElement('span', {
        className: 'rich-html',
        style: { whiteSpace: 'pre-wrap' },
        dangerouslySetInnerHTML: { __html: sanitized },
      });
    }
    return React.createElement('span', { style: { whiteSpace: 'pre-wrap' } }, children);
  }

  if (sanitized !== null) {
    return React.createElement('span', {
      'data-editable': id,
      className: 'editable-field rich-html',
      style: { cursor: 'pointer', position: 'relative', whiteSpace: 'pre-wrap' },
      dangerouslySetInnerHTML: { __html: sanitized },
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        const value = (e.currentTarget as HTMLElement).innerHTML || '';
        window.parent.postMessage({ type: 'field-click', id, fieldType: 'text', value }, '*');
      },
    });
  }

  return React.createElement('span', {
    'data-editable': id,
    className: 'editable-field',
    style: { cursor: 'pointer', position: 'relative', whiteSpace: 'pre-wrap' },
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      const value = (e.currentTarget as HTMLElement).innerHTML || '';
      window.parent.postMessage({ type: 'field-click', id, fieldType: 'text', value }, '*');
    },
  }, children);
}

/* ── 편집모드 CSS (editMode일 때만 렌더) ── */
export const EDITABLE_STYLES = `
  .editable-field { transition: outline .15s, outline-offset .15s; outline: 2px solid transparent; outline-offset: 2px; border-radius: 2px; }
  .editable-field:hover { outline: 2px dashed #36c88a !important; outline-offset: 4px; }
  .editable-image { display: block; cursor: pointer; }
  .editable-image:hover { outline-offset: -2px; }
`;
