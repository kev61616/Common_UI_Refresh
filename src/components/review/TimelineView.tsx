'use client';

import { useState, useRef, useEffect } from 'react';
import { TimelineViewProps } from './timeline-view-variants/types';
import { getDataWithFallback } from '@/lib/dataUtils';

/**
 * TimelineView - Displays practice sets as a learning journey with chapters
 * Enhanced with animations, improved visuals, and better interactivity
 */
export function TimelineView({ practiceSets, onSelectSet, selectedSetId, sortConfig, onSortChange }: TimelineViewProps) {
  // Refs for animation targets
  const timelineRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Additional UI state
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const [hoveredSet, setHoveredSet] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState<string | null>(null);
  const [animationEnabled, setAnimationEnabled] = useState(true);

  // Animation effect when component mounts
  useEffect(() => {
    // Set loaded state after a small delay to enable entrance animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Debug data loading
  console.log('TimelineView received practiceSets:', practiceSets?.length);

  // Use the utility function to get data with fallback
  const displaySets = getDataWithFallback(practiceSets);

  // Sort sets by date for chronological order
  const sortedSets = [...displaySets].sort(
    (a, b) => new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
  );

  // Group sets into "chapters" (e.g., by month)
  const chapters = sortedSets.reduce<{
    title: string;
    date: Date;
    sets: typeof practiceSets;
    summary: string;
  }[]>((acc, set) => {
    const date = new Date(set.dateCompleted);
    const monthYear = `${date.toLocaleDateString('en-US', { month: 'long' })} ${date.getFullYear()}`;

    // Find existing chapter or create new one
    let chapter = acc.find((c) => c.title === monthYear);
    if (!chapter) {
      // Create summaries based on performance
      const averagePerformance = set.accuracy;
      let summary = "";

      if (averagePerformance >= 85) {
        summary = "An impressive period of mastery and achievement.";
      } else if (averagePerformance >= 70) {
        summary = "Solid progress and consistent effort.";
      } else {
        summary = "A challenging period with valuable learning opportunities.";
      }

      chapter = {
        title: monthYear,
        date,
        sets: [],
        summary
      };
      acc.push(chapter);
    }

    chapter.sets.push(set);
    return acc;
  }, []);

  // Sort chapters chronologically
  chapters.sort((a, b) => a.date.getTime() - b.date.getTime());

  // Calculate chapter achievements
  const getChapterAchievements = (sets: typeof practiceSets) => {
    const totalSets = sets.length;
    const avgAccuracy = Math.round(sets.reduce((sum, set) => sum + set.accuracy, 0) / totalSets);
    const fastestSet = sets.reduce((fastest, set) =>
    set.timeUsed < fastest.timeUsed ? set : fastest, sets[0]);
    const highestAccuracy = sets.reduce((highest, set) =>
    set.accuracy > highest.accuracy ? set : highest, sets[0]);

    return { totalSets, avgAccuracy, fastestSet, highestAccuracy };
  };

  // Get emoji milestone for achievements - using a deterministic approach to avoid hydration errors
  const getMilestoneEmoji = (achievement: number) => {
    // Use static string references rather than dynamic calculations to ensure
    // consistent results between server and client rendering
    const achievementValue = Math.floor(achievement);

    if (achievementValue >= 90) return '🏆';
    if (achievementValue >= 80) return '🌟';
    if (achievementValue >= 70) return '🎯';
    if (achievementValue >= 60) return '📈';
    return '🔍';
  };

  // Toggle animation setting
  const toggleAnimations = () => {
    setAnimationEnabled(!animationEnabled);
  };

  // Toggle detailed view for a set
  const toggleDetails = (setId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedDetails(expandedDetails === setId ? null : setId);
  };

  return (
    <div
      ref={timelineRef}
      className={`border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm max-w-4xl mx-auto 
                 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} data-oid="seezw9i">

      {/* Enhanced top controls */}
      <div className="flex justify-between items-center mb-6" data-oid="lzsg0i2">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white" data-oid="f9c-a6s">Timeline View</h2>
        
        <div className="flex items-center gap-3" data-oid="_o759j9">
          {/* Animation toggle */}
          <button
            onClick={toggleAnimations}
            className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            title={animationEnabled ? "Disable animations" : "Enable animations"} data-oid=".fsplp8">

            <span data-oid="jm311:k">{animationEnabled ? "✨" : "🚫"}</span>
            <span data-oid="2._xw2q">Animations</span>
          </button>
        </div>
      </div>
      
      {/* Chapter navigation with enhanced visuals */}
      <div className="flex justify-center mb-8 overflow-x-auto py-2 hide-scrollbar" data-oid="q:8_eoo">
        <div className="flex space-x-1.5" data-oid="cnokviy">
          {chapters.map((chapter, index) => {
            const { avgAccuracy } = getChapterAchievements(chapter.sets);
            const isActive = activeChapter === index;

            return (
              <button
                key={chapter.title}
                onClick={() => setActiveChapter(isActive ? null : index)}
                className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 flex items-center whitespace-nowrap
                           transform hover:scale-105 ${isActive ? 'scale-105' : ''}
                           ${isActive ?
                'bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-800 dark:from-indigo-900/60 dark:to-indigo-900/30 dark:text-indigo-100 shadow-md' :
                'bg-white hover:bg-slate-50 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`} data-oid="8di.mz.">

                <span className={`mr-2 transition-transform duration-300 ${isActive ? 'transform scale-125' : ''}`} data-oid="u00:fqy">
                  {getMilestoneEmoji(avgAccuracy)}
                </span>
                <span data-oid="3-3ah73">{chapter.title}</span>
              </button>);

          })}
        </div>
      </div>
      
      {/* Enhanced timeline path with better visuals and animations */}
      <div className="relative pb-10 pt-4 ml-4 md:ml-8" data-oid="gy4m_j5">
        {/* Decorative timeline path with gradient */}
        <div className="absolute top-0 bottom-0 left-0 w-1 md:w-1.5 bg-gradient-to-b from-indigo-200 via-indigo-300 to-indigo-500 dark:from-indigo-900 dark:via-indigo-800 dark:to-indigo-600 rounded-full" data-oid="3yagch-"></div>
        
        {chapters.map((chapter, chapterIndex) => {
          const { totalSets, avgAccuracy, fastestSet, highestAccuracy } = getChapterAchievements(chapter.sets);
          const isActive = activeChapter === null || activeChapter === chapterIndex;

          return (
            <div
              key={chapter.title}
              ref={(el) => {
                chapterRefs.current[chapterIndex] = el;
                return undefined;
              }}
              className={`mb-14 ${isActive ? 'block' : 'hidden'} ${
              animationEnabled && isLoaded ?
              'opacity-0 animate-fadeIn' :
              ''}`
              } data-oid="4giy5eh">

              {/* Enhanced chapter marker with pulse animation */}
              <div className={`absolute -left-3 md:-left-4 w-6 h-6 md:w-8 md:h-8 
                           bg-gradient-to-br from-indigo-100 to-indigo-200 
                           dark:from-indigo-800 dark:to-indigo-900 
                           rounded-full border-2 border-indigo-500 
                           flex items-center justify-center shadow-md z-10
                           ${animationEnabled ? 'animate-pulse-subtle' : ''}`} data-oid="gs2hbpk">
                <span className="text-xs md:text-sm font-bold text-indigo-600 dark:text-indigo-300" data-oid="41zw096">
                  {chapterIndex + 1}
                </span>
              </div>
              
              {/* Enhanced chapter header with card styling */}
              <div className="ml-6 md:ml-10 mb-6 p-3 bg-white/50 dark:bg-slate-800/20 rounded-lg border border-slate-100 dark:border-slate-700/40 backdrop-blur-sm" data-oid="ehi2-_f">
                <h5 className="text-xl font-bold flex items-center text-indigo-600 dark:text-indigo-400 gap-2" data-oid="5co-ec5">
                  {chapter.title} 
                  <span className={`${animationEnabled && isLoaded ? 'animate-bounce-subtle' : ''}`} data-oid=":pxzkis">
                    {getMilestoneEmoji(avgAccuracy)}
                  </span>
                </h5>
                <p className="text-slate-600 dark:text-slate-400 italic" data-oid="nmqyrc1">{chapter.summary}</p>
              </div>
              
              {/* Practice sets within chapter - with staggered entry animations */}
              <div className="space-y-6 ml-6 md:ml-10" data-oid="0ombxvz">
                {chapter.sets.map((set, setIndex) => {
                  const isExpanded = expandedDetails === set.id;
                  const isHovered = hoveredSet === set.id;

                  return (
                    <div
                      key={set.id}
                      onClick={() => onSelectSet(set.id)}
                      onMouseEnter={() => setHoveredSet(set.id)}
                      onMouseLeave={() => setHoveredSet(null)}
                      className={`p-4 rounded-lg cursor-pointer border transition-all duration-300
                                ${animationEnabled && isLoaded ? `animate-fadeInUp animation-delay-${setIndex * 100}` : ''}
                                ${selectedSetId === set.id ?
                      'bg-gradient-to-br from-indigo-50 to-slate-50 border-indigo-200 dark:from-indigo-900/20 dark:to-slate-800 dark:border-indigo-700 shadow-lg scale-[1.02] z-10 relative' :
                      'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 hover:shadow-md hover:scale-[1.01] hover:bg-slate-50/80 dark:hover:bg-slate-700/70'}`} data-oid=".ta0a5q">

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3" data-oid="tky9ncu">
                        {/* Set details */}
                        <div className="flex-grow" data-oid=":-e3p67">
                          <div className="flex items-center gap-2 mb-1" data-oid="j82nxlm">
                            <div className={`px-2 py-1 text-xs rounded-full shadow-sm ${
                            set.subject === 'Reading' ? 'bg-gradient-to-r from-sky-100 to-blue-100 text-sky-700 dark:from-sky-900/50 dark:to-blue-900/30 dark:text-sky-300' :
                            set.subject === 'Math' ? 'bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-700 dark:from-indigo-900/50 dark:to-violet-900/30 dark:text-indigo-300' :
                            'bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 dark:from-violet-900/50 dark:to-purple-900/30 dark:text-violet-300'}`
                            } data-oid="yzn_toa">
                              {set.subject}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="kfj:5z2">
                              {new Date(set.dateCompleted).toLocaleDateString()}
                            </div>
                            
                            {/* Detail toggle button */}
                            <button
                              onClick={(e) => toggleDetails(set.id, e)}
                              className="ml-auto text-slate-400 hover:text-indigo-500 dark:text-slate-500 dark:hover:text-indigo-400 transition-colors"
                              aria-label={isExpanded ? "Show less details" : "Show more details"} data-oid="qc5.o.d">

                              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="arsip61">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" data-oid="gwm08rf" />
                              </svg>
                            </button>
                          </div>
                          
                          <h6 className="font-bold text-lg" data-oid="t1ata3r">{set.type}</h6>
                          
                          {/* Narrative description */}
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1" data-oid="zdjjl4l">
                            {set.accuracy >= 90 ?
                            `An exceptional performance that showcases your mastery of ${set.subject.toLowerCase()} concepts.` :
                            set.accuracy >= 75 ?
                            `A strong result demonstrating solid understanding of ${set.subject.toLowerCase()} principles.` :
                            set.accuracy >= 60 ?
                            `A good effort with room for improvement in some ${set.subject.toLowerCase()} areas.` :
                            `A challenging session that identified key areas to focus on in ${set.subject.toLowerCase()}.`
                            }
                          </p>
                          
                          {/* Expanded details */}
                          {isExpanded &&
                          <div className={`mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 ${
                          animationEnabled ? 'animate-expandVertical' : ''}`
                          } data-oid="ae_oini">
                              <h4 className="font-medium text-sm text-slate-700 dark:text-slate-300 mb-2" data-oid="domsw-k">Detailed Performance</h4>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2" data-oid="9_5qb3n">
                                <div className="text-xs bg-slate-50 dark:bg-slate-800/80 p-2 rounded" data-oid="_u-bc3-">
                                  <span className="text-slate-500 dark:text-slate-400" data-oid="fr09xct">Time spent:</span>
                                  <div className="font-medium text-slate-800 dark:text-slate-200" data-oid="_9r57bv">
                                    {Math.floor(set.timeUsed / 60)}m {set.timeUsed % 60}s
                                  </div>
                                </div>
                                
                                <div className="text-xs bg-slate-50 dark:bg-slate-800/80 p-2 rounded" data-oid="j0vk8ec">
                                  <span className="text-slate-500 dark:text-slate-400" data-oid="z2r_q6d">Questions:</span>
                                  <div className="font-medium text-slate-800 dark:text-slate-200" data-oid="pg.8_kt">
                                    {set.questions?.length || 0} total
                                  </div>
                                </div>
                                
                                <div className="text-xs bg-slate-50 dark:bg-slate-800/80 p-2 rounded" data-oid=":qg6hie">
                                  <span className="text-slate-500 dark:text-slate-400" data-oid="iqt-wv4">Pace:</span>
                                  <div className="font-medium text-slate-800 dark:text-slate-200" data-oid=":euurct">
                                    {set.pace}
                                  </div>
                                </div>
                              </div>
                            </div>
                          }
                        </div>
                        
                        {/* Stats and badges */}
                        <div className="flex flex-row md:flex-col items-center gap-3 md:min-w-[100px]" data-oid="wv9mzd3">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                          isHovered || selectedSetId === set.id ? 'scale-110' : ''} ${

                          set.accuracy >= 80 ?
                          'bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-800 dark:from-emerald-900/30 dark:to-green-900/20 dark:text-emerald-300' :
                          set.accuracy >= 60 ?
                          'bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-800 dark:from-amber-900/30 dark:to-yellow-900/20 dark:text-amber-300' :
                          'bg-gradient-to-br from-rose-100 to-red-100 text-rose-800 dark:from-rose-900/30 dark:to-red-900/20 dark:text-rose-300'}`
                          } data-oid="d:a8dc5">
                            <span className={`text-2xl font-bold ${animationEnabled && (isHovered || selectedSetId === set.id) ? 'animate-pulse-subtle' : ''}`} data-oid="0_b2zmg">
                              {set.accuracy}%
                            </span>
                          </div>
                          
                          {/* Special achievement badges with improved visuals */}
                          <div className="flex flex-wrap gap-1 justify-center" data-oid="j9h3ih1">
                            {set.id === highestAccuracy.id &&
                            <span className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/20 text-indigo-700 dark:text-indigo-300 text-xs px-2 py-1 rounded-full shadow-sm flex items-center gap-1" data-oid=":11kjfy">
                                <span data-oid="ij5jw2d">⭐</span>
                                <span data-oid="eucnh_v">Highest</span>
                              </span>
                            }
                            {set.id === fastestSet.id &&
                            <span className="bg-gradient-to-r from-sky-100 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/20 text-sky-700 dark:text-sky-300 text-xs px-2 py-1 rounded-full shadow-sm flex items-center gap-1" data-oid="iyx_5.k">
                                <span data-oid="lyb02tl">⚡</span> 
                                <span data-oid="g7ip.4r">Fastest</span>
                              </span>
                            }
                          </div>
                        </div>
                      </div>
                    </div>);

                })}
                
                {/* Enhanced chapter conclusion */}
                <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-700 mt-4 shadow-md" data-oid="kalx8lp">
                  <div className="font-medium text-slate-700 dark:text-slate-300" data-oid="hlodjof">Chapter Summary</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mt-1" data-oid="w5pd3-e">
                    Completed {totalSets} practice sets with an average accuracy of {avgAccuracy}%.
                    {avgAccuracy >= 85 ?
                    " This was an exceptional performance period." :
                    avgAccuracy >= 70 ?
                    " You showed consistent progress during this chapter." :
                    " This chapter provided valuable learning opportunities."
                    }
                  </div>
                </div>
              </div>
            </div>);

        })}
        
        {/* Enhanced journey end with animations */}
        <div className={`absolute -left-3 md:-left-4 bottom-0 w-6 h-6 md:w-8 md:h-8 
                      bg-gradient-to-br from-indigo-400 to-indigo-600 dark:from-indigo-600 dark:to-indigo-800
                      rounded-full border-2 border-indigo-500 dark:border-indigo-400
                      flex items-center justify-center z-10
                      ${animationEnabled ? 'animate-pulse-subtle' : ''}`} data-oid="xzf_a6t">
          <span className="text-white transform rotate-0" data-oid="9j_9drh">🏁</span>
        </div>
        <div className="ml-6 md:ml-10 pb-6" data-oid="u730yz9">
          <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2" data-oid="jv-cf.h">
            Current Progress
            <span className={`text-sm inline-block ${animationEnabled ? 'animate-bounce-subtle' : ''}`} data-oid="zzapng4">
              👨‍🎓
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400" data-oid="sen7zvf">
            Your progress continues! Overall accuracy: {
            displaySets.length > 0 ?
            Math.round(displaySets.reduce((sum, set) => sum + set.accuracy, 0) / displaySets.length) :
            0
            }%
          </p>
          
          {/* Progress visualization */}
          {displaySets.length > 0 &&
          <div className="mt-3 bg-slate-100 dark:bg-slate-700/30 h-2 w-full rounded-full overflow-hidden" data-oid="viovhau">
              <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-500 dark:to-purple-600 rounded-full"
              style={{
                width: `${Math.min(Math.round(displaySets.reduce((sum, set) => sum + set.accuracy, 0) / displaySets.length), 100)}%`,
                transition: 'width 1s ease-in-out'
              }} data-oid="t.mc0fv">
            </div>
            </div>
          }
        </div>
      </div>
    </div>);

}