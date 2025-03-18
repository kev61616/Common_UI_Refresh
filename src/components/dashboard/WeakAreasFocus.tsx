'use client'

import { useMemo } from 'react'
import { PracticeSet } from '@/lib/mockData'

interface WeakAreasFocusProps {
  practiceSets: PracticeSet[]
}

interface WeakArea {
  id: string
  topic: string
  subtopic: string
  accuracy: number
  questionCount: number
  suggestedResources: Array<{
    title: string
    link: string
  }>
}

export function WeakAreasFocus({ practiceSets }: WeakAreasFocusProps) {
  // Calculate the weakest areas based on practice performance
  const weakAreas = useMemo(() => {
    // Exit early if no data
    if (!practiceSets.length) return []
    
    // Create a map of topics/subtopics and their performance metrics
    const topicPerformance = new Map<string, { correct: number, total: number, subtopics: Set<string> }>()
    
    // Process all questions to identify performance by topic
    practiceSets.forEach(set => {
      set.questions.forEach(question => {
        // Skip unanswered questions
        if (!question.answered) return
        
        // Get or initialize topic data
        const topicKey = question.topic
        if (!topicPerformance.has(topicKey)) {
          topicPerformance.set(topicKey, {
            correct: 0,
            total: 0,
            subtopics: new Set()
          })
        }
        
        // Update metrics
        const topicData = topicPerformance.get(topicKey)!
        if (question.correct) topicData.correct++
        topicData.total++
        topicData.subtopics.add(question.subtopic)
      })
    })
    
    // Convert map to array and calculate accuracy percentages
    const topicsArray = Array.from(topicPerformance.entries()).map(([topic, data]) => ({
      topic,
      subtopics: Array.from(data.subtopics),
      accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
      questionCount: data.total
    }))
    
    // Filter for topics with enough questions and low accuracy
    const weakTopics = topicsArray
      .filter(t => t.questionCount >= 3 && t.accuracy < 70)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 5)
    
    // Map to final format with resource suggestions
    return weakTopics.map(topic => {
      // Custom resources based on topic
      const resources = getResourcesForTopic(topic.topic)
      
      return {
        id: topic.topic.replace(/\s+/g, '-').toLowerCase(),
        topic: topic.topic,
        subtopic: topic.subtopics[0] || '',
        accuracy: topic.accuracy,
        questionCount: topic.questionCount,
        suggestedResources: resources
      }
    })
  }, [practiceSets])
  
  // Helper function to provide topic-specific resources
  function getResourcesForTopic(topic: string): Array<{ title: string, link: string }> {
    // Define default resources
    const defaultResources = [
      { title: 'Interactive lesson', link: `/topics/${topic.toLowerCase().replace(/\s+/g, '-')}` },
      { title: 'Practice questions', link: `/practice/${topic.toLowerCase().replace(/\s+/g, '-')}` }
    ]
    
    // Return specific resources based on topic
    if (topic.includes('Reading')) {
      return [
        { title: 'Reading strategies guide', link: '/guide/reading-strategies' },
        { title: 'Practice questions', link: `/practice/${topic.toLowerCase().replace(/\s+/g, '-')}` },
        { title: 'Video tutorial', link: '/videos/reading-comprehension' }
      ]
    }
    
    if (topic.includes('Writing') || topic.includes('Grammar')) {
      return [
        { title: 'Grammar rules handbook', link: '/guide/grammar-rules' },
        { title: 'Interactive exercises', link: `/interactive/${topic.toLowerCase().replace(/\s+/g, '-')}` },
        { title: 'Mistake analysis', link: '/analysis/writing-mistakes' }
      ]
    }
    
    if (topic.includes('Math') || topic.includes('Algebra') || topic.includes('Geometry')) {
      return [
        { title: 'Concept explanation', link: `/concepts/${topic.toLowerCase().replace(/\s+/g, '-')}` },
        { title: 'Step-by-step tutorial', link: `/tutorials/${topic.toLowerCase().replace(/\s+/g, '-')}` },
        { title: 'Practice problems', link: `/practice/${topic.toLowerCase().replace(/\s+/g, '-')}` }
      ]
    }
    
    return defaultResources
  }
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-5 border-b border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-slate-800 dark:text-white text-lg">Focus Areas</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500">
            Needs attention
          </span>
        </div>
      </div>
      
      <div className="p-4">
        {weakAreas.length > 0 ? (
          <div className="space-y-4">
            {weakAreas.map(area => (
              <div 
                key={area.id}
                className="bg-slate-50 dark:bg-slate-800/80 rounded-lg p-4 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                      {area.topic}
                    </h4>
                    {area.subtopic && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Subtopic: {area.subtopic}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center">
                    <div className={`px-2 py-0.5 rounded text-xs font-medium ${
                      area.accuracy < 50 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      {area.accuracy}% accuracy
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                  Based on {area.questionCount} questions answered. Focus on this area to improve your overall score.
                </p>
                
                {/* Suggested resources */}
                <h5 className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">Suggested resources:</h5>
                <div className="flex flex-wrap gap-2">
                  {area.suggestedResources.map((resource, i) => (
                    <a 
                      key={i}
                      href={resource.link}
                      className="inline-flex items-center px-2.5 py-1.5 rounded text-xs font-medium bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition"
                    >
                      {resource.title}
                      <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <svg className="mx-auto h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              No weak areas detected! Keep up the good work.
            </p>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              Complete more practice sets to identify potential areas for improvement.
            </p>
          </div>
        )}
        
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
          <a 
            href="/personalized-plan" 
            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center justify-center"
          >
            Generate personalized study plan
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
} 