import { Course, Module } from '@/types/course';
import mockInstructors from '../instructors';
import mockResources from '../resources';
import { createMockLesson, calculateModuleDuration } from '../helpers';

// Reading & Writing section modules and lessons
const readingComprehensionModule: Partial<Module> = {
  id: 'module-reading-comp',
  courseId: 'course-sat-reading-writing',
  title: 'Reading Comprehension',
  description: 'Develop critical reading skills for analyzing various text types including literature, informational texts, and data presentations that comprise a significant portion of the Digital SAT Reading & Writing section.',
  order: 1,
  isRequired: true,
  lessons: [
    createMockLesson(
      'lesson-rw-text-structure',
      'module-reading-comp',
      'Understanding Text Structure and Purpose',
      'text',
      30,
      1,
      [mockResources['res-reading-strategies']]
    ),
    createMockLesson(
      'lesson-rw-main-ideas',
      'module-reading-comp',
      'Identifying Main Ideas and Central Themes',
      'video',
      25,
      2
    ),
    createMockLesson(
      'lesson-rw-supporting-details',
      'module-reading-comp',
      'Analyzing Supporting Details and Evidence',
      'text',
      35,
      3
    ),
    createMockLesson(
      'lesson-rw-inference',
      'module-reading-comp',
      'Making Inferences and Drawing Conclusions',
      'video',
      30,
      4
    ),
    createMockLesson(
      'lesson-rw-author-purpose',
      'module-reading-comp',
      'Author\'s Purpose and Perspective',
      'text',
      25,
      5
    ),
    createMockLesson(
      'lesson-rw-vocab-context',
      'module-reading-comp',
      'Vocabulary in Context',
      'text',
      30,
      6,
      [mockResources['res-vocab-list']]
    ),
    createMockLesson(
      'lesson-rw-reading-practice',
      'module-reading-comp',
      'Reading Comprehension Practice',
      'exercise',
      45,
      7
    ),
    createMockLesson(
      'lesson-rw-reading-quiz',
      'module-reading-comp',
      'Reading Comprehension Assessment',
      'quiz',
      30,
      8
    ),
  ]
};

const writingConventionsModule: Partial<Module> = {
  id: 'module-writing-conventions',
  courseId: 'course-sat-reading-writing',
  title: 'Writing Conventions',
  description: 'Master English grammar, punctuation, and effective expression - critical components tested in the Digital SAT Reading & Writing section.',
  order: 2,
  isRequired: true,
  lessons: [
    createMockLesson(
      'lesson-rw-sentence-structure',
      'module-writing-conventions',
      'Sentence Structure and Formation',
      'text',
      30,
      1,
      [mockResources['res-grammar-rules']]
    ),
    createMockLesson(
      'lesson-rw-verb-tense',
      'module-writing-conventions',
      'Verb Tense, Form, and Agreement',
      'video',
      25,
      2
    ),
    createMockLesson(
      'lesson-rw-pronouns',
      'module-writing-conventions',
      'Pronoun Usage and Agreement',
      'text',
      25,
      3
    ),
    createMockLesson(
      'lesson-rw-modifiers',
      'module-writing-conventions',
      'Modifiers and Parallelism',
      'video',
      30,
      4
    ),
    createMockLesson(
      'lesson-rw-punctuation',
      'module-writing-conventions',
      'Punctuation and Conventions',
      'text',
      35,
      5
    ),
    createMockLesson(
      'lesson-rw-writing-practice',
      'module-writing-conventions',
      'Writing Conventions Practice',
      'exercise',
      45,
      6
    ),
    createMockLesson(
      'lesson-rw-writing-quiz',
      'module-writing-conventions',
      'Writing Conventions Assessment',
      'quiz',
      30,
      7
    ),
  ]
};

const expressionOfIdeasModule: Partial<Module> = {
  id: 'module-expression-ideas',
  courseId: 'course-sat-reading-writing',
  title: 'Expression of Ideas',
  description: 'Learn to develop and strengthen written content through concision, precision, and effective organization - key writing skills tested on the Digital SAT.',
  order: 3,
  isRequired: true,
  lessons: [
    createMockLesson(
      'lesson-rw-development',
      'module-expression-ideas',
      'Logical Development and Organization',
      'text',
      30,
      1
    ),
    createMockLesson(
      'lesson-rw-transitions',
      'module-expression-ideas',
      'Transitions and Relationships Between Ideas',
      'video',
      25,
      2
    ),
    createMockLesson(
      'lesson-rw-concision',
      'module-expression-ideas',
      'Precision, Concision, and Style',
      'text',
      35,
      3
    ),
    createMockLesson(
      'lesson-rw-rhetorical-synthesis',
      'module-expression-ideas',
      'Rhetorical Synthesis and Word Choice',
      'video',
      30,
      4
    ),
    createMockLesson(
      'lesson-rw-expression-practice',
      'module-expression-ideas',
      'Expression of Ideas Practice',
      'exercise',
      45,
      5
    ),
    createMockLesson(
      'lesson-rw-expression-quiz',
      'module-expression-ideas',
      'Expression of Ideas Assessment',
      'quiz',
      30,
      6
    ),
  ]
};

const informationGraphicsModule: Partial<Module> = {
  id: 'module-information-graphics',
  courseId: 'course-sat-reading-writing',
  title: 'Information Graphics Analysis',
  description: 'Develop skills for interpreting graphs, tables, charts, and other visual presentations of data that appear throughout the Digital SAT Reading & Writing section.',
  order: 4,
  isRequired: true,
  lessons: [
    createMockLesson(
      'lesson-rw-graph-types',
      'module-information-graphics',
      'Types of Graphs and Their Purposes',
      'text',
      25,
      1
    ),
    createMockLesson(
      'lesson-rw-data-interpretation',
      'module-information-graphics',
      'Interpreting Data from Graphs and Tables',
      'video',
      30,
      2,
      [mockResources['res-data-analysis']]
    ),
    createMockLesson(
      'lesson-rw-data-relationships',
      'module-information-graphics',
      'Analyzing Relationships in Data',
      'text',
      30,
      3
    ),
    createMockLesson(
      'lesson-rw-text-graphics',
      'module-information-graphics',
      'Connecting Text and Graphics',
      'video',
      25,
      4
    ),
    createMockLesson(
      'lesson-rw-graphics-practice',
      'module-information-graphics',
      'Information Graphics Practice',
      'exercise',
      35,
      5
    ),
    createMockLesson(
      'lesson-rw-graphics-quiz',
      'module-information-graphics',
      'Information Graphics Assessment',
      'quiz',
      25,
      6
    ),
  ]
};

const textTypesModule: Partial<Module> = {
  id: 'module-text-types',
  courseId: 'course-sat-reading-writing',
  title: 'Text Types and Purposes',
  description: 'Learn strategies for analyzing various types of texts found on the Digital SAT, including literature, science, history/social studies, and argumentative passages.',
  order: 5,
  isRequired: true,
  lessons: [
    createMockLesson(
      'lesson-rw-literature',
      'module-text-types',
      'Literature and Literary Narratives',
      'text',
      30,
      1
    ),
    createMockLesson(
      'lesson-rw-science',
      'module-text-types',
      'Science and Technical Texts',
      'video',
      25,
      2
    ),
    createMockLesson(
      'lesson-rw-history',
      'module-text-types',
      'History and Social Studies Texts',
      'text',
      30,
      3
    ),
    createMockLesson(
      'lesson-rw-argument',
      'module-text-types',
      'Argumentative and Persuasive Texts',
      'video',
      35,
      4
    ),
    createMockLesson(
      'lesson-rw-comparison',
      'module-text-types',
      'Comparing Multiple Texts',
      'text',
      30,
      5
    ),
    createMockLesson(
      'lesson-rw-texttypes-practice',
      'module-text-types',
      'Text Types Practice',
      'exercise',
      45,
      6
    ),
    createMockLesson(
      'lesson-rw-texttypes-quiz',
      'module-text-types',
      'Text Types Assessment',
      'quiz',
      30,
      7
    ),
  ]
};

const testingStrategiesModule: Partial<Module> = {
  id: 'module-rw-strategies',
  courseId: 'course-sat-reading-writing',
  title: 'Reading & Writing Testing Strategies',
  description: 'Develop effective strategies for tackling the Digital SAT Reading & Writing section, including time management, process of elimination, and question type approaches.',
  order: 6,
  isRequired: true,
  lessons: [
    createMockLesson(
      'lesson-rw-time-management',
      'module-rw-strategies',
      'Time Management for Reading & Writing',
      'text',
      20,
      1
    ),
    createMockLesson(
      'lesson-rw-active-reading',
      'module-rw-strategies',
      'Active Reading Techniques',
      'video',
      25,
      2
    ),
    createMockLesson(
      'lesson-rw-poe',
      'module-rw-strategies',
      'Process of Elimination',
      'text',
      25,
      3
    ),
    createMockLesson(
      'lesson-rw-question-types',
      'module-rw-strategies',
      'Common Question Types and Approaches',
      'video',
      30,
      4
    ),
    createMockLesson(
      'lesson-rw-common-mistakes',
      'module-rw-strategies',
      'Avoiding Common Mistakes',
      'text',
      20,
      5
    ),
    createMockLesson(
      'lesson-rw-strategy-practice',
      'module-rw-strategies',
      'Strategy Practice Session',
      'exercise',
      40,
      6
    ),
    createMockLesson(
      'lesson-rw-strategy-quiz',
      'module-rw-strategies',
      'Reading & Writing Strategies Assessment',
      'quiz',
      25,
      7
    ),
  ]
};

const practiceTestsModule: Partial<Module> = {
  id: 'module-rw-practice-tests',
  courseId: 'course-sat-reading-writing',
  title: 'Reading & Writing Practice Tests',
  description: 'Put your skills to the test with full-length Reading & Writing section simulations and practice tests under timed conditions.',
  order: 7,
  isRequired: true,
  lessons: [
    createMockLesson(
      'lesson-rw-mini-test-1',
      'module-rw-practice-tests',
      'Mini Practice Test 1',
      'exercise',
      35,
      1
    ),
    createMockLesson(
      'lesson-rw-mini-test-2',
      'module-rw-practice-tests',
      'Mini Practice Test 2',
      'exercise',
      35,
      2
    ),
    createMockLesson(
      'lesson-rw-full-test-1',
      'module-rw-practice-tests',
      'Full Reading & Writing Section Simulation 1',
      'simulation',
      64,
      3,
      [mockResources['res-practice-tests']]
    ),
    createMockLesson(
      'lesson-rw-review-1',
      'module-rw-practice-tests',
      'Test Review and Analysis 1',
      'text',
      35,
      4
    ),
    createMockLesson(
      'lesson-rw-full-test-2',
      'module-rw-practice-tests',
      'Full Reading & Writing Section Simulation 2',
      'simulation',
      64,
      5,
      [mockResources['res-practice-tests']]
    ),
    createMockLesson(
      'lesson-rw-review-2',
      'module-rw-practice-tests',
      'Test Review and Analysis 2',
      'text',
      35,
      6
    ),
    createMockLesson(
      'lesson-rw-final-assessment',
      'module-rw-practice-tests',
      'Final Reading & Writing Assessment',
      'simulation',
      64,
      7
    ),
  ]
};

// Add calculated duration to each module
readingComprehensionModule.estimatedDuration = calculateModuleDuration(readingComprehensionModule.lessons!);
writingConventionsModule.estimatedDuration = calculateModuleDuration(writingConventionsModule.lessons!);
expressionOfIdeasModule.estimatedDuration = calculateModuleDuration(expressionOfIdeasModule.lessons!);
informationGraphicsModule.estimatedDuration = calculateModuleDuration(informationGraphicsModule.lessons!);
textTypesModule.estimatedDuration = calculateModuleDuration(textTypesModule.lessons!);
testingStrategiesModule.estimatedDuration = calculateModuleDuration(testingStrategiesModule.lessons!);
practiceTestsModule.estimatedDuration = calculateModuleDuration(practiceTestsModule.lessons!);

// Compile the complete course
const readingWritingCourse: Course = {
  id: 'course-sat-reading-writing',
  title: 'Digital SAT Reading & Writing Mastery',
  slug: 'digital-sat-reading-writing',
  description: 'This comprehensive course focuses exclusively on the Digital SAT Reading & Writing section. Develop the critical reading and writing skills needed to excel on test day through targeted lessons on reading comprehension, grammar, expression of ideas, and information analysis. Practice with realistic questions and section simulations to build confidence and improve your score.',
  shortDescription: 'Master the Digital SAT Reading & Writing section with focused instruction on critical reading, grammar, effective expression, and test-taking strategies.',
  image: '/profile/brain-evolution.svg',
  coverImage: '/profile/brain-evolution.svg',
  instructor: mockInstructors['inst-reading'],
  modules: [
    readingComprehensionModule as Module,
    writingConventionsModule as Module,
    expressionOfIdeasModule as Module,
    informationGraphicsModule as Module,
    textTypesModule as Module,
    testingStrategiesModule as Module,
    practiceTestsModule as Module,
  ],
  estimatedDuration: readingComprehensionModule.estimatedDuration +
                    writingConventionsModule.estimatedDuration +
                    expressionOfIdeasModule.estimatedDuration +
                    informationGraphicsModule.estimatedDuration +
                    textTypesModule.estimatedDuration +
                    testingStrategiesModule.estimatedDuration +
                    practiceTestsModule.estimatedDuration,
  difficulty: 'intermediate',
  level: 4,
  tags: ['SAT Prep', 'Reading', 'Writing', 'Grammar', 'Text Analysis', 'Critical Reading'],
  categories: ['Test Prep', 'SAT', 'English'],
  enrollmentStatus: 'open',
  published: true,
  createdAt: new Date('2024-03-15'),
  updatedAt: new Date('2024-04-10'),
  featured: true,
  averageRating: 4.7,
  ratingCount: 1138,
  enrollmentCount: 7932,
  learningObjectives: [
    'Master critical reading skills to understand and analyze various text types',
    'Strengthen your command of Standard English conventions and grammar rules',
    'Develop skills for effective expression and organization of ideas',
    'Learn to interpret and analyze information presented in graphs, tables, and charts',
    'Practice with realistic Digital SAT Reading & Writing questions in the adaptive format',
    'Apply proven test-taking strategies specific to the Digital SAT',
  ],
};

export default readingWritingCourse;
