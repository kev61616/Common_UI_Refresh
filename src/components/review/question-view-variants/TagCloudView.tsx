'use client'

import React, { useState, useEffect } from 'react'
import { QuestionViewProps } from './types'
import { QuestionWithMetadata } from '../question-view/types'
import { extractQuestionsWithMetadata } from '../question-view/utils'

/**
 * Tag Cloud View (Question View Variant 7)
 * Interactive visualization showing question topics/subtopics as tags with size indicating frequency
 */
export function TagCloudView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  const [allQuestions, setAllQuestions] = useState<QuestionWithMetadata[]>([])
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [filter, setFilter] = useState<'topic' | 'subtopic' | 'difficulty'>('topic')
  const [minFontSize, setMinFontSize] = useState(12)
  const [maxFontSize, setMaxFontSize] = useState(32)
  
  // Process questions when practiceSets change
  useEffect(() => {
    const questions = extractQuestionsWithMetadata(practiceSets)
    setAllQuestions(questions)
  }, [practiceSets])
  
  // Calculate frequency of tags from the data based on the selected filter
  const calculateTagFrequency = () => {
    const tagMap = new Map<string, {
      count: number;
      correctCount: number;
      setIds: Set<string>;
    }>();
    
    allQuestions.forEach(question => {
      let tag: string;
      if (filter === 'topic') {
        tag = question.topic;
      } else if (filter === 'subtopic') {
        tag = question.subtopic;
      } else { // difficulty
        tag = question.difficulty;
      }
      
      if (!tagMap.has(tag)) {
        tagMap.set(tag, {
          count: 0,
          correctCount: 0,
          setIds: new Set()
        });
      }
      
      const tagInfo = tagMap.get(tag)!;
      tagInfo.count += 1;
      if (question.correct) {
        tagInfo.correctCount += 1;
      }
      tagInfo.setIds.add(question.setId);
    });
    
    return tagMap;
  };
  
  const tagFrequency = calculateTagFrequency();
  
  // Convert Map to Array for easier rendering
  const tagData = Array.from(tagFrequency.entries()).map(([tag, info]) => ({
    tag,
    count: info.count,
    correctCount: info.correctCount,
    accuracy: info.count > 0 ? (info.correctCount / info.count) * 100 : 0,
    setIds: Array.from(info.setIds)
  }));
  
  // Sort by count (most frequent first)
  tagData.sort((a, b) => b.count - a.count);
  
  // Calculate font size based on frequency
  const maxCount = Math.max(...tagData.map(t => t.count));
  const calculateFontSize = (count: number) => {
    return minFontSize + ((count / maxCount) * (maxFontSize - minFontSize));
  };
  
  // Get color based on accuracy
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (accuracy >= 60) return 'text-amber-600 dark:text-amber-400';
    return 'text-rose-600 dark:text-rose-400';
  };
  
  // Questions related to the selected tag
  const relatedQuestions = selectedTag ? 
    allQuestions.filter(q => {
      if (filter === 'topic') return q.topic === selectedTag;
      if (filter === 'subtopic') return q.subtopic === selectedTag;
      return q.difficulty === selectedTag;
    }) : [];
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">7. Tag Cloud View</h3>
      
      {/* Controls */}
      <div className="flex justify-between mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('topic')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              filter === 'topic'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300'
                : 'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            Topic Tags
          </button>
          <button
            onClick={() => setFilter('subtopic')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              filter === 'subtopic'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300'
                : 'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            Subtopic Tags
          </button>
          <button
            onClick={() => setFilter('difficulty')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              filter === 'difficulty'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300'
                : 'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            Difficulty Tags
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1 items-center">
            <span className="text-xs text-slate-500 dark:text-slate-400">Size:</span>
            <input
              type="range"
              min="8"
              max="40"
              value={maxFontSize}
              onChange={(e) => setMaxFontSize(parseInt(e.target.value))}
              className="w-20"
            />
          </div>
        </div>
      </div>
      
      {/* Tag Cloud */}
      <div className="min-h-[300px] bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8 flex flex-wrap justify-center items-center content-center gap-3 gap-y-6">
        {tagData.map(({ tag, count, accuracy }) => (
          <div
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={`cursor-pointer transition-all px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-700/30 rounded ${
              selectedTag === tag ? 'bg-slate-100 dark:bg-slate-700/50 rounded-md shadow-sm' : ''
            }`}
            style={{
              fontSize: `${calculateFontSize(count)}px`,
              fontWeight: count > maxCount * 0.7 ? 'bold' : 'normal',
            }}
          >
            <span className={getAccuracyColor(accuracy)}>{tag}</span>
            <span className="text-[10px] text-slate-400 ml-1 align-top">
              {count}
            </span>
          </div>
        ))}
        
        {tagData.length === 0 && (
          <div className="text-slate-500 dark:text-slate-400 text-center p-12">
            No data available for the selected filter.
          </div>
        )}
      </div>
      
      {/* Selected Tag Info */}
      {selectedTag && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold">
              Questions with{' '}
              {filter === 'topic' ? 'Topic' : filter === 'subtopic' ? 'Subtopic' : 'Difficulty'}:{' '}
              <span className={getAccuracyColor(
                tagFrequency.get(selectedTag)?.count ? 
                (tagFrequency.get(selectedTag)!.correctCount / tagFrequency.get(selectedTag)!.count) * 100 : 0
              )}>
                {selectedTag}
              </span>
            </h4>
            <button
              onClick={() => setSelectedTag(null)}
              className="text-xs px-2 py-1 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600"
            >
              Close
            </button>
          </div>
          
          <div className="space-y-2 max-h-[250px] overflow-y-auto">
            {relatedQuestions.map(question => (
              <div
                key={question.id}
                onClick={() => onSelectSet && onSelectSet(question.setId)}
                className={`p-3 border rounded-md flex items-center justify-between cursor-pointer ${
                  selectedSetId === question.setId
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <div>
                  <div className="font-medium text-sm flex items-center">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      question.correct
                        ? 'bg-green-500 dark:bg-green-400'
                        : 'bg-red-500 dark:bg-red-400'
                    }`}></span>
                    {question.topic} - {question.subtopic}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    From {question.setType} • {question.setSubject}
                  </div>
                </div>
                <div className="text-right text-xs">
                  <div className={`inline-block px-2 py-1 rounded-full ${
                    question.difficulty === 'Easy'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : question.difficulty === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {question.difficulty}
                  </div>
                </div>
              </div>
            ))}
            
            {relatedQuestions.length === 0 && (
              <div className="py-6 text-center text-slate-500 dark:text-slate-400">
                <p>No questions available for this tag.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
