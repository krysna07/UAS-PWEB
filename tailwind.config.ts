import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#090B10",
          secondary: "#0D1017",
          card: "#121520",
          border: "#1E2333",
          hover: "#1A1F2E",
        },
        neon: {
          green: "#00FF88",
          "green-dim": "#00CC6A",
          yellow: "#FFD700",
          "yellow-dim": "#CCA800",
          red: "#FF3B5C",
          "red-dim": "#CC2F4A",
          blue: "#00D4FF",
          "blue-dim": "#00AACC",
          purple: "#A855F7",
        },
        text: {
          primary: "#E8EAF0",
          secondary: "#8B90A0",
          muted: "#4A4F62",
          accent: "#00D4FF",
        },
        slate: {
          850: "#111827",
          950: "#060811",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Roboto Mono", "Courier New", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-green": "glowGreen 2s ease-in-out infinite alternate",
        "glow-yellow": "glowYellow 2s ease-in-out infinite alternate",
        "glow-red": "glowRed 2s ease-in-out infinite alternate",
        "spin-slow": "spin 8s linear infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "scan-line": "scanLine 3s linear infinite",
      },
      keyframes: {
        glowGreen: {
          "0%": { boxShadow: "0 0 5px #00FF88, 0 0 10px #00FF8840" },
          "100%": { boxShadow: "0 0 15px #00FF88, 0 0 30px #00FF8860" },
        },
        glowYellow: {
          "0%": { boxShadow: "0 0 5px #FFD700, 0 0 10px #FFD70040" },
          "100%": { boxShadow: "0 0 15px #FFD700, 0 0 30px #FFD70060" },
        },
        glowRed: {
          "0%": { boxShadow: "0 0 5px #FF3B5C, 0 0 10px #FF3B5C40" },
          "100%": { boxShadow: "0 0 15px #FF3B5C, 0 0 30px #FF3B5C60" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(ellipse at center, rgba(0,212,255,0.05) 0%, transparent 70%)",
      },
      backgroundSize: {
        "grid-sm": "40px 40px",
      },
      boxShadow: {
        "neon-green": "0 0 20px rgba(0, 255, 136, 0.3)",
        "neon-yellow": "0 0 20px rgba(255, 215, 0, 0.3)",
        "neon-red": "0 0 20px rgba(255, 59, 92, 0.3)",
        "neon-blue": "0 0 20px rgba(0, 212, 255, 0.3)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
