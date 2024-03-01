const svgToDataUri = require("mini-svg-data-uri");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      synblack: "#101010",
      synblue: "#2d5bff",
      synwhite: "#ffffff",
      syngold: "#ECBE1C",
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      synblack: "#101010",
      synblue: "#2d5bff",
      synwhite: "#ffffff",
      syngold: "#ECBE1C",
    }),
    borderColor: (theme) => ({
      ...theme("colors"),
      synblack: "#101010",
      synblue: "#2d5bff",
      synwhite: "#ffffff",
      syngold: "#ECBE1C",
    }),

    extend: {
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
