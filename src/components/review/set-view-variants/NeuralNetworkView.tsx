'use client'

import React, { useState, useEffect } from 'react'
import { SetViewProps } from './types'

export const NeuralNetworkView: React.FC<SetViewProps> = ({ 
  sets, 
  selectedSetId, 
  onSelectSet, 
  isLoading = false 
}) => {
  const [mounted, setMounted] = useState(false)
  const [activeFilter, setActiveFilter] = useState<'all' | 'accuracy' | 'recency' | 'difficulty'>('all')
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted || isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin"></div>
      </div>
    )
  }
  
  if (!sets || sets.length === 0) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg">
        <p className="text-slate-500 dark:text-slate-400">No practice sets available</p>
      </div>
    )
  }
  
  // Sort sets based on active filter
  const sortedSets = [...sets].sort((a, b) => {
    if (activeFilter === 'accuracy') {
      return (b.accuracy || 0) - (a.accuracy || 0) // Higher accuracy first
    } else if (activeFilter === 'recency') {
      return new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime() // Most recent first
    } else if (activeFilter === 'difficulty') {
      const difficultyValues: Record<string, number> = {
        'Expert': 4,
        'Hard': 3,
        'Medium': 2,
        'Easy': 1,
        'Beginner': 0
      }
      return (difficultyValues[b.difficulty] || 0) - (difficultyValues[a.difficulty] || 0) // Harder first
    }
    return 0 // Default no sorting
  })
  
  // Neural network node properties based on subject
  const getNodeColorsBySubject = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          primaryColor: 'bg-blue-500',
          secondaryColor: 'bg-indigo-400',
          gradient: 'from-blue-500 to-indigo-600',
          nodeColor: 'bg-blue-600',
          connectorColor: 'bg-blue-400/30',
          accentColor: 'border-blue-300',
          activeNodeColor: 'bg-blue-400',
          textColor: 'text-blue-200'
        }
      case 'Reading':
        return {
          primaryColor: 'bg-emerald-500',
          secondaryColor: 'bg-teal-400',
          gradient: 'from-emerald-500 to-teal-600',
          nodeColor: 'bg-emerald-600',
          connectorColor: 'bg-emerald-400/30',
          accentColor: 'border-emerald-300',
          activeNodeColor: 'bg-emerald-400',
          textColor: 'text-emerald-200'
        }
      case 'Writing':
        return {
          primaryColor: 'bg-amber-500',
          secondaryColor: 'bg-orange-400',
          gradient: 'from-amber-500 to-orange-600',
          nodeColor: 'bg-amber-600',
          connectorColor: 'bg-amber-400/30',
          accentColor: 'border-amber-300',
          activeNodeColor: 'bg-amber-400',
          textColor: 'text-amber-200'
        }
      default:
        return {
          primaryColor: 'bg-purple-500',
          secondaryColor: 'bg-fuchsia-400',
          gradient: 'from-purple-500 to-fuchsia-600',
          nodeColor: 'bg-purple-600',
          connectorColor: 'bg-purple-400/30',
          accentColor: 'border-purple-300',
          activeNodeColor: 'bg-purple-400',
          textColor: 'text-purple-200'
        }
    }
  }
  
  // Neural network node structure based on set properties
  const getNeuralNetworkProperties = (set: any) => {
    // Base properties on accuracy and difficulty
    const accuracy = set.accuracy || 0
    const difficulty = set.difficulty || 'Medium'
    
    // Determine neural network layer properties
    let layerCount = 3 // Default 3 layers
    
    // Adjust layer count based on difficulty
    if (difficulty === 'Expert') layerCount = 5
    else if (difficulty === 'Hard') layerCount = 4
    else if (difficulty === 'Medium') layerCount = 3
    else layerCount = 2
    
    // Calculate activation level based on accuracy
    let activationLevel = 'low'
    if (accuracy >= 90) activationLevel = 'very-high'
    else if (accuracy >= 75) activationLevel = 'high'
    else if (accuracy >= 60) activationLevel = 'medium'
    else if (accuracy >= 40) activationLevel = 'low'
    else activationLevel = 'very-low'
    
    // Generate node count for each layer
    const nodeStructure = []
    
    // Input layer - question count influences node count
    const inputNodes = Math.min(8, Math.max(4, Math.ceil((set.questions?.length || 10) / 2)))
    nodeStructure.push(inputNodes)
    
    // Hidden layers
    for (let i = 1; i < layerCount - 1; i++) {
      // Each hidden layer has progressively fewer nodes
      const hiddenLayerNodes = Math.max(2, Math.ceil(inputNodes / (i + 1)))
      nodeStructure.push(hiddenLayerNodes)
    }
    
    // Output layer always has 1 node
    nodeStructure.push(1)
    
    return {
      layerCount,
      activationLevel,
      nodeStructure,
      connectionDensity: accuracy / 100, // Higher accuracy = more connections
      activation: {
        pulse: activationLevel === 'very-high' ? 'animate-pulse' : '',
        speed: activationLevel === 'very-high' ? 'fast' : 
               activationLevel === 'high' ? 'medium-fast' : 
               activationLevel === 'medium' ? 'medium' : 
               activationLevel === 'low' ? 'slow' : 'very-slow'
      }
    }
  }
  
  // Render a neural network representation of a set
  const renderNeuralNetwork = (set: any, isSelected: boolean) => {
    const colors = getNodeColorsBySubject(set.subject)
    const network = getNeuralNetworkProperties(set)
    
    // Generate nodes for each layer
    const renderNetworkLayers = () => {
      return (
        <div className="relative w-full h-48 flex items-center justify-between px-2">
          {network.nodeStructure.map((nodeCount, layerIndex) => (
            <div key={layerIndex} className="flex flex-col justify-center items-center gap-2 relative z-10">
              {Array.from({ length: nodeCount }).map((_, nodeIndex) => {
                // Determine if this node should be active (based on accuracy and position)
                const shouldBeActive = 
                  (network.activationLevel === 'very-high') || 
                  (network.activationLevel === 'high' && (nodeIndex % 2 === 0 || layerIndex % 2 === 0)) ||
                  (network.activationLevel === 'medium' && nodeIndex === 0) ||
                  (network.activationLevel === 'low' && nodeIndex === 0 && layerIndex === network.nodeStructure.length - 1);
                
                // Determine the activation delay based on layer index
                const activationDelay = `${(layerIndex * 0.2).toFixed(1)}s`;
                
                // Different styling for output node
                const isOutputNode = layerIndex === network.nodeStructure.length - 1;
                
                return (
                  <div 
                    key={nodeIndex}
                    className={`rounded-full ${isOutputNode ? 'w-8 h-8' : 'w-4 h-4'} 
                              ${shouldBeActive ? colors.activeNodeColor : colors.nodeColor}
                              transition-all duration-500 
                              ${shouldBeActive && network.activation.pulse}`}
                    style={{ 
                      animationDelay: activationDelay,
                      boxShadow: shouldBeActive ? `0 0 10px ${isOutputNode ? '4px' : '2px'} rgba(255,255,255,0.3)` : 'none'
                    }}
                  ></div>
                )
              })}
            </div>
          ))}
          
          {/* Network connections between layers */}
          <div className="absolute inset-0 z-0">
            <svg width="100%" height="100%" className="stroke-slate-500/20">
              {network.nodeStructure.slice(0, -1).map((fromLayerNodes, layerIndex) => {
                const toLayerNodes = network.nodeStructure[layerIndex + 1];
                const connections = [];
                
                // Calculate x positions for the current layer and next layer
                const layerSpacing = 100 / (network.nodeStructure.length - 1);
                const fromX = layerIndex * layerSpacing;
                const toX = (layerIndex + 1) * layerSpacing;
                
                // Draw connections between nodes
                for (let fromNode = 0; fromNode < fromLayerNodes; fromNode++) {
                  // Calculate y position for the from-node
                  const fromSpacing = 100 / (fromLayerNodes + 1);
                  const fromY = (fromNode + 1) * fromSpacing;
                  
                  for (let toNode = 0; toNode < toLayerNodes; toNode++) {
                    // Calculate y position for the to-node  
                    const toSpacing = 100 / (toLayerNodes + 1);
                    const toY = (toNode + 1) * toSpacing;
                    
                    // Only draw some connections based on connection density
                    if (Math.random() < network.connectionDensity) {
                      connections.push(
                        <line 
                          key={`${fromNode}-${toNode}`}
                          x1={`${fromX}%`} 
                          y1={`${fromY}%`} 
                          x2={`${toX}%`} 
                          y2={`${toY}%`} 
                          strokeWidth="1"
                          strokeOpacity={network.connectionDensity}
                        />
                      );
                    }
                  }
                }
                
                return connections;
              })}
            </svg>
          </div>
        </div>
      )
    }
    
    return (
      <div 
        className={`
          relative border rounded-lg overflow-hidden transition-all duration-300
          bg-gray-900 border-gray-800
          ${isSelected ? 'ring-2 ring-white shadow-lg transform scale-105 z-10' : 'hover:scale-[1.02]'}
          cursor-pointer
        `}
        onClick={() => onSelectSet(set.id)}
      >
        {/* Neural network background */}
        <div className={`bg-gradient-to-br ${colors.gradient} h-2`}></div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-white text-sm line-clamp-1">{set.type}</h3>
            <div className={`${colors.nodeColor} text-white rounded-full px-2 py-0.5 text-xs font-medium`}>
              {set.accuracy}%
            </div>
          </div>
          
          <div className="text-xs text-white/60 mb-4">
            {new Date(set.dateCompleted).toLocaleDateString()}
          </div>
          
          {/* Neural network visualization */}
          {renderNetworkLayers()}
          
          {/* Network stats overlay */}
          <div className="mt-4 pt-3 border-t border-gray-800">
            <div className="flex justify-between text-xs text-white/80">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${colors.primaryColor} mr-1`}></div>
                <span>{set.subject}</span>
              </div>
              <div>
                <span className="text-white/60 mr-1">Difficulty:</span>
                <span className="font-medium">{set.difficulty || 'Medium'}</span>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="flex justify-between text-xs text-white/80 mb-1">
                <span>Neural Activation</span>
                <span>
                  {network.activationLevel === 'very-high' ? 'Excellent' :
                   network.activationLevel === 'high' ? 'Strong' :
                   network.activationLevel === 'medium' ? 'Moderate' :
                   network.activationLevel === 'low' ? 'Weak' : 'Minimal'}
                </span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${colors.primaryColor}`}
                  style={{ width: `${set.accuracy}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="border border-gray-900 dark:border-gray-900 rounded-xl shadow-lg overflow-hidden bg-gray-950 p-5">
      <style jsx>{`
        @keyframes neural-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .animate-pulse {
          animation: neural-pulse 1.5s ease-in-out infinite;
        }
      `}</style>
      
      <h2 className="text-xl font-bold mb-1 text-white">Neural Network Analysis</h2>
      
      <p className="text-white/60 text-sm mb-4">
        Visualizing your practice sets as neural networks with activation patterns reflecting performance
      </p>
      
      {/* Filter controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 text-xs rounded-full ${
              activeFilter === 'all' 
                ? 'bg-white text-gray-900' 
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            All Networks
          </button>
          <button 
            onClick={() => setActiveFilter('accuracy')}
            className={`px-3 py-1 text-xs rounded-full ${
              activeFilter === 'accuracy' 
                ? 'bg-white text-gray-900' 
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            By Activation
          </button>
          <button 
            onClick={() => setActiveFilter('difficulty')}
            className={`px-3 py-1 text-xs rounded-full ${
              activeFilter === 'difficulty' 
                ? 'bg-white text-gray-900' 
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            By Complexity
          </button>
          <button 
            onClick={() => setActiveFilter('recency')}
            className={`px-3 py-1 text-xs rounded-full ${
              activeFilter === 'recency' 
                ? 'bg-white text-gray-900' 
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            By Recency
          </button>
        </div>
      </div>
      
      {/* Neural networks grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedSets.map(set => renderNeuralNetwork(set, set.id === selectedSetId))}
      </div>
      
      {/* Legend */}
      <div className="mt-8 pt-4 border-t border-gray-800 text-white/60 text-xs grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-white mb-2">Network Architecture</h4>
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
              <span>Math Networks (Logic-focused)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-emerald-500 mr-1"></div>
              <span>Reading Networks (Pattern Recognition)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
              <span>Writing Networks (Creative Processing)</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-white mb-2">Activation Levels</h4>
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-white animate-pulse mr-1"></div>
              <span>Excellent Activation (90%+ Accuracy)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-white/80 mr-1"></div>
              <span>Strong Activation (75-89% Accuracy)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-white/50 mr-1"></div>
              <span>Moderate Activation (60-74% Accuracy)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}