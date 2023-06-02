import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      'primary': '#1a1a1e',
      'secondary': '#26262a',
      'btn-primary': '#4685ff',
      'btn-secondary': '#f2f2f2',
      'accent': '#ffb084',
    }
  },
  plugins: [],
} satisfies Config;
