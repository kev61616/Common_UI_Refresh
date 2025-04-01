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

## Recent Fixes

### 5. Deep Cloning and Value Stabilization for Mock Data

We've improved our solution for hydration mismatches caused by mock data generation. Instead of just creating a stable reference, we now:

1. Deep clone the mock data to create completely independent references
2. Standardize any values that might differ between server and client
3. Apply the same standardization to any provided data

```typescript
// In src/lib/dataUtils.ts
import { mockPracticeSets, PracticeSet } from './mockData';

// Create a stable reference to the mock data with deep cloning
const STABLE_MOCK_DATA = JSON.parse(JSON.stringify(mockPracticeSets));

// Stabilize specific fields that might cause hydration issues
STABLE_MOCK_DATA.forEach((set: PracticeSet) => {
  if (set.subject === 'Reading' && 
      (set.type === 'Data Analysis: Graph(s)' || set.type === 'Data Analysis: Table(s)')) {
    // Ensure consistency between server and client by using a single value
    set.type = 'Data Analysis: Table(s)';
  }
});

export function getDataWithFallback(data: any[] | undefined | null): any[] {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return STABLE_MOCK_DATA; // Use the stabilized reference
  }
  
  // Also stabilize provided data
  const stableData = JSON.parse(JSON.stringify(data));
  
  // Apply the same standardization to provided data
  stableData.forEach((item: PracticeSet) => {
    if (item.subject === 'Reading' && 
        (item.type === 'Data Analysis: Graph(s)' || item.type === 'Data Analysis: Table(s)')) {
      item.type = 'Data Analysis: Table(s)';
    }
  });
  
  return stableData;
}
```

This improved approach ensures that both server and client render identical content by:
- Creating independent deep clones of the data structures, preventing reference issues
- Explicitly standardizing any values that might randomly differ between environments
- Applying the same standardization process to user-provided data

### 6. Client-Only Components for Dynamic Content

We've created specialized client-only components to handle dynamic content that's prone to hydration mismatches:

```typescript
// src/components/review/ClientOnlyIcons.tsx
'use client'

export function ClientOnly({ children, fallback = null }: { children: React.ReactNode, fallback?: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return fallback
  }

  return <>{children}</>
}

// Example usage with deterministic hash-based rendering
export function SubjectIcon({ subject, id }: { subject: string, id: string }) {
  // Hash function for consistent client/server rendering
  const hashCode = (str: string) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i)
      hash |= 0 // Convert to 32bit integer
    }
    return Math.abs(hash)
  }

  const hash = hashCode(id)
  const hashMod3 = hash % 3 // 0, 1, or 2
  
  return (
    <ClientOnly fallback={<ServerPlaceholderIcon />}>
      {hashMod3 === 0 ? <MathIcon /> : hashMod3 === 1 ? <ReadingIcon /> : <WritingIcon />}
    </ClientOnly>
  )
}
```

Similar client-only components were created for:
- Date formatting (`ClientDateFormatter`) - Uses server placeholder during SSR, then client-side formatting
- Performance metrics (`ClientAccuracyMeter`, etc.) - Uses empty placeholders or consistent values during SSR
- Time formatting - Ensures consistent time display formats between server and client

This pattern eliminates hydration errors by:
1. Providing empty or generic placeholders during server-side rendering
2. Only rendering the actual dynamic content client-side after hydration
3. Using the `suppressHydrationWarning` attribute on elements that may legitimately differ
4. Using hash functions to derive deterministic values from stable inputs (like IDs)

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
   - Create stable references for mock data or randomly generated content

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
