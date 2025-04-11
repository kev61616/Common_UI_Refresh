# Course Data Architecture

This document describes the data models, relationships, and access patterns for the Course section of the Syntax education platform.

## 1. Core Data Models

### 1.1 Course

The top-level container for educational content, representing a complete learning experience.

```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  image: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
    bio?: string;
  };
  modules: Module[];
  estimatedDuration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  category: string;
  enrollmentStatus: 'open' | 'closed' | 'comingSoon';
  enrollmentCount?: number;
  rating?: {
    average: number;
    count: number;
  };
  prerequisites?: string[];
  learningOutcomes?: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  publishedAt?: string; // ISO date string
}
```

### 1.2 Module

A thematic section within a course containing related lessons.

```typescript
interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  estimatedDuration: number; // in minutes
  isPublished: boolean;
}
```

### 1.3 Lesson

An individual learning unit within a module.

```typescript
interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  type: 'video' | 'text' | 'quiz' | 'exercise';
  content: LessonContent;
  resources: Resource[];
  estimatedDuration: number; // in minutes
  order: number;
  isPublished: boolean;
  completionCriteria: {
    type: 'view' | 'quiz' | 'exercise';
    requiredScore?: number; // for quizzes, percentage
    requiredSteps?: string[]; // for exercises, steps to complete
  };
}

// Different content types based on lesson type
type LessonContent = 
  | VideoContent
  | TextContent
  | QuizContent
  | ExerciseContent;

interface VideoContent {
  videoUrl: string;
  transcript?: string;
  thumbnailUrl?: string;
  duration: number; // in seconds
}

interface TextContent {
  markdown: string;
  sections?: {
    id: string;
    title: string;
    anchor: string;
  }[];
}

interface QuizContent {
  questions: Question[];
  passingScore: number; // percentage
  timeLimit?: number; // in seconds
  randomizeQuestions?: boolean;
}

interface ExerciseContent {
  instructions: string;
  steps: {
    id: string;
    description: string;
    hint?: string;
  }[];
  codeTemplate?: string;
  solution?: string;
  validationCriteria?: string;
}
```

### 1.4 Resource

Supplementary learning materials associated with a lesson.

```typescript
interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'image' | 'code' | 'file';
  url: string;
  description?: string;
  iconType?: string;
}
```

### 1.5 Question

Quiz questions used in quiz-type lessons.

```typescript
interface Question {
  id: string;
  text: string;
  type: 'multipleChoice' | 'trueFalse' | 'shortAnswer';
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  correctAnswer?: string; // for shortAnswer
  explanation?: string;
  points: number;
}
```

### 1.6 UserProgress

Tracks a user's progress and performance within a course.

```typescript
interface UserProgress {
  userId: string;
  courseId: string;
  completedLessons: {
    lessonId: string;
    completedAt: string; // ISO date string
    score?: number; // for quizzes
    attempts?: number;
  }[];
  completedModules: {
    moduleId: string;
    completedAt: string; // ISO date string
  }[];
  currentLesson?: {
    lessonId: string;
    moduleId: string;
    progress?: number; // for video, percentage watched
  };
  quizResults: {
    lessonId: string;
    attempts: {
      date: string; // ISO date string
      score: number;
      answers: Record<string, string | string[]>; // questionId -> answer
    }[];
  }[];
  exerciseSubmissions: {
    lessonId: string;
    submissions: {
      date: string; // ISO date string
      status: 'submitted' | 'graded' | 'resubmit';
      feedback?: string;
      completedSteps: string[]; // step ids
    }[];
  }[];
  enrollmentStatus: 'active' | 'completed' | 'paused';
  enrollmentDate: string; // ISO date string
  lastAccessDate: string; // ISO date string
  completionDate?: string; // ISO date string
  certificateId?: string;
}
```

## 2. Entity Relationships

```
┌─────────┐       ┌──────────┐       ┌──────────┐
│         │       │          │       │          │
│  Course ├───────┤  Module  ├───────┤  Lesson  │
│         │       │          │       │          │
└─────────┘       └──────────┘       └──────────┘
     │                                     │
     │                                     │
     │                ┌──────────┐         │
     │                │          │         │
     └────────────────┤   User   │◄────────┘
                      │ Progress │
                      │          │
                      └──────────┘
                           ▲
                           │
                      ┌────┴─────┐
                      │          │
                      │   User   │
                      │          │
                      └──────────┘
```

### 2.1 One-to-Many Relationships

- Course → Modules: A course contains multiple modules
- Module → Lessons: A module contains multiple lessons
- Lesson → Resources: A lesson has multiple supplementary resources
- Quiz Lesson → Questions: A quiz contains multiple questions

### 2.2 Many-to-Many Relationships

- User ↔ Course: Users can enroll in multiple courses, and courses can have multiple enrolled users (represented through UserProgress)

## 3. Access Patterns

### 3.1 Course Discovery

- List all courses (filterable by category, tag, difficulty)
- Get featured/popular courses
- Search courses by keyword
- Get courses by instructor

### 3.2 Course Enrollment

- Enroll user in course (create UserProgress)
- Get user's enrolled courses
- Update enrollment status (active, completed, paused)

### 3.3 Course Content Access

- Get course details by ID
- Get modules for a course
- Get lessons for a module
- Get lesson content by ID
- Get specific lesson by sequential position

### 3.4 Progress Tracking

- Update lesson completion status
- Get user's progress for a specific course
- Track quiz attempt and score
- Submit and grade exercise
- Get recommended next lesson

### 3.5 Content Management (Instructor)

- Create/update course
- Add/update/reorder modules
- Add/update/reorder lessons
- Publish/unpublish course content
- View student progress and performance

## 4. Data Flow

### 4.1 Course Navigation Flow

```
1. User views course catalog
2. User selects a course
3. System displays course overview with modules
4. User selects a module or continues from last position
5. System displays lesson content
6. User consumes content and completes lesson
7. System updates progress and suggests next lesson
```

### 4.2 Progress Tracking Flow

```
1. User interacts with lesson content
2. Client tracks interaction (video playback position, quiz answers, etc.)
3. On completion criteria met, client sends completion request
4. Server validates completion request
5. Server updates UserProgress record
6. Client updates UI to reflect new progress status
```

## 5. Implementation Considerations

### 5.1 Local Storage

For improved user experience, maintain a local cache of:
- Current lesson progress (video position)
- Unsaved quiz/exercise responses
- Recently viewed lessons

### 5.2 Optimistic Updates

Implement optimistic UI updates for progress tracking, with background synchronization to the server to ensure a responsive experience.

### 5.3 Offline Support

Consider implementing a basic level of offline access for already-downloaded course content, synchronizing progress when the user reconnects.

### 5.4 Performance Considerations

- Lazy load modules and lessons to reduce initial payload
- Progressively load course content as the user navigates
- Implement pagination for courses with many modules or lessons
- Use appropriate caching strategies for course content

### 5.5 Security

- Enforce access control to ensure users can only access courses they've enrolled in
- Validate completion criteria server-side to prevent falsified progress
