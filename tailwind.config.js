/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8A2027",
        secondary: "#373790",
        red: "#ff4747",
        green: "#71c02b",
        yellow: "#fcf806",
        lightPrimary: "#b79396",
        black: "rgb(24, 24, 24)",
        lightBlack: "rgb(58, 58, 58)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
