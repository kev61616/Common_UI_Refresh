'use client';

import { useState } from 'react';
import { QuestionViewProps } from './types';
import { PracticeSet, Question } from '@/lib/mockData';

/**
 * VennDiagramView - A visualization for overlapping concepts and question types
 * Uses Venn/Euler diagram visualization to show the relationships and overlaps between concepts
 */
export function VennDiagramView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  const [view, setView] = useState<'subjects' | 'topics' | 'difficulties'>('subjects');

  // Extract all questions from all practice sets
  const allQuestions: (Question & {setId: string;})[] = practiceSets.flatMap((set) =>
  set.questions.map((q) => ({ ...q, setId: set.id }))
  );

  type EnhancedQuestion = Question & {setId: string;};

  // Group questions by subject, topic, and difficulty
  const bySubject = allQuestions.reduce<Record<string, EnhancedQuestion[]>>((acc, q) => {
    const set = practiceSets.find((s) => s.id === q.setId)!;
    const key = set.subject;
    if (!acc[key]) acc[key] = [];
    acc[key].push(q);
    return acc;
  }, {});

  const byTopic = allQuestions.reduce<Record<string, EnhancedQuestion[]>>((acc, q) => {
    const key = q.topic;
    if (!acc[key]) acc[key] = [];
    acc[key].push(q);
    return acc;
  }, {});

  const byDifficulty = allQuestions.reduce<Record<string, EnhancedQuestion[]>>((acc, q) => {
    const key = q.difficulty;
    if (!acc[key]) acc[key] = [];
    acc[key].push(q);
    return acc;
  }, {});

  // Helper function to get intersection between two sets
  const getIntersection = <T,>(setA: Set<T>, setB: Set<T>): Set<T> => {
    const result = new Set<T>();
    for (const elem of setA) {
      if (setB.has(elem)) {
        result.add(elem);
      }
    }
    return result;
  };

  // Calculate intersections between subjects
  const calculateSubjectIntersections = () => {
    const subjects = Object.keys(bySubject);
    const intersections: Record<string, EnhancedQuestion[]> = {};

    subjects.forEach((subject1, i) => {
      subjects.slice(i + 1).forEach((subject2) => {
        const key = `${subject1}_${subject2}`;
        const set1Questions = new Set(bySubject[subject1].map((q) => q.id));
        const set2Questions = new Set(bySubject[subject2].map((q) => q.id));

        // Questions that have connections across subjects (this is simulated since our data
        // model doesn't have this directly - in a real app this would use actual relationship data)
        const topicsSet1 = new Set(bySubject[subject1].map((q) => q.topic));
        const topicsSet2 = new Set(bySubject[subject2].map((q) => q.topic));
        const commonTopics = getIntersection(topicsSet1, topicsSet2);

        // For simulation, we'll consider questions with same topic to be "related"
        const relatedQuestions = allQuestions.filter((q) =>
        commonTopics.has(q.topic) && (
        set1Questions.has(q.id) || set2Questions.has(q.id))
        );

        intersections[key] = relatedQuestions;
      });
    });

    return intersections;
  };

  // Generate coordinates for Venn diagram circles
  const generateVennCoordinates = (keys: string[]) => {
    // For 3 or fewer items, use a standard Venn
    if (keys.length <= 3) {
      return {
        'Reading': { cx: '35%', cy: '40%', r: '30%' },
        'Writing': { cx: '65%', cy: '40%', r: '30%' },
        'Math': { cx: '50%', cy: '70%', r: '30%' },
        'Easy': { cx: '35%', cy: '40%', r: '30%' },
        'Medium': { cx: '65%', cy: '40%', r: '30%' },
        'Hard': { cx: '50%', cy: '70%', r: '30%' },
        // Add default positions for common topics
        'Algebra': { cx: '30%', cy: '30%', r: '25%' },
        'Geometry': { cx: '50%', cy: '30%', r: '25%' },
        'Reading Comprehension': { cx: '70%', cy: '30%', r: '25%' },
        'Grammar': { cx: '40%', cy: '70%', r: '25%' },
        'Vocabulary': { cx: '60%', cy: '70%', r: '25%' },
        // Default for any other key
        'default': { cx: '50%', cy: '50%', r: '25%' }
      };
    }

    // For more than 3, distribute in a circle
    const coords: Record<string, {cx: string;cy: string;r: string;}> = {};
    const centerX = 50;
    const centerY = 50;
    const radius = 25;
    const orbitRadius = 20;

    keys.forEach((key, i) => {
      const angle = i / keys.length * 2 * Math.PI;
      const x = centerX + orbitRadius * Math.cos(angle);
      const y = centerY + orbitRadius * Math.sin(angle);
      coords[key] = { cx: `${x}%`, cy: `${y}%`, r: `${radius}%` };
    });

    return coords;
  };

  // Get appropriate data based on selected view
  const getData = () => {
    switch (view) {
      case 'subjects':
        return {
          sets: bySubject,
          colors: {
            'Reading': '#3b82f6', // blue
            'Writing': '#10b981', // green
            'Math': '#f97316' // orange
          }
        };
      case 'topics':
        return {
          sets: byTopic,
          colors: {
            'Algebra': '#8b5cf6', // purple
            'Geometry': '#f43f5e', // pink
            'Statistics': '#14b8a6', // teal
            'Calculus': '#f59e0b', // amber
            'Grammar': '#06b6d4', // cyan
            'Essay Writing': '#6366f1', // indigo
            'Punctuation': '#8b5cf6', // purple 
            'Reading Comprehension': '#0ea5e9', // light blue
            'Reading Analysis': '#ec4899', // pink
            'Vocabulary': '#84cc16', // lime
            'default': '#94a3b8' // slate
          }
        };
      case 'difficulties':
        return {
          sets: byDifficulty,
          colors: {
            'Easy': '#10b981', // green
            'Medium': '#f59e0b', // amber
            'Hard': '#ef4444' // red
          }
        };
      default:
        return {
          sets: {} as Record<string, EnhancedQuestion[]>,
          colors: {} as Record<string, string>
        };
    }
  };

  const { sets, colors } = getData();
  const keys = Object.keys(sets);
  const coordinates = generateVennCoordinates(keys);

  // Handle click on a specific region of the diagram
  const handleRegionClick = (key: string) => {
    if (sets[key] && sets[key].length > 0) {
      // Find a practice set that contains one of these questions
      const setId = sets[key][0].setId;
      onSelectSet(setId);
    }
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="2xs727x">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="0o2or1c">9. Venn Diagram View</h3>
      
      {/* View selector */}
      <div className="mb-6 flex justify-center" data-oid="8d7i2ob">
        <div className="inline-flex p-1 space-x-1 bg-slate-100 dark:bg-slate-800 rounded-lg" data-oid="ft_6atf">
          {(
          [
          { id: 'subjects', label: 'Subjects' },
          { id: 'topics', label: 'Topics' },
          { id: 'difficulties', label: 'Difficulties' }] as
          const).
          map((option) =>
          <button
            key={option.id}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            view === option.id ?
            'bg-white dark:bg-slate-700 shadow-sm' :
            'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            }
            onClick={() => setView(option.id)} data-oid="zyho04q">

              {option.label}
            </button>
          )}
        </div>
      </div>
      
      {/* Description */}
      <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg mb-6 text-sm text-slate-600 dark:text-slate-300" data-oid="2tqsdy9">
        <p data-oid="f0iw8:d">This diagram shows relationships between {view}. The size of each circle represents the number of questions, and overlapping areas show common elements.</p>
      </div>
      
      {/* Venn Diagram */}
      <div className="aspect-video bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden relative mb-4" data-oid="wo1k9qx">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" data-oid="o1is8:c">
          {/* Render circles for each set */}
          {keys.map((key, i) => {
            const coord = coordinates[key] || coordinates['default'];
            const color = colors[key as keyof typeof colors] || colors['default' as keyof typeof colors] || '#94a3b8';
            const questions = sets[key];
            const setSize = questions ? questions.length : 0;

            // Adjust radius based on set size
            const baseRadius = parseInt(coord.r) || 20;
            const adjustedRadius = Math.max(10, Math.min(baseRadius, 10 + setSize / 10));

            return (
              <g key={i} onClick={() => handleRegionClick(key)} className="cursor-pointer" data-oid="1xrgzfc">
                <circle
                  cx={coord.cx}
                  cy={coord.cy}
                  r={`${adjustedRadius}%`}
                  fill={color}
                  fillOpacity="0.3"
                  stroke={color}
                  strokeWidth="0.5"
                  className="transition-all hover:fill-opacity-50" data-oid="5idlbt4" />

                
                <text
                  x={coord.cx}
                  y={coord.cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm font-medium fill-slate-900 dark:fill-white pointer-events-none" data-oid="xe5zgfq">

                  {key}
                </text>
                
                <text
                  x={coord.cx}
                  y={`calc(${coord.cy} + 20px)`}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs fill-slate-600 dark:fill-slate-300 pointer-events-none" data-oid="h66-1zv">

                  {setSize} questions
                </text>
              </g>);

          })}
          
          {/* Add connecting lines to show relationships between sets */}
          {view === 'subjects' && keys.length > 1 &&
          <>
              {keys.map((key1, i) =>
            keys.slice(i + 1).map((key2, j) => {
              const set1 = coordinates[key1] || coordinates['default'];
              const set2 = coordinates[key2] || coordinates['default'];

              // Find questions that bridge these subjects (if any)
              const relatedQuestions = allQuestions.filter((q) => {
                const qSet = practiceSets.find((s) => s.id === q.setId)!;
                const sameTopicDifferentSubject = allQuestions.some((otherQ) => {
                  const otherSet = practiceSets.find((s) => s.id === otherQ.setId)!;
                  return q.topic === otherQ.topic && qSet.subject === key1 && otherSet.subject === key2;
                });
                return sameTopicDifferentSubject;
              });

              if (relatedQuestions.length === 0) return null;

              return (
                <line
                  key={`${i}-${j}`}
                  x1={set1.cx}
                  y1={set1.cy}
                  x2={set2.cx}
                  y2={set2.cy}
                  stroke="#94a3b8"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                  strokeDasharray="2,2" data-oid="ezf2.qf" />);


            })
            )}
            </>
          }
        </svg>
      </div>
      
      {/* Details section */}
      <div data-oid="-pdx.nq">
        <h4 className="text-lg font-semibold mb-3" data-oid="jp6_9-l">Question Distribution</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3" data-oid="p6zpaan">
          {keys.map((key, i) => {
            const questions = sets[key];
            const color = colors[key as keyof typeof colors] || colors['default' as keyof typeof colors] || '#94a3b8';

            // Calculate accuracy for these questions
            const correctCount = questions ? questions.filter((q) => q.correct).length : 0;
            const accuracy = questions && questions.length > 0 ? correctCount / questions.length * 100 : 0;

            return (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleRegionClick(key)} data-oid="8qtun9z">

                <div className="flex items-center mb-2" data-oid="uo8g6ml">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: color }} data-oid="ayqid3q">
                  </div>
                  <h5 className="font-medium" data-oid="0fu69fp">{key}</h5>
                </div>
                <div className="flex justify-between text-sm" data-oid="elrhci2">
                  <span data-oid="_rensry">Questions: {questions ? questions.length : 0}</span>
                  <span data-oid="onimk-y">Accuracy: {accuracy.toFixed(1)}%</span>
                </div>
              </div>);

          })}
        </div>
      </div>
    </div>);

}