/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik-Regular", "sans-serif"],
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"],
      },
      colors: {
        primary: "#030014",
        accent: "#0762D9",
        bluePrimary: "#1b4974",
        // blueSecondary: "#0762D9",
        textPrimary: "#2B2A2A", // hitam
        textSecondary: "#3C3C43", // grey - gunakan dengan opacity-60 via class tailwind
        textTertiary: "#3C3C43", // abu abu muda - gunakan dengan opacity-40
        textBlue: "#3685CE", // biru awan
        textGreen: "#00AB4E",
        textRed: "#F9544A",
        transparentLine: "#3C3C43", // gunakan opacity-5
        icon: "#3C3C43", // gunakan opacity-20
        destructive: "#DC2626", // merah (untuk delete/warning)
        whiteBg: "#FFFFFF",
        secondary: "#E2E8F0",
        bax: {
          blueSea: "#407BFF",
          sky: "#3685CE",
          ocean: "#00CED1",
          sunset: "#FF7F50",
          yellow: "#FFD700",
          green: "#32CD32",
          sand: "#F5DEB3",
          maroon: "#800000",
          stone: "#808080",
          midnight: "#2C3E50",
          grey: "#3C3C43",
          blue: "0762D9",
          primaryBlue: "#2563EB",
        },
      },
    },
  },
  plugins: [],
};
