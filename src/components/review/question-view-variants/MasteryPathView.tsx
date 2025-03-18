'use client'

import { useState } from 'react'
import { QuestionViewProps } from './types'

/**
 * MasteryPathView - Learning path visualization showing progression toward topic mastery
 * Maps questions along a journey from novice to mastery with visual path indicators
 */
export function MasteryPathView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // State for filtering and options
  const [selectedSubject, setSelectedSubject] = useState<string | 'all'>('all')
  const [selectedTopic, setSelectedTopic] = useState<string | 'all'>('all')
  const [viewMode, setViewMode] = useState<'topics' | 'overall'>('topics')
  
  // Extract all questions with metadata
  const allQuestions = practiceSets.flatMap(set => 
    set.questions.map(q => ({ 
      ...q, 
      setId: set.id,
      subject: set.subject,
      type: set.type,
      accuracy: set.accuracy,
      dateCompleted: set.dateCompleted
    }))
  )
  
  // Get all available subjects and topics for filtering
  const subjects = Array.from(new Set(practiceSets.map(set => set.subject)))
  const topics = Array.from(new Set(allQuestions.map(q => q.topic)))
  
  // Filter questions by selected subject and topic
  const filteredQuestions = allQuestions
    .filter(q => selectedSubject === 'all' || q.subject === selectedSubject)
    .filter(q => selectedTopic === 'all' || q.topic === selectedTopic)
  
  // Group questions by topic
  const questionsByTopic = filteredQuestions.reduce((acc, question) => {
    if (!acc[question.topic]) {
      acc[question.topic] = []
    }
    acc[question.topic].push(question)
    return acc
  }, {} as Record<string, typeof filteredQuestions>)
  
  // Calculate mastery levels for each topic
  const topicMasteryLevels = Object.entries(questionsByTopic).map(([topic, questions]) => {
    // Calculate accuracy for the topic
    const correct = questions.filter(q => q.correct).length
    const accuracy = questions.length > 0 ? (correct / questions.length) * 100 : 0
    
    // Calculate average time per question (efficiency)
    const avgTime = questions.reduce((sum, q) => sum + q.timeSpent, 0) / questions.length
    
    // Calculate a mastery score based on accuracy and time (0-100)
    let masteryScore = 0
    if (questions.length > 0) {
      masteryScore = (accuracy * 0.7) + // 70% weight to accuracy
                   (Math.max(0, 100 - (avgTime * 0.5)) * 0.3) // 30% weight to speed
    }
    
    // Determine mastery level (1-4)
    // 1: Novice (0-25), 2: Intermediate (25-50), 3: Advanced (50-75), 4: Master (75-100)
    const masteryLevel = masteryScore < 25 ? 1 : 
                         masteryScore < 50 ? 2 :
                         masteryScore < 75 ? 3 : 4
    
    return {
      topic,
      questions,
      accuracy,
      avgTime,
      masteryScore,
      masteryLevel
    }
  }).sort((a, b) => b.masteryScore - a.masteryScore) // Sort by mastery score (highest first)
  
  // Calculate overall mastery
  const overallAccuracy = filteredQuestions.length > 0 
    ? (filteredQuestions.filter(q => q.correct).length / filteredQuestions.length) * 100 
    : 0
  
  const overallMasteryScore = topicMasteryLevels.length > 0
    ? topicMasteryLevels.reduce((sum, topic) => sum + topic.masteryScore, 0) / topicMasteryLevels.length
    : 0
  
  // Get mastery level labels
  const getMasteryLevelName = (level: number) => {
    switch(level) {
      case 1: return 'Novice'
      case 2: return 'Intermediate'
      case 3: return 'Advanced'
      case 4: return 'Master'
      default: return 'Unrated'
    }
  }
  
  // Get color for mastery level
  const getMasteryLevelColor = (level: number) => {
    switch(level) {
      case 1: return 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'
      case 2: return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20'
      case 3: return 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/20'
      case 4: return 'text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/20'
      default: return 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'
    }
  }
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">19. Mastery Path View</h3>
      
      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        {/* Subject filter */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Subject</label>
          <select 
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value)
              setSelectedTopic('all') // Reset topic when subject changes
            }}
          >
            <option value="all">All Subjects</option>
            {subjects.map((subject, i) => (
              <option key={i} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        
        {/* Topic filter */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Topic</label>
          <select 
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            <option value="all">All Topics</option>
            {topics
              .filter(topic => selectedSubject === 'all' || 
                allQuestions.some(q => q.topic === topic && q.subject === selectedSubject))
              .map((topic, i) => (
                <option key={i} value={topic}>{topic}</option>
              ))
            }
          </select>
        </div>
        
        {/* View mode */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">View Mode</label>
          <div className="flex bg-slate-100 dark:bg-slate-700 rounded-md overflow-hidden border border-slate-200 dark:border-slate-600">
            <button 
              className={`px-3 py-1 text-xs font-medium transition-colors ${
                viewMode === 'topics' 
                  ? 'bg-indigo-500 text-white' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
              onClick={() => setViewMode('topics')}
            >
              By Topic
            </button>
            <button 
              className={`px-3 py-1 text-xs font-medium transition-colors ${
                viewMode === 'overall' 
                  ? 'bg-indigo-500 text-white' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
              onClick={() => setViewMode('overall')}
            >
              Overall Progress
            </button>
          </div>
        </div>
      </div>
      
      {/* Content based on view mode */}
      {viewMode === 'topics' ? (
        <div className="space-y-4">
          {topicMasteryLevels.length > 0 ? (
            topicMasteryLevels.map((topicData, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                {/* Topic header */}
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">{topicData.topic}</h4>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {topicData.questions.length} question{topicData.questions.length !== 1 ? 's' : ''}
                  </div>
                </div>
                
                {/* Mastery path visualization */}
                <div className="mb-4 relative">
                  {/* Path line */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-700 -translate-y-1/2"></div>
                  
                  {/* Mastery level steps */}
                  <div className="relative flex justify-between items-center">
                    {[1, 2, 3, 4].map(level => {
                      const isCompleted = topicData.masteryLevel >= level
                      const isCurrentLevel = topicData.masteryLevel === level
                      
                      return (
                        <div key={level} className="flex flex-col items-center z-10">
                          {/* Mastery circle */}
                          <div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                              isCompleted 
                                ? `${getMasteryLevelColor(level)} border-0` 
                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                            } relative`}
                          >
                            {/* Level number */}
                            <span className={`text-base font-bold ${
                              isCompleted ? '' : 'text-slate-300 dark:text-slate-600'
                            }`}>
                              {level}
                            </span>
                            
                            {/* Current level indicator */}
                            {isCurrentLevel && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full text-white text-xs flex items-center justify-center">
                                ▶
                              </div>
                            )}
                          </div>
                          
                          {/* Level label */}
                          <div className="mt-2 text-xs font-medium text-center text-slate-700 dark:text-slate-300">
                            {getMasteryLevelName(level)}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                
                {/* Progress details */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg text-sm">
                  <div className="mb-2">
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 dark:bg-indigo-600" 
                        style={{ width: `${topicData.masteryScore}%` }}
                      ></div>
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Mastery Score: {topicData.masteryScore.toFixed(1)}%</span>
                      <span>Accuracy: {topicData.accuracy.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
                
                {/* Questions preview */}
                <div className="mt-3 space-y-2">
                  {topicData.questions.slice(0, 2).map((question, qIndex) => (
                    <div 
                      key={qIndex}
                      className={`p-2 rounded-lg border text-xs ${
                        selectedSetId === question.setId 
                          ? 'border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20' 
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                      } cursor-pointer`}
                      onClick={() => onSelectSet && onSelectSet(question.setId)}
                    >
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 w-4 h-4 rounded-full mr-2 mt-0.5 ${
                          question.correct 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                            : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        } flex items-center justify-center text-[10px]`}>
                          {question.correct ? '✓' : '✗'}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium mb-0.5">{question.subtopic}</div>
                          <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
                            <span>Difficulty: {question.difficulty}</span>
                            <span>{question.timeSpent}s</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              No data available for the selected filters.
              {selectedSubject !== 'all' || selectedTopic !== 'all' ? (
                <div className="mt-2">
                  <button 
                    className="text-indigo-500 dark:text-indigo-400 hover:underline text-sm"
                    onClick={() => {
                      setSelectedSubject('all')
                      setSelectedTopic('all')
                    }}
                  >
                    Reset filters
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      ) : (
        /* Overall mastery view */
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <h4 className="font-medium mb-4 text-center">Overall Mastery Progress</h4>
          
          {/* Overall score */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 rounded-full border-4 border-indigo-300 dark:border-indigo-700 flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/20 relative">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center z-10">
                <div>
                  <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{overallMasteryScore.toFixed(0)}%</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Mastery</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mastery level distribution */}
          <div className="mb-6">
            <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Mastery Level Distribution</h5>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(level => {
                const topicsCount = topicMasteryLevels.filter(t => t.masteryLevel === level).length
                
                return (
                  <div key={level} className="text-center">
                    <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${getMasteryLevelColor(level)}`}>
                      <span className="text-base font-bold">
                        {level}
                      </span>
                    </div>
                    <div className="mt-1 text-xs font-medium">
                      {getMasteryLevelName(level)}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {topicsCount} topic{topicsCount !== 1 ? 's' : ''}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                {topicMasteryLevels.length}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Topics Studied
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {filteredQuestions.length}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Questions Answered
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
                {overallAccuracy.toFixed(1)}%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Overall Accuracy
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-sky-600 dark:text-sky-400">
                {topicMasteryLevels.filter(t => t.masteryLevel === 4).length}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Mastered Topics
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Instructions */}
      <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 text-center">
        <p>Track your mastery progression through different topics. See which areas need more practice.</p>
      </div>
    </div>
  )
}
