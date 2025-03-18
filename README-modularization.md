# Review-Alt Modularization Strategy

## Current Challenges

- Files are becoming too large to maintain effectively
- Plans to scale to 100+ views on each of the 3 tabs (By Set, Timeline, By Question)
- Duplicate code and inconsistent import patterns
- Difficulty managing state and props across multiple view variants

## New Modular Architecture

### 1. Directory Structure

```
src/components/review/
├── registry/
│   └── viewRegistry.ts       # Central registry of all available views
│
├── loaders/
│   ├── getQuestionViewComponent.ts  # Dynamic loader for question views
│   ├── getSetViewComponent.ts       # Dynamic loader for set views
│   └── getTimelineViewComponent.ts  # Dynamic loader for timeline views
│
├── managers/
│   ├── QuestionViewManager.tsx      # Manages state/rendering for question views
│   ├── SetViewManager.tsx           # Manages state/rendering for set views
│   └── TimelineViewManager.tsx      # Manages state/rendering for timeline views
│
├── question-view-variants/
│   ├── variant-1/                   # Each variant in its own directory
│   │   ├── index.ts                 # Exports component and metadata
│   │   ├── Component.tsx            # The actual view component
│   │   ├── types.ts                 # Type definitions specific to this variant
│   │   └── hooks.ts                 # Custom hooks specific to this variant
│   ├── variant-2/
│   │   └── ...
│   └── registerAllQuestionViews.ts  # Registers all question views with the registry
│
├── set-view-variants/
│   ├── variant-1/
│   │   └── ...
│   └── registerAllSetViews.ts       # Registers all set views with the registry
│
├── timeline-view-variants/
│   ├── variant-1/
│   │   └── ...
│   └── registerAllTimelineViews.ts  # Registers all timeline views with the registry
│
├── shared/                          # Shared utilities and components
│   ├── hooks/                       # Common hooks
│   ├── components/                  # Common UI components
│   ├── utils/                       # Utility functions
│   └── constants/                   # Shared constants
│
└── types/                           # Shared type definitions
    ├── question-view-types.ts       
    ├── set-view-types.ts
    └── timeline-view-types.ts
```

### 2. Core Concepts

#### Registry Pattern
- Use a centralized registry to register and track all available views
- Each view registers itself with metadata like name, description, and tags
- Enable dynamic loading of views based on user preferences or settings

```typescript
// Example registry entry
{
  id: 'treemap-view',
  name: 'TreeMap View',
  component: () => import('../question-view-variants/TreeMapView').then(mod => mod.TreeMapView),
  tags: ['data-visualization', 'hierarchical'],
  category: 'question-view'
}
```

#### Manager Components
- Each tab (Question, Set, Timeline) has a manager component
- Managers handle:
  - Loading the appropriate view component
  - Managing shared state
  - Handling transitions between views
  - Providing context for view components

#### Variant Folders
- Each view is contained in its own folder
- Consistent structure across all variants
- Self-contained units that export a clear public API

#### Lazy Loading
- Load view components on demand to improve performance
- Implement code splitting to reduce initial bundle size

### 3. Type System

- Create a strong base interface for each view type
- Allow variants to extend the base interface as needed
- Share common types across the application
- Use TypeScript's discriminated unions for view-specific props

```typescript
// Base interface
export interface QuestionViewProps {
  practiceSets: PracticeSet[];
  onSelectSet?: (setId: string) => void;
  selectedSetId?: string;
}

// Variant-specific extension
export interface TreeMapViewProps extends QuestionViewProps {
  initialMode?: 'topic' | 'subject';
}
```

### 4. State Management

- Use React Context for shared state that spans multiple views
- Keep view-specific state within each view component
- Implement custom hooks for common state patterns
- Consider using a state management library for complex state interactions

### 5. Data Flow

- Create a consistent data flow pattern for all views
- Use props for passing data down
- Use callbacks for sending data up
- Implement event emitters for cross-component communication if needed

### 6. Migration Plan

1. Create the new folder structure
2. Move existing views one by one to the new structure
3. Implement the registry pattern
4. Create manager components
5. Update the parent components to use the managers

### 7. Development Workflow

- Create a script for generating new view variants with the correct structure
- Implement a simple process for registering new views
- Provide clear documentation for creating new views

### 8. Utilities and Helpers

- Create shared utility functions for common operations
- Implement helpers for data processing, visualization calculations
- Build reusable components for UI elements used across multiple views

## Implementation Guidelines

### For New Views

1. Use the generator script: `node scripts/generate-variant.js <view-type> <variant-name>`
2. Implement the component in the generated folder
3. Register the view in the appropriate registration file

### For Existing Views

1. Move the view to its own folder under the appropriate variant directory
2. Split the file into smaller components if needed
3. Export a clear public API
4. Register the view in the registry

## Automation Scripts

Existing scripts:
- `scripts/generate-variant.js` - Generate a new variant with the correct folder structure
- `scripts/register-existing-components.js` - Register existing components with the registry
- `scripts/fix-import-paths.js` - Fix import paths after moving files

## Benefits

- **Maintainability**: Smaller, focused files that are easier to understand
- **Scalability**: Structure supports hundreds of view variants
- **Performance**: Lazy loading improves application performance
- **Developer Experience**: Clear patterns and workflows
- **Flexibility**: Easy to add, remove, or modify views
- **Testing**: Isolated components are easier to test
