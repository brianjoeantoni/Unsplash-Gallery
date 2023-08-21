/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      mxl: { max: "9999px" },
      // => @media (max-width: 1279px) { ... }

      mlg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      mmd: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      msm: { max: "500px" },
      // => @media (max-width: 639px) { ... }

      xl: { min: "1279px" },
      // => @media (min-width: 1279px) { ... }

      lg: { min: "1023px" },
      // => @media (min-width: 1023px) { ... }

      md: { min: "767px" },
      // => @media (min-width: 767px) { ... }

      sm: { min: "500px" },
      // => @media (min-width: 639px) { ... }
    },
  },
  plugins: [],
};
