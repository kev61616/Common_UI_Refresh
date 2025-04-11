'use client';

import React, { useState, useEffect } from 'react';
import { QuestionViewProps } from './types';
import { QuestionWithMetadata } from '../question-view/types';
import { extractQuestionsWithMetadata } from '../question-view/utils';

/**
 * Hexagonal Heatmap View - Inspired by Heatmap
 * A honeycomb-like visualization using hexagonal cells where color represents accuracy
 */
export function HexagonalHeatmapView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // Extract all questions from practice sets with metadata
  const [allQuestions, setAllQuestions] = useState<QuestionWithMetadata[]>([]);
  const [viewMode, setViewMode] = useState<'topic' | 'subject'>('topic');
  const [selectedHex, setSelectedHex] = useState<string | null>(null);

  // Process questions when practiceSets change
  useEffect(() => {
    const questions = extractQuestionsWithMetadata(practiceSets);
    setAllQuestions(questions);
  }, [practiceSets]);

  // Hexagon data interface
  interface HexagonData {
    id: string;
    label: string;
    count: number;
    accuracy: number;
    questions: QuestionWithMetadata[];
    color: string;
    x: number;
    y: number;
    size: number;
  }

  // Generate data for hexagons
  const generateHexData = (): HexagonData[] => {
    if (viewMode === 'topic') {
      // Group questions by topic
      const topicGroups = new Map<string, QuestionWithMetadata[]>();

      allQuestions.forEach((question) => {
        if (!topicGroups.has(question.topic)) {
          topicGroups.set(question.topic, []);
        }
        topicGroups.get(question.topic)?.push(question);
      });

      // Calculate metrics for each topic
      const topics = Array.from(topicGroups.entries()).
      map(([topic, questions]) => {
        const correctCount = questions.filter((q) => q.correct).length;
        const accuracy = questions.length > 0 ? correctCount / questions.length * 100 : 0;

        return {
          id: topic,
          label: topic,
          count: questions.length,
          accuracy,
          questions,
          color: getHeatmapColor(accuracy),
          x: 0, // Will be calculated later
          y: 0, // Will be calculated later
          size: 20 + Math.min(questions.length / 2, 20) // Size based on count, min 20, max 40
        };
      }).
      sort((a, b) => b.count - a.count);

      // Layout hexagons in a spiral pattern
      // Start with the largest in the center
      const hexLayout = layoutHexagonsSpiral(topics);

      return hexLayout;
    } else {
      // Group by subject
      const subjects = ['Math', 'Reading', 'Writing'] as const;
      const difficulties = ['Easy', 'Medium', 'Hard'] as const;
      const subjectDifficultyGroups: Record<string, QuestionWithMetadata[]> = {};

      // Initialize all subject-difficulty combinations
      for (const subject of subjects) {
        for (const difficulty of difficulties) {
          subjectDifficultyGroups[`${subject}-${difficulty}`] = [];
        }
      }

      // Group questions by subject and difficulty
      allQuestions.forEach((question) => {
        const key = `${question.setSubject}-${question.difficulty}`;
        if (subjectDifficultyGroups[key]) {
          subjectDifficultyGroups[key].push(question);
        }
      });

      // Calculate metrics for each group
      const groups = Object.entries(subjectDifficultyGroups).
      filter(([_, questions]) => questions.length > 0).
      map(([key, questions]) => {
        const [subject, difficulty] = key.split('-');
        const correctCount = questions.filter((q) => q.correct).length;
        const accuracy = questions.length > 0 ? correctCount / questions.length * 100 : 0;

        return {
          id: key,
          label: `${subject} - ${difficulty}`,
          count: questions.length,
          accuracy,
          questions,
          color: getHeatmapColor(accuracy),
          x: 0, // Will be calculated later
          y: 0, // Will be calculated later
          size: 20 + Math.min(questions.length / 2, 20) // Size based on count, min 20, max 40
        };
      }).
      sort((a, b) => b.count - a.count);

      // Layout hexagons in a grid pattern
      const hexLayout = layoutHexagonsGrid(groups);

      return hexLayout;
    }
  };

  // Generate color based on accuracy percentage
  const getHeatmapColor = (accuracy: number) => {
    if (accuracy >= 90) return 'fill-green-500/90 dark:fill-green-600/90 text-white';
    if (accuracy >= 80) return 'fill-green-400/90 dark:fill-green-500/90 text-white';
    if (accuracy >= 70) return 'fill-emerald-400/90 dark:fill-emerald-500/90 text-white';
    if (accuracy >= 60) return 'fill-yellow-400/90 dark:fill-yellow-500/90 text-black dark:text-white';
    if (accuracy >= 50) return 'fill-amber-400/90 dark:fill-amber-500/90 text-black dark:text-white';
    if (accuracy >= 40) return 'fill-orange-400/90 dark:fill-orange-500/90 text-white';
    if (accuracy >= 30) return 'fill-red-400/90 dark:fill-red-500/90 text-white';
    return 'fill-red-500/90 dark:fill-red-600/90 text-white';
  };

  // Layout hexagons in a spiral pattern
  const layoutHexagonsSpiral = (hexagons: HexagonData[]): HexagonData[] => {
    // Constants for spiral positioning
    const centerX = 300;
    const centerY = 250;

    // Copy so we don't modify the original
    const result = [...hexagons];

    // Spiral layout
    let angle = 0;
    let radius = 0;
    const radiusIncrement = 15;
    const angleIncrement = 0.5;

    return result.map((hex, index) => {
      // First hexagon is in the center
      if (index === 0) {
        return { ...hex, x: centerX, y: centerY };
      }

      // Others are in a spiral
      angle += angleIncrement;
      radius += radiusIncrement / angle;

      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      return { ...hex, x, y };
    });
  };

  // Layout hexagons in a grid pattern
  const layoutHexagonsGrid = (hexagons: HexagonData[]): HexagonData[] => {
    // Constants for grid positioning
    const startX = 150;
    const startY = 150;
    const hexWidth = 80;
    const hexHeight = 70;

    // Copy so we don't modify the original
    const result = [...hexagons];

    // Determine grid dimensions
    const columns = Math.ceil(Math.sqrt(result.length));

    return result.map((hex, index) => {
      // Calculate grid position
      const col = index % columns;
      const row = Math.floor(index / columns);

      // Calculate x,y with offset for even rows to create honeycomb effect
      const offsetX = row % 2 === 0 ? 0 : hexWidth / 2;
      const x = startX + col * hexWidth + offsetX;
      const y = startY + row * (hexHeight * 0.75); // Overlap hexagons vertically

      return { ...hex, x, y };
    });
  };

  // Format percentage for display
  const formatPercentage = (value: number) => {
    return `${Math.round(value)}%`;
  };

  // Get selected questions
  const getSelectedQuestions = () => {
    if (!selectedHex) return [];

    const hexData = generateHexData();
    const selectedHexData = hexData.find((hex) => hex.id === selectedHex);
    return selectedHexData?.questions || [];
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

  // Generate SVG hexagon path
  const getHexagonPath = (size: number) => {
    const angles = [0, 60, 120, 180, 240, 300];
    const points = angles.map((angle) => {
      const angleRad = angle * Math.PI / 180;
      const x = size * Math.cos(angleRad);
      const y = size * Math.sin(angleRad);
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')} Z`;
  };

  // Generate hexagons for visualization
  const generateHexagons = () => {
    const hexData = generateHexData();

    return hexData.map((hex) => {
      const isSelected = hex.id === selectedHex;
      const hexPath = getHexagonPath(hex.size);

      return (
        <g
          key={hex.id}
          transform={`translate(${hex.x}, ${hex.y})`}
          className="cursor-pointer transition-all duration-200"
          onClick={() => setSelectedHex(hex.id === selectedHex ? null : hex.id)} data-oid="cqg9rsk">

          {/* Shadow */}
          <path
            d={hexPath}
            className="fill-slate-400/20 dark:fill-slate-500/20"
            transform="translate(2, 2)" data-oid="5nd:0if" />

          
          {/* Hexagon */}
          <path
            d={hexPath}
            className={`${hex.color} ${isSelected ? 'stroke-indigo-500 dark:stroke-indigo-400 stroke-[3px]' : 'stroke-white dark:stroke-slate-700 stroke-2'}`} data-oid="b_g9yh3" />

          
          {/* Label */}
          <text
            x="0"
            y="0"
            textAnchor="middle"
            dominantBaseline="middle"
            className={`text-sm font-medium ${hex.color.includes('text-') ? hex.color.split(' ').find((c) => c.startsWith('text-')) : 'text-white'}`} data-oid="wacb7xd">

            {hex.label.length > 12 ? hex.label.substring(0, 10) + '...' : hex.label}
          </text>
          
          {/* Count and accuracy */}
          <text
            x="0"
            y="15"
            textAnchor="middle"
            dominantBaseline="middle"
            className={`text-xs ${hex.color.includes('text-') ? hex.color.split(' ').find((c) => c.startsWith('text-')) : 'text-white'}`} data-oid="mztt33y">

            {hex.count} · {formatPercentage(hex.accuracy)}
          </text>
        </g>);

    });
  };

  // Selected questions and stats
  const selectedQuestions = getSelectedQuestions();
  const selectedStats = getSelectedStats(selectedQuestions);
  const hexData = generateHexData();
  const selectedHexData = selectedHex ? hexData.find((hex) => hex.id === selectedHex) : null;

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="nc:390-">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="68ca23w">40. Hexagonal Heatmap View</h3>
      
      {/* Mode selector */}
      <div className="flex justify-center mb-8" data-oid="tsk9ttl">
        <div className="bg-slate-100 dark:bg-slate-800 inline-flex p-1 rounded-lg" data-oid="51r.n80">
          <button
            onClick={() => setViewMode('topic')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            viewMode === 'topic' ?
            'bg-white dark:bg-slate-700 shadow-sm' :
            'hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            } data-oid="i_xff:g">

            By Topic
          </button>
          <button
            onClick={() => setViewMode('subject')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            viewMode === 'subject' ?
            'bg-white dark:bg-slate-700 shadow-sm' :
            'hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            } data-oid="lwvge4l">

            By Subject & Difficulty
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto" data-oid="nqp40fs">
        {/* Hexagonal heatmap visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 flex items-center justify-center" data-oid="lnwsvlp">
          <div className="relative w-full h-[500px] overflow-hidden" data-oid="6:65phh">
            <svg width="600" height="500" viewBox="0 0 600 500" className="max-w-full" data-oid="qh4pcp6">
              {generateHexagons()}
            </svg>
          </div>
        </div>
        
        {/* Selected hexagon details */}
        <div data-oid="tei3pk7">
          {selectedHex && selectedQuestions.length > 0 ?
          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 h-full" data-oid="d38e_ox">
              <h4 className="font-semibold mb-3 text-lg" data-oid="n6cxurd">
                {selectedHexData?.label} ({selectedQuestions.length} questions)
              </h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4" data-oid="ls9p68:">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-md" data-oid="_-gw_b1">
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="dot_vs3">Accuracy</div>
                  <div className="text-xl font-semibold" data-oid=".by8jjg">{formatPercentage(selectedStats.accuracy)}</div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md" data-oid="-5y:j_f">
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="d32p_jo">Correct</div>
                  <div className="text-xl font-semibold text-green-600 dark:text-green-400" data-oid="ac6rv4-">{selectedStats.correct}</div>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md" data-oid="r-o_ke7">
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="1c-2nz0">Incorrect</div>
                  <div className="text-xl font-semibold text-red-600 dark:text-red-400" data-oid="4uyu5ol">{selectedStats.incorrect}</div>
                </div>
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-md" data-oid="zpb-5jm">
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="jue2526">Avg. Time</div>
                  <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-400" data-oid=".mi4gso">{Math.round(selectedStats.avgTime)}s</div>
                </div>
              </div>
              
              <h5 className="font-medium mb-2 text-sm" data-oid="_r-w1l-">Questions</h5>
              <div className="max-h-[250px] overflow-y-auto space-y-2 pr-1" data-oid="bb5q-0g">
                {selectedQuestions.map((question) =>
              <div
                key={question.id}
                onClick={() => onSelectSet && onSelectSet(question.setId)}
                className={`p-3 border rounded-lg flex items-center justify-between cursor-pointer ${
                selectedSetId === question.setId ?
                'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' :
                'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`
                } data-oid="mguk4tu">

                    <div data-oid="6zn507e">
                      <div className="font-medium text-sm" data-oid="201k9zu">
                        {question.setSubject} • {question.topic}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="f63o_x0">
                        {question.subtopic} • {question.difficulty} difficulty
                      </div>
                    </div>
                    <div className="flex items-center space-x-3" data-oid="b:r1022">
                      <div className={`px-2 py-1 rounded-full text-xs ${
                  question.correct ?
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`
                  } data-oid="d06xk7g">
                        {question.correct ? 'Correct' : 'Incorrect'}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="f6ars76">
                        {question.timeSpent}s
                      </div>
                    </div>
                  </div>
              )}
              </div>
            </div> :

          <div className="p-8 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center h-full" data-oid="tu51cby">
              <p className="text-slate-500 dark:text-slate-400 text-center" data-oid="flbsqw9">
                Click on a hexagon to view detailed information
              </p>
            </div>
          }
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center items-center mt-8 gap-4 text-xs" data-oid="dryutm.">
        <div className="font-medium text-slate-600 dark:text-slate-300" data-oid="ot8ybo6">Hexagon Color: Accuracy</div>
        <div className="flex items-center" data-oid="s3n2tin">
          <div className="w-4 h-4 bg-red-500 rounded-sm" data-oid=":e5taa7"></div>
          <span className="ml-1" data-oid="8b6gmtn">0-40%</span>
        </div>
        <div className="flex items-center" data-oid="h47pv_q">
          <div className="w-4 h-4 bg-amber-400 rounded-sm" data-oid="v3bw4h5"></div>
          <span className="ml-1" data-oid=".itb_c7">40-70%</span>
        </div>
        <div className="flex items-center" data-oid="d.zluwu">
          <div className="w-4 h-4 bg-green-500 rounded-sm" data-oid="5u.wuvs"></div>
          <span className="ml-1" data-oid="6aycyb:">70-100%</span>
        </div>
        <div className="font-medium text-slate-600 dark:text-slate-300 ml-4" data-oid="-wha.yg">Hexagon Size: Question Count</div>
      </div>
    </div>);

}