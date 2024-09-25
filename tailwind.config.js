module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          // 50: '#F3F4F6',
          // 100: '#E5E7EB',
          // 200: '#D1D5DB',
          // 300: '#9CA3AF',
          // 400: '#6B7280',
          // 500: '#4B5563',
          // 600: '#374151',
          // 700: '#1F2937',
          // 800: '#111827',
          // 900: '#0C111B',

          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
      },
    },
  },
  plugins: [],
};
