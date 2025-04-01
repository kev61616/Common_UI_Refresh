'use client'

import { useState, useRef, useEffect } from 'react';
import { PracticeSet } from '@/lib/mockData'
import { getDataWithFallback } from '@/lib/dataUtils'

interface TimelineViewProps {
  practiceSets: PracticeSet[];
  onSelectSet?: (id: string) => void;
  selectedSetId?: string | null;
}

/**
 * EnhancedTimelineView - A visually appealing timeline that displays practice sets
 * as a learning journey with improved styling, animations, and layout
 */
export function EnhancedTimelineView({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  // Use the utility function to get data with fallback
  const displaySets = getDataWithFallback(practiceSets);
  
  // Sort sets by date for chronological order
  const sortedSets = [...displaySets].sort(
    (a, b) => new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
  );
  
  // Active chapter state
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Scroll position tracking
  const timelineRef = useRef<HTMLDivElement>(null);
  const [visibleNodes, setVisibleNodes] = useState<number[]>([]);
  
  // Group sets into "chapters" (e.g., by month)
  const chapters = sortedSets.reduce<{
    title: string;
    date: Date;
    sets: typeof practiceSets;
    summary: string;
    icon: string;
  }[]>((acc, set) => {
    const date = new Date(set.dateCompleted);
    const monthYear = `${date.toLocaleDateString('en-US', { month: 'long' })} ${date.getFullYear()}`;
    
    // Find existing chapter or create new one
    let chapter = acc.find(c => c.title === monthYear);
    if (!chapter) {
      // Create summaries based on performance and choose an appropriate icon
      const averagePerformance = set.accuracy;
      let summary = "";
      let icon = "";
      
      if (averagePerformance >= 85) {
        summary = "An impressive period of mastery and achievement.";
        icon = "🏆";
      } else if (averagePerformance >= 70) {
        summary = "Solid progress and consistent effort.";
        icon = "📈";
      } else {
        summary = "A challenging period with valuable learning opportunities.";
        icon = "🔍";
      }
      
      chapter = {
        title: monthYear,
        date,
        sets: [],
        summary,
        icon
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
  
  // Get color class based on accuracy
  const getAccuracyColorClass = (accuracy: number) => {
    if (accuracy >= 90) return {
      bg: 'bg-gradient-to-r from-emerald-500 to-emerald-600', 
      text: 'text-emerald-50', 
      light: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      medium: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      dark: 'bg-emerald-900/20 text-emerald-300 border-emerald-800/50'
    };
    if (accuracy >= 80) return {
      bg: 'bg-gradient-to-r from-green-500 to-teal-500', 
      text: 'text-green-50',
      light: 'bg-green-50 text-green-700 border-green-200',
      medium: 'bg-green-100 text-green-800 border-green-300',
      dark: 'bg-green-900/20 text-green-300 border-green-800/50'
    };
    if (accuracy >= 70) return {
      bg: 'bg-gradient-to-r from-blue-500 to-indigo-500', 
      text: 'text-blue-50',
      light: 'bg-blue-50 text-blue-700 border-blue-200',
      medium: 'bg-blue-100 text-blue-800 border-blue-300',
      dark: 'bg-blue-900/20 text-blue-300 border-blue-800/50'
    };
    if (accuracy >= 60) return {
      bg: 'bg-gradient-to-r from-amber-500 to-orange-500', 
      text: 'text-amber-50',
      light: 'bg-amber-50 text-amber-700 border-amber-200',
      medium: 'bg-amber-100 text-amber-800 border-amber-300',
      dark: 'bg-amber-900/20 text-amber-300 border-amber-800/50'
    };
    return {
      bg: 'bg-gradient-to-r from-rose-500 to-red-500', 
      text: 'text-rose-50',
      light: 'bg-rose-50 text-rose-700 border-rose-200',
      medium: 'bg-rose-100 text-rose-800 border-rose-300',
      dark: 'bg-rose-900/20 text-rose-300 border-rose-800/50'
    };
  };
  
  // Get subject color and icon
  const getSubjectStyles = (subject: string) => {
    switch (subject) {
      case 'Reading':
        return {
          color: 'bg-gradient-to-r from-sky-500 to-cyan-400',
          textColor: 'text-sky-50',
          lightBg: 'bg-sky-50 text-sky-700 border-sky-200',
          darkBg: 'bg-sky-900/30 text-sky-300 border-sky-800/50',
          icon: '📚'
        };
      case 'Math':
        return {
          color: 'bg-gradient-to-r from-indigo-500 to-purple-500',
          textColor: 'text-indigo-50',
          lightBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          darkBg: 'bg-indigo-900/30 text-indigo-300 border-indigo-800/50',
          icon: '🔢'
        };
      case 'Writing':
        return {
          color: 'bg-gradient-to-r from-violet-500 to-fuchsia-500',
          textColor: 'text-violet-50',
          lightBg: 'bg-violet-50 text-violet-700 border-violet-200',
          darkBg: 'bg-violet-900/30 text-violet-300 border-violet-800/50',
          icon: '✏️'
        };
      default:
        return {
          color: 'bg-gradient-to-r from-slate-500 to-slate-600',
          textColor: 'text-slate-50',
          lightBg: 'bg-slate-50 text-slate-700 border-slate-200',
          darkBg: 'bg-slate-900/30 text-slate-300 border-slate-800/50',
          icon: '📝'
        };
    }
  };
  
  // Scroll detection for animations
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      const timeline = timelineRef.current;
      const nodes = Array.from(timeline.querySelectorAll('.timeline-node'));
      
      const visibleIndices: number[] = [];
      
      nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        // Node is visible if it's in the viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          visibleIndices.push(index);
        }
      });
      
      setVisibleNodes(visibleIndices);
    };
    
    // Initialize
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Initial load animation
  useEffect(() => {
    // Set initial load to false after a delay to trigger animations
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
      {/* Journey title */}
      <div className="text-center mb-10 mt-2">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-3">
          Your Learning Journey
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Track your progress through time, visualizing your growth and achievements along the way
        </p>
      </div>
      
      {/* Chapter navigation - Enhanced with better visuals */}
      <div className="overflow-x-auto py-4 hide-scrollbar mb-8">
        <div className="flex space-x-2 justify-center min-w-max">
          {chapters.map((chapter, index) => {
            const { avgAccuracy } = getChapterAchievements(chapter.sets);
            const colors = getAccuracyColorClass(avgAccuracy);
            const isActive = activeChapter === index;
            
            return (
              <button
                key={chapter.title}
                onClick={() => setActiveChapter(isActive ? null : index)}
                className={`
                  px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-300
                  border shadow-sm flex items-center gap-2 whitespace-nowrap
                  transform hover:-translate-y-1 hover:shadow-md
                  ${isActive 
                    ? `${colors.bg} ${colors.text} border-transparent` 
                    : `bg-white hover:${colors.light} text-slate-700 dark:bg-slate-800 
                      dark:text-slate-300 dark:hover:${colors.dark} border-slate-200 dark:border-slate-700`}
                `}
              >
                <span className="text-xl">{chapter.icon}</span>
                <span>{chapter.title}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Enhanced timeline with improved visuals */}
      <div 
        ref={timelineRef}
        className="relative pb-16"
      >
        {/* Decorative timeline connector - fancier than just a line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-300 via-purple-300 to-indigo-300 dark:from-indigo-800 dark:via-purple-800 dark:to-indigo-800">
          {/* Animated dots traveling down the timeline */}
          <div className="absolute w-1.5 h-1.5 bg-indigo-500 rounded-full -left-0.5 animate-timeline-travel"></div>
          <div className="absolute w-1.5 h-1.5 bg-purple-500 rounded-full -left-0.5 animate-timeline-travel-delay"></div>
        </div>
        
        {/* Mobile timeline connector */}
        <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-300 via-purple-300 to-indigo-300 dark:from-indigo-800 dark:via-purple-800 dark:to-indigo-800">
          <div className="absolute w-1.5 h-1.5 bg-indigo-500 rounded-full -left-0.5 animate-timeline-travel"></div>
          <div className="absolute w-1.5 h-1.5 bg-purple-500 rounded-full -left-0.5 animate-timeline-travel-delay"></div>
        </div>
        
        {/* Timeline entries */}
        {chapters.map((chapter, chapterIndex) => {
          const { totalSets, avgAccuracy, fastestSet, highestAccuracy } = getChapterAchievements(chapter.sets);
          const isActive = activeChapter === null || activeChapter === chapterIndex;
          const colors = getAccuracyColorClass(avgAccuracy);
          const isVisible = visibleNodes.includes(chapterIndex);
          const isEven = chapterIndex % 2 === 0;
          
          return (
            <div 
              key={chapter.title} 
              className={`
                timeline-node mb-16 transition-all duration-500
                ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'}
                ${isVisible || !isInitialLoad ? 'translate-y-0' : 'translate-y-8'}
              `}
              style={{ 
                transitionDelay: `${(chapterIndex % 5) * 100}ms`,
                display: isActive ? 'block' : 'none'
              }}
            >
              {/* Chapter bubble marker */}
              <div className={`
                absolute z-10
                md:left-1/2 md:-ml-5 left-8 -ml-5
                w-10 h-10 rounded-full flex items-center justify-center shadow-md
                ${colors.bg} ${colors.text} border-2 border-white dark:border-slate-800
              `}>
                <span className="text-lg">{chapter.icon}</span>
              </div>
              
              {/* Chapter content - alternating sides on desktop */}
              <div className={`
                md:w-5/12 w-full rounded-xl overflow-hidden shadow-lg
                ${isEven ? 'md:ml-auto' : 'md:mr-auto'} 
                md:transform ${isEven ? 'md:translate-x-8' : 'md:-translate-x-8'}
                ml-16 md:ml-0 relative
              `}>
                {/* Chapter header */}
                <div className={`${colors.bg} text-white p-5`}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{chapter.title}</h3>
                    <span className="text-2xl">{chapter.icon}</span>
                  </div>
                  <p className="text-white/90 mt-1 text-sm">
                    {chapter.summary}
                  </p>
                </div>
                
                {/* Chapter achievements */}
                <div className="bg-white dark:bg-slate-800 p-5 border-b border-slate-100 dark:border-slate-700">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                    <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                      <span className="text-lg mb-1">📚</span>
                      <span className="text-2xl font-bold text-slate-800 dark:text-white">{totalSets}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Sets Completed</span>
                    </div>
                    <div className={`flex flex-col items-center justify-center ${colors.light} dark:${colors.dark} rounded-lg p-3`}>
                      <span className="text-lg mb-1">📊</span>
                      <span className={`text-2xl font-bold ${
                        avgAccuracy >= 80 ? 'text-emerald-600 dark:text-emerald-400' :
                        avgAccuracy >= 60 ? 'text-amber-600 dark:text-amber-400' :
                        'text-rose-600 dark:text-rose-400'
                      }`}>{avgAccuracy}%</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Avg Accuracy</span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                      <span className="text-lg mb-1">⚡</span>
                      <span className="text-2xl font-bold text-slate-800 dark:text-white">
                        {Math.floor(fastestSet.timeUsed / 60)}:{String(fastestSet.timeUsed % 60).padStart(2, '0')}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Fastest Time</span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                      <span className="text-lg mb-1">🎯</span>
                      <span className={`text-2xl font-bold ${
                        highestAccuracy.accuracy >= 80 ? 'text-emerald-600 dark:text-emerald-400' :
                        highestAccuracy.accuracy >= 60 ? 'text-amber-600 dark:text-amber-400' :
                        'text-rose-600 dark:text-rose-400'
                      }`}>{highestAccuracy.accuracy}%</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Highest Score</span>
                    </div>
                  </div>
                </div>
                
                {/* Practice sets */}
                <div className="bg-white dark:bg-slate-800 divide-y divide-slate-100 dark:divide-slate-700">
                  {chapter.sets.map((set) => {
                    const subjectStyle = getSubjectStyles(set.subject);
                    const accuracyColor = getAccuracyColorClass(set.accuracy);
                    
                    return (
                      <div 
                        key={set.id}
                        onClick={() => onSelectSet && onSelectSet(set.id)}
                        className={`
                          p-4 transition-all duration-300 cursor-pointer
                          hover:bg-slate-50 dark:hover:bg-slate-700/50
                          ${selectedSetId === set.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`
                              ${subjectStyle.color} ${subjectStyle.textColor}
                              w-10 h-10 rounded-full flex items-center justify-center shadow mr-3
                            `}>
                              <span className="text-xl">{subjectStyle.icon}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <div className={`px-2 py-0.5 text-xs rounded-full ${subjectStyle.lightBg} dark:${subjectStyle.darkBg}`}>
                                  {set.subject}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                  {new Date(set.dateCompleted).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </div>
                              </div>
                              <h6 className="font-semibold">{set.type}</h6>
                            </div>
                          </div>
                          
                          <div className={`
                            min-w-[60px] h-[60px] rounded-full flex flex-col items-center justify-center 
                            ${accuracyColor.medium} dark:${accuracyColor.dark}
                            shadow-sm border
                          `}>
                            <span className="text-lg font-bold">{set.accuracy}%</span>
                            <span className="text-xs">Score</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Chapter summary */}
                <div className={`${colors.light} dark:${colors.dark} p-4 border-t`}>
                  <div className="text-sm">
                    <div className="font-medium mb-1">Chapter Reflection</div>
                    <p>
                      {avgAccuracy >= 85 
                        ? `You demonstrated exceptional mastery of the material during ${chapter.title.toLowerCase()}, with remarkable scores across ${totalSets} practice sets.`
                        : avgAccuracy >= 70
                          ? `Your consistent effort during ${chapter.title.toLowerCase()} showed steady improvement and strong understanding across ${totalSets} practice sets.`
                          : `This chapter presented valuable challenges that identified key learning opportunities across ${totalSets} practice sets.`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Journey end marker */}
        <div className="absolute md:left-1/2 md:-ml-6 left-8 -ml-6 bottom-0 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-800">
          <span className="text-white text-xl">🏁</span>
        </div>
        
        {/* Current progress summary */}
        <div className="md:w-5/12 w-full md:ml-auto ml-16 md:transform md:translate-x-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-5">
            <h3 className="text-xl font-bold">Current Progress</h3>
            <p className="text-white/90 text-sm">Your ongoing learning journey</p>
          </div>
          
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-lg font-medium">Overall Accuracy</div>
              <div className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${displaySets.length > 0 
                  ? getAccuracyColorClass(Math.round(displaySets.reduce((sum, set) => sum + set.accuracy, 0) / displaySets.length)).medium
                  : 'bg-slate-100 text-slate-700'
                }
                dark:${displaySets.length > 0 
                  ? getAccuracyColorClass(Math.round(displaySets.reduce((sum, set) => sum + set.accuracy, 0) / displaySets.length)).dark
                  : 'bg-slate-700 text-slate-300'
                }
              `}>
                {displaySets.length > 0 
                  ? Math.round(displaySets.reduce((sum, set) => sum + set.accuracy, 0) / displaySets.length)
                  : 0
                }%
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-5">
              <div 
                className={`h-full ${
                  displaySets.length > 0 
                    ? getAccuracyColorClass(Math.round(displaySets.reduce((sum, set) => sum + set.accuracy, 0) / displaySets.length)).bg
                    : 'bg-slate-400'
                }`}
                style={{
                  width: `${displaySets.length > 0 
                    ? Math.round(displaySets.reduce((sum, set) => sum + set.accuracy, 0) / displaySets.length)
                    : 0
                  }%`
                }}
              ></div>
            </div>
            
            {/* Stats summary */}
            <div className="grid grid-cols-3 gap-3 text-center mb-4">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3">
                <div className="text-xs text-slate-500 dark:text-slate-400">Practice Sets</div>
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{displaySets.length}</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                <div className="text-xs text-slate-500 dark:text-slate-400">Time Periods</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{chapters.length}</div>
              </div>
              <div className="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-3">
                <div className="text-xs text-slate-500 dark:text-slate-400">Total Hours</div>
                <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                  {Math.round(displaySets.reduce((sum, set) => sum + set.timeUsed, 0) / 60)}
                </div>
              </div>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Your learning journey spans {chapters.length} time periods, showcasing your dedication to improvement
              and growth. Continue building on your progress!
            </p>
          </div>
        </div>
      </div>
      
      {/* Custom animations */}
      <style jsx global>{`
        @keyframes timelineTravel {
          0% { top: 0; opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
        
        .animate-timeline-travel {
          animation: timelineTravel 10s infinite;
        }
        
        .animate-timeline-travel-delay {
          animation: timelineTravel 12s 2s infinite;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
