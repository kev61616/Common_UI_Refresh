# Syntax Learning Platform

## Overview

Syntax is a next-generation learning platform that provides advanced data visualization and analysis for educational content. The platform uses React 19, Next.js 15.2.3, and Tailwind CSS 4 to deliver a responsive and interactive user experience.

## Features

### Dashboard

The Dashboard provides a comprehensive overview of student progress and performance:

- **Performance Insights**: Visual representation of progress across different subjects
- **Study Recommendations**: Personalized study suggestions based on performance data
- **Upcoming Tests**: Calendar view of scheduled assessments with countdown timers
- **Study Schedule**: Daily and weekly study plans tailored to student needs
- **Focus Areas**: Highlighted areas needing additional attention based on performance analytics

### Test Section

Under the Test section, we offer two main components:

#### Continuous Practice

Our Continuous Practice feature offers two approaches:

##### AI Recommended
- **Adaptive Learning**: Smart question sets tailored by user data
- **Personalized Focus**: Automatically focuses on weak areas
- **Premium Feature**: Available to premium subscribers
- **Comprehensive Analytics**: Detailed performance tracking

##### Custom Practice
- **Freemium Model**: Free users can only pick subject
- **Limited Usage**: Free tier limited to 7 hearts per day
- **Premium Access**: Premium users can choose specific units
- **Spotify-Inspired**: Uses a familiar freemium access model

#### Full Test

Our Full Test feature provides:

- **Full Mock Test**: Timed, full-length exam simulations
- **Realistic Conditions**: Complete test experience under timed conditions
- **Detailed Scoring**: Comprehensive performance analysis
- **Section Breakdown**: Individual scoring for Reading, Writing, and Math sections

### Review Section

The Review section provides three distinct views for analyzing performance data:

#### Set View

The Set View presents completed practice sets in a tabular format with powerful filtering and sorting capabilities:

- **Interactive Table**: Sortable columns with visual indicators for sort direction
- **Performance Metrics**: Color-coded accuracy indicators and progress bars
- **Mistake Analysis**: Breakdown of mistakes by type (conceptual, careless, time management)
- **Fatigue Detection**: Visual indicators when performance decreases significantly toward the end of a set
- **Comprehensive Filtering**: Filter by subject, difficulty, time period, and performance level

#### Question View

The Question View now offers multiple visualization options for reviewing questions:

##### Flashcard View (New)
- **Interactive 3D Flashcards**: Beautiful flashcards with smooth 3D flip animations
- **Topic-Based Review**: Cards organized by topic and subtopic for focused learning
- **Progress Tracking**: Visual progress bar showing completion percentage
- **Subject-Based Styling**: Cards styled based on subject (Math, Reading, Writing) for easy recognition
- **Navigation Controls**: Intuitive previous/next buttons for moving through the deck

##### Matrix View
- **Data Distribution**: Questions distributed across 6 mastery columns (Very Weak, Weak, Not Attempted, Emerging, Proficient, Mastered)
- **Challenge Icons**: Each cell includes a practice icon that allows users to improve their mastery level
- **Expandable Categories**: Main topics expand to show subcategories for more detailed analysis
- **Visual Progress Indicators**: Color-coded cells and progress bars show mastery levels and performance metrics
- **Enhanced Filtering**: Subject, topic, difficulty, and status filters with pill-shaped selections

#### Board View

The Board View offers a card-based organizational system for managing study tasks:

- **Drag-and-Drop Interface**: Easily move cards between columns to track study progress
- **Expandable Cards**: Cards expand with smooth animations to reveal detailed information
- **Progress Tracking**: Visual indicators show completion status for each task
- **Priority Markers**: Color-coded indicators highlight high-priority items
- **Category Organization**: Group cards by subject, difficulty, or due date
- **Enhanced Popup Views**: Category popups with comprehensive filtering and sorting options
- **Dynamic Content Filtering**: Real-time filtering of cards in popup views by subject, difficulty, and more

### Shared Components

#### FilterBar

The FilterBar is a standardized component used across all views with these features:

- **Pill-Shaped Selections**: Modern, touch-friendly UI elements for selecting filter options
- **Pastel Color Scheme**: Category-specific colors improve visual organization:
  - Subject filters: Soft pink
  - Time period filters: Soft blue
  - Difficulty filters: Soft green
  - Performance filters: Soft purple
  - Sort options: Amber
- **Active Filter Tags**: Clear visual indicators of currently applied filters
- **Backdrop Blur**: Subtle blur effect for a modern layered interface
- **Responsive Design**: Adapts to different screen sizes while maintaining usability

## Technical Implementation

### App Router Architecture (Next.js 15.2.3)

This project exclusively uses the Next.js App Router for routing. Page Router is not utilized. The app router provides:

- Improved performance through React Server Components
- Built-in data loading capabilities
- Simplified API route creation with Route Handlers
- Enhanced SEO functionality
- More efficient rendering with streaming capabilities
- Automatic error boundary and loading state management

#### Special Files Pattern

The project follows the Next.js 15.2.3 special files pattern:

- `layout.tsx` - Main layout wrapper for application sections
- `page.tsx` - Route UI for specific paths
- `loading.tsx` - Custom loading UI for route segments
- `error.tsx` - Error boundary for catching and displaying route errors
- `global-error.tsx` - Error boundary for root layout errors
- `not-found.tsx` - Custom 404 page
- `route.ts` - API endpoints within the app directory

### Component Structure

- `/src/app/` - Contains all page layouts and routes following the App Router pattern
  - `/review/` - Review section route handlers
    - `/set/` - Set View page
    - `/question/` - Question View page
    - `/board/` - Board View page
- `/src/components/` - Shared components used across the application
  - `/common/` - Common UI components used throughout the application
    - `FilterBar.tsx` - Standardized filter component with pill UI and color categorization
  - `/dashboard/` - Dashboard-specific components
  - `/question-bank/` - Question Bank components for interactive learning
  - `/review/` - Review system components
    - `/enhanced-matrix/` - Matrix grid components for the Question View
      - `/components/` - UI components like MatrixCell, MatrixRow, etc.
      - `/utils/` - Utility functions for data processing and visualization
      - `/hooks/` - Custom hooks for matrix data management
    - `/board/` - Board view components
      - `InteractiveBoardCard.tsx` - Expandable card component with animations
      - `EnhancedCollapsibleBoardView.tsx` - Main board layout
    - `/question-view-variants/` - Different question view visualizations
      - `EnhancedMatrixGridView.tsx` - Matrix-based question visualization
      - `SimpleQuestionView.tsx` - Simplified list-based question view
    - `SetViewTable.tsx` - Enhanced table view for completed practice sets
- `/src/contexts/` - React context providers for state management
- `/src/hooks/` - Custom hooks for features like timers, tool windows, and data processing
- `/src/lib/` - Utility functions and constants
- `/src/styles/` - Global styles and Tailwind configurations

### Data Flow

1. Raw question and practice set data is processed through specialized hooks
2. Data is transformed and distributed using deterministic utility functions to avoid hydration errors
3. The FilterBar component receives filter configuration and manages filter state
4. Filtered data is passed to visualization components (tables, matrices, cards)
5. UI components render the data with interactive elements
6. User interactions update state through context providers and handler functions
7. Changes are reflected in real-time throughout the application with animated transitions

## Development Guidelines

1. Only use App Router, not Page Router
2. Include descriptive comments for complex logic
3. Follow the existing component structure and naming conventions
4. Use Tailwind CSS for styling to maintain consistency
5. Test all interactive elements for proper functionality
6. Ensure components handle both light and dark modes appropriately
7. Use static values where possible to prevent hydration errors

## Maintenance Scripts

### cleanup_variants.sh

The project includes a maintenance script for managing and cleaning up problematic view variant components:

```bash
# Display what would be removed (dry run)
./cleanup_variants.sh --check

# Actually remove the problematic files
./cleanup_variants.sh --execute
```

This script automates the process of identifying and removing components with React hooks issues, providing:

- **Safe Execution Mode**: Dry-run capability to preview changes before execution
- **Intelligent Detection**: Automatically identifies conditional hooks and ESLint violations
- **Detailed Reporting**: Provides clear information about what files are problematic and why
- **Auto-scanning**: Scans variant directories for additional issues beyond the known problematic files
- **Import Reference Check**: Identifies potential import references that may need updating after removal
- **Colorized Output**: Uses color-coding to make output more readable

The script is particularly useful for maintaining React best practices across the large number of variant components in the review system.

## Technologies

As specified in package.json:

```json
"dependencies": {
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "next": "15.2.1"
},
"devDependencies": {
  "typescript": "^5",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "@tailwindcss/postcss": "^4",
  "tailwindcss": "^4",
  "eslint": "^9",
  "eslint-config-next": "15.2.1",
  "@eslint/eslintrc": "^3"
}
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
# Note: Since the project uses 'output: standalone' configuration,
# we must use the standalone server.js instead of 'next start'
node .next/standalone/server.js
```

## Recent Updates

- **Navigation and Theme Enhancements (April 2025)**:
  - Added dark/light mode toggle in the navigation bar for better user experience
  - Set light mode as the default theme for better readability
  - Improved component modularization across the Test section for better maintainability
  - Enhanced responsive design for various screen sizes
  - Improved navigation with more intuitive UI patterns

- **Test Section Renaming and Enhancement (April 2025)**:
  - Renamed "SAT" section to "Test" for more inclusive terminology
  - Restructured Test section with new "Continuous Practice" and "Full Test" components
  - Added AI Recommended practice with premium features and freemium model
  - Implemented Custom Practice with 7 hearts/day limit for free users
  - Enhanced Full Test with detailed test day information
  - Improved navigation with clearer pathways between practice options

- **Brainbox2 Reference Removal (April 2025)**:
  - Removed Brainbox2 reference folder that was previously used for design inspiration
  - Updated documentation to remove references to Brainbox2/GEPTv2 design
  - No functional impact on the codebase as the Syntax platform is now a standalone implementation
  - Maintained all Question Bank functionality with the same features and UI components
  - VSCode may still show phantom tabs for the removed files until the editor is restarted

- **Client-Side Navigation and useSearchParams Fixes (April 2025)**:
  - Fixed all instances of `useSearchParams()` hook that were causing build errors:
    - Created client components for anything using `useSearchParams`
    - Wrapped client components in Suspense boundaries in their parent components
    - Added loading states that match the design system for better UX during loads
    - Fixed ReviewNavigation, MainNavigationBar, and other components that use client-side navigation hooks
  - Implemented proper component architecture for Next.js 15:
    - Moved client-only logic to separate client components with 'use client' directive
    - Used a server component → client component pattern with Suspense boundaries
    - Added skeleton loading UI that correctly represents the layout of loaded components
  - Files fixed include:
    - MainNavigationBar.tsx and Navigation components
    - ReviewNavigation and related components
    - Board View and other review pages
    - Various doc pages that were using client navigation hooks

- **Module System Fix (April 2025)**:
  - Fixed ES module compatibility issue in postcss.config.js:
    - Changed CommonJS `module.exports` syntax to ES module `export default` syntax
    - This resolved the "module is not defined in ES module scope" error during build
    - The fix aligns with the `"type": "module"` setting in package.json
    - Enables proper building of the project with Next.js 15 and Tailwind CSS 4

- **Variant Component Cleanup & Hook Fixes (April 2025)**:
  - Created `cleanup_variants.sh` maintenance script to safely remove problematic components:
    - Configured with both check and execute modes for safe operations
    - Added automatic detection of conditional hooks and other React violations
    - Implemented color-coded output for better readability
    - Detected and removed NeuralNetworkView, NetworkGraphView, and CalendarHeatmapView with hook issues
  - Fixed conditional hook usage patterns across components:
    - Ensured all React hooks are called unconditionally at the top level
    - Removed patterns where hooks were conditionally executed
    - Added proper dependency arrays to useEffect and useMemo hooks

- **Next.js Configuration & Build Optimization (April 2025)**:
  - **Next.js Configuration Improvements**:
    - Updated to use modern syntax with the latest Next.js 15.2 options
    - Replaced deprecated `experimental.turbo.loaders` with `experimental.turbo.rules`
    - Moved `serverComponentsExternalPackages` to the new standard `serverExternalPackages` location
    - Configured for standalone mode which better supports mixed SSR/CSR applications
      - Note: This requires using `node .next/standalone/server.js` instead of `next start` to run the production server
    - Optimized staticPageGenerationTimeout settings for improved build reliability
  - **API Route Enhancements**:
    - Updated `src/app/api/hello/route.ts` to work with Next.js 15.2 standards
    - Modified dynamic directives for proper static/dynamic handling in modern Next.js
    - Added better error handling for API routes to improve user experience
    - Implemented graceful fallbacks for dynamic API routes in various build modes

- **Client-Side Navigation Improvements (April 2025)**:
  - **useSearchParams Hook Compliance**:
    - Fixed all instances of useSearchParams() hook by properly wrapping in Suspense boundaries
    - Applied fixes to review pages, demo pages, and question bank sections
    - Created consistent loading patterns with visually matching spinner components
    - Implemented component splitting pattern to separate client-only logic from parent components
  - **React 18+ Best Practices**:
    - Updated components to follow latest React 18 patterns for client components
    - Added dedicated loading states that match the visual design system
    - Improved error boundary handling for more graceful failure modes
    - Enhanced client-side navigation UX with proper loading indicators

- **Major Technical Improvements (Previous Updates)**:
  - **React Hooks Compliance**: Fixed conditional React hooks across multiple components:
    - Restructured `IndividualQuestionView.tsx` to follow React hooks rules by moving state hooks to the top level
    - Properly handled type conversions in components working with mixed data types
  - **Project Maintenance**:
    - Enhanced error handling during builds to provide clearer error messages
    - Configured proper static generation options for improved deployment compatibility
    - Added TypeScript safety improvements with better null/undefined handling
  - Created comprehensive page structure documentation with detailed mermaid diagrams for better visualization of application architecture
  - Fixed hydration errors by renaming "Performance" filter to "Accuracy" for consistent naming across components
  - Added custom mastery level icons with intuitive visual indicators
  - Added beautiful Flashcard view as the default Question View with interactive 3D flip animations
  - Enhanced Board view popup with filtering and sorting capabilities for better organization
  - Enhanced the FilterBar component with multi-select capabilities and implemented tag-based filter display
  - Added category labels to filter pills for improved usability (Subject, Difficulty, Time, Performance)
  - Implemented comprehensive solution for hydration errors with client-only components and deterministic rendering
  - Added specialized client components for dates, icons, and performance metrics with safe SSR fallbacks
  - Updated hydration error documentation with best practices for handling mock data
