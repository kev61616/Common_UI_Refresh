'use client'

/**
 * Defines the mastery levels and their visual styling for the board view
 */
export const masteryLevels = [
  { 
    id: 'very-weak', 
    name: 'Very Weak', 
    description: '2x+ incorrect',
    color: 'bg-red-100 dark:bg-red-900/20',
    borderColor: 'border-red-300 dark:border-red-700',
    titleColor: 'text-red-800 dark:text-red-400',
    headerBg: 'bg-red-50 dark:bg-red-900/10',
    iconBg: 'bg-red-500',
    scoreRange: { min: 0, max: 0.17 }
  },
  { 
    id: 'weak', 
    name: 'Weak', 
    description: '1x incorrect',
    color: 'bg-orange-100 dark:bg-orange-900/20',
    borderColor: 'border-orange-300 dark:border-orange-700',
    titleColor: 'text-orange-800 dark:text-orange-400',
    headerBg: 'bg-orange-50 dark:bg-orange-900/10',
    iconBg: 'bg-orange-500',
    scoreRange: { min: 0.17, max: 0.34 }
  },
  { 
    id: 'not-attempted', 
    name: 'Not Attempted', 
    description: '0x attempted',
    color: 'bg-gray-100 dark:bg-gray-800/40',
    borderColor: 'border-gray-300 dark:border-gray-700',
    titleColor: 'text-gray-800 dark:text-gray-400',
    headerBg: 'bg-gray-50 dark:bg-gray-800/20',
    iconBg: 'bg-gray-500',
    scoreRange: { min: 0.34, max: 0.5 }
  },
  { 
    id: 'emerging', 
    name: 'Emerging', 
    description: '1x correct',
    color: 'bg-yellow-100 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-300 dark:border-yellow-700',
    titleColor: 'text-yellow-800 dark:text-yellow-400',
    headerBg: 'bg-yellow-50 dark:bg-yellow-900/10',
    iconBg: 'bg-yellow-500',
    scoreRange: { min: 0.5, max: 0.67 }
  },
  { 
    id: 'proficient', 
    name: 'Proficient', 
    description: '2x correct',
    color: 'bg-blue-100 dark:bg-blue-900/20',
    borderColor: 'border-blue-300 dark:border-blue-700',
    titleColor: 'text-blue-800 dark:text-blue-400',
    headerBg: 'bg-blue-50 dark:bg-blue-900/10',
    iconBg: 'bg-blue-500',
    scoreRange: { min: 0.67, max: 0.84 }
  },
  { 
    id: 'mastered', 
    name: 'Mastered', 
    description: '3x+ correct',
    color: 'bg-green-100 dark:bg-green-900/20',
    borderColor: 'border-green-300 dark:border-green-700',
    titleColor: 'text-green-800 dark:text-green-400',
    headerBg: 'bg-green-50 dark:bg-green-900/10',
    iconBg: 'bg-green-500',
    scoreRange: { min: 0.84, max: 1 }
  }
];
