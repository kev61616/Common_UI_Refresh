'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PracticeSet } from '@/lib/mockData';
import { TimelineViewProps } from './types';
import { format, parseISO, differenceInDays } from 'date-fns';

export const TreeRingsTimeline: React.FC<TimelineViewProps> = ({
  practiceSets,
  onSelectSet,
  selectedSetId
}) => {
  const [sortedSets, setSortedSets] = useState<PracticeSet[]>([]);
  const [hoverSetId, setHoverSetId] = useState<string | null>(null);
  const [selectedRingId, setSelectedRingId] = useState<string | null>(null);
  const [groupedSetsByMonth, setGroupedSetsByMonth] = useState<Record<string, PracticeSet[]>>({});
  const [ringAnimations, setRingAnimations] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Process and group practice sets
  useEffect(() => {
    // Sort sets by date (oldest to newest)
    const sorted = [...practiceSets].sort((a, b) =>
    new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
    );
    setSortedSets(sorted);

    // Group by month
    const grouped: Record<string, PracticeSet[]> = {};
    sorted.forEach((set) => {
      const date = parseISO(set.dateCompleted);
      const monthYear = format(date, 'MMMM yyyy');

      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }

      grouped[monthYear].push(set);
    });

    setGroupedSetsByMonth(grouped);

    // Start ring animations after a short delay
    setTimeout(() => {
      setRingAnimations(true);
    }, 300);
  }, [practiceSets]);

  // Calculate ring properties for visualization
  const calculateRingProperties = () => {
    const centerX = 500; // SVG center X coordinate
    const centerY = 500; // SVG center Y coordinate
    const innerRadius = 100; // Smallest ring (core)
    const maxRadius = 450; // Largest ring

    const ringProperties: {
      id: string;
      label: string;
      radius: number;
      color: string;
      width: number;
      dashArray: string;
      rotation: number;
      isSelected: boolean;
      isHovered: boolean;
      set: PracticeSet;
    }[] = [];

    // Calculate available radius space
    const availableRadius = maxRadius - innerRadius;
    const ringCount = sortedSets.length;

    // Calculate individual ring properties
    sortedSets.forEach((set, index) => {
      const position = index / (ringCount || 1); // normalized position 0-1
      const radius = innerRadius + position * availableRadius;

      // Generate color based on subject
      const color = set.subject === 'Math' ? '#3b82f6' :
      set.subject === 'Reading' ? '#10b981' :
      set.subject === 'Writing' ? '#f59e0b' :
      '#64748b';

      // Calculate ring width based on question count (more questions = wider ring)
      const baseWidth = 4; // base width in pixels
      const questionFactor = Math.min(set.questions.length / 10, 2.5); // cap at 2.5x base width
      const width = baseWidth * (1 + questionFactor);

      // Generate dash array based on accuracy (higher accuracy = more solid ring)
      const dashLength = set.accuracy < 60 ? '4 2' :
      set.accuracy < 75 ? '8 2' :
      set.accuracy < 90 ? '12 1' :
      'none'; // solid ring for high accuracy

      // Calculate rotation based on date
      const dateObj = parseISO(set.dateCompleted);
      const dayOfYear = differenceInDays(dateObj, new Date(dateObj.getFullYear(), 0, 1));
      const rotation = dayOfYear / 365 * 360; // convert to degrees

      // Check if selected
      const isSelected = set.id === selectedSetId;
      const isHovered = set.id === hoverSetId;

      // Generate ring label
      const label = `${set.subject}: ${set.type}`;

      // Add to properties array
      ringProperties.push({
        id: set.id,
        label,
        radius,
        color,
        width,
        dashArray: dashLength,
        rotation,
        isSelected,
        isHovered,
        set
      });
    });

    return ringProperties;
  };

  // Draw a single tree ring
  const drawRing = (props: {
    id: string;
    radius: number;
    color: string;
    width: number;
    dashArray: string;
    rotation: number;
    isSelected: boolean;
    isHovered: boolean;
  }) => {
    const { id, radius, color, width, dashArray, rotation, isSelected, isHovered } = props;
    const centerX = 500;
    const centerY = 500;

    // Create ring path
    return (
      <g
        key={id}
        className="tree-ring"
        transform={`rotate(${rotation}, ${centerX}, ${centerY})`}>

        <circle
          id={`ring-${id}`}
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={width}
          strokeDasharray={dashArray}
          opacity={isSelected ? 1 : isHovered ? 0.9 : 0.7}
          className={`${isSelected ? 'ring-glow' : ''} ${ringAnimations ? 'animate-ring-grow' : ''}`}
          onClick={() => {
            onSelectSet?.(id);
            setSelectedRingId(id);
          }}
          onMouseEnter={() => setHoverSetId(id)}
          onMouseLeave={() => setHoverSetId(null)}
          style={{
            cursor: 'pointer',
            filter: isSelected ? `drop-shadow(0 0 3px ${color})` : 'none',
            strokeWidth: isSelected || isHovered ? width * 1.5 : width,
            transition: 'stroke-width 0.3s ease, opacity 0.3s ease'
          }} />

      </g>);

  };

  // Generate growth nodes (smaller circles) on rings
  const generateGrowthNodes = (props: {
    id: string;
    radius: number;
    color: string;
    set: PracticeSet;
    isSelected: boolean;
  }) => {
    const { id, radius, color, set, isSelected } = props;
    const centerX = 500;
    const centerY = 500;
    const nodes = [];

    // Generate 3-5 nodes based on accuracy
    const nodeCount = Math.ceil(set.accuracy / 25) + 2; // 3-5 nodes

    for (let i = 0; i < nodeCount; i++) {
      // Position nodes at random angles
      const angle = i / nodeCount * Math.PI * 2; // distribute evenly
      const jitter = (Math.random() - 0.5) * 0.2; // add slight randomness
      const finalAngle = angle + jitter;

      // Calculate node position
      const x = centerX + Math.cos(finalAngle) * radius;
      const y = centerY + Math.sin(finalAngle) * radius;

      // Node size based on question count for that subject
      const questionsOfType = set.questions.filter((q) => q.topic === set.type).length;
      const baseSize = 2;
      const size = baseSize + questionsOfType / 10;

      nodes.push(
        <circle
          key={`node-${id}-${i}`}
          cx={x}
          cy={y}
          r={size}
          fill={color}
          opacity={isSelected ? 1 : 0.8}
          className={isSelected ? 'animate-pulse' : ''} />

      );
    }

    return nodes;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, 'MMM d, yyyy');
  };

  // Get growth condition text based on accuracy
  const getGrowthCondition = (accuracy: number) => {
    if (accuracy >= 90) return 'Optimal Growth';
    if (accuracy >= 75) return 'Healthy Growth';
    if (accuracy >= 60) return 'Moderate Growth';
    return 'Stunted Growth';
  };

  // Get season based on month
  const getSeason = (dateString: string) => {
    const date = parseISO(dateString);
    const month = date.getMonth();

    // Northern hemisphere seasons
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Fall';
    return 'Winter';
  };

  // Get ring pattern description based on properties
  const getRingPattern = (set: PracticeSet) => {
    const patterns = [];

    // Accuracy affects ring density
    if (set.accuracy >= 90) patterns.push('dense');else
    if (set.accuracy >= 75) patterns.push('healthy');else
    if (set.accuracy >= 60) patterns.push('normal');else
    patterns.push('sparse');

    // Difficulty affects ring evenness
    if (set.difficulty === 'Easy') patterns.push('even');else
    if (set.difficulty === 'Medium') patterns.push('slightly varied');else
    patterns.push('uneven');

    // Pace affects ring width
    if (set.pace === 'Fast') patterns.push('thin');else
    if (set.pace === 'Slow') patterns.push('thick');else
    patterns.push('medium-width');

    return patterns.join(', ');
  };

  // Get colors for the tree cross-section based on subjects
  const getTreeColors = () => {
    const subjectCounts = {
      Math: 0,
      Reading: 0,
      Writing: 0,
      Other: 0
    };

    practiceSets.forEach((set) => {
      if (set.subject === 'Math') subjectCounts.Math++;else
      if (set.subject === 'Reading') subjectCounts.Reading++;else
      if (set.subject === 'Writing') subjectCounts.Writing++;else
      subjectCounts.Other++;
    });

    const total = Object.values(subjectCounts).reduce((sum, count) => sum + count, 0);
    if (total === 0) return { heartwood: '#8B4513', sapwood: '#D2B48C' };

    // Determine dominant subject for heartwood color
    const dominant = Object.entries(subjectCounts).
    sort(([, countA], [, countB]) => countB - countA)[0][0];

    // Set colors based on dominant subject
    const colors = {
      heartwood: dominant === 'Math' ? '#1d4ed8' :
      dominant === 'Reading' ? '#065f46' :
      dominant === 'Writing' ? '#b45309' :
      '#8B4513',
      sapwood: dominant === 'Math' ? '#93c5fd' :
      dominant === 'Reading' ? '#6ee7b7' :
      dominant === 'Writing' ? '#fcd34d' :
      '#D2B48C'
    };

    return colors;
  };

  // Generate tree bark texture pattern
  const generateBarkPattern = () => {
    const barkLines = [];
    const lineCount = 40;

    for (let i = 0; i < lineCount; i++) {
      // Randomize bark line properties
      const startX = Math.random() * 1000;
      const startY = Math.random() * 1000;
      const length = 20 + Math.random() * 80;
      const angle = Math.random() * Math.PI;
      const endX = startX + Math.cos(angle) * length;
      const endY = startY + Math.sin(angle) * length;
      const width = 1 + Math.random() * 2;

      barkLines.push(
        <line
          key={`bark-${i}`}
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke="#5d4037"
          strokeWidth={width}
          opacity={0.6 + Math.random() * 0.4} />

      );
    }

    return (
      <pattern
        id="barkPattern"
        patternUnits="userSpaceOnUse"
        width="100"
        height="100">

        <rect width="100" height="100" fill="#8B4513" />
        {barkLines}
      </pattern>);

  };

  // Render view
  const ringProperties = calculateRingProperties();
  const treeColors = getTreeColors();

  return (
    <div className="tree-rings-timeline space-y-6 pb-8">
      {/* Header with title and legend */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2 text-amber-700">
            <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z" clipRule="evenodd" />
          </svg>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Tree Rings Timeline</h2>
        </div>
        
        <div className="flex space-x-4 flex-wrap">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
            <span className="text-sm text-slate-700 dark:text-slate-300">Math</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>
            <span className="text-sm text-slate-700 dark:text-slate-300">Reading</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
            <span className="text-sm text-slate-700 dark:text-slate-300">Writing</span>
          </div>
        </div>
      </div>
      
      {/* Legend for reading tree rings */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-3">How to Read the Tree Rings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <div className="bg-gray-100 dark:bg-slate-700 rounded p-2 mr-3">
              <svg width="40" height="40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="6" strokeDasharray="none" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-slate-800 dark:text-slate-200">Solid Rings</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">High accuracy (90%+)</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-gray-100 dark:bg-slate-700 rounded p-2 mr-3">
              <svg width="40" height="40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray="12 1" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-slate-800 dark:text-slate-200">Mostly Solid</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Good accuracy (75-89%)</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-gray-100 dark:bg-slate-700 rounded p-2 mr-3">
              <svg width="40" height="40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="6" strokeDasharray="8 2" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-slate-800 dark:text-slate-200">Gapped Rings</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Average accuracy (60-74%)</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-gray-100 dark:bg-slate-700 rounded p-2 mr-3">
              <svg width="40" height="40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#64748b" strokeWidth="6" strokeDasharray="4 2" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-slate-800 dark:text-slate-200">Broken Rings</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Low accuracy (&lt;60%)</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-gray-100 dark:bg-slate-700 rounded p-2 mr-3">
              <svg width="40" height="40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" fill="none" stroke="#3b82f6" strokeWidth="10" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-slate-800 dark:text-slate-200">Thick Rings</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Many questions</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-gray-100 dark:bg-slate-700 rounded p-2 mr-3">
              <svg width="40" height="40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="35" fill="none" stroke="#3b82f6" strokeWidth="3" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-slate-800 dark:text-slate-200">Thin Rings</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Few questions</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tree rings visualization */}
        <div className="tree-visualization lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
          <div className="relative">
            <svg
              ref={svgRef}
              width="100%"
              viewBox="0 0 1000 1000"
              className="max-h-[700px]">

              {/* Define patterns */}
              <defs>
                {generateBarkPattern()}
              </defs>
              
              {/* Outer bark ring */}
              <circle
                cx="500"
                cy="500"
                r="480"
                fill="url(#barkPattern)"
                className="bark-ring" />

              
              {/* Sapwood layer */}
              <circle
                cx="500"
                cy="500"
                r="460"
                fill={treeColors.sapwood}
                opacity="0.8"
                className={ringAnimations ? 'animate-ring-grow' : ''}
                style={{ animationDelay: '0.3s' }} />

              
              {/* Heartwood */}
              <circle
                cx="500"
                cy="500"
                r="120"
                fill={treeColors.heartwood}
                opacity="0.6"
                className={ringAnimations ? 'animate-ring-grow' : ''}
                style={{ animationDelay: '0.6s' }} />

              
              {/* Tree rings */}
              {ringProperties.map((props) => drawRing(props))}
              
              {/* Growth nodes */}
              {ringProperties.map((props) => generateGrowthNodes(props))}
            </svg>
          </div>
        </div>
        
        {/* Timeline information and details */}
        <div className="timeline-details col-span-1">
          {/* Month sections */}
          <div className="space-y-6">
            {Object.entries(groupedSetsByMonth).map(([month, sets]) =>
            <div
              key={month}
              className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">

                <div className="px-4 py-3 bg-slate-100 dark:bg-slate-700">
                  <h3 className="font-medium text-slate-800 dark:text-slate-200">{month} Growth</h3>
                </div>
                
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                  {sets.map((set) =>
                <div
                  key={set.id}
                  className={`px-4 py-3 transition-colors cursor-pointer
                        ${set.id === selectedSetId ? 'bg-amber-50 dark:bg-amber-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                  onClick={() => onSelectSet?.(set.id)}
                  onMouseEnter={() => setHoverSetId(set.id)}
                  onMouseLeave={() => setHoverSetId(null)}>

                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-slate-800 dark:text-slate-200">
                            {set.subject}: {set.type}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {formatDate(set.dateCompleted)} • {getSeason(set.dateCompleted)}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <div
                        className={`px-2 py-0.5 rounded text-xs font-medium 
                              ${set.subject === 'Math' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        set.subject === 'Reading' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                        'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'}`}>

                            {getGrowthCondition(set.accuracy)}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {set.accuracy}% growth
                          </div>
                        </div>
                      </div>
                      
                      {/* Extended details when selected */}
                      {set.id === selectedSetId &&
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">Ring Pattern</div>
                              <div className="text-sm text-slate-700 dark:text-slate-300 mt-1">{getRingPattern(set)}</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">Growth Environment</div>
                              <div className="text-sm text-slate-700 dark:text-slate-300 mt-1">{set.difficulty} terrain</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">Growth Rate</div>
                              <div className="text-sm text-slate-700 dark:text-slate-300 mt-1">{set.pace} pace</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">Growth Size</div>
                              <div className="text-sm text-slate-700 dark:text-slate-300 mt-1">{set.questions.length} cells</div>
                            </div>
                          </div>
                          
                          {/* Growth challenges */}
                          <div className="mt-3">
                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Growth Challenges</div>
                            <div className="space-x-2">
                              {set.mistakeTypes.conceptual > 0 &&
                        <span className="inline-block px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs rounded">
                                  {set.mistakeTypes.conceptual} Conceptual
                                </span>
                        }
                              {set.mistakeTypes.careless > 0 &&
                        <span className="inline-block px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs rounded">
                                  {set.mistakeTypes.careless} Careless
                                </span>
                        }
                              {set.mistakeTypes.timeManagement > 0 &&
                        <span className="inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded">
                                  {set.mistakeTypes.timeManagement} Time
                                </span>
                        }
                              {set.mistakeTypes.conceptual === 0 && set.mistakeTypes.careless === 0 && set.mistakeTypes.timeManagement === 0 &&
                        <span className="inline-block px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded">
                                  No growth challenges
                                </span>
                        }
                            </div>
                          </div>
                          
                          {/* Growth phases */}
                          <div className="mt-3">
                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Growth Phases</div>
                            <div className="flex items-center space-x-1">
                              <div className="bg-slate-100 dark:bg-slate-700 h-4 flex-grow rounded-l-full overflow-hidden">
                                <div
                            className={`h-full 
                                    ${set.subject === 'Math' ? 'bg-blue-500' :
                            set.subject === 'Reading' ? 'bg-emerald-500' :
                            'bg-amber-500'}`}
                            style={{ width: `${set.sessionFatigue.earlyAccuracy}%` }}>
                          </div>
                              </div>
                              <div className="bg-slate-100 dark:bg-slate-700 h-4 flex-grow overflow-hidden">
                                <div
                            className={`h-full 
                                    ${set.subject === 'Math' ? 'bg-blue-400' :
                            set.subject === 'Reading' ? 'bg-emerald-400' :
                            'bg-amber-400'}`}
                            style={{ width: `${(set.sessionFatigue.earlyAccuracy + set.sessionFatigue.lateAccuracy) / 2}%` }}>
                          </div>
                              </div>
                              <div className="bg-slate-100 dark:bg-slate-700 h-4 flex-grow rounded-r-full overflow-hidden">
                                <div
                            className={`h-full 
                                    ${set.subject === 'Math' ? 'bg-blue-300' :
                            set.subject === 'Reading' ? 'bg-emerald-300' :
                            'bg-amber-300'}`}
                            style={{ width: `${set.sessionFatigue.lateAccuracy}%` }}>
                          </div>
                              </div>
                            </div>
                            <div className="flex justify-between mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                              <span>Early Growth</span>
                              <span>Mid Growth</span>
                              <span>Late Growth</span>
                            </div>
                          </div>
                          
                          {/* Dendrologist's notes */}
                          <div className="mt-3 text-xs text-slate-600 dark:text-slate-400 bg-amber-50 dark:bg-amber-900/10 p-2 rounded italic">
                            {set.accuracy >= 90 ?
                      "Exceptional growth pattern indicates optimal conditions. This ring shows remarkable cellular integrity and density." :
                      set.accuracy >= 75 ?
                      "Healthy growth pattern with good cellular structure. Minor variations indicate slight environmental stressors." :
                      set.accuracy >= 60 ?
                      "Moderate growth with visible structural variations. Environmental factors have impacted cellular development." :
                      "Irregular growth pattern indicates significant challenges. Cellular structure shows stress adaptation."}
                          </div>
                        </div>
                  }
                    </div>
                )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes ring-grow {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-ring-grow {
          animation: ring-grow 1s ease-out forwards;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.2);
          }
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        
        .ring-glow {
          filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.7));
        }
      `}</style>
    </div>);

};