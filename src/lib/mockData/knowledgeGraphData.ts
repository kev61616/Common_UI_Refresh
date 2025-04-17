import { CourseKnowledgeGraph, KnowledgeGraphProgress, LearningPath } from '@/types/knowledgeGraph';

/**
 * Mock knowledge graph data for Digital SAT Math course
 * This represents concepts, their relationships, and learning paths through the course
 */

export const digitalSatMathKnowledgeGraph: CourseKnowledgeGraph = {
  courseId: 'digital-sat-math',
  version: '1.0',
  lastUpdated: '2025-04-10T08:00:00Z',
  
  // Knowledge Nodes (Concepts)
  nodes: [
    // Algebra Fundamentals
    {
      id: 'algebra-linear-equations',
      moduleId: 'algebra-and-functions',
      title: 'Linear Equations',
      description: 'Understanding, solving, and applying linear equations',
      difficulty: 'beginner',
      importance: 'core',
      estimatedMinutes: 60,
      resources: ['linear-equations-video', 'linear-equations-practice'],
      concepts: ['slope', 'y-intercept', 'solving equations'],
      metadata: {
        order: 1,
        keyTakeaways: ['Understand the slope-intercept form', 'Solve for variables', 'Graph linear equations']
      }
    },
    {
      id: 'algebra-quadratic-equations',
      moduleId: 'algebra-and-functions',
      title: 'Quadratic Equations',
      description: 'Working with quadratic equations and functions',
      difficulty: 'intermediate',
      importance: 'core',
      estimatedMinutes: 90,
      resources: ['quadratic-equations-video', 'quadratic-equations-practice'],
      concepts: ['quadratic formula', 'factoring', 'parabolas'],
      metadata: {
        order: 2,
        keyTakeaways: ['Factor quadratic expressions', 'Apply the quadratic formula', 'Understand the relationship to graphs']
      }
    },
    {
      id: 'algebra-inequalities',
      moduleId: 'algebra-and-functions',
      title: 'Inequalities',
      description: 'Solving and graphing linear and quadratic inequalities',
      difficulty: 'intermediate',
      importance: 'core',
      estimatedMinutes: 75,
      resources: ['inequalities-video', 'inequalities-practice'],
      concepts: ['inequality rules', 'graphing inequalities', 'compound inequalities'],
      metadata: {
        order: 3,
        keyTakeaways: ['Understand inequality notation', 'Solve multi-step inequalities', 'Represent solutions graphically']
      }
    },
    {
      id: 'algebra-systems',
      moduleId: 'algebra-and-functions',
      title: 'Systems of Equations',
      description: 'Solving systems of linear and non-linear equations',
      difficulty: 'intermediate',
      importance: 'core',
      estimatedMinutes: 90,
      resources: ['systems-video', 'systems-practice'],
      concepts: ['elimination', 'substitution', 'graphing systems'],
      metadata: {
        order: 4,
        keyTakeaways: ['Apply substitution method', 'Apply elimination method', 'Interpret solutions graphically']
      }
    },
    
    // Advanced Algebra
    {
      id: 'advanced-exponents',
      moduleId: 'advanced-algebra',
      title: 'Exponents and Radicals',
      description: 'Working with exponents, radicals, and their properties',
      difficulty: 'intermediate',
      importance: 'core',
      estimatedMinutes: 75,
      resources: ['exponents-video', 'radicals-practice'],
      concepts: ['exponent rules', 'radical operations', 'rational exponents'],
      metadata: {
        order: 5,
        keyTakeaways: ['Apply exponent rules', 'Simplify radical expressions', 'Convert between radical and exponential forms']
      }
    },
    {
      id: 'advanced-polynomials',
      moduleId: 'advanced-algebra',
      title: 'Polynomials',
      description: 'Operations with polynomials and factoring techniques',
      difficulty: 'intermediate',
      importance: 'core',
      estimatedMinutes: 90,
      resources: ['polynomials-video', 'polynomials-practice'],
      concepts: ['polynomial addition', 'polynomial multiplication', 'factoring techniques'],
      metadata: {
        order: 6,
        keyTakeaways: ['Apply factoring strategies', 'Find zeros of polynomials', 'Understand polynomial division']
      }
    },
    {
      id: 'advanced-rational',
      moduleId: 'advanced-algebra',
      title: 'Rational Expressions',
      description: 'Working with rational expressions and equations',
      difficulty: 'advanced',
      importance: 'core',
      estimatedMinutes: 90,
      resources: ['rational-expressions-video', 'rational-expressions-practice'],
      concepts: ['domain restrictions', 'operations with rational expressions', 'rational equations'],
      metadata: {
        order: 7,
        keyTakeaways: ['Find domains of rational expressions', 'Simplify rational expressions', 'Solve rational equations']
      }
    },
    {
      id: 'advanced-functions',
      moduleId: 'advanced-algebra',
      title: 'Function Concepts',
      description: 'Understanding function notation, composition, and transformations',
      difficulty: 'intermediate',
      importance: 'core',
      estimatedMinutes: 90,
      resources: ['functions-video', 'functions-practice'],
      concepts: ['function notation', 'domain and range', 'transformations'],
      metadata: {
        order: 8,
        keyTakeaways: ['Identify functions', 'Find domains and ranges', 'Compose and transform functions']
      }
    },
    
    // Problem Solving
    {
      id: 'problem-solving-word-problems',
      moduleId: 'problem-solving',
      title: 'Word Problems',
      description: 'Translating real-world problems into mathematical expressions',
      difficulty: 'intermediate',
      importance: 'core',
      estimatedMinutes: 90,
      resources: ['word-problems-video', 'word-problems-practice'],
      concepts: ['problem setup', 'variable definition', 'solution verification'],
      metadata: {
        order: 9,
        keyTakeaways: ['Translate verbal descriptions to equations', 'Identify relevant information', 'Verify solutions in context']
      }
    },
    {
      id: 'problem-solving-rates',
      moduleId: 'problem-solving',
      title: 'Rates, Ratios, and Proportions',
      description: 'Solving problems involving ratios, rates, and proportional relationships',
      difficulty: 'intermediate',
      importance: 'core',
      estimatedMinutes: 75,
      resources: ['rates-video', 'proportions-practice'],
      concepts: ['unit rates', 'proportional relationships', 'percent problems'],
      metadata: {
        order: 10,
        keyTakeaways: ['Set up proportions', 'Convert between units', 'Apply proportions to percent problems']
      }
    },
    
    // Data Analysis
    {
      id: 'data-statistics',
      moduleId: 'data-analysis',
      title: 'Descriptive Statistics',
      description: 'Analyzing data with measures of center and spread',
      difficulty: 'intermediate',
      importance: 'core',
      estimatedMinutes: 75,
      resources: ['statistics-video', 'statistics-practice'],
      concepts: ['mean', 'median', 'standard deviation'],
      metadata: {
        order: 11,
        keyTakeaways: ['Calculate measures of center', 'Calculate measures of spread', 'Choose appropriate statistical measures']
      }
    },
    {
      id: 'data-graphs',
      moduleId: 'data-analysis',
      title: 'Data Representations',
      description: 'Interpreting and analyzing graphs, tables, and charts',
      difficulty: 'intermediate',
      importance: 'core',
      estimatedMinutes: 60,
      resources: ['data-graphs-video', 'data-interpretation-practice'],
      concepts: ['scatterplots', 'histograms', 'box plots'],
      metadata: {
        order: 12,
        keyTakeaways: ['Interpret different graph types', 'Extract information from data displays', 'Choose appropriate data displays']
      }
    },
    
    // Geometry
    {
      id: 'geometry-lines-angles',
      moduleId: 'geometry',
      title: 'Lines and Angles',
      description: 'Understanding relationships between lines and angles',
      difficulty: 'beginner',
      importance: 'core',
      estimatedMinutes: 60,
      resources: ['lines-angles-video', 'angles-practice'],
      concepts: ['parallel lines', 'transversals', 'angle relationships'],
      metadata: {
        order: 13,
        keyTakeaways: ['Identify angle types', 'Apply angle relationship rules', 'Work with parallel lines']
      }
    },
    {
      id: 'geometry-triangles',
      moduleId: 'geometry',
      title: 'Triangles',
      description: 'Properties, similarities, and areas of triangles',
      difficulty: 'intermediate',
      importance: 'core',
      estimatedMinutes: 75,
      resources: ['triangles-video', 'triangles-practice'],
      concepts: ['triangle congruence', 'similar triangles', 'triangle area'],
      metadata: {
        order: 14,
        keyTakeaways: ['Apply triangle congruence criteria', 'Solve similar triangle problems', 'Calculate areas']
      }
    },
    {
      id: 'geometry-trigonometry',
      moduleId: 'geometry',
      title: 'Basic Trigonometry',
      description: 'Using trigonometric ratios and the unit circle',
      difficulty: 'advanced',
      importance: 'recommended',
      estimatedMinutes: 90,
      resources: ['trigonometry-video', 'trigonometry-practice'],
      concepts: ['sine, cosine, tangent', 'unit circle', 'right triangle trigonometry'],
      metadata: {
        order: 15,
        keyTakeaways: ['Apply trigonometric ratios', 'Use the unit circle', 'Solve right triangle problems']
      }
    },
    
    // Testing Strategy
    {
      id: 'strategy-calculator',
      moduleId: 'math-testing-strategies',
      title: 'Calculator Strategies',
      description: 'Effective use of calculator on the Digital SAT Math section',
      difficulty: 'beginner',
      importance: 'recommended',
      estimatedMinutes: 45,
      resources: ['calculator-video', 'calculator-tips'],
      concepts: ['calculator efficiency', 'when to use calculator', 'calculator functions'],
      metadata: {
        order: 16,
        keyTakeaways: ['Know when to use the calculator', 'Understand calculator functions', 'Practice efficient calculator use']
      }
    },
    {
      id: 'strategy-time-management',
      moduleId: 'math-testing-strategies',
      title: 'Time Management',
      description: 'Strategies for managing time effectively during the test',
      difficulty: 'beginner',
      importance: 'recommended',
      estimatedMinutes: 30,
      resources: ['time-management-video', 'time-management-tips'],
      concepts: ['pacing', 'question triage', 'efficient problem solving'],
      metadata: {
        order: 17,
        keyTakeaways: ['Develop a pacing strategy', 'Identify time-consuming problems', 'Practice efficient problem-solving techniques']
      }
    }
  ],
  
  // Relationships between concepts
  relationships: [
    // Algebra prerequisites
    {
      id: 'rel-1',
      sourceId: 'algebra-linear-equations',
      targetId: 'algebra-quadratic-equations',
      type: 'prerequisite',
      strength: 9,
      description: 'Linear equations provide fundamental concepts needed for quadratic equations'
    },
    {
      id: 'rel-2',
      sourceId: 'algebra-linear-equations',
      targetId: 'algebra-inequalities',
      type: 'prerequisite',
      strength: 8,
      description: 'Understanding linear equations is necessary for working with inequalities'
    },
    {
      id: 'rel-3',
      sourceId: 'algebra-linear-equations',
      targetId: 'algebra-systems',
      type: 'prerequisite',
      strength: 10,
      description: 'Systems of equations build directly on knowledge of individual equations'
    },
    {
      id: 'rel-4',
      sourceId: 'algebra-quadratic-equations',
      targetId: 'advanced-polynomials',
      type: 'prerequisite',
      strength: 8,
      description: 'Quadratic equations are a fundamental type of polynomial equation'
    },
    
    // Advanced algebra relationships
    {
      id: 'rel-5',
      sourceId: 'advanced-exponents',
      targetId: 'advanced-polynomials',
      type: 'prerequisite',
      strength: 7,
      description: 'Exponent rules are essential for working with polynomials'
    },
    {
      id: 'rel-6',
      sourceId: 'advanced-polynomials',
      targetId: 'advanced-rational',
      type: 'prerequisite',
      strength: 9,
      description: 'Rational expressions involve polynomials in numerators and denominators'
    },
    {
      id: 'rel-7',
      sourceId: 'advanced-exponents',
      targetId: 'advanced-rational',
      type: 'prerequisite',
      strength: 7,
      description: 'Exponent rules are used when simplifying rational expressions'
    },
    {
      id: 'rel-8',
      sourceId: 'algebra-linear-equations',
      targetId: 'advanced-functions',
      type: 'prerequisite',
      strength: 8,
      description: 'Linear functions are the simplest type of functions'
    },
    {
      id: 'rel-9',
      sourceId: 'algebra-quadratic-equations',
      targetId: 'advanced-functions',
      type: 'prerequisite',
      strength: 7,
      description: 'Quadratic functions are an important class of functions'
    },
    
    // Problem solving connections
    {
      id: 'rel-10',
      sourceId: 'algebra-linear-equations',
      targetId: 'problem-solving-word-problems',
      type: 'applies-to',
      strength: 9,
      description: 'Linear equations are used to solve many types of word problems'
    },
    {
      id: 'rel-11',
      sourceId: 'algebra-quadratic-equations',
      targetId: 'problem-solving-word-problems',
      type: 'applies-to',
      strength: 8,
      description: 'Quadratic equations appear in various types of word problems'
    },
    {
      id: 'rel-12',
      sourceId: 'algebra-systems',
      targetId: 'problem-solving-word-problems',
      type: 'applies-to',
      strength: 8,
      description: 'Many complex word problems require systems of equations'
    },
    {
      id: 'rel-13',
      sourceId: 'algebra-linear-equations',
      targetId: 'problem-solving-rates',
      type: 'applies-to',
      strength: 9,
      description: 'Rate problems often involve setting up linear equations'
    },
    
    // Geometry connections
    {
      id: 'rel-14',
      sourceId: 'geometry-lines-angles',
      targetId: 'geometry-triangles',
      type: 'prerequisite',
      strength: 10,
      description: 'Understanding angles is fundamental to working with triangles'
    },
    {
      id: 'rel-15',
      sourceId: 'geometry-triangles',
      targetId: 'geometry-trigonometry',
      type: 'prerequisite',
      strength: 10,
      description: 'Trigonometry is based on triangle relationships'
    },
    {
      id: 'rel-16',
      sourceId: 'advanced-functions',
      targetId: 'geometry-trigonometry',
      type: 'prerequisite',
      strength: 7,
      description: 'Trigonometric functions build on function concepts'
    },
    
    // Data analysis connections
    {
      id: 'rel-17',
      sourceId: 'data-statistics',
      targetId: 'data-graphs',
      type: 'relates-to',
      strength: 8,
      description: 'Statistical measures are often derived from and displayed in graphs'
    },
    {
      id: 'rel-18',
      sourceId: 'problem-solving-rates',
      targetId: 'data-statistics',
      type: 'applies-to',
      strength: 6,
      description: 'Rates and ratios are used in statistical analysis'
    },
    
    // Strategy connections
    {
      id: 'rel-19',
      sourceId: 'algebra-quadratic-equations',
      targetId: 'strategy-calculator',
      type: 'relates-to',
      strength: 7,
      description: 'Calculators are particularly useful for complex quadratic equations'
    },
    {
      id: 'rel-20',
      sourceId: 'data-statistics',
      targetId: 'strategy-calculator',
      type: 'relates-to',
      strength: 8,
      description: 'Calculators can efficiently compute statistical measures'
    }
  ],
  
  // Predefined learning paths
  predefinedPaths: [
    {
      id: 'comprehensive-path',
      courseId: 'digital-sat-math',
      name: 'Comprehensive Preparation',
      description: 'Complete coverage of all Digital SAT Math topics in a logical sequence',
      type: 'comprehensive',
      difficulty: 'intermediate',
      estimatedTotalTime: 1200, // 20 hours
      nodeSequence: [
        'algebra-linear-equations',
        'algebra-inequalities',
        'algebra-quadratic-equations',
        'algebra-systems',
        'advanced-exponents',
        'advanced-polynomials',
        'advanced-rational',
        'advanced-functions',
        'problem-solving-word-problems',
        'problem-solving-rates',
        'data-statistics',
        'data-graphs',
        'geometry-lines-angles',
        'geometry-triangles',
        'geometry-trigonometry',
        'strategy-calculator',
        'strategy-time-management'
      ],
      createdAt: '2025-03-15T12:00:00Z'
    },
    {
      id: 'accelerated-path',
      courseId: 'digital-sat-math',
      name: 'Accelerated Review',
      description: 'Focused review of core concepts for students with strong math background',
      type: 'accelerated',
      difficulty: 'advanced',
      estimatedTotalTime: 600, // 10 hours
      nodeSequence: [
        'algebra-linear-equations',
        'algebra-quadratic-equations',
        'algebra-systems',
        'advanced-polynomials',
        'advanced-rational',
        'problem-solving-word-problems',
        'data-statistics',
        'geometry-triangles',
        'geometry-trigonometry',
        'strategy-time-management'
      ],
      createdAt: '2025-03-15T12:00:00Z'
    },
    {
      id: 'application-path',
      courseId: 'digital-sat-math',
      name: 'Problem-Solving Focus',
      description: 'Emphasis on application and test-like problems',
      type: 'application',
      difficulty: 'intermediate',
      estimatedTotalTime: 900, // 15 hours
      nodeSequence: [
        'algebra-linear-equations',
        'algebra-quadratic-equations',
        'problem-solving-word-problems',
        'problem-solving-rates',
        'advanced-polynomials',
        'data-statistics',
        'data-graphs',
        'geometry-triangles',
        'strategy-calculator',
        'strategy-time-management'
      ],
      createdAt: '2025-03-15T12:00:00Z'
    }
  ]
};

// Mock user progress through the knowledge graph
export const mockUserKnowledgeGraphProgress: KnowledgeGraphProgress = {
  userId: 'user123',
  courseId: 'digital-sat-math',
  completedNodes: [
    'algebra-linear-equations',
    'algebra-inequalities',
    'algebra-quadratic-equations',
    'algebra-systems',
    'advanced-exponents',
    'problem-solving-word-problems'
  ],
  currentPathId: 'comprehensive-path',
  pathProgress: {
    pathId: 'comprehensive-path',
    currentNodeIndex: 6,
    completedNodes: [
      'algebra-linear-equations',
      'algebra-inequalities',
      'algebra-quadratic-equations',
      'algebra-systems',
      'advanced-exponents',
      'problem-solving-word-problems'
    ],
    startedAt: '2025-04-01T10:00:00Z',
    lastAccessedAt: '2025-04-15T15:30:00Z'
  },
  recommendedNextNodes: [
    'advanced-polynomials',
    'problem-solving-rates'
  ]
};
