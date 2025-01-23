/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF8D00',
          hover: '#FFAE00',
          active: '#E57F00'
        },
        secondary: {
          DEFAULT: '#555555',
          hover: '#7A7A7A',
          active: '#3B3B3B'
        },
        error: {
          DEFAULT: '#B41D1D',
          light: '#FFE9E9',
          hover: '#DB2323',
          active: '#9C1919'
        },
        success: {
          DEFAULT: '#1DB44E',
          light: '#DFFFEA',
          hover: '#17A03E',
          active: '#148C35'
        },
        grayscale: {
          100: '#000000',
          200: '#333333',
          300: '#555555',
          400: '#AAAAAA',
          500: '#CCCCCC',
          600: '#DDDDDD',
          700: '#EEEEEE',
          800: '#F5F5F5',
          900: '#FFFFFF'
        }
      },
      fontSize: {
        '2xs': ['11px', { lineHeight: '14px', letterSpacing: '0px' }],
        xs: ['12px', { lineHeight: '16px', letterSpacing: '0px' }],
        sm: ['13px', { lineHeight: '18px', letterSpacing: '0px' }],
        base: ['14px', { lineHeight: '20px', letterSpacing: '0px' }],
        md: ['16px', { lineHeight: '24px', letterSpacing: '0px' }],
        lg: ['18px', { lineHeight: '26px', letterSpacing: '0px' }],
        xl: ['24px', { lineHeight: '32px', letterSpacing: '0px' }],
        '2xl': ['32px', { lineHeight: '38px', letterSpacing: '0px' }],
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      spacing: {
        sm: '5px',
        md: '10px',
        default: '15px',
        lg: '20px',
        xl: '30px'
      },
      boxShadow: {
        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}

