import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // OSTA dark navy palette
        ink: {
          950: "#070b14",
          900: "#0a1020",
          850: "#0d1426",
          800: "#111a30",
          700: "#16213d",
          600: "#1d2b4d",
        },
        brand: {
          DEFAULT: "#2f6bff",
          50: "#eaf1ff",
          400: "#5b8bff",
          500: "#2f6bff",
          600: "#1f57e6",
        },
        accent: {
          green: "#10b981",
          orange: "#f59e0b",
          purple: "#8b5cf6",
          cyan: "#06b6d4",
          red: "#ef4444",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
export default config;
