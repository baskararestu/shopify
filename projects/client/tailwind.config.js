/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],

  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#23A6F0",

          secondary: "#61d3b5",

          accent: "#2DC071",

          neutral: "#332833",

          "base-100": "#FFFFFF",

          info: "#2b67de",

          success: "#78e2d6",

          warning: "#ae7209",

          error: "#ed1d5e",
          textBlack: "#252B42",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
};
