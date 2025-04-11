'use client';

import { useState } from 'react';
import { QuestionViewProps } from './types';
import { PracticeSet, Question } from '@/lib/mockData';

/**
 * SpiderChartView - Radar chart showing performance across different question categories
 * Visualizes performance metrics as a multi-dimensional radar/spider chart
 */
export function SpiderChartView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // State for controlling view options
  const [selectedSubject, setSelectedSubject] = useState<string | 'all'>('all');
  const [metricType, setMetricType] = useState<'accuracy' | 'count' | 'time'>('accuracy');

  // Extract all questions from practice sets
  const allQuestions = practiceSets.flatMap((set) =>
  set.questions.map((q) => ({
    ...q,
    setId: set.id,
    subject: set.subject,
    accuracy: set.accuracy,
    timePerQuestion: set.timeUsed / set.questions.length
  }))
  );

  // Get all available subjects
  const subjects = Array.from(new Set(practiceSets.map((set) => set.subject)));

  // Filter questions by selected subject if not 'all'
  const filteredQuestions = selectedSubject === 'all' ?
  allQuestions :
  allQuestions.filter((q) => q.subject === selectedSubject);

  // Get all unique topics from filtered questions
  const topics = Array.from(new Set(filteredQuestions.map((q) => q.topic)));

  // Calculate metrics per topic
  const topicMetrics = topics.map((topic) => {
    const topicQuestions = filteredQuestions.filter((q) => q.topic === topic);
    const correctCount = topicQuestions.filter((q) => q.correct).length;
    const accuracy = topicQuestions.length > 0 ? correctCount / topicQuestions.length * 100 : 0;
    const avgTime = topicQuestions.length > 0 ?
    topicQuestions.reduce((sum, q) => sum + q.timeSpent, 0) / topicQuestions.length :
    0;

    return {
      topic,
      count: topicQuestions.length,
      accuracy,
      time: avgTime,
      // Normalized values (0-1) for charting
      accuracyNorm: accuracy / 100,
      countNorm: Math.min(topicQuestions.length / 20, 1), // Normalize to max of 20 questions
      timeNorm: Math.min(avgTime / 120, 1) // Normalize to max of 120 seconds
    };
  });

  // Sort topics to ensure consistent ordering
  topicMetrics.sort((a, b) => a.topic.localeCompare(b.topic));

  // Calculate chart dimensions
  const chartSize = 400;
  const centerX = chartSize / 2;
  const centerY = chartSize / 2;
  const radius = chartSize * 0.4;
  const axisCount = topicMetrics.length;

  // Function to calculate point coordinates on the radar chart
  const calculatePoint = (index: number, value: number) => {
    const angle = Math.PI * 2 * index / axisCount;
    return {
      x: centerX + radius * value * Math.cos(angle - Math.PI / 2),
      y: centerY + radius * value * Math.sin(angle - Math.PI / 2)
    };
  };

  // Generate chart axes
  const axes = topicMetrics.map((metric, i) => {
    const endPoint = calculatePoint(i, 1);
    return {
      topic: metric.topic,
      line: {
        x1: centerX,
        y1: centerY,
        x2: endPoint.x,
        y2: endPoint.y
      }
    };
  });

  // Generate chart data points
  const generateChartPoints = (normValueKey: 'accuracyNorm' | 'countNorm' | 'timeNorm') => {
    const points = topicMetrics.map((metric, i) => {
      const point = calculatePoint(i, metric[normValueKey]);
      return {
        x: point.x,
        y: point.y,
        value: normValueKey === 'accuracyNorm' ? metric.accuracy :
        normValueKey === 'countNorm' ? metric.count : metric.time
      };
    });

    // Create path string for the polygon
    const pathData = points.map((point, i) =>
    (i === 0 ? 'M' : 'L') + point.x + ',' + point.y
    ).join(' ') + 'Z'; // Close the path

    return { points, pathData };
  };

  // Generate chart data based on selected metric
  const chartData = generateChartPoints(
    metricType === 'accuracy' ? 'accuracyNorm' :
    metricType === 'count' ? 'countNorm' : 'timeNorm'
  );

  // Generate grid circles
  const gridCircles = [0.2, 0.4, 0.6, 0.8, 1].map((value) => ({
    radius: radius * value,
    value: metricType === 'accuracy' ? value * 100 :
    metricType === 'count' ? Math.round(value * 20) :
    Math.round(value * 120)
  }));

  // Get color based on metric type
  const getMetricColor = () => {
    switch (metricType) {
      case 'accuracy':return { fill: '#3b82f6', stroke: '#2563eb' }; // blue
      case 'count':return { fill: '#10b981', stroke: '#059669' }; // green
      case 'time':return { fill: '#f97316', stroke: '#ea580c' }; // orange
    }
  };

  const chartColor = getMetricColor();

  // Handle selection of a topic
  const handleTopicSelect = (topic: string) => {
    // Find a practice set that contains a question with this topic
    const question = filteredQuestions.find((q) => q.topic === topic);
    if (question) {
      onSelectSet(question.setId);
    }
  };

  // Get label for the current metric
  const getMetricLabel = () => {
    switch (metricType) {
      case 'accuracy':return 'Accuracy (%)';
      case 'count':return 'Question Count';
      case 'time':return 'Average Time (sec)';
    }
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="5-nwirr">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="ljxerbn">13. Spider/Radar Chart View</h3>
      
      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center" data-oid="f84.25v">
        {/* Subject selector */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm" data-oid="_vax8zl">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1" data-oid="xlw02.j">Subject</label>
          <select
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value as 'all' | string)} data-oid="a3_k:ly">

            <option value="all" data-oid=":md:y02">All Subjects</option>
            {subjects.map((subject, i) =>
            <option key={i} value={subject} data-oid="px2x1v_">{subject}</option>
            )}
          </select>
        </div>
        
        {/* Metric type selector */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm" data-oid="xt22o4v">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1" data-oid="uf7yu6q">Metric</label>
          <select
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={metricType}
            onChange={(e) => setMetricType(e.target.value as 'accuracy' | 'count' | 'time')} data-oid="h.ylmyy">

            <option value="accuracy" data-oid="20dt0hl">Accuracy (%)</option>
            <option value="count" data-oid="oi-h2dm">Question Count</option>
            <option value="time" data-oid=".rruy8g">Average Time (sec)</option>
          </select>
        </div>
      </div>
      
      {/* Spider Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm mb-6 overflow-hidden" data-oid="7td-ia4">
        <svg
          width="100%"
          height="auto"
          viewBox={`0 0 ${chartSize} ${chartSize}`}
          className="font-sans max-h-[500px]"
          style={{ aspectRatio: '1/1' }} data-oid="2dj6ohq">

          {/* Grid circles */}
          {gridCircles.map((circle, i) =>
          <g key={`grid-${i}`} data-oid="zziqzsn">
              <circle
              cx={centerX}
              cy={centerY}
              r={circle.radius}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray="2,2" data-oid="lis1_sx" />

              <text
              x={centerX}
              y={centerY - circle.radius}
              fontSize="10"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#94a3b8" data-oid="5xcrwe6">

                {circle.value}{metricType === 'accuracy' ? '%' : metricType === 'time' ? 's' : ''}
              </text>
            </g>
          )}
          
          {/* Axes */}
          {axes.map((axis, i) =>
          <g key={`axis-${i}`} className="cursor-pointer" onClick={() => handleTopicSelect(axis.topic)} data-oid="6b27vqm">
              <line
              x1={axis.line.x1}
              y1={axis.line.y1}
              x2={axis.line.x2}
              y2={axis.line.y2}
              stroke="#cbd5e1"
              strokeWidth="1" data-oid="52.088k" />

              <text
              x={axis.line.x2 + (axis.line.x2 - centerX) * 0.1}
              y={axis.line.y2 + (axis.line.y2 - centerY) * 0.1}
              fontSize="10"
              textAnchor={axis.line.x2 < centerX ? 'end' : axis.line.x2 === centerX ? 'middle' : 'start'}
              dominantBaseline={axis.line.y2 < centerY ? 'baseline' : axis.line.y2 === centerY ? 'middle' : 'hanging'}
              fill="#475569"
              className="pointer-events-none" data-oid="yx3mbbe">

                {/* Truncate long topic names */}
                {axis.topic.length > 15 ? axis.topic.substring(0, 15) + '...' : axis.topic}
              </text>
            </g>
          )}
          
          {/* Data polygon */}
          <g data-oid="-e3zs_7">
            <path
              d={chartData.pathData}
              fill={chartColor.fill}
              fillOpacity="0.2"
              stroke={chartColor.stroke}
              strokeWidth="2" data-oid="96ubmih" />

            
            {/* Data points */}
            {chartData.points.map((point, i) =>
            <g key={`point-${i}`} className="cursor-pointer" onClick={() => handleTopicSelect(topicMetrics[i].topic)} data-oid="xh.7:-2">
                <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill={chartColor.fill}
                stroke="white"
                strokeWidth="1" data-oid="dpwce35" />

                <title data-oid="76p6bnp">
                  {topicMetrics[i].topic}: {point.value.toFixed(1)}{metricType === 'accuracy' ? '%' : metricType === 'time' ? 's' : ''}
                </title>
              </g>
            )}
          </g>
          
          {/* Center point */}
          <circle cx={centerX} cy={centerY} r="2" fill="#94a3b8" data-oid="-b07tp-" />
          
          {/* Legend */}
          <g transform={`translate(${chartSize - 120}, 20)`} data-oid="4ptpxhq">
            <rect width="100" height="24" fill="white" fillOpacity="0.8" rx="4" ry="4" data-oid="4.qm975" />
            <text x="10" y="16" fontSize="12" fill="#334155" data-oid="0bvorc0">
              {getMetricLabel()}
            </text>
          </g>
        </svg>
      </div>
      
      {/* Topic List */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm" data-oid="eg5b82.">
        <h4 className="font-medium mb-3" data-oid="x3ejyqe">Topic Performance</h4>
        <div className="max-h-60 overflow-y-auto pr-2" data-oid="ifsgwi8">
          <table className="w-full text-sm" data-oid=".e7j59e">
            <thead className="text-left text-slate-500 dark:text-slate-400" data-oid="a0gpyqy">
              <tr data-oid="lp3bj:7">
                <th className="pb-2" data-oid="ygmf4y_">Topic</th>
                <th className="pb-2 text-right" data-oid="62j7isi">Accuracy</th>
                <th className="pb-2 text-right" data-oid="zyoc11-">Questions</th>
                <th className="pb-2 text-right" data-oid="o4-d1px">Avg Time</th>
              </tr>
            </thead>
            <tbody data-oid=":893af-">
              {topicMetrics.map((metric, i) =>
              <tr
                key={i}
                className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
                onClick={() => handleTopicSelect(metric.topic)} data-oid="5j9bh00">

                  <td className="py-2" data-oid="73lkvnt">{metric.topic}</td>
                  <td className="py-2 text-right" data-oid="tq-2hpl">
                    <span
                    className={`font-mono ${
                    metric.accuracy >= 80 ? 'text-green-600 dark:text-green-400' :
                    metric.accuracy >= 60 ? 'text-amber-600 dark:text-amber-400' :
                    'text-red-600 dark:text-red-400'}`
                    } data-oid="dron25l">

                      {metric.accuracy.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-2 text-right" data-oid=".yd8r_j">{metric.count}</td>
                  <td className="py-2 text-right" data-oid="muoqu1h">{metric.time.toFixed(1)}s</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 text-center" data-oid="j8u93nu">
        <p data-oid="6o0-l.o">Click on any axis or data point to view details for that topic.</p>
      </div>
    </div>);

}