'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PracticeSet } from '@/lib/mockData';
import { TimelineViewProps } from './types';
import { format, parseISO, differenceInDays } from 'date-fns';

export const TidalWaveTimeline: React.FC<TimelineViewProps> = ({
  practiceSets,
  onSelectSet,
  selectedSetId
}) => {
  const [groupedSets, setGroupedSets] = useState<Record<string, PracticeSet[]>>({});
  const [hoverSetId, setHoverSetId] = useState<string | null>(null);
  const [waveAnimations, setWaveAnimations] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Group practice sets by month
  useEffect(() => {
    const grouped: Record<string, PracticeSet[]> = {};

    // Sort sets by date first
    const sortedSets = [...practiceSets].sort((a, b) =>
    new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
    );

    sortedSets.forEach((set) => {
      const date = parseISO(set.dateCompleted);
      const monthYear = format(date, 'MMMM yyyy');

      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }

      grouped[monthYear].push(set);
    });

    setGroupedSets(grouped);

    // Start wave animations after a short delay
    setTimeout(() => {
      setWaveAnimations(true);
    }, 500);
  }, [practiceSets]);

  // Get subject-specific styles
  const getSubjectStyles = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          bg: 'bg-blue-500',
          lightBg: 'bg-blue-100 dark:bg-blue-900/20',
          text: 'text-blue-500 dark:text-blue-400',
          border: 'border-blue-500 dark:border-blue-600',
          waveBg: 'bg-blue-500',
          waveColor: '#3b82f6',
          foam: 'bg-blue-200'
        };
      case 'Reading':
        return {
          bg: 'bg-emerald-500',
          lightBg: 'bg-emerald-100 dark:bg-emerald-900/20',
          text: 'text-emerald-500 dark:text-emerald-400',
          border: 'border-emerald-500 dark:border-emerald-600',
          waveBg: 'bg-emerald-500',
          waveColor: '#10b981',
          foam: 'bg-emerald-200'
        };
      case 'Writing':
        return {
          bg: 'bg-amber-500',
          lightBg: 'bg-amber-100 dark:bg-amber-900/20',
          text: 'text-amber-500 dark:text-amber-400',
          border: 'border-amber-500 dark:border-amber-600',
          waveBg: 'bg-amber-500',
          waveColor: '#f59e0b',
          foam: 'bg-amber-200'
        };
      default:
        return {
          bg: 'bg-slate-500',
          lightBg: 'bg-slate-100 dark:bg-slate-800',
          text: 'text-slate-500 dark:text-slate-400',
          border: 'border-slate-500 dark:border-slate-600',
          waveBg: 'bg-slate-500',
          waveColor: '#64748b',
          foam: 'bg-slate-200'
        };
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, 'MMM d');
  };

  // Get wave height based on accuracy
  const getWaveHeight = (accuracy: number) => {
    if (accuracy >= 90) return { height: 80, class: 'king-tide' };
    if (accuracy >= 75) return { height: 60, class: 'high-tide' };
    if (accuracy >= 60) return { height: 40, class: 'mid-tide' };
    return { height: 25, class: 'low-tide' };
  };

  // Get wave intensity based on question count
  const getWaveIntensity = (count: number) => {
    if (count >= 25) return { intensity: 'strong', class: 'storm-wave' };
    if (count >= 15) return { intensity: 'moderate', class: 'normal-wave' };
    return { intensity: 'calm', class: 'gentle-wave' };
  };

  // Get tide type based on pace
  const getTideType = (pace: string) => {
    switch (pace) {
      case 'Fast':return 'Spring Tide';
      case 'Normal':return 'Regular Tide';
      case 'Slow':return 'Neap Tide';
      default:return 'Regular Tide';
    }
  };

  // Get ocean depth based on difficulty
  const getOceanDepth = (difficulty: string) => {
    switch (difficulty) {
      case 'Hard':return 'Deep Ocean';
      case 'Medium':return 'Continental Shelf';
      case 'Easy':return 'Coastal Waters';
      default:return 'Continental Shelf';
    }
  };

  // Get coral reef status description
  const getCoralReefStatus = (accuracy: number) => {
    if (accuracy >= 90) return 'Thriving ecosystem with peak biodiversity';
    if (accuracy >= 75) return 'Healthy reef with good species diversity';
    if (accuracy >= 60) return 'Recovering reef with moderate biodiversity';
    return 'Stressed reef ecosystem requiring attention';
  };

  // Generate wave SVG pattern
  const generateWavePattern = (color: string, height: number, amplitude: number, frequency: number, phase: number) => {
    const width = 1200;
    const points = [];

    for (let x = 0; x <= width; x += 10) {
      const y = Math.sin(x / width * 2 * Math.PI * frequency + phase) * amplitude;
      points.push(`${x},${y}`);
    }

    return (
      <svg
        className="absolute bottom-0 left-0 w-full"
        height={height}
        viewBox={`0 -${amplitude} ${width} ${amplitude * 2}`}
        preserveAspectRatio="none" data-oid="mj80y:7">

        <defs data-oid="t8lje0g">
          <linearGradient id={`waveGradient-${color.substring(1)}`} x1="0%" y1="0%" x2="0%" y2="100%" data-oid="k--p_hd">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" data-oid="hc-o3rq" />
            <stop offset="100%" stopColor={color} stopOpacity="0.3" data-oid="prtk0_q" />
          </linearGradient>
        </defs>
        <path
          d={`M0,0 L0,${amplitude} ${points.join(' ')} ${width},${amplitude} ${width},0 Z`}
          fill={`url(#waveGradient-${color.substring(1)})`} data-oid="j6jb4ff" />

      </svg>);

  };

  // Generate foam bubbles
  const generateFoamBubbles = (count: number, foamClass: string) => {
    const bubbles = [];

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 10 + 3; // 3-13px
      const left = Math.random() * 100; // 0-100%
      const bottom = Math.random() * 15; // 0-15px
      const delay = Math.random() * 2; // 0-2s
      const duration = Math.random() * 2 + 1; // 1-3s

      bubbles.push(
        <div
          key={i}
          className={`absolute rounded-full ${foamClass} opacity-70`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            bottom: `${bottom}px`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
          }} data-oid="qqbf4f5">
        </div>
      );
    }

    return bubbles;
  };

  return (
    <div ref={containerRef} className="tidal-wave-timeline pb-8" data-oid="b_borki">
      {/* Header with title and legend */}
      <div className="flex items-center justify-between mb-6" data-oid="jvtvui5">
        <div className="flex items-center space-x-3" data-oid="nrx1up5">
          <div className="h-8 w-8 flex items-center justify-center" data-oid="b5azydi">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-500" data-oid="u0aql3m">
              <path fillRule="evenodd" d="M12 5.25c1.213 0 2.415.046 3.605.135a3.256 3.256 0 0 1 3.01 3.01c.044.583.077 1.17.1 1.759L17.03 8.47a.75.75 0 1 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 0 0-1.06-1.06l-1.752 1.751c-.023-.65-.06-1.296-.108-1.939a4.756 4.756 0 0 0-4.392-4.392 49.422 49.422 0 0 0-7.436 0A4.756 4.756 0 0 0 4.9 8.282c-.103.693-.189 1.388-.256 2.083l-.511.51a.75.75 0 0 1-1.05.011.75.75 0 0 1-.011-1.05l.713-.712a49.75 49.75 0 0 1 .2-2.503 3.256 3.256 0 0 1 3.01-3.01A47.863 47.863 0 0 1 12 5.25Zm.943 5.058a.75.75 0 0 0-1.498-.052c.002.083.002.166.002.25 0 .414-.002.863-.007 1.318l-2.68 2.68a.75.75 0 1 0 1.06 1.06l2.437-2.438c.415-.415.776-.89 1.075-1.407.017-.653.035-1.301.053-1.944.033-.11.033-.22.033-.331 0-.39-.001-.796-.002-1.199a.75.75 0 0 0-.777-.777c-.403.002-.809.002-1.2.002a.75.75 0 0 0 0 1.5c.385 0 .77 0 1.153-.002.11 0 .219 0 .33-.033.642-.018 1.29-.036 1.944-.053a6.432 6.432 0 0 1-1.286 1.03l-1.2 1.2H13.4c-.166.003-.249.003-.33.003-.082 0-.165 0-.248-.002Z" clipRule="evenodd" data-oid="pxlbjl2" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200" data-oid="9110r7w">Tidal Wave Timeline</h2>
        </div>
        
        <div className="flex space-x-4" data-oid="k8t56n8">
          <div className="flex items-center" data-oid=":8lguw0">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2" data-oid="at3zssu"></span>
            <span className="text-sm text-slate-700 dark:text-slate-300" data-oid="9-k.yf-">Math</span>
          </div>
          <div className="flex items-center" data-oid="mhf85ew">
            <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 mr-2" data-oid="92x_uys"></span>
            <span className="text-sm text-slate-700 dark:text-slate-300" data-oid="atqh8px">Reading</span>
          </div>
          <div className="flex items-center" data-oid="vz9jayr">
            <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-2" data-oid="jgizi.g"></span>
            <span className="text-sm text-slate-700 dark:text-slate-300" data-oid="mfil_-k">Writing</span>
          </div>
        </div>
      </div>
      
      {/* Tide legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" data-oid="f:vgncb">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700" data-oid="k5_5x17">
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" data-oid="7clbzhb">King Tide (90%+)</div>
          <div className="relative h-20 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 rounded-md overflow-hidden" data-oid="zrg4fc6">
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-blue-500/50" data-oid="69-1llv"></div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700" data-oid="f8e.to0">
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" data-oid="xftex96">High Tide (75-89%)</div>
          <div className="relative h-20 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 rounded-md overflow-hidden" data-oid="ndk5tq-">
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-blue-500/50" data-oid="tkm-ap1"></div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700" data-oid="g1cpgzc">
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" data-oid="53_hbng">Mid Tide (60-74%)</div>
          <div className="relative h-20 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 rounded-md overflow-hidden" data-oid="::kasvb">
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-blue-500/50" data-oid="tox7pkd"></div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700" data-oid="d49hj-h">
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" data-oid="66p98v.">Low Tide (&lt;60%)</div>
          <div className="relative h-20 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 rounded-md overflow-hidden" data-oid="vnllm8e">
            <div className="absolute bottom-0 left-0 right-0 h-5 bg-blue-500/50" data-oid="dzv6:ze"></div>
          </div>
        </div>
      </div>
      
      {/* Month sections with tidal waves */}
      <div className="space-y-12" data-oid="e.6l8ow">
        {Object.entries(groupedSets).
        sort(([monthA], [monthB]) => {
          const dateA = parseISO(groupedSets[monthA][0].dateCompleted);
          const dateB = parseISO(groupedSets[monthB][0].dateCompleted);
          return dateB.getTime() - dateA.getTime(); // Sort descending (newest first)
        }).
        map(([month, sets]) =>
        <div key={month} className="month-section bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden" data-oid="j4xn2s4">
              {/* Month header */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700" data-oid="sxh1rnp">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200" data-oid="_9fo2m8">{month} Tides</h3>
              </div>
              
              {/* Ocean floor with tidal waves */}
              <div className="ocean-container p-4 pt-0" data-oid="-j:yrpt">
                <div className="practice-sets space-y-4 py-4" data-oid="40j_3k1">
                  {sets.map((set) => {
                const styles = getSubjectStyles(set.subject);
                const isSelected = set.id === selectedSetId;
                const isHovered = set.id === hoverSetId;
                const waveHeight = getWaveHeight(set.accuracy);
                const waveIntensity = getWaveIntensity(set.questions.length);
                const tideType = getTideType(set.pace);
                const oceanDepth = getOceanDepth(set.difficulty);

                return (
                  <div
                    key={set.id}
                    className={`tidal-wave-item relative rounded-lg border overflow-hidden transition-all duration-300
                          ${isSelected ? `ring-2 ring-${styles.border} shadow-lg scale-102` : 'shadow-sm scale-100'}
                          ${isHovered ? 'shadow-md' : ''}
                          border-slate-200 dark:border-slate-700
                          cursor-pointer`}
                    onClick={() => onSelectSet?.(set.id)}
                    onMouseEnter={() => setHoverSetId(set.id)}
                    onMouseLeave={() => setHoverSetId(null)} data-oid="3l1l1w6">

                        {/* Ocean background */}
                        <div className="ocean-bg relative bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 p-4 min-h-[120px]" data-oid="_ic_fi0">
                          {/* Set info */}
                          <div className="relative z-10" data-oid="rl_gx6j">
                            <div className="flex justify-between items-start" data-oid="5t38aci">
                              <div data-oid="beq83d_">
                                <h4 className={`font-medium ${styles.text}`} data-oid="o_7lyq6">
                                  {set.subject}: {set.type}
                                </h4>
                                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1" data-oid="s3jx42j">
                                  {formatDate(set.dateCompleted)} • {tideType}
                                </div>
                              </div>
                              
                              <div className={`px-2 py-1 rounded ${styles.lightBg} ${styles.text} text-sm font-medium`} data-oid="gw6bp.8">
                                {set.accuracy}%
                              </div>
                            </div>
                            
                            {/* Ocean metrics */}
                            <div className="grid grid-cols-3 gap-4 mt-4 text-sm" data-oid="jjt8su2">
                              <div data-oid="m..7ocs">
                                <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="n0hwes8">Tide Level</div>
                                <div className="font-medium text-slate-700 dark:text-slate-300" data-oid="pojnf8h">{waveHeight.class}</div>
                              </div>
                              <div data-oid="k:rv0bj">
                                <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="hqhv-e-">Wave Type</div>
                                <div className="font-medium text-slate-700 dark:text-slate-300" data-oid="_fin-7:">{waveIntensity.intensity}</div>
                              </div>
                              <div data-oid="ura3qb4">
                                <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="32iib-9">Ocean Zone</div>
                                <div className="font-medium text-slate-700 dark:text-slate-300" data-oid="kh6k5gr">{oceanDepth}</div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Wave overlay */}
                          <div className={`wave-container absolute inset-0 overflow-hidden ${waveAnimations ? 'waves-animated' : ''}`} data-oid="9d3_f-0">
                            {/* Multiple wave layers for realistic effect */}
                            <div className="absolute inset-0" data-oid="j.sagsn">
                              {waveAnimations &&
                          <>
                                  {/* Background wave */}
                                  {generateWavePattern(
                              styles.waveColor,
                              waveHeight.height,
                              15, // amplitude
                              2, // frequency
                              0 // phase
                            )}
                                  
                                  {/* Foreground wave with different phase */}
                                  {generateWavePattern(
                              styles.waveColor,
                              waveHeight.height - 10,
                              10, // amplitude
                              3, // frequency
                              Math.PI / 2 // phase
                            )}
                                  
                                  {/* Foam bubbles */}
                                  <div className="absolute bottom-0 left-0 right-0 h-5 overflow-hidden" data-oid="zcerf9i">
                                    {generateFoamBubbles(15, styles.foam)}
                                  </div>
                                </>
                          }
                            </div>
                          </div>
                        </div>
                        
                        {/* Expanded details when selected */}
                        {isSelected &&
                    <div className="expanded-details p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700" data-oid="c.lpvyo">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-oid="mws1tw5">
                              <div data-oid="ot-p21t">
                                <h5 className="font-medium text-slate-800 dark:text-slate-200 mb-3" data-oid="jf0oiu:">Ocean Conditions</h5>
                                
                                <div className="space-y-3" data-oid="km5dr3c">
                                  <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-lg" data-oid="6lmw-ln">
                                    <div className="text-sm text-slate-700 dark:text-slate-300 font-medium" data-oid="1p9aobh">Coral Reef Status</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-1" data-oid="_flhmu2">
                                      {getCoralReefStatus(set.accuracy)}
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-3" data-oid="0tdh:g6">
                                    <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-lg" data-oid=":njwp6l">
                                      <div className="text-sm text-slate-700 dark:text-slate-300 font-medium" data-oid="66zs55i">Water Clarity</div>
                                      <div className="text-sm text-slate-600 dark:text-slate-400 mt-1" data-oid="amgyo5a">
                                        {set.accuracy >= 85 ? 'Crystal Clear' :
                                  set.accuracy >= 70 ? 'Clear' :
                                  set.accuracy >= 55 ? 'Moderate' :
                                  'Murky'}
                                      </div>
                                    </div>
                                    <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-lg" data-oid="idi158p">
                                      <div className="text-sm text-slate-700 dark:text-slate-300 font-medium" data-oid="d1efb6l">Current Strength</div>
                                      <div className="text-sm text-slate-600 dark:text-slate-400 mt-1" data-oid="nfws:xo">
                                        {set.pace === 'Fast' ? 'Strong' :
                                  set.pace === 'Normal' ? 'Moderate' :
                                  'Gentle'}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-lg" data-oid="jzjao1f">
                                    <div className="text-sm text-slate-700 dark:text-slate-300 font-medium" data-oid="ts17r9w">Oceanographer's Notes</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-1 italic" data-oid="7jvi2l.">
                                      {set.accuracy >= 90 ?
                                "Exceptionally clear waters with optimal conditions for marine life. Study patterns indicate mastery of the subject material." :
                                set.accuracy >= 75 ?
                                "Clear waters with healthy ecosystem indicators. Knowledge structure is well-developed with minor areas for improvement." :
                                set.accuracy >= 60 ?
                                "Moderate visibility with some disruption to the ecosystem. Core concepts are present but require further development." :
                                "Turbid conditions limiting ecosystem functionality. Fundamental concepts need significant reinforcement."}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div data-oid="v91pbaz">
                                <h5 className="font-medium text-slate-800 dark:text-slate-200 mb-3" data-oid="4t713l9">Marine Analysis</h5>
                                
                                <div className="space-y-3" data-oid="3v70ja4">
                                  {/* Current disruptions (mistakes) */}
                                  <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-lg" data-oid="ygtpy:e">
                                    <div className="text-sm text-slate-700 dark:text-slate-300 font-medium" data-oid="j6:wngv">Current Disruptions</div>
                                    <div className="flex flex-wrap gap-2 mt-2" data-oid="tqys8m_">
                                      {set.mistakeTypes.conceptual > 0 &&
                                <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs rounded-full" data-oid="ch80y3u">
                                          {set.mistakeTypes.conceptual} conceptual
                                        </span>
                                }
                                      {set.mistakeTypes.careless > 0 &&
                                <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs rounded-full" data-oid="0lmlpyi">
                                          {set.mistakeTypes.careless} surface
                                        </span>
                                }
                                      {set.mistakeTypes.timeManagement > 0 &&
                                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full" data-oid="xbt9h49">
                                          {set.mistakeTypes.timeManagement} temporal
                                        </span>
                                }
                                      {set.mistakeTypes.conceptual === 0 && set.mistakeTypes.careless === 0 && set.mistakeTypes.timeManagement === 0 &&
                                <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full" data-oid="ar8nebn">
                                          No significant disruptions
                                        </span>
                                }
                                    </div>
                                  </div>
                                  
                                  {/* Tide cycle (performance trend) */}
                                  <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-lg" data-oid="64k-u7w">
                                    <div className="text-sm text-slate-700 dark:text-slate-300 font-medium mb-2" data-oid="grgs1kw">Tide Cycle</div>
                                    
                                    <div className="flex items-end h-12 space-x-2" data-oid="mhi66hi">
                                      <div className="flex-1 flex flex-col justify-end" data-oid="7wi7iv4">
                                        <div
                                    className={styles.waveBg}
                                    style={{ height: `${set.sessionFatigue.earlyAccuracy * 0.8}%` }} data-oid="m94arq0">
                                  </div>
                                      </div>
                                      <div className="flex-1 flex flex-col justify-end" data-oid="_e2475b">
                                        <div
                                    className={styles.waveBg}
                                    style={{ height: `${(set.sessionFatigue.earlyAccuracy + set.sessionFatigue.lateAccuracy) / 2 * 0.8}%` }} data-oid="oe:-l77">
                                  </div>
                                      </div>
                                      <div className="flex-1 flex flex-col justify-end" data-oid="vesommb">
                                        <div
                                    className={styles.waveBg}
                                    style={{ height: `${set.sessionFatigue.lateAccuracy * 0.8}%` }} data-oid="-flva3j">
                                  </div>
                                      </div>
                                    </div>
                                    <div className="flex justify-between mt-1 text-[10px] text-slate-500 dark:text-slate-400" data-oid="uncd5-.">
                                      <span data-oid="o_q7iux">Incoming</span>
                                      <span data-oid="4sepci.">Peak</span>
                                      <span data-oid="_gf:rli">Outgoing</span>
                                    </div>
                                  </div>
                                  
                                  {/* Session details */}
                                  <div className="grid grid-cols-2 gap-3" data-oid="z5v-vv5">
                                    <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-lg" data-oid="5-z7dj4">
                                      <div className="text-sm text-slate-700 dark:text-slate-300 font-medium" data-oid="hm-c974">Marine Specimens</div>
                                      <div className="text-sm text-slate-600 dark:text-slate-400 mt-1" data-oid="r-c:8l6">
                                        {set.questions.length} collected
                                      </div>
                                    </div>
                                    <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-lg" data-oid="3mm0-gq">
                                      <div className="text-sm text-slate-700 dark:text-slate-300 font-medium" data-oid="6ijjsl5">Expedition Time</div>
                                      <div className="text-sm text-slate-600 dark:text-slate-400 mt-1" data-oid="gir56__">
                                        {Math.floor(set.timeUsed / 60)} minutes
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                    }
                      </div>);

              })}
                </div>
              </div>
            </div>
        )}
      </div>
      
      {/* CSS for animations */}
      <style jsx data-oid="vlrai7y">{`
        @keyframes wave {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-25%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .waves-animated .wave {
          animation: wave 8s linear infinite;
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
        
        @keyframes bubble-rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-20px) scale(1.5);
            opacity: 0;
          }
        }
        
        .wave-container .rounded-full {
          animation: bubble-rise linear forwards;
        }
      `}</style>
    </div>);

};