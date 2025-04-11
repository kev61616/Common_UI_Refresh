'use client';

import { useState } from 'react';
import { QuestionViewProps } from './types';
import { PracticeSet, Question } from '@/lib/mockData';

/**
 * ScatterPlotView - Plot questions by difficulty and performance
 * Creates a visual representation of questions plotted on a 2D coordinate system
 */
export function ScatterPlotView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // View states for configuration
  const [xAxis, setXAxis] = useState<'difficulty' | 'timeSpent' | 'topic'>('difficulty');
  const [yAxis, setYAxis] = useState<'accuracy' | 'count'>('accuracy');
  const [groupBy, setGroupBy] = useState<'subject' | 'difficulty'>('subject');

  // Extract all questions from all practice sets
  const allQuestions: (Question & {setId: string;subject: string;})[] = practiceSets.flatMap((set) =>
  set.questions.map((q) => ({
    ...q,
    setId: set.id,
    subject: set.subject // Add subject to each question for easier access
  }))
  );

  // Group questions by the selected grouping
  const groupedQuestions = allQuestions.reduce<Record<string, typeof allQuestions>>((acc, q) => {
    const key = groupBy === 'subject' ? q.subject : q.difficulty;
    if (!acc[key]) acc[key] = [];
    acc[key].push(q);
    return acc;
  }, {});

  // Process data for the scatter plot
  const generatePlotData = () => {
    // For each group, calculate metrics for plotting
    return Object.entries(groupedQuestions).map(([group, questions]) => {
      // Group questions by x-axis value
      const byXAxis = questions.reduce<Record<string, typeof allQuestions>>((acc, q) => {
        let key = '';

        // Get the appropriate x-axis value
        if (xAxis === 'difficulty') {
          key = q.difficulty;
        } else if (xAxis === 'timeSpent') {
          // Create time spent ranges (0-30s, 30-60s, etc.)
          const timeRange = Math.floor(q.timeSpent / 30) * 30;
          key = `${timeRange}-${timeRange + 30}s`;
        } else if (xAxis === 'topic') {
          key = q.topic;
        }

        if (!acc[key]) acc[key] = [];
        acc[key].push(q);
        return acc;
      }, {});

      // For each x-axis value, calculate the y-axis metric
      return {
        group,
        points: Object.entries(byXAxis).map(([xValue, xQuestions]) => {
          // Calculate y-value based on selected y-axis
          let yValue = 0;
          if (yAxis === 'accuracy') {
            const correctCount = xQuestions.filter((q) => q.correct).length;
            yValue = correctCount / xQuestions.length * 100;
          } else if (yAxis === 'count') {
            yValue = xQuestions.length;
          }

          return {
            xValue,
            yValue,
            questions: xQuestions,
            count: xQuestions.length
          };
        })
      };
    });
  };

  // Add color coding based on group
  const getGroupColor = (group: string) => {
    // Colors for different subjects
    if (group === 'Reading') return '#3b82f6'; // blue
    if (group === 'Writing') return '#10b981'; // green
    if (group === 'Math') return '#f97316'; // orange

    // Colors for difficulty levels
    if (group === 'Easy') return '#10b981'; // green
    if (group === 'Medium') return '#f59e0b'; // amber
    if (group === 'Hard') return '#ef4444'; // red

    // Default color for other groups
    return '#94a3b8'; // slate
  };

  // Chart setup
  const chartWidth = 100;
  const chartHeight = 80;
  const padding = 10;
  const plotWidth = chartWidth - padding * 2;
  const plotHeight = chartHeight - padding * 2;

  // Generate plot data
  const plotData = generatePlotData();

  // Determine x-axis labels and positions
  const getXAxisLabels = () => {
    // Get all unique x-values across all groups
    const allXValues = plotData.flatMap((group) =>
    group.points.map((point) => point.xValue)
    );
    const uniqueXValues = [...new Set(allXValues)].sort();

    // For difficulties, ensure they're in the right order
    if (xAxis === 'difficulty') {
      return ['Easy', 'Medium', 'Hard'].filter((d) => uniqueXValues.includes(d));
    }

    // For time spent, we want to sort numerically
    if (xAxis === 'timeSpent') {
      return uniqueXValues.sort((a, b) => {
        const aStart = parseInt(a.split('-')[0]);
        const bStart = parseInt(b.split('-')[0]);
        return aStart - bStart;
      });
    }

    return uniqueXValues;
  };

  const xLabels = getXAxisLabels();

  // Get max y-value for scaling
  const maxYValue = Math.max(
    ...plotData.flatMap((group) => group.points.map((point) => point.yValue)),
    yAxis === 'accuracy' ? 100 : 0 // Ensure max is at least 100 for accuracy
  );

  // Calculate y-axis ticks
  const yTicks = yAxis === 'accuracy' ?
  [0, 25, 50, 75, 100] :
  Array.from({ length: 5 }, (_, i) => Math.round(maxYValue * i / 4));

  // Calculate position for a point
  const getPointPosition = (xValue: string, yValue: number) => {
    const xIndex = xLabels.indexOf(xValue);
    const xPosition = padding + xIndex / Math.max(1, xLabels.length - 1) * plotWidth;
    const yPosition = padding + plotHeight - yValue / Math.max(1, maxYValue) * plotHeight;

    return { x: xPosition, y: yPosition };
  };

  // Handle point click
  const handlePointClick = (questions: typeof allQuestions) => {
    if (questions.length > 0) {
      onSelectSet(questions[0].setId);
    }
  };

  // Render the scatter plot component
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="d5rky7a">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="5:f_vo5">10. Scatter Plot View</h3>
      
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6" data-oid="001xpcg">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm" data-oid="q3wnlyr">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1" data-oid="-lssw_f">X Axis</label>
          <select
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value as 'difficulty' | 'timeSpent' | 'topic')} data-oid="pka8t5n">

            <option value="difficulty" data-oid="hmu7u_h">Difficulty</option>
            <option value="timeSpent" data-oid="isax4jg">Time Spent</option>
            <option value="topic" data-oid="pen504i">Topic</option>
          </select>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm" data-oid=":_qxlp7">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1" data-oid="hygut-4">Y Axis</label>
          <select
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={yAxis}
            onChange={(e) => setYAxis(e.target.value as 'accuracy' | 'count')} data-oid="x65izq3">

            <option value="accuracy" data-oid="jdu5fne">Accuracy (%)</option>
            <option value="count" data-oid="zp:1avc">Question Count</option>
          </select>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm" data-oid="l_e45-g">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1" data-oid="x2m2ix_">Group By</label>
          <select
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as 'subject' | 'difficulty')} data-oid="r_ch8me">

            <option value="subject" data-oid="htw_781">Subject</option>
            <option value="difficulty" data-oid="ncbw8yb">Difficulty</option>
          </select>
        </div>
      </div>
      
      {/* Scatter Plot */}
      <div className="aspect-video bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm mb-6" data-oid="-y6pi4o">
        <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="font-sans" data-oid="p4n0_j1">
          {/* Y-axis line */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={padding + plotHeight}
            stroke="#94a3b8"
            strokeWidth="0.5" data-oid="ep_xnj:" />

          
          {/* X-axis line */}
          <line
            x1={padding}
            y1={padding + plotHeight}
            x2={padding + plotWidth}
            y2={padding + plotHeight}
            stroke="#94a3b8"
            strokeWidth="0.5" data-oid="j_avhum" />

          
          {/* Y-axis ticks and labels */}
          {yTicks.map((tick, i) =>
          <g key={`y-tick-${i}`} data-oid="_-k66g9">
              <line
              x1={padding}
              y1={padding + plotHeight - tick / Math.max(1, maxYValue) * plotHeight}
              x2={padding - 1}
              y2={padding + plotHeight - tick / Math.max(1, maxYValue) * plotHeight}
              stroke="#94a3b8"
              strokeWidth="0.5" data-oid="yxwd9-k" />

              <text
              x={padding - 2}
              y={padding + plotHeight - tick / Math.max(1, maxYValue) * plotHeight}
              fontSize="3"
              textAnchor="end"
              dominantBaseline="middle"
              fill="#94a3b8" data-oid="1l4.t4u">

                {tick}{yAxis === 'accuracy' ? '%' : ''}
              </text>
            </g>
          )}
          
          {/* X-axis ticks and labels */}
          {xLabels.map((label, i) => {
            const xPos = padding + i / Math.max(1, xLabels.length - 1) * plotWidth;
            return (
              <g key={`x-tick-${i}`} data-oid="0ofnikg">
                <line
                  x1={xPos}
                  y1={padding + plotHeight}
                  x2={xPos}
                  y2={padding + plotHeight + 1}
                  stroke="#94a3b8"
                  strokeWidth="0.5" data-oid="btuksmi" />

                <text
                  x={xPos}
                  y={padding + plotHeight + 5}
                  fontSize="3"
                  textAnchor="middle"
                  fill="#94a3b8" data-oid="io8c1fa">

                  {label.length > 10 ? `${label.substring(0, 10)}...` : label}
                </text>
              </g>);

          })}
          
          {/* Grid lines */}
          {yTicks.map((tick, i) =>
          <line
            key={`y-grid-${i}`}
            x1={padding}
            y1={padding + plotHeight - tick / Math.max(1, maxYValue) * plotHeight}
            x2={padding + plotWidth}
            y2={padding + plotHeight - tick / Math.max(1, maxYValue) * plotHeight}
            stroke="#94a3b8"
            strokeWidth="0.2"
            strokeDasharray="1,1" data-oid="m94p___" />

          )}
          
          {xLabels.map((_, i) => {
            const xPos = padding + i / Math.max(1, xLabels.length - 1) * plotWidth;
            return (
              <line
                key={`x-grid-${i}`}
                x1={xPos}
                y1={padding}
                x2={xPos}
                y2={padding + plotHeight}
                stroke="#94a3b8"
                strokeWidth="0.2"
                strokeDasharray="1,1" data-oid="4rox:in" />);


          })}
          
          {/* Axis titles */}
          <text
            x={chartWidth / 2}
            y={chartHeight - 2}
            fontSize="4"
            textAnchor="middle"
            fill="#64748b" data-oid="yfeo2om">

            {xAxis === 'difficulty' ? 'Difficulty Level' :
            xAxis === 'timeSpent' ? 'Time Spent Per Question' : 'Topic'}
          </text>
          
          <text
            x={2}
            y={chartHeight / 2}
            fontSize="4"
            textAnchor="middle"
            fill="#64748b"
            transform={`rotate(-90, 2, ${chartHeight / 2})`} data-oid="ss_d2bf">

            {yAxis === 'accuracy' ? 'Accuracy (%)' : 'Question Count'}
          </text>
          
          {/* Plot points */}
          {plotData.map((groupData, groupIndex) =>
          <g key={`group-${groupIndex}`} data-oid="aofvo4f">
              {groupData.points.map((point, pointIndex) => {
              const { x, y } = getPointPosition(point.xValue, point.yValue);
              // Adjust size based on count
              const size = Math.max(1, Math.min(4, 1 + point.count / 10));

              return (
                <g
                  key={`point-${pointIndex}`}
                  onClick={() => handlePointClick(point.questions)}
                  className="cursor-pointer" data-oid="29m5d62">

                    <circle
                    cx={x}
                    cy={y}
                    r={size}
                    fill={getGroupColor(groupData.group)}
                    fillOpacity="0.7"
                    stroke={getGroupColor(groupData.group)}
                    strokeWidth="0.5"
                    className="hover:fill-opacity-100 transition-opacity" data-oid="37bjkrw" />

                    {/* Label for data point on hover */}
                    <title data-oid="8wmb55n">
                      {groupData.group} {point.xValue}: {point.yValue.toFixed(1)}{yAxis === 'accuracy' ? '%' : ''} ({point.count} questions)
                    </title>
                  </g>);

            })}
            </g>
          )}
        </svg>
      </div>
      
      {/* Legend */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm" data-oid="7cj-ypo">
        <h4 className="text-sm font-semibold mb-2" data-oid="wmsybnm">Legend:</h4>
        <div className="flex flex-wrap gap-4" data-oid="ef.1s_t">
          {plotData.map((groupData, i) =>
          <div key={i} className="flex items-center" data-oid="33uqzj4">
              <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: getGroupColor(groupData.group) }} data-oid="56mfja7">
            </div>
              <span className="text-sm" data-oid="kayu:8l">{groupData.group}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-sm text-slate-500 dark:text-slate-400" data-oid="1da8l__">
        <p data-oid=":h27hhg">Click on any data point to see details about the questions it represents.</p>
      </div>
    </div>);

}