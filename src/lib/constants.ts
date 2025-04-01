/**
 * API endpoints used throughout the application
 */
export const API_ENDPOINTS = {
  QUESTIONS: '/api/questions',
  SUBJECTS: '/api/subjects',
  PROGRESS: '/api/progress',
  USER_DATA: '/api/user',
};

/**
 * Route paths for navigation
 */
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  TEST: '/test',
  QUESTION_BANK: '/test/question-bank',
  PRACTICE_TESTS: '/test/practice',
  REVIEW: '/review',
  COURSE: '/course',
  OVERVIEW: '/overview',
};

/**
 * Constants for external tools and integrations
 */
export const CALCULATOR_URL = 'https://www.desmos.com/scientific';
export const FORMULA_SHEET_URL = '/images/math_formula_sheet.png';

/**
 * Timeouts and intervals
 */
export const TIMEOUT = {
  ALERT: 3000, // 3 seconds
  TRANSITION: 300, // 300ms
  AUTO_SAVE: 5000, // 5 seconds
};

/**
 * Feature flags and configuration
 */
export const FEATURES = {
  WORD_DEFINITION_ENABLED: true,
  VOICE_SUPPORT_ENABLED: false,
  DARK_MODE_ENABLED: true,
};

/**
 * Default values for settings and behaviors
 */
export const DEFAULTS = {
  PAGE_SIZE: 10,
  MAX_ATTEMPTS: 3,
  ANIMATION_DURATION: 300,
};
