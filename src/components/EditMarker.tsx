'use client';

/**
 * E 마킹 — 관리자용 편집 버튼
 *
 * 사용법:
 *   <EditMarker path="/dataware/posts" />         → 게시글 관리 페이지로
 *   <EditMarker path="/dataware/posts" id={3} />  → 게시글 #3 편집 페이지로
 *   <EditMarker path="/dataware/contents" label="회사소개 편집" />
 *
 * NEXT_PUBLIC_BACKOFFICE_URL 환경변수로 백오피스 URL 설정
 */

const BACKOFFICE_URL = process.env.NEXT_PUBLIC_BACKOFFICE_URL || 'http://localhost:3001';

interface EditMarkerProps {
  /** 백오피스 경로 (예: /dataware/posts) */
  path: string;
  /** 특정 항목 ID (있으면 /path/id 로 이동) */
  id?: number | string;
  /** 버튼 라벨 (기본: E) */
  label?: string;
  /** 추가 스타일 */
  style?: React.CSSProperties;
}

export default function EditMarker({ path, id, label, style }: EditMarkerProps) {
  const href = id ? `${BACKOFFICE_URL}${path}/${id}` : `${BACKOFFICE_URL}${path}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label || '백오피스에서 편집'}
      style={{
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 9999,
        width: 28,
        height: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(54, 200, 138, 0.9)',
        color: '#fff',
        fontSize: 12,
        fontWeight: 800,
        borderRadius: '4px',
        textDecoration: 'none',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        transition: 'transform 0.15s, background-color 0.15s',
        ...style,
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.backgroundColor = 'rgba(54, 200, 138, 1)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.backgroundColor = 'rgba(54, 200, 138, 0.9)'; }}
    >
      {label ? label.charAt(0) : 'E'}
    </a>
  );
}
