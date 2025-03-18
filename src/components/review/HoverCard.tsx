import { PracticeSet } from '@/lib/mockData';

interface HoverCardProps {
  info: PracticeSet;
  formatTime: (seconds: number) => string;
}

export function HoverCard({ info, formatTime }: HoverCardProps) {
  // Get accuracy color class for badge
  const getAccuracyColorClass = (accuracy: number) => {
    if (accuracy >= 90) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300';
    if (accuracy >= 70) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300';
  };
  
  const isSummary = 
    info.id === 'summary' || 
    info.id === 'math-summary' || 
    info.id === 'reading-summary' || 
    info.id === 'writing-summary';
  
  return (
    <div 
      className="absolute z-50 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-3 min-w-[200px]"
      style={{
        top: '50%', 
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="font-medium text-slate-900 dark:text-white">
          {info.subject || 'Unknown Subject'}
        </div>
        <div className={`px-2 py-0.5 text-xs rounded-full ${getAccuracyColorClass(info.accuracy || 0)}`}>
          {info.accuracy || 0}%
        </div>
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
        {info.type || 'Unknown Type'}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
        Date: {info.dateCompleted || 'Unknown Date'}
      </div>
      {!isSummary && (
        <>
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            Time: {formatTime(typeof info.timeUsed === 'number' ? info.timeUsed : 0)}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Difficulty: {info.difficulty || 'Medium'}
          </div>
        </>
      )}
    </div>
  );
}
