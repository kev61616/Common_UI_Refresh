'use client'

import { useState } from 'react'

interface ProgressCardProps {
  title: string
  percentage: number
  color: string
  icon?: React.ReactNode
  subtitle?: string
}

export function ProgressCard({ title, percentage, color, icon, subtitle }: ProgressCardProps) {
  // Calculate the circle's circumference and offset based on percentage
  const radius = 35
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-slate-800 dark:text-white text-lg">{title}</h3>
          {icon && <div className="text-slate-400 dark:text-slate-500">{icon}</div>}
        </div>
        {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{subtitle}</p>}
        
        <div className="flex justify-center py-2">
          <div className="relative h-[80px] w-[80px]">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle 
                className="text-slate-100 dark:text-slate-700" 
                strokeWidth="8" 
                stroke="currentColor" 
                fill="transparent" 
                r={radius} 
                cx="50" 
                cy="50" 
              />
              {/* Foreground circle */}
              <circle 
                className={`${color}`}
                strokeWidth="8" 
                strokeDasharray={circumference} 
                strokeDashoffset={offset} 
                strokeLinecap="round" 
                stroke="currentColor" 
                fill="transparent" 
                r={radius} 
                cx="50" 
                cy="50" 
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-semibold text-slate-700 dark:text-white">{percentage}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`${color} h-1 w-full opacity-30`}></div>
    </div>
  )
}
