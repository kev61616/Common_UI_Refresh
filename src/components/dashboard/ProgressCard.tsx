'use client';

import { useState } from 'react';

interface ProgressCardProps {
  title: string;
  percentage: number;
  color: string;
  icon?: React.ReactNode;
  subtitle?: string;
}

export function ProgressCard({ title, percentage, color, icon, subtitle }: ProgressCardProps) {
  // Calculate the circle's circumference and offset based on percentage
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - percentage / 100 * circumference;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden" data-oid="fwg_624">
      <div className="p-5" data-oid="ukk:xks">
        <div className="flex justify-between items-start mb-2" data-oid="gg8id-_">
          <h3 className="font-medium text-slate-800 dark:text-white text-lg" data-oid="ew64su5">{title}</h3>
          {icon && <div className="text-slate-400 dark:text-slate-500" data-oid="eqp85dd">{icon}</div>}
        </div>
        {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mb-4" data-oid="y-dv:9f">{subtitle}</p>}
        
        <div className="flex justify-center py-2" data-oid="hj3v5ui">
          <div className="relative h-[80px] w-[80px]" data-oid="1ei-0ad">
            <svg className="w-full h-full" viewBox="0 0 100 100" data-oid="rhifu4i">
              {/* Background circle */}
              <circle
                className="text-slate-100 dark:text-slate-700"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="50"
                cy="50" data-oid="8ovyhac" />

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
                cy="50" data-oid="mmp5qfb" />

            </svg>
            <div className="absolute inset-0 flex items-center justify-center" data-oid="t4py1.4">
              <span className="text-xl font-semibold text-slate-700 dark:text-white" data-oid="5o_x6eg">{percentage}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`${color} h-1 w-full opacity-30`} data-oid="shlrn_e"></div>
    </div>);

}