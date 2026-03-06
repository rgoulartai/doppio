/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          bg:        '#f5f5f7',
          surface:   '#ffffff',
          text:      '#1d1d1f',
          secondary: '#6e6e73',
          blue:      '#0071e3',
          'blue-hover': '#0077ed',
          border:    '#d2d2d7',
          divider:   '#e5e5ea',
          green:     '#34c759',
          'green-bg': '#f0fdf4',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        '2xs': ['11px', '14px'],
      },
      letterSpacing: {
        tighter: '-0.022em',
        tight:   '-0.016em',
      },
      borderRadius: {
        pill: '100px',
      },
      boxShadow: {
        'apple-card': '0 2px 8px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)',
        'apple-card-hover': '0 4px 16px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.06)',
        'apple-btn': '0 1px 3px rgba(0,113,227,0.3)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
