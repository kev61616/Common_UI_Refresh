'use client';

import React, { useState } from 'react';
import { SetViewProps } from './types';

/**
 * Zen Garden View
 * 
 * A contemplative visualization where practice sets appear as rocks and patterns in sand
 * within a Japanese Zen garden aesthetic.
 * 
 * Primary insight objective: To answer "How does my study material balance help me achieve mindful learning?"
 * 
 * Data-to-visual mapping:
 * - Rock size → Set size/importance (visual weight corresponds to content volume)
 * - Rock placement → Time relationship (position reflects chronological or conceptual proximity)
 * - Sand patterns → Subject connections (ripple patterns show relationships between sets)
 * - Rock texture → Material difficulty (rougher texture = more challenging material)
 * - Plant elements → Growth/mastery indicators (moss and small plants show mastery development)
 * 
 * This visualization enables users to:
 * 1. Understand the balance and harmony of their study materials
 * 2. Recognize patterns and relationships between different content areas
 * 3. Identify areas of focus vs. areas of neglect
 * 4. Appreciate the aesthetic balance of their learning approach
 */
export function ZenGardenView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [hoveredRock, setHoveredRock] = useState<string | null>(null);

  // Organize sets by subject (for different sand pattern areas)
  const subjectGroups = practiceSets.reduce((groups, set) => {
    if (!groups[set.subject]) {
      groups[set.subject] = [];
    }
    groups[set.subject].push(set);
    return groups;
  }, {} as Record<string, typeof practiceSets>);

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="61weh5_">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="ezs8plq">47. Zen Garden View</h3>
      
      <div className="zen-garden relative h-[600px] bg-[#f8f4e8] dark:bg-slate-800 rounded-lg overflow-hidden" data-oid="-yl78ng">
        {/* Garden background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f4e8] to-[#e8e4d8] dark:from-slate-800 dark:to-slate-900" data-oid="6ciwnzb"></div>
        
        {/* Sand base */}
        <div className="absolute inset-0" data-oid="8cbgdq:">
          <svg width="100%" height="100%" className="opacity-30 dark:opacity-20" data-oid=".dvp59y">
            <pattern id="sandTexture" width="100" height="100" patternUnits="userSpaceOnUse" data-oid="ue1z-ek">
              <path d="M0,0 L10,10 M20,0 L30,10 M0,20 L10,30 M20,20 L30,30" stroke="#ccc" strokeWidth="1" fill="none" className="dark:stroke-slate-600" data-oid="9x.q7yj" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#sandTexture)" data-oid="v4jih.l" />
          </svg>
        </div>
        
        {/* Garden content */}
        <div className="relative h-full p-6 flex flex-col" data-oid="mrn0:sm">
          <div className="flex-1 flex" data-oid="seyzx-c">
            {/* Left zen area (Math) */}
            {subjectGroups['Math'] &&
            <div className="w-1/3 relative" data-oid="imzefu1">
                <div className="absolute inset-0 overflow-hidden" data-oid="9:2p89d">
                  {/* Sand pattern */}
                  <svg className="w-full h-full" data-oid="w5euih-">
                    <pattern id="mathPattern" patternUnits="userSpaceOnUse" width="200" height="200" data-oid="ct3p:jp">
                      <path
                      d="M0,100 C50,80 150,120 200,100 M0,50 C50,30 150,70 200,50 M0,150 C50,130 150,170 200,150"
                      fill="none"
                      stroke="#d9d3c2"
                      strokeWidth="3"
                      className="dark:stroke-slate-700" data-oid="p9r_lqa" />

                    </pattern>
                    <rect width="100%" height="100%" fill="url(#mathPattern)" opacity="0.6" data-oid="l0op:.w" />
                  </svg>
                  
                  {/* Rocks (Math sets) */}
                  {subjectGroups['Math'].map((set, index) => {
                  // Calculate position based on index and accuracy
                  const posX = 20 + index % 3 * 30;
                  const posY = 20 + Math.floor(index / 3) * 30;
                  const size = 35 + set.questions.length / 2; // Rock size based on question count

                  return (
                    <div
                      key={set.id}
                      onClick={() => onSelectSet(set.id)}
                      onMouseEnter={() => setHoveredRock(set.id)}
                      onMouseLeave={() => setHoveredRock(null)}
                      className={`absolute rounded-full cursor-pointer transition-all duration-300 overflow-hidden
                          ${selectedSetId === set.id ? 'ring-4 ring-blue-300 dark:ring-blue-500 z-20' : 'z-10'}
                          ${hoveredRock === set.id ? 'shadow-lg scale-105' : 'shadow'}
                        `}
                      style={{
                        left: `${posX}%`,
                        top: `${posY}%`,
                        width: `${size}px`,
                        height: `${size}px`,
                        background: `radial-gradient(circle at ${30 + Math.random() * 40}% ${30 + Math.random() * 40}%, #a3a3a3, #6b7280)`
                      }} data-oid="1znq9jn">

                        {/* Moss on top of rock (based on accuracy) */}
                        {set.accuracy > 75 &&
                      <div
                        className="absolute rounded-full bg-green-200 dark:bg-green-800 opacity-80"
                        style={{
                          width: `${size * 0.7}px`,
                          height: `${size * 0.4}px`,
                          top: `${Math.random() * 5}px`,
                          left: `${Math.random() * 20}px`,
                          transform: `rotate(${Math.random() * 360}deg)`
                        }} data-oid="jqltxlu">
                      </div>
                      }
                      </div>);

                })}
                </div>
              </div>
            }
            
            {/* Center zen area (Reading) */}
            {subjectGroups['Reading'] &&
            <div className="w-1/3 relative" data-oid="5-:l_9w">
                <div className="absolute inset-0 overflow-hidden" data-oid="4-heonl">
                  {/* Sand pattern */}
                  <svg className="w-full h-full" data-oid="zzdasj5">
                    <pattern id="readingPattern" patternUnits="userSpaceOnUse" width="200" height="200" data-oid="egzo17h">
                      <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#d9d3c2"
                      strokeWidth="2"
                      className="dark:stroke-slate-700" data-oid="fxe:wdg" />

                      <circle
                      cx="100"
                      cy="100"
                      r="60"
                      fill="none"
                      stroke="#d9d3c2"
                      strokeWidth="2"
                      className="dark:stroke-slate-700" data-oid="9f8vc9c" />

                      <circle
                      cx="100"
                      cy="100"
                      r="40"
                      fill="none"
                      stroke="#d9d3c2"
                      strokeWidth="2"
                      className="dark:stroke-slate-700" data-oid="8zx.koc" />

                    </pattern>
                    <rect width="100%" height="100%" fill="url(#readingPattern)" opacity="0.6" data-oid=".607b0z" />
                  </svg>
                  
                  {/* Rocks (Reading sets) */}
                  {subjectGroups['Reading'].map((set, index) => {
                  // Calculate position in circular pattern
                  const angle = index / subjectGroups['Reading'].length * Math.PI * 2;
                  const radius = 30 + set.accuracy / 3; // Higher accuracy = farther from center
                  const posX = 50 + radius * Math.cos(angle);
                  const posY = 50 + radius * Math.sin(angle);
                  const size = 30 + set.questions.length / 2; // Rock size based on question count

                  return (
                    <div
                      key={set.id}
                      onClick={() => onSelectSet(set.id)}
                      onMouseEnter={() => setHoveredRock(set.id)}
                      onMouseLeave={() => setHoveredRock(null)}
                      className={`absolute rounded-full cursor-pointer transition-all duration-300 overflow-hidden
                          ${selectedSetId === set.id ? 'ring-4 ring-emerald-300 dark:ring-emerald-500 z-20' : 'z-10'}
                          ${hoveredRock === set.id ? 'shadow-lg scale-105' : 'shadow'}
                        `}
                      style={{
                        left: `${posX}%`,
                        top: `${posY}%`,
                        width: `${size}px`,
                        height: `${size * 0.7}px`,
                        background: `radial-gradient(circle at ${30 + Math.random() * 40}% ${30 + Math.random() * 40}%, #a3a3a3, #4b5563)`
                      }} data-oid="91dzcko">

                        {/* Small plant on rock for high accuracy */}
                        {set.accuracy > 85 &&
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3" data-oid="5ayu71g">
                            <div className="relative w-1 h-8 bg-green-700 dark:bg-green-600" data-oid="aodyqzv"></div>
                            <div className="absolute top-1 left-0 w-3 h-1 bg-green-700 dark:bg-green-600 transform -rotate-20" data-oid="1t-6.0x"></div>
                            <div className="absolute top-3 left-0 w-4 h-1 bg-green-700 dark:bg-green-600 transform -rotate-10" data-oid="qcl3x87"></div>
                            <div className="absolute top-2 right-0 w-3 h-1 bg-green-700 dark:bg-green-600 transform rotate-20" data-oid="1buzvce"></div>
                            <div className="absolute top-4 right-0 w-2 h-1 bg-green-700 dark:bg-green-600 transform rotate-10" data-oid="ay8-w:k"></div>
                          </div>
                      }
                      </div>);

                })}
                </div>
              </div>
            }
            
            {/* Right zen area (Writing) */}
            {subjectGroups['Writing'] &&
            <div className="w-1/3 relative" data-oid="4ukygoq">
                <div className="absolute inset-0 overflow-hidden" data-oid="a9alp.e">
                  {/* Sand pattern */}
                  <svg className="w-full h-full" data-oid=":0:uk.1">
                    <pattern id="writingPattern" patternUnits="userSpaceOnUse" width="200" height="200" data-oid="srb5vwc">
                      <path
                      d="M0,0 L200,200 M0,40 L160,200 M40,0 L200,160 M0,80 L120,200 M80,0 L200,120 M0,120 L80,200 M120,0 L200,80 M0,160 L40,200 M160,0 L200,40 M0,200 L200,0"
                      fill="none"
                      stroke="#d9d3c2"
                      strokeWidth="1.5"
                      className="dark:stroke-slate-700" data-oid="v8_5hk0" />

                    </pattern>
                    <rect width="100%" height="100%" fill="url(#writingPattern)" opacity="0.6" data-oid="055ltwb" />
                  </svg>
                  
                  {/* Rocks (Writing sets) */}
                  {subjectGroups['Writing'].map((set, index) => {
                  // Calculate positions in a zigzag pattern
                  const row = Math.floor(index / 2);
                  const posX = index % 2 === 0 ? 30 : 60;
                  const posY = 20 + row * 25;
                  const size = 25 + set.questions.length / 2; // Rock size based on question count

                  return (
                    <div
                      key={set.id}
                      onClick={() => onSelectSet(set.id)}
                      onMouseEnter={() => setHoveredRock(set.id)}
                      onMouseLeave={() => setHoveredRock(null)}
                      className={`absolute rounded-sm cursor-pointer transition-all duration-300 overflow-hidden
                          ${selectedSetId === set.id ? 'ring-4 ring-amber-300 dark:ring-amber-500 z-20' : 'z-10'}
                          ${hoveredRock === set.id ? 'shadow-lg scale-105' : 'shadow'}
                        `}
                      style={{
                        left: `${posX}%`,
                        top: `${posY}%`,
                        width: `${size}px`,
                        height: `${size * 1.2}px`,
                        background: `linear-gradient(45deg, #9ca3af, #6b7280)`,
                        transform: `rotate(${(index % 3 - 1) * 15}deg)`
                      }} data-oid="-z2wiw6">

                        {/* Moss or lichen on rock based on accuracy */}
                        {set.accuracy > 70 &&
                      <div
                        className="absolute rounded-full bg-green-300 dark:bg-green-700 mix-blend-overlay"
                        style={{
                          width: `${10 + set.accuracy / 10}px`,
                          height: `${10 + set.accuracy / 10}px`,
                          top: `${Math.random() * size / 2}px`,
                          left: `${Math.random() * size / 2}px`
                        }} data-oid="n5e_7wr">
                      </div>
                      }
                      </div>);

                })}
                </div>
              </div>
            }
          </div>
          
          {/* Legend and info panel at bottom */}
          <div className="mt-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200 dark:border-slate-700" data-oid="hu6ur52">
            {hoveredRock || selectedSetId ?
            <div className="flex items-start" data-oid="u6zilkd">
                <div className="flex-1" data-oid="ixap1.c">
                  {/* Set details */}
                  {practiceSets.map((set) => {
                  if (set.id !== (hoveredRock || selectedSetId)) return null;

                  return (
                    <div key={set.id} className="flex flex-col" data-oid="v_krpdt">
                        <h4 className="font-medium text-lg text-slate-900 dark:text-white" data-oid=":6xhqck">{set.type}</h4>
                        <div className="flex items-center mt-1" data-oid="mmdw-jo">
                          <div className={`w-3 h-3 rounded-full mr-2 ${
                        set.subject === 'Math' ? 'bg-blue-500' :
                        set.subject === 'Reading' ? 'bg-emerald-500' :
                        'bg-amber-500'}`
                        } data-oid="18ib6w2"></div>
                          <span className="text-slate-600 dark:text-slate-300" data-oid="ctcjgk:">{set.subject}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-3" data-oid="myxuh31">
                          <div data-oid="5o_kitw">
                            <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="p._59i.">Accuracy</div>
                            <div className="font-medium" data-oid="md-mgki">{set.accuracy}%</div>
                          </div>
                          <div data-oid="6yi05_3">
                            <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="0azw6b9">Questions</div>
                            <div className="font-medium" data-oid="ptra9b_">{set.questions.length}</div>
                          </div>
                          <div data-oid="mj1ze50">
                            <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="4--yix.">Difficulty</div>
                            <div className="font-medium" data-oid="yjygnoz">{set.difficulty}</div>
                          </div>
                        </div>
                      </div>);

                })}
                </div>
                <div className="max-w-[200px] text-sm ml-4 py-1 px-3 bg-slate-100 dark:bg-slate-700 rounded-lg" data-oid="t2u664-">
                  <div className="font-medium mb-1 text-slate-900 dark:text-white" data-oid="9qh.838">Zen Garden Elements</div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs" data-oid="78.s77u">
                    Rocks represent study sets. Their size, shape, and arrangement reflect their importance in your learning journey.
                  </p>
                </div>
              </div> :

            <div className="flex justify-between items-start text-sm" data-oid="p5-use0">
                <div className="space-y-2" data-oid="q48zite">
                  <div className="flex items-center" data-oid="o5bus6s">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" data-oid="k8odm05"></div>
                    <span data-oid=".cw9ek3">Mathematics - Linear Patterns</span>
                  </div>
                  <div className="flex items-center" data-oid="vvhdlaj">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2" data-oid="vozftmi"></div>
                    <span data-oid="ljbky1p">Reading - Circular Patterns</span>
                  </div>
                  <div className="flex items-center" data-oid="tn8pt1h">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2" data-oid="p4228uk"></div>
                    <span data-oid="y2zwkjp">Writing - Angular Patterns</span>
                  </div>
                </div>
                <div className="text-right" data-oid=".9_desl">
                  <div className="font-medium mb-1" data-oid="pkpx-k7">Contemplative Learning</div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs max-w-[300px]" data-oid="5r2hu_8">
                    This Zen garden represents your learning journey. Each rock is a practice set; 
                    its size, position, and surrounding patterns reflect its role in your knowledge landscape.
                  </p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}