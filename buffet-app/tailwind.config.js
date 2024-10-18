/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Lato: ["Lato", "sans-serif"],
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeOut: "fadeOut 0.5s ease-in-out",
        "one-spin": "spin 0.5s ease-in-out",
        wiggle: "wiggle 0.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      colors: {
        primary: "#14ce9c",
        secondary: "#00A699",
        tertiary: "#FFB400",
        quaternary: "#787878",
        quinary: "#FFFFFF",
        transparentBlack: "rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
