import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--color-cream)",
        ink: "var(--color-ink)",
        sage: "var(--color-sage)",
        lavender: "var(--color-lavender)",
        periwinkle: "var(--color-periwinkle)",
        plum: "var(--color-plum)",
        yolk: "var(--color-yolk)",
        muted: "var(--color-muted)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
        accent: ["var(--font-accent)", "Arial", "sans-serif"],
        work: ["var(--font-work)", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 2px rgba(0, 0, 0, 0.25)",
        hairline: "0 1px 1px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
