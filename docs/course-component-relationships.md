# Course Component Relationships

**Version:** 1.0
**Last Updated:** 2025-04-09
**Status:** Complete

## Overview

This document provides a visual representation of how Course section components relate to each other, including their dependencies, props flow, and state interactions. This serves as an example of component relationship documentation that should be created for each major feature area to facilitate template migration.

## Component Hierarchy Diagram

The following diagram illustrates the hierarchical relationships between Course components:

```mermaid
graph TD
    A[CourseLayout] --> B[CourseHeader]
    A --> C[CourseSidebar]
    A --> D[CourseMainContent]
    
    B --> E[CourseProgress]
    B --> F[EnrollmentButton]
    
    C --> G[ModuleAccordion]
    G --> H[LessonItem]
    G --> I[ModuleProgress]
    
    D --> J[LessonContent]
    J --> K[VideoLesson]
    J --> L[TextLesson]
    J --> M[QuizLesson]
    J --> N[ExerciseLesson]
    
    D --> O[ResourceList]
    D --> P[CourseNavigation]
    
    classDef container fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    classDef presentational fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
    classDef interactive fill:#fff8e1,stroke:#ff8f00,stroke-width:2px;
    
    class A,D container;
    class B,C,E,G,I,J,O presentational;
    class F,H,K,L,M,N,P interactive;
```

## Data Flow Diagram

This diagram shows how data flows between components and state management:

```mermaid
graph TD
    A[URL/Router State] -->|courseId, lessonId| B[CourseLayout]
    C[User Progress API] --> B
    D[Course Data API] --> B
    
    B -->|course data| E[CourseHeader]
    B -->|module data| F[CourseSidebar]
    B -->|lesson data| G[CourseMainContent]
    
    H[LocalStorage] <-->|video position| I[VideoLesson]
    
    J[Quiz Submission] --> K[Server Action]
    K -->|updated progress| C
    
    E -->|enrollment action| L[Enrollment API]
    L -->|enrollment status| C
    
    classDef state fill:#bbdefb,stroke:#1976d2,stroke-width:2px;
    classDef component fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
    classDef api fill:#ffecb3,stroke:#ff8f00,stroke-width:2px;
    
    class A,H,J state;
    class B,E,F,G,I component;
    class C,D,K,L api;
```

## State Management

The Course section employs several types of state management:

### URL State (via useSearchParams)

```mermaid
graph LR
    A[URL Parameters] -->|courseId, lessonId| B[Page Components]
    B -->|user navigation| C[Router]
    C --> A
    
    style A fill:#bbdefb,stroke:#1976d2,stroke-width:2px
    style B fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style C fill:#ffecb3,stroke:#ff8f00,stroke-width:2px
```

Key URL parameters:
- `courseId`: Identifies the current course
- `moduleId`: Identifies the current module (optional)
- `lessonId`: Identifies the current lesson
- `view`: Controls the display mode (e.g., "overview", "content")

### Context-based State

```mermaid
graph TD
    A[CourseContext Provider] -->|course data, progress| B[CourseHeader]
    A -->|course data, progress| C[CourseSidebar]
    A -->|course data, progress| D[CourseMainContent]
    
    D -->|lesson completion| E[Course Context Actions]
    E --> A
    
    style A fill:#bbdefb,stroke:#1976d2,stroke-width:2px
    style B,C,D fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style E fill:#ffecb3,stroke:#ff8f00,stroke-width:2px
```

The CourseContext provides:
- Course metadata
- Module and lesson data
- User progress information
- Actions for updating progress

### Local Component State

```mermaid
graph TD
    A[ModuleAccordion] -->|expanded state| B[useState]
    B --> A
    
    C[VideoLesson] -->|playback position| D[useState]
    D --> C
    
    E[QuizLesson] -->|user answers| F[useReducer]
    F --> E
    
    style A,C,E fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style B,D,F fill:#bbdefb,stroke:#1976d2,stroke-width:2px
```

## Props Interface Relationships

The following diagram shows how props are passed between key components:

```mermaid
graph TD
    A[CourseCard] -->|course, progress, onClick| B[Course Detail Page]
    
    C[CourseHeader] -->|course, progress, onEnroll| D[Enrollment Flow]
    
    E[ModuleAccordion] -->|module, currentLessonId, onLessonSelect| F[LessonItem]
    F -->|lesson, isCompleted, isCurrent, onClick| G[Lesson Navigation]
    
    H[LessonContent] -->|content, onComplete| I[Content Type Components]
    I -->|specialized props| J[Content Rendering]
    
    K[CourseNavigation] -->|previousLesson, nextLesson, onClick handlers| L[Navigation Actions]
    
    style A,C,E,F,H,I,K fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style B,D,G,J,L fill:#bbdefb,stroke:#1976d2,stroke-width:2px
```

## Template Dependencies

Components with high template dependencies that require special migration attention:

1. **CourseLayout**:
   - Depends on page layout and grid system
   - Controls responsive behavior between sidebar and main content

2. **CourseHeader**:
   - Uses template typography system
   - Follows template image aspect ratios and responsive sizing

3. **ModuleAccordion**:
   - Uses template animation and transition styles
   - Relies on template spacing and expandable component patterns

4. **LessonItem**:
   - Uses template icon system
   - Follows template interactive element patterns

## Migration Considerations

When migrating the Course section to a new template:

1. **Start with Container Components:**
   - Begin with CourseLayout as it defines the overall structure
   - Adapt its responsive breakpoints to match the new template

2. **Preserve State Management:**
   - Maintain the existing state flow between components
   - Ensure URL parameters continue to control navigation state

3. **Isolate UI Changes:**
   - Create adapter components to bridge styling differences
   - Update component internals while preserving their APIs

4. **Test Progressive Migration:**
   - Consider a hybrid approach where components are migrated individually
   - Test each migrated component with both old and new components

## Related Documentation

- [Course Data Architecture](course-data-architecture.md)
- [Course Components](course-components.md)
- [Template Migration Guide](template-migration-guide.md)
