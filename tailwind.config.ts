import type { Config } from "tailwindcss";

// Biscuit's bold, senior-friendly design system (teal direction).
// Colours and sizes here were chosen for high contrast and aging-eye comfort.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF4E8", // warm off-white page background (not pure white, to cut glare)
        surface: "#FFFFFF", // cards, bubbles, input
        ink: "#1C1A22", // near-black body text — very high contrast
        subtitle: "#5C5866", // muted grey for secondary text (still AA on cream)
        edge: "#CCE7E3", // soft teal hairline / borders
        brand: {
          DEFAULT: "#0F766E", // primary teal
          dark: "#134E4A", // dark teal — safe for text/labels on cream (passes AA)
          bright: "#14B8A6", // lighter teal for the button gradient top
          soft: "#D5EFEA", // pale teal wash (read-aloud, focus)
        },
        // Action-tile colours: soft friendly background + dark same-hue label (AA-safe).
        green: { soft: "#CDEFD9", deep: "#14532D", line: "#8FCDA8" },
        amber: { soft: "#FBE8C8", deep: "#92400E", line: "#EBC78A" },
        coral: { soft: "#FBDAD3", deep: "#9B1C1C", line: "#F0ABA1" },
      },
      fontFamily: {
        // Wired up to the fonts loaded in app/layout.tsx.
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        // Soft coloured glow under the round "talk" button.
        talk: "0 14px 30px -6px rgba(13,148,136,0.40), 0 4px 10px rgba(28,26,34,0.12)",
      },
      backgroundImage: {
        "talk-gradient": "linear-gradient(160deg, #14B8A6 0%, #0F766E 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
