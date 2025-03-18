'use client'

import React, { useState, useEffect } from 'react'
import { SetViewProps } from '../types'

/**
 * Performance Correlation Matrix
 * 
 * Primary Insight Objective: Identify relationships between different learning factors
 * (time of day, difficulty, subject, etc.) to optimize study strategies.
 * 
 * Data-to-Visual Mapping:
 * - Factor pairs mapped to matrix cells (enables discovering non-obvious correlations)
 * - Correlation strength mapped to color intensity (reveals strength of relationships)
 * - Correlation direction mapped to color hue (shows positive vs negative relationships)
 * - Set count mapped to cell size (indicates confidence level in the correlation)
 * - Selection state mapped to highlight effects (facilitates focused analysis)
 * 
 * Analytical Value:
 * - Discover unexpected factors affecting performance
 * - Identify optimal study conditions for each subject
 * - Recognize time management patterns across practice types
 * - Support evidence-based decisions about study scheduling
 */
export function Component({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [selectedFactor, setSelectedFactor] = useState<string | null>(null)
  const [correlationData, setCorrelationData] = useState<any>({})
  const [hoveredCell, setHoveredCell] = useState<{row: string, col: string} | null>(null)
  
  // List of factors to analyze for correlations
  const factors = [
    { id: 'timeOfDay', label: 'Time of Day' },
    { id: 'subject', label: 'Subject' },
    { id: 'difficulty', label: 'Difficulty' },
    { id: 'pace', label: 'Pace' },
    { id: 'questionCount', label: 'Question Count' }
  ]
  
  // Calculate correlation data between all pairs of factors
  useEffect(() => {
    if (practiceSets.length < 2) return // Need at least 2 sets for correlations
    
    const data: {[key: string]: {[key: string]: any}} = {}
    
    // Initialize data structure
    factors.forEach(factor1 => {
      data[factor1.id] = {}
      factors.forEach(factor2 => {
        data[factor1.id][factor2.id] = {
          correlation: 0,
          setIds: [],
          strength: 0,
          direction: 'neutral'
        }
      })
    })
    
    // Helper to extract factor value from a set
    const getFactorValue = (set: any, factorId: string): any => {
      switch(factorId) {
        case 'subject': return set.subject
        case 'timeOfDay': return set.timeOfDay
        case 'difficulty': return set.difficulty
        case 'pace': return set.pace
        case 'questionCount': return set.questions.length
        default: return null
      }
    }
    
    // Calculate correlation between categorical factors
    const calculateCorrelation = (factor1: string, factor2: string) => {
      // Create frequency tables
      const contingencyTable: {[key: string]: {[key: string]: string[]}} = {}
      const factor1Values: Set<string> = new Set()
      const factor2Values: Set<string> = new Set()
      
      // Populate tables
      practiceSets.forEach(set => {
        const val1 = getFactorValue(set, factor1)
        const val2 = getFactorValue(set, factor2)
        
        if (val1 === null || val2 === null) return
        
        factor1Values.add(String(val1))
        factor2Values.add(String(val2))
        
        if (!contingencyTable[val1]) {
          contingencyTable[val1] = {}
        }
        
        if (!contingencyTable[val1][val2]) {
          contingencyTable[val1][val2] = []
        }
        
        contingencyTable[val1][val2].push(set.id)
      })
      
      // Look for performance differences across combinations
      const performanceByCombo: {[key: string]: number[]} = {}
      const setIdsByCombo: {[key: string]: string[]} = {}
      
      Object.entries(contingencyTable).forEach(([val1, subTable]) => {
        Object.entries(subTable).forEach(([val2, setIds]) => {
          const comboKey = `${val1}-${val2}`
          
          // Get average performance for this combo
          const relevantSets = practiceSets.filter(s => setIds.includes(s.id))
          const avgAccuracy = relevantSets.reduce((sum, s) => sum + s.accuracy, 0) / relevantSets.length
          
          performanceByCombo[comboKey] = [avgAccuracy, relevantSets.length]
          setIdsByCombo[comboKey] = setIds
        })
      })
      
      // Find strongest and weakest combinations
      const combos = Object.entries(performanceByCombo)
      if (combos.length < 2) return { correlation: 0, setIds: [], strength: 0, direction: 'neutral' }
      
      combos.sort((a, b) => b[1][0] - a[1][0])
      
      const bestCombo = combos[0]
      const worstCombo = combos[combos.length - 1]
      
      // Calculate correlation strength (normalized difference)
      const maxPossibleDiff = 100 // max accuracy difference
      const actualDiff = bestCombo[1][0] - worstCombo[1][0]
      const normalizedStrength = Math.min(1, Math.max(0, actualDiff / maxPossibleDiff))
      
      // Only consider meaningful correlations
      const isStrongEnough = normalizedStrength > 0.1 && 
                            bestCombo[1][1] >= 2 && // at least 2 sets in best combo
                            worstCombo[1][1] >= 2   // at least 2 sets in worst combo
      
      // Return correlation data
      return {
        correlation: isStrongEnough ? actualDiff : 0,
        bestCombo: isStrongEnough ? bestCombo[0] : null,
        worstCombo: isStrongEnough ? worstCombo[0] : null,
        setIds: isStrongEnough ? [...setIdsByCombo[bestCombo[0]], ...setIdsByCombo[worstCombo[0]]] : [],
        strength: isStrongEnough ? normalizedStrength : 0,
        direction: 'positive' // For categorical variables, we just show strength
      }
    }
    
    // Calculate correlations for all factor pairs
    factors.forEach(factor1 => {
      factors.forEach(factor2 => {
        if (factor1.id === factor2.id) {
          // Self-correlation is always 1
          data[factor1.id][factor2.id] = {
            correlation: 1,
            setIds: [],
            strength: 1,
            direction: 'positive'
          }
        } else {
          // Calculate actual correlation
          data[factor1.id][factor2.id] = calculateCorrelation(factor1.id, factor2.id)
        }
      })
    })
    
    setCorrelationData(data)
  }, [practiceSets])
  
  // Get color for correlation strength and direction
  const getCorrelationColor = (strength: number, direction: string) => {
    if (strength < 0.05) return 'bg-gray-100 dark:bg-gray-800'
    
    if (direction === 'positive') {
      if (strength > 0.5) return 'bg-emerald-500'
      if (strength > 0.3) return 'bg-emerald-400'
      if (strength > 0.1) return 'bg-emerald-300'
      return 'bg-emerald-200'
    } else if (direction === 'negative') {
      if (strength > 0.5) return 'bg-red-500'
      if (strength > 0.3) return 'bg-red-400'
      if (strength > 0.1) return 'bg-red-300'
      return 'bg-red-200'
    }
    
    return 'bg-gray-100 dark:bg-gray-800'
  }
  
  // Get text color for correlation cell
  const getTextColor = (strength: number, direction: string) => {
    if (strength < 0.05) return 'text-gray-400 dark:text-gray-600'
    if (strength > 0.3) return 'text-white'
    return 'text-gray-800'
  }
  
  // Helper to get the label for a factor
  const getFactorLabel = (factorId: string) => {
    const factor = factors.find(f => f.id === factorId)
    return factor ? factor.label : factorId
  }
  
  // Format correlation value for display
  const formatCorrelation = (correlation: number) => {
    if (Math.abs(correlation) < 0.01) return '0'
    return correlation.toFixed(2)
  }
  
  // Handle cell click to select factor
  const handleCellClick = (row: string, col: string) => {
    // If selecting an empty correlation, do nothing
    if (!correlationData[row]?.[col]?.strength) return
    
    // If clicking a cell connected to currently selected factor, select the other factor
    if (selectedFactor === row) {
      setSelectedFactor(col)
    } else if (selectedFactor === col) {
      setSelectedFactor(row)
    } else {
      // Otherwise select the row factor
      setSelectedFactor(row)
    }
  }
  
  // When a correlation cell is selected, extract relevant sets
  const getRelevantSetsForSelection = () => {
    if (!selectedFactor) return []
    
    // Find strongest correlation for the selected factor
    let strongestCorrelation = { factor: '', strength: 0, setIds: [] }
    
    factors.forEach(factor => {
      if (factor.id === selectedFactor) return // Skip self
      
      const correlation = correlationData[selectedFactor]?.[factor.id]
      if (correlation && correlation.strength > strongestCorrelation.strength) {
        strongestCorrelation = {
          factor: factor.id,
          strength: correlation.strength,
          setIds: correlation.setIds
        }
      }
    })
    
    // Return sets involved in this correlation
    return strongestCorrelation.setIds
  }
  
  // Get all sets involved in a specific correlation
  const getSetsForCorrelation = (row: string, col: string) => {
    return correlationData[row]?.[col]?.setIds || []
  }
  
  // Get descriptive insights about a correlation
  const getCorrelationInsights = (row: string, col: string) => {
    const data = correlationData[row]?.[col]
    if (!data || data.strength < 0.1) return null
    
    const factor1 = getFactorLabel(row)
    const factor2 = getFactorLabel(col)
    
    // Parse the best and worst combos to get specific values
    const bestValues = data.bestCombo?.split('-') || []
    const worstValues = data.worstCombo?.split('-') || []
    
    if (bestValues.length !== 2 || worstValues.length !== 2) return null
    
    return {
      bestCombo: `${factor1}: ${bestValues[0]}, ${factor2}: ${bestValues[1]}`,
      worstCombo: `${factor1}: ${worstValues[0]}, ${factor2}: ${worstValues[1]}`,
      strengthDesc: data.strength > 0.5 ? 'Strong' : data.strength > 0.3 ? 'Moderate' : 'Weak',
      differencePercent: Math.round(data.correlation)
    }
  }
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-lg">
      <h3 className="text-xl font-bold mb-2 text-center">Performance Correlation Matrix</h3>
      
      <div className="text-sm text-center mb-6 text-gray-600 dark:text-gray-400">
        Discover relationships between learning factors to optimize your study strategy
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Correlation matrix */}
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-left text-gray-500 dark:text-gray-400 text-sm font-normal">Factors</th>
                {factors.map(factor => (
                  <th 
                    key={factor.id}
                    className={`p-2 text-left text-sm font-medium
                      ${selectedFactor === factor.id 
                        ? 'text-indigo-600 dark:text-indigo-400' 
                        : 'text-gray-700 dark:text-gray-300'
                      }
                    `}
                  >
                    {factor.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {factors.map(rowFactor => (
                <tr 
                  key={rowFactor.id}
                  className={`border-t border-gray-100 dark:border-gray-800
                    ${selectedFactor === rowFactor.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}
                  `}
                >
                  <td 
                    className={`p-2 font-medium text-sm
                      ${selectedFactor === rowFactor.id 
                        ? 'text-indigo-600 dark:text-indigo-400' 
                        : 'text-gray-700 dark:text-gray-300'
                      }
                    `}
                  >
                    {rowFactor.label}
                  </td>
                  {factors.map(colFactor => {
                    const correlation = correlationData[rowFactor.id]?.[colFactor.id]
                    const strength = correlation?.strength || 0
                    const direction = correlation?.direction || 'neutral'
                    const highlightCell = 
                      (selectedFactor === rowFactor.id || selectedFactor === colFactor.id) &&
                      strength > 0
                    const isHovered = hoveredCell?.row === rowFactor.id && hoveredCell?.col === colFactor.id
                    
                    return (
                      <td 
                        key={colFactor.id}
                        className={`p-1 text-center relative cursor-pointer
                          ${highlightCell ? 'ring-1 ring-indigo-300 dark:ring-indigo-700' : ''}
                          ${isHovered ? 'ring-2 ring-indigo-400 dark:ring-indigo-600 z-10' : ''}
                        `}
                        onClick={() => handleCellClick(rowFactor.id, colFactor.id)}
                        onMouseEnter={() => setHoveredCell({ row: rowFactor.id, col: colFactor.id })}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        <div 
                          className={`h-10 w-full flex items-center justify-center rounded
                            ${getCorrelationColor(strength, direction)}
                            ${getTextColor(strength, direction)}
                            transition-all duration-300
                          `}
                        >
                          {formatCorrelation(correlation?.correlation || 0)}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Insights panel */}
        <div className="w-full md:w-80 bg-white dark:bg-gray-900 rounded-lg shadow-md p-4">
          {hoveredCell ? (
            <div>
              <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
                {getFactorLabel(hoveredCell.row)} × {getFactorLabel(hoveredCell.col)}
              </h4>
              
              {getCorrelationInsights(hoveredCell.row, hoveredCell.col) ? (
                <>
                  <div className="mb-4">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Correlation:</span> 
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium
                        ${correlationData[hoveredCell.row][hoveredCell.col].strength > 0.3 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                        }
                      `}>
                        {getCorrelationInsights(hoveredCell.row, hoveredCell.col)?.strengthDesc}
                      </span>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3 mt-2 text-sm">
                      <div className="text-gray-900 dark:text-gray-100 mb-1">Performance difference: {getCorrelationInsights(hoveredCell.row, hoveredCell.col)?.differencePercent}%</div>
                      
                      <div className="text-gray-700 dark:text-gray-300 text-xs mt-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>
                        Best: {getCorrelationInsights(hoveredCell.row, hoveredCell.col)?.bestCombo}
                      </div>
                      
                      <div className="text-gray-700 dark:text-gray-300 text-xs mt-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1"></span>
                        Worst: {getCorrelationInsights(hoveredCell.row, hoveredCell.col)?.worstCombo}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Related practice sets:
                    </div>
                    <div className="max-h-40 overflow-y-auto">
                      <div className="grid grid-cols-2 gap-2">
                        {practiceSets
                          .filter(set => getSetsForCorrelation(hoveredCell.row, hoveredCell.col).includes(set.id))
                          .map(set => (
                            <button
                              key={set.id}
                              className={`
                                px-2 py-1 text-xs rounded border bg-gray-50 dark:bg-gray-800
                                ${set.subject === 'Math' ? 'text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900' : ''}
                                ${set.subject === 'Reading' ? 'text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-900' : ''}
                                ${set.subject === 'Writing' ? 'text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900' : ''}
                                ${selectedSetId === set.id ? 'ring-2 ring-indigo-500' : ''}
                              `}
                              onClick={() => onSelectSet(set.id)}
                            >
                              {set.type} ({set.accuracy}%)
                            </button>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  No significant correlation detected between these factors. This could be due to limited data or there might not be any meaningful relationship.
                </div>
              )}
            </div>
          ) : selectedFactor ? (
            <div>
              <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
                {getFactorLabel(selectedFactor)} Analysis
              </h4>
              
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Showing how {getFactorLabel(selectedFactor).toLowerCase()} correlates with other factors
              </div>
              
              <div className="space-y-3">
                {factors
                  .filter(f => f.id !== selectedFactor)
                  .map(factor => {
                    const correlation = correlationData[selectedFactor][factor.id]
                    if (!correlation || correlation.strength < 0.1) return null
                    
                    return (
                      <div 
                        key={factor.id}
                        className="bg-gray-50 dark:bg-gray-800 rounded-md p-3 text-sm"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {getFactorLabel(factor.id)}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                            ${correlation.strength > 0.3 
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                            }
                          `}>
                            {correlation.strength > 0.5 ? 'Strong' : correlation.strength > 0.3 ? 'Moderate' : 'Weak'}
                          </span>
                        </div>
                        
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                          <div 
                            className="bg-emerald-500 h-1.5 rounded-full"
                            style={{ width: `${correlation.strength * 100}%` }}
                          ></div>
                        </div>
                        
                        <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                          {correlation.bestCombo && (
                            <div>
                              Best performance with: <span className="text-emerald-600 dark:text-emerald-400">{correlation.bestCombo.split('-')[1]}</span>
                            </div>
                          )}
                          {correlation.worstCombo && (
                            <div>
                              Worst performance with: <span className="text-red-600 dark:text-red-400">{correlation.worstCombo.split('-')[1]}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  }).filter(Boolean)
                }
                
                {factors
                  .filter(f => f.id !== selectedFactor)
                  .every(f => !correlationData[selectedFactor][f.id] || correlationData[selectedFactor][f.id].strength < 0.1) && (
                  <div className="text-gray-500 dark:text-gray-400 text-sm">
                    No significant correlations found for {getFactorLabel(selectedFactor).toLowerCase()}. 
                    This could mean this factor doesn't strongly influence your performance.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center p-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-600 dark:text-gray-400">
                Hover over a cell to see correlation details or click to select a factor for analysis
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-3">
          <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
            How to read this matrix
          </h5>
          <p className="text-gray-600 dark:text-gray-400 text-xs">
            Each cell shows the correlation between two factors. Stronger colors indicate 
            stronger relationships. Click on a row/column to analyze a specific factor.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-3">
          <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
            Correlation strength
          </h5>
          <div className="grid grid-cols-4 gap-1">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-gray-100 dark:bg-gray-800 rounded mb-1"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">None</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-emerald-200 rounded mb-1"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Weak</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-emerald-400 rounded mb-1"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Medium</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-emerald-500 rounded mb-1"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Strong</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-3">
          <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
            Usage tip
          </h5>
          <p className="text-gray-600 dark:text-gray-400 text-xs">
            Use insights from this matrix to optimize your study habits. Focus on 
            factor combinations that show strong positive correlations with performance.
          </p>
        </div>
      </div>
    </div>
  )
}