'use client';

import { useEffect, useRef, useState } from 'react';
import { PracticeSet } from '@/lib/mockData';
import { HoverCard } from './HoverCard';

interface TimelineViewProps {
  practiceSets: PracticeSet[];
  onSelectSet: (id: string) => void;
  selectedSetId: string | null;
}

export function TimelineView2({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverInfo, setHoverInfo] = useState<PracticeSet | null>(null);

  // Sort sets by date
  const sortedSets = [...practiceSets].sort((a, b) =>
  new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
  );

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Format date to more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Group sets by week
  const weeklyData: Record<string, {
    sets: PracticeSet[];
    math: PracticeSet[];
    reading: PracticeSet[];
    writing: PracticeSet[];
  }> = {};

  sortedSets.forEach((set) => {
    const date = new Date(set.dateCompleted);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
    const weekKey = formatDate(weekStart.toISOString());

    if (!weeklyData[weekKey]) {
      weeklyData[weekKey] = {
        sets: [],
        math: [],
        reading: [],
        writing: []
      };
    }

    weeklyData[weekKey].sets.push(set);

    if (set.subject === 'Math') {
      weeklyData[weekKey].math.push(set);
    } else if (set.subject === 'Reading') {
      weeklyData[weekKey].reading.push(set);
    } else if (set.subject === 'Writing') {
      weeklyData[weekKey].writing.push(set);
    }
  });

  // Calculate accuracy heatmap color
  const getAccuracyColor = (accuracy: number | null) => {
    if (accuracy === null) return 'bg-slate-100 dark:bg-slate-800';
    if (accuracy >= 90) return 'bg-emerald-500';
    if (accuracy >= 80) return 'bg-emerald-400';
    if (accuracy >= 70) return 'bg-yellow-400';
    if (accuracy >= 60) return 'bg-amber-400';
    if (accuracy >= 50) return 'bg-orange-400';
    return 'bg-red-400';
  };

  // Get average accuracy for a subject in a week
  const getAvgAccuracy = (sets: PracticeSet[]) => {
    if (sets.length === 0) return null;
    return Math.round(sets.reduce((sum, set) => sum + set.accuracy, 0) / sets.length);
  };

  // Show message if no data
  if (practiceSets.length === 0) {
    return (
      <div className="bg-white text-center py-8 rounded-lg shadow-sm border border-slate-200 dark:bg-slate-800 dark:border-slate-700" data-oid="gzqhe:p">
        <p className="text-slate-500 dark:text-slate-400" data-oid="iedt165">No practice sets match your filters</p>
      </div>);

  }

  // Create weeks array for display
  const weeks = Object.keys(weeklyData).sort((a, b) =>
  new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 relative overflow-hidden dark:bg-slate-800 dark:border-slate-700" ref={containerRef} data-oid="bjw2s03">
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-bl-full" data-oid="w:-l0-0"></div>
      
      <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3 mb-6" data-oid="jncftu.">
        <span className="inline-block p-2 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400" data-oid="zo8_qqn">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="sm4x:.n">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-oid="k7se7na" />
          </svg>
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400" data-oid=":_1_b-8">
          2. Weekly Performance Heatmap
        </span>
      </h3>
      
      {/* Legend */}
      <div className="flex items-center gap-6 mb-6 flex-wrap" data-oid="u2cb13e">
        <div className="flex items-center gap-2" data-oid="ft:a0p7">
          <div className="h-4 w-4 rounded-sm bg-emerald-500" data-oid="kxdaumw"></div>
          <span className="text-xs text-slate-600 dark:text-slate-400" data-oid="pq04xoq">90%+</span>
        </div>
        <div className="flex items-center gap-2" data-oid="xflblcg">
          <div className="h-4 w-4 rounded-sm bg-emerald-400" data-oid="19-biqo"></div>
          <span className="text-xs text-slate-600 dark:text-slate-400" data-oid="c.xr392">80-89%</span>
        </div>
        <div className="flex items-center gap-2" data-oid="bks9xd0">
          <div className="h-4 w-4 rounded-sm bg-yellow-400" data-oid="f3w4yg1"></div>
          <span className="text-xs text-slate-600 dark:text-slate-400" data-oid="1yb7z9l">70-79%</span>
        </div>
        <div className="flex items-center gap-2" data-oid="25tuocy">
          <div className="h-4 w-4 rounded-sm bg-amber-400" data-oid="rb1ljyk"></div>
          <span className="text-xs text-slate-600 dark:text-slate-400" data-oid="63q14f3">60-69%</span>
        </div>
        <div className="flex items-center gap-2" data-oid="wvawsob">
          <div className="h-4 w-4 rounded-sm bg-orange-400" data-oid="v378kdp"></div>
          <span className="text-xs text-slate-600 dark:text-slate-400" data-oid="oa4lbh.">50-59%</span>
        </div>
        <div className="flex items-center gap-2" data-oid="fn.0ux_">
          <div className="h-4 w-4 rounded-sm bg-red-400" data-oid="skky:qi"></div>
          <span className="text-xs text-slate-600 dark:text-slate-400" data-oid="u1se1dy">Below 50%</span>
        </div>
        <div className="flex items-center gap-2" data-oid="h4cg_o8">
          <div className="h-4 w-4 rounded-sm bg-slate-100 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-600" data-oid="d46..ri"></div>
          <span className="text-xs text-slate-600 dark:text-slate-400" data-oid="g:7v-6s">No practice</span>
        </div>
      </div>
      
      {/* Timeline heatmap */}
      <div className="overflow-x-auto" data-oid="901ox_k">
        <table className="min-w-full" data-oid="zy207:h">
          <thead data-oid="qe241ip">
            <tr data-oid="c:8e0g1">
              <th className="whitespace-nowrap px-4 py-2 text-left text-sm font-medium text-slate-500 dark:text-slate-400" data-oid="ix--tt3">Week Starting</th>
              <th className="whitespace-nowrap px-4 py-2 text-center text-sm font-medium text-slate-500 dark:text-slate-400" data-oid="9t_j1h2">All Subjects</th>
              <th className="whitespace-nowrap px-4 py-2 text-center text-sm font-medium text-indigo-600 dark:text-indigo-400" data-oid="6:u.s2f">Math</th>
              <th className="whitespace-nowrap px-4 py-2 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400" data-oid="zi6:kn4">Reading</th>
              <th className="whitespace-nowrap px-4 py-2 text-center text-sm font-medium text-amber-600 dark:text-amber-400" data-oid=":iin.z5">Writing</th>
              <th className="whitespace-nowrap px-4 py-2 text-center text-sm font-medium text-slate-500 dark:text-slate-400" data-oid="q30.fhs">Activity</th>
            </tr>
          </thead>
          <tbody data-oid="pbjpbck">
            {weeks.map((week) => {
              const weekData = weeklyData[week];
              const totalAvg = getAvgAccuracy(weekData.sets);
              const mathAvg = getAvgAccuracy(weekData.math);
              const readingAvg = getAvgAccuracy(weekData.reading);
              const writingAvg = getAvgAccuracy(weekData.writing);

              return (
                <tr
                  key={week}
                  className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors duration-150" data-oid="xf5tjyr">

                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-900 dark:text-white" data-oid="5v3l5yd">
                    {week}
                  </td>
                  <td className="p-2 text-center" data-oid="pe_b4lv">
                    <div
                      className={`mx-auto h-10 w-10 rounded-lg grid place-items-center cursor-pointer ${getAccuracyColor(totalAvg)} ${
                      totalAvg ? 'shadow-sm hover:shadow hover:opacity-90' : 'border border-dashed border-slate-300 dark:border-slate-600'}`
                      }
                      onMouseEnter={() => {
                        if (weekData.sets.length > 0) {
                          setHoverInfo({
                            ...weekData.sets[0],
                            id: 'summary',
                            subject: 'Math', // Using Math as a placeholder since 'subject' must be one of the allowed values
                            type: 'Weekly Summary',
                            accuracy: totalAvg || 0,
                            dateCompleted: week
                          });
                        }
                      }}
                      onMouseLeave={() => setHoverInfo(null)} data-oid="fojpkm8">

                      {totalAvg &&
                      <span className="text-xs font-bold text-white" data-oid="nx554rh">{totalAvg}%</span>
                      }
                    </div>
                  </td>
                  <td className="p-2 text-center" data-oid="1h4nijp">
                    <div
                      className={`mx-auto h-10 w-10 rounded-lg grid place-items-center cursor-pointer ${getAccuracyColor(mathAvg)} ${
                      mathAvg ? 'shadow-sm hover:shadow hover:opacity-90' : 'border border-dashed border-slate-300 dark:border-slate-600'}`
                      }
                      onClick={() => {
                        if (weekData.math.length > 0) {
                          onSelectSet(weekData.math[0].id);
                        }
                      }}
                      onMouseEnter={() => {
                        if (weekData.math.length > 0) {
                          setHoverInfo({
                            ...weekData.math[0],
                            id: 'math-summary',
                            type: 'Math Summary',
                            accuracy: mathAvg || 0,
                            dateCompleted: week
                          });
                        }
                      }}
                      onMouseLeave={() => setHoverInfo(null)} data-oid="0pqfk_s">

                      {mathAvg &&
                      <span className="text-xs font-bold text-white" data-oid="yt6gudu">{mathAvg}%</span>
                      }
                    </div>
                  </td>
                  <td className="p-2 text-center" data-oid="x4u-ixf">
                    <div
                      className={`mx-auto h-10 w-10 rounded-lg grid place-items-center cursor-pointer ${getAccuracyColor(readingAvg)} ${
                      readingAvg ? 'shadow-sm hover:shadow hover:opacity-90' : 'border border-dashed border-slate-300 dark:border-slate-600'}`
                      }
                      onClick={() => {
                        if (weekData.reading.length > 0) {
                          onSelectSet(weekData.reading[0].id);
                        }
                      }}
                      onMouseEnter={() => {
                        if (weekData.reading.length > 0) {
                          setHoverInfo({
                            ...weekData.reading[0],
                            id: 'reading-summary',
                            type: 'Reading Summary',
                            accuracy: readingAvg || 0,
                            dateCompleted: week
                          });
                        }
                      }}
                      onMouseLeave={() => setHoverInfo(null)} data-oid="1jfdqmk">

                      {readingAvg &&
                      <span className="text-xs font-bold text-white" data-oid="g0d0bea">{readingAvg}%</span>
                      }
                    </div>
                  </td>
                  <td className="p-2 text-center" data-oid="7y3r.3g">
                    <div
                      className={`mx-auto h-10 w-10 rounded-lg grid place-items-center cursor-pointer ${getAccuracyColor(writingAvg)} ${
                      writingAvg ? 'shadow-sm hover:shadow hover:opacity-90' : 'border border-dashed border-slate-300 dark:border-slate-600'}`
                      }
                      onClick={() => {
                        if (weekData.writing.length > 0) {
                          onSelectSet(weekData.writing[0].id);
                        }
                      }}
                      onMouseEnter={() => {
                        if (weekData.writing.length > 0) {
                          setHoverInfo({
                            ...weekData.writing[0],
                            id: 'writing-summary',
                            type: 'Writing Summary',
                            accuracy: writingAvg || 0,
                            dateCompleted: week
                          });
                        }
                      }}
                      onMouseLeave={() => setHoverInfo(null)} data-oid="4wbf_2n">

                      {writingAvg &&
                      <span className="text-xs font-bold text-white" data-oid="x7wheo4">{writingAvg}%</span>
                      }
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center" data-oid="6ailv5x">
                    <div className="flex items-center justify-center space-x-1" data-oid="i_4cofp">
                      {weekData.sets.map((set, i) =>
                      <div
                        key={`dot-${i}`}
                        className={`h-2 w-2 rounded-full ${
                        set.subject === 'Math' ? 'bg-indigo-500' :
                        set.subject === 'Reading' ? 'bg-emerald-500' :
                        'bg-amber-500'} ${

                        selectedSetId === set.id ? 'ring-2 ring-offset-2 ring-slate-300 dark:ring-slate-600' : ''}`
                        }
                        onClick={() => onSelectSet(set.id)}
                        onMouseEnter={() => setHoverInfo(set)}
                        onMouseLeave={() => setHoverInfo(null)} data-oid="g8bj61m">
                      </div>
                      )}
                    </div>
                  </td>
                </tr>);

            })}
          </tbody>
        </table>
      </div>
      
      {/* Hover Info Card */}
      {hoverInfo && <HoverCard info={hoverInfo} formatTime={formatTime} data-oid="rr328q1" />}
      
      {/* Performance insights - static message displayed at the bottom */}
      <div className="border-t border-slate-100 dark:border-slate-700 mt-6 pt-4" data-oid="jokmnnk">
        <h4 className="text-sm font-semibold text-slate-800 dark:text-white mb-2" data-oid="ieoake0">Learning Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-oid=":7adcvs">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg" data-oid="sncfwl6">
            <h5 className="text-xs font-medium text-indigo-700 dark:text-indigo-400 mb-1" data-oid="ezdhmvg">Weekly Trends</h5>
            <p className="text-xs text-slate-600 dark:text-slate-400" data-oid="t9b.gv8">
              {weeks.length > 1 && (getAvgAccuracy(weeklyData[weeks[weeks.length - 1]]?.sets ?? []) ?? 0) > (
              getAvgAccuracy(weeklyData[weeks[weeks.length - 2]]?.sets ?? []) ?? 0) ?
              "Your performance is improving week over week. Keep up the good work!" :
              weeks.length > 1 ?
              "Your performance has slightly decreased recently. Consider reviewing past material." :

              "Continue practicing consistently to establish performance trends."
              }
            </p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg" data-oid="98khzb1">
            <h5 className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-1" data-oid="tdcpzl_">Subject Balance</h5>
            <p className="text-xs text-slate-600 dark:text-slate-400" data-oid="p_t-2bw">
              {Object.values(weeklyData).some((week) => week?.math && week.math.length > 0) &&
              Object.values(weeklyData).some((week) => week?.reading && week.reading.length > 0) &&
              Object.values(weeklyData).some((week) => week?.writing && week.writing.length > 0) ?
              "You're maintaining good balance across all subjects. This comprehensive approach builds well-rounded skills." :

              "Consider practicing more evenly across all subjects to develop balanced skills."
              }
            </p>
          </div>
        </div>
      </div>
    </div>);

}