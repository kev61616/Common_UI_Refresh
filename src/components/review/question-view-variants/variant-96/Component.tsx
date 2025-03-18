'use client'

import React, { useState } from 'react'
import { QuestionViewProps } from '../types'

/**
 * Interactive Learning Map
 * 
 * A 3D interactive map visualization showing questions as landmarks
 * in a learning landscape based on their relationships and categories.
 */
export function Component({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  const [hoveredSetId, setHoveredSetId] = useState<string | null>(null)

  // Flatten all questions from all practice sets
  const allQuestions = practiceSets.flatMap(set => 
    set.questions.map(q => ({
      ...q,
      setId: set.id,
      setType: set.type,
      setSubject: set.subject,
      setAccuracy: set.accuracy
    }))
  );

  // Group questions by topic
  const questionsByTopic: Record<string, typeof allQuestions> = {}
  
  allQuestions.forEach((question) => {
    if (!questionsByTopic[question.topic]) {
      questionsByTopic[question.topic] = []
    }
    questionsByTopic[question.topic].push(question)
  })

  // Sort topics by number of questions (descending)
  const sortedTopics = Object.keys(questionsByTopic).sort(
    (a, b) => questionsByTopic[b].length - questionsByTopic[a].length
  )

  // Get color for topic
  const getTopicColor = (topic: string, index: number) => {
    const colors = [
      { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-100' },
      { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-100' },
      { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-100' },
      { bg: 'bg-pink-500', text: 'text-pink-600', light: 'bg-pink-100' },
      { bg: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-100' },
      { bg: 'bg-indigo-500', text: 'text-indigo-600', light: 'bg-indigo-100' },
      { bg: 'bg-red-500', text: 'text-red-600', light: 'bg-red-100' },
      { bg: 'bg-teal-500', text: 'text-teal-600', light: 'bg-teal-100' },
    ]
    
    return colors[index % colors.length]
  }
  
  // Get position based on question metrics
  const getQuestionPosition = (question: any, topicIndex: number, questionIndex: number, totalQuestions: number) => {
    // Calculate position in a spiral pattern
    const angle = (questionIndex / totalQuestions) * Math.PI * 6 // Multiple loops
    const radius = 150 + (questionIndex * 5) // Increasing radius for spiral effect
    
    // Add some variation based on difficulty
    const difficultyOffset = question.difficulty === 'Hard' ? 30 : 
                             question.difficulty === 'Medium' ? 15 : 0
    
    // Calculate coordinates
    const x = 400 + (radius * Math.cos(angle))
    const y = 300 + (radius * Math.sin(angle))
    
    return { x, y }
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg h-full overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Learning Map
        </h2>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
          <span className="mr-2">Legend:</span>
          <span className="flex items-center mx-2">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            Correct
          </span>
          <span className="flex items-center mx-2">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
            Incorrect
          </span>
          <span className="flex items-center mx-2">
            <div className="w-3 h-3 rounded-full bg-gray-300 mr-1"></div>
            Unanswered
          </span>
        </div>
      </div>
      
      {/* Topics legend */}
      <div className="mb-6 flex flex-wrap gap-2">
        {sortedTopics.map((topic, index) => {
          const colors = getTopicColor(topic, index)
          
          return (
            <div 
              key={topic}
              className={`px-3 py-1 rounded-full ${colors.light} ${colors.text} text-sm font-medium`}
            >
              {topic} ({questionsByTopic[topic].length})
            </div>
          )
        })}
      </div>
      
      {/* Main visualization - 3D-like map */}
      <div className="relative w-full" style={{ height: '600px', perspective: '1000px' }}>
        <div 
          className="absolute inset-0 transform-gpu"
          style={{ 
            transformStyle: 'preserve-3d', 
            transform: 'rotateX(20deg)'
          }}
        >
          {/* "Ground" plane */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl"
            style={{ 
              transformStyle: 'preserve-3d', 
              transform: 'rotateX(90deg) translateZ(-150px) translateY(-300px) scale(2)',
              background: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.03), rgba(0,0,0,0.03) 10px, rgba(0,0,0,0) 10px, rgba(0,0,0,0) 20px)'
            }}
          ></div>
          
          {/* Question nodes */}
          {sortedTopics.map((topic, topicIndex) => {
            const questions = questionsByTopic[topic]
            const colors = getTopicColor(topic, topicIndex)
            
            return questions.map((question, qIndex) => {
              const { x, y } = getQuestionPosition(question, topicIndex, qIndex, questions.length)
              const isSelected = question.setId === selectedSetId
              const isHovered = question.setId === hoveredSetId
              
              // Determine node color based on answer status
              const nodeColor = !question.answered ? 'bg-gray-300 dark:bg-gray-600' :
                                question.correct ? 'bg-green-500 dark:bg-green-600' :
                                'bg-red-500 dark:bg-red-600'
              
              // Size based on difficulty
              const nodeSize = question.difficulty === 'Hard' ? 16 :
                              question.difficulty === 'Medium' ? 14 : 12
              
              return (
                <div 
                  key={question.id}
                  className="absolute transform-gpu transition-all duration-200"
                  style={{ 
                    left: `${x}px`, 
                    top: `${y}px`,
                    transformStyle: 'preserve-3d',
                    transform: `translateZ(${isSelected || isHovered ? 30 : 0}px)`, 
                    zIndex: isSelected || isHovered ? 10 : 1
                  }}
                >
                  {/* Question node */}
                  <button
                    className={`
                      rounded-full shadow-lg transition-all duration-200
                      ${nodeColor}
                      ${isSelected ? 'ring-4 ring-blue-400 dark:ring-blue-600' : ''}
                      ${isHovered ? 'scale-110' : ''}
                    `}
                    style={{ 
                      width: `${nodeSize}px`, 
                      height: `${nodeSize}px` 
                    }}
                    onClick={() => onSelectSet(question.setId)}
                    onMouseEnter={() => setHoveredSetId(question.setId)}
                    onMouseLeave={() => setHoveredSetId(null)}
                    aria-label={`Question about ${question.topic}`}
                  />
                  
                  {/* Label and info on hover/select */}
                  {(isSelected || isHovered) && (
                    <div 
                      className="absolute left-1/2 -translate-x-1/2 transform-gpu transition-opacity duration-200"
                      style={{ 
                        bottom: `${nodeSize + 5}px`, 
                        width: '200px',
                        transformStyle: 'preserve-3d',
                        transform: 'translateZ(5px)'
                      }}
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 text-sm">
                        <div className="font-medium text-gray-900 dark:text-white mb-1">
                          {question.setType} ({question.setSubject})
                        </div>
                        <div className={`text-xs ${colors.text} font-medium mb-1`}>
                          Topic: {question.topic}
                        </div>
                        <div className={`text-xs ${colors.text} font-medium mb-1`}>
                          Subtopic: {question.subtopic}
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 dark:text-gray-400">
                            {question.difficulty}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            {question.timeSpent}s
                          </span>
                        </div>
                        
                        {/* Status indicator */}
                        <div className="mt-2 text-xs">
                          {!question.answered ? (
                            <span className="text-gray-500 dark:text-gray-400">Not attempted yet</span>
                          ) : question.correct ? (
                            <span className="text-green-600 dark:text-green-400">Correct ✓</span>
                          ) : (
                            <span className="text-red-600 dark:text-red-400">Incorrect ✗</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Connecting line to node */}
                      <div 
                        className="absolute left-1/2 bottom-0 w-px h-2 bg-gray-400 dark:bg-gray-600"
                        style={{ transform: 'translateX(-50%)' }}
                      ></div>
                    </div>
                  )}
                </div>
              )
            })
          })}
          
          {/* Visual elements to enhance 3D effect */}
          {sortedTopics.map((topic, topicIndex) => {
            const colors = getTopicColor(topic, topicIndex)
            const centerX = 400 + (topicIndex * 30 - (sortedTopics.length * 15))
            const centerY = 300 + (topicIndex * 20 - (sortedTopics.length * 10))
            
            return (
              <div
                key={`topic-marker-${topic}`}
                className={`absolute ${colors.bg} opacity-20 rounded-full blur-md`}
                style={{
                  width: '80px',
                  height: '80px',
                  left: `${centerX}px`,
                  top: `${centerY}px`,
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(-10px)',
                  zIndex: 0
                }}
              ></div>
            )
          })}
        </div>
      </div>
      
      {/* Selected question details at bottom */}
      {selectedSetId && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          {allQuestions.filter(q => q.setId === selectedSetId).map(question => (
            <div key={question.id}>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Selected Set Details - Question from {question.setType}
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Set Type</div>
                  <div className="font-medium">{question.setType}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Subject</div>
                  <div className="font-medium">{question.setSubject}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Set Accuracy</div>
                  <div className="font-medium">{question.setAccuracy}%</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Topic</div>
                  <div className="font-medium">{question.topic}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Subtopic</div>
                  <div className="font-medium">{question.subtopic}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Difficulty</div>
                  <div className="font-medium">{question.difficulty}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</div>
                  <div className="font-medium">
                    {!question.answered ? 'Not Attempted' :
                     question.correct ? 'Correct' : 'Incorrect'}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Time Spent</div>
                  <div className="font-medium">{question.timeSpent} seconds</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
