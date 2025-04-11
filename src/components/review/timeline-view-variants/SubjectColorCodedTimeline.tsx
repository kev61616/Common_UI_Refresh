'use client';

import { TimelineViewProps } from './types';

/**
 * Subject-Color Coded Timeline (Timeline View Variant 13)
 * A timeline that organizes practice sets by subject with distinctive color schemes and subject-specific layouts
 */
export function SubjectColorCodedTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  // Group sets by subject
  const setsBySubject = practiceSets.reduce<{
    [subject: string]: (typeof practiceSets);
  }>((acc, set) => {
    if (!acc[set.subject]) {
      acc[set.subject] = [];
    }
    acc[set.subject].push(set);
    return acc;
  }, {});

  // Sort each subject's sets by date
  Object.keys(setsBySubject).forEach((subject) => {
    setsBySubject[subject].sort((a, b) =>
    new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
    );
  });

  // Get unique subjects
  const subjects = Object.keys(setsBySubject);

  // Define subject-specific styling and icons
  const subjectStyles = {
    Reading: {
      mainColor: 'bg-sky-500',
      lightColor: 'bg-sky-100',
      darkColor: 'dark:bg-sky-900/40',
      textColor: 'text-sky-700',
      darkTextColor: 'dark:text-sky-300',
      borderColor: 'border-sky-200',
      darkBorderColor: 'dark:border-sky-800',
      gradientFrom: 'from-sky-500',
      gradientTo: 'to-blue-500',
      icon:
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="k6..8:8">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" data-oid="hluvzkt" />
        </svg>

    },
    Math: {
      mainColor: 'bg-indigo-500',
      lightColor: 'bg-indigo-100',
      darkColor: 'dark:bg-indigo-900/40',
      textColor: 'text-indigo-700',
      darkTextColor: 'dark:text-indigo-300',
      borderColor: 'border-indigo-200',
      darkBorderColor: 'dark:border-indigo-800',
      gradientFrom: 'from-indigo-500',
      gradientTo: 'to-purple-500',
      icon:
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="qqys7:m">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" data-oid="7t42aqj" />
        </svg>

    },
    Writing: {
      mainColor: 'bg-violet-500',
      lightColor: 'bg-violet-100',
      darkColor: 'dark:bg-violet-900/40',
      textColor: 'text-violet-700',
      darkTextColor: 'dark:text-violet-300',
      borderColor: 'border-violet-200',
      darkBorderColor: 'dark:border-violet-800',
      gradientFrom: 'from-violet-500',
      gradientTo: 'to-fuchsia-500',
      icon:
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="ici:v.t">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-oid="7w9wkj2" />
        </svg>

    }
  };

  // Calculate performance metrics for each subject
  const subjectMetrics = subjects.reduce<{
    [subject: string]: {
      avgAccuracy: number;
      totalCompleted: number;
      improvement: number; // % change from first to last
      strongestArea: string;
      weakestArea: string;
    };
  }>((acc, subject) => {
    const sets = setsBySubject[subject];
    const avgAccuracy = Math.round(sets.reduce((sum, set) => sum + set.accuracy, 0) / sets.length);

    // Calculate improvement (compare first and last completed sets)
    const firstSet = sets[0];
    const lastSet = sets[sets.length - 1];
    const improvement = lastSet.accuracy - firstSet.accuracy;

    // Find strengths and weaknesses by test type
    const typePerformance = sets.reduce<{[type: string]: {total: number;count: number;};}>((acc, set) => {
      if (!acc[set.type]) {
        acc[set.type] = { total: 0, count: 0 };
      }
      acc[set.type].total += set.accuracy;
      acc[set.type].count += 1;
      return acc;
    }, {});

    // Calculate average accuracy for each test type
    const typeAvgAccuracy = Object.entries(typePerformance).map(([type, data]) => ({
      type,
      avgAccuracy: Math.round(data.total / data.count)
    }));

    // Find strongest and weakest areas
    typeAvgAccuracy.sort((a, b) => b.avgAccuracy - a.avgAccuracy);
    const strongestArea = typeAvgAccuracy[0]?.type || 'N/A';
    const weakestArea = typeAvgAccuracy[typeAvgAccuracy.length - 1]?.type || 'N/A';

    acc[subject] = {
      avgAccuracy,
      totalCompleted: sets.length,
      improvement,
      strongestArea,
      weakestArea
    };

    return acc;
  }, {});

  // Function to get subject color class based on performance
  const getPerformanceColorClass = (accuracy: number) => {
    if (accuracy >= 90) return 'text-emerald-500 dark:text-emerald-400';
    if (accuracy >= 80) return 'text-amber-500 dark:text-amber-400';
    if (accuracy >= 70) return 'text-orange-500 dark:text-orange-400';
    return 'text-rose-500 dark:text-rose-400';
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="3k5h1xm">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="_deqqz3">13. Subject-Color Coded Timeline</h3>
      
      {/* Subject tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2" data-oid="tc2n7_q">
        {subjects.map((subject) => {
          const style = subjectStyles[subject as keyof typeof subjectStyles] || subjectStyles.Reading;

          return (
            <div
              key={subject}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${style.lightColor} ${style.darkColor} ${style.textColor} ${style.darkTextColor}`} data-oid="nk3ql3o">

              <div className="flex-shrink-0" data-oid="6m34st0">
                {style.icon}
              </div>
              <div data-oid="uxz0iqv">
                <div className="font-bold" data-oid="50w0wy5">{subject}</div>
                <div className="text-xs opacity-80" data-oid="bnd6l4g">{subjectMetrics[subject].totalCompleted} sets</div>
              </div>
            </div>);

        })}
      </div>
      
      {/* Timeline sections - one per subject */}
      <div className="space-y-8" data-oid="ncwbdd4">
        {subjects.map((subject) => {
          const style = subjectStyles[subject as keyof typeof subjectStyles] || subjectStyles.Reading;
          const metric = subjectMetrics[subject];
          const subjectSets = setsBySubject[subject];

          return (
            <div key={subject} className="relative" data-oid="sjs4e79">
              {/* Subject header */}
              <div className={`flex items-center justify-between p-4 rounded-t-lg ${style.lightColor} ${style.darkColor}`} data-oid="ml.l0.q">
                <div className="flex items-center gap-2" data-oid="4:nxrrm">
                  <div className={`w-8 h-8 rounded-full ${style.mainColor} text-white flex items-center justify-center`} data-oid="d76fs2q">
                    {style.icon}
                  </div>
                  <h4 className={`text-lg font-bold ${style.textColor} ${style.darkTextColor}`} data-oid="snzi214">{subject}</h4>
                </div>
                
                <div className="flex gap-3" data-oid="d24w.r2">
                  <div className="text-center" data-oid=":p4635u">
                    <div className="text-xs opacity-70" data-oid="agysasn">Accuracy</div>
                    <div className={`font-bold ${getPerformanceColorClass(metric.avgAccuracy)}`} data-oid="q9d0bll">
                      {metric.avgAccuracy}%
                    </div>
                  </div>
                  
                  <div className="text-center" data-oid="pdez--m">
                    <div className="text-xs opacity-70" data-oid="bj3uh6i">Trend</div>
                    <div className={`font-bold ${metric.improvement >= 0 ? 'text-emerald-500' : 'text-rose-500'}`} data-oid="d6t46i_">
                      {metric.improvement >= 0 ? '+' : ''}{metric.improvement}%
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Subject timeline */}
              <div className={`p-4 rounded-b-lg ${style.borderColor} ${style.darkBorderColor} bg-white dark:bg-slate-800 border border-t-0`} data-oid="h4agyce">
                {/* Subject insights */}
                <div className="mb-4 grid grid-cols-2 gap-4" data-oid="7.dj.0q">
                  <div className="bg-slate-50 dark:bg-slate-700/30 p-3 rounded-lg" data-oid="m0wvv3w">
                    <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="xkuh1.n">Strongest Area</div>
                    <div className="font-medium" data-oid="q9cb5dm">{metric.strongestArea}</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700/30 p-3 rounded-lg" data-oid="04tlgz_">
                    <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="39.dwok">Weakest Area</div>
                    <div className="font-medium" data-oid="femhhl3">{metric.weakestArea}</div>
                  </div>
                </div>
                
                {/* Timeline items specific to this subject */}
                <div className="relative" data-oid="oqpb3.6">
                  {/* Timeline line */}
                  <div className={`absolute left-3 top-0 bottom-0 w-0.5 ${style.mainColor} z-0`} data-oid="tymaasg"></div>
                  
                  <div className="space-y-4" data-oid="zdv24i4">
                    {subjectSets.map((set, index) =>
                    <div
                      key={set.id}
                      onClick={() => onSelectSet(set.id)}
                      className={`relative pl-8 z-10 cursor-pointer transition-all ${
                      selectedSetId === set.id ?
                      `bg-${style.lightColor.substring(3)} dark:bg-slate-700/50 rounded-lg shadow-sm` :
                      ''}`
                      } data-oid=".qak349">

                        {/* Timeline node */}
                        <div className={`absolute left-0 top-3 w-6 h-6 rounded-full border-2 border-white dark:border-slate-900
                                      bg-gradient-to-br ${style.gradientFrom} ${style.gradientTo} text-white
                                      flex items-center justify-center ${
                      selectedSetId === set.id ? 'scale-125' : ''}`
                      } data-oid="9p25hzm">

                          <span className="text-[10px] font-bold" data-oid="5zn7aum">{index + 1}</span>
                        </div>
                        
                        {/* Content card */}
                        <div className="p-2" data-oid="gjh_5qq">
                          <div className="flex justify-between items-start mb-1" data-oid="rnyyw3:">
                            <h5 className="font-bold" data-oid="vrfr5m0">{set.type}</h5>
                            <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="xlo5.j:">
                              {new Date(set.dateCompleted).toLocaleDateString()}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-3" data-oid="ahvjto1">
                            <div data-oid="tw-_959">
                              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="y1r2hjk">Accuracy</div>
                              <div className={`font-bold ${getPerformanceColorClass(set.accuracy)}`} data-oid="d1y.v-k">
                                {set.accuracy}%
                              </div>
                            </div>
                            <div data-oid="l-_dn40">
                              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="7evrtpf">Time</div>
                              <div className="font-medium" data-oid="gtl.mvt">{Math.floor(set.timeUsed / 60)}m</div>
                            </div>
                            <div data-oid="ymg4xf5">
                              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="wfhlnsk">Pace</div>
                              <div className="font-medium" data-oid="85ig:a9">{set.pace}</div>
                            </div>
                            <div data-oid="bjs:lx6">
                              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="j7yw.vd">Difficulty</div>
                              <div className="font-medium" data-oid="-s2t4ir">{set.difficulty}</div>
                            </div>
                          </div>
                          
                          {/* Performance comparison with previous/average */}
                          {index > 0 &&
                        <div className="mt-2 text-xs" data-oid="ja2apfg">
                              <span className="text-slate-500 dark:text-slate-400" data-oid="vj7_i0a">vs previous: </span>
                              <span className={set.accuracy > subjectSets[index - 1].accuracy ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'} data-oid="t7-02.r">
                                {set.accuracy > subjectSets[index - 1].accuracy ? '+' : ''}
                                {set.accuracy - subjectSets[index - 1].accuracy}%
                              </span>
                              <span className="mx-2 text-slate-400" data-oid="5uwq:98">|</span>
                              <span className="text-slate-500 dark:text-slate-400" data-oid="m0j0bwf">vs average: </span>
                              <span className={set.accuracy > metric.avgAccuracy ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'} data-oid="qw4557i">
                                {set.accuracy > metric.avgAccuracy ? '+' : ''}
                                {set.accuracy - metric.avgAccuracy}%
                              </span>
                            </div>
                        }
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>);

        })}
      </div>
    </div>);

}