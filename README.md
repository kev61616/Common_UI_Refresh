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

### Question View - Matrix Grid

The Matrix Grid provides a comprehensive overview that organizes questions by topic and mastery level:

- **Data Distribution**: Questions are evenly distributed across all 6 mastery columns (Very Weak, Weak, Not Attempted, Emerging, Proficient, Mastered)
- **Challenge Icons**: Each cell includes a challenge icon that allows users to practice questions to improve their mastery level
- **Expandable Categories**: Clicking on main topics (e.g., "Algebra Fundamentals") expands to show subcategories for more detailed analysis
- **Visual Progress Indicators**: Color-coded cells and progress bars indicate mastery levels and performance metrics

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
- `/src/components/` - Shared components used across the application
  - `/dashboard/` - Dashboard-specific components
  - `/question-bank/` - Question Bank components modeled after GEPTv2
  - `/review/` - Review system components
    - `/enhanced-matrix/` - Matrix grid components for the General View
      - `/components/` - UI components like MatrixCell, MatrixRow, etc.
- `/src/contexts/` - React context providers for state management
- `/src/hooks/` - Custom hooks for features like timers, tool windows, and data processing
- `/src/lib/` - Utility functions and constants
- `/src/styles/` - Global styles and Tailwind configurations

### Data Flow

1. Raw question data is processed through specialized hooks
2. Data is transformed and distributed using utility functions
3. UI components render the data with interactive elements
4. User interactions update state through context providers
5. Changes are reflected in real-time throughout the application

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
  "next": "15.2.3"
},
"devDependencies": {
  "typescript": "^5",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "@tailwindcss/postcss": "^4",
  "tailwindcss": "^4",
  "eslint": "^9",
  "eslint-config-next": "15.2.3",
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

- Restored Enhanced Question View functionality by updating the Question View display flag
- Updated to Next.js 15.2.3 with full App Router implementation
- Added critical App Router special files (error.tsx, loading.tsx, global-error.tsx)
- Created API route handler example using Next.js 15.2.3 route.ts convention
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
