'use client';

import { useState, useEffect, useRef } from 'react';
import { ClientOnly } from '@/components/dnd';

// Define props interface
interface SkillsRadarChartProps {
  skills?: Array<{
    name: string;
    value: number; // 0-100 percentage
    color: string;
  }>;
  title?: string;
  compact?: boolean; // Add compact mode for card view
}

export function SkillsRadarChart({
  skills = [
    { name: 'Reading', value: 78, color: '#4285F4' }, // blue
    { name: 'Writing', value: 65, color: '#A142F4' }, // purple
    { name: 'Algebra', value: 82, color: '#42BFF4' }, // cyan
    { name: 'Geometry', value: 70, color: '#34A853' }, // green
    { name: 'Data Analysis', value: 55, color: '#FBBC05' }, // amber
    { name: 'Critical Thinking', value: 75, color: '#EA4335' } // red
  ],
  compact = true // Default to compact mode for card
}: SkillsRadarChartProps) {
  // Start with consistent state for server-side rendering
  const [animatedSkills, setAnimatedSkills] = useState(skills);
  const containerRef = useRef<HTMLDivElement>(null);
  // Use fixed initial dimensions to avoid hydration mismatch
  const [dimensions, setDimensions] = useState({ width: 320, height: 250 });
  const [isClient, setIsClient] = useState(false);

  // Only update dimensions and start animations after hydration
  useEffect(() => {
    setIsClient(true);

    // Reset animated skills to start from 0 for animation effect
    setAnimatedSkills(skills.map((skill) => ({ ...skill, value: 0 })));

    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        // Maintain aspect ratio but ensure minimum size
        // Adjust height for compact mode
        const height = compact ? Math.min(width * 0.75, 220) : Math.max(width, 250);
        setDimensions({
          width: Math.max(width, 200),
          height
        });
      }
    };

    // Initial size
    updateSize();

    // Add resize listener
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, [skills, compact]);

  // Enhanced animation effect - only runs on client after hydration
  useEffect(() => {
    if (!isClient) return;

    // Reset animated skills to start from 0 for animation effect
    setAnimatedSkills(skills.map((skill) => ({ ...skill, value: 0 })));

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedSkills((prev) => {
          const allComplete = prev.every((skill, idx) => skill.value >= skills[idx].value);

          if (allComplete) {
            clearInterval(interval);
            return prev;
          }

          return prev.map((skill, idx) => {
            if (skill.value >= skills[idx].value) return skill;
            return {
              ...skill,
              // Use easing function for smoother animation
              value: Math.min(skill.value + (skills[idx].value - skill.value) * 0.1 + 1, skills[idx].value)
            };
          });
        });
      }, 20);

      return () => clearInterval(interval);
    }, 300); // Delay start of animation for better effect

    return () => clearTimeout(timer);
  }, [skills, isClient]);

  // Radar chart configuration
  const centerX = dimensions.width / 2;
  const centerY = compact ? dimensions.height / 2 - 10 : dimensions.height / 2; 
  const maxRadius = Math.min(dimensions.width, dimensions.height) * (compact ? 0.35 : 0.4);

  // Create the points for each skill on the radar
  const getPathCoordinates = (values: number[]) => {
    const angleStep = Math.PI * 2 / values.length;

    return values.map((value, i) => {
      const radius = value / 100 * maxRadius;
      const x = Number((centerX + radius * Math.sin(angleStep * i)).toFixed(5));
      const y = Number((centerY - radius * Math.cos(angleStep * i)).toFixed(5));
      return { x, y };
    });
  };

  // Get the SVG path for the radar chart
  const createPath = (points: Array<{x: number;y: number;}>) => {
    let path = `M ${points[0].x} ${points[0].y}`;
    points.forEach((point, i) => {
      if (i !== 0) path += ` L ${point.x} ${point.y}`;
    });
    return path + ' Z'; // Close the path
  };

  // Create the radar background grid
  const createBackgroundGrid = () => {
    // Reduce number of grid levels in compact mode
    const levels = compact ? [25, 50, 75, 100] : [20, 40, 60, 80, 100];
    return levels.map((level) => {
      const gridPoints = getPathCoordinates(Array(skills.length).fill(level));
      return (
        <path
          key={`grid-${level}`}
          d={createPath(gridPoints)}
          stroke="#e2e8f0"
          strokeWidth="1"
          fill="none"
          className="dark:stroke-slate-700"
        />
      );
    });
  };

  // Create axis lines for each skill
  const createAxisLines = () => {
    return skills.map((skill, i) => {
      const angleStep = Math.PI * 2 / skills.length;
      const x = Number((centerX + maxRadius * Math.sin(angleStep * i)).toFixed(5));
      const y = Number((centerY - maxRadius * Math.cos(angleStep * i)).toFixed(5));

      return (
        <line
          key={`axis-${i}`}
          x1={centerX}
          y1={centerY}
          x2={x}
          y2={y}
          stroke="#e2e8f0"
          strokeWidth="1"
          className="dark:stroke-slate-700"
        />
      );
    });
  };

  // Label positions for each skill
  const createLabels = () => {
    return skills.map((skill, i) => {
      const angleStep = Math.PI * 2 / skills.length;
      // Reduce label distance in compact mode
      const labelRadius = maxRadius + (compact ? 15 : 25);
      const x = Number((centerX + labelRadius * Math.sin(angleStep * i)).toFixed(5));
      const y = Number((centerY - labelRadius * Math.cos(angleStep * i)).toFixed(5));

      // Deterministic text anchor logic based on position
      let textAnchor = 'middle';
      if (x < centerX - 10) textAnchor = 'end';
      if (x > centerX + 10) textAnchor = 'start';

      // Smaller text for compact mode
      const nameClass = compact 
        ? "text-xs font-medium text-slate-800 dark:text-slate-200" 
        : "text-sm font-medium text-slate-800 dark:text-slate-200";
      
      // Only show values in non-compact mode to save space
      if (compact) {
        return (
          <g key={`label-${i}`}>
            <text
              x={x}
              y={y}
              textAnchor={textAnchor}
              className={nameClass}>
              {skill.name}
            </text>
          </g>
        );
      }

      // For full mode, show both name and value
      const valueClass = "text-sm font-bold text-slate-900 dark:text-white";
      const valueOffset = 20;
      
      return (
        <g key={`label-${i}`}>
          <text
            x={x}
            y={y}
            textAnchor={textAnchor}
            className={nameClass}>
            {skill.name}
          </text>
          <text
            x={x}
            y={y + valueOffset}
            textAnchor={textAnchor}
            className={valueClass}>
            {skill.value}%
          </text>
        </g>
      );
    });
  };

  // Simplified rendering for server
  const staticContent = (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      className="overflow-visible"
      preserveAspectRatio="xMidYMid meet">
      {createBackgroundGrid()}
      {createAxisLines()}
      {createLabels()}
    </svg>
  );

  // Dynamic content for client
  const dynamicContent = (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      className="overflow-visible"
      preserveAspectRatio="xMidYMid meet"
      suppressHydrationWarning>
      {/* Background grid */}
      {createBackgroundGrid()}
      
      {/* Axis lines */}
      {createAxisLines()}
      
      {/* Data polygon with fill */}
      <path
        d={createPath(getPathCoordinates(animatedSkills.map((skill) => skill.value)))}
        fill="rgba(79, 129, 255, 0.2)"
        stroke="#4F81FF"
        strokeWidth="2"
        className="transition-all duration-300 ease-out" />
      
      {/* Data points */}
      {getPathCoordinates(animatedSkills.map((skill) => skill.value)).map((point, i) =>
        <circle
          key={`point-${i}`}
          cx={point.x}
          cy={point.y}
          r={compact ? "3" : "5"}
          fill={animatedSkills[i].color}
          stroke="white"
          strokeWidth="2"
          className="filter drop-shadow-sm" />
      )}
      
      {/* Skill labels */}
      {createLabels()}
    </svg>
  );

  return (
    <div className={`${compact ? 'p-0' : 'p-4'} h-full flex flex-col`}>
      {/* Chart area */}
      <div className="flex justify-center flex-1" ref={containerRef}>
        <ClientOnly fallback={staticContent}>
          {dynamicContent}
        </ClientOnly>
      </div>
      
      {/* Legend - Horizontal for compact, wrapped grid for full */}
      <div className={`
        flex flex-wrap gap-x-2 gap-y-1
        ${compact ? 'mt-2 justify-center overflow-x-auto' : 'mt-6 justify-center gap-x-4 gap-y-2'}
      `}>
        {skills.map((skill, i) =>
          <div key={`legend-${i}`} className="flex items-center">
            <div
              className={`${compact ? 'w-2 h-2' : 'w-3 h-3'} rounded-full mr-1`}
              style={{ backgroundColor: skill.color }}>
            </div>
            <span className={`${compact ? 'text-xs' : 'text-sm'} text-slate-700 dark:text-slate-300`}>
              {skill.name}
              {/* Only show percentages in compact legend */}
              {compact && <span className="ml-1 font-medium">{skill.value}%</span>}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
