'use client'

import { QuestionViewProps } from './types';

export function InfographicDashboardView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // Calculate statistics across all sets
  const totalSets = practiceSets.length;
  const totalQuestions = practiceSets.reduce((total, set) => total + set.questions.length, 0);
  const averageAccuracy = Math.round(
    practiceSets.reduce((total, set) => total + set.accuracy, 0) / totalSets
  );
  
  // Subject distribution
  const subjectCounts = practiceSets.reduce((counts: Record<string, number>, set) => {
    counts[set.subject] = (counts[set.subject] || 0) + 1;
    return counts;
  }, {});
  
  // Difficulty distribution
  const difficultyDistribution = practiceSets.reduce(
    (counts: Record<string, number>, set) => {
      counts[set.difficulty] = (counts[set.difficulty] || 0) + 1;
      return counts;
    },
    {}
  );
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">30. Infographic Dashboard View</h3>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 min-h-[500px]">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row gap-6 justify-between mb-8">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 flex-1 text-center shadow-sm">
            <h4 className="text-lg font-bold text-blue-600 dark:text-blue-300 mb-1">Sets Completed</h4>
            <p className="text-3xl font-bold">{totalSets}</p>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 flex-1 text-center shadow-sm">
            <h4 className="text-lg font-bold text-purple-600 dark:text-purple-300 mb-1">Questions Answered</h4>
            <p className="text-3xl font-bold">{totalQuestions}</p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 flex-1 text-center shadow-sm">
            <h4 className="text-lg font-bold text-green-600 dark:text-green-300 mb-1">Avg. Accuracy</h4>
            <p className="text-3xl font-bold">{averageAccuracy}%</p>
          </div>
        </div>
        
        {/* Distribution section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Subject distribution */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-5 shadow-sm">
            <h4 className="text-lg font-bold text-indigo-600 dark:text-indigo-300 mb-4">Subject Distribution</h4>
            
            <div className="space-y-4">
              {Object.entries(subjectCounts).map(([subject, count]) => (
                <div key={subject} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{subject}</span>
                    <span>{Math.round((count / totalSets) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-500 h-2.5 rounded-full" 
                      style={{ width: `${Math.round((count / totalSets) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Difficulty distribution */}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-5 shadow-sm">
            <h4 className="text-lg font-bold text-amber-600 dark:text-amber-300 mb-4">Difficulty Distribution</h4>
            
            <div className="grid grid-cols-3 gap-4 h-40">
              {['Easy', 'Medium', 'Hard'].map(difficulty => {
                const count = difficultyDistribution[difficulty] || 0;
                const percentage = Math.round((count / totalSets) * 100) || 0;
                const height = `${Math.max(10, percentage)}%`;
                
                return (
                  <div key={difficulty} className="flex flex-col items-center justify-end">
                    <div 
                      className={`w-full rounded-t-md flex items-end justify-center
                        ${difficulty === 'Easy' ? 'bg-green-400 dark:bg-green-600' : 
                          difficulty === 'Medium' ? 'bg-amber-400 dark:bg-amber-600' : 
                          'bg-red-400 dark:bg-red-600'}`}
                      style={{ height }}
                    >
                      <span className="text-white font-bold mb-1">{percentage}%</span>
                    </div>
                    <p className="mt-2 text-sm">{difficulty}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Recent sets */}
        <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-5 shadow-sm">
          <h4 className="text-lg font-bold text-teal-600 dark:text-teal-300 mb-4">Recent Sets</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {practiceSets.slice(0, 6).map(set => (
              <div 
                key={set.id}
                onClick={() => onSelectSet && onSelectSet(set.id)}
                className={`
                  bg-white dark:bg-slate-700 p-4 rounded-lg shadow-sm
                  hover:shadow-md transition-shadow cursor-pointer
                  border-l-4 
                  ${set.accuracy > 80 ? 'border-green-500' : 
                    set.accuracy > 60 ? 'border-amber-500' : 
                    'border-red-500'}
                  ${selectedSetId === set.id ? 'ring-2 ring-teal-500 dark:ring-teal-400' : ''}
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-bold">{set.subject}</h5>
                  <span className="text-sm opacity-70">{new Date(set.dateCompleted).toLocaleDateString()}</span>
                </div>
                <p className="text-sm mb-3">{set.type}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">Questions: {set.questions.length}</div>
                  <div className="font-bold text-lg">
                    {set.accuracy}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
