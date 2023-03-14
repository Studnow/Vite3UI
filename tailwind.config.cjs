/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/partials/*.html", "src/sass/*.sass", "src/css/*.css", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#FFC83E",
          secondary: "#FA5914",
          accent: "#FF7B00",
          "accent-content": "#fff",
          neutral: "#23212C",
          "base-100": "#FFFFFF",
          "base-200": "#F6F9FC",
          info: "#A8E2F0",
          success: "#15847B",
          warning: "#E78B13",
          error: "#EE3F53",
          output: "#45515F",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
