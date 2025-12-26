import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        display: ['Bebas Neue', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['8rem', { lineHeight: '1', letterSpacing: '0.02em' }],
        'display': ['6rem', { lineHeight: '1', letterSpacing: '0.02em' }],
        'display-sm': ['4rem', { lineHeight: '1.1', letterSpacing: '0.01em' }],
      },
      perspective: {
        'none': 'none',
        '500': '500px',
        '1000': '1000px',
        '2000': '2000px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 255, 255, 0.1)',
        'glow-lg': '0 0 40px rgba(255, 255, 255, 0.15)',
        'glow-xl': '0 0 60px rgba(255, 255, 255, 0.2)',
        'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.05)',
        'phantom': '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 255, 255, 0.05)',
        'phantom-hover': '0 35px 60px -15px rgba(0, 0, 0, 0.9), 0 0 50px rgba(255, 255, 255, 0.1)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 255, 255, 0.2)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
