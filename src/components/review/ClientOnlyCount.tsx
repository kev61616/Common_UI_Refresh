'use client'

import { useState, useEffect } from 'react'

export function ClientOnlyCount({ count }: { count: number }) {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // During SSR and hydration, return a placeholder element with the same dimensions
  if (!isClient) {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 text-xs bg-white/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-full">
        {/* Empty placeholder to be replaced after hydration */}
        <span style={{ visibility: 'hidden' }}>00</span>
      </span>
    )
  }
  
  // After hydration, show the actual counter
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 text-xs bg-white/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-full">
      {count}
    </span>
  )
}
