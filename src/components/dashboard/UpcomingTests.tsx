'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link' // Keep original Link import
import { Badge } from '@/components/catalyst/badge' // Use Catalyst Badge
import { Button } from '@/components/catalyst/button' // Use Catalyst Button
import { Heading } from '@/components/catalyst/heading' // Use Catalyst Heading
import { Text } from '@/components/catalyst/text' // Use Catalyst Text
import { Link as CatalystLink } from '@/components/catalyst/link' // Use Catalyst Link
import { ArrowRight, CalendarDays } from 'lucide-react' // Use Lucide icons

// Mock upcoming test data (Keep original mock data)
const upcomingTestsMock = [
  {
    id: 'test1',
    title: 'SAT Practice Test #8',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    type: 'practice',
    subject: 'Full Test',
    preparedness: 85,
    location: 'Online',
    duration: 180, // minutes
    missingSkills: ['Quadratic Equations', 'Data Analysis']
  },
  {
    id: 'test2',
    title: 'Official SAT',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    type: 'official',
    subject: 'Full Test',
    preparedness: 78,
    location: 'Central High School',
    duration: 180, // minutes
    missingSkills: ['Reading Inference', 'Grammar Usage', 'Word Problems']
  },
  {
    id: 'test3',
    title: 'Math Assessment',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    type: 'assessment',
    subject: 'Math',
    preparedness: 92,
    location: 'Online',
    duration: 60, // minutes
    missingSkills: []
  }
]

export function UpcomingTests() {
  const [activeTab, setActiveTab] = useState<'all' | 'practice' | 'official'>('all')
  const [animatedTests, setAnimatedTests] = useState<string[]>([])

  // Animate tests appearing one by one (Keep original effect)
  useEffect(() => {
    const testIds = upcomingTestsMock.map(test => test.id)
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < testIds.length) {
        setAnimatedTests(prev => [...prev, testIds[currentIndex]])
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 200)
    return () => clearInterval(interval)
  }, [])

  // Filter tests based on active tab (Keep original logic)
  const filteredTests = upcomingTestsMock.filter(test =>
    activeTab === 'all' || test.type === activeTab
  ).sort((a, b) => a.date.getTime() - b.date.getTime())

  // Format date for display (Keep original logic)
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
    return new Intl.DateTimeFormat('en-US', options).format(date)
  }

  // Calculate days remaining (Keep original logic)
  const getDaysRemaining = (date: Date) => {
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    return `${diffDays}d`
  }

  // Get bar color based on preparedness (Keep original logic)
  const getPreparednessColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500'
    if (score >= 75) return 'bg-amber-500'
    return 'bg-rose-500'
  }

  // Get type badge style (Keep original logic)
  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'official': return { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-300', short: 'OFF' }
      case 'practice': return { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', short: 'PRX' }
      default: return { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300', short: 'AST' }
    }
  }

  return (
    <div className="p-3 h-full flex flex-col">
      {/* Tab navigation - Original button implementation with updated styles */}
      <div className="flex justify-end mb-2">
        <div className="flex rounded-md overflow-hidden border border-border dark:border-slate-700 text-[10px] font-medium">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-2 py-1 transition-colors ${
              activeTab === 'all'
                ? 'bg-primary text-primary-foreground' // Use semantic colors
                : 'bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-2 py-1 transition-colors ${
              activeTab === 'practice'
                ? 'bg-primary text-primary-foreground'
                : 'bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            Practice
          </button>
          <button
            onClick={() => setActiveTab('official')}
            className={`px-2 py-1 transition-colors ${
              activeTab === 'official'
                ? 'bg-primary text-primary-foreground'
                : 'bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            Official
          </button>
        </div>
      </div>

      {/* Test List or Empty State */}
      {filteredTests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-grow">
          {filteredTests.map((test, index) => {
            const barColor = getPreparednessColor(test.preparedness)
            const typeBadge = getTypeBadge(test.type)
            const daysRemaining = getDaysRemaining(test.date)
            const isUrgent = daysRemaining === 'Today' || daysRemaining === 'Tomorrow'
            const isAnimated = animatedTests.includes(test.id)

            return (
              <div
                key={test.id}
                // Apply standard card styles
                className="rounded-lg border border-border bg-card text-card-foreground shadow-sm hover:shadow transition-all duration-300 overflow-hidden"
                style={{
                  opacity: isAnimated ? 1 : 0,
                  transform: isAnimated ? 'translateY(0)' : 'translateY(15px)',
                  transition: `opacity 300ms ease-out ${index * 150}ms, transform 300ms ease-out ${index * 150}ms`
                }}
              >
                <div className="relative">
                  {/* Preparedness indicator bar */}
                  <div className="absolute top-0 left-0 right-0 h-1">
                    <div className={`h-full ${barColor}`} style={{ width: `${test.preparedness}%` }}></div>
                  </div>

                  <div className="pt-2 px-3 pb-3">
                    <div className="flex justify-between items-start mb-1.5">
                      {/* Use Catalyst Heading */}
                      <Heading level={6} className="text-sm font-medium truncate max-w-[140px] dark:text-white">
                        {test.title}
                      </Heading>
                      {/* Use Catalyst Badge for urgency */}
                      <Badge color={isUrgent ? 'red' : 'zinc'} className="text-xs font-bold px-1.5 py-0.5">
                        {isUrgent && (
                          <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full mr-1 animate-pulse"></span>
                        )}
                        {daysRemaining}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-1.5">
                        {/* Use Catalyst Badge for type */}
                        <Badge color={typeBadge.text.includes('indigo') ? 'indigo' : typeBadge.text.includes('blue') ? 'blue' : 'purple'} className="text-[10px] px-1.5 py-0.5">
                          {typeBadge.short}
                        </Badge>
                        <Text className="text-[10px] text-muted-foreground">{test.duration}m</Text>
                      </div>
                      <Text className="text-[10px] text-muted-foreground">{formatDate(test.date)}</Text>
                    </div>

                    {/* Ready indicator and action */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Text className="text-xs font-medium text-foreground">{test.preparedness}%</Text>
                        <Text className="text-[10px] text-muted-foreground">ready</Text>
                      </div>
                      {/* Use Catalyst Button as Link */}
                      <Button href={`/test/prep/${test.id}`} color="dark/zinc" className="!py-1 !px-2 !text-xs">
                        Prepare
                        <ArrowRight className="size-3 ml-1" /> {/* Use Lucide icon */}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        // Empty State
        <div className="p-3 text-center h-40 flex flex-col items-center justify-center flex-grow">
          <div className="w-10 h-10 mb-2 bg-primary/10 rounded-full flex items-center justify-center">
            <CalendarDays className="size-5 text-primary" /> {/* Use Lucide icon */}
          </div>
          <Text className="text-xs text-muted-foreground mb-2">No upcoming tests</Text>
          {/* Use Catalyst Button as Link */}
          <Button href="/test/schedule" color="dark/zinc" className="!text-xs !py-1 !px-2">
            Schedule Test
          </Button>
        </div>
      )}

      {/* Link to calendar */}
      <div className="mt-auto pt-2 border-t border-border dark:border-slate-700">
        {/* Use Catalyst Link */}
        <CatalystLink
          href="/test/calendar"
          className="flex items-center justify-center text-xs"
        >
          <CalendarDays className="size-3.5 mr-1" /> {/* Use Lucide icon */}
          View calendar
        </CatalystLink>
      </div>
    </div>
  )
}
