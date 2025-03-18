import React from 'react';

interface EmptyMatrixCellProps {
  subject: string;
  topic: string;
}

export const EmptyMatrixCell: React.FC<EmptyMatrixCellProps> = ({ subject, topic }) => {
  // Get subject color
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          light: 'bg-indigo-50/50 border-indigo-200/50 text-indigo-400',
          dark: 'dark:bg-indigo-900/10 dark:border-indigo-800/30 dark:text-indigo-300/50',
          gradient: 'from-indigo-50/30 to-transparent'
        };
      case 'Reading':
        return {
          light: 'bg-emerald-50/50 border-emerald-200/50 text-emerald-400',
          dark: 'dark:bg-emerald-900/10 dark:border-emerald-800/30 dark:text-emerald-300/50',
          gradient: 'from-emerald-50/30 to-transparent'
        };
      case 'Writing':
        return {
          light: 'bg-amber-50/50 border-amber-200/50 text-amber-400',
          dark: 'dark:bg-amber-900/10 dark:border-amber-800/30 dark:text-amber-300/50',
          gradient: 'from-amber-50/30 to-transparent'
        };
      default:
        return {
          light: 'bg-slate-50/50 border-slate-200/50 text-slate-400',
          dark: 'dark:bg-slate-800/10 dark:border-slate-700/30 dark:text-slate-500',
          gradient: 'from-slate-50/30 to-transparent'
        };
    }
  };

  const colors = getSubjectColor(subject);

  return (
    <div className={`p-4 rounded-lg border grid grid-cols-6 items-center gap-4 border-dashed ${colors.light} ${colors.dark} bg-gradient-to-br ${colors.gradient} backdrop-blur-sm transition-all duration-200`}>
      {/* Subject Column */}
      <div className="opacity-50">
        <span className={`px-2 py-1 text-xs rounded-md bg-opacity-25 font-medium`}>
          {subject}
        </span>
      </div>
      
      {/* Topic Column */}
      <div className="col-span-2 text-sm font-medium">
        {topic}
      </div>
      
      {/* Empty content indicators for other columns */}
      <div className="flex items-center justify-center">
        <div className="w-16 h-4 rounded-full bg-slate-100/50 dark:bg-slate-700/20"></div>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="w-16 h-4 rounded-full bg-slate-100/50 dark:bg-slate-700/20"></div>
      </div>
      
      {/* Empty actions column with greyed out buttons */}
      <div className="flex space-x-2 opacity-50">
        <button 
          disabled
          className="px-3 py-1 text-xs rounded-md bg-slate-100/50 text-slate-400 dark:bg-slate-700/20 dark:text-slate-500"
        >
          Practice
        </button>
        
        <button
          disabled
          className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100/50 text-slate-400 dark:bg-slate-700/20 dark:text-slate-500"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
