/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        '1r': '3.25rem',
        '2r': '5.75rem',
        '3r': '7rem',
        '4r': '10rem',
        '5r': '15rem',
        '10%': '10%',
        '15%': '15%',
        '20%': '20%',
        '25%': '25%',
        '30%': '30%',
        '35%': '35%',
        '40%': '40%',
        '45%': '45%',
        '50%': '50%',
        '55%': '55%',
        '60%': '60%',
        '65%': '65%',
      }
    },
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      pearl: "#f2f2eb",
      mistysky: "#d2dce6",
      dustyblue: "#9cabb4",
      clay: "#ab644b",
      wine: "#72383d",
      chocolate: "#401b1b",
      lightgrey: "#aaaaaa",
    },
  },
  plugins: [],
};
