'use client';

import React, { useState, useEffect } from 'react';
import { QuestionViewProps } from './types';
import { Question } from '@/lib/mockData';
import { getDataWithFallback } from '@/lib/dataUtils';
import { SwordIcon } from '@/components/icons/SwordIcon';

/**
 * EnhancedKanbanView - An animated, collapsible Kanban view
 * Displays questions organized by mastery level with expanding/collapsing stacked boards
 */
export function EnhancedKanbanView({
  practiceSets,
  onSelectSet,
  selectedSetId
}: QuestionViewProps) {
  const data = getDataWithFallback(practiceSets);

  // Extract all questions from all practice sets
  const allQuestions = React.useMemo(() => {
    const questions: (Question & {setId: string;setSubject: string;})[] = [];

    data.forEach((set) => {
      set.questions.forEach((q: Question) => {
        questions.push({
          ...q,
          setId: set.id,
          setSubject: set.subject
        });
      });
    });

    return questions;
  }, [data]);

  // Define mastery levels and their criteria
  const masteryLevels = [
  {
    id: 'very-weak',
    name: 'Very Weak',
    description: '2x+ incorrect',
    color: 'bg-red-100 dark:bg-red-900/20 border-red-300 dark:border-red-700',
    titleColor: 'text-red-800 dark:text-red-400',
    textColor: 'text-red-600 dark:text-red-400',
    headerBg: 'bg-gradient-to-r from-red-600 to-red-500',
    iconColor: '#ef4444',
    match: (q: Question) => q.answered && !q.correct && Math.random() < 0.3 // Simulating 3x incorrect
  },
  {
    id: 'weak',
    name: 'Weak',
    description: '1x incorrect',
    color: 'bg-orange-100 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700',
    titleColor: 'text-orange-800 dark:text-orange-400',
    textColor: 'text-orange-600 dark:text-orange-400',
    headerBg: 'bg-gradient-to-r from-orange-600 to-orange-500',
    iconColor: '#f97316',
    match: (q: Question) => q.answered && !q.correct && Math.random() < 0.5 && Math.random() >= 0.3 // Simulating 2x incorrect
  },
  {
    id: 'not-attempted',
    name: 'Not Attempted',
    description: '0x attempted',
    color: 'bg-gray-100 dark:bg-gray-800/40 border-gray-300 dark:border-gray-700',
    titleColor: 'text-gray-800 dark:text-gray-400',
    textColor: 'text-gray-600 dark:text-gray-400',
    headerBg: 'bg-gradient-to-r from-gray-600 to-gray-500',
    iconColor: '#6b7280',
    match: (q: Question) => !q.answered
  },
  {
    id: 'emerging',
    name: 'Emerging',
    description: '1x correct',
    color: 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700',
    titleColor: 'text-yellow-800 dark:text-yellow-400',
    textColor: 'text-yellow-600 dark:text-yellow-400',
    headerBg: 'bg-gradient-to-r from-yellow-600 to-yellow-500',
    iconColor: '#eab308',
    match: (q: Question) => q.answered && q.correct && Math.random() < 0.3 // Simulating 1x correct
  },
  {
    id: 'proficient',
    name: 'Proficient',
    description: '2x correct',
    color: 'bg-blue-100 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700',
    titleColor: 'text-blue-800 dark:text-blue-400',
    textColor: 'text-blue-600 dark:text-blue-400',
    headerBg: 'bg-gradient-to-r from-blue-600 to-blue-500',
    iconColor: '#3b82f6',
    match: (q: Question) => q.answered && q.correct && Math.random() < 0.5 && Math.random() >= 0.3 // Simulating 2x correct
  },
  {
    id: 'mastered',
    name: 'Mastered',
    description: '3x+ correct',
    color: 'bg-green-100 dark:bg-green-900/20 border-green-300 dark:border-green-700',
    titleColor: 'text-green-800 dark:text-green-400',
    textColor: 'text-green-600 dark:text-green-400',
    headerBg: 'bg-gradient-to-r from-green-600 to-green-500',
    iconColor: '#22c55e',
    match: (q: Question) => q.answered && q.correct && Math.random() >= 0.5 // Simulating 3x+ correct
  }];


  // Group questions by mastery level
  const questionsByLevel = React.useMemo(() => {
    const grouped: Record<string, (Question & {setId: string;setSubject: string;})[]> = {};

    // Initialize empty arrays for each mastery level
    masteryLevels.forEach((level) => {
      grouped[level.id] = [];
    });

    // Generate a deterministic "mastery score" for each question based on its ID
    // This ensures consistent categorization without relying on Math.random()
    const getMasteryScore = (questionId: string): number => {
      // Use hash-like approach to convert ID to a numeric value
      const hashValue = questionId.split('').reduce((acc, char) => {
        return acc + char.charCodeAt(0);
      }, 0);

      // Return a value between 0 and 1 based on hash
      return hashValue % 100 / 100;
    };

    // Distribute questions to appropriate levels with a more balanced distribution
    // to ensure data appears in all columns
    allQuestions.forEach((question) => {
      const masteryScore = getMasteryScore(question.id);

      // For testing and demo purposes, create a more balanced distribution
      // that ensures all categories have items, especially "proficient" and "mastered"
      if (!question.answered) {
        // Not attempted
        grouped['not-attempted'].push(question);
      } else if (question.correct) {
        // Use a different distribution that ensures more questions in proficient and mastered
        if (masteryScore < 0.2) {
          // Emerging (1x correct) - 20%
          grouped['emerging'].push(question);
        } else if (masteryScore < 0.5) {
          // Proficient (2x correct) - 30%
          grouped['proficient'].push(question);
        } else {
          // Mastered (3x+ correct) - 50%
          grouped['mastered'].push(question);
        }
      } else {
        // Incorrect
        if (masteryScore < 0.5) {
          // Very weak (3x+ incorrect)
          grouped['very-weak'].push(question);
        } else {
          // Weak (2x incorrect)
          grouped['weak'].push(question);
        }
      }

      // Create some duplicate entries to ensure we have data in all categories
      // This is just for demo purposes
      const dupMasteryScore = (masteryScore + 0.3) % 1;
      if (dupMasteryScore < 0.3) {
        // Create a clone of the question to avoid reference issues
        const questionClone = { ...question, id: question.id + '-dup' };
        grouped['proficient'].push(questionClone);
      } else if (dupMasteryScore < 0.6) {
        const questionClone = { ...question, id: question.id + '-dup' };
        grouped['mastered'].push(questionClone);
      }
    });

    return grouped;
  }, [allQuestions, masteryLevels]);

  // Function to get subject-specific icon or color
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Math':
        return 'bg-emerald-500 dark:bg-emerald-600';
      case 'Reading':
        return 'bg-sky-500 dark:bg-sky-600';
      case 'Writing':
        return 'bg-purple-500 dark:bg-purple-600';
      default:
        return 'bg-gray-500 dark:bg-gray-600';
    }
  };

  // State to track expanded boards
  const [expandedBoards, setExpandedBoards] = useState<string[]>([]);

  // Toggle board expansion
  const toggleBoardExpansion = (levelId: string) => {
    if (expandedBoards.includes(levelId)) {
      setExpandedBoards(expandedBoards.filter((id) => id !== levelId));
    } else {
      setExpandedBoards([...expandedBoards, levelId]);
    }
  };

  return (
    <div className="pb-8 px-4" data-oid="jwl0k2u">
      <div className="text-center mb-6" data-oid="odee0s_">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2" data-oid="tal2xw0">
          Mastery Progress Board
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto" data-oid="lyt09c_">
          Track your questions by mastery level. Click on a column to expand and see all items.
        </p>
      </div>
      
      {/* Kanban board layout with collapsible boards */}
      <div className="w-full h-full" data-oid="b3obvyh">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 pb-4" data-oid=".3et5l2">
          {masteryLevels.map((level) => {
            const isExpanded = expandedBoards.includes(level.id);
            const questionCount = questionsByLevel[level.id].length;

            return (
              <div
                key={level.id}
                className={`flex flex-col transition-all duration-300 ${
                isExpanded ? 'md:col-span-3 lg:col-span-2' : ''}`
                } data-oid="4jxxkp_">

                {/* Board header */}
                <div
                  className={`${level.headerBg} text-white rounded-t-lg shadow-md cursor-pointer transition-all duration-300 p-4 flex items-center justify-between`}
                  onClick={() => toggleBoardExpansion(level.id)} data-oid="im5:6wp">

                  <div className="flex items-center gap-3" data-oid="gvefr71">
                    <div className="bg-white/20 p-2 rounded-lg" data-oid="5_xjjyd">
                      <SwordIcon size={16} color="white" data-oid="of0lsfe" />
                    </div>
                    <div data-oid="1iq_:cp">
                      <h3 className="font-semibold text-white" data-oid="8s:2st8">{level.name}</h3>
                      <div className="text-xs text-white/80" data-oid="qqs.b6s">{level.description}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2" data-oid="h029bcn">
                    <span className="inline-flex items-center justify-center w-7 h-7 text-xs bg-white/20 text-white font-semibold rounded-full" data-oid="9zeykzx">
                      {questionCount}
                    </span>
                    <button className="text-white/80 hover:text-white transition-colors" data-oid="j::5wbr">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'transform rotate-180' : ''}`}
                        viewBox="0 0 20 20"
                        fill="currentColor" data-oid="ne_1yie">

                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" data-oid="hfh6_87" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Board content */}
                <div className={`overflow-hidden transition-all duration-300 ${
                isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-48 opacity-90'}`
                } data-oid="q7nx.dd">
                  <div className={`${level.color} rounded-b-lg p-4 shadow-md border-b border-l border-r border-slate-200 dark:border-slate-700`} data-oid="kpqjz6v">
                    <div className={`grid ${isExpanded ? 'grid-cols-1' : 'grid-cols-1'} gap-3`} data-oid="ollw.:x">
                      {/* Preview cards */}
                      {!isExpanded ?
                      // Stacked view (collapsed)
                      <div className="relative h-40" data-oid="lpcx8yr">
                          {questionsByLevel[level.id].slice(0, 3).map((question, index) =>
                        <div
                          key={question.id}
                          className={`absolute left-0 right-0 bg-white dark:bg-slate-800 p-3 rounded-lg shadow border border-slate-200 dark:border-slate-700 transition-all ${
                          questionsByLevel[level.id].length > 0 ? 'opacity-100' : 'opacity-0'}`
                          }
                          style={{
                            top: `${index * 5}px`,
                            zIndex: 10 - index,
                            transform: `scale(${1 - index * 0.05})`,
                            transformOrigin: 'top center'
                          }} data-oid="s_ks_lz">

                              <div className="flex items-center gap-2 mb-2" data-oid="7u:e2ke">
                                <div className={`w-2 h-2 rounded-full ${getSubjectColor(question.setSubject)}`} data-oid="bco7kwg"></div>
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate" data-oid="1f6gz7v">{question.setSubject}</span>
                              </div>
                              
                              <div className="font-medium text-sm mb-2 text-slate-800 dark:text-slate-200 truncate" data-oid="cwsd6qh">
                                {question.topic}
                              </div>
                              
                              {index === 0 &&
                          <>
                                  <div className="text-xs text-slate-600 dark:text-slate-400 truncate" data-oid="nqrxp0r">
                                    {question.subtopic}
                                  </div>
                                  
                                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 dark:border-slate-700" data-oid="u.xozrw">
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              question.difficulty === 'Easy' ?
                              'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                              question.difficulty === 'Medium' ?
                              'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                              'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'}`
                              } data-oid=".jbepyj">
                                      {question.difficulty}
                                    </span>
                                    
                                    <span className="text-xs text-slate-500 dark:text-slate-400" data-oid="8o::dx7">
                                      {Math.floor(question.timeSpent / 60)}:{String(question.timeSpent % 60).padStart(2, '0')}
                                    </span>
                                  </div>
                                </>
                          }
                            </div>
                        )}
                          
                          {questionCount > 3 &&
                        <div className="absolute bottom-0 left-0 right-0 text-center text-sm font-medium text-slate-500 dark:text-slate-400" data-oid="w61lu7_">
                              +{questionCount - 3} more items
                            </div>
                        }
                          
                          {/* Empty state */}
                          {questionCount === 0 &&
                        <div className="flex flex-col items-center justify-center h-32 text-center" data-oid="ornh3jd">
                              <div className="text-slate-400 dark:text-slate-500 mb-2" data-oid="-5etz4-">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="4fdyqqr">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-oid="48si-nw" />
                                </svg>
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="dfzq0pu">No questions in this category</div>
                            </div>
                        }
                        </div> :

                      // Expanded view
                      <div className="space-y-3 max-h-[700px] overflow-y-auto p-1" data-oid="pko.mxq">
                          {/* Animation delays for staggered appearance */}
                          {questionsByLevel[level.id].map((question, index) =>
                        <div
                          key={question.id}
                          onClick={() => onSelectSet && onSelectSet(question.setId)}
                          className={`bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border border-slate-200 dark:border-slate-700 ${
                          selectedSetId === question.setId ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : ''} deal-card stagger-${
                          Math.min(index, 8)}`} data-oid="f1ues98">

                              <div className="flex items-center gap-2 mb-2" data-oid="v67r6ml">
                                <div className={`w-2 h-2 rounded-full ${getSubjectColor(question.setSubject)}`} data-oid="1y-ctv5"></div>
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400" data-oid="b6172hv">{question.setSubject}</span>
                              </div>
                              
                              <div className="font-medium text-sm mb-2 text-slate-800 dark:text-slate-200" data-oid="ze9hozp">
                                {question.topic}
                              </div>
                              
                              <div className="text-xs text-slate-600 dark:text-slate-400" data-oid="t_:irr3">
                                {question.subtopic}
                              </div>
                              
                              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 dark:border-slate-700" data-oid="bil:u4h">
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            question.difficulty === 'Easy' ?
                            'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                            question.difficulty === 'Medium' ?
                            'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                            'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'}`
                            } data-oid="kd4dblr">
                                  {question.difficulty}
                                </span>
                                
                                <span className="text-xs text-slate-500 dark:text-slate-400" data-oid="4v95u8h">
                                  {Math.floor(question.timeSpent / 60)}:{String(question.timeSpent % 60).padStart(2, '0')}
                                </span>
                              </div>
                            </div>
                        )}
                          
                          {/* Empty state */}
                          {questionsByLevel[level.id].length === 0 &&
                        <div className="flex flex-col items-center justify-center h-32 text-center" data-oid="x:qwzpd">
                              <div className="text-slate-400 dark:text-slate-500 mb-2" data-oid="kj80cy2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="ncsr9nx">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-oid="h0580it" />
                                </svg>
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="-:4-zde">No questions in this category</div>
                            </div>
                        }
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>);

          })}
        </div>
      </div>
    </div>);

}