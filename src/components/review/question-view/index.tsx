import React, { useState, useEffect, useMemo } from 'react'
import { QuestionViewProps, FilterState, ErrorPattern, GroupByOption, QuestionWithMetadata } from './types'
import { extractQuestionsWithMetadata, analyzeErrorPatterns, groupQuestions, isTopicValidForSubject } from './utils'
import { ErrorPatternFilter } from './ErrorPatternFilter'
import { GroupBySelector } from './GroupBySelector'
import { QuickFilters } from './QuickFilters'
import { EmptyState } from './EmptyState'
import { IndividualQuestionView } from './IndividualQuestionView'
import { FilterDropdown } from './FilterDropdown'
import { EmptyMatrixCell } from './EmptyMatrixCell'
import { readingTopics, writingTopics, mathTopics } from '@/lib/mockData'

export const QuestionView: React.FC<QuestionViewProps> = ({ 
  practiceSets,
  onSelectSet,
  selectedSetId
}) => {
  // State for all filters
  const [allQuestions, setAllQuestions] = useState<QuestionWithMetadata[]>([])
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionWithMetadata[]>([])
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  
  // Process questions when practiceSets change
  useEffect(() => {
    const questions = extractQuestionsWithMetadata(practiceSets)
    setAllQuestions(questions)
    setFilteredQuestions(questions)
    console.log('Extracted questions count:', questions.length)
  }, [practiceSets])
  
  // Apply all filtering
  useEffect(() => {
    let filtered = [...allQuestions];
    
    // Apply subject filter
    if (selectedSubject) {
      filtered = filtered.filter(question => 
        // Include questions where original subject is the selected subject AND it has a valid relationship
        (question.originalSubject === selectedSubject && question.hasValidTopicSubjectRelation === true) ||
        // OR include questions that were corrected to match this subject
        (question.subject === selectedSubject && question.hasSubjectCorrected === true)
      );
    }
    
    // Apply difficulty filter
    if (selectedDifficulties.length > 0) {
      filtered = filtered.filter(question => 
        selectedDifficulties.includes(question.difficulty)
      );
    }
    
    // Apply status filter
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(question => {
        if (selectedStatuses.includes('Not Attempted') && !question.answered) {
          return true;
        }
        if (selectedStatuses.includes('Correct') && question.answered && question.correct) {
          return true;
        }
        if (selectedStatuses.includes('Incorrect') && question.answered && !question.correct) {
          return true;
        }
        return false;
      });
    }
    
    setFilteredQuestions(filtered);
  }, [allQuestions, selectedSubject, selectedDifficulties, selectedStatuses]);
  
  // Get unique subjects and topics for creating the matrix
  const subjects = Array.from(new Set(allQuestions.map(q => q.subject))).sort();

  // Create a matrix of all possible subject-topic combinations
  const allPossibleCombinations = useMemo(() => {
    const combinations: { subject: string; topic: string }[] = [];
    
    // Add all possible combinations
    subjects.forEach(subject => {
      let topicList: string[] = [];
      
      switch (subject) {
        case 'Math':
          topicList = mathTopics;
          break;
        case 'Reading':
          topicList = readingTopics;
          break;
        case 'Writing':
          topicList = writingTopics;
          break;
      }
      
      topicList.forEach(topic => {
        combinations.push({ subject, topic });
      });
    });
    
    return combinations;
  }, [subjects]);
  
  // Find combinations that don't have any questions
  const getQuestionsForCombination = (subject: string, topic: string) => {
    return filteredQuestions.filter(q => q.subject === subject && q.topic === topic);
  };

  // Track displayed topic-subject combinations to avoid duplication
  const displayedCombinations = new Set<string>();
  
  return (
    <div className="space-y-4">
      {/* Header and Filters */}
      <div className="flex justify-between flex-wrap gap-3 mb-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Questions ({filteredQuestions.length})
        </h2>
        
        {/* Filter Controls */}
        <div className="flex space-x-2 flex-wrap">
          {/* Subject Filter */}
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedSubject(null)}
              className={`px-4 py-2 text-sm rounded-md transition ${
                selectedSubject === null 
                  ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-800' 
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600'
              }`}
            >
              All
            </button>
            {subjects.map(subject => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`px-4 py-2 text-sm rounded-md transition ${
                  selectedSubject === subject
                    ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-800' 
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600'
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
          
          {/* Difficulty Filter Dropdown */}
          <FilterDropdown
            label="Difficulty"
            options={[
              { id: 'Easy', label: 'Easy' },
              { id: 'Medium', label: 'Medium' },
              { id: 'Hard', label: 'Hard' }
            ]}
            selectedOptions={selectedDifficulties}
            onChange={setSelectedDifficulties}
          />
          
          {/* Status Filter Dropdown */}
          <FilterDropdown
            label="Status"
            options={[
              { id: 'Not Attempted', label: 'Not Attempted' },
              { id: 'Correct', label: 'Correct' },
              { id: 'Incorrect', label: 'Incorrect' }
            ]}
            selectedOptions={selectedStatuses}
            onChange={setSelectedStatuses}
          />
        </div>
      </div>
      {/* Column Headers */}
      <div className="grid grid-cols-6 gap-4 mb-2 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">
        <div>Subject</div>
        <div className="col-span-2">Topic</div>
        <div>Difficulty</div>
        <div>Status</div>
        <div>Actions</div>
      </div>
      
      {/* Question rows - handle both active and empty cells */}
      <div className="space-y-2">
        {/* First show all combinations with questions */}
        {filteredQuestions.map((question) => {
          // Track this combination as displayed
          displayedCombinations.add(`${question.subject}-${question.topic}`);
          
          return (
            <div
              key={question.id}
              className={`p-4 rounded-lg border grid grid-cols-6 items-center gap-4 ${
                // Add a visual indicator for questions with corrected subjects when no filter is applied
                !selectedSubject && question.hasSubjectCorrected === true
                  ? 'border-amber-300 bg-amber-50/30 dark:border-amber-700 dark:bg-amber-900/20'
                  : 'border-slate-200 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-700'
              }`}
            >
              {/* Subject Column */}
              <div>
                <span className="px-2 py-1 text-xs rounded-md bg-opacity-50 font-medium" 
                  style={{
                    backgroundColor: question.subject === 'Math' ? 'rgba(99, 102, 241, 0.1)' : 
                                    question.subject === 'Reading' ? 'rgba(16, 185, 129, 0.1)' : 
                                    'rgba(245, 158, 11, 0.1)',
                    color: question.subject === 'Math' ? 'rgb(99, 102, 241)' : 
                          question.subject === 'Reading' ? 'rgb(16, 185, 129)' : 
                          'rgb(245, 158, 11)'
                  }}>
                  {question.subject}
                </span>
                
                {/* Indicator for questions with corrected subjects */}
                {!selectedSubject && question.hasSubjectCorrected === true && (
                  <div className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                    (From: {question.originalSubject})
                  </div>
                )}
              </div>
              
              {/* Topic Column */}
              <div className="col-span-2 text-sm font-medium text-slate-800 dark:text-slate-200">
                {question.topic}
              </div>
              
              {/* Difficulty Column */}
              <div>
                <span className={`px-2 py-1 text-xs rounded-md ${
                  question.difficulty === 'Easy' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
                    : question.difficulty === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                }`}>
                  {question.difficulty}
                </span>
              </div>
              
              {/* Status Column */}
              <div>
                <span className={`px-2 py-1 text-xs rounded-md ${
                  !question.answered
                    ? 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                    : question.correct
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                }`}>
                  {!question.answered 
                    ? 'Not Attempted' 
                    : question.correct 
                      ? 'Correct' 
                      : 'Incorrect'}
                </span>
              </div>
              
              {/* Actions Column */}
              <div className="flex space-x-2">
                <button 
                  className="px-3 py-1 text-xs rounded-md bg-sky-100 text-sky-700 hover:bg-sky-200 dark:bg-sky-900/20 dark:text-sky-300 dark:hover:bg-sky-800/30 transition-colors"
                >
                  Practice
                </button>
                
                {/* Challenge icon - click to move to next level of mastery */}
                <button
                  title="Challenge to move to next level of mastery"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200 text-amber-600 hover:from-amber-200 hover:to-amber-300 dark:from-amber-900/30 dark:to-amber-800/30 dark:text-amber-300 dark:hover:from-amber-800/40 dark:hover:to-amber-700/40 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 stroke-2" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
        
        {/* Now add empty cells for combinations without questions */}
        {allPossibleCombinations.map(combination => {
          const combinationKey = `${combination.subject}-${combination.topic}`;
          
          // Only render empty cells for combinations that don't already have questions displayed
          if (!displayedCombinations.has(combinationKey) && 
              // Only show empty cells for selected subject or all subjects if none selected
              (!selectedSubject || combination.subject === selectedSubject) &&
              // Apply difficulty filter if active
              (selectedDifficulties.length === 0 || true) &&
              // For status filter, empty cells are considered "Not Attempted"
              (selectedStatuses.length === 0 || selectedStatuses.includes('Not Attempted'))
          ) {
            return (
              <EmptyMatrixCell 
                key={`empty-${combinationKey}`}
                subject={combination.subject}
                topic={combination.topic}
              />
            );
          }
          
          return null;
        })}
      </div>
    </div>
  )
}

export * from './types'
