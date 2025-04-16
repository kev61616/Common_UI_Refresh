# Profile Section Layout

This document details the overall layout structure of the Profile section, covering the main container, tab navigation, and shared layout patterns.

## Container Structure

The Profile section uses a centered container with responsive padding:

```tsx
<div className="container mx-auto py-8 px-4">
  {/* Header */}
  {/* Tab navigation */}
  {/* Tab content */}
</div>
```

### Key Layout Properties

- **Container**: Uses the standard `container` class with auto horizontal margins
- **Vertical Padding**: `py-8` (2rem, 32px) top and bottom
- **Horizontal Padding**: `px-4` (1rem, 16px) left and right
- **Max Width**: Inherited from the `container` class (varies by breakpoint)

## Header Section

The header section appears above the tabs and contains the title and action buttons:

```tsx
<div className="mb-8">
  <h1 className="text-3xl font-bold mb-2">Profile Overview</h1>
  <div className="flex space-x-4">
    <button 
      className="bg-primary text-white px-4 py-2 rounded-md"
      onClick={() => setCardPositions([...])}
    >
      Reset Layout
    </button>
  </div>
</div>
```

### Header Layout Properties

- **Bottom Margin**: `mb-8` (2rem, 32px) separates header from tab navigation
- **Title Typography**: `text-3xl font-bold mb-2` (1.875rem font size, bold weight, 0.5rem bottom margin)
- **Action Button Container**: `flex space-x-4` (flexbox with 1rem spacing between items)

## Tab Navigation

The tab navigation is implemented using the `CrystalTabs` component wrapped by the `ProfileTabs` component:

```tsx
<ProfileTabs activeTab={activeTab} onTabChange={setActiveTab}>
  {/* Tab content */}
</ProfileTabs>
```

Inside the `ProfileTabs` component:

```tsx
<div className="w-full space-y-6">
  <CrystalTabs
    tabLabels={tabLabels}
    activeTab={activeTab}
    onTabChange={onTabChange}
  />
  <div className="p-4">
    {children}
  </div>
</div>
```

### Tab Navigation Layout Properties

- **Full Width**: `w-full` ensures the tabs span the entire container width
- **Vertical Spacing**: `space-y-6` (1.5rem, 24px) between tab navigation and content
- **Content Padding**: `p-4` (1rem, 16px) padding around the tab content

## Responsive Behavior

The Profile section adapts to different screen sizes with the following breakpoints:

| Breakpoint | Container Max Width | Layout Changes |
|------------|---------------------|----------------|
| Default (mobile) | 100% | Single column layouts, stacked cards |
| md (768px) | 768px | Two-column layouts for some components |
| lg (1024px) | 1024px | Multi-column grid layouts, side-by-side cards |
| xl (1280px) | 1280px | Wider container, more spacing |

## Z-Index Hierarchy

The Profile section maintains a consistent z-index hierarchy:

1. **Base Content**: `z-0` (default)
2. **Card Elements**: `z-10`
3. **Drag Overlay**: `z-20` (appears above cards during drag operations)
4. **Tooltips/Popovers**: `z-30`
5. **Modal Dialogs**: `z-40` (if applicable)

## Cross-Tab Layout Consistency

To maintain visual consistency across tabs, the following patterns are used:

1. **Card Styling**: Consistent rounded corners (`rounded-xl`), shadows (`shadow-sm`), and borders (`border border-border`)
2. **Section Headers**: Consistent styling with `text-foreground` class and `mb-4` spacing
3. **Grid Structures**: 
   - Base 1-column layout on mobile: `grid-cols-1`
   - 2-column layout on large screens: `lg:grid-cols-2`
   - Consistent gap spacing: `gap-6` (1.5rem, 24px)
4. **Content Area Height**: Cards and charts maintain consistent heights for visual harmony

## Diagram: Component Layout Structure

```
┌─────────────────────────────────────────────────┐
│ Profile Container                               │
│ ┌─────────────────────────────────────────────┐ │
│ │ Header                                      │ │
│ └─────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────┐ │
│ │ Tab Navigation                              │ │
│ └─────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────┐ │
│ │ Tab Content Area                            │ │
│ │ ┌─────────┐ ┌─────────┐ ┌─────────┐        │ │
│ │ │ Card/   │ │ Card/   │ │ Card/   │        │ │
│ │ │ Section │ │ Section │ │ Section │        │ │
│ │ └─────────┘ └─────────┘ └─────────┘        │ │
│ │ ┌───────────────────────────────┐          │ │
│ │ │ Wide Card/Section             │          │ │
│ │ └───────────────────────────────┘          │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

## CSS Variables

The Profile section leverages the theme's CSS variables for consistent styling:

- `--background`: Page background color
- `--foreground`: Primary text color
- `--card`: Card background color
- `--card-foreground`: Card text color
- `--primary`: Primary action color
- `--primary-foreground`: Text color on primary backgrounds
- `--accent`: Secondary action color
- `--border`: Border color for separators and containers

## Accessibility Considerations

The layout ensures accessibility through:

1. **Consistent Focus Outlines**: Interactive elements maintain visible focus states
2. **Sufficient Spacing**: Targets maintain at least 44x44px touch/click areas
3. **Logical Tab Order**: Elements follow a natural tab sequence in the DOM
4. **Landmark Regions**: Appropriate HTML5 semantic elements used for structure

## Design System Integration

The layout integrates with the application's design system through:

1. **Typography Scale**: Consistent text sizing (`text-sm`, `text-base`, `text-lg`, etc.)
2. **Color Tokens**: Theme-consistent colors through CSS variables
3. **Spacing Scale**: Consistent spacing using the `space-*` and `gap-*` utilities
4. **Component Reuse**: Shared components like `CardHeader` maintain visual consistency
