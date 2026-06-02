/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          50:  '#f0f4ff',
          100: '#e0e9ff',
          200: '#c2d2ff',
          300: '#94b0ff',
          400: '#6080ff',
          500: '#3d5cff',
          600: '#2438f0',
          700: '#1c2ddb',
          800: '#1927b0',
          900: '#1a268a',
          950: '#111760',
        },
        jade: {
          400: '#34e0a1',
          500: '#10c97b',
          600: '#08a362',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        coral: {
          400: '#fb7185',
          500: '#f43f5e',
        },
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 0.5s ease forwards',
        'slide-up': 'slide-up 0.5s ease forwards',
        'flip': 'flip 0.6s ease forwards',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'flip': {
          from: { transform: 'rotateY(0deg)' },
          to: { transform: 'rotateY(180deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
