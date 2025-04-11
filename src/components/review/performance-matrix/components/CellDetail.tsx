'use client';

import React from 'react';
import { MatrixCell } from '../types';
import { getProgressBarColor, getTextColor } from '../utils/colorUtils';

interface CellDetailProps {
  data: MatrixCell | null;
  highlightedSetId: string | null;
  setHighlightedSetId: (setId: string | null) => void;
  onClose: () => void;
}

/**
 * Detailed view panel for a selected matrix cell
 */
export const CellDetail: React.FC<CellDetailProps> = ({
  data,
  highlightedSetId,
  setHighlightedSetId,
  onClose
}) => {
  if (!data) return null;

  // Group questions by set
  const questionsBySet = data.questions.reduce((acc, question) => {
    if (!acc[question.setId]) {
      acc[question.setId] = [];
    }
    acc[question.setId].push(question);
    return acc;
  }, {} as Record<string, typeof data.questions>);

  // Calculate set statistics
  const setStats = Object.entries(questionsBySet).map(([setId, questions]) => {
    const correctCount = questions.filter((q) => q.correct).length;
    const accuracy = Math.round(correctCount / questions.length * 100);
    const set = questions[0]; // Use first question to get set metadata

    return {
      setId,
      subject: set.subject,
      type: set.setType,
      dateCompleted: set.dateCompleted,
      questionCount: questions.length,
      correctCount,
      accuracy
    };
  }).sort((a, b) => new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime());

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-md" data-oid="qkj74zg">
      <div className="flex justify-between items-center mb-4" data-oid="2sgly-o">
        <h2 className="text-lg font-medium text-slate-800 dark:text-slate-200" data-oid="pd-7v:t">
          {data.topic} - {data.difficulty}
        </h2>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300" data-oid=":cu99qx">

          &times;
        </button>
      </div>
      
      <div className="mb-4" data-oid="rif3lk:">
        <div className="flex justify-between items-center mb-1" data-oid="vkaiojg">
          <span className="text-sm text-slate-600 dark:text-slate-400" data-oid="8vmuiln">Performance</span>
          <span className={`font-medium ${getTextColor(data.accuracy, data.count)}`} data-oid="g.8pb96">
            {data.accuracy}%
          </span>
        </div>
        
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2" data-oid="gicoc2.">
          <div
            className={`h-2 rounded-full ${getProgressBarColor(data.accuracy)}`}
            style={{ width: `${data.accuracy}%` }} data-oid="6vdrmzv">
          </div>
        </div>
        
        <div className="flex justify-between mt-1 text-xs text-slate-500 dark:text-slate-400" data-oid="1g454-2">
          <span data-oid="htncqm6">{data.correctCount} correct</span>
          <span data-oid="daaod_2">{data.count} total</span>
        </div>
      </div>
      
      <div className="mb-4" data-oid="3sqojvm">
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" data-oid="0xwbxx8">
          Sets ({setStats.length})
        </h3>
        
        <div className="overflow-y-auto max-h-64 border border-slate-200 dark:border-slate-700 rounded-md" data-oid="k46f5yg">
          <table className="min-w-full" data-oid="n:mdy9:">
            <thead className="bg-slate-50 dark:bg-slate-800 sticky top-0" data-oid="s3kdnb8">
              <tr data-oid="ijdqm.l">
                <th className="py-2 px-3 text-xs font-medium text-slate-500 dark:text-slate-400 text-left" data-oid="rvy3oov">
                  Subject
                </th>
                <th className="py-2 px-3 text-xs font-medium text-slate-500 dark:text-slate-400 text-left" data-oid=".thp-8d">
                  Date
                </th>
                <th className="py-2 px-3 text-xs font-medium text-slate-500 dark:text-slate-400 text-left" data-oid="irlnqkr">
                  Questions
                </th>
                <th className="py-2 px-3 text-xs font-medium text-slate-500 dark:text-slate-400 text-left" data-oid=".8h12og">
                  Accuracy
                </th>
              </tr>
            </thead>
            
            <tbody data-oid="ytuk25j">
              {setStats.map((set) =>
              <tr
                key={set.setId}
                className={`
                    border-t border-slate-200 dark:border-slate-700 cursor-pointer
                    ${highlightedSetId === set.setId ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}
                    hover:bg-slate-50 dark:hover:bg-slate-800
                  `}
                onMouseEnter={() => setHighlightedSetId(set.setId)}
                onMouseLeave={() => setHighlightedSetId(null)} data-oid="uqgme4d">

                  <td className="py-2 px-3 text-sm text-slate-700 dark:text-slate-300" data-oid="0ehbmch">
                    {set.subject}
                  </td>
                  <td className="py-2 px-3 text-sm text-slate-700 dark:text-slate-300 whitespace-nowrap" data-oid="nvme.g:">
                    {new Date(set.dateCompleted).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-3 text-sm text-slate-700 dark:text-slate-300" data-oid="u_.r7r:">
                    {set.correctCount}/{set.questionCount}
                  </td>
                  <td className="py-2 px-3 text-sm" data-oid="4fjqejk">
                    <span className={getTextColor(set.accuracy, set.questionCount)} data-oid="f4mr09k">
                      {set.accuracy}%
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div data-oid="p.to58x">
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" data-oid="rf3ezoe">
          Questions ({data.questions.length})
        </h3>
        
        <div className="overflow-y-auto max-h-48 text-sm text-slate-600 dark:text-slate-400" data-oid="k53xb1b">
          <ul className="space-y-1" data-oid="zswkee_">
            {data.questions.map((question, index) =>
            <li
              key={index}
              className={`
                  py-1.5 px-3 rounded-md border border-slate-200 dark:border-slate-700
                  ${highlightedSetId === question.setId ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}
                `} data-oid="75:4:-:">

                <div className="flex justify-between" data-oid="cejq42_">
                  <span
                  className={question.correct ? 'text-green-600 dark:text-green-400' : 'text-rose-600 dark:text-rose-400'} data-oid="h7:dgs-">

                    {question.correct ? '✓' : '✗'}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-500" data-oid="21cn-m.">
                    #{question.id}
                  </span>
                </div>
                <div className="mt-0.5" data-oid="odk89s:">
                  {`${question.topic} (${question.subtopic}) - ${question.difficulty}`}
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>);

};