/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#070b14",
        panel: "#0d1424",
        border: "#1c2740",
        accent: { DEFAULT: "#22d3ee", soft: "#67e8f9" },
        ok: "#22c55e",
        warn: "#f59e0b",
        danger: "#ef4444",
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
      },
      boxShadow: {
        glow: "0 0 24px -4px rgba(34,211,238,0.35)",
        panel: "0 8px 32px -8px rgba(0,0,0,0.6)",
      },
      keyframes: {
        "fade-in": { "0%": { opacity: 0, transform: "translateY(6px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        "pulse-ring": { "0%": { transform: "scale(0.9)", opacity: 0.7 }, "100%": { transform: "scale(1.4)", opacity: 0 } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
      animation: {
        "fade-in": "fade-in 0.35s ease-out",
        "pulse-ring": "pulse-ring 1.8s ease-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [],
};