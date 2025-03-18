'use client'

import React, { useState, useEffect, useRef } from 'react';
import { QuestionViewProps } from '../types';

// TreeMap component with hierarchical data visualization
export function Component({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // Extract questions data from practice sets
  const questions = practiceSets.flatMap(set => 
    set.questions.map(q => ({
      ...q,
      setId: set.id,
      setType: set.type,
      setSubject: set.subject
    }))
  );
  
  // Create references to the original props
  const onSelectQuestion = (id: string) => {
    const question = questions.find(q => q.id === id);
    if (question) {
      onSelectSet(question.setId);
    }
  };
  const selectedQuestionId = questions.find(q => q.setId === selectedSetId)?.id || null;
  const [treemapData, setTreemapData] = useState<any>({ name: 'Questions', children: [] });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCorrectOnly, setShowCorrectOnly] = useState<boolean>(false);
  const [showIncorrectOnly, setShowIncorrectOnly] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Filter options
  const difficultyOptions = ['Easy', 'Medium', 'Hard'];
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Process questions data into hierarchical structure
  useEffect(() => {
    let filteredQuestions = [...questions];
    
    // Apply filters
    if (selectedCategory !== 'all') {
      filteredQuestions = filteredQuestions.filter(q => q.topic === selectedCategory);
    }
    
    if (selectedDifficulty !== 'all') {
      filteredQuestions = filteredQuestions.filter(q => q.difficulty === selectedDifficulty);
    }
    
    if (showCorrectOnly) {
      filteredQuestions = filteredQuestions.filter(q => q.correct);
    } else if (showIncorrectOnly) {
      filteredQuestions = filteredQuestions.filter(q => !q.correct);
    }
    
    // Group by topic
    const topicGroups: Record<string, any[]> = {};
    
    filteredQuestions.forEach(question => {
      if (!topicGroups[question.topic]) {
        topicGroups[question.topic] = [];
      }
      
      topicGroups[question.topic].push(question);
    });
    
    // Group by subtopic within each topic
    const processedData = {
      name: 'Questions',
      children: Object.entries(topicGroups).map(([topic, topicQuestions]) => {
        // Group by subtopic
        const subtopicGroups: Record<string, any[]> = {};
        
        topicQuestions.forEach(question => {
          if (!subtopicGroups[question.subtopic]) {
            subtopicGroups[question.subtopic] = [];
          }
          
          subtopicGroups[question.subtopic].push(question);
        });
        
        // Create children for each subtopic
        return {
          name: topic,
          children: Object.entries(subtopicGroups).map(([subtopic, subtopicQuestions]) => {
            // Calculate size based on number of questions and time spent
            const totalTimeSpent = subtopicQuestions.reduce((sum, q) => sum + q.timeSpent, 0);
            const avgAccuracy = subtopicQuestions.filter(q => q.answered).reduce((sum, q) => sum + (q.correct ? 1 : 0), 0) / 
                               subtopicQuestions.filter(q => q.answered).length || 0;
            
            // Create leaf nodes (individual questions)
            return {
              name: subtopic,
              topic,
              children: subtopicQuestions.map(q => ({
                name: `Question ${q.id.split('-')[1] || q.id}`,
                topic,
                subtopic,
                size: q.timeSpent * 20, // Size proportional to time spent
                correct: q.correct,
                difficulty: q.difficulty,
                questionId: q.id,
                timeSpent: q.timeSpent
              })),
              totalTimeSpent,
              avgAccuracy,
              correctCount: subtopicQuestions.filter(q => q.correct).length,
              incorrectCount: subtopicQuestions.filter(q => q.answered && !q.correct).length,
              unansweredCount: subtopicQuestions.filter(q => !q.answered).length
            };
          })
        };
      })
    };
    
    setTreemapData(processedData);
  }, [questions, selectedCategory, selectedDifficulty, showCorrectOnly, showIncorrectOnly]);

  // Extract unique categories (topics)
  const categories = Array.from(new Set(questions.map(q => q.topic)));

  // Compute treemap layout
  useEffect(() => {
    if (!svgRef.current || !treemapData.children.length) return;
    
    const svg = svgRef.current;
    const width = svg.clientWidth || 800;
    const height = svg.clientHeight || 600;
    
    // Clear previous treemap
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    
    // Treemap layout algorithm
    function computeTreemap(node: any, x0: number, y0: number, x1: number, y1: number) {
      // Leaf node (question)
      if (node.children && node.children.length === 0) {
        return;
      }
      
      // Check if this is a leaf node with size
      if (node.size !== undefined) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x0.toString());
        rect.setAttribute('y', y0.toString());
        rect.setAttribute('width', (x1 - x0).toString());
        rect.setAttribute('height', (y1 - y0).toString());
        
        // Style based on question attributes
        const isHovered = hoveredItem === node.questionId;
        const isSelected = selectedQuestionId === node.questionId;
        
        let fillColor;
        // Color based on difficulty
        if (node.difficulty === 'Easy') {
          fillColor = node.correct ? '#34d399' : '#f87171';
        } else if (node.difficulty === 'Medium') {
          fillColor = node.correct ? '#60a5fa' : '#fb923c';
        } else { // Hard
          fillColor = node.correct ? '#a78bfa' : '#f43f5e';
        }
        
        // Lighter color if not answered
        if (node.answered === false) {
          fillColor = '#94a3b8';
        }
        
        // Styling
        rect.setAttribute('fill', fillColor);
        rect.setAttribute('stroke', isSelected ? '#000' : '#fff');
        rect.setAttribute('stroke-width', isSelected ? '3' : '1');
        rect.setAttribute('opacity', isHovered || isSelected ? '1' : '0.8');
        rect.setAttribute('rx', '2'); // Rounded corners
        rect.setAttribute('ry', '2');
        rect.setAttribute('data-id', node.questionId);
        rect.classList.add('question-rect');
        
        // Interaction
        rect.addEventListener('click', () => {
          onSelectQuestion?.(node.questionId);
        });
        
        rect.addEventListener('mouseenter', () => {
          setHoveredItem(node.questionId);
          
          // Show tooltip
          const tooltip = document.getElementById('treemap-tooltip');
          if (tooltip) {
            tooltip.style.display = 'block';
            tooltip.style.left = `${x0 + (x1 - x0) / 2}px`;
            tooltip.style.top = `${y0 - 40}px`;
            tooltip.innerHTML = `
              <div class="font-medium">${node.name}</div>
              <div class="text-xs">${node.difficulty} • ${node.timeSpent}s</div>
              <div class="text-xs">${node.correct ? 'Correct' : 'Incorrect'}</div>
            `;
          }
        });
        
        rect.addEventListener('mouseleave', () => {
          setHoveredItem(null);
          
          // Hide tooltip
          const tooltip = document.getElementById('treemap-tooltip');
          if (tooltip) {
            tooltip.style.display = 'none';
          }
        });
        
        svg.appendChild(rect);
        
        // Add text if there's enough space
        if ((x1 - x0) > 60 && (y1 - y0) > 20) {
          const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          text.setAttribute('x', (x0 + 5).toString());
          text.setAttribute('y', (y0 + 15).toString());
          text.setAttribute('fill', '#fff');
          text.setAttribute('font-size', '10');
          text.textContent = node.name;
          text.setAttribute('pointer-events', 'none');
          svg.appendChild(text);
        }
        
        return;
      }
      
      // Process children with treemap algorithm (simplified squarified treemap)
      const children = node.children;
      if (!children || children.length === 0) return;
      
      // Calculate total size of children
      let totalSize = 0;
      children.forEach((child: any) => {
        // For internal nodes, use sum of child sizes or count of children
        if (child.children) {
          if (child.children.some((c: any) => c.size !== undefined)) {
            child.size = child.children.reduce((sum: number, c: any) => sum + (c.size || 0), 0);
          } else {
            child.size = child.children.length * 100; // Default size for categories
          }
        }
        totalSize += child.size || 0;
      });
      
      // Sort children by size (largest first)
      children.sort((a: any, b: any) => (b.size || 0) - (a.size || 0));
      
      // Compute layout direction (horizontal if width > height)
      const horizontal = (x1 - x0) > (y1 - y0);
      
      let currentPos = horizontal ? x0 : y0;
      const availableSpace = horizontal ? (x1 - x0) : (y1 - y0);
      
      children.forEach((child: any) => {
        // Calculate child dimensions
        const childSize = child.size || 0;
        const childRatio = childSize / totalSize;
        const childExtent = availableSpace * childRatio;
        
        let cx0, cy0, cx1, cy1;
        
        if (horizontal) {
          cx0 = currentPos;
          cy0 = y0;
          cx1 = currentPos + childExtent;
          cy1 = y1;
          currentPos = cx1;
        } else {
          cx0 = x0;
          cy0 = currentPos;
          cx1 = x1;
          cy1 = currentPos + childExtent;
          currentPos = cy1;
        }
        
        // Draw rectangle for category or subtopic
        if (child.children && (child.topic || child.name === child.topic)) {
          // This is a topic (top level)
          const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          rect.setAttribute('x', cx0.toString());
          rect.setAttribute('y', cy0.toString());
          rect.setAttribute('width', (cx1 - cx0).toString());
          rect.setAttribute('height', (cy1 - cy0).toString());
          
          // Style based on topic
          let topicColor;
          switch (child.name) {
            case 'Algebra':
            case 'Geometry':
            case 'Statistics':
            case 'Calculus':
              topicColor = '#3b82f6'; // blue
              break;
            case 'Reading Comprehension':
            case 'Reading Analysis':
            case 'Vocabulary':
              topicColor = '#10b981'; // green
              break;
            case 'Grammar':
            case 'Essay Writing':
            case 'Punctuation':
              topicColor = '#f59e0b'; // amber
              break;
            default:
              topicColor = '#64748b'; // slate
          }
          
          rect.setAttribute('fill', topicColor);
          rect.setAttribute('fill-opacity', '0.2');
          rect.setAttribute('stroke', topicColor);
          rect.setAttribute('stroke-width', '2');
          rect.setAttribute('rx', '4'); // Rounded corners
          rect.setAttribute('ry', '4');
          svg.appendChild(rect);
          
          // Add topic label if enough space
          if ((cx1 - cx0) > 80 && (cy1 - cy0) > 30) {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', (cx0 + 10).toString());
            text.setAttribute('y', (cy0 + 20).toString());
            text.setAttribute('fill', '#000');
            text.setAttribute('font-size', '14');
            text.setAttribute('font-weight', 'bold');
            text.textContent = child.name;
            svg.appendChild(text);
          }
        } else if (child.topic && child.name !== child.topic) {
          // This is a subtopic
          const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          rect.setAttribute('x', cx0.toString());
          rect.setAttribute('y', cy0.toString());
          rect.setAttribute('width', (cx1 - cx0).toString());
          rect.setAttribute('height', (cy1 - cy0).toString());
          
          // Style based on topic and accuracy
          let topicColor;
          switch (child.topic) {
            case 'Algebra':
            case 'Geometry':
            case 'Statistics':
            case 'Calculus':
              topicColor = '#93c5fd'; // light blue
              break;
            case 'Reading Comprehension':
            case 'Reading Analysis':
            case 'Vocabulary':
              topicColor = '#6ee7b7'; // light green
              break;
            case 'Grammar':
            case 'Essay Writing':
            case 'Punctuation':
              topicColor = '#fcd34d'; // light amber
              break;
            default:
              topicColor = '#cbd5e1'; // light slate
          }
          
          rect.setAttribute('fill', topicColor);
          rect.setAttribute('fill-opacity', '0.3');
          rect.setAttribute('stroke', topicColor);
          rect.setAttribute('stroke-width', '1');
          rect.setAttribute('rx', '3'); // Rounded corners
          rect.setAttribute('ry', '3');
          svg.appendChild(rect);
          
          // Add subtopic label if enough space
          if ((cx1 - cx0) > 70 && (cy1 - cy0) > 25) {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', (cx0 + 8).toString());
            text.setAttribute('y', (cy0 + 16).toString());
            text.setAttribute('fill', '#000');
            text.setAttribute('font-size', '12');
            text.textContent = child.name;
            svg.appendChild(text);
            
            // Add stats if enough space
            if ((cx1 - cx0) > 120 && (cy1 - cy0) > 50) {
              const statsText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
              statsText.setAttribute('x', (cx0 + 8).toString());
              statsText.setAttribute('y', (cy0 + 32).toString());
              statsText.setAttribute('fill', '#64748b');
              statsText.setAttribute('font-size', '10');
              statsText.textContent = `${child.correctCount} correct, ${child.incorrectCount} incorrect`;
              svg.appendChild(statsText);
            }
          }
        }
        
        // Recursively process child
        computeTreemap(child, cx0, cy0, cx1, cy1);
      });
    }
    
    // Start the treemap computation
    computeTreemap(treemapData, 0, 0, width, height);
    
  }, [treemapData, hoveredItem, selectedQuestionId, onSelectQuestion]);

  // Get selected question details
  const selectedQuestion = selectedQuestionId 
    ? questions.find(q => q.id === selectedQuestionId)
    : null;

  return (
    <div className="treemap-view bg-white dark:bg-slate-900 rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 md:mb-0">
          Hierarchical TreeMap View
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
            {difficultyOptions.map(diff => (
              <option key={diff} value={diff}>{diff}</option>
            ))}
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
      
      <div className="treemap-container flex flex-col md:flex-row gap-6">
        {/* TreeMap visualization */}
        <div className="w-full md:w-2/3 bg-slate-50 dark:bg-slate-800 rounded-lg p-4 relative">
          {treemapData.children.length > 0 ? (
            <>
              <svg 
                ref={svgRef} 
                className="w-full h-[500px]" 
                viewBox="0 0 800 600" 
                preserveAspectRatio="xMidYMid meet"
              ></svg>
              <div 
                id="treemap-tooltip" 
                className="absolute hidden bg-white dark:bg-slate-700 p-2 shadow-lg rounded border border-slate-200 dark:border-slate-600 text-sm z-10 transform -translate-x-1/2"
              ></div>
            </>
          ) : (
            <div className="h-[500px] flex items-center justify-center text-slate-500 dark:text-slate-400">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p>No questions match your current filters</p>
              </div>
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
                    Hierarchical Position
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="h-4 w-4 bg-slate-200 dark:bg-slate-700 rounded mr-2 flex items-center justify-center">
                        <span className="h-2 w-2 bg-slate-500 dark:bg-slate-400 rounded-sm"></span>
                      </span>
                      <span className="text-sm text-slate-700 dark:text-slate-300">Root</span>
                    </div>
                    <div className="flex items-center">
                      <span className="h-4 w-4 ml-2 bg-slate-200 dark:bg-slate-700 rounded mr-2 flex items-center justify-center">
                        <span className="h-2 w-2 bg-blue-500 dark:bg-blue-400 rounded-sm"></span>
                      </span>
                      <span className="text-sm text-slate-700 dark:text-slate-300">{selectedQuestion.topic}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="h-4 w-4 ml-4 bg-slate-200 dark:bg-slate-700 rounded mr-2 flex items-center justify-center">
                        <span className="h-2 w-2 bg-emerald-500 dark:bg-emerald-400 rounded-sm"></span>
                      </span>
                      <span className="text-sm text-slate-700 dark:text-slate-300">{selectedQuestion.subtopic}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="h-4 w-4 ml-6 bg-slate-200 dark:bg-slate-700 rounded mr-2 flex items-center justify-center">
                        <span className="h-2 w-2 bg-amber-500 dark:bg-amber-400 rounded-sm"></span>
                      </span>
                      <span className="text-sm text-slate-700 dark:text-slate-300">Question {selectedQuestion.id.split('-')[1] || selectedQuestion.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-slate-500 dark:text-slate-400">
                Select a rectangle to view question details
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">
                Rectangles are sized by time spent and colored by category
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
        <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-3">TreeMap Legend</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Hierarchy</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="w-4 h-4 rounded bg-blue-500 opacity-20 border border-blue-500 mr-2"></span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Topic Sections</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 rounded bg-green-500 opacity-20 border border-green-500 mr-2"></span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Subtopic Groups</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 rounded bg-green-500 mr-2"></span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Individual Questions</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Size</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="w-6 h-4 rounded bg-slate-300 dark:bg-slate-600 mr-2"></span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Smaller (Less Time)</span>
              </div>
              <div className="flex items-center">
                <span className="w-10 h-4 rounded bg-slate-300 dark:bg-slate-600 mr-2"></span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Larger (More Time)</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Status & Difficulty</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="w-4 h-4 rounded bg-green-500 mr-2"></span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Easy & Correct</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 rounded bg-blue-500 mr-2"></span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Medium & Correct</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 rounded bg-purple-500 mr-2"></span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Hard & Correct</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 rounded bg-red-500 mr-2"></span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Incorrect</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component;