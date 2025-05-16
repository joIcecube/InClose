/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          green: '#00ff90',
          dark: '#00cc72'
        },
        dark: {
          DEFAULT: '#030712',
          lighter: '#111827',
          light: '#1f2937'
        },
        success: {
          DEFAULT: '#10b981',
          light: '#34d399',
          dark: '#059669'
        },
        warning: {
          DEFAULT: '#f59e0b',
          light: '#fbbf24',
          dark: '#d97706'
        },
        error: {
          DEFAULT: '#ef4444',
          light: '#f87171',
          dark: '#dc2626'
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0, 255, 144, 0.5), 0 0 20px rgba(0, 255, 144, 0.3), 0 0 30px rgba(0, 255, 144, 0.1)',
        'neon-strong': '0 0 15px rgba(0, 255, 144, 0.7), 0 0 30px rgba(0, 255, 144, 0.5), 0 0 45px rgba(0, 255, 144, 0.3)',
      },
      backgroundImage: {
        'glow-radial': 'radial-gradient(circle, rgba(0, 255, 144, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
      }
    },
  },
  plugins: [],
};

