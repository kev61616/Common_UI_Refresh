'use client';

import { TimelineViewProps } from './types';
import { PracticeSet } from '@/lib/mockData';

// Define the subject type explicitly to match what's in PracticeSet
type Subject = 'Reading' | 'Writing' | 'Math';

/**
 * Stream Graph (Timeline View Variant 20)
 * Visualization showing practice volume as flowing streams across time
 */
export function StreamGraph({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  // Group sets by month and subject
  const groupedData = practiceSets.reduce<{
    [key: string]: {
      month: string;
      year: number;
      date: Date;
      subjects: { [subject in
      Subject]?: {
        count: number;
        avgAccuracy: number;
        sets: PracticeSet[];
      } };

      total: number;
    };
  }>((acc, set) => {
    const date = new Date(set.dateCompleted);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const key = `${year}-${month}`;

    if (!acc[key]) {
      acc[key] = {
        month,
        year,
        date,
        subjects: {},
        total: 0
      };
    }

    if (!acc[key].subjects[set.subject]) {
      acc[key].subjects[set.subject] = {
        count: 0,
        avgAccuracy: 0,
        sets: []
      };
    }

    // Type assertion to satisfy TypeScript
    const subjectData = acc[key].subjects[set.subject]!;
    subjectData.count += 1;
    subjectData.sets.push(set);
    subjectData.avgAccuracy = Math.round(
      subjectData.sets.reduce((sum, s) => sum + s.accuracy, 0) /
      subjectData.sets.length
    );

    acc[key].total += 1;

    return acc;
  }, {});

  // Sort data points by date
  const dataPoints = Object.values(groupedData).sort((a, b) =>
  a.date.getTime() - b.date.getTime()
  );

  // Get all unique subjects
  const allSubjects = Array.from(
    new Set(practiceSets.map((set) => set.subject))
  );

  // Color mapping for subjects
  type SubjectColorSet = {
    base: string;
    hover: string;
    dark: string;
    darkHover: string;
    text: string;
  };

  const subjectColors: Record<Subject, SubjectColorSet> = {
    Reading: {
      base: 'rgba(56, 189, 248, 0.7)',
      hover: 'rgba(56, 189, 248, 0.9)',
      dark: 'rgba(56, 189, 248, 0.5)',
      darkHover: 'rgba(56, 189, 248, 0.7)',
      text: 'text-sky-600 dark:text-sky-400'
    },
    Math: {
      base: 'rgba(99, 102, 241, 0.7)',
      hover: 'rgba(99, 102, 241, 0.9)',
      dark: 'rgba(99, 102, 241, 0.5)',
      darkHover: 'rgba(99, 102, 241, 0.7)',
      text: 'text-indigo-600 dark:text-indigo-400'
    },
    Writing: {
      base: 'rgba(139, 92, 246, 0.7)',
      hover: 'rgba(139, 92, 246, 0.9)',
      dark: 'rgba(139, 92, 246, 0.5)',
      darkHover: 'rgba(139, 92, 246, 0.7)',
      text: 'text-violet-600 dark:text-violet-400'
    }
  };

  // Get color set for a subject (with fallback)
  function getSubjectColorSet(subject: Subject | string): SubjectColorSet {
    if (subject === 'Reading' || subject === 'Math' || subject === 'Writing') {
      return subjectColors[subject];
    }
    return subjectColors.Reading; // Default fallback
  }

  // Calculate accumulative positioning values for stream graph
  const calculateStreamCoordinates = () => {
    const maxCount = Math.max(...dataPoints.map((d) => d.total)) || 1;
    const graphHeight = 300; // max height for the streams
    const pointWidth = 80; // width per time period

    return dataPoints.map((point, pointIndex) => {
      const x = 100 + pointIndex * pointWidth;

      let startY = graphHeight / 2 - point.total / maxCount * (graphHeight / 2);

      const subjectStreams = allSubjects.map((subject) => {
        const count = point.subjects[subject]?.count || 0;
        const height = count > 0 ? count / maxCount * graphHeight : 0;

        const stream = {
          subject,
          x,
          startY,
          height,
          endY: startY + height,
          count,
          sets: point.subjects[subject]?.sets || [],
          avgAccuracy: point.subjects[subject]?.avgAccuracy || 0,
          label: point.month
        };

        startY += height;
        return stream;
      });

      return {
        x,
        month: point.month,
        year: point.year,
        date: point.date,
        streams: subjectStreams,
        total: point.total
      };
    });
  };

  const streamData = calculateStreamCoordinates();

  // Helper function to generate the SVG path for a subject stream
  const generateStreamPath = (subject: Subject) => {
    if (streamData.length === 0) return '';

    // Extract points relevant to this subject's stream
    const subjectIndex = allSubjects.indexOf(subject);

    // Forward path (top of the stream)
    let pathData = `M ${streamData[0].x} ${streamData[0].streams[subjectIndex].startY}`;

    // Add curves between points for top path
    for (let i = 0; i < streamData.length - 1; i++) {
      const current = streamData[i];
      const next = streamData[i + 1];
      const currentY = current.streams[subjectIndex].startY;
      const nextY = next.streams[subjectIndex].startY;
      const controlX = (current.x + next.x) / 2;

      pathData += ` C ${controlX} ${currentY}, ${controlX} ${nextY}, ${next.x} ${nextY}`;
    }

    // Bottom path (in reverse)
    for (let i = streamData.length - 1; i >= 0; i--) {
      const point = streamData[i];
      const endY = point.streams[subjectIndex].endY;

      if (i === streamData.length - 1) {
        // Move to the bottom-right point
        pathData += ` L ${point.x} ${endY}`;
      } else {
        const prev = streamData[i + 1];
        const controlX = (point.x + prev.x) / 2;

        // Add curve for bottom path
        pathData += ` C ${controlX} ${prev.streams[subjectIndex].endY}, ${controlX} ${endY}, ${point.x} ${endY}`;
      }
    }

    // Close the path
    pathData += ' Z';

    return pathData;
  };

  // Find month containing selected set
  const selectedMonth = selectedSetId ?
  streamData.find((month) =>
  month.streams.some((stream) =>
  stream.sets.some((set) => set.id === selectedSetId)
  )
  ) : null;

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="0ee566j">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="swg-40u">20. Stream Graph</h3>
      
      <div className="max-w-5xl mx-auto" data-oid="bc31nlz">
        {/* Graph */}
        <div className="mb-6" data-oid="rvtuwkb">
          <div className="relative w-full h-[400px] overflow-x-auto" data-oid="jyg48lo">
            <div className="min-w-[600px] h-full relative" data-oid="dyh8wq5">
              <svg
                className="w-full h-full"
                viewBox={`0 0 ${Math.max(600, streamData.length * 80 + 200)} 400`}
                preserveAspectRatio="xMinYMid meet" data-oid="kylqwkf">

                {/* Background grid */}
                <g className="stroke-slate-200 dark:stroke-slate-700 stroke-[0.5]" data-oid="n_qwwtk">
                  {Array.from({ length: 5 }).map((_, i) =>
                  <line
                    key={`grid-h-${i}`}
                    x1="80"
                    y1={50 + i * 75}
                    x2={streamData.length * 80 + 120}
                    y2={50 + i * 75} data-oid="5clsy1g" />

                  )}
                </g>
                
                {/* Subject streams */}
                {allSubjects.map((subject, subjectIndex) => {
                  const colorSet = getSubjectColorSet(subject as Subject);
                  const path = generateStreamPath(subject as Subject);

                  if (!path) return null;

                  return (
                    <g key={subject} data-oid="jq1rmx_">
                      <path
                        d={path}
                        fill={colorSet.base}
                        className="dark:fill-opacity-40 transition-colors duration-300 hover:fill-opacity-90"
                        stroke="white"
                        strokeWidth="0.5"
                        strokeOpacity="0.3"
                        onClick={() => {
                          // Find first set of this subject
                          const firstStream = streamData.find((d) =>
                          d.streams[subjectIndex].count > 0
                          );

                          if (firstStream) {
                            const firstSet = firstStream.streams[subjectIndex].sets[0];
                            if (firstSet) {
                              onSelectSet(firstSet.id);
                            }
                          }
                        }} data-oid="mq:1j2d" />

                    </g>);

                })}
                
                {/* Time labels */}
                <g className="text-xs fill-slate-500 dark:fill-slate-400" data-oid="z47_7.l">
                  {streamData.map((point, i) =>
                  <g key={`label-${i}`} data-oid=".bobyj4">
                      <text
                      x={point.x}
                      y="380"
                      textAnchor="middle" data-oid="bgvqwd3">

                        {point.month}
                      </text>
                      {i === 0 || streamData[i - 1].year !== point.year ?
                    <text
                      x={point.x}
                      y="395"
                      textAnchor="middle"
                      className="font-medium" data-oid="0:7f1r5">

                          {point.year}
                        </text> :
                    null}
                    </g>
                  )}
                </g>
                
                {/* Subject highlights for selected month */}
                {selectedMonth &&
                <g data-oid="yvibgxl">
                    {selectedMonth.streams.map((stream, i) => {
                    if (stream.count === 0) return null;

                    const subject = allSubjects[i] as Subject;
                    const colorSet = getSubjectColorSet(subject);

                    return (
                      <g key={`highlight-${subject}`} className="cursor-pointer" data-oid="c-j6i.p">
                          <rect
                          x={stream.x - 30}
                          y={stream.startY}
                          width="60"
                          height={stream.height}
                          fill={colorSet.hover}
                          className="dark:fill-opacity-60"
                          stroke="white"
                          strokeWidth="1"
                          strokeOpacity="0.6" data-oid="tm5dms2" />

                          
                          {stream.height > 30 &&
                        <text
                          x={stream.x}
                          y={stream.startY + stream.height / 2 + 5}
                          textAnchor="middle"
                          className="fill-white text-sm font-medium" data-oid="r2y2lyr">

                              {stream.count}
                            </text>
                        }
                        </g>);

                  })}
                  </g>
                }
                
                {/* Subject labels */}
                <g data-oid="x2y6837">
                  {allSubjects.map((subject, i) => {
                    const colorSet = getSubjectColorSet(subject as Subject);
                    return (
                      <g key={`subject-${subject}`} className="cursor-pointer" data-oid="w-ctz2j">
                        <rect
                          x="20"
                          y={80 + i * 25}
                          width="12"
                          height="12"
                          fill={colorSet.base}
                          rx="2"
                          className="dark:fill-opacity-70" data-oid=".lnnrab" />

                        <text
                          x="40"
                          y={90 + i * 25}
                          className={`text-xs ${colorSet.text} font-medium`} data-oid="7h4emg8">

                          {subject}
                        </text>
                      </g>);

                  })}
                </g>
              </svg>
              
              {/* Interactive month selector overlay */}
              <div className="absolute inset-0 pointer-events-none" data-oid="e_tvo1j">
                <div className="relative h-full" data-oid="h6eeszo">
                  {streamData.map((point, i) =>
                  <div
                    key={`selector-${i}`}
                    className="absolute top-0 bottom-0 w-[60px] cursor-pointer pointer-events-auto hover:bg-black/5 dark:hover:bg-white/5"
                    style={{ left: `${point.x - 30}px` }}
                    onClick={() => {
                      // Find the first set in this time period
                      for (const stream of point.streams) {
                        if (stream.sets.length > 0) {
                          onSelectSet(stream.sets[0].id);
                          break;
                        }
                      }
                    }} data-oid="wb3x:h4">
                  </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Selected month details */}
        {selectedMonth &&
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4" data-oid="0ye:hzj">
            <h4 className="text-lg font-bold mb-3" data-oid="nte_3i4">{selectedMonth.month} {selectedMonth.year}</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-oid="j96x92j">
              {/* Month summary */}
              <div data-oid="5zm9xt0">
                <div className="text-slate-500 dark:text-slate-400 text-sm mb-2" data-oid="_1:q0vk">Practice Volume</div>
                <div className="flex items-end gap-4" data-oid="p1_g_hv">
                  <div className="text-3xl font-light" data-oid="fp0xwa1">{selectedMonth.total} sets</div>
                  
                  <div className="flex space-x-3 items-center" data-oid="en:-yui">
                    {selectedMonth.streams.map((stream, i) => {
                    if (stream.count === 0) return null;

                    const subject = allSubjects[i] as Subject;
                    const colorSet = getSubjectColorSet(subject);

                    return (
                      <div key={`count-${subject}`} className="text-center" data-oid="352_ut1">
                          <div className={`text-sm ${colorSet.text} font-medium`} data-oid="bqaa8-d">{stream.count}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="3fjf9ya">{subject}</div>
                        </div>);

                  })}
                  </div>
                </div>
                
                {/* Performance summary */}
                <div className="mt-4 grid grid-cols-3 gap-3" data-oid="g3c72yj">
                  {selectedMonth.streams.map((stream, i) => {
                  if (stream.count === 0) return null;

                  const subject = allSubjects[i] as Subject;
                  const colorSet = getSubjectColorSet(subject);

                  return (
                    <div
                      key={`perf-${subject}`}
                      className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30" data-oid="w3jq5jc">

                        <div className={`${colorSet.text} font-medium mb-1`} data-oid="zx3ugqe">{subject}</div>
                        <div className="flex items-end justify-between" data-oid="b4e0hd6">
                          <div data-oid="ic.e.c7">
                            <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="ege:ngc">Avg. Accuracy</div>
                            <div className="text-lg font-semibold" data-oid="j4k5mw3">{stream.avgAccuracy}%</div>
                          </div>
                          <div className="text-2xl opacity-60" data-oid="9_csd7z">{getEmoji(subject)}</div>
                        </div>
                      </div>);

                })}
                </div>
              </div>
              
              {/* Practice sets in this month */}
              <div data-oid="9-zzive">
                <div className="text-slate-500 dark:text-slate-400 text-sm mb-2" data-oid="rpgooq.">Practice Sets</div>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2" data-oid="ae0l5bd">
                  {selectedMonth.streams.flatMap((stream) => stream.sets).map((set) =>
                <div
                  key={set.id}
                  onClick={() => onSelectSet(set.id)}
                  className={`p-2 border rounded flex items-center justify-between cursor-pointer
                                ${selectedSetId === set.id ?
                  'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' :
                  'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`} data-oid="qy7an80">

                      <div className="flex items-center gap-3" data-oid="q2xz1gu">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full 
                                        ${set.subject === 'Reading' ? 'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400' :
                    set.subject === 'Math' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' :
                    'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400'}`} data-oid="j-5runy">

                          {getEmoji(set.subject)}
                        </div>
                        <div data-oid="uk_r92d">
                          <div className="font-medium text-sm" data-oid="vb6k-5d">{set.type}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="x8lbocb">
                            {new Date(set.dateCompleted).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right" data-oid=":d_48rd">
                        <div className="font-semibold" data-oid="i-4tna8">{set.accuracy}%</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="mje0nr_">
                          {Math.floor(set.timeUsed / 60)}m
                        </div>
                      </div>
                    </div>
                )}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>);

}

// Helper function to get subject emoji - renamed and simplified
function getEmoji(subject: string): string {
  if (subject === 'Reading') return '📚';
  if (subject === 'Math') return '🧮';
  if (subject === 'Writing') return '✏️';
  return '📘';
}