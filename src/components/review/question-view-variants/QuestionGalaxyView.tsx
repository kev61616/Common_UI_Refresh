'use client'

import { useState, useRef, useEffect } from 'react'
import { QuestionViewProps } from './types'

/**
 * QuestionGalaxyView - Cosmic visualization of questions as stars in a learning universe
 * Shows questions as stars grouped into constellations by topic
 */
export function QuestionGalaxyView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // State for filtering and visualization
  const [selectedSubject, setSelectedSubject] = useState<string | 'all'>('all')
  const [zoomLevel, setZoomLevel] = useState(1)
  const [hoveredStar, setHoveredStar] = useState<string | null>(null)
  
  // References for animation and container
  const animationRef = useRef<number>()
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerDimensions, setContainerDimensions] = useState({ width: 800, height: 600 })
  const [stars, setStars] = useState<Array<any>>([])
  
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
  
  // Get all available subjects for filtering
  const subjects = Array.from(new Set(practiceSets.map(set => set.subject)))
  
  // Filter questions by selected subject
  const filteredQuestions = selectedSubject === 'all'
    ? allQuestions
    : allQuestions.filter(q => q.subject === selectedSubject)
  
  // Calculate positive and negative stars (correct and incorrect questions)
  const correctQuestions = filteredQuestions.filter(q => q.correct)
  const incorrectQuestions = filteredQuestions.filter(q => !q.correct)
  
  // Group questions by topic
  const questionsByTopic = filteredQuestions.reduce((acc, question) => {
    if (!acc[question.topic]) {
      acc[question.topic] = []
    }
    acc[question.topic].push(question)
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
  
  // Create stars based on questions when container dimensions update
  useEffect(() => {
    if (containerDimensions.width === 0 || containerDimensions.height === 0) return
    
    const centerX = containerDimensions.width / 2
    const centerY = containerDimensions.height / 2
    
    // Create stars for constellations (topics)
    const constellations: Record<string, {x: number, y: number, stars: any[]}> = {}
    const angle = (2 * Math.PI) / Object.keys(questionsByTopic).length
    
    Object.entries(questionsByTopic).forEach(([topic, questions], i) => {
      // Position constellation center in a circle around the galaxy center
      const constellationRadius = Math.min(containerDimensions.width, containerDimensions.height) * 0.35
      const constellationX = centerX + constellationRadius * Math.cos(angle * i)
      const constellationY = centerY + constellationRadius * Math.sin(angle * i)
      
      constellations[topic] = {
        x: constellationX,
        y: constellationY,
        stars: []
      }
      
      // Create stars for each question in this constellation
      questions.forEach((question, qIndex) => {
        // Star positioning within constellation
        const starAngle = (2 * Math.PI * qIndex) / questions.length
        const starDistance = 20 + Math.random() * 40 // Random distance from constellation center
        const x = constellationX + starDistance * Math.cos(starAngle)
        const y = constellationY + starDistance * Math.sin(starAngle)
        
        // Star properties
        const size = question.correct ? 
          6 + Math.min(8, (question.timeSpent / 20)) : // Correct stars are bigger based on time spent
          3 + Math.min(4, (question.timeSpent / 30)) // Incorrect stars are smaller
        
        // Star color based on difficulty
        const baseColor = question.correct ? 
          (question.difficulty === 'Easy' ? '#10b981' : 
           question.difficulty === 'Medium' ? '#3b82f6' : 
           '#8b5cf6') : 
          (question.difficulty === 'Easy' ? '#f87171' : 
           question.difficulty === 'Medium' ? '#f59e0b' : 
           '#ec4899')
        
        // Star glow intensity based on time spent
        const glowIntensity = Math.max(3, Math.min(10, question.timeSpent / 10))
        
        const star = {
          id: question.id,
          setId: question.setId,
          x,
          y,
          size,
          color: baseColor,
          glow: glowIntensity,
          opacity: 0.8 + (Math.random() * 0.2),
          twinkle: Math.random() * 2,
          correct: question.correct,
          topic: question.topic,
          subtopic: question.subtopic,
          difficulty: question.difficulty,
          timeSpent: question.timeSpent,
          constellation: topic
        }
        
        constellations[topic].stars.push(star)
      })
    })
    
    // Flatten stars array
    const allStars = Object.values(constellations).flatMap(c => c.stars)
    
    // Add background stars (not tied to any questions, purely decorative)
    for (let i = 0; i < 100; i++) {
      allStars.push({
        id: `bg-${i}`,
        x: Math.random() * containerDimensions.width,
        y: Math.random() * containerDimensions.height,
        size: 1 + Math.random() * 1.5,
        color: '#ffffff',
        opacity: 0.3 + (Math.random() * 0.5),
        twinkle: Math.random() * 3,
        background: true
      })
    }
    
    setStars(allStars)
  }, [containerDimensions, questionsByTopic, filteredQuestions])
  
  // Animation loop for twinkling stars
  useEffect(() => {
    let time = 0
    const animate = () => {
      time += 0.01
      
      setStars(prevStars => 
        prevStars.map(star => {
          if (!star.background && !star.twinkle) return star
          
          // Only background stars and some question stars twinkle
          const newOpacity = star.background ? 
            (0.2 + (Math.sin(time * star.twinkle) + 1) * 0.3) : 
            (star.opacity + Math.sin(time * star.twinkle) * 0.1)
          
          return {
            ...star,
            opacity: newOpacity
          }
        })
      )
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])
  
  // Handle zooming
  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      const newZoom = direction === 'in' ? prev + 0.2 : prev - 0.2
      return Math.max(0.5, Math.min(2, newZoom))
    })
  }
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">20. Question Galaxy View</h3>
      
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
        
        {/* Zoom controls */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Zoom</label>
          <div className="flex text-sm">
            <button 
              className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-l-md border border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              onClick={() => handleZoom('out')}
              disabled={zoomLevel <= 0.5}
            >
              -
            </button>
            <div className="px-3 py-1 bg-white dark:bg-slate-800 border-t border-b border-slate-200 dark:border-slate-600 text-center min-w-[50px]">
              {Math.round(zoomLevel * 100)}%
            </div>
            <button 
              className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-r-md border border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              onClick={() => handleZoom('in')}
              disabled={zoomLevel >= 2}
            >
              +
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full text-xs font-medium text-indigo-700 dark:text-indigo-300 flex items-center">
          <span className="w-2 h-2 bg-indigo-500 rounded-full mr-1"></span>
          <span>Total: {filteredQuestions.length} questions</span>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full text-xs font-medium text-green-700 dark:text-green-300 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
          <span>Correct: {correctQuestions.length} stars</span>
        </div>
        
        <div className="bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full text-xs font-medium text-red-700 dark:text-red-300 flex items-center">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
          <span>Incorrect: {incorrectQuestions.length} stars</span>
        </div>
        
        <div className="bg-violet-50 dark:bg-violet-900/20 px-3 py-1 rounded-full text-xs font-medium text-violet-700 dark:text-violet-300 flex items-center">
          <span className="w-2 h-2 bg-violet-500 rounded-full mr-1"></span>
          <span>Topics: {Object.keys(questionsByTopic).length} constellations</span>
        </div>
      </div>
      
      {/* Galaxy visualization */}
      <div 
        ref={containerRef} 
        className="relative bg-slate-900 rounded-lg overflow-hidden border border-slate-800"
        style={{ height: '500px' }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 opacity-80"></div>
        
        {/* Star field */}
        <div 
          className="absolute inset-0 transition-transform duration-300"
          style={{ 
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center'
          }}
        >
          {/* Constellation labels */}
          {Object.entries(questionsByTopic).map(([topic, questions], i) => {
            // Find first star in this constellation to position the label
            const firstStar = stars.find(s => !s.background && s.constellation === topic)
            if (!firstStar) return null
            
            const constellationStars = stars.filter(s => !s.background && s.constellation === topic)
            
            // Find center point of constellation
            const centerX = constellationStars.reduce((sum, star) => sum + star.x, 0) / constellationStars.length
            const centerY = constellationStars.reduce((sum, star) => sum + star.y, 0) / constellationStars.length
            
            return (
              <div
                key={topic}
                className="absolute pointer-events-none text-white opacity-60 text-xs font-medium"
                style={{ 
                  left: `${centerX}px`, 
                  top: `${centerY - 15}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {topic}
              </div>
            )
          })}
          
          {/* Stars */}
          {stars.map((star, i) => (
            <div
              key={star.id}
              className={`absolute rounded-full ${
                !star.background && selectedSetId === star.setId 
                  ? 'ring-2 ring-white ring-opacity-70' 
                  : ''
              }`}
              style={{ 
                left: `${star.x}px`, 
                top: `${star.y}px`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: star.color,
                opacity: star.opacity,
                transform: 'translate(-50%, -50%)',
                cursor: star.background ? 'default' : 'pointer',
                boxShadow: !star.background ? `0 0 ${star.glow}px ${star.color}` : 'none',
                zIndex: star.background ? 1 : 2
              }}
              onClick={() => {
                if (!star.background) {
                  onSelectSet(star.setId)
                }
              }}
              onMouseEnter={() => {
                if (!star.background) {
                  setHoveredStar(star.id)
                }
              }}
              onMouseLeave={() => {
                setHoveredStar(null)
              }}
            />
          ))}
          
          {/* Constellation lines (connecting stars) */}
          <svg className="absolute inset-0" style={{ zIndex: 0 }}>
            {Object.entries(questionsByTopic).map(([topic, questions]) => {
              const constellationStars = stars.filter(s => !s.background && s.constellation === topic)
              
              // Create lines between stars that are close to each other
              const lines: Array<{x1: number, y1: number, x2: number, y2: number}> = []
              
              // Connect stars within the same constellation
              for (let i = 0; i < constellationStars.length; i++) {
                for (let j = i + 1; j < constellationStars.length; j++) {
                  const star1 = constellationStars[i]
                  const star2 = constellationStars[j]
                  
                  // Calculate distance between stars
                  const dx = star1.x - star2.x
                  const dy = star1.y - star2.y
                  const distance = Math.sqrt(dx * dx + dy * dy)
                  
                  // Only connect stars that are close to each other
                  if (distance < 50) {
                    lines.push({
                      x1: star1.x,
                      y1: star1.y,
                      x2: star2.x,
                      y2: star2.y
                    })
                  }
                }
              }
              
              return (
                <g key={topic}>
                  {lines.map((line, i) => (
                    <line
                      key={i}
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke="rgba(255, 255, 255, 0.15)"
                      strokeWidth="0.5"
                    />
                  ))}
                </g>
              )
            })}
          </svg>
        </div>
        
        {/* Tooltip */}
        {hoveredStar && (() => {
          const star = stars.find(s => s.id === hoveredStar)
          if (!star || star.background) return null
          
          return (
            <div 
              className="absolute bg-slate-800/90 backdrop-blur text-white p-2 rounded shadow-lg text-xs z-10 border border-slate-700"
              style={{ 
                left: `${star.x + 15}px`, 
                top: `${star.y - 10}px`,
                maxWidth: '200px',
                transform: 'translateY(-100%)'
              }}
            >
              <div className="font-medium">{star.subtopic}</div>
              <div className="mt-1 space-y-1 text-slate-300">
                <div>Topic: {star.topic}</div>
                <div className="flex items-center">
                  Difficulty: 
                  <span className={`ml-1 px-1.5 rounded text-[10px] ${
                    star.difficulty === 'Easy' 
                      ? 'bg-green-900/30 text-green-400' 
                      : star.difficulty === 'Medium'
                      ? 'bg-amber-900/30 text-amber-400'
                      : 'bg-red-900/30 text-red-400'
                  }`}>
                    {star.difficulty}
                  </span>
                </div>
                <div className="flex items-center">
                  Result: 
                  <span className={`ml-1 px-1.5 rounded text-[10px] ${
                    star.correct
                      ? 'bg-green-900/30 text-green-400'
                      : 'bg-red-900/30 text-red-400'
                  }`}>
                    {star.correct ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                <div>Time spent: {star.timeSpent}s</div>
              </div>
              <div className="mt-1 text-indigo-300 italic">Click to view details</div>
            </div>
          )
        })()}
        
        {/* Empty state */}
        {filteredQuestions.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-white bg-slate-900/80 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-lg mb-2">No stars in this galaxy view</div>
              <div className="text-sm text-slate-400">
                {selectedSubject !== 'all' 
                  ? 'Try selecting a different subject or "All Subjects"'
                  : 'No question data available'}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Legend */}
      <div className="mt-4 p-3 bg-white dark:bg-slate-800 rounded-lg text-sm border border-slate-200 dark:border-slate-700">
        <h4 className="font-medium mb-2 text-slate-700 dark:text-slate-300">Star Field Guide</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2 shadow-sm shadow-green-500/50"></div>
            <span className="text-slate-600 dark:text-slate-400">Bright green stars - Easy, correct answers</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2 shadow-sm shadow-blue-500/50"></div>
            <span className="text-slate-600 dark:text-slate-400">Blue stars - Medium, correct answers</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-violet-500 mr-2 shadow-sm shadow-violet-500/50"></div>
            <span className="text-slate-600 dark:text-slate-400">Purple stars - Hard, correct answers</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2 shadow-sm shadow-red-500/50"></div>
            <span className="text-slate-600 dark:text-slate-400">Red stars - Incorrect answers</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-white mr-2 opacity-50"></div>
            <span className="text-slate-600 dark:text-slate-400">Small white dots - Background stars</span>
          </div>
          <div className="flex items-center">
            <div className="h-px w-8 bg-white opacity-20 mr-2"></div>
            <span className="text-slate-600 dark:text-slate-400">Lines - Constellation connections</span>
          </div>
        </div>
        <div className="mt-3 text-slate-500 dark:text-slate-400 text-xs">
          <p>Star size indicates time spent (larger = more time). Brighter glow means more challenging questions.</p>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 text-center">
        <p>Explore the galaxy of your knowledge. Hover over stars to see question details.</p>
      </div>
    </div>
  )
}
