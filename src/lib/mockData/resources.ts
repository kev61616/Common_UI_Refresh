import { Resource } from '@/types/course';

/**
 * Mock resources for Digital SAT lessons
 */
const mockResources: Record<string, Resource> = {
  'res-sat-guide': {
    id: 'res-sat-guide',
    title: 'Digital SAT Official Guide',
    type: 'pdf',
    url: '#',
    description: 'The official College Board guide to the Digital SAT with format explanations and practice questions.',
    isRequired: true,
    category: 'reference',
  },
  'res-math-formulas': {
    id: 'res-math-formulas',
    title: 'Essential Math Formulas Sheet',
    type: 'pdf',
    url: '#',
    description: 'Comprehensive list of all math formulas needed for the Digital SAT Math section.',
    category: 'reference',
  },
  'res-reading-strategies': {
    id: 'res-reading-strategies',
    title: 'Reading Strategies Cheatsheet',
    type: 'pdf',
    url: '#',
    description: 'Quick reference for effective reading strategies tailored to the Digital SAT format.',
    category: 'reference',
  },
  'res-practice-platform': {
    id: 'res-practice-platform',
    title: 'Digital SAT Practice Platform',
    type: 'link',
    url: '#',
    description: 'Interactive platform with additional practice questions in the exact Digital SAT format.',
    category: 'tool',
  },
  'res-calculator-guide': {
    id: 'res-calculator-guide',
    title: 'Graphing Calculator Tutorial',
    type: 'video',
    url: '#',
    description: 'Video tutorial on using the graphing calculator effectively for the Digital SAT Math section.',
    category: 'example',
  },
  'res-vocab-list': {
    id: 'res-vocab-list',
    title: 'High-Frequency Vocabulary List',
    type: 'pdf',
    url: '#',
    description: '500 words commonly tested on the Digital SAT Reading & Writing section with definitions and example sentences.',
    category: 'reference',
  },
  'res-grammar-rules': {
    id: 'res-grammar-rules',
    title: 'Grammar Rules Summary',
    type: 'pdf',
    url: '#',
    description: 'Concise summary of grammar rules frequently tested on the Digital SAT.',
    category: 'reference',
  },
  'res-data-analysis': {
    id: 'res-data-analysis',
    title: 'Data Analysis & Statistics Guide',
    type: 'pdf',
    url: '#',
    description: 'Guide to understanding data presentations and statistical concepts tested on the Digital SAT.',
    category: 'reference',
  },
  'res-practice-tests': {
    id: 'res-practice-tests',
    title: 'Digital SAT Practice Tests',
    type: 'link',
    url: '#',
    description: 'Collection of official practice tests in the Digital SAT format.',
    category: 'additional',
    isRequired: true,
  },
  'res-study-plan': {
    id: 'res-study-plan',
    title: '8-Week Digital SAT Study Plan',
    type: 'pdf',
    url: '#',
    description: 'Detailed study plan with daily assignments to prepare for the Digital SAT in 8 weeks.',
    category: 'tool',
  },
};

export default mockResources;
