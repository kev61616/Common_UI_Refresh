'use client'

import { PracticeSet } from '@/lib/mockData'
import { QuestionViewProps as ParentQuestionViewProps } from '../types'

/**
 * Re-export the QuestionViewProps interface from the parent types
 * This allows each variant to potentially extend the base props if needed
 */
export type QuestionViewProps = ParentQuestionViewProps
