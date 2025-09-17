/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        pink: {
          500: "#FF6EC7",
        },
        purple: {
          500: "#A855F7",
        },
      },
    },
  },
  plugins: [],
};
