'use client'

import { useMemo } from 'react'
import { PracticeSet } from '@/lib/mockData'

interface StudyAdviceProps {
  practiceSets: PracticeSet[]
}

export function StudyAdvice({ practiceSets }: StudyAdviceProps) {
  // Generate personalized study advice based on practice set data
  const advice = useMemo(() => {
    if (practiceSets.length === 0) {
      return [
        {
          title: 'Get Started',
          description: 'Complete your first practice set to receive personalized feedback and recommendations.',
          actionText: 'Take a practice test',
          actionLink: '/test/mock-test',
          icon: '📝'
        }
      ]
    }
    
    // Calculate performance metrics
    const subjects = ['Reading', 'Writing', 'Math']
    const subjectPerformance = subjects.map(subject => {
      const subjectSets = practiceSets.filter(set => set.subject === subject)
      if (subjectSets.length === 0) return { subject, accuracy: 0, count: 0 }
      
      const avgAccuracy = subjectSets.reduce((sum, set) => sum + set.accuracy, 0) / subjectSets.length
      return {
        subject,
        accuracy: Math.round(avgAccuracy),
        count: subjectSets.length
      }
    })
    
    // Find weakest subject
    const weakestSubject = [...subjectPerformance].sort((a, b) => a.accuracy - b.accuracy)[0]
    
    // Check for fatigue patterns
    const hasFatiguePattern = practiceSets.some(
      set => set.sessionFatigue.earlyAccuracy - set.sessionFatigue.lateAccuracy > 20
    )
    
    // Check for recent activity
    const lastPracticeDate = new Date(
      Math.max(...practiceSets.map(set => new Date(set.dateCompleted).getTime()))
    )
    const daysSinceLastPractice = Math.floor(
      (new Date().getTime() - lastPracticeDate.getTime()) / (1000 * 60 * 60 * 24)
    )
    
    // Generate advice list
    const adviceList = []
    
    // Subject-specific advice
    if (weakestSubject.accuracy > 0) {
      adviceList.push({
        title: `Focus on ${weakestSubject.subject}`,
        description: `Your performance in ${weakestSubject.subject} (${weakestSubject.accuracy}%) could benefit from additional practice.`,
        actionText: `Practice ${weakestSubject.subject}`,
        actionLink: `/${weakestSubject.subject.toLowerCase() === 'reading' ? 'overview' : weakestSubject.subject.toLowerCase() === 'writing' ? 'overview' : 'overview'}/${weakestSubject.subject.toLowerCase()}`,
        icon: weakestSubject.subject === 'Math' ? '🔢' : weakestSubject.subject === 'Reading' ? '📚' : '✏️'
      })
    }
    
    // Consistency advice
    if (daysSinceLastPractice > 7) {
      adviceList.push({
        title: 'Maintain Consistency',
        description: `It's been ${daysSinceLastPractice} days since your last practice session. Regular practice leads to better results.`,
        actionText: 'Schedule study sessions',
        actionLink: '/course/schedule',
        icon: '📅'
      })
    }
    
    // Fatigue pattern advice
    if (hasFatiguePattern) {
      adviceList.push({
        title: 'Combat Study Fatigue',
        description: 'Your performance tends to drop during longer study sessions. Try shorter, more focused sessions with breaks in between.',
        actionText: 'View study techniques',
        actionLink: '/course/materials',
        icon: '⏱️'
      })
    }
    
    // General advice if we don't have enough specific advice
    if (adviceList.length < 2) {
      adviceList.push({
        title: 'Review Past Performance',
        description: 'Analyze your previous practice sets to identify patterns and opportunities for improvement.',
        actionText: 'View analytics',
        actionLink: '/review/by-question',
        icon: '📊'
      })
    }
    
    return adviceList.slice(0, 3) // Limit to 3 pieces of advice
  }, [practiceSets])
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
      <h3 className="font-medium text-slate-800 dark:text-white text-lg mb-4">Personalized Advice</h3>
      
      <div className="space-y-4">
        {advice.map((item, index) => (
          <div key={index} className="flex bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800 rounded-lg p-4 shadow-inner">
            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-lg">
              {item.icon}
            </div>
            <div className="ml-4">
              <h4 className="text-base font-medium text-slate-900 dark:text-white">{item.title}</h4>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
              <a 
                href={item.actionLink} 
                className="inline-flex items-center mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
              >
                {item.actionText}
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
