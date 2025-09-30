/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
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
