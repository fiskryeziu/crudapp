import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: "#000",
        white: "#fff",
        gray: {
          100: "#f7fafc",
          // Add other shades of gray if needed
        },
        // Add your custom colors here
        primary: "#1a1a1e",
        secondary: "#26262a",
        "btn-primary": "#4685ff",
        "btn-secondary": "#f2f2f2",
        accent: "#ffb084",
      },
    },
  },
  plugins: [],
} satisfies Config;
