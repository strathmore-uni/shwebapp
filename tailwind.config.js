/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        'strathmore-yellow': '#cfa052',
        'strathmore-blue': '#02338D',
        'strathmore-yellow-light': '#CC9C4A',
        'nav-blue': '#344f9e',
        'search-green': '#6d9296',
        'strathmore-red': '#b3262a',
        'strathmore-grey': '#707070',
        'nav-logged': '#f2f8fe',
        'mockup-yellow': '#f0ae12',
        'grey': '#f8f9fa',
      },
    },
  },
  plugins: [],
}

