'use client';

import { useState } from 'react';
import { QuestionViewProps } from './types';
import { PracticeSet, Question } from '@/lib/mockData';

/**
 * QuestionJourneyView - Track progress through questions over time
 * Visualizes a user's journey through questions, showing their performance history and trends
 */
export function QuestionJourneyView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  const [timeRange, setTimeRange] = useState<'all' | '3months' | '1month' | '1week'>('3months');
  const [category, setCategory] = useState<'all' | 'subject' | 'difficulty'>('all');
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);

  // Sort practice sets by date
  const sortedSets = [...practiceSets].sort(
    (a, b) => new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
  );

  // Filter sets based on selected time range
  const getFilteredSets = () => {
    const now = new Date();
    const filterDate = new Date();

    if (timeRange === '3months') {
      filterDate.setMonth(now.getMonth() - 3);
    } else if (timeRange === '1month') {
      filterDate.setMonth(now.getMonth() - 1);
    } else if (timeRange === '1week') {
      filterDate.setDate(now.getDate() - 7);
    } else {
      // For 'all', use the earliest date possible
      filterDate.setFullYear(1970);
    }

    return sortedSets.filter((set) => new Date(set.dateCompleted) >= filterDate);
  };

  const filteredSets = getFilteredSets();

  // Group sets by category if needed
  const groupedSets = category === 'all' ?
  { 'All': filteredSets } :
  filteredSets.reduce<Record<string, PracticeSet[]>>((acc, set) => {
    const key = category === 'subject' ? set.subject : set.difficulty;
    if (!acc[key]) acc[key] = [];
    acc[key].push(set);
    return acc;
  }, {});

  // Calculate cumulative metrics for journey visualization
  const calculateCumulativeMetrics = (sets: PracticeSet[]) => {
    let cumulativeQuestions = 0;
    let cumulativeCorrect = 0;

    return sets.map((set, index) => {
      // Count questions and correct answers in this set
      const questionsInSet = set.questions.length;
      const correctInSet = set.questions.filter((q) => q.correct).length;

      // Add to cumulative counts
      cumulativeQuestions += questionsInSet;
      cumulativeCorrect += correctInSet;

      // Calculate metrics
      const cumulativeAccuracy = cumulativeQuestions > 0 ?
      cumulativeCorrect / cumulativeQuestions * 100 :
      0;

      // Calculate previous metrics if not the first
      const prevCumulativeAccuracy = index > 0 ?
      (cumulativeCorrect - correctInSet) / (cumulativeQuestions - questionsInSet) * 100 :
      cumulativeAccuracy;

      // Calculate change in accuracy
      const accuracyChange = cumulativeAccuracy - prevCumulativeAccuracy;

      // Create a "milestone" if this set represents a significant change
      const isMilestone =
      index === 0 || // First set
      index === sets.length - 1 || // Last set
      Math.abs(accuracyChange) >= 5 || // Significant accuracy change
      index % Math.max(1, Math.floor(sets.length / 5)) === 0; // Every ~20% of the journey

      return {
        set,
        date: new Date(set.dateCompleted),
        questionsInSet,
        correctInSet,
        cumulativeQuestions,
        cumulativeCorrect,
        cumulativeAccuracy,
        accuracyChange,
        isMilestone,
        milestoneId: `milestone-${index}`
      };
    });
  };

  // Calculate journey for each group
  const journeys = Object.entries(groupedSets).map(([group, sets]) => ({
    group,
    metrics: calculateCumulativeMetrics(sets)
  }));

  // Chart configuration
  const chartWidth = 100;
  const chartHeight = 70;
  const padding = { top: 10, right: 10, bottom: 20, left: 10 };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;

  // Color mapping for groups
  const getGroupColor = (group: string) => {
    if (group === 'All') return '#6366f1'; // indigo

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

  // Handle milestone click
  const handleMilestoneClick = (milestoneId: string, setId: string) => {
    setSelectedMilestone(selectedMilestone === milestoneId ? null : milestoneId);
    onSelectSet(setId);
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="eu96roe">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="bf78b41">11. Question Journey View</h3>
      
      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center" data-oid="den9zmc">
        <div className="inline-flex p-1 space-x-1 bg-slate-100 dark:bg-slate-800 rounded-lg" data-oid="u803i.9">
          {([
          { id: 'all', label: 'All Time' },
          { id: '3months', label: '3 Months' },
          { id: '1month', label: '1 Month' },
          { id: '1week', label: '1 Week' }] as
          const).map((option) =>
          <button
            key={option.id}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            timeRange === option.id ?
            'bg-white dark:bg-slate-700 shadow-sm' :
            'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            }
            onClick={() => setTimeRange(option.id)} data-oid="jsb3q0k">

              {option.label}
            </button>
          )}
        </div>
        
        <div className="inline-flex p-1 space-x-1 bg-slate-100 dark:bg-slate-800 rounded-lg" data-oid="0iwj9l8">
          {([
          { id: 'all', label: 'Overall' },
          { id: 'subject', label: 'By Subject' },
          { id: 'difficulty', label: 'By Difficulty' }] as
          const).map((option) =>
          <button
            key={option.id}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            category === option.id ?
            'bg-white dark:bg-slate-700 shadow-sm' :
            'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            }
            onClick={() => setCategory(option.id)} data-oid="-6tohym">

              {option.label}
            </button>
          )}
        </div>
      </div>
      
      {/* Description */}
      <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg mb-6 text-sm text-slate-600 dark:text-slate-300" data-oid="c5u98bx">
        <p data-oid="-k_-450">This chart shows your journey through practice sets over time. The line represents your cumulative accuracy, and milestones highlight important points in your progress.</p>
      </div>
      
      {/* Journey Chart */}
      <div className="aspect-video bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm mb-6" data-oid="3kw5xny">
        <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="font-sans" data-oid="pc8qq23">
          {/* Bottom time axis */}
          <line
            x1={padding.left}
            y1={chartHeight - padding.bottom}
            x2={chartWidth - padding.right}
            y2={chartHeight - padding.bottom}
            stroke="#94a3b8"
            strokeWidth="0.5" data-oid=".7edhiq" />

          
          {/* Render journey lines and points for each group */}
          {journeys.map((journey, journeyIndex) => {
            const { group, metrics } = journey;

            if (metrics.length === 0) return null;

            // Calculate x-coordinates based on time distribution
            const timeStart = metrics[0].date.getTime();
            const timeEnd = metrics[metrics.length - 1].date.getTime();
            const timeRange = Math.max(1, timeEnd - timeStart);

            const getX = (date: Date) => {
              const relativeTime = (date.getTime() - timeStart) / timeRange;
              return padding.left + relativeTime * plotWidth;
            };

            // Journey path (accuracy line)
            const pathPoints = metrics.map((point, i) => {
              const x = getX(point.date);
              const y = padding.top + plotHeight - point.cumulativeAccuracy / 100 * plotHeight;
              return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
            }).join(' ');

            // Group color
            const color = getGroupColor(group);

            return (
              <g key={journeyIndex} data-oid="8szt107">
                {/* Group label on the right */}
                {metrics.length > 0 &&
                <text
                  x={getX(metrics[metrics.length - 1].date) + 2}
                  y={padding.top + plotHeight - metrics[metrics.length - 1].cumulativeAccuracy / 100 * plotHeight}
                  fontSize="3"
                  fill={color}
                  dominantBaseline="middle" data-oid="8r5f1q7">

                    {group}
                  </text>
                }
                
                {/* Journey line */}
                <path
                  d={pathPoints}
                  fill="none"
                  stroke={color}
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round" data-oid="l-p9h:w" />

                
                {/* Milestone points */}
                {metrics.
                filter((point) => point.isMilestone).
                map((milestone, i) => {
                  const x = getX(milestone.date);
                  const y = padding.top + plotHeight - milestone.cumulativeAccuracy / 100 * plotHeight;

                  const isSelected = selectedMilestone === milestone.milestoneId;

                  return (
                    <g
                      key={`milestone-${group}-${i}`}
                      onClick={() => handleMilestoneClick(milestone.milestoneId, milestone.set.id)}
                      className="cursor-pointer" data-oid="snqucmn">

                        {/* Milestone point */}
                        <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? 2 : 1.5}
                        fill={isSelected ? 'white' : color}
                        stroke={color}
                        strokeWidth={isSelected ? 1 : 0.5} data-oid="34rxfkd" />

                        
                        {/* Date marker and accuracy */}
                        {isSelected &&
                      <>
                            {/* Vertical date line */}
                            <line
                          x1={x}
                          y1={y + 2}
                          x2={x}
                          y2={chartHeight - padding.bottom}
                          stroke={color}
                          strokeWidth="0.5"
                          strokeDasharray="1,1" data-oid="zxtdg:0" />

                            
                            {/* Date label */}
                            <text
                          x={x}
                          y={chartHeight - padding.bottom + 5}
                          fontSize="2.5"
                          textAnchor="middle"
                          fill="#64748b" data-oid="pz70h4q">

                              {milestone.date.toLocaleDateString()}
                            </text>
                            
                            {/* Accuracy label */}
                            <text
                          x={x}
                          y={y - 3}
                          fontSize="3"
                          textAnchor="middle"
                          fill={color}
                          fontWeight="bold" data-oid="4zwh70y">

                              {milestone.cumulativeAccuracy.toFixed(1)}%
                            </text>
                            
                            {/* Accuracy change */}
                            {milestone.accuracyChange !== 0 &&
                        <text
                          x={x}
                          y={y - 6.5}
                          fontSize="2.5"
                          textAnchor="middle"
                          fill={milestone.accuracyChange > 0 ? '#10b981' : '#ef4444'} data-oid="2g4o79n">

                                {milestone.accuracyChange > 0 ? '↑' : '↓'} {Math.abs(milestone.accuracyChange).toFixed(1)}%
                              </text>
                        }
                          </>
                      }
                        
                        {/* Tooltip with details */}
                        <title data-oid="z1cwpkq">
                          {milestone.date.toLocaleDateString()}: {milestone.cumulativeAccuracy.toFixed(1)}% cumulative accuracy
                          {milestone.accuracyChange !== 0 ? ` (${milestone.accuracyChange > 0 ? '+' : ''}${milestone.accuracyChange.toFixed(1)}%)` : ''}
                          {`\n${milestone.questionsInSet} questions, ${milestone.correctInSet} correct (${(milestone.correctInSet / milestone.questionsInSet * 100).toFixed(0)}%)`}
                        </title>
                      </g>);

                })}
              </g>);

          })}
          
          {/* Y-axis labels (accuracy) */}
          {[0, 25, 50, 75, 100].map((tick) =>
          <g key={`y-tick-${tick}`} data-oid="5qto8vg">
              {/* Grid line */}
              <line
              x1={padding.left}
              y1={padding.top + plotHeight - tick / 100 * plotHeight}
              x2={chartWidth - padding.right}
              y2={padding.top + plotHeight - tick / 100 * plotHeight}
              stroke="#94a3b8"
              strokeWidth="0.2"
              strokeDasharray="1,1" data-oid="3dzv-9n" />

              
              {/* Label */}
              <text
              x={padding.left - 2}
              y={padding.top + plotHeight - tick / 100 * plotHeight}
              fontSize="2.5"
              textAnchor="end"
              dominantBaseline="middle"
              fill="#94a3b8" data-oid="tgsdshj">

                {tick}%
              </text>
            </g>
          )}
          
          {/* Time range description at the bottom */}
          <text
            x={chartWidth / 2}
            y={chartHeight - 2}
            fontSize="3"
            textAnchor="middle"
            fill="#64748b" data-oid="f9.vrfa">

            Your Question Journey Over {
            timeRange === 'all' ? 'All Time' :
            timeRange === '3months' ? 'Last 3 Months' :
            timeRange === '1month' ? 'Last Month' :
            'Last Week'
            }
          </text>
        </svg>
      </div>
      
      {/* Summary section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-oid="-eq0z5g">
        {journeys.map((journey, i) => {
          const { group, metrics } = journey;
          if (metrics.length === 0) return null;

          // Get first and last metrics for comparison
          const firstMetric = metrics[0];
          const lastMetric = metrics[metrics.length - 1];

          // Calculate total improvement
          const accuracyImprovement = lastMetric.cumulativeAccuracy - firstMetric.cumulativeAccuracy;

          // Find best milestone (highest accuracy)
          const bestMilestone = [...metrics].sort((a, b) => b.cumulativeAccuracy - a.cumulativeAccuracy)[0];

          return (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm" data-oid="l0omfnl">
              <h4 className="font-semibold mb-3 flex items-center" data-oid="d-:hjfj">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: getGroupColor(group) }} data-oid="8_dwvuc">
                </div>
                {group} Summary
              </h4>
              
              <div className="space-y-2 text-sm" data-oid="or5m_1z">
                <div className="flex justify-between" data-oid="49a9.5f">
                  <span className="text-slate-500 dark:text-slate-400" data-oid="jb.7m-w">Total Questions:</span>
                  <span className="font-medium" data-oid="d916f:n">{lastMetric.cumulativeQuestions}</span>
                </div>
                
                <div className="flex justify-between" data-oid="5qltq4y">
                  <span className="text-slate-500 dark:text-slate-400" data-oid="h6:tjb2">Current Accuracy:</span>
                  <span className="font-medium" data-oid="aq3cgq8">{lastMetric.cumulativeAccuracy.toFixed(1)}%</span>
                </div>
                
                <div className="flex justify-between" data-oid="vhr6r90">
                  <span className="text-slate-500 dark:text-slate-400" data-oid="0xiqk2g">Starting Accuracy:</span>
                  <span className="font-medium" data-oid="5e2f0iq">{firstMetric.cumulativeAccuracy.toFixed(1)}%</span>
                </div>
                
                <div className="flex justify-between" data-oid="6hnjmaa">
                  <span className="text-slate-500 dark:text-slate-400" data-oid="nj-e-m5">Improvement:</span>
                  <span className={`font-medium ${
                  accuracyImprovement > 0 ? 'text-emerald-500' :
                  accuracyImprovement < 0 ? 'text-red-500' : ''}`
                  } data-oid="4zvvuku">
                    {accuracyImprovement > 0 ? '+' : ''}
                    {accuracyImprovement.toFixed(1)}%
                  </span>
                </div>
                
                <div className="flex justify-between" data-oid="_xk735i">
                  <span className="text-slate-500 dark:text-slate-400" data-oid="v.i4_wf">Best Performance:</span>
                  <span className="font-medium" data-oid="9l_hqm7">
                    {bestMilestone.cumulativeAccuracy.toFixed(1)}% on {bestMilestone.date.toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex justify-between" data-oid="a3vk:ui">
                  <span className="text-slate-500 dark:text-slate-400" data-oid="e9a-hu-">Practice Sets:</span>
                  <span className="font-medium" data-oid="wy:8cpr">{metrics.length}</span>
                </div>
              </div>
            </div>);

        })}
      </div>
      
      {/* Instructions */}
      <div className="mt-6 text-sm text-slate-500 dark:text-slate-400 text-center" data-oid="l92p009">
        <p data-oid="p0b5pzs">Click on milestone points to see details about your performance at that point in your journey.</p>
      </div>
    </div>);

}