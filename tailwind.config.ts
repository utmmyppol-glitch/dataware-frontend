import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-white)",
        foreground: "var(--ink-2)",
        accent: {
          DEFAULT: "#36c88a",
          hover: "#2ba876",
          pale: "#e9f9f1",
        },
        navy: {
          950: "#0b1220",
          900: "#0f172a",
          800: "#1e293b",
          700: "#334155",
        },
      },
      fontFamily: {
        sans: ['"Noto Sans KR"', '"Malgun Gothic"', '"Spoqa Han Sans"', "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,.06)",
        "card-hover": "0 16px 48px rgba(0,0,0,.12)",
        nav: "0 1px 3px rgba(0,0,0,.08)",
        accent: "0 8px 24px rgba(54,200,138,.28)",
        "accent-lg": "0 12px 32px rgba(54,200,138,.35)",
        glow: "0 0 40px rgba(54,200,138,.15)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        marquee: "marquee 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s ease-in-out infinite",
        "blob-drift": "blobDrift 20s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
