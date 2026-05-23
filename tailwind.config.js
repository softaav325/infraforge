/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        premium: {
          black: '#030303',
          dark: '#080808',
          gray: '#121212',
          primary: '#6366f1', // Indigo 500 - Deep but vibrant
          secondary: '#a855f7', // Purple 500
          accent: '#e879f9', // Fuchsia 400
          highlight: '#22d3ee', // Cyan 400
          muted: '#4b5563',
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
      },
      borderRadius: {
        'premium': '1.25rem',
      },
      animation: {
        'glow': 'glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'grid-move': 'grid-move 20s linear infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'grid-move': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        }
      }
    },
  },
  plugins: [],
}
