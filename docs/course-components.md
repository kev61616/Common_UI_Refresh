# Course Components

This document describes the UI components for the Course section of the Syntax education platform, including their APIs, usage examples, and accessibility considerations.

## 1. Core Course Components

### 1.1 CourseCard

A card component for displaying course information in lists and grids.

#### Props

```typescript
interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    shortDescription?: string;
    image: string;
    instructor: {
      name: string;
      avatar?: string;
    };
    estimatedDuration: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    category?: string;
    enrollmentStatus: 'open' | 'closed' | 'comingSoon';
  };
  progress?: {
    percentage: number;
    lastAccessed?: string;
  };
  variant?: 'default' | 'compact' | 'featured';
  onClick?: () => void;
  className?: string;
}
```

#### Usage Example

```tsx
// Course catalog page
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {courses.map((course) => (
    <CourseCard
      key={course.id}
      course={course}
      progress={userProgress?.[course.id]}
      onClick={() => router.push(`/course/${course.id}`)}
    />
  ))}
</div>

// Featured course with alternate styling
<CourseCard
  course={featuredCourse}
  variant="featured"
  onClick={() => router.push(`/course/${featuredCourse.id}`)}
/>
```

#### Accessibility Considerations

- Use proper heading hierarchy (`h3` for course title)
- Ensure sufficient color contrast for difficulty badges and enrollment status
- Make the entire card clickable but with a proper semantic element (button or link)
- Provide appropriate alt text for course images
- Include proper ARIA attributes if using custom interactive elements

### 1.2 CourseHeader

A header component displaying course title, description, and metadata.

#### Props

```typescript
interface CourseHeaderProps {
  course: {
    title: string;
    description: string;
    image?: string;
    instructor: {
      name: string;
      avatar?: string;
      bio?: string;
    };
    estimatedDuration: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    enrollmentStatus: 'open' | 'closed' | 'comingSoon';
    rating?: {
      average: number;
      count: number;
    };
  };
  progress?: {
    percentage: number;
    completedLessons: number;
    totalLessons: number;
  };
  onEnroll?: () => void;
  className?: string;
}
```

#### Usage Example

```tsx
// Course detail page
<CourseHeader
  course={course}
  progress={userProgress}
  onEnroll={handleEnrollment}
/>
```

#### Accessibility Considerations

- Use semantic heading elements (h1 for course title)
- Ensure enrollment button has appropriate aria-label
- Provide alternative text for instructor avatar
- Use proper ARIA attributes for rating display

### 1.3 ModuleAccordion

An expandable/collapsible component displaying a module and its lessons.

#### Props

```typescript
interface ModuleAccordionProps {
  module: {
    id: string;
    title: string;
    description?: string;
    estimatedDuration: number;
    lessons: {
      id: string;
      title: string;
      type: 'video' | 'text' | 'quiz' | 'exercise';
      estimatedDuration: number;
      isCompleted?: boolean;
    }[];
  };
  currentLessonId?: string;
  onLessonSelect: (lessonId: string) => void;
  defaultExpanded?: boolean;
  isCompleted?: boolean;
  className?: string;
}
```

#### Usage Example

```tsx
// Course content page with module list
<div className="space-y-4">
  {modules.map((module) => (
    <ModuleAccordion
      key={module.id}
      module={module}
      currentLessonId={currentLesson?.id}
      onLessonSelect={handleLessonSelect}
      defaultExpanded={module.id === currentLesson?.moduleId}
      isCompleted={completedModules.includes(module.id)}
    />
  ))}
</div>
```

#### Accessibility Considerations

- Use `aria-expanded` to indicate expansion state
- Ensure keyboard navigability between modules and lessons
- Use appropriate heading level for module title
- Include proper focus management when expanding/collapsing
- Use `aria-current` to indicate the current lesson

### 1.4 LessonItem

A component representing an individual lesson within a module.

#### Props

```typescript
interface LessonItemProps {
  lesson: {
    id: string;
    title: string;
    type: 'video' | 'text' | 'quiz' | 'exercise';
    estimatedDuration: number;
  };
  isCompleted?: boolean;
  isCurrent?: boolean;
  isLocked?: boolean;
  onClick?: () => void;
  className?: string;
}
```

#### Usage Example

```tsx
// Inside ModuleAccordion component
<ul className="mt-2 space-y-1">
  {module.lessons.map((lesson) => (
    <li key={lesson.id}>
      <LessonItem
        lesson={lesson}
        isCompleted={completedLessons.includes(lesson.id)}
        isCurrent={lesson.id === currentLessonId}
        isLocked={!isModuleUnlocked && !completedLessons.includes(lesson.id)}
        onClick={() => onLessonSelect(lesson.id)}
      />
    </li>
  ))}
</ul>
```

#### Accessibility Considerations

- Use appropriate ARIA attributes for lesson state (completed, current, locked)
- Ensure interactive elements are keyboard accessible
- Use appropriate icons with text labels for lesson types
- Provide feedback for locked lessons with explanations

### 1.5 CourseProgress

A component displaying a user's progress through a course.

#### Props

```typescript
interface CourseProgressProps {
  progress: {
    percentage: number;
    completedLessons: number;
    totalLessons: number;
    completedModules: number;
    totalModules: number;
  };
  compact?: boolean;
  showDetails?: boolean;
  className?: string;
}
```

#### Usage Example

```tsx
// Compact version for course card
<CourseProgress
  progress={courseProgress}
  compact={true}
/>

// Detailed version for course overview
<CourseProgress
  progress={courseProgress}
  showDetails={true}
/>
```

#### Accessibility Considerations

- Use `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` for progress bars
- Include text representation of percentage completion
- Ensure sufficient color contrast for progress indicators
- Consider using patterns in addition to colors to indicate progress

### 1.6 CourseNavigation

A component for navigating between lessons within a course.

#### Props

```typescript
interface CourseNavigationProps {
  previousLesson?: {
    id: string;
    title: string;
    moduleTitle?: string;
  };
  nextLesson?: {
    id: string;
    title: string;
    moduleTitle?: string;
  };
  onPreviousClick?: () => void;
  onNextClick?: () => void;
  onModuleListClick?: () => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
  className?: string;
}
```

#### Usage Example

```tsx
// Lesson page footer
<CourseNavigation
  previousLesson={previousLesson}
  nextLesson={nextLesson}
  onPreviousClick={() => router.push(`/course/${courseId}/lesson/${previousLesson.id}`)}
  onNextClick={() => router.push(`/course/${courseId}/lesson/${nextLesson.id}`)}
  onModuleListClick={() => router.push(`/course/${courseId}`)}
/>
```

#### Accessibility Considerations

- Use proper button elements with descriptive text
- Include keyboard shortcuts for navigation if applicable
- Ensure sufficient touch target size for mobile users
- Provide proper focus styles for navigation controls

### 1.7 ResourceList

A component displaying supplementary resources for a lesson.

#### Props

```typescript
interface ResourceListProps {
  resources: {
    id: string;
    title: string;
    type: 'pdf' | 'link' | 'image' | 'code' | 'file';
    url: string;
    description?: string;
    iconType?: string;
  }[];
  className?: string;
}
```

#### Usage Example

```tsx
// Lesson page sidebar
<div className="mt-6">
  <h3 className="text-lg font-medium mb-2">Additional Resources</h3>
  <ResourceList resources={lesson.resources} />
</div>
```

#### Accessibility Considerations

- Use appropriate icons with text labels for resource types
- Indicate external links with visual and screen reader cues
- Ensure download links have file type and size information
- Make resource items keyboard accessible

## 2. Content Renderer Components

### 2.1 VideoLesson

A component for rendering video lessons with playback controls.

#### Props

```typescript
interface VideoLessonProps {
  content: {
    videoUrl: string;
    transcript?: string;
    thumbnailUrl?: string;
    duration: number;
  };
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  startPosition?: number; // in seconds
  autoPlay?: boolean;
  showTranscript?: boolean;
  className?: string;
}
```

#### Usage Example

```tsx
// Lesson content area
<VideoLesson
  content={lesson.content as VideoContent}
  onProgress={handleProgressUpdate}
  onComplete={handleLessonCompletion}
  startPosition={savedPosition || 0}
  showTranscript={transcriptVisible}
/>
```

#### Accessibility Considerations

- Ensure video player controls are keyboard accessible
- Provide captions/subtitles option
- Include transcript for screen reader users
- Use proper ARIA labels for custom video controls
- Support playback rate adjustment

### 2.2 TextLesson

A component for rendering text-based lesson content.

#### Props

```typescript
interface TextLessonProps {
  content: {
    markdown: string;
    sections?: {
      id: string;
      title: string;
      anchor: string;
    }[];
  };
  onComplete?: () => void;
  showSections?: boolean;
  className?: string;
}
```

#### Usage Example

```tsx
// Lesson content area
<TextLesson
  content={lesson.content as TextContent}
  onComplete={handleLessonCompletion}
  showSections={true}
/>
```

#### Accessibility Considerations

- Ensure proper heading hierarchy in rendered markdown
- Provide table of contents for long-form content
- Maintain proper color contrast for text and background
- Make code blocks accessible with proper syntax highlighting
- Support keyboard navigation between sections

### 2.3 QuizLesson

A component for rendering interactive quizzes.

#### Props

```typescript
interface QuizLessonProps {
  content: {
    questions: {
      id: string;
      text: string;
      type: 'multipleChoice' | 'trueFalse' | 'shortAnswer';
      options?: {
        id: string;
        text: string;
      }[];
    }[];
    passingScore: number;
    timeLimit?: number;
  };
  onSubmit: (answers: Record<string, string | string[]>, score: number) => void;
  onComplete?: () => void;
  previousAttempt?: {
    answers: Record<string, string | string[]>;
    score: number;
  };
  className?: string;
}
```

#### Usage Example

```tsx
// Lesson content area
<QuizLesson
  content={lesson.content as QuizContent}
  onSubmit={handleQuizSubmission}
  onComplete={handleLessonCompletion}
  previousAttempt={lastQuizAttempt}
/>
```

#### Accessibility Considerations

- Ensure form controls are properly labeled
- Group related form elements using fieldset and legend
- Provide clear error messages for invalid inputs
- Support keyboard navigation between questions
- Ensure timer notifications are accessible
- Provide alternative text for any images in questions

### 2.4 ExerciseLesson

A component for rendering practical exercises.

#### Props

```typescript
interface ExerciseLessonProps {
  content: {
    instructions: string;
    steps: {
      id: string;
      description: string;
      hint?: string;
    }[];
    codeTemplate?: string;
    solution?: string;
    validationCriteria?: string;
  };
  onStepComplete: (stepId: string) => void;
  onSubmit: (submission: string) => void;
  onComplete?: () => void;
  completedSteps?: string[];
  className?: string;
}
```

#### Usage Example

```tsx
// Lesson content area
<ExerciseLesson
  content={lesson.content as ExerciseContent}
  onStepComplete={handleStepCompletion}
  onSubmit={handleExerciseSubmission}
  onComplete={handleLessonCompletion}
  completedSteps={userCompletedSteps}
/>
```

#### Accessibility Considerations

- Provide clear step-by-step instructions
- Make hint toggles keyboard accessible
- Ensure code editor is accessible with proper ARIA labels
- Provide keyboard shortcuts for common editor functions
- Include visual and screen reader feedback for completed steps

## 3. Usage Guidelines

### 3.1 Component Composition

Components should be composed in a consistent hierarchy:

```
CourseHeader
└── CourseProgress

ModuleAccordion
└── LessonItem

LessonContent
├── VideoLesson / TextLesson / QuizLesson / ExerciseLesson
└── ResourceList

CourseNavigation
```

### 3.2 State Management

- Course enrollment status should be managed at the page level and passed down to components
- Lesson completion state should be tracked and persisted to the server
- User progress should be updated optimistically for a responsive user experience
- Course navigation state should be reflected in the URL for shareable links

### 3.3 Responsive Behavior

- Course catalog should adapt from 3 columns (desktop) to 2 columns (tablet) to 1 column (mobile)
- Video player should resize proportionally and prioritize visibility on small screens
- Navigation controls should remain accessible on all screen sizes
- Module list should collapse to an offscreen drawer on small screens

### 3.4 Theme Integration

- Use Tailwind classes consistently according to the design system
- Follow established color patterns for:
  - Difficulty levels (beginner: green, intermediate: yellow, advanced: red)
  - Completion status (incomplete: gray, in-progress: blue, complete: green)
  - Content types (video: purple, text: blue, quiz: orange, exercise: green)
- Use consistent spacing scale (defined in Tailwind config)

## 4. Implementation Examples

### 4.1 Course Catalog Page

```tsx
// src/app/course/page.tsx
export default function CourseCatalogPage() {
  const courses = await fetchCourses();
  const userEnrollments = await fetchUserEnrollments();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      
      {/* Featured courses section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses
            .filter(course => course.featured)
            .map(course => (
              <CourseCard
                key={course.id}
                course={course}
                progress={userEnrollments[course.id]?.progress}
                variant="featured"
              />
            ))
          }
        </div>
      </section>
      
      {/* All courses grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">All Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              progress={userEnrollments[course.id]?.progress}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
```

### 4.2 Course Overview Page

```tsx
// src/app/course/[courseId]/page.tsx
export default function CourseOverviewPage({ params }) {
  const { courseId } = params;
  const course = await fetchCourse(courseId);
  const userProgress = await fetchUserProgress(courseId);
  
  return (
    <div className="container mx-auto py-8">
      <CourseHeader
        course={course}
        progress={userProgress?.overview}
        onEnroll={/* server action */}
      />
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
          <div className="space-y-4">
            {course.modules.map(module => (
              <ModuleAccordion
                key={module.id}
                module={module}
                currentLessonId={userProgress?.currentLesson?.id}
                onLessonSelect={/* client action */}
                isCompleted={userProgress?.completedModules.includes(module.id)}
              />
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
            <h3 className="text-xl font-semibold mb-4">Your Progress</h3>
            <CourseProgress 
              progress={userProgress?.overview}
              showDetails={true}
            />
            
            {userProgress?.currentLesson && (
              <div className="mt-6">
                <h4 className="text-md font-medium mb-2">Continue Learning</h4>
                <LessonItem
                  lesson={userProgress.currentLesson}
                  isCurrent={true}
                  onClick={/* client action */}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
