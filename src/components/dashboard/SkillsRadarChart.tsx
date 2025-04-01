'use client'

import { useState, useEffect, useRef } from 'react'
import { ClientOnly, SuppressHydrationWarning } from '@/lib/clientUtils'

// Define props interface
interface SkillsRadarChartProps {
  skills?: Array<{
    name: string;
    value: number; // 0-100 percentage
    color: string;
  }>;
  title?: string;
}

export function SkillsRadarChart({ 
  skills = [
    { name: 'Reading', value: 78, color: '#4285F4' }, // blue
    { name: 'Writing', value: 65, color: '#A142F4' }, // purple
    { name: 'Algebra', value: 82, color: '#42BFF4' }, // cyan
    { name: 'Geometry', value: 70, color: '#34A853' }, // green
    { name: 'Data Analysis', value: 55, color: '#FBBC05' }, // amber
    { name: 'Critical Thinking', value: 75, color: '#EA4335' }, // red
  ],
  title = 'Skills Breakdown'
}: SkillsRadarChartProps) {
  // Start with consistent state for server-side rendering
  const [animatedSkills, setAnimatedSkills] = useState(skills);
  const containerRef = useRef<HTMLDivElement>(null);
  // Use fixed initial dimensions to avoid hydration mismatch
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
  const [isClient, setIsClient] = useState(false);

  // Only update dimensions and start animations after hydration
  useEffect(() => {
    setIsClient(true);
    
    // Reset animated skills to start from 0 for animation effect
    // Only do this on the client to avoid hydration mismatch
    setAnimatedSkills(skills.map(skill => ({ ...skill, value: 0 })));
    
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        // Maintain aspect ratio but ensure minimum size
        setDimensions({
          width: Math.max(width, 250),
          height: Math.max(width, 250)
        });
      }
    };

    // Initial size
    updateSize();
    
    // Add resize listener
    window.addEventListener('resize', updateSize);
    
    return () => window.removeEventListener('resize', updateSize);
  }, [skills]);

  // Animation effect - only runs on client after hydration
  useEffect(() => {
    if (!isClient) return;
    
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedSkills(prev => {
          const allComplete = prev.every((skill, idx) => skill.value >= skills[idx].value);
          
          if (allComplete) {
            clearInterval(interval);
            return prev;
          }
          
          return prev.map((skill, idx) => {
            if (skill.value >= skills[idx].value) return skill;
            return {
              ...skill,
              value: Math.min(skill.value + 2, skills[idx].value)
            };
          });
        });
      }, 20);
      
      return () => clearInterval(interval);
    }, 300); // Delay start of animation for better effect
    
    return () => clearTimeout(timer);
  }, [skills, isClient]);
  
  // Radar chart configuration - static calculation for consistent server/client rendering
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const maxRadius = Math.min(dimensions.width, dimensions.height) * 0.4; // Adjusted to match design
  
  // Create the points for each skill on the radar - with fixed math for consistency
  const getPathCoordinates = (values: number[]) => {
    const angleStep = (Math.PI * 2) / values.length;
    
    return values.map((value, i) => {
      const radius = (value / 100) * maxRadius;
      // Use toFixed to ensure consistent string representation between server and client
      const x = Number((centerX + radius * Math.sin(angleStep * i)).toFixed(5));
      const y = Number((centerY - radius * Math.cos(angleStep * i)).toFixed(5));
      return { x, y };
    });
  };
  
  // Get the SVG path for the radar chart
  const createPath = (points: Array<{x: number, y: number}>) => {
    let path = `M ${points[0].x} ${points[0].y}`;
    points.forEach((point, i) => {
      if (i !== 0) path += ` L ${point.x} ${point.y}`;
    });
    return path + ' Z'; // Close the path
  };
  
  // Create the radar background grid - using fixed math for consistency
  const createBackgroundGrid = () => {
    const levels = [20, 40, 60, 80, 100];
    return levels.map(level => {
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
      const angleStep = (Math.PI * 2) / skills.length;
      // Use Number() with toFixed() to ensure consistent number format
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
  
  // Label positions for each skill - using fixed math for consistency
  const createLabels = () => {
    return skills.map((skill, i) => {
      const angleStep = (Math.PI * 2) / skills.length;
      const labelRadius = maxRadius + (dimensions.width < 300 ? 15 : 25); // Adjust for smaller screens
      // Use Number() with toFixed() for consistent formatting
      const x = Number((centerX + labelRadius * Math.sin(angleStep * i)).toFixed(5));
      const y = Number((centerY - labelRadius * Math.cos(angleStep * i)).toFixed(5));
      
      // Deterministic text anchor logic based on position
      let textAnchor = 'middle';
      if (x < centerX - 10) textAnchor = 'end';
      if (x > centerX + 10) textAnchor = 'start';
      
      // Fixed classes to avoid server/client mismatch
      const nameClass = "text-sm font-medium text-slate-800 dark:text-slate-200";
      const valueClass = "text-sm font-bold text-slate-900 dark:text-white";
      
      // Fixed value for consistent server/client rendering
      const valueOffset = 20;
      
      return (
        <g key={`label-${i}`}>
          <text
            x={x}
            y={y}
            textAnchor={textAnchor}
            className={nameClass}
          >
            {skill.name}
          </text>
          <text
            x={x}
            y={y + valueOffset}
            textAnchor={textAnchor}
            className={valueClass}
          >
            {skill.value}%
          </text>
        </g>
      );
    });
  };
  
  return (
    <div className="p-4 h-full flex flex-col">
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 px-2">{title}</h3>
      
      <div className="flex justify-center flex-1" ref={containerRef}>
        {/* Render different content for server vs client to avoid hydration mismatches */}
        <ClientOnly
          fallback={
            <svg 
              width="100%" 
              height="100%" 
              viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} 
              className="overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Static server-rendered version - just grid and axes */}
              {createBackgroundGrid()}
              {createAxisLines()}
              {createLabels()}
            </svg>
          }
        >
          <SuppressHydrationWarning>
            <svg 
              width="100%" 
              height="100%" 
              viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} 
              className="overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Background grid */}
              {createBackgroundGrid()}
              
              {/* Axis lines */}
              {createAxisLines()}
              
              {/* Data polygon with blue fill */}
              <path
                d={createPath(getPathCoordinates(animatedSkills.map(skill => skill.value)))}
                fill="rgba(79, 129, 255, 0.2)"
                stroke="#4F81FF"
                strokeWidth="2"
                className="transition-all duration-300 ease-out"
              />
              
              {/* Data points */}
              {getPathCoordinates(animatedSkills.map(skill => skill.value)).map((point, i) => (
                <circle
                  key={`point-${i}`}
                  cx={point.x}
                  cy={point.y}
                  r="5"
                  fill={animatedSkills[i].color}
                  stroke="white"
                  strokeWidth="2"
                  className="filter drop-shadow-sm"
                />
              ))}
              
              {/* Skill labels */}
              {createLabels()}
            </svg>
          </SuppressHydrationWarning>
        </ClientOnly>
      </div>
      
      {/* Legend/key - Clean row layout */}
      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 justify-center">
        {skills.map((skill, i) => (
          <div key={`legend-${i}`} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-1.5" 
              style={{ backgroundColor: skill.color }}
            ></div>
            <span className="text-sm text-slate-700 dark:text-slate-300">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
