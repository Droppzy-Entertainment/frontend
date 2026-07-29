import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        "bg-2": "var(--color-bg-2)",
        surface: "var(--color-surface)",
        elevated: "var(--color-elevated)",
        divider: "var(--color-divider)",
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          100: "var(--color-accent-100)",
          200: "var(--color-accent-200)",
          300: "var(--color-accent-300)",
          400: "var(--color-accent-400)",
          500: "var(--color-accent-500)",
          600: "var(--color-accent-600)",
          700: "var(--color-accent-700)",
          800: "var(--color-accent-800)",
          900: "var(--color-accent-900)",
        },
        text: {
          DEFAULT: "var(--color-text)",
          dim: "var(--color-text-dim)",
          mute: "var(--color-text-mute)",
        },
        neutral: {
          100: "var(--color-neutral-100)",
          200: "var(--color-neutral-200)",
          300: "var(--color-neutral-300)",
          400: "var(--color-neutral-400)",
          500: "var(--color-neutral-500)",
          600: "var(--color-neutral-600)",
          700: "var(--color-neutral-700)",
          800: "var(--color-neutral-800)",
          900: "var(--color-neutral-900)",
        },
        section: "var(--color-section)",
        titanium: {
          DEFAULT: "var(--color-titanium)",
          dim: "var(--color-titanium-dim)",
        },
      },
      spacing: {
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        6: "var(--space-6)",
        8: "var(--space-8)",
        12: "var(--space-12)",
        16: "var(--space-16)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        script: ["var(--font-script)"],
      },
      transitionTimingFunction: {
        cinematic: "var(--ease-cinematic)",
      },
      transitionDuration: {
        entrance: "800ms",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
