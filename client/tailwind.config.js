/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0A0F1D',
          card: '#111C38',
          cardHover: '#162347',
          surface: '#131F37',
          border: '#1E293B',
          borderLight: '#2B3958',
          muted: '#94A3B8',
          text: '#F8FAFC'
        },
        light: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          cardHover: '#F1F5F9',
          surface: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B',
          text: '#0F172A'
        },
        student: {
          primary: '#3B82F6',
          dark: '#1D4ED8',
          light: '#60A5FA',
          bg: '#EFF6FF',
          darkBg: 'rgba(59, 130, 246, 0.12)',
          glow: 'rgba(59, 130, 246, 0.35)'
        },
        college: {
          primary: '#8B5CF6',
          dark: '#6D28D9',
          light: '#A78BFA',
          bg: '#F5F3FF',
          darkBg: 'rgba(139, 92, 246, 0.12)',
          glow: 'rgba(139, 92, 246, 0.35)'
        },
        company: {
          primary: '#10B981',
          dark: '#047857',
          light: '#34D399',
          bg: '#ECFDF5',
          darkBg: 'rgba(16, 185, 129, 0.12)',
          glow: 'rgba(16, 185, 129, 0.35)'
        },
        admin: {
          primary: '#F97316',
          dark: '#C2410C',
          light: '#FB923C',
          bg: '#FFF7ED',
          darkBg: 'rgba(249, 115, 22, 0.12)',
          glow: 'rgba(249, 115, 22, 0.35)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card-light': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.35)',
        'glow-student': '0 0 20px rgba(59, 130, 246, 0.25)',
        'glow-college': '0 0 20px rgba(139, 92, 246, 0.25)',
        'glow-company': '0 0 20px rgba(16, 185, 129, 0.25)',
        'glow-admin': '0 0 20px rgba(249, 115, 22, 0.25)',
      }
    },
  },
  plugins: [],
}
