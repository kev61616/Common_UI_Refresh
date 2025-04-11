'use client';

import { useState, useEffect } from 'react';
import { TimelineViewProps } from './types';

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
    switch (subject) {
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
  const MaterialChip = ({ label, color }: {label: string;color: string;}) => {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`} data-oid="e77gl71">
        {label}
      </span>);

  };

  // Material Design Progress indicator
  const CircularProgress = ({ percentage, size = 40, color }: {percentage: number;size?: number;color: string;}) => {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - percentage / 100 * circumference;

    return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }} data-oid="xkfw0gd">
        {/* Background circle */}
        <svg className="absolute" width={size} height={size} data-oid="zg1rmn-">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth="3"
            stroke="currentColor"
            className="text-gray-200 dark:text-gray-700" data-oid="bv48qhw" />

        </svg>
        
        {/* Progress circle */}
        <svg className="absolute rotate-[-90deg]" width={size} height={size} data-oid="ncqbl:m">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth="3"
            stroke="currentColor"
            className={color}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round" data-oid="l5k2x:k" />

        </svg>
        
        {/* Text in middle */}
        <span className="text-xs font-medium z-10" data-oid="8.-:mgx">{percentage}%</span>
      </div>);

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
  const RippleEffect = ({ isActive }: {isActive: boolean;}) => {
    return isActive ?
    <span className="absolute inset-0 rounded-md overflow-hidden pointer-events-none" data-oid="l47x3il">
        <span className="absolute inset-0 rounded-md bg-current opacity-5" data-oid="btwusb."></span>
        <span className="absolute inset-0 rounded-md transform scale-50 animate-ripple bg-current opacity-10" data-oid="r2xid.j"></span>
      </span> :
    null;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden p-4 md:p-6" data-oid="44zxdvz">
      <h3 className="text-center text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200" data-oid="14w_gtb">
        <span className="text-3xl" data-oid="r72jg7b">28.</span> Material Design Timeline
      </h3>
      
      <div className="text-center mb-8 text-gray-600 dark:text-gray-400" data-oid="ribg9ni">
        A timeline visualization following Google's Material Design principles
      </div>
      
      {/* Floating Action Button (FAB) */}
      <button className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center z-10 focus:outline-none hover:bg-blue-600 active:bg-blue-700 transition-colors" data-oid="82upl9e">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="qzlj-q7">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-oid="vckrv6m" />
        </svg>
        <span className="sr-only" data-oid="wi:moqd">Add Practice Set</span>
      </button>
      
      {/* Timeline content */}
      <div className="relative pt-4" data-oid="igrvfqu">
        {sortedMonths.map((month, monthIndex) => {
          const sets = monthlyGroups[month];

          return (
            <div key={month} className="mb-12" data-oid="prnnggu">
              {/* Month header */}
              <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 py-2 mb-4" data-oid="q2hb50j">
                <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200 pl-16" data-oid="-d4cs2u">
                  {month}
                </h4>
                <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" data-oid="ww3s8lx"></div>
              </div>
              
              {/* Practice sets */}
              <div className="space-y-4" data-oid="a_cl6mn">
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
                      className={`relative ml-16 rounded-lg overflow-hidden transition-shadow ${isSelected || isHovered ? 'shadow-lg' : 'shadow'} cursor-pointer`} data-oid="4934_c7">

                      {/* Timeline dot */}
                      <div className={`absolute left-[-36px] top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-full ${colors.primary} flex items-center justify-center border-4 border-white dark:border-gray-900 z-10`} data-oid="kk2.9oo">
                        <span className="text-xs text-white" data-oid="m6xiut2">{colors.icon}</span>
                      </div>
                      
                      {/* Line from dot to next dot */}
                      <div className="absolute left-[-32.5px] top-1/2 bottom-[-50%] w-0.5 bg-gray-200 dark:bg-gray-700" data-oid="o_wplcf"></div>
                      
                      {/* Material UI Card */}
                      <div className={`bg-white dark:bg-gray-800 border-l-4 ${isSelected ? `${colors.primary} dark:${colors.primaryDark}` : 'border-transparent'} rounded-lg overflow-hidden relative`} data-oid="81qp4um">
                        {/* Ripple effect */}
                        <RippleEffect isActive={isSelected || isHovered} data-oid="rj1ly8z" />
                        
                        {/* Card header with accent color */}
                        <div className={`px-6 py-4 border-b border-gray-100 dark:border-gray-700 relative flex items-center justify-between ${isSelected ? `${colors.light} dark:bg-opacity-10` : ''}`} data-oid="yohag2s">
                          <div data-oid="h4mdu24">
                            <h5 className="text-lg font-medium text-gray-800 dark:text-white mb-1" data-oid="8o7xeh3">{set.type}</h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400" data-oid="1:bvlef">{formatMaterialDate(set.dateCompleted)}</p>
                          </div>
                          
                          <MaterialChip
                            label={set.subject}
                            color={`${colors.light} ${colors.text}`} data-oid="r593iw1" />

                        </div>
                        
                        {/* Card content */}
                        <div className="px-6 py-4" data-oid=":ui5web">
                          <div className="flex items-center justify-between mb-4" data-oid="la0d5jt">
                            <div className="flex items-center space-x-4" data-oid="nbjzfa2">
                              <CircularProgress
                                percentage={set.accuracy}
                                color={progressColor} data-oid=":5fwtj8" />

                              <div data-oid="pmkwh41">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300" data-oid="pd64kru">Accuracy</p>
                                <p className={`text-lg font-bold ${accuracyColor}`} data-oid="8s8jp-7">{set.accuracy}%</p>
                              </div>
                            </div>
                            
                            <div className="space-y-1" data-oid="l.mgswx">
                              <div className="flex justify-between text-sm" data-oid="02lz94:">
                                <span className="text-gray-500 dark:text-gray-400 mr-3" data-oid="ib_llwi">Questions:</span>
                                <span className="font-medium text-gray-800 dark:text-gray-200" data-oid="kr53u1k">{set.questions.length}</span>
                              </div>
                              <div className="flex justify-between text-sm" data-oid="8ifpake">
                                <span className="text-gray-500 dark:text-gray-400 mr-3" data-oid="z8ekhah">Duration:</span>
                                <span className="font-medium text-gray-800 dark:text-gray-200" data-oid="_.m5mca">{Math.floor(set.timeUsed / 60)}m {set.timeUsed % 60}s</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Error chips */}
                          <div className="flex flex-wrap gap-2" data-oid="6m1zvz6">
                            <MaterialChip
                              label={`${set.mistakeTypes.conceptual} Conceptual Errors`}
                              color="bg-red-100 text-red-700 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-400" data-oid="ufzo41a" />

                            <MaterialChip
                              label={`${set.mistakeTypes.careless} Careless Errors`}
                              color="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:bg-opacity-30 dark:text-amber-400" data-oid="31uoetq" />

                          </div>
                        </div>
                        
                        {/* Card actions */}
                        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 flex justify-end space-x-2" data-oid="oq2vmyq">
                          <button className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" data-oid="nyd7bwx">
                            Review
                          </button>
                          <button className={`${colors.text} hover:bg-${colors.light} px-3 py-1 rounded-full text-sm font-medium transition-colors`} data-oid="vbz6q_l">
                            Details
                          </button>
                        </div>
                        
                        {/* Selected indicator */}
                        {isSelected &&
                        <div className="absolute top-0 right-0 m-2" data-oid="ai6ehvr">
                            <div className={`w-6 h-6 rounded-full ${colors.primary} flex items-center justify-center`} data-oid="y1938a2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor" data-oid="d:t5ssy">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" data-oid="ce5785." />
                              </svg>
                            </div>
                          </div>
                        }
                      </div>
                    </div>);

                })}
              </div>
            </div>);

        })}
      </div>
      
      {/* Material Design helper text */}
      <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400" data-oid="1ly:0dr">
        Click on a card to view detailed information
      </div>
      
      {/* Material ripple effect animation */}
      <style jsx data-oid="zs0wq95">{`
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
    </div>);

}