'use client'

import { TimelineViewProps } from './types';

/**
 * Comparison Timeline - Timeline View Variant 18
 * Month-to-month performance comparison with metrics
 */
export function ComparisonTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  // Group sets by month
  const monthlyData = practiceSets.reduce<{
    [key: string]: {
      month: string;
      year: number;
      timestamp: number;
      sets: typeof practiceSets;
      subjects: {
        [subject: string]: {
          count: number;
          avgAccuracy: number;
        }
      }
    }
  }>((acc, set) => {
    const date = new Date(set.dateCompleted);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const key = `${year}-${month}`;
    const timestamp = new Date(year, date.getMonth(), 1).getTime();
    
    if (!acc[key]) {
      acc[key] = {
        month,
        year,
        timestamp,
        sets: [],
        subjects: {}
      };
    }
    
    acc[key].sets.push(set);
    
    if (!acc[key].subjects[set.subject]) {
      acc[key].subjects[set.subject] = {
        count: 0,
        avgAccuracy: 0
      };
    }
    
    acc[key].subjects[set.subject].count += 1;
    
    // Recalculate average accuracy
    const subjectSets = acc[key].sets.filter(s => s.subject === set.subject);
    acc[key].subjects[set.subject].avgAccuracy = Math.round(
      subjectSets.reduce((sum, s) => sum + s.accuracy, 0) / subjectSets.length
    );
    
    return acc;
  }, {});
  
  // Convert to array and sort by date
  const monthlyDataArray = Object.values(monthlyData).sort((a, b) => a.timestamp - b.timestamp);
  
  // Calculate month-to-month changes
  const monthlyComparisons = monthlyDataArray.map((month, index) => {
    const prevMonth = index > 0 ? monthlyDataArray[index - 1] : null;
    
    const subjectChanges: {
      [subject: string]: {
        accuracyChange: number;
        countChange: number;
      }
    } = {};
    
    // Calculate changes for each subject
    Object.entries(month.subjects).forEach(([subject, data]) => {
      const prevSubjectData = prevMonth?.subjects[subject];
      
      subjectChanges[subject] = {
        accuracyChange: prevSubjectData 
          ? data.avgAccuracy - prevSubjectData.avgAccuracy 
          : 0,
        countChange: prevSubjectData 
          ? data.count - prevSubjectData.count 
          : data.count
      };
    });
    
    return {
      ...month,
      changes: subjectChanges
    };
  });
  
  // Calculate overall trend
  const overallTrend = monthlyComparisons.length > 1 
    ? Math.round((monthlyComparisons[monthlyComparisons.length - 1].sets.reduce((sum, set) => sum + set.accuracy, 0) / 
                   monthlyComparisons[monthlyComparisons.length - 1].sets.length) - 
                  (monthlyComparisons[0].sets.reduce((sum, set) => sum + set.accuracy, 0) / 
                   monthlyComparisons[0].sets.length))
    : 0;
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">18. Comparison Timeline</h3>
      
      <div className="max-w-5xl mx-auto">
        {/* Overall trend indicator */}
        <div className="mb-8 p-4 bg-white dark:bg-slate-800 rounded-lg shadow text-center">
          <div className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Overall Trend</div>
          <div className="flex items-center justify-center gap-2">
            <div className={`text-2xl font-bold ${
              overallTrend > 0 
                ? 'text-emerald-600 dark:text-emerald-400' 
                : overallTrend < 0 
                  ? 'text-rose-600 dark:text-rose-400' 
                  : 'text-slate-600 dark:text-slate-400'
            }`}>
              {overallTrend > 0 ? '+' : ''}{overallTrend}%
            </div>
            
            {overallTrend !== 0 && (
              <div className={`${
                overallTrend > 0 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-rose-600 dark:text-rose-400'
              }`}>
                {overallTrend > 0 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v3.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            )}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {overallTrend > 5 
              ? 'Impressive improvement over time!' 
              : overallTrend > 0 
                ? 'Steady improvement over time' 
                : overallTrend < -5 
                  ? 'Significant decrease in performance' 
                  : overallTrend < 0 
                    ? 'Slight decrease in performance' 
                    : 'Consistent performance over time'}
          </div>
        </div>
        
        {/* Monthly comparison cards */}
        <div className="space-y-6">
          {monthlyComparisons.map((month, index) => (
            <div 
              key={`${month.year}-${month.month}`}
              className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden"
            >
              {/* Month header */}
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border-b border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-lg">
                    {month.month} {month.year}
                  </h4>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {month.sets.length} sets completed
                  </div>
                </div>
              </div>
              
              {/* Subject comparisons */}
              <div className="p-4">
                <div className="space-y-4">
                  {Object.entries(month.subjects).map(([subject, data]) => (
                    <div key={subject} className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            subject === 'Reading' 
                              ? 'bg-sky-500' 
                              : subject === 'Math' 
                                ? 'bg-indigo-500' 
                                : 'bg-violet-500'
                          }`}></div>
                          <div className="font-medium">{subject}</div>
                        </div>
                        
                        <div className="text-sm">
                          {data.count} {data.count === 1 ? 'set' : 'sets'}
                        </div>
                      </div>
                      
                      {/* Accuracy comparison */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Average Accuracy</div>
                          <div className="text-lg font-semibold">{data.avgAccuracy}%</div>
                        </div>
                        
                        {index > 0 && (
                          <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">vs Previous Month</div>
                            <div className={`text-sm font-medium flex items-center ${
                              month.changes[subject].accuracyChange > 0 
                                ? 'text-emerald-600 dark:text-emerald-400' 
                                : month.changes[subject].accuracyChange < 0 
                                  ? 'text-rose-600 dark:text-rose-400' 
                                  : 'text-slate-500 dark:text-slate-400'
                            }`}>
                              {month.changes[subject].accuracyChange > 0 ? '+' : ''}
                              {month.changes[subject].accuracyChange}%
                              
                              {month.changes[subject].accuracyChange !== 0 && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                  {month.changes[subject].accuracyChange > 0 ? (
                                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                                  ) : (
                                    <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v3.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                                  )}
                                </svg>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Set list preview */}
                      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">Recent Sets</div>
                        <div className="space-y-1">
                          {month.sets
                            .filter(set => set.subject === subject)
                            .slice(0, 2)
                            .map(set => (
                              <div 
                                key={set.id}
                                onClick={() => onSelectSet(set.id)}
                                className={`py-1 px-2 rounded text-sm cursor-pointer transition-colors
                                          ${selectedSetId === set.id 
                                            ? 'bg-indigo-50 dark:bg-indigo-900/30' 
                                            : 'hover:bg-slate-50 dark:hover:bg-slate-700/30'}`}
                              >
                                <div className="flex justify-between">
                                  <div>{set.type}</div>
                                  <div className="font-medium">{set.accuracy}%</div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
