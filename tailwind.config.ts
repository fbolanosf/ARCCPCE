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
        petrolDark: "#061d1e",
        petrolDeep: "#0b2928",
        petrolLight: "#134240",
        caribbeanAqua: "#00d2b4",
        caribbeanEmerald: "#10b981",
        amberGold: "#d4af37",
        goldLight: "#f5e6a8",
        slateDark: "#091717",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-montserrat)", "sans-serif"],
        serifTitle: ["var(--font-playfair)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
