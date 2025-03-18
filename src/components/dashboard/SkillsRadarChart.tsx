'use client'

import { useMemo } from 'react'
import { PracticeSet } from '@/lib/mockData'

interface SkillsRadarChartProps {
  practiceSets: PracticeSet[]
}

interface SkillArea {
  name: string
  value: number
  fullMark: number
}

export function SkillsRadarChart({ practiceSets }: SkillsRadarChartProps) {
  // Calculate performance across different skill areas
  const skillAreas = useMemo(() => {
    // Define relevant topics for each subject area
    const topicGroups = {
      'Reading Comprehension': ['Reading Comprehension', 'Main Purpose', 'Main Idea', 'Summary', 'Specific Detail'],
      'Textual Analysis': ['Supporting Evidence', 'Supporting Quotation', 'Underlined Function', 'Logical Reasoning', 'Two Texts'],
      'Vocabulary': ['Vocabulary', 'Parts of Speech', 'Word Choice'],
      'Grammar & Usage': ['Grammar Fundamentals', 'Punctuation Rules', 'Sentence Structure', 'Agreement'],
      'Algebra': ['Expressions & Equations', 'Linear & Nonlinear Functions', 'Algebra Fundamentals'],
      'Geometry': ['Geometry: Triangles', 'Geometry: Rectangles', 'Geometry: Circles', 'Geometry: Parabolas'],
      'Statistics & Data': ['Statistical Analysis', 'Probability', 'Data Interpretation', 'Data Analysis: Graph(s)', 'Data Analysis: Table(s)']
    }
    
    // Default data for empty state
    if (!practiceSets.length) {
      return Object.keys(topicGroups).map(area => ({
        name: area,
        value: 0,
        fullMark: 100
      }))
    }
    
    // Function to get area value by analyzing topic performance
    const getAreaValue = (areaName: string): number => {
      const relevantTopics = topicGroups[areaName as keyof typeof topicGroups] || []
      
      // Collect all questions related to these topics
      const relevantQuestions = practiceSets.flatMap(set => 
        set.questions.filter(q => 
          relevantTopics.some(topic => q.topic.includes(topic) || q.subtopic.includes(topic))
        )
      )
      
      if (relevantQuestions.length === 0) return 55 // Default value for areas without data
      
      // Calculate percentage of correct answers
      const correctCount = relevantQuestions.filter(q => q.correct).length
      return Math.round((correctCount / relevantQuestions.length) * 100)
    }
    
    // Generate data for the radar chart
    return Object.keys(topicGroups).map(area => ({
      name: area,
      value: getAreaValue(area),
      fullMark: 100
    }))
  }, [practiceSets])
  
  // Sort skills by proficiency (highest to lowest)
  const sortedSkills = useMemo(() => {
    return [...skillAreas].sort((a, b) => b.value - a.value)
  }, [skillAreas])
  
  // Function to get color based on value
  const getColorClass = (value: number): string => {
    if (value >= 80) return 'text-emerald-500'
    if (value >= 60) return 'text-amber-500'
    return 'text-red-500'
  }
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-5 border-b border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-slate-800 dark:text-white text-lg">Skills Analysis</h3>
          <div className="flex space-x-1">
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Radar Chart Visualization */}
        <div className="h-64 flex items-center justify-center relative">
          <svg viewBox="0 0 240 240" className="w-full h-full">
            {/* Background circles */}
            <circle cx="120" cy="120" r="100" fill="none" stroke="#e2e8f0" strokeWidth="1" className="dark:stroke-slate-700" />
            <circle cx="120" cy="120" r="80" fill="none" stroke="#e2e8f0" strokeWidth="1" className="dark:stroke-slate-700" />
            <circle cx="120" cy="120" r="60" fill="none" stroke="#e2e8f0" strokeWidth="1" className="dark:stroke-slate-700" />
            <circle cx="120" cy="120" r="40" fill="none" stroke="#e2e8f0" strokeWidth="1" className="dark:stroke-slate-700" />
            <circle cx="120" cy="120" r="20" fill="none" stroke="#e2e8f0" strokeWidth="1" className="dark:stroke-slate-700" />
            
            {/* Spokes for each axis */}
            {skillAreas.map((skill, i) => {
              const angle = (Math.PI * 2 * i) / skillAreas.length
              const x = 120 + 100 * Math.sin(angle)
              const y = 120 - 100 * Math.cos(angle)
              return (
                <line 
                  key={`line-${skill.name}`} 
                  x1="120" y1="120" 
                  x2={x} y2={y} 
                  stroke="#e2e8f0" 
                  strokeWidth="1" 
                  className="dark:stroke-slate-700"
                />
              )
            })}
            
            {/* Labels */}
            {skillAreas.map((skill, i) => {
              const angle = (Math.PI * 2 * i) / skillAreas.length
              const x = 120 + 120 * Math.sin(angle)
              const y = 120 - 120 * Math.cos(angle)
              return (
                <text 
                  key={`text-${skill.name}`} 
                  x={x} 
                  y={y} 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  fontSize="8" 
                  fill="#64748b"
                  className="dark:fill-slate-400 font-medium"
                >
                  {skill.name}
                </text>
              )
            })}
            
            {/* Data polygon */}
            <polygon
              points={skillAreas.map((skill, i) => {
                const angle = (Math.PI * 2 * i) / skillAreas.length
                const radius = (skill.value / skill.fullMark) * 100
                const x = 120 + radius * Math.sin(angle)
                const y = 120 - radius * Math.cos(angle)
                return `${x},${y}`
              }).join(' ')}
              fill="rgba(99, 102, 241, 0.2)"
              stroke="#6366f1"
              strokeWidth="2"
              className="dark:fill-indigo-500/20 dark:stroke-indigo-400"
            />
            
            {/* Data points */}
            {skillAreas.map((skill, i) => {
              const angle = (Math.PI * 2 * i) / skillAreas.length
              const radius = (skill.value / skill.fullMark) * 100
              const x = 120 + radius * Math.sin(angle)
              const y = 120 - radius * Math.cos(angle)
              return (
                <circle 
                  key={`point-${skill.name}`}
                  cx={x} 
                  cy={y} 
                  r="4" 
                  fill="#6366f1" 
                  className="dark:fill-indigo-400"
                />
              )
            })}
          </svg>
        </div>
        
        {/* Skill Rankings */}
        <div className="space-y-1">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Skill Proficiency Ranking</h4>
          <div className="max-h-52 overflow-y-auto pr-2">
            {sortedSkills.map((skill, index) => (
              <div key={skill.name} className="flex justify-between items-center py-1.5">
                <div className="flex items-center">
                  <div className="w-5 text-slate-400 dark:text-slate-500 text-xs">{index + 1}.</div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">{skill.name}</span>
                </div>
                <div className={`text-sm font-medium ${getColorClass(skill.value)}`}>
                  {skill.value}%
                </div>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-700 mt-3">
            <a 
              href="/skills-assessment" 
              className="text-sm text-indigo-600 dark:text-indigo-400 font-medium flex items-center"
            >
              Take skills assessment
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 