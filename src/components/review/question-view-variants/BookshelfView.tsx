'use client'

import { useState, useRef, useEffect } from 'react'
import { QuestionViewProps } from './types'

/**
 * BookshelfView - Represents practice sets as books organized on bookshelves
 * Each book's appearance reflects properties of the question set
 */
export function BookshelfView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  const [selectedSubject, setSelectedSubject] = useState<string | 'all'>('all')
  const [filterDifficulty, setFilterDifficulty] = useState<string | 'all'>('all')
  const [hoverSet, setHoverSet] = useState<string | null>(null)
  const [bookPullout, setBookPullout] = useState<string | null>(null)
  
  // Detect click outside to reset pullout book
  const shelfRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shelfRef.current && !shelfRef.current.contains(event.target as Node)) {
        setBookPullout(null)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  // Get unique subjects for filtering
  const subjects = Array.from(new Set(practiceSets.map(set => set.subject)))
  
  // Apply filters
  const filteredSets = practiceSets.filter(set => 
    (selectedSubject === 'all' || set.subject === selectedSubject) &&
    (filterDifficulty === 'all' || set.questions.some(q => q.difficulty === filterDifficulty))
  )
  
  // Group sets by subject (each subject gets its own bookshelf)
  const setsBySubject = filteredSets.reduce<Record<string, typeof practiceSets>>((acc, set) => {
    if (!acc[set.subject]) {
      acc[set.subject] = []
    }
    acc[set.subject].push(set)
    return acc
  }, {})
  
  // Generate a consistent color from a string (for book colors)
  const getColorFromString = (str: string, saturation = 80, lightness = 60) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    const hue = hash % 360
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }
  
  // Generate book cover design based on set properties
  const getBookStyle = (set: (typeof practiceSets)[0]) => {
    // Base color from set type
    const baseColor = getColorFromString(set.type, 80, 60)
    
    // Darken color if selected
    const selectedColor = getColorFromString(set.type, 90, 40)
    
    // Secondary color from subject
    const accentColor = getColorFromString(set.subject, 70, 50)
    
    // Width based on question count and difficulty
    const avgDifficulty = set.questions.reduce((sum, q) => {
      if (q.difficulty === 'Hard') return sum + 3
      if (q.difficulty === 'Medium') return sum + 2
      return sum + 1
    }, 0) / set.questions.length
    
    const thickness = 15 + Math.min(40, set.questions.length * 3 * (avgDifficulty / 2))
    
    // Height based on accuracy (higher accuracy = taller book)
    const height = 100 + (set.accuracy / 100) * 80
    
    // Book patterns based on set properties
    let pattern = 'solid' // default
    if (set.questions.length > 10) {
      pattern = 'striped'
    } else if (set.accuracy > 85) {
      pattern = 'gilded'
    } else if (set.difficulty === 'Hard') {
      pattern = 'textured'
    }
    
    // Book condition based on completion date
    const completionDate = new Date(set.dateCompleted)
    const now = new Date()
    const daysSinceCompletion = Math.floor((now.getTime() - completionDate.getTime()) / (1000 * 60 * 60 * 24))
    
    let condition = 'new'
    if (daysSinceCompletion > 60) {
      condition = 'worn'
    } else if (daysSinceCompletion > 30) {
      condition = 'used'
    }
    
    return {
      baseColor,
      selectedColor,
      accentColor,
      thickness,
      height,
      pattern,
      condition
    }
  }
  
  // Generate a date string for book binding
  const getBookDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}`
  }
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">28. Bookshelf View</h3>
      
      {/* Reading Room Controls */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        <div className="bg-amber-50 dark:bg-slate-800 rounded-lg p-2 shadow border border-amber-200 dark:border-slate-700">
          <label className="block text-sm text-amber-800 dark:text-amber-400 mb-1 font-serif">Subject</label>
          <select
            className="bg-white dark:bg-slate-700 border border-amber-200 dark:border-slate-600 rounded px-2 py-1 text-sm font-serif"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="all">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        
        <div className="bg-amber-50 dark:bg-slate-800 rounded-lg p-2 shadow border border-amber-200 dark:border-slate-700">
          <label className="block text-sm text-amber-800 dark:text-amber-400 mb-1 font-serif">Difficulty</label>
          <select
            className="bg-white dark:bg-slate-700 border border-amber-200 dark:border-slate-600 rounded px-2 py-1 text-sm font-serif"
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
      
      {/* Library Display */}
      <div className="bg-gradient-to-b from-amber-100 to-amber-50 dark:from-slate-900 dark:to-slate-800 rounded-lg p-4 min-h-[600px] shadow-inner border border-amber-200 dark:border-slate-700">
        {/* Wooden panel background effect */}
        <div 
          className="absolute inset-8 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjOGI1ODI5Ij48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjgiIGZpbGw9IiM2ZDRjMmYiPjwvcmVjdD4KPC9zdmc+')",
            backgroundSize: '8px 8px'
          }}
        ></div>
        
        {/* Library header */}
        <div className="mb-8">
          <div className="text-center">
            <h2 className="text-lg font-serif font-bold text-amber-900 dark:text-amber-300 border-b border-amber-200 dark:border-amber-800 pb-2 mb-2 mx-auto w-max px-10">
              Library of Study
            </h2>
            <p className="text-xs italic text-amber-800 dark:text-amber-400 font-serif">
              {filteredSets.length} volumes • {
                filteredSets.reduce((sum, set) => sum + set.questions.length, 0)
              } questions
            </p>
          </div>
        </div>
        
        {/* The Bookshelves */}
        <div ref={shelfRef} className="space-y-10">
          {Object.entries(setsBySubject).length > 0 ? (
            Object.entries(setsBySubject).map(([subject, sets], shelfIndex) => (
              <div key={subject} className="relative">
                {/* Subject label */}
                <div className="absolute -top-6 left-4 bg-amber-700 dark:bg-amber-900 text-white px-3 py-1 text-xs font-medium rounded shadow-sm">
                  {subject}
                </div>
                
                {/* Bookshelf with wooden texture */}
                <div className="relative bg-amber-800/90 dark:bg-amber-900/90 rounded-t-md min-h-[180px] p-4 shadow-md border border-amber-900/30 dark:border-amber-950/50">
                  {/* Wood grain overlay */}
                  <div 
                    className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none rounded-t-md"
                    style={{
                      backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNyIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCI+PC9mZVR1cmJ1bGVuY2U+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')",
                      backgroundSize: 'cover'
                    }}
                  ></div>
                  
                  {/* Books on the shelf */}
                  <div className="flex items-end space-x-1 relative z-10 h-full">
                    {sets.map((set) => {
                      const bookStyle = getBookStyle(set)
                      const isSelected = set.id === selectedSetId
                      const isHovered = set.id === hoverSet
                      const isPulledOut = set.id === bookPullout
                      
                      // Book transform for pull-out effect
                      const pullOutTransform = isPulledOut 
                        ? 'translateY(-20px) rotate(5deg)' 
                        : isHovered && !bookPullout
                          ? 'translateY(-8px)'
                          : 'translateY(0)';
                      
                      // Dynamic classes based on book pattern
                      const patternClasses = {
                        solid: '',
                        striped: 'bg-gradient-to-b from-white/10 via-transparent to-white/5 bg-size-200',
                        gilded: 'border-t-2 border-b-2 border-yellow-300 dark:border-yellow-500',
                        textured: 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYwNSIgc3Ryb2tlLXdpZHRoPSIwLjUiPjwvcmVjdD4KPC9zdmc+")]',
                      }
                      
                      // Dynamic classes based on book condition
                      const conditionClasses = {
                        new: 'shadow-md',
                        used: 'shadow',
                        worn: 'shadow-sm opacity-90'
                      }
                      
                      return (
                        <div 
                          key={set.id}
                          className={`relative cursor-pointer transition-all duration-300 ease-out ${isSelected ? 'z-20' : 'z-10'}`}
                          style={{ 
                            height: `${bookStyle.height}px`,
                            width: `${bookStyle.thickness}px`,
                            transform: pullOutTransform
                          }}
                          onMouseEnter={() => setHoverSet(set.id)}
                          onMouseLeave={() => setHoverSet(null)}
                          onClick={() => {
                            if (isPulledOut) {
                              // If already pulled out, select the set
                              onSelectSet(set.id)
                              setBookPullout(null)
                            } else {
                              // Otherwise pull it out first
                              setBookPullout(set.id)
                            }
                          }}
                        >
                          {/* Book spine */}
                          <div 
                            className={`h-full w-full rounded-r-sm flex flex-col items-center justify-between relative ${patternClasses[bookStyle.pattern as keyof typeof patternClasses]} ${conditionClasses[bookStyle.condition as keyof typeof conditionClasses]}`}
                            style={{ 
                              backgroundColor: isSelected ? bookStyle.selectedColor : bookStyle.baseColor,
                              boxShadow: `inset -2px 0 3px rgba(0,0,0,0.2)`,
                            }}
                          >
                            {/* Book Title - vertical text */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div 
                                className="text-white font-medium text-sm tracking-wide rotate-90 whitespace-nowrap overflow-hidden text-ellipsis max-w-[90px]"
                                style={{ 
                                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                                  opacity: bookStyle.condition === 'worn' ? 0.8 : 1
                                }}
                              >
                                {set.type}
                              </div>
                            </div>
                            
                            {/* Book Top Decoration */}
                            <div 
                              className="w-full h-4 rounded-tr-sm"
                              style={{ 
                                backgroundColor: bookStyle.accentColor,
                                opacity: 0.7
                              }}
                            ></div>
                            
                            {/* Book Bottom - Year */}
                            <div className="text-white/70 text-[8px] mb-1 mt-auto">
                              {getBookDate(set.dateCompleted)}
                            </div>
                          </div>
                          
                          {/* Book detail popup when pulled out */}
                          {isPulledOut && (
                            <div className="absolute -right-64 top-1/2 -translate-y-1/2 w-60 bg-white dark:bg-slate-800 rounded-md shadow-lg border border-amber-200 dark:border-slate-700 p-3 z-30">
                              <div className="text-center mb-3">
                                <h3 className="font-serif font-bold text-amber-900 dark:text-amber-400">{set.type}</h3>
                                <div className="text-xs text-slate-500 dark:text-slate-400">{set.subject}</div>
                              </div>
                              
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-slate-600 dark:text-slate-400">Questions:</span>
                                  <span className="font-medium">{set.questions.length}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600 dark:text-slate-400">Accuracy:</span>
                                  <span className="font-medium">{set.accuracy}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600 dark:text-slate-400">Difficulty:</span>
                                  <span className="font-medium">{set.difficulty}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600 dark:text-slate-400">Completed:</span>
                                  <span className="font-medium">{new Date(set.dateCompleted).toLocaleDateString()}</span>
                                </div>
                              </div>
                              
                              <div className="mt-4 pt-2 border-t border-slate-200 dark:border-slate-700 text-center">
                                <button 
                                  className="text-xs bg-amber-100 hover:bg-amber-200 dark:bg-amber-900 dark:hover:bg-amber-800 text-amber-900 dark:text-amber-200 px-3 py-1 rounded-full"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    onSelectSet(set.id)
                                    setBookPullout(null)
                                  }}
                                >
                                  Select This Book
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                    
                    {/* Bookend */}
                    {sets.length > 0 && (
                      <div 
                        className="h-[70px] w-8 rounded-r-sm bg-amber-950 dark:bg-amber-950 opacity-70 shadow-md"
                        style={{
                          boxShadow: 'inset -2px 0 3px rgba(0,0,0,0.3)'
                        }}
                      ></div>
                    )}
                  </div>
                </div>
                
                {/* Shelf support */}
                <div className="h-4 bg-amber-900 dark:bg-amber-950 rounded-b-md shadow-md relative">
                  {/* Wood grain for shelf edge */}
                  <div 
                    className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none rounded-b-md"
                    style={{
                      backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iNSI+PGZpbHRlciBpZD0ibm9pc2UiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giPjwvZmVUdXJidWxlbmNlPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC43Ii8+PC9zdmc+')",
                      backgroundSize: 'cover'
                    }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-80 flex flex-col items-center justify-center text-amber-800 dark:text-amber-500">
              <div className="text-center p-8 max-w-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="font-serif text-lg font-medium mb-2">No Books on these Shelves</p>
                <p className="font-serif text-sm opacity-70">
                  Adjust the filters to see available volumes in your collection.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Description */}
      <div className="mt-4 bg-white dark:bg-slate-800 border border-amber-100 dark:border-slate-700 rounded-lg p-3 text-sm">
        <p className="font-serif text-amber-900 dark:text-amber-400">
          This view organizes your question sets as books on a bookshelf. Each book's appearance reflects the set's properties - 
          thickness shows question count, height represents accuracy, and colors are derived from subject and type. 
          Click a book to pull it out and see details.
        </p>
      </div>
    </div>
  )
}
