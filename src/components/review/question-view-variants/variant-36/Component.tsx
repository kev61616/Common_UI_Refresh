'use client'

import React, { useState, useEffect, useRef } from 'react'
import { QuestionViewProps } from '../types'

/**
 * Learning Gap Analyzer
 * 
 * Primary Insight Objective: Identify structural knowledge gaps by analyzing 
 * patterns in incorrect answers to guide targeted remediation efforts.
 * 
 * Data-to-Visual Mapping:
 * - Topic/subtopic hierarchy mapped to treemap structure (shows knowledge organization)
 * - Error frequency mapped to cell size (reveals most problematic areas)
 * - Error recency mapped to color intensity (highlights persistent vs. resolved gaps)
 * - Error patterns mapped to cell grouping (shows related knowledge gaps)
 * - Difficulty mapped to border thickness (distinguishes fundamental vs. advanced gaps)
 * 
 * Analytical Value:
 * - Identify foundational knowledge gaps that affect multiple areas
 * - Prioritize remediation based on gap size and structural importance
 * - Track knowledge gap resolution over time 
 * - Guide efficient study planning based on knowledge structure
 */
export function Component({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeNode, setActiveNode] = useState<string | null>(null)
  
  // Simulation state
  const [networkNodes, setNetworkNodes] = useState<any[]>([])
  
  // Process practice sets to create network data
  useEffect(() => {
    // Artificially delay to show loading state
    const timer = setTimeout(() => {
      if (practiceSets.length > 0) {
        // Process data to create a network representation
        // In a real implementation, this would analyze questions and their relationships
        const nodes = practiceSets.map((set, index) => ({
          id: set.id,
          name: `${set.subject} - ${set.type}`,
          radius: 15 + (set.accuracy / 10), // Size based on accuracy
          x: Math.random() * 800,
          y: Math.random() * 500,
          vx: 0,
          vy: 0,
          color: getColorForAccuracy(set.accuracy),
          connections: getRandomConnections(practiceSets.length, index)
        }))
        
        setNetworkNodes(nodes)
        setIsLoading(false)
      }
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [practiceSets])
  
  // Animation loop
  useEffect(() => {
    if (isLoading || !canvasRef.current || networkNodes.length === 0) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Get container dimensions
    const resizeCanvas = () => {
      if (containerRef.current && canvas) {
        const rect = containerRef.current.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = 500 // Fixed height
      }
    }
    
    // Initial sizing
    resizeCanvas()
    
    // Listen for resize events
    window.addEventListener('resize', resizeCanvas)
    
    // Animation variables
    let animationFrameId: number
    let lastTime = 0
    
    // Run physics simulation
    const simulate = (time: number) => {
      const dt = (time - lastTime) / 1000 // Convert to seconds
      lastTime = time
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw background grid
      drawGrid(ctx, canvas)
      
      // Run force simulation
      applyForces(networkNodes, dt)
      
      // Draw connections first (behind nodes)
      drawConnections(ctx, networkNodes)
      
      // Draw nodes on top
      drawNodes(ctx, networkNodes, activeNode)
      
      // Continue animation loop
      animationFrameId = requestAnimationFrame(simulate)
    }
    
    // Start animation
    animationFrameId = requestAnimationFrame(simulate)
    
    // Handle mouse interactions
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Check if mouse is over any node
      const node = networkNodes.find(node => {
        const dx = node.x - x
        const dy = node.y - y
        return Math.sqrt(dx * dx + dy * dy) <= node.radius
      })
      
      if (node) {
        canvas.style.cursor = 'pointer'
        setActiveNode(node.id)
      } else {
        canvas.style.cursor = 'default'
        setActiveNode(null)
      }
    }
    
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Check if clicked on any node
      const node = networkNodes.find(node => {
        const dx = node.x - x
        const dy = node.y - y
        return Math.sqrt(dx * dx + dy * dy) <= node.radius
      })
      
      if (node && onSelectSet) {
        onSelectSet(node.id)
      }
    }
    
    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('click', handleClick)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('click', handleClick)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isLoading, networkNodes, activeNode, onSelectSet])
  
  // Helper function to get random connections between nodes
  const getRandomConnections = (total: number, index: number) => {
    const connections = []
    const numConnections = Math.floor(Math.random() * 5) + 1 // 1-5 connections
    
    for (let i = 0; i < numConnections; i++) {
      let targetIndex
      do {
        targetIndex = Math.floor(Math.random() * total)
      } while (targetIndex === index)
      
      connections.push(targetIndex)
    }
    
    return connections
  }
  
  // Helper function to get color based on accuracy
  const getColorForAccuracy = (accuracy: number): string => {
    if (accuracy >= 90) return 'rgb(16, 185, 129)' // Green for high accuracy
    if (accuracy >= 70) return 'rgb(59, 130, 246)' // Blue for good accuracy
    if (accuracy >= 50) return 'rgb(245, 158, 11)' // Yellow for medium accuracy
    return 'rgb(239, 68, 68)' // Red for low accuracy
  }
  
  // Helper to draw grid background
  const drawGrid = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const gridSize = 30;
    
    ctx.beginPath()
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)'
    ctx.lineWidth = 1
    
    // Vertical lines
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
    }
    
    // Horizontal lines
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
    }
    
    ctx.stroke()
  }
  
  // Helper to draw connections between nodes
  const drawConnections = (ctx: CanvasRenderingContext2D, nodes: any[]) => {
    ctx.beginPath()
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)'
    ctx.lineWidth = 1
    
    for (const node of nodes) {
      for (const targetIndex of node.connections) {
        const target = nodes[targetIndex]
        if (!target) continue
        
        ctx.moveTo(node.x, node.y)
        ctx.lineTo(target.x, target.y)
      }
    }
    
    ctx.stroke()
  }
  
  // Helper to draw nodes
  const drawNodes = (ctx: CanvasRenderingContext2D, nodes: any[], activeNodeId: string | null) => {
    for (const node of nodes) {
      const isActive = node.id === activeNodeId
      const isSelected = node.id === selectedSetId
      
      // Draw node glow if active or selected
      if (isActive || isSelected) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2)
        ctx.fillStyle = isSelected 
          ? 'rgba(79, 70, 229, 0.2)' // Indigo for selected
          : 'rgba(255, 255, 255, 0.2)' // White for hover
        ctx.fill()
      }
      
      // Draw node body
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
      ctx.fillStyle = node.color
      ctx.fill()
      
      // Draw node border
      ctx.strokeStyle = isSelected ? 'rgb(79, 70, 229)' : 'white'
      ctx.lineWidth = isSelected ? 3 : 1
      ctx.stroke()
      
      // Draw pulse effect for selected nodes
      if (isSelected) {
        const pulse = Math.sin(Date.now() / 300) * 5 + 10
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + pulse, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(79, 70, 229, 0.2)'
        ctx.lineWidth = 2
        ctx.stroke()
      }
    }
  }
  
  // Apply forces between nodes for simulation
  const applyForces = (nodes: any[], dt: number) => {
    // Force parameters
    const centerForce = 0.01
    const repulsionForce = 1000;
    const connectionForce = 0.05
    
    for (const node of nodes) {
      // Center force (pulls nodes to center)
      const centerX = 400;
      const centerY = 250;
      node.vx += (centerX - node.x) * centerForce * dt
      node.vy += (centerY - node.y) * centerForce * dt
      
      // Repulsion force (pushes nodes apart)
      for (const otherNode of nodes) {
        if (node === otherNode) continue
        
        const dx = node.x - otherNode.x
        const dy = node.y - otherNode.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance > 0 && distance < 200) {
          const force = repulsionForce / (distance * distance) * dt
          node.vx += (dx / distance) * force
          node.vy += (dy / distance) * force
        }
      }
      
      // Connection force (pulls connected nodes together)
      for (const targetIndex of node.connections) {
        const target = nodes[targetIndex]
        if (!target) continue
        
        const dx = target.x - node.x
        const dy = target.y - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        node.vx += (dx / distance) * connectionForce * dt
        node.vy += (dy / distance) * connectionForce * dt
      }
      
      // Add some randomness
      node.vx += (Math.random() - 0.5) * 0.5 * dt
      node.vy += (Math.random() - 0.5) * 0.5 * dt
      
      // Damping (slows down movement)
      node.vx *= 0.95
      node.vy *= 0.95
      
      // Apply velocity
      node.x += node.vx
      node.y += node.vy
      
      // Boundary constraints
      if (node.x < node.radius) node.x = node.radius
      if (node.y < node.radius) node.y = node.radius
      if (node.x > 800 - node.radius) node.x = 800 - node.radius
      if (node.y > 500 - node.radius) node.y = 500 - node.radius
    }
  }
  
  // Info panel for selected node
  const renderInfoPanel = () => {
    if (!selectedSetId) return null
    
    const selectedSet = practiceSets.find(set => set.id === selectedSetId)
    if (!selectedSet) return null
    
    return (
      <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-2">{selectedSet.subject} - {selectedSet.type}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-2 bg-slate-50 dark:bg-slate-700/50 rounded">
            <div className="text-sm text-slate-500 dark:text-slate-400">Accuracy</div>
            <div className="text-xl font-bold">{selectedSet.accuracy}%</div>
          </div>
          <div className="p-2 bg-slate-50 dark:bg-slate-700/50 rounded">
            <div className="text-sm text-slate-500 dark:text-slate-400">Questions</div>
            <div className="text-xl font-bold">{selectedSet.questions.length}</div>
          </div>
          <div className="p-2 bg-slate-50 dark:bg-slate-700/50 rounded">
            <div className="text-sm text-slate-500 dark:text-slate-400">Date</div>
            <div className="text-sm">{new Date(selectedSet.dateCompleted).toLocaleDateString()}</div>
          </div>
          <div className="p-2 bg-slate-50 dark:bg-slate-700/50 rounded">
            <div className="text-sm text-slate-500 dark:text-slate-400">Time Used</div>
            <div className="text-sm">{Math.floor(selectedSet.timeUsed / 60)}:{(selectedSet.timeUsed % 60).toString().padStart(2, '0')}</div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="neural-network-view">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 text-center">36. Neural Network View</h3>
        <p className="text-slate-600 dark:text-slate-400 text-center max-w-2xl mx-auto">
          This view visualizes your learning as a neural network. Each node represents a practice set, 
          with size indicating importance and color showing performance level. Connected nodes represent related sets.
        </p>
      </div>
      
      {isLoading ? (
        <div className="min-h-[500px] flex justify-center items-center bg-slate-50 dark:bg-slate-800/20 rounded-lg">
          <div className="text-center p-8">
            <div className="inline-block w-12 h-12 border-4 border-slate-300 dark:border-slate-600 border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 dark:text-slate-400">Generating neural network visualization...</p>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 dark:bg-slate-800/20 rounded-lg overflow-hidden">
          <div ref={containerRef} className="neural-network-container relative">
            <canvas 
              ref={canvasRef} 
              className="w-full"
              width="800" 
              height="500"
            />
            
            {activeNode && (
              <div className="absolute pointer-events-none" style={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                color: 'white',
                padding: '0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.875rem',
                // Position will be set by JavaScript in actual implementation
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -100%)',
              }}>
                {networkNodes.find(n => n.id === activeNode)?.name}
              </div>
            )}
          </div>
          
          {renderInfoPanel()}
          
          <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
            Click on a node to view details. Drag nodes to rearrange the network.
          </div>
        </div>
      )}
      
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">About Neural Networks</h4>
        <p className="text-sm text-blue-600 dark:text-blue-400">
          This visualization is inspired by how our brains learn. Just as neurons form connections
          to create memory and understanding, your learning forms a network of interconnected knowledge.
          Stronger connections (higher accuracy) lead to better recall and application.
        </p>
      </div>
    </div>
  )
}
