import Image from 'next/image';
import type { CSSProperties } from 'react';

const BACKOFFICE_ORIGIN =
  process.env.NEXT_PUBLIC_BACKOFFICE_URL ||
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? `${window.location.protocol}//${window.location.hostname}:3002`
    : 'http://localhost:3002');

interface OptImgProps {
  id?: string;
  editMode?: boolean;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  style?: CSSProperties;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  onError?: React.ReactEventHandler<HTMLImageElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLImageElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLImageElement>;
}

/**
 * next/image 래퍼 — 로컬 이미지는 WebP 자동 변환 + srcset 생성,
 * 외부 이미지는 네이티브 <img>로 폴백.
 */
export default function OptImg({
  id, editMode, src, alt, width, height, style, className, loading, priority,
  onError, onMouseEnter, onMouseLeave,
}: Readonly<OptImgProps>) {
  const isLocal = src.startsWith('/');

  const editProps = editMode && id ? {
    'data-editable': id,
    className: `${className || ''} editable-field editable-image`.trim(),
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      window.parent.postMessage({ type: 'field-click', id, fieldType: 'image', value: src }, BACKOFFICE_ORIGIN);
    },
  } : { className };

  if (!isLocal || (editMode && id)) {
    return (
      <img
        src={src} alt={alt}
        style={style}
        loading={loading || 'lazy'}
        onError={onError}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...editProps}
      />
    );
  }

  /* 고정 크기 (아이콘·로고 등) */
  if (width && height) {
    return (
      <Image
        src={src} alt={alt}
        width={width} height={height}
        style={style}
        loading={priority ? undefined : (loading || 'lazy')}
        priority={priority}
        onError={onError}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...editProps}
      />
    );
  }

  /* 반응형 (width: 100%, height: auto) */
  return (
    <Image
      src={src} alt={alt}
      width={0} height={0} sizes="100vw"
      style={{ width: '100%', height: 'auto', ...style }}
      loading={priority ? undefined : (loading || 'lazy')}
      priority={priority}
      onError={onError}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...editProps}
    />
  );
}
