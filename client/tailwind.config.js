/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Using Inter as a modern sans-serif font
      },
      colors: {
        primary: '#3B82F6', // A vibrant blue
        secondary: '#6B7280', // A soft gray
        accent: '#FACC15', // A bright yellow for highlights
        background: '#F9FAFB', // Light background
        card: '#FFFFFF', // Card background
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        popIn: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        slideInUp: 'slideInUp 0.6s ease-out forwards',
        popIn: 'popIn 0.4s ease-out forwards',
        shimmer: 'shimmer 1.5s infinite linear',
      }
    },
  },
  plugins: [],
}