'use client'

import React, { useState, useEffect } from 'react'
import { SetViewProps } from './types'

export const MedievalManuscriptView: React.FC<SetViewProps> = ({ 
  sets, 
  selectedSetId, 
  onSelectSet, 
  isLoading = false 
}) => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!sets || sets.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-amber-800 font-serif italic">No manuscripts available in the archives</p>
      </div>
    )
  }

  // Group sets by their subject area for illuminated sections
  const groupedSets = sets.reduce((acc, set) => {
    const subject = set.subject || 'Miscellaneous'
    if (!acc[subject]) {
      acc[subject] = []
    }
    acc[subject].push(set)
    return acc
  }, {} as Record<string, typeof sets>)

  return (
    <div className="p-1 md:p-4">
      <div className="bg-[#f5edd0] rounded-lg overflow-hidden shadow-xl border-4 border-[#8B5A2B] relative">
        {/* Decorative corner flourishes */}
        <div className="absolute top-0 left-0 w-16 h-16 border-b-4 border-r-4 border-[#8B5A2B] rounded-br-xl"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-b-4 border-l-4 border-[#8B5A2B] rounded-bl-xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-t-4 border-r-4 border-[#8B5A2B] rounded-tr-xl"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-t-4 border-l-4 border-[#8B5A2B] rounded-tl-xl"></div>
        
        {/* Title Heading with illuminated capital */}
        <div className="text-center py-6 font-serif border-b-4 border-[#8B5A2B]">
          <h2 className="text-3xl text-[#5B3A1F] flex items-center justify-center">
            <span className="inline-block relative text-5xl font-bold text-[#8B0000] mr-1">
              C
              <span className="absolute -top-1 -left-1 text-[#bf9b30] opacity-80 text-5xl">C</span>
            </span>
            <span>odex Practicum</span>
          </h2>
          <p className="text-[#5B3A1F] italic mt-1 text-sm">Anno Domini MMXXV</p>
        </div>
        
        {/* Main content with illuminated margins */}
        <div className="relative p-6 md:p-10 border-4 border-[#f5edd0] m-4 bg-[#f7f2e2]">
          {/* Left margin decorative pattern */}
          <div className="absolute left-0 top-0 bottom-0 w-6 md:w-8 bg-[#cd9c5a] bg-opacity-20 flex flex-col items-center">
            {Array(10).fill(0).map((_, i) => (
              <div 
                key={`left-deco-${i}`} 
                className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-[#8B5A2B] mt-6"
                style={{ backgroundColor: i % 3 === 0 ? '#bf9b30' : i % 3 === 1 ? '#8B0000' : '#2E4372' }}
              ></div>
            ))}
          </div>
          
          {/* Set listings as manuscript content */}
          <div className="ml-8 md:ml-10">
            {Object.entries(groupedSets).map(([subject, subjectSets], subjectIndex) => (
              <div key={subject} className="mb-10">
                {/* Illuminated subject heading */}
                <h3 className="text-xl text-[#5B3A1F] font-serif mb-4 flex items-center">
                  <span className={`inline-block w-8 h-8 mr-2 rounded-full flex items-center justify-center text-white font-bold 
                    ${subjectIndex % 3 === 0 ? 'bg-[#8B0000]' : subjectIndex % 3 === 1 ? 'bg-[#2E4372]' : 'bg-[#556B2F]'}`}>
                    {subject.charAt(0)}
                  </span>
                  <span className="border-b border-[#8B5A2B] pb-1 flex-1">{subject}</span>
                </h3>
                
                {/* Sets for this subject */}
                <div className="pl-10 space-y-4">
                  {subjectSets.map((set) => (
                    <div 
                      key={set.id} 
                      onClick={() => onSelectSet(set.id)}
                      className={`
                        p-3 rounded cursor-pointer relative transition-all duration-300
                        ${selectedSetId === set.id 
                          ? 'bg-[#bf9b30] bg-opacity-20 shadow-inner' 
                          : 'hover:bg-[#f5edd0] hover:shadow'
                        }
                      `}
                    >
                      {/* Decorative initial capital for selected set */}
                      {selectedSetId === set.id && (
                        <span className="absolute -left-8 top-2 text-2xl font-bold text-[#8B0000]">❧</span>
                      )}
                      
                      <h4 className="font-serif text-[#5B3A1F] text-lg font-medium">
                        {set.title}
                      </h4>
                      
                      <div className="mt-1 text-sm text-[#5B3A1F] flex items-center">
                        <span className="inline-block w-3 h-3 mr-1 bg-[#8B5A2B] rounded-full opacity-60"></span>
                        <span className="italic">{set.questions.length} questions</span>
                        
                        <span className="mx-2 text-[#8B5A2B]">•</span>
                        
                        <span className="italic">
                          {set.completedCount}/{set.questions.length} completed
                        </span>
                        
                        {set.lastReviewed && (
                          <>
                            <span className="mx-2 text-[#8B5A2B]">•</span>
                            <span className="italic">Last studied: {new Date(set.lastReviewed).toLocaleDateString()}</span>
                          </>
                        )}
                      </div>
                      
                      {/* Completion indicator as illuminated bar */}
                      <div className="mt-2 h-2 bg-[#f5edd0] rounded overflow-hidden">
                        <div 
                          className="h-full bg-[#8B0000]" 
                          style={{ 
                            width: `${(set.completedCount / set.questions.length) * 100}%`,
                            backgroundImage: 'linear-gradient(90deg, #8B0000, #bf9b30)'
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer with illuminated content */}
        <div className="border-t-4 border-[#8B5A2B] p-4 text-center font-serif text-sm text-[#5B3A1F] italic">
          <p>Scriptus per manus Claude in annum MMXXV</p>
          <div className="flex justify-center mt-2 space-x-4">
            {[0, 1, 2].map((i) => (
              <div 
                key={`footer-${i}`}
                className="w-6 h-6 rounded-full border-2 border-[#8B5A2B]"
                style={{ 
                  backgroundColor: i === 0 ? '#bf9b30' : i === 1 ? '#8B0000' : '#2E4372',
                  opacity: 0.7
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}