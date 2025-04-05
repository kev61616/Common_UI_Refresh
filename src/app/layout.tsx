import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import clsx from 'clsx'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/globals.css' // Main global styles entry point
// Removed direct imports for tailwind.css, custom-animations.css, timeline-animations.css as they are handled via globals.css or config
import '@/components/review/timeline-view-variants/bookshelf-styles.css' // Keep specific component styles for now

// Configure Inter with all weights and variable support
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    template: '%s - BrainBox SAT',
    default: 'BrainBox SAT - Master your SAT preparation',
  },
  description:
    'Comprehensive SAT preparation platform with analytics, personalized insights, and expert study recommendations.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx('h-full antialiased', inter.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-full bg-white dark:bg-slate-900">
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
