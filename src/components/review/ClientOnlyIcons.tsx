'use client'

import { useState, useEffect } from 'react'

// Simple client-only wrapper component
export function ClientOnly({ children, fallback = null }: { children: React.ReactNode, fallback?: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return fallback
  }

  return <>{children}</>
}

// Subject icon components
export function MathIcon() {
  return (
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-center">
      M
    </div>
  )
}

export function ReadingIcon() {
  return (
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
      R
    </div>
  )
}

export function WritingIcon() {
  return (
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center justify-center">
      W
    </div>
  )
}

// Placeholder server icon (for initial render)
export function ServerPlaceholderIcon() {
  return (
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
      {/* Empty for hydration safety */}
    </div>
  )
}

// Type-specific client-only icons
export function SubjectIcon({ subject, id }: { subject: string, id: string }) {
  // Simple hash function for deterministic icon selection
  const hashCode = (str: string) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i)
      hash |= 0 // Convert to 32bit integer
    }
    return Math.abs(hash)
  }

  // Use a stable hash of the ID, not the actual subject
  const hash = hashCode(id)
  const hashMod3 = hash % 3 // 0, 1, or 2
  
  return (
    <ClientOnly fallback={<ServerPlaceholderIcon />}>
      {hashMod3 === 0 ? <MathIcon /> : hashMod3 === 1 ? <ReadingIcon /> : <WritingIcon />}
    </ClientOnly>
  )
}
