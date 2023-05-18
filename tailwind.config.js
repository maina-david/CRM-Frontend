const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const path = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: [
      "./public/**.*.html",
      "./src/**/*.vue",
      path.resolve(__dirname, "./node_modules/litepie-datepicker/**/*.js"),
    ],
  },
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "brand-gray-1": "#dadce0",
        "brand-blue-1": "#1967d2",
        "brand-blue-2": "#4285F4",
        "brand-green-1": "#137333",
        "litepie-primary": colors.sky, // color system for light mode
        "litepie-secondary": colors.gray, // color system for dark mode
      },
      boxShadow: {
        blue: "0 0 3px #4285f4",
      },
    },
  },
  variants: {
    extend: {
      margin: ["first"],
      cursor: ["disabled"],
      textOpacity: ["disabled"],
      textColor: ["disabled"],
    },
  },
  plugins: [],
};
