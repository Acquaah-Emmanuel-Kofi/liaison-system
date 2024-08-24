/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'Primary-Blue':'#142965',
        'Border-Blue':'#142965',
        'Bright-Blue':'#475C98',
        'Primary-Black':'#333131',
        'Lighter-Blue':'#D1D9E2',
        'Lighter-Gray':'#F9FBFD'
      }
    },
  },
  plugins: [],
};
