# Client Components in the Profile Visualization System

## Overview

The profile visualization system uses a mix of server components and client components in the Next.js App Router architecture. This document outlines when to use client components, which components are already marked as client components, and how to avoid common errors related to component rendering.

## Client Components vs Server Components

In Next.js 13+ with the App Router:

- **Server Components** (default) - Render on the server, can't use React hooks or browser APIs
- **Client Components** - Render on the client, can use React hooks and browser APIs, must be marked with `"use client"` directive

## When to Use Client Components

Mark a component as a client component using the `"use client"` directive at the top of the file when:

1. The component uses React hooks (`useState`, `useEffect`, `useContext`, etc.)
2. The component needs to be interactive (event handlers, state changes)
3. The component uses browser-only APIs (`window`, `document`, etc.)
4. The component uses a library that depends on browser APIs (like chart libraries)

## Current Client Components

The following components in the profile visualization system are currently marked as client components:

### UI Components
- `src/components/ui/Tabs.tsx` - Interactive tabs component using Radix UI

### Base Chart Components
- `src/components/profile/charts/base/TimeSeriesChart.tsx`
- `src/components/profile/charts/base/SkillBreakdownChart.tsx`
- `src/components/profile/charts/base/ProgressMetricCard.tsx`

### UI Components
- `src/components/profile/charts/ui/ChartSkeleton.tsx`
- `src/components/profile/charts/ui/ChartErrorState.tsx`

### Reading Charts
- `src/components/profile/charts/reading/ReadingTimelineChart.tsx`
- `src/components/profile/charts/reading/ReadingSkillsChart.tsx`
- `src/components/profile/containers/ReadingChartsContainer.tsx`

### Writing Charts
- `src/components/profile/charts/writing/WritingSkillsRadar.tsx`
- `src/components/profile/charts/writing/ErrorReductionChart.tsx`
- `src/components/profile/containers/WritingChartsContainer.tsx`

### Math Charts
- `src/components/profile/charts/math/MathSkillsChart.tsx`
- `src/components/profile/charts/math/ProblemSolvingMatrix.tsx`
- `src/components/profile/containers/MathChartsContainer.tsx`

### Tab Containers
- `src/components/profile/containers/ProfileTabsContainer.tsx`

## Common Errors and Remedies

### Error: "You're importing a component that needs X. This React hook only works in a client component."

**Example:**
```
Error: ./src/components/profile/charts/reading/ReadingTimelineChart.tsx:1:17
Ecmascript file had an error
> 1 | import React, { useState } from 'react';
                     ^^^^^^^^^
You're importing a component that needs `useState`. This React hook only works in a client component. To fix, mark the file (or its parent) with the `"use client"` directive.
```

**Solution:**
Add the `"use client"` directive at the top of the file:

```tsx
"use client";

import React, { useState } from 'react';
// Rest of the file...
```

### Error: Hydration Errors with Chart Components

If you're seeing hydration errors with chart components, ensure:

1. The component is marked with `"use client"`
2. The component's parent is also a client component if it passes dynamic props
3. All interactive elements are properly handled on the client side
4. You're not using non-deterministic functions during rendering:
   - Avoid `Math.random()`, `Date.now()`, `new Date()` during initial render
   - Use fixed values for animations, placeholders, or visual elements
   - Move any randomization to useEffect hooks that run after hydration

**Example of a problematic skeleton loader:**
```tsx
// BAD: Using random values causes hydration mismatches
<div 
  className="bg-slate-200 dark:bg-slate-700" 
  style={{ width: `${30 + Math.random() * 50}%` }}
/>
```

**Fixed version:**
```tsx
// GOOD: Using fixed values ensures consistent rendering
<div 
  className="bg-slate-200 dark:bg-slate-700" 
  style={{ width: '45%' }}
/>
```

## Best Practices

1. **Component Organization:**
   - Keep client components in their own files
   - Group server and client components logically
   - Minimize the number of client components to reduce bundle size

2. **Data Fetching:**
   - Fetch data in server components when possible
   - Pass data to client components as props
   - Use client-side data fetching only when necessary (e.g., for real-time updates)

3. **Chart Component Creation:**
   - Always add `"use client"` to new chart components
   - All visualizations using Recharts, D3, or other chart libraries should be client components
   - Containers that use React hooks must also be client components

4. **Required Dependencies:**
   - Ensure the required packages are installed:
     - `recharts` - For all chart components (TimeSeriesChart, SkillBreakdownChart, etc.)
     - `@radix-ui/react-tabs` - For the Tabs component
     - `framer-motion` - For animations
     - `date-fns` - For date formatting in charts

## Example: Creating a New Chart Component

```tsx
// src/components/profile/charts/example/NewExampleChart.tsx

"use client"; // Always add this at the top

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface NewExampleChartProps {
  data: any[];
  // other props...
}

const NewExampleChart: React.FC<NewExampleChartProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    // Any client-side effects...
  }, [data]);
  
  return (
    <div className="w-full">
      <LineChart width={500} height={300} data={data}>
        {/* Chart components */}
      </LineChart>
    </div>
  );
};

export default NewExampleChart;
```

## References

- [Next.js Documentation on Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Recharts Documentation](https://recharts.org/en-US/)
- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)
