# Hydration Errors in Next.js

## Understanding Hydration Errors

Hydration errors occur when there's a mismatch between the server-rendered HTML and the client-side render. This happens because:

1. The server renders the initial HTML based on the initial state
2. The client then "hydrates" this HTML, adding event listeners and making it interactive
3. If the client's render is different from the server's, React detects this mismatch and shows an error

Common causes of hydration errors:

- Non-deterministic rendering (using `Math.random()`, `Date.now()`, etc.)
- Environment checks (`typeof window !== 'undefined'`)
- Browser-specific APIs used during render
- Different configurations between server and client environments

## Fixed Issues

### Subject Color Mismatch

We encountered a hydration error related to subject color indicators. The server was rendering:
```jsx
<div className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-600">
<span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">Reading</span>
```

While the client was rendering:
```jsx
<div className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-600">
<span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">Writing</span>
```

### Root Cause

The `EnhancedCollapsibleBoardView` component had non-deterministic logic for distributing questions and creating duplicate entries:

1. Question IDs included random elements: `q-${setId}-${i}-${Math.random().toString(36).substring(2, 7)}`
2. Duplicate entries were created with non-deterministic logic

### Solution

We applied a multi-faceted approach to solve the hydration errors:

1. **Deterministic Data Generation**:
   - Made question IDs deterministic by removing randomness: `q-${setId}-${i}`
   - Made topic selection deterministic using hashing functions
   - Made subtopic selection deterministic 
   - Created deterministic question duplication logic

2. **Component Modularization**:
   - Split large components into smaller, focused components
   - Created utility files for constants and functions
   - Created custom hooks for data processing and popup state
   - Simplified the main component

3. **Client-Side Only Rendering**:
   - Used `suppressHydrationWarning` on the parent container
   - Implemented client-side only rendering pattern in `QuestionViewWrapper`
   - Added loading skeleton for server-side rendering
   - Used `useMemo` for computed values in BoardCard component

## Best Practices for Avoiding Hydration Errors

1. **Never use non-deterministic functions during rendering**
   - Avoid `Math.random()`, `Date.now()`, `new Date()`
   - Use stable IDs and keys

2. **Make environment-aware code conditional**
   - Use useEffect for browser-only code
   - Use dynamic imports for browser-only components

3. **Use Client Components appropriately**
   - Mark components with browser-specific APIs as 'use client'
   - Keep server components pure and deterministic

4. **Create stable state initialization**
   - Use stable default values
   - Defer variable values to client-side effects

5. **Debug with React hydration error info**
   - Check the elements flagged in the error message
   - Look for subtle differences in classes, attributes, or text content
