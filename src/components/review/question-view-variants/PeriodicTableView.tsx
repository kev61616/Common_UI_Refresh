'use client'

import { useState, useMemo } from 'react'
import { QuestionViewProps } from './types'

/**
 * PeriodicTableView - Questions displayed as elements in a periodic table style
 * Organizes questions into a grid with element-like cards showing key metrics
 */
export function PeriodicTableView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // State for filtering
  const [selectedSubject, setSelectedSubject] = useState<string | 'all'>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | 'all'>('all')
  
  // Extract all questions with metadata
  const allQuestions = practiceSets.flatMap(set => 
    set.questions.map(q => ({ 
      ...q, 
      setId: set.id,
      subject: set.subject,
      type: set.type,
      accuracy: set.accuracy,
      dateCompleted: set.dateCompleted
    }))
  )
  
  // Get all available subjects and difficulties for filtering
  const subjects = Array.from(new Set(practiceSets.map(set => set.subject)))
  const difficulties = Array.from(new Set(allQuestions.map(q => q.difficulty)))
  
  // Filter questions by selected subject and difficulty
  const filteredQuestions = allQuestions
    .filter(q => selectedSubject === 'all' || q.subject === selectedSubject)
    .filter(q => selectedDifficulty === 'all' || q.difficulty === selectedDifficulty)
  
  // Group questions by topic and subtopic
  const groupedByTopic = useMemo(() => {
    const result: Record<string, { 
      subject: string, 
      questions: typeof filteredQuestions,
      subtopics: Record<string, typeof filteredQuestions>
    }> = {};
    
    filteredQuestions.forEach(question => {
      // Initialize topic group if it doesn't exist
      if (!result[question.topic]) {
        result[question.topic] = {
          subject: question.subject,
          questions: [],
          subtopics: {}
        };
      }
      
      // Add question to topic group
      result[question.topic].questions.push(question);
      
      // Initialize subtopic group if it doesn't exist
      if (!result[question.topic].subtopics[question.subtopic]) {
        result[question.topic].subtopics[question.subtopic] = [];
      }
      
      // Add question to subtopic group
      result[question.topic].subtopics[question.subtopic].push(question);
    });
    
    return result;
  }, [filteredQuestions]);
  
  // Organize into a grid structure for the periodic table
  const tableStructure = useMemo(() => {
    const topics = Object.keys(groupedByTopic);
    const maxItemsPerRow = 8; // Maximum number of elements per row
    
    // Group topics into rows
    const rows: Array<Array<{
      topic: string;
      subtopic: string;
      questions: typeof filteredQuestions;
      symbol: string;
      number: number;
      metrics: {
        accuracy: number;
        avgTimeSpent: number;
      };
    }>> = [];
    
    let itemCounter = 1;
    let rowCounter = 0;
    
    topics.forEach(topic => {
      const subtopics = Object.keys(groupedByTopic[topic].subtopics);
      
      subtopics.forEach(subtopic => {
        const questions = groupedByTopic[topic].subtopics[subtopic];
        
        // Skip if no questions in this subtopic
        if (questions.length === 0) return;
        
        // Calculate metrics
        const correct = questions.filter(q => q.correct).length;
        const accuracy = questions.length > 0 ? (correct / questions.length) * 100 : 0;
        const avgTimeSpent = questions.reduce((sum, q) => sum + q.timeSpent, 0) / questions.length;
        
        // Create symbol from first letters
        let symbol = subtopic.substring(0, 2);
        if (symbol.length === 1) {
          symbol += subtopic.substring(1, 2).toLowerCase();
        } else {
          symbol = symbol.charAt(0) + symbol.charAt(1).toLowerCase();
        }
        
        // Initialize row if needed
        if (!rows[rowCounter]) {
          rows[rowCounter] = [];
        }
        
        // Add element to current row
        rows[rowCounter].push({
          topic,
          subtopic,
          questions,
          symbol,
          number: itemCounter++,
          metrics: {
            accuracy,
            avgTimeSpent
          }
        });
        
        // Move to next row if current row is full
        if (rows[rowCounter].length >= maxItemsPerRow) {
          rowCounter++;
        }
      });
    });
    
    return rows;
  }, [groupedByTopic]);
  
  // Function to get category color based on topic
  const getTopicColor = (topic: string) => {
    // Simple hash function to generate consistent colors
    const hash = topic.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    // Use hue values that work well with both light and dark themes
    const hue = Math.abs(hash % 360);
    
    // Use fixed saturation and lightness for consistency
    return `hsl(${hue}, 70%, 45%)`;
  };
  
  // Get element background color based on accuracy
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'bg-emerald-100 dark:bg-emerald-900/30';
    if (accuracy >= 60) return 'bg-green-100 dark:bg-green-900/30';
    if (accuracy >= 40) return 'bg-yellow-100 dark:bg-yellow-900/30';
    if (accuracy >= 20) return 'bg-orange-100 dark:bg-orange-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  };
  
  // Get element border color based on accuracy
  const getAccuracyBorderColor = (accuracy: number) => {
    if (accuracy >= 80) return 'border-emerald-300 dark:border-emerald-700';
    if (accuracy >= 60) return 'border-green-300 dark:border-green-700';
    if (accuracy >= 40) return 'border-yellow-300 dark:border-yellow-700';
    if (accuracy >= 20) return 'border-orange-300 dark:border-orange-700';
    return 'border-red-300 dark:border-red-700';
  };
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">21. Periodic Table View</h3>
      
      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        {/* Subject filter */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Subject</label>
          <select 
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="all">All Subjects</option>
            {subjects.map((subject, i) => (
              <option key={i} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        
        {/* Difficulty filter */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Difficulty</label>
          <select 
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="all">All Difficulties</option>
            {difficulties.map((difficulty, i) => (
              <option key={i} value={difficulty}>{difficulty}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Stats */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            {filteredQuestions.length}
          </div>
          <div className="text-xs text-indigo-500 dark:text-indigo-300">Questions</div>
        </div>
        
        <div className="bg-sky-50 dark:bg-sky-900/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-sky-600 dark:text-sky-400">
            {Object.keys(groupedByTopic).length}
          </div>
          <div className="text-xs text-sky-500 dark:text-sky-300">Topics</div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
            {Object.values(groupedByTopic).reduce((acc, topic) => acc + Object.keys(topic.subtopics).length, 0)}
          </div>
          <div className="text-xs text-purple-500 dark:text-purple-300">Subtopics</div>
        </div>
      </div>
      
      {/* Periodic table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 mb-4">
        {tableStructure.length > 0 ? (
          <div className="space-y-4">
            {tableStructure.map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-wrap gap-2 justify-center">
                {row.map((element) => {
                  const isMostRecent = element.questions.some(q => q.setId === selectedSetId);
                  
                  return (
                    <div 
                      key={`${element.topic}-${element.subtopic}`}
                      className={`w-16 h-20 ${getAccuracyColor(element.metrics.accuracy)} border-2 ${getAccuracyBorderColor(element.metrics.accuracy)} rounded-md flex flex-col ${
                        isMostRecent ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : ''
                      } hover:shadow-md transition-shadow cursor-pointer overflow-hidden`}
                      onClick={() => {
                        // Find most recent question set ID for this element
                        const sortedQuestions = [...element.questions].sort(
                          (a, b) => new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime()
                        );
                        if (sortedQuestions.length > 0) {
                          onSelectSet(sortedQuestions[0].setId);
                        }
                      }}
                    >
                      {/* Element number */}
                      <div className="text-[10px] text-right pr-1 text-slate-500 dark:text-slate-400">
                        {element.number}
                      </div>
                      
                      {/* Element symbol */}
                      <div className="text-xl font-bold text-center flex-grow flex items-center justify-center">
                        <span style={{ color: getTopicColor(element.topic) }}>
                          {element.symbol}
                        </span>
                      </div>
                      
                      {/* Accuracy */}
                      <div 
                        className="h-1.5 w-full mt-auto"
                        style={{ 
                          background: `linear-gradient(to right, ${
                            element.metrics.accuracy < 40 ? 'rgb(239 68 68)' : 
                            element.metrics.accuracy < 70 ? 'rgb(234 179 8)' : 
                            'rgb(34 197 94)'
                          }, ${
                            element.metrics.accuracy < 40 ? 'rgb(239 68 68)' : 
                            element.metrics.accuracy < 70 ? 'rgb(234 179 8)' : 
                            'rgb(34 197 94)'
                          } ${element.metrics.accuracy}%, rgb(203 213 225) ${element.metrics.accuracy}%)` 
                        }}
                      ></div>
                      
                      {/* Element name (truncated) */}
                      <div className="text-[9px] px-1 py-0.5 bg-slate-100/80 dark:bg-slate-700/80 text-center truncate">
                        {element.subtopic.length > 10 
                          ? element.subtopic.substring(0, 9) + '…' 
                          : element.subtopic}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400 dark:text-slate-500">
            No questions match the selected filters.
            {(selectedSubject !== 'all' || selectedDifficulty !== 'all') && (
              <div className="mt-2">
                <button 
                  className="text-indigo-500 dark:text-indigo-400 hover:underline text-sm"
                  onClick={() => {
                    setSelectedSubject('all');
                    setSelectedDifficulty('all');
                  }}
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Legend */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700 text-sm">
        <h4 className="font-medium mb-2 text-slate-700 dark:text-slate-300">Element Guide</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 rounded"></div>
            <span className="text-slate-600 dark:text-slate-400">80-100% Accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded"></div>
            <span className="text-slate-600 dark:text-slate-400">60-79% Accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded"></div>
            <span className="text-slate-600 dark:text-slate-400">40-59% Accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700 rounded"></div>
            <span className="text-slate-600 dark:text-slate-400">20-39% Accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded"></div>
            <span className="text-slate-600 dark:text-slate-400">0-19% Accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-indigo-500 dark:border-indigo-400 rounded"></div>
            <span className="text-slate-600 dark:text-slate-400">Selected Element</span>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          <p>Each element represents a subtopic. Click on an element to view detailed questions.</p>
        </div>
      </div>
    </div>
  )
}
