'use client'

import { useState, useEffect } from 'react'
import { TimelineViewProps } from './types'

/**
 * Renaissance Codex Timeline (Timeline View Variant 24)
 * A timeline visualization inspired by Renaissance-era manuscripts and codices
 */
export function RenaissanceCodexTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  const [expandedPage, setExpandedPage] = useState<string | null>(null);
  
  // Group practice sets by month
  const monthlyGroups = practiceSets.reduce((groups, set) => {
    const date = new Date(set.dateCompleted);
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(set);
    return groups;
  }, {} as Record<string, typeof practiceSets>);
  
  // Sort months chronologically
  const sortedMonths = Object.keys(monthlyGroups).sort((a, b) => {
    const dateA = new Date(monthlyGroups[a][0].dateCompleted);
    const dateB = new Date(monthlyGroups[b][0].dateCompleted);
    return dateA.getTime() - dateB.getTime();
  });
  
  // Auto-scroll to selected set
  useEffect(() => {
    if (selectedSetId) {
      const element = document.getElementById(`codex-set-${selectedSetId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedSetId]);
  
  // Toggle expanded page
  const togglePage = (id: string) => {
    setExpandedPage(expandedPage === id ? null : id);
  };
  
  // Format date in Renaissance style
  const formatRenaissanceDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();
    
    // Add appropriate suffix to day
    let daySuffix = 'th';
    if (day === 1 || day === 21 || day === 31) daySuffix = 'st';
    else if (day === 2 || day === 22) daySuffix = 'nd';
    else if (day === 3 || day === 23) daySuffix = 'rd';
    
    return `${day}${daySuffix} of ${month}, Anno Domini ${year}`;
  };
  
  // Get decorative initial based on subject
  const getDecorativeInitial = (subject: string, type: string) => {
    const initial = subject.charAt(0).toUpperCase();
    const typeInitial = type.charAt(0).toUpperCase();
    
    // Color scheme based on subject
    const colorClass = 
      subject === 'Math' ? 'text-blue-600 from-blue-200 to-transparent' :
      subject === 'Reading' ? 'text-green-600 from-green-200 to-transparent' :
      subject === 'Writing' ? 'text-purple-600 from-purple-200 to-transparent' :
      'text-amber-600 from-amber-200 to-transparent';
    
    return (
      <div className="relative inline-block w-12 h-12 float-left mr-2 mb-1">
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-40 rounded-lg`}></div>
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
          {initial}
        </div>
        <div className="absolute bottom-0 right-0 text-xs font-medium rounded-full bg-white dark:bg-slate-700 w-5 h-5 flex items-center justify-center border-2 border-current">
          {typeInitial}
        </div>
      </div>
    );
  };
  
  // Get decorative border pattern based on accuracy
  const getBorderPattern = (accuracy: number) => {
    if (accuracy >= 90) return 'border-[4px] border-double border-amber-500/50 dark:border-amber-400/50 rounded-lg';
    if (accuracy >= 75) return 'border-[3px] border-indigo-500/50 dark:border-indigo-400/50 rounded-md';
    if (accuracy >= 60) return 'border-[2px] border-blue-500/50 dark:border-blue-400/50 rounded-sm';
    return 'border border-slate-500/50 dark:border-slate-400/50';
  };
  
  // Get grade seal based on accuracy
  const getGradeSeal = (accuracy: number) => {
    let sealColor, sealText;
    
    if (accuracy >= 90) {
      sealColor = 'bg-amber-100 border-amber-500 text-amber-700 dark:bg-amber-900/30 dark:border-amber-400 dark:text-amber-300';
      sealText = 'Excellent';
    } else if (accuracy >= 75) {
      sealColor = 'bg-indigo-100 border-indigo-500 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-400 dark:text-indigo-300';
      sealText = 'Good';
    } else if (accuracy >= 60) {
      sealColor = 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-300';
      sealText = 'Passing';
    } else {
      sealColor = 'bg-slate-100 border-slate-500 text-slate-700 dark:bg-slate-900/30 dark:border-slate-400 dark:text-slate-300';
      sealText = 'Needs Work';
    }
    
    return (
      <div className={`absolute -top-3 -right-3 w-20 h-20 rounded-full border-2 ${sealColor} flex items-center justify-center transform rotate-[-12deg] overflow-hidden shadow-md z-10`}>
        <div className="text-center">
          <div className="text-xs">Evaluation</div>
          <div className="text-sm font-bold">{sealText}</div>
          <div className="text-xs">{accuracy}%</div>
        </div>
        <div className="absolute inset-0 border-4 border-dashed border-current opacity-20 rounded-full"></div>
      </div>
    );
  };
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-md bg-gradient-to-r from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800">
      <h3 className="text-center font-serif text-2xl mb-6 text-slate-800 dark:text-slate-200">
        <span className="text-3xl">24.</span> Renaissance Codex Timeline
      </h3>
      
      <div className="text-center mb-8 text-slate-600 dark:text-slate-400 font-serif italic">
        An illustrated chronicle of your learning journey, inscribed in the style of Renaissance manuscripts
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {sortedMonths.map((month, monthIndex) => {
          const sets = monthlyGroups[month];
          
          return (
            <div 
              key={month} 
              className="bg-parchment-light dark:bg-parchment-dark rounded-lg p-6 shadow-xl"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'smallGrid\' width=\'8\' height=\'8\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M 8 0 L 0 0 0 8\' fill=\'none\' stroke=\'rgba(80, 60, 40, 0.05)\' stroke-width=\'0.5\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'rgba(255, 250, 240, 1)\'/%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23smallGrid)\'/%3E%3C/svg%3E")'
              }}
            >
              {/* Month header with decorative style */}
              <div className="text-center mb-6">
                <div className="inline-block relative">
                  <h4 className="text-xl font-serif font-bold text-slate-800 dark:text-slate-200 relative z-10">
                    {month}
                  </h4>
                  <div className="absolute left-0 right-0 bottom-0 h-1 bg-red-500/30 dark:bg-red-400/30"></div>
                  <div className="absolute -left-4 -right-4 top-1/2 h-0.5 bg-amber-500/20 dark:bg-amber-400/20"></div>
                </div>
              </div>
              
              {/* Practice set entries for this month */}
              <div className="space-y-6">
                {sets.map((set) => {
                  const isSelected = set.id === selectedSetId;
                  const isExpanded = set.id === expandedPage;
                  const borderStyle = getBorderPattern(set.accuracy);
                  
                  return (
                    <div 
                      id={`codex-set-${set.id}`}
                      key={set.id} 
                      className={`relative ${borderStyle} p-4 bg-white/80 dark:bg-slate-800/80 transition-all duration-300 ${isSelected ? 'shadow-md' : 'shadow-sm'}`}
                    >
                      {/* Decorative header */}
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-serif text-lg font-semibold text-slate-800 dark:text-slate-200">
                          {set.type}
                        </h5>
                        <div className="font-serif text-sm text-slate-600 dark:text-slate-400">
                          {formatRenaissanceDate(set.dateCompleted)}
                        </div>
                      </div>
                      
                      {/* Content with decorative initial */}
                      <div 
                        onClick={() => {
                          onSelectSet(set.id);
                          togglePage(set.id);
                        }}
                        className="cursor-pointer"
                      >
                        <div className="text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
                          {getDecorativeInitial(set.subject, set.type)}
                          <span className="text-lg">
                            {set.subject} session consisting of {set.questions.length} questions, 
                            wherein {set.questions.filter(q => q.answered).length} were attempted. 
                            The total time devoted to this study was {Math.floor(set.timeUsed / 60)} minutes.
                          </span>
                        </div>
                        
                        {/* Extended content on expansion */}
                        {isExpanded && (
                          <div className="mt-4 pl-4 border-l-2 border-slate-200 dark:border-slate-700">
                            <div className="mb-2 font-serif text-slate-600 dark:text-slate-400">
                              <span className="font-semibold">Accuracy:</span> {set.accuracy}%
                            </div>
                            <div className="mb-2 font-serif text-slate-600 dark:text-slate-400">
                              <span className="font-semibold">Questions:</span> {set.questions.length}
                            </div>
                            <div className="mb-2 font-serif text-slate-600 dark:text-slate-400">
                              <span className="font-semibold">Errors:</span> Conceptual: {set.mistakeTypes.conceptual}, 
                              Careless: {set.mistakeTypes.careless}
                            </div>
                            
                            {/* Decorative flourish */}
                            <div className="mt-4 text-center">
                              <div className="inline-block h-0.5 w-16 bg-slate-300 dark:bg-slate-600"></div>
                              <div className="inline-block h-0.5 w-4 bg-amber-500 mx-2"></div>
                              <div className="inline-block h-0.5 w-16 bg-slate-300 dark:bg-slate-600"></div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Grade seal */}
                      {getGradeSeal(set.accuracy)}
                    </div>
                  );
                })}
              </div>
              
              {/* Decorative footer */}
              <div className="flex justify-center mt-6">
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-slate-400/30 dark:via-slate-400/20 to-transparent"></div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Codex footer */}
      <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400 font-serif">
        <p>Click on any entry to expand its contents and select that practice session.</p>
        <p className="mt-1 italic">Illuminated by hand with care and attention to detail.</p>
      </div>
      
      <style jsx>{`
        .bg-parchment-light {
          background-color: rgba(255, 249, 235, 1);
        }
        .bg-parchment-dark {
          background-color: rgba(30, 32, 40, 1);
        }
      `}</style>
    </div>
  );
}
