'use client';

import React, { useState, useMemo } from 'react';
import { QuestionViewProps } from '../../question-view-variants/types';
import { useMatrixData } from '../hooks/useMatrixData';
import { PerformanceFilters } from './PerformanceFilters';
import { SubjectFilter } from './SubjectFilter';
import { QuestionWithMetadata } from '../../question-view/types';
import { MatrixRowComponent } from './MatrixRow';
import { TableHeader } from './TableHeader';
import { getTextColor } from '../utils/dataUtils';
import { GridRow, TopicTotal } from '../types';
import { isTopicInSubject } from '../utils/filterUtils';
import { SwordIcon } from '@/components/icons/SwordIcon';

/**
 * Enhanced Matrix Grid View - Modularized version
 * Organizes questions in a 2D grid by topic (rows) and difficulty (columns)
 * Features:
 * - In-grid filtering capabilities
 * - Challenge icon to improve mastery level
 * - Expandable subcategories 
 * - Even distribution of data across mastery levels
 */
export function EnhancedMatrixGrid(props: QuestionViewProps) {
  // State for challenge modal
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<{topic: string;difficulty: string;} | null>(null);
  // Define mastery levels for column organization
  const masteryLevels = [
  'Very Weak',
  'Weak',
  'Not Attempted',
  'Emerging',
  'Proficient',
  'Mastered'];


  // Handle challenge clicks
  const handleChallengeClick = (topic: string, difficulty: string) => {
    setSelectedChallenge({ topic, difficulty });
    setShowChallengeModal(true);
  };

  // Close challenge modal
  const closeModal = () => {
    setShowChallengeModal(false);
    setSelectedChallenge(null);
  };

  // Start challenge
  const startChallenge = () => {
    // Implementation would connect to actual challenge functionality
    alert(`Starting challenge for ${selectedChallenge?.topic} at ${selectedChallenge?.difficulty} level`);
    closeModal();
  };

  const {
    // Data
    subjects,
    allTopics,
    topics,
    difficulties,
    grid,
    topicTotals,
    difficultyTotals,
    grandTotal,

    // State
    filterSubject,
    setFilterSubject,
    filterDifficulties,
    filterTopics,
    filterPerformance,
    setFilterPerformance,
    topicSearchInput,
    setTopicSearchInput,
    showTopicFilter,
    setShowTopicFilter,
    selectedCell,
    highlightedSetId,

    // Actions
    handleCellClick,
    toggleDifficultyFilter,
    toggleTopicFilter,
    resetFilters,
    activeFilterCount
  } = useMatrixData(props);

  // No subcategories in General View, as per requirement
  const topicsWithSubcategories: {
    parent: GridRow;
    children: GridRow[];
    totalForParent: TopicTotal;
    totalsForChildren: TopicTotal[];
  }[] = React.useMemo(() => {
    // Return empty array - no subcategories
    return [];
  }, []);

  // All topics are standalone (no subcategories)
  const standaloneTopics = React.useMemo(() => {
    // Apply subject filter
    const filtered = filterSubject ?
    grid.filter((row) => isTopicInSubject(row.topic, filterSubject)) :
    grid;

    return filtered;
  }, [grid, filterSubject]);

  // Extract all questions from all sets for the "All Topics" row
  const filteredQuestions = useMemo(() => {
    let allQuestions: QuestionWithMetadata[] = [];
    props.practiceSets?.forEach((set) => {
      if (set.questions) {
        // Create a derived title from the set's properties
        const setTitle = `${set.subject} ${set.type} (${set.id})`;

        // Properly map each question to include all required QuestionWithMetadata fields
        const questionsWithMetadata = set.questions.map((q) => ({
          ...q,
          setId: set.id,
          setTitle: setTitle,
          subject: set.subject,
          dateCompleted: set.dateCompleted,
          setType: set.type
        })) as QuestionWithMetadata[];

        allQuestions = [...allQuestions, ...questionsWithMetadata];
      }
    });
    return allQuestions;
  }, [props.practiceSets]);

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl py-4 px-0 shadow-sm" data-oid="ebv08rz">
      {/* Title Section */}
      <div className="text-center mb-8 px-0" data-oid="f:hk6:l">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2" data-oid="bxcy:tj">
          Skill Mastery Progression
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto" data-oid="_2u_qkf">
          Track your journey from novice to expert across all concepts, visualizing your growth and identifying areas for improvement
        </p>
      </div>
      
      {/* Enhanced Challenge Modal */}
      {showChallengeModal && selectedChallenge &&
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 modal-backdrop-enter" data-oid="w9_y:6c">
          <div className="bg-white dark:bg-slate-800 p-0 rounded-lg shadow-xl max-w-md w-full overflow-hidden modal-enter" data-oid="7v5uqv4">
            {/* Decorative header */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-4 relative" data-oid="8w4w:sb">
              <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBoLTQweiIgb3BhY2l0eT0iLjA1Ii8+PHBhdGggZD0iTTIwIDIwaDIwdjIwaC0yMHoiIG9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTAgMjBoMjB2MjBoLTIweiIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')]" data-oid="1cy4x95"></div>
              <div className="flex items-center gap-3" data-oid="j08xa1i">
                <div className="p-2 bg-white/20 rounded-lg" data-oid="ax12yk9">
                  <SwordIcon size={24} color="white" className="sword-pulse" data-oid="jngmi-p" />
                </div>
                <div data-oid="vk1f:iu">
                  <h3 className="text-xl font-bold text-white" data-oid="uq6aaba">Mastery Challenge</h3>
                  <p className="text-blue-100 text-sm" data-oid="vw_m48q">{selectedChallenge.topic}</p>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6" data-oid="lt-wmh.">
              <div className="mb-6" data-oid="5uw9wg.">
                <div className="flex justify-between mb-1" data-oid="ear46w8">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300" data-oid="f59up:8">Current Level: {selectedChallenge.difficulty}</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300" data-oid="2o9k_-9">Next Level</span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 rounded-full dark:bg-gray-700" data-oid="8x_f:ca">
                  <div className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500" style={{ width: "45%" }} data-oid="ojbip-t"></div>
                </div>
                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 text-right" data-oid="i8h1u_m">250 XP needed</div>
              </div>
              
              <div className="mb-6 p-4 bg-indigo-50 dark:bg-slate-700/30 rounded-lg" data-oid="x:6q6em">
                <h4 className="text-md font-semibold text-indigo-700 dark:text-indigo-300 mb-2" data-oid="udt7d71">Challenge Benefits:</h4>
                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2" data-oid="5uoab:p">
                  <li className="flex items-center gap-2" data-oid="9h8pv4_">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor" data-oid="j0rp:1n">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" data-oid="xyb-ir-" />
                    </svg>
                    <span data-oid="ek_nvq3">Gain 75-100 XP based on performance</span>
                  </li>
                  <li className="flex items-center gap-2" data-oid="qpon7qf">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor" data-oid="isvmhcu">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" data-oid="qq:o5nu" />
                    </svg>
                    <span data-oid="u-ewasx">Upgrade your mastery level more quickly</span>
                  </li>
                  <li className="flex items-center gap-2" data-oid="ru97xdz">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor" data-oid="l3rlsw9">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" data-oid="0nwhntt" />
                    </svg>
                    <span data-oid="w7-.nar">Practice similar questions for better retention</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6" data-oid="m4q4ea:">
                Ready to strengthen your knowledge of <span className="font-semibold text-indigo-600 dark:text-indigo-400" data-oid="h0jwu-n">{selectedChallenge.topic}</span> at the <span className="font-semibold" data-oid="q19ke2.">{selectedChallenge.difficulty}</span> level?
              </p>
              
              <div className="flex justify-end gap-3" data-oid="xv9nrnh">
                <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-medium" data-oid="y51txl5">

                  Decline
                </button>
                <button
                onClick={startChallenge}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium transition-colors flex items-center gap-2" data-oid=":-wk4-n">

                  <SwordIcon size={16} className="text-white" data-oid="._r6knb" />
                  Accept Challenge
                </button>
              </div>
            </div>
          </div>
        </div>
      }
      
      {/* Mastery Level Legend */}
      <div className="grid grid-cols-6 gap-2 mb-6 sticky top-[calc(var(--navbar-height,4.75rem)+10rem)] z-30 bg-white dark:bg-slate-900 py-2 px-0 border-b dark:border-slate-700 w-full" data-oid="07q4vf:">
        <div className="text-center" data-oid="91aau38">
          <div className="inline-flex flex-col items-center" data-oid="igcu-kp">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500 mb-1" data-oid="_r2r9wc"></span>
            <span className="text-xs" data-oid="4f6ck0m">Very Weak (2x)</span>
          </div>
        </div>
        <div className="text-center" data-oid=":kwqeye">
          <div className="inline-flex flex-col items-center" data-oid="-m982g2">
            <span className="inline-block w-3 h-3 rounded-full bg-orange-500 mb-1" data-oid="17r_xi_"></span>
            <span className="text-xs" data-oid="qapo_lk">Weak (1x)</span>
          </div>
        </div>
        <div className="text-center" data-oid="v10_svl">
          <div className="inline-flex flex-col items-center" data-oid="9s-jvm3">
            <span className="inline-block w-3 h-3 rounded-full bg-gray-400 mb-1" data-oid="kv76rcq"></span>
            <span className="text-xs" data-oid="bhnq9iz">Not Attempted</span>
          </div>
        </div>
        <div className="text-center" data-oid="akl91j4">
          <div className="inline-flex flex-col items-center" data-oid="jn8fiup">
            <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mb-1" data-oid="u:bh:0z"></span>
            <span className="text-xs" data-oid="z17db13">Emerging (1x correct)</span>
          </div>
        </div>
        <div className="text-center" data-oid="sd0j-l.">
          <div className="inline-flex flex-col items-center" data-oid="ck8y9su">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mb-1" data-oid="o9dtodw"></span>
            <span className="text-xs" data-oid="xtsedzi">Proficient (2x correct)</span>
          </div>
        </div>
        <div className="text-center" data-oid="p.wpfaz">
          <div className="inline-flex flex-col items-center" data-oid="1he3aoc">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500 mb-1" data-oid="areg8w5"></span>
            <span className="text-xs" data-oid="etjwhyz">Mastered (3x+ correct)</span>
          </div>
        </div>
      </div>
      
      {/* Matrix Grid */}
      <div className="overflow-x-auto mb-6" data-oid="pbnjwvm">
        <table className="w-full border-collapse" data-oid="v52w8lw">
          <thead data-oid="9h.zund">
            <TableHeader
              difficultyTotals={difficultyTotals}
              grandTotal={grandTotal}
              difficulties={difficulties}
              filterDifficulties={filterDifficulties}
              toggleDifficultyFilter={toggleDifficultyFilter}
              allTopics={allTopics}
              filterTopics={filterTopics}
              toggleTopicFilter={toggleTopicFilter}
              topicSearchInput={topicSearchInput}
              setTopicSearchInput={setTopicSearchInput}
              showTopicFilter={showTopicFilter}
              setShowTopicFilter={setShowTopicFilter} data-oid="88:fl1p" />

          </thead>
          
          <tbody data-oid="cdbqrb2">
            {/* Render topics with subcategories */}
            {topicsWithSubcategories.map(({ parent, children, totalForParent, totalsForChildren }) =>
            <MatrixRowComponent
              key={parent.topic}
              row={parent}
              topicTotal={totalForParent}
              selectedCell={selectedCell}
              highlightedSetId={highlightedSetId}
              handleCellClick={handleCellClick}
              handleChallengeClick={handleChallengeClick}
              hasSubCategories={true}
              subCategories={children}
              subCategoryTotals={totalsForChildren} data-oid=".lj00:p" />

            )}
            
            {/* Render standalone topics */}
            {standaloneTopics.map((row) =>
            <MatrixRowComponent
              key={row.topic}
              row={row}
              topicTotal={topicTotals.find((t) => t.topic === row.topic) || {
                topic: row.topic,
                count: 0,
                correctCount: 0,
                accuracy: 0
              }}
              selectedCell={selectedCell}
              highlightedSetId={highlightedSetId}
              handleCellClick={handleCellClick}
              handleChallengeClick={handleChallengeClick} data-oid="ha1jrnv" />

            )}
            
            {/* Grand Total Row */}
            <tr data-oid="ijs38r9">
              <td className="p-3 text-sm font-medium border-b dark:border-slate-700 bg-slate-100 dark:bg-slate-800" data-oid="h:1pocg">
                All Topics
              </td>
              
              <td className="p-3 text-sm font-medium border-b dark:border-slate-700 bg-slate-100 dark:bg-slate-800" data-oid="l:wxc7d">
                <div className="flex flex-col" data-oid="1xanrr2">
                  <span data-oid="s.l6g:g">All Tags & Subtopics</span>
                  <div className="mt-1 flex flex-wrap gap-1" data-oid="vr07oy:">
                    {/* Get unique subtopics as string and display up to 3 */}
                    {Array.from(new Set(filteredQuestions.
                    map((q) => q.subtopic ? [q.subtopic] : []).
                    flat()
                    )).filter(Boolean).slice(0, 3).map((tag, i) =>
                    <span
                      key={`all-tag-${i}`}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300" data-oid="u17som6">

                        {tag}
                      </span>
                    )}
                    {/* Show count of additional tags if more than 3 */}
                    {filteredQuestions.
                    map((q) => q.subtopic ? [q.subtopic] : []).
                    flat().
                    filter(Boolean).length > 3 &&
                    <span className="text-xs text-slate-500 dark:text-slate-400" data-oid="_hr68:-">
                        +{filteredQuestions.
                      map((q) => q.subtopic ? [q.subtopic] : []).
                      flat().
                      filter(Boolean).length - 3} more
                      </span>
                    }
                  </div>
                </div>
              </td>
              
              {/* Ensure we're using masteryLevels consistent with the rest of the app */}
              {masteryLevels.map((level) => {
                // Find matching difficulty total or create default
                const total = difficultyTotals.find((t) => t.difficulty === level) || {
                  difficulty: level,
                  count: 0,
                  correctCount: 0,
                  accuracy: 0
                };

                return (
                  <td
                    key={`total-${level}`}
                    className="p-3 text-center border-b dark:border-slate-700 bg-slate-100 dark:bg-slate-800" data-oid="q--cxom">

                    <div className={`text-lg font-bold ${getTextColor(total.accuracy, total.count)}`} data-oid="y0077ad">
                      {total.accuracy}%
                    </div>
                    
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-1 rounded-full overflow-hidden" data-oid=".tnun7e">
                      <div
                        className={`h-full rounded-full ${
                        total.accuracy >= 80 ? 'bg-emerald-500 dark:bg-emerald-400' :
                        total.accuracy >= 60 ? 'bg-amber-500 dark:bg-amber-400' :
                        'bg-rose-500 dark:bg-rose-400'}`
                        }
                        style={{ width: `${total.accuracy}%` }} data-oid="drg13k5">
                      </div>
                    </div>
                  </td>);

              })}
              
              <td className="p-3 text-center border-b dark:border-slate-700 bg-slate-100 dark:bg-slate-800" data-oid="wp_t2c9">
                <div className={`text-lg font-bold ${getTextColor(grandTotal.accuracy, grandTotal.count)}`} data-oid="-po.9mi">
                  {grandTotal.accuracy}%
                </div>
                
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-1 rounded-full overflow-hidden" data-oid="-3yw-gg">
                  <div
                    className={`h-full rounded-full ${
                    grandTotal.accuracy >= 80 ? 'bg-emerald-500 dark:bg-emerald-400' :
                    grandTotal.accuracy >= 60 ? 'bg-amber-500 dark:bg-amber-400' :
                    'bg-rose-500 dark:bg-rose-400'}`
                    }
                    style={{ width: `${grandTotal.accuracy}%` }} data-oid="e9diogg">
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>);

}