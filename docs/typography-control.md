# Typography Control System

This document explains how to control all typography settings through a **single centralized file** in the project.

## Overview

Our typography system has been refactored to use a centralized configuration approach. All typography settings are now defined in a **single file**:

```
src/config/typography.mjs
```

This file contains all settings related to:
- Font families
- Font sizes
- Line heights
- Font weights
- Typography variants
- Letter spacing

Other files in the system (Tailwind config, Typography component, CSS variables) now import their settings from this central file, ensuring consistent typography across the entire application.

## How to Modify Typography

### Basic Font Settings

To modify basic font settings like letter spacing or base font size:

1. Open `src/config/typography.js`
2. Find the `baseTypography` object:

```js
const baseTypography = {
  letterSpacing: '0.04em', // Default letter spacing
  baseFontSize: '16px',    // Base font size
  mobileFontSize: '18px',  // Font size for mobile devices
  mobileBreakpoint: '768px', // Mobile breakpoint
}
```

3. Adjust these values as needed

### Font Families

To change the font families:

1. Open `src/config/typography.js`
2. Modify the `fontFamilies` object:

```js
const fontFamilies = {
  sans: ["Inter", "var(--font-sans)", ...], // Primary font
  display: ["Inter", "var(--font-sans)", ...], // Display font
  heading: ["Inter", "var(--font-sans)", ...], // Heading font
  mono: ["ui-monospace", "SFMono-Regular", ...], // Monospace font
}
```

3. Update the font lists as needed

> **Note:** If you're adding a completely new font, you'll also need to ensure the font files are properly loaded in your project.

### Font Sizes

To adjust font sizes in the modular scale:

1. Open `src/config/typography.js`
2. Find the `fontSizes` object:

```js
const fontSizes = {
  // Standard scale
  xs: { size: '0.75rem', lineHeight: '1rem' },      // 12px
  sm: { size: '0.875rem', lineHeight: '1.25rem' },  // 14px
  base: { size: '1rem', lineHeight: '1.75rem' },    // 16px
  // ...other sizes
}
```

3. Modify the size and lineHeight values as needed

### Typography Variants

To change how specific typography variants (h1, p, blockquote, etc.) appear:

1. Open `src/config/typography.js`
2. Find the `typographyVariants` object:

```js
const typographyVariants = {
  h1: {
    base: "scroll-m-20 text-5xl font-bold tracking-tight",
    size: fontSizes['5xl'].size,
    lineHeight: fontSizes['5xl'].lineHeight,
    weight: 'bold',
    tracking: 'tight',
  },
  // ...other variants
}
```

3. Modify the `base` string to include different Tailwind classes

## Example Changes

### Changing the Base Font Size

```js
// In src/config/typography.js
const baseTypography = {
  letterSpacing: '0.04em',
  baseFontSize: '18px', // Changed from 16px
  mobileFontSize: '20px', // Changed from 18px
  mobileBreakpoint: '768px',
}
```

### Using a Different Font Family

```js
// In src/config/typography.js
const fontFamilies = {
  sans: ["Roboto", "var(--font-sans)", "ui-sans-serif", "system-ui", ...], // Changed from Inter
  display: ["Roboto", "var(--font-sans)", "ui-sans-serif", "system-ui", ...],
  heading: ["Roboto", "var(--font-sans)", "ui-sans-serif", "system-ui", ...],
  mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", ...],
}
```

### Adjusting Heading Size and Style

```js
// In src/config/typography.js
const typographyVariants = {
  h1: {
    base: "scroll-m-20 text-6xl font-extrabold tracking-tighter", // Changed size and weight
    size: '3rem', // Custom size (larger than default)
    lineHeight: '3.5rem', // Custom line height
    weight: 'extrabold', // Changed from bold
    tracking: 'tighter', // Changed from tight
  },
  // Other variants...
}
```

## How It Works

The system uses several helper methods at the bottom of the `typography.js` file:

1. `getTailwindFontSizeConfig()` - Generates the fontSize configuration for Tailwind
2. `getTailwindFontFamilyConfig()` - Generates the fontFamily configuration for Tailwind 
3. `getTypographyVariantClasses()` - Generates the class strings for the Typography component

These methods are imported by:

- `tailwind.config.js` - Uses the Tailwind helpers to configure the theme
- `src/components/ui/typography.tsx` - Uses the Typography variant classes
- `src/styles/globals.css` - Uses variables derived from the base typography settings

## Best Practices

1. **Make all typography changes in the central file** - Avoid making typography changes in individual components
2. **Maintain the modular scale** - Keep font sizes in a consistent progression
3. **Consider responsive behavior** - Remember that font sizes scale differently on mobile devices
4. **Test changes across the application** - Typography changes can have wide-ranging effects
5. **Document significant changes** - Update this file with any major shifts in typography approach

## Adding New Font Weights or Styles

If you need to add new font weights or styles:

1. Add them to the respective objects in the typography configuration file
2. Ensure the fonts are properly loaded with the required weights/styles 
3. Use them consistently throughout the application

---

By centralizing all typography controls in a single file, we make it easier to maintain a consistent typographic system across the entire application, ensuring a cohesive visual language and improved user experience.
