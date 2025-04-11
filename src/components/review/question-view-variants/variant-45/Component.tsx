'use client';

// Based on KnowledgeTreeView
// Interactive neural connections showing relationships between topics with pulsing nodes indicating activity

import React, { useState, useEffect } from 'react';
import { QuestionViewProps } from '../types';
import { QuestionWithMetadata } from '../../question-view/types';
import { extractQuestionsWithMetadata } from '../../question-view/utils';

/**
 * Knowledge Tree View (Question View Variant 3)
 * Organize questions into a tree structure based on concepts and relationships
 */
export function NeuralNetworkTreeView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
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
      <div className="flex space-x-1" data-oid=":93gutm">
        {Array.from({ length: 5 }).map((_, i) =>
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
          i < filledDots ?
          'bg-indigo-500 dark:bg-indigo-400' :
          'bg-slate-200 dark:bg-slate-700'}`
          } data-oid="1.6okmr" />

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
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="nir.93-">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="fa_7x8m">45. Neural Network Tree</h3>
      
      {/* Subject filters */}
      <div className="flex justify-center mb-8 gap-2" data-oid="w9-qqur">
        <button
          onClick={() => setSelectedSubject(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedSubject === null ?
          'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' :
          'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
          } data-oid="2hy2.bi">

          All Subjects
        </button>
        <button
          onClick={() => setSelectedSubject('Math')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedSubject === 'Math' ?
          'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' :
          'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
          } data-oid="rcmwnrp">

          Math
        </button>
        <button
          onClick={() => setSelectedSubject('Reading')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedSubject === 'Reading' ?
          'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' :
          'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
          } data-oid="el9.u9n">

          Reading
        </button>
        <button
          onClick={() => setSelectedSubject('Writing')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedSubject === 'Writing' ?
          'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' :
          'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
          } data-oid="l2rypl8">

          Writing
        </button>
      </div>
      
      {/* Knowledge Tree */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700 overflow-hidden" data-oid="vqykrq7">
        {/* Tree header */}
        <div className="flex items-center justify-between mb-6" data-oid="8-4usso">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white" data-oid="qasnvjn">
            Knowledge Structure
          </h3>
          <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="7soje6-">
            {filteredQuestions.length} questions • {
            getAccuracyPercentage(
              filteredQuestions.filter((q) => q.correct).length,
              filteredQuestions.length
            )
            }% accuracy
          </div>
        </div>
        
        {/* Tree content */}
        <div className="space-y-4" data-oid="3ip6uz9">
          {sortedTopics.map(([topic, data]) => {
            const topicAccuracy = getAccuracyPercentage(data.correct, data.count);
            const isExpanded = expandedTopics.has(topic);

            return (
              <div key={topic} className="topic-group" data-oid="yl8j6mc">
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
                  onClick={() => toggleTopic(topic)} data-oid="iffidua">

                  <div className="flex items-center space-x-3" data-oid="2-mr3yj">
                    <div className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} data-oid="ch3sk2x">
                      <svg
                        className="w-4 h-4 text-slate-500 dark:text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24" data-oid="1qo0n9g">

                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" data-oid="a9j50cc" />
                      </svg>
                    </div>
                    <div className="font-medium" data-oid="bnirat6">{topic}</div>
                  </div>
                  
                  <div className="flex items-center space-x-4" data-oid="f2qrn4m">
                    <div className="hidden sm:block" data-oid="3cb-qs.">
                      {getAccuracyDots(topicAccuracy)}
                    </div>
                    <div className={`text-sm font-semibold ${getAccuracyColor(topicAccuracy)}`} data-oid="ww:kcye">
                      {topicAccuracy}%
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 min-w-[45px] text-right" data-oid="7:zom8l">
                      {data.count} Q
                    </div>
                  </div>
                </div>
                
                {/* Subtopics - visible when expanded */}
                {isExpanded &&
                <div className="ml-6 mt-1 space-y-1 border-l border-dashed border-slate-200 dark:border-slate-700 pl-4" data-oid="yh0m4u0">
                    {Object.entries(data.subtopics).
                  sort((a, b) => b[1].count - a[1].count).
                  map(([subtopic, subtopicData]) => {
                    const subtopicAccuracy = getAccuracyPercentage(subtopicData.correct, subtopicData.count);

                    return (
                      <div key={subtopic} className="subtopic-group" data-oid="amdotp.">
                            {/* Subtopic header */}
                            <div className="flex items-center justify-between p-2 rounded-md bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors" data-oid=".:i0mlf">
                              <div className="text-sm" data-oid="i4fmkk7">{subtopic}</div>
                              
                              <div className="flex items-center space-x-4" data-oid="f681s_-">
                                <div className="hidden sm:block" data-oid="2k6:hpl">
                                  {getAccuracyDots(subtopicAccuracy)}
                                </div>
                                <div className={`text-sm ${getAccuracyColor(subtopicAccuracy)}`} data-oid="-m82bsr">
                                  {subtopicAccuracy}%
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 min-w-[45px] text-right" data-oid="7lrlx5:">
                                  {subtopicData.count} Q
                                </div>
                              </div>
                            </div>
                            
                            {/* Questions list */}
                            <div className="pl-4 mt-1 space-y-1" data-oid="37:eyc6">
                              {subtopicData.questions.map((question) =>
                          <div
                            key={question.id}
                            onClick={() => onSelectSet && onSelectSet(question.setId)}
                            className="flex items-center justify-between py-1 px-2 text-xs rounded hover:bg-slate-50 dark:hover:bg-slate-700/30 cursor-pointer transition-colors" data-oid="1kn3b_x">

                                  <div className="flex items-center space-x-2" data-oid="8zoaskb">
                                    <div className={`w-2 h-2 rounded-full ${
                              question.correct ?
                              'bg-green-500 dark:bg-green-400' :
                              'bg-red-500 dark:bg-red-400'}`
                              } data-oid="plr7rj3"></div>
                                    <span className="truncate max-w-[200px]" data-oid="ny-nh4f">
                                      Question from {question.setType}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400" data-oid="00yazsr">
                                    <span data-oid="1tr-::6">{question.timeSpent}s</span>
                                    <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                              question.difficulty === 'Easy' ?
                              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                              question.difficulty === 'Medium' ?
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`
                              } data-oid="ny5bub-">
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
          <div className="py-16 text-center text-slate-500 dark:text-slate-400" data-oid="pf2.u2o">
              <div className="text-5xl mb-4" data-oid="svgdc.n">🌱</div>
              <p data-oid="qey4cs5">No questions available for the selected subject.</p>
              <p className="text-sm mt-2" data-oid="0:f2154">Try selecting a different subject or complete more practice sets.</p>
            </div>
          }
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center items-center mt-6 text-xs text-slate-500 dark:text-slate-400 space-x-4" data-oid="ak5svzb">
        <div className="flex items-center space-x-1" data-oid=":u6yax7">
          <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400" data-oid="ty41fh1"></div>
          <span data-oid="ng24i:a">Correct</span>
        </div>
        <div className="flex items-center space-x-1" data-oid="xif3pe.">
          <div className="w-2 h-2 rounded-full bg-red-500 dark:bg-red-400" data-oid="r8g76uq"></div>
          <span data-oid="a4zbi3p">Incorrect</span>
        </div>
        <div className="flex items-center space-x-1" data-oid="u:jtetq">
          <div className="flex space-x-0.5" data-oid="azvjxng">
            {[1, 2, 3, 4, 5].map((i) =>
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${
              i <= 3 ? 'bg-indigo-500 dark:bg-indigo-400' : 'bg-slate-200 dark:bg-slate-700'}`
              } data-oid="m-f6c5j" />

            )}
          </div>
          <span data-oid="z9h:ezn">Accuracy</span>
        </div>
      </div>
    </div>);

}