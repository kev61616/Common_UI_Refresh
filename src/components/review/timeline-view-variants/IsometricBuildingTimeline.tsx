'use client';

import { useState, useEffect } from 'react';
import { TimelineViewProps } from './types';

/**
 * Isometric Building Timeline (Timeline View Variant 27)
 * A timeline visualization that represents practice sessions as buildings in an isometric city,
 * with building heights, styles, and details based on session performance and properties.
 */
export function IsometricBuildingTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  const [hoveredSetId, setHoveredSetId] = useState<string | null>(null);

  // Group practice sets by month
  const monthlyGroups = practiceSets.reduce((groups, set) => {
    const date = new Date(set.dateCompleted);
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(set);
    return groups;
  }, {} as Record<string, typeof practiceSets>);

  // Sort months chronologically
  const sortedMonths = Object.keys(monthlyGroups).sort((a, b) => {
    const dateA = new Date(monthlyGroups[a][0].dateCompleted);
    const dateB = new Date(monthlyGroups[b][0].dateCompleted);
    return dateA.getTime() - dateB.getTime();
  });

  // Auto-scroll to selected set
  useEffect(() => {
    if (selectedSetId) {
      const element = document.getElementById(`isometric-set-${selectedSetId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedSetId]);

  // Determine building style based on subject
  const getBuildingStyle = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          baseColor: 'bg-blue-700 dark:bg-blue-800',
          accentColor: 'bg-blue-500 dark:bg-blue-600',
          roofColor: 'bg-blue-900 dark:bg-blue-950',
          borderColor: 'border-blue-800 dark:border-blue-700',
          windowColor: 'bg-blue-300 dark:bg-blue-400',
          icon: '📊',
          buildingType: 'scientific'
        };
      case 'Reading':
        return {
          baseColor: 'bg-green-700 dark:bg-green-800',
          accentColor: 'bg-green-500 dark:bg-green-600',
          roofColor: 'bg-green-900 dark:bg-green-950',
          borderColor: 'border-green-800 dark:border-green-700',
          windowColor: 'bg-green-300 dark:bg-green-400',
          icon: '📚',
          buildingType: 'library'
        };
      case 'Writing':
        return {
          baseColor: 'bg-purple-700 dark:bg-purple-800',
          accentColor: 'bg-purple-500 dark:bg-purple-600',
          roofColor: 'bg-purple-900 dark:bg-purple-950',
          borderColor: 'border-purple-800 dark:border-purple-700',
          windowColor: 'bg-purple-300 dark:bg-purple-400',
          icon: '✏️',
          buildingType: 'creative'
        };
      default:
        return {
          baseColor: 'bg-gray-700 dark:bg-gray-800',
          accentColor: 'bg-gray-500 dark:bg-gray-600',
          roofColor: 'bg-gray-900 dark:bg-gray-950',
          borderColor: 'border-gray-800 dark:border-gray-700',
          windowColor: 'bg-gray-300 dark:bg-gray-400',
          icon: '🏢',
          buildingType: 'standard'
        };
    }
  };

  // Calculate building height based on performance
  const getBuildingHeight = (accuracy: number, questions: any[]) => {
    // Base height from accuracy
    const baseHeight = 50 + accuracy / 2; // 50-100px
    // Additional height based on number of questions
    const questionBonus = Math.min(questions.length * 2, 50); // Max 50px bonus
    return baseHeight + questionBonus;
  };

  // Render a single isometric building (practice set)
  const renderIsometricBuilding = (set: any, style: any, buildingHeight: number, isSelected: boolean, isHovered: boolean) => {
    // Building width and depth
    const width = 80;
    const depth = 60;

    // Calculate windows
    const questionCount = set.questions.length;
    const windowRows = Math.min(Math.ceil(questionCount / 3), 5);

    // Determine if it's a skyscraper or shorter building
    const isSkyscraper = buildingHeight > 120;

    return (
      <div className="relative" style={{ height: `${buildingHeight + 40}px`, width: `${width + 40}px` }} data-oid="c4qn1sm">
        {/* Building base/shadow */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-4 bg-black/20 dark:bg-black/40 blur-sm rounded-full" data-oid="3:qwpsn"></div>
        
        {/* Isometric building container */}
        <div className={`absolute bottom-4 left-0 w-full h-full transition-all duration-300 ${isSelected || isHovered ? 'transform scale-105' : ''}`} data-oid="ki7.ysn">
          {/* Building structure - rendered in an isometric style */}
          <div className="absolute bottom-0 left-4 right-4" style={{ height: `${buildingHeight}px` }} data-oid="a70wmyh">
            {/* Front face */}
            <div
              className={`absolute bottom-0 left-0 ${style.baseColor} border-r ${style.borderColor} transform skew-x-[30deg] origin-bottom-right transition-all duration-300`}
              style={{
                width: `${width / 2}px`,
                height: `${buildingHeight}px`,
                boxShadow: isSelected ? '0 0 15px rgba(255, 255, 255, 0.3)' : 'none'
              }} data-oid="8tyl8l5">

              {/* Windows on front face */}
              {Array.from({ length: windowRows }).map((_, rowIndex) =>
              <div key={`front-row-${rowIndex}`} className="flex justify-center mt-4" data-oid="4vku9v.">
                  {Array.from({ length: 2 }).map((_, windowIndex) => {
                  const windowNum = rowIndex * 3 + windowIndex;
                  const hasQuestion = windowNum < set.questions.length;
                  const isCorrect = hasQuestion && set.questions[windowNum].correct;

                  return (
                    <div
                      key={`front-window-${rowIndex}-${windowIndex}`}
                      className={`mx-1 w-3 h-4 ${hasQuestion ? isCorrect ? 'bg-yellow-300 dark:bg-yellow-400' : style.windowColor : 'bg-gray-800/30 dark:bg-gray-900/30'}`} data-oid="j32w1.w">
                    </div>);

                })}
                </div>
              )}
              
              {/* Door on front face */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-10 bg-amber-900 dark:bg-amber-950 rounded-t" data-oid="g9yn9j-"></div>
            </div>
            
            {/* Side face */}
            <div
              className={`absolute bottom-0 right-0 ${style.accentColor} border-l ${style.borderColor} transform skew-x-[-30deg] origin-bottom-left transition-all duration-300`}
              style={{
                width: `${width / 2}px`,
                height: `${buildingHeight}px`,
                boxShadow: isSelected ? '0 0 15px rgba(255, 255, 255, 0.3)' : 'none'
              }} data-oid="5npadb1">

              {/* Windows on side face */}
              {Array.from({ length: windowRows }).map((_, rowIndex) =>
              <div key={`side-row-${rowIndex}`} className="flex justify-center mt-4" data-oid="chtxu6:">
                  {Array.from({ length: 1 }).map((_, windowIndex) => {
                  const windowNum = rowIndex * 3 + windowIndex + 2;
                  const hasQuestion = windowNum < set.questions.length;
                  const isCorrect = hasQuestion && set.questions[windowNum].correct;

                  return (
                    <div
                      key={`side-window-${rowIndex}-${windowIndex}`}
                      className={`mx-1 w-3 h-4 ${hasQuestion ? isCorrect ? 'bg-yellow-300 dark:bg-yellow-400' : style.windowColor : 'bg-gray-800/30 dark:bg-gray-900/30'}`} data-oid="_6gxcbc">
                    </div>);

                })}
                </div>
              )}
            </div>
            
            {/* Roof */}
            {isSkyscraper ?
            // Skyscraper spire
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center" data-oid="p-sq5q.">
                <div className={`w-4 h-6 ${style.roofColor}`} data-oid="5r_w8rg"></div>
                <div className={`w-2 h-4 ${style.roofColor}`} data-oid="jrnor4n"></div>
                <div className="w-1 h-2 bg-red-500 animate-pulse" data-oid="ekukta1"></div>
              </div> :

            // Normal roof (isometric)
            <div className="absolute -top-10 left-0 w-full h-10" data-oid="n0xafvl">
                <div
                className={`absolute bottom-0 left-0 right-0 ${style.roofColor} transform-gpu`}
                style={{
                  clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
                  height: '20px'
                }} data-oid="3d8m_82">
              </div>
              </div>
            }
            
            {/* Building type-specific details */}
            {style.buildingType === 'scientific' &&
            <div className="absolute -top-4 right-2 w-6 h-6 bg-slate-400 dark:bg-slate-600 rounded-full" data-oid="2wz200i">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-5 bg-slate-600 dark:bg-slate-800" data-oid="dma3uto"></div>
              </div>
            }
            {style.buildingType === 'library' &&
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-12 h-1 bg-amber-700 dark:bg-amber-900" data-oid="mgmcw2a"></div>
            }
            {style.buildingType === 'creative' &&
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-8 h-8 rotate-45 bg-purple-500 dark:bg-purple-700" data-oid=":h8--oa"></div>
            }
          </div>
        </div>
        
        {/* Subject icon */}
        <div className="absolute -top-6 right-0 w-8 h-8 rounded-full bg-white dark:bg-slate-700 shadow flex items-center justify-center" data-oid="1zgx6jq">
          <span data-oid="k2t0fma">{style.icon}</span>
        </div>
        
        {/* Accuracy badge */}
        <div className="absolute top-0 left-0 bg-slate-700 dark:bg-slate-900 text-white text-xs px-1.5 py-0.5 rounded" data-oid="7tu-dn9">
          {set.accuracy}%
        </div>
        
        {/* Selection indicator */}
        {isSelected &&
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-full h-1 bg-blue-500 dark:bg-blue-400 rounded animate-pulse" data-oid="7zeyr26"></div>
        }
      </div>);

  };

  // Render ground grid for each district/month
  const renderDistrictGround = (monthIndex: number) => {
    return (
      <div className="absolute bottom-0 left-0 right-0 h-4 flex" data-oid=":iv1y2v">
        <div
          className="flex-1 transform skew-x-[30deg] bg-slate-200 dark:bg-slate-800 border-r border-slate-300 dark:border-slate-700"
          style={{
            transformOrigin: 'bottom right',
            backgroundImage: monthIndex % 2 === 0 ?
            'linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.05) 75%, transparent 75%, transparent)' :
            'none',
            backgroundSize: '10px 10px'
          }} data-oid="rww1f0:">
        </div>
        <div
          className="flex-1 transform skew-x-[-30deg] bg-slate-300 dark:bg-slate-700 border-l border-slate-400 dark:border-slate-600"
          style={{
            transformOrigin: 'bottom left',
            backgroundImage: monthIndex % 2 === 0 ?
            'none' :
            'linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.05) 75%, transparent 75%, transparent)',
            backgroundSize: '10px 10px'
          }} data-oid="v.s:cax">
        </div>
      </div>);

  };

  // Render roads between districts/months
  const renderRoad = () => {
    return (
      <div className="h-10 relative mt-8 mb-4" data-oid="g9j6i5y">
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-4 bg-slate-600 dark:bg-slate-800" data-oid=":o4-48v"></div>
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-0.5 bg-yellow-400 dark:bg-yellow-500 dashed-line" data-oid="ao1_:gn"></div>
      </div>);

  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 bg-gradient-to-b from-sky-100 to-sky-200 dark:from-slate-900 dark:to-slate-800 shadow-md" data-oid="_coouu3">
      <h3 className="text-center text-2xl mb-4 text-slate-800 dark:text-slate-200 font-bold" data-oid="cdj4u9t">
        <span className="text-3xl" data-oid="k6vti71">27.</span> Isometric Building Timeline
      </h3>
      
      <div className="text-center mb-8 text-slate-600 dark:text-slate-400 italic" data-oid="y7n10ck">
        Visualize your learning journey as a growing isometric city with buildings representing practice sessions
      </div>
      
      {/* Sky elements */}
      <div className="absolute top-12 right-10 w-16 h-16 bg-yellow-200 dark:bg-yellow-300 rounded-full opacity-60 dark:opacity-30" data-oid="hv::wah"></div>
      <div className="absolute top-24 right-24 w-3 h-3 bg-white rounded-full opacity-60" data-oid="-99-ma_"></div>
      <div className="absolute top-36 right-48 w-2 h-2 bg-white rounded-full opacity-60" data-oid="f:.4n4i"></div>
      <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-60" data-oid="e6eptgl"></div>
      <div className="absolute top-32 left-36 w-3 h-3 bg-white rounded-full opacity-60" data-oid="-bi0iez"></div>
      
      {/* Timeline districts by month */}
      <div className="mt-12 space-y-8 relative" data-oid="tl2tiek">
        {sortedMonths.map((month, monthIndex) => {
          const sets = monthlyGroups[month];

          return (
            <div key={month} className="relative" data-oid="d::ujz7">
              {/* Month/district name */}
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md mb-6 inline-block" data-oid="nhz8cbt">
                <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center" data-oid="3qb5we9">
                  <span className="text-slate-600 dark:text-slate-400 mr-2" data-oid="azsr03f">District</span>
                  {month}
                  <span className="ml-2 px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-xs" data-oid="sa3lq:n">
                    {sets.length} {sets.length === 1 ? 'building' : 'buildings'}
                  </span>
                </h4>
              </div>
              
              <div className="relative" data-oid="iq_m1.x">
                {/* Buildings grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 relative" data-oid="qqyrl52">
                  {sets.map((set) => {
                    const isSelected = set.id === selectedSetId;
                    const isHovered = set.id === hoveredSetId;
                    const style = getBuildingStyle(set.subject);
                    const buildingHeight = getBuildingHeight(set.accuracy, set.questions);

                    return (
                      <div
                        id={`isometric-set-${set.id}`}
                        key={set.id}
                        className="relative"
                        onMouseEnter={() => setHoveredSetId(set.id)}
                        onMouseLeave={() => setHoveredSetId(null)}
                        onClick={() => onSelectSet(set.id)} data-oid="9sqdet7">

                        {renderIsometricBuilding(set, style, buildingHeight, isSelected, isHovered)}
                        
                        {/* Set details on hover/selection */}
                        {(isHovered || isSelected) &&
                        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 bg-white dark:bg-slate-800 p-2 rounded shadow-lg text-xs min-w-48 z-10" data-oid="_byx6b1">
                            <div className="font-bold text-sm mb-1" data-oid="39a1kyo">{set.type}</div>
                            
                            <div className="flex justify-between mb-1" data-oid="_ln8zf3">
                              <span data-oid="qlwdfyk">Subject:</span>
                              <span className="font-medium" data-oid="cqsgw30">{set.subject}</span>
                            </div>
                            
                            <div className="flex justify-between mb-1" data-oid="vurk0jb">
                              <span data-oid="dyzicqc">Date:</span>
                              <span className="font-medium" data-oid="1mr2w-_">{new Date(set.dateCompleted).toLocaleDateString()}</span>
                            </div>
                            
                            <div className="flex justify-between mb-1" data-oid="93ff:ws">
                              <span data-oid="_zroqr_">Questions:</span>
                              <span className="font-medium" data-oid="i:jpop.">{set.questions.length}</span>
                            </div>
                            
                            <div className="flex justify-between mb-1" data-oid="-ziz5re">
                              <span data-oid="_t6nw0z">Time:</span>
                              <span className="font-medium" data-oid="a74v22a">{Math.floor(set.timeUsed / 60)}m {set.timeUsed % 60}s</span>
                            </div>
                            
                            <div className="flex justify-between mb-1" data-oid="ci15dt-">
                              <span data-oid="26dh2.4">Accuracy:</span>
                              <span className={`font-medium ${set.accuracy >= 80 ? 'text-green-600 dark:text-green-400' : set.accuracy >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`} data-oid="f-q5886">{set.accuracy}%</span>
                            </div>
                            
                            <div className="flex justify-between text-xs" data-oid="dk3rez1">
                              <span data-oid="ye37yoa">Errors:</span>
                              <span data-oid="nm9cik5">
                                <span className="text-red-500 dark:text-red-400 mr-1" data-oid="22obqdz">C:{set.mistakeTypes.conceptual}</span>
                                <span className="text-amber-500 dark:text-amber-400" data-oid="9hjr15w">K:{set.mistakeTypes.careless}</span>
                              </span>
                            </div>
                          </div>
                        }
                      </div>);

                  })}
                </div>
                
                {/* District ground */}
                <div className="relative h-8 mt-4" data-oid="_:s-ux-">
                  {renderDistrictGround(monthIndex)}
                </div>
              </div>
              
              {/* Road to next district */}
              {monthIndex < sortedMonths.length - 1 && renderRoad()}
            </div>);

        })}
      </div>
      
      <div className="text-center text-slate-500 dark:text-slate-400 text-sm mt-8" data-oid="dl37veh">
        Click on any building to see detailed information about that practice session
      </div>
      
      {/* Custom CSS for dashed road lines */}
      <style jsx data-oid="lmwd4lq">{`
        .dashed-line {
          background-image: linear-gradient(to right, 
            rgba(250, 204, 21, 0.8) 50%, 
            transparent 50%
          );
          background-size: 16px 1px;
          background-repeat: repeat-x;
        }
        
        @media (prefers-color-scheme: dark) {
          .dashed-line {
            background-image: linear-gradient(to right, 
              rgba(234, 179, 8, 0.8) 50%, 
              transparent 50%
            );
          }
        }
      `}</style>
    </div>);

}