# Syntax: Next.js Education Platform

This project is a Next.js-based education platform with advanced features for student progress tracking and analytics.

## Documentation

This project aims to maintain comprehensive documentation to aid development and understanding. Key documentation resources include:

*   **[`CONTRIBUTING.md`](CONTRIBUTING.md)**: Guidelines for contributing to the project.
*   **`/docs` Directory**: Contains detailed guides on specific topics.
    *   [`docs/architecture.md`](docs/architecture.md): (WIP) Overview of application architecture, patterns, and best practices.
    *   [`docs/profile-section.md`](docs/profile-section.md): (WIP) Documentation for the user Profile section features.
    *   [`docs/markdoc-usage.md`](docs/markdoc-usage.md): (WIP) Guide on how Markdoc is used for documentation pages.
    *   [`docs/typography.md`](docs/typography.md): Guidelines and examples for the typography system (Updated).
    *   [`docs/colors.md`](docs/colors.md): Guide to the color system, palettes, and CSS variable usage.
    *   [`docs/use-search-params-guide.md`](docs/use-search-params-guide.md): Best practices for using the `useSearchParams` hook.
    *   [`docs/view-planning.md`](docs/view-planning.md): High-level planning and design philosophy for UI views.
    *   [`docs/HYDRATION_ERRORS.md`](docs/HYDRATION_ERRORS.md): Guide to understanding and fixing hydration errors (may need updates for latest patterns).
    *   [`docs/page-structure.md`](docs/page-structure.md): Overview of the application's page structure.
*   **This README**: Provides a high-level overview and a detailed changelog of recent updates.

**Areas for Further Development:**

*   Completing the WIP documentation files (`architecture.md`, `profile-section.md`, `markdoc-usage.md`).
*   Reviewing and updating existing guides (e.g., `HYDRATION_ERRORS.md`).
*   Adding documentation for core **Reusable Components**.

## Recent Updates

- **April 2, 2025**:
  - **New Profile Section**:
    - Added a comprehensive "Profile" section to the main navigation
    - Implemented "Your Brain at a Glance" main profile page with:
      - Predicted SAT score visualization with overall and per-subject breakdowns
      - Tag mastery map with color-coded mastery levels and trend indicators
      - Game-style rank tiers system (Bronze → Diamond) with progress tracking
      - Recent achievements section with visual badges and descriptions
      - Interactive brain evolution visualization that reflects learning progress
      - Questions answered statistics with subject-based mastery breakdown
    - Created placeholder pages for Achievements, Mastery Map, and Timeline sections
    - Added SVG brain visualization with colored lobes representing different learning areas
  
  - **Dashboard Hydration Error Fixes**:
    - Fixed hydration mismatches in the Dashboard component using client-side only style application
    - Resolved type inconsistencies between server and client for numeric styling properties
    - Implemented isClient state pattern to safely apply dynamic styles after hydration
    - Modified DashboardCard component to prevent hydration errors with card styles
    - Added suppressHydrationWarning to key components for stable rendering
    - Updated documentation with new hydration error prevention approaches

- **April 1, 2025**: 
  - **Hydration Error Fixes**:
    - Fixed hydration mismatch in `EnhancedCollapsibleBoardView` with deterministic rendering
    - Modularized large components (400+ lines) into smaller, focused components
    - Created utility functions and hooks for better code organization
    - Removed all non-deterministic rendering from data generation
    - Added detailed documentation in `docs/HYDRATION_ERRORS.md`
  - **Component Architecture Improvements**:
    - Implemented custom hooks pattern for complex state management
    - Separated concerns with dedicated files for constants, utilities, and UI components
    - Enhanced maintainability with smaller, single-responsibility components
    - Improved type safety throughout the component hierarchy

- **Previous Updates**:
  - Fixed all instances of useSearchParams() hook by properly wrapping in Suspense boundaries
    - Applied fixes to review pages, demo pages, and question bank sections
    - Created consistent loading patterns with visually matching spinner components
    - Implemented component splitting pattern to separate client-only logic from parent components
  - **Interface & Typography Improvements**:
    - Created beautiful typography documentation with rich visual examples
    - Replaced Question View with Board View's visual mastery progression matrix
    - Streamlined navigation by consolidating views for better user experience
    - Improved Set View by removing mistake counts and using specific time formats
    - Increased font sizes throughout the application for better readability
    - Enhanced text color contrast in both light and dark modes
    - Doubled letter spacing from 0.02em to 0.04em for improved readability
    - Significantly darkened muted text in light mode (from 35% to 20% lightness)
    - Significantly brightened muted text in dark mode (from 80% to 90% lightness)
    - Updated Typography component to use consistent text sizing system
    - Improved mobile text rendering with responsive font sizing
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
