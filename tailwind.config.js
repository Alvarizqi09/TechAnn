/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '15px'
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px'
    },
    extend: {
      colors: {
        primary: '#FFFFFF',
        accent: {
          DEFAULT: '#91C788',
          hover: '#52734D'
        }
      }
    }
  },
  plugins: [require('daisyui')]
}
