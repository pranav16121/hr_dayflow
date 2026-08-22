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
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#6366f1',
          600: '#4F46E5', // primary action
          700: '#4338CA', // primary hover
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        background: '#F8FAFC', // warm gray slate-50
        surface: '#FFFFFF', // pure white card surface
        text: {
          primary: '#0F172A', // slate-900
          secondary: '#64748B', // slate-500
          muted: '#94a3b8', // slate-400
        },
        border: '#E2E8F0', // slate-200
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16A34A', // success standard
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#F59E0B', // warning standard
          700: '#b45309',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#EF4444', // danger standard
          700: '#b91c1c',
        },
        info: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0EA5E9', // info standard
          700: '#0369a1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02)',
        dropdown: '0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -4px rgba(0, 0, 0, 0.02)',
        modal: '0 25px 50px -12px rgba(0, 0, 0, 0.07)',
      },
      borderRadius: {
        button: '0.5rem', // lg (8px)
        input: '0.5rem',  // lg (8px)
        card: '0.75rem',  // xl (12px)
        modal: '1rem',    // 2xl (16px)
      }
    },
  },
  plugins: [],
}
