import type { Config } from "tailwindcss";

// Tailwind looks through these files for class names it should generate styles for.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // A calm, warm palette. High contrast against the cream background.
        cream: "#FAF6EF",
        ink: "#1F2933", // near-black for body text — strong contrast
        brand: {
          // The companion's accent colour: a warm, trustworthy teal-green.
          DEFAULT: "#2F6F6A",
          dark: "#234F4B",
          soft: "#E5F0EE",
        },
      },
      fontSize: {
        // Senior-friendly type scale. Body text never goes below 18px.
        base: ["1.25rem", { lineHeight: "1.7" }], // 20px
        lg: ["1.375rem", { lineHeight: "1.7" }], // 22px
        xl: ["1.625rem", { lineHeight: "1.5" }], // 26px
        "2xl": ["2rem", { lineHeight: "1.4" }], // 32px
      },
    },
  },
  plugins: [],
};

export default config;
