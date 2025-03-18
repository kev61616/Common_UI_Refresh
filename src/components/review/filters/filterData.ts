/**
 * Data structures for filter categories and options
 * This file centralizes all filter-related data to make it more maintainable
 */

// Subject categories and subcategories
export const subjectCategories = {
  'Reading': [
    'Main Purpose',
    'Main Idea',
    'Summary',
    'Specific Detail',
    'Supporting Evidence',
    'Supporting Quotation',
    'Underlined Function',
    'Logical Reasoning',
    'Two Texts',
    'Long Completion',
    'Structure of Text',
    'Vocabulary',
    'Data Analysis: Graph(s)',
    'Data Analysis: Table(s)'
  ],
  'Writing': [
    'Parts of Speech',
    'Sentence Structure',
    'Pronouns',
    'Agreement',
    'Punctuation',
    'Verb',
    'Degree',
    'Mood',
    'Voice',
    'Transition'
  ],
  'Math': [
    'Expressions, Equations, and Inequalities',
    'Linear and Nonlinear',
    'Statistical Analysis and Probability',
    'Triangle',
    'Rectangle',
    'Circle',
    'Parabola',
    'Cone',
    'Cube',
    'Cylinder',
    'Sphere',
    'Trigonometric Ratios and Functions'
  ]
};

// Flatten for type selection
export const allTypes = [
  ...subjectCategories.Reading,
  ...subjectCategories.Writing,
  ...subjectCategories.Math
];

// Date filter presets
export const datePresets = [
  'Last 7 days',
  'Last 30 days',
  'This month',
  'Last month',
  'This year'
];

// Initial filter state
export const initialFilters = {
  subject: [] as string[],
  type: [] as string[],
  accuracyRange: [0, 100] as [number, number],
  timeRange: [0, 120] as [number, number], // In minutes
  pace: [] as string[],
  dateRange: [
    new Date(new Date().setMonth(new Date().getMonth() - 3)),
    new Date()
  ] as [Date, Date],
  dates: [] as string[]
};

// Utility function to convert text date filter to actual date range
export const getDateRangeFromText = (dateText: string): [Date, Date] => {
  const now = new Date();
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  
  switch (dateText) {
    case 'Last 7 days':
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(now.getDate() - 7);
      return [sevenDaysAgo, todayEnd];
      
    case 'Last 30 days':
      const thirtyDaysAgo = new Date(now);
      thirtyDaysAgo.setDate(now.getDate() - 30);
      return [thirtyDaysAgo, todayEnd];
      
    case 'This month':
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return [firstDayOfMonth, todayEnd];
      
    case 'Last month':
      const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
      return [firstDayOfLastMonth, lastDayOfLastMonth];
      
    case 'This year':
      const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
      return [firstDayOfYear, todayEnd];
      
    default:
      return [
        new Date(new Date().setMonth(new Date().getMonth() - 3)),
        todayEnd
      ];
  }
};

// Difficulty levels
export const difficultyLevels = ['Easy', 'Medium', 'Hard'];

// Pace options
export const paceOptions = ['Fast', 'Normal', 'Slow'];

// Common color schemes for filter buttons and UI elements
export const filterColors = {
  subject: {
    active: 'bg-white text-indigo-600 border-indigo-500 dark:bg-slate-800 dark:text-indigo-300 dark:border-indigo-600',
    inactive: 'bg-white text-slate-600 border-slate-200 hover:text-indigo-600 hover:border-indigo-500 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:text-indigo-400 dark:hover:border-indigo-600',
    ring: 'ring-1 ring-indigo-500 dark:ring-indigo-600',
    dropdown: 'bg-white dark:bg-slate-800'
  },
  type: {
    active: 'bg-white text-sky-600 border-sky-500 dark:bg-slate-800 dark:text-sky-300 dark:border-sky-600',
    inactive: 'bg-white text-slate-600 border-slate-200 hover:text-sky-600 hover:border-sky-500 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:text-sky-400 dark:hover:border-sky-600',
    ring: 'ring-1 ring-sky-500 dark:ring-sky-600',
    dropdown: 'bg-white dark:bg-slate-800'
  },
  date: {
    active: 'bg-white text-rose-600 border-rose-500 dark:bg-slate-800 dark:text-rose-300 dark:border-rose-600',
    inactive: 'bg-white text-slate-600 border-slate-200 hover:text-rose-600 hover:border-rose-500 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:text-rose-400 dark:hover:border-rose-600',
    ring: 'ring-1 ring-rose-500 dark:ring-rose-600',
    dropdown: 'bg-white dark:bg-slate-800'
  },
  difficulty: {
    active: 'bg-white text-purple-600 border-purple-500 dark:bg-slate-800 dark:text-purple-300 dark:border-purple-600',
    inactive: 'bg-white text-slate-600 border-slate-200 hover:text-purple-600 hover:border-purple-500 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:text-purple-400 dark:hover:border-purple-600',
    ring: 'ring-1 ring-purple-500 dark:ring-purple-600',
    dropdown: 'bg-white dark:bg-slate-800'
  },
  pace: {
    active: 'bg-white text-amber-600 border-amber-500 dark:bg-slate-800 dark:text-amber-300 dark:border-amber-600',
    inactive: 'bg-white text-slate-600 border-slate-200 hover:text-amber-600 hover:border-amber-500 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:text-amber-400 dark:hover:border-amber-600',
    ring: 'ring-1 ring-amber-500 dark:ring-amber-600',
    dropdown: 'bg-white dark:bg-slate-800'
  }
};
