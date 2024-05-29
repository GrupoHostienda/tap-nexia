import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sml: "550px",
      },
      boxShadow: {
        heavy:
          "0.7px 0.9px 0.9px hsl(0deg 0% 0% / 0.81), 12.8px 17.7px 16.4px -2.5px hsl(0deg 0% 0% / 0.54), 98.1px 135.1px 125.2px -5px hsl(0deg 0% 0% / 0.27)",
      },
    },
  },
  plugins: [],
} satisfies Config;
