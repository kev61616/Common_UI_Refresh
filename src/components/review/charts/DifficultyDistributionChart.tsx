'use client'

import React, { useEffect, useRef } from 'react'
// Removed Typography import as it's unused
import { Text } from '@/components/catalyst/text' // Use Catalyst Text
import { Question } from '@/lib/mockData' // Correct type import

interface DifficultyDistributionChartProps {
  questions: Question[]; // Use the correct Question type
}

interface DifficultyCounts {
  easy: number;
  medium: number;
  hard: number;
  total: number;
}

export function DifficultyDistributionChart({ questions }: DifficultyDistributionChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)

  const counts: DifficultyCounts = questions.reduce(
    (acc, q) => {
      if (q.difficulty === 'Easy') acc.easy++;
      else if (q.difficulty === 'Medium') acc.medium++;
      else if (q.difficulty === 'Hard') acc.hard++;
      acc.total++;
      return acc;
    },
    { easy: 0, medium: 0, hard: 0, total: 0 }
  );

  useEffect(() => {
    const canvas = chartRef.current
    if (!canvas) return;
    const ctx = canvas.getContext('2d')
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height; // Use actual height
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    if (counts.total === 0) {
        ctx.fillStyle = '#64748b'; // Use muted foreground
        ctx.font = '14px sans-serif'; // Use theme font
        ctx.textAlign = 'center';
        ctx.fillText('No questions data', canvasWidth / 2, canvasHeight / 2);
        return;
    }

    // Calculate percentages and convert to angles
    const easyAngle = (counts.easy / counts.total) * Math.PI * 2
    const mediumAngle = (counts.medium / counts.total) * Math.PI * 2
    const hardAngle = (counts.hard / counts.total) * Math.PI * 2

    const centerX = canvasWidth / 2;
    const centerY = 70; // Adjust center Y for title/legend space
    const radius = 50;

    // Draw pie chart
    let startAngle = -Math.PI / 2; // Start from top

    // Easy slice
    if (counts.easy > 0) {
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + easyAngle)
        ctx.closePath()
        // TODO: Use semantic/palette colors (e.g., success)
        ctx.fillStyle = '#4ade80' // Green-400
        ctx.fill()
        startAngle += easyAngle
    }

    // Medium slice
    if (counts.medium > 0) {
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + mediumAngle)
        ctx.closePath()
        // TODO: Use semantic/palette colors (e.g., warning)
        ctx.fillStyle = '#facc15' // Yellow-400
        ctx.fill()
        startAngle += mediumAngle
    }

    // Hard slice
    if (counts.hard > 0) {
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + hardAngle)
        ctx.closePath()
        // TODO: Use semantic/palette colors (e.g., destructive)
        ctx.fillStyle = '#f87171' // Red-400
        ctx.fill()
    }

    // Title
    // TODO: Use semantic colors (e.g., foreground)
    ctx.fillStyle = '#0f172a'; // Slate-900
    ctx.font = 'bold 14px sans-serif'; // TODO: Use font from theme
    ctx.textAlign = 'center';
    ctx.fillText('Difficulty Distribution', centerX, 20);

  }, [questions, counts]); // Include counts in dependency array

  return (
     <div className="flex flex-col items-center">
        {/* Added mb-2 for spacing */}
        <canvas ref={chartRef} width="250" height="130" className="mx-auto mb-2"></canvas>
        {/* Legend */}
        {/* Use spacing scale gap-4, mt-2 */}
        <div className="flex justify-center gap-4 text-xs mt-2">
            <div className="flex items-center">
              {/* TODO: Use semantic/palette colors (success) */}
              <div className="w-3 h-3 rounded-full bg-green-400 mr-1.5"></div> {/* Use spacing scale w-3, h-3, mr-1.5 */}
              {/* Use Catalyst Text */}
              <Text className="text-xs text-muted-foreground">Easy ({counts.easy})</Text>
            </div>
            <div className="flex items-center">
              {/* TODO: Use semantic/palette colors (warning) */}
              <div className="w-3 h-3 rounded-full bg-yellow-400 mr-1.5"></div> {/* Use spacing scale w-3, h-3, mr-1.5 */}
               {/* Use Catalyst Text */}
              <Text className="text-xs text-muted-foreground">Medium ({counts.medium})</Text>
            </div>
            <div className="flex items-center">
              {/* TODO: Use semantic/palette colors (destructive) */}
              <div className="w-3 h-3 rounded-full bg-red-400 mr-1.5"></div> {/* Use spacing scale w-3, h-3, mr-1.5 */}
               {/* Use Catalyst Text */}
              <Text className="text-xs text-muted-foreground">Hard ({counts.hard})</Text>
            </div>
        </div>
     </div>
  );
}
