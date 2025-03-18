'use client'

import { useState, useEffect, useRef } from 'react'
import { TimelineViewProps } from './types'

/**
 * Parallax Scrolling Timeline (Timeline View Variant 25)
 * A timeline visualization with parallax scrolling effects for an immersive view
 * of practice sessions over time
 */
export function ParallaxScrollingTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  const [isScrolling, setIsScrolling] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  
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
  
  // Auto-scroll to selected set with parallax effect
  useEffect(() => {
    if (selectedSetId && timelineRef.current) {
      const element = document.getElementById(`parallax-set-${selectedSetId}`);
      if (element) {
        setIsScrolling(true);
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Update parallax positions during programmatic scrolling
        const handleScroll = () => {
          updateParallaxPositions();
        };
        
        window.addEventListener('scroll', handleScroll);
        
        // Reset scrolling state after animation completes
        setTimeout(() => {
          setIsScrolling(false);
          window.removeEventListener('scroll', handleScroll);
        }, 1000);
      }
    }
  }, [selectedSetId]);
  
  // Set up scroll event listener for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling) {
        updateParallaxPositions();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    updateParallaxPositions(); // Initial position update
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolling]);
  
  // Update positions of parallax elements based on scroll
  const updateParallaxPositions = () => {
    if (!timelineRef.current) return;
    
    const scrollY = window.scrollY;
    const parallaxLayers = timelineRef.current.querySelectorAll('.parallax-layer');
    
    parallaxLayers.forEach((layer: Element) => {
      const speed = (layer as HTMLElement).dataset.speed;
      const yPos = -(scrollY * parseFloat(speed || '0'));
      (layer as HTMLElement).style.transform = `translateY(${yPos}px)`;
    });
    
    // Update horizontal parallax elements
    const horizontalLayers = timelineRef.current.querySelectorAll('.parallax-horizontal');
    horizontalLayers.forEach((layer: Element) => {
      const speed = (layer as HTMLElement).dataset.speed;
      const xPos = -(scrollY * parseFloat(speed || '0'));
      (layer as HTMLElement).style.transform = `translateX(${xPos}px)`;
    });
  };
  
  // Get color scheme based on subject
  const getSubjectColors = (subject: string) => {
    switch(subject) {
      case 'Math':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/30',
          border: 'border-blue-300 dark:border-blue-700',
          text: 'text-blue-800 dark:text-blue-200',
          accent: 'bg-blue-200 dark:bg-blue-700',
          icon: '📐'
        };
      case 'Reading':
        return {
          bg: 'bg-green-50 dark:bg-green-900/30',
          border: 'border-green-300 dark:border-green-700',
          text: 'text-green-800 dark:text-green-200',
          accent: 'bg-green-200 dark:bg-green-700',
          icon: '📚'
        };
      case 'Writing':
        return {
          bg: 'bg-purple-50 dark:bg-purple-900/30',
          border: 'border-purple-300 dark:border-purple-700',
          text: 'text-purple-800 dark:text-purple-200',
          accent: 'bg-purple-200 dark:bg-purple-700',
          icon: '✏️'
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-800/50',
          border: 'border-gray-300 dark:border-gray-700',
          text: 'text-gray-800 dark:text-gray-200',
          accent: 'bg-gray-200 dark:bg-gray-700',
          icon: '📝'
        };
    }
  };
  
  // Get depth layer based on performance
  const getDepthLayer = (accuracy: number) => {
    if (accuracy >= 90) return 1; // Closest to viewer
    if (accuracy >= 75) return 2;
    if (accuracy >= 60) return 3;
    return 4; // Furthest from viewer
  };
  
  // Calculate parallax speed based on depth layer
  const getParallaxSpeed = (depthLayer: number) => {
    const baseSpeed = 0.05;
    return baseSpeed * depthLayer;
  };
  
  return (
    <div 
      ref={timelineRef}
      className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 overflow-hidden relative shadow-md"
      style={{ minHeight: '600px' }}
    >
      <h3 className="text-center text-2xl mb-4 text-slate-800 dark:text-slate-200 relative z-10">
        <span className="text-3xl">25.</span> Parallax Scrolling Timeline
      </h3>
      
      <div className="text-center mb-8 text-slate-600 dark:text-slate-400 italic relative z-10">
        An immersive timeline with multi-layered depth perception that responds to scrolling
      </div>
      
      {/* Background decorative elements with parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Slowest moving background layer */}
        <div 
          className="parallax-layer absolute inset-0 opacity-10 dark:opacity-5" 
          data-speed="0.02"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}
        ></div>
        
        {/* Medium moving decorative layer */}
        <div 
          className="parallax-layer absolute inset-0" 
          data-speed="0.05"
        >
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-blue-200/20 to-purple-200/20 dark:from-blue-700/10 dark:to-purple-700/10"
              style={{
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.3
              }}
            ></div>
          ))}
        </div>
        
        {/* Faster moving horizontal decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div 
              key={`horizontal-${i}`}
              className="parallax-horizontal absolute h-px bg-gradient-to-r from-transparent via-slate-300/50 dark:via-slate-600/30 to-transparent"
              data-speed={0.1 + (i * 0.03)}
              style={{
                width: '100%',
                top: `${15 + (i * 20)}%`,
                left: 0
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Main timeline content with parallax effect */}
      <div className="relative z-10 space-y-12">
        {sortedMonths.map((month, monthIndex) => {
          const sets = monthlyGroups[month];
          
          return (
            <div key={month} className="relative">
              {/* Month header with slow parallax effect */}
              <div 
                className="parallax-layer sticky top-4 mb-6 z-20 mx-auto w-max"
                data-speed="0.02"
              >
                <div className="px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-md border border-slate-200 dark:border-slate-700 backdrop-blur-sm">
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    {month}
                  </h4>
                </div>
              </div>
              
              {/* Month connector line */}
              <div className="absolute left-1/2 top-12 bottom-0 w-0.5 bg-gradient-to-b from-slate-300 to-transparent dark:from-slate-600 -z-10"></div>
              
              {/* Practice sets with varying parallax effects based on performance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                {sets.map((set, setIndex) => {
                  const isSelected = set.id === selectedSetId;
                  const colors = getSubjectColors(set.subject);
                  const depthLayer = getDepthLayer(set.accuracy);
                  const parallaxSpeed = getParallaxSpeed(depthLayer);
                  
                  // Alternate left and right in desktop view
                  const isLeft = setIndex % 2 === 0;
                  
                  return (
                    <div 
                      id={`parallax-set-${set.id}`}
                      key={set.id}
                      className={`parallax-layer relative ${isLeft ? 'md:col-start-1' : 'md:col-start-2'} transition-all duration-300`}
                      data-speed={parallaxSpeed.toString()}
                      style={{
                        transform: 'translateY(0px)' // Initial transform
                      }}
                    >
                      {/* Card with depth effect */}
                      <div 
                        onClick={() => onSelectSet(set.id)}
                        className={`relative rounded-xl p-4 ${colors.bg} border ${colors.border} shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${isSelected ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400' : ''}`}
                        style={{
                          transform: `perspective(1000px) rotateX(${isLeft ? '2deg' : '-2deg'}) rotateY(${isLeft ? '-2deg' : '2deg'})`,
                        }}
                      >
                        {/* Subject icon with floating effect */}
                        <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-700 border border-current shadow-sm">
                          <span className="text-lg" role="img" aria-label={set.subject}>{colors.icon}</span>
                        </div>
                        
                        {/* Performance indicator */}
                        <div className="absolute -top-2 -right-2 w-12 h-12 flex items-center justify-center">
                          <div className={`absolute inset-0 rounded-full ${colors.accent} opacity-20 animate-pulse`}></div>
                          <div className="text-center font-mono font-bold text-sm">
                            {set.accuracy}%
                          </div>
                        </div>
                        
                        {/* Card content */}
                        <div className="pt-4">
                          <h5 className={`font-bold text-lg ${colors.text} mb-2`}>
                            {set.type}
                          </h5>
                          
                          <div className="mb-3 text-slate-600 dark:text-slate-400 text-sm">
                            <div className="flex items-center mb-1">
                              <span className="w-5 inline-block opacity-70">🗓️</span>
                              <span>
                                {new Date(set.dateCompleted).toLocaleDateString('en-US', { 
                                  weekday: 'short',
                                  month: 'short', 
                                  day: 'numeric', 
                                  hour: '2-digit', 
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                            <div className="flex items-center mb-1">
                              <span className="w-5 inline-block opacity-70">❓</span>
                              <span>
                                {set.questions.length} questions ({set.questions.filter(q => q.answered).length} attempted)
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="w-5 inline-block opacity-70">⏱️</span>
                              <span>
                                {Math.floor(set.timeUsed / 60)} min {set.timeUsed % 60} sec
                              </span>
                            </div>
                          </div>
                          
                          {/* Error breakdown */}
                          <div className="flex justify-between items-center p-2 rounded-md bg-white/50 dark:bg-slate-800/50 text-xs">
                            <div className="flex flex-col items-center">
                              <span className="font-semibold">Conceptual</span>
                              <span className="text-red-500 dark:text-red-400">{set.mistakeTypes.conceptual}</span>
                            </div>
                            <div className="h-8 w-px bg-slate-300 dark:bg-slate-600"></div>
                            <div className="flex flex-col items-center">
                              <span className="font-semibold">Careless</span>
                              <span className="text-amber-500 dark:text-amber-400">{set.mistakeTypes.careless}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Decorative corner accent */}
                        <div className="absolute bottom-0 right-0 w-8 h-8 overflow-hidden rounded-tl-xl">
                          <div className={`absolute -bottom-4 -right-4 w-8 h-8 transform rotate-45 ${colors.accent}`}></div>
                        </div>
                      </div>
                      
                      {/* Connector line to timeline center */}
                      <div className={`absolute ${isLeft ? 'right-0 md:right-auto md:left-full' : 'left-0 md:left-auto md:right-full'} top-1/2 w-4 md:w-8 h-0.5 bg-slate-300 dark:bg-slate-600`}></div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Foreground parallax layer with fastest movement */}
      <div 
        className="parallax-layer absolute inset-0 pointer-events-none" 
        data-speed="0.15"
      >
        {[...Array(15)].map((_, i) => (
          <div 
            key={`foreground-${i}`}
            className="absolute rounded-full bg-white dark:bg-slate-300"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.3
            }}
          ></div>
        ))}
      </div>
      
      {/* Instructions */}
      <div className="mt-12 text-center text-slate-500 dark:text-slate-400 text-sm relative z-10">
        <p>Scroll to experience the parallax effect. Click on any practice session to select it.</p>
      </div>
    </div>
  );
}
