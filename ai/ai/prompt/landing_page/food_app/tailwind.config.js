/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          50: '#FFF4EF',
          100: '#FFE8DB',
          200: '#FFCEB3',
          300: '#FFAD85',
          400: '#FF8C57',
          500: '#FF6B35',
          600: '#E54F1E',
          700: '#BF3D12',
          800: '#992E0B',
          900: '#732208',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0,0,0,0.05)',
        'card': '0 4px 24px rgba(0,0,0,0.06)',
        'elevated': '0 8px 40px rgba(0,0,0,0.08)',
        'button': '0 4px 14px rgba(255,107,53,0.35)',
      },
    },
  },
  plugins: [],
}
