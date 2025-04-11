'use client';

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
        };
      };
    };
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
    const subjectSets = acc[key].sets.filter((s) => s.subject === set.subject);
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
      };
    } = {};

    // Calculate changes for each subject
    Object.entries(month.subjects).forEach(([subject, data]) => {
      const prevSubjectData = prevMonth?.subjects[subject];

      subjectChanges[subject] = {
        accuracyChange: prevSubjectData ?
        data.avgAccuracy - prevSubjectData.avgAccuracy :
        0,
        countChange: prevSubjectData ?
        data.count - prevSubjectData.count :
        data.count
      };
    });

    return {
      ...month,
      changes: subjectChanges
    };
  });

  // Calculate overall trend
  const overallTrend = monthlyComparisons.length > 1 ?
  Math.round(monthlyComparisons[monthlyComparisons.length - 1].sets.reduce((sum, set) => sum + set.accuracy, 0) /
  monthlyComparisons[monthlyComparisons.length - 1].sets.length -
  monthlyComparisons[0].sets.reduce((sum, set) => sum + set.accuracy, 0) /
  monthlyComparisons[0].sets.length) :
  0;

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="80.5whl">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="7uao_1i">18. Comparison Timeline</h3>
      
      <div className="max-w-5xl mx-auto" data-oid="uyq12p7">
        {/* Overall trend indicator */}
        <div className="mb-8 p-4 bg-white dark:bg-slate-800 rounded-lg shadow text-center" data-oid="gpjvwh9">
          <div className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1" data-oid="auoum-j">Overall Trend</div>
          <div className="flex items-center justify-center gap-2" data-oid="4un9rze">
            <div className={`text-2xl font-bold ${
            overallTrend > 0 ?
            'text-emerald-600 dark:text-emerald-400' :
            overallTrend < 0 ?
            'text-rose-600 dark:text-rose-400' :
            'text-slate-600 dark:text-slate-400'}`
            } data-oid="1u4txu:">
              {overallTrend > 0 ? '+' : ''}{overallTrend}%
            </div>
            
            {overallTrend !== 0 &&
            <div className={`${
            overallTrend > 0 ?
            'text-emerald-600 dark:text-emerald-400' :
            'text-rose-600 dark:text-rose-400'}`
            } data-oid="xpss8et">
                {overallTrend > 0 ?
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-oid="wk1i99c">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" data-oid="-xbunmb" />
                  </svg> :

              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-oid="c:lae_3">
                    <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v3.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" data-oid="4j53lqc" />
                  </svg>
              }
              </div>
            }
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-1" data-oid="ixbtwrq">
            {overallTrend > 5 ?
            'Impressive improvement over time!' :
            overallTrend > 0 ?
            'Steady improvement over time' :
            overallTrend < -5 ?
            'Significant decrease in performance' :
            overallTrend < 0 ?
            'Slight decrease in performance' :
            'Consistent performance over time'}
          </div>
        </div>
        
        {/* Monthly comparison cards */}
        <div className="space-y-6" data-oid="3fiu3bk">
          {monthlyComparisons.map((month, index) =>
          <div
            key={`${month.year}-${month.month}`}
            className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden" data-oid="_8svp7-">

              {/* Month header */}
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border-b border-slate-200 dark:border-slate-700" data-oid="kyk5bik">
                <div className="flex justify-between items-center" data-oid="twe_8ek">
                  <h4 className="font-bold text-lg" data-oid="j5goj_l">
                    {month.month} {month.year}
                  </h4>
                  <div className="text-sm text-slate-500 dark:text-slate-400" data-oid=":frqdh8">
                    {month.sets.length} sets completed
                  </div>
                </div>
              </div>
              
              {/* Subject comparisons */}
              <div className="p-4" data-oid="by:ub_r">
                <div className="space-y-4" data-oid="phjwaw1">
                  {Object.entries(month.subjects).map(([subject, data]) =>
                <div key={subject} className="border border-slate-200 dark:border-slate-700 rounded-lg p-3" data-oid="k.amiuh">
                      <div className="flex justify-between items-start mb-2" data-oid="c05p7ny">
                        <div className="flex items-center gap-2" data-oid=".dpj4:r">
                          <div className={`w-3 h-3 rounded-full ${
                      subject === 'Reading' ?
                      'bg-sky-500' :
                      subject === 'Math' ?
                      'bg-indigo-500' :
                      'bg-violet-500'}`
                      } data-oid="ulfgh8s"></div>
                          <div className="font-medium" data-oid="12wyei3">{subject}</div>
                        </div>
                        
                        <div className="text-sm" data-oid="7:u04f1">
                          {data.count} {data.count === 1 ? 'set' : 'sets'}
                        </div>
                      </div>
                      
                      {/* Accuracy comparison */}
                      <div className="flex items-center justify-between" data-oid="xi4fqg-">
                        <div data-oid="4sq9k8x">
                          <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="psvuybe">Average Accuracy</div>
                          <div className="text-lg font-semibold" data-oid="c::0n:8">{data.avgAccuracy}%</div>
                        </div>
                        
                        {index > 0 &&
                    <div data-oid="4o_6a2s">
                            <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="zontjkx">vs Previous Month</div>
                            <div className={`text-sm font-medium flex items-center ${
                      month.changes[subject].accuracyChange > 0 ?
                      'text-emerald-600 dark:text-emerald-400' :
                      month.changes[subject].accuracyChange < 0 ?
                      'text-rose-600 dark:text-rose-400' :
                      'text-slate-500 dark:text-slate-400'}`
                      } data-oid="53c2ny-">
                              {month.changes[subject].accuracyChange > 0 ? '+' : ''}
                              {month.changes[subject].accuracyChange}%
                              
                              {month.changes[subject].accuracyChange !== 0 &&
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor" data-oid="lj7ptvo">
                                  {month.changes[subject].accuracyChange > 0 ?
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" data-oid="b5kaq4f" /> :

                          <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v3.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" data-oid="l9m3iu-" />
                          }
                                </svg>
                        }
                            </div>
                          </div>
                    }
                      </div>
                      
                      {/* Set list preview */}
                      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700" data-oid="_e7em6:">
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-2" data-oid="48f52ok">Recent Sets</div>
                        <div className="space-y-1" data-oid="wtrnd3k">
                          {month.sets.
                      filter((set) => set.subject === subject).
                      slice(0, 2).
                      map((set) =>
                      <div
                        key={set.id}
                        onClick={() => onSelectSet(set.id)}
                        className={`py-1 px-2 rounded text-sm cursor-pointer transition-colors
                                          ${selectedSetId === set.id ?
                        'bg-indigo-50 dark:bg-indigo-900/30' :
                        'hover:bg-slate-50 dark:hover:bg-slate-700/30'}`} data-oid="xe0un4k">

                                <div className="flex justify-between" data-oid="qilsqus">
                                  <div data-oid="dxe2jli">{set.type}</div>
                                  <div className="font-medium" data-oid="q.pgaty">{set.accuracy}%</div>
                                </div>
                              </div>
                      )}
                        </div>
                      </div>
                    </div>
                )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

}