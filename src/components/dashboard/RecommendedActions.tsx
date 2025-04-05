'use client'

import { Heading } from '@/components/catalyst/heading' // Use Catalyst Heading
import { Text } from '@/components/catalyst/text' // Use Catalyst Text
import { Link } from '@/components/catalyst/link' // Use Catalyst Link
import { ClipboardList, CheckCircle2, Clock, ArrowRight } from 'lucide-react' // Use Lucide icons

export function RecommendedActions() {
  // Define action data
  const actions = [
    {
      title: 'Practice Data Analysis',
      description: '30 min focused practice',
      href: '/practice/data-analysis',
      icon: ClipboardList,
      iconColor: 'text-indigo-500 dark:text-indigo-400',
      linkColor: 'text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300'
    },
    {
      title: 'Reading Review',
      description: '+12% improvement',
      href: '/review/set',
      icon: CheckCircle2,
      iconColor: 'text-emerald-500 dark:text-emerald-400',
      linkColor: 'text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300'
    },
    {
      title: 'Schedule Test',
      description: 'Time for practice test',
      href: '/test/schedule',
      icon: Clock,
      iconColor: 'text-amber-500 dark:text-amber-400',
      linkColor: 'text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300'
    }
  ];

  return (
    <div className="p-3 h-full flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-grow">
        {actions.map((action) => {
          const IconComponent = action.icon;
          return (
            // Apply standard card styles, remove custom gradients for now
            <div key={action.title} className="rounded-lg p-3 border border-border bg-card text-card-foreground group hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className={`mb-1.5 ${action.iconColor}`}>
                  <IconComponent className="size-5" /> {/* Use Lucide icon */}
                </div>
                <div className="ml-2 flex-1">
                  <Heading level={6} className="font-medium text-sm dark:text-white">{action.title}</Heading>
                  <Text className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{action.description}</Text>
                </div>
              </div>
              <div className="mt-2">
                <Link href={action.href} className={`text-xs font-medium flex items-center ${action.linkColor}`}>
                  {action.title.startsWith('Schedule') ? 'Schedule test' : action.title.startsWith('Practice') ? 'Start practice' : 'Review session'}
                  <ArrowRight className="ml-1 size-3.5 transition-transform group-hover:translate-x-1" /> {/* Use Lucide icon */}
                </Link>
              </div>
            </div>
          );
        })}
      </div> {/* Close grid div */}
    </div> // Close main component div
  )
}

/* The following is the original content that was incorrectly left behind after the map refactor. It needs to be removed. */
/*
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-3 border border-emerald-100 dark:border-emerald-900/30 group hover:shadow-md transition-shadow">
          <div className="flex items-start">
            <div className="mb-1.5 text-emerald-500 dark:text-emerald-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-2 flex-1">
              <h4 className="font-medium text-sm text-slate-900 dark:text-white">Reading Review</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">+12% improvement</p>
            </div>
          </div>
          <div className="mt-2">
            <Link
              href="/review/set"
              className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center group-hover:text-emerald-700 dark:group-hover:text-emerald-300"
            >
              Review session
              <svg className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-3 border border-amber-100 dark:border-amber-900/30 group hover:shadow-md transition-shadow">
          <div className="flex items-start">
            <div className="mb-1.5 text-amber-500 dark:text-amber-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-2 flex-1">
              <h4 className="font-medium text-sm text-slate-900 dark:text-white">Schedule Test</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">Time for practice test</p>
            </div>
          </div>
          <div className="mt-2">
            <Link
              href="/test/schedule"
              className="text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center group-hover:text-amber-700 dark:group-hover:text-amber-300"
            >
              Schedule test
              <svg className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
*/
