/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.html',
  ],
  theme: {
    // container: {
    //   center: true,
    //   // padding: '15px',
    //   padding: {
    //     DEFAULT: '18px',
    //     sm: '15px',
    //   },
    // },
    screens: {
      'xs': '480px',
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1280px',
    },
    // extend: {
    //   fontSize: {
    //     xl: ['1.25rem', '1.5'],
    //     "4xl": ['2.25rem', '1.25'],
    //   }
    // },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}