/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'twinkle': 'twinkle 1.5s ease-in-out infinite',
        'float-sparkle': 'float-sparkle 8s linear infinite',
        'magical-glow': 'magical-glow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(99, 102, 241, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
        sparkle: {
          '0%, 100%': { 
            opacity: '0',
            transform: 'scale(0) rotate(0deg)'
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1) rotate(180deg)'
          },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        'float-sparkle': {
          '0%': { 
            transform: 'translateY(100vh) rotate(0deg)',
            opacity: '0'
          },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { 
            transform: 'translateY(-100px) rotate(360deg)',
            opacity: '0'
          },
        },
        'magical-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
            filter: 'hue-rotate(0deg)'
          },
          '25%': { 
            boxShadow: '0 0 30px rgba(236, 72, 153, 0.4)',
            filter: 'hue-rotate(90deg)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.5)',
            filter: 'hue-rotate(180deg)'
          },
          '75%': { 
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)',
            filter: 'hue-rotate(270deg)'
          },
        },
      },
    },
  },
  plugins: [],
}