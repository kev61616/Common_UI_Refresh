'use client';

import { TimelineViewProps } from './types';

/**
 * Metro Timeline (Timeline View Variant 10)
 * A transit-map inspired timeline showing learning journeys as subway lines
 */
export function MetroTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  // Group sets by subject (each subject is a "line")
  const subjectLines = practiceSets.reduce<{
    [subject: string]: {
      color: string;
      textColor: string;
      darkColor: string;
      darkTextColor: string;
      sets: typeof practiceSets;
    };
  }>((acc, set) => {
    // Initialize subject group if needed
    if (!acc[set.subject]) {
      acc[set.subject] = {
        color: set.subject === 'Reading' ? 'bg-sky-500' :
        set.subject === 'Math' ? 'bg-indigo-500' : 'bg-violet-500',
        textColor: 'text-white',
        darkColor: set.subject === 'Reading' ? 'dark:bg-sky-600' :
        set.subject === 'Math' ? 'dark:bg-indigo-600' : 'dark:bg-violet-600',
        darkTextColor: 'dark:text-white',
        sets: []
      };
    }

    // Add the set to this subject group
    acc[set.subject].sets.push(set);
    return acc;
  }, {});

  // Sort each line's sets by date
  Object.values(subjectLines).forEach((line) => {
    line.sets.sort((a, b) =>
    new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
    );
  });

  // Define station connection points where lines meet/intersect
  const calculateIntersections = () => {
    // Check if any sets across different subjects share dates
    const dateMap = new Map<string, Set<string>>();

    // Map all dates to the subjects that have sets on those dates
    practiceSets.forEach((set) => {
      const dateStr = new Date(set.dateCompleted).toLocaleDateString();
      if (!dateMap.has(dateStr)) {
        dateMap.set(dateStr, new Set());
      }
      dateMap.get(dateStr)?.add(set.subject);
    });

    // Find dates with multiple subjects (intersections)
    const intersections = new Map<string, string[]>();
    dateMap.forEach((subjects, dateStr) => {
      if (subjects.size > 1) {
        intersections.set(dateStr, Array.from(subjects));
      }
    });

    return intersections;
  };

  const intersections = calculateIntersections();

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="em824u_">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="5ml:uqm">10. Metro Timeline</h3>
      
      <div className="overflow-x-auto" data-oid="vnv2jjo">
        <div className="min-w-[1000px] min-h-[500px] relative metro-map p-8" data-oid="f1icgel">
          {/* Legend */}
          <div className="absolute top-2 left-2 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md z-20 border border-slate-200 dark:border-slate-700" data-oid="86fdvbp">
            <div className="text-sm font-bold mb-2" data-oid="vays1c-">Metro Lines</div>
            {Object.entries(subjectLines).map(([subject, line]) =>
            <div key={subject} className="flex items-center mb-1" data-oid="dqczmff">
                <div className={`w-4 h-4 rounded-full ${line.color} ${line.darkColor} mr-2`} data-oid="n5w_7xd"></div>
                <div className="text-xs font-medium" data-oid="diz1kt.">{subject} Line</div>
              </div>
            )}
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-2" data-oid="yg0yo5a">
              Each station represents a practice set. Transfer stations connect different subject lines.
            </div>
          </div>
          
          {/* Metro Map Lines */}
          <div className="relative mt-12" data-oid="exkjsj9">
            {/* Draw each subject line */}
            {Object.entries(subjectLines).map(([subject, line], lineIndex) => {
              const verticalOffset = 100 + lineIndex * 120; // Each line is spaced vertically

              return (
                <div key={subject} className="relative" data-oid="q50c7fa">
                  {/* Subject Line Label */}
                  <div className={`absolute left-8 top-${verticalOffset - 20} text-sm font-bold ${
                  subject === 'Reading' ? 'text-sky-600 dark:text-sky-400' :
                  subject === 'Math' ? 'text-indigo-600 dark:text-indigo-400' :
                  'text-violet-600 dark:text-violet-400'}`
                  } style={{ top: `${verticalOffset - 30}px` }} data-oid="utt33yb">
                    {subject} Line
                  </div>
                  
                  {/* Main Line */}
                  <div
                    className={`absolute h-4 rounded-full ${line.color} ${line.darkColor}`}
                    style={{
                      top: `${verticalOffset}px`,
                      left: '100px',
                      right: '60px'
                    }} data-oid="7tlmjmg">
                  </div>
                  
                  {/* Stations */}
                  {line.sets.map((set, stationIndex) => {
                    const dateStr = new Date(set.dateCompleted).toLocaleDateString();
                    const isIntersection = intersections.has(dateStr);
                    const position = 100 + stationIndex / Math.max(1, line.sets.length - 1) * 800;

                    return (
                      <div
                        key={set.id}
                        onClick={() => onSelectSet(set.id)}
                        className="absolute"
                        style={{
                          left: `${position}px`,
                          top: `${verticalOffset - 20}px`
                        }} data-oid="bj.k6ro">

                        {/* Station Circle - larger for intersections, highlighted when selected */}
                        <div className={`
                          ${isIntersection ? 'w-12 h-12' : 'w-8 h-8'} 
                          rounded-full flex items-center justify-center cursor-pointer mb-1 mx-auto transition-all
                          border-4 
                          ${selectedSetId === set.id ? 'border-yellow-300 dark:border-yellow-500' : 'border-white dark:border-slate-900'}
                          ${selectedSetId === set.id ? 'scale-110' : 'hover:scale-105'}
                          ${line.color} ${line.darkColor} ${line.textColor} ${line.darkTextColor}
                          shadow-md
                        `} data-oid="n07kqve">
                          <div className="text-xs font-bold" data-oid="3i3lqz5">{set.accuracy}%</div>
                        </div>
                        
                        {/* Station Label */}
                        <div className={`absolute left-1/2 -translate-x-1/2 top-[32px] text-center
                                      ${selectedSetId === set.id ? 'font-bold' : 'font-medium'}
                                      ${selectedSetId === set.id ? 'text-black dark:text-white' : 'text-slate-600 dark:text-slate-300'}
                                      whitespace-nowrap`} data-oid="vr7p0v4">

                          <div className="text-xs" data-oid="yyl9r_7">
                            {set.type.length > 12 ? set.type.substring(0, 10) + '...' : set.type}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400" data-oid="l10f7eu">
                            {new Date(set.dateCompleted).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                        
                        {/* Intersection marker for transfer stations */}
                        {isIntersection &&
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-[28px] text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap" data-oid="tsp11jl">
                            Transfer: {intersections.get(dateStr)?.filter((s) => s !== subject).join(', ')}
                          </div>
                        }
                      </div>);

                  })}
                  
                  {/* Line endpoints */}
                  <div
                    className={`absolute w-8 h-8 rounded-full ${line.color} ${line.darkColor} flex items-center justify-center ${line.textColor} ${line.darkTextColor}`}
                    style={{
                      top: `${verticalOffset - 2}px`,
                      left: '96px'
                    }} data-oid="-qct9.8">

                    <span className="text-xs" data-oid=".y8k6du">S</span>
                  </div>
                  <div
                    className={`absolute w-8 h-8 rounded-full ${line.color} ${line.darkColor} flex items-center justify-center ${line.textColor} ${line.darkTextColor}`}
                    style={{
                      top: `${verticalOffset - 2}px`,
                      right: '56px'
                    }} data-oid="32e0vop">

                    <span className="text-xs" data-oid="e7s8d3_">E</span>
                  </div>
                </div>);

            })}
            
            {/* Vertical connection lines for intersections */}
            {Array.from(intersections.entries()).map(([dateStr, subjects]) => {
              // Find the position of this date on the first subject line
              const subject = subjects[0];
              const lineData = subjectLines[subject];
              const set = lineData.sets.find((s) => new Date(s.dateCompleted).toLocaleDateString() === dateStr);

              if (!set) return null;

              const setIndex = lineData.sets.indexOf(set);
              const position = 100 + setIndex / Math.max(1, lineData.sets.length - 1) * 800;

              // Get the vertical range for the connection
              const subjectIndices = subjects.map((s) =>
              Object.keys(subjectLines).indexOf(s)
              );
              const minIndex = Math.min(...subjectIndices);
              const maxIndex = Math.max(...subjectIndices);
              const topPos = 100 + minIndex * 120;
              const bottomPos = 100 + maxIndex * 120;

              return (
                <div
                  key={dateStr}
                  className="absolute w-1 bg-slate-300 dark:bg-slate-600"
                  style={{
                    left: `${position}px`,
                    top: `${topPos}px`,
                    height: `${bottomPos - topPos}px`
                  }} data-oid="prj21qw">
                </div>);

            })}
          </div>
          
          {/* Selected Set Detail Panel */}
          {selectedSetId &&
          <div className="absolute bottom-4 right-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 max-w-md z-30" data-oid="t.91arb">
              {(() => {
              const set = practiceSets.find((s) => s.id === selectedSetId);
              if (!set) return null;

              const subjectLine = subjectLines[set.subject];

              return (
                <>
                    <div className="flex items-center justify-between mb-2" data-oid="da2io1t">
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    set.subject === 'Reading' ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300' :
                    set.subject === 'Math' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' :
                    'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'}`
                    } data-oid="79fu4mi">
                        {set.subject} Line
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="b9ko7vr">
                        Station {subjectLine.sets.indexOf(set) + 1} of {subjectLine.sets.length}
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-bold mb-2" data-oid="h8sgdqk">{set.type}</h4>
                    <div className="flex items-center justify-between mb-4" data-oid="prpr0qn">
                      <div data-oid="m2cub6a">
                        <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="5fnxjji">Completed on</div>
                        <div className="font-medium" data-oid="sin0k8f">{new Date(set.dateCompleted).toLocaleDateString()}</div>
                      </div>
                      <div data-oid="dyl7o0w">
                        <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="c2j.ky3">Accuracy</div>
                        <div className="text-2xl font-bold" data-oid="s4m_1gc">{set.accuracy}%</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 text-center py-2 bg-slate-50 dark:bg-slate-800/80 rounded-lg mb-3" data-oid="sghi2qu">
                      <div data-oid="9f6_fq7">
                        <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="f7453lt">Time</div>
                        <div className="font-medium" data-oid="m18v-t1">{Math.floor(set.timeUsed / 60)}:{(set.timeUsed % 60).toString().padStart(2, '0')}</div>
                      </div>
                      <div data-oid="4lu:atj">
                        <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="qtd:a1-">Pace</div>
                        <div className="font-medium" data-oid="enjlxxq">{set.pace}</div>
                      </div>
                      <div data-oid="_o55bw.">
                        <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="rimi:-n">Difficulty</div>
                        <div className="font-medium" data-oid="hrab8hg">{set.difficulty}</div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="bf0-b:8">
                      {new Date(set.dateCompleted).toLocaleDateString() === new Date().toLocaleDateString() ?
                    'You are currently at this station' :
                    'Click on stations to view details'}
                    </div>
                  </>);

            })()}
            </div>
          }
        </div>
      </div>
    </div>);

}