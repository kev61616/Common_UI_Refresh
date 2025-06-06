'use client';

import { useState, useMemo } from 'react';
import { SetViewProps } from './types';

/**
 * RadarChartSetView - Radar/Spider chart visualization of practice set performance across multiple dimensions
 * 
 * This component creates a multi-axis radar chart to visualize performance metrics across different
 * dimensions like accuracy, pace, difficulty, fatigue resistance, etc. It allows users to compare
 * set performance across these dimensions and identify strengths and areas for improvement.
 */
export function RadarChartSetView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  // State for selected filters
  const [selectedSubject, setSelectedSubject] = useState<string | 'all'>('all');
  const [selectedView, setSelectedView] = useState<'single' | 'compare'>('single');
  const [comparedSetId, setComparedSetId] = useState<string | null>(null);

  // Get all available subjects
  const subjects = Array.from(new Set(practiceSets.map((set) => set.subject)));

  // Filter practice sets by selected subject
  const filteredSets = useMemo(() => {
    if (selectedSubject === 'all') return practiceSets;
    return practiceSets.filter((set) => set.subject === selectedSubject);
  }, [practiceSets, selectedSubject]);

  // If no selected set, use the first one
  const effectiveSelectedSetId = selectedSetId || (filteredSets.length > 0 ? filteredSets[0].id : null);

  // Get the selected set
  const selectedSet = useMemo(() => {
    return filteredSets.find((set) => set.id === effectiveSelectedSetId) || null;
  }, [filteredSets, effectiveSelectedSetId]);

  // Get the compared set if in compare mode
  const comparedSet = useMemo(() => {
    if (selectedView !== 'compare' || !comparedSetId) return null;
    return filteredSets.find((set) => set.id === comparedSetId) || null;
  }, [filteredSets, selectedView, comparedSetId]);

  // Define the dimensions we want to visualize
  const dimensions = [
  { id: 'accuracy', label: 'Accuracy', description: 'Overall accuracy percentage' },
  { id: 'pace', label: 'Pace', description: 'How quickly questions were answered' },
  { id: 'difficulty', label: 'Difficulty', description: 'Level of challenge presented' },
  { id: 'fatigueResistance', label: 'Fatigue Resistance', description: 'Maintenance of performance over time' },
  { id: 'conceptualStrength', label: 'Conceptual Strength', description: 'Conceptual understanding vs. careless errors' },
  { id: 'timeManagement', label: 'Time Management', description: 'Efficient use of available time' }];


  // Calculate normalized values (0-1) for each dimension
  const calculateDimensionValues = (set: typeof selectedSet) => {
    if (!set) return null;

    // Calculate pace score (normalized 0-1 where 1 is fast)
    const paceScore = set.pace === 'Fast' ? 1 :
    set.pace === 'Normal' ? 0.6 : 0.3;

    // Calculate difficulty score (normalized 0-1 where 1 is handling difficult material well)
    const difficultyAdjustedScore =
    set.difficulty === 'Hard' ? set.accuracy * 1.25 :
    set.difficulty === 'Medium' ? set.accuracy * 1.1 :
    set.accuracy * 0.9;
    const difficultyScore = Math.min(difficultyAdjustedScore / 100, 1);

    // Calculate fatigue resistance (normalized 0-1 where 1 is maintaining performance)
    const fatigueResistance =
    1 - Math.min(Math.max(0, (set.sessionFatigue.earlyAccuracy - set.sessionFatigue.lateAccuracy) / 50), 1);

    // Calculate conceptual strength vs careless errors (normalized 0-1)
    const totalErrors = set.mistakeTypes.conceptual + set.mistakeTypes.careless + set.mistakeTypes.timeManagement || 1;
    const conceptualStrength = 1 - Math.min(set.mistakeTypes.conceptual / totalErrors, 1);

    // Calculate time management score (normalized 0-1)
    const timeManagementScore = 1 - Math.min(set.mistakeTypes.timeManagement / totalErrors, 1);

    return {
      accuracy: set.accuracy / 100, // Normalize 0-100% to 0-1
      pace: paceScore,
      difficulty: difficultyScore,
      fatigueResistance,
      conceptualStrength,
      timeManagement: timeManagementScore
    };
  };

  // Get normalized values for the selected set
  const selectedSetValues = calculateDimensionValues(selectedSet);

  // Get normalized values for the compared set if applicable
  const comparedSetValues = calculateDimensionValues(comparedSet);

  // Calculate chart dimensions
  const chartSize = 400;
  const centerX = chartSize / 2;
  const centerY = chartSize / 2;
  const radius = chartSize * 0.4;
  const axisCount = dimensions.length;

  // Function to calculate point coordinates on the radar chart
  const calculatePoint = (index: number, value: number) => {
    const angle = Math.PI * 2 * index / axisCount;
    return {
      x: centerX + radius * value * Math.cos(angle - Math.PI / 2),
      y: centerY + radius * value * Math.sin(angle - Math.PI / 2)
    };
  };

  // Generate chart axes
  const axes = dimensions.map((dimension, i) => {
    const endPoint = calculatePoint(i, 1);
    return {
      dimension,
      line: {
        x1: centerX,
        y1: centerY,
        x2: endPoint.x,
        y2: endPoint.y
      }
    };
  });

  // Generate chart data points for the selected set
  const generateChartPoints = (values: Record<string, number> | null) => {
    if (!values) return { points: [], pathData: '' };

    const points = dimensions.map((dimension, i) => {
      const value = values[dimension.id as keyof typeof values] || 0;
      const point = calculatePoint(i, value);
      return {
        x: point.x,
        y: point.y,
        value
      };
    });

    // Create path string for the polygon
    const pathData = points.map((point, i) =>
    (i === 0 ? 'M' : 'L') + point.x + ',' + point.y
    ).join(' ') + 'Z'; // Close the path

    return { points, pathData };
  };

  // Generate chart data for selected set
  const selectedSetChartData = generateChartPoints(selectedSetValues);

  // Generate chart data for compared set
  const comparedSetChartData = generateChartPoints(comparedSetValues);

  // Generate grid circles
  const gridCircles = [0.2, 0.4, 0.6, 0.8, 1].map((value) => ({
    radius: radius * value,
    value: Math.round(value * 100)
  }));

  // Get a short text description of the practice set
  const getSetDescription = (set: typeof selectedSet) => {
    if (!set) return '';
    return `${set.subject} - ${set.type} (${set.difficulty}, ${set.questions.length} questions)`;
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm h-full" data-oid="hiq2x54">
      <h3 className="text-xl font-bold mb-4 text-center" data-oid="ikeyy9d">Radar Chart Performance View</h3>
      
      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center" data-oid="6a.6_7j">
        {/* Subject selector */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm" data-oid="fy-sm13">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1" data-oid="otlehe0">Subject</label>
          <select
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value as 'all' | string)} data-oid="mm6gb3m">

            <option value="all" data-oid="pbovn2y">All Subjects</option>
            {subjects.map((subject, i) =>
            <option key={i} value={subject} data-oid="e60we2c">{subject}</option>
            )}
          </select>
        </div>
        
        {/* View type selector */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm" data-oid="s3jo.0_">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1" data-oid="r.ydtyz">View</label>
          <select
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value as 'single' | 'compare')} data-oid="puja:ow">

            <option value="single" data-oid="nd12q:2">Single Set</option>
            <option value="compare" data-oid="3nd_:xn">Compare Sets</option>
          </select>
        </div>
        
        {/* Second set selector (only for compare mode) */}
        {selectedView === 'compare' &&
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm" data-oid="imoayji">
            <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1" data-oid="4.ag9v_">Compare With</label>
            <select
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={comparedSetId || ''}
            onChange={(e) => setComparedSetId(e.target.value || null)} data-oid="cjykd2n">

              <option value="" data-oid="qlv9_hg">Select a set...</option>
              {filteredSets.
            filter((set) => set.id !== effectiveSelectedSetId).
            map((set, i) =>
            <option key={i} value={set.id} data-oid="q7lapn5">
                    {set.subject} - {set.type} ({set.difficulty})
                  </option>
            )}
            </select>
          </div>
        }
      </div>
      
      {/* Main content area - chart and details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-oid="vg:9hmu">
        {/* Radar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm overflow-hidden" data-oid="6c2-x:5">
          <div className="flex justify-between items-center mb-4" data-oid="h2915n.">
            <h4 className="font-medium" data-oid="z87s9:c">
              {selectedView === 'compare' ? 'Performance Comparison' : 'Performance Profile'}
            </h4>
            {selectedSet &&
            <div className="text-sm" data-oid=":gt6hfq">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1" data-oid="q180gkj"></span>
                {getSetDescription(selectedSet)}
                {comparedSet &&
              <>
                    <br data-oid="3:gi9u5" />
                    <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mr-1" data-oid="2gklkxl"></span>
                    {getSetDescription(comparedSet)}
                  </>
              }
              </div>
            }
          </div>
          
          <svg
            width="100%"
            height="auto"
            viewBox={`0 0 ${chartSize} ${chartSize}`}
            className="font-sans max-h-[500px]"
            style={{ aspectRatio: '1/1' }} data-oid="wacdiid">

            {/* Grid circles */}
            {gridCircles.map((circle, i) =>
            <g key={`grid-${i}`} data-oid="k0kirn:">
                <circle
                cx={centerX}
                cy={centerY}
                r={circle.radius}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray="2,2" data-oid="j8jo8_q" />

                <text
                x={centerX}
                y={centerY - circle.radius}
                fontSize="10"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#94a3b8" data-oid="-n9nhhw">

                  {circle.value}%
                </text>
              </g>
            )}
            
            {/* Axes */}
            {axes.map((axis, i) =>
            <g key={`axis-${i}`} data-oid=":hg6-sn">
                <line
                x1={axis.line.x1}
                y1={axis.line.y1}
                x2={axis.line.x2}
                y2={axis.line.y2}
                stroke="#cbd5e1"
                strokeWidth="1" data-oid="1uti2yu" />

                <text
                x={axis.line.x2 + (axis.line.x2 - centerX) * 0.1}
                y={axis.line.y2 + (axis.line.y2 - centerY) * 0.1}
                fontSize="11"
                fontWeight="500"
                textAnchor={axis.line.x2 < centerX ? 'end' : axis.line.x2 === centerX ? 'middle' : 'start'}
                dominantBaseline={axis.line.y2 < centerY ? 'baseline' : axis.line.y2 === centerY ? 'middle' : 'hanging'}
                fill="#475569" data-oid="w5tbtd2">

                  {axis.dimension.label}
                </text>
              </g>
            )}
            
            {/* Compared set polygon (draw first so it's behind) */}
            {comparedSet && comparedSetValues &&
            <g data-oid="9-h277z">
                <path
                d={comparedSetChartData.pathData}
                fill="#10b981" // emerald-500
                fillOpacity="0.2"
                stroke="#059669" // emerald-600
                strokeWidth="2" data-oid="8g9aqu4" />

                
                {/* Data points */}
                {comparedSetChartData.points.map((point, i) =>
              <g key={`compared-point-${i}`} data-oid="go4aby8">
                    <circle
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill="#10b981" // emerald-500
                  stroke="white"
                  strokeWidth="1" data-oid="1v5g2cr" />

                    <title data-oid="sjg_xw:">
                      {dimensions[i].label}: {Math.round(point.value * 100)}%
                    </title>
                  </g>
              )}
              </g>
            }
            
            {/* Selected set polygon */}
            {selectedSet && selectedSetValues &&
            <g data-oid="su8_xf7">
                <path
                d={selectedSetChartData.pathData}
                fill="#3b82f6" // blue-500
                fillOpacity="0.2"
                stroke="#2563eb" // blue-600
                strokeWidth="2" data-oid="6q.ghtf" />

                
                {/* Data points */}
                {selectedSetChartData.points.map((point, i) =>
              <g key={`selected-point-${i}`} data-oid="unrjv3j">
                    <circle
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill="#3b82f6" // blue-500
                  stroke="white"
                  strokeWidth="1" data-oid="gidu-vg" />

                    <title data-oid="79m3jqu">
                      {dimensions[i].label}: {Math.round(point.value * 100)}%
                    </title>
                  </g>
              )}
              </g>
            }
            
            {/* Center point */}
            <circle cx={centerX} cy={centerY} r="2" fill="#94a3b8" data-oid="zxd12ro" />
          </svg>
        </div>
        
        {/* Details panel */}
        <div className="lg:col-span-1" data-oid="rahzrek">
          {/* Set selector for mobile */}
          <div className="mb-4 lg:hidden" data-oid="trs:iah">
            <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1" data-oid="f4w08vv">Select Practice Set</label>
            <select
              className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-3 py-2 border border-slate-200 dark:border-slate-600 w-full"
              value={effectiveSelectedSetId || ''}
              onChange={(e) => onSelectSet(e.target.value)} data-oid="pj7f:i5">

              {filteredSets.map((set) =>
              <option key={set.id} value={set.id} data-oid="kzf35ac">
                  {set.subject} - {set.type} ({set.difficulty})
                </option>
              )}
            </select>
          </div>
          
          {/* Dimension details */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm mb-4" data-oid="j-atljp">
            <h4 className="font-medium mb-3" data-oid="sgfgt6u">Performance Breakdown</h4>
            <div className="space-y-4" data-oid="28m7kde">
              {dimensions.map((dimension, i) => {
                const selectedValue = selectedSetValues ? selectedSetValues[dimension.id as keyof typeof selectedSetValues] || 0 : 0;
                const comparedValue = comparedSetValues ? comparedSetValues[dimension.id as keyof typeof comparedSetValues] || 0 : 0;

                return (
                  <div key={dimension.id} className="border-b border-slate-100 dark:border-slate-700 pb-3 last:border-b-0 last:pb-0" data-oid=":s6i7ye">
                    <div className="flex justify-between items-center mb-1" data-oid="p2frc.2">
                      <span className="font-medium" data-oid="hf1zoel">{dimension.label}</span>
                      <div className="flex gap-2 items-center" data-oid="f.4.jqr">
                        <span className="text-blue-500 font-mono" data-oid="v4ecg:g">
                          {Math.round(selectedValue * 100)}%
                        </span>
                        {selectedView === 'compare' &&
                        <span className="text-emerald-500 font-mono" data-oid="161nf0j">
                            {Math.round(comparedValue * 100)}%
                          </span>
                        }
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400" data-oid="re4j7gr">{dimension.description}</p>
                    
                    {/* Visual progress bar */}
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full mt-2 overflow-hidden" data-oid=":49yypv">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${selectedValue * 100}%` }} data-oid="osoko_m">
                      </div>
                    </div>
                    
                    {/* Compared progress bar if in compare mode */}
                    {selectedView === 'compare' &&
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full mt-1 overflow-hidden" data-oid="kochdsm">
                        <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${comparedValue * 100}%` }} data-oid="2u:8a2a">
                      </div>
                      </div>
                    }
                  </div>);

              })}
            </div>
          </div>
          
          {/* Practice set list */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm hidden lg:block" data-oid="iutfxaa">
            <h4 className="font-medium mb-3" data-oid="lg.9twy">Practice Sets</h4>
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2" data-oid="z.qg64z">
              {filteredSets.map((set) =>
              <div
                key={set.id}
                className={`
                    p-2 rounded-md cursor-pointer transition-colors
                    ${set.id === effectiveSelectedSetId ? 'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500' :
                set.id === comparedSetId ? 'bg-emerald-50 dark:bg-emerald-900/30 border-l-4 border-emerald-500' :
                'hover:bg-slate-50 dark:hover:bg-slate-700/50 border-l-4 border-transparent'}
                  `}
                onClick={() => onSelectSet(set.id)} data-oid="by-m922">

                  <div className="font-medium" data-oid="oeztgp2">{set.subject} - {set.type}</div>
                  <div className="text-xs flex justify-between" data-oid="82c.teo">
                    <span className="text-slate-500 dark:text-slate-400" data-oid="plg4zz.">{set.difficulty}</span>
                    <span className={`font-mono ${
                  set.accuracy >= 80 ? 'text-green-600 dark:text-green-400' :
                  set.accuracy >= 60 ? 'text-amber-600 dark:text-amber-400' :
                  'text-red-600 dark:text-red-400'}`
                  } data-oid=".axo45b">{set.accuracy}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 text-center" data-oid="85oiuij">
        <p data-oid="oyom.4i">Select different practice sets to view their performance profiles or compare two sets side by side.</p>
      </div>
    </div>);

}