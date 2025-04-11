'use client';

import { TimelineViewProps } from './types';

/**
 * Milestone Timeline - Timeline View Variant 19
 * Highlight important achievements and breakthroughs in learning
 */
export function MilestoneTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  // Find high-performing sets (milestones)
  const milestones = practiceSets.
  filter((set) => set.accuracy >= 85).
  sort((a, b) => new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime());

  // Find sets with significant improvements
  const improvements = [];
  for (let i = 1; i < practiceSets.length; i++) {
    const currentSet = practiceSets[i];
    const previousSets = practiceSets.slice(0, i).filter((s) => s.subject === currentSet.subject);

    if (previousSets.length > 0) {
      const avgPreviousAccuracy = previousSets.reduce((sum, s) => sum + s.accuracy, 0) / previousSets.length;

      if (currentSet.accuracy > avgPreviousAccuracy + 15) {
        improvements.push({
          ...currentSet,
          improvement: Math.round(currentSet.accuracy - avgPreviousAccuracy)
        });
      }
    }
  }

  // Sort improvements by date
  improvements.sort((a, b) => new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime());

  // Merge and filter to keep top milestones
  const allMilestones = [...milestones];
  improvements.forEach((imp) => {
    if (!allMilestones.some((m) => m.id === imp.id)) {
      allMilestones.push(imp);
    }
  });

  allMilestones.sort((a, b) => new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime());

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="7eayo5c">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="yzb_o3i">19. Milestone Timeline</h3>
      
      <div className="max-w-4xl mx-auto relative pb-12" data-oid="5-njvca">
        {/* Timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-600 -translate-x-1/2 z-0" data-oid=":hp29wr"></div>
        
        {allMilestones.length > 0 ?
        <div className="space-y-16 relative" data-oid="-f5ja:m">
            {allMilestones.map((milestone, index) => {
            // Alternate sides for milestones
            const isLeft = index % 2 === 0;

            return (
              <div key={milestone.id} className={`relative ${isLeft ? 'ml-0 mr-[50%]' : 'ml-[50%] mr-0'}`} data-oid="nchrg-6">
                  {/* Connecting line to timeline */}
                  <div className={`absolute top-1/2 ${isLeft ? 'left-full' : 'right-full'} w-8 h-0.5 bg-indigo-500 dark:bg-indigo-400`} data-oid="20m7onj"></div>
                  
                  {/* Center dot */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" data-oid=".wk6172">
                    <div
                    className={`w-6 h-6 rounded-full border-2 ${
                    selectedSetId === milestone.id ?
                    'bg-indigo-500 border-white dark:border-slate-800' :
                    'bg-white dark:bg-slate-800 border-indigo-500 dark:border-indigo-400'} shadow-md`
                    } data-oid="-m74yae">
                  </div>
                  </div>
                  
                  {/* Milestone card */}
                  <div
                  className={`relative mx-12 transform ${
                  isLeft ?
                  'origin-left translate-x-4' :
                  'origin-right -translate-x-4'} transition-all duration-300 ${

                  selectedSetId === milestone.id ?
                  `${isLeft ? 'translate-x-6' : '-translate-x-6'} scale-105 z-20` :
                  'hover:scale-102'}`
                  } data-oid="qby.t8w">

                    <div
                    onClick={() => onSelectSet(milestone.id)}
                    className={`p-4 rounded-xl border cursor-pointer backdrop-blur-sm
                              ${selectedSetId === milestone.id ?
                    'bg-indigo-50/90 dark:bg-indigo-900/50 border-indigo-200 dark:border-indigo-700 shadow-lg' :
                    'bg-white/90 dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg'}`} data-oid="dj7kuiw">

                      <div className="flex items-start justify-between" data-oid="_kwy7xq">
                        <div className="flex items-start gap-3" data-oid="i2ha6.l">
                          <div className={`p-2 rounded-full flex items-center justify-center 
                                        ${milestone.subject === 'Reading' ?
                        'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400' :
                        milestone.subject === 'Math' ?
                        'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' :
                        'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400'}`} data-oid="p_5vy8d">

                            {milestone.subject === 'Reading' ?
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid=".8vn::6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" data-oid="mbdg2w:" />
                              </svg> :
                          milestone.subject === 'Math' ?
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="v7zvqrf">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" data-oid="7yw3u35" />
                              </svg> :

                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="r86r_99">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" data-oid="-pnsdsk" />
                              </svg>
                          }
                          </div>
                          
                          <div data-oid="3rcni-j">
                            <h4 className="font-bold text-lg" data-oid="l89v92d">{milestone.subject}</h4>
                            <div className="text-sm text-slate-600 dark:text-slate-400" data-oid="5r._:ic">{milestone.type}</div>
                          </div>
                        </div>
                        
                        <div className="text-right" data-oid="xj2xh4o">
                          <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="9wu0aw.">Accuracy</div>
                          <div className="font-bold text-xl text-indigo-600 dark:text-indigo-400" data-oid="c-_wp-2">{milestone.accuracy}%</div>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between" data-oid=":q0.eyd">
                        <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="rimhtm4">
                          {new Date(milestone.dateCompleted).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                        </div>
                        
                        {'improvement' in milestone &&
                      <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium" data-oid="6isg__x">
                            +{(milestone as any).improvement}% improvement
                          </div>
                      }
                        
                        {!('improvement' in milestone) && milestone.accuracy >= 90 &&
                      <div className="text-sm text-amber-600 dark:text-amber-400 font-medium" data-oid="yahd-eb">
                            Exceptional performance!
                          </div>
                      }
                      </div>
                    </div>
                  </div>
                </div>);

          })}
          </div> :

        <div className="text-center my-16 p-8 bg-slate-50 dark:bg-slate-800/50 rounded-xl" data-oid="vwp73om">
            <div className="text-lg font-medium text-slate-600 dark:text-slate-400" data-oid="kc.t80d">
              No milestone achievements found yet.
            </div>
            <div className="mt-2 text-sm text-slate-500 dark:text-slate-500" data-oid="zx4tw9a">
              Keep practicing to reach important milestones and see your progress here!
            </div>
          </div>
        }
      </div>
    </div>);

}