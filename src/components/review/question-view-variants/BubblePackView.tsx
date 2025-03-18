'use client'

import { useState, useRef, useEffect } from 'react'
import { QuestionViewProps } from './types'

/**
 * BubblePackView - Interactive bubble visualization for questions grouped by topic
 * Shows questions as bubbles that can be interacted with, grouped by categories
 */
export function BubblePackView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // State for filtering and visualization
  const [selectedSubject, setSelectedSubject] = useState<string | 'all'>('all')
  const [groupBy, setGroupBy] = useState<'topic' | 'subject' | 'difficulty'>('topic')
  const [colorBy, setColorBy] = useState<'accuracy' | 'subject' | 'difficulty' | 'correct'>('accuracy')
  const [hoveredBubble, setHoveredBubble] = useState<string | null>(null)
  
  // References for visualization container
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerDimensions, setContainerDimensions] = useState({ width: 800, height: 600 })
  
  // Extract all questions with metadata
  const allQuestions = practiceSets.flatMap(set => 
    set.questions.map(q => ({ 
      ...q, 
      setId: set.id,
      subject: set.subject,
      accuracy: set.accuracy,
      dateCompleted: set.dateCompleted
    }))
  )
  
  // Get all available subjects for filtering
  const subjects = Array.from(new Set(practiceSets.map(set => set.subject)))
  
  // Filter questions by selected subject
  const filteredQuestions = selectedSubject === 'all'
    ? allQuestions
    : allQuestions.filter(q => q.subject === selectedSubject)
  
  // Function to get grouping key
  const getGroupKey = (question: typeof allQuestions[0]): string => {
    switch (groupBy) {
      case 'topic': return question.topic
      case 'subject': return question.subject
      case 'difficulty': return question.difficulty
    }
  }
  
  // Group questions
  const groupedQuestions = filteredQuestions.reduce((acc, question) => {
    const key = getGroupKey(question)
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(question)
    return acc
  }, {} as Record<string, typeof filteredQuestions>)
  
  // Update container dimensions on resize
  useEffect(() => {
    if (!containerRef.current) return
    
    const updateDimensions = () => {
      if (!containerRef.current) return
      const { width, height } = containerRef.current.getBoundingClientRect()
      setContainerDimensions({ width, height })
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])
  
  // Calculate bubble sizes and positions
  const bubbleGroups = Object.entries(groupedQuestions).map(([groupName, questions], groupIndex) => {
    const totalGroups = Object.keys(groupedQuestions).length
    const angleStep = (2 * Math.PI) / totalGroups
    const angle = angleStep * groupIndex
    
    // Position the group in a circle around the center
    const radius = Math.min(containerDimensions.width, containerDimensions.height) * 0.35
    const groupX = containerDimensions.width / 2 + radius * Math.cos(angle)
    const groupY = containerDimensions.height / 2 + radius * Math.sin(angle)
    
    // Calculate sizes for individual bubbles
    const bubbles = questions.map((question, qIndex) => {
      // Size based on time spent (bigger = more time)
      const sizeFactor = Math.sqrt(question.timeSpent / 60) // Square root for better visual scaling
      const size = Math.max(30, Math.min(60, 20 + sizeFactor * 15)) // Between 30-60px
      
      // Position within the group
      const innerRadius = size * 2.5
      const bubbleAngle = (2 * Math.PI * qIndex) / questions.length
      const x = groupX + innerRadius * Math.cos(bubbleAngle)
      const y = groupY + innerRadius * Math.sin(bubbleAngle)
      
      // Color based on selected property
      let color = ''
      if (colorBy === 'accuracy') {
        // Red to green gradient based on accuracy
        const accuracy = question.correct ? 100 : 0
        const hue = accuracy * 1.2 // 0 = red, 120 = green
        color = `hsl(${hue}, 70%, 45%)`
      } else if (colorBy === 'subject') {
        // Color by subject
        color = question.subject === 'Math' ? '#3b82f6' : 
                question.subject === 'Reading' ? '#10b981' : '#f59e0b'
      } else if (colorBy === 'difficulty') {
        // Color by difficulty
        color = question.difficulty === 'Easy' ? '#10b981' : 
                question.difficulty === 'Medium' ? '#f59e0b' : '#ef4444'
      } else { // correct
        // Color by correctness
        color = question.correct ? '#10b981' : '#ef4444'
      }
      
      return {
        ...question,
        size,
        x,
        y,
        color,
        isHovered: question.id === hoveredBubble,
        isSelected: question.setId === selectedSetId,
      }
    })
    
    return {
      name: groupName,
      x: groupX,
      y: groupY,
      bubbles
    }
  })
  
  // Get color for group labels
  const getGroupColor = (groupName: string): string => {
    if (groupBy === 'subject') {
      return groupName === 'Math' ? '#3b82f6' : 
             groupName === 'Reading' ? '#10b981' : '#f59e0b'
    } else if (groupBy === 'difficulty') {
      return groupName === 'Easy' ? '#10b981' : 
             groupName === 'Medium' ? '#f59e0b' : '#ef4444'
    } else {
      // Random but consistent color for topics
      let hash = 0
      for (let i = 0; i < groupName.length; i++) {
        hash = groupName.charCodeAt(i) + ((hash << 5) - hash)
      }
      const h = Math.abs(hash) % 360
      return `hsl(${h}, 70%, 45%)`
    }
  }
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">17. Bubble Pack View</h3>
      
      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        {/* Subject filter */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Subject</label>
          <select 
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="all">All Subjects</option>
            {subjects.map((subject, i) => (
              <option key={i} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        
        {/* Group by */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Group By</label>
          <select 
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as 'topic' | 'subject' | 'difficulty')}
          >
            <option value="topic">Topic</option>
            <option value="subject">Subject</option>
            <option value="difficulty">Difficulty</option>
          </select>
        </div>
        
        {/* Color by */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Color By</label>
          <select 
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={colorBy}
            onChange={(e) => setColorBy(e.target.value as 'accuracy' | 'subject' | 'difficulty' | 'correct')}
          >
            <option value="accuracy">Accuracy</option>
            <option value="subject">Subject</option>
            <option value="difficulty">Difficulty</option>
            <option value="correct">Correctness</option>
          </select>
        </div>
      </div>
      
      {/* Visualization */}
      <div 
        ref={containerRef} 
        className="relative bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
        style={{ height: '500px' }}
      >
        {/* Legend */}
        <div className="absolute top-3 right-3 bg-white dark:bg-slate-900 p-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 text-xs">
          <div className="font-medium mb-1 text-slate-600 dark:text-slate-300">Legend:</div>
          <div className="space-y-1">
            {colorBy === 'accuracy' && (
              <>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span>Low Accuracy</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span>Medium Accuracy</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>High Accuracy</span>
                </div>
              </>
            )}
            
            {colorBy === 'correct' && (
              <>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Correct</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span>Incorrect</span>
                </div>
              </>
            )}
            
            {colorBy === 'subject' && (
              <>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span>Math</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                  <span>Reading</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                  <span>Writing</span>
                </div>
              </>
            )}
            
            {colorBy === 'difficulty' && (
              <>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Easy</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                  <span>Medium</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span>Hard</span>
                </div>
              </>
            )}
            
            <div className="mt-2 pt-1 border-t border-slate-200 dark:border-slate-700">
              <span>Bubble size = time spent</span>
            </div>
          </div>
        </div>
        
        {/* SVG Visualization */}
        <svg width="100%" height="100%" className="overflow-visible">
          {/* Group labels */}
          {bubbleGroups.map((group, i) => (
            <g key={`group-${i}`}>
              <text 
                x={group.x} 
                y={group.y - 15} 
                textAnchor="middle" 
                className="font-medium text-xs fill-slate-600 dark:fill-slate-300"
                style={{ fill: getGroupColor(group.name) }}
              >
                {group.name}
              </text>
              
              {/* Drawing bubbles */}
              {group.bubbles.map((bubble, j) => (
                <g 
                  key={`bubble-${i}-${j}`}
                  onClick={() => onSelectSet && onSelectSet(bubble.setId)}
                  onMouseEnter={() => setHoveredBubble(bubble.id)}
                  onMouseLeave={() => setHoveredBubble(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Shadow/focus ring for selected/hovered bubbles */}
                  {(bubble.isHovered || bubble.isSelected) && (
                    <circle 
                      cx={bubble.x}
                      cy={bubble.y}
                      r={bubble.size + 3}
                      fill="none"
                      stroke={bubble.isSelected ? '#6366f1' : '#94a3b8'}
                      strokeWidth={2}
                      strokeOpacity={0.7}
                    />
                  )}
                  
                  {/* Main bubble */}
                  <circle
                    cx={bubble.x}
                    cy={bubble.y}
                    r={bubble.size}
                    fill={bubble.color}
                    fillOpacity={bubble.isHovered || bubble.isSelected ? 1 : 0.8}
                    stroke="white"
                    strokeWidth={1}
                  />
                  
                  {/* Correctness indicator */}
                  <text 
                    x={bubble.x} 
                    y={bubble.y + 4} 
                    textAnchor="middle" 
                    dominantBaseline="middle"
                    className="text-xs font-bold fill-white"
                  >
                    {bubble.correct ? '✓' : '✗'}
                  </text>
                </g>
              ))}
            </g>
          ))}
        </svg>
        
        {/* Tooltip */}
        {hoveredBubble && (() => {
          const hoveredQuestion = filteredQuestions.find(q => q.id === hoveredBubble)
          if (!hoveredQuestion) return null
          
          const parentSet = practiceSets.find(set => set.id === hoveredQuestion.setId)!
          
          // Find position in the visualization
          const hoveredBubbleData = bubbleGroups
            .flatMap(g => g.bubbles)
            .find(b => b.id === hoveredBubble)
          
          if (!hoveredBubbleData) return null
          
          return (
            <div 
              className="absolute bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg text-sm z-10"
              style={{ 
                left: hoveredBubbleData.x + 30, 
                top: hoveredBubbleData.y - 30,
                maxWidth: '250px'
              }}
            >
              <div className="font-medium mb-1">
                {hoveredQuestion.topic} - {hoveredQuestion.subtopic}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                <div>Subject: {parentSet.subject}</div>
                <div>Difficulty: {hoveredQuestion.difficulty}</div>
                <div>
                  Status: {hoveredQuestion.correct ? 
                    <span className="text-green-500 dark:text-green-400">Correct</span> : 
                    <span className="text-red-500 dark:text-red-400">Incorrect</span>}
                </div>
                <div>Time spent: {hoveredQuestion.timeSpent} seconds</div>
              </div>
              <div className="mt-2 text-xs text-indigo-500 dark:text-indigo-400">
                Click to view full details
              </div>
            </div>
          )
        })()}
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 text-center">
        <p>Hover over bubbles to see details. Click to view the practice set.</p>
        <p className="mt-1">Bubble size represents time spent. Grouping is by {groupBy}.</p>
      </div>
      
      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg text-center border border-slate-200 dark:border-slate-700">
          <div className="text-xl font-bold text-indigo-500 dark:text-indigo-400">
            {filteredQuestions.length}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Questions
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg text-center border border-slate-200 dark:border-slate-700">
          <div className="text-xl font-bold text-emerald-500 dark:text-emerald-400">
            {Object.keys(groupedQuestions).length}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {groupBy === 'topic' ? 'Topics' : groupBy === 'subject' ? 'Subjects' : 'Difficulty Levels'}
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg text-center border border-slate-200 dark:border-slate-700">
          <div className="text-xl font-bold text-green-500 dark:text-green-400">
            {filteredQuestions.filter(q => q.correct).length}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Correct
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg text-center border border-slate-200 dark:border-slate-700">
          <div className="text-xl font-bold text-red-500 dark:text-red-400">
            {filteredQuestions.filter(q => !q.correct).length}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Incorrect
          </div>
        </div>
      </div>
    </div>
  )
}
