# Profile Drag and Drop System

This document outlines the drag and drop (DnD) system implemented in the profile section using `dnd-kit`.

## Overview

The profile page features a grid of cards that can be reordered via drag and drop. Each card contains different information about the user's profile, such as their rank, achievements, scores, and skills.

## Technical Implementation

### Core Libraries and Components

- **dnd-kit**: Provides the core drag and drop functionality
  - `@dnd-kit/core`: Core drag and drop functionality
  - `@dnd-kit/sortable`: Adds sortable functionality
  - `@dnd-kit/utilities`: Provides utility functions

### Key Components

1. **`SortableItem`** - A component that wraps any content and makes it draggable/sortable
2. **`SortableContextProvider`** - A provider that manages the sortable state
3. **`ProfileCardGrid`** - Implements the sortable grid of profile cards

## UX Patterns

### Drag Indicators

- Whole card is draggable (no explicit drag handles for cleaner UI)
- Subtle hover effect indicates draggability
- Cursor changes to "grab" on hover and "grabbing" during drag
- Scale and shadow effects enhance draggability perception
- Onboarding hint appears on the side to help users understand the drag functionality

### Drop Zone Feedback

- Enhanced visual feedback during dragging
- Background grid pattern becomes prominently visible during dragging (grey-lined grid)
- Grid visibility transitions smoothly between states
- Cards' drop positions are indicated visually with highlighting

### User Interactions

1. **Hover State**: Subtle scale and shadow increase
2. **Drag Start**: Card becomes slightly transparent and elevated
3. **During Drag**: 
   - Overlay appears with a preview of the card
   - Background grid becomes visible for placement guidance
   - Toast notification shows dragging state
4. **Drop Zone**: Visual indication of where the card will be placed
5. **Drop Animation**: Smooth transition to new position
6. **Saving Feedback**: Toast notification confirms changes are saved

## State Management

The drag and drop system includes state management for:

1. **Card Positions**: Tracks the order of cards in the grid
2. **Drag State**: Monitors when dragging starts and ends
3. **Saving State**: Shows saving status and confirms when changes are stored
4. **Toast Notifications**: Provides user feedback through transient messages

Toast notifications are implemented to show:
- When layout changes are being saved ("Saving changes...")
- When saving is complete ("Layout saved successfully!")

This ensures users always know the status of their actions and have confidence that their changes are being persisted.

## Implementation Details

### Making Items Draggable

The `SortableItem` component wraps children and makes them draggable:

```tsx
export function SortableItem({ 
  id, 
  children, 
  className, 
  disabled = false
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ 
    id, 
    disabled
  });

  // Styling and transforms
  // ...

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={/* Classes for visual feedback */}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
```

### Managing Sortable State

The `SortableContextProvider` manages the state of sortable items:

```tsx
<SortableContextProvider
  items={cardPositions}
  onItemsChange={handleCardOrderChange}
  strategy="horizontal"
  renderOverlay={renderDragOverlay}
>
  {/* Sortable items */}
</SortableContextProvider>
```

### Separating Click and Drag Behaviors

The implementation separates click handling from drag behavior:

1. The entire card is draggable
2. Click events are handled separately from drag events
3. Card content is clickable without interfering with drag behavior

## Accessibility Considerations

- Keyboard navigation support through dnd-kit
- Visual feedback during interaction states
- Sufficient contrast for drag indicators
- Touch-friendly targets for mobile users

## Using the Components

### Basic Usage

```tsx
// Define your items and their order
const [items, setItems] = useState(['item1', 'item2', 'item3']);

// Handle reordering
const handleOrderChange = (newOrder) => {
  setItems(newOrder);
};

// Use the components
<SortableContextProvider 
  items={items} 
  onItemsChange={handleOrderChange}
>
  {items.map(id => (
    <SortableItem key={id} id={id}>
      {/* Your content here */}
    </SortableItem>
  ))}
</SortableContextProvider>
```

### Custom Drag Overlay

You can customize the appearance of items while being dragged:

```tsx
const renderDragOverlay = (id) => {
  if (!id) return null;
  return (
    <div className="drag-overlay">
      {/* Custom overlay content */}
    </div>
  );
};

<SortableContextProvider 
  renderOverlay={renderDragOverlay}
  // ...other props
>
  {/* ... */}
</SortableContextProvider>
```

## Best Practices

1. **Make draggable areas obvious** - Use visual cues to indicate draggability
2. **Provide immediate feedback** - Respond to user interactions with visual changes
3. **Keep animations smooth** - Use transitions for natural-feeling interactions
4. **Separate click and drag** - Ensure click actions don't interfere with drag actions
5. **Handle edge cases** - Consider what happens during drag on screen edges, etc.
6. **Test on touch devices** - Ensure the experience works well on mobile

## Common Pitfalls

1. **Performance issues with large lists** - Be careful with lists containing many items
2. **Interference with click events** - Ensure drag doesn't capture intended clicks
3. **Missing visual feedback** - Always provide clear indication of what's happening
4. **Neglecting touch devices** - Test on mobile to ensure good touch experience
