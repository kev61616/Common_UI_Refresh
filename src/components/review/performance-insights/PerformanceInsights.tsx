'use client'

import React, { useState, useEffect } from 'react'
import { mockPracticeSets } from '@/lib/mockData'

type TimeFilterType = 'week' | 'month' | 'year' | 'all'

export function PerformanceInsights() {
  // State for time filter
  const [timeFilter, setTimeFilter] = useState<TimeFilterType>('month')
  
  // Mock data for student performance
  const studentData = {
    accuracy: [
      { date: '2025-03-01', value: 78 },
      { date: '2025-03-05', value: 82 },
      { date: '2025-03-10', value: 79 },
      { date: '2025-03-15', value: 85 },
      { date: '2025-03-20', value: 88 },
      { date: '2025-03-25', value: 92 },
      { date: '2025-03-30', value: 90 },
    ],
    speed: [
      { date: '2025-03-01', value: 65 },
      { date: '2025-03-05', value: 70 },
      { date: '2025-03-10', value: 72 },
      { date: '2025-03-15', value: 75 },
      { date: '2025-03-20', value: 78 },
      { date: '2025-03-25', value: 82 },
      { date: '2025-03-30', value: 84 },
    ]
  }
  
  // Mock data for benchmark (upper and lower ranges)
  const benchmarkData = {
    accuracy: {
      upper: [
        { date: '2025-03-01', value: 88 },
        { date: '2025-03-05', value: 90 },
        { date: '2025-03-10', value: 91 },
        { date: '2025-03-15', value: 93 },
        { date: '2025-03-20', value: 94 },
        { date: '2025-03-25', value: 96 },
        { date: '2025-03-30', value: 97 },
      ],
      lower: [
        { date: '2025-03-01', value: 68 },
        { date: '2025-03-05', value: 69 },
        { date: '2025-03-10', value: 70 },
        { date: '2025-03-15', value: 72 },
        { date: '2025-03-20', value: 74 },
        { date: '2025-03-25', value: 75 },
        { date: '2025-03-30', value: 76 },
      ]
    },
    speed: {
      upper: [
        { date: '2025-03-01', value: 75 },
        { date: '2025-03-05', value: 78 },
        { date: '2025-03-10', value: 80 },
        { date: '2025-03-15', value: 82 },
        { date: '2025-03-20', value: 84 },
        { date: '2025-03-25', value: 86 },
        { date: '2025-03-30', value: 88 },
      ],
      lower: [
        { date: '2025-03-01', value: 55 },
        { date: '2025-03-05', value: 56 },
        { date: '2025-03-10', value: 58 },
        { date: '2025-03-15', value: 60 },
        { date: '2025-03-20', value: 62 },
        { date: '2025-03-25', value: 64 },
        { date: '2025-03-30', value: 66 },
      ]
    }
  }
  
  // Get filtered data based on time period
  const getFilteredData = (data: typeof studentData, filter: TimeFilterType) => {
    const now = new Date()
    let cutoffDate = new Date()
    
    if (filter === 'week') {
      cutoffDate.setDate(now.getDate() - 7)
    } else if (filter === 'month') {
      cutoffDate.setMonth(now.getMonth() - 1)
    } else if (filter === 'year') {
      cutoffDate.setFullYear(now.getFullYear() - 1)
    } else {
      // 'all' - return everything
      return data
    }
    
    const cutoffStr = cutoffDate.toISOString().split('T')[0]
    
    return {
      accuracy: data.accuracy.filter(item => item.date >= cutoffStr),
      speed: data.speed.filter(item => item.date >= cutoffStr)
    }
  }
  
  // Get benchmark data filtered by time period
  const getFilteredBenchmark = (data: typeof benchmarkData, filter: TimeFilterType) => {
    const now = new Date()
    let cutoffDate = new Date()
    
    if (filter === 'week') {
      cutoffDate.setDate(now.getDate() - 7)
    } else if (filter === 'month') {
      cutoffDate.setMonth(now.getMonth() - 1)
    } else if (filter === 'year') {
      cutoffDate.setFullYear(now.getFullYear() - 1)
    } else {
      // 'all' - return everything
      return data
    }
    
    const cutoffStr = cutoffDate.toISOString().split('T')[0]
    
    return {
      accuracy: {
        upper: data.accuracy.upper.filter(item => item.date >= cutoffStr),
        lower: data.accuracy.lower.filter(item => item.date >= cutoffStr)
      },
      speed: {
        upper: data.speed.upper.filter(item => item.date >= cutoffStr),
        lower: data.speed.lower.filter(item => item.date >= cutoffStr)
      }
    }
  }
  
  // Get data for the current time filter
  const filteredStudentData = getFilteredData(studentData, timeFilter)
  const filteredBenchmarkData = getFilteredBenchmark(benchmarkData, timeFilter)
  
  // Calculate average performance statistics
  const getAveragePerformance = (data: typeof filteredStudentData) => {
    const avgAccuracy = data.accuracy.reduce((sum, item) => sum + item.value, 0) / data.accuracy.length
    const avgSpeed = data.speed.reduce((sum, item) => sum + item.value, 0) / data.speed.length
    
    return {
      accuracy: avgAccuracy.toFixed(1),
      speed: avgSpeed.toFixed(1)
    }
  }
  
  const averagePerformance = getAveragePerformance(filteredStudentData)
  
  // Calculate performance trends
  const getPerformanceTrend = (data: typeof filteredStudentData) => {
    if (data.accuracy.length < 2) return { accuracy: '0', speed: '0' }
    
    const firstAccuracy = data.accuracy[0].value
    const lastAccuracy = data.accuracy[data.accuracy.length - 1].value
    const accuracyTrend = ((lastAccuracy - firstAccuracy) / firstAccuracy) * 100
    
    const firstSpeed = data.speed[0].value
    const lastSpeed = data.speed[data.speed.length - 1].value
    const speedTrend = ((lastSpeed - firstSpeed) / firstSpeed) * 100
    
    return {
      accuracy: accuracyTrend.toFixed(1),
      speed: speedTrend.toFixed(1)
    }
  }
  
  const performanceTrend = getPerformanceTrend(filteredStudentData)
  
  // Format trend with + or - sign
  const formatTrend = (value: string) => {
    const num = parseFloat(value)
    if (num > 0) return `+${value}%`
    if (num < 0) return `${value}%`
    return '0%'
  }
  
  // Define point positions for the SVG graph (convert data to coordinates)
  const getPointsPositions = (data: { date: string, value: number }[], min: number, max: number, width: number, height: number) => {
    if (data.length === 0) return []
    
    // Normalize dates to position on x-axis
    const dates = data.map(d => new Date(d.date).getTime())
    const minDate = Math.min(...dates)
    const maxDate = Math.max(...dates)
    const dateRange = maxDate - minDate || 1 // Avoid division by zero
    
    // Create points
    return data.map((item, index) => {
      const x = ((new Date(item.date).getTime() - minDate) / dateRange) * width
      const y = height - ((item.value - min) / (max - min || 1)) * height
      return { x, y }
    })
  }
  
  // Calculate min and max values for Y axis scaling
  const getMinMaxValues = (studentData: typeof filteredStudentData, benchmarkData: typeof filteredBenchmarkData, metric: 'accuracy' | 'speed') => {
    const allValues = [
      ...studentData[metric].map(d => d.value),
      ...benchmarkData[metric].upper.map(d => d.value),
      ...benchmarkData[metric].lower.map(d => d.value)
    ]
    
    // Add some padding to the min/max
    const min = Math.max(0, Math.floor(Math.min(...allValues) * 0.95))
    const max = Math.min(100, Math.ceil(Math.max(...allValues) * 1.05))
    
    return { min, max }
  }
  
  // Get accuracy chart data
  const accuracyMinMax = getMinMaxValues(filteredStudentData, filteredBenchmarkData, 'accuracy')
  const accuracyPoints = getPointsPositions(
    filteredStudentData.accuracy,
    accuracyMinMax.min,
    accuracyMinMax.max,
    800, // width
    200  // height
  )
  const accuracyUpperPoints = getPointsPositions(
    filteredBenchmarkData.accuracy.upper,
    accuracyMinMax.min,
    accuracyMinMax.max,
    800,
    200
  )
  const accuracyLowerPoints = getPointsPositions(
    filteredBenchmarkData.accuracy.lower,
    accuracyMinMax.min,
    accuracyMinMax.max,
    800,
    200
  )
  
  // Get speed chart data
  const speedMinMax = getMinMaxValues(filteredStudentData, filteredBenchmarkData, 'speed')
  const speedPoints = getPointsPositions(
    filteredStudentData.speed,
    speedMinMax.min,
    speedMinMax.max,
    800,
    200
  )
  const speedUpperPoints = getPointsPositions(
    filteredBenchmarkData.speed.upper,
    speedMinMax.min,
    speedMinMax.max,
    800,
    200
  )
  const speedLowerPoints = getPointsPositions(
    filteredBenchmarkData.speed.lower,
    speedMinMax.min,
    speedMinMax.max,
    800,
    200
  )
  
  // Generate SVG path for student performance lines
  const generateLinePath = (points: { x: number, y: number }[]) => {
    if (points.length === 0) return ''
    
    return points.reduce((path, point, i) => {
      return path + (i === 0 ? `M ${point.x},${point.y}` : ` L ${point.x},${point.y}`)
    }, '')
  }
  
  // Generate SVG path for benchmark area
  const generateAreaPath = (upper: { x: number, y: number }[], lower: { x: number, y: number }[]) => {
    if (upper.length === 0 || lower.length === 0) return ''
    
    const upperPath = upper.reduce((path, point, i) => {
      return path + (i === 0 ? `M ${point.x},${point.y}` : ` L ${point.x},${point.y}`)
    }, '')
    
    // Add lower points in reverse order to create a closed shape
    const lowerPathReversed = [...lower].reverse().reduce((path, point, i) => {
      return path + ` L ${point.x},${point.y}`
    }, '')
    
    return upperPath + lowerPathReversed + ' Z'
  }
  
  return (
    <div className="mb-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Performance Insights
          </h3>
          
          {/* Time period selector */}
          <div className="flex rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 p-1">
            <button
              onClick={() => setTimeFilter('week')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                timeFilter === 'week'
                  ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeFilter('month')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                timeFilter === 'month'
                  ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeFilter('year')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                timeFilter === 'year'
                  ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              This Year
            </button>
            <button
              onClick={() => setTimeFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                timeFilter === 'all'
                  ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              All Time
            </button>
          </div>
        </div>
        
        {/* Performance metrics summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/30 rounded-lg p-4 border border-blue-100 dark:border-blue-800/30 shadow-sm">
            <div className="text-sm text-blue-600 dark:text-blue-300 font-medium mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Average Accuracy
            </div>
            <div className="flex items-end">
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">{averagePerformance.accuracy}%</div>
              <div className={`ml-2 text-xs font-medium ${
                parseFloat(performanceTrend.accuracy) > 0 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : parseFloat(performanceTrend.accuracy) < 0 
                    ? 'text-rose-600 dark:text-rose-400' 
                    : 'text-slate-600 dark:text-slate-400'
              }`}>
                {formatTrend(performanceTrend.accuracy)}
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/30 rounded-lg p-4 border border-violet-100 dark:border-violet-800/30 shadow-sm">
            <div className="text-sm text-violet-600 dark:text-violet-300 font-medium mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Average Speed
            </div>
            <div className="flex items-end">
              <div className="text-2xl font-bold text-violet-800 dark:text-violet-200">{averagePerformance.speed}</div>
              <div className={`ml-2 text-xs font-medium ${
                parseFloat(performanceTrend.speed) > 0 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : parseFloat(performanceTrend.speed) < 0 
                    ? 'text-rose-600 dark:text-rose-400' 
                    : 'text-slate-600 dark:text-slate-400'
              }`}>
                {formatTrend(performanceTrend.speed)}
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/30 rounded-lg p-4 border border-emerald-100 dark:border-emerald-800/30 shadow-sm">
            <div className="text-sm text-emerald-600 dark:text-emerald-300 font-medium mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              Total Questions
            </div>
            <div className="flex items-end">
              <div className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">248</div>
              <div className="ml-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                +12%
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/30 rounded-lg p-4 border border-amber-100 dark:border-amber-800/30 shadow-sm">
            <div className="text-sm text-amber-600 dark:text-amber-300 font-medium mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
              Study Streaks
            </div>
            <div className="flex items-end">
              <div className="text-2xl font-bold text-amber-800 dark:text-amber-200">14</div>
              <div className="ml-2 text-xs font-medium text-amber-600 dark:text-amber-400">
                days
              </div>
            </div>
          </div>
        </div>
        
        {/* Accuracy Chart */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-semibold text-slate-800 dark:text-slate-300">Accuracy Performance</h4>
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 space-x-4">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full mr-1.5 bg-blue-500"></span>
                Your Performance
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full mr-1.5 bg-blue-200/70 dark:bg-blue-700/40"></span>
                Peer Benchmark
              </div>
            </div>
          </div>
          
          <div className="relative h-[250px] w-full overflow-hidden">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-slate-500 dark:text-slate-400 py-2">
              <span>{accuracyMinMax.max}%</span>
              <span>{Math.round((accuracyMinMax.min + accuracyMinMax.max) / 2)}%</span>
              <span>{accuracyMinMax.min}%</span>
            </div>
            
            {/* Chart area */}
            <div className="absolute left-10 right-0 top-0 bottom-0">
              {/* X-axis grid lines */}
              <div className="absolute inset-0 grid grid-cols-6 gap-0">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="border-l border-slate-200 dark:border-slate-700 h-full"></div>
                ))}
              </div>
              
              {/* Y-axis grid lines */}
              <div className="absolute inset-0 grid grid-rows-4 gap-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="border-b border-slate-200 dark:border-slate-700 w-full"></div>
                ))}
              </div>
              
              {/* SVG for the actual chart */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                {/* Benchmark area */}
                <path
                  d={generateAreaPath(accuracyUpperPoints, accuracyLowerPoints)}
                  fill="rgba(96, 165, 250, 0.15)"
                  stroke="none"
                />
                
                {/* Benchmark upper line */}
                <path
                  d={generateLinePath(accuracyUpperPoints)}
                  fill="none"
                  stroke="rgba(96, 165, 250, 0.4)"
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                />
                
                {/* Benchmark lower line */}
                <path
                  d={generateLinePath(accuracyLowerPoints)}
                  fill="none"
                  stroke="rgba(96, 165, 250, 0.4)"
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                />
                
                {/* Student performance line */}
                <path
                  d={generateLinePath(accuracyPoints)}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Data points */}
                {accuracyPoints.map((point, i) => (
                  <circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="white"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                ))}
              </svg>
            </div>
          </div>
          
          {/* X-axis labels */}
          <div className="flex justify-between px-10 mt-2 text-xs text-slate-500 dark:text-slate-400">
            {filteredStudentData.accuracy.map(item => (
              <span key={item.date}>
                {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            ))}
          </div>
        </div>
        
        {/* Speed Chart */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-semibold text-slate-800 dark:text-slate-300">Speed Performance</h4>
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 space-x-4">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full mr-1.5 bg-purple-500"></span>
                Your Performance
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full mr-1.5 bg-purple-200/70 dark:bg-purple-700/40"></span>
                Peer Benchmark
              </div>
            </div>
          </div>
          
          <div className="relative h-[250px] w-full overflow-hidden">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-slate-500 dark:text-slate-400 py-2">
              <span>{speedMinMax.max}</span>
              <span>{Math.round((speedMinMax.min + speedMinMax.max) / 2)}</span>
              <span>{speedMinMax.min}</span>
            </div>
            
            {/* Chart area */}
            <div className="absolute left-10 right-0 top-0 bottom-0">
              {/* X-axis grid lines */}
              <div className="absolute inset-0 grid grid-cols-6 gap-0">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="border-l border-slate-200 dark:border-slate-700
