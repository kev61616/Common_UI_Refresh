'use client'

import { useState, useEffect } from 'react'
import { TimelineViewProps } from './types'

/**
 * Neon Cyberpunk Timeline (Timeline View Variant 26)
 * A futuristic cyberpunk-themed timeline with neon colors, tech-inspired elements,
 * and a digital aesthetic
 */
export function NeonCyberpunkTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  const [hoveredSetId, setHoveredSetId] = useState<string | null>(null);
  const [glitchEffect, setGlitchEffect] = useState<boolean>(false);
  
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
      const element = document.getElementById(`cyberpunk-set-${selectedSetId}`);
      if (element) {
        // Add glitch effect when scrolling to selected element
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 1000);
        
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedSetId]);
  
  // Format date in cyberpunk style
  const formatCyberpunkDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 0-based
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')} [${hours}:${minutes}]`;
  };
  
  // Generate neon color based on subject
  const getNeonColor = (subject: string) => {
    switch(subject) {
      case 'Math':
        return {
          primary: 'from-cyan-400 to-blue-500',
          glow: 'shadow-cyan-500/50',
          border: 'border-cyan-500',
          text: 'text-cyan-400',
          bg: 'bg-cyan-900/20',
          accent: '#0ff'
        };
      case 'Reading':
        return {
          primary: 'from-green-400 to-emerald-500',
          glow: 'shadow-emerald-500/50',
          border: 'border-emerald-500',
          text: 'text-emerald-400',
          bg: 'bg-emerald-900/20',
          accent: '#0f8'
        };
      case 'Writing':
        return {
          primary: 'from-fuchsia-400 to-purple-500',
          glow: 'shadow-fuchsia-500/50',
          border: 'border-fuchsia-500',
          text: 'text-fuchsia-400',
          bg: 'bg-fuchsia-900/20',
          accent: '#f0f'
        };
      default:
        return {
          primary: 'from-amber-400 to-orange-500',
          glow: 'shadow-amber-500/50',
          border: 'border-amber-500',
          text: 'text-amber-400',
          bg: 'bg-amber-900/20',
          accent: '#ff0'
        };
    }
  };
  
  // Generate binary animation effect for background
  const generateBinaryBackground = () => {
    return [...Array(20)].map((_, i) => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const opacity = Math.random() * 0.1 + 0.05;
      const size = Math.random() * 0.4 + 0.6; // 0.6 - 1
      const animation = `float-${Math.floor(Math.random() * 3)}`;
      
      return (
        <div 
          key={`binary-${i}`}
          className={`absolute text-slate-500/20 dark:text-slate-400/10 text-sm font-mono ${animation}`}
          style={{
            top: `${top}%`,
            left: `${left}%`,
            opacity,
            transform: `scale(${size})`,
            animation: `float 20s infinite ease-in-out`
          }}
        >
          {Math.random() > 0.5 ? '1' : '0'}
        </div>
      );
    });
  };
  
  // Generate tech circuit lines for decorative effect
  const generateCircuitLines = () => {
    return (
      <svg className="absolute inset-0 w-full h-full text-slate-700/10 dark:text-slate-400/5 z-0" xmlns="http://www.w3.org/2000/svg">
        <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M0 50h40c5 0 10 5 10 10v30c0 5 5 10 10 10h40" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M100 50h-40c-5 0-10-5-10-10v-30c0-5-5-10-10-10h-40" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="3" fill="currentColor" />
          <circle cx="30" cy="70" r="2" fill="currentColor" />
          <circle cx="70" cy="30" r="2" fill="currentColor" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
      </svg>
    );
  };
  
  // Calculate performance stats and return UI indicators
  const getPerformanceIndicators = (set: any) => {
    const accuracyPercent = set.accuracy;
    const accuracyDegrees = Math.floor((accuracyPercent / 100) * 180);
    
    const totalQuestions = set.questions.length;
    const answeredQuestions = set.questions.filter((q: any) => q.answered).length;
    const completionPercent = Math.floor((answeredQuestions / totalQuestions) * 100);
    
    return (
      <div className="flex items-center space-x-3">
        {/* Accuracy gauge */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          {/* Background circle */}
          <div className="absolute inset-0 border-4 border-slate-800 dark:border-slate-700 rounded-full"></div>
          
          {/* Progress arc */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset={100 - (accuracyPercent)}
              className={`${accuracyPercent >= 90 ? 'text-green-500' : 
                          accuracyPercent >= 70 ? 'text-blue-500' : 
                          accuracyPercent >= 50 ? 'text-amber-500' : 'text-red-500'}`}
            />
          </svg>
          
          {/* Accuracy value */}
          <div className="text-xs font-mono font-bold z-10">{accuracyPercent}%</div>
        </div>
        
        {/* Digital stats */}
        <div className="font-mono text-xs space-y-1">
          <div className="flex space-x-2">
            <span className="opacity-60">TIME:</span>
            <span>{Math.floor(set.timeUsed / 60)}:{(set.timeUsed % 60).toString().padStart(2, '0')}</span>
          </div>
          <div className="flex space-x-2">
            <span className="opacity-60">Q/A:</span>
            <span>{answeredQuestions}/{totalQuestions}</span>
          </div>
          <div className="flex space-x-2">
            <span className="opacity-60">ERR:</span>
            <span className="text-red-500">{set.mistakeTypes.conceptual + set.mistakeTypes.careless}</span>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className={`relative border border-slate-700 dark:border-slate-700 bg-black bg-opacity-95 dark:bg-opacity-90 rounded-xl p-6 overflow-hidden z-0 ${glitchEffect ? 'animate-glitch' : ''}`}>
      <h3 className="text-center font-mono text-2xl mb-6 text-white relative z-10 font-bold tracking-wide">
        <span className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-600">26.</span> NEON CYBERPUNK TIMELINE
      </h3>
      
      <div className="text-center mb-8 text-slate-400 font-mono relative z-10">
        &lt; A futuristic visualization of your learning progress in a digital cyberpunk world &gt;
      </div>
      
      {/* Tech background elements */}
      {generateBinaryBackground()}
      {generateCircuitLines()}
      
      {/* Central timeline with gradient glow */}
      <div className="absolute left-1/2 top-32 bottom-12 w-1 bg-gradient-to-b from-cyan-500/80 via-fuchsia-500/80 to-cyan-500/80 rounded-full shadow-lg shadow-fuchsia-500/20 z-0"></div>
      
      {/* Main timeline content */}
      <div className="relative z-10 space-y-16">
        {sortedMonths.map((month, monthIndex) => {
          const sets = monthlyGroups[month];
          
          return (
            <div key={month} className="relative">
              {/* Month header with cyberpunk style */}
              <div className="mb-8 w-max mx-auto">
                <div className="relative px-4 py-2 rounded bg-slate-900/90 backdrop-blur border border-slate-700 font-mono text-white">
                  <div className="absolute -top-px left-2 right-2 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                  <div className="absolute -bottom-px left-2 right-2 h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent"></div>
                  
                  <div className="flex items-center">
                    <span className="text-cyan-400 mr-2">&gt;</span> 
                    <h4 className="text-lg uppercase tracking-wider">
                      {month}
                    </h4>
                    <span className="bg-fuchsia-500/20 px-1 text-xs rounded ml-2 text-fuchsia-300">
                      {sets.length} {sets.length === 1 ? 'session' : 'sessions'}
                    </span>
                  </div>
                </div>
                
                {/* Connector to timeline */}
                <div className="h-4 w-0.5 mx-auto bg-gradient-to-b from-cyan-500 to-transparent"></div>
              </div>
              
              {/* Practice sets with alternating sides */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                {sets.map((set, setIndex) => {
                  const isSelected = set.id === selectedSetId;
                  const isHovered = set.id === hoveredSetId;
                  const colors = getNeonColor(set.subject);
                  
                  // Alternate left and right in desktop view
                  const isLeft = setIndex % 2 === 0;
                  
                  return (
                    <div 
                      id={`cyberpunk-set-${set.id}`}
                      key={set.id}
                      className={`relative ${isLeft ? 'md:col-start-1' : 'md:col-start-2'}`}
                      onMouseEnter={() => setHoveredSetId(set.id)}
                      onMouseLeave={() => setHoveredSetId(null)}
                    >
                      {/* Connector to central timeline */}
                      <div className={`absolute hidden md:block ${isLeft ? 'right-0 md:right-auto md:left-full' : 'left-0 md:left-auto md:right-full'} top-1/2 w-4 md:w-8 h-0.5 bg-gradient-to-r ${isLeft ? 'from-transparent to-slate-600' : 'from-slate-600 to-transparent'}`}></div>
                      
                      {/* Connection node */}
                      <div className={`absolute hidden md:block ${isLeft ? '-right-1.5 md:-right-auto md:left-full md:-ml-1.5' : '-left-1.5 md:-left-auto md:right-full md:-mr-1.5'} top-1/2 -mt-1.5 w-3 h-3 rounded-full bg-slate-900 border-2 ${colors.border} shadow-lg ${colors.glow} z-10`}></div>
                      
                      {/* Card with neon glow effect */}
                      <div 
                        onClick={() => onSelectSet(set.id)}
                        className={`relative p-4 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg transition-all duration-300 
                                  ${isSelected ? `${colors.border} shadow-lg ${colors.glow}` : 'hover:border-slate-600'} 
                                  cursor-pointer overflow-hidden`}
                      >
                        {/* Corner hex pattern */}
                        <div className="absolute top-0 right-0 w-20 h-20 opacity-20">
                          <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z" 
                                  fill="none" 
                                  stroke={colors.accent} 
                                  strokeWidth="1"
                                  strokeDasharray="10,4" />
                            <path d="M25 43.3 L50 25 L75 43.3 L75 56.7 L50 75 L25 56.7 Z" 
                                  fill="none" 
                                  stroke={colors.accent} 
                                  strokeWidth="1" />
                          </svg>
                        </div>
                        
                        {/* Header with glowing slash */}
                        <div className="flex items-center justify-between mb-3">
                          <h5 className={`font-mono font-bold tracking-wide text-lg relative z-10 group-hover:text-white ${colors.text}`}>
                            {set.type}
                            <div className={`absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r ${colors.primary} transform scale-x-0 group-hover:scale-x-100 transition-transform`}></div>
                          </h5>
                          
                          <div className="font-mono text-xs text-slate-500 tracking-wide">
                            {formatCyberpunkDate(set.dateCompleted)}
                          </div>
                        </div>
                        
                        {/* Subject badge */}
                        <div className={`inline-block px-2 py-0.5 rounded text-xs font-mono font-bold mb-3 ${colors.bg} ${colors.text}`}>
                          {set.subject.toUpperCase()}
                        </div>
                        
                        {/* Main content */}
                        <div className="text-slate-300 font-mono leading-snug mb-4 text-sm">
                          <p>
                            This session focused on {set.subject} concepts, covering {set.questions.length} questions 
                            with a performance rating of {set.accuracy}%. 
                          </p>
                          
                          {/* Error breakdown */}
                          <div className="mt-2 flex items-center text-xs space-x-4">
                            <div>
                              <span className="text-slate-500">CONCEPTUAL_ERR:</span> 
                              <span className="text-red-500 ml-1">{set.mistakeTypes.conceptual}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">CARELESS_ERR:</span> 
                              <span className="text-amber-500 ml-1">{set.mistakeTypes.careless}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Performance stats with cyberpunk UI elements */}
                        {getPerformanceIndicators(set)}
                        
                        {/* Bottom accent line */}
                        <div className={`absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r ${colors.primary} opacity-50`}></div>
                        
                        {/* Selection indicator */}
                        {isSelected && (
                          <div className="absolute -top-px -bottom-px left-0 w-1 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Instructions */}
      <div className="mt-12 text-center text-slate-500 text-xs font-mono relative z-10">
        <p>{"//// CLICK ON ANY NODE TO VIEW SESSION DETAILS ////"}</p>
      </div>
      
      {/* Cyberpunk animations and styles */}
      <style jsx>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .float-0 {
          animation: float-0 8s infinite ease-in-out;
        }
        
        .float-1 {
          animation: float-1 12s infinite ease-in-out;
        }
        
        .float-2 {
          animation: float-2 15s infinite ease-in-out;
        }
        
        .animate-glitch {
          animation: glitch 0.5s ease-in-out;
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </div>
  );
}
