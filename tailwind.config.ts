import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Performance optimizations
  corePlugins: {
    preflight: true,
  },
  // Reduce CSS size by removing unused utilities
  safelist: [
    // Keep essential animation classes
    'animate-flip',
    'animate-rotate-word',
    // Keep transform classes used in animations
    'transform',
    'translate-x-full',
    'translate-y-0',
    'opacity-0',
    'opacity-100',
  ],
  theme: {
    extend: {
      colors: {
        'secondary': '#ff6b35',
        primary: '#0656CE',
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
      },
      fontFamily: {
        'quicksand': ['Quicksand', 'sans-serif'],
        'ubuntu': ['Ubuntu', 'sans-serif'],
        'plus-jakarta-regular': ['Plus Jakarta Sans', 'sans-serif'],
        'plus-jakarta-light': ['Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'flip': 'flip 0.7s ease-in-out',
        'rotate-word': 'rotateWord 0.5s ease-in-out',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        rotateWord: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0px)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  // Optimize for faster builds
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
}

export default config