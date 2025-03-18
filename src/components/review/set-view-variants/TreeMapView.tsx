'use client'

import { useState, useMemo } from 'react'
import { SetViewProps } from './types'
import { PracticeSet } from '@/lib/mockData'

/**
 * TreeMapView - Hierarchical tree map visualization of practice sets
 * 
 * This component creates a space-filling visualization that organizes practice sets
 * hierarchically by subject, type, and difficulty. Each rectangle's size represents 
 * the relative number of questions, while color represents performance metrics.
 */
export function TreeMapView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  // State for selected filters
  const [colorMetric, setColorMetric] = useState<'accuracy' | 'fatigue' | 'mistakes'>('accuracy')
  const [hoverInfo, setHoverInfo] = useState<{
    label: string
    value: number
    accuracy: number
    questions: number
    x: number
    y: number
  } | null>(null)
  
  // Group practice sets into a hierarchical structure
  const treeData = useMemo(() => {
    if (practiceSets.length === 0) return null
    
    // Step 1: Group by subject
    const subjects = Array.from(new Set(practiceSets.map(set => set.subject)))
    
    // Step 2: For each subject, group by type
    const hierarchicalData = subjects.map(subject => {
      const subjectSets = practiceSets.filter(set => set.subject === subject)
      const types = Array.from(new Set(subjectSets.map(set => set.type)))
      
      // Step 3: For each type, group by difficulty
      const children = types.map(type => {
        const typeSets = subjectSets.filter(set => set.type === type)
        const difficulties = ['Easy', 'Medium', 'Hard']
        
        // Step 4: Group sets by difficulty
        const difficultyGroups = difficulties.map(difficulty => {
          const difficultySets = typeSets.filter(set => set.difficulty === difficulty)
          
          // Calculate metrics for this difficulty group
          const totalQuestions = difficultySets.reduce((sum, set) => sum + set.questions.length, 0)
          const avgAccuracy = difficultySets.length > 0
            ? difficultySets.reduce((sum, set) => sum + set.accuracy, 0) / difficultySets.length
            : 0
          const conceptualMistakes = difficultySets.reduce((sum, set) => sum + set.mistakeTypes.conceptual, 0)
          const carelessMistakes = difficultySets.reduce((sum, set) => sum + set.mistakeTypes.careless, 0)
          const timeManagementMistakes = difficultySets.reduce((sum, set) => sum + set.mistakeTypes.timeManagement, 0)
          const totalMistakes = conceptualMistakes + carelessMistakes + timeManagementMistakes
          
          // Calculate fatigue impact (average drop in accuracy)
          const fatigueImpact = difficultySets.length > 0
            ? difficultySets.reduce((sum, set) => sum + (set.sessionFatigue.earlyAccuracy - set.sessionFatigue.lateAccuracy), 0) / difficultySets.length
            : 0
          
          return {
            name: difficulty as 'Easy' | 'Medium' | 'Hard',
            size: totalQuestions || 0,
            sets: difficultySets,
            metrics: {
              accuracy: avgAccuracy,
              fatigueImpact,
              totalMistakes,
              conceptualMistakes,
              carelessMistakes,
              timeManagementMistakes,
              questions: totalQuestions
            }
          }
        }).filter(group => group.size > 0) // Remove empty difficulty groups
        
        return {
          name: type,
          children: difficultyGroups,
          size: difficultyGroups.reduce((sum, group) => sum + group.size, 0),
          metrics: {
            accuracy: difficultyGroups.length > 0
              ? difficultyGroups.reduce((sum, group) => sum + (group.metrics.accuracy * group.size), 0) / 
                difficultyGroups.reduce((sum, group) => sum + group.size, 0)
              : 0,
            fatigueImpact: difficultyGroups.length > 0
              ? difficultyGroups.reduce((sum, group) => sum + group.metrics.fatigueImpact, 0) / difficultyGroups.length
              : 0,
            totalMistakes: difficultyGroups.reduce((sum, group) => sum + group.metrics.totalMistakes, 0),
            questions: difficultyGroups.reduce((sum, group) => sum + group.metrics.questions, 0)
          }
        }
      }).filter(typeGroup => typeGroup.children.length > 0) // Remove types with no sets
      
      return {
        name: subject,
        children: children,
        size: children.reduce((sum, child) => sum + child.size, 0),
        metrics: {
          accuracy: children.length > 0
            ? children.reduce((sum, child) => sum + (child.metrics.accuracy * child.size), 0) / 
              children.reduce((sum, child) => sum + child.size, 0)
            : 0,
          fatigueImpact: children.length > 0
            ? children.reduce((sum, child) => sum + child.metrics.fatigueImpact, 0) / children.length
            : 0,
          totalMistakes: children.reduce((sum, child) => sum + child.metrics.totalMistakes, 0),
          questions: children.reduce((sum, child) => sum + child.metrics.questions, 0)
        }
      }
    })
    
    return {
      name: 'All Practice Sets',
      children: hierarchicalData,
      size: hierarchicalData.reduce((sum, subject) => sum + subject.size, 0),
      metrics: {
        accuracy: hierarchicalData.length > 0
          ? hierarchicalData.reduce((sum, subject) => sum + (subject.metrics.accuracy * subject.size), 0) / 
            hierarchicalData.reduce((sum, subject) => sum + subject.size, 0)
          : 0,
        fatigueImpact: hierarchicalData.length > 0
          ? hierarchicalData.reduce((sum, subject) => sum + subject.metrics.fatigueImpact, 0) / hierarchicalData.length
          : 0,
        totalMistakes: hierarchicalData.reduce((sum, subject) => sum + subject.metrics.totalMistakes, 0),
        questions: hierarchicalData.reduce((sum, subject) => sum + subject.metrics.questions, 0)
      }
    }
  }, [practiceSets])
  
  // Function to compute treemap layout
  const computeTreemapLayout = (node: any, x0: number, y0: number, x1: number, y1: number) => {
    // Base case: leaf node
    if (!node.children || node.children.length === 0) {
      node.x0 = x0
      node.y0 = y0
      node.x1 = x1
      node.y1 = y1
      return
    }
    
    // Sort children by size (descending)
    const sortedChildren = [...node.children].sort((a, b) => b.size - a.size)
    
    // Calculate total size of all children
    const totalSize = sortedChildren.reduce((sum, child) => sum + child.size, 0)
    
    // Choose layout direction based on the aspect ratio
    const layoutHorizontal = (x1 - x0) > (y1 - y0)
    
    let currentPosition = layoutHorizontal ? x0 : y0
    const availableSpace = layoutHorizontal ? (x1 - x0) : (y1 - y0)
    
    // Position each child
    sortedChildren.forEach(child => {
      const childSize = child.size
      const proportion = childSize / totalSize
      const childSpace = availableSpace * proportion
      
      if (layoutHorizontal) {
        // Horizontal layout
        computeTreemapLayout(child, currentPosition, y0, currentPosition + childSpace, y1)
        currentPosition += childSpace
      } else {
        // Vertical layout
        computeTreemapLayout(child, x0, currentPosition, x1, currentPosition + childSpace)
        currentPosition += childSpace
      }
    })
  }
  
  // Compute the treemap layout
  const treemap = useMemo(() => {
    if (!treeData) return null
    
    // Copy the tree data to avoid modifying the original
    const rootNode = JSON.parse(JSON.stringify(treeData))
    
    // Compute layout starting with the full SVG area
    computeTreemapLayout(rootNode, 0, 0, 1000, 600)
    
    return rootNode
  }, [treeData])
  
  // Get color based on metric
  const getColor = (value: number, metric: 'accuracy' | 'fatigue' | 'mistakes') => {
    if (metric === 'accuracy') {
      // Green gradient for accuracy (higher is better)
      if (value >= 90) return 'bg-green-500 dark:bg-green-600'
      if (value >= 80) return 'bg-green-400 dark:bg-green-500'
      if (value >= 70) return 'bg-green-300 dark:bg-green-400'
      if (value >= 60) return 'bg-yellow-400 dark:bg-yellow-500'
      if (value >= 50) return 'bg-yellow-500 dark:bg-yellow-600'
      return 'bg-red-400 dark:bg-red-500'
    }
    
    if (metric === 'fatigue') {
      // Blue gradient for fatigue resistance (lower impact is better)
      if (value <= 5) return 'bg-blue-500 dark:bg-blue-600'
      if (value <= 10) return 'bg-blue-400 dark:bg-blue-500'
      if (value <= 15) return 'bg-blue-300 dark:bg-blue-400'
      if (value <= 20) return 'bg-blue-200 dark:bg-blue-300'
      if (value <= 25) return 'bg-purple-300 dark:bg-purple-400'
      return 'bg-purple-400 dark:bg-purple-500'
    }
    
    // Purple gradient for mistakes (lower is better, value is mistakes per 10 questions)
    if (value <= 0.5) return 'bg-indigo-500 dark:bg-indigo-600'
    if (value <= 1.0) return 'bg-indigo-400 dark:bg-indigo-500'
    if (value <= 1.5) return 'bg-indigo-300 dark:bg-indigo-400'
    if (value <= 2.0) return 'bg-purple-300 dark:bg-purple-400'
    if (value <= 3.0) return 'bg-purple-400 dark:bg-purple-500'
    return 'bg-purple-500 dark:bg-purple-600'
  }
  
  // Function to render a treemap rectangle
  const renderTreemapNode = (node: any, level: number) => {
    // Skip rendering if the node is too small
    if ((node.x1 - node.x0) < 0.01 || (node.y1 - node.y0) < 0.01) {
      return null
    }
    
    // Calculate color based on the selected metric
    let colorValue: number
    switch (colorMetric) {
      case 'accuracy':
        colorValue = node.metrics?.accuracy || 0
        break
      case 'fatigue':
        colorValue = node.metrics?.fatigueImpact || 0
        break
      case 'mistakes':
        // Calculate mistakes per 10 questions
        colorValue = node.metrics?.questions > 0
          ? (node.metrics?.totalMistakes / node.metrics?.questions) * 10
          : 0
        break
    }
    
    // Determine if this node contains the selected set
    const containsSelectedSet = node.sets?.some((set: PracticeSet) => set.id === selectedSetId) ||
                             node.children?.some((child: any) => 
                               child.sets?.some((set: PracticeSet) => set.id === selectedSetId) ||
                               child.children?.some((grandchild: any) => 
                                 grandchild.sets?.some((set: PracticeSet) => set.id === selectedSetId)
                               )
                             )
    
    // Determine if this is a leaf node (directly contains practice sets)
    const isLeaf = !!node.sets
    
    // Handle click on node
    const handleClick = () => {
      if (isLeaf && node.sets.length > 0) {
        onSelectSet(node.sets[0].id)
      }
    }
    
    // Handle hover on node
    const handleMouseEnter = (e: React.MouseEvent) => {
      setHoverInfo({
        label: `${node.name}${level === 3 ? ' (Difficulty)' : level === 2 ? ' (Type)' : level === 1 ? ' (Subject)' : ''}`,
        value: colorMetric === 'accuracy' ? node.metrics.accuracy : 
               colorMetric === 'fatigue' ? node.metrics.fatigueImpact : 
               (node.metrics.totalMistakes / node.metrics.questions) * 10,
        accuracy: node.metrics.accuracy,
        questions: node.metrics.questions,
        x: e.clientX,
        y: e.clientY
      })
    }
    
    const handleMouseLeave = () => {
      setHoverInfo(null)
    }
    
    return (
      <g key={`node-${node.name}-${level}`}>
        {/* Rectangle for this node */}
        <rect
          x={node.x0}
          y={node.y0}
          width={node.x1 - node.x0}
          height={node.y1 - node.y0}
          className={`
            ${getColor(colorValue, colorMetric)} 
            stroke-white dark:stroke-slate-800 
            ${level === 0 ? 'stroke-2' : level === 1 ? 'stroke-[1.5px]' : 'stroke-1'}
            ${isLeaf ? 'cursor-pointer' : ''}
            ${containsSelectedSet ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}
            transition-colors duration-200
          `}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        
        {/* Label for the node if the node is big enough */}
        {(node.x1 - node.x0) > 60 && (node.y1 - node.y0) > 30 && (
          <text
            x={(node.x0 + node.x1) / 2}
            y={(node.y0 + node.y1) / 2}
            className="text-xs font-medium fill-white text-center pointer-events-none"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {node.name}
            {(node.x1 - node.x0) > 100 && (node.y1 - node.y0) > 50 && (
              <tspan x={(node.x0 + node.x1) / 2} dy="1.2em" className="text-[10px] fill-white opacity-80">
                {node.metrics.questions} questions, {node.metrics.accuracy.toFixed(1)}%
              </tspan>
            )}
          </text>
        )}
        
        {/* Render children nodes */}
        {node.children?.map((child: any) => renderTreemapNode(child, level + 1))}
      </g>
    )
  }
  
  // Get the label for the current color metric
  const getMetricLabel = () => {
    switch (colorMetric) {
      case 'accuracy': return 'Accuracy (%)'
      case 'fatigue': return 'Fatigue Impact (drop in % accuracy)'
      case 'mistakes': return 'Mistakes per 10 Questions'
    }
  }
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm h-full">
      <h3 className="text-xl font-bold mb-4 text-center">Hierarchical Tree Map</h3>
      
      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        {/* Color metric selector */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Color By</label>
          <select 
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={colorMetric}
            onChange={(e) => setColorMetric(e.target.value as 'accuracy' | 'fatigue' | 'mistakes')}
          >
            <option value="accuracy">Accuracy</option>
            <option value="fatigue">Fatigue Impact</option>
            <option value="mistakes">Mistake Rate</option>
          </select>
        </div>
      </div>
      
      {/* Tree Map */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm overflow-hidden">
        {practiceSets.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-slate-500 dark:text-slate-400">No practice sets available.</p>
          </div>
        ) : treemap ? (
          <div className="relative">
            <svg 
              viewBox="0 0 1000 600" 
              className="w-full border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
              style={{ height: 'auto', maxHeight: '500px' }}
            >
              {renderTreemapNode(treemap, 0)}
            </svg>
            
            {/* Hover tooltip */}
            {hoverInfo && (
              <div 
                className="absolute bg-white dark:bg-slate-800 shadow-lg rounded-md p-2 text-sm"
                style={{
                  left: `${hoverInfo.x}px`,
                  top: `${hoverInfo.y - 100}px`,
                  transform: 'translate(-50%, -100%)',
                  zIndex: 10,
                  pointerEvents: 'none'
                }}
              >
                <div className="font-medium">{hoverInfo.label}</div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-1">
                  <div className="text-slate-500 dark:text-slate-400">Questions:</div>
                  <div>{hoverInfo.questions}</div>
                  <div className="text-slate-500 dark:text-slate-400">Accuracy:</div>
                  <div className={`${hoverInfo.accuracy >= 80 ? 'text-green-600 dark:text-green-400' : 
                    hoverInfo.accuracy >= 60 ? 'text-yellow-600 dark:text-yellow-400' : 
                    'text-red-600 dark:text-red-400'}`}>
                    {hoverInfo.accuracy.toFixed(1)}%
                  </div>
                  <div className="text-slate-500 dark:text-slate-400">{getMetricLabel()}:</div>
                  <div>
                    {colorMetric === 'accuracy' ? `${hoverInfo.value.toFixed(1)}%` : 
                     colorMetric === 'fatigue' ? `${hoverInfo.value.toFixed(1)}%` : 
                     hoverInfo.value.toFixed(2)}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center py-12">
            <p className="text-slate-500 dark:text-slate-400">Error calculating tree map.</p>
          </div>
        )}
      </div>
      
      {/* Legend */}
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">{getMetricLabel()}</h4>
        <div className="flex items-center overflow-x-auto pb-2">
          {colorMetric === 'accuracy' ? (
            <>
              <div className="flex flex-col items-center mr-3">
                <div className="w-6 h-6 bg-red-400 dark:bg-red-500"></div>
                <span className="text-xs mt-1">&lt;50%</span>
              </div>
              <div className="flex flex-col items-center mr-3">
                <div className="w-6 h-6 bg-yellow-500 dark:bg-yellow-600"></div>
                <span className="text-xs mt-1">50-60%</span>
              </div>
              <div className="flex flex-col items-center mr-3">
                <div className="w-6 h-6 bg-yellow-400 dark:bg-yellow-500"></div>
                <span className="text-xs mt-1">60-70%</span>
              </div>
              <div className="flex flex-col items-center mr-3">
                <div className="w-6 h-6 bg-green-300 dark:bg-green-400"></div>
                <span className="text-xs mt-1">70-80%</span>
              </div>
              <div className="flex flex-col items-center mr-3">
                <div className="w-6 h-6 bg-green-400 dark:bg-green-500"></div>
                <span className="text-xs mt-1">80-90%</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-green-500 dark:bg-green-600"></div>
                <span className="text-xs mt-1">90%+</span>
              </div>
            </>
          ) : colorMetric === 'fatigue' ? (
            <>
              <div className="flex flex-col items-center mr-3">
                <div className="w-6 h-6 bg-blue-500 dark:bg-blue-600"></div>
                <span className="text-xs mt-1">0-5%</span>
              </div>
              <div className="flex flex-col items-center mr-3">
                <div className="w-6 h-6 bg-blue-400 dark:bg-blue-500"></div>
                <span className="text-xs mt-1">5-10%</span>
              </div>
              <div className="flex flex-col items-center mr-3">
                <div className="w-6 h-6 bg-blue-300 dark:bg-blue-400"></div>
                <span className="text-xs mt-1">10-15%</span>
              </div>
              <div className="flex flex-col items-center mr-3">
                <div className="w-6 h-6 bg-blue-200 dark:bg-blue-300"></div>
                <span className="text-xs mt-1">15-20%</span>
              </div>
              <div className="flex flex-col items-center mr-3">
                <div className="w-6 h-6 bg-purple-300 dark:bg-purple-400"></div>
                <span className="text-xs mt-1">20-25%</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-purple-400 dark:bg-purple-500"></div>
                <span className="text-xs mt-1">25%+</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center mr-3">
                <div className="w-6 h-6 bg-indigo-500 dark:bg-indigo-600"></div>
                <span className="text-xs mt-1">0-0.5</span>
              </div>
              <div className="flex flex-col items-center mr-3">
                <div className="w-6 h-6 bg-indigo-400 dark:bg-indigo-500"></div>
                <span className="text-xs mt-1">0.5-1.0</span>
              </div>
              <div className="flex flex-col items-center mr-3">
                <div className="w-6 h-6 bg-indigo-300 dark:bg-indigo-400"></div>
                <span className="text-xs mt-1">1.0-1.5</span>
              </div>
              <div className="flex flex-col items-center mr-3">
                <div className="w-6 h-6 bg-purple-300 dark:bg-purple-400"></div>
                <span className="text-xs mt-1">1.5-2.0</span>
              </div>
              <div className="flex flex-col items-center mr-3">
                <div className="w-6 h-6 bg-purple-400 dark:bg-purple-500"></div>
                <span className="text-xs mt-1">2.0-3.0</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-purple-500 dark:bg-purple-600"></div>
                <span className="text-xs mt-1">3.0+</span>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Selected set details */}
      {selectedSetId && (
        <div className="mt-4 bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
          <h4 className="font-medium mb-3">Selected Practice Set</h4>
          {practiceSets.filter(set => set.id === selectedSetId).map(set => (
            <div key={set.id} className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{set.subject} - {set.type} ({set.difficulty})</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {new Date(set.dateCompleted).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-mono font-medium text-lg ${
                    set.accuracy >= 80 ? 'text-green-600 dark:text-green-400' :
                    set.accuracy >= 60 ? 'text-amber-600 dark:text-amber-400' :
                    'text-red-600 dark:text-red-400'
                  }`}>
                    {set.accuracy}%
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {set.questions.length} questions · {set.pace} pace
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-100 dark:border-slate-700">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Conceptual Errors</div>
                  <div className="font-medium">{set.mistakeTypes.conceptual}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Careless Errors</div>
                  <div className="font-medium">{set.mistakeTypes.careless}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Time Management</div>
                  <div className="font-medium">{set.mistakeTypes.timeManagement}</div>
                </div>
              </div>
              
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span>Fatigue Impact:</span>
                  <span className="font-mono">
                    {set.sessionFatigue.earlyAccuracy}% → {set.sessionFatigue.lateAccuracy}%
                  </span>
                </div>
                <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all" 
                    style={{ width: `${(set.sessionFatigue.lateAccuracy / set.sessionFatigue.earlyAccuracy) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Instructions */}
      <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 text-center">
        <p>Hover over rectangles to see details. Click on the smallest rectangles to select a practice set.</p>
      </div>
    </div>
  )
}
