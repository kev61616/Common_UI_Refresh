'use client'

import { useState } from 'react'
import { TimelineViewProps } from './types'

/**
 * Evolutionary Tree Timeline (Timeline View Variant 23)
 * Visualizes learning sessions as branches of an evolutionary tree with branching patterns showing knowledge evolution
 */
export function EvolutionaryTreeTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  const [expandedBranches, setExpandedBranches] = useState<Set<string>>(new Set());
  
  // Group sets by subject
  const subjectGroups = practiceSets.reduce((acc, set) => {
    if (!acc[set.subject]) {
      acc[set.subject] = [];
    }
    acc[set.subject].push(set);
    return acc;
  }, {} as Record<string, typeof practiceSets>);
  
  // Sort sets within each subject by date
  Object.keys(subjectGroups).forEach(subject => {
    subjectGroups[subject].sort((a, b) => 
      new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
    );
  });
  
  // Toggle expanded state for a branch
  const toggleBranch = (branchId: string) => {
    setExpandedBranches(prev => {
      const newSet = new Set(prev);
      if (newSet.has(branchId)) {
        newSet.delete(branchId);
      } else {
        newSet.add(branchId);
      }
      return newSet;
    });
  };
  
  // Generate a divergence angle for a branch based on the set
  const getDivergenceAngle = (set: (typeof practiceSets)[0], index: number) => {
    const baseAngle = 10; // Base angle for divergence in degrees
    // Divergence based on accuracy: higher accuracy = less divergence
    const accuracyFactor = (100 - set.accuracy) / 100 * 40;
    // Slight random variation for natural appearance
    const randomFactor = (Math.random() - 0.5) * 5;
    // Alternate direction for aesthetic balance
    const direction = index % 2 === 0 ? 1 : -1;
    
    return direction * (baseAngle + accuracyFactor + randomFactor);
  };
  
  // Get color for a branch based on the subject
  const getBranchColor = (subject: string) => {
    switch (subject) {
      case 'Math': return 'from-green-600 to-green-400 dark:from-green-700 dark:to-green-500';
      case 'Reading': return 'from-blue-600 to-blue-400 dark:from-blue-700 dark:to-blue-500';
      case 'Writing': return 'from-purple-600 to-purple-400 dark:from-purple-700 dark:to-purple-500';
      default: return 'from-amber-600 to-amber-400 dark:from-amber-700 dark:to-amber-500';
    }
  };
  
  // Get node icon based on set type
  const getNodeIcon = (setType: string) => {
    switch (setType.toLowerCase()) {
      case 'test':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
        );
      case 'quiz':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
        );
      case 'practice':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
        );
    }
  };
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm overflow-hidden">
      <h3 className="text-xl font-bold mb-6 text-center">23. Evolutionary Tree Timeline</h3>
      
      <div className="min-h-[600px] bg-gradient-to-b from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800 rounded-lg p-6 overflow-auto">
        {/* Tree trunk starting point */}
        <div className="w-4 h-32 mx-auto bg-gradient-to-t from-amber-700 to-amber-500 dark:from-amber-900 dark:to-amber-700 rounded-full"></div>
        
        <div className="mt-6 space-y-16">
          {/* Subject branches */}
          {Object.entries(subjectGroups).map(([subject, sets], subjectIndex) => {
            const branchId = `branch-${subject}`;
            const isExpanded = expandedBranches.has(branchId);
            const subjectColor = getBranchColor(subject);
            
            return (
              <div key={subject} className="relative">
                {/* Main subject branch */}
                <div className="flex items-center justify-center mb-4">
                  <div className={`w-2 h-20 bg-gradient-to-t ${subjectColor} rounded-full transform rotate-${subjectIndex % 2 === 0 ? '15' : '-15'}`}></div>
                  
                  {/* Subject node */}
                  <button
                    onClick={() => toggleBranch(branchId)}
                    className={`absolute top-16 -mt-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10
                               bg-gradient-to-br ${subjectColor} text-white
                               ${isExpanded ? 'ring-2 ring-white dark:ring-slate-700' : ''}`}
                  >
                    {isExpanded ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>
                </div>
                
                {/* Subject label */}
                <div className="text-center font-bold text-lg mb-8">
                  {subject}
                </div>
                
                {/* Sets sub-branches (only show if expanded) */}
                {isExpanded && (
                  <div className="ml-6 pl-12 relative space-y-12">
                    {/* Connecting line to main trunk */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 to-transparent dark:from-amber-700"></div>
                    
                    {sets.map((set, setIndex) => {
                      const divergenceAngle = getDivergenceAngle(set, setIndex);
                      const isBranchSelected = set.id === selectedSetId;
                      
                      return (
                        <div 
                          key={set.id} 
                          className="relative"
                          style={{ 
                            transform: `rotate(${divergenceAngle}deg)`,
                            transformOrigin: 'left center'
                          }}
                        >
                          {/* Branch line */}
                          <div className="flex items-center">
                            <div className={`h-0.5 w-40 bg-gradient-to-r ${subjectColor}`}></div>
                            
                            {/* Set node */}
                            <div 
                              onClick={() => onSelectSet(set.id)}
                              className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer
                                         bg-gradient-to-br ${subjectColor} text-white shadow-md
                                         ${isBranchSelected ? 'ring-2 ring-white dark:ring-slate-700 ring-offset-2 ring-offset-amber-50 dark:ring-offset-slate-900' : ''}`}
                            >
                              {getNodeIcon(set.type)}
                            </div>
                          </div>
                          
                          {/* Set details card */}
                          <div 
                            className={`absolute left-44 top-0 -mt-3 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-md p-3 z-10
                                        transition-opacity duration-200
                                        ${isBranchSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                            style={{ transform: `rotate(${-divergenceAngle}deg)` }}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-bold">{set.type}</h4>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(set.dateCompleted).toLocaleDateString()}
                                </div>
                              </div>
                              <div className={`text-lg font-bold ${
                                set.accuracy >= 80 ? 'text-green-600 dark:text-green-400' :
                                set.accuracy >= 60 ? 'text-blue-600 dark:text-blue-400' :
                                'text-red-600 dark:text-red-400'
                              }`}>
                                {set.accuracy}%
                              </div>
                            </div>
                            
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              {set.questions.length} questions • {Math.floor(set.timeUsed / 60)}m
                            </div>
                            
                            {/* Evolution markers */}
                            <div className="mt-2 text-xs">
                              <div className="flex items-center">
                                <span className="w-2 h-2 rounded-full bg-amber-400 mr-1"></span>
                                {set.mistakeTypes.conceptual > set.mistakeTypes.careless ? 
                                  'Conceptual challenges dominant' : 
                                  'Procedural understanding strong'}
                              </div>
                              <div className="flex items-center mt-1">
                                <span className="w-2 h-2 rounded-full bg-green-400 mr-1"></span>
                                {set.accuracy > 75 ? 
                                  'Well-adapted to this question type' : 
                                  'Still evolving strategy for this type'}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="mt-16 bg-white/80 dark:bg-slate-800/80 p-4 rounded-lg backdrop-blur-sm">
          <h4 className="font-medium mb-2">Evolutionary Tree Legend</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-600 to-amber-400 mr-2"></div>
              <span>Main Evolutionary Trunk</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-600 to-green-400 mr-2"></div>
              <span>Math Branch</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 mr-2"></div>
              <span>Reading Branch</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 mr-2"></div>
              <span>Writing Branch</span>
            </div>
          </div>
          <div className="mt-2 text-sm">
            <span className="italic">Note: Branch divergence represents performance variations. Greater angles indicate more adaptation needed.</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
        Click on subject nodes to expand/collapse branches. Select session nodes to view details.
      </div>
    </div>
  );
}
