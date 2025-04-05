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
        // Removed deprecated h1-h6, p1-p4 aliases
        '2xs': ['0.75rem', { lineHeight: '1rem' }], // maps to xs
      },
      spacing: {
        // Add standard 4px based scale
        '0.5': '0.125rem', // 2px
        '1': '0.25rem',   // 4px
        '1.5': '0.375rem', // 6px
        '2': '0.5rem',    // 8px
        '2.5': '0.625rem', // 10px
        '3': '0.75rem',   // 12px
        '3.5': '0.875rem', // 14px
        '4': '1rem',      // 16px
        '5': '1.25rem',   // 20px
        '6': '1.5rem',    // 24px
        '7': '1.75rem',   // 28px
        '8': '2rem',      // 32px
        '9': '2.25rem',   // 36px
        '10': '2.5rem',   // 40px
        '11': '2.75rem',  // 44px
        '12': '3rem',     // 48px
        '14': '3.5rem',   // 56px
        '16': '4rem',     // 64px
        // Keep existing custom ones (or remap/remove if desired later)
        '18': '4.5rem',   // 72px
        '68': '17rem',    // 272px
        '84': '21rem',    // 336px
        '128': '32rem',   // 512px
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
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Added from timeline-animations.css
        'fadeIn': 'fadeIn 0.6s ease-in-out forwards',
        'fadeInUp': 'fadeInUp 0.5s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 2s infinite',
        'bounce-subtle': 'bounceSubtle 1.5s infinite',
        'expandVertical': 'expandVertical 0.3s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Added from set-view.css
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
        // Added from timeline-animations.css
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        expandVertical: {
          from: { 
            opacity: '0',
            maxHeight: '0', 
            transform: 'scaleY(0)',
            transformOrigin: 'top',
          },
          to: { 
            opacity: '1',
            maxHeight: '500px', // Use a reasonable max-height for expansion
            transform: 'scaleY(1)',
            transformOrigin: 'top',
          },
        },
        // Added from set-view.css
        'slide-in-right': {
          from: {
            transform: 'translateX(100%)',
          },
          to: {
            transform: 'translateX(0)',
          },
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
