import { Course, Module } from '@/types/course';
import mockInstructors from '../instructors';
import mockResources from '../resources';
import { createMockLesson, calculateModuleDuration } from '../helpers';

// Math section modules and lessons
const algebraModule: Partial<Module> = {
  id: 'module-algebra',
  courseId: 'course-sat-math',
  title: 'Algebra and Functions',
  description: 'Master linear equations, systems, inequalities, quadratic functions, and exponents - core algebra concepts comprising approximately 35% of the Digital SAT Math section.',
  order: 1,
  isRequired: true,
  lessons: [
    createMockLesson(
      'lesson-math-linear-eqs',
      'module-algebra',
      'Linear Equations and Inequalities',
      'text',
      30,
      1,
      [mockResources['res-math-formulas']]
    ),
    createMockLesson(
      'lesson-math-systems',
      'module-algebra',
      'Systems of Linear Equations',
      'video',
      25,
      2
    ),
    createMockLesson(
      'lesson-math-functions',
      'module-algebra',
      'Functions and Function Notation',
      'text',
      35,
      3
    ),
    createMockLesson(
      'lesson-math-quadratics',
      'module-algebra',
      'Quadratic Equations and Functions',
      'video',
      30,
      4,
      [mockResources['res-calculator-guide']]
    ),
    createMockLesson(
      'lesson-math-exponents',
      'module-algebra',
      'Exponents and Radicals',
      'text',
      25,
      5
    ),
    createMockLesson(
      'lesson-math-algebra-practice',
      'module-algebra',
      'Algebra Practice Problems',
      'exercise',
      45,
      6
    ),
    createMockLesson(
      'lesson-math-algebra-quiz',
      'module-algebra',
      'Algebra Assessment',
      'quiz',
      30,
      7
    ),
  ]
};

const advancedAlgebraModule: Partial<Module> = {
  id: 'module-advanced-algebra',
  courseId: 'course-sat-math',
  title: 'Advanced Algebra and Passport to Advanced Math',
  description: 'Develop mastery in advanced algebraic concepts including polynomials, rational expressions, and exponential functions that represent about 30% of the Digital SAT Math section.',
  order: 2,
  isRequired: true,
  lessons: [
    createMockLesson(
      'lesson-math-polynomials',
      'module-advanced-algebra',
      'Polynomials and Factoring',
      'text',
      30,
      1
    ),
    createMockLesson(
      'lesson-math-rational',
      'module-advanced-algebra',
      'Rational Expressions and Equations',
      'video',
      25,
      2
    ),
    createMockLesson(
      'lesson-math-exponential',
      'module-advanced-algebra',
      'Exponential Functions and Equations',
      'text',
      35,
      3
    ),
    createMockLesson(
      'lesson-math-advanced-functions',
      'module-advanced-algebra',
      'Advanced Functions and Transformations',
      'video',
      30,
      4,
      [mockResources['res-calculator-guide']]
    ),
    createMockLesson(
      'lesson-math-adv-algebra-practice',
      'module-advanced-algebra',
      'Advanced Algebra Practice Problems',
      'exercise',
      45,
      5
    ),
    createMockLesson(
      'lesson-math-adv-algebra-quiz',
      'module-advanced-algebra',
      'Advanced Algebra Assessment',
      'quiz',
      30,
      6
    ),
  ]
};

const problemSolvingModule: Partial<Module> = {
  id: 'module-problem-solving',
  courseId: 'course-sat-math',
  title: 'Problem Solving and Data Analysis',
  description: 'Learn to interpret and analyze data from tables, graphs, and charts, plus solve practical problems involving ratios, percentages, and statistics - representing about 25% of the Digital SAT Math section.',
  order: 3,
  isRequired: true,
  lessons: [
    createMockLesson(
      'lesson-math-ratios-rates',
      'module-problem-solving',
      'Ratios, Rates, and Proportions',
      'text',
      25,
      1
    ),
    createMockLesson(
      'lesson-math-percentages',
      'module-problem-solving',
      'Percentages and Interest Problems',
      'video',
      30,
      2
    ),
    createMockLesson(
      'lesson-math-unit-conversion',
      'module-problem-solving',
      'Units and Measurement Conversions',
      'text',
      20,
      3
    ),
    createMockLesson(
      'lesson-math-data-tables',
      'module-problem-solving',
      'Interpreting Tables and Graphs',
      'video',
      35,
      4,
      [mockResources['res-data-analysis']]
    ),
    createMockLesson(
      'lesson-math-statistics',
      'module-problem-solving',
      'Statistics: Mean, Median, Mode, and Standard Deviation',
      'text',
      40,
      5,
      [mockResources['res-data-analysis']]
    ),
    createMockLesson(
      'lesson-math-probability',
      'module-problem-solving',
      'Probability and Randomization',
      'text',
      30,
      6
    ),
    createMockLesson(
      'lesson-math-data-practice',
      'module-problem-solving',
      'Data Analysis Practice Problems',
      'exercise',
      45,
      7
    ),
    createMockLesson(
      'lesson-math-data-quiz',
      'module-problem-solving',
      'Problem Solving Assessment',
      'quiz',
      30,
      8
    ),
  ]
};

const geometryModule: Partial<Module> = {
  id: 'module-geometry',
  courseId: 'course-sat-math',
  title: 'Geometry and Trigonometry',
  description: 'Build understanding of lines, angles, triangles, circles, coordinate geometry, and basic trigonometry - accounting for about 10% of the Digital SAT Math section.',
  order: 4,
  isRequired: true,
  lessons: [
    createMockLesson(
      'lesson-math-lines-angles',
      'module-geometry',
      'Lines, Angles, and Polygons',
      'text',
      25,
      1,
      [mockResources['res-math-formulas']]
    ),
    createMockLesson(
      'lesson-math-triangles',
      'module-geometry',
      'Triangles and the Pythagorean Theorem',
      'video',
      30,
      2
    ),
    createMockLesson(
      'lesson-math-circles',
      'module-geometry',
      'Circles and Circular Arc Measures',
      'text',
      25,
      3
    ),
    createMockLesson(
      'lesson-math-coord-geometry',
      'module-geometry',
      'Coordinate Geometry and the Distance Formula',
      'video',
      30,
      4
    ),
    createMockLesson(
      'lesson-math-trigonometry',
      'module-geometry',
      'Introduction to Trigonometry',
      'text',
      35,
      5,
      [mockResources['res-math-formulas']]
    ),
    createMockLesson(
      'lesson-math-geometry-practice',
      'module-geometry',
      'Geometry Practice Problems',
      'exercise',
      45,
      6
    ),
    createMockLesson(
      'lesson-math-geometry-quiz',
      'module-geometry',
      'Geometry Assessment',
      'quiz',
      30,
      7
    ),
  ]
};

const testingStrategiesModule: Partial<Module> = {
  id: 'module-math-strategies',
  courseId: 'course-sat-math',
  title: 'Math Testing Strategies',
  description: 'Develop effective strategies for tackling the Digital SAT Math section, including time management, calculator usage, and problem-solving approaches.',
  order: 5,
  isRequired: true,
  lessons: [
    createMockLesson(
      'lesson-math-time-management',
      'module-math-strategies',
      'Time Management for the Math Section',
      'text',
      20,
      1
    ),
    createMockLesson(
      'lesson-math-calculator',
      'module-math-strategies',
      'Effective Calculator Usage',
      'video',
      25,
      2,
      [mockResources['res-calculator-guide']]
    ),
    createMockLesson(
      'lesson-math-multiple-choice',
      'module-math-strategies',
      'Multiple Choice Strategy',
      'text',
      20,
      3
    ),
    createMockLesson(
      'lesson-math-student-produced',
      'module-math-strategies',
      'Student-Produced Response Strategy',
      'video',
      25,
      4
    ),
    createMockLesson(
      'lesson-math-common-mistakes',
      'module-math-strategies',
      'Avoiding Common Math Mistakes',
      'text',
      20,
      5
    ),
    createMockLesson(
      'lesson-math-strategy-practice',
      'module-math-strategies',
      'Strategy Practice Session',
      'exercise',
      30,
      6
    ),
    createMockLesson(
      'lesson-math-strategy-quiz',
      'module-math-strategies',
      'Math Strategies Assessment',
      'quiz',
      20,
      7
    ),
  ]
};

const practiceTestsModule: Partial<Module> = {
  id: 'module-math-practice-tests',
  courseId: 'course-sat-math',
  title: 'Math Practice Tests',
  description: 'Put your skills to the test with full-length math section simulations and practice tests under timed conditions.',
  order: 6,
  isRequired: true,
  lessons: [
    createMockLesson(
      'lesson-math-mini-test-1',
      'module-math-practice-tests',
      'Mini Practice Test 1',
      'exercise',
      30,
      1
    ),
    createMockLesson(
      'lesson-math-mini-test-2',
      'module-math-practice-tests',
      'Mini Practice Test 2',
      'exercise',
      30,
      2
    ),
    createMockLesson(
      'lesson-math-full-test-1',
      'module-math-practice-tests',
      'Full Math Section Simulation 1',
      'simulation',
      70,
      3,
      [mockResources['res-practice-tests']]
    ),
    createMockLesson(
      'lesson-math-review-1',
      'module-math-practice-tests',
      'Test Review and Analysis 1',
      'text',
      30,
      4
    ),
    createMockLesson(
      'lesson-math-full-test-2',
      'module-math-practice-tests',
      'Full Math Section Simulation 2',
      'simulation',
      70,
      5,
      [mockResources['res-practice-tests']]
    ),
    createMockLesson(
      'lesson-math-review-2',
      'module-math-practice-tests',
      'Test Review and Analysis 2',
      'text',
      30,
      6
    ),
    createMockLesson(
      'lesson-math-final-assessment',
      'module-math-practice-tests',
      'Final Math Assessment',
      'simulation',
      70,
      7
    ),
  ]
};

// Add calculated duration to each module
algebraModule.estimatedDuration = calculateModuleDuration(algebraModule.lessons!);
advancedAlgebraModule.estimatedDuration = calculateModuleDuration(advancedAlgebraModule.lessons!);
problemSolvingModule.estimatedDuration = calculateModuleDuration(problemSolvingModule.lessons!);
geometryModule.estimatedDuration = calculateModuleDuration(geometryModule.lessons!);
testingStrategiesModule.estimatedDuration = calculateModuleDuration(testingStrategiesModule.lessons!);
practiceTestsModule.estimatedDuration = calculateModuleDuration(practiceTestsModule.lessons!);

// Compile the complete course
const mathCourse: Course = {
  id: 'course-sat-math',
  title: 'Digital SAT Math Mastery',
  slug: 'digital-sat-math',
  description: 'This comprehensive course focuses exclusively on the Digital SAT Math section. Master all the content areas tested, from algebra and advanced math to problem solving, data analysis, and geometry. Through targeted lessons, practice problems, and full section simulations, you will develop the skills and strategies needed to excel on test day.',
  shortDescription: 'Comprehensive preparation for the Digital SAT Math section with content instruction, strategy development, and realistic practice.',
  image: '/profile/brain-evolution.svg',
  coverImage: '/profile/brain-evolution.svg',
  instructor: mockInstructors['inst-math'],
  modules: [
    algebraModule as Module,
    advancedAlgebraModule as Module,
    problemSolvingModule as Module,
    geometryModule as Module,
    testingStrategiesModule as Module,
    practiceTestsModule as Module,
  ],
  estimatedDuration: algebraModule.estimatedDuration + 
                     advancedAlgebraModule.estimatedDuration + 
                     problemSolvingModule.estimatedDuration + 
                     geometryModule.estimatedDuration + 
                     testingStrategiesModule.estimatedDuration + 
                     practiceTestsModule.estimatedDuration,
  difficulty: 'intermediate',
  level: 4,
  tags: ['SAT Prep', 'Math', 'Algebra', 'Problem Solving', 'Data Analysis', 'Geometry'],
  categories: ['Test Prep', 'SAT', 'Mathematics'],
  enrollmentStatus: 'open',
  published: true,
  createdAt: new Date('2024-03-15'),
  updatedAt: new Date('2024-04-10'),
  featured: true,
  averageRating: 4.8,
  ratingCount: 1247,
  enrollmentCount: 8564,
  learningObjectives: [
    'Master all Digital SAT Math content areas: algebra, advanced math, problem solving, data analysis, and geometry',
    'Learn effective calculator usage and know when to use mental math vs. calculator methods',
    'Recognize common question types and develop strategic approaches for each',
    'Practice with realistic Digital SAT Math questions and full section simulations',
    'Develop time management skills specific to the Digital SAT adaptive format',
    'Analyze practice test results to identify and strengthen weak areas'
  ],
};

export default mathCourse;
