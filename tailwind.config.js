// https://tailwindcss.com/docs/configuration
/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    fontSize: {
      xs: "0.75rem" /* 12px */,
      sm: "0.875rem" /* 14px */,
      base: "1rem" /* 16px */,
      lg: "1.125rem" /* 18px */,
      xl: "1.25rem" /* 20px */,
      "4xl": "5.5rem" /* 88px */,
      "5xl": "7.5rem" /* 120px */,
    },
    boxShadow: {
      "2xl": "0px 24px 48px -12px rgba(16, 24, 40, 0.18)",
    },
    extend: {
      fontSize: {
        "display-xs": "1.5rem" /* 24px */,
        "display-sm": "1.875rem" /* 30px */,
        "display-base": "2.25rem" /* 36px */,
        "display-lg": "3rem" /* 48px */,
        "display-xl": "3.75rem" /* 60px */,
        "display-2xl": "4.5rem" /* 72px */,
        "display-3xl": "4.5rem" /* 72px */,
        "display-4xl": "5.5rem" /* 88px */,
        "display-5xl": "13.5rem" /* 216px */,
      },
      lineHeight: {
        "4xl": "109.12px",
      },
      letterSpacing: {
        "4xl": "-0.2rem",
      },
      colors: {
        brand: {
          100: "#FBFDFC",
          200: "#E9F0EA",
          300: "#94A295",
          500: "#4CAF50",
          900: "#1B281B",
        },
        black: {
          100: "#fafafa",
          200: "#eaeaea",
          300: "#999999",
          400: "#888888",
          500: "#666666",
          600: "#444444",
          700: "#333333",
          800: "#111111",
          900: "#171717",
        },
        error: {
          500: "#F04438",
        },
        warning: {
          500: "#F79009",
        },
        success: {
          500: "#17B26A",
        },
      },
      borderRadius: {
        none: "0",
        sm: ".125rem",
        DEFAULT: ".25rem",
        lg: ".5rem",
        full: "9999px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        custom: "0px 1px 2px 0px #1018280D",
      },
    },
    variants: {
      fill: ["hover", "focus"],
    },
  },
  plugins: [],
};
