import React, { useState } from 'react';
import { mockPracticeSets } from '@/lib/mockData';
import { extractQuestionsWithMetadata } from './utils';

interface IndividualQuestionViewProps {
  questionId: string;
}

export const IndividualQuestionView = ({ questionId }: IndividualQuestionViewProps) => {
  // Always call hooks at the top level of the component - never conditional
  const [showMasteryTable, setShowMasteryTable] = useState(false);

  const questions = extractQuestionsWithMetadata(mockPracticeSets);
  const question = questions.find((q) => q.id === questionId);

  if (!question) {
    return <div data-oid="exawy60">Question not found</div>;
  }

  // Convert masteryLevel to a number or default to 1 if undefined or not a number
  const masteryLevelNumber = question.masteryLevel ?
  parseInt(question.masteryLevel as string, 10) || 1 :
  1;

  const masteryLevels = [
  { level: 1, description: 'Not Started', color: 'bg-slate-100 text-slate-700' },
  { level: 2, description: 'Familiar', color: 'bg-blue-100 text-blue-700' },
  { level: 3, description: 'Proficient', color: 'bg-green-100 text-green-700' },
  { level: 4, description: 'Mastered', color: 'bg-purple-100 text-purple-700' },
  { level: 5, description: 'Expert', color: 'bg-yellow-100 text-yellow-700' }];


  return (
    <div className="space-y-6" data-oid="fr8bc7a">
      {/* Question Header */}
      <div className="flex items-center justify-between" data-oid="-jxng:u">
        <div data-oid="o9p7qve">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white" data-oid="a1cfg4b">
            {question.topic}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400" data-oid="pxp0ph1">
            {question.subject} • {question.difficulty}
          </p>
        </div>
        <button
          onClick={() => setShowMasteryTable(!showMasteryTable)}
          className="px-3 py-1.5 text-sm font-medium rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700/70" data-oid="fg5upg:">

          Mastery Levels
        </button>
      </div>

      {/* Mastery Table */}
      {showMasteryTable &&
      <div className="bg-white rounded-lg border border-slate-200 dark:bg-slate-800 dark:border-slate-700 overflow-hidden" data-oid="rfl.rax">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700" data-oid="ta4k6lq">
            <thead className="bg-slate-50 dark:bg-slate-800/50" data-oid="xbqvrxw">
              <tr data-oid="no2.ec4">
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider" data-oid="7w.5yfp">
                  Level
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider" data-oid="xgw-1s3">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider" data-oid="eqb2z24">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700" data-oid="8t3_g79">
              {masteryLevels.map((level) =>
            <tr key={level.level} className={level.level === masteryLevelNumber ? 'bg-slate-50 dark:bg-slate-700/50' : ''} data-oid="2k56-:c">
                  <td className="px-4 py-3" data-oid="uqmbfb9">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${level.color} dark:bg-opacity-20`} data-oid="m25vu.-">
                      Level {level.level}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300" data-oid="haf1ehz">
                    {level.description}
                  </td>
                  <td className="px-4 py-3" data-oid="7hlk2k5">
                    {level.level === masteryLevelNumber ?
                <span className="text-green-600 dark:text-green-400 text-sm font-medium" data-oid="qb3b-z_">
                        Current Level
                      </span> :
                level.level < masteryLevelNumber ?
                <span className="text-slate-400 dark:text-slate-500 text-sm" data-oid="ab.0neq">
                        Completed
                      </span> :

                <span className="text-slate-400 dark:text-slate-500 text-sm" data-oid="pu6-.9k">
                        Locked
                      </span>
                }
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      }

      {/* Question Content */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 dark:bg-slate-800 dark:border-slate-700" data-oid="7g.obkc">
        <div className="space-y-4" data-oid="8.t6_zl">
          <div data-oid="tidzy20">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2" data-oid="9:-k-be">
              Your Answer
            </h3>
            <div className="p-3 bg-slate-50 rounded-md dark:bg-slate-700/50" data-oid="_-kmpi0">
              <p className="text-slate-900 dark:text-white" data-oid="n641.-w">
                {question.userAnswer}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700" data-oid="1z5kbzf">
            <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="9zdeld7">
              Attempts: {question.attempts}
            </div>
            <button
              className="px-4 py-2 text-sm font-medium rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800" data-oid="mq7-vyl">

              Reattempt Question
            </button>
          </div>
        </div>
      </div>
    </div>);

};