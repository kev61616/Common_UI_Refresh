import { Course } from '@/types/course';
import satCourses, { mathCourse, readingWritingCourse } from './sat';
import mockInstructors from './instructors';

// User progress data for different courses
export const mockUserProgress = {
  webDevFundamentals: {
    percentage: 68,
    completedLessons: 22,
    totalLessons: 34,
    completedModules: 2,
    totalModules: 5,
    estimatedTimeLeft: 795, // in minutes (about 13 hours)
    lastAccessed: new Date(Date.now() - 86400000 * 2), // 2 days ago
    currentLesson: {
      lessonId: 'lesson-4-3',
      moduleId: 'module-4',
    },
  },
  reactMasterclass: {
    percentage: 12,
    completedLessons: 5,
    totalLessons: 42,
    completedModules: 0,
    totalModules: 6,
    estimatedTimeLeft: 2640, // in minutes (about 44 hours)
    lastAccessed: new Date(Date.now() - 86400000 * 5), // 5 days ago
    currentLesson: {
      lessonId: 'lesson-1-6',
      moduleId: 'module-1',
    },
  },
  // Digital SAT progress
  digitalSatMath: {
    percentage: 35,
    completedLessons: 12,
    totalLessons: 34,
    completedModules: 1,
    totalModules: 6,
    estimatedTimeLeft: 900, // in minutes (about 15 hours)
    lastAccessed: new Date(Date.now() - 86400000 * 1), // 1 day ago
    currentLesson: {
      lessonId: 'lesson-math-systems',
      moduleId: 'module-algebra',
    },
  },
  digitalSatReadingWriting: {
    percentage: 22,
    completedLessons: 8,
    totalLessons: 44,
    completedModules: 1,
    totalModules: 7,
    estimatedTimeLeft: 1260, // in minutes (about 21 hours)
    lastAccessed: new Date(Date.now() - 86400000 * 3), // 3 days ago
    currentLesson: {
      lessonId: 'lesson-rw-supporting-details',
      moduleId: 'module-reading-comp',
    },
  },
};

// For backward compatibility, expose the SAT Math course as webDevFundamentalsCourse
export const webDevFundamentalsCourse: Course = {
  ...mathCourse,
  id: 'course-1', // Keep original ID for compatibility
  slug: 'web-development-fundamentals', // Keep original slug for compatibility
};

// Export individual courses
export {
  mathCourse,
  readingWritingCourse
};

// Export all courses as default
export const mockCourses: Course[] = satCourses;
export default mockCourses;
