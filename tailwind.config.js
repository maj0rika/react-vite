/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#862ddf',
      },
    },
    screens: {
      desktop: { min: '640px' },
      mobile: { max: '639px' },
    },
  },
  plugins: [],
}
