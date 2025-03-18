import React, { useState, useEffect } from 'react'
import { QuestionViewProps, FilterState, ErrorPattern, GroupByOption, QuestionWithMetadata } from './types'
import { extractQuestionsWithMetadata, analyzeErrorPatterns, groupQuestions } from './utils'
import { ErrorPatternFilter } from './ErrorPatternFilter'
import { GroupBySelector } from './GroupBySelector'
import { QuickFilters } from './QuickFilters'
import { EmptyState } from './EmptyState'

export const QuestionView: React.FC<QuestionViewProps> = ({ 
  practiceSets,
  onSelectSet,
  selectedSetId
}) => {
  // Extract all questions from practice sets with metadata
  const [allQuestions, setAllQuestions] = useState<QuestionWithMetadata[]>([])
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionWithMetadata[]>([])
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    subjects: ['Reading', 'Writing', 'Math'],
    difficulties: ['Easy', 'Medium', 'Hard'],
    status: ['correct', 'incorrect'],
    topics: []
  })
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([])
  const [groupBy, setGroupBy] = useState<GroupByOption>('topic')
  const [currentPage, setCurrentPage] = useState(1)
  const [allTopics, setAllTopics] = useState<string[]>([])
  const [errorPatterns, setErrorPatterns] = useState<ErrorPattern[]>([])
  const itemsPerPage = 12
  
  // Process questions when practiceSets change
  useEffect(() => {
    const questions = extractQuestionsWithMetadata(practiceSets)
    setAllQuestions(questions)
    
    // Collect all unique topics
    const topics = new Set<string>()
    questions.forEach(q => topics.add(q.topic))
    setAllTopics(Array.from(topics))
    
    // Analyze error patterns
    setErrorPatterns(analyzeErrorPatterns(questions))
  }, [practiceSets])
  
  // Apply filters
  useEffect(() => {
    let result = [...allQuestions]
    
    // Filter by subject
    if (activeFilters.subjects.length) {
      result = result.filter(q => activeFilters.subjects.includes(q.setSubject))
    }
    
    // Filter by difficulty
    if (activeFilters.difficulties.length) {
      result = result.filter(q => activeFilters.difficulties.includes(q.difficulty))
    }
    
    // Filter by correctness status
    if (activeFilters.status.length) {
      result = result.filter(q => 
        (activeFilters.status.includes('correct') && q.correct) ||
        (activeFilters.status.includes('incorrect') && !q.correct)
      )
    }
    
    // Filter by topics
    if (activeFilters.topics.length) {
      result = result.filter(q => activeFilters.topics.includes(q.topic))
    }
    
    // Filter by selected patterns
    if (selectedPatterns.length) {
      if (selectedPatterns.includes('conceptual-misunderstanding')) {
        result = result.filter(q => !q.correct && q.topic.includes('Concepts'))
      }
      if (selectedPatterns.includes('calculation-errors')) {
        result = result.filter(q => !q.correct && q.topic.includes('Algebra'))
      }
      if (selectedPatterns.includes('analysis-gaps')) {
        result = result.filter(q => !q.correct && q.topic.includes('Analysis'))
      }
      if (selectedPatterns.includes('grammar-confusion')) {
        result = result.filter(q => !q.correct && q.topic.includes('Grammar'))
      }
    }
    
    setFilteredQuestions(result)
    // Reset to first page when filters change
    setCurrentPage(1)
  }, [allQuestions, activeFilters, selectedPatterns])
  
  // Handler functions
  const togglePattern = (pattern: string) => {
    if (selectedPatterns.includes(pattern)) {
      setSelectedPatterns(selectedPatterns.filter(p => p !== pattern))
    } else {
      setSelectedPatterns([...selectedPatterns, pattern])
    }
  }
  
  const toggleSubjectFilter = (subject: string) => {
    if (activeFilters.subjects.includes(subject)) {
      if (activeFilters.subjects.length > 1) { // Don't remove last subject
        setActiveFilters({
          ...activeFilters,
          subjects: activeFilters.subjects.filter(s => s !== subject)
        })
      }
    } else {
      setActiveFilters({
        ...activeFilters,
        subjects: [...activeFilters.subjects, subject]
      })
    }
  }
  
  const toggleDifficultyFilter = (difficulty: string) => {
    if (activeFilters.difficulties.includes(difficulty)) {
      if (activeFilters.difficulties.length > 1) { // Don't remove last difficulty
        setActiveFilters({
          ...activeFilters,
          difficulties: activeFilters.difficulties.filter(d => d !== difficulty)
        })
      }
    } else {
      setActiveFilters({
        ...activeFilters,
        difficulties: [...activeFilters.difficulties, difficulty]
      })
    }
  }
  
  const toggleStatusFilter = (status: 'correct' | 'incorrect') => {
    if (activeFilters.status.includes(status)) {
      if (activeFilters.status.length > 1) { // Don't remove last status
        setActiveFilters({
          ...activeFilters,
          status: activeFilters.status.filter(s => s !== status)
        })
      }
    } else {
      setActiveFilters({
        ...activeFilters,
        status: [...activeFilters.status, status]
      })
    }
  }
  
  const resetFilters = () => {
    setActiveFilters({
      subjects: ['Reading', 'Writing', 'Math'],
      difficulties: ['Easy', 'Medium', 'Hard'],
      status: ['correct', 'incorrect'],
      topics: []
    })
    setSelectedPatterns([])
  }
  
  // Get grouped and paginated questions
  const groupedQuestionsData = groupQuestions(filteredQuestions, groupBy)
  const totalPages = Math.ceil(groupedQuestionsData.length / itemsPerPage)
  const paginatedGroups = groupedQuestionsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  
  // No results case
  if (filteredQuestions.length === 0) {
    return <EmptyState resetFilters={resetFilters} />
  }
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-md border border-slate-100 p-5 dark:from-slate-800/80 dark:to-slate-800/40 dark:border-slate-700/50">
        {/* Top Controls: Filters and Grouping */}
        <div className="flex flex-col md:flex-row gap-5 justify-between">
          {/* Left side - Error pattern selector */}
          <ErrorPatternFilter 
            errorPatterns={errorPatterns} 
            selectedPatterns={selectedPatterns} 
            togglePattern={togglePattern} 
          />
          
          {/* Right side - Display controls */}
          <GroupBySelector groupBy={groupBy} setGroupBy={setGroupBy} />
        </div>
        
        {/* Bottom Controls: Quick Filters */}
        <QuickFilters 
          activeFilters={activeFilters}
          toggleSubjectFilter={toggleSubjectFilter}
          toggleDifficultyFilter={toggleDifficultyFilter}
          toggleStatusFilter={toggleStatusFilter}
        />
      </div>
      
      {/* Questions display - For now just showing basic stats */}
      <div className="bg-white p-5 rounded-xl shadow-md border border-slate-100 dark:bg-slate-800 dark:border-slate-700/50">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
          Questions ({filteredQuestions.length})
        </h2>
        
        {/* Grouped questions display */}
        <div className="space-y-8">
          {paginatedGroups.map((group) => (
            <div key={group.groupName} className="space-y-4">
              <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 pb-2">
                {group.groupName} ({group.questions.length} questions)
              </h3>
              
              {/* Placeholder for actual question cards - will be implemented in a future component */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.questions.slice(0, 6).map((question) => (
                  <div 
                    key={question.id} 
                    className="p-4 rounded-lg border border-slate-200 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-700"
                  >
                    <div className="flex justify-between mb-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${question.correct ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
                        {question.correct ? 'Correct' : 'Incorrect'}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {question.timeSpent}s spent
                      </span>
                    </div>
                    <div className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
                      {question.topic} question
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex gap-2">
                      <span>{question.setSubject}</span>
                      <span>•</span>
                      <span>{question.difficulty}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {group.questions.length > 6 && (
                <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                  {group.questions.length - 6} more questions...
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="inline-flex rounded-full shadow-lg overflow-hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-3 py-2 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    currentPage === page
                      ? 'bg-sky-500 text-white shadow-inner'
                      : 'bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-3 py-2 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}

export * from './types'
