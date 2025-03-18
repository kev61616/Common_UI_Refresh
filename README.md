# BrainBox Study Platform

This project is a Next.js-based study and review platform designed to help students track their performance and review study materials.

## Tech Stack

- **Frontend Framework**: Next.js 15.2.1 with App Router
- **UI Framework**: React 19.0.0
- **Styling**: TailwindCSS 4.0
- **Language**: TypeScript
- **Linting**: ESLint 9

## Key Features

- Interactive dashboard with performance insights
- Multiple view options for reviewing study materials
- Advanced filtering system with sticky navigation
- Timeline-based visualization of study progress
- Dark/light mode support

## Modular Filter System

The filtering system has been modularized for better maintainability and performance. The new system includes:

### Core Components

- `FilterContext.tsx` - Context provider for managing filter state
- `filterData.ts` - Centralized data structures and utility functions
- `FilterButton.tsx` - Reusable button component with standardized styles

### Filter Components

- `SubjectFilter.tsx` - Filter for subject categories (Reading, Writing, Math)
- `TypeFilter.tsx` - Complex filter for specific topic types with category-based organization
- `DateFilter.tsx` - Date range presets for filtering by time period
- `RangeSliderFilter.tsx` - Dual-handle slider for numeric range filtering (Accuracy, Time)

### Main Container

- `ModularFilterBar.tsx` - Container component that assembles all filters into a cohesive UI

### Benefits of the New System

- **Improved Maintainability**: Each filter is now a separate component
- **Better State Management**: Centralized state via React Context
- **Enhanced User Experience**: More intuitive and responsive filtering
- **Type Safety**: Fully typed with TypeScript interfaces
- **Consistent Styling**: Standardized visual language across all filters

## Sticky Navigation System

The platform features a sticky navigation system that enhances the user experience by keeping important controls accessible while scrolling.

### Features

- **Persistent Controls**: View toggles and filter controls remain visible when scrolling through content
- **Visual Feedback**: Shadow and backdrop blur effects indicate when navigation is in sticky mode
- **Responsive Design**: Adapts to different screen sizes with specialized mobile layout
- **CSS Variables**: Uses CSS custom properties for consistent spacing and positioning
- **Performance Optimized**: Smooth transitions and minimal re-renders during scroll events

### Mobile Experience

- **Collapsible Filters**: Filters can be toggled on/off via a dedicated mobile button
- **Space Efficiency**: Compact interfaces for small screens
- **Touch-Friendly**: Larger tap targets for mobile interactions
- **Visual Indicators**: Badge counters show number of active filters at a glance

## Navigation Improvements

The main navigation has been optimized with:

- **Integrated Logo**: Logo component is now embedded directly in the navigation bar
- **Consistent Height**: Fixed navbar height via CSS variables for a stable UI
- **Improved Dropdowns**: Enhanced dropdown menu interactions and visibility
- **Responsive Adaptations**: Proper sizing and spacing across all device sizes

## Development Guidelines

1. Always use the App Router for routing - Page Router is not supported
2. Include helpful comments for complex logic
3. Follow TypeScript best practices for type safety
4. Ensure components are responsive for all device sizes
5. Maintain dark/light mode compatibility
6. Use CSS variables for consistent sizing and spacing

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) to see the application

## File Structure

```
src/
├── app/            # App Router pages and layouts
├── components/     # Reusable components
│   ├── common/     # Shared UI components
│   ├── dashboard/  # Dashboard-specific components
│   ├── review/     # Review-related components
│   │   ├── filters/        # Modular filter components
│   │   ├── enhanced-matrix/# Matrix view components
│   │   └── timeline-view-variants/ # Timeline visualizations
├── lib/            # Utility functions and data
├── styles/         # Global styles and theme configuration
│   ├── custom-animations.css # Animation and CSS variable definitions
│   ├── dropdown.css          # Dropdown-specific styles
│   └── tailwind.css          # Tailwind configuration and imports
```

## Contributing

When contributing to this repository, please follow these best practices:

1. Create a feature branch for your changes
2. Write comprehensive tests for new features
3. Update documentation to reflect any changes
4. Follow the established code style and formatting
5. Submit a pull request for review
