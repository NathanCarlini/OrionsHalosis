/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'tropical-green' : '#00DBAF',
        'marine-blue' : '#1A5382',
        'main-blue' : '#523FFC',
        'main-purple' : '#BB2EE6',
        'main-red' : '#FF0D41',
      },
    },
  },
  plugins: [],
}
