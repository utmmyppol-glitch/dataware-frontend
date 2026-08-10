import Image from 'next/image';
import type { CSSProperties } from 'react';

interface OptImgProps {
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
  src, alt, width, height, style, className, loading, priority,
  onError, onMouseEnter, onMouseLeave,
}: Readonly<OptImgProps>) {
  const isLocal = src.startsWith('/');

  if (!isLocal) {
    return (
      <img
        src={src} alt={alt}
        style={style} className={className}
        loading={loading || 'lazy'}
        onError={onError}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );
  }

  /* 고정 크기 (아이콘·로고 등) */
  if (width && height) {
    return (
      <Image
        src={src} alt={alt}
        width={width} height={height}
        style={style} className={className}
        loading={priority ? undefined : (loading || 'lazy')}
        priority={priority}
        onError={onError}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );
  }

  /* 반응형 (width: 100%, height: auto) */
  return (
    <Image
      src={src} alt={alt}
      width={0} height={0} sizes="100vw"
      style={{ width: '100%', height: 'auto', ...style }}
      className={className}
      loading={priority ? undefined : (loading || 'lazy')}
      priority={priority}
      onError={onError}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}
