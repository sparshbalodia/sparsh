/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "#111113",
          900: "#18181b",
          800: "#313135",
        },
        platinum: {
          50: "#f1f2f4",
        },
        grey: {
          400: "#95989d",
          500: "#7a7e85",
          800: "#313335",
        },
      },
      fontFamily: {
        dewi: ["RF Dewi", "sans-serif"],
      },
    },
  },
  plugins: [],
};