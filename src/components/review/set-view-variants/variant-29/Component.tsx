'use client';

import React, { useState, useEffect } from 'react';
import { SetViewProps } from '../types';

/**
 * Holographic Projection View
 * 
 * A futuristic data-driven visualization that represents practice sets as holographic 3D projections with:
 * - Floating holographic panels displaying set data
 * - Data layers that separate by difficulty and subject
 * - Interactive hover effects with detailed metrics that "project" from the base display
 * - Glowing intensity indicating performance level
 * - Projection stability reflecting recency of practice
 * 
 * Primary insight objective: To answer "What patterns exist across performance, difficulty, and study focus areas?"
 * 
 * Data-to-visual mapping:
 * - Panel position → Subject/difficulty categorization (spatial organization by property)
 * - Hologram color → Subject category (visual distinction between knowledge domains)
 * - Glow intensity → Accuracy (brightness correlates with performance)
 * - Hologram size → Question count (visual weight maps to content volume)
 * - Projection stability → Recency (newer content appears more stable)
 * 
 * This visualization enables users to:
 * 1. Identify performance patterns across subjects and difficulty levels (color/position matrix)
 * 2. Compare investment across different areas (hologram size variations) 
 * 3. Spot temporal patterns in study habits (stability patterns)
 * 4. Identify strongest and weakest performance areas (brightness patterns)
 */
export function Component({ practiceSets, selectedSetId, onSelectSet }: SetViewProps) {
  const [hoveredSet, setHoveredSet] = useState<string | null>(null);
  const [floatingOffsets, setFloatingOffsets] = useState<Record<string, {x: number;y: number;}>>({});

  // Group sets by difficulty level
  const setsByDifficulty: Record<string, typeof practiceSets> = {
    'Easy': [],
    'Medium': [],
    'Hard': []
  };

  practiceSets.forEach((set) => {
    setsByDifficulty[set.difficulty].push(set);
  });

  // Setup floating animation offsets on component mount
  useEffect(() => {
    const offsets: Record<string, {x: number;y: number;}> = {};

    practiceSets.forEach((set) => {
      // Random small floating offsets for each set
      offsets[set.id] = {
        x: Math.random() * 3 - 1.5, // -1.5 to 1.5
        y: Math.random() * 3 - 1.5 // -1.5 to 1.5
      };
    });

    setFloatingOffsets(offsets);
  }, [practiceSets]);

  // Helper function to get color based on subject
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Math':return {
          base: 'bg-blue-500/10 dark:bg-blue-700/20',
          border: 'border-blue-400/30 dark:border-blue-500/40',
          glow: 'shadow-blue-400/40 dark:shadow-blue-600/40',
          text: 'text-blue-600 dark:text-blue-300',
          gradient: 'from-blue-400 to-cyan-300 dark:from-blue-500 dark:to-cyan-400'
        };
      case 'Reading':return {
          base: 'bg-purple-500/10 dark:bg-purple-700/20',
          border: 'border-purple-400/30 dark:border-purple-500/40',
          glow: 'shadow-purple-400/40 dark:shadow-purple-600/40',
          text: 'text-purple-600 dark:text-purple-300',
          gradient: 'from-purple-400 to-fuchsia-300 dark:from-purple-500 dark:to-fuchsia-400'
        };
      case 'Writing':return {
          base: 'bg-emerald-500/10 dark:bg-emerald-700/20',
          border: 'border-emerald-400/30 dark:border-emerald-500/40',
          glow: 'shadow-emerald-400/40 dark:shadow-emerald-600/40',
          text: 'text-emerald-600 dark:text-emerald-300',
          gradient: 'from-emerald-400 to-teal-300 dark:from-emerald-500 dark:to-teal-400'
        };
      default:return {
          base: 'bg-gray-500/10 dark:bg-gray-700/20',
          border: 'border-gray-400/30 dark:border-gray-500/40',
          glow: 'shadow-gray-400/40 dark:shadow-gray-600/40',
          text: 'text-gray-600 dark:text-gray-300',
          gradient: 'from-gray-400 to-slate-300 dark:from-gray-500 dark:to-slate-400'
        };
    }
  };

  // Helper function to calculate hologram size based on question count
  const calculateHologramSize = (questionCount: number) => {
    const maxQuestions = Math.max(...practiceSets.map((set) => set.questions.length));
    const minSize = 80; // percentage
    return minSize + questionCount / maxQuestions * (100 - minSize);
  };

  // Helper function to calculate glow intensity based on accuracy
  const calculateGlowIntensity = (accuracy: number) => {
    // Scale from 0-100% to appropriate shadow size (5px to 15px)
    return 5 + accuracy / 100 * 10;
  };

  // Helper function to get projection stability based on recency
  const getProjectionStability = (dateCompleted: string) => {
    const completedDate = new Date(dateCompleted).getTime();
    const now = new Date().getTime();
    const daysDifference = Math.abs((now - completedDate) / (24 * 60 * 60 * 1000));

    // Newer sets are more stable (less animation)
    // Scale from 0-60 days to 3-1 (newer = less movement)
    const stabilityFactor = Math.max(1, Math.min(3, 3 - daysDifference / 30));

    // Return animation speed (slower = more stable)
    return `${3 / stabilityFactor}s`;
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden" data-oid="5_02j3m">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white" data-oid="o8pa11h">
        Holographic Projection View
      </h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300 text-sm" data-oid=".npqfhk">
        Visualize your practice sets as holographic projections. Glow intensity shows accuracy, size represents question count, and stability reflects recency.
      </p>
      
      {/* Holographic "surface" base */}
      <div className="bg-black/90 dark:bg-black rounded-xl p-8 relative min-h-[500px] overflow-hidden" data-oid="ksa50xl">
        {/* Grid lines effect */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12" data-oid="dwl_yl_">
          {Array.from({ length: 12 }).map((_, i) =>
          <div key={`h-${i}`} className="w-full h-px bg-blue-500/10 dark:bg-blue-400/20" style={{ gridRow: i + 1 }} data-oid="kh:kkio" />
          )}
          {Array.from({ length: 12 }).map((_, i) =>
          <div key={`v-${i}`} className="h-full w-px bg-blue-500/10 dark:bg-blue-400/20" style={{ gridColumn: i + 1 }} data-oid="13mdnm6" />
          )}
        </div>
        
        {/* Holographic projector "lights" at corners */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-blue-400 rounded-full opacity-70 dark:bg-blue-500 animate-pulse" data-oid="80km5vi" />
        <div className="absolute top-2 right-2 w-3 h-3 bg-blue-400 rounded-full opacity-70 dark:bg-blue-500 animate-pulse" style={{ animationDelay: '0.5s' }} data-oid="ub072n." />
        <div className="absolute bottom-2 left-2 w-3 h-3 bg-blue-400 rounded-full opacity-70 dark:bg-blue-500 animate-pulse" style={{ animationDelay: '1s' }} data-oid="fy8q48w" />
        <div className="absolute bottom-2 right-2 w-3 h-3 bg-blue-400 rounded-full opacity-70 dark:bg-blue-500 animate-pulse" style={{ animationDelay: '1.5s' }} data-oid=".yoexd7" />
        
        {/* Main content */}
        <div data-oid="z1c1upj">
          {Object.entries(setsByDifficulty).map(([difficulty, sets], diffIndex) =>
          <div key={difficulty} className="mb-8 last:mb-0" data-oid="s64y0-j">
              <h3 className="text-lg font-medium text-white/90 mb-4 border-b border-white/10 pb-2" data-oid="16xwqsa">
                {difficulty} Projections
              </h3>
              
              <div className={`grid gap-5 ${sets.length > 0 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : ''}`} data-oid="v604hf-">
                {sets.length > 0 ? sets.map((set) => {
                const isSelected = set.id === selectedSetId;
                const isHovered = set.id === hoveredSet;
                const colors = getSubjectColor(set.subject);
                const hologramSize = calculateHologramSize(set.questions.length);
                const glowIntensity = calculateGlowIntensity(set.accuracy);
                const projectionStability = getProjectionStability(set.dateCompleted);
                const offset = floatingOffsets[set.id] || { x: 0, y: 0 };

                return (
                  <div
                    key={set.id}
                    className={`
                        relative rounded-lg backdrop-blur-md
                        border ${colors.border}
                        transition-all duration-300 cursor-pointer
                        ${isSelected ? 'scale-105 z-20' : 'z-10'}
                        ${isHovered ? 'z-20' : ''}
                      `}
                    onClick={() => onSelectSet(set.id)}
                    onMouseEnter={() => setHoveredSet(set.id)}
                    onMouseLeave={() => setHoveredSet(null)} data-oid="z3qrbro">

                      {/* Projection effect */}
                      <div
                      className={`
                          h-40 rounded-lg ${colors.base} overflow-hidden
                          transition-all duration-500 hologram relative
                          ${isHovered || isSelected ? 'projection-active' : ''}
                        `}
                      style={{
                        boxShadow: `0 0 ${glowIntensity}px 0 rgba(var(--shadow-color), 0.6)`,
                        '--shadow-color': set.subject === 'Math' ? '59, 130, 246' :
                        set.subject === 'Reading' ? '168, 85, 247' :
                        set.subject === 'Writing' ? '16, 185, 129' : '156, 163, 175',
                        '--animation-duration': projectionStability,
                        '--float-x': `${offset.x}px`,
                        '--float-y': `${offset.y}px`
                      } as React.CSSProperties} data-oid="_r6v:bq">

                        {/* Main hologram content */}
                        <div className={`
                          p-4 h-full flex flex-col relative z-10
                          transform scale-${Math.floor(hologramSize / 10) * 10}
                        `} data-oid="o.ibzau">
                          <div className="flex justify-between" data-oid="hrj08rc">
                            <h4 className={`${colors.text} font-bold text-lg`} data-oid="sgrsd9i">
                              {set.subject}: {set.type}
                            </h4>
                            
                            {/* Holographic badge */}
                            <div className={`
                              flex items-center justify-center w-8 h-8 rounded-full 
                              bg-gradient-to-r ${colors.gradient}
                              opacity-80 text-white text-xs font-bold
                            `} data-oid="zppco.5">
                              {Math.round(set.accuracy)}%
                            </div>
                          </div>
                          
                          <div className="mt-2 text-white/70 text-xs" data-oid="4l4jpzm">
                            {new Date(set.dateCompleted).toLocaleDateString()}
                          </div>
                          
                          {/* Metrics display */}
                          <div className="grid grid-cols-2 gap-2 mt-auto" data-oid="84_k312">
                            <div className="flex flex-col" data-oid="tfvcldu">
                              <span className="text-xs text-white/50" data-oid="6estmni">Questions</span>
                              <span className="text-white" data-oid="zwnngoy">{set.questions.length}</span>
                            </div>
                            <div className="flex flex-col" data-oid="me4xhho">
                              <span className="text-xs text-white/50" data-oid="hfuwa04">Time</span>
                              <span className="text-white" data-oid="o4v2j-f">{Math.floor(set.timeUsed / 60)}m</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Holographic scan lines effect */}
                        <div className="absolute inset-0 scan-lines opacity-10" data-oid="bfuk6kw"></div>
                        
                        {/* Glitch effect on hover */}
                        {isHovered &&
                      <div className="absolute inset-0 glitch-effect" data-oid="e.p89kr"></div>
                      }
                      </div>
                      
                      {/* Projection base */}
                      <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-blue-400/30 dark:via-blue-500/40 to-transparent rounded-full mt-1 mx-auto" style={{ width: '80%' }} data-oid="o-alo2z"></div>
                      
                      {/* Detailed projection on hover/selection */}
                      {(isHovered || isSelected) &&
                    <div className={`
                          absolute top-full mt-2 left-0 right-0 
                          bg-black/80 backdrop-blur-md rounded-lg p-3 z-30
                          border border-${colors.border} text-white
                          shadow-lg shadow-${colors.glow}
                          transition-all duration-200 data-projection
                        `} data-oid="gs.0:-0">
                          <div className="text-xs font-medium mb-2" data-oid="sts2028">Performance Analysis:</div>
                          <div className="grid grid-cols-2 gap-3 text-sm" data-oid="3efkcrl">
                            <div data-oid="6f-ehly">
                              <div className="text-white/60 text-xs" data-oid="m_a_1i0">Accuracy</div>
                              <div className="text-white font-medium" data-oid=".kplr_v">{set.accuracy}%</div>
                            </div>
                            <div data-oid="fy.8xxb">
                              <div className="text-white/60 text-xs" data-oid="iy1bnea">Pace</div>
                              <div className="text-white font-medium" data-oid="hwkzw97">{set.pace}</div>
                            </div>
                            <div data-oid="6.5ebl3">
                              <div className="text-white/60 text-xs" data-oid="5e39dm4">Conceptual Errors</div>
                              <div className="text-white font-medium" data-oid="lsvz3:6">{set.mistakeTypes.conceptual}</div>
                            </div>
                            <div data-oid=":i4n2qz">
                              <div className="text-white/60 text-xs" data-oid="5qy75:c">Careless Errors</div>
                              <div className="text-white font-medium" data-oid="neeydos">{set.mistakeTypes.careless}</div>
                            </div>
                            <div data-oid="w9d7n9l">
                              <div className="text-white/60 text-xs" data-oid="6_zf4g3">Early Accuracy</div>
                              <div className="text-white font-medium" data-oid="ykuob_r">{set.sessionFatigue.earlyAccuracy}%</div>
                            </div>
                            <div data-oid="cctszq0">
                              <div className="text-white/60 text-xs" data-oid="_ztef6s">Late Accuracy</div>
                              <div className="text-white font-medium" data-oid="aa:7rm-">{set.sessionFatigue.lateAccuracy}%</div>
                            </div>
                          </div>
                        </div>
                    }
                    </div>);

              }) :
              <div className="col-span-full text-center p-6 rounded-lg border border-white/10 text-white/50 italic" data-oid="3hgd.gt">
                    No {difficulty.toLowerCase()} practice sets found
                  </div>
              }
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style jsx data-oid="59_40tx">{`
        .hologram {
          animation: float var(--animation-duration) ease-in-out infinite alternate;
        }
        
        .projection-active {
          animation: float-active 1s ease-in-out infinite alternate;
        }
        
        @keyframes float {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(var(--float-x), var(--float-y));
          }
        }
        
        @keyframes float-active {
          0% {
            transform: translate(0, -2px);
          }
          100% {
            transform: translate(0, 2px);
          }
        }
        
        .scan-lines {
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(40, 128, 255, 0.1) 50%,
            transparent 100%
          );
          background-size: 100% 4px;
        }
        
        .glitch-effect {
          animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
        }
        
        @keyframes glitch {
          0% {
            transform: translate(0);
            opacity: 0;
          }
          10% {
            transform: translate(-2px, 2px);
            opacity: 0.2;
          }
          20% {
            transform: translate(2px, -2px);
            opacity: 0;
          }
          30% {
            transform: translate(-1px, 1px);
            opacity: 0.2;
          }
          40% {
            transform: translate(1px, -1px);
            opacity: 0;
          }
          50% {
            transform: translate(-1px, 2px);
            opacity: 0.2;
          }
          60% {
            transform: translate(1px, 1px);
            opacity: 0;
          }
          70% {
            transform: translate(2px, -2px);
            opacity: 0.2;
          }
          80% {
            transform: translate(-1px, 0px);
            opacity: 0;
          }
          90% {
            transform: translate(0px, -1px);
            opacity: 0.2;
          }
          100% {
            transform: translate(0);
            opacity: 0;
          }
        }
        
        .data-projection {
          animation: project-in 0.3s forwards cubic-bezier(0.33, 1, 0.68, 1);
        }
        
        @keyframes project-in {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>);

}