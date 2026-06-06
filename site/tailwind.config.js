/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary:     '#ffffff',
        surface:     '#f8fafc',
        surface2:    '#f1f5f9',
        dark:        '#0f172a',
        dark2:       '#1e3a5f',
        accent:      '#0891b2',
        accenth:     '#0e7490',
        accentl:     '#e0f2fe',
        textprimary: '#0f172a',
        textmuted:   '#64748b',
        borderlight: '#e2e8f0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
