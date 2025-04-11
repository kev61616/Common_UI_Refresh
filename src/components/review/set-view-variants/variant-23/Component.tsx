'use client';

import React, { useState } from 'react';
import { SetViewProps } from '../types';

/**
 * Mountain Range Explorer View
 * 
 * A visualization that represents practice sets as mountains and peaks in a vast
 * mountain range. Features:
 * - Mountains with layered parallax effect
 * - Time-of-day styling that affects the overall appearance
 * - Interactive elements that respond to hover and selection
 * - Subject-specific terrain features
 */
export function Component({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [hoveredSet, setHoveredSet] = useState<string | null>(null);

  // Helper function to determine mountain height based on question count and difficulty
  const getMountainHeight = (set: typeof practiceSets[0]) => {
    const baseHeight = 60; // Base height percentage
    const questionModifier = Math.min(30, set.questions.length * 1.5); // Max 30% from questions
    const difficultyModifier = set.difficulty === 'Hard' ? 15 : set.difficulty === 'Medium' ? 7 : 0;

    return baseHeight + questionModifier + difficultyModifier;
  };

  // Helper function to get mountain colors based on subject
  const getMountainColors = (subject: string, accuracy: number) => {
    let near, mid, far, snow, accent;

    // Base colors by subject
    if (subject === 'Math') {
      near = 'from-blue-700 to-blue-900';
      mid = 'from-blue-600 to-blue-800';
      far = 'from-blue-500 to-blue-700';
      snow = 'bg-blue-200';
      accent = 'bg-blue-400';
    } else if (subject === 'Reading') {
      near = 'from-purple-700 to-purple-900';
      mid = 'from-purple-600 to-purple-800';
      far = 'from-purple-500 to-purple-700';
      snow = 'bg-purple-200';
      accent = 'bg-purple-400';
    } else {
      near = 'from-emerald-700 to-emerald-900';
      mid = 'from-emerald-600 to-emerald-800';
      far = 'from-emerald-500 to-emerald-700';
      snow = 'bg-emerald-200';
      accent = 'bg-emerald-400';
    }

    // Adjust vibrancy based on accuracy (more vibrant for higher accuracy)
    if (accuracy > 85) {
      return {
        near: near.replace('700', '600').replace('900', '800'),
        mid: mid.replace('600', '500').replace('800', '700'),
        far: far.replace('500', '400').replace('700', '600'),
        snow,
        accent,
        peak: accuracy > 90 ? true : false
      };
    } else if (accuracy < 65) {
      return {
        near: near.replace('700', '800').replace('900', '950'),
        mid: mid.replace('600', '700').replace('800', '900'),
        far: far.replace('500', '600').replace('700', '800'),
        snow: 'bg-gray-300', // Less snow for low accuracy
        accent,
        peak: false
      };
    }

    return { near, mid, far, snow, accent, peak: false };
  };

  // Get time of day (just for visual styling) based on first set's completion date
  const getTimeOfDay = () => {
    if (practiceSets.length === 0) return 'day';

    const date = new Date(practiceSets[0].dateCompleted);
    const hours = date.getHours();

    if (hours >= 5 && hours < 8) return 'dawn';
    if (hours >= 8 && hours < 17) return 'day';
    if (hours >= 17 && hours < 20) return 'dusk';
    return 'night';
  };

  const timeOfDay = getTimeOfDay();

  // Get sky and lighting colors based on time of day
  const getSkyColors = () => {
    switch (timeOfDay) {
      case 'dawn':
        return {
          sky: 'from-indigo-900 via-rose-400 to-amber-300',
          light: 'from-amber-200/30 to-transparent',
          fog: 'bg-white/40',
          textColor: 'text-gray-800'
        };
      case 'day':
        return {
          sky: 'from-cyan-400 via-sky-500 to-blue-600',
          light: 'from-white/20 to-transparent',
          fog: 'bg-white/20',
          textColor: 'text-white'
        };
      case 'dusk':
        return {
          sky: 'from-slate-900 via-orange-700 to-amber-500',
          light: 'from-amber-300/30 to-transparent',
          fog: 'bg-gray-300/30',
          textColor: 'text-white'
        };
      case 'night':
        return {
          sky: 'from-gray-900 via-indigo-950 to-indigo-900',
          light: 'from-indigo-300/10 to-transparent',
          fog: 'bg-indigo-900/40',
          textColor: 'text-white'
        };
    }
  };

  const skyColors = getSkyColors();

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-lg overflow-hidden" data-oid="_wry-5_">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="xfryi89">Mountain Range Explorer View</h3>
      
      {/* Mountain vista */}
      <div className={`
        relative h-[600px] rounded-xl overflow-hidden
        bg-gradient-to-b ${skyColors.sky}
      `} data-oid=".plg258">
        {/* Stars for night mode */}
        {timeOfDay === 'night' &&
        <div className="absolute inset-0 overflow-hidden" data-oid="7xgl:qa">
            {Array.from({ length: 50 }).map((_, i) =>
          <div
            key={i}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 70 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              opacity: Math.random() * 0.5 + 0.5
            }} data-oid="fci71pi" />

          )}
          </div>
        }
        
        {/* Sun/moon */}
        <div className={`
          absolute rounded-full 
          ${timeOfDay === 'night' ?
        'bg-gray-200 w-16 h-16 top-12 right-20' :
        timeOfDay === 'dawn' ?
        'bg-amber-300 w-20 h-20 top-20 left-1/4' :
        timeOfDay === 'dusk' ?
        'bg-orange-500 w-24 h-24 top-16 right-1/4' :
        'bg-yellow-300 w-24 h-24 top-12 right-1/3'}
        `
        } data-oid="fywyolq"></div>
        
        {/* Light rays */}
        {timeOfDay !== 'night' &&
        <div className={`
            absolute top-0 right-1/3 w-96 h-64 
            bg-gradient-to-b ${skyColors.light}
            opacity-60
          `} data-oid="cxpqfrq"></div>
        }
        
        {/* Far distant mountains (background) */}
        <div className="absolute inset-x-0 bottom-0 h-1/3" data-oid="_wz1b22">
          <div className="absolute inset-x-0 bottom-0 h-full" data-oid="k199uks">
            {/* Far layer */}
            <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="h-full w-full" data-oid="3gcg_a9">
              <path
                d="M0,200 L0,100 Q100,80 200,110 Q300,140 400,100 Q500,60 600,90 Q700,120 800,80 Q900,40 1000,70 L1000,200 Z"
                className="fill-gray-800" data-oid="v87pp7z" />

            </svg>
          </div>
        </div>
        
        {/* Fog layer for depth */}
        <div className={`
          absolute inset-x-0 bottom-1/4 h-16 
          ${skyColors.fog} blur-md opacity-50
        `} data-oid=":k.zpsr"></div>
        
        {/* Mountain cards container */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-10 px-6 pb-16" data-oid="zy1.xce">
          {practiceSets.map((set, index) => {
            const isSelected = selectedSetId === set.id;
            const isHovered = hoveredSet === set.id;
            const mountainHeight = getMountainHeight(set);
            const colors = getMountainColors(set.subject, set.accuracy);

            return (
              <div
                key={set.id}
                className={`
                  relative cursor-pointer
                  transition-all duration-500 ease-out
                  ${isSelected ? 'scale-110 z-20' : 'hover:scale-105 z-10'}
                `}
                onClick={() => onSelectSet(set.id)}
                onMouseEnter={() => setHoveredSet(set.id)}
                onMouseLeave={() => setHoveredSet(null)} data-oid="djwzsz7">

                {/* Mountain card */}
                <div className={`
                  relative h-64 rounded-lg overflow-hidden bg-gray-800/50
                  transition-all duration-300
                  ${isSelected || isHovered ? 'shadow-lg shadow-amber-900/30' : ''}
                `} data-oid="m.rjhhl">
                  {/* Mountain layers with parallax effect */}
                  <div className="absolute inset-0" data-oid="vqgo-ez">
                    {/* Far layer */}
                    <div className="absolute inset-x-0 bottom-0 h-full" data-oid="a7ozjwl">
                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full" data-oid="-c-bid0">
                        <path
                          d={`M0,100 L0,${100 - mountainHeight * 0.8} Q25,${100 - mountainHeight * 0.85} 50,${100 - mountainHeight * 0.75} Q75,${100 - mountainHeight * 0.8} 100,${100 - mountainHeight * 0.7} L100,100 Z`}
                          className={`fill-gradient ${colors.far}`} data-oid="lqxh_un" />

                      </svg>
                    </div>
                    
                    {/* Mid layer */}
                    <div className="absolute inset-x-0 bottom-0 h-full" data-oid=".zi8dan">
                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full" data-oid="a-te7hd">
                        <path
                          d={`M0,100 L0,${100 - mountainHeight * 0.9} Q30,${100 - mountainHeight * 0.8} 60,${100 - mountainHeight} Q80,${100 - mountainHeight * 0.9} 100,${100 - mountainHeight * 0.85} L100,100 Z`}
                          className={`fill-gradient ${colors.mid}`} data-oid="pqu6rq4" />

                      </svg>
                    </div>
                    
                    {/* Near layer */}
                    <div className="absolute inset-x-0 bottom-0 h-full" data-oid="y1wemsk">
                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full" data-oid="qelwmpb">
                        <path
                          d={`M0,100 L0,${100 - mountainHeight * 0.7} Q20,${100 - mountainHeight * 0.9} 40,${100 - mountainHeight * 0.75} Q70,${100 - mountainHeight * 1.1} 100,${100 - mountainHeight * 0.8} L100,100 Z`}
                          className={`fill-gradient ${colors.near}`} data-oid="i:_r9-e" />

                      </svg>
                    </div>
                    
                    {/* Snow caps */}
                    {mountainHeight > 75 &&
                    <div className="absolute inset-x-0 bottom-0 h-full" data-oid="weyfok8">
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full" data-oid="co583tb">
                          <path
                          d={`M40,${100 - mountainHeight * 1.1} Q45,${100 - mountainHeight * 1.15} 50,${100 - mountainHeight * 1.1} Q55,${100 - mountainHeight * 1.12} 60,${100 - mountainHeight * 1.08} L55,${100 - mountainHeight * 1.05} L45,${100 - mountainHeight * 1.05} Z`}
                          className={`${colors.snow}`} data-oid="wdqfgni" />

                        </svg>
                      </div>
                    }
                    
                    {/* Mountain peak flag for high accuracy */}
                    {colors.peak &&
                    <div className="absolute" style={{ left: '49%', bottom: `${mountainHeight + 5}%` }} data-oid="o152v2j">
                        <div className="relative w-1 h-8 bg-gray-800" data-oid="v4y_gg-"></div>
                        <div className={`absolute top-0 left-1 w-6 h-4 ${colors.accent}`} data-oid="rrbzo7a"></div>
                      </div>
                    }
                  </div>
                  
                  {/* Content panel */}
                  <div className="absolute inset-x-0 bottom-0 backdrop-blur-sm bg-black/30 border-t border-white/10 p-4" data-oid="a-d1ote">
                    <h4 className={`font-bold ${skyColors.textColor}`} data-oid=":w399wb">{set.subject}: {set.type}</h4>
                    <div className="flex justify-between items-center mt-2" data-oid="4k2xrit">
                      <div data-oid="hi_7_a5">
                        <div className="text-xs text-white/70" data-oid="fqkhzb8">Accuracy</div>
                        <div className="flex items-center" data-oid="04.u579">
                          <div
                            className={`h-1.5 rounded-full ${colors.accent}`}
                            style={{ width: `${set.accuracy / 2}px` }} data-oid="po275.u">
                          </div>
                          <span className="ml-2 text-white text-sm" data-oid="g8rcbyy">{set.accuracy}%</span>
                        </div>
                      </div>
                      <div className="text-white/70 text-xs" data-oid="vtpyw8-">
                        <div data-oid="g3ib:8j">{set.questions.length} Questions</div>
                        <div data-oid="_dvyqg5">{set.difficulty}</div>
                      </div>
                    </div>
                    <div className="text-white/50 text-xs mt-2" data-oid="3kfkrrv">
                      {new Date(set.dateCompleted).toLocaleDateString()}
                    </div>
                  </div>
                  
                  {/* Selected indicator */}
                  {isSelected &&
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-white" data-oid="xeen7g5"></div>
                  }
                  
                  {/* Hover effects - clouds/mist */}
                  {isHovered &&
                  <div className="absolute inset-0 pointer-events-none overflow-hidden" data-oid="p0-kub_">
                      <div className="absolute left-[10%] top-[30%] w-12 h-6 bg-white/40 rounded-full blur-md animate-float" data-oid="3k-dwtw"></div>
                      <div className="absolute left-[30%] top-[40%] w-16 h-8 bg-white/30 rounded-full blur-md animate-float" style={{ animationDelay: '1s' }} data-oid="xhvt:3u"></div>
                      <div className="absolute right-[20%] top-[35%] w-10 h-5 bg-white/30 rounded-full blur-md animate-float" style={{ animationDelay: '0.5s' }} data-oid="rkf6p1-"></div>
                    </div>
                  }
                </div>
              </div>);

          })}
        </div>
        
        {/* Ground layer for depth */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-gray-900 to-transparent" data-oid="iepyt.a"></div>
      </div>
      
      {/* CSS Animations */}
      <style jsx data-oid="_d:t87t">{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        
        .animate-twinkle {
          animation: twinkle 4s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(10px); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .fill-gradient {
          fill: url(#mountainGradient);
        }
      `}</style>
    </div>);

}