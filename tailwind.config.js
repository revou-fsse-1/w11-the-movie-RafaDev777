module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "390px",
      lg: "1280px",
    },

    fontFamily: {
      sans: ["roboto", "sans-serif"],
      display: ["poppins", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#37C6F3",
      },
    },
  },
  plugins: [],
};
