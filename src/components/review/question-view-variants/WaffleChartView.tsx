'use client';

import React, { useState, useEffect } from 'react';
import { QuestionViewProps } from './types';
import { QuestionWithMetadata } from '../question-view/types';
import { extractQuestionsWithMetadata } from '../question-view/utils';

/**
 * Waffle Chart View - Inspired by Heatmap
 * A square grid visualization showing proportions with colored cells
 */
export function WaffleChartView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // Extract all questions from practice sets with metadata
  const [allQuestions, setAllQuestions] = useState<QuestionWithMetadata[]>([]);
  const [viewMode, setViewMode] = useState<'subject' | 'difficulty' | 'accuracy'>('subject');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Process questions when practiceSets change
  useEffect(() => {
    const questions = extractQuestionsWithMetadata(practiceSets);
    setAllQuestions(questions);
  }, [practiceSets]);

  // Prepare data for visualization
  const prepareData = () => {
    if (viewMode === 'subject') {
      // Group by subject
      const subjects = ['Math', 'Reading', 'Writing'] as const;
      const data = subjects.map((subject) => {
        const questions = allQuestions.filter((q) => q.setSubject === subject);
        const correctCount = questions.filter((q) => q.correct).length;
        const accuracy = questions.length > 0 ? correctCount / questions.length * 100 : 0;

        return {
          category: subject,
          count: questions.length,
          percentage: questions.length / allQuestions.length * 100,
          accuracy,
          questions,
          color: subject === 'Math' ? 'bg-blue-500 dark:bg-blue-600' :
          subject === 'Reading' ? 'bg-purple-500 dark:bg-purple-600' :
          'bg-green-500 dark:bg-green-600'
        };
      });

      return data.filter((item) => item.count > 0);
    } else
    if (viewMode === 'difficulty') {
      // Group by difficulty
      const difficulties = ['Easy', 'Medium', 'Hard'] as const;
      const data = difficulties.map((difficulty) => {
        const questions = allQuestions.filter((q) => q.difficulty === difficulty);
        const correctCount = questions.filter((q) => q.correct).length;
        const accuracy = questions.length > 0 ? correctCount / questions.length * 100 : 0;

        return {
          category: difficulty,
          count: questions.length,
          percentage: questions.length / allQuestions.length * 100,
          accuracy,
          questions,
          color: difficulty === 'Easy' ? 'bg-green-500 dark:bg-green-600' :
          difficulty === 'Medium' ? 'bg-yellow-500 dark:bg-yellow-600' :
          'bg-red-500 dark:bg-red-600'
        };
      });

      return data.filter((item) => item.count > 0);
    } else
    {
      // Group by accuracy ranges
      const accuracyRanges = [
      { min: 0, max: 50, label: '0-50%', color: 'bg-red-500 dark:bg-red-600' },
      { min: 50, max: 75, label: '50-75%', color: 'bg-yellow-500 dark:bg-yellow-600' },
      { min: 75, max: 100, label: '75-100%', color: 'bg-green-500 dark:bg-green-600' }];


      const data = accuracyRanges.map((range) => {
        // Group questions by practice set, calculate each set's accuracy
        const setAccuracies = new Map<string, {questions: QuestionWithMetadata[];correct: number;}>();

        allQuestions.forEach((question) => {
          if (!setAccuracies.has(question.setId)) {
            setAccuracies.set(question.setId, { questions: [], correct: 0 });
          }
          const setData = setAccuracies.get(question.setId)!;
          setData.questions.push(question);
          if (question.correct) {
            setData.correct += 1;
          }
        });

        // Filter sets that fall within this accuracy range
        const setsInRange = Array.from(setAccuracies.entries()).
        filter(([_, data]) => {
          const setAccuracy = data.correct / data.questions.length * 100;
          return setAccuracy >= range.min && setAccuracy < range.max;
        });

        // Get all questions from these sets
        const questionsInRange = setsInRange.flatMap(([_, data]) => data.questions);
        const correctCount = questionsInRange.filter((q) => q.correct).length;
        const accuracy = questionsInRange.length > 0 ? correctCount / questionsInRange.length * 100 : 0;

        return {
          category: range.label,
          count: questionsInRange.length,
          percentage: questionsInRange.length / allQuestions.length * 100,
          accuracy,
          questions: questionsInRange,
          color: range.color
        };
      });

      return data.filter((item) => item.count > 0);
    }
  };

  // Generate waffle chart cells
  const generateWaffleChart = () => {
    const data = prepareData();
    const totalCells = 100; // 10x10 grid
    let cellsCreated = 0;
    const rows = [];

    // Function to check if this cell belongs to a category based on proportions
    const getCategoryForCell = (cellIndex: number) => {
      let cumulativePercentage = 0;

      for (const category of data) {
        cumulativePercentage += category.percentage;
        if (cellIndex < cumulativePercentage / 100 * totalCells) {
          return category;
        }
      }

      return null;
    };

    // Create 10x10 grid
    for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
      const cells = [];

      for (let colIndex = 0; colIndex < 10; colIndex++) {
        const cellIndex = rowIndex * 10 + colIndex;
        const category = getCategoryForCell(cellIndex);

        cells.push(
          <div
            key={`cell-${rowIndex}-${colIndex}`}
            className={`
              w-6 h-6 m-0.5 rounded-sm cursor-pointer transition-all
              ${category ? category.color : 'bg-slate-200 dark:bg-slate-700'}
              ${selectedCategory === category?.category ? 'ring-2 ring-white shadow-md scale-110' : 'hover:opacity-80'}
            `}
            onClick={() => setSelectedCategory(
              category?.category === selectedCategory ? null : category?.category || null
            )} data-oid="08ddu_u">
          </div>
        );

        cellsCreated++;
      }

      rows.push(
        <div key={`row-${rowIndex}`} className="flex" data-oid="rw.4s.c">
          {cells}
        </div>
      );
    }

    return rows;
  };

  // Get selected questions based on category
  const getSelectedQuestions = () => {
    if (!selectedCategory) return [];

    const data = prepareData();
    const selectedCategoryData = data.find((item) => item.category === selectedCategory);
    return selectedCategoryData?.questions || [];
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

  // Format percentage for display
  const formatPercentage = (value: number) => {
    return `${Math.round(value)}%`;
  };

  // Get selected questions and stats
  const selectedQuestions = getSelectedQuestions();
  const selectedStats = getSelectedStats(selectedQuestions);
  const data = prepareData();

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="k0n3y_7">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="fehbmxr">36. Waffle Chart View</h3>
      
      {/* View mode selector */}
      <div className="flex justify-center mb-8" data-oid="jm:e8ez">
        <div className="bg-slate-100 dark:bg-slate-800 inline-flex p-1 rounded-lg" data-oid="pt431kf">
          <button
            onClick={() => setViewMode('subject')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            viewMode === 'subject' ?
            'bg-white dark:bg-slate-700 shadow-sm' :
            'hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            } data-oid="mjg:e7g">

            By Subject
          </button>
          <button
            onClick={() => setViewMode('difficulty')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            viewMode === 'difficulty' ?
            'bg-white dark:bg-slate-700 shadow-sm' :
            'hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            } data-oid="xds3h6t">

            By Difficulty
          </button>
          <button
            onClick={() => setViewMode('accuracy')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            viewMode === 'accuracy' ?
            'bg-white dark:bg-slate-700 shadow-sm' :
            'hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            } data-oid="gk0zxjr">

            By Accuracy
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto" data-oid="ig-31re">
        {/* Waffle chart visualization */}
        <div className="flex flex-col items-center justify-center" data-oid="i:re8l-">
          <div className="mb-6" data-oid="_eb.za.">
            {generateWaffleChart()}
          </div>
          
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-2" data-oid="-oxjl7r">
            {data.map((category) =>
            <div
              key={category.category}
              className="flex items-center cursor-pointer"
              onClick={() => setSelectedCategory(
                category.category === selectedCategory ? null : category.category
              )} data-oid="v41y9vg">

                <div
                className={`w-4 h-4 ${category.color} rounded-sm mr-2 ${
                selectedCategory === category.category ? 'ring-2 ring-slate-400 dark:ring-slate-300' : ''}`
                } data-oid="vmawrm6">
              </div>
                <span className="text-sm" data-oid="nm9u803">
                  {category.category}: {formatPercentage(category.percentage)}
                  {viewMode !== 'accuracy' && ` (${formatPercentage(category.accuracy)} correct)`}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Selected category details */}
        <div data-oid="i-aksa9">
          {selectedCategory && selectedQuestions.length > 0 ?
          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700" data-oid="ad1g.ka">
              <h4 className="font-semibold mb-3 text-lg" data-oid="6bnt_n2">
                {selectedCategory}
              </h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4" data-oid="pvn93d3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-md" data-oid="3na:u-w">
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="1455pwf">Questions</div>
                  <div className="text-xl font-semibold" data-oid="_bdpvqv">{selectedQuestions.length}</div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md" data-oid="l6pbs7.">
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="xyuz8y8">Correct</div>
                  <div className="text-xl font-semibold text-green-600 dark:text-green-400" data-oid="w8:5txq">{selectedStats.correct}</div>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md" data-oid="e8k_zkk">
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="elupftc">Incorrect</div>
                  <div className="text-xl font-semibold text-red-600 dark:text-red-400" data-oid="obj:og1">{selectedStats.incorrect}</div>
                </div>
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-md" data-oid="-3gn065">
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="oft-h-s">Avg. Time</div>
                  <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-400" data-oid=":92_awa">{Math.round(selectedStats.avgTime)}s</div>
                </div>
              </div>
              
              <h5 className="font-medium mb-2 text-sm" data-oid="mqjfam.">Questions</h5>
              <div className="max-h-[250px] overflow-y-auto space-y-2 pr-1" data-oid="3aql_bw">
                {selectedQuestions.map((question) =>
              <div
                key={question.id}
                onClick={() => onSelectSet && onSelectSet(question.setId)}
                className={`p-3 border rounded-lg flex items-center justify-between cursor-pointer ${
                selectedSetId === question.setId ?
                'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' :
                'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`
                } data-oid="9f_u:0v">

                    <div data-oid=".i_stgm">
                      <div className="font-medium text-sm" data-oid="o9h53w3">
                        {question.setSubject} • {question.topic}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="vpa9_wq">
                        {question.subtopic} • {question.difficulty} difficulty
                      </div>
                    </div>
                    <div className="flex items-center space-x-3" data-oid="svs8ccm">
                      <div className={`px-2 py-1 rounded-full text-xs ${
                  question.correct ?
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`
                  } data-oid="i-_er.3">
                        {question.correct ? 'Correct' : 'Incorrect'}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="sxwrjzm">
                        {question.timeSpent}s
                      </div>
                    </div>
                  </div>
              )}
              </div>
            </div> :

          <div className="p-8 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center" data-oid="i3qm215">
              <p className="text-slate-500 dark:text-slate-400 text-center" data-oid="b.kvf5i">
                Select a category from the waffle chart<br data-oid="7i85-0w" />to view detailed information
              </p>
            </div>
          }
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400" data-oid="-2y-dd.">
        Each square represents 1% of your questions. Click on a colored square to see details for that category.
      </div>
    </div>);

}