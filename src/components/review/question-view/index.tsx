import React, { useState, useEffect } from 'react'
import { QuestionViewProps, FilterState, ErrorPattern, GroupByOption, QuestionWithMetadata } from './types'
import { extractQuestionsWithMetadata, analyzeErrorPatterns, groupQuestions } from './utils'
import { ErrorPatternFilter } from './ErrorPatternFilter'
import { GroupBySelector } from './GroupBySelector'
import { QuickFilters } from './QuickFilters'
import { EmptyState } from './EmptyState'
import { IndividualQuestionView } from './IndividualQuestionView'

export const QuestionView: React.FC<QuestionViewProps> = ({ 
  practiceSets,
  onSelectSet,
  selectedSetId
}) => {
  // Extract all questions from practice sets with metadata
  const [allQuestions, setAllQuestions] = useState<QuestionWithMetadata[]>([])
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionWithMetadata[]>([])
  
  // Process questions when practiceSets change
  useEffect(() => {
    const questions = extractQuestionsWithMetadata(practiceSets)
    setAllQuestions(questions)
    setFilteredQuestions(questions)
    console.log('Extracted questions count:', questions.length)
  }, [practiceSets])
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
        Questions ({filteredQuestions.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQuestions.map((question) => (
          <div
            key={question.id}
            className="p-4 rounded-lg border border-slate-200 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-700"
          >
            <div className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
              {question.topic}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {question.subject} • {question.difficulty}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export * from './types'
