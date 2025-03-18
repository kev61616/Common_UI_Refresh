'use client'

import { TimelineViewProps } from './types';

/**
 * Historical Dynasty Timeline (Timeline View Variant 22)
 * Visualizes study sessions as historical dynasties, with each subject as a major dynasty/era
 */
export function HistoricalDynastyTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  // Group sets by subject (each subject = a dynasty)
  const subjectGroups = practiceSets.reduce((acc, set) => {
    if (!acc[set.subject]) {
      acc[set.subject] = [];
    }
    acc[set.subject].push(set);
    return acc;
  }, {} as Record<string, typeof practiceSets>);

  // Sort each subject group by date
  Object.keys(subjectGroups).forEach(subject => {
    subjectGroups[subject].sort((a, b) => 
      new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
    );
  });

  // Define dynasty colors and styles
  const dynastyStyles: Record<string, { bgColor: string; borderColor: string; textColor: string }> = {
    'Math': { 
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30', 
      borderColor: 'border-emerald-500', 
      textColor: 'text-emerald-800 dark:text-emerald-200' 
    },
    'Reading': { 
      bgColor: 'bg-blue-100 dark:bg-blue-900/30', 
      borderColor: 'border-blue-500', 
      textColor: 'text-blue-800 dark:text-blue-200' 
    },
    'Science': { 
      bgColor: 'bg-amber-100 dark:bg-amber-900/30', 
      borderColor: 'border-amber-500', 
      textColor: 'text-amber-800 dark:text-amber-200' 
    },
    // Default for any other subjects
    'default': { 
      bgColor: 'bg-purple-100 dark:bg-purple-900/30', 
      borderColor: 'border-purple-500', 
      textColor: 'text-purple-800 dark:text-purple-200' 
    },
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">22. Historical Dynasty Timeline</h3>
      
      <div className="relative min-h-[600px] overflow-x-auto py-4">
        <div className="absolute inset-0 bg-[url('/images/parchment-bg.png')] opacity-10 pointer-events-none"></div>
        
        {/* Main scroll timeline container */}
        <div className="relative min-w-[800px] mx-auto">
          {/* Timeline central axis */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-300 dark:bg-slate-600"></div>
          
          {/* Timeline content */}
          <div className="relative z-10 space-y-6 py-4">
            {Object.entries(subjectGroups).map(([subject, sets], subjectIndex) => {
              const style = dynastyStyles[subject] || dynastyStyles.default;
              const startYear = new Date(sets[0]?.dateCompleted).getFullYear();
              const endYear = new Date(sets[sets.length - 1]?.dateCompleted).getFullYear();
              const duration = sets.length;
              
              return (
                <div 
                  key={subject} 
                  className={`${style.bgColor} relative rounded-lg mx-8 shadow-md border-l-4 ${style.borderColor}`}
                >
                  {/* Dynasty header */}
                  <div className={`p-4 border-b border-slate-200 dark:border-slate-700`}>
                    <div className="flex justify-between items-center">
                      <h4 className={`text-lg font-bold ${style.textColor}`}>
                        {subject} Dynasty
                      </h4>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {startYear} - {endYear} ({duration} periods)
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      {`A collection of ${sets.length} study sessions focusing on ${subject.toLowerCase()} topics`}
                    </p>
                  </div>
                  
                  {/* Era items (individual practice sets) */}
                  <div className="p-4 grid grid-cols-1 gap-3">
                    {sets.map((set, i) => {
                      const accuracy = set.accuracy;
                      
                      // Dynasty era title based on accuracy
                      let eraTitle: string;
                      if (accuracy >= 90) eraTitle = "Golden Age";
                      else if (accuracy >= 75) eraTitle = "Prosperous Era";
                      else if (accuracy >= 60) eraTitle = "Stable Period";
                      else if (accuracy >= 40) eraTitle = "Declining Era";
                      else eraTitle = "Dark Age";
                      
                      return (
                        <div 
                          key={set.id}
                          onClick={() => onSelectSet(set.id)}
                          className={`p-3 border border-slate-200 dark:border-slate-700 rounded-md cursor-pointer
                                      transition-all duration-200 hover:shadow-md
                                      ${selectedSetId === set.id 
                                        ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' 
                                        : ''}`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-sm font-semibold">
                                {new Date(set.dateCompleted).toLocaleDateString(undefined, {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </div>
                              <h5 className="font-bold mt-1">{set.type}</h5>
                              <div className={`text-xs mt-1 px-2 py-0.5 rounded inline-block 
                                               ${style.bgColor} ${style.textColor} border ${style.borderColor}`}>
                                {eraTitle}
                              </div>
                            </div>
                            
                            <div className="text-center">
                              <div className={`text-lg font-bold ${
                                accuracy >= 80 ? 'text-emerald-600 dark:text-emerald-400' :
                                accuracy >= 60 ? 'text-amber-600 dark:text-amber-400' :
                                'text-rose-600 dark:text-rose-400'
                              }`}>
                                {accuracy}%
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">Accuracy</div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center mt-3 text-sm text-slate-600 dark:text-slate-300">
                            <div>{set.questions.length} questions</div>
                            <div>{Math.floor(set.timeUsed / 60)} minutes</div>
                          </div>
                          
                          {/* Ancient scroll decorative elements */}
                          <div className="flex justify-between mt-2">
                            <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                            <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
        Historical Dynasty Timeline showing {practiceSets.length} study sessions
      </div>
    </div>
  );
}
