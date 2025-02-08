/** @type {import('tailwindcss').Config} */

module.exports = {
  // purge: ["./src/**/**/*.html", "./src/**/*.js"],
  content: [
    "./index.html",
    "./src/partials/**/*.html",
    "src/sass/*.sass",
    "src/css/*.css",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      // fontSize: {
      //   h1: "4rem", // 48px
      //   h2: "2.25rem", // 36px
      //   h3: "1.875rem", // 30px
      // },
      backgroundImage: {
        hero: "url('/assets/img/hero-bg.png')",
      },
      colors: {
        "link-active": "oklch(var(--link-active) / <alpha-value>)",
      },
    },
  },
  daisyui: {
    themes: [
      "light",
      {
        mytheme: {
          ...require("daisyui/src/theming/themes")["mytheme"],
          primary: "oklch(0.72 0.07 71.14 / 1)",
          secondary: "oklch(0.62 0.07 70.92 / 1)",
          accent: "oklch(0.44 0.05 70.03 / 1)",
          "--link-active": "0.44 0.05 70.03",
          "accent-content": "#fff",
          neutral: "oklch(0.72 0.07 71.14 / 1)", // colors for active and hover menu
          "neutral-content": "oklch(0.96 0 0 / 1)",
          "base-100": "#FFFFFF",
          "base-200": "#F0EAE3",
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
