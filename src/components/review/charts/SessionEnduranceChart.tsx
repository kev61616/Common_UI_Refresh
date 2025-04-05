'use client'

import React, { useEffect, useRef } from 'react'
// Removed Typography import
import { Text } from '@/components/catalyst/text' // Use Catalyst Text
import { AlertTriangle } from 'lucide-react' // Use Lucide icon

interface SessionEnduranceChartProps {
  earlyAccuracy: number;
  lateAccuracy: number;
}

export function SessionEnduranceChart({ earlyAccuracy, lateAccuracy }: SessionEnduranceChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = chartRef.current
    if (!canvas) return;
    const ctx = canvas.getContext('2d')
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const barHeight = 20;
    const labelAreaWidth = 30;
    const valueLabelAreaWidth = 40; // Space for percentage text
    const barMaxWidth = canvasWidth - labelAreaWidth - valueLabelAreaWidth - 10; // 10 for padding

    // Early accuracy bar
    // TODO: Use semantic/palette colors (e.g., success)
    ctx.fillStyle = '#10b981'; // Emerald-500
    const earlyBarWidth = Math.max(0, (earlyAccuracy / 100) * barMaxWidth);
    ctx.fillRect(labelAreaWidth, 40, earlyBarWidth, barHeight);

    // Late accuracy bar
    // TODO: Use semantic/palette colors (e.g., warning)
    ctx.fillStyle = '#f59e0b'; // Amber-500
    const lateBarWidth = Math.max(0, (lateAccuracy / 100) * barMaxWidth);
    ctx.fillRect(labelAreaWidth, 80, lateBarWidth, barHeight);

    // Labels
    // TODO: Use semantic colors (e.g., muted-foreground)
    ctx.fillStyle = '#475569'; // Slate-600
    ctx.font = '12px sans-serif'; // TODO: Use font from theme
    ctx.textAlign = 'right';
    ctx.fillText('Early', labelAreaWidth - 5, 55);
    ctx.fillText('Late', labelAreaWidth - 5, 95);

    // Values
    ctx.textAlign = 'left';
    ctx.fillText(`${earlyAccuracy}%`, labelAreaWidth + earlyBarWidth + 5, 55);
    ctx.fillText(`${lateAccuracy}%`, labelAreaWidth + lateBarWidth + 5, 95);

    // Title
    // TODO: Use semantic colors (e.g., foreground)
    ctx.fillStyle = '#0f172a'; // Slate-900
    ctx.font = 'bold 14px sans-serif'; // TODO: Use font from theme
    ctx.textAlign = 'left';
    ctx.fillText('Session Endurance', labelAreaWidth, 20); // Adjust title position

  }, [earlyAccuracy, lateAccuracy]);

  return (
    <div className="flex flex-col items-center">
      {/* Set explicit width/height for canvas for consistent rendering */}
      {/* Added mb-2 for spacing between canvas and text */}
      <canvas ref={chartRef} width="250" height="130" className="mx-auto mb-2"></canvas>
      {/* Fatigue indicator */}
      {earlyAccuracy - lateAccuracy > 10 && (
         // Use Catalyst Text and Lucide icon
         <Text className="text-xs text-center text-destructive flex items-center justify-center gap-1">
            <AlertTriangle className="size-3.5" />
            Significant fatigue detected ({earlyAccuracy - lateAccuracy}% drop)
         </Text>
       )}
    </div>
  );
}
