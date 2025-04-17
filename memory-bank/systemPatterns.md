# Digital SAT Course Platform - System Patterns

## Data Architecture

### Modular Course Structure

The Digital SAT Course Platform implements a modular, hierarchical data structure that follows these key patterns:

1. **Course → Module → Lesson Hierarchy**
   - Courses (Math, Reading & Writing) contain multiple modules
   - Modules group related content by topic area
   - Lessons provide specific instruction on individual concepts

2. **Common Interfaces with Type Safety**
   - Shared interfaces ensure consistency across course components
   - TypeScript types enforce data structure integrity
   - Generic patterns allow for extension without duplication

```typescript
// Core hierarchical structure
Course
  ├── modules[]
  │     ├── lessons[]
  │     │     ├── content (varies by type)
  │     │     └── resources[]
  │     └── metadata (duration, order, etc.)
  └── metadata (instructor, difficulty, etc.)
```

### Centralized Mock Data Management

1. **Data Organization**
   - Module-based file structure separates concerns
   - Related data (instructors, resources, helpers) in dedicated files
   - Index exports provide clean public API

2. **Helper Functions**
   - Factory functions create consistent lesson structures
   - Utility functions calculate derived properties
   - Type guards ensure data integrity

## Component Architecture

### Course Components

1. **Component Segregation Pattern**
   - Each component has a single responsibility
   - Components compose together for complex UI elements
   - Shared index exports for clean imports

2. **Component Hierarchy**
   ```
   CourseHeader
     ├── CourseInfo
     │     ├── CourseMetadata
     │     └── InstructorBadge
     └── CourseProgress (conditional)
   
   ModuleAccordion
     └── LessonItem[]
   
   CourseNavigation
     ├── PreviousLessonButton
     ├── NextLessonButton
     └── CompletionButton (conditional)
   ```

### Lesson Rendering Pattern

1. **Content Type Polymorphism**
   - Lesson content rendered based on `type` property
   - Factory pattern for lesson content creation
   - Switch-based rendering for different lesson types

2. **Resource Management**
   - Resources associated with specific lessons
   - Shared resource pool for common materials
   - Conditional rendering based on resource type

## State Management

1. **Progress Tracking**
   - User progress data stored per course
   - Completion status for lessons and modules
   - Last accessed timestamp for recency

2. **Navigation State**
   - Previous/next lesson relationships derived from course structure
   - Current location maintained in URL parameters
   - Module expansion state for UI

## UI Patterns

1. **Responsive Layout Strategy**
   - Grid-based layout adapts to screen size
   - Column structure changes at breakpoints
   - Mobile-first design with progressive enhancement

2. **Progress Visualization**
   - Consistent visual indicators for completion status
   - Percentage-based progress bars
   - Clear navigation pathways

3. **Interactive Elements**
   - Consistent button and interaction patterns
   - Clear affordances for interactive components
   - Accessibility considerations throughout

## Code Organization

1. **Directory Structure**
   ```
   src/
   ├── lib/
   │    └── mockData/
   │         ├── sat/
   │         │    ├── mathCourse.ts
   │         │    ├── readingWritingCourse.ts
   │         │    └── index.ts
   │         ├── instructors.ts
   │         ├── resources.ts
   │         ├── helpers.ts
   │         └── courses.ts
   │
   ├── components/
   │    └── course/
   │         ├── CourseHeader.tsx
   │         ├── ModuleAccordion.tsx
   │         └── ... (other components)
   │
   └── app/
        └── course/
             ├── page.tsx
             └── [slug]/
                  ├── page.tsx
                  └── lesson/
                       └── [lessonId]/
                            └── page.tsx
   ```

2. **Import/Export Patterns**
   - Barrel exports from directories
   - Named exports for clear dependencies
   - Type exports separated from implementation
