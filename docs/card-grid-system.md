# Card Grid System Documentation

## Overview

The card grid system is a flexible, draggable interface that allows users to customize their dashboard experience. This system is built with a responsive grid layout that adapts to different screen sizes while maintaining a consistent visual structure.

## Card Rules

### Sizing Guidelines

- **Base Unit**: All cards follow a 1x1 minimum size rule
  - 1x1 represents a single grid cell in the layout system
  - Cards may span multiple grid cells (e.g., 2x1, 3x1, 2x2) for content that requires more space
  - The Skills Breakdown card is a 2x1 size (spans 4 columns in a 6-column grid)

### Card Structure

Every card must include the following components:

1. **Header Component**
   - Background color (customizable per card type)
   - Title text
   - Border along bottom edge
   - Optional action buttons (three-dot menu, collapse, etc.)

2. **Content Area**
   - Padding for proper content spacing
   - Flexible height to accommodate content
   - Scrollable if content exceeds maximum height

3. **Consistent Styling**
   - Rounded corners (rounded-xl)
   - Border (border border-border)
   - Shadow (shadow-sm)
   - Overflow handling (overflow-hidden)

## Interaction Guidelines

### Drag and Drop

Cards support drag-and-drop functionality:

- **Visual Indicators**:
  - Cursor changes to "move" when hovering over draggable areas
  - Grid guides appear during drag operations
  - Active card receives a highlight effect

- **Grid Placement Rules**:
  - Cards snap to grid positions
  - Cards cannot overlap
  - Grid automatically reflows when cards are moved
  - Minimum 1x1 size must be maintained

### Card Selection

Cards support click interactions separate from drag operations:

- **Selection State**:
  - Clicking a card toggles its selected state
  - Selected cards receive a highlight ring (ring-2 ring-primary)
  - Only one card can be selected at a time
  - Clicking outside or clicking the selected card again deselects it

## Responsive Behavior

- On small screens (mobile), cards stack in a single column
- On medium screens, cards arrange in a 2-column grid
- On large screens and above, cards utilize the full 6-column grid
- Cards maintain minimum height requirements regardless of screen size
- Content scales appropriately within cards

## Implementation Notes

- Card headers should use the shared CardHeader component for consistency
- Cards should handle their own content overflow
- Each card must have a unique data-card-id attribute for selection and drag identification
- Widgets inside cards should adapt to the available space
