'use client';

import React, { useState, useEffect } from 'react';
import { QuestionViewProps } from './types';
import { QuestionWithMetadata } from '../question-view/types';
import { extractQuestionsWithMetadata } from '../question-view/utils';

/**
 * Radial Bar View - Inspired by Heatmap
 * Visualizes questions as radial bars arranged in a circle, where bar length represents count and color represents accuracy
 */
export function RadialBarView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // Extract all questions from practice sets with metadata
  const [allQuestions, setAllQuestions] = useState<QuestionWithMetadata[]>([]);
  const [viewBy, setViewBy] = useState<'topic' | 'difficulty'>('topic');
  const [selectedBar, setSelectedBar] = useState<string | null>(null);

  // Process questions when practiceSets change
  useEffect(() => {
    const questions = extractQuestionsWithMetadata(practiceSets);
    setAllQuestions(questions);
  }, [practiceSets]);

  // Bar data interface
  interface BarData {
    id: string;
    label: string;
    count: number;
    accuracy: number;
    questions: QuestionWithMetadata[];
    color: string;
    percentage: number;
  }

  // Generate data for bars
  const generateBarData = (): BarData[] => {
    if (viewBy === 'topic') {
      // Group questions by topic
      const topicGroups = new Map<string, QuestionWithMetadata[]>();

      allQuestions.forEach((question) => {
        if (!topicGroups.has(question.topic)) {
          topicGroups.set(question.topic, []);
        }
        topicGroups.get(question.topic)?.push(question);
      });

      // Calculate metrics for each topic
      const barData = Array.from(topicGroups.entries()).
      filter(([_, questions]) => questions.length > 0).
      map(([topic, questions]) => {
        const correctCount = questions.filter((q) => q.correct).length;
        const accuracy = questions.length > 0 ? correctCount / questions.length * 100 : 0;

        return {
          id: topic,
          label: topic,
          count: questions.length,
          accuracy,
          questions,
          color: getAccuracyColor(accuracy),
          percentage: 0 // Will be calculated after sorting
        };
      }).
      sort((a, b) => b.count - a.count);

      // Take top 12 topics for better readability
      const topBars = barData.slice(0, 12);

      // Calculate max count for percentage calculation
      const maxCount = Math.max(...topBars.map((bar) => bar.count));

      // Update percentages
      return topBars.map((bar) => ({
        ...bar,
        percentage: bar.count / maxCount * 100
      }));
    } else {
      // Group questions by difficulty
      const difficulties = ['Easy', 'Medium', 'Hard'] as const;
      const difficultyGroups: Record<string, QuestionWithMetadata[]> = {};

      // Initialize groups
      difficulties.forEach((difficulty) => {
        difficultyGroups[difficulty] = [];
      });

      // Group questions by difficulty
      allQuestions.forEach((question) => {
        if (difficultyGroups[question.difficulty]) {
          difficultyGroups[question.difficulty].push(question);
        }
      });

      // Calculate metrics for each difficulty
      const barData = Object.entries(difficultyGroups).
      filter(([_, questions]) => questions.length > 0).
      map(([difficulty, questions]) => {
        const correctCount = questions.filter((q) => q.correct).length;
        const accuracy = questions.length > 0 ? correctCount / questions.length * 100 : 0;

        return {
          id: difficulty,
          label: difficulty,
          count: questions.length,
          accuracy,
          questions,
          color: getDifficultyColor(difficulty),
          percentage: 0 // Will be calculated after determining the max
        };
      }).
      sort((a, b) => {
        const difficultyOrder = { 'Easy': 0, 'Medium': 1, 'Hard': 2 };
        return (difficultyOrder as any)[a.id] - (difficultyOrder as any)[b.id];
      });

      // Calculate max count for percentage calculation
      const maxCount = Math.max(...barData.map((bar) => bar.count));

      // Update percentages
      return barData.map((bar) => ({
        ...bar,
        percentage: bar.count / maxCount * 100
      }));
    }
  };

  // Get accuracy color
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-500 dark:text-green-400';
    if (accuracy >= 80) return 'text-green-400 dark:text-green-300';
    if (accuracy >= 70) return 'text-emerald-400 dark:text-emerald-300';
    if (accuracy >= 60) return 'text-yellow-400 dark:text-yellow-300';
    if (accuracy >= 50) return 'text-amber-400 dark:text-amber-300';
    if (accuracy >= 40) return 'text-orange-400 dark:text-orange-300';
    if (accuracy >= 30) return 'text-red-400 dark:text-red-300';
    return 'text-red-500 dark:text-red-400';
  };

  // Get bar fill color
  const getBarFillColor = (accuracy: number) => {
    if (accuracy >= 90) return 'fill-green-500/90 dark:fill-green-400/90';
    if (accuracy >= 80) return 'fill-green-400/90 dark:fill-green-300/90';
    if (accuracy >= 70) return 'fill-emerald-400/90 dark:fill-emerald-300/90';
    if (accuracy >= 60) return 'fill-yellow-400/90 dark:fill-yellow-300/90';
    if (accuracy >= 50) return 'fill-amber-400/90 dark:fill-amber-300/90';
    if (accuracy >= 40) return 'fill-orange-400/90 dark:fill-orange-300/90';
    if (accuracy >= 30) return 'fill-red-400/90 dark:fill-red-300/90';
    return 'fill-red-500/90 dark:fill-red-400/90';
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':return 'text-green-500 dark:text-green-400';
      case 'Medium':return 'text-amber-500 dark:text-amber-400';
      case 'Hard':return 'text-red-500 dark:text-red-400';
      default:return 'text-slate-500 dark:text-slate-400';
    }
  };

  // Get difficulty fill color
  const getDifficultyFillColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':return 'fill-green-500/90 dark:fill-green-400/90';
      case 'Medium':return 'fill-amber-500/90 dark:fill-amber-400/90';
      case 'Hard':return 'fill-red-500/90 dark:fill-red-400/90';
      default:return 'fill-slate-500/90 dark:fill-slate-400/90';
    }
  };

  // Format percentage for display
  const formatPercentage = (value: number) => {
    return `${Math.round(value)}%`;
  };

  // Get selected questions
  const getSelectedQuestions = () => {
    if (!selectedBar) return [];

    const bars = generateBarData();
    const selectedBarData = bars.find((bar) => bar.id === selectedBar);
    return selectedBarData?.questions || [];
  };

  // Calculate statistics for the selected questions
  const getSelectedStats = (questions: QuestionWithMetadata[]) => {
    const totalCount = questions.length;
    if (totalCount === 0) return { correct: 0, incorrect: 0, accuracy: 0, avgTime: 0 };

    const correctCount = questions.filter((q) => q.correct).length;
    const accuracy = correctCount / totalCount * 100;
    const avgTime = questions.reduce((sum, q) => sum + q.timeSpent, 0) / totalCount;

    return {
      correct: correctCount,
      incorrect: totalCount - correctCount,
      accuracy,
      avgTime
    };
  };

  // Circular positioning and arc calculations
  const calculateBarPosition = (index: number, total: number) => {
    const centerX = 150;
    const centerY = 150;
    const innerRadius = 60;
    const outerRadius = 140;

    // Calculate angle based on number of bars
    const angleStep = 2 * Math.PI / total;
    const angle = index * angleStep;

    // Calculate bar dimensions
    const barWidth = 10;

    // Calculate sin and cos for the angle
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    return {
      innerX: centerX + innerRadius * cos,
      innerY: centerY + innerRadius * sin,
      outerX: centerX + outerRadius * cos,
      outerY: centerY + outerRadius * sin,
      labelX: centerX + (outerRadius + 15) * cos,
      labelY: centerY + (outerRadius + 15) * sin,
      angle: angle * (180 / Math.PI),
      barWidth
    };
  };

  // Generate radial bars
  const generateRadialBars = () => {
    const barData = generateBarData();
    const total = barData.length;

    return barData.map((bar, index) => {
      const position = calculateBarPosition(index, total);

      // Calculate the distance based on percentage
      const distance = position.outerX - position.innerX;
      const percentageDistance = distance * (bar.percentage / 100);

      // Calculate the scaled endpoint
      const endX = position.innerX + percentageDistance * Math.cos(position.angle * Math.PI / 180);
      const endY = position.innerY + percentageDistance * Math.sin(position.angle * Math.PI / 180);

      // Get colors based on view mode
      const textColor = viewBy === 'topic' ? getAccuracyColor(bar.accuracy) : getDifficultyColor(bar.id);
      const fillColor = viewBy === 'topic' ? getBarFillColor(bar.accuracy) : getDifficultyFillColor(bar.id);

      // Calculate label angle for readability
      const labelAngle = position.angle > 90 && position.angle < 270 ? position.angle + 180 : position.angle;

      const isSelected = bar.id === selectedBar;

      return (
        <g key={bar.id} onClick={() => setSelectedBar(bar.id === selectedBar ? null : bar.id)} data-oid="gogpad1">
          {/* Bar */}
          <line
            x1={position.innerX}
            y1={position.innerY}
            x2={position.outerX}
            y2={position.outerY}
            className="stroke-gray-300 dark:stroke-gray-600"
            strokeWidth={position.barWidth}
            strokeLinecap="round" data-oid="tl3iipw" />

          
          {/* Filled portion of bar */}
          <line
            x1={position.innerX}
            y1={position.innerY}
            x2={endX}
            y2={endY}
            className={`${fillColor} ${isSelected ? 'stroke-width-[14px]' : ''} cursor-pointer transition-all duration-200`}
            strokeWidth={isSelected ? position.barWidth + 4 : position.barWidth}
            strokeLinecap="round" data-oid="hh1e6ja" />

          
          {/* Label */}
          <text
            x={position.labelX}
            y={position.labelY}
            textAnchor={position.angle > 90 && position.angle < 270 ? 'end' : 'start'}
            dominantBaseline="middle"
            className={`text-xs ${textColor} font-medium cursor-pointer`}
            transform={`rotate(${labelAngle}, ${position.labelX}, ${position.labelY})`} data-oid="5t.2jlp">

            {bar.label}
          </text>
        </g>);

    });
  };

  // Selected bar data and stats
  const selectedQuestions = getSelectedQuestions();
  const selectedStats = getSelectedStats(selectedQuestions);
  const barData = generateBarData();
  const selectedBarData = selectedBar ? barData.find((bar) => bar.id === selectedBar) : null;

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="lo6:c8j">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="qoim6e1">39. Radial Bar View</h3>
      
      {/* Mode selector */}
      <div className="flex justify-center mb-8" data-oid="huagee1">
        <div className="bg-slate-100 dark:bg-slate-800 inline-flex p-1 rounded-lg" data-oid="qlh0acp">
          <button
            onClick={() => setViewBy('topic')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            viewBy === 'topic' ?
            'bg-white dark:bg-slate-700 shadow-sm' :
            'hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            } data-oid="x:zvpo7">

            By Topic
          </button>
          <button
            onClick={() => setViewBy('difficulty')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            viewBy === 'difficulty' ?
            'bg-white dark:bg-slate-700 shadow-sm' :
            'hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            } data-oid="2hiyezc">

            By Difficulty
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto" data-oid=".l3uk3d">
        {/* Radial bar visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 flex items-center justify-center" data-oid="ggjh8.y">
          <div className="relative w-[350px] h-[350px]" data-oid="5egxc9p">
            <svg width="350" height="350" viewBox="0 0 300 300" data-oid="q8sdgsh">
              {/* Circular center */}
              <circle
                cx="150"
                cy="150"
                r="50"
                className="fill-slate-100 dark:fill-slate-700 stroke-slate-300 dark:stroke-slate-600"
                strokeWidth="1" data-oid="5h75lrn" />

              
              {/* Outer circle reference */}
              <circle
                cx="150"
                cy="150"
                r="140"
                className="fill-none stroke-slate-200 dark:stroke-slate-700"
                strokeWidth="1"
                strokeDasharray="2 2" data-oid="izd9c4b" />

              
              {/* Radial bars */}
              {generateRadialBars()}
              
              {/* Center text */}
              <text
                x="150"
                y="145"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-slate-700 dark:text-slate-300 text-lg font-medium" data-oid="1p9:ufr">

                {allQuestions.length}
              </text>
              <text
                x="150"
                y="165"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-slate-500 dark:text-slate-400 text-xs" data-oid="v3xc38j">

                Questions
              </text>
            </svg>
          </div>
        </div>
        
        {/* Selected bar details */}
        <div data-oid="0.-n5h1">
          {selectedBar && selectedQuestions.length > 0 ?
          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 h-full" data-oid="m-n9nwg">
              <h4 className="font-semibold mb-3 text-lg" data-oid="86ouugr">
                {selectedBarData?.label} ({selectedQuestions.length} questions)
              </h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4" data-oid="j9.xl22">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-md" data-oid="hq84:pn">
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="ihnpp9i">Accuracy</div>
                  <div className="text-xl font-semibold" data-oid="g2t.npn">{formatPercentage(selectedStats.accuracy)}</div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md" data-oid="1dyx3x.">
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="_wpkd51">Correct</div>
                  <div className="text-xl font-semibold text-green-600 dark:text-green-400" data-oid="n8a9oe0">{selectedStats.correct}</div>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md" data-oid="42sq2uc">
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="4srifi-">Incorrect</div>
                  <div className="text-xl font-semibold text-red-600 dark:text-red-400" data-oid="wbaryp6">{selectedStats.incorrect}</div>
                </div>
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-md" data-oid="rmk7klh">
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="3t0xw7v">Avg. Time</div>
                  <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-400" data-oid="3s:zifr">{Math.round(selectedStats.avgTime)}s</div>
                </div>
              </div>
              
              <h5 className="font-medium mb-2 text-sm" data-oid="n-6v33:">Questions</h5>
              <div className="max-h-[250px] overflow-y-auto space-y-2 pr-1" data-oid="2jjthr_">
                {selectedQuestions.map((question) =>
              <div
                key={question.id}
                onClick={() => onSelectSet && onSelectSet(question.setId)}
                className={`p-3 border rounded-lg flex items-center justify-between cursor-pointer ${
                selectedSetId === question.setId ?
                'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' :
                'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`
                } data-oid="-pins08">

                    <div data-oid="kncks1f">
                      <div className="font-medium text-sm" data-oid=".p7:wpq">
                        {question.setSubject} • {question.topic}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="tr3jnsi">
                        {question.subtopic} • {question.difficulty} difficulty
                      </div>
                    </div>
                    <div className="flex items-center space-x-3" data-oid="kyhpe1z">
                      <div className={`px-2 py-1 rounded-full text-xs ${
                  question.correct ?
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`
                  } data-oid="g5n1sb6">
                        {question.correct ? 'Correct' : 'Incorrect'}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="zudjp-v">
                        {question.timeSpent}s
                      </div>
                    </div>
                  </div>
              )}
              </div>
            </div> :

          <div className="p-8 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center h-full" data-oid="n8-2yya">
              <p className="text-slate-500 dark:text-slate-400 text-center" data-oid="2--jpjo">
                Click on a bar to view detailed information
              </p>
            </div>
          }
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center items-center mt-8 gap-4 text-xs" data-oid="b9n:mr5">
        <div className="font-medium text-slate-600 dark:text-slate-300" data-oid="4bmtq8n">Bar Color: {viewBy === 'topic' ? 'Accuracy' : 'Difficulty'}</div>
        {viewBy === 'topic' ?
        <>
            <div className="flex items-center" data-oid="b947m8j">
              <div className="w-4 h-4 bg-green-500 rounded-sm" data-oid="sf-5s2j"></div>
              <span className="ml-1" data-oid="160dyhl">70-100%</span>
            </div>
            <div className="flex items-center" data-oid="nt1.2eo">
              <div className="w-4 h-4 bg-amber-400 rounded-sm" data-oid="849xyxc"></div>
              <span className="ml-1" data-oid="e6bpu:y">40-70%</span>
            </div>
            <div className="flex items-center" data-oid=".vqcp3h">
              <div className="w-4 h-4 bg-red-500 rounded-sm" data-oid="ivwltq-"></div>
              <span className="ml-1" data-oid="des1mki">0-40%</span>
            </div>
          </> :

        <>
            <div className="flex items-center" data-oid="x6:lo3c">
              <div className="w-4 h-4 bg-green-500 rounded-sm" data-oid="3mq:5x:"></div>
              <span className="ml-1" data-oid="m7fe4u4">Easy</span>
            </div>
            <div className="flex items-center" data-oid="cn9fhul">
              <div className="w-4 h-4 bg-amber-500 rounded-sm" data-oid="te6-zw0"></div>
              <span className="ml-1" data-oid="t6smytv">Medium</span>
            </div>
            <div className="flex items-center" data-oid="e-v-714">
              <div className="w-4 h-4 bg-red-500 rounded-sm" data-oid="rqd6.84"></div>
              <span className="ml-1" data-oid="bdcxgw_">Hard</span>
            </div>
          </>
        }
        <div className="font-medium text-slate-600 dark:text-slate-300 ml-4" data-oid="0468gx2">Bar Length: Question Count</div>
      </div>
    </div>);

}