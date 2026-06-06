/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:         '#0f172a',
        surface:    '#1e293b',
        accent:     '#00b4d8',
        'accent-h': '#0090b0',
        border:     '#334155',
        text:       '#f1f5f9',
        muted:      '#94a3b8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
