/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ['Futura', 'sans-serif'],
      body: ['Futura', 'sans-serif'],
  },
    extend: {
      colors:{
        themeColor:'#5cbdb9',
        lighColor:'#f0f0ef',
        lightGreen:'#90EE90',
        lightBlue:'#87CEEB'
      }
    },
  },
  plugins: [],
}