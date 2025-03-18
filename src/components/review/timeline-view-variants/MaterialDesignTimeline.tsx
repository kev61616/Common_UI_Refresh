'use client'

import { useState, useEffect } from 'react'
import { TimelineViewProps } from './types'

/**
 * Material Design Timeline (Timeline View Variant 28)
 * A timeline visualization following Google's Material Design principles with
 * card-based UI, elevation, and clean typography
 */
export function MaterialDesignTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  const [hoveredSetId, setHoveredSetId] = useState<string | null>(null);
  
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
      const element = document.getElementById(`material-set-${selectedSetId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedSetId]);
  
  // Generate color based on subject
  const getSubjectColor = (subject: string) => {
    switch(subject) {
      case 'Math':
        return {
          primary: 'bg-blue-500',
          primaryDark: 'bg-blue-600',
          light: 'bg-blue-100',
          text: 'text-blue-500',
          icon: '📊'
        };
      case 'Reading':
        return {
          primary: 'bg-green-500',
          primaryDark: 'bg-green-600',
          light: 'bg-green-100',
          text: 'text-green-500',
          icon: '📚'
        };
      case 'Writing':
        return {
          primary: 'bg-purple-500',
          primaryDark: 'bg-purple-600',
          light: 'bg-purple-100',
          text: 'text-purple-500',
          icon: '✏️'
        };
      default:
        return {
          primary: 'bg-gray-500',
          primaryDark: 'bg-gray-600',
          light: 'bg-gray-100',
          text: 'text-gray-500',
          icon: '📝'
        };
    }
  };
  
  // Format date in Material Design style
  const formatMaterialDate = (dateString: string) => {
    const date = new Date(dateString);
    // Format: Apr 12, 2025
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Material UI Chip component
  const MaterialChip = ({ label, color }: { label: string, color: string }) => {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        {label}
      </span>
    );
  };
  
  // Material Design Progress indicator
  const CircularProgress = ({ percentage, size = 40, color }: { percentage: number, size?: number, color: string }) => {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg className="absolute" width={size} height={size}>
          <circle 
            cx={size/2} 
            cy={size/2} 
            r={radius} 
            fill="none" 
            strokeWidth="3" 
            stroke="currentColor" 
            className="text-gray-200 dark:text-gray-700" 
          />
        </svg>
        
        {/* Progress circle */}
        <svg className="absolute rotate-[-90deg]" width={size} height={size}>
          <circle 
            cx={size/2} 
            cy={size/2} 
            r={radius} 
            fill="none" 
            strokeWidth="3" 
            stroke="currentColor" 
            className={color}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Text in middle */}
        <span className="text-xs font-medium z-10">{percentage}%</span>
      </div>
    );
  };
  
  // Determine color based on accuracy for text
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-500';
    if (accuracy >= 60) return 'text-amber-500';
    return 'text-red-500';
  };
  
  // Determine color based on accuracy for progress
  const getAccuracyProgressColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-500';
    if (accuracy >= 60) return 'text-amber-500';
    return 'text-red-500';
  };
  
  // Material Ripple Effect on click
  const RippleEffect = ({ isActive }: { isActive: boolean }) => {
    return isActive ? (
      <span className="absolute inset-0 rounded-md overflow-hidden pointer-events-none">
        <span className="absolute inset-0 rounded-md bg-current opacity-5"></span>
        <span className="absolute inset-0 rounded-md transform scale-50 animate-ripple bg-current opacity-10"></span>
      </span>
    ) : null;
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden p-4 md:p-6">
      <h3 className="text-center text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        <span className="text-3xl">28.</span> Material Design Timeline
      </h3>
      
      <div className="text-center mb-8 text-gray-600 dark:text-gray-400">
        A timeline visualization following Google's Material Design principles
      </div>
      
      {/* Floating Action Button (FAB) */}
      <button className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center z-10 focus:outline-none hover:bg-blue-600 active:bg-blue-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span className="sr-only">Add Practice Set</span>
      </button>
      
      {/* Timeline content */}
      <div className="relative pt-4">
        {sortedMonths.map((month, monthIndex) => {
          const sets = monthlyGroups[month];
          
          return (
            <div key={month} className="mb-12">
              {/* Month header */}
              <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 py-2 mb-4">
                <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200 pl-16">
                  {month}
                </h4>
                <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              </div>
              
              {/* Practice sets */}
              <div className="space-y-4">
                {sets.map((set) => {
                  const isSelected = set.id === selectedSetId;
                  const isHovered = set.id === hoveredSetId;
                  const colors = getSubjectColor(set.subject);
                  const accuracyColor = getAccuracyColor(set.accuracy);
                  const progressColor = getAccuracyProgressColor(set.accuracy);
                  
                  return (
                    <div 
                      id={`material-set-${set.id}`}
                      key={set.id}
                      onClick={() => onSelectSet(set.id)}
                      onMouseEnter={() => setHoveredSetId(set.id)}
                      onMouseLeave={() => setHoveredSetId(null)}
                      className={`relative ml-16 rounded-lg overflow-hidden transition-shadow ${isSelected || isHovered ? 'shadow-lg' : 'shadow'} cursor-pointer`}
                    >
                      {/* Timeline dot */}
                      <div className={`absolute left-[-36px] top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-full ${colors.primary} flex items-center justify-center border-4 border-white dark:border-gray-900 z-10`}>
                        <span className="text-xs text-white">{colors.icon}</span>
                      </div>
                      
                      {/* Line from dot to next dot */}
                      <div className="absolute left-[-32.5px] top-1/2 bottom-[-50%] w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                      
                      {/* Material UI Card */}
                      <div className={`bg-white dark:bg-gray-800 border-l-4 ${isSelected ? `${colors.primary} dark:${colors.primaryDark}` : 'border-transparent'} rounded-lg overflow-hidden relative`}>
                        {/* Ripple effect */}
                        <RippleEffect isActive={isSelected || isHovered} />
                        
                        {/* Card header with accent color */}
                        <div className={`px-6 py-4 border-b border-gray-100 dark:border-gray-700 relative flex items-center justify-between ${isSelected ? `${colors.light} dark:bg-opacity-10` : ''}`}>
                          <div>
                            <h5 className="text-lg font-medium text-gray-800 dark:text-white mb-1">{set.type}</h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{formatMaterialDate(set.dateCompleted)}</p>
                          </div>
                          
                          <MaterialChip 
                            label={set.subject} 
                            color={`${colors.light} ${colors.text}`} 
                          />
                        </div>
                        
                        {/* Card content */}
                        <div className="px-6 py-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <CircularProgress 
                                percentage={set.accuracy} 
                                color={progressColor} 
                              />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Accuracy</p>
                                <p className={`text-lg font-bold ${accuracyColor}`}>{set.accuracy}%</p>
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400 mr-3">Questions:</span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">{set.questions.length}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400 mr-3">Duration:</span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">{Math.floor(set.timeUsed / 60)}m {set.timeUsed % 60}s</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Error chips */}
                          <div className="flex flex-wrap gap-2">
                            <MaterialChip 
                              label={`${set.mistakeTypes.conceptual} Conceptual Errors`} 
                              color="bg-red-100 text-red-700 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-400" 
                            />
                            <MaterialChip 
                              label={`${set.mistakeTypes.careless} Careless Errors`} 
                              color="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:bg-opacity-30 dark:text-amber-400" 
                            />
                          </div>
                        </div>
                        
                        {/* Card actions */}
                        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 flex justify-end space-x-2">
                          <button className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            Review
                          </button>
                          <button className={`${colors.text} hover:bg-${colors.light} px-3 py-1 rounded-full text-sm font-medium transition-colors`}>
                            Details
                          </button>
                        </div>
                        
                        {/* Selected indicator */}
                        {isSelected && (
                          <div className="absolute top-0 right-0 m-2">
                            <div className={`w-6 h-6 rounded-full ${colors.primary} flex items-center justify-center`}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Material Design helper text */}
      <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
        Click on a card to view detailed information
      </div>
      
      {/* Material ripple effect animation */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.2;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        .animate-ripple {
          animation: ripple 600ms linear;
        }
      `}</style>
    </div>
  );
}
