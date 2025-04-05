'use client'

import React from 'react';
// Removed Typography import
import { Text } from '@/components/catalyst/text'; // Use Catalyst Text

// Define types for trend data
type TrendData = number[] | Array<{ label: string; value: number }>;
type InsightType = 'strength' | 'weakness' | 'trend' | 'opportunity' | 'pattern';

interface MicroChartProps {
    trendData: TrendData;
    type: InsightType; // Pass type to potentially influence styling
}

export function MicroChart({ trendData, type }: MicroChartProps) {

    // Render chart based on trend data type
    if (Array.isArray(trendData) && typeof trendData[0] === 'number') {
      // --- Line Chart Logic ---
      const values = trendData as number[];
      if (values.length < 2) return <div className="text-xs text-muted-foreground">Not enough data</div>; // Need at least 2 points

      const max = Math.max(...values, 0); // Ensure max is at least 0
      const min = Math.min(...values, 0); // Ensure min is at least 0
      // Avoid division by zero if max === min
      const range = max === min ? 1 : max - min;

      const isImproving = values[values.length - 1] >= values[0]; // Use >= for neutral trend
      // TODO: Use semantic colors based on type AND isImproving
      const gradientColors = isImproving
        ? 'from-success-500/20 to-teal-500/10'
        : 'from-rose-500/20 to-red-500/10';
      const strokeColor = isImproving ? '#10b981' : '#ef4444'; // success-500 or red-500

      // Calculate point coordinates, ensuring they stay within 0-100 range for viewBox
      const points = values.map((v, i) => {
          const yValue = 100 - Math.max(0, Math.min(100, ((v - min) / range) * 100));
          return `${i},${yValue}`;
      }).join(' ');

      // Calculate area path height and bottom offset
      const areaMax = Math.max(...values.map(v => ((v - min) / range) * 100), 0);
      const areaMin = Math.min(...values.map(v => ((v - min) / range) * 100), 0);
      const areaHeight = Math.max(1, areaMax); // Ensure minimum height of 1%
      const areaBottom = Math.max(0, areaMin);

      return (
        <div className="h-full w-full flex flex-col">
          {/* Graph title/info */}
          <div className="flex justify-between items-center text-xs text-muted-foreground mb-2"> {/* Use spacing scale mb-2 */}
            <div className="flex items-center">
              {/* TODO: Use semantic colors */}
              <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${isImproving ? 'bg-success-500' : 'bg-destructive'}`}></span> {/* Use spacing scale w-2, h-2, mr-1.5 */}
              <span>{isImproving ? 'Improving trend' : 'Declining trend'}</span>
            </div>
            <div>Last {values.length} sessions</div>
          </div>

          {/* Main graph */}
          <div className="relative flex-grow">
            {/* Area background gradient */}
            <div
              className={`absolute inset-x-0 bottom-0 bg-gradient-to-t ${gradientColors} rounded-md`}
              style={{
                height: `${areaHeight}%`,
                bottom: `${areaBottom}%` // Adjust based on min value if needed
              }}
            ></div>

            {/* Line chart with data points */}
            <svg
              className="absolute inset-0 w-full h-full overflow-visible" // Use overflow-visible for points
              viewBox={`0 ${-5} ${values.length - 1} ${110}`} // Adjust viewBox slightly for points
              preserveAspectRatio="none"
            >
              <polyline
                points={points}
                fill="none"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-sm"
              />
              {/* Data points */}
              {values.map((value, i) => {
                 const yValue = 100 - Math.max(0, Math.min(100, ((value - min) / range) * 100));
                 return (
                    <circle
                        key={i}
                        cx={i}
                        cy={yValue}
                        r="2.5"
                        fill="white"
                        stroke={strokeColor}
                        strokeWidth="1.5"
                        className="drop-shadow-sm"
                    />
                 )
              })}
            </svg>

            {/* X-axis labels */}
            <div className="absolute -bottom-4 inset-x-0 flex justify-between items-center text-[10px] text-muted-foreground"> {/* Use spacing scale -bottom-4 */}
              <div>Start</div>
              {/* Removed middle label for simplicity */}
              <div>Now</div>
            </div>
          </div>
        </div>
      );
    }

    // For comparison data (array of objects with label and value)
    if (Array.isArray(trendData) && typeof trendData[0] === 'object' && 'label' in trendData[0]) {
      // --- Bar Chart Logic ---
      const comparisons = trendData as Array<{label: string, value: number}>;
      if (comparisons.length === 0) return <div className="text-xs text-muted-foreground">No data</div>;

      const max = Math.max(...comparisons.map(c => c.value), 0); // Ensure max is at least 0

      return (
        <div className="h-full w-full flex flex-col">
          {/* Graph title */}
          <div className="text-xs text-muted-foreground mb-2"> {/* Use spacing scale mb-2 */}
            Performance by time of day
          </div>

          {/* Chart */}
          <div className="relative flex-grow flex items-end justify-around">
            {/* Bar chart */}
            {comparisons.map((item, i) => {
              // Calculate height percentage, ensure minimum height if value is 0 but max > 0
              const heightPercentage = max > 0 ? Math.max(1, (item.value / max) * 100) : 0;

              // Determine colors - TODO: Use semantic/palette colors more systematically
              let color, gradient;
              if (i === 0) { // Assuming Morning
                color = 'bg-success-500'; gradient = 'from-success-500 to-teal-400';
              } else if (i === comparisons.length - 1) { // Assuming Evening
                color = 'bg-destructive'; gradient = 'from-rose-500 to-red-400';
              } else { // Assuming Afternoon
                color = 'bg-primary'; gradient = 'from-blue-500 to-indigo-400';
              }

              return (
                <div key={i} className="flex flex-col items-center px-2 h-full justify-end w-1/3"> {/* Use spacing scale px-2 */}
                  {/* Bar value - Use Catalyst Text */}
                  <Text className="text-xs font-medium text-foreground mb-1"> {/* Use spacing scale mb-1 */}
                    {item.value}%
                  </Text>

                  {/* Bar */}
                  <div className="w-full relative rounded-t-lg overflow-hidden"
                    style={{ height: `${heightPercentage}%` }}>
                    <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-80`}></div>
                    <div className={`absolute inset-0 ${color} opacity-20`}></div>
                  </div>

                  {/* Bar label - Use Catalyst Text */}
                  <Text className="mt-2 text-xs font-medium text-muted-foreground"> {/* Use spacing scale mt-2 */}
                    {item.label}
                  </Text>
                </div>
              )
            })}

            {/* Grid lines (Optional) */}
            <div className="absolute inset-x-0 top-0 h-full flex flex-col justify-between pointer-events-none -z-10">
              {[0, 25, 50, 75, 100].map((mark) => (
                <div key={mark} className="w-full flex items-center">
                  <div className="w-full border-t border-border/50"></div> {/* Use border-border */}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Fallback if data format is unexpected
    return <div className="text-xs text-muted-foreground">Unsupported chart data</div>;
}
