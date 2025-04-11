'use client';

import React from 'react';
import { Typography } from '@/components/ui/typography';

export function MathTab() {
  return (
    <div className="space-y-6">
      <Typography variant="h2" className="text-slate-900 dark:text-white">
        Math Performance
      </Typography>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Math Score */}
        <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border p-6">
          <Typography variant="h3" className="text-foreground mb-4">Current Score</Typography>
          <div className="flex items-center justify-center">
            <div className="text-6xl font-bold text-cyan-500">770</div>
            <div className="ml-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <span className="text-success-500">↑ 30 points</span>
                <span className="ml-2">since last month</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Math Progress */}
        <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border p-6">
          <Typography variant="h3" className="text-foreground mb-4">Progress</Typography>
          <div className="h-48 flex items-center justify-center">
            <div className="w-full h-32 bg-slate-100 dark:bg-slate-800 rounded-lg">
              {/* Placeholder for math progress chart */}
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground">Math Progress Chart</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Math Skills */}
        <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border p-6 lg:col-span-2">
          <Typography variant="h3" className="text-foreground mb-4">Skills Breakdown</Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Algebra', 'Geometry', 'Data Analysis'].map((skill, index) => (
              <div key={index} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="font-medium mb-2">{skill}</div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-cyan-500 h-full rounded-full" 
                    style={{ width: `${[82, 70, 85][index]}%` }}
                  ></div>
                </div>
                <div className="mt-1 text-right text-sm">{[82, 70, 85][index]}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
