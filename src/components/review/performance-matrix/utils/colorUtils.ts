'use client'

/**
 * Utility functions for calculating colors based on performance metrics
 */

/**
 * Get the CSS class for the text color based on accuracy
 */
export const getTextColor = (accuracy: number, count: number): string => {
  if (count === 0) return 'text-slate-400 dark:text-slate-500'
  
  if (accuracy < 60) {
    return 'text-rose-600 dark:text-rose-400'
  } else if (accuracy < 80) {
    return 'text-amber-600 dark:text-amber-400'
  } else {
    return 'text-emerald-600 dark:text-emerald-400'
  }
}

/**
 * Get the CSS class for the progress bar color based on accuracy
 */
export const getProgressBarColor = (accuracy: number): string => {
  if (accuracy < 60) {
    return 'bg-rose-500 dark:bg-rose-600'
  } else if (accuracy < 80) {
    return 'bg-amber-500 dark:bg-amber-600'
  } else {
    return 'bg-emerald-500 dark:bg-emerald-600'
  }
}

/**
 * Get the CSS class for the cell background color based on accuracy
 */
export const getCellBackgroundColor = (accuracy: number, count: number): string => {
  if (count === 0) return 'bg-slate-50 dark:bg-slate-800/30'
  
  if (accuracy < 60) {
    return 'bg-rose-50 dark:bg-rose-900/20'
  } else if (accuracy < 80) {
    return 'bg-amber-50 dark:bg-amber-900/20'
  } else {
    return 'bg-emerald-50 dark:bg-emerald-900/20'
  }
}

/**
 * Get the CSS class for the cell border color based on accuracy
 */
export const getCellBorderColor = (accuracy: number, count: number): string => {
  if (count === 0) return 'border-slate-200 dark:border-slate-700'
  
  if (accuracy < 60) {
    return 'border-rose-200 dark:border-rose-800/50'
  } else if (accuracy < 80) {
    return 'border-amber-200 dark:border-amber-800/50'
  } else {
    return 'border-emerald-200 dark:border-emerald-800/50'
  }
}

/**
 * Get the CSS class for the badge color based on performance level
 */
export const getPerformanceBadgeColor = (performance: 'low' | 'medium' | 'high' | null): string => {
  if (performance === 'low') {
    return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300'
  } else if (performance === 'medium') {
    return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
  } else if (performance === 'high') {
    return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
  } else {
    return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
  }
}

/**
 * Get the human-readable label for the performance level
 */
export const getPerformanceLabel = (performance: 'low' | 'medium' | 'high' | null): string => {
  if (performance === 'low') {
    return 'Low (0-59%)'
  } else if (performance === 'medium') {
    return 'Medium (60-79%)'
  } else if (performance === 'high') {
    return 'High (80-100%)'
  } else {
    return 'All Performance Levels'
  }
}
