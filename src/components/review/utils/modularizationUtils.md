# Example Implementation of a View Component

This document provides a practical example of how an existing view (TreeMapView) would be refactored according to the new modularization strategy.

## Original Structure

Currently, the TreeMapView is implemented as a single file:

```
src/components/review/question-view-variants/TreeMapView.tsx
```

## New Modular Structure

Under the new architecture, the TreeMapView would be organized as follows:

```
src/components/review/question-view-variants/tree-map/
├── index.ts              # Public API and registration
├── Component.tsx         # Main component implementation
├── types.ts              # Type definitions specific to TreeMapView
├── hooks.ts              # Custom hooks for TreeMapView
└── utilities.ts          # Helper functions
```

## Implementation Example

### 1. index.ts

```typescript
// src/components/review/question-view-variants/tree-map/index.ts

import { TreeMapView } from './Component';
import { TreeMapViewProps } from './types';

// Register with the view registry
import { registerQuestionView } from '../../registry/viewRegistry';

registerQuestionView({
  id: 'tree-map',
  name: 'TreeMap View',
  description: 'Visualizes questions as a treemap where rectangle size represents count and color represents accuracy',
  component: TreeMapView,
  tags: ['data-visualization', 'hierarchical', 'accuracy'],
  thumbnailUrl: '/thumbnails/tree-map-view.png',
});

// Export public API
export { TreeMapView };
export type { TreeMapViewProps };
```

### 2. types.ts

```typescript
// src/components/review/question-view-variants/tree-map/types.ts

import { QuestionViewProps } from '../../types/question-view-types';
import { QuestionWithMetadata } from '../../shared/types';

// Extend base QuestionViewProps with TreeMap-specific props
export interface TreeMapViewProps extends QuestionViewProps {
  initialMode?: 'topic' | 'subject';
}

// TreeMap-specific interfaces
export interface TreeMapBlock {
  id: string;
  title: string;
  count: number;
  accuracy: number;
  questions: QuestionWithMetadata[];
}

export interface SelectedStats {
  correct: number;
  incorrect: number;
  accuracy: number;
  avgTime: number;
}
```

### 3. hooks.ts

```typescript
// src/components/review/question-view-variants/tree-map/hooks.ts

import { useState, useEffect } from 'react';
import { PracticeSet } from '@/lib/mockData';
import { QuestionWithMetadata } from '../../shared/types';
import { extractQuestionsWithMetadata } from '../../shared/utils/questionUtils';
import { TreeMapBlock, SelectedStats } from './types';
import { buildTreeMapData, getSelectedStats } from './utilities';

/**
 * Hook to manage TreeMap data and state
 */
export function useTreeMap(practiceSets: PracticeSet[]) {
  // State variables
  const [allQuestions, setAllQuestions] = useState<QuestionWithMetadata[]>([]);
  const [treeMapMode, setTreeMapMode] = useState<'topic' | 'subject'>('topic');
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  
  // Process questions when practiceSets change
  useEffect(() => {
    const questions = extractQuestionsWithMetadata(practiceSets);
    setAllQuestions(questions);
  }, [practiceSets]);
  
  // Build treemap blocks based on current mode
  const blocks = buildTreeMapData(allQuestions, treeMapMode);
  
  // Get selected questions
  const selectedQuestions = selectedBlock 
    ? blocks.find(block => block.id === selectedBlock)?.questions || []
    : [];
  
  // Calculate statistics for selected questions
  const selectedStats: SelectedStats = getSelectedStats(selectedQuestions);
  
  return {
    treeMapMode,
    setTreeMapMode,
    selectedBlock,
    setSelectedBlock,
    blocks,
    selectedQuestions,
    selectedStats
  };
}
```

### 4. utilities.ts

```typescript
// src/components/review/question-view-variants/tree-map/utilities.ts

import { QuestionWithMetadata } from '../../shared/types';
import { TreeMapBlock, SelectedStats } from './types';

/**
 * Builds TreeMap data structures based on questions and current mode
 */
export function buildTreeMapData(
  allQuestions: QuestionWithMetadata[], 
  mode: 'topic' | 'subject'
): TreeMapBlock[] {
  if (mode === 'topic') {
    // Group by topic
    const topicGroups = new Map<string, QuestionWithMetadata[]>();
    
    allQuestions.forEach(question => {
      if (!topicGroups.has(question.topic)) {
        topicGroups.set(question.topic, []);
      }
      topicGroups.get(question.topic)?.push(question);
    });
    
    // Calculate metrics and sort by size
    const blocks = Array.from(topicGroups.entries())
      .map(([topic, questions]) => {
        const correctCount = questions.filter(q => q.correct).length;
        const accuracy = questions.length > 0 ? (correctCount / questions.length) * 100 : 0;
        
        return {
          id: topic,
          title: topic,
          count: questions.length,
          accuracy,
          questions
        };
      })
      .sort((a, b) => b.count - a.count); // Sort by count descending
    
    return blocks;
  } else {
    // Group by subject
    const subjectGroups = new Map<string, QuestionWithMetadata[]>();
    
    allQuestions.forEach(question => {
      if (!subjectGroups.has(question.setSubject)) {
        subjectGroups.set(question.setSubject, []);
      }
      subjectGroups.get(question.setSubject)?.push(question);
    });
    
    // Calculate metrics and sort by size
    const blocks = Array.from(subjectGroups.entries())
      .map(([subject, questions]) => {
        const correctCount = questions.filter(q => q.correct).length;
        const accuracy = questions.length > 0 ? (correctCount / questions.length) * 100 : 0;
        
        return {
          id: subject,
          title: subject,
          count: questions.length,
          accuracy,
          questions
        };
      })
      .sort((a, b) => b.count - a.count); // Sort by count descending
    
    return blocks;
  }
}

/**
 * Generate color based on accuracy percentage
 */
export function getAccuracyColor(accuracy: number): string {
  if (accuracy >= 90) return 'bg-green-500 dark:bg-green-600';
  if (accuracy >= 80) return 'bg-green-400 dark:bg-green-500';
  if (accuracy >= 70) return 'bg-emerald-400 dark:bg-emerald-500';
  if (accuracy >= 60) return 'bg-yellow-400 dark:bg-yellow-500';
  if (accuracy >= 50) return 'bg-amber-400 dark:bg-amber-500';
  if (accuracy >= 40) return 'bg-orange-400 dark:bg-orange-500';
  if (accuracy >= 30) return 'bg-red-400 dark:bg-red-500';
  return 'bg-red-500 dark:bg-red-600';
}

/**
 * Get text color based on background color for better contrast
 */
export function getTextColor(accuracy: number): string {
  return accuracy < 60 ? 'text-white' : 'text-slate-900 dark:text-white';
}

/**
 * Format percentage for display
 */
export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

/**
 * Calculate statistics for the selected questions
 */
export function getSelectedStats(questions: QuestionWithMetadata[]): SelectedStats {
  const totalCount = questions.length;
  if (totalCount === 0) return { correct: 0, incorrect: 0, accuracy: 0, avgTime: 0 };
  
  const correctCount = questions.filter(q => q.correct).length;
  const accuracy = (correctCount / totalCount) * 100;
  const avgTime = questions.reduce((sum, q) => sum + q.timeSpent, 0) / totalCount;
  
  return {
    correct: correctCount,
    incorrect: totalCount - correctCount,
    accuracy,
    avgTime
  };
}
```

### 5. Component.tsx

```typescript
// src/components/review/question-view-variants/tree-map/Component.tsx

'use client';

import React from 'react';
import { TreeMapViewProps } from './types';
import { useTreeMap } from './hooks';
import { getAccuracyColor, getTextColor, formatPercentage } from './utilities';

/**
 * TreeMap View - Visualizes questions in a treemap layout
 * Rectangle size represents question count and color represents accuracy
 */
export function TreeMapView({
  practiceSets,
  onSelectSet,
  selectedSetId,
  initialMode = 'topic'
}: TreeMapViewProps) {
  // Use the custom hook to manage state and data
  const {
    treeMapMode,
    setTreeMapMode,
    selectedBlock,
    setSelectedBlock,
    blocks,
    selectedQuestions,
    selectedStats
  } = useTreeMap(practiceSets);
  
  // Generate treemap blocks with content
  const generateTreeMapBlocks = () => {
    const totalCount = blocks.reduce((sum, block) => sum + block.count, 0);
    
    // Create flexible layout
    const rows: any[] = [];
    let currentRow: any[] = [];
    let currentRowSize = 0;
    const targetRowSize = totalCount / 3; // Aim for roughly 3 rows
    
    blocks.forEach(block => {
      if (currentRowSize > 0 && currentRowSize + block.count > targetRowSize * 1.2) {
        // Start a new row if this would make current row too big
        rows.push([...currentRow]);
        currentRow = [block];
        currentRowSize = block.count;
      } else {
        currentRow.push(block);
        currentRowSize += block.count;
      }
    });
    
    // Add the last row if not empty
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }
    
    // Render the rows and blocks with flex layout
    return rows.map((row, rowIndex) => {
      const rowTotal = row.reduce((sum: number, block: any) => sum + block.count, 0);
      
      return (
        <div key={`row-${rowIndex}`} className="flex w-full mb-2">
          {row.map((block: any) => {
            const flexBasis = `${(block.count / rowTotal) * 100}%`;
            const isSelected = selectedBlock === block.id;
            
            return (
              <div
                key={block.id}
                onClick={() => setSelectedBlock(isSelected ? null : block.id)}
                className={`
                  ${getAccuracyColor(block.accuracy)} 
                  ${getTextColor(block.accuracy)}
                  p-3 m-1 rounded-lg flex flex-col justify-between
                  transition-all duration-200 cursor-pointer
                  ${isSelected ? 'ring-4 ring-indigo-500 dark:ring-indigo-400 shadow-lg' : 'hover:shadow-md'}
                `}
                style={{ flexBasis }}
              >
                <div className="font-bold truncate">{block.title}</div>
                <div className="flex justify-between items-end">
                  <div className="text-sm opacity-90">{block.count} questions</div>
                  <div className="text-2xl font-bold">{formatPercentage(block.accuracy)}</div>
                </div>
              </div>
            );
          })}
        </div>
      );
    });
  };
  
  // Component rendering
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">TreeMap View</h3>
      
      {/* Mode selector */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-100 dark:bg-slate-800 inline-flex p-1 rounded-lg">
          <button
            onClick={() => setTreeMapMode('topic')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              treeMapMode === 'topic' 
                ? 'bg-white dark:bg-slate-700 shadow-sm' 
                : 'hover:bg-white/50 dark:hover:bg-slate-700/50'
            }`}
          >
            By Topic
          </button>
          <button
            onClick={() => setTreeMapMode('subject')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              treeMapMode === 'subject' 
                ? 'bg-white dark:bg-slate-700 shadow-sm' 
                : 'hover:bg-white/50 dark:hover:bg-slate-700/50'
            }`}
          >
            By Subject
          </button>
        </div>
      </div>
      
      {/* TreeMap visualization */}
      <div className="max-w-4xl mx-auto">
        {generateTreeMapBlocks()}
      </div>
      
      {/* Selected block details */}
      {selectedBlock && selectedQuestions.length > 0 && (
        <div className="mt-8 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 max-w-4xl mx-auto">
          <h4 className="font-semibold mb-3 text-lg">
            {selectedBlock}
          </h4>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-md">
              <div className="text-xs text-slate-500 dark:text-slate-400">Questions</div>
              <div className="text-xl font-semibold">{selectedQuestions.length}</div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
              <div className="text-xs text-slate-500 dark:text-slate-400">Correct</div>
              <div className="text-xl font-semibold text-green-600 dark:text-green-400">{selectedStats.correct}</div>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
              <div className="text-xs text-slate-500 dark:text-slate-400">Incorrect</div>
              <div className="text-xl font-semibold text-red-600 dark:text-red-400">{selectedStats.incorrect}</div>
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-md">
              <div className="text-xs text-slate-500 dark:text-slate-400">Avg. Time</div>
              <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">{Math.round(selectedStats.avgTime)}s</div>
            </div>
          </div>
          
          <h5 className="font-medium mb-2 text-sm">Questions</h5>
          <div className="max-h-[250px] overflow-y-auto space-y-2 pr-1">
            {selectedQuestions.map(question => (
              <div 
                key={question.id}
                onClick={() => onSelectSet && onSelectSet(question.setId)}
                className={`p-3 border rounded-lg flex items-center justify-between cursor-pointer ${
                  selectedSetId === question.setId 
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' 
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <div>
                  <div className="font-medium text-sm">
                    {question.setSubject} • {question.topic}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {question.subtopic} • From {question.setType}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    question.correct 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {question.correct ? 'Correct' : 'Incorrect'}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {question.timeSpent}s
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Legend */}
      <div className="flex justify-center items-center mt-8 text-xs space-x-2">
        <div className="font-medium text-slate-500 dark:text-slate-400 mr-1">Accuracy:</div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 dark:bg-red-600 rounded-sm"></div>
          <span className="ml-1">0-40%</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-amber-400 dark:bg-amber-500 rounded-sm"></div>
          <span className="ml-1">40-70%</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 dark:bg-green-600 rounded-sm"></div>
          <span className="ml-1">70-100%</span>
        </div>
        <div className="ml-2 font-medium text-slate-500 dark:text-slate-400">Block Size: Question Count</div>
      </div>
    </div>
  );
}
```

## Benefits of the New Structure

### 1. Separation of Concerns
- Logic is separated from UI rendering
- State management is isolated in hooks
- Helper functions are organized in utility files

### 2. Reusability
- Utility functions can be reused across components
- Hooks can be shared or adapted for similar components
- Types are clearly defined and can be extended

### 3. Maintainability
- Each file has a clear purpose
- Files are smaller and focused on a single concern
- Dependencies are explicit and well-organized

### 4. Testability
- Pure utility functions are easy to test
- Hook logic can be tested separately from rendering
- Component rendering can be tested with mock data

### 5. Scalability
- Easy to add new features or modify existing ones
- Pattern can be replicated for all view variants
- Central registration makes component discovery automatic
