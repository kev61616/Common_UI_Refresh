'use client';

import React, { useState, useMemo } from 'react';
import { SetViewProps } from './types';

// A correlation matrix visualization for practice set data
export function CorrelationMatrixView({ practiceSets, onSelectSet, selectedSetId, isLoading }: SetViewProps) {
  const [focusedCell, setFocusedCell] = useState<string | null>(null);
  const [focusedSet, setFocusedSet] = useState<string | null>(null);
  const [metricFilter, setMetricFilter] = useState<string | null>(null);

  // Define metrics for the correlation matrix
  const metrics = [
  { id: 'accuracy', name: 'Accuracy', format: (val: number) => `${val}%` },
  { id: 'recency', name: 'Recency', format: (val: number) => `${val.toFixed(1)}d` },
  { id: 'pace', name: 'Pace', format: (val: number) => val >= 2 ? 'Slow' : val >= 1 ? 'Moderate' : 'Fast' },
  { id: 'size', name: 'Size', format: (val: number) => `${val}q` }];


  // Process sets with normalized values for each metric - moved before any conditional returns
  const processedSets = useMemo(() => {
    // If no practice sets, return empty array to avoid processing errors
    if (!practiceSets || practiceSets.length === 0) {
      return [];
    }

    // Get oldest date for recency calculation
    const today = new Date();
    const oldestDate = new Date(Math.min(
      ...practiceSets.map((set) => new Date(set.dateCompleted).getTime())
    ));

    // Maximum age in days
    const maxAgeDays = (today.getTime() - oldestDate.getTime()) / (1000 * 60 * 60 * 24);

    return practiceSets.map((set) => {
      // Calculate recency (days since completion, normalized)
      const completionDate = new Date(set.dateCompleted);
      const ageInDays = (today.getTime() - completionDate.getTime()) / (1000 * 60 * 60 * 24);
      const recency = maxAgeDays === 0 ? 1 : 1 - ageInDays / maxAgeDays;

      // Convert pace to numeric value
      let paceValue = 0;
      if (set.pace === 'Fast') paceValue = 0;else
      if (set.pace === 'Moderate') paceValue = 1;else
      if (set.pace === 'Slow') paceValue = 2;

      // Normalize pace (0-1)
      const normalizedPace = paceValue / 2;

      // Estimate set size based on type
      let sizeEstimate = 20; // default
      if (set.type.includes('Short')) sizeEstimate = 10;else
      if (set.type.includes('Full')) sizeEstimate = 30;

      // Normalize size (0-1) assuming 30 questions max
      const normalizedSize = sizeEstimate / 30;

      // Normalize accuracy (0-1)
      const normalizedAccuracy = set.accuracy / 100;

      return {
        ...set,
        metrics: {
          accuracy: normalizedAccuracy,
          recency: recency,
          pace: normalizedPace,
          size: normalizedSize
        },
        rawMetrics: {
          accuracy: set.accuracy,
          recency: ageInDays,
          pace: paceValue,
          size: sizeEstimate
        }
      };
    });
  }, [practiceSets]);

  // Calculate correlations between metrics - moved before any conditional returns
  const correlationData = useMemo(() => {
    const result: Record<string, Record<string, number>> = {};

    // Initialize correlation matrix
    metrics.forEach((metric1) => {
      result[metric1.id] = {};
      metrics.forEach((metric2) => {
        result[metric1.id][metric2.id] = 0;
      });
    });

    // If no processed sets, return initialized matrix with zeros
    if (processedSets.length === 0) {
      return result;
    }

    // For each pair of metrics, calculate the correlation
    metrics.forEach((metric1) => {
      metrics.forEach((metric2) => {
        if (metric1.id === metric2.id) {
          // Perfect correlation with self
          result[metric1.id][metric2.id] = 1;
          return;
        }

        // Get values for both metrics
        const values1 = processedSets.map((set) => set.metrics[metric1.id as keyof typeof set.metrics] as number);
        const values2 = processedSets.map((set) => set.metrics[metric2.id as keyof typeof set.metrics] as number);

        // Calculate means
        const mean1 = values1.reduce((a, b) => a + b, 0) / values1.length;
        const mean2 = values2.reduce((a, b) => a + b, 0) / values2.length;

        // Calculate correlation
        let numerator = 0;
        let denominator1 = 0;
        let denominator2 = 0;

        for (let i = 0; i < values1.length; i++) {
          const diff1 = values1[i] - mean1;
          const diff2 = values2[i] - mean2;
          numerator += diff1 * diff2;
          denominator1 += diff1 * diff1;
          denominator2 += diff2 * diff2;
        }

        const correlation = denominator1 === 0 || denominator2 === 0 ?
        0 :
        numerator / Math.sqrt(denominator1 * denominator2);

        result[metric1.id][metric2.id] = correlation;
        result[metric2.id][metric1.id] = correlation; // Matrix is symmetric
      });
    });

    return result;
  }, [processedSets, metrics]);

  // If loading or no practice sets, show empty state (moved after all hooks)
  if (isLoading || practiceSets.length === 0) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 text-center shadow-sm" data-oid="b20w18e">
        <h3 className="text-xl font-bold mb-6" data-oid="b8mtdvr">Correlation Matrix View</h3>
        <div className="p-8 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl" data-oid="y-8eb58">
          {isLoading ?
          <p data-oid="1fwqfot">Loading practice sets...</p> :

          <>
              <p className="mb-4" data-oid="_fwvcgb">No practice sets found.</p>
              <p data-oid="727jjxo">Complete some practice sets to see your data here.</p>
            </>
          }
        </div>
      </div>);

  }

  // Get color based on correlation strength
  const getCorrelationColor = (value: number) => {
    const absValue = Math.abs(value);

    // Choose color based on correlation direction and strength
    if (value > 0) {
      // Positive correlation - blue scale
      if (absValue >= 0.8) return 'bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-200';
      if (absValue >= 0.6) return 'bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      if (absValue >= 0.4) return 'bg-blue-50/70 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
      if (absValue >= 0.2) return 'bg-blue-50/50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400';
      return 'bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400';
    } else {
      // Negative correlation - red scale
      if (absValue >= 0.8) return 'bg-red-100 dark:bg-red-900/40 text-red-900 dark:text-red-200';
      if (absValue >= 0.6) return 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      if (absValue >= 0.4) return 'bg-red-50/70 dark:bg-red-900/20 text-red-700 dark:text-red-400';
      if (absValue >= 0.2) return 'bg-red-50/50 dark:bg-red-900/10 text-red-600 dark:text-red-400';
      return 'bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400';
    }
  };

  // Generate color for a set based on its metrics
  const getSetColor = (set: any, metric: string) => {
    const value = set.metrics[metric as keyof typeof set.metrics] as number;

    // Color scales for each metric
    switch (metric) {
      case 'accuracy':
        if (value >= 0.9) return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200';
        if (value >= 0.75) return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
        if (value >= 0.6) return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';

      case 'recency':
        if (value >= 0.9) return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200';
        if (value >= 0.7) return 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300';
        if (value >= 0.4) return 'bg-slate-100 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200';
        return 'bg-slate-200 dark:bg-slate-800/80 text-slate-800 dark:text-slate-300';

      case 'pace':
        if (value <= 0.3) return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200'; // Fast
        if (value <= 0.6) return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'; // Moderate
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200'; // Slow

      case 'size':
        if (value >= 0.8) return 'bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200'; // Large
        if (value >= 0.5) return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200'; // Medium
        return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200'; // Small

      default:
        return 'bg-gray-100 dark:bg-gray-800/60 text-gray-800 dark:text-gray-200';
    }
  };

  // Get subject color for badge
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Math':
        return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300';
      case 'Reading':
        return 'bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-300';
      case 'Writing':
        return 'bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };

  // Format correlation value for display
  const formatCorrelation = (value: number) => {
    return (value >= 0 ? '+' : '') + value.toFixed(2);
  };

  // Get sets for the selected metrics filter
  const filteredSets = metricFilter ?
  processedSets.sort((a, b) => {
    const aValue = a.metrics[metricFilter as keyof typeof a.metrics] as number;
    const bValue = b.metrics[metricFilter as keyof typeof b.metrics] as number;
    return bValue - aValue; // Sort descending
  }) :
  processedSets;

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="eq3r7r1">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="o1t7ew7">Correlation Matrix View</h3>
      
      {/* Explanation */}
      <div className="mb-6 text-sm text-slate-600 dark:text-slate-400 text-center max-w-2xl mx-auto" data-oid="_1a_-.e">
        <p data-oid="km8009z">This view shows relationships between different metrics. Blue indicates positive correlation 
        (variables move together), while red indicates negative correlation (variables move in opposite directions).</p>
      </div>
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-oid="55g11-y">
        {/* Correlation Matrix */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow" data-oid="9p6nc9t">
          <h4 className="font-bold text-lg mb-4" data-oid="2h-ukit">Metric Correlations</h4>
          
          <div className="overflow-x-auto" data-oid="h5iu0it">
            <table className="min-w-full border-collapse" data-oid="e8.m81j">
              <thead data-oid="ih-rebp">
                <tr data-oid="dess1c2">
                  <th className="p-2 bg-slate-50 dark:bg-slate-800 text-left" data-oid="x7h9sg4"></th>
                  {metrics.map((metric) =>
                  <th
                    key={metric.id}
                    className="p-2 bg-slate-50 dark:bg-slate-800 font-medium text-sm text-slate-500 dark:text-slate-400" data-oid="f:vp3no">

                      {metric.name}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody data-oid="74f0ax:">
                {metrics.map((metric1) =>
                <tr key={metric1.id} data-oid="rkb.f2q">
                    <td className="p-2 bg-slate-50 dark:bg-slate-800 font-medium text-sm text-slate-500 dark:text-slate-400" data-oid="0fc94c:">
                      {metric1.name}
                    </td>
                    {metrics.map((metric2) => {
                    const correlation = correlationData[metric1.id][metric2.id];
                    const cellKey = `${metric1.id}-${metric2.id}`;
                    const isHighlighted = focusedCell === cellKey;

                    return (
                      <td
                        key={cellKey}
                        className={`p-2 text-center transition-colors ${getCorrelationColor(correlation)} ${
                        isHighlighted ? 'ring-2 ring-inset ring-indigo-500 dark:ring-indigo-400' : ''} ${
                        metric1.id === metric2.id ? 'font-bold' : ''} cursor-pointer`}
                        onMouseEnter={() => setFocusedCell(cellKey)}
                        onMouseLeave={() => setFocusedCell(null)}
                        onClick={() => {
                          if (metric1.id !== metric2.id) {
                            setMetricFilter(metricFilter === metric1.id ? null : metric1.id);
                          }
                        }} data-oid="e5nhvl_">

                          {formatCorrelation(correlation)}
                        </td>);

                  })}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Selected Cell Info */}
          {focusedCell &&
          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm" data-oid="mt:ntt8">
              <div className="font-medium mb-1" data-oid="yds:4v6">Correlation Details</div>
              {(() => {
              const [metric1Id, metric2Id] = focusedCell.split('-');
              const metric1 = metrics.find((m) => m.id === metric1Id);
              const metric2 = metrics.find((m) => m.id === metric2Id);

              if (!metric1 || !metric2) return null;

              const correlation = correlationData[metric1Id][metric2Id];
              const absCorrelation = Math.abs(correlation);

              let interpretation = "";
              if (metric1Id === metric2Id) {
                interpretation = `${metric1.name} is perfectly correlated with itself.`;
              } else if (absCorrelation >= 0.8) {
                interpretation = `Very strong ${correlation > 0 ? 'positive' : 'negative'} relationship between ${metric1.name} and ${metric2.name}.`;
              } else if (absCorrelation >= 0.6) {
                interpretation = `Strong ${correlation > 0 ? 'positive' : 'negative'} relationship between ${metric1.name} and ${metric2.name}.`;
              } else if (absCorrelation >= 0.4) {
                interpretation = `Moderate ${correlation > 0 ? 'positive' : 'negative'} relationship between ${metric1.name} and ${metric2.name}.`;
              } else if (absCorrelation >= 0.2) {
                interpretation = `Weak ${correlation > 0 ? 'positive' : 'negative'} relationship between ${metric1.name} and ${metric2.name}.`;
              } else {
                interpretation = `Little to no relationship between ${metric1.name} and ${metric2.name}.`;
              }

              return (
                <p className="text-slate-600 dark:text-slate-300" data-oid="ll68c3c">
                    {interpretation} {correlation > 0 ?
                  'As one increases, the other tends to increase as well.' :
                  correlation < 0 ?
                  'As one increases, the other tends to decrease.' :
                  ''}
                  </p>);

            })()}
            </div>
          }
          
          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-xs" data-oid="5e_dezy">
            <div className="flex items-center" data-oid="qr-b0us">
              <div className="w-3 h-3 bg-blue-100 dark:bg-blue-900/40 mr-1" data-oid="4-jv_ld"></div>
              <span data-oid="wms83vp">Strong positive</span>
            </div>
            <div className="flex items-center" data-oid="dukt7u7">
              <div className="w-3 h-3 bg-blue-50/70 dark:bg-blue-900/20 mr-1" data-oid="u32gywi"></div>
              <span data-oid=".flnnbu">Weak positive</span>
            </div>
            <div className="flex items-center" data-oid="nvzv2m.">
              <div className="w-3 h-3 bg-slate-50 dark:bg-slate-800/50 mr-1" data-oid="1azyyei"></div>
              <span data-oid="9f97oo0">No correlation</span>
            </div>
            <div className="flex items-center" data-oid="0y5i3.t">
              <div className="w-3 h-3 bg-red-50/70 dark:bg-red-900/20 mr-1" data-oid="olak.vs"></div>
              <span data-oid="hnjdi:y">Weak negative</span>
            </div>
            <div className="flex items-center" data-oid="e-a3plp">
              <div className="w-3 h-3 bg-red-100 dark:bg-red-900/40 mr-1" data-oid="jle_k9v"></div>
              <span data-oid="fn_3reh">Strong negative</span>
            </div>
          </div>
        </div>
        
        {/* Practice Sets Panel */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow" data-oid=":9f:sqo">
          <div className="flex justify-between items-center mb-4" data-oid="a-.ms4w">
            <h4 className="font-bold text-lg" data-oid="4xve699">Practice Sets</h4>
            
            {/* Filter control */}
            <div className="flex gap-2" data-oid="xn:.lbq">
              <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="g4c9jmg">
                Sort by:
              </div>
              <select
                className="text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1"
                value={metricFilter || ''}
                onChange={(e) => setMetricFilter(e.target.value || null)} data-oid="pesntmq">

                <option value="" data-oid="_e:n03j">Default</option>
                {metrics.map((metric) =>
                <option key={metric.id} value={metric.id} data-oid="xapcmj-">{metric.name}</option>
                )}
              </select>
            </div>
          </div>
          
          {/* Practice set cards */}
          <div className="space-y-3 overflow-y-auto max-h-[450px] pr-1" data-oid="cowdt-k">
            {filteredSets.map((set) =>
            <div
              key={set.id}
              className={`border dark:border-slate-700 rounded-lg transition-colors p-3 cursor-pointer ${
              selectedSetId === set.id ?
              'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' :
              'hover:bg-slate-50 dark:hover:bg-slate-800/60'} ${
              focusedSet === set.id ? 'ring-2 ring-indigo-300 dark:ring-indigo-700' : ''}`}
              onClick={() => onSelectSet(set.id)}
              onMouseEnter={() => setFocusedSet(set.id)}
              onMouseLeave={() => setFocusedSet(null)} data-oid=":3dp5cu">

                <div className="flex justify-between items-start mb-2" data-oid="um94py1">
                  <div data-oid="fkil9gd">
                    <div className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${getSubjectColor(set.subject)}`} data-oid="d85h94h">
                      {set.subject}
                    </div>
                    <div className="font-medium mt-1" data-oid="sw4qrgv">{set.type}</div>
                  </div>
                  <div className="text-xl font-bold" data-oid="-fixhdd">
                    {set.accuracy}%
                  </div>
                </div>
                
                {/* Metrics grid */}
                <div className="grid grid-cols-2 gap-2 mt-3" data-oid="4drk41s">
                  {metrics.map((metric) =>
                <div
                  key={metric.id}
                  className={`px-2 py-1 rounded text-xs ${getSetColor(set, metric.id)} ${
                  metricFilter === metric.id ? 'ring-1 ring-inset ring-indigo-500 dark:ring-indigo-400' : ''}`
                  } data-oid="20amgra">

                      <div className="flex justify-between" data-oid=".obnvau">
                        <span data-oid="1mp00x_">{metric.name}:</span>
                        <span className="font-medium" data-oid=".ajpdfj">
                          {metric.format(set.rawMetrics[metric.id as keyof typeof set.rawMetrics] as number)}
                        </span>
                      </div>
                    </div>
                )}
                </div>
                
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-2" data-oid="m_dkxde">
                  {new Date(set.dateCompleted).toLocaleDateString()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}