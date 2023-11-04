/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar")],
  daisyui: {
    themes: ["light"],
  },
};
