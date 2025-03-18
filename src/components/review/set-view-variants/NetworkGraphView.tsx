'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { SetViewProps } from './types'
import { PracticeSet } from '@/lib/mockData'

/**
 * NetworkGraphView - Force-directed graph visualization of practice sets
 * 
 * This component creates an interactive network graph showing relationships between
 * subjects, types, and sets. It utilizes physics-based simulation to position
 * nodes and allows exploration of connections between different practice areas.
 */
export function NetworkGraphView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  // State for filters and view options
  const [graphMode, setGraphMode] = useState<'by-subject' | 'by-difficulty' | 'by-performance'>('by-subject')
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  
  // Ref for canvas/SVG drawing area
  const svgRef = useRef<SVGSVGElement>(null)
  
  // Data structures for the graph
  type Node = {
    id: string
    group: 'subject' | 'type' | 'set' | 'difficulty'
    label: string
    size: number
    metrics?: {
      accuracy: number
      questions: number
    }
    setId?: string
    x?: number
    y?: number
    vx?: number
    vy?: number
  }
  
  type Link = {
    source: string
    target: string
    value: number  // link strength
  }
  
  // Build graph data (nodes and links)
  const graphData = useMemo(() => {
    if (practiceSets.length === 0) return { nodes: [], links: [] }
    
    const nodes: Node[] = []
    const links: Link[] = []
    const nodeIds = new Set<string>()
    
    // Different graph structures based on mode
    if (graphMode === 'by-subject') {
      // Add subject nodes
      const subjects = Array.from(new Set(practiceSets.map(set => set.subject)))
      subjects.forEach(subject => {
        nodes.push({
          id: `subject-${subject}`,
          group: 'subject',
          label: subject,
          size: 16
        })
        nodeIds.add(`subject-${subject}`)
      })
      
      // Add type nodes and connect to subjects
      const types = new Map<string, string[]>()
      practiceSets.forEach(set => {
        if (!types.has(set.type)) {
          types.set(set.type, [])
        }
        if (!types.get(set.type)?.includes(set.subject)) {
          types.get(set.type)?.push(set.subject)
        }
      })
      
      types.forEach((subjects, type) => {
        nodes.push({
          id: `type-${type}`,
          group: 'type',
          label: type,
          size: 12
        })
        nodeIds.add(`type-${type}`)
        
        // Link type to each subject it belongs to
        subjects.forEach(subject => {
          links.push({
            source: `subject-${subject}`,
            target: `type-${type}`,
            value: 2
          })
        })
      })
      
      // Add set nodes and connect to types
      practiceSets.forEach(set => {
        nodes.push({
          id: `set-${set.id}`,
          group: 'set',
          label: `${set.difficulty} Set`,
          size: 8,
          metrics: {
            accuracy: set.accuracy,
            questions: set.questions.length
          },
          setId: set.id
        })
        nodeIds.add(`set-${set.id}`)
        
        // Link set to its type
        links.push({
          source: `type-${set.type}`,
          target: `set-${set.id}`,
          value: 1
        })
      })
    } else if (graphMode === 'by-difficulty') {
      // Add difficulty nodes
      const difficulties = ['Easy', 'Medium', 'Hard']
      difficulties.forEach(difficulty => {
        nodes.push({
          id: `difficulty-${difficulty}`,
          group: 'difficulty',
          label: difficulty,
          size: 16
        })
        nodeIds.add(`difficulty-${difficulty}`)
      })
      
      // Add subject nodes and connect to difficulties
      const subjects = Array.from(new Set(practiceSets.map(set => set.subject)))
      subjects.forEach(subject => {
        nodes.push({
          id: `subject-${subject}`,
          group: 'subject',
          label: subject,
          size: 12
        })
        nodeIds.add(`subject-${subject}`)
        
        // Get difficulties used by this subject
        const subjectDifficulties = new Set(
          practiceSets
            .filter(set => set.subject === subject)
            .map(set => set.difficulty)
        )
        
        // Link subject to each difficulty it uses
        subjectDifficulties.forEach(difficulty => {
          links.push({
            source: `difficulty-${difficulty}`,
            target: `subject-${subject}`,
            value: 2
          })
        })
      })
      
      // Add set nodes and connect to subjects
      practiceSets.forEach(set => {
        nodes.push({
          id: `set-${set.id}`,
          group: 'set',
          label: set.type,
          size: 8,
          metrics: {
            accuracy: set.accuracy,
            questions: set.questions.length
          },
          setId: set.id
        })
        nodeIds.add(`set-${set.id}`)
        
        // Link set to its subject
        links.push({
          source: `subject-${set.subject}`,
          target: `set-${set.id}`,
          value: 1
        })
      })
    } else if (graphMode === 'by-performance') {
      // Create performance clusters
      const performanceLevels = [
        { id: 'excellent', label: 'Excellent (90%+)', min: 90, max: 100 },
        { id: 'good', label: 'Good (80-90%)', min: 80, max: 90 },
        { id: 'average', label: 'Average (70-80%)', min: 70, max: 80 },
        { id: 'fair', label: 'Fair (60-70%)', min: 60, max: 70 },
        { id: 'needs-work', label: 'Needs Work (<60%)', min: 0, max: 60 }
      ]
      
      // Add performance nodes
      performanceLevels.forEach(level => {
        nodes.push({
          id: `performance-${level.id}`,
          group: 'subject', // Reuse styling
          label: level.label,
          size: 16
        })
        nodeIds.add(`performance-${level.id}`)
      })
      
      // Add type nodes and connect to performance levels
      const typePerformance = new Map<string, Map<string, number>>()
      
      // Calculate average accuracy per type
      practiceSets.forEach(set => {
        if (!typePerformance.has(set.type)) {
          typePerformance.set(set.type, new Map<string, number>())
          typePerformance.get(set.type)?.set('total', 0)
          typePerformance.get(set.type)?.set('count', 0)
        }
        
        const current = typePerformance.get(set.type)
        if (current) {
          current.set('total', (current.get('total') || 0) + set.accuracy)
          current.set('count', (current.get('count') || 0) + 1)
        }
      })
      
      // Create type nodes and link to performance levels
      typePerformance.forEach((performance, type) => {
        const avgAccuracy = performance.get('total')! / performance.get('count')!
        
        nodes.push({
          id: `type-${type}`,
          group: 'type',
          label: type,
          size: 12,
          metrics: {
            accuracy: avgAccuracy,
            questions: performance.get('count') || 0
          }
        })
        nodeIds.add(`type-${type}`)
        
        // Find the performance level this type belongs to
        const level = performanceLevels.find(
          level => avgAccuracy >= level.min && avgAccuracy < level.max
        )
        
        if (level) {
          links.push({
            source: `performance-${level.id}`,
            target: `type-${type}`,
            value: 2
          })
        }
      })
      
      // Add set nodes and connect to types
      practiceSets.forEach(set => {
        nodes.push({
          id: `set-${set.id}`,
          group: 'set',
          label: `${set.subject} - ${set.difficulty}`,
          size: 8,
          metrics: {
            accuracy: set.accuracy,
            questions: set.questions.length
          },
          setId: set.id
        })
        nodeIds.add(`set-${set.id}`)
        
        // Link set to its type
        links.push({
          source: `type-${set.type}`,
          target: `set-${set.id}`,
          value: 1
        })
      })
    }
    
    return { nodes, links }
  }, [practiceSets, graphMode])
  
  // Force simulation for layout positioning
  useEffect(() => {
    if (!svgRef.current || graphData.nodes.length === 0) return
    
    const svg = svgRef.current
    const width = svg.clientWidth
    const height = svg.clientHeight
    
    // Assign initial positions if not already assigned
    graphData.nodes.forEach(node => {
      if (node.x === undefined) {
        node.x = Math.random() * width
      }
      if (node.y === undefined) {
        node.y = Math.random() * height
      }
      if (node.vx === undefined) node.vx = 0
      if (node.vy === undefined) node.vy = 0
    })
    
    // Create map for faster lookup
    const nodeMap = new Map<string, Node>()
    graphData.nodes.forEach(node => nodeMap.set(node.id, node))
    
    // Physics constants
    const REPULSION = 300     // How strongly nodes push each other away
    const LINK_STRENGTH = 0.7 // How elastic links are
    const GRAVITY = 0.1       // How strongly nodes are pulled to the center
    const FRICTION = 0.9      // How quickly nodes slow down (1 = no friction)
    const CENTER_X = width / 2
    const CENTER_Y = height / 2
    
    // Apply forces for one step
    const applyForces = () => {
      // Calculate repulsive forces between all pairs of nodes
      for (let i = 0; i < graphData.nodes.length; i++) {
        const nodeA = graphData.nodes[i]
        
        // Apply center gravity
        const dx = (CENTER_X - nodeA.x!)
        const dy = (CENTER_Y - nodeA.y!)
        const distance = Math.sqrt(dx * dx + dy * dy)
        const force = GRAVITY * distance
        
        if (distance > 0) {
          nodeA.vx! += dx / distance * force
          nodeA.vy! += dy / distance * force
        }
        
        // Apply repulsion between nodes
        for (let j = i + 1; j < graphData.nodes.length; j++) {
          const nodeB = graphData.nodes[j]
          const dx = nodeB.x! - nodeA.x!
          const dy = nodeB.y! - nodeA.y!
          const distance = Math.sqrt(dx * dx + dy * dy) || 1
          
          // Adjust repulsion based on node sizes
          const sizeMultiplier = (nodeA.size + nodeB.size) / 20
          let repulsion = REPULSION * sizeMultiplier
          
          // Special case for selected node to push others away further
          if (nodeA.id === selectedNode || nodeB.id === selectedNode) {
            repulsion *= 1.5
          }
          
          // Calculate repulsive force (inverse square law)
          if (distance > 0) {
            const force = repulsion / (distance * distance)
            const fx = dx / distance * force
            const fy = dy / distance * force
            
            // Apply force to both nodes in opposite directions
            nodeA.vx! -= fx
            nodeA.vy! -= fy
            nodeB.vx! += fx
            nodeB.vy! += fy
          }
        }
      }
      
      // Apply spring forces along links
      graphData.links.forEach(link => {
        const sourceNode = nodeMap.get(link.source)
        const targetNode = nodeMap.get(link.target)
        
        if (sourceNode && targetNode) {
          const dx = targetNode.x! - sourceNode.x!
          const dy = targetNode.y! - sourceNode.y!
          const distance = Math.sqrt(dx * dx + dy * dy) || 1
          
          // Calculate target distance based on link strength
          const targetDistance = 100 / (link.value || 1)
          const displacement = distance - targetDistance
          
          // Apply force proportional to displacement
          if (distance > 0) {
            const force = LINK_STRENGTH * displacement
            const fx = dx / distance * force
            const fy = dy / distance * force
            
            sourceNode.vx! += fx
            sourceNode.vy! += fy
            targetNode.vx! -= fx
            targetNode.vy! -= fy
          }
        }
      })
      
      // Update positions based on velocities
      graphData.nodes.forEach(node => {
        // Apply friction
        node.vx! *= FRICTION
        node.vy! *= FRICTION
        
        // Update position
        node.x! += node.vx!
        node.y! += node.vy!
        
        // Simple boundary enforcement
        if (node.x! < 50) node.x = 50
        if (node.x! > width - 50) node.x = width - 50
        if (node.y! < 50) node.y = 50
        if (node.y! > height - 50) node.y = height - 50
      })
    }
    
    // Run simulation with requestAnimationFrame
    let frameId: number
    let iterations = 0
    
    const simulate = () => {
      applyForces()
      iterations++
      
      // Force update of the DOM
      const forceUpdate = new Event('forceUpdate')
      svg.dispatchEvent(forceUpdate)
      
      // Stop after certain number of iterations to save CPU
      if (iterations < 300) {
        frameId = requestAnimationFrame(simulate)
      }
    }
    
    frameId = requestAnimationFrame(simulate)
    
    // Clean up
    return () => cancelAnimationFrame(frameId)
  }, [graphData, selectedNode])
  
  // Helper to get node color
  const getNodeColor = (node: Node) => {
    // Color by group type
    if (node.group === 'subject') {
      return node.id === selectedNode ? 'fill-blue-700 dark:fill-blue-400' : 'fill-blue-500 dark:fill-blue-600'
    }
    if (node.group === 'type') {
      return node.id === selectedNode ? 'fill-green-700 dark:fill-green-400' : 'fill-green-500 dark:fill-green-600'
    }
    if (node.group === 'difficulty') {
      return node.id === selectedNode ? 'fill-purple-700 dark:fill-purple-400' : 'fill-purple-500 dark:fill-purple-600'
    }
    
    // For set nodes, color by accuracy
    if (node.metrics) {
      if (node.id === selectedNode) {
        return 'fill-yellow-500 dark:fill-yellow-400 stroke-2 stroke-yellow-300 dark:stroke-yellow-600'
      }
      if (node.metrics.accuracy >= 90) return 'fill-emerald-500 dark:fill-emerald-600'
      if (node.metrics.accuracy >= 80) return 'fill-emerald-400 dark:fill-emerald-500'
      if (node.metrics.accuracy >= 70) return 'fill-teal-400 dark:fill-teal-500'
      if (node.metrics.accuracy >= 60) return 'fill-amber-400 dark:fill-amber-500'
      return 'fill-red-400 dark:fill-red-500'
    }
    
    // Default
    return 'fill-gray-500 dark:fill-gray-400'
  }
  
  // Helper to get link stroke width
  const getLinkStrokeWidth = (link: Link) => {
    // Thicker for stronger links
    return link.value * 0.5
  }
  
  // Find selected set for details panel
  const selectedSet = practiceSets.find(set => set.id === selectedSetId)
  
  // Handle node click
  const handleNodeClick = (node: Node) => {
    // Toggle selection if already selected
    if (node.id === selectedNode) {
      setSelectedNode(null)
    } else {
      setSelectedNode(node.id)
    }
    
    // Select set if this is a set node
    if (node.setId) {
      onSelectSet(node.setId)
    }
  }
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm h-full">
      <h3 className="text-xl font-bold mb-4 text-center">Network Graph View</h3>
      
      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        {/* Graph mode selector */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">View Mode</label>
          <select 
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={graphMode}
            onChange={(e) => setGraphMode(e.target.value as 'by-subject' | 'by-difficulty' | 'by-performance')}
          >
            <option value="by-subject">By Subject & Type</option>
            <option value="by-difficulty">By Difficulty</option>
            <option value="by-performance">By Performance Level</option>
          </select>
        </div>
      </div>
      
      {/* Network Graph */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm overflow-hidden flex-1 h-[500px]">
        {graphData.nodes.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-500 dark:text-slate-400">No practice sets available.</p>
          </div>
        ) : (
          <div className="relative h-full">
            <svg 
              ref={svgRef}
              className="w-full h-full border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900"
              viewBox={`0 0 1000 500`}
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Links */}
              {graphData.links.map((link, i) => {
                const sourceNode = graphData.nodes.find(n => n.id === link.source)
                const targetNode = graphData.nodes.find(n => n.id === link.target)
                
                if (!sourceNode?.x || !targetNode?.x) return null
                
                return (
                  <line 
                    key={`link-${i}`}
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    className="stroke-slate-300 dark:stroke-slate-600"
                    strokeWidth={getLinkStrokeWidth(link)}
                    strokeOpacity={0.7}
                  />
                )
              })}
              
              {/* Nodes */}
              {graphData.nodes.map((node) => (
                <g 
                  key={node.id}
                  transform={`translate(${node.x || 0}, ${node.y || 0})`}
                  onClick={() => handleNodeClick(node)}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  <circle 
                    r={node.size}
                    className={`${getNodeColor(node)} transition-colors shadow-sm`}
                  />
                  
                  <text 
                    className="text-[10px] fill-slate-700 dark:fill-slate-300 pointer-events-none select-none"
                    textAnchor="middle"
                    y={node.size + 10}
                  >
                    {node.label}
                  </text>
                  
                  {node.metrics && (
                    <text 
                      className="text-[8px] fill-slate-500 dark:fill-slate-400 pointer-events-none select-none"
                      textAnchor="middle"
                      y={node.size + 20}
                    >
                      {node.metrics.accuracy}%
                    </text>
                  )}
                </g>
              ))}
            </svg>
            
            {/* Legend */}
            <div className="absolute top-2 right-2 bg-white dark:bg-slate-800 p-2 rounded-md shadow-sm text-xs">
              <div className="mb-1 font-medium">Node Types:</div>
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-600 mr-1"></div>
                {graphMode === 'by-performance' ? 'Performance Level' : graphMode === 'by-difficulty' ? 'Difficulty' : 'Subject'}
              </div>
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-green-500 dark:bg-green-600 mr-1"></div>
                Type
              </div>
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-emerald-400 dark:bg-emerald-500 mr-1"></div>
                Practice Set (colored by accuracy)
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Selected info panel */}
      {selectedNode && (
        <div className="mt-4 bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
          <h4 className="font-medium mb-2">Selected Node: {selectedNode.replace(/^(subject|type|set|difficulty|performance)-/, '')}</h4>
          
          {selectedNode.startsWith('set-') && selectedSet && (
            <div className="grid grid-cols-3 gap-2 text-center mt-2">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Subject</div>
                <div className="font-medium">{selectedSet.subject}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Type</div>
                <div className="font-medium">{selectedSet.type}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Accuracy</div>
                <div className={`font-medium ${
                  selectedSet.accuracy >= 80 ? 'text-emerald-600 dark:text-emerald-400' :
                  selectedSet.accuracy >= 60 ? 'text-amber-600 dark:text-amber-400' :
                  'text-red-600 dark:text-red-400'
                }`}>{selectedSet.accuracy}%</div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Instructions */}
      <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 text-center">
        <p>Click on nodes to view details and connections. Practice set nodes are colored by accuracy.</p>
      </div>
    </div>
  )
}
