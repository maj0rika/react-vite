/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#862ddf',
      },
      boxShadow: {
        base: '4px 4px 4px 0 rgba(12, 0, 24, 0.1)',
        hover: '8px 8px 8px 0 rgba(12, 0, 24, 0.1)',
        '3xl': '10px 35px 60px -15px rgba(0, 0, 0, 0.3)',
        '4xl': '10px 50px 100px -20px rgba(0, 0, 0, 0.25)',
      },
    },
    screens: {
      desktop: { min: '640px' },
      mobile: { max: '639px' },
    },
  },
  plugins: [],
}
