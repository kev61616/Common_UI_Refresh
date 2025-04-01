'use client';

import { KnowledgeArea } from "./types";

// Component for displaying progress bars for each knowledge area
export function KnowledgeAreaProgress({ area, progress }: { area: string, progress: number }) {
  const getColorClass = () => {
    if (progress < 40) return 'from-rose-500 to-red-500 dark:from-rose-600 dark:to-red-600';
    if (progress < 70) return 'from-amber-500 to-yellow-500 dark:from-amber-600 dark:to-yellow-600';
    return 'from-emerald-500 to-green-500 dark:from-emerald-600 dark:to-green-600';
  };
  
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{area}</span>
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full bg-gradient-to-r ${getColorClass()}`}
          style={{ 
            width: `${progress}%`,
            animation: 'grow-width 1s ease-out'
          }}
        ></div>
      </div>
    </div>
  );
}

// Component that displays multiple knowledge areas
export function KnowledgeAreas({ areas }: { areas: KnowledgeArea[] }) {
  return (
    <div className="space-y-4">
      {areas.map((area, index) => (
        <KnowledgeAreaProgress key={index} area={area.name} progress={area.progress} />
      ))}
    </div>
  );
}
