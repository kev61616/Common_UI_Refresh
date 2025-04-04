  const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        warning: {
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
          950: '#451a03',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ["Inter", "var(--font-sans)", ...fontFamily.sans],
        display: ["Inter", "var(--font-sans)", ...fontFamily.sans],
        heading: ["Inter", "var(--font-sans)", ...fontFamily.sans],
      },
      fontSize: {
        // New Modular Scale (Base: 1rem = 16px) - Reverted to default letter spacing
        'xs':   ['0.75rem',  { lineHeight: '1rem' }],      // 12px
        'sm':   ['0.875rem', { lineHeight: '1.25rem' }],     // 14px
        'base': ['1rem',     { lineHeight: '1.75rem' }],     // 16px (Default Body)
        'lg':   ['1.125rem', { lineHeight: '1.75rem' }],     // 18px (Lead/Large)
        'xl':   ['1.25rem',  { lineHeight: '1.75rem' }],     // 20px (H5)
        '2xl':  ['1.5rem',   { lineHeight: '2rem' }],      // 24px (H4)
        '3xl':  ['1.75rem',  { lineHeight: '2.25rem' }],     // 28px (H3)
        '4xl':  ['2rem',     { lineHeight: '2.5rem' }],      // 32px (H2)
        '5xl':  ['2.5rem',   { lineHeight: '3rem' }],      // 40px (H1)
        // Removed 6xl and 7xl
        // Retaining original custom names mapped to the standard modular scale
        // It's recommended to migrate away from h1-h6/p1-p4 classes towards sm, base, lg, xl etc.
        h1: ['2.5rem',   { lineHeight: '3rem', fontWeight: 700 }], // maps to 5xl
        h2: ['2rem',     { lineHeight: '2.5rem', fontWeight: 600 }], // maps to 4xl
        h3: ['1.75rem',  { lineHeight: '2.25rem', fontWeight: 600 }], // maps to 3xl
        h4: ['1.5rem',   { lineHeight: '2rem', fontWeight: 600 }], // maps to 2xl
        h5: ['1.25rem',  { lineHeight: '1.75rem', fontWeight: 600 }], // maps to xl
        h6: ['1.125rem', { lineHeight: '1.5rem', fontWeight: 600 }], // maps to lg (semibold)
        p1: ['1.125rem', { lineHeight: '1.75rem' }], // maps to lg (lead)
        p2: ['1.125rem', { lineHeight: '1.75rem' }], // maps to lg (large - needs semibold applied separately)
        p3: ['1rem',     { lineHeight: '1.75rem' }], // maps to base
        p4: ['0.875rem', { lineHeight: '1.25rem' }], // maps to sm
        '2xs': ['0.75rem', { lineHeight: '1rem' }], // maps to xs
      },
      spacing: {
        '18': '4.5rem',
        '68': '17rem',
        '84': '21rem',
        '128': '32rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'strong': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: 'var(--foreground)',
            'h1, h2, h3, h4': {
              fontWeight: theme('fontWeight.semibold'),
              color: 'var(--foreground)',
            },
            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.700'),
              },
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate")],
}
