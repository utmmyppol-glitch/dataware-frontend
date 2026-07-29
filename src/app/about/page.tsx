import { Render } from "@measured/puck";
import "@measured/puck/puck.css";

// 블록 컴포넌트 — backoffice와 동일 (공유 패키지가 되면 통합)
const THEME = {
  font: "'Pretendard', -apple-system, sans-serif",
  ink: "#111827",
  ink2: "#6b7280",
};

const puckConfig = {
  components: {
    Heading: {
      render: ({ text, level, align }: { text: string; level: "h1" | "h2" | "h3"; align: string }) => {
        const Tag = level;
        const sizes = { h1: 36, h2: 28, h3: 22 };
        return (
          <Tag style={{ fontFamily: THEME.font, fontSize: sizes[level], fontWeight: 700, color: THEME.ink, textAlign: align as "left" | "center", lineHeight: 1.4, margin: "24px 0 12px" }}>
            {text}
          </Tag>
        );
      },
    },
    Text: {
      render: ({ content, align }: { content: string; align: string }) => (
        <p style={{ fontFamily: THEME.font, fontSize: 16, lineHeight: 1.8, color: THEME.ink2, textAlign: align as "left" | "center", margin: "12px 0", whiteSpace: "pre-wrap" }}>
          {content}
        </p>
      ),
    },
    Image: {
      render: ({ src, alt, maxWidth }: { src: string; alt: string; maxWidth: number }) =>
        src ? (
          <div style={{ margin: "24px 0", textAlign: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} style={{ maxWidth: `${maxWidth}px`, width: "100%", height: "auto", borderRadius: 8 }} />
          </div>
        ) : null,
    },
    ImageText: {
      render: ({ src, alt, text, imagePosition }: { src: string; alt: string; text: string; imagePosition: string }) => (
        <div style={{ display: "flex", flexDirection: imagePosition === "right" ? "row-reverse" : "row", gap: 32, alignItems: "center", margin: "32px 0" }}>
          <div style={{ flex: "0 0 45%" }}>
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt={alt} style={{ width: "100%", height: "auto", borderRadius: 8 }} />
            ) : null}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: THEME.font, fontSize: 16, lineHeight: 1.8, color: THEME.ink2, whiteSpace: "pre-wrap", margin: 0 }}>{text}</p>
          </div>
        </div>
      ),
    },
  },
};

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/dataware").replace("/api/dataware", "");

async function fetchLayout() {
  try {
    const res = await fetch(`${API_BASE}/api/dataware/page-layout/about`, {
      next: { revalidate: 10 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return JSON.parse(data.layoutJson);
  } catch {
    return null;
  }
}

export default async function AboutPage() {
  const data = await fetchLayout();

  if (!data || !data.content || data.content.length === 0) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: THEME.ink, marginBottom: 12 }}>회사소개</h1>
        <p style={{ color: THEME.ink2 }}>콘텐츠가 준비 중입니다.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px" }}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Render config={puckConfig as any} data={data} />
    </div>
  );
}
