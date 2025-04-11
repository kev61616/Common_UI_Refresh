'use client';

import React, { useState, useEffect } from 'react';
import { SetViewProps } from './types';

export function QuantumPhysicsView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Add wave animation effect
  const [wavePhase, setWavePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWavePhase((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  if (!practiceSets || practiceSets.length === 0) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="2rwzv_r">
        <h3 className="text-xl font-bold mb-6 text-center" data-oid="iih_n4b">55. Quantum Physics View</h3>
        <div className="p-8 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl" data-oid="0tx1pli">
          <p className="mb-4" data-oid="wyn4ejm">No practice sets available.</p>
          <p data-oid=".h1d:ge">Complete some sets to see this visualization.</p>
        </div>
      </div>);

  }

  // Filter sets based on active filter
  const filteredSets = activeFilter === 'all' ?
  practiceSets :
  practiceSets.filter((set) => set.subject === activeFilter);

  // Calculate position for each quantum particle using a grid-like layout
  const calculatePositions = (sets: typeof practiceSets) => {
    return sets.map((set, index) => {
      const row = Math.floor(index / 4);
      const col = index % 4;
      return {
        set,
        x: 25 + col * 180,
        y: 150 + row * 190,
        radius: 30 + set.accuracy / 100 * 20, // Size varies by accuracy
        energy: set.accuracy / 100 // Energy level based on accuracy
      };
    });
  };

  const particlesData = calculatePositions(filteredSets);

  // Generate wave pattern SVG path
  const generateWavePath = (x: number, y: number, radius: number, energy: number) => {
    const points = [];
    const pointCount = 12;
    const waveHeight = 10 + energy * 20;

    for (let i = 0; i <= pointCount; i++) {
      const angle = i / pointCount * Math.PI * 2;
      const waveOffset = Math.sin(angle * 3 + wavePhase / 15) * waveHeight;
      const distance = radius + waveOffset;
      const px = x + Math.cos(angle) * distance;
      const py = y + Math.sin(angle) * distance;

      if (i === 0) {
        points.push(`M ${px} ${py}`);
      } else {
        points.push(`L ${px} ${py}`);
      }
    }

    points.push('Z'); // Close the path
    return points.join(' ');
  };

  // Generate probability field gradient
  const generateGradientId = (setId: string) => `quantum-gradient-${setId.replace(/\W/g, '')}`;

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm overflow-hidden" data-oid="2tmvsex">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid=".fe4r8a">55. Quantum Physics View</h3>
      
      {/* Filters */}
      <div className="flex justify-center mb-6 space-x-4" data-oid="gu4lbfy">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
            ${activeFilter === 'all' ?
          'bg-indigo-500 text-white' :
          'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`} data-oid="tho2tgn">

          All Fields
        </button>
        <button
          onClick={() => setActiveFilter('Math')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
            ${activeFilter === 'Math' ?
          'bg-indigo-500 text-white' :
          'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`} data-oid="ti16z:_">

          Mathematics
        </button>
        <button
          onClick={() => setActiveFilter('Reading')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
            ${activeFilter === 'Reading' ?
          'bg-indigo-500 text-white' :
          'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`} data-oid="t574ua2">

          Reading
        </button>
        <button
          onClick={() => setActiveFilter('Writing')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
            ${activeFilter === 'Writing' ?
          'bg-indigo-500 text-white' :
          'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`} data-oid="fi0ywfq">

          Writing
        </button>
      </div>
      
      {/* Quantum visualization area */}
      <div className="relative bg-slate-900 dark:bg-black rounded-xl overflow-hidden min-h-[600px]" data-oid="q-y6f4z">
        {/* Quantum grid background - creates a subtle grid pattern */}
        <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)]" data-oid="-2q1dpb">
          {Array.from({ length: 400 }).map((_, i) =>
          <div
            key={i}
            className="border-[0.5px] border-indigo-500/5 dark:border-indigo-400/5" data-oid="n7j91y3" />

          )}
        </div>
        
        {/* SVG for quantum particles and waves */}
        <svg className="absolute inset-0 w-full h-full" data-oid="1of3uub">
          {/* Define gradients for each particle */}
          <defs data-oid="hiy53ke">
            {particlesData.map(({ set }) =>
            <radialGradient
              key={`gradient-${set.id}`}
              id={generateGradientId(set.id)}
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%" data-oid="fqgxviz">

                <stop
                offset="0%"
                stopColor={
                set.subject === 'Math' ? 'rgba(129, 140, 248, 0.8)' :
                set.subject === 'Reading' ? 'rgba(56, 189, 248, 0.8)' :
                'rgba(167, 139, 250, 0.8)'
                } data-oid="68teba5" />

                <stop
                offset="50%"
                stopColor={
                set.subject === 'Math' ? 'rgba(99, 102, 241, 0.4)' :
                set.subject === 'Reading' ? 'rgba(14, 165, 233, 0.4)' :
                'rgba(139, 92, 246, 0.4)'
                } data-oid="ohfr6fv" />

                <stop offset="100%" stopColor="rgba(30, 41, 59, 0)" data-oid="wco6gbq" />
              </radialGradient>
            )}
          </defs>
          
          {/* Probability fields (larger diffuse areas around particles) */}
          {particlesData.map(({ set, x, y, radius, energy }) =>
          <circle
            key={`field-${set.id}`}
            cx={x}
            cy={y}
            r={radius * 4}
            fill={`url(#${generateGradientId(set.id)})`}
            className="pointer-events-none" data-oid="kuok-1_" />

          )}
          
          {/* Wave patterns */}
          {particlesData.map(({ set, x, y, radius, energy }) =>
          <path
            key={`wave-${set.id}`}
            d={generateWavePath(x, y, radius * 1.8, energy)}
            fill="none"
            stroke={
            set.subject === 'Math' ? 'rgba(129, 140, 248, 0.7)' :
            set.subject === 'Reading' ? 'rgba(56, 189, 248, 0.7)' :
            'rgba(167, 139, 250, 0.7)'
            }
            strokeWidth="1.5"
            className="pointer-events-none" data-oid="k-0teeq" />

          )}
          
          {/* Connection lines between related particles (same subject) */}
          {particlesData.map(({ set: set1, x: x1, y: y1 }, index) => {
            // Connect to at most 2 other particles of the same subject to avoid too many lines
            return particlesData.
            filter((_, idx) => idx > index && idx <= index + 2 && particlesData[idx].set.subject === set1.subject).
            map(({ set: set2, x: x2, y: y2 }) =>
            <line
              key={`connection-${set1.id}-${set2.id}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={
              set1.subject === 'Math' ? 'rgba(129, 140, 248, 0.3)' :
              set1.subject === 'Reading' ? 'rgba(56, 189, 248, 0.3)' :
              'rgba(167, 139, 250, 0.3)'
              }
              strokeWidth="1"
              strokeDasharray="4 2"
              className="pointer-events-none" data-oid="cj2rl94" />

            );
          })}
        </svg>
        
        {/* Interactive quantum particles */}
        <div className="relative h-full" data-oid="maehw21">
          {particlesData.map(({ set, x, y, radius }) =>
          <div
            key={set.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300
                ${selectedSetId === set.id ? 'scale-110 z-50' : 'hover:scale-105 z-30'}`}
            style={{ left: `${x}px`, top: `${y}px` }}
            onClick={() => onSelectSet(set.id)} data-oid="u49ntoy">

              {/* Core particle */}
              <div
              className={`rounded-full flex items-center justify-center text-white font-bold text-sm
                  ${selectedSetId === set.id ? 'ring-2 ring-offset-1 ring-white/30' : ''}
                  ${set.subject === 'Math' ?
              'bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-lg shadow-indigo-500/30' :
              set.subject === 'Reading' ?
              'bg-gradient-to-r from-sky-600 to-sky-400 shadow-lg shadow-sky-500/30' :
              'bg-gradient-to-r from-violet-600 to-violet-400 shadow-lg shadow-violet-500/30'}`}
              style={{
                width: `${radius * 1.8}px`,
                height: `${radius * 1.8}px`
              }} data-oid="x2.2nqm">

                {set.accuracy}%
              </div>
              
              {/* Information on hover/select */}
              <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl p-3
                  transition-opacity duration-200 z-50
                  ${selectedSetId === set.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 pointer-events-none'}`} data-oid="oamse3.">

                <div className="text-sm font-bold truncate" data-oid="urllaff">{set.subject} - {set.type}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1" data-oid=":qhfcb-">
                  {new Date(set.dateCompleted).toLocaleDateString()}
                </div>
                
                {selectedSetId === set.id &&
              <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700" data-oid="vcfa2c7">
                    <div className="flex justify-between text-xs" data-oid=":aexu8d">
                      <span data-oid="7hbmdvc">Accuracy:</span>
                      <span data-oid=".gcew5g">{set.accuracy}%</span>
                    </div>
                    <div className="flex justify-between text-xs mt-1" data-oid="j:q22vx">
                      <span data-oid="391jb:p">Pace:</span>
                      <span data-oid="6xpz30s">{set.pace}</span>
                    </div>
                    <div className="flex justify-between text-xs mt-1" data-oid="9gkgscp">
                      <span data-oid="my_yltl">Energy level:</span>
                      <span data-oid=".gcflm-">{Math.round(set.accuracy / 10)}/10</span>
                    </div>
                  </div>
              }
              </div>
            </div>
          )}
        </div>
        
        {/* Quantum physics formulas as decorative elements */}
        <div className="absolute bottom-4 left-4 text-slate-500/30 dark:text-slate-400/20 font-mono text-xs" data-oid="ht-qbuc">
          E = hν
        </div>
        <div className="absolute top-4 right-4 text-slate-500/30 dark:text-slate-400/20 font-mono text-xs" data-oid="jw2xtax">
          Ψ(x) = Ae^ikx + Be^-ikx
        </div>
        <div className="absolute bottom-4 right-4 text-slate-500/30 dark:text-slate-400/20 font-mono text-xs" data-oid="8g2a-1q">
          ΔxΔp ≥ ℏ/2
        </div>
        
        {/* Information legend */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white text-sm" data-oid="xt5cles">
          <h4 className="font-bold text-xs uppercase tracking-wider mb-2 opacity-70" data-oid="m::x2i2">Quantum Properties</h4>
          <div className="space-y-1 text-xs" data-oid="0rl55xx">
            <div className="flex items-center gap-2" data-oid="j4om1-d">
              <div className="w-3 h-3 rounded-full bg-indigo-500" data-oid="hgpuox0"></div>
              <span data-oid="s.qotek">Mathematics Particles</span>
            </div>
            <div className="flex items-center gap-2" data-oid="ewgndji">
              <div className="w-3 h-3 rounded-full bg-sky-500" data-oid="qnn75gn"></div>
              <span data-oid="e_yk478">Reading Particles</span>
            </div>
            <div className="flex items-center gap-2" data-oid="t:x3.gs">
              <div className="w-3 h-3 rounded-full bg-violet-500" data-oid="m6o1631"></div>
              <span data-oid="tjkd7xl">Writing Particles</span>
            </div>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10" data-oid="3ci4lrj">
              <div className="w-5 h-[1px] bg-white/50" data-oid="ynvzgh4"></div>
              <span data-oid="3rnmsu0">Quantum Entanglement</span>
            </div>
            <div className="flex items-center gap-2" data-oid="zzli7n2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white/50" data-oid="v:ge:jp">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeOpacity="0.5" data-oid="_ovmtd:" />
                <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.5" data-oid="4dt960t" />
              </svg>
              <span data-oid="1x7cxnw">Probability Field</span>
            </div>
          </div>
        </div>
      </div>
    </div>);

}