'use client'

import { TimelineViewProps } from './types';

/**
 * Progress Path (Timeline View Variant 16)
 * A roadmap/path visualization showing learning journey milestones
 */
export function ProgressPath({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  // Sort sets by date
  const sortedSets = [...practiceSets].sort((a, b) => 
    new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
  );
  
  // Calculate cumulative stats/progress
  const progressData = sortedSets.reduce<{
    cumulativeData: Array<{
      id: string;
      date: Date;
      avgAccuracy: number;
      totalSets: number;
      bySubject: Record<string, number>;
      milestone: boolean;
    }>;
  }>((acc, set, index, array) => {
    const date = new Date(set.dateCompleted);
    const previousData = index > 0 ? acc.cumulativeData[index - 1] : null;
    
    // Calculate the average accuracy up to this point
    const avgAccuracy = Math.round(
      array.slice(0, index + 1).reduce((sum, s) => sum + s.accuracy, 0) / (index + 1)
    );
    
    // Track subject counts
    const bySubject = { ...(previousData?.bySubject || {}) };
    bySubject[set.subject] = (bySubject[set.subject] || 0) + 1;
    
    // Define milestones
    const isFirstOfSubject = !array.slice(0, index).some(s => s.subject === set.subject);
    const isHighAccuracy = set.accuracy >= 90;
    const isEvery5thSet = (index + 1) % 5 === 0;
    const milestone = isFirstOfSubject || isHighAccuracy || isEvery5thSet;
    
    acc.cumulativeData.push({
      id: set.id,
      date,
      avgAccuracy,
      totalSets: index + 1,
      bySubject,
      milestone
    });
    
    return acc;
  }, { cumulativeData: [] }).cumulativeData;
  
  // Get achievement levels
  const getAchievementLevel = (totalSets: number, avgAccuracy: number) => {
    if (totalSets >= 15 && avgAccuracy >= 85) return 'Master';
    if (totalSets >= 10 && avgAccuracy >= 80) return 'Expert';
    if (totalSets >= 5 && avgAccuracy >= 75) return 'Intermediate';
    return 'Beginner';
  };
  
  // Define subject colors
  const subjectColors = {
    Reading: {
      bg: 'bg-sky-500',
      text: 'text-sky-500',
      lightBg: 'bg-sky-100',
      lightText: 'text-sky-700'
    },
    Math: {
      bg: 'bg-indigo-500',
      text: 'text-indigo-500',
      lightBg: 'bg-indigo-100',
      lightText: 'text-indigo-700'
    },
    Writing: {
      bg: 'bg-violet-500',
      text: 'text-violet-500',
      lightBg: 'bg-violet-100',
      lightText: 'text-violet-700'
    }
  };
  
  // Set levels and paths
  const progressLevels = [
    { name: 'Master', color: 'bg-amber-500', requirement: '15+ tests, 85%+ accuracy' },
    { name: 'Expert', color: 'bg-sky-500', requirement: '10+ tests, 80%+ accuracy' },
    { name: 'Intermediate', color: 'bg-emerald-500', requirement: '5+ tests, 75%+ accuracy' },
    { name: 'Beginner', color: 'bg-slate-400', requirement: 'Starting level' }
  ];
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">16. Progress Path</h3>
      
      <div className="max-w-4xl mx-auto">
        {/* Legend */}
        <div className="mb-8 flex flex-wrap gap-6 justify-around">
          {progressLevels.map((level, index) => (
            <div key={level.name} className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${level.color} mr-2`}></div>
              <div>
                <div className="font-medium">{level.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{level.requirement}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Progress path visualization */}
        <div className="relative px-8 pb-8 overflow-x-auto progress-path-container">
          <div className="min-w-[800px]">
            {/* Path levels */}
            <div className="grid grid-cols-1 gap-6 mb-8">
              {progressLevels.map((level, index) => (
                <div key={level.name} className="flex items-center">
                  <div className="w-24 text-right mr-4 font-medium">{level.name}</div>
                  <div className={`flex-grow h-10 rounded-lg ${level.color} bg-opacity-20 dark:bg-opacity-10 relative`}>
                    {/* Path line */}
                    <div className={`absolute top-1/2 left-0 right-0 h-1 ${level.color} transform -translate-y-1/2`}></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Progress nodes */}
            <div className="relative mt-[-180px]">
              {progressData.map((data, index) => {
                const set = sortedSets.find(s => s.id === data.id);
                if (!set) return null;
                
                const level = getAchievementLevel(data.totalSets, data.avgAccuracy);
                const levelIndex = progressLevels.findIndex(l => l.name === level);
                const verticalPosition = levelIndex * 24 + 15; // Adjust to match the path level positions
                const horizontalPosition = (index / (progressData.length - 1)) * 100;
                
                const subjectColor = subjectColors[set.subject as keyof typeof subjectColors] || subjectColors.Reading;
                
                return (
                  <div 
                    key={set.id}
                    className="absolute"
                    style={{ 
                      left: `${horizontalPosition}%`, 
                      top: `${verticalPosition}px` 
                    }}
                  >
                    {/* Node */}
                    <div 
                      onClick={() => onSelectSet(set.id)}
                      className={`w-8 h-8 rounded-full ${data.milestone ? 'border-4 border-white dark:border-slate-900' : ''}
                                flex items-center justify-center cursor-pointer
                                transform -translate-x-1/2 -translate-y-1/2 z-10
                                shadow-md transition-all
                                ${selectedSetId === set.id ? 'scale-125 ring-2 ring-indigo-300' : 'hover:scale-110'}
                                ${subjectColor.bg}`}
                    >
                      <span className="text-xs font-bold text-white">
                        {index + 1}
                      </span>
                    </div>
                    
                    {/* Path connection line to next node (if not last) */}
                    {index < progressData.length - 1 && (
                      <div className="absolute left-0 top-0 z-0">
                        {(() => {
                          const nextData = progressData[index + 1];
                          const nextSet = sortedSets.find(s => s.id === nextData.id);
                          if (!nextSet) return null;
                          
                          const nextLevel = getAchievementLevel(nextData.totalSets, nextData.avgAccuracy);
                          const nextLevelIndex = progressLevels.findIndex(l => l.name === nextLevel);
                          const nextVerticalPosition = nextLevelIndex * 24 + 15;
                          
                          // Calculate line length based on positions
                          const horizontalDistance = ((1 / (progressData.length - 1)) * 100) * 8;
                          const verticalDistance = nextVerticalPosition - verticalPosition;
                          
                          // Line angles and transformations
                          const lineLength = Math.sqrt(Math.pow(horizontalDistance, 2) + Math.pow(verticalDistance, 2));
                          const angle = Math.atan2(verticalDistance, horizontalDistance) * (180 / Math.PI);
                          
                          return (
                            <div 
                              className="h-0.5 bg-slate-300 dark:bg-slate-600 absolute origin-left"
                              style={{ 
                                width: `${lineLength}px`,
                                transform: `rotate(${angle}deg)`,
                              }}
                            ></div>
                          );
                        })()}
                      </div>
                    )}
                    
                    {/* Tooltip for selected node */}
                    {selectedSetId === set.id && (
                      <div className="absolute left-1/2 bottom-full mb-3 transform -translate-x-1/2 z-20 
                                    bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 
                                    p-3 min-w-[200px]">
                        <div className="absolute left-1/2 bottom-[-6px] transform -translate-x-1/2 rotate-45 
                                      w-3 h-3 bg-white dark:bg-slate-800 border-r border-b border-slate-200 dark:border-slate-700">
                        </div>
                        
                        <div className="mb-1 font-semibold">{set.type}</div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                          <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Date</div>
                            <div>{new Date(set.dateCompleted).toLocaleDateString()}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Accuracy</div>
                            <div className="font-semibold">{set.accuracy}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Subject</div>
                            <div className={subjectColor.lightText}>{set.subject}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Level</div>
                            <div>{level}</div>
                          </div>
                        </div>
                        
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {data.milestone ? (
                            <div className="mt-1 pt-1 border-t border-slate-100 dark:border-slate-700">
                              <span className="text-indigo-500 dark:text-indigo-400 font-medium">Milestone reached!</span> {
                                data.totalSets % 5 === 0 ? `Completed ${data.totalSets} practice sets.` :
                                set.accuracy >= 90 ? 'Achieved 90%+ accuracy.' :
                                `First ${set.subject} test completed.`
                              }
                            </div>
                          ) : ''}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Current status */}
            <div className="mt-16 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              {(() => {
                const lastData = progressData[progressData.length - 1];
                const level = getAchievementLevel(lastData.totalSets, lastData.avgAccuracy);
                
                return (
                  <div>
                    <h4 className="text-lg font-bold mb-4">Your Learning Journey</h4>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Current Level</div>
                        <div className="text-xl font-bold">{level}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Sets Completed</div>
                        <div className="text-xl font-bold">{lastData.totalSets}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Avg Accuracy</div>
                        <div className="text-xl font-bold">{lastData.avgAccuracy}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Subjects</div>
                        <div className="text-xl font-bold">{Object.keys(lastData.bySubject).length}</div>
                      </div>
                    </div>
                    
                    {/* Next level hint */}
                    {level !== 'Master' && (
                      <div className="mt-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-sm">
                        <div className="font-medium text-indigo-700 dark:text-indigo-300 mb-1">
                          Next Level: {progressLevels[progressLevels.findIndex(l => l.name === level) - 1]?.name}
                        </div>
                        <div className="text-indigo-600 dark:text-indigo-400">
                          {level === 'Beginner' 
                            ? 'Complete 5+ sets with 75%+ average accuracy to reach Intermediate' 
                            : level === 'Intermediate'
                              ? 'Complete 10+ sets with 80%+ average accuracy to reach Expert'
                              : 'Complete 15+ sets with 85%+ average accuracy to reach Master'}
                        </div>
                      </div>
                    )}
                    
                    {/* Subject breakdown */}
                    <div className="mt-4">
                      <div className="text-sm font-medium mb-2">Subject Breakdown</div>
                      <div className="space-y-2">
                        {Object.entries(lastData.bySubject).map(([subject, count]) => {
                          const subjectColor = subjectColors[subject as keyof typeof subjectColors] || subjectColors.Reading;
                          return (
                            <div key={subject} className="flex items-center">
                              <div className={`w-3 h-3 rounded-full ${subjectColor.bg} mr-2`}></div>
                              <div className="text-sm flex-grow">{subject}</div>
                              <div className="text-sm font-medium">{count} sets</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
