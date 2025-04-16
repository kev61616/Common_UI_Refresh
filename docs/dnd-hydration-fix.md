# Drag and Drop Hydration Fix

This document explains how we resolved the React hydration mismatch errors when using `dnd-kit` with Next.js server-side rendering.

## Problem

We encountered a hydration mismatch error related to `aria-describedby` attributes when using `dnd-kit` with Next.js. The error occurred because:

1. During server-side rendering, dnd-kit generates specific attribute values like `aria-describedby="DndDescribedBy-5"`
2. On client hydration, dnd-kit regenerates these with different values like `aria-describedby="DndDescribedBy-2"`
3. React detects this difference and issues a warning

This type of error is common when using libraries that generate dynamic content, especially those that work with browser-specific APIs.

## Solution

We implemented a two-part solution:

### 1. Client-Only Rendering for Drag and Drop Components

Created a `ClientOnly` wrapper component that:
- Only renders its children on the client side
- Provides a static placeholder during server-side rendering
- Avoids hydration mismatches by not rendering dynamic content during SSR

```tsx
// src/components/dnd/ClientOnly.tsx
'use client';

import React, { useState, useEffect, ReactNode } from 'react';

export function ClientOnly({ children, fallback = null }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return fallback on server, children on client
  return isClient ? <>{children}</> : <>{fallback}</>;
}
```

### 2. Suppression of Hydration Warnings

Added `suppressHydrationWarning` attribute to the `SortableItem` component to handle any remaining attribute mismatches:

```tsx
// Inside SortableItem.tsx
<div
  ref={setNodeRef}
  style={style}
  className={...}
  // Suppress hydration warnings for dynamically generated attributes
  suppressHydrationWarning
  {...attributes}
  {...listeners}
>
```

### 3. Static Placeholders for Server Rendering

Created a static placeholder component that mimics the appearance of cards but doesn't use any client-side functionality:

```tsx
// In ProfileCardGrid.tsx
function StaticCardPlaceholder({ cardId }) {
  const config = CARD_CONFIG[cardId];
  return (
    <div className={...}>
      <div className="w-full h-full">
        <div className={`px-4 py-2 border-b border-border ${config.bgColor}`}>
          <div className={`font-semibold ${config.textColor} truncate`}>
            {config.title}
          </div>
        </div>
        <div className="p-4 h-[calc(100%-40px)]">
          <div className="w-full h-full bg-muted/20 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
```

## Implementation

The implementation wraps all drag-and-drop functionality with the `ClientOnly` component:

```tsx
<ClientOnly fallback={staticCardGrid}>
  <SortableContextProvider
    items={cardPositions}
    onItemsChange={dragActions.handlePositionChange}
    strategy="horizontal"
    renderOverlay={renderDragOverlay}
    onDragStart={...}
    onDragEnd={...}
  >
    {/* ... drag and drop content ... */}
  </SortableContextProvider>
</ClientOnly>
```

## Benefits

1. **Eliminates hydration errors** - By preventing server-rendering of dynamic content
2. **Improved user experience** - Static placeholders provide immediate visual feedback while client-side code loads
3. **Maintains SEO benefits** - Server still renders meaningful content for search engines
4. **Progressive enhancement** - Basic content shown immediately, interactive features added when JavaScript loads

## Note on ESM vs CommonJS

We also resolved a module format mismatch in `tailwind.config.js` by ensuring it uses the proper ES Modules format to match the project's package.json settings.
