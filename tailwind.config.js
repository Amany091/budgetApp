/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      colors: {
        'primary': '#714fda',
        'income': '#e53b89',
        'expanse': '#648696',
      }
    },
  },
  plugins: [],
}

