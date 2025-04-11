'use client';

import React, { useState } from 'react';
import { SetViewProps } from '../types';

/**
 * Data Crystal View
 * 
 * A data-driven visualization that represents practice sets as crystalline structures with:
 * - Crystal geometry reflecting subject and difficulty combinations
 * - Facet detail representing question complexity and volume
 * - Color saturation indicating performance levels
 * - Light refraction effects showing engagement metrics
 * - Crystal clarity representing conceptual understanding
 * 
 * Primary insight objective: To answer "How does my performance vary across different subject-difficulty combinations?"
 * 
 * Data-to-visual mapping:
 * - Crystal shape → Subject-difficulty pairing (categorical distinction with complexity dimension)
 * - Facet count → Question count (complexity increases with content volume)
 * - Color saturation → Accuracy (visual intensity correlates with performance)
 * - Refraction effect → Engagement level (visual brilliance maps to active engagement)
 * - Crystal clarity → Conceptual vs. careless errors (clearer crystals = fewer conceptual errors)
 * 
 * This visualization enables users to:
 * 1. Identify performance patterns across different subject-difficulty combinations
 * 2. Compare engagement levels between successful and unsuccessful sets
 * 3. Detect conceptual understanding gaps vs. careless errors
 * 4. Recognize study investment patterns across knowledge domains
 */
export function Component({ practiceSets, selectedSetId, onSelectSet }: SetViewProps) {
  const [hoveredSet, setHoveredSet] = useState<string | null>(null);

  // Group sets by difficulty for layout
  const setsByDifficulty: Record<string, typeof practiceSets> = {
    'Hard': [],
    'Medium': [],
    'Easy': []
  };

  practiceSets.forEach((set) => {
    setsByDifficulty[set.difficulty].push(set);
  });

  // Helper function to get crystal colors based on subject
  const getCrystalColor = (subject: string) => {
    switch (subject) {
      case 'Math':return {
          primary: 'from-blue-300 to-cyan-200 dark:from-blue-600 dark:to-cyan-400',
          secondary: 'from-blue-200 to-cyan-100 dark:from-blue-500 dark:to-cyan-300',
          shadow: 'shadow-blue-300/50 dark:shadow-blue-500/50',
          text: 'text-blue-900 dark:text-blue-100',
          edge: 'border-blue-200 dark:border-blue-600'
        };
      case 'Reading':return {
          primary: 'from-purple-300 to-pink-200 dark:from-purple-600 dark:to-pink-400',
          secondary: 'from-purple-200 to-pink-100 dark:from-purple-500 dark:to-pink-300',
          shadow: 'shadow-purple-300/50 dark:shadow-purple-500/50',
          text: 'text-purple-900 dark:text-purple-100',
          edge: 'border-purple-200 dark:border-purple-600'
        };
      case 'Writing':return {
          primary: 'from-amber-300 to-yellow-200 dark:from-amber-600 dark:to-yellow-400',
          secondary: 'from-amber-200 to-yellow-100 dark:from-amber-500 dark:to-yellow-300',
          shadow: 'shadow-amber-300/50 dark:shadow-amber-500/50',
          text: 'text-amber-900 dark:text-amber-100',
          edge: 'border-amber-200 dark:border-amber-600'
        };
      default:return {
          primary: 'from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-400',
          secondary: 'from-gray-200 to-gray-100 dark:from-gray-500 dark:to-gray-300',
          shadow: 'shadow-gray-300/50 dark:shadow-gray-500/50',
          text: 'text-gray-900 dark:text-gray-100',
          edge: 'border-gray-200 dark:border-gray-600'
        };
    }
  };

  // Helper function to get crystal shape based on difficulty
  const getCrystalShape = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':return 'crystal-triangle';
      case 'Medium':return 'crystal-square';
      case 'Hard':return 'crystal-hexagon';
      default:return 'crystal-circle';
    }
  };

  // Calculate crystal size based on question count
  const calculateCrystalSize = (questionCount: number) => {
    const maxQuestions = Math.max(...practiceSets.map((set) => set.questions.length));
    const minSize = 80; // percentage
    return minSize + questionCount / maxQuestions * (100 - minSize);
  };

  // Calculate color saturation based on accuracy
  const calculateColorSaturation = (accuracy: number) => {
    // Scale from 0-100% to 0.3-1 opacity
    return 0.3 + accuracy / 100 * 0.7;
  };

  // Calculate refraction effect based on engagement (using time of day)
  const calculateRefractionEffect = (timeOfDay: string) => {
    switch (timeOfDay) {
      case 'Morning':return { rotation: '15deg', delay: '0s' };
      case 'Afternoon':return { rotation: '30deg', delay: '0.1s' };
      case 'Evening':return { rotation: '45deg', delay: '0.2s' };
      default:return { rotation: '0deg', delay: '0s' };
    }
  };

  // Calculate crystal clarity based on conceptual vs. careless errors ratio
  const calculateCrystalClarity = (set: (typeof practiceSets)[0]) => {
    const totalErrors = set.mistakeTypes.conceptual + set.mistakeTypes.careless;
    if (totalErrors === 0) return 1; // perfect clarity

    // Higher values when fewer conceptual errors relative to careless
    return 0.3 + 0.7 * (1 - set.mistakeTypes.conceptual / totalErrors);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg" data-oid="4bx7jja">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white" data-oid="j8z1npd">
        Data Crystal View
      </h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300 text-sm" data-oid="ureyvca">
        Examine your practice sets as data crystals. Crystal shape represents difficulty, color shows subject, brilliance indicates accuracy, and clarity shows conceptual understanding.
      </p>
      
      <div className="space-y-8" data-oid="h706d3t">
        {Object.entries(setsByDifficulty).map(([difficulty, sets]) =>
        <div key={difficulty} className="space-y-4" data-oid="q7fglw1">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2" data-oid="mljv3ry">
              {difficulty} Crystals
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-oid="5cran17">
              {sets.map((set) => {
              const isSelected = set.id === selectedSetId;
              const isHovered = set.id === hoveredSet;
              const colors = getCrystalColor(set.subject);
              const shape = getCrystalShape(set.difficulty);
              const size = calculateCrystalSize(set.questions.length);
              const saturation = calculateColorSaturation(set.accuracy);
              const refraction = calculateRefractionEffect(set.timeOfDay);
              const clarity = calculateCrystalClarity(set);

              return (
                <div
                  key={set.id}
                  className={`
                      relative p-4 rounded-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm
                      border border-gray-200 dark:border-gray-700
                      transition-all duration-300 cursor-pointer
                      ${isSelected ? 'ring-2 ring-blue-500 scale-105' : ''}
                      ${isHovered ? 'shadow-md' : ''}
                    `}
                  onClick={() => onSelectSet(set.id)}
                  onMouseEnter={() => setHoveredSet(set.id)}
                  onMouseLeave={() => setHoveredSet(null)} data-oid="mj2oc-a">

                    <div className="flex items-center justify-between mb-3" data-oid="3w_c.mg">
                      <h4 className={`font-bold ${colors.text}`} data-oid="w1txgz4">
                        {set.subject}: {set.type}
                      </h4>
                      <div className="text-gray-500 dark:text-gray-400 text-xs" data-oid="mmyhs9s">
                        {new Date(set.dateCompleted).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex justify-center py-3" data-oid="w6z.qdr">
                      {/* Crystal container */}
                      <div
                      className={`
                          ${shape} relative
                          ${isHovered || isSelected ? `${colors.shadow} animate-pulse` : ''}
                        `}
                      style={{
                        width: `${size}px`,
                        height: `${size}px`
                      }} data-oid="gylhzrc">

                        {/* Main crystal */}
                        <div
                        className={`
                            crystal absolute inset-0 bg-gradient-to-br ${colors.primary}
                            transition-all duration-500
                          `}
                        style={{
                          opacity: saturation,
                          backdropFilter: `blur(${clarity * 2}px)`,
                          '--rotation': refraction.rotation,
                          '--animation-delay': refraction.delay
                        } as React.CSSProperties} data-oid="4k30kzn">
                      </div>
                        
                        {/* Crystal facets - number based on question count */}
                        {Array.from({ length: Math.min(5, Math.ceil(set.questions.length / 6)) }).map((_, i) =>
                      <div
                        key={i}
                        className={`
                              absolute crystal-facet bg-gradient-to-tl ${colors.secondary}
                              border ${colors.edge}
                            `}
                        style={{
                          opacity: saturation * 0.8,
                          '--index': i,
                          '--total': Math.min(5, Math.ceil(set.questions.length / 6)),
                          '--rotation': refraction.rotation,
                          '--animation-delay': `calc(${refraction.delay} + ${i * 0.1}s)`
                        } as React.CSSProperties} data-oid="7wtl.ja">
                      </div>
                      )}
                        
                        {/* Accuracy indicator in center */}
                        <div
                        className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs"
                        style={{ textShadow: '0 0 4px rgba(0,0,0,0.3)' }} data-oid="ztb_la_">

                          {Math.round(set.accuracy)}%
                        </div>
                      </div>
                    </div>
                    
                    {/* Data metrics */}
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-sm" data-oid="eyn.7tf">
                      <div data-oid="3pipc94">
                        <div className="text-gray-500 dark:text-gray-400 text-xs" data-oid="ca7zqp2">Questions</div>
                        <div className="font-medium" data-oid="l.5vrjm">{set.questions.length}</div>
                      </div>
                      <div data-oid="j.q_15c">
                        <div className="text-gray-500 dark:text-gray-400 text-xs" data-oid=".ptvm3q">Time Spent</div>
                        <div className="font-medium" data-oid="es0fndj">{Math.floor(set.timeUsed / 60)}m</div>
                      </div>
                      <div data-oid="xf8ez75">
                        <div className="text-gray-500 dark:text-gray-400 text-xs" data-oid="w6lkapx">Conceptual Errors</div>
                        <div className="font-medium" data-oid="5lds1qx">{set.mistakeTypes.conceptual}</div>
                      </div>
                      <div data-oid="83hgna4">
                        <div className="text-gray-500 dark:text-gray-400 text-xs" data-oid="5ume8wt">Careless Errors</div>
                        <div className="font-medium" data-oid="pfscaw0">{set.mistakeTypes.careless}</div>
                      </div>
                    </div>
                  </div>);

            })}
            </div>
          </div>
        )}
      </div>
      
      <style jsx data-oid="qa47_c3">{`
        .crystal {
          transform: rotate(var(--rotation, 0deg));
          animation: refract 3s infinite alternate ease-in-out;
          animation-delay: var(--animation-delay, 0s);
        }
        
        .crystal-facet {
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          width: 60%;
          height: 60%;
          left: 20%;
          top: 20%;
          transform: rotate(calc(var(--index) * (360deg / var(--total))));
          animation: facet-refract 4s infinite alternate ease-in-out;
          animation-delay: var(--animation-delay, 0s);
        }
        
        @keyframes refract {
          0% {
            transform: rotate(var(--rotation, 0deg));
            filter: hue-rotate(0deg);
          }
          25% {
            filter: hue-rotate(5deg) brightness(1.05);
          }
          50% {
            transform: rotate(calc(var(--rotation, 0deg) + 5deg));
          }
          75% {
            filter: hue-rotate(-5deg) brightness(0.95);
          }
          100% {
            transform: rotate(var(--rotation, 0deg));
            filter: hue-rotate(0deg);
          }
        }
        
        @keyframes facet-refract {
          0% {
            opacity: 0.3;
            transform: rotate(calc(var(--index) * (360deg / var(--total))));
          }
          50% {
            opacity: 0.7;
            transform: rotate(calc(var(--index) * (360deg / var(--total)) + 10deg));
          }
          100% {
            opacity: 0.3;
            transform: rotate(calc(var(--index) * (360deg / var(--total))));
          }
        }
        
        .crystal-circle {
          border-radius: 50%;
          overflow: hidden;
        }
        
        .crystal-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          overflow: hidden;
        }
        
        .crystal-square {
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          overflow: hidden;
        }
        
        .crystal-hexagon {
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
          overflow: hidden;
        }
      `}</style>
    </div>);

}