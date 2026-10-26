/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fb',
          400: '#36acf7',
          500: '#0c91e8',
          600: '#0273c7',
          700: '#054a91',
          800: '#03396c',
          900: '#00274c',
          950: '#00172d',
        },
        leaf: {
          50: '#f1fcf3',
          100: '#def8e3',
          200: '#bef0c9',
          300: '#8ce3a1',
          400: '#52cd71',
          500: '#2ea84d',
          600: '#21893c',
          700: '#1d6d32',
          800: '#1b572b',
          900: '#174825',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        accent: {
          emerald: '#21893c',
          whatsapp: '#25D366',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(0, 39, 76, 0.05), 0 1px 4px -1px rgba(0, 39, 76, 0.03)',
        'soft-md': '0 8px 24px -4px rgba(0, 39, 76, 0.08), 0 4px 12px -2px rgba(0, 39, 76, 0.04)',
        'soft-lg': '0 16px 36px -6px rgba(0, 39, 76, 0.10), 0 8px 20px -4px rgba(0, 39, 76, 0.05)',
        'soft-xl': '0 24px 48px -12px rgba(0, 39, 76, 0.15)',
        'glass': '0 8px 32px 0 rgba(5, 74, 145, 0.09)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    },
  },
  plugins: [],
}
