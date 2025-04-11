'use client';

// Based on HeatmapView
// Volcanic regions visualization with magma hotspots and cooling areas representing knowledge intensity

import React, { useState, useEffect } from 'react';
import { QuestionViewProps } from '../types';
import { QuestionWithMetadata } from '../../question-view/types';
import { extractQuestionsWithMetadata } from '../../question-view/utils';

/**
 * Heatmap View (Question View Variant 5)
 * Visual heat map of question performance by topic and difficulty
 */
export function VolcanicActivityHeatmapView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // Extract all questions from practice sets with metadata
  const [allQuestions, setAllQuestions] = useState<QuestionWithMetadata[]>([]);
  const [heatmapMode, setHeatmapMode] = useState<'topic' | 'subject'>('topic');
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);

  // Process questions when practiceSets change
  useEffect(() => {
    const questions = extractQuestionsWithMetadata(practiceSets);
    setAllQuestions(questions);
  }, [practiceSets]);

  // Build heatmap data for topic vs difficulty
  const buildTopicHeatmap = () => {
    // Get all unique topics and difficulties
    const topics = Array.from(new Set(allQuestions.map((q) => q.topic))).
    sort((a, b) => a.localeCompare(b));

    const difficulties = ['Easy', 'Medium', 'Hard'];

    // Build heatmap cells
    const cells = topics.map((topic) => {
      const topicQuestions = allQuestions.filter((q) => q.topic === topic);

      return {
        topic,
        totalCount: topicQuestions.length,
        cells: difficulties.map((difficulty) => {
          const cellQuestions = topicQuestions.filter((q) => q.difficulty === difficulty);
          const cellCount = cellQuestions.length;

          // Only calculate accuracy if there are questions
          const correctCount = cellQuestions.filter((q) => q.correct).length;
          const accuracy = cellCount > 0 ? correctCount / cellCount * 100 : 0;

          return {
            topic,
            difficulty,
            count: cellCount,
            accuracy,
            questions: cellQuestions,
            color: getHeatmapColor(accuracy, cellCount > 0)
          };
        })
      };
    });

    return {
      xAxis: difficulties,
      yAxis: topics,
      cells
    };
  };

  // Build heatmap data for subject vs difficulty
  const buildSubjectHeatmap = () => {
    // Get all unique subjects
    const subjects = ['Math', 'Reading', 'Writing'] as const;
    const difficulties = ['Easy', 'Medium', 'Hard'];

    // Build heatmap cells
    const cells = subjects.map((subject) => {
      const subjectQuestions = allQuestions.filter((q) => q.setSubject === subject);

      return {
        topic: subject,
        totalCount: subjectQuestions.length,
        cells: difficulties.map((difficulty) => {
          const cellQuestions = subjectQuestions.filter((q) => q.difficulty === difficulty);
          const cellCount = cellQuestions.length;

          // Only calculate accuracy if there are questions
          const correctCount = cellQuestions.filter((q) => q.correct).length;
          const accuracy = cellCount > 0 ? correctCount / cellCount * 100 : 0;

          return {
            topic: subject,
            difficulty,
            count: cellCount,
            accuracy,
            questions: cellQuestions,
            color: getHeatmapColor(accuracy, cellCount > 0)
          };
        })
      };
    });

    return {
      xAxis: difficulties,
      yAxis: subjects,
      cells
    };
  };

  // Generate color based on accuracy percentage
  const getHeatmapColor = (accuracy: number, hasData: boolean) => {
    if (!hasData) return 'bg-slate-100 dark:bg-slate-800/50';

    if (accuracy >= 90) return 'bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50';
    if (accuracy >= 80) return 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30';
    if (accuracy >= 70) return 'bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30';
    if (accuracy >= 60) return 'bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30';
    if (accuracy >= 50) return 'bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30';
    if (accuracy >= 40) return 'bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30';
    if (accuracy >= 30) return 'bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30';
    return 'bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50';
  };

  // Get percentage formatted for display
  const formatPercentage = (value: number) => {
    return `${Math.round(value)}%`;
  };

  // Get cell border style based on selection
  const getCellBorderStyle = (topic: string, difficulty: string) => {
    if (selectedDimension === `${topic}-${difficulty}`) {
      return 'border-2 border-indigo-500 dark:border-indigo-400';
    }
    return 'border border-slate-200 dark:border-slate-700';
  };

  // Select a cell to view questions
  const selectCell = (topic: string, difficulty: string) => {
    const cellKey = `${topic}-${difficulty}`;
    setSelectedDimension(selectedDimension === cellKey ? null : cellKey);
  };

  // Get filtered questions for selected cell
  const getSelectedQuestions = () => {
    if (!selectedDimension) return [];

    const [topic, difficulty] = selectedDimension.split('-');

    if (heatmapMode === 'topic') {
      return allQuestions.filter((q) =>
      q.topic === topic && q.difficulty === difficulty
      );
    } else {
      return allQuestions.filter((q) =>
      q.setSubject === topic && q.difficulty === difficulty
      );
    }
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

  // Get current heatmap data based on mode
  const heatmapData = heatmapMode === 'topic' ?
  buildTopicHeatmap() :
  buildSubjectHeatmap();

  // Get questions for selected cell
  const selectedQuestions = getSelectedQuestions();
  const selectedStats = getSelectedStats(selectedQuestions);

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="6tzzy6c">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="hgtz.p0">77. Volcanic Activity Heatmap</h3>
      
      {/* Mode selector */}
      <div className="flex justify-center mb-8" data-oid=".n-k14.">
        <div className="bg-slate-100 dark:bg-slate-800 inline-flex p-1 rounded-lg" data-oid="nu2.lgv">
          <button
            onClick={() => setHeatmapMode('topic')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            heatmapMode === 'topic' ?
            'bg-white dark:bg-slate-700 shadow-sm' :
            'hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            } data-oid=".nzjmb8">

            Topic × Difficulty
          </button>
          <button
            onClick={() => setHeatmapMode('subject')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            heatmapMode === 'subject' ?
            'bg-white dark:bg-slate-700 shadow-sm' :
            'hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            } data-oid="gjv99-i">

            Subject × Difficulty
          </button>
        </div>
      </div>
      
      {/* Heatmap grid */}
      <div className="max-w-3xl mx-auto overflow-x-auto" data-oid="f9ffuna">
        <div className="min-w-[600px]" data-oid="uae.tyl">
          <div className="flex" data-oid="gklac.4">
            {/* Y-axis label column */}
            <div className="w-36 pt-8 pr-3 text-right" data-oid="iiwjtqn">
              <div className="font-medium text-slate-500 dark:text-slate-400 mb-2" data-oid="s3o40w8">
                {heatmapMode === 'topic' ? 'Topic' : 'Subject'}
              </div>
            </div>
            
            {/* X-axis labels */}
            <div className="flex-1 grid grid-cols-3 gap-2 mb-2" data-oid="w08tjn5">
              {heatmapData.xAxis.map((label) =>
              <div key={label} className="h-8 flex items-center justify-center font-medium text-slate-500 dark:text-slate-400" data-oid="zn6.2vc">
                  {label}
                </div>
              )}
            </div>
          </div>
          
          {/* Heatmap rows */}
          <div className="space-y-2" data-oid="aj4yzeb">
            {heatmapData.cells.map((row) =>
            <div key={row.topic} className="flex" data-oid="fvc.m6t">
                {/* Row label */}
                <div className="w-36 py-2 pr-3 text-right text-sm truncate flex items-center justify-end" data-oid="0_hn5hf">
                  <div data-oid="bklo8ky">
                    <div className="font-medium" data-oid="3.nv1n8">{row.topic}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="np745-a">{row.totalCount} questions</div>
                  </div>
                </div>
                
                {/* Row cells */}
                <div className="flex-1 grid grid-cols-3 gap-2" data-oid="pcbonke">
                  {row.cells.map((cell) =>
                <div
                  key={`${cell.topic}-${cell.difficulty}`}
                  className={`h-16 rounded-md ${cell.color} ${getCellBorderStyle(cell.topic, cell.difficulty)} flex flex-col items-center justify-center p-1 cursor-pointer transition-colors`}
                  onClick={() => selectCell(cell.topic, cell.difficulty)} data-oid="i:nw403">

                      {cell.count > 0 ?
                  <>
                          <div className="font-semibold text-lg" data-oid="o8sy1fi">
                            {formatPercentage(cell.accuracy)}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="p6xd.bu">
                            {cell.count} questions
                          </div>
                        </> :

                  <div className="text-xs text-slate-400 dark:text-slate-500" data-oid="ies.n7p">No data</div>
                  }
                    </div>
                )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Selected cell details */}
      {selectedDimension && selectedQuestions.length > 0 &&
      <div className="mt-8 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 max-w-3xl mx-auto" data-oid="4g422nw">
          <h4 className="font-semibold mb-3 text-lg" data-oid="o13i564">
            {selectedDimension.split('-')[0]} • {selectedDimension.split('-')[1]} Difficulty
          </h4>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4" data-oid="hf000w7">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-md" data-oid="w_ecr0t">
              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="v8utkm3">Questions</div>
              <div className="text-xl font-semibold" data-oid="ty1ymz3">{selectedQuestions.length}</div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md" data-oid="s2z95es">
              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="8qf.j1l">Correct</div>
              <div className="text-xl font-semibold text-green-600 dark:text-green-400" data-oid="pw1ls_a">{selectedStats.correct}</div>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md" data-oid="-0-zb:.">
              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="ggpq24n">Incorrect</div>
              <div className="text-xl font-semibold text-red-600 dark:text-red-400" data-oid="3x_m-oh">{selectedStats.incorrect}</div>
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-md" data-oid="2k-9kow">
              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="9.bl.zp">Avg. Time</div>
              <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-400" data-oid="169z_:l">{Math.round(selectedStats.avgTime)}s</div>
            </div>
          </div>
          
          <h5 className="font-medium mb-2 text-sm" data-oid="uy43buc">Questions</h5>
          <div className="max-h-[250px] overflow-y-auto space-y-2 pr-1" data-oid="yzhfw66">
            {selectedQuestions.map((question) =>
          <div
            key={question.id}
            onClick={() => onSelectSet && onSelectSet(question.setId)}
            className={`p-3 border rounded-lg flex items-center justify-between cursor-pointer ${
            selectedSetId === question.setId ?
            'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' :
            'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`
            } data-oid="ykssfg6">

                <div data-oid="5duek09">
                  <div className="font-medium text-sm" data-oid="_v5igov">
                    {question.setSubject} • {question.topic}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="pia_5b5">
                    {question.subtopic} • From {question.setType}
                  </div>
                </div>
                <div className="flex items-center space-x-3" data-oid="7xy7d4i">
                  <div className={`px-2 py-1 rounded-full text-xs ${
              question.correct ?
              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`
              } data-oid="m._2h7l">
                    {question.correct ? 'Correct' : 'Incorrect'}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="61ch.4y">
                    {question.timeSpent}s
                  </div>
                </div>
              </div>
          )}
          </div>
        </div>
      }
      
      {/* Legend */}
      <div className="flex justify-center items-center mt-8 text-xs space-x-2" data-oid="c52eo:g">
        <div className="font-medium text-slate-500 dark:text-slate-400 mr-1" data-oid="5shh04j">Accuracy:</div>
        <div className="flex items-center" data-oid="syrl0je">
          <div className="w-4 h-4 bg-red-100 dark:bg-red-900/30 rounded-sm" data-oid="4zkyimj"></div>
          <span className="ml-1" data-oid="86axq.s">0-40%</span>
        </div>
        <div className="flex items-center" data-oid="lpdr0b-">
          <div className="w-4 h-4 bg-amber-50 dark:bg-amber-900/20 rounded-sm" data-oid="qm4hvx_"></div>
          <span className="ml-1" data-oid="-87p5d4">40-70%</span>
        </div>
        <div className="flex items-center" data-oid="zpuv_:g">
          <div className="w-4 h-4 bg-green-100 dark:bg-green-900/30 rounded-sm" data-oid="_ntb.79"></div>
          <span className="ml-1" data-oid="jh6aqob">70-100%</span>
        </div>
      </div>
    </div>);

}