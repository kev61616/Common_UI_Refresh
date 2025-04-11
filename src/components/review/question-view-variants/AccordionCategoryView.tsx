'use client';

import { useState } from 'react';
import { QuestionViewProps } from './types';
import { PracticeSet, Question } from '@/lib/mockData';

/**
 * AccordionCategoryView - Expandable sections organized by question category
 * Shows questions grouped by categories with expandable/collapsible sections
 */
export function AccordionCategoryView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // State for tracking which sections are expanded
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [groupBy, setGroupBy] = useState<'topic' | 'difficulty' | 'subject'>('topic');
  const [sortBy, setSortBy] = useState<'accuracy' | 'date' | 'time'>('accuracy');

  // Extract all questions from practice sets with additional metadata
  const allQuestions = practiceSets.flatMap((set) =>
  set.questions.map((q) => ({
    ...q,
    setId: set.id,
    subject: set.subject,
    dateCompleted: set.dateCompleted,
    accuracy: set.accuracy,
    timePerQuestion: set.timeUsed / set.questions.length
  }))
  );

  // Function to get the category key based on groupBy
  const getCategoryKey = (question: typeof allQuestions[0]) => {
    switch (groupBy) {
      case 'topic':return question.topic;
      case 'difficulty':return question.difficulty;
      case 'subject':return question.subject;
    }
  };

  // Group questions by the selected category
  const groupedQuestions = allQuestions.reduce((groups, question) => {
    const key = getCategoryKey(question);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(question);
    return groups;
  }, {} as Record<string, typeof allQuestions>);

  // Sort categories alphabetically
  const sortedCategories = Object.keys(groupedQuestions).sort();

  // Sort questions within each category
  Object.values(groupedQuestions).forEach((questions) => {
    questions.sort((a, b) => {
      switch (sortBy) {
        case 'accuracy':
          // For accuracy, we want higher values first
          return b.accuracy - a.accuracy;
        case 'date':
          // For date, we want newer dates first
          return new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime();
        case 'time':
          // For time, we want shorter times first
          return a.timeSpent - b.timeSpent;
      }
    });
  });

  // Toggle expansion of a category
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Expand all categories
  const expandAll = () => {
    const newState = sortedCategories.reduce((acc, category) => {
      acc[category] = true;
      return acc;
    }, {} as Record<string, boolean>);

    setExpandedCategories(newState);
  };

  // Collapse all categories
  const collapseAll = () => {
    setExpandedCategories({});
  };

  // Get category color based on groupBy
  const getCategoryColor = (category: string) => {
    if (groupBy === 'difficulty') {
      return category === 'Easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
      category === 'Medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300' :
      'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
    } else if (groupBy === 'subject') {
      return category === 'Math' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300' :
      category === 'Reading' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
      'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300';
    } else {
      // For topics, use a generic color
      return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300';
    }
  };

  // Get the count of correct questions in a category
  const getCategoryStats = (questions: typeof allQuestions) => {
    const correctCount = questions.filter((q) => q.correct).length;
    const accuracy = correctCount / questions.length * 100;
    const avgTime = questions.reduce((sum, q) => sum + q.timeSpent, 0) / questions.length;

    return { correctCount, total: questions.length, accuracy, avgTime };
  };

  // Get category icons
  const getCategoryIcon = (category: string) => {
    if (groupBy === 'difficulty') {
      return category === 'Easy' ? '🟢' :
      category === 'Medium' ? '🟠' : '🔴';
    } else if (groupBy === 'subject') {
      return category === 'Math' ? '🔢' :
      category === 'Reading' ? '📚' : '✏️';
    } else {
      // For topics, no specific icon
      return '📋';
    }
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="b8efm1f">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid=":nvs8ex">15. Accordion Category View</h3>
      
      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center" data-oid="fgcewal">
        {/* Group by control */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm" data-oid="p7s:fyv">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1" data-oid="zyigs0o">Group By</label>
          <select
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as 'topic' | 'difficulty' | 'subject')} data-oid="sq_.p0e">

            <option value="topic" data-oid="dmjdy7f">Topic</option>
            <option value="difficulty" data-oid="gkt10l_">Difficulty</option>
            <option value="subject" data-oid="9.ia0v2">Subject</option>
          </select>
        </div>
        
        {/* Sort by control */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm" data-oid="s-nnvy:">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1" data-oid="x8g_-ic">Sort Questions By</label>
          <select
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'accuracy' | 'date' | 'time')} data-oid="2nluj:r">

            <option value="accuracy" data-oid="y558xa7">Accuracy</option>
            <option value="date" data-oid="3dh0k8s">Date</option>
            <option value="time" data-oid="9z9yxub">Time Spent</option>
          </select>
        </div>
        
        {/* Expand/Collapse All */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm flex items-end" data-oid="49fxr:v">
          <div className="flex gap-2" data-oid="--ee3l8">
            <button
              onClick={expandAll}
              className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors" data-oid="zlfok.8">

              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors" data-oid="yjq8tpa">

              Collapse All
            </button>
          </div>
        </div>
      </div>
      
      {/* Accordion sections */}
      <div className="space-y-3 mb-6" data-oid="7j.0d7y">
        {sortedCategories.map((category, i) => {
          const questions = groupedQuestions[category];
          const isExpanded = !!expandedCategories[category];
          const stats = getCategoryStats(questions);

          return (
            <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden" data-oid="r_pmats">
              {/* Category header */}
              <div
                className={`px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors ${isExpanded ? 'border-b border-slate-200 dark:border-slate-700' : ''}`}
                onClick={() => toggleCategory(category)} data-oid="p5agyaq">

                <div className="flex items-center" data-oid="g:9392i">
                  <span className="mr-2 text-lg" data-oid="y.zbg_a">{getCategoryIcon(category)}</span>
                  <div data-oid="0x2qokn">
                    <h4 className="font-medium" data-oid="9l3vq-a">{category}</h4>
                    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-0.5" data-oid="qu3fon-">
                      <span data-oid="pe.cs8x">{stats.correctCount}/{stats.total} correct</span>
                      <span className="mx-2" data-oid="8681lq2">•</span>
                      <span data-oid="quph1cm">{stats.accuracy.toFixed(1)}% accuracy</span>
                      <span className="mx-2" data-oid="rd7eb1g">•</span>
                      <span data-oid="4bq3mm-">{stats.avgTime.toFixed(1)}s avg time</span>
                    </div>
                  </div>
                </div>
                
                {/* Expand/collapse indicator */}
                <div className="flex items-center" data-oid="oq4trve">
                  <span className={`${getCategoryColor(category)} text-xs px-2 py-0.5 rounded mr-2`} data-oid="kf4hh2p">
                    {stats.total} questions
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 text-slate-400 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor" data-oid="_ymhgdo">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" data-oid="1-gcmot" />
                  </svg>
                </div>
              </div>
              
              {/* Expanded content */}
              {isExpanded &&
              <div className="bg-white dark:bg-slate-900 p-4" data-oid="9l1j88f">
                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3" data-oid=".._7sxo">
                    {questions.map((question, j) => {
                    // Find the parent practice set
                    const parentSet = practiceSets.find((set) => set.id === question.setId)!;

                    return (
                      <div
                        key={j}
                        className={`rounded-lg p-3 border cursor-pointer transition-all hover:shadow-md ${
                        selectedSetId === question.setId ?
                        'border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20' :
                        'border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800'}`
                        }
                        onClick={() => onSelectSet && onSelectSet(question.setId)} data-oid="dchror-">

                          {/* Question content */}
                          <div className="flex items-start mb-2" data-oid="h43hww_">
                            {/* Correct/incorrect indicator */}
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full mr-2 mt-0.5 ${
                          question.correct ?
                          'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                          'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'} flex items-center justify-center text-xs`
                          } data-oid="s2fq9j4">
                              {question.correct ? '✓' : '✗'}
                            </div>
                            
                            {/* Question topic and subtopic */}
                            <div className="flex-1" data-oid="php.eo3">
                              <p className="text-sm font-medium line-clamp-2" data-oid="-i6nnm.">
                                {question.topic} - {question.subtopic}
                              </p>
                            </div>
                          </div>
                          
                          {/* Question metadata */}
                          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400" data-oid="6:tci.o">
                            <div data-oid="m2__id3">
                              <span className={`inline-block px-1.5 py-0.5 rounded ${getCategoryColor(question.difficulty)}`} data-oid="rbjeqj.">
                                {question.difficulty}
                              </span>
                            </div>
                            <div className="flex items-center" data-oid="ha04sn6">
                              <span data-oid="7hq7a7g">{question.timeSpent}s</span>
                              <span className="mx-1" data-oid="09o8_3t">•</span>
                              <span data-oid="1nhn-ns">{parentSet.subject}</span>
                            </div>
                          </div>
                        </div>);

                  })}
                  </div>
                </div>
              }
            </div>);

        })}
      </div>
      
      {/* Stats section */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4" data-oid="fkx:qzq">
        <h4 className="font-medium mb-3" data-oid="a3ol_-j">Overview</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" data-oid="ogg9kwv">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center" data-oid="j.sf54k">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400" data-oid="mzl_n4k">
              {sortedCategories.length}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1" data-oid="kasq.3b">
              {groupBy === 'topic' ? 'Topics' : groupBy === 'difficulty' ? 'Difficulty Levels' : 'Subjects'}
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center" data-oid="81jlvw-">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400" data-oid="75-wjhj">
              {allQuestions.filter((q) => q.correct).length}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1" data-oid="v6qbn4r">
              Correct Answers
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center" data-oid="6u3_lx6">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400" data-oid="6e83gxd">
              {(allQuestions.filter((q) => q.correct).length / allQuestions.length * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1" data-oid="xzaisiw">
              Overall Accuracy
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center" data-oid="6jugao_">
            <div className="text-2xl font-bold text-sky-600 dark:text-sky-400" data-oid="368loe9">
              {(allQuestions.reduce((sum, q) => sum + q.timeSpent, 0) / allQuestions.length).toFixed(1)}s
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1" data-oid="5kujg2j">
              Avg Time Per Question
            </div>
          </div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 text-center" data-oid="g8gk495">
        <p data-oid="vj0-oij">Click on category headers to expand/collapse. Click on questions to view details.</p>
      </div>
    </div>);

}