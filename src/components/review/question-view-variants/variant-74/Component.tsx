'use client';

// Based on KnowledgeTreeView
// Artistic bonsai tree visualization with topic branches and question leaves growing based on mastery

import React, { useState, useEffect } from 'react';
import { QuestionViewProps } from '../types';
import { QuestionWithMetadata } from '../../question-view/types';
import { extractQuestionsWithMetadata } from '../../question-view/utils';

/**
 * Knowledge Tree View (Question View Variant 3)
 * Organize questions into a tree structure based on concepts and relationships
 */
export function BonsaiKnowledgeTreeView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // Extract all questions from practice sets with metadata
  const [allQuestions, setAllQuestions] = useState<QuestionWithMetadata[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Process questions when practiceSets change
  useEffect(() => {
    const questions = extractQuestionsWithMetadata(practiceSets);
    setAllQuestions(questions);

    // Auto-expand a few topics initially
    const initialTopics = Array.from(new Set(questions.map((q) => q.topic))).
    slice(0, 3); // Expand first 3 topics by default

    setExpandedTopics(new Set(initialTopics));
  }, [practiceSets]);

  // Filter by subject if selected
  const filteredQuestions = selectedSubject ?
  allQuestions.filter((q) => q.setSubject === selectedSubject) :
  allQuestions;

  // Group questions by topic and subtopic for tree structure
  const topicGroups = filteredQuestions.reduce<{
    [topic: string]: {
      count: number;
      correct: number;
      subtopics: {
        [subtopic: string]: {
          count: number;
          correct: number;
          questions: QuestionWithMetadata[];
        };
      };
    };
  }>((acc, question) => {
    // Initialize topic if it doesn't exist
    if (!acc[question.topic]) {
      acc[question.topic] = {
        count: 0,
        correct: 0,
        subtopics: {}
      };
    }

    // Initialize subtopic if it doesn't exist
    if (!acc[question.topic].subtopics[question.subtopic]) {
      acc[question.topic].subtopics[question.subtopic] = {
        count: 0,
        correct: 0,
        questions: []
      };
    }

    // Update counts
    acc[question.topic].count += 1;
    acc[question.topic].correct += question.correct ? 1 : 0;
    acc[question.topic].subtopics[question.subtopic].count += 1;
    acc[question.topic].subtopics[question.subtopic].correct += question.correct ? 1 : 0;
    acc[question.topic].subtopics[question.subtopic].questions.push(question);

    return acc;
  }, {});

  // Convert to sorted array for rendering
  const sortedTopics = Object.entries(topicGroups).
  sort((a, b) => b[1].count - a[1].count); // Sort by count descending

  // Toggle topic expansion
  const toggleTopic = (topic: string) => {
    const updated = new Set(expandedTopics);
    if (updated.has(topic)) {
      updated.delete(topic);
    } else {
      updated.add(topic);
    }
    setExpandedTopics(updated);
  };

  // Get accuracy percentage
  const getAccuracyPercentage = (correct: number, total: number) => {
    return total === 0 ? 0 : Math.round(correct / total * 100);
  };

  // Get visual representation of accuracy using dots
  const getAccuracyDots = (percentage: number) => {
    // 5 dots total, filled based on percentage
    const filledDots = Math.round(percentage / 20);

    return (
      <div className="flex space-x-1" data-oid="odnxkl4">
        {Array.from({ length: 5 }).map((_, i) =>
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
          i < filledDots ?
          'bg-indigo-500 dark:bg-indigo-400' :
          'bg-slate-200 dark:bg-slate-700'}`
          } data-oid="x207909" />

        )}
      </div>);

  };

  // Calculate accuracy color
  const getAccuracyColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="4wd-bjg">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="mf3qx2s">74. Bonsai Knowledge Tree</h3>
      
      {/* Subject filters */}
      <div className="flex justify-center mb-8 gap-2" data-oid="xp5f3wg">
        <button
          onClick={() => setSelectedSubject(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedSubject === null ?
          'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' :
          'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
          } data-oid="0shktd5">

          All Subjects
        </button>
        <button
          onClick={() => setSelectedSubject('Math')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedSubject === 'Math' ?
          'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' :
          'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
          } data-oid="x_3zhhf">

          Math
        </button>
        <button
          onClick={() => setSelectedSubject('Reading')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedSubject === 'Reading' ?
          'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' :
          'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
          } data-oid="c.kjfkv">

          Reading
        </button>
        <button
          onClick={() => setSelectedSubject('Writing')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedSubject === 'Writing' ?
          'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' :
          'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
          } data-oid="lce-3gg">

          Writing
        </button>
      </div>
      
      {/* Knowledge Tree */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700 overflow-hidden" data-oid="r:lvoeb">
        {/* Tree header */}
        <div className="flex items-center justify-between mb-6" data-oid="niq2sj5">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white" data-oid="dva:lwh">
            Knowledge Structure
          </h3>
          <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="lekij00">
            {filteredQuestions.length} questions • {
            getAccuracyPercentage(
              filteredQuestions.filter((q) => q.correct).length,
              filteredQuestions.length
            )
            }% accuracy
          </div>
        </div>
        
        {/* Tree content */}
        <div className="space-y-4" data-oid="ipmtceg">
          {sortedTopics.map(([topic, data]) => {
            const topicAccuracy = getAccuracyPercentage(data.correct, data.count);
            const isExpanded = expandedTopics.has(topic);

            return (
              <div key={topic} className="topic-group" data-oid="uvq94g4">
                {/* Topic header - always visible */}
                <div
                  className={`
                    flex items-center justify-between p-3 rounded-lg cursor-pointer
                    transition-colors duration-200
                    ${isExpanded ?
                  'bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-400 dark:border-indigo-500' :
                  'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border-l-4 border-transparent'}
                  `
                  }
                  onClick={() => toggleTopic(topic)} data-oid="jjbfre2">

                  <div className="flex items-center space-x-3" data-oid="pzzc4g-">
                    <div className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} data-oid="z7:gc._">
                      <svg
                        className="w-4 h-4 text-slate-500 dark:text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24" data-oid="mr_xnb1">

                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" data-oid="k3hghur" />
                      </svg>
                    </div>
                    <div className="font-medium" data-oid="0b6lm11">{topic}</div>
                  </div>
                  
                  <div className="flex items-center space-x-4" data-oid="fey976d">
                    <div className="hidden sm:block" data-oid="y57rbpz">
                      {getAccuracyDots(topicAccuracy)}
                    </div>
                    <div className={`text-sm font-semibold ${getAccuracyColor(topicAccuracy)}`} data-oid="fjkw0nw">
                      {topicAccuracy}%
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 min-w-[45px] text-right" data-oid="austfy0">
                      {data.count} Q
                    </div>
                  </div>
                </div>
                
                {/* Subtopics - visible when expanded */}
                {isExpanded &&
                <div className="ml-6 mt-1 space-y-1 border-l border-dashed border-slate-200 dark:border-slate-700 pl-4" data-oid="r8-2d7b">
                    {Object.entries(data.subtopics).
                  sort((a, b) => b[1].count - a[1].count).
                  map(([subtopic, subtopicData]) => {
                    const subtopicAccuracy = getAccuracyPercentage(subtopicData.correct, subtopicData.count);

                    return (
                      <div key={subtopic} className="subtopic-group" data-oid="6jk-jf0">
                            {/* Subtopic header */}
                            <div className="flex items-center justify-between p-2 rounded-md bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors" data-oid="hoty_ep">
                              <div className="text-sm" data-oid="lr3::mq">{subtopic}</div>
                              
                              <div className="flex items-center space-x-4" data-oid="kco_.iy">
                                <div className="hidden sm:block" data-oid="63ir-lj">
                                  {getAccuracyDots(subtopicAccuracy)}
                                </div>
                                <div className={`text-sm ${getAccuracyColor(subtopicAccuracy)}`} data-oid="rv6fr9f">
                                  {subtopicAccuracy}%
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 min-w-[45px] text-right" data-oid="wbrwjac">
                                  {subtopicData.count} Q
                                </div>
                              </div>
                            </div>
                            
                            {/* Questions list */}
                            <div className="pl-4 mt-1 space-y-1" data-oid="ejovpfa">
                              {subtopicData.questions.map((question) =>
                          <div
                            key={question.id}
                            onClick={() => onSelectSet && onSelectSet(question.setId)}
                            className="flex items-center justify-between py-1 px-2 text-xs rounded hover:bg-slate-50 dark:hover:bg-slate-700/30 cursor-pointer transition-colors" data-oid="9mf4ok_">

                                  <div className="flex items-center space-x-2" data-oid="qn_67dd">
                                    <div className={`w-2 h-2 rounded-full ${
                              question.correct ?
                              'bg-green-500 dark:bg-green-400' :
                              'bg-red-500 dark:bg-red-400'}`
                              } data-oid="ve7et-o"></div>
                                    <span className="truncate max-w-[200px]" data-oid="txg1er9">
                                      Question from {question.setType}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400" data-oid="d-fobso">
                                    <span data-oid="dd7v_v-">{question.timeSpent}s</span>
                                    <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                              question.difficulty === 'Easy' ?
                              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                              question.difficulty === 'Medium' ?
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`
                              } data-oid="seiqm8y">
                                      {question.difficulty}
                                    </span>
                                  </div>
                                </div>
                          )}
                            </div>
                          </div>);

                  })}
                  </div>
                }
              </div>);

          })}
          
          {sortedTopics.length === 0 &&
          <div className="py-16 text-center text-slate-500 dark:text-slate-400" data-oid="cr_o.:.">
              <div className="text-5xl mb-4" data-oid="t852-:.">🌱</div>
              <p data-oid="j:e_5z2">No questions available for the selected subject.</p>
              <p className="text-sm mt-2" data-oid="_hf-jyg">Try selecting a different subject or complete more practice sets.</p>
            </div>
          }
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center items-center mt-6 text-xs text-slate-500 dark:text-slate-400 space-x-4" data-oid="ipjly4:">
        <div className="flex items-center space-x-1" data-oid="4v-0xc0">
          <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400" data-oid="4je-6xv"></div>
          <span data-oid="zo6fkmq">Correct</span>
        </div>
        <div className="flex items-center space-x-1" data-oid="p9i0l6v">
          <div className="w-2 h-2 rounded-full bg-red-500 dark:bg-red-400" data-oid="4fmas.t"></div>
          <span data-oid=":jhiyy1">Incorrect</span>
        </div>
        <div className="flex items-center space-x-1" data-oid="67cr4xd">
          <div className="flex space-x-0.5" data-oid="oufmkfl">
            {[1, 2, 3, 4, 5].map((i) =>
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${
              i <= 3 ? 'bg-indigo-500 dark:bg-indigo-400' : 'bg-slate-200 dark:bg-slate-700'}`
              } data-oid=":3e84a2" />

            )}
          </div>
          <span data-oid="ra_s:.p">Accuracy</span>
        </div>
      </div>
    </div>);

}