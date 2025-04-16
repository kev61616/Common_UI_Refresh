# Overview Tab Documentation

This document provides details about the Overview tab in the Profile section, which serves as a customizable dashboard with a card-based interface.

## Purpose

The Overview tab provides a comprehensive dashboard of the student's performance across all subjects using a customizable card-based layout. It is designed to give students a quick glance at their performance metrics and achievements in a personalized format.

## Features

- **Draggable Cards**: Users can rearrange cards by dragging them to preferred positions
- **Customizable Layout**: The grid layout persists between sessions
- **Reset Layout**: Button to restore the default card arrangement
- **Expandable Cards**: Cards can be clicked to focus/expand for more detail

## Card Types

The Overview tab includes the following card types:

1. **Rank Card**: Displays the student's current rank (e.g., Platinum) and progress toward the next rank
2. **Achievements Card**: Shows recent achievements with icons, descriptions, and dates
3. **Scores Card**: Displays predicted scores for overall performance and individual subjects
4. **Skills Card**: Visual representation of current skill levels across subjects
5. **Streak Card**: Tracks daily activity and study streaks
6. **Tags Card**: Highlights tag mastery with accuracy percentages and trends

## User Interactions

- Cards can be dragged to reorder them
- Clicking a card toggles its expanded state
- The "Reset Layout" button restores cards to their default positions

## Technical Implementation

The Overview tab is implemented in `src/app/profile/page.tsx` and uses the following key components:

- `ProfileCardGrid`: Main container for the card grid system
- `DraggableCard`: Individual card component with drag functionality
- `CardContent`: Displays different content based on card type
- `CardHeader`: Standardized header component for all cards

The drag and drop functionality is powered by the `dnd-kit` library and implemented through custom wrappers.

## Related Documentation

For more detailed implementation information, see:

- [Card System Documentation](./card-system.md) - Details on card dimensions, styling, and implementation
- [Drag and Drop System](./drag-and-drop.md) - In-depth explanation of the drag and drop functionality
- [Grid Layout System](./grid-layout.md) - Information about the responsive grid system

## Component Hierarchy

```
ProfilePage
└── ProfileTabs
    └── ProfileCardGrid
        ├── SortableContextProvider
        │   └── SortableItem (multiple)
        │       └── DraggableCard
        │           ├── CardHeader
        │           └── CardContent
        │               └── [Specific Card Component]
        └── GridGuidance
```

## State Management

The Overview tab maintains the following state:

- `cardPositions`: Array of card IDs representing their current order
- `activeCardId`: ID of the currently expanded card, if any

This state is managed in the top-level `ProfilePage` component and passed down to child components as needed.
