# Overview Tab Layout

This document details the layout structure of the Overview tab in the Profile section, focusing on the card grid layout, responsiveness, and component organization.

## Overview Tab Structure

The Overview tab has a unique layout compared to other tabs, featuring a customizable grid of draggable cards:

```tsx
<ProfileCardGrid 
  cardPositions={cardPositions}
  onOrderChange={handleOrderChange}
  activeCardId={activeCardId}
  onCardClick={handleCardClick}
  profileData={mockProfileData}
  skills={mockSkills}
/>
```

## Component Hierarchy

```
Overview Tab
└── ProfileCardGrid
    ├── SortableContextProvider
    │   └── SortableItem (for each card)
    │       └── DraggableCard
    │           ├── CardHeader
    │           └── CardContent
    │               └── [Specific Card Content Based on Type]
    └── GridGuidance (visual grid guides during drag)
```

## Main Layout Properties

- **Container**: The `ProfileCardGrid` serves as the main container for the card layout
- **Grid System**: Uses CSS Grid with 1, 4, or 6 columns depending on screen size
- **Gap Spacing**: Consistent `gap-6` (1.5rem, 24px) between all cards
- **Relative Positioning**: The container has `position: relative` for absolute positioning of grid guidance
- **Full Width**: The grid spans the full width of the tab content area

## Card Layout Properties

Each card in the grid is positioned according to its size classification:

| Card Size | Mobile | Tablet (md) | Desktop (lg) |
|-----------|--------|-------------|--------------|
| Small | Full width | 2 columns | 2 columns |
| Medium-Wide | Full width | 4 columns | 4 columns |
| Medium-Long | Full width | 2 columns | 2 columns, 2 rows |
| Large | Full width | 4 columns | 4 columns, 2 rows |

## Responsive Behavior

The Overview tab's layout is highly responsive:

### Mobile (< 768px)
- Single column layout (`grid-cols-1`)
- Cards are stacked vertically
- Full width cards with standard spacing
- Card order follows the `cardPositions` array order

### Tablet (768px - 1023px)
- Four-column grid layout (`md:grid-cols-4`)
- Small cards take 2 columns
- Medium-wide and large cards span all 4 columns
- Two cards can appear side-by-side

### Desktop (≥ 1024px)
- Six-column grid layout (`lg:grid-cols-6`)
- Small cards take 2 columns (`lg:col-span-2`)
- Medium-wide cards take 4 columns (`lg:col-span-4`)
- Medium-long cards take 2 columns and 2 rows (`lg:col-span-2 lg:row-span-2`)
- Large cards take 4 columns and 2 rows (`lg:col-span-4 lg:row-span-2`)
- Up to 3 small cards can appear in a row

## Layout Implementation

The core grid layout is implemented in `ProfileCardGrid.tsx`:

```tsx
<div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
  {cardPositions.map((cardId) => (
    <SortableItem key={cardId} id={cardId}>
      <DraggableCard 
        id={cardId}
        config={CARD_CONFIG[cardId as CardConfigKey]}
        active={activeCardId === cardId}
        onClick={() => onCardClick(cardId)}
        profileData={profileData}
        skills={skills}
      />
    </SortableItem>
  ))}
</div>
```

## Card Dimensions and Sizing

Card dimensions are controlled through the `cardConfig.ts` configuration:

```tsx
export const CARD_CONFIG: Record<CardConfigKey, CardConfig> = {
  rank: {
    title: "Current Rank",
    bgColor: "bg-gradient-to-br from-purple-500 to-indigo-600",
    textColor: "text-white",
    size: "small",
    height: "320px",
    colSpan: 2
  },
  // Other card configurations...
}
```

## Active Card State

When a card is active (clicked), its layout properties change:

- Increased z-index (`z-20`) to appear above other cards
- Expanded size (scales up slightly)
- Enhanced shadow for visual prominence
- Potential content expansion within the card

## Drag and Drop Layout Considerations

During drag operations, the layout adapts:

- Dragged card becomes semi-transparent
- Other cards shift to accommodate the dragged card
- Grid guidance lines become visible
- The card's appearance changes (scaled, shadow enhancement)

## Layout Relationship with Other Components

### Relationship with GridGuidance

The `GridGuidance` component provides visual guidance within the grid layout:

```tsx
<GridGuidance 
  columns={6} 
  visible={isDragging} 
  className="absolute inset-0 pointer-events-none z-0" 
/>
```

- Positioned absolutely within the grid container
- Spans the entire grid area
- Rendered with appropriate number of columns matching the grid
- Only visible during drag operations

### Relationship with CardHeader

Each card's header maintains consistent layout properties:

- Fixed 40px height
- Horizontal padding (`px-4`)
- Vertical padding (`py-2`)
- Flexbox layout with space between title and optional actions
- Consistent typography for the title

## Animation and Transition Properties

The layout incorporates smooth transitions:

- Card position changes animate smoothly
- Grid rearrangement uses transition for fluid movement
- Drag overlay uses transform transitions
- Active state changes use transition for smooth visual feedback

## Special Layout Considerations

### Expanding Cards

When a card is selected, it expands while maintaining its grid position:

- Transform scale is applied
- Z-index is increased
- Content area may expand to show additional information
- Animation occurs with a short duration and ease-out timing

### Empty Grid Spaces

The layout handles spaces in the grid when dragging:

- Empty spaces maintain their dimensions during drag
- Visual indicators show where a card will be placed
- Grid cell highlighting occurs when dragging over valid drop zones

## Relationship to Grid Layout System

This layout works in conjunction with the grid layout system (see [grid-layout.md](./grid-layout.md)) but focuses on:

- The overall structure of the Overview tab
- Component relationships and hierarchy
- Card positioning and dimensions
- Responsive behavior across devices
- Interactive states and transitions

While the grid layout document focuses on the technical implementation details of the grid system itself, this document covers how that grid system is applied specifically in the Overview tab's layout.
