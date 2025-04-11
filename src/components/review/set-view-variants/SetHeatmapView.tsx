'use client';

import React, { useState, useEffect } from 'react';
import { PracticeSet } from '@/lib/mockData';

interface SetViewProps {
  practiceSets: PracticeSet[];
  onSelectSet: (id: string) => void;
  selectedSetId: string | null;
}

/**
 * SetHeatmapView - A heatmap visualization for practice sets
 * 
 * Displays practice sets in a heatmap grid organized by subject and difficulty
 * with color-coding based on performance metrics
 */
export function SetHeatmapView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  // State for tracking which cell is selected for detailed view
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);

  // Build heatmap data for subject vs difficulty
  const buildHeatmapData = () => {
    // Get all unique subjects
    const subjects = ['Math', 'Reading', 'Writing'] as const;
    const difficulties = ['Easy', 'Medium', 'Hard'];

    // Build heatmap cells
    const cells = subjects.map((subject) => {
      const subjectSets = practiceSets.filter((set) => set.subject === subject);

      return {
        subject,
        totalCount: subjectSets.length,
        cells: difficulties.map((difficulty) => {
          const cellSets = subjectSets.filter((set) => set.difficulty === difficulty);
          const cellCount = cellSets.length;

          // Only calculate accuracy if there are sets
          const totalAccuracy = cellSets.reduce((sum, set) => sum + set.accuracy, 0);
          const accuracy = cellCount > 0 ? totalAccuracy / cellCount : 0;

          return {
            subject,
            difficulty,
            count: cellCount,
            accuracy,
            sets: cellSets,
            color: getHeatmapColor(accuracy, cellCount > 0)
          };
        })
      };
    });

    return {
      xAxis: difficulties,
      yAxis: subjects,
      cells
    };
  };

  // Generate color based on accuracy percentage
  const getHeatmapColor = (accuracy: number, hasData: boolean) => {
    if (!hasData) return 'bg-slate-100 dark:bg-slate-800/50';

    if (accuracy >= 90) return 'bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50';
    if (accuracy >= 80) return 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30';
    if (accuracy >= 70) return 'bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30';
    if (accuracy >= 60) return 'bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30';
    if (accuracy >= 50) return 'bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30';
    if (accuracy >= 40) return 'bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30';
    if (accuracy >= 30) return 'bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30';
    return 'bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50';
  };

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Format date to more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Get percentage formatted for display
  const formatPercentage = (value: number) => {
    return `${Math.round(value)}%`;
  };

  // Get cell border style based on selection
  const getCellBorderStyle = (subject: string, difficulty: string) => {
    if (selectedDimension === `${subject}-${difficulty}`) {
      return 'border-2 border-indigo-500 dark:border-indigo-400';
    }
    return 'border border-slate-200 dark:border-slate-700';
  };

  // Select a cell to view sets
  const selectCell = (subject: string, difficulty: string) => {
    const cellKey = `${subject}-${difficulty}`;
    setSelectedDimension(selectedDimension === cellKey ? null : cellKey);
  };

  // Get filtered sets for selected cell
  const getSelectedSets = () => {
    if (!selectedDimension) return [];

    const [subject, difficulty] = selectedDimension.split('-');

    return practiceSets.filter((set) =>
    set.subject === subject && set.difficulty === difficulty
    );
  };

  // Calculate statistics for the selected sets
  const getSelectedStats = (sets: PracticeSet[]) => {
    const totalCount = sets.length;
    if (totalCount === 0) return { avgAccuracy: 0, avgTime: 0, fastSets: 0, normalSets: 0, slowSets: 0 };

    const totalAccuracy = sets.reduce((sum, set) => sum + set.accuracy, 0);
    const avgAccuracy = totalAccuracy / totalCount;
    const avgTime = sets.reduce((sum, set) => sum + set.timeUsed, 0) / totalCount;

    const fastSets = sets.filter((set) => set.pace === 'Fast').length;
    const normalSets = sets.filter((set) => set.pace === 'Normal').length;
    const slowSets = sets.filter((set) => set.pace === 'Slow').length;

    return {
      avgAccuracy,
      avgTime,
      fastSets,
      normalSets,
      slowSets
    };
  };

  // Get subject icon
  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Math':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="dwrg4-q">
            <path d="M7 12L12 7L17 12L12 17L7 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-oid="l2wmwfr" />
          </svg>);

      case 'Reading':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="8:qa7kf">
            <path d="M4 4L6 6M6 6L8 8M6 6L8 4M6 6L4 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-oid="ti0cosz" />
            <path d="M10 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="ul5dz0x" />
            <path d="M4 16L20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="jbomw09" />
            <path d="M4 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="bsw33uc" />
            <path d="M10 20L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="7:h_:o9" />
          </svg>);

      case 'Writing':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="dnl.9oc">
            <path d="M8 18L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="m1bgr18" />
            <path d="M8 14L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="gkgvz:y" />
            <path d="M12 10L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="6:a.sb5" />
            <path d="M7 10C7 10.5523 6.55228 11 6 11C5.44772 11 5 10.5523 5 10C5 9.44772 5.44772 9 6 9C6.55228 9 7 9.44772 7 10Z" fill="currentColor" data-oid="2u5t8m3" />
            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" data-oid="3uzi6n-" />
          </svg>);

      default:
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="yil13pn">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" data-oid="he.qnv4" />
          </svg>);

    }
  };

  // Get color class based on accuracy
  const getAccuracyColorClass = (accuracy: number) => {
    if (accuracy >= 90) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
    if (accuracy >= 70) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
  };

  // Get color class based on pace
  const getPaceColorClass = (pace: string) => {
    if (pace === 'Fast') return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
    if (pace === 'Normal') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
    return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100';
  };

  const heatmapData = buildHeatmapData();
  const selectedSets = getSelectedSets();
  const selectedStats = getSelectedStats(selectedSets);

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm bg-white dark:bg-slate-800" data-oid="nz:hvty">
      <h3 className="text-xl font-bold mb-6 text-center text-slate-700 dark:text-slate-200" data-oid="77.u686">Practice Set Performance Heatmap</h3>
      
      {/* Heatmap grid */}
      <div className="max-w-3xl mx-auto overflow-x-auto mb-6" data-oid="pbdu6sy">
        <div className="min-w-[600px]" data-oid="6mqldvt">
          <div className="flex" data-oid="3tn3ime">
            {/* Y-axis label column */}
            <div className="w-36 pt-8 pr-3 text-right" data-oid="yk3bil_">
              <div className="font-medium text-slate-500 dark:text-slate-400 mb-2" data-oid="ya.fpz9">
                Subject
              </div>
            </div>
            
            {/* X-axis labels */}
            <div className="flex-1 grid grid-cols-3 gap-2 mb-2" data-oid="w.3ypou">
              {heatmapData.xAxis.map((label) =>
              <div key={label} className="h-8 flex items-center justify-center font-medium text-slate-500 dark:text-slate-400" data-oid="05u-71a">
                  {label}
                </div>
              )}
            </div>
          </div>
          
          {/* Heatmap rows */}
          <div className="space-y-2" data-oid="2pv4v:k">
            {heatmapData.cells.map((row) =>
            <div key={row.subject} className="flex" data-oid="h_xiss7">
                {/* Row label */}
                <div className="w-36 py-2 pr-3 text-right text-sm truncate flex items-center justify-end" data-oid="3hs3s4i">
                  <div data-oid="8:rtrtv">
                    <div className="font-medium" data-oid="87gh6uf">{row.subject}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="ub4.ubf">{row.totalCount} sets</div>
                  </div>
                </div>
                
                {/* Row cells */}
                <div className="flex-1 grid grid-cols-3 gap-2" data-oid="eqjfk8p">
                  {row.cells.map((cell) =>
                <div
                  key={`${cell.subject}-${cell.difficulty}`}
                  className={`h-16 rounded-md ${cell.color} ${getCellBorderStyle(cell.subject, cell.difficulty)} flex flex-col items-center justify-center p-1 cursor-pointer transition-colors`}
                  onClick={() => selectCell(cell.subject, cell.difficulty)} data-oid="wdi0_cv">

                      {cell.count > 0 ?
                  <>
                          <div className="font-semibold text-lg" data-oid="jxf93_g">
                            {formatPercentage(cell.accuracy)}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="fwx8_a1">
                            {cell.count} sets
                          </div>
                        </> :

                  <div className="text-xs text-slate-400 dark:text-slate-500" data-oid="mjswv0_">No data</div>
                  }
                    </div>
                )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center items-center mb-8 text-xs space-x-2" data-oid="_tr_tc_">
        <div className="font-medium text-slate-500 dark:text-slate-400 mr-1" data-oid="jko4kz:">Accuracy:</div>
        <div className="flex items-center" data-oid="haqx8x_">
          <div className="w-4 h-4 bg-red-100 dark:bg-red-900/30 rounded-sm" data-oid="m7az-7o"></div>
          <span className="ml-1" data-oid="a4.cj0.">0-40%</span>
        </div>
        <div className="flex items-center" data-oid="m6i8pb3">
          <div className="w-4 h-4 bg-amber-50 dark:bg-amber-900/20 rounded-sm" data-oid="4eq:vys"></div>
          <span className="ml-1" data-oid="zdp831f">40-70%</span>
        </div>
        <div className="flex items-center" data-oid="3:6fbmx">
          <div className="w-4 h-4 bg-green-100 dark:bg-green-900/30 rounded-sm" data-oid="wn2zw_:"></div>
          <span className="ml-1" data-oid="-btob5c">70-100%</span>
        </div>
      </div>
      
      {/* Selected cell details */}
      {selectedDimension && selectedSets.length > 0 &&
      <div className="mt-8 p-6 bg-white dark:bg-slate-800/95 rounded-lg border border-slate-200 dark:border-slate-700 max-w-3xl mx-auto shadow-md" data-oid="i0bghld">
          <h4 className="font-semibold mb-4 text-lg text-slate-700 dark:text-slate-200" data-oid="_-x1rn4">
            {selectedDimension.split('-')[0]} • {selectedDimension.split('-')[1]} Difficulty Sets
          </h4>
          
          {/* Stats summary */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6" data-oid="yiafd0g">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700" data-oid="dn2gm7-">
              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="6_qplvr">Total Sets</div>
              <div className="text-xl font-semibold text-slate-700 dark:text-slate-200" data-oid="aq5g0m4">{selectedSets.length}</div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800" data-oid="h0f:b8o">
              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="oy3qaio">Avg. Accuracy</div>
              <div className="text-xl font-semibold text-blue-600 dark:text-blue-400" data-oid="ijrx1po">{Math.round(selectedStats.avgAccuracy)}%</div>
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800" data-oid="y96b412">
              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="jayxjc3">Avg. Time</div>
              <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-400" data-oid="79qiwbu">{formatTime(Math.round(selectedStats.avgTime))}</div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800" data-oid="ula2769">
              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="_0elf:1">Fast Sets</div>
              <div className="text-xl font-semibold text-green-600 dark:text-green-400" data-oid=".qowg5z">{selectedStats.fastSets}</div>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800" data-oid="kgeq24v">
              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="r6r_6:m">Slow Sets</div>
              <div className="text-xl font-semibold text-amber-600 dark:text-amber-400" data-oid="c:nlw10">{selectedStats.slowSets}</div>
            </div>
          </div>
          
          {/* Sets list */}
          <h5 className="font-medium mb-3 text-sm text-slate-600 dark:text-slate-300" data-oid="ttbfpo9">Practice Sets</h5>
          <div className="max-h-[350px] overflow-y-auto pr-1 space-y-3" data-oid="m:89evy">
            {selectedSets.map((set) =>
          <div
            key={set.id}
            onClick={() => onSelectSet(set.id)}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
            selectedSetId === set.id ?
            'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 shadow-md' :
            'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700/50'}`
            } data-oid="plki92u">

                <div className="flex flex-col md:flex-row md:items-center gap-4" data-oid="styqqv1">
                  {/* Subject and Type */}
                  <div className="flex items-center gap-3 md:w-1/4" data-oid="1t5f1f-">
                    <div className={`p-2 rounded-full ${set.subject === 'Math' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100' :
                set.subject === 'Reading' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100' :
                'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100'}`} data-oid="n7k:8zx">
                      {getSubjectIcon(set.subject)}
                    </div>
                    <div data-oid="sr75gg6">
                      <div className="font-medium text-slate-900 dark:text-white" data-oid="xu_kof2">{set.subject}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="43-mwgu">{set.type}</div>
                    </div>
                  </div>
                  
                  {/* Accuracy and Time */}
                  <div className="flex items-center gap-2 md:gap-6 md:w-1/2" data-oid="6v_za.-">
                    <div data-oid="2l3u1.e">
                      <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="r177s7s">Accuracy</div>
                      <div className={`inline-block px-2 py-0.5 rounded-full text-sm font-medium ${getAccuracyColorClass(set.accuracy)}`} data-oid="4vbf:qc">
                        {set.accuracy}%
                      </div>
                    </div>
                    
                    <div data-oid="na9jzrr">
                      <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="enrjhs9">Time Used</div>
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300" data-oid="_dcq3.7">
                        {formatTime(set.timeUsed)}
                      </div>
                    </div>
                    
                    <div data-oid="skglas7">
                      <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="clny9n4">Pace</div>
                      <div className={`inline-block px-2 py-0.5 rounded-full text-sm font-medium ${getPaceColorClass(set.pace)}`} data-oid=":g9zb:n">
                        {set.pace}
                      </div>
                    </div>
                  </div>
                  
                  {/* Date */}
                  <div className="flex items-center justify-between md:w-1/4" data-oid=".311pq.">
                    <div data-oid="6ltbd6z">
                      <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="n3bgy4t">Completed</div>
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300" data-oid="xduh8.s">
                        {formatDate(set.dateCompleted)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          )}
          </div>
        </div>
      }
    </div>);

}