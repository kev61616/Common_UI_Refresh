'use client';

import { useState } from 'react';
import { QuestionViewProps } from './types';

/**
 * QuestionTimelineView - Chronological visualization of question history with performance tracking
 * Shows questions arranged in a timeline with performance indicators
 */
export function QuestionTimelineView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // State for filtering and view options
  const [selectedSubject, setSelectedSubject] = useState<string | 'all'>('all');
  const [timeScale, setTimeScale] = useState<'day' | 'week' | 'month'>('week');
  const [groupBy, setGroupBy] = useState<'date' | 'topic' | 'difficulty'>('date');
  const [showCorrectOnly, setShowCorrectOnly] = useState<'all' | 'correct' | 'incorrect'>('all');

  // Extract all questions with metadata
  const allQuestions = practiceSets.flatMap((set) =>
  set.questions.map((q) => ({
    ...q,
    setId: set.id,
    subject: set.subject,
    dateCompleted: set.dateCompleted,
    type: set.type,
    accuracy: set.accuracy
  }))
  );

  // Get all available subjects for filtering
  const subjects = Array.from(new Set(practiceSets.map((set) => set.subject)));

  // Filter questions by selected subject
  const filteredQuestions = allQuestions.
  filter((q) => selectedSubject === 'all' || q.subject === selectedSubject).
  filter((q) => {
    if (showCorrectOnly === 'all') return true;
    return showCorrectOnly === 'correct' ? q.correct : !q.correct;
  });

  // Sort questions by date (oldest to newest)
  const sortedQuestions = [...filteredQuestions].sort((a, b) =>
  new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
  );

  // Group questions by the selected grouping
  const groupedQuestions: Record<string, typeof filteredQuestions> = {};

  if (groupBy === 'date') {
    // Group by date periods
    sortedQuestions.forEach((question) => {
      const date = new Date(question.dateCompleted);
      let groupKey: string;

      if (timeScale === 'day') {
        groupKey = date.toLocaleDateString();
      } else if (timeScale === 'week') {
        // Get the week number
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
        const weekNum = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
        groupKey = `Week ${weekNum}, ${date.getFullYear()}`;
      } else {// month
        groupKey = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      }

      if (!groupedQuestions[groupKey]) {
        groupedQuestions[groupKey] = [];
      }
      groupedQuestions[groupKey].push(question);
    });
  } else if (groupBy === 'topic') {
    // Group by topic
    sortedQuestions.forEach((question) => {
      const groupKey = question.topic;
      if (!groupedQuestions[groupKey]) {
        groupedQuestions[groupKey] = [];
      }
      groupedQuestions[groupKey].push(question);
    });
  } else {// difficulty
    // Group by difficulty
    sortedQuestions.forEach((question) => {
      const groupKey = question.difficulty;
      if (!groupedQuestions[groupKey]) {
        groupedQuestions[groupKey] = [];
      }
      groupedQuestions[groupKey].push(question);
    });
  }

  // Calculate accuracy percentages for timeline
  const timelineData = sortedQuestions.reduce((acc, question, i, arr) => {
    const date = new Date(question.dateCompleted);
    const dateStr = date.toLocaleDateString();

    if (!acc[dateStr]) {
      acc[dateStr] = {
        date,
        dateStr,
        total: 0,
        correct: 0
      };
    }

    acc[dateStr].total += 1;
    if (question.correct) {
      acc[dateStr].correct += 1;
    }

    return acc;
  }, {} as Record<string, {date: Date;dateStr: string;total: number;correct: number;}>);

  // Convert to array and sort by date
  const timelinePoints = Object.values(timelineData).sort((a, b) => a.date.getTime() - b.date.getTime());

  // Calculate cumulative accuracy for the trend line
  let cumulativeCorrect = 0;
  let cumulativeTotal = 0;
  const timelineTrend = timelinePoints.map((point) => {
    cumulativeCorrect += point.correct;
    cumulativeTotal += point.total;
    return {
      ...point,
      cumulativeAccuracy: cumulativeTotal > 0 ? cumulativeCorrect / cumulativeTotal * 100 : 0
    };
  });

  // Get the highest and lowest values for scaling
  const maxAccuracy = Math.max(...timelineTrend.map((p) => p.cumulativeAccuracy), 100);
  const minAccuracy = Math.min(...timelineTrend.map((p) => p.cumulativeAccuracy), 0);
  const range = maxAccuracy - minAccuracy;

  // Get Y position for the accuracy point
  const getYPosition = (accuracy: number) => {
    return 150 - (accuracy - minAccuracy) / range * 100;
  };

  // Calculate trend line path
  const trendLinePath = timelineTrend.length > 1 ?
  timelineTrend.reduce((path, point, i, arr) => {
    const x = i / (arr.length - 1) * 900;
    const y = getYPosition(point.cumulativeAccuracy);
    return path + (i === 0 ? `M ${x},${y}` : ` L ${x},${y}`);
  }, '') :
  '';

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (timeScale === 'day') {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else if (timeScale === 'week') {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else {// month
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    }
  };

  // Determine color based on difficulty
  const getDifficultyColor = (difficulty: string) => {
    return difficulty === 'Easy' ?
    'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
    difficulty === 'Medium' ?
    'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300' :
    'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
  };

  // Determine color based on correctness
  const getStatusColor = (isCorrect: boolean) => {
    return isCorrect ?
    'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
    'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="olrj.nj">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="cdw6n20">18. Question Timeline View</h3>
      
      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center" data-oid="k-4-1ja">
        {/* Subject filter */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm" data-oid="qn.eu87">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1" data-oid="_f28t1_">Subject</label>
          <select
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)} data-oid="fwe25rg">

            <option value="all" data-oid=":94pm2f">All Subjects</option>
            {subjects.map((subject, i) =>
            <option key={i} value={subject} data-oid="82e2717">{subject}</option>
            )}
          </select>
        </div>
        
        {/* Time scale */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm" data-oid="iajex66">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1" data-oid="p3eeduc">Time Scale</label>
          <select
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={timeScale}
            onChange={(e) => setTimeScale(e.target.value as 'day' | 'week' | 'month')} data-oid="fkcbh:v">

            <option value="day" data-oid="xffbw9w">Day</option>
            <option value="week" data-oid="vdux1yv">Week</option>
            <option value="month" data-oid="8y.ocd7">Month</option>
          </select>
        </div>
        
        {/* Group by */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm" data-oid="ik:.wa:">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1" data-oid="m6sxzhs">Group By</label>
          <select
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as 'date' | 'topic' | 'difficulty')} data-oid="s9-ac-8">

            <option value="date" data-oid="4p45:xx">Date Period</option>
            <option value="topic" data-oid="2-dpj9b">Topic</option>
            <option value="difficulty" data-oid="ty0jwbp">Difficulty</option>
          </select>
        </div>
        
        {/* Correctness filter */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm" data-oid="1l-mb7s">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1" data-oid="f3q.aqr">Show</label>
          <select
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={showCorrectOnly}
            onChange={(e) => setShowCorrectOnly(e.target.value as 'all' | 'correct' | 'incorrect')} data-oid="3g.njdk">

            <option value="all" data-oid="83-n_tg">All Questions</option>
            <option value="correct" data-oid="wcei7sh">Correct Only</option>
            <option value="incorrect" data-oid="9zszylo">Incorrect Only</option>
          </select>
        </div>
      </div>
      
      {/* Timeline visualization */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 shadow-sm mb-6" data-oid="ol-ixp4">
        <h4 className="font-medium mb-2 text-slate-700 dark:text-slate-300" data-oid="3y-a0gf">Overall Performance Trend</h4>
        
        <div className="w-full h-[200px] relative" data-oid="616u2ym">
          {/* Y-axis labels */}
          <div className="absolute -left-7 top-0 h-full flex flex-col justify-between text-xs text-slate-500 dark:text-slate-400" data-oid="_:8hhws">
            <div data-oid="ooellzi">100%</div>
            <div data-oid="hojuwqn">75%</div>
            <div data-oid="kf.sx43">50%</div>
            <div data-oid="qp0-v1a">25%</div>
            <div data-oid="uwkax5a">0%</div>
          </div>
          
          {/* Horizontal grid lines */}
          <svg className="absolute inset-0 w-full h-full" stroke="currentColor" strokeWidth="1" data-oid="m:ez0l5">
            <line x1="0" y1="0" x2="100%" y2="0" className="text-slate-200 dark:text-slate-700" data-oid="344w75g" />
            <line x1="0" y1="50" x2="100%" y2="50" className="text-slate-200 dark:text-slate-700" strokeDasharray="4" data-oid="0_w0l8-" />
            <line x1="0" y1="100" x2="100%" y2="100" className="text-slate-200 dark:text-slate-700" strokeDasharray="4" data-oid="nsm0egq" />
            <line x1="0" y1="150" x2="100%" y2="150" className="text-slate-200 dark:text-slate-700" data-oid="uxdvu1i" />
          </svg>
          
          {/* Trend line */}
          {timelineTrend.length > 1 &&
          <svg className="absolute inset-0 w-full h-full" stroke="currentColor" fill="none" strokeWidth="2" data-oid="nn3.-g5">
              <path
              d={trendLinePath}
              className="text-indigo-500 dark:text-indigo-400" data-oid="sw:w8_f" />

              
              {/* Data points */}
              {timelineTrend.map((point, i, arr) => {
              const x = i / (arr.length - 1) * 900;
              const y = getYPosition(point.cumulativeAccuracy);
              return (
                <g key={i} data-oid="l48xeoy">
                    <circle
                    cx={x}
                    cy={y}
                    r="4"
                    className="fill-indigo-500 dark:fill-indigo-400 stroke-white dark:stroke-slate-800"
                    strokeWidth="1" data-oid="rbgfxar" />

                    
                    {/* Date label for selected points */}
                    {i % Math.ceil(arr.length / 5) === 0 &&
                  <text
                    x={x}
                    y="180"
                    textAnchor="middle"
                    className="fill-slate-500 dark:fill-slate-400 text-xs" data-oid="vd11iqp">

                        {formatDate(point.dateStr)}
                      </text>
                  }
                    
                    {/* Accuracy tooltip on hover */}
                    <circle
                    cx={x}
                    cy={y}
                    r="12"
                    className="fill-transparent stroke-none cursor-pointer"
                    onMouseOver={(e) => {
                      const tooltip = document.getElementById('tooltip');
                      if (tooltip) {
                        tooltip.style.display = 'block';
                        tooltip.style.left = `${x + 20}px`;
                        tooltip.style.top = `${y - 30}px`;
                        tooltip.textContent = `${point.cumulativeAccuracy.toFixed(1)}% (${point.correct}/${point.total})`;
                      }
                    }}
                    onMouseOut={() => {
                      const tooltip = document.getElementById('tooltip');
                      if (tooltip) {
                        tooltip.style.display = 'none';
                      }
                    }} data-oid="d7ec48c" />

                  </g>);

            })}
            </svg>
          }
          
          {/* Tooltip */}
          <div
            id="tooltip"
            className="absolute hidden bg-slate-800 text-white px-2 py-1 rounded text-xs pointer-events-none z-10" data-oid="gmj9299">
          </div>
          
          {/* Empty state */}
          {timelineTrend.length === 0 &&
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500" data-oid="8clazzi">
              No data available for the selected filters
            </div>
          }
        </div>
      </div>
      
      {/* Timeline entries */}
      <div className="relative overflow-hidden" data-oid="s4qy4n4">
        {/* Timeline line (vertical) */}
        <div className="absolute left-[9px] top-[15px] bottom-[15px] w-[2px] bg-slate-200 dark:bg-slate-700 z-0" data-oid="-1t.3uh"></div>
        
        {/* Group headers and questions */}
        <div className="space-y-6 relative z-10" data-oid="-af8blo">
          {Object.entries(groupedQuestions).map(([groupName, questions], groupIndex) =>
          <div key={groupIndex} className="mb-8" data-oid="xr_39d3">
              {/* Group header */}
              <h4 className="text-sm font-bold mb-2 flex items-center text-slate-700 dark:text-slate-300" data-oid=":ua67cu">
                <span className="w-5 h-5 rounded-full bg-indigo-500 dark:bg-indigo-400 mr-3 flex-shrink-0" data-oid="deo4rtk"></span>
                {groupName}
                <span className="ml-2 text-xs font-normal text-slate-500 dark:text-slate-400" data-oid="48up134">
                  ({questions.length} question{questions.length !== 1 ? 's' : ''})
                </span>
              </h4>
              
              {/* Questions in this group */}
              <div className="pl-8 space-y-4" data-oid="dv.f03a">
                {questions.map((question, qIndex) => {
                const parentSet = practiceSets.find((set) => set.id === question.setId)!;
                return (
                  <div
                    key={qIndex}
                    className={`relative p-3 rounded-lg border ${
                    selectedSetId === question.setId ?
                    'border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20' :
                    'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'} cursor-pointer hover:shadow-sm transition-all`
                    }
                    onClick={() => onSelectSet && onSelectSet(question.setId)} data-oid="nx5.175">

                      {/* Timeline dot */}
                      <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 bg-slate-300 dark:bg-slate-600" data-oid="v5i2lud"></div>
                      
                      {/* Question content */}
                      <div className="flex justify-between items-start" data-oid="1gazg01">
                        <div className="flex-1" data-oid="bhit.w7">
                          {/* Question topic and subtopic */}
                          <div className="text-sm font-medium mb-1 flex items-start" data-oid="w3ptkzg">
                            <div className={`w-4 h-4 rounded-full mr-2 mt-0.5 flex-shrink-0 ${
                          question.correct ?
                          'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                          'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'} flex items-center justify-center text-[10px]`
                          } data-oid="wqjwxar">
                              {question.correct ? '✓' : '✗'}
                            </div>
                            <span className="flex-1" data-oid="s00nv08">{question.topic} - {question.subtopic}</span>
                          </div>
                          
                          {/* Metadata */}
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400" data-oid="88ss:x0">
                            <span data-oid="5c3tk9y">{parentSet.subject}</span>
                            <span className={`px-1.5 py-0.5 rounded ${getDifficultyColor(question.difficulty)}`} data-oid="ltnxpru">
                              {question.difficulty}
                            </span>
                            <span data-oid="vs3935k">{question.timeSpent}s</span>
                            <span data-oid="k93.sjm">•</span>
                            <span className={`px-1.5 py-0.5 rounded ${getStatusColor(question.correct)}`} data-oid="e90.:gy">
                              {question.correct ? 'Correct' : 'Incorrect'}
                            </span>
                          </div>
                        </div>
                        
                        {/* Date */}
                        <div className="text-xs text-right text-slate-500 dark:text-slate-400 min-w-[80px]" data-oid="zk7wnx3">
                          {new Date(question.dateCompleted).toLocaleDateString()}
                        </div>
                      </div>
                    </div>);

              })}
              </div>
              
              {/* Group statistics */}
              <div className="ml-8 mt-2 p-2 rounded bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 dark:text-slate-400" data-oid="kdg4dku">
                <div className="flex justify-between" data-oid="ys-pvfg">
                  <span data-oid="89srf4v">Accuracy: 
                    <span className={`ml-1 ${
                  questions.filter((q) => q.correct).length / questions.length > 0.7 ?
                  'text-green-500 dark:text-green-400' :
                  questions.filter((q) => q.correct).length / questions.length > 0.4 ?
                  'text-amber-500 dark:text-amber-400' :
                  'text-red-500 dark:text-red-400'}`
                  } data-oid="v9q_ioi">
                      {(questions.filter((q) => q.correct).length / questions.length * 100).toFixed(0)}%
                    </span>
                  </span>
                  <span data-oid="p:3yk4f">
                    Avg. time: {(questions.reduce((sum, q) => sum + q.timeSpent, 0) / questions.length).toFixed(1)}s
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Empty state */}
        {Object.keys(groupedQuestions).length === 0 &&
        <div className="py-12 text-center text-slate-400 dark:text-slate-500" data-oid="rurthg3">
            No questions found with the selected filters
          </div>
        }
      </div>
      
      {/* Overall statistics */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4" data-oid="5tzu8mr">
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg text-center border border-slate-200 dark:border-slate-700" data-oid="cmr_doi">
          <div className="text-xl font-bold text-indigo-500 dark:text-indigo-400" data-oid="thf.ut_">
            {filteredQuestions.length}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1" data-oid="d2slkcv">
            Total Questions
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg text-center border border-slate-200 dark:border-slate-700" data-oid="1hdwn0m">
          <div className="text-xl font-bold text-green-500 dark:text-green-400" data-oid="30ao_ua">
            {Object.keys(timelineData).length}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1" data-oid="jn_3vhs">
            Distinct Dates
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg text-center border border-slate-200 dark:border-slate-700" data-oid="-ry0x7a">
          <div className="text-xl font-bold text-amber-500 dark:text-amber-400" data-oid="e0fzqpt">
            {(filteredQuestions.filter((q) => q.correct).length / filteredQuestions.length * 100 || 0).toFixed(1)}%
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1" data-oid="yqk:x_z">
            Overall Accuracy
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg text-center border border-slate-200 dark:border-slate-700" data-oid="5aklexv">
          <div className="text-xl font-bold text-sky-500 dark:text-sky-400" data-oid="t7-dlv:">
            {(filteredQuestions.reduce((sum, q) => sum + q.timeSpent, 0) / filteredQuestions.length || 0).toFixed(1)}s
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1" data-oid="ckb.x7n">
            Avg. Time Per Question
          </div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 text-center" data-oid="wwbloe-">
        <p data-oid="e4:bm.w">View your question history arranged chronologically with performance tracking.</p>
      </div>
    </div>);

}