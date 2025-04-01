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

### SAT Section

Under the SAT section, we offer two main components:

#### Question Bank

Based on the Brainbox2 GEPTv2 design, our Question Bank offers:

- **Two-Column Layout**: Reading passage on the left, answer options on the right
- **Interactive Options**: Select answers with immediate visual feedback
- **Navigation Tools**: Advanced breadcrumb navigation with subject/topic hierarchies
- **Tool Windows**: Access to calculator, formula sheets, and other helpful resources
- **Performance Tracking**: Real-time tracking of answers and progress

#### Mock Tests

Our Mock Test feature provides:

- **Full-Length Simulations**: Complete SAT tests under realistic conditions
- **Timed Sessions**: Accurately timed sections reflecting the actual exam
- **Comprehensive Review**: Detailed analysis of strengths and weaknesses
- **Performance Metrics**: Score breakdowns and improvement tracking

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
  - `/question-bank/` - Question Bank components modeled after GEPTv2
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
npm start
```

## Recent Updates

- Added beautiful Flashcard view as the default Question View with interactive 3D flip animations
- Enhanced Board view popup with filtering and sorting capabilities for better organization
- Enhanced the FilterBar component with multi-select capabilities and implemented tag-based filter display
- Added category labels to filter pills for improved usability (Subject, Difficulty, Time, Performance)
- Implemented comprehensive solution for hydration errors with client-only components and deterministic rendering
- Added specialized client components for dates, icons, and performance metrics with safe SSR fallbacks
- Updated hydration error documentation with best practices for handling mock data
- Removed the "Learning Journey" concept for a more streamlined UI
- Renamed "Insights" to "Question View" for clearer user understanding
- Added a new Board View as the third tab in the review section
- Enhanced the FilterBar component with beautiful pill-shaped selections and pastel color schemes
- Made FilterBar a standard reusable component across all views with consistent styling
- Updated Set View with advanced sorting and filtering capabilities
- Fixed hydration errors by implementing deterministic data generation
- Updated to Next.js 15.2.1 with full App Router implementation
- Added critical App Router special files (error.tsx, loading.tsx, global-error.tsx)
- Created API route handler example using Next.js 15.2.1 route.ts convention
- Implemented GEPTv2-style Question Bank from Brainbox2
- Enhanced Dashboard with cleaner UI and removed complex SVG patterns
- Fixed hydration errors by implementing static values for dynamic content
- Improved responsiveness for mobile devices
- Reordered Review dropdown menu items to match tab view order (Set View, Question View, Timeline View)
- Fixed hydration error in SimpleQuestionView by using deterministic calculations with useMemo and Math.floor
- Renamed ModifiedStorytellingTimeline to TimelineView for better code maintainability
- Enhanced TimelineView with improved visuals, animations, and interactive features:
  - Added entrance animations for timeline elements
  - Implemented hover effects and visual feedback
  - Added expandable details for practice sets
  - Created a toggleable animation system
  - Improved visual hierarchy with gradients and shadows
  - Added progress visualization with animated indicators
