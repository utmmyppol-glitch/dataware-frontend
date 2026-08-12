import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'DATAWARE - 데이터 거버넌스 All-in-One 솔루션';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0b1220 0%, #0f172a 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px',
            marginBottom: '24px',
          }}
        >
          <span style={{ fontSize: 72, fontWeight: 800, color: '#f9fafb', letterSpacing: '-0.03em' }}>
            DATAWARE
          </span>
          <span style={{ fontSize: 72, fontWeight: 800, color: '#36c88a' }}>.</span>
        </div>
        <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.5)', fontWeight: 500, marginBottom: '16px' }}>
          데이터 거버넌스 All-in-One 솔루션
        </div>
        <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>
          DA# · META# · DQ# · AP# · DF# · ETT# · DP#
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#36c88a' }} />
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>
            UNION SYSTEMS · ENCORE DATAWARE
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
