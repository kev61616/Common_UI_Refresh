'use client'

import { TimelineViewProps } from './types';

/**
 * Flow Diagram (Timeline View Variant 17)
 * Visualize connections between practice sets as a flow diagram
 */
export function FlowDiagram({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  // Sort sets by date
  const sortedSets = [...practiceSets].sort((a, b) => 
    new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
  );
  
  // Group by subject and organize data for flow visualization
  const bySubject = sortedSets.reduce<{
    [subject: string]: {
      sets: (typeof practiceSets)[0][];
      totalAccuracy: number;
      avgAccuracy: number;
      totalSets: number;
    };
  }>((acc, set) => {
    if (!acc[set.subject]) {
      acc[set.subject] = {
        sets: [],
        totalAccuracy: 0,
        avgAccuracy: 0,
        totalSets: 0
      };
    }
    
    acc[set.subject].sets.push(set);
    acc[set.subject].totalAccuracy += set.accuracy;
    acc[set.subject].totalSets += 1;
    acc[set.subject].avgAccuracy = Math.round(acc[set.subject].totalAccuracy / acc[set.subject].totalSets);
    
    return acc;
  }, {});
  
  // Get types to create flow connections
  const byType = sortedSets.reduce<{
    [type: string]: {
      sets: (typeof practiceSets)[0][];
      subjects: Set<string>;
    };
  }>((acc, set) => {
    if (!acc[set.type]) {
      acc[set.type] = {
        sets: [],
        subjects: new Set()
      };
    }
    
    acc[set.type].sets.push(set);
    acc[set.type].subjects.add(set.subject);
    
    return acc;
  }, {});
  
  // Define subject colors
  const subjectColors = {
    Reading: {
      bg: 'bg-sky-500',
      gradientFrom: 'from-sky-400',
      gradientTo: 'to-blue-500',
      text: 'text-white',
      border: 'border-sky-600'
    },
    Math: {
      bg: 'bg-indigo-500',
      gradientFrom: 'from-indigo-400',
      gradientTo: 'to-violet-500',
      text: 'text-white',
      border: 'border-indigo-600'
    },
    Writing: {
      bg: 'bg-violet-500',
      gradientFrom: 'from-violet-400',
      gradientTo: 'to-purple-500',
      text: 'text-white',
      border: 'border-violet-600'
    }
  };
  
  // Detect cross-subject connections
  const getConnectionsBySubject = () => {
    const connections: {
      fromSubject: string;
      toSubject: string;
      weight: number;
      types: string[];
    }[] = [];
    
    // Find connections through test types
    Object.entries(byType).forEach(([type, data]) => {
      if (data.subjects.size > 1) {
        const subjectArray = Array.from(data.subjects);
        
        // Create connections between all subjects that share this type
        for (let i = 0; i < subjectArray.length; i++) {
          for (let j = i + 1; j < subjectArray.length; j++) {
            // Check if this connection already exists
            const existingConn = connections.find(c => 
              (c.fromSubject === subjectArray[i] && c.toSubject === subjectArray[j]) ||
              (c.fromSubject === subjectArray[j] && c.toSubject === subjectArray[i])
            );
            
            if (existingConn) {
              existingConn.weight += 1;
              if (!existingConn.types.includes(type)) {
                existingConn.types.push(type);
              }
            } else {
              connections.push({
                fromSubject: subjectArray[i],
                toSubject: subjectArray[j],
                weight: 1,
                types: [type]
              });
            }
          }
        }
      }
    });
    
    return connections;
  };
  
  const connections = getConnectionsBySubject();
  
  // Position calculation helper for subject nodes
  const getSubjectPosition = (subject: string, index: number, total: number) => {
    const angleStep = (Math.PI * 2) / total;
    const radius = 120; // circle radius
    const angle = angleStep * index;
    
    return {
      x: Math.cos(angle) * radius + 500, // center x = 500
      y: Math.sin(angle) * radius + 200, // center y = 200
    };
  };
  
  // Position calculation helper for connection paths
  const getConnectionPath = (from: {x: number, y: number}, to: {x: number, y: number}) => {
    // Calculate control points for the curve
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Adjust the curve's bulge based on distance
    const bulge = dist / 3;
    
    // Calculate perpendicular offset for the control point
    const perpX = -dy / dist * bulge;
    const perpY = dx / dist * bulge;
    
    // Control point
    const cpX = midX + perpX;
    const cpY = midY + perpY;
    
    // Create SVG path
    return `M${from.x},${from.y} Q${cpX},${cpY} ${to.x},${to.y}`;
  };

  // Calculate positions for subject nodes
  const subjects = Object.keys(bySubject);
  const subjectPositions = subjects.reduce<{[subject: string]: {x: number, y: number}}>((acc, subject, index) => {
    acc[subject] = getSubjectPosition(subject, index, subjects.length);
    return acc;
  }, {});
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">17. Flow Diagram</h3>
      
      <div>
        {/* Flow diagram visualization */}
        <div className="relative w-full overflow-x-auto">
          <div className="min-h-[500px] min-w-[1000px] relative">
            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full z-0">
              {/* Draw connections between subjects */}
              {connections.map((conn, i) => {
                const fromPos = subjectPositions[conn.fromSubject];
                const toPos = subjectPositions[conn.toSubject];
                const path = getConnectionPath(fromPos, toPos);
                const fromColor = subjectColors[conn.fromSubject as keyof typeof subjectColors] || subjectColors.Reading;
                const toColor = subjectColors[conn.toSubject as keyof typeof subjectColors] || subjectColors.Reading;
                
                return (
                  <g key={`conn-${i}`}>
                    {/* Connection path */}
                    <path 
                      d={path} 
                      fill="none"
                      stroke="url(#gradientFlow)"
                      strokeWidth={2 + conn.weight * 2}
                      strokeOpacity="0.6"
                      className="transition-all duration-300"
                    />
                    
                    {/* Gradient definition for the path */}
                    <defs>
                      <linearGradient id="gradientFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop 
                          offset="0%" 
                          className={fromColor.gradientFrom} 
                          stopOpacity="1" 
                        />
                        <stop 
                          offset="100%" 
                          className={toColor.gradientTo} 
                          stopOpacity="1" 
                        />
                      </linearGradient>
                    </defs>
                    
                    {/* Connection label (shows on hover) */}
                    <text 
                      x={(fromPos.x + toPos.x) / 2} 
                      y={(fromPos.y + toPos.y) / 2 - 10}
                      textAnchor="middle"
                      className="text-xs fill-slate-600 dark:fill-slate-300 pointer-events-none"
                    >
                      {conn.types.length} shared test {conn.types.length === 1 ? 'type' : 'types'}
                    </text>
                  </g>
                );
              })}
            </svg>
            
            {/* Subject nodes */}
            {subjects.map((subject, i) => {
              const position = subjectPositions[subject];
              const subjectData = bySubject[subject];
              const style = subjectColors[subject as keyof typeof subjectColors] || subjectColors.Reading;
              
              return (
                <div 
                  key={subject}
                  className="absolute z-10"
                  style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {/* Subject node */}
                  <div 
                    className={`w-28 h-28 rounded-full ${style.bg} ${style.text} ${style.border}
                              border-2 shadow-lg flex flex-col items-center justify-center
                              cursor-pointer transition-transform duration-300 hover:scale-110`}
                  >
                    <div className="font-bold">{subject}</div>
                    <div className="text-sm opacity-90">{subjectData.totalSets} sets</div>
                    <div className="text-xs mt-1">{subjectData.avgAccuracy}% avg</div>
                  </div>
                  
                  {/* Subject practice sets (displayed in a circle around the node) */}
                  {subjectData.sets.map((set, setIndex) => {
                    const setAngle = (Math.PI * 2 / subjectData.sets.length) * setIndex;
                    const radius = 100; // distance from the subject node
                    const setX = Math.cos(setAngle) * radius;
                    const setY = Math.sin(setAngle) * radius;
                    
                    return (
                      <div 
                        key={set.id}
                        onClick={() => onSelectSet(set.id)}
                        className={`absolute w-10 h-10 rounded-full ${style.bg} ${style.text} 
                                  flex items-center justify-center text-xs font-bold
                                  transform -translate-x-1/2 -translate-y-1/2 cursor-pointer
                                  border-2 ${style.border} shadow transition-all duration-300
                                  ${selectedSetId === set.id ? 'scale-125 ring-2 ring-white dark:ring-slate-800' : 'hover:scale-110'}`}
                        style={{
                          left: setX,
                          top: setY,
                          opacity: 0.9
                        }}
                      >
                        {set.accuracy}%
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Selected set details */}
        {selectedSetId && (
          <div className="mt-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            {(() => {
              const set = practiceSets.find(s => s.id === selectedSetId);
              if (!set) return null;
              
              const style = subjectColors[set.subject as keyof typeof subjectColors] || subjectColors.Reading;
              
              return (
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
                        {set.subject}
                      </div>
                      <h4 className="text-lg font-bold mt-1">{set.type}</h4>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(set.dateCompleted).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Accuracy</div>
                      <div className="text-xl font-bold">{set.accuracy}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Time Used</div>
                      <div className="text-xl font-medium">{Math.floor(set.timeUsed / 60)}:{(set.timeUsed % 60).toString().padStart(2, '0')}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Pace</div>
                      <div className="text-xl font-medium">{set.pace}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Difficulty</div>
                      <div className="text-xl font-medium">{set.difficulty}</div>
                    </div>
                  </div>
                  
                  {/* Shared types with other subjects */}
                  {(() => {
                    // Find other subjects that share this test type
                    const sharedWith = [];
                    for (const [otherSubject, data] of Object.entries(bySubject)) {
                      if (otherSubject !== set.subject) {
                        const hasSharedType = data.sets.some(s => s.type === set.type);
                        if (hasSharedType) {
                          sharedWith.push(otherSubject);
                        }
                      }
                    }
                    
                    if (sharedWith.length > 0) {
                      return (
                        <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                          <div className="text-sm font-medium mb-1">Connections</div>
                          <div className="text-sm">
                            This test type ({set.type}) is also used in: {sharedWith.join(', ')}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
