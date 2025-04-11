'use client';

import { useState } from 'react';
import { QuestionViewProps } from './types';
import { PracticeSet, Question } from '@/lib/mockData';

/**
 * QuestionStackView - Stacked layout of questions prioritized by importance or difficulty
 * Shows questions in stacks that can be rearranged by the user based on priority
 */
export function QuestionStackView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // State for priorities and sorting
  const [priorityKey, setPriorityKey] = useState<'difficulty' | 'accuracy' | 'time'>('difficulty');
  const [selectedSubject, setSelectedSubject] = useState<string | 'all'>('all');
  const [expandedStacks, setExpandedStacks] = useState<Record<string, boolean>>({
    'High Priority': true,
    'Medium Priority': false,
    'Low Priority': false
  });

  // Extract all questions from all practice sets with additional metadata
  const allQuestions = practiceSets.flatMap((set) =>
  set.questions.map((q) => ({
    ...q,
    setId: set.id,
    subject: set.subject,
    accuracy: set.accuracy
  }))
  );

  // Get all available subjects for filtering
  const subjects = Array.from(new Set(practiceSets.map((set) => set.subject)));

  // Filter questions by selected subject
  const filteredQuestions = selectedSubject === 'all' ?
  allQuestions :
  allQuestions.filter((q) => q.subject === selectedSubject);

  // Function to determine priority based on selected key
  const getPriority = (question: typeof allQuestions[0]): 'High Priority' | 'Medium Priority' | 'Low Priority' => {
    if (priorityKey === 'difficulty') {
      return question.difficulty === 'Hard' ? 'High Priority' :
      question.difficulty === 'Medium' ? 'Medium Priority' : 'Low Priority';
    } else if (priorityKey === 'accuracy') {
      return question.accuracy < 70 ? 'High Priority' :
      question.accuracy < 85 ? 'Medium Priority' : 'Low Priority';
    } else {// time
      return question.timeSpent > 90 ? 'High Priority' :
      question.timeSpent > 60 ? 'Medium Priority' : 'Low Priority';
    }
  };

  // Group questions by priority
  const questionsByPriority: Record<string, typeof allQuestions> = {
    'High Priority': [],
    'Medium Priority': [],
    'Low Priority': []
  };

  // Sort and group questions
  filteredQuestions.forEach((question) => {
    const priority = getPriority(question);
    questionsByPriority[priority].push(question);
  });

  // Sort questions within each priority group
  Object.values(questionsByPriority).forEach((questions) => {
    if (priorityKey === 'difficulty') {
      const difficultyOrder = { 'Hard': 0, 'Medium': 1, 'Easy': 2 };
      questions.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
    } else if (priorityKey === 'accuracy') {
      questions.sort((a, b) => a.accuracy - b.accuracy); // Sort by ascending accuracy (lower first)
    } else {// time
      questions.sort((a, b) => b.timeSpent - a.timeSpent); // Sort by descending time (longer first)
    }
  });

  // Toggle a stack's expanded state
  const toggleStack = (stackName: string) => {
    setExpandedStacks((prev) => ({
      ...prev,
      [stackName]: !prev[stackName]
    }));
  };

  // Get background color for priority
  const getPriorityColor = (priority: string) => {
    return priority === 'High Priority' ?
    'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' :
    priority === 'Medium Priority' ?
    'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' :
    'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
  };

  // Get secondary color for priority
  const getPriorityAccentColor = (priority: string) => {
    return priority === 'High Priority' ?
    'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300' :
    priority === 'Medium Priority' ?
    'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300' :
    'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300';
  };

  // Get priority icon
  const getPriorityIcon = (priority: string) => {
    return priority === 'High Priority' ? '🔴' :
    priority === 'Medium Priority' ? '🟠' : '🟢';
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    return difficulty === 'Hard' ?
    'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
    difficulty === 'Medium' ?
    'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300' :
    'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="oivca1m">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="0jbku3t">16. Question Stack View</h3>
      
      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center" data-oid="x7.46sn">
        {/* Priority selector */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm" data-oid="u3hg4_e">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1" data-oid="bns39.7">Prioritize By</label>
          <select
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={priorityKey}
            onChange={(e) => setPriorityKey(e.target.value as 'difficulty' | 'accuracy' | 'time')} data-oid="qsygr-8">

            <option value="difficulty" data-oid="26879.e">Difficulty</option>
            <option value="accuracy" data-oid="3pcbecp">Low Accuracy</option>
            <option value="time" data-oid="baqccx7">Time Spent</option>
          </select>
        </div>
        
        {/* Subject selector */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm" data-oid="jwyarj4">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1" data-oid="bic_b92">Subject</label>
          <select
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)} data-oid="4p4e_fc">

            <option value="all" data-oid="r.vehqd">All Subjects</option>
            {subjects.map((subject, i) =>
            <option key={i} value={subject} data-oid="i-vd5rf">{subject}</option>
            )}
          </select>
        </div>
      </div>
      
      {/* Description */}
      <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg mb-4 text-sm text-slate-600 dark:text-slate-300" data-oid="_fi7l.y">
        <p data-oid="95liei5">Questions are stacked in three priority levels based on {
          priorityKey === 'difficulty' ? 'difficulty level' :
          priorityKey === 'accuracy' ? 'low accuracy scores' :
          'time spent answering'
          }. Click on a stack to expand it and see the questions.</p>
      </div>
      
      {/* Question stacks */}
      <div className="space-y-4 mb-6" data-oid="2k_56..">
        {(['High Priority', 'Medium Priority', 'Low Priority'] as const).map((priority, i) => {
          const questions = questionsByPriority[priority];
          const isExpanded = expandedStacks[priority];

          return (
            <div
              key={i}
              className={`rounded-xl border p-4 ${getPriorityColor(priority)} transition-all ${
              isExpanded ? 'shadow-md' : 'shadow-sm hover:shadow cursor-pointer'}`
              }
              onClick={() => !isExpanded && toggleStack(priority)} data-oid="cbnwrnz">

              {/* Stack header */}
              <div className="flex justify-between items-center mb-2" data-oid="1:h-.19">
                <div className="flex items-center" data-oid="h56gs78">
                  <span className="mr-2 text-lg" data-oid="eguw_-h">{getPriorityIcon(priority)}</span>
                  <h4 className="font-medium" data-oid=".srtua5">{priority}</h4>
                </div>
                
                <div className="flex items-center" data-oid="5sclepb">
                  <span className={`text-xs ${getPriorityAccentColor(priority)} px-2 py-0.5 rounded-full mr-2`} data-oid="kwr2_ac">
                    {questions.length} questions
                  </span>
                  <button
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStack(priority);
                    }} data-oid="x.36emb">

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 text-slate-500 dark:text-slate-300 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor" data-oid="qy.lg_3">

                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" data-oid="1xr9him" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Priority explanation */}
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3" data-oid="r33ubn9">
                {priorityKey === 'difficulty' &&
                `Questions with ${priority === 'High Priority' ? 'Hard' : priority === 'Medium Priority' ? 'Medium' : 'Easy'} difficulty`
                }
                {priorityKey === 'accuracy' &&
                `Questions with ${priority === 'High Priority' ? 'below 70%' : priority === 'Medium Priority' ? '70-85%' : 'above 85%'} accuracy`
                }
                {priorityKey === 'time' &&
                `Questions taking ${priority === 'High Priority' ? 'over 90 seconds' : priority === 'Medium Priority' ? '60-90 seconds' : 'under 60 seconds'} to complete`
                }
              </p>
              
              {/* Stack content (questions) */}
              {isExpanded &&
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700" data-oid="6o-k33b">
                  <div className="space-y-2 mt-2 max-h-80 overflow-y-auto pr-1" data-oid="dreumt7">
                    {questions.length > 0 ?
                  questions.map((question, j) => {
                    const parentSet = practiceSets.find((set) => set.id === question.setId)!;

                    return (
                      <div
                        key={j}
                        className={`p-3 rounded-lg border ${
                        selectedSetId === question.setId ?
                        'border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20' :
                        'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800'} cursor-pointer transition-colors`
                        }
                        onClick={() => onSelectSet && onSelectSet(question.setId)} data-oid="spj.5mr">

                            <div className="flex items-start" data-oid="nk:kvmk">
                              {/* Correct/incorrect indicator */}
                              <div className={`flex-shrink-0 w-5 h-5 rounded-full mr-2 mt-0.5 ${
                          question.correct ?
                          'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                          'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'} flex items-center justify-center text-xs`
                          } data-oid="o-a5kig">
                                {question.correct ? '✓' : '✗'}
                              </div>
                              
                              {/* Question topic */}
                              <div className="flex-1" data-oid="didk0z3">
                                <p className="text-sm font-medium" data-oid="7h_wxae">
                                  {question.topic} - {question.subtopic}
                                </p>
                                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-500 dark:text-slate-400" data-oid="xrg8cjp">
                                  <span className={`px-1.5 py-0.5 rounded ${getDifficultyColor(question.difficulty)}`} data-oid="kz4c5g9">
                                    {question.difficulty}
                                  </span>
                                  <span data-oid="135doa5">{parentSet.subject}</span>
                                  <span data-oid="o:3z740">•</span>
                                  <span data-oid="2kq8d95">{question.timeSpent}s</span>
                                </div>
                              </div>
                            </div>
                          </div>);

                  }) :

                  <div className="text-center py-8 text-slate-400 dark:text-slate-500" data-oid="fyv-y_j">
                        No questions in this priority level
                      </div>
                  }
                  </div>
                </div>
              }
              
              {/* Collapsed stack preview */}
              {!isExpanded && questions.length > 0 &&
              <div className="flex items-center justify-center py-3" data-oid="6dozr5y">
                  <div className="flex items-center" data-oid="hu.jvwf">
                    <div className="relative" data-oid="2scy7wr">
                      {/* Stacked cards effect */}
                      {[...Array(Math.min(3, questions.length))].map((_, idx) =>
                    <div
                      key={idx}
                      className={`absolute w-full h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm transform ${
                      idx === 0 ? '-translate-y-2 -translate-x-1 rotate-[-3deg]' :
                      idx === 1 ? '-translate-y-1 translate-x-0 rotate-[-1deg]' : ''}`
                      }
                      style={{
                        zIndex: 2 - idx,
                        opacity: 1 - idx * 0.15
                      }} data-oid="4uy8ik1">
                    </div>
                    )}
                      
                      {/* Top card with sample content */}
                      <div className="relative w-64 h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm z-10 flex items-center p-2 overflow-hidden" data-oid="lsyx5g0">
                        <div className={`w-4 h-4 rounded-full mr-2 ${
                      questions[0]?.correct ?
                      'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                      'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'} flex items-center justify-center text-xs`
                      } data-oid="k60e4si">
                          {questions[0]?.correct ? '✓' : '✗'}
                        </div>
                        <div className="flex-1 truncate" data-oid="wdn5383">
                          <p className="text-xs font-medium truncate" data-oid="4oadipf">
                            {questions[0]?.topic}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-3 text-sm text-slate-500 dark:text-slate-400" data-oid="regwexw">
                      + {questions.length - 1} more
                    </div>
                  </div>
                </div>
              }
            </div>);

        })}
      </div>
      
      {/* Statistics */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm" data-oid="bgl9pd_">
        <h4 className="font-medium text-sm mb-3" data-oid="a32rqmt">Priority Distribution</h4>
        
        {/* Priority bars */}
        <div className="space-y-3" data-oid="x.b6iix">
          {(['High Priority', 'Medium Priority', 'Low Priority'] as const).map((priority, i) => {
            const count = questionsByPriority[priority].length;
            const percentage = Math.round(count / filteredQuestions.length * 100) || 0;

            return (
              <div key={i} data-oid="c59efxl">
                <div className="flex justify-between text-xs mb-1" data-oid="49uwbt:">
                  <span className="font-medium" data-oid="ng94pyp">{priority}</span>
                  <span className="text-slate-500 dark:text-slate-400" data-oid="2_zohhq">{count} questions ({percentage}%)</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden" data-oid="ywoknbp">
                  <div
                    className={`h-full rounded-full ${
                    priority === 'High Priority' ? 'bg-red-500 dark:bg-red-600' :
                    priority === 'Medium Priority' ? 'bg-amber-500 dark:bg-amber-600' :
                    'bg-green-500 dark:bg-green-600'}`
                    }
                    style={{ width: `${percentage}%` }} data-oid="fwhkk_q">
                  </div>
                </div>
              </div>);

          })}
        </div>
        
        {/* Total */}
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 text-sm text-center" data-oid="k0bbf9b">
          <span className="font-medium text-slate-700 dark:text-slate-300" data-oid="zpcn0v_">Total:</span>
          <span className="ml-1 text-slate-500 dark:text-slate-400" data-oid="hptbqdd">{filteredQuestions.length} questions prioritized by {
            priorityKey === 'difficulty' ? 'difficulty level' :
            priorityKey === 'accuracy' ? 'accuracy score' :
            'time spent'
            }</span>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 text-center" data-oid="5w.j_7z">
        <p data-oid="nthnx:f">Click on any stack to expand it and see the questions. Click on a question to view the practice set details.</p>
      </div>
    </div>);

}