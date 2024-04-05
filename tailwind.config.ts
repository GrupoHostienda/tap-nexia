import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sml: "550px",
      },
    },
  },
  plugins: [],
} satisfies Config;
