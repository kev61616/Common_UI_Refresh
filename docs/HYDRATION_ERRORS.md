# Fixing Hydration Errors in Next.js

This document outlines the solutions implemented to prevent React hydration errors in our Next.js application.

## The Problem

Hydration errors occur when the HTML rendered on the server doesn't match what gets rendered on the client during hydration. In our case, we were seeing errors like:

```
Uncaught Error: Hydration failed because the server rendered HTML didn't match the client.
```

Specifically, there were mismatches in theme-related classes (`theme-blue` vs `theme-green`) and potentially other dynamic content.

## Implemented Solutions

### 1. Created Client-Side Utilities

We've implemented several utilities in `src/lib/clientUtils.tsx` to handle client-side rendering properly:

- `useClientOnly` - Hook for safely handling values that should only be set on the client
- `useTheme` - Hook for theme management with proper client/server handling
- `ClientOnly` - Component that only renders its children on the client
- `ThemeProvider` - Component for consistent theme application

### 2. Updated Components with Hydration-Safe Patterns

Components that previously caused hydration mismatches (like `HeroHeading`) now use one of these approaches:

**Pattern 1: Render Different Content on Server vs Client**

```jsx
<ClientOnly
  fallback={<ServerSideVersion />}
>
  <ClientSideVersion />
</ClientOnly>
```

**Pattern 2: Suppress Hydration Warnings for Non-Critical Elements**

Where appropriate, we use `suppressHydrationWarning` on elements where a mismatch is acceptable:

```jsx
<div suppressHydrationWarning>
  {clientSideContent}
</div>
```

**Pattern 3: Consistent Initial State**

For components with dynamic state, we ensure the initial state matches what would be rendered on the server:

```jsx
const [theme, setTheme] = useState(defaultServerTheme)

useEffect(() => {
  // Only update after hydration is complete
  const clientTheme = getClientTheme()
  setTheme(clientTheme)
}, [])
```

## Best Practices for Preventing Hydration Errors

1. **Avoid Browser-Only APIs in Initial Render**
   - Don't use `window`, `document`, or other browser APIs during the initial render
   - Move browser-only code into `useEffect` hooks

2. **Use Client Components for Dynamic Content**
   - Mark components with dynamic content as client components with `'use client'`
   - For mixed content, separate server and client parts

3. **Be Careful with Dynamic Data**
   - Avoid `Date.now()`, `Math.random()`, or other non-deterministic values in the initial render
   - Use consistent placeholder values on the server, then update on the client

4. **Theme and Style Consistency**
   - Ensure theme classes/styles are consistent between server and client
   - Use the `ClientOnly` component for theme-dependent elements

## Adding New Components

When adding new components that might have server/client differences:

1. Import utilities from `src/lib/clientUtils.tsx`
2. Choose the appropriate pattern for your component
3. Test the component with both server-side rendering and client-side rendering
4. Consider adding `'use client'` if the component relies heavily on browser APIs

By following these patterns, we can prevent hydration errors while still building dynamic, interactive interfaces.
