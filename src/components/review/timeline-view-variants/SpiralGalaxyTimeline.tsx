'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PracticeSet } from '@/lib/mockData';
import { TimelineViewProps } from './types';
import { format, parseISO, differenceInDays } from 'date-fns';

export const SpiralGalaxyTimeline: React.FC<TimelineViewProps> = ({
  practiceSets,
  onSelectSet,
  selectedSetId
}) => {
  const [sortedSets, setSortedSets] = useState<PracticeSet[]>([]);
  const [hoverSetId, setHoverSetId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
  const animationRef = useRef<number>(0);
  const starParticlesRef = useRef<{x: number;y: number;size: number;speed: number;opacity: number;}[]>([]);

  // Sort practice sets by date
  useEffect(() => {
    const sorted = [...practiceSets].sort((a, b) =>
    new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
    );
    setSortedSets(sorted);
  }, [practiceSets]);

  // Set up canvas dimensions and context
  useEffect(() => {
    if (containerRef.current && canvasRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
      canvasRef.current.width = width;
      canvasRef.current.height = height;

      const ctx = canvasRef.current.getContext('2d');
      setCanvasContext(ctx);

      // Initialize star particles
      const particleCount = Math.floor(width / 3);
      const particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5,
          speed: Math.random() * 0.2,
          opacity: Math.random() * 0.8 + 0.2
        });
      }

      starParticlesRef.current = particles;
    }

    // Handle window resize
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animate the galaxy background
  useEffect(() => {
    if (!canvasContext || !dimensions.width || !dimensions.height) return;

    const animate = () => {
      if (!canvasContext) return;

      // Clear canvas with a gradient background
      const gradient = canvasContext.createLinearGradient(0, 0, 0, dimensions.height);
      gradient.addColorStop(0, 'rgba(5, 10, 20, 1)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 1)');

      canvasContext.fillStyle = gradient;
      canvasContext.fillRect(0, 0, dimensions.width, dimensions.height);

      // Draw the stars
      starParticlesRef.current.forEach((particle, i) => {
        const ctx = canvasContext;

        // Update particle position
        particle.y += particle.speed;

        // Reset particle if it goes off screen
        if (particle.y > dimensions.height) {
          particle.y = 0;
          particle.x = Math.random() * dimensions.width;
        }

        // Draw the star
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });

      // Draw galaxy spiral arms (subtle)
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;
      const maxRadius = Math.min(dimensions.width, dimensions.height) * 0.4;

      // Draw spiral arms
      for (let arm = 0; arm < 2; arm++) {
        const armOffset = arm * Math.PI;

        for (let i = 0; i < 100; i++) {
          const t = i / 100;
          const angle = t * 5 * Math.PI + armOffset;
          const radius = t * maxRadius;

          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          const size = Math.random() * 1.5 + 0.5;
          const opacity = Math.random() * 0.3 + 0.1;

          canvasContext.beginPath();
          canvasContext.arc(x, y, size, 0, Math.PI * 2);
          canvasContext.fillStyle = `rgba(100, 150, 255, ${opacity})`;
          canvasContext.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationRef.current);
  }, [canvasContext, dimensions]);

  // Get subject-specific color
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Math':return 'bg-blue-500 text-blue-50 dark:bg-blue-600 dark:text-blue-50';
      case 'Reading':return 'bg-emerald-500 text-emerald-50 dark:bg-emerald-600 dark:text-emerald-50';
      case 'Writing':return 'bg-amber-500 text-amber-50 dark:bg-amber-600 dark:text-amber-50';
      default:return 'bg-slate-500 text-slate-50 dark:bg-slate-600 dark:text-slate-50';
    }
  };

  // Get subject-specific glow color
  const getSubjectGlow = (subject: string) => {
    switch (subject) {
      case 'Math':return 'shadow-blue-400/40';
      case 'Reading':return 'shadow-emerald-400/40';
      case 'Writing':return 'shadow-amber-400/40';
      default:return 'shadow-slate-400/40';
    }
  };

  // Get accuracy stars
  const getAccuracyStars = (accuracy: number) => {
    const fullStars = Math.floor(accuracy / 20); // 5 stars max
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 24 24" data-oid="9:iy534">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" data-oid="yy_hxy4"></path>
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 24 24" data-oid="2re.50x">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" data-oid="iyezrw4"></path>
          </svg>
        );
      }
    }

    return stars;
  };

  // Get position in the spiral based on date
  const calculateSpiralPosition = (dateString: string, index: number, total: number) => {
    const date = parseISO(dateString);
    const now = new Date();
    const daysPast = differenceInDays(now, date);

    // Calculate position on spiral based on days past
    const t = index / total;
    const spiralRadius = 320 * t + 80; // Start at 80px from center, grow to 400px
    const spiralAngle = t * 5 * Math.PI; // 2.5 complete turns

    const x = Math.cos(spiralAngle) * spiralRadius + dimensions.width / 2;
    const y = Math.sin(spiralAngle) * spiralRadius + dimensions.height / 2;

    return { x, y };
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, 'MMM d, yyyy');
  };

  return (
    <div ref={containerRef} className="spiral-galaxy-timeline w-full h-[700px] relative overflow-hidden" data-oid="0dlwdov">
      {/* Galaxy background */}
      <canvas ref={canvasRef} className="absolute inset-0" data-oid="iewf8k1"></canvas>
      
      {/* Timeline title */}
      <div className="absolute top-4 left-4 z-10" data-oid="aw:o7zr">
        <h2 className="text-2xl font-bold text-white text-shadow-sm" data-oid="1.671rk">
          Spiral Galaxy Timeline
        </h2>
        <p className="text-blue-200 mt-1 text-shadow-sm" data-oid="a076yk8">
          Practice sets visualized as stars in a spiral galaxy
        </p>
      </div>
      
      {/* Legend */}
      <div className="absolute top-4 right-4 z-10 flex space-x-4 text-sm" data-oid="9:6evx:">
        <div className="flex items-center" data-oid="r:w1.gr">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2" data-oid="_p5q7hn"></span>
          <span className="text-blue-200" data-oid="dy_xrus">Math</span>
        </div>
        <div className="flex items-center" data-oid="2snuey-">
          <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 mr-2" data-oid="obb:ags"></span>
          <span className="text-blue-200" data-oid=":qngl23">Reading</span>
        </div>
        <div className="flex items-center" data-oid="y_2wz9f">
          <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-2" data-oid="icm3pto"></span>
          <span className="text-blue-200" data-oid="sl.x2sv">Writing</span>
        </div>
      </div>
      
      {/* Galaxy center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/5 flex items-center justify-center z-10" data-oid="cayofho">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center" data-oid="90-an16">
          <div className="w-10 h-10 rounded-full bg-yellow-500/50 animate-pulse shadow-lg shadow-yellow-500/30 flex items-center justify-center" data-oid="1hi.-_1">
            <div className="w-6 h-6 rounded-full bg-yellow-300/70 animate-pulse-slow" data-oid="iy4l0b2"></div>
          </div>
        </div>
      </div>
      
      {/* Practice sets as stars in galaxy */}
      {sortedSets.map((set, index) => {
        const { x, y } = calculateSpiralPosition(set.dateCompleted, index, sortedSets.length);
        const isSelected = set.id === selectedSetId;
        const isHovered = set.id === hoverSetId;
        const subjectColor = getSubjectColor(set.subject);
        const subjectGlow = getSubjectGlow(set.subject);

        // Size based on difficulty
        const sizeClass = set.difficulty === 'Easy' ? 'w-16 h-16' :
        set.difficulty === 'Medium' ? 'w-20 h-20' : 'w-24 h-24';

        return (
          <div
            key={set.id}
            className={`absolute transition-all duration-300 z-20
              ${isSelected || isHovered ? 'scale-110' : 'scale-100'} 
              ${isSelected ? 'z-30' : isHovered ? 'z-25' : 'z-20'}`}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: `translate(-50%, -50%) ${isSelected || isHovered ? 'scale(1.1)' : 'scale(1)'}`
            }} data-oid="82_ejfh">

            {/* Star with glow effect */}
            <div
              className={`cosmic-star ${sizeClass} rounded-full flex items-center justify-center cursor-pointer
                ${isSelected ? `shadow-lg shadow-${subjectGlow}` : ''}
                relative overflow-hidden`}
              onClick={() => onSelectSet?.(set.id)}
              onMouseEnter={() => setHoverSetId(set.id)}
              onMouseLeave={() => setHoverSetId(null)} data-oid="nn4yrxn">

              <div className={`absolute inset-0 ${subjectColor} opacity-80 rounded-full`} data-oid="v8u.ywv"></div>
              
              {/* Star rays - only show on hover/select */}
              {(isHovered || isSelected) &&
              <>
                  <div className="absolute inset-0 star-rays" data-oid="k3fel9v"></div>
                  <div className="absolute inset-0 star-pulse animate-pulse-slow" data-oid="tdxppk0"></div>
                </>
              }
              
              {/* Inner content visible on hover/select */}
              <div className={`relative z-10 p-2 text-center transition-opacity duration-300
                ${isHovered || isSelected ? 'opacity-100' : 'opacity-0'}`} data-oid="16qja2.">
                <div className="text-xs font-semibold mb-1" data-oid="v8x27vx">{set.subject}</div>
                <div className="text-[10px]" data-oid="fj-9egv">{set.type}</div>
                <div className="flex justify-center mt-1" data-oid="4mi3r.g">
                  {getAccuracyStars(set.accuracy)}
                </div>
              </div>
            </div>
            
            {/* Date label */}
            <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-center transition-opacity duration-300
              ${isHovered || isSelected ? 'opacity-100' : 'opacity-0'}`} data-oid=".huhd_c">
              <span className="text-xs text-blue-200 whitespace-nowrap" data-oid="6_dlnwi">{formatDate(set.dateCompleted)}</span>
            </div>
            
            {/* Detail card on selection */}
            {isSelected &&
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 max-w-xs
                bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-lg p-4 shadow-xl z-40" data-oid="e2428ua">




                <h4 className="text-white font-medium" data-oid="0-e_whj">{set.subject}: {set.type}</h4>
                <div className="text-xs text-blue-200 mt-1" data-oid="eez-6gq">{formatDate(set.dateCompleted)}</div>
                
                <div className="grid grid-cols-2 gap-2 mt-3" data-oid="3-5xay_">
                  <div className="bg-slate-900/50 rounded p-2" data-oid="xyyzuxs">
                    <div className="text-[10px] text-slate-400" data-oid="3kn.msg">Accuracy</div>
                    <div className="text-white font-medium" data-oid="0gqiwqi">{set.accuracy}%</div>
                  </div>
                  <div className="bg-slate-900/50 rounded p-2" data-oid="pe-gq-g">
                    <div className="text-[10px] text-slate-400" data-oid="l75_xia">Questions</div>
                    <div className="text-white font-medium" data-oid="l7bwjma">{set.questions.length}</div>
                  </div>
                  <div className="bg-slate-900/50 rounded p-2" data-oid="oejfz_8">
                    <div className="text-[10px] text-slate-400" data-oid="b_nseml">Difficulty</div>
                    <div className="text-white font-medium" data-oid="1eppzph">{set.difficulty}</div>
                  </div>
                  <div className="bg-slate-900/50 rounded p-2" data-oid="lwi.xki">
                    <div className="text-[10px] text-slate-400" data-oid="1834ql2">Pace</div>
                    <div className="text-white font-medium" data-oid="w2pmh3g">{set.pace}</div>
                  </div>
                </div>
                
                <div className="mt-3 bg-slate-900/50 rounded p-2" data-oid="qk1c04.">
                  <div className="text-[10px] text-slate-400 mb-1" data-oid="gf--1:c">Performance Trends</div>
                  <div className="flex items-end h-12 space-x-1" data-oid="mpzejru">
                    <div className="h-full flex flex-col justify-end flex-1" data-oid="5a6l0sg">
                      <div className="text-[8px] text-slate-500 text-center" data-oid="c4568xu">Early</div>
                      <div
                      className="bg-blue-500/80 rounded-t-sm w-full"
                      style={{ height: `${set.sessionFatigue.earlyAccuracy * 0.7}%` }} data-oid="1avz7n0">
                    </div>
                    </div>
                    <div className="h-full flex flex-col justify-end flex-1" data-oid="6xjcn4f">
                      <div
                      className="bg-blue-500/70 rounded-t-sm w-full"
                      style={{ height: `${(set.sessionFatigue.earlyAccuracy + set.sessionFatigue.lateAccuracy) / 2 * 0.75}%` }} data-oid="752a6tz">
                    </div>
                    </div>
                    <div className="h-full flex flex-col justify-end flex-1" data-oid="4ax-faz">
                      <div
                      className="bg-blue-500/60 rounded-t-sm w-full"
                      style={{ height: `${(set.sessionFatigue.earlyAccuracy + set.sessionFatigue.lateAccuracy) / 2 * 0.7}%` }} data-oid=".m3j73j">
                    </div>
                    </div>
                    <div className="h-full flex flex-col justify-end flex-1" data-oid="s4-xz:a">
                      <div className="text-[8px] text-slate-500 text-center" data-oid="r1ggyii">Late</div>
                      <div
                      className="bg-blue-500/50 rounded-t-sm w-full"
                      style={{ height: `${set.sessionFatigue.lateAccuracy * 0.65}%` }} data-oid="iitsiu_">
                    </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 text-xs text-center text-blue-200" data-oid="c2iosgj">
                  {set.accuracy >= 90 ? "Brilliant star! Exceptional performance." :
                set.accuracy >= 75 ? "Bright star. Solid performance." :
                set.accuracy >= 60 ? "Average luminosity. Steady progress." :
                set.accuracy >= 45 ? "Dim star. Room for improvement." :
                "Faint star. Needs significant review."}
                </div>
              </div>
            }
          </div>);

      })}
      
      {/* CSS styles */}
      <style jsx data-oid="gfvdvbz">{`
        .text-shadow-sm {
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.3; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .star-rays {
          background: radial-gradient(circle, transparent 50%, currentColor 90%);
          opacity: 0.2;
        }
        
        .star-pulse {
          background: radial-gradient(circle, white 0%, transparent 70%);
          opacity: 0.3;
        }
        
        .cosmic-star {
          transition: all 0.3s ease;
        }
        
        .cosmic-star:hover {
          box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>);

};