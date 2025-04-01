'use client'

import { useState, useEffect } from 'react'

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
    { name: 'Reading', value: 78, color: '#3b82f6' }, // blue
    { name: 'Writing', value: 65, color: '#8b5cf6' }, // purple
    { name: 'Algebra', value: 82, color: '#06b6d4' }, // cyan
    { name: 'Geometry', value: 70, color: '#10b981' }, // emerald
    { name: 'Data Analysis', value: 55, color: '#f59e0b' }, // amber
    { name: 'Critical Thinking', value: 75, color: '#ef4444' }, // red
  ],
  title = 'Skills Breakdown'
}: SkillsRadarChartProps) {
  const [animatedSkills, setAnimatedSkills] = useState(skills.map(skill => ({ ...skill, value: 0 })));

  // Animation effect for radar chart
  useEffect(() => {
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
  }, [skills]);
  
  // Radar chart configuration
  const centerX = 150;
  const centerY = 150;
  const maxRadius = 120;
  
  // Create the points for each skill on the radar
  const getPathCoordinates = (values: number[]) => {
    const angleStep = (Math.PI * 2) / values.length;
    
    return values.map((value, i) => {
      const radius = (value / 100) * maxRadius;
      const x = centerX + radius * Math.sin(angleStep * i);
      const y = centerY - radius * Math.cos(angleStep * i);
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
  
  // Create the radar background grid
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
      const x = centerX + maxRadius * Math.sin(angleStep * i);
      const y = centerY - maxRadius * Math.cos(angleStep * i);
      
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
      const angleStep = (Math.PI * 2) / skills.length;
      const labelRadius = maxRadius + 20;
      const x = centerX + labelRadius * Math.sin(angleStep * i);
      const y = centerY - labelRadius * Math.cos(angleStep * i);
      
      // Adjust text anchor based on position
      let textAnchor = 'middle';
      if (x < centerX - 10) textAnchor = 'end';
      if (x > centerX + 10) textAnchor = 'start';
      
      return (
        <g key={`label-${i}`}>
          <text
            x={x}
            y={y}
            textAnchor={textAnchor}
            className="text-xs text-slate-600 dark:text-slate-400 font-medium"
          >
            {skill.name}
          </text>
          <text
            x={x}
            y={y + 16}
            textAnchor={textAnchor}
            className="text-xs text-slate-500 dark:text-slate-500"
          >
            {skill.value}%
          </text>
        </g>
      );
    });
  };
  
  // Get data points based on current animated values
  const valuePoints = getPathCoordinates(animatedSkills.map(skill => skill.value));
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700">
        <h3 className="font-medium text-slate-900 dark:text-white">{title}</h3>
      </div>
      
      <div className="p-6">
        <div className="flex justify-center">
          <svg width="300" height="300" viewBox="0 0 300 300" className="overflow-visible">
            {/* Background grid */}
            {createBackgroundGrid()}
            
            {/* Axis lines */}
            {createAxisLines()}
            
            {/* Data polygon with gradient fill */}
            <defs>
              <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            
            <path
              d={createPath(valuePoints)}
              fill="url(#radarGradient)"
              stroke="#4f46e5"
              strokeWidth="2"
              className="transition-all duration-300 ease-out"
            />
            
            {/* Data points */}
            {valuePoints.map((point, i) => (
              <circle
                key={`point-${i}`}
                cx={point.x}
                cy={point.y}
                r="4"
                fill={animatedSkills[i].color}
                stroke="white"
                strokeWidth="1"
                className="filter drop-shadow-sm"
              />
            ))}
            
            {/* Skill labels */}
            {createLabels()}
            
            {/* Center dot */}
            <circle cx={centerX} cy={centerY} r="2" fill="#cbd5e1" />
          </svg>
        </div>
        
        {/* Legend/key */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          {skills.map((skill, i) => (
            <div key={`legend-${i}`} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-1.5" 
                style={{ backgroundColor: skill.color }}
              ></div>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
