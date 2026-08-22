/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '390px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#030712',
          subtle: '#080E1E',
        },
        surface: {
          DEFAULT: '#0F172A',
          raised: '#1E293B',
          overlay: '#111C35',
        },
        border: {
          DEFAULT: '#1E293B',
          subtle: 'rgba(255, 255, 255, 0.08)',
          highlight: 'rgba(255, 255, 255, 0.16)',
        },
        content: {
          primary: '#F8FAFC',
          muted: '#94A3B8',
          subtle: '#64748B',
        },
        semantic: {
          cyan: {
            DEFAULT: '#38BDF8',
            dim: 'rgba(56, 189, 248, 0.12)',
            glow: 'rgba(56, 189, 248, 0.25)',
          },
          indigo: {
            DEFAULT: '#4F46E5',
            dim: 'rgba(79, 70, 229, 0.12)',
            glow: 'rgba(79, 70, 229, 0.25)',
          },
          emerald: {
            DEFAULT: '#10B981',
            dim: 'rgba(16, 185, 129, 0.12)',
            glow: 'rgba(16, 185, 129, 0.25)',
          },
          violet: {
            DEFAULT: '#A78BFA',
            dim: 'rgba(167, 139, 250, 0.12)',
            glow: 'rgba(167, 139, 250, 0.25)',
          },
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '0em',
        wide: '0.04em',
        wider: '0.08em',
        widest: '0.12em',
      },
      boxShadow: {
        'surface-subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
        'surface-elevated': '0 8px 30px -4px rgba(0, 0, 0, 0.7)',
        'glow-cyan': '0 0 24px -4px rgba(56, 189, 248, 0.25)',
        'glow-indigo': '0 0 24px -4px rgba(79, 70, 229, 0.25)',
        'glow-emerald': '0 0 24px -4px rgba(16, 185, 129, 0.25)',
        'glow-violet': '0 0 24px -4px rgba(167, 139, 250, 0.25)',
      },
    },
  },
  plugins: [],
};
