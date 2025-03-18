'use client'

import { TimelineViewProps } from './types';

/**
 * Achievement Timeline (Timeline View Variant 12)
 * A timeline highlighting milestones and achievements in learning journey
 */
export function AchievementTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  // Sort sets by date
  const sortedSets = [...practiceSets].sort((a, b) => 
    new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
  );
  
  // Define achievement criteria and badges
  const getAchievements = (set: (typeof practiceSets)[0]) => {
    const achievements = [];
    
    // Accuracy-based achievements
    if (set.accuracy >= 95) {
      achievements.push({
        type: 'mastery',
        title: 'Mastery',
        description: 'Exceptional accuracy above 95%',
        icon: '🏆',
        color: 'bg-yellow-500',
        darkColor: 'dark:bg-yellow-600'
      });
    } else if (set.accuracy >= 85) {
      achievements.push({
        type: 'excellence', 
        title: 'Excellence',
        description: 'Great accuracy above 85%',
        icon: '🌟',
        color: 'bg-amber-500',
        darkColor: 'dark:bg-amber-600'
      });
    }
    
    // Pace-based achievements
    if (set.pace === 'Fast') {
      achievements.push({
        type: 'speedster',
        title: 'Speedster',
        description: 'Completed with impressive speed',
        icon: '⚡',
        color: 'bg-blue-500',
        darkColor: 'dark:bg-blue-600'
      });
    }
    
    // Subject-specific milestone (first of each subject)
    const isFirstOfSubject = sortedSets.findIndex(s => s.subject === set.subject) === sortedSets.indexOf(set);
    if (isFirstOfSubject) {
      achievements.push({
        type: 'pioneer',
        title: 'Pioneer',
        description: `First ${set.subject} practice completed`,
        icon: '🚩',
        color: 'bg-green-500',
        darkColor: 'dark:bg-green-600'
      });
    }
    
    // Improvement milestone (better than previous of same subject)
    const prevSameSubject = sortedSets
      .filter(s => s.subject === set.subject && new Date(s.dateCompleted) < new Date(set.dateCompleted))
      .sort((a, b) => new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime())[0];
    
    if (prevSameSubject && set.accuracy > prevSameSubject.accuracy + 10) {
      achievements.push({
        type: 'improvement',
        title: 'Major Improvement',
        description: 'Improved by more than 10% from previous',
        icon: '📈',
        color: 'bg-indigo-500',
        darkColor: 'dark:bg-indigo-600'
      });
    }
    
    // Consistency milestone (3 or more of same type with good scores)
    const sameTypeCount = sortedSets.filter(s => 
      s.type === set.type && s.accuracy >= 75
    ).length;
    
    if (sameTypeCount >= 3 && set.type === sortedSets[sortedSets.indexOf(set)].type) {
      achievements.push({
        type: 'consistency',
        title: 'Consistency',
        description: 'Consistently good performance on this test type',
        icon: '🔄',
        color: 'bg-purple-500',
        darkColor: 'dark:bg-purple-600'
      });
    }
    
    return achievements;
  };
  
  // Calculate level/badge based on overall performance
  const getOverallLevel = () => {
    const avgAccuracy = practiceSets.reduce((sum, set) => sum + set.accuracy, 0) / practiceSets.length;
    const totalAchievements = practiceSets.flatMap(getAchievements).length;
    
    if (avgAccuracy >= 90 && totalAchievements >= 10) {
      return { name: 'Master Scholar', badge: '🎓', color: 'bg-gradient-to-r from-amber-500 to-yellow-500' };
    } else if (avgAccuracy >= 85 && totalAchievements >= 7) {
      return { name: 'Advanced Scholar', badge: '📚', color: 'bg-gradient-to-r from-blue-500 to-indigo-500' };
    } else if (avgAccuracy >= 80 && totalAchievements >= 5) {
      return { name: 'Intermediate Scholar', badge: '📝', color: 'bg-gradient-to-r from-cyan-500 to-blue-500' };
    } else if (avgAccuracy >= 75 && totalAchievements >= 3) {
      return { name: 'Emerging Scholar', badge: '🌱', color: 'bg-gradient-to-r from-emerald-500 to-green-500' };
    } else {
      return { name: 'Beginner Scholar', badge: '🔍', color: 'bg-gradient-to-r from-rose-500 to-pink-500' };
    }
  };
  
  const level = getOverallLevel();
  
  // Milestone metrics
  const completedSubjects = new Set(practiceSets.map(set => set.subject)).size;
  const highScoreCount = practiceSets.filter(set => set.accuracy >= 90).length;
  const totalAchievements = practiceSets.flatMap(getAchievements).length;
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">12. Achievement Timeline</h3>
      
      {/* Level Badge & Overall Status */}
      <div className="mb-8 flex justify-center">
        <div className="text-center max-w-md">
          <div className={`inline-block ${level.color} text-white text-4xl p-5 rounded-full mb-2 shadow-lg`}>
            {level.badge}
          </div>
          <h4 className="text-xl font-bold">{level.name}</h4>
          <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            {practiceSets.length} practice sets completed with {totalAchievements} achievements
          </div>
          
          {/* Achievement Statistics */}
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{highScoreCount}</div>
              <div className="text-xs">High Scores</div>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{completedSubjects}</div>
              <div className="text-xs">Subjects</div>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {Math.round(practiceSets.reduce((sum, set) => sum + set.accuracy, 0) / practiceSets.length)}%
              </div>
              <div className="text-xs">Avg Accuracy</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Achievement Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-300 dark:bg-slate-600 transform -translate-x-1/2 z-0"></div>
        
        <div className="relative z-10 space-y-10 max-h-[500px] overflow-y-auto pr-4 achievement-timeline-scroll">
          {sortedSets.map((set, index) => {
            const achievements = getAchievements(set);
            const hasAchievements = achievements.length > 0;
            
            return (
              <div 
                key={set.id}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Timeline node */}
                <div 
                  onClick={() => onSelectSet(set.id)}
                  className={`w-12 h-12 rounded-full flex-shrink-0 z-10 flex items-center justify-center
                            cursor-pointer shadow-md transition-all duration-300
                            ${selectedSetId === set.id ? 'scale-110 ring-2 ring-offset-2 ring-indigo-400 dark:ring-indigo-500' : ''}
                            ${hasAchievements ? 'bg-gradient-to-br from-indigo-500 to-violet-500 text-white' : 
                                             'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600'}`}
                >
                  {hasAchievements ? (
                    <span className="text-xl">{achievements[0].icon}</span>
                  ) : (
                    <span className="text-slate-400 dark:text-slate-500">
                      {index + 1}
                    </span>
                  )}
                </div>
                
                {/* Content card */}
                <div 
                  className={`${index % 2 === 0 ? 'ml-6' : 'mr-6'} 
                            w-[calc(100%-3rem-1.5rem)] p-4 rounded-lg shadow-sm
                            ${selectedSetId === set.id ? 
                              'bg-indigo-50 dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800' : 
                              'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'}
                            ${hasAchievements ? 'pb-1' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className={`px-2 py-0.5 rounded-full text-xs font-medium
                                 ${set.subject === 'Reading' ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300' : 
                                   set.subject === 'Math' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' : 
                                   'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300'}`}
                    >
                      {set.subject}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(set.dateCompleted).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <h4 className="font-bold mb-2">{set.type}</h4>
                  
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Accuracy</div>
                      <div className="font-bold">{set.accuracy}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Time</div>
                      <div className="font-medium">{Math.floor(set.timeUsed / 60)}m</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Pace</div>
                      <div className="font-medium">{set.pace}</div>
                    </div>
                  </div>
                  
                  {/* Achievements */}
                  {hasAchievements && (
                    <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                      {achievements.map((achievement, i) => (
                        <div 
                          key={`${set.id}-${achievement.type}`}
                          className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs text-white
                                    ${achievement.color} ${achievement.darkColor}`}
                        >
                          <span>{achievement.icon}</span>
                          <span>{achievement.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
