'use client';

// Based on MatrixGridView
// Futuristic neon-lit circuit board layout with glowing connections between knowledge nodes

import React, { useState, useEffect } from 'react';
import { QuestionViewProps } from '../types';
import { QuestionWithMetadata } from '../../question-view/types';
import { extractQuestionsWithMetadata } from '../../question-view/utils';

/**
 * Matrix Grid View (Question View Variant 8)
 * Organizes questions in a 2D grid by topic (rows) and difficulty (columns)
 */
export function CyberpunkCircuitGridView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  const [allQuestions, setAllQuestions] = useState<QuestionWithMetadata[]>([]);
  const [selectedCell, setSelectedCell] = useState<{topic: string;difficulty: string;} | null>(null);
  const [highlightedSetId, setHighlightedSetId] = useState<string | null>(null);
  const [filterSubject, setFilterSubject] = useState<string | null>(null);

  // Process questions when practiceSets change
  useEffect(() => {
    const questions = extractQuestionsWithMetadata(practiceSets);
    setAllQuestions(questions);
  }, [practiceSets]);

  // Filter questions by selected subject if any
  const filteredQuestions = filterSubject ?
  allQuestions.filter((q) => q.setSubject === filterSubject) :
  allQuestions;

  // Extract unique topics and difficulties for the grid
  const topics = Array.from(new Set(filteredQuestions.map((q) => q.topic))).sort();
  const difficulties = ['Easy', 'Medium', 'Hard']; // Standard order for difficulties

  // Get all subjects for filter
  const subjects = Array.from(new Set(allQuestions.map((q) => q.setSubject))).sort();

  // Create the grid data structure
  const grid = topics.map((topic) => {
    return {
      topic,
      cells: difficulties.map((difficulty) => {
        const cellQuestions = filteredQuestions.filter(
          (q) => q.topic === topic && q.difficulty === difficulty
        );

        return {
          topic,
          difficulty,
          questions: cellQuestions,
          count: cellQuestions.length,
          correctCount: cellQuestions.filter((q) => q.correct).length,
          accuracy: cellQuestions.length > 0 ?
          Math.round(cellQuestions.filter((q) => q.correct).length / cellQuestions.length * 100) :
          0,
          setIds: Array.from(new Set(cellQuestions.map((q) => q.setId)))
        };
      })
    };
  });

  // Get color for the cell based on accuracy
  const getCellColor = (accuracy: number, count: number) => {
    if (count === 0) return 'bg-slate-100 dark:bg-slate-800 opacity-50';

    if (accuracy >= 80) return 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800';
    if (accuracy >= 60) return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
    return 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800';
  };

  // Get text color based on accuracy
  const getTextColor = (accuracy: number, count: number) => {
    if (count === 0) return 'text-slate-400 dark:text-slate-500';

    if (accuracy >= 80) return 'text-emerald-700 dark:text-emerald-300';
    if (accuracy >= 60) return 'text-amber-700 dark:text-amber-300';
    return 'text-rose-700 dark:text-rose-300';
  };

  // Handler for cell click
  const handleCellClick = (topic: string, difficulty: string) => {
    if (selectedCell?.topic === topic && selectedCell?.difficulty === difficulty) {
      setSelectedCell(null);
    } else {
      setSelectedCell({ topic, difficulty });
      setHighlightedSetId(null);
    }
  };

  // Get questions for selected cell
  const selectedQuestions = selectedCell ?
  filteredQuestions.filter(
    (q) => q.topic === selectedCell.topic && q.difficulty === selectedCell.difficulty
  ) :
  [];

  // Calculate totals for each topic (row)
  const topicTotals = topics.map((topic) => {
    const topicQuestions = filteredQuestions.filter((q) => q.topic === topic);
    return {
      topic,
      count: topicQuestions.length,
      correctCount: topicQuestions.filter((q) => q.correct).length,
      accuracy: topicQuestions.length > 0 ?
      Math.round(topicQuestions.filter((q) => q.correct).length / topicQuestions.length * 100) :
      0
    };
  });

  // Calculate totals for each difficulty (column)
  const difficultyTotals = difficulties.map((difficulty) => {
    const difficultyQuestions = filteredQuestions.filter((q) => q.difficulty === difficulty);
    return {
      difficulty,
      count: difficultyQuestions.length,
      correctCount: difficultyQuestions.filter((q) => q.correct).length,
      accuracy: difficultyQuestions.length > 0 ?
      Math.round(difficultyQuestions.filter((q) => q.correct).length / difficultyQuestions.length * 100) :
      0
    };
  });

  // Calculate grand total
  const grandTotal = {
    count: filteredQuestions.length,
    correctCount: filteredQuestions.filter((q) => q.correct).length,
    accuracy: filteredQuestions.length > 0 ?
    Math.round(filteredQuestions.filter((q) => q.correct).length / filteredQuestions.length * 100) :
    0
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="3d_m4x:">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="cu08xc6">82. Cyberpunk Circuit Grid</h3>
      
      {/* Subject Filter */}
      <div className="mb-6" data-oid="lj4.iko">
        <div className="flex space-x-2 overflow-x-auto pb-2" data-oid="b2zw2k.">
          <button
            onClick={() => setFilterSubject(null)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors whitespace-nowrap ${
            filterSubject === null ?
            'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300' :
            'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
            } data-oid="oz94b-k">

            All Subjects
          </button>
          
          {subjects.map((subject) =>
          <button
            key={subject}
            onClick={() => setFilterSubject(subject)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors whitespace-nowrap ${
            filterSubject === subject ?
            'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300' :
            'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
            } data-oid="pff1mmi">

              {subject}
            </button>
          )}
        </div>
      </div>
      
      {/* Matrix Grid */}
      <div className="overflow-x-auto mb-6" data-oid="8w:i1r4">
        <table className="w-full border-collapse" data-oid="uof85mg">
          <thead data-oid="8eabmgm">
            <tr data-oid="al_8bni">
              <th className="p-3 text-left font-medium text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-700" data-oid="ux56mb8">
                Topic / Difficulty
              </th>
              
              {difficulties.map((difficulty) =>
              <th
                key={difficulty}
                className={`p-3 text-center font-medium text-sm border-b dark:border-slate-700 ${
                difficulty === 'Easy' ?
                'text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/10' :
                difficulty === 'Medium' ?
                'text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-900/10' :
                'text-rose-600 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-900/10'}`
                } data-oid="ts4jjfo">

                  {difficulty}
                  <div className="text-xs font-normal mt-1 text-slate-500 dark:text-slate-400" data-oid="b:6wxfk">
                    {difficultyTotals.find((d) => d.difficulty === difficulty)?.count || 0} questions
                  </div>
                </th>
              )}
              
              <th className="p-3 text-center font-medium text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-700" data-oid="dvuttdd">
                Total
                <div className="text-xs font-normal mt-1" data-oid="ibuuqu1">
                  {grandTotal.count} questions
                </div>
              </th>
            </tr>
          </thead>
          
          <tbody data-oid="9uz-p.r">
            {grid.map((row) =>
            <tr key={row.topic} data-oid="v88mkap">
                <td className="p-3 text-sm font-medium border-b dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50" data-oid="q0tdfi2">
                  {row.topic}
                  <div className="text-xs font-normal text-slate-500 dark:text-slate-400" data-oid="m:q8iww">
                    {topicTotals.find((t) => t.topic === row.topic)?.count || 0} questions
                  </div>
                </td>
                
                {row.cells.map((cell) =>
              <td
                key={`${cell.topic}-${cell.difficulty}`}
                onClick={() => handleCellClick(cell.topic, cell.difficulty)}
                className={`p-0 border dark:border-slate-700 ${
                selectedCell?.topic === cell.topic && selectedCell?.difficulty === cell.difficulty ?
                'ring-2 ring-indigo-500 dark:ring-indigo-400 z-10 relative' :
                ''} ${

                highlightedSetId && cell.setIds.includes(highlightedSetId) ?
                'ring-2 ring-sky-500 dark:ring-sky-400 z-10 relative' :
                ''}`
                } data-oid="1pc0dt6">

                    <div className={`h-24 p-3 cursor-pointer transition-all hover:shadow-md ${getCellColor(cell.accuracy, cell.count)}`} data-oid="7udtewf">
                      <div className="flex flex-col h-full justify-between" data-oid="dl-uo-f">
                        <div className={`text-lg font-bold ${getTextColor(cell.accuracy, cell.count)}`} data-oid="fjqxfek">
                          {cell.count > 0 ? `${cell.accuracy}%` : '-'}
                        </div>
                        
                        <div data-oid="amqa_ot">
                          <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="thqd6th">
                            {cell.count} question{cell.count !== 1 ? 's' : ''}
                          </div>
                          
                          {cell.count > 0 &&
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-1 rounded-full overflow-hidden" data-oid="qoor1s_">
                              <div
                          className={`h-full rounded-full ${
                          cell.accuracy >= 80 ? 'bg-emerald-500 dark:bg-emerald-400' :
                          cell.accuracy >= 60 ? 'bg-amber-500 dark:bg-amber-400' :
                          'bg-rose-500 dark:bg-rose-400'}`
                          }
                          style={{ width: `${cell.accuracy}%` }} data-oid="xydsuc2">
                        </div>
                            </div>
                      }
                        </div>
                      </div>
                    </div>
                  </td>
              )}
                
                <td className="p-3 text-center border-b dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50" data-oid="atqn8p3">
                  <div className={`text-lg font-bold ${
                getTextColor(topicTotals.find((t) => t.topic === row.topic)?.accuracy || 0,
                topicTotals.find((t) => t.topic === row.topic)?.count || 0)}`
                } data-oid="l_hhk8p">
                    {topicTotals.find((t) => t.topic === row.topic)?.accuracy || 0}%
                  </div>
                  
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-1 rounded-full overflow-hidden" data-oid="-clnyxn">
                    <div
                    className={`h-full rounded-full ${
                    (topicTotals.find((t) => t.topic === row.topic)?.accuracy || 0) >= 80 ?
                    'bg-emerald-500 dark:bg-emerald-400' :
                    (topicTotals.find((t) => t.topic === row.topic)?.accuracy || 0) >= 60 ?
                    'bg-amber-500 dark:bg-amber-400' :
                    'bg-rose-500 dark:bg-rose-400'}`
                    }
                    style={{ width: `${topicTotals.find((t) => t.topic === row.topic)?.accuracy || 0}%` }} data-oid="97r67_r">
                  </div>
                  </div>
                </td>
              </tr>
            )}
            
            {/* Grand Total Row */}
            <tr data-oid="7sgfxnk">
              <td className="p-3 text-sm font-medium border-b dark:border-slate-700 bg-slate-100 dark:bg-slate-800" data-oid="1:-i:o4">
                All Topics
              </td>
              
              {difficultyTotals.map((total) =>
              <td
                key={`total-${total.difficulty}`}
                className="p-3 text-center border-b dark:border-slate-700 bg-slate-100 dark:bg-slate-800" data-oid="fb5ny8v">

                  <div className={`text-lg font-bold ${getTextColor(total.accuracy, total.count)}`} data-oid="u3hn:::">
                    {total.accuracy}%
                  </div>
                  
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-1 rounded-full overflow-hidden" data-oid=":kkzc0s">
                    <div
                    className={`h-full rounded-full ${
                    total.accuracy >= 80 ? 'bg-emerald-500 dark:bg-emerald-400' :
                    total.accuracy >= 60 ? 'bg-amber-500 dark:bg-amber-400' :
                    'bg-rose-500 dark:bg-rose-400'}`
                    }
                    style={{ width: `${total.accuracy}%` }} data-oid="huxsp2s">
                  </div>
                  </div>
                </td>
              )}
              
              <td className="p-3 text-center border-b dark:border-slate-700 bg-indigo-50 dark:bg-indigo-900/20" data-oid="0vij-i4">
                <div className={`text-lg font-bold ${getTextColor(grandTotal.accuracy, grandTotal.count)}`} data-oid="4yvo6rf">
                  {grandTotal.accuracy}%
                </div>
                
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-1 rounded-full overflow-hidden" data-oid="30kth:w">
                  <div
                    className={`h-full rounded-full ${
                    grandTotal.accuracy >= 80 ? 'bg-emerald-500 dark:bg-emerald-400' :
                    grandTotal.accuracy >= 60 ? 'bg-amber-500 dark:bg-amber-400' :
                    'bg-rose-500 dark:bg-rose-400'}`
                    }
                    style={{ width: `${grandTotal.accuracy}%` }} data-oid=":95q1th">
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Selected Cell Details */}
      {selectedCell &&
      <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700" data-oid=":_.vo_-">
          <div className="flex justify-between items-center mb-3" data-oid="f8:f.xc">
            <h4 className="font-semibold" data-oid="gyu5hwu">
              {selectedCell.topic} - {selectedCell.difficulty} Questions
            </h4>
            <button
            onClick={() => setSelectedCell(null)}
            className="text-xs px-2 py-1 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600" data-oid="t5co:09">

              Close
            </button>
          </div>
          
          <div className="space-y-2 max-h-[250px] overflow-y-auto" data-oid="47vid55">
            {selectedQuestions.map((question) =>
          <div
            key={question.id}
            onMouseEnter={() => setHighlightedSetId(question.setId)}
            onMouseLeave={() => setHighlightedSetId(null)}
            onClick={() => onSelectSet && onSelectSet(question.setId)}
            className={`p-3 border rounded-md flex items-center justify-between cursor-pointer ${
            selectedSetId === question.setId ?
            'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' :
            'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`
            } data-oid="uydjg2t">

                <div data-oid="c1b0m5l">
                  <div className="font-medium text-sm flex items-center" data-oid="6rig4rh">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                question.correct ?
                'bg-green-500 dark:bg-green-400' :
                'bg-red-500 dark:bg-red-400'}`
                } data-oid="cw8757y"></span>
                    {question.subtopic}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="4csgf1_">
                    From {question.setType} • {question.setSubject}
                  </div>
                </div>
                <div className="text-right text-xs" data-oid="-487hy7">
                  {new Date(question.dateCompleted).toLocaleDateString()}
                </div>
              </div>
          )}
            
            {selectedQuestions.length === 0 &&
          <div className="py-6 text-center text-slate-500 dark:text-slate-400" data-oid="lbvvqry">
                <p data-oid="d8slnbc">No questions available for this combination.</p>
              </div>
          }
          </div>
        </div>
      }
    </div>);

}