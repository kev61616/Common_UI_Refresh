'use client';

import { TimelineViewProps } from './types';

/**
 * Photo Timeline (Timeline View Variant 15)
 * A visual timeline with image thumbnails representing each practice set type
 */
export function PhotoTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  // Sort sets by date
  const sortedSets = [...practiceSets].sort((a, b) =>
  new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
  );

  // Group sets by month
  const setsByMonth = sortedSets.reduce<{
    [monthYear: string]: (typeof practiceSets);
  }>((acc, set) => {
    const date = new Date(set.dateCompleted);
    const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }

    acc[monthYear].push(set);
    return acc;
  }, {});

  // Get test type images (simulated with gradients and icons)
  const getTestTypeVisual = (type: string, subject: string) => {
    // Define colors based on subject
    const colors = {
      Reading: {
        primary: 'from-sky-400 to-blue-500',
        dark: 'dark:from-sky-600 dark:to-blue-700',
        text: 'text-white'
      },
      Math: {
        primary: 'from-indigo-400 to-violet-500',
        dark: 'dark:from-indigo-600 dark:to-violet-700',
        text: 'text-white'
      },
      Writing: {
        primary: 'from-purple-400 to-pink-500',
        dark: 'dark:from-purple-600 dark:to-pink-700',
        text: 'text-white'
      }
    };

    const subjectColors = colors[subject as keyof typeof colors] || colors.Reading;

    // Simple icon mapping based on test type (would normally be images)
    const getIcon = () => {
      if (type.includes('Reading')) return '📚';
      if (type.includes('Math')) return '🧮';
      if (type.includes('Passage')) return '📝';
      if (type.includes('Grammar')) return '✏️';
      if (type.includes('Essay')) return '📄';
      if (type.includes('Question')) return '❓';
      if (type.includes('Practice')) return '🔄';
      if (type.includes('Test')) return '📋';
      return '📊';
    };

    return {
      gradient: `bg-gradient-to-br ${subjectColors.primary} ${subjectColors.dark}`,
      textColor: subjectColors.text,
      icon: getIcon(),
      // Generate a consistent initials for the test type
      initials: type.split(' ').map((word) => word[0]).join('').substring(0, 2).toUpperCase()
    };
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="-pr0vgf">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="ych3pub">15. Photo Timeline</h3>
      
      <div className="max-w-4xl mx-auto" data-oid="km.ljf:">
        {/* Timeline by month */}
        <div className="space-y-10" data-oid="myneli-">
          {Object.entries(setsByMonth).map(([monthYear, sets]) =>
          <div key={monthYear} className="pb-4" data-oid="gb44cy9">
              {/* Month heading */}
              <h4 className="text-lg font-medium mb-4 pb-2 border-b border-slate-200 dark:border-slate-700" data-oid="q-iolsh">
                {monthYear}
              </h4>
              
              {/* Photo grid for this month */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" data-oid="9y0kb9n">
                {sets.map((set) => {
                const visual = getTestTypeVisual(set.type, set.subject);

                return (
                  <div
                    key={set.id}
                    onClick={() => onSelectSet(set.id)}
                    className={`cursor-pointer transition-all duration-300 ${
                    selectedSetId === set.id ? 'ring-2 ring-indigo-500 dark:ring-indigo-400 scale-105' : 'hover:scale-102'}`
                    } data-oid="t.00c4s">

                      {/* Photo/visual representation */}
                      <div className={`relative aspect-square ${visual.gradient} rounded-lg overflow-hidden shadow-md`} data-oid="5rnl0s5">
                        {/* Day overlay in corner */}
                        <div className="absolute top-2 right-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-sm" data-oid="r8o246_">
                          {new Date(set.dateCompleted).getDate()}
                        </div>
                        
                        {/* Center icon/text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center" data-oid=":8kn7_u">
                          <div className="text-3xl mb-1" data-oid="7lwt1tc">{visual.icon}</div>
                          <div className={`text-xl font-bold ${visual.textColor}`} data-oid="r3y:2q6">{visual.initials}</div>
                        </div>
                        
                        {/* Accuracy indicator */}
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-black bg-opacity-20" data-oid="wx82_hp">
                          <div
                          className={`h-full ${
                          set.accuracy >= 90 ? 'bg-emerald-500' :
                          set.accuracy >= 80 ? 'bg-amber-400' :
                          set.accuracy >= 70 ? 'bg-orange-400' : 'bg-rose-500'}`
                          }
                          style={{ width: `${set.accuracy}%` }} data-oid="utktit1">
                        </div>
                        </div>
                      </div>
                      
                      {/* Caption */}
                      <div className="mt-2" data-oid="-oq73zl">
                        <div className="text-sm font-medium truncate" data-oid="xc1lasj">{set.type}</div>
                        <div className="flex justify-between items-center" data-oid="zwfhmqr">
                          <div className={`text-xs px-1.5 py-0.5 rounded-sm inline-flex items-center
                                        ${set.subject === 'Reading' ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300' :
                        set.subject === 'Math' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' :
                        'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300'}`} data-oid="xiegk_6">

                            {set.subject}
                          </div>
                          <div className={`text-xs font-semibold ${
                        set.accuracy >= 90 ? 'text-emerald-600 dark:text-emerald-400' :
                        set.accuracy >= 80 ? 'text-amber-600 dark:text-amber-400' :
                        set.accuracy >= 70 ? 'text-orange-600 dark:text-orange-400' :
                        'text-rose-600 dark:text-rose-400'}`
                        } data-oid="-33o5ep">
                            {set.accuracy}%
                          </div>
                        </div>
                      </div>
                    </div>);

              })}
              </div>
            </div>
          )}
        </div>
        
        {/* Selected photo details */}
        {selectedSetId &&
        <div className="mt-8 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700" data-oid="laj-eqc">
            {(() => {
            const set = practiceSets.find((s) => s.id === selectedSetId);
            if (!set) return null;

            const visual = getTestTypeVisual(set.type, set.subject);

            return (
              <div className="flex flex-col sm:flex-row gap-6" data-oid="t1shp3p">
                  {/* Larger photo */}
                  <div className={`relative w-full sm:w-40 h-40 ${visual.gradient} rounded-lg overflow-hidden shadow-md flex-shrink-0 mx-auto sm:mx-0`} data-oid="hwjgxxh">
                    <div className="absolute inset-0 flex flex-col items-center justify-center" data-oid="vh:_vo.">
                      <div className="text-5xl mb-2" data-oid="ucplbtl">{visual.icon}</div>
                      <div className={`text-2xl font-bold ${visual.textColor}`} data-oid="2e9_5wl">{visual.initials}</div>
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="flex-grow" data-oid="11p17gb">
                    <h4 className="text-lg font-bold mb-1" data-oid=".ybq597">{set.type}</h4>
                    
                    <div className="mb-4 flex items-center space-x-2" data-oid="081xwc2">
                      <div className={`px-2 py-0.5 text-sm rounded-md
                                   ${set.subject === 'Reading' ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300' :
                    set.subject === 'Math' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' :
                    'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300'}`} data-oid="9ult4p8">

                        {set.subject}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="e5vu_f8">
                        {new Date(set.dateCompleted).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4" data-oid="-g1mfy0">
                      <div data-oid="dyclxm9">
                        <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="ifau0h4">Accuracy</div>
                        <div className={`text-lg font-bold ${
                      set.accuracy >= 90 ? 'text-emerald-600 dark:text-emerald-400' :
                      set.accuracy >= 80 ? 'text-amber-600 dark:text-amber-400' :
                      set.accuracy >= 70 ? 'text-orange-600 dark:text-orange-400' :
                      'text-rose-600 dark:text-rose-400'}`
                      } data-oid="6vi57sb">
                          {set.accuracy}%
                        </div>
                      </div>
                      <div data-oid="pc7n91b">
                        <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="d65-j2o">Time Used</div>
                        <div className="text-lg font-medium" data-oid="akt_2hj">{Math.floor(set.timeUsed / 60)}:{(set.timeUsed % 60).toString().padStart(2, '0')}</div>
                      </div>
                      <div data-oid="ipfd90i">
                        <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="6bjeo2l">Pace</div>
                        <div className="text-lg font-medium" data-oid="i2k.tvz">{set.pace}</div>
                      </div>
                      <div data-oid="-dqoaxz">
                        <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="z81gspa">Difficulty</div>
                        <div className="text-lg font-medium" data-oid="dobfpaf">{set.difficulty}</div>
                      </div>
                    </div>
                    
                    <div data-oid="yl8_qg4">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1" data-oid="4j7b9tq">Performance</div>
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden" data-oid="x75ag_g">
                        <div
                        className={`h-full ${
                        set.accuracy >= 90 ? 'bg-emerald-500' :
                        set.accuracy >= 80 ? 'bg-amber-400' :
                        set.accuracy >= 70 ? 'bg-orange-400' : 'bg-rose-500'}`
                        }
                        style={{ width: `${set.accuracy}%` }} data-oid="4osrdh8">
                      </div>
                      </div>
                    </div>
                  </div>
                </div>);

          })()}
          </div>
        }
      </div>
    </div>);

}