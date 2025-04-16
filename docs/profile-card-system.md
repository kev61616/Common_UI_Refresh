# Profile Card Standardization System

This document outlines the standardization approach for profile dashboard cards, providing consistent dimensions, styling, and behavior across the profile view.

## Card Size Classification

Cards are classified into four standard sizes to maintain visual consistency:

| Size | Grid Columns × Rows | Dimensions | Use Case |
|------|----------------|-----------|----------|
| Small | 2 × 1 | 2 columns × 320px | Simple data displays (most cards) |
| Medium-Wide | 4 × 1 | 4 columns × 320px | Horizontal visualizations (e.g., Skills chart) |
| Medium-Long | 2 × 2 | 2 columns × 640px | Vertical data displays (e.g., timelines) |
| Large | 4 × 2 | 4 columns × 640px | Complex data displays (future use) |

## Implementation Details

### 1. Configuration

Each card's dimensions are defined in `src/components/profile/config/cardConfig.ts`:

```typescript
export type CardConfigKey = 'rank' | 'achievements' | 'scores' | 'skills' | 'streak' | 'tags';
export type CardSize = 'small' | 'medium' | 'large';

export interface CardConfig {
  title: string;
  bgColor: string;
  textColor: string;
  size: CardSize;
  height: string;
  minHeight?: string;
  colSpan: number;
}

export const CARD_CONFIG: Record<CardConfigKey, CardConfig> = {
  // Card configurations...
}
```

### 2. Fixed Dimensions

All cards have:
- **Compact header**: 40px height with reduced padding (px-4 py-2)
- **Fixed content area**: Calculated as `height - 40px`
- **Overflow handling**: Content areas have `overflow-auto` to handle content that exceeds the fixed height

### 3. Styling

Cards maintain consistent styling:
- Consistent padding (16px) for content areas
- Standardized rounded corners (border-radius)
- Uniform shadows and border treatments
- Consistent color schemes based on card type

### 4. Responsive Behavior

Cards respond to different screen sizes:
- **Mobile**: Full-width (1-column)
- **Tablet**: Mixed 1 or 2-column layout
- **Desktop**: Follows the 6-column grid with both column and row spans:
  - Small cards: `lg:col-span-2 lg:row-span-1`
  - Medium-Wide cards: `lg:col-span-4 lg:row-span-1`
  - Medium-Long cards: `lg:col-span-2 lg:row-span-2`
  - Large cards: `lg:col-span-4 lg:row-span-2`

## Usage Guidelines

### Card Size Selection Rules

When creating or modifying cards:
1. **Default to Small cards** whenever possible (2×1)
2. **Use Medium-Wide cards (4×1)** only when horizontal space is essential (like radar charts)
3. **Use Medium-Long cards (2×2)** for content that benefits from vertical space (timelines, lists)
4. **Reserve Large cards (4×2)** for future complex visualizations

### Adding a New Card

1. Add the new card type to the `CardConfigKey` type
2. Create a configuration entry in `CARD_CONFIG` with appropriate dimensions and size
3. Implement the content component in `CardContent.tsx`
4. Add the card ID to the default card positions in `ProfilePage`

### Custom Card Styling

While the dimensions are standardized, you can customize:
- Background colors (bgColor)
- Text colors (textColor)
- Internal content layout

### Content Considerations

- Design content for the fixed height constraint
- Implement scrolling for content that might exceed the height
- Consider content prioritization for smaller cards

## Drag and Drop System

The card system integrates with `dnd-kit` through:
- `SortableItem` wrapper around each card
- Consistent drag visual feedback
- Grid guidance system for intuitive placement

## Accessibility Considerations

- Cards maintain minimum touch target sizes
- Visual feedback clearly indicates interactive elements
- Sufficient color contrast for all elements
- Screen reader support for interactive elements
