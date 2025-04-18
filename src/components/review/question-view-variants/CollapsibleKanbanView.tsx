'use client';

import React, { useState, useMemo } from 'react';
import { QuestionViewProps } from './types';
import { Question } from '@/lib/mockData';
import { getDataWithFallback } from '@/lib/dataUtils';
import { SwordIcon } from '@/components/icons/SwordIcon';

/**
 * CollapsibleKanbanView - Displays questions in a Kanban board style layout with collapsible columns
 * Organizes questions by mastery level into columns that can be expanded/collapsed
 */
export function CollapsibleKanbanView({
  practiceSets,
  onSelectSet,
  selectedSetId
}: QuestionViewProps) {
  // Use data with fallback
  const data = getDataWithFallback(practiceSets);

  // Extract all questions from all practice sets
  const allQuestions = useMemo(() => {
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
    color: 'bg-red-100 dark:bg-red-900/20',
    borderColor: 'border-red-300 dark:border-red-700',
    titleColor: 'text-red-800 dark:text-red-400',
    headerBg: 'bg-red-50 dark:bg-red-900/10',
    iconBg: 'bg-red-500',
    match: (q: Question) => q.answered && !q.correct && Math.random() < 0.3 // Simulating 3x incorrect
  },
  {
    id: 'weak',
    name: 'Weak',
    description: '1x incorrect',
    color: 'bg-orange-100 dark:bg-orange-900/20',
    borderColor: 'border-orange-300 dark:border-orange-700',
    titleColor: 'text-orange-800 dark:text-orange-400',
    headerBg: 'bg-orange-50 dark:bg-orange-900/10',
    iconBg: 'bg-orange-500',
    match: (q: Question) => q.answered && !q.correct && Math.random() < 0.5 && Math.random() >= 0.3 // Simulating 2x incorrect
  },
  {
    id: 'not-attempted',
    name: 'Not Attempted',
    description: '0x attempted',
    color: 'bg-gray-100 dark:bg-gray-800/40',
    borderColor: 'border-gray-300 dark:border-gray-700',
    titleColor: 'text-gray-800 dark:text-gray-400',
    headerBg: 'bg-gray-50 dark:bg-gray-800/20',
    iconBg: 'bg-gray-500',
    match: (q: Question) => !q.answered
  },
  {
    id: 'emerging',
    name: 'Emerging',
    description: '1x correct',
    color: 'bg-yellow-100 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-300 dark:border-yellow-700',
    titleColor: 'text-yellow-800 dark:text-yellow-400',
    headerBg: 'bg-yellow-50 dark:bg-yellow-900/10',
    iconBg: 'bg-yellow-500',
    match: (q: Question) => q.answered && q.correct && Math.random() < 0.3 // Simulating 1x correct
  },
  {
    id: 'proficient',
    name: 'Proficient',
    description: '2x correct',
    color: 'bg-blue-100 dark:bg-blue-900/20',
    borderColor: 'border-blue-300 dark:border-blue-700',
    titleColor: 'text-blue-800 dark:text-blue-400',
    headerBg: 'bg-blue-50 dark:bg-blue-900/10',
    iconBg: 'bg-blue-500',
    match: (q: Question) => q.answered && q.correct && Math.random() < 0.5 && Math.random() >= 0.3 // Simulating 2x correct
  },
  {
    id: 'mastered',
    name: 'Mastered',
    description: '3x+ correct',
    color: 'bg-green-100 dark:bg-green-900/20',
    borderColor: 'border-green-300 dark:border-green-700',
    titleColor: 'text-green-800 dark:text-green-400',
    headerBg: 'bg-green-50 dark:bg-green-900/10',
    iconBg: 'bg-green-500',
    match: (q: Question) => q.answered && q.correct && Math.random() >= 0.5 // Simulating 3x+ correct
  }];


  // Group questions by mastery level
  const questionsByLevel = useMemo(() => {
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
    allQuestions.forEach((question) => {
      const masteryScore = getMasteryScore(question.id);

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

  // State to track expanded columns
  const [expandedColumns, setExpandedColumns] = useState<string[]>([]);

  // Toggle column expansion
  const toggleColumnExpansion = (columnId: string) => {
    if (expandedColumns.includes(columnId)) {
      setExpandedColumns(expandedColumns.filter((id) => id !== columnId));
    } else {
      setExpandedColumns([...expandedColumns, columnId]);
    }
  };

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

  return (
    <div className="pb-8 px-4" data-oid="y.nso_m">
      {/* Title Section */}
      <div className="text-center mb-8 px-0" data-oid="8yqnzlf">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2" data-oid="yd03-v_">
          Skill Mastery Progression
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto" data-oid="f.fm42x">
          Track your journey from novice to expert across all concepts, visualizing your growth and identifying areas for improvement
        </p>
      </div>
      
      {/* Kanban board layout */}
      <div className="w-full h-full" data-oid="jrm4g.s">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4" data-oid="149_hy3">
          {masteryLevels.map((level) => {
            const isExpanded = expandedColumns.includes(level.id);
            const questionCount = questionsByLevel[level.id].length;
            const maxVisibleItems = 3; // Number of stacked items to show when collapsed

            return (
              <div
                key={level.id}
                className={`${level.color} border ${level.borderColor} rounded-lg shadow-sm overflow-hidden transition-all duration-300`} data-oid="o_azo5c">

                {/* Column header */}
                <div
                  className={`${level.headerBg} cursor-pointer p-4 flex items-center justify-between`}
                  onClick={() => toggleColumnExpansion(level.id)} data-oid=".1lom7y">

                  <div className="flex items-center gap-3" data-oid="ua_9:q4">
                    <div className={`${level.iconBg} text-white p-1.5 rounded-lg`} data-oid="amm8zd4">
                      <SwordIcon size={16} color="white" data-oid="ab5pg7-" />
                    </div>
                    <div data-oid="wmoa9ct">
                      <h3 className={`font-semibold ${level.titleColor}`} data-oid=".mr3.ad">{level.name}</h3>
                      <div className="text-xs text-slate-600 dark:text-slate-400" data-oid="4zrmpyy">{level.description}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2" data-oid="k0kwphk">
                    <span className="inline-flex items-center justify-center w-7 h-7 text-xs bg-white/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-full" data-oid="3avcjr3">
                      {questionCount}
                    </span>
                    <button className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors" data-oid="al89grb">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'transform rotate-180' : ''}`}
                        viewBox="0 0 20 20"
                        fill="currentColor" data-oid="m9xgh2z">

                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" data-oid="ljrl-el" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Column content */}
                <div className={`p-3 transition-all duration-300 ${isExpanded ? 'max-h-[800px]' : 'max-h-[150px]'} overflow-hidden`} data-oid="jw10_z7">
                  {!isExpanded ?
                  // Stacked card preview (collapsed state)
                  <div className="relative h-[120px]" data-oid="pgno5qx">
                      {questionsByLevel[level.id].slice(0, maxVisibleItems).map((question, index) =>
                    <div
                      key={question.id}
                      className={`absolute left-2 right-2 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 transition-all`}
                      style={{
                        top: `${index * 8}px`,
                        zIndex: 10 - index,
                        opacity: 1 - index * 0.1,
                        transform: `scale(${1 - index * 0.05})`,
                        transformOrigin: 'top center'
                      }} data-oid="24hwoxb">

                          <div className="flex items-center gap-2" data-oid="5jh7puq">
                            <div className={`w-2 h-2 rounded-full ${getSubjectColor(question.setSubject)}`} data-oid="-mcmm64"></div>
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate" data-oid="7ta_rk9">{question.setSubject}</span>
                          </div>
                          
                          <div className="font-medium text-sm mt-1 text-slate-800 dark:text-slate-200 truncate" data-oid=".bnixrf">
                            {question.topic}
                          </div>
                          
                          {index === 0 &&
                      <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 truncate" data-oid="ii21zu2">
                              {question.subtopic}
                            </div>
                      }
                        </div>
                    )}
                      
                      {/* More items indicator */}
                      {questionCount > maxVisibleItems &&
                    <div className="absolute bottom-0 left-0 right-0 text-center text-sm font-medium text-slate-600 dark:text-slate-400 py-1" data-oid="zp.14ch">
                          + {questionCount - maxVisibleItems} more items
                        </div>
                    }
                      
                      {/* Empty state */}
                      {questionCount === 0 &&
                    <div className="flex flex-col items-center justify-center h-full text-center" data-oid="l36az:4">
                          <div className="text-slate-400 dark:text-slate-500 mb-2" data-oid="lm4ycy5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="7jr1vw:">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-oid="5vl5yzb" />
                            </svg>
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="4wqrshm">No questions in this category</div>
                        </div>
                    }
                    </div> :

                  // Expanded view with all cards
                  <div className="space-y-3 pt-1" data-oid="m.przq.">
                      {questionsByLevel[level.id].map((question, index) =>
                    <div
                      key={question.id}
                      onClick={() => onSelectSet && onSelectSet(question.setId)}
                      className={`bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-slate-200 dark:border-slate-700 ${
                      selectedSetId === question.setId ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : ''} deal-card stagger-${
                      Math.min(index, 8)}`} data-oid="mq:eqwd">

                          {/* Question card content */}
                          <div className="flex items-center gap-2 mb-2" data-oid="f-k5zwm">
                            <div className={`w-2 h-2 rounded-full ${getSubjectColor(question.setSubject)}`} data-oid="-1v6qv6"></div>
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400" data-oid="b3x7rpc">{question.setSubject}</span>
                          </div>
                          
                          <div className="font-medium text-sm mb-2 text-slate-800 dark:text-slate-200" data-oid="2204wec">
                            {question.topic}
                          </div>
                          
                          <div className="text-xs text-slate-600 dark:text-slate-400" data-oid="qy74.io">
                            {question.subtopic}
                          </div>
                          
                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 dark:border-slate-700" data-oid="hvei3cu">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        question.difficulty === 'Easy' ?
                        'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        question.difficulty === 'Medium' ?
                        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'}`
                        } data-oid="8h_q_:_">
                              {question.difficulty}
                            </span>
                            
                            <span className="text-xs text-slate-500 dark:text-slate-400" data-oid="c5cgpbd">
                              {Math.floor(question.timeSpent / 60)}:{String(question.timeSpent % 60).padStart(2, '0')}
                            </span>
                          </div>
                        </div>
                    )}
                      
                      {/* Empty state */}
                      {questionsByLevel[level.id].length === 0 &&
                    <div className="flex flex-col items-center justify-center h-32 text-center" data-oid="4ynlbs5">
                          <div className="text-slate-400 dark:text-slate-500 mb-2" data-oid="q:o:gjv">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="xoqx558">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-oid="0o8vbtv" />
                            </svg>
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="nr.eywr">No questions in this category</div>
                        </div>
                    }
                    </div>
                  }
                </div>
              </div>);

          })}
        </div>
      </div>
    </div>);

}