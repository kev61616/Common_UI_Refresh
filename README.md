# Syntax: Next.js Education Platform

This project is a Next.js-based education platform with advanced features for student progress tracking and analytics.

## Documentation

This project aims to maintain comprehensive documentation to aid development and understanding. Our documentation has been reorganized for better accessibility and consistency.

### Documentation Index

The [**Documentation Index**](docs/documentation-index.md) serves as the central reference point for all documentation, organized by category.

### Key Documentation Resources

*   **[`CONTRIBUTING.md`](CONTRIBUTING.md)**: Guidelines for contributing to the project.
*   **Documentation Categories**:
    *   **Architecture & Design**: System architecture, page structure, design systems
    *   **Feature Documentation**: Component APIs and implementation details by feature
    *   **Development Guides**: Best practices and solutions to common issues
    *   **Migration Guides**: Support for codebase transitions and upgrades
    *   **Planning Documents**: Strategic plans for future development

### Documentation Highlights

*   [**Template Migration Guide**](docs/template-migration-guide.md): Comprehensive guide for migrating site structure to a new template
*   [**Documentation Template**](docs/documentation-template.md): Standardized format for all documentation files
*   [**Course Data Architecture**](docs/course-data-architecture.md): Data models and relationships for the Course section
*   [**Course Components**](docs/course-components.md): UI components for the Course section with API documentation
*   [**Typography & Colors**](docs/typography.md): Design system guidelines and implementation

**Areas for Further Development:**

*   Completing the WIP documentation files (`architecture.md`, `profile-section.md`, `markdoc-usage.md`)
*   Migrating existing documentation to the new standardized format
*   Enriching component documentation with more visual examples
*   Developing comprehensive API documentation for core components
*   Creating visual component relationship diagrams for each feature section

*   **`/planning` Directory**: Contains planning documents for upcoming features and improvements.
    *   [`planning/frontend-architecture-plan.md`](planning/frontend-architecture-plan.md): Plan for improving code quality and architecture.
    *   [`planning/performance-optimization-plan.md`](planning/performance-optimization-plan.md): Plan for optimizing performance and load times.
    *   [`planning/ui-ux-design-system-plan.md`](planning/ui-ux-design-system-plan.md): Plan for enhancing the design system and UI/UX.
    *   [`planning/course-section-plan.md`](planning/course-section-plan.md): Implementation plan for the Course section.

## Recent Updates

- **April 9, 2025**:
  - **Documentation Restructuring**:
    - Created centralized Documentation Index with clear categorization of all resources
    - Developed comprehensive Template Migration Guide with component dependencies and step-by-step process
    - Established standardized documentation template for consistent documentation format
    - Added detailed migration considerations for component relationships and state management
    - Improved documentation organization with logical hierarchy and cross-references
    - Enhanced documentation with visual diagrams for clearer structure representation
    - Created component migration reference with priority guidelines

- **April 5, 2025**:
  - **Course Section Planning**:
    - Created comprehensive planning documents for the Course section implementation
    - Designed detailed data architecture with TypeScript interfaces for Course, Module, Lesson, and UserProgress
    - Developed component specifications for course-specific UI elements with accessibility considerations
    - Planned routing structure and page hierarchy for intuitive course navigation
    - Outlined implementation approach for different content types (video, text, quiz, exercise)
    - Documented entity relationships and access patterns for efficient data management
    - Prioritized implementation tasks with clear dependencies and measurable goals

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
