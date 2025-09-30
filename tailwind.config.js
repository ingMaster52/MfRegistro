/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontsize: {
        40: "40px",
        16: "16px",
      },
      lineHeight: {
        48: "48px",
      },
      maxWidth: {
        656: "656px",
      },
      width: {
        328: "328px",
      },
      height: {
        48: "48px",
      },
      colors: {
        brand: {
          dark: "#212529",
          hover: "#3B4350",
          light: "#E0E0E0",
        },
        gris: {
          100: "#E0E0E0",
          200: "#ededed",
          300: "#929292",
          400: "#727272",
          500: "#575757",
        },
        focusblue: "#2698B3",
        errorred: "#A10303",
        scroll: {
          thumb: "#a2a2a2",
          track: "#ededed",
        },
      },

      fontFamily: {
        prosperoBold: ["Prospero-Bold", "sans-serif"],
        prosperoBoldItalic: ["Prospero-BoldItalic", "sans-serif"],
        prosperoExtralight: ["Prospero-Extralight", "sans-serif"],
        prosperoRegular: ["Prospero-Regular", "sans-serif"],
        prosperoSemibold: ["Prospero-SemiBold", "sans-serif"],
        prosperoSemiboldItalic: ["Prospero-SemiBoldItalic", "sans-serif"],
      },
    },
  },
  plugins: ["tailwind-scrollbar"],
};
