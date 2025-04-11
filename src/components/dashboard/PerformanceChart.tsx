'use client';

import { useMemo } from 'react';
import { PracticeSet } from '@/lib/mockData';

interface PerformanceChartProps {
  practiceSets: PracticeSet[];
}

export function PerformanceChart({ practiceSets }: PerformanceChartProps) {
  // Calculate average performance by subject
  const subjectPerformance = useMemo(() => {
    const subjects = ['Reading', 'Writing', 'Math'];
    return subjects.map((subject) => {
      const subjectSets = practiceSets.filter((set) => set.subject === subject);
      if (subjectSets.length === 0) return { subject, accuracy: 0 };

      const avgAccuracy = subjectSets.reduce((sum, set) => sum + set.accuracy, 0) / subjectSets.length;
      return {
        subject,
        accuracy: Math.round(avgAccuracy)
      };
    });
  }, [practiceSets]);

  // Get the max value for proper scaling (minimum 100 for percentage)
  const maxValue = Math.max(100, ...subjectPerformance.map((item) => item.accuracy));

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-5" data-oid="8x1::-5">
      <h3 className="font-medium text-slate-800 dark:text-white text-lg mb-4" data-oid="rc9s9d1">Subject Performance</h3>
      
      <div className="space-y-4" data-oid="wq9aexj">
        {subjectPerformance.map(({ subject, accuracy }) => {
          // Calculate color based on accuracy
          let barColor = 'bg-red-500';
          if (accuracy >= 80) barColor = 'bg-green-500';else
          if (accuracy >= 60) barColor = 'bg-amber-500';

          // Calculate width as percentage of max
          const width = `${accuracy / maxValue * 100}%`;

          return (
            <div key={subject} className="space-y-2" data-oid="e2aegt:">
              <div className="flex justify-between items-center" data-oid="0m2gfa-">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300" data-oid="whj-.yr">{subject}</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white" data-oid="gkk9qpb">{accuracy}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden" data-oid="tgyoqor">
                <div
                  className={`h-full ${barColor} rounded-full transition-all duration-500 ease-out`}
                  style={{ width }} data-oid="bl01oo2">
                </div>
              </div>
            </div>);

        })}
      </div>
    </div>);

}