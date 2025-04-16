# Grid Layout System

This document outlines the grid layout system implemented in the profile overview tab that provides the foundation for the customizable card arrangement.

## Overview

The profile overview tab uses a responsive grid system to organize and display profile cards in a visually consistent manner. This grid adapts to different screen sizes while maintaining proper alignment and spacing between cards.

## Grid Specifications

### Desktop Layout

- **Base Grid**: 6-column grid with consistent gutters
- **Column Width**: Flexible, approximately 1/6 of available width minus gutters
- **Gutter Size**: 24px (gap-6) between all cards
- **Row Height**: Fixed 320px per row

### Responsive Behavior

The grid system adjusts based on screen width:

| Breakpoint | Columns | Card Behavior |
|------------|---------|---------------|
| Mobile (<640px) | 1 column | Full-width, stacked vertically |
| Tablet (640px-1024px) | 4 columns | Smaller cards may fit 2-across |
| Desktop (>1024px) | 6 columns | Full grid layout with spanning |

## Implementation Details

The grid is implemented using Tailwind CSS's grid utilities in `ProfileCardGrid.tsx`:

```tsx
<div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
  {/* Card items positioned within the grid */}
</div>
```

### Card Positioning and Spanning

Cards span multiple columns based on their configured size:

- Small cards: `lg:col-span-2`
- Medium-Wide cards: `lg:col-span-4`
- Medium-Long cards: `lg:col-span-2 lg:row-span-2`
- Large cards: `lg:col-span-4 lg:row-span-2`

## Grid Guidance Component

The grid includes a visual guidance system that becomes visible during drag operations:

```tsx
<GridGuidance 
  columns={6} 
  visible={isDragging} 
  className="absolute inset-0 pointer-events-none z-0" 
/>
```

The `GridGuidance` component renders subtle column guidelines that help users understand the underlying grid structure when rearranging cards.

### Visual Feedback

- Grid lines appear as light gray borders (`border-gray-200/40`)
- Opacity transitions from 0 to 1 when dragging starts
- Grid remains non-interactive through `pointer-events-none`

## Grid-to-Card Relationship

Cards maintain their relationship with the grid through:

1. **Consistent sizing**: Card widths are aligned to grid columns
2. **Margin/padding harmony**: Internal card spacing follows the same rhythm as grid gutters
3. **Proper spanning**: Cards correctly span grid cells according to their size classification

## Technical Implementation

The grid logic is primarily handled in two components:

1. **`ProfileCardGrid`**: Sets up the main grid container and handles card positioning
2. **`GridGuidance`**: Provides visual column indicators during drag operations

### ProfileCardGrid Component

```tsx
export function ProfileCardGrid({ 
  cardPositions, 
  onOrderChange,
  // ... other props
}: ProfileCardGridProps) {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {cardPositions.map((cardId) => (
          <SortableItem key={cardId} id={cardId}>
            <DraggableCard 
              id={cardId}
              config={CARD_CONFIG[cardId as CardConfigKey]}
              // ... other props
            />
          </SortableItem>
        ))}
      </div>
      {/* Grid guidance */}
    </div>
  );
}
```

### GridGuidance Component

```tsx
export function GridGuidance({ 
  columns, 
  visible, 
  className 
}: GridGuidanceProps) {
  return (
    <div 
      className={`grid transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      style={{ 
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {/* Column guidelines rendered here */}
      {Array.from({ length: columns }).map((_, index) => (
        <div 
          key={index} 
          className="h-full border-r border-gray-200/40 last:border-r-0" 
        />
      ))}
    </div>
  );
}
```

## Best Practices

When working with the grid system:

1. **Maintain column discipline**: Avoid creating cards that don't align with the column system
2. **Respect the sizing categories**: Use the standard card sizes rather than creating custom dimensions
3. **Consider responsive behavior**: Ensure cards look good when the grid collapses on smaller screens
4. **Test drag and drop thoroughly**: Verify grid guidance appears correctly during rearrangement

## Future Enhancements

- **Grid density options**: Allow users to choose between comfortable and compact layouts
- **Fixed positions option**: Ability to lock certain cards in specific grid positions
- **Custom breakpoints**: More granular control over how cards rearrange at different screen sizes
