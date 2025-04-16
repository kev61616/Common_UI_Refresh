# Math Tab Layout

This document details the layout structure of the Math tab in the Profile section, focusing on the organization of score display, progress charts, and skills breakdown.

## Math Tab Structure

The Math tab follows a consistent layout pattern that organizes information into distinct card sections:

```tsx
<div className="space-y-6">
  <Typography variant="h2" className="text-slate-900 dark:text-white">
    Math Performance
  </Typography>
  
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Math Score */}
    <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border p-6">
      <Typography variant="h3" className="text-foreground mb-4">Current Score</Typography>
      {/* Score content */}
    </div>
    
    {/* Math Progress */}
    <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border p-6">
      <Typography variant="h3" className="text-foreground mb-4">Progress</Typography>
      {/* Progress chart */}
    </div>
    
    {/* Math Skills */}
    <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border p-6 lg:col-span-2">
      <Typography variant="h3" className="text-foreground mb-4">Skills Breakdown</Typography>
      {/* Skills grid */}
    </div>
  </div>
</div>
```

## Component Hierarchy

```
Math Tab
├── Header (Typography h2)
└── Content Grid
    ├── Current Score Card
    │   ├── Card Header (Typography h3)
    │   └── Score Display
    ├── Progress Card
    │   ├── Card Header (Typography h3)
    │   └── Progress Chart
    └── Skills Breakdown Card (spans 2 columns)
        ├── Card Header (Typography h3)
        └── Skills Grid
            └── Skill Items (3 items)
```

## Main Layout Properties

- **Container**: The main container uses `space-y-6` for vertical spacing between sections
- **Top-Level Heading**: Uses `text-3xl` typography with appropriate text colors for light/dark modes
- **Content Grid**: Uses CSS Grid with responsive columns
- **Card Styling**: Consistent card styling across all sections
- **Section Spacing**: Consistent `gap-6` (1.5rem, 24px) between grid items

## Card Layout Properties

All cards share consistent layout properties:

- **Background**: `bg-card` for the card background
- **Text Color**: `text-card-foreground` for consistent text appearance
- **Border Radius**: `rounded-xl` for consistent rounded corners
- **Shadow**: `shadow-sm` for subtle elevation
- **Border**: `border border-border` for defined edges
- **Padding**: `p-6` (1.5rem, 24px) for consistent internal spacing
- **Overflow Handling**: `overflow-hidden` to contain internal content

## Responsive Behavior

The Math tab adapts to different screen sizes:

### Mobile (< 1024px)
- Single column layout (`grid-cols-1`)
- Cards are stacked vertically in the order:
  1. Current Score Card
  2. Progress Card
  3. Skills Breakdown Card
- Full width cards with standard spacing

### Desktop (≥ 1024px)
- Two-column grid layout (`lg:grid-cols-2`)
- Current Score Card takes the first column
- Progress Card takes the second column
- Skills Breakdown Card spans both columns (`lg:col-span-2`)

## Score Card Layout

The Current Score Card has a specific internal layout:

```tsx
<div className="flex items-center justify-center">
  <div className="text-6xl font-bold text-cyan-500">770</div>
  <div className="ml-4 text-sm text-muted-foreground">
    <div className="flex items-center">
      <span className="text-success-500">↑ 30 points</span>
      <span className="ml-2">since last month</span>
    </div>
  </div>
</div>
```

- **Container**: Uses flexbox with centered alignment
- **Score Display**: Large typography (`text-6xl`) with distinctive cyan color
- **Change Indicator**: Smaller text with appropriate color for improvement/decline
- **Contextual Text**: Muted text providing timeframe context

## Progress Chart Layout

The Progress Chart Card has the following layout structure:

```tsx
<div className="h-48 flex items-center justify-center">
  <div className="w-full h-32 bg-slate-100 dark:bg-slate-800 rounded-lg">
    {/* Progress chart content */}
  </div>
</div>
```

- **Container**: Fixed height container (`h-48`) with flexbox for centering
- **Chart Area**: Defined height and width with appropriate background
- **Rounded Corners**: Consistent with overall design language
- **Light/Dark Mode**: Supports different background colors based on theme

## Skills Breakdown Layout

The Skills Breakdown section uses a nested grid:

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {['Algebra', 'Geometry', 'Data Analysis'].map((skill, index) => (
    <div key={index} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
      {/* Skill content */}
    </div>
  ))}
</div>
```

- **Container**: CSS Grid with responsive column behavior
- **Mobile**: Single column layout for skills (`grid-cols-1`)
- **Tablet+**: Three-column layout (`md:grid-cols-3`)
- **Item Spacing**: Smaller gaps between skill items (`gap-4`)
- **Skill Items**: Consistent padding and background with rounded corners

### Skill Item Internal Layout

Each skill item follows this layout pattern:

```tsx
<div className="font-medium mb-2">{skill}</div>
<div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
  <div 
    className="bg-cyan-500 h-full rounded-full" 
    style={{ width: `${[82, 70, 85][index]}%` }}
  ></div>
</div>
<div className="mt-1 text-right text-sm">{[82, 70, 85][index]}%</div>
```

- **Skill Label**: Medium weight font with bottom margin
- **Progress Bar Container**: Full width with appropriate background and height
- **Progress Indicator**: Cyan-colored bar with dynamic width based on percentage
- **Percentage Display**: Right-aligned small text showing the exact percentage

## Color Scheme

The Math tab uses a specific color scheme:

- **Cyan Theme Color**: `cyan-500` for the main score and progress bars
- **Success Color**: `text-success-500` (typically green) for improvement indicators
- **Background Variations**: `bg-slate-50`/`bg-slate-800` for skill item backgrounds
- **Text Colors**: Appropriate contrast with backgrounds in both light and dark modes

## Differentiation from Other Tabs

While the Math tab follows the same overall layout structure as other tabs, it is visually distinguished through:

- Use of `cyan-500` theming instead of `primary-500` (blue) or `accent-500` (purple)
- Math-specific skill categories (Algebra, Geometry, Data Analysis)
- Different score values and progress metrics
- Future math-specific chart visualizations with domain-specific visualizations

## Animation and Transitions

Though the current implementation is static, the design supports future animations:

- Progress bars can animate from 0% to their final width on tab selection
- Score displays can use counting animations when values change
- Chart elements can use entry animations and hover state enhancements
- Math-specific animations for problem-solving visualization

## Skill-Specific Visual Treatments

Future enhancements may include specialized visual treatments for each skill:

- **Algebra**: Formula visualizations with variable highlighting
- **Geometry**: Shape-based visual representations with dimensional indicators
- **Data Analysis**: Mini-charts and data visualization components

## Accessibility Considerations

The layout incorporates accessibility features:

- **Color Contrast**: Sufficient contrast between text and backgrounds
- **Text Alternatives**: Numeric values are presented both visually and as text
- **Semantic Structure**: Appropriate heading hierarchy (`h2` for tab title, `h3` for sections)
- **Responsive Adaptation**: Layout adjusts appropriately for different screen sizes and orientations
- **Math Notation Accessibility**: Future support for accessible math notation rendering

## Relationship to Other Component Documentation

This layout documentation complements other Math tab documentation:

- [Math Skills Documentation](./skills.md) - Provides details on the skills being measured
- [Progress Tracking](./progress-tracking.md) - Details the progress visualization implementation

While those documents focus on the functional aspects and data representation, this document specifically addresses the spatial arrangement, responsiveness, and visual structure of the Math tab.
