'use client';

// Based on MatrixGridView
// Natural hexagonal honeycomb structure with cell filling patterns showing mastery progression

import React, { useState, useEffect } from 'react';
import { QuestionViewProps } from '../types';
import { QuestionWithMetadata } from '../../question-view/types';
import { extractQuestionsWithMetadata } from '../../question-view/utils';

/**
 * Matrix Grid View (Question View Variant 8)
 * Organizes questions in a 2D grid by topic (rows) and difficulty (columns)
 */
export function HoneycombMatrixView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
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
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="_caj7up">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="9onkpwk">84. Honeycomb Matrix</h3>
      
      {/* Subject Filter */}
      <div className="mb-6" data-oid="1fc7pv-">
        <div className="flex space-x-2 overflow-x-auto pb-2" data-oid="7ira6ja">
          <button
            onClick={() => setFilterSubject(null)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors whitespace-nowrap ${
            filterSubject === null ?
            'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300' :
            'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
            } data-oid="3lp_h63">

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
            } data-oid="vw-8kdl">

              {subject}
            </button>
          )}
        </div>
      </div>
      
      {/* Matrix Grid */}
      <div className="overflow-x-auto mb-6" data-oid="sanm09.">
        <table className="w-full border-collapse" data-oid="40qze1g">
          <thead data-oid="_ya6wbg">
            <tr data-oid="hvudj69">
              <th className="p-3 text-left font-medium text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-700" data-oid="p5bt47t">
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
                } data-oid="is:0a7x">

                  {difficulty}
                  <div className="text-xs font-normal mt-1 text-slate-500 dark:text-slate-400" data-oid="m4us.au">
                    {difficultyTotals.find((d) => d.difficulty === difficulty)?.count || 0} questions
                  </div>
                </th>
              )}
              
              <th className="p-3 text-center font-medium text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-700" data-oid="us2z7h0">
                Total
                <div className="text-xs font-normal mt-1" data-oid="lsdj._u">
                  {grandTotal.count} questions
                </div>
              </th>
            </tr>
          </thead>
          
          <tbody data-oid="7lv3pvn">
            {grid.map((row) =>
            <tr key={row.topic} data-oid="-cm_7r8">
                <td className="p-3 text-sm font-medium border-b dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50" data-oid="_:f0tj3">
                  {row.topic}
                  <div className="text-xs font-normal text-slate-500 dark:text-slate-400" data-oid="6vni.wc">
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
                } data-oid="iv9po14">

                    <div className={`h-24 p-3 cursor-pointer transition-all hover:shadow-md ${getCellColor(cell.accuracy, cell.count)}`} data-oid="-yc0u1x">
                      <div className="flex flex-col h-full justify-between" data-oid="m17cymw">
                        <div className={`text-lg font-bold ${getTextColor(cell.accuracy, cell.count)}`} data-oid="gq6lm0e">
                          {cell.count > 0 ? `${cell.accuracy}%` : '-'}
                        </div>
                        
                        <div data-oid="yw5y17v">
                          <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="coggkfc">
                            {cell.count} question{cell.count !== 1 ? 's' : ''}
                          </div>
                          
                          {cell.count > 0 &&
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-1 rounded-full overflow-hidden" data-oid="2cjp:9_">
                              <div
                          className={`h-full rounded-full ${
                          cell.accuracy >= 80 ? 'bg-emerald-500 dark:bg-emerald-400' :
                          cell.accuracy >= 60 ? 'bg-amber-500 dark:bg-amber-400' :
                          'bg-rose-500 dark:bg-rose-400'}`
                          }
                          style={{ width: `${cell.accuracy}%` }} data-oid=".2v5ufk">
                        </div>
                            </div>
                      }
                        </div>
                      </div>
                    </div>
                  </td>
              )}
                
                <td className="p-3 text-center border-b dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50" data-oid="f74fvmk">
                  <div className={`text-lg font-bold ${
                getTextColor(topicTotals.find((t) => t.topic === row.topic)?.accuracy || 0,
                topicTotals.find((t) => t.topic === row.topic)?.count || 0)}`
                } data-oid="e5iy8:z">
                    {topicTotals.find((t) => t.topic === row.topic)?.accuracy || 0}%
                  </div>
                  
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-1 rounded-full overflow-hidden" data-oid="q:dcsf8">
                    <div
                    className={`h-full rounded-full ${
                    (topicTotals.find((t) => t.topic === row.topic)?.accuracy || 0) >= 80 ?
                    'bg-emerald-500 dark:bg-emerald-400' :
                    (topicTotals.find((t) => t.topic === row.topic)?.accuracy || 0) >= 60 ?
                    'bg-amber-500 dark:bg-amber-400' :
                    'bg-rose-500 dark:bg-rose-400'}`
                    }
                    style={{ width: `${topicTotals.find((t) => t.topic === row.topic)?.accuracy || 0}%` }} data-oid="tbhnn6g">
                  </div>
                  </div>
                </td>
              </tr>
            )}
            
            {/* Grand Total Row */}
            <tr data-oid="gtadbmd">
              <td className="p-3 text-sm font-medium border-b dark:border-slate-700 bg-slate-100 dark:bg-slate-800" data-oid="yehmsnn">
                All Topics
              </td>
              
              {difficultyTotals.map((total) =>
              <td
                key={`total-${total.difficulty}`}
                className="p-3 text-center border-b dark:border-slate-700 bg-slate-100 dark:bg-slate-800" data-oid=":s854bz">

                  <div className={`text-lg font-bold ${getTextColor(total.accuracy, total.count)}`} data-oid="cnpfa0j">
                    {total.accuracy}%
                  </div>
                  
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-1 rounded-full overflow-hidden" data-oid="fsu186t">
                    <div
                    className={`h-full rounded-full ${
                    total.accuracy >= 80 ? 'bg-emerald-500 dark:bg-emerald-400' :
                    total.accuracy >= 60 ? 'bg-amber-500 dark:bg-amber-400' :
                    'bg-rose-500 dark:bg-rose-400'}`
                    }
                    style={{ width: `${total.accuracy}%` }} data-oid="h5olx_2">
                  </div>
                  </div>
                </td>
              )}
              
              <td className="p-3 text-center border-b dark:border-slate-700 bg-indigo-50 dark:bg-indigo-900/20" data-oid="yplsgnl">
                <div className={`text-lg font-bold ${getTextColor(grandTotal.accuracy, grandTotal.count)}`} data-oid="4o12my9">
                  {grandTotal.accuracy}%
                </div>
                
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-1 rounded-full overflow-hidden" data-oid="jyiv67g">
                  <div
                    className={`h-full rounded-full ${
                    grandTotal.accuracy >= 80 ? 'bg-emerald-500 dark:bg-emerald-400' :
                    grandTotal.accuracy >= 60 ? 'bg-amber-500 dark:bg-amber-400' :
                    'bg-rose-500 dark:bg-rose-400'}`
                    }
                    style={{ width: `${grandTotal.accuracy}%` }} data-oid="04c22au">
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Selected Cell Details */}
      {selectedCell &&
      <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700" data-oid="eak72iq">
          <div className="flex justify-between items-center mb-3" data-oid="6ae1.9s">
            <h4 className="font-semibold" data-oid="3u76nh1">
              {selectedCell.topic} - {selectedCell.difficulty} Questions
            </h4>
            <button
            onClick={() => setSelectedCell(null)}
            className="text-xs px-2 py-1 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600" data-oid="k3nw-be">

              Close
            </button>
          </div>
          
          <div className="space-y-2 max-h-[250px] overflow-y-auto" data-oid="o60z0hd">
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
            } data-oid="csttoe2">

                <div data-oid="s.d23.z">
                  <div className="font-medium text-sm flex items-center" data-oid="6bbkt_e">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                question.correct ?
                'bg-green-500 dark:bg-green-400' :
                'bg-red-500 dark:bg-red-400'}`
                } data-oid="874aa8n"></span>
                    {question.subtopic}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="qiu086y">
                    From {question.setType} • {question.setSubject}
                  </div>
                </div>
                <div className="text-right text-xs" data-oid="_j454gg">
                  {new Date(question.dateCompleted).toLocaleDateString()}
                </div>
              </div>
          )}
            
            {selectedQuestions.length === 0 &&
          <div className="py-6 text-center text-slate-500 dark:text-slate-400" data-oid="dn5fm9a">
                <p data-oid="t6nhrac">No questions available for this combination.</p>
              </div>
          }
          </div>
        </div>
      }
    </div>);

}