import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF8F4",
        text: "#2B2B2B",
        accent: "#D6A46D",
        highlight: "#C07B56",
        border: "#CFCAC4",
        secondary: "#EDEAE7",
        kkAccent: "#D18A42",
        kkDark: "#222222",
      },
      borderRadius: {
        lg: "var(--radius)",
      },
    },
  },
  plugins: [],
};
export default config;
