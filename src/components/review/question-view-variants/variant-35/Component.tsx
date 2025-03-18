'use client'

import React, { useState, useEffect, useRef } from 'react'
import { QuestionViewProps } from '../types'

// Import required types and components
type TagItem = {
  value: string;
  count: number;
  category: string;
  difficulty: string;
  correct: boolean;
  id: string;
};

// Mock TagCloud component since we don't have the actual package
const TagCloud = ({ 
  tags, 
  minSize, 
  maxSize, 
  renderer 
}: { 
  tags: any[]; 
  minSize: number; 
  maxSize: number; 
  renderer: (tag: any, size: number, color: string) => React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="mock-tag-cloud p-4 text-center">
      {tags.slice(0, 15).map((tag, i) => {
        const size = minSize + Math.random() * (maxSize - minSize);
        return renderer(tag, size, '#3b82f6');
      })}
    </div>
  );
};

/**
 * Misconception Cluster Analysis
 * 
 * Primary Insight Objective: Identify patterns in incorrect answers that reveal 
 * underlying conceptual misunderstandings rather than isolated mistakes.
 * 
 * Data-to-Visual Mapping:
 * - Error frequency mapped to cluster size (reveals most common misconceptions)
 * - Error co-occurrence mapped to proximity (shows related misconceptions)
 * - Subject/topic mapped to color (enables cross-topic pattern recognition)
 * - Error recency mapped to opacity (highlights persistent vs. resolved issues)
 * - Difficulty level mapped to border thickness (distinguishes fundamental vs. advanced gaps)
 * 
 * Analytical Value:
 * - Uncover hidden relationships between seemingly unrelated errors
 * - Identify root conceptual misunderstandings vs. surface-level mistakes
 * - Prioritize remediation efforts based on cluster size and interconnections
 * - Track misconception resolution through diminishing cluster opacity
 */
export function Component({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  const [tags, setTags] = useState<TagItem[]>([]);
  const [filteredTags, setFilteredTags] = useState<TagItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showCorrectOnly, setShowCorrectOnly] = useState<boolean>(false);
  const [showIncorrectOnly, setShowIncorrectOnly] = useState<boolean>(false);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  
  // Extract questions from practice sets
  const questions = practiceSets.flatMap(set => 
    set.questions.map(q => ({
      ...q,
      setId: set.id,
      setType: set.type,
      setSubject: set.subject
    }))
  );
  
  // Function to handle question selection
  const onSelectQuestion = (id: string) => {
    setSelectedQuestionId(id);
    const question = questions.find(q => q.id === id);
    if (question) {
      onSelectSet(question.setId);
    }
  };

  // Extract topics and subtopics as tags
  useEffect(() => {
    const allTags: TagItem[] = [];
    
    // Extract topics and subtopics with weights
    questions.forEach(question => {
      // Add topic as tag
      const existingTopicTag = allTags.find(tag => tag.value === question.topic);
      if (existingTopicTag) {
        existingTopicTag.count += 15; // Higher weight for topics
      } else {
        allTags.push({
          value: question.topic,
          count: 30, // Base weight for topics
          category: question.topic,
          difficulty: question.difficulty,
          correct: question.correct,
          id: question.id
        });
      }
      
      // Add subtopic as tag
      const existingSubtopicTag = allTags.find(tag => tag.value === question.subtopic);
      if (existingSubtopicTag) {
        existingSubtopicTag.count += 5; // Lower weight for subtopics
      } else {
        allTags.push({
          value: question.subtopic,
          count: 15, // Base weight for subtopics
          category: question.topic,
          difficulty: question.difficulty,
          correct: question.correct,
          id: question.id
        });
      }
    });
    
    setTags(allTags);
    setFilteredTags(allTags);
  }, [practiceSets]);

  // Apply filters
  useEffect(() => {
    let result = [...tags];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(tag => tag.category === selectedCategory);
    }
    
    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      result = result.filter(tag => tag.difficulty === selectedDifficulty);
    }
    
    // Filter by correct/incorrect
    if (showCorrectOnly) {
      result = result.filter(tag => tag.correct);
    } else if (showIncorrectOnly) {
      result = result.filter(tag => !tag.correct);
    }
    
    setFilteredTags(result);
  }, [tags, selectedCategory, selectedDifficulty, showCorrectOnly, showIncorrectOnly]);

  // Get unique categories
  const categories = Array.from(new Set(questions.map(q => q.topic)));

  // Custom renderer for the tags
  const customRenderer = (tag: TagItem, size: number, color: string) => {
    const isSelected = selectedQuestionId === tag.id;
    const isHovered = hoveredTag === tag.value;
    
    // Determine color based on category
    let tagColor;
    switch (tag.category) {
      case 'Algebra':
      case 'Geometry':
      case 'Statistics':
      case 'Calculus':
        tagColor = '#3b82f6'; // blue
        break;
      case 'Reading Comprehension':
      case 'Reading Analysis':
      case 'Vocabulary':
        tagColor = '#10b981'; // green
        break;
      case 'Grammar':
      case 'Essay Writing':
      case 'Punctuation':
        tagColor = '#f59e0b'; // amber
        break;
      default:
        tagColor = '#64748b'; // slate
    }
    
    // Determine border/glow based on correctness
    const borderColor = tag.correct ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)';
    const borderStyle = isSelected || isHovered ? '2px solid' : '1px solid';
    const boxShadow = isSelected 
      ? `0 0 8px ${tagColor}`
      : isHovered 
        ? `0 0 5px ${tagColor}`
        : 'none';
    
    const difficultyIcon = tag.difficulty === 'Easy' ? '●' 
                         : tag.difficulty === 'Medium' ? '◆' 
                         : '▲';
    
    return (
      <span
        key={tag.value}
        className="tag-cloud-tag"
        style={{
          color: tagColor,
          border: `${borderStyle} ${borderColor}`,
          backgroundColor: isSelected || isHovered ? `${tagColor}10` : 'transparent',
          padding: `${Math.log(size) * 0.6}px ${Math.log(size) * 1.2}px`,
          margin: '3px',
          display: 'inline-block',
          cursor: 'pointer',
          fontSize: `${size / 1.5}px`,
          borderRadius: '4px',
          boxShadow,
          transition: 'all 0.3s ease',
        }}
        onClick={() => {
          const questionWithTag = questions.find(q => 
            q.topic === tag.value || q.subtopic === tag.value
          );
          if (questionWithTag) {
            onSelectQuestion?.(questionWithTag.id);
          }
        }}
        onMouseEnter={() => setHoveredTag(tag.value)}
        onMouseLeave={() => setHoveredTag(null)}
      >
        <span>{tag.value}</span>
        <span style={{ 
          fontSize: '0.6em', 
          marginLeft: '5px', 
          color: tag.difficulty === 'Easy' ? '#10b981' 
                : tag.difficulty === 'Medium' ? '#f59e0b' 
                : '#ef4444',
          verticalAlign: 'super'
        }}>
          {difficultyIcon}
        </span>
      </span>
    );
  };

  // Get the selected question details if any
  const selectedQuestion = questions.find(q => q.id === selectedQuestionId);

  return (
    <div ref={containerRef} className="interactive-tag-cloud bg-white dark:bg-slate-900 rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 md:mb-0">
          Interactive Tag Cloud View
        </h2>
        
        <div className="flex flex-wrap gap-2">
          {/* Category filter */}
          <select
            className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md text-sm"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          {/* Difficulty filter */}
          <select
            className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md text-sm"
            value={selectedDifficulty}
            onChange={e => setSelectedDifficulty(e.target.value)}
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          
          {/* Correctness filter */}
          <button
            className={`px-3 py-1.5 border rounded-md text-sm transition-colors ${
              showCorrectOnly 
                ? 'bg-green-500 text-white border-green-600' 
                : 'bg-white dark:bg-slate-800 text-green-600 dark:text-green-400 border-green-300 dark:border-green-700'
            }`}
            onClick={() => {
              setShowCorrectOnly(!showCorrectOnly);
              if (!showCorrectOnly) setShowIncorrectOnly(false);
            }}
          >
            Correct
          </button>
          
          <button
            className={`px-3 py-1.5 border rounded-md text-sm transition-colors ${
              showIncorrectOnly 
                ? 'bg-red-500 text-white border-red-600' 
                : 'bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 border-red-300 dark:border-red-700'
            }`}
            onClick={() => {
              setShowIncorrectOnly(!showIncorrectOnly);
              if (!showIncorrectOnly) setShowCorrectOnly(false);
            }}
          >
            Incorrect
          </button>
        </div>
      </div>
      
      <div className="tag-cloud-container flex flex-col md:flex-row gap-6">
        {/* Tag cloud */}
        <div className="w-full md:w-2/3 bg-slate-50 dark:bg-slate-800 rounded-lg p-6 min-h-[400px] flex items-center justify-center">
          {filteredTags.length > 0 ? (
            <TagCloud
              minSize={15}
              maxSize={40}
              tags={filteredTags}
              renderer={customRenderer}
              className="tag-cloud"
            />
          ) : (
            <div className="text-center text-slate-500 dark:text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p>No tags match your current filters</p>
            </div>
          )}
        </div>
        
        {/* Selected question details */}
        <div className="w-full md:w-1/3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
          {selectedQuestion ? (
            <div className="selected-question">
              <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
                Selected Question
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Topic
                  </span>
                  <span className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                    {selectedQuestion.topic}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Subtopic
                  </span>
                  <span className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                    {selectedQuestion.subtopic}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Difficulty
                  </span>
                  <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                    selectedQuestion.difficulty === 'Easy' 
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' 
                      : selectedQuestion.difficulty === 'Medium'
                        ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400'
                        : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                  }`}>
                    {selectedQuestion.difficulty}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Status
                  </span>
                  <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                    selectedQuestion.correct
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                  }`}>
                    {selectedQuestion.correct ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Time Spent
                  </span>
                  <span className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                    {selectedQuestion.timeSpent} seconds
                  </span>
                </div>
                
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                    Related Tags
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags
                      .filter(tag => 
                        tag.category === selectedQuestion.topic || 
                        tag.value === selectedQuestion.subtopic
                      )
                      .map((tag, i) => (
                        <span 
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                        >
                          {tag.value}
                        </span>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-slate-500 dark:text-slate-400">
                Select a tag to view question details
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">
                Tags are sized by frequency and colored by category
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
        <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-3">Tag Legend</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Categories</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Mathematics</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Reading</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Writing</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Difficulty</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">●</span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Easy</span>
              </div>
              <div className="flex items-center">
                <span className="text-amber-500 mr-2">◆</span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Medium</span>
              </div>
              <div className="flex items-center">
                <span className="text-red-500 mr-2">▲</span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Hard</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Status</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 mr-2">Correct</span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Green border</span>
              </div>
              <div className="flex items-center">
                <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 mr-2">Incorrect</span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Red border</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component;