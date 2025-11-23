/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          400: '#FFD700',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

