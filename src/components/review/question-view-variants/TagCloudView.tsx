'use client';

import React, { useState, useEffect } from 'react';
import { QuestionViewProps } from './types';
import { QuestionWithMetadata } from '../question-view/types';
import { extractQuestionsWithMetadata } from '../question-view/utils';

/**
 * Tag Cloud View (Question View Variant 7)
 * Interactive visualization showing question topics/subtopics as tags with size indicating frequency
 */
export function TagCloudView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  const [allQuestions, setAllQuestions] = useState<QuestionWithMetadata[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filter, setFilter] = useState<'topic' | 'subtopic' | 'difficulty'>('topic');
  const [minFontSize, setMinFontSize] = useState(12);
  const [maxFontSize, setMaxFontSize] = useState(32);

  // Process questions when practiceSets change
  useEffect(() => {
    const questions = extractQuestionsWithMetadata(practiceSets);
    setAllQuestions(questions);
  }, [practiceSets]);

  // Calculate frequency of tags from the data based on the selected filter
  const calculateTagFrequency = () => {
    const tagMap = new Map<string, {
      count: number;
      correctCount: number;
      setIds: Set<string>;
    }>();

    allQuestions.forEach((question) => {
      let tag: string;
      if (filter === 'topic') {
        tag = question.topic;
      } else if (filter === 'subtopic') {
        tag = question.subtopic;
      } else {// difficulty
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
    accuracy: info.count > 0 ? info.correctCount / info.count * 100 : 0,
    setIds: Array.from(info.setIds)
  }));

  // Sort by count (most frequent first)
  tagData.sort((a, b) => b.count - a.count);

  // Calculate font size based on frequency
  const maxCount = Math.max(...tagData.map((t) => t.count));
  const calculateFontSize = (count: number) => {
    return minFontSize + count / maxCount * (maxFontSize - minFontSize);
  };

  // Get color based on accuracy
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (accuracy >= 60) return 'text-amber-600 dark:text-amber-400';
    return 'text-rose-600 dark:text-rose-400';
  };

  // Questions related to the selected tag
  const relatedQuestions = selectedTag ?
  allQuestions.filter((q) => {
    if (filter === 'topic') return q.topic === selectedTag;
    if (filter === 'subtopic') return q.subtopic === selectedTag;
    return q.difficulty === selectedTag;
  }) : [];

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="-jwevu-">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="-e8-nc2">7. Tag Cloud View</h3>
      
      {/* Controls */}
      <div className="flex justify-between mb-6" data-oid="h2mn30.">
        <div className="flex space-x-2" data-oid="tuw:hhi">
          <button
            onClick={() => setFilter('topic')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
            filter === 'topic' ?
            'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300' :
            'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
            } data-oid="jrue3av">

            Topic Tags
          </button>
          <button
            onClick={() => setFilter('subtopic')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
            filter === 'subtopic' ?
            'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300' :
            'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
            } data-oid="plw7rrf">

            Subtopic Tags
          </button>
          <button
            onClick={() => setFilter('difficulty')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
            filter === 'difficulty' ?
            'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300' :
            'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
            } data-oid="9haihmn">

            Difficulty Tags
          </button>
        </div>
        
        <div className="flex items-center space-x-4" data-oid="57id-yk">
          <div className="flex space-x-1 items-center" data-oid="42x45r_">
            <span className="text-xs text-slate-500 dark:text-slate-400" data-oid="n:g.g.:">Size:</span>
            <input
              type="range"
              min="8"
              max="40"
              value={maxFontSize}
              onChange={(e) => setMaxFontSize(parseInt(e.target.value))}
              className="w-20" data-oid="v-cfc34" />

          </div>
        </div>
      </div>
      
      {/* Tag Cloud */}
      <div className="min-h-[300px] bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8 flex flex-wrap justify-center items-center content-center gap-3 gap-y-6" data-oid="x1jh_gi">
        {tagData.map(({ tag, count, accuracy }) =>
        <div
          key={tag}
          onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
          className={`cursor-pointer transition-all px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-700/30 rounded ${
          selectedTag === tag ? 'bg-slate-100 dark:bg-slate-700/50 rounded-md shadow-sm' : ''}`
          }
          style={{
            fontSize: `${calculateFontSize(count)}px`,
            fontWeight: count > maxCount * 0.7 ? 'bold' : 'normal'
          }} data-oid="17n4wst">

            <span className={getAccuracyColor(accuracy)} data-oid="y0j-2b8">{tag}</span>
            <span className="text-[10px] text-slate-400 ml-1 align-top" data-oid="y44ru71">
              {count}
            </span>
          </div>
        )}
        
        {tagData.length === 0 &&
        <div className="text-slate-500 dark:text-slate-400 text-center p-12" data-oid="cluk1w0">
            No data available for the selected filter.
          </div>
        }
      </div>
      
      {/* Selected Tag Info */}
      {selectedTag &&
      <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700" data-oid="m06e52p">
          <div className="flex justify-between items-center mb-3" data-oid=".850ryx">
            <h4 className="font-semibold" data-oid="zefcdp5">
              Questions with{' '}
              {filter === 'topic' ? 'Topic' : filter === 'subtopic' ? 'Subtopic' : 'Difficulty'}:{' '}
              <span className={getAccuracyColor(
              tagFrequency.get(selectedTag)?.count ?
              tagFrequency.get(selectedTag)!.correctCount / tagFrequency.get(selectedTag)!.count * 100 : 0
            )} data-oid="psch8-v">
                {selectedTag}
              </span>
            </h4>
            <button
            onClick={() => setSelectedTag(null)}
            className="text-xs px-2 py-1 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600" data-oid="vc41st0">

              Close
            </button>
          </div>
          
          <div className="space-y-2 max-h-[250px] overflow-y-auto" data-oid="k4-sw2_">
            {relatedQuestions.map((question) =>
          <div
            key={question.id}
            onClick={() => onSelectSet && onSelectSet(question.setId)}
            className={`p-3 border rounded-md flex items-center justify-between cursor-pointer ${
            selectedSetId === question.setId ?
            'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' :
            'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`
            } data-oid="ipsldp-">

                <div data-oid="wjqdurv">
                  <div className="font-medium text-sm flex items-center" data-oid="cgw_7c0">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                question.correct ?
                'bg-green-500 dark:bg-green-400' :
                'bg-red-500 dark:bg-red-400'}`
                } data-oid="hib.b3b"></span>
                    {question.topic} - {question.subtopic}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="zfir3d_">
                    From {question.setType} • {question.setSubject}
                  </div>
                </div>
                <div className="text-right text-xs" data-oid="5t:i9m5">
                  <div className={`inline-block px-2 py-1 rounded-full ${
              question.difficulty === 'Easy' ?
              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
              question.difficulty === 'Medium' ?
              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`
              } data-oid="g-3_agk">
                    {question.difficulty}
                  </div>
                </div>
              </div>
          )}
            
            {relatedQuestions.length === 0 &&
          <div className="py-6 text-center text-slate-500 dark:text-slate-400" data-oid="t:.r5g2">
                <p data-oid="ggu4mha">No questions available for this tag.</p>
              </div>
          }
          </div>
        </div>
      }
    </div>);

}