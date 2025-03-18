'use client'

import { useState } from 'react'
import { QuestionViewProps } from './types'

/**
 * UrbanBlueprintView - Architectural blueprint visualization of questions
 * Displays questions in a blueprint-style layout with technical drawing aesthetics
 */
export function UrbanBlueprintView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  const [selectedSubject, setSelectedSubject] = useState<string | 'all'>('all')
  const [filterDifficulty, setFilterDifficulty] = useState<string | 'all'>('all')
  
  // Get all unique subjects for filtering
  const subjects = Array.from(new Set(practiceSets.map(set => set.subject)))
  
  // Apply filters
  const filteredSets = practiceSets.filter(set => 
    (selectedSubject === 'all' || set.subject === selectedSubject) &&
    (filterDifficulty === 'all' || set.questions.some(q => q.difficulty === filterDifficulty))
  )
  
  // Group by subject for layout organization
  const setsBySubject = filteredSets.reduce<Record<string, typeof practiceSets>>((acc, set) => {
    if (!acc[set.subject]) {
      acc[set.subject] = []
    }
    acc[set.subject].push(set)
    return acc
  }, {})
  
  // Generate blueprint coordinate for a set
  const getBlueprintCoordinate = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 1.5 // Span in a semi-circle
    const radius = 120 + (index % 3) * 40 // Vary radius
    
    const x = Math.cos(angle) * radius + 150
    const y = Math.sin(angle) * radius + 150
    
    return { x, y }
  }
  
  // Calculate connection paths between sets
  const generateConnections = (sets: typeof practiceSets) => {
    const connections: {from: string, to: string, strength: number}[] = []
    
    // Find connections based on shared topics
    for (let i = 0; i < sets.length; i++) {
      for (let j = i + 1; j < sets.length; j++) {
        const set1 = sets[i]
        const set2 = sets[j]
        
        // Compare questions to find related topics
        const set1Topics = new Set(set1.questions.map(q => q.topic))
        const set2Topics = new Set(set2.questions.map(q => q.topic))
        
        const sharedTopics = [...set1Topics].filter(topic => set2Topics.has(topic))
        
        if (sharedTopics.length > 0) {
          connections.push({
            from: set1.id,
            to: set2.id,
            strength: sharedTopics.length
          })
        }
      }
    }
    
    return connections
  }
  
  // Format date for blueprint annotation
  const formatBlueprintDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  }
  
  // Get blueprint element style based on set properties
  const getBlueprintElementStyle = (
    set: (typeof practiceSets)[0], 
    isSelected: boolean
  ) => {
    // Calculate color style based on accuracy
    let fillColor = '#e5f6ff' // Default light blue
    let strokeColor = '#0284c7' // Default blue
    let strokeWidth = 1
    
    if (isSelected) {
      fillColor = '#bae6fd'
      strokeColor = '#0284c7'
      strokeWidth = 2
    } else if (set.accuracy >= 90) {
      fillColor = '#dcfce7' // Light green
      strokeColor = '#16a34a' // Green
    } else if (set.accuracy >= 70) {
      fillColor = '#e5f6ff' // Light blue
      strokeColor = '#0284c7' // Blue
    } else if (set.accuracy >= 50) {
      fillColor = '#fef9c3' // Light yellow
      strokeColor = '#ca8a04' // Yellow
    } else {
      fillColor = '#fee2e2' // Light red
      strokeColor = '#dc2626' // Red
    }
    
    // Blueprint "element type" based on question count
    let shape = 'rect'
    if (set.questions.length === 1) {
      shape = 'circle'
    } else if (set.questions.length <= 5) {
      shape = 'roundedRect'
    } else if (set.questions.length <= 10) {
      shape = 'octagon'
    } else {
      shape = 'complex'
    }
    
    // Size based on question count
    const size = Math.min(70, Math.max(40, 30 + set.questions.length * 2))
    
    return {
      fillColor,
      strokeColor,
      strokeWidth,
      shape,
      size
    }
  }
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">26. Urban Blueprint View</h3>
      
      {/* Control panel - styled like blueprint legend */}
      <div className="bg-sky-50 dark:bg-slate-800 p-4 mb-6 rounded border border-sky-200 dark:border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-xs uppercase tracking-wide text-sky-800 dark:text-sky-300 mb-1 font-mono">Subject Filter</label>
            <select
              className="bg-white dark:bg-slate-700 border border-sky-200 dark:border-slate-600 text-sky-900 dark:text-sky-100 rounded px-2 py-1 text-sm font-mono"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="all">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col">
            <label className="text-xs uppercase tracking-wide text-sky-800 dark:text-sky-300 mb-1 font-mono">Difficulty Filter</label>
            <select
              className="bg-white dark:bg-slate-700 border border-sky-200 dark:border-slate-600 text-sky-900 dark:text-sky-100 rounded px-2 py-1 text-sm font-mono"
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
        
        {/* Blueprint legend */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-green-100 border border-green-500"></div>
            <span className="text-xs text-sky-800 dark:text-sky-300 font-mono">≥90% Accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-sky-100 border border-sky-500"></div>
            <span className="text-xs text-sky-800 dark:text-sky-300 font-mono">70-89% Accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-yellow-100 border border-yellow-500"></div>
            <span className="text-xs text-sky-800 dark:text-sky-300 font-mono">50-69% Accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-red-100 border border-red-500"></div>
            <span className="text-xs text-sky-800 dark:text-sky-300 font-mono">&lt;50% Accuracy</span>
          </div>
        </div>
      </div>
      
      {/* Main blueprint display area */}
      <div className="relative overflow-hidden border-2 border-sky-700 dark:border-sky-800 rounded-lg bg-blue-50 dark:bg-slate-900 min-h-[600px] mb-4">
        {/* Blueprint grid background */}
        <div 
          className="absolute inset-0 opacity-10 dark:opacity-20" 
          style={{
            backgroundImage: `
              linear-gradient(to right, #0284c7 1px, transparent 1px),
              linear-gradient(to bottom, #0284c7 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        ></div>
        
        {/* Blueprint title block */}
        <div className="absolute top-4 left-4 right-4 border-2 border-sky-700 dark:border-sky-800 bg-white dark:bg-slate-800 p-3 rounded">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs text-sky-700 dark:text-sky-400 font-mono uppercase mb-1">Project</div>
              <div className="text-lg font-bold text-sky-900 dark:text-sky-100 font-mono">QUESTION ANALYSIS</div>
            </div>
            <div>
              <div className="text-xs text-sky-700 dark:text-sky-400 font-mono uppercase mb-1">Date</div>
              <div className="text-lg font-bold text-sky-900 dark:text-sky-100 font-mono">{new Date().toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-xs text-sky-700 dark:text-sky-400 font-mono uppercase mb-1">Scale</div>
              <div className="text-lg font-bold text-sky-900 dark:text-sky-100 font-mono">1:100</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-sky-700 dark:text-sky-400 font-mono">
            {Object.keys(setsBySubject).length} SUBJECT AREAS • {filteredSets.length} PRACTICE SETS • {filteredSets.reduce((sum, set) => sum + set.questions.length, 0)} QUESTIONS
          </div>
        </div>
        
        {/* Blueprint content */}
        <div className="absolute inset-0 pt-24 pb-6 px-6 overflow-auto">
          {Object.entries(setsBySubject).map(([subject, sets], sIndex) => {
            // Calculate positions for this subject's sets
            const connections = generateConnections(sets)
            
            return (
              <div key={subject} className="relative mb-10">
                {/* Subject header */}
                <div className="mb-2 border-b border-sky-400 dark:border-sky-700 pb-1">
                  <h3 className="text-sky-800 dark:text-sky-400 font-mono text-md uppercase tracking-wide">{subject}</h3>
                </div>
                
                <div className="relative" style={{ height: '300px' }}>
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                    {connections.map((conn, i) => {
                      const startSet = sets.find(s => s.id === conn.from)
                      const endSet = sets.find(s => s.id === conn.to)
                      
                      if (!startSet || !endSet) return null
                      
                      const startIndex = sets.indexOf(startSet)
                      const endIndex = sets.indexOf(endSet)
                      
                      const start = getBlueprintCoordinate(startIndex, sets.length)
                      const end = getBlueprintCoordinate(endIndex, sets.length)
                      
                      // Calculate connection weight
                      const strokeWidth = Math.min(3, Math.max(1, conn.strength * 0.5))
                      const dashArray = conn.strength > 2 ? 'none' : '5,5'
                      
                      return (
                        <line 
                          key={`${conn.from}-${conn.to}`}
                          x1={start.x} 
                          y1={start.y} 
                          x2={end.x} 
                          y2={end.y}
                          stroke="#0284c7"
                          strokeWidth={strokeWidth}
                          strokeDasharray={dashArray}
                          opacity={0.3}
                        />
                      )
                    })}
                  </svg>
                  
                  {/* Blueprint elements */}
                  {sets.map((set, index) => {
                    const isSelected = set.id === selectedSetId
                    const pos = getBlueprintCoordinate(index, sets.length)
                    const style = getBlueprintElementStyle(set, isSelected)
                    
                    return (
                      <div 
                        key={set.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${isSelected ? 'z-10' : 'z-2'}`}
                        style={{
                          left: `${pos.x}px`,
                          top: `${pos.y}px`,
                          width: `${style.size}px`,
                          height: `${style.size}px`,
                        }}
                        onClick={() => onSelectSet && onSelectSet(set.id)}
                      >
                        {/* Set element */}
                        <div
                          className={`w-full h-full border-2 flex items-center justify-center relative ${
                            style.shape === 'circle' 
                              ? 'rounded-full' 
                              : style.shape === 'roundedRect'
                                ? 'rounded-md'
                                : style.shape === 'octagon'
                                  ? 'rounded-lg'
                                  : ''
                          }`}
                          style={{
                            backgroundColor: style.fillColor,
                            borderColor: style.strokeColor,
                            borderWidth: style.strokeWidth
                          }}
                        >
                          {/* Content */}
                          <div className="text-center p-1">
                            <div className="text-xs font-mono font-bold text-sky-900 dark:text-sky-800 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                              {set.type}
                            </div>
                            <div className="text-xxs font-mono text-sky-800 dark:text-sky-700">
                              {set.questions.length} Q
                            </div>
                          </div>
                          
                          {/* Blueprint measurement lines */}
                          {isSelected && (
                            <>
                              <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-10 border-l border-dashed border-sky-500"></div>
                              <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-10 border-t border-dashed border-sky-500"></div>
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xxs text-sky-600 font-mono">
                                {set.accuracy}%
                              </div>
                            </>
                          )}
                          
                          {/* Difficulty indicator */}
                          <div 
                            className={`absolute -bottom-4 left-1/2 -translate-x-1/2 text-xxs font-mono px-1 rounded ${
                              set.difficulty === 'Hard' 
                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                                : set.difficulty === 'Medium'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            }`}
                          >
                            {set.difficulty}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
          
          {filteredSets.length === 0 && (
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-mono text-sky-700 dark:text-sky-500">NO BLUEPRINT ELEMENTS</div>
                <div className="text-sm font-mono text-sky-600 dark:text-sky-600 mt-2">Adjust filters to visualize data</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Copyright block */}
        <div className="absolute bottom-2 right-4 text-right">
          <div className="text-xxs font-mono text-sky-700 dark:text-sky-600">BLUEPRINT REV. 2.0</div>
          <div className="text-xxs font-mono text-sky-700 dark:text-sky-600">© QUESTION ANALYTICS ARCHITECTS</div>
        </div>
      </div>
      
      {/* Description */}
      <div className="bg-white dark:bg-slate-800 border border-sky-100 dark:border-slate-700 rounded p-3 text-sm">
        <p className="font-mono text-sky-800 dark:text-sky-300">
          This architectural blueprint view visualizes your question sets as a technical drawing. Each practice set is represented as an element 
          with color indicating performance level. Connections between elements show related topics.
        </p>
      </div>
    </div>
  )
}
