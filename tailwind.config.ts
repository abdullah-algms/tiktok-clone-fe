import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        toastIn: "toastIn .8s both",
        toastOut: "toastOut .8s both",
      },
      keyframes: {
        toastIn: {
          "0%": {
            transform: "var(--elm-translate) scale(0.7)",
            opacity: "0.7",
          },
          "80%": { transform: "translate(0px) scale(0.7)", opacity: "0.7" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        toastOut: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "20%": { transform: "translate(0px) scale(0.7)", opacity: " 0.7" },
          "100%": {
            transform: "var(--elm-translate) scale(0.7)",
            opacity: "0.7",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
