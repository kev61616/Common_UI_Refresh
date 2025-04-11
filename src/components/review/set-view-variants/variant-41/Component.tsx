'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SetViewProps } from '../../set-view-variants/types';

/**
 * Holographic Card View
 * 
 * A futuristic holographic card view for practice sets that features:
 * - Interactive 3D tilting effect with parallax
 * - Holographic gradient effects that respond to mouse position
 * - Visual indicators for subject/accuracy using color coding
 * - Clean information hierarchy with modern typography
 */
export function Component({ practiceSets, selectedSetId, onSelectSet }: SetViewProps) {
  const [hoveredSet, setHoveredSet] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper function to get color based on subject
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Math':return 'from-blue-500 to-cyan-300';
      case 'Reading':return 'from-purple-500 to-pink-300';
      case 'Writing':return 'from-green-500 to-emerald-300';
      default:return 'from-gray-500 to-gray-300';
    }
  };

  // Helper function to get icon based on subject
  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Math':return '∑';
      case 'Reading':return '📚';
      case 'Writing':return '✏️';
      default:return '📋';
    }
  };

  // Helper function to get performance indicator color
  const getPerformanceColor = (accuracy: number) => {
    if (accuracy >= 90) return 'bg-green-500';
    if (accuracy >= 75) return 'bg-green-300';
    if (accuracy >= 60) return 'bg-yellow-400';
    if (accuracy >= 40) return 'bg-orange-400';
    return 'bg-red-500';
  };

  // Format time from seconds to minutes:seconds
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle 3D effect
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const cards = Array.from(container.querySelectorAll('.holographic-card')) as HTMLElement[];

    const handleMouseMove = (e: Event) => {
      const event = e as MouseEvent;
      const card = event.currentTarget as HTMLElement;
      const cardRect = card.getBoundingClientRect();
      const cardContent = card.querySelector('.card-content') as HTMLElement;
      if (!cardContent) return;

      // Calculate mouse position relative to card center
      const centerX = cardRect.left + cardRect.width / 2;
      const centerY = cardRect.top + cardRect.height / 2;
      const posX = event.clientX - centerX;
      const posY = event.clientY - centerY;

      // Calculate rotation (limited to +/- 10 degrees)
      const rotateY = posX * 10 / (cardRect.width / 2);
      const rotateX = -posY * 10 / (cardRect.height / 2);

      // Apply transform
      cardContent.style.setProperty('--rotateX', `${rotateX}deg`);
      cardContent.style.setProperty('--rotateY', `${rotateY}deg`);
    };

    const handleMouseLeave = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      const cardContent = card.querySelector('.card-content') as HTMLElement;
      if (!cardContent) return;

      // Reset transform
      cardContent.style.setProperty('--rotateX', '0deg');
      cardContent.style.setProperty('--rotateY', '0deg');
    };

    // Add event listeners to all cards
    cards.forEach((card) => {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    // Clean up event listeners on unmount
    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [practiceSets]); // Re-run when practice sets change

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg min-h-[600px]" ref={containerRef} data-oid="09sraus">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white" data-oid="-h7nl:-">
        Holographic Card View
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-oid="4mjvv7s">
        {practiceSets.map((set) => {
          const isSelected = set.id === selectedSetId;
          const isHovered = set.id === hoveredSet;

          return (
            <div
              key={set.id}
              className={`
                holographic-card relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300
                ${isSelected ? 'ring-4 ring-blue-500 scale-105' : ''}
                shadow-xl backdrop-blur-sm
              `}
              onClick={() => onSelectSet(set.id)}
              onMouseEnter={() => setHoveredSet(set.id)}
              onMouseLeave={() => setHoveredSet(null)}
              style={{
                perspective: '1500px',
                transformStyle: 'preserve-3d'
              }} data-oid="zrc-9gs">

              {/* Base card with tilt effect */}
              <div
                className={`
                  card-content relative h-72 p-5 
                  transform transition-transform duration-200 ease-out
                  ${isHovered ? 'card-tilt' : ''}
                  bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black
                `} data-oid="z0htu-y">

                {/* Holographic overlay effects */}
                <div
                  className={`
                    absolute inset-0 bg-gradient-to-r ${getSubjectColor(set.subject)}
                    opacity-20 mix-blend-overlay holographic-shimmer transition-opacity duration-300
                    ${isHovered ? 'opacity-40' : 'opacity-20'}
                  `} data-oid="o1mzxgm" />

                
                {/* Subject icon background */}
                <div className="absolute right-4 top-4 text-4xl opacity-20 blur-sm" data-oid="bwstbsb">
                  {getSubjectIcon(set.subject)}
                </div>
                
                {/* Glare effect on hover */}
                <div
                  className={`
                    absolute inset-0 bg-gradient-to-tr from-white to-transparent
                    opacity-0 transition-opacity duration-300 pointer-events-none
                    ${isHovered ? 'opacity-10' : ''}
                  `} data-oid="20rkjft" />

                
                {/* Top performance bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-800" data-oid="sm:687a">
                  <div
                    className={`h-full ${getPerformanceColor(set.accuracy)}`}
                    style={{ width: `${set.accuracy}%` }} data-oid="6m8ml3n" />

                </div>
                
                {/* Content */}
                <div className="relative flex flex-col h-full z-10" data-oid="fy2l6be">
                  <div className="mb-2 flex justify-between items-start" data-oid="x:imc63">
                    <div data-oid="bbc.vdy">
                      <h3 className="text-xl font-bold text-white group-hover:text-white" data-oid="0z6io9g">
                        {set.subject}: {set.type}
                      </h3>
                      <p className="text-gray-300 text-sm" data-oid="p9pponx">
                        {new Date(set.dateCompleted).toLocaleDateString()}
                      </p>
                    </div>
                    
                    {/* Holographic badge */}
                    <div
                      className={`
                        flex items-center justify-center w-10 h-10 rounded-full 
                        bg-gradient-to-br ${getSubjectColor(set.subject)}
                        shadow-lg transition-transform duration-300
                        ${isHovered ? 'scale-110' : ''}
                      `} data-oid="xf:zewo">

                      <span className="text-white font-bold" data-oid="peau7wa">
                        {getSubjectIcon(set.subject)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Metrics section */}
                  <div className="grid grid-cols-2 gap-2 mt-auto" data-oid="21ly_fp">
                    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-3" data-oid="jnhdezj">
                      <div className="text-gray-400 text-xs" data-oid="pm-_wdt">Accuracy</div>
                      <div className="text-lg text-white font-semibold flex items-end" data-oid="mi6ub0v">
                        {set.accuracy}%
                        <span
                          className={`ml-2 w-2 h-2 rounded-full ${getPerformanceColor(set.accuracy)}`} data-oid="9lju3m7" />

                      </div>
                    </div>
                    
                    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-3" data-oid="qm9.mw-">
                      <div className="text-gray-400 text-xs" data-oid="it50uav">Time Spent</div>
                      <div className="text-lg text-white font-semibold" data-oid="v37_m9:">
                        {formatTime(set.timeUsed)}
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-3" data-oid="wi6mamo">
                      <div className="text-gray-400 text-xs" data-oid="iqnw262">Questions</div>
                      <div className="text-lg text-white font-semibold" data-oid="r:cth3.">
                        {set.questions.length}
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-3" data-oid="s-aowwj">
                      <div className="text-gray-400 text-xs" data-oid="peczc_8">Difficulty</div>
                      <div className="text-lg text-white font-semibold" data-oid="t3ae:b_">
                        {set.difficulty}
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom holographic line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-30" data-oid="tdwek6n" />
                </div>
              </div>
            </div>);

        })}
      </div>
      
      <style jsx data-oid="xat028x">{`
        .holographic-card {
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .holographic-shimmer {
          background-size: 200% 200%;
          animation: shimmer 3s ease infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .card-tilt {
          transform: rotateX(var(--rotateX)) rotateY(var(--rotateY));
        }
      `}</style>
    </div>);

}