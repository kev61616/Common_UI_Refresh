'use client';

import React, { useState, useEffect } from 'react';
import { QuestionViewProps } from './types';
import { QuestionWithMetadata } from '../question-view/types';
import { extractQuestionsWithMetadata } from '../question-view/utils';

/**
 * TreeMap View - Inspired by Heatmap
 * Data visualization where rectangle size represents question count and color represents accuracy
 */
export function TreeMapView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // Extract all questions from practice sets with metadata
  const [allQuestions, setAllQuestions] = useState<QuestionWithMetadata[]>([]);
  const [treeMapMode, setTreeMapMode] = useState<'topic' | 'subject'>('topic');
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  // Process questions when practiceSets change
  useEffect(() => {
    const questions = extractQuestionsWithMetadata(practiceSets);
    setAllQuestions(questions);
  }, [practiceSets]);

  // Build treemap data structures
  const buildTreeMapData = () => {
    if (treeMapMode === 'topic') {
      // Group by topic
      const topicGroups = new Map<string, QuestionWithMetadata[]>();

      allQuestions.forEach((question) => {
        if (!topicGroups.has(question.topic)) {
          topicGroups.set(question.topic, []);
        }
        topicGroups.get(question.topic)?.push(question);
      });

      // Calculate metrics and sort by size
      const blocks = Array.from(topicGroups.entries()).
      map(([topic, questions]) => {
        const correctCount = questions.filter((q) => q.correct).length;
        const accuracy = questions.length > 0 ? correctCount / questions.length * 100 : 0;

        return {
          id: topic,
          title: topic,
          count: questions.length,
          accuracy,
          questions
        };
      }).
      sort((a, b) => b.count - a.count); // Sort by count descending

      return blocks;
    } else {
      // Group by subject
      const subjectGroups = new Map<string, QuestionWithMetadata[]>();

      allQuestions.forEach((question) => {
        if (!subjectGroups.has(question.setSubject)) {
          subjectGroups.set(question.setSubject, []);
        }
        subjectGroups.get(question.setSubject)?.push(question);
      });

      // Calculate metrics and sort by size
      const blocks = Array.from(subjectGroups.entries()).
      map(([subject, questions]) => {
        const correctCount = questions.filter((q) => q.correct).length;
        const accuracy = questions.length > 0 ? correctCount / questions.length * 100 : 0;

        return {
          id: subject,
          title: subject,
          count: questions.length,
          accuracy,
          questions
        };
      }).
      sort((a, b) => b.count - a.count); // Sort by count descending

      return blocks;
    }
  };

  // Generate color based on accuracy percentage
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'bg-green-500 dark:bg-green-600';
    if (accuracy >= 80) return 'bg-green-400 dark:bg-green-500';
    if (accuracy >= 70) return 'bg-emerald-400 dark:bg-emerald-500';
    if (accuracy >= 60) return 'bg-yellow-400 dark:bg-yellow-500';
    if (accuracy >= 50) return 'bg-amber-400 dark:bg-amber-500';
    if (accuracy >= 40) return 'bg-orange-400 dark:bg-orange-500';
    if (accuracy >= 30) return 'bg-red-400 dark:bg-red-500';
    return 'bg-red-500 dark:bg-red-600';
  };

  // Get text color based on background color for better contrast
  const getTextColor = (accuracy: number) => {
    return accuracy < 60 ? 'text-white' : 'text-slate-900 dark:text-white';
  };

  // Format percentage for display
  const formatPercentage = (value: number) => {
    return `${Math.round(value)}%`;
  };

  // Get selected questions
  const getSelectedQuestions = () => {
    if (!selectedBlock) return [];

    const blocks = buildTreeMapData();
    const selectedBlockData = blocks.find((block) => block.id === selectedBlock);
    return selectedBlockData?.questions || [];
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

  // Generate treemap blocks with content
  const generateTreeMapBlocks = () => {
    const blocks = buildTreeMapData();
    const totalCount = blocks.reduce((sum, block) => sum + block.count, 0);

    // Create flexible layout
    const rows: any[] = [];
    let currentRow: any[] = [];
    let currentRowSize = 0;
    const targetRowSize = totalCount / 3; // Aim for roughly 3 rows

    blocks.forEach((block) => {
      if (currentRowSize > 0 && currentRowSize + block.count > targetRowSize * 1.2) {
        // Start a new row if this would make current row too big
        rows.push([...currentRow]);
        currentRow = [block];
        currentRowSize = block.count;
      } else {
        currentRow.push(block);
        currentRowSize += block.count;
      }
    });

    // Add the last row if not empty
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    // Render the rows and blocks with flex layout
    return rows.map((row, rowIndex) => {
      const rowTotal = row.reduce((sum: number, block: any) => sum + block.count, 0);

      return (
        <div key={`row-${rowIndex}`} className="flex w-full mb-2" data-oid="laqhoo-">
          {row.map((block: any) => {
            const flexBasis = `${block.count / rowTotal * 100}%`;
            const isSelected = selectedBlock === block.id;

            return (
              <div
                key={block.id}
                onClick={() => setSelectedBlock(isSelected ? null : block.id)}
                className={`
                  ${getAccuracyColor(block.accuracy)} 
                  ${getTextColor(block.accuracy)}
                  p-3 m-1 rounded-lg flex flex-col justify-between
                  transition-all duration-200 cursor-pointer
                  ${isSelected ? 'ring-4 ring-indigo-500 dark:ring-indigo-400 shadow-lg' : 'hover:shadow-md'}
                `}
                style={{ flexBasis }} data-oid="o7w1fsg">

                <div className="font-bold truncate" data-oid="kara0v7">{block.title}</div>
                <div className="flex justify-between items-end" data-oid="l02_fgw">
                  <div className="text-sm opacity-90" data-oid="d4ibvl_">{block.count} questions</div>
                  <div className="text-2xl font-bold" data-oid="az05gkx">{formatPercentage(block.accuracy)}</div>
                </div>
              </div>);

          })}
        </div>);

    });
  };

  // Get questions for selected block
  const selectedQuestions = getSelectedQuestions();
  const selectedStats = getSelectedStats(selectedQuestions);

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="tb8if52">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="qss9jc2">35. TreeMap View</h3>
      
      {/* Mode selector */}
      <div className="flex justify-center mb-8" data-oid="omqgnu-">
        <div className="bg-slate-100 dark:bg-slate-800 inline-flex p-1 rounded-lg" data-oid="2opfa49">
          <button
            onClick={() => setTreeMapMode('topic')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            treeMapMode === 'topic' ?
            'bg-white dark:bg-slate-700 shadow-sm' :
            'hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            } data-oid="0sp9c0k">

            By Topic
          </button>
          <button
            onClick={() => setTreeMapMode('subject')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            treeMapMode === 'subject' ?
            'bg-white dark:bg-slate-700 shadow-sm' :
            'hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            } data-oid="5st1sq2">

            By Subject
          </button>
        </div>
      </div>
      
      {/* TreeMap visualization */}
      <div className="max-w-4xl mx-auto" data-oid="jtt2wqc">
        {generateTreeMapBlocks()}
      </div>
      
      {/* Selected block details */}
      {selectedBlock && selectedQuestions.length > 0 &&
      <div className="mt-8 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 max-w-4xl mx-auto" data-oid="lw1g3v9">
          <h4 className="font-semibold mb-3 text-lg" data-oid="6k50nyw">
            {selectedBlock}
          </h4>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4" data-oid="ajhp9i1">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-md" data-oid="v16968.">
              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="o8w2oi3">Questions</div>
              <div className="text-xl font-semibold" data-oid="lzgl96_">{selectedQuestions.length}</div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md" data-oid="niq8o7n">
              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="3wzq.b4">Correct</div>
              <div className="text-xl font-semibold text-green-600 dark:text-green-400" data-oid="6cef9u0">{selectedStats.correct}</div>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md" data-oid="51w08z7">
              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="xvljzio">Incorrect</div>
              <div className="text-xl font-semibold text-red-600 dark:text-red-400" data-oid="7f2rzpu">{selectedStats.incorrect}</div>
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-md" data-oid="zicee8p">
              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid=".oijpk9">Avg. Time</div>
              <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-400" data-oid="t0t2-4-">{Math.round(selectedStats.avgTime)}s</div>
            </div>
          </div>
          
          <h5 className="font-medium mb-2 text-sm" data-oid="-n-mc-p">Questions</h5>
          <div className="max-h-[250px] overflow-y-auto space-y-2 pr-1" data-oid="9-i8b42">
            {selectedQuestions.map((question) =>
          <div
            key={question.id}
            onClick={() => onSelectSet && onSelectSet(question.setId)}
            className={`p-3 border rounded-lg flex items-center justify-between cursor-pointer ${
            selectedSetId === question.setId ?
            'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' :
            'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`
            } data-oid="f8rpc0s">

                <div data-oid="ndb65p7">
                  <div className="font-medium text-sm" data-oid="e1zv4ju">
                    {question.setSubject} • {question.topic}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="smfh9..">
                    {question.subtopic} • From {question.setType}
                  </div>
                </div>
                <div className="flex items-center space-x-3" data-oid="n:.8ezm">
                  <div className={`px-2 py-1 rounded-full text-xs ${
              question.correct ?
              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`
              } data-oid="-efsewm">
                    {question.correct ? 'Correct' : 'Incorrect'}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="mf2o187">
                    {question.timeSpent}s
                  </div>
                </div>
              </div>
          )}
          </div>
        </div>
      }
      
      {/* Legend */}
      <div className="flex justify-center items-center mt-8 text-xs space-x-2" data-oid=".:qtfiw">
        <div className="font-medium text-slate-500 dark:text-slate-400 mr-1" data-oid="bkpbfo0">Accuracy:</div>
        <div className="flex items-center" data-oid="z-bry6-">
          <div className="w-4 h-4 bg-red-500 dark:bg-red-600 rounded-sm" data-oid="ba:gnn1"></div>
          <span className="ml-1" data-oid="wpw37qx">0-40%</span>
        </div>
        <div className="flex items-center" data-oid="mf_x5pg">
          <div className="w-4 h-4 bg-amber-400 dark:bg-amber-500 rounded-sm" data-oid="3ll0k_c"></div>
          <span className="ml-1" data-oid="dybg9vw">40-70%</span>
        </div>
        <div className="flex items-center" data-oid="7zthlua">
          <div className="w-4 h-4 bg-green-500 dark:bg-green-600 rounded-sm" data-oid="sz9rlur"></div>
          <span className="ml-1" data-oid="wbs:q6r">70-100%</span>
        </div>
        <div className="ml-2 font-medium text-slate-500 dark:text-slate-400" data-oid="d:-635z">Block Size: Question Count</div>
      </div>
    </div>);

}