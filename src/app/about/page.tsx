const THEME = { ink: "#111827", ink2: "#6b7280" };

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: THEME.ink, marginBottom: 12 }}>회사소개</h1>
      <p style={{ color: THEME.ink2 }}>콘텐츠가 준비 중입니다.</p>
    </div>
  );
}
