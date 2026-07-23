'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const ROUTE_MAP: Record<string, string> = {
  '4': '/education',
  '5': '/seminar',
};

export default function FormViewRedirectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    if (!id) return;
    const destination = ROUTE_MAP[id] ?? '/download';
    router.replace(destination);
  }, [id, router]);

  return (
    <main
      style={{
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center', color: '#888d94' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            border: '3px solid #e6e8ec',
            borderTopColor: '#36c88a',
            borderRadius: '50%',
            margin: '0 auto 16px',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <p style={{ fontSize: '14px', color: '#676767', margin: 0 }}>페이지 이동 중...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </main>
  );
}
