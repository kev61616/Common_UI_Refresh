'use client';

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
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="8fjysnp">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="i91jd2m">30. Infographic Dashboard View</h3>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 min-h-[500px]" data-oid="5eutp4-">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row gap-6 justify-between mb-8" data-oid="n1nfwap">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 flex-1 text-center shadow-sm" data-oid=".19hu4p">
            <h4 className="text-lg font-bold text-blue-600 dark:text-blue-300 mb-1" data-oid="x3hrkss">Sets Completed</h4>
            <p className="text-3xl font-bold" data-oid="vj2vlah">{totalSets}</p>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 flex-1 text-center shadow-sm" data-oid="0:qpq42">
            <h4 className="text-lg font-bold text-purple-600 dark:text-purple-300 mb-1" data-oid="bkfgult">Questions Answered</h4>
            <p className="text-3xl font-bold" data-oid="fiijv0.">{totalQuestions}</p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 flex-1 text-center shadow-sm" data-oid="usw3qk9">
            <h4 className="text-lg font-bold text-green-600 dark:text-green-300 mb-1" data-oid="ki61q3-">Avg. Accuracy</h4>
            <p className="text-3xl font-bold" data-oid="cus6-lm">{averageAccuracy}%</p>
          </div>
        </div>
        
        {/* Distribution section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8" data-oid="1k_a9yr">
          {/* Subject distribution */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-5 shadow-sm" data-oid="h:l6wj3">
            <h4 className="text-lg font-bold text-indigo-600 dark:text-indigo-300 mb-4" data-oid="2xj80y.">Subject Distribution</h4>
            
            <div className="space-y-4" data-oid="e0768k3">
              {Object.entries(subjectCounts).map(([subject, count]) =>
              <div key={subject} className="space-y-1" data-oid="6sm8_ba">
                  <div className="flex justify-between text-sm" data-oid="u7kvrqw">
                    <span data-oid="3-o_ftc">{subject}</span>
                    <span data-oid="_ct1iti">{Math.round(count / totalSets * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5" data-oid="z650if_">
                    <div
                    className="bg-indigo-500 h-2.5 rounded-full"
                    style={{ width: `${Math.round(count / totalSets * 100)}%` }} data-oid="roal114">
                  </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Difficulty distribution */}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-5 shadow-sm" data-oid="kzsoa7j">
            <h4 className="text-lg font-bold text-amber-600 dark:text-amber-300 mb-4" data-oid="b86c0u4">Difficulty Distribution</h4>
            
            <div className="grid grid-cols-3 gap-4 h-40" data-oid="pnkz3zi">
              {['Easy', 'Medium', 'Hard'].map((difficulty) => {
                const count = difficultyDistribution[difficulty] || 0;
                const percentage = Math.round(count / totalSets * 100) || 0;
                const height = `${Math.max(10, percentage)}%`;

                return (
                  <div key={difficulty} className="flex flex-col items-center justify-end" data-oid="205tmf_">
                    <div
                      className={`w-full rounded-t-md flex items-end justify-center
                        ${difficulty === 'Easy' ? 'bg-green-400 dark:bg-green-600' :
                      difficulty === 'Medium' ? 'bg-amber-400 dark:bg-amber-600' :
                      'bg-red-400 dark:bg-red-600'}`}
                      style={{ height }} data-oid="h:o0s7m">

                      <span className="text-white font-bold mb-1" data-oid="_glf9d6">{percentage}%</span>
                    </div>
                    <p className="mt-2 text-sm" data-oid="leitkdv">{difficulty}</p>
                  </div>);

              })}
            </div>
          </div>
        </div>
        
        {/* Recent sets */}
        <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-5 shadow-sm" data-oid="c83egtr">
          <h4 className="text-lg font-bold text-teal-600 dark:text-teal-300 mb-4" data-oid="v5-6.ib">Recent Sets</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-oid="i2apa7p">
            {practiceSets.slice(0, 6).map((set) =>
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
                `} data-oid="9nz.mkq">

                <div className="flex items-center justify-between mb-2" data-oid="kvt_m2d">
                  <h5 className="font-bold" data-oid="8cill2s">{set.subject}</h5>
                  <span className="text-sm opacity-70" data-oid="96_3c9z">{new Date(set.dateCompleted).toLocaleDateString()}</span>
                </div>
                <p className="text-sm mb-3" data-oid="bdbu.qx">{set.type}</p>
                <div className="flex justify-between items-center" data-oid="euiso20">
                  <div className="text-sm" data-oid="pode:jq">Questions: {set.questions.length}</div>
                  <div className="font-bold text-lg" data-oid="jkd_hgt">
                    {set.accuracy}%
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}