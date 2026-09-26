/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "rgb(var(--c-bg-950) / <alpha-value>)",
          900: "rgb(var(--c-bg) / <alpha-value>)",
          800: "rgb(var(--c-panel) / <alpha-value>)",
          700: "rgb(var(--c-panel-2) / <alpha-value>)",
          600: "rgb(var(--c-panel-3) / <alpha-value>)",
          border: "rgb(var(--c-border) / <alpha-value>)",
        },
        // amber: {
        //   DEFAULT: "#F2A93B",
        //   soft: "#F7C36B",
        //   dim: "#8A6425",
        // },
        amber: {
  DEFAULT: "#A855F7",
  soft: "#C084FC",
  dim: "#6B21A8",
},
        teal: {
          DEFAULT: "#5FD0C0",
        },
        ink_text: {
          primary: "rgb(var(--c-text-primary) / <alpha-value>)",
          secondary: "rgb(var(--c-text-secondary) / <alpha-value>)",
          faint: "rgb(var(--c-text-faint) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(var(--c-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--c-grid-line) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "36px 36px",
      },
      keyframes: {
        pulseNode: {
          "0%, 100%": { opacity: 0.35, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.35)" },
        },
        dash: {
          to: { strokeDashoffset: "-200" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          from: { opacity: 0, transform: "translateY(28px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        blink: {
          "0%, 49%": { opacity: 1 },
          "50%, 100%": { opacity: 0 },
        },
      },
      animation: {
        pulseNode: "pulseNode 2.6s ease-in-out infinite",
        dash: "dash 8s linear infinite",
        floatSlow: "floatSlow 6s ease-in-out infinite",
        fadeUp: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        blink: "blink 1s step-start infinite",
      },
    },
  },
  plugins: [],
};
