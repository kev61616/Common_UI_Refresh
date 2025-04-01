'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * This client page has been replaced by the Question View
 * This component redirects to the Question View on the client side
 * for any cases where the server-side redirect doesn't trigger
 */
export default function BoardViewClient() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/review/question')
  }, [router])
  
  // Return a minimal loading state in case there's a delay in redirection
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="mb-4">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        <p className="text-slate-600 dark:text-slate-400">Redirecting to Question View...</p>
      </div>
    </div>
  )
}
