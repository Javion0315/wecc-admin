/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  mode: 'jit',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    'node_modules/tv-*/dist/tv-*.umd.min.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          'blue': '#3B5891',
        }
      },
      backgroundImage: {
        'login': "url('@/assets/images/bg-login-img.png')",
      }
    }
  }
}
