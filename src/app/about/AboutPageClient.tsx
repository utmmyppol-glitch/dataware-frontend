'use client';

import { useState, useEffect } from 'react';
import { E, safeParse, useEditMode, useEditableManifest, EDITABLE_STYLES } from '@/lib/editable';

const THEME = { ink: '#111827', ink2: '#6b7280' };

const DEFAULT_HERO = { title: '회사소개', desc: '콘텐츠가 준비 중입니다.' };

export default function AboutPageClient({ ssrContent }: { ssrContent: Record<string, string> }) {
  const editMode = useEditMode();
  useEditableManifest(editMode);

  const [hero, setHero] = useState(() => safeParse(ssrContent.about_hero, DEFAULT_HERO));

  useEffect(() => {
    if (!editMode) return;
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'content-update' && e.data.section === 'about_hero') {
        setHero(e.data.data);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [editMode]);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: THEME.ink, marginBottom: 12 }}>
        <E id="about_hero.title" editMode={editMode}>{hero.title}</E>
      </h1>
      <p style={{ color: THEME.ink2 }}>
        <E id="about_hero.desc" editMode={editMode}>{hero.desc}</E>
      </p>
      {editMode && <style>{EDITABLE_STYLES}</style>}
    </div>
  );
}
