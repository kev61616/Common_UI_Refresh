'use client'

import React, { useEffect, useRef } from 'react'
import { Typography } from '@/components/ui/typography'

interface MistakeData {
  conceptual: number;
  careless: number;
  timeManagement: number;
}

interface MistakeAnalysisChartProps {
  mistakeTypes: MistakeData;
}

export function MistakeAnalysisChart({ mistakeTypes }: MistakeAnalysisChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const { conceptual, careless, timeManagement } = mistakeTypes;
  const totalMistakes = conceptual + careless + timeManagement;

  useEffect(() => {
    const canvas = chartRef.current
    if (!canvas) return;
    const ctx = canvas.getContext('2d')
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Title
    // TODO: Use semantic colors (e.g., foreground)
    ctx.fillStyle = '#0f172a'; // Slate-900
    ctx.font = 'bold 14px sans-serif'; // TODO: Use font from theme
    ctx.textAlign = 'center'; // Center title
    ctx.fillText('Mistake Analysis', canvasWidth / 2, 20);

    if (totalMistakes === 0) {
      // No mistakes - perfect score!
      // TODO: Use semantic colors (e.g., success)
      ctx.fillStyle = '#10b981'; // Emerald-500
      ctx.font = '14px sans-serif'; // TODO: Use font from theme
      ctx.textAlign = 'center';
      ctx.fillText('No Mistakes - Perfect!', canvasWidth / 2, canvasHeight / 2 + 10);
      return;
    }

    // Draw horizontal bar chart
    const barHeight = 20;
    const labelAreaWidth = 30; // Space for bar start
    const valueLabelAreaWidth = 70; // Space for text label end
    const barMaxWidth = canvasWidth - labelAreaWidth - valueLabelAreaWidth - 10; // 10 for padding

    // Conceptual mistakes
    if (conceptual > 0) {
        // TODO: Use semantic/palette colors (e.g., destructive or specific red/rose)
        ctx.fillStyle = '#f43f5e'; // Rose-500
        const conceptualWidth = Math.max(0, (conceptual / totalMistakes) * barMaxWidth);
        ctx.fillRect(labelAreaWidth, 40, conceptualWidth, barHeight);
        // Value Label
        ctx.fillStyle = '#fff'; // White text on dark bar
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${conceptual}`, labelAreaWidth + conceptualWidth / 2, 54); // Adjust Y position
    }

    // Careless mistakes
    if (careless > 0) {
        // TODO: Use semantic/palette colors (e.g., warning)
        ctx.fillStyle = '#f59e0b'; // Amber-500
        const carelessWidth = Math.max(0, (careless / totalMistakes) * barMaxWidth);
        ctx.fillRect(labelAreaWidth, 70, carelessWidth, barHeight);
        // Value Label
        ctx.fillStyle = '#fff'; // White text on dark bar
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${careless}`, labelAreaWidth + carelessWidth / 2, 84); // Adjust Y position
    }

    // Time management mistakes
    if (timeManagement > 0) {
        // TODO: Use semantic/palette colors (e.g., primary or info)
        ctx.fillStyle = '#3b82f6'; // Blue-500
        const timeWidth = Math.max(0, (timeManagement / totalMistakes) * barMaxWidth);
        ctx.fillRect(labelAreaWidth, 100, timeWidth, barHeight);
         // Value Label
        ctx.fillStyle = '#fff'; // White text on dark bar
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${timeManagement}`, labelAreaWidth + timeWidth / 2, 114); // Adjust Y position
    }

    // Category Labels (Right side)
    // TODO: Use semantic colors (e.g., muted-foreground)
    ctx.fillStyle = '#475569'; // Slate-600
    ctx.font = '12px sans-serif'; // TODO: Use font from theme
    ctx.textAlign = 'left';
    if (conceptual > 0) ctx.fillText('Conceptual', canvasWidth - valueLabelAreaWidth + 5, 55);
    if (careless > 0) ctx.fillText('Careless', canvasWidth - valueLabelAreaWidth + 5, 85);
    if (timeManagement > 0) ctx.fillText('Time Mgmt', canvasWidth - valueLabelAreaWidth + 5, 115);


  }, [mistakeTypes, totalMistakes]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={chartRef} width="250" height="150" className="mx-auto"></canvas>
      {/* No legend needed as labels are drawn on canvas */}
    </div>
  );
}
