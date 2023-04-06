module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ["roboto", "sans-serif"],
      display: ["poppins", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#37C6F3",
      },
      screens:{
        sm: "390px",
      lg: "1280px",

      }
    },
  },
  plugins: [],
};
