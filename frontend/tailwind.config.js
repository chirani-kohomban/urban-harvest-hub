/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        ecoGreen: "#2F855A",
        ecoYellow: "#D69E2E",
      },

      fontFamily: {
        eco: ["Poppins", "sans-serif"],
      },
    },
  },

  plugins: [],
};