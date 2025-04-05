# Tailwind CSS Issues and Resolutions

This document records specific issues encountered with Tailwind CSS during development and their solutions, serving as a reference to prevent recurrence.

## CSS Parsing Error with `calc(var(...))` and Non-Integer Values

**Date:** 2025-04-05

**Problem:**
A CSS parsing error occurred during the build process, originating from `src/styles/globals.css`. The error message pointed to an invalid token related to a generated CSS rule:

```css
/* Example of the problematic generated CSS */
.py-\[calc\(var\(--spacing-2\.5\)-1px\)\] {
  padding-top: calc(var(--spacing-2.5)  -  1px);
  padding-bottom: calc(var(--spacing-2.5)  -  1px);
}
```

The root cause was traced back to the usage of a non-integer value (`2.5`) within the `calc(var(...))` function inside a Tailwind arbitrary value class in component files.

**Affected Files:**
- `src/components/catalyst/combobox.tsx` (Affected by both `py-...` and `pl-...` issues)
- `src/components/catalyst/listbox.tsx` (Affected by both `py-...` and `pl-...` issues)

**Incorrect Code Examples (in .tsx):**
```typescript
// Example 1: Problematic vertical padding
className={clsx([
  // ... other classes
  'py-[calc(var(--spacing-2.5)-1px)] sm:py-[calc(var(--spacing-1.5)-1px)]',
  // ... other classes
])}

// Example 2: Problematic horizontal padding (same root cause)
className={clsx([
  // ... other classes
  'pl-[calc(var(--spacing-3.5)-1px)] sm:pl-[calc(var(--spacing-3)-1px)]',
  // ... other classes
])}
```

**Reason:**
Tailwind's CSS generation process and the underlying CSS parser seem to have issues handling non-integer values (like `2.5`) directly within the `var()` function when used inside `calc()` for arbitrary values. This leads to invalid CSS syntax being generated.

**Solution:**
Replace the complex arbitrary value classes with standard Tailwind utility classes that achieve the same or a similar spacing effect.
- For `py-[calc(var(--spacing-2.5)-1px)]`, use `py-2.5`.
- For `sm:py-[calc(var(--spacing-1.5)-1px)]`, use `sm:py-1.5`.
- For `pl-[calc(var(--spacing-3.5)-1px)]`, use `pl-3.5`.
- For `sm:pl-[calc(var(--spacing-3)-1px)]`, use `sm:pl-3`.

**Corrected Code Examples (in .tsx):**
```typescript
// Example 1: Corrected vertical padding
className={clsx([
  // ... other classes
  'py-2.5 sm:py-1.5', // Replaced with standard utility classes
  // ... other classes
])}

// Example 2: Corrected horizontal padding
className={clsx([
  // ... other classes
  'pl-3.5 sm:pl-3', // Replaced with standard utility classes
  // ... other classes
])}
```

**Prevention:**
Avoid using non-integer values directly within `calc(var(...))` constructs in Tailwind arbitrary value classes. Prefer standard Tailwind spacing utilities (e.g., `py-2`, `py-2.5`, `py-3`) or ensure that any CSS variables used within `calc()` resolve to valid CSS values that the parser can handle correctly. If complex calculations are needed, test them thoroughly or consider defining custom utilities in `tailwind.config.js`.
