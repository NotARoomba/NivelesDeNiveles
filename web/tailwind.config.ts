import type {Config} from 'tailwindcss';

export default {
  content: ['./index.html', './src/tsx/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway'],
      },
      keyframes: {
        slowBounce: {
          '0%': {
            transform: 'translateY(10px)',
          },
          '100%': {
            transform: 'translateY(-10px)',
          },
        },
      },
      animation: {
        slowBounce: 'slowBounce 2s ease-in-out infinite alternate-reverse both',
      },
      backgroundImage: {
        github: "url('/portfolio/hub.png')",
      },
      colors: {
        turple: '#5335A9',
        lightText: '#6189a2',
        accent: {
          DEFAULT: '#9de5ff',
          100: '#003d53',
          200: '#0079a5',
          300: '#00b6f8',
          400: '#4bcfff',
          500: '#9de5ff',
          600: '#b1eaff',
          700: '#c5efff',
          800: '#d8f5ff',
          900: '#ecfaff',
        },
        main: {
          DEFAULT: '#18007c',
          100: '#050018',
          200: '#0a0031',
          300: '#0f0049',
          400: '#140062',
          500: '#18007c',
          600: '#2800c8',
          700: '#4516ff',
          800: '#8364ff',
          900: '#c1b1ff',
        },
        highlight: {
          DEFAULT: '#a285fc',
          100: '#14024b',
          200: '#280495',
          300: '#3c06e0',
          400: '#6938fa',
          500: '#a285fc',
          600: '#b49cfc',
          700: '#c7b4fd',
          800: '#d9cdfe',
          900: '#ece6fe',
        },
        light: {
          DEFAULT: '#f1eeff',
          100: '#120063',
          200: '#2400c6',
          300: '#512aff',
          400: '#a28dff',
          500: '#f1eeff',
          600: '#f5f3ff',
          700: '#f8f6ff',
          800: '#faf9ff',
          900: '#fdfcff',
        },
        dark: {
          DEFAULT: '#180155',
          100: '#050011',
          200: '#090022',
          300: '#0e0133',
          400: '#130145',
          500: '#180155',
          600: '#2e02aa',
          700: '#4604fc',
          800: '#8457fd',
          900: '#c1abfe',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
