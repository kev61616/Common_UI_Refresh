/**
 * Typography Configuration
 * 
 * This is the central configuration file for all typography-related settings.
 * Any changes to typography should be made here to ensure consistency across the application.
 */

// Font Families
export const fontFamilies = {
  sans: ["Inter", "var(--font-sans)", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
  display: ["Inter", "var(--font-sans)", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
  heading: ["Inter", "var(--font-sans)", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
  mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
}

// Font Weights
export const fontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}

// Base Typography Settings
export const baseTypography = {
  letterSpacing: '0.05em', // Increased from 0.04em for better character separation
  baseFontSize: '18px', // Increased from 16px (+2px) for better readability
  mobileFontSize: '20px', // Increased from 18px for mobile devices
  mobileBreakpoint: '768px', // Mobile breakpoint
}

// Modular Scale - Font Sizes and Line Heights
export const fontSizes = {
  // Standard scale (all sizes increased by +2px for better readability)
  xs: { size: '0.875rem', lineHeight: '1.25rem' },   // 14px (increased from 12px)
  sm: { size: '1rem', lineHeight: '1.5rem' },        // 16px (increased from 14px)
  base: { size: '1.125rem', lineHeight: '1.85rem' }, // 18px (increased from 16px)
  lg: { size: '1.25rem', lineHeight: '1.85rem' },    // 20px (increased from 18px)
  xl: { size: '1.375rem', lineHeight: '1.85rem' },   // 22px (increased from 20px)
  '2xl': { size: '1.625rem', lineHeight: '2.1rem' }, // 26px (increased from 24px)
  '3xl': { size: '1.875rem', lineHeight: '2.35rem' },// 30px (increased from 28px)
  '4xl': { size: '2.125rem', lineHeight: '2.6rem' }, // 34px (increased from 32px)
  '5xl': { size: '2.625rem', lineHeight: '3.1rem' }, // 42px (increased from 40px)
  
  // Legacy named sizes (for backward compatibility)
  h1: { size: '2.5rem', lineHeight: '3rem', weight: fontWeights.bold },
  h2: { size: '2rem', lineHeight: '2.5rem', weight: fontWeights.semibold },
  h3: { size: '1.75rem', lineHeight: '2.25rem', weight: fontWeights.semibold },
  h4: { size: '1.5rem', lineHeight: '2rem', weight: fontWeights.semibold },
  h5: { size: '1.25rem', lineHeight: '1.75rem', weight: fontWeights.semibold },
  h6: { size: '1.125rem', lineHeight: '1.5rem', weight: fontWeights.semibold },
  p1: { size: '1.125rem', lineHeight: '1.75rem', weight: fontWeights.normal },
  p2: { size: '1.125rem', lineHeight: '1.75rem', weight: fontWeights.semibold },
  p3: { size: '1rem', lineHeight: '1.75rem', weight: fontWeights.normal },
  p4: { size: '0.875rem', lineHeight: '1.25rem', weight: fontWeights.normal },
  '2xs': { size: '0.75rem', lineHeight: '1rem', weight: fontWeights.normal },
}

// Typography Variants for the Typography component
export const typographyVariants = {
  h1: {
    base: "scroll-m-20 text-5xl font-bold tracking-tight",
    size: fontSizes['5xl'].size,
    lineHeight: fontSizes['5xl'].lineHeight,
    weight: 'bold',
    tracking: 'tight',
  },
  h2: {
    base: "scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight first:mt-0",
    size: fontSizes['4xl'].size,
    lineHeight: fontSizes['4xl'].lineHeight,
    weight: 'semibold',
    tracking: 'tight',
    borderBottom: true,
    paddingBottom: '0.5rem',
  },
  h3: {
    base: "scroll-m-20 text-3xl font-semibold tracking-tight",
    size: fontSizes['3xl'].size,
    lineHeight: fontSizes['3xl'].lineHeight,
    weight: 'semibold',
    tracking: 'tight',
  },
  h4: {
    base: "scroll-m-20 text-2xl font-semibold tracking-tight",
    size: fontSizes['2xl'].size,
    lineHeight: fontSizes['2xl'].lineHeight,
    weight: 'semibold',
    tracking: 'tight',
  },
  h5: {
    base: "scroll-m-20 text-xl font-semibold tracking-tight",
    size: fontSizes.xl.size,
    lineHeight: fontSizes.xl.lineHeight,
    weight: 'semibold',
    tracking: 'tight',
  },
  h6: {
    base: "scroll-m-20 text-lg font-semibold tracking-tight",
    size: fontSizes.lg.size,
    lineHeight: fontSizes.lg.lineHeight,
    weight: 'semibold',
    tracking: 'tight',
  },
  p: {
    base: "text-base leading-7 [&:not(:first-child)]:mt-6",
    size: fontSizes.base.size,
    lineHeight: fontSizes.base.lineHeight,
    weight: 'normal',
    marginTop: '[&:not(:first-child)]:mt-6',
  },
  blockquote: {
    base: "mt-6 border-l-2 pl-6 italic text-base",
    size: fontSizes.base.size,
    lineHeight: fontSizes.base.lineHeight,
    weight: 'normal',
    marginTop: 'mt-6',
    borderLeft: true,
    paddingLeft: 'pl-6',
    italic: true,
  },
  list: {
    base: "my-6 ml-6 list-disc text-base [&>li]:mt-2",
    size: fontSizes.base.size,
    lineHeight: fontSizes.base.lineHeight,
    weight: 'normal',
    margin: 'my-6 ml-6',
    listStyle: 'list-disc',
    listItemSpacing: '[&>li]:mt-2',
  },
  lead: {
    base: "text-lg text-foreground",
    size: fontSizes.lg.size,
    lineHeight: fontSizes.lg.lineHeight,
    weight: 'normal',
  },
  large: {
    base: "text-lg font-semibold",
    size: fontSizes.lg.size,
    lineHeight: fontSizes.lg.lineHeight,
    weight: 'semibold',
  },
  small: {
    base: "text-sm font-medium leading-tight",
    size: fontSizes.sm.size,
    lineHeight: 'leading-tight',
    weight: 'medium',
  },
  muted: {
    base: "text-sm text-muted-foreground",
    size: fontSizes.sm.size,
    lineHeight: fontSizes.sm.lineHeight,
    weight: 'normal',
    color: 'text-muted-foreground',
  }
}

// Helper function to generate Tailwind fontSize config
export function getTailwindFontSizeConfig() {
  const result = {};
  
  // Add standard sizes
  Object.entries(fontSizes).forEach(([key, value]) => {
    if (key !== 'h1' && key !== 'h2' && key !== 'h3' && key !== 'h4' && 
        key !== 'h5' && key !== 'h6' && key !== 'p1' && key !== 'p2' && 
        key !== 'p3' && key !== 'p4' && key !== '2xs') {
      result[key] = [value.size, { lineHeight: value.lineHeight }];
    }
  });
  
  // Add legacy named sizes
  Object.entries(fontSizes)
    .filter(([key]) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p1', 'p2', 'p3', 'p4', '2xs'].includes(key))
    .forEach(([key, value]) => {
      const config = [value.size, { lineHeight: value.lineHeight }];
      if (value.weight) {
        config[1].fontWeight = value.weight;
      }
      result[key] = config;
    });
  
  return result;
}

// Helper function to generate Tailwind fontFamily config
export function getTailwindFontFamilyConfig() {
  return {
    sans: fontFamilies.sans,
    display: fontFamilies.display,
    heading: fontFamilies.heading,
    mono: fontFamilies.mono,
  };
}

// Helper function to generate typography variant classes
export function getTypographyVariantClasses() {
  return Object.entries(typographyVariants).reduce((acc, [key, value]) => {
    acc[key] = value.base;
    return acc;
  }, {});
}
