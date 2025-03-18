'use client'

import React from 'react'
import { QuestionViewProps } from './types'
import { EnhancedMatrixGrid } from '../enhanced-matrix/components/EnhancedMatrixGrid'

/**
 * Enhanced Matrix Grid View for the By Question tab
 * 
 * A fully-featured matrix view that organizes questions by topic and difficulty
 * with comprehensive filtering capabilities
 */
export function EnhancedMatrixGridView(props: QuestionViewProps) {
  return <EnhancedMatrixGrid {...props} />
}
