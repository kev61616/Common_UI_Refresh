'use client';

// Based on HeatmapView
// Light spectrum visualization that splits and refracts based on performance metrics across subjects

import React, { useState, useEffect } from 'react';
import { QuestionViewProps } from '../types';
import { QuestionWithMetadata } from '../../question-view/types';
import { extractQuestionsWithMetadata } from '../../question-view/utils';

/**
 * Heatmap View (Question View Variant 5)
 * Visual heat map of question performance by topic and difficulty
 */
export function HeatmapPrismView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
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
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="-481gj7">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="civpntj">62. Heatmap Prism</h3>
      
      {/* Mode selector */}
      <div className="flex justify-center mb-8" data-oid="cljwxwt">
        <div className="bg-slate-100 dark:bg-slate-800 inline-flex p-1 rounded-lg" data-oid="viz5rjj">
          <button
            onClick={() => setHeatmapMode('topic')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            heatmapMode === 'topic' ?
            'bg-white dark:bg-slate-700 shadow-sm' :
            'hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            } data-oid="rkna5so">

            Topic × Difficulty
          </button>
          <button
            onClick={() => setHeatmapMode('subject')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            heatmapMode === 'subject' ?
            'bg-white dark:bg-slate-700 shadow-sm' :
            'hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            } data-oid="6yuc9i:">

            Subject × Difficulty
          </button>
        </div>
      </div>
      
      {/* Heatmap grid */}
      <div className="max-w-3xl mx-auto overflow-x-auto" data-oid="cbukioo">
        <div className="min-w-[600px]" data-oid="6rfdx2g">
          <div className="flex" data-oid="83jo:y.">
            {/* Y-axis label column */}
            <div className="w-36 pt-8 pr-3 text-right" data-oid="o.gbu6:">
              <div className="font-medium text-slate-500 dark:text-slate-400 mb-2" data-oid=".9q10m3">
                {heatmapMode === 'topic' ? 'Topic' : 'Subject'}
              </div>
            </div>
            
            {/* X-axis labels */}
            <div className="flex-1 grid grid-cols-3 gap-2 mb-2" data-oid="lkxvbw4">
              {heatmapData.xAxis.map((label) =>
              <div key={label} className="h-8 flex items-center justify-center font-medium text-slate-500 dark:text-slate-400" data-oid="fb.7n5q">
                  {label}
                </div>
              )}
            </div>
          </div>
          
          {/* Heatmap rows */}
          <div className="space-y-2" data-oid="z3v:pq:">
            {heatmapData.cells.map((row) =>
            <div key={row.topic} className="flex" data-oid="_idp2_a">
                {/* Row label */}
                <div className="w-36 py-2 pr-3 text-right text-sm truncate flex items-center justify-end" data-oid=":v4n_p8">
                  <div data-oid="lycz:lx">
                    <div className="font-medium" data-oid="9kbypng">{row.topic}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="btuxpsv">{row.totalCount} questions</div>
                  </div>
                </div>
                
                {/* Row cells */}
                <div className="flex-1 grid grid-cols-3 gap-2" data-oid="rris99k">
                  {row.cells.map((cell) =>
                <div
                  key={`${cell.topic}-${cell.difficulty}`}
                  className={`h-16 rounded-md ${cell.color} ${getCellBorderStyle(cell.topic, cell.difficulty)} flex flex-col items-center justify-center p-1 cursor-pointer transition-colors`}
                  onClick={() => selectCell(cell.topic, cell.difficulty)} data-oid="hsm1vs:">

                      {cell.count > 0 ?
                  <>
                          <div className="font-semibold text-lg" data-oid="s25uw7:">
                            {formatPercentage(cell.accuracy)}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="i9yl-zb">
                            {cell.count} questions
                          </div>
                        </> :

                  <div className="text-xs text-slate-400 dark:text-slate-500" data-oid="baziiad">No data</div>
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
      <div className="mt-8 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 max-w-3xl mx-auto" data-oid="m8zrumv">
          <h4 className="font-semibold mb-3 text-lg" data-oid="-i2ul8l">
            {selectedDimension.split('-')[0]} • {selectedDimension.split('-')[1]} Difficulty
          </h4>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4" data-oid="7ipsm6n">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-md" data-oid=".0cc43o">
              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="5:f.9j5">Questions</div>
              <div className="text-xl font-semibold" data-oid="5m7kgln">{selectedQuestions.length}</div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md" data-oid="px4ldcs">
              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="1_0zs9_">Correct</div>
              <div className="text-xl font-semibold text-green-600 dark:text-green-400" data-oid="oovk9jy">{selectedStats.correct}</div>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md" data-oid="_h.srmq">
              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="8g00qrf">Incorrect</div>
              <div className="text-xl font-semibold text-red-600 dark:text-red-400" data-oid="8ec8y6b">{selectedStats.incorrect}</div>
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-md" data-oid="nkatz6f">
              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="vnei3_r">Avg. Time</div>
              <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-400" data-oid="u.8lpl:">{Math.round(selectedStats.avgTime)}s</div>
            </div>
          </div>
          
          <h5 className="font-medium mb-2 text-sm" data-oid="g.u26io">Questions</h5>
          <div className="max-h-[250px] overflow-y-auto space-y-2 pr-1" data-oid=":uj8js6">
            {selectedQuestions.map((question) =>
          <div
            key={question.id}
            onClick={() => onSelectSet && onSelectSet(question.setId)}
            className={`p-3 border rounded-lg flex items-center justify-between cursor-pointer ${
            selectedSetId === question.setId ?
            'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' :
            'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`
            } data-oid="1o_2i9w">

                <div data-oid="v:xjf_r">
                  <div className="font-medium text-sm" data-oid="z4cw8mb">
                    {question.setSubject} • {question.topic}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="p62mp0z">
                    {question.subtopic} • From {question.setType}
                  </div>
                </div>
                <div className="flex items-center space-x-3" data-oid="gvfwbpe">
                  <div className={`px-2 py-1 rounded-full text-xs ${
              question.correct ?
              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`
              } data-oid=".d-5k:j">
                    {question.correct ? 'Correct' : 'Incorrect'}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid=":p8zikm">
                    {question.timeSpent}s
                  </div>
                </div>
              </div>
          )}
          </div>
        </div>
      }
      
      {/* Legend */}
      <div className="flex justify-center items-center mt-8 text-xs space-x-2" data-oid="8yp7nyr">
        <div className="font-medium text-slate-500 dark:text-slate-400 mr-1" data-oid="law.295">Accuracy:</div>
        <div className="flex items-center" data-oid="sdokv8i">
          <div className="w-4 h-4 bg-red-100 dark:bg-red-900/30 rounded-sm" data-oid="9xu66s3"></div>
          <span className="ml-1" data-oid="egz0ppz">0-40%</span>
        </div>
        <div className="flex items-center" data-oid="vw3v5gf">
          <div className="w-4 h-4 bg-amber-50 dark:bg-amber-900/20 rounded-sm" data-oid="v-urpv."></div>
          <span className="ml-1" data-oid="de29un3">40-70%</span>
        </div>
        <div className="flex items-center" data-oid="tu43891">
          <div className="w-4 h-4 bg-green-100 dark:bg-green-900/30 rounded-sm" data-oid="u1bxc9d"></div>
          <span className="ml-1" data-oid="efnwpfh">70-100%</span>
        </div>
      </div>
    </div>);

}