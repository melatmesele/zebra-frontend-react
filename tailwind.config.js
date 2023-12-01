/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
      
      'md': '0.375rem',
      'lg': '1.4rem',
      'full': '9999px',
      'medium':'80px',
      'large': '2.5rem',
    }
    },
  },
  plugins: [],
}