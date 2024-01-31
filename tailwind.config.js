/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      borderRadius: {
        md: "0.375rem",
        lg: "1.4rem",
        full: "9999px",
        medium: "80px",
        large: "2.5rem",
      },
      colors: {
        "primary-gray": "#EDEDEA",
        primary: "#D5C39A",
      },
    },

    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
  },
  plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};
