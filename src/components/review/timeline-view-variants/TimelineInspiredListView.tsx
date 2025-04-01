'use client'

import { PracticeSet } from '@/lib/mockData'

interface TimelineViewProps {
  practiceSets: PracticeSet[];
  onSelectSet: (id: string) => void;
  selectedSetId: string | null;
  sortConfig?: {
    key: string;
    direction: 'asc' | 'desc';
  };
  onSortChange?: (key: string, direction: 'asc' | 'desc') => void;
}

/**
 * Timeline Inspired List View - A tabular view of practice sets
 */
export function TimelineInspiredListView({ 
  practiceSets, 
  onSelectSet, 
  selectedSetId,
  sortConfig = { key: 'dateCompleted', direction: 'desc' },
  onSortChange
}: TimelineViewProps) {
  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  
  // Format date to Mar 16 '25 format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const month = date.toLocaleString('en-US', { month: 'short' })
    const day = date.getDate()
    const year = date.getFullYear().toString().slice(2)
    
    return {
      fullDate: `${month} ${day} '${year}`,
      timeOfDay: date.getHours() < 12 ? 'Morning' : 
                date.getHours() < 18 ? 'Afternoon' : 'Evening'
    }
  }
  
  // Get difficulty label
  const getDifficultyLabel = (accuracy: number) => {
    if (accuracy >= 85) return 'Easy';
    if (accuracy >= 75) return 'Medium';
    return 'Hard';
  }
  
  // Get pace label
  const getPaceLabel = (timeUsed: number, type: string) => {
    // Simple logic - in real app would be more sophisticated based on type/expected time
    if (timeUsed < 1200) return 'Fast'; // Less than 20 minutes
    if (timeUsed < 2100) return 'Normal'; // Less than 35 minutes
    return 'Slow';
  }
  
  // Get color for accuracy
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-emerald-500 dark:text-emerald-400';
    if (accuracy >= 80) return 'text-amber-500 dark:text-amber-400';
    if (accuracy >= 70) return 'text-yellow-500 dark:text-yellow-300';
    return 'text-red-600 dark:text-red-400';
  }
  
  // Get background color for difficulty
  const getDifficultyBgColor = (label: string) => {
    switch (label) {
      case 'Easy': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'Medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200';
    }
  }
  
  // Get background color for pace
  const getPaceBgColor = (label: string) => {
    switch (label) {
      case 'Fast': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Normal': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Slow': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200';
    }
  }
  
  // Get subject icon letter
  const getSubjectInitial = (subject: string) => {
    return subject.charAt(0);
  }
  
  // Get background color for subject
  const getSubjectBgColor = (subject: string) => {
    switch (subject) {
      case 'Math': return 'bg-indigo-100 dark:bg-indigo-900/40';
      case 'Reading': return 'bg-blue-100 dark:bg-blue-900/40';
      case 'Writing': return 'bg-amber-100 dark:bg-amber-900/40';
      default: return 'bg-slate-100 dark:bg-slate-800';
    }
  }
  
  // Check if user might be experiencing fatigue
  const getFatigueInfo = (set: PracticeSet) => {
    const baselineAccuracy = 80; // Example threshold
    const percentDrop = ((baselineAccuracy - set.accuracy) / baselineAccuracy) * 100;
    
    if (percentDrop > 15 && set.timeUsed > 1800) { // More than 15% drop and longer than 30 minutes
      return {
        hasFatigue: true,
        percentage: Math.round(percentDrop)
      };
    }
    
    return { hasFatigue: false, percentage: 0 };
  }
  
  // Format correct vs questions (made up for visual purposes)
  const formatCorrectQuestions = (accuracy: number, total: number = 20) => {
    const correct = Math.round((accuracy / 100) * total);
    const incorrect = total - correct;
    return `${correct}c ${incorrect}i`;
  }
  // Format relative time (e.g., "12 hours ago")
  const formatRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return 'Over a week ago';
  };
  
  // Handle column header click for sorting
  const handleSortClick = (key: string) => {
    if (!onSortChange) return;
    
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    onSortChange(key, direction);
  };
  
  // Get sort direction indicator
  const getSortIndicator = (key: string) => {
    if (sortConfig.key !== key) return null;
    
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 20 20" 
        fill="currentColor" 
        className="w-4 h-4 ml-1"
      >
        <path 
          fillRule="evenodd" 
          d={sortConfig.direction === 'asc' 
            ? "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
            : "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
          } 
          clipRule="evenodd" 
        />
      </svg>
    );
  };
  
  // Sort practice sets based on sortConfig
  const sortedSets = [...practiceSets].sort((a, b) => {
    if (sortConfig.key === 'dateCompleted') {
      return sortConfig.direction === 'asc'
        ? new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
        : new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime();
    }
    
    if (sortConfig.key === 'accuracy') {
      return sortConfig.direction === 'asc'
        ? a.accuracy - b.accuracy
        : b.accuracy - a.accuracy;
    }
    
    if (sortConfig.key === 'timeUsed') {
      return sortConfig.direction === 'asc'
        ? a.timeUsed - b.timeUsed
        : b.timeUsed - a.timeUsed;
    }
    
    if (sortConfig.key === 'subject') {
      return sortConfig.direction === 'asc'
        ? a.subject.localeCompare(b.subject)
        : b.subject.localeCompare(a.subject);
    }
    
    if (sortConfig.key === 'type') {
      return sortConfig.direction === 'asc'
        ? a.type.localeCompare(b.type)
        : b.type.localeCompare(a.type);
    }
    
    if (sortConfig.key === 'difficulty') {
      const diffA = getDifficultyLabel(a.accuracy);
      const diffB = getDifficultyLabel(b.accuracy);
      // Custom order: Easy (2), Medium (1), Hard (0)
      const difficultyOrder = { 'Easy': 2, 'Medium': 1, 'Hard': 0 };
      return sortConfig.direction === 'asc'
        ? difficultyOrder[diffA] - difficultyOrder[diffB]
        : difficultyOrder[diffB] - difficultyOrder[diffA];
    }
    
    if (sortConfig.key === 'pace') {
      const paceA = getPaceLabel(a.timeUsed, a.type);
      const paceB = getPaceLabel(b.timeUsed, b.type);
      // Custom order: Fast (2), Normal (1), Slow (0)
      const paceOrder = { 'Fast': 2, 'Normal': 1, 'Slow': 0 };
      return sortConfig.direction === 'asc'
        ? paceOrder[paceA] - paceOrder[paceB]
        : paceOrder[paceB] - paceOrder[paceA];
    }
    
    return 0;
  });
  
  // If no practice sets match the filters, show a message
  if (sortedSets.length === 0) {
    return (
      <div className="bg-white text-center py-8 rounded-lg shadow-sm border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
        <p className="text-slate-500 dark:text-slate-400">No practice sets match your filters</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
      {/* Table header - with adjusted column widths */}
      <div className="grid grid-cols-12 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
        <button 
          onClick={() => handleSortClick('subject')}
          className="py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400 text-left flex items-center hover:text-slate-700 dark:hover:text-slate-300 transition-colors col-span-2"
        >
          SUBJECT
          {getSortIndicator('subject')}
        </button>
        <button 
          onClick={() => handleSortClick('type')}
          className="py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400 text-left flex items-center hover:text-slate-700 dark:hover:text-slate-300 transition-colors col-span-4"
        >
          TAGS
          {getSortIndicator('type')}
        </button>
        <button 
          onClick={() => handleSortClick('dateCompleted')}
          className="py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400 text-left flex items-center hover:text-slate-700 dark:hover:text-slate-300 transition-colors col-span-2"
        >
          TIME
          {getSortIndicator('dateCompleted')}
        </button>
        <button 
          onClick={() => handleSortClick('accuracy')}
          className="py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400 text-left flex items-center hover:text-slate-700 dark:hover:text-slate-300 transition-colors col-span-2"
        >
          PERFORMANCE
          {getSortIndicator('accuracy')}
        </button>
        <button 
          onClick={() => handleSortClick('difficulty')}
          className="py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400 text-left flex items-center hover:text-slate-700 dark:hover:text-slate-300 transition-colors col-span-1"
        >
          DIFF
          {getSortIndicator('difficulty')}
        </button>
        <button 
          onClick={() => handleSortClick('pace')}
          className="py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400 text-left flex items-center hover:text-slate-700 dark:hover:text-slate-300 transition-colors col-span-1"
        >
          PACE
          {getSortIndicator('pace')}
        </button>
      </div>
      
      {/* Practice set rows */}
      <div className="divide-y divide-slate-200 dark:divide-slate-700">  
        {sortedSets.map(set => {
          const { fullDate, timeOfDay } = formatDate(set.dateCompleted);
          const difficultyLabel = getDifficultyLabel(set.accuracy);
          const paceLabel = getPaceLabel(set.timeUsed, set.type);
          const fatigue = getFatigueInfo(set);
          const formattedTime = formatTime(set.timeUsed);
          const correctQuestions = formatCorrectQuestions(set.accuracy);
          const relativeTime = formatRelativeTime(set.dateCompleted);
          
          return (
            <div 
              key={set.id}
              onClick={() => onSelectSet(set.id)}
              className={`grid grid-cols-12 py-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors duration-150 ${
                selectedSetId === set.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              {/* Subject */}
              <div className="px-4 flex flex-col justify-center col-span-2">
                <div className="font-medium">{set.subject}</div>
                {/* Removed redundant type display since it's shown as a tag */}
              </div>
              
              {/* Tags */}
              <div className="px-4 flex items-center col-span-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 max-w-full overflow-hidden whitespace-nowrap overflow-ellipsis`}>
                  {set.type.length > 25 ? `${set.type.substring(0, 22)}...` : set.type}
                </span>
              </div>
              
              {/* Time (was Date) */}
              <div className="px-4 flex flex-col justify-center col-span-2">
                <div className="font-medium">{fullDate}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{relativeTime}</div>
              </div>
              
              {/* Performance */}
              <div className="px-4 flex flex-col justify-center">
                <div className={`text-xl font-bold ${getAccuracyColor(set.accuracy)}`}>{set.accuracy}%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{correctQuestions}</div>
              </div>
              
              {/* Difficulty */}
              <div className="px-4 flex items-center">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyBgColor(difficultyLabel)}`}>
                  {difficultyLabel}
                </span>
              </div>
              
              {/* Pace */}
              <div className="px-4 flex items-center">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaceBgColor(paceLabel)}`}>
                  {paceLabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
