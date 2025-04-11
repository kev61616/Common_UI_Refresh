'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PracticeSet } from '@/lib/mockData';
import { TimelineViewProps } from './types';
import { format, parseISO, differenceInDays } from 'date-fns';

export const TrainJourneyTimeline: React.FC<TimelineViewProps> = ({
  practiceSets,
  onSelectSet,
  selectedSetId
}) => {
  const [groupedSets, setGroupedSets] = useState<Record<string, PracticeSet[]>>({});
  const [hoverSetId, setHoverSetId] = useState<string | null>(null);
  const [animatingTrain, setAnimatingTrain] = useState<string | null>(null);
  const [trainPosition, setTrainPosition] = useState<number>(0);
  const timelineRef = useRef<HTMLDivElement>(null);

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
          ringColor: 'ring-blue-500 dark:ring-blue-600',
          stationColor: '#3b82f6',
          trackColor: '#93c5fd',
          trainColor: '#1d4ed8',
          smokeColor: '#bfdbfe'
        };
      case 'Reading':
        return {
          bg: 'bg-emerald-500',
          lightBg: 'bg-emerald-100 dark:bg-emerald-900/20',
          text: 'text-emerald-500 dark:text-emerald-400',
          border: 'border-emerald-500 dark:border-emerald-600',
          ringColor: 'ring-emerald-500 dark:ring-emerald-600',
          stationColor: '#10b981',
          trackColor: '#6ee7b7',
          trainColor: '#065f46',
          smokeColor: '#d1fae5'
        };
      case 'Writing':
        return {
          bg: 'bg-amber-500',
          lightBg: 'bg-amber-100 dark:bg-amber-900/20',
          text: 'text-amber-500 dark:text-amber-400',
          border: 'border-amber-500 dark:border-amber-600',
          ringColor: 'ring-amber-500 dark:ring-amber-600',
          stationColor: '#f59e0b',
          trackColor: '#fcd34d',
          trainColor: '#b45309',
          smokeColor: '#fef3c7'
        };
      default:
        return {
          bg: 'bg-slate-500',
          lightBg: 'bg-slate-100 dark:bg-slate-800',
          text: 'text-slate-500 dark:text-slate-400',
          border: 'border-slate-500 dark:border-slate-600',
          ringColor: 'ring-slate-500 dark:ring-slate-600',
          stationColor: '#64748b',
          trackColor: '#cbd5e1',
          trainColor: '#475569',
          smokeColor: '#f1f5f9'
        };
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, 'MMM d');
  };

  // Get station name from practice set
  const getStationName = (set: PracticeSet) => {
    return `${set.type} Station`;
  };

  // Get train class based on difficulty
  const getTrainClass = (set: PracticeSet) => {
    switch (set.difficulty) {
      case 'Hard':return 'express';
      case 'Medium':return 'passenger';
      case 'Easy':return 'local';
      default:return 'passenger';
    }
  };

  // Get train speed based on pace
  const getTrainSpeed = (set: PracticeSet) => {
    switch (set.pace) {
      case 'Fast':return 'high-speed';
      case 'Normal':return 'standard';
      case 'Slow':return 'scenic';
      default:return 'standard';
    }
  };

  // Get platform number based on questions count
  const getPlatformNumber = (set: PracticeSet) => {
    const count = set.questions.length;
    if (count <= 10) return 1;
    if (count <= 20) return 2;
    if (count <= 30) return 3;
    return 4;
  };

  // Handle train animation
  const animateTrain = (setId: string) => {
    setAnimatingTrain(setId);
    setTrainPosition(0);

    // Get the train element
    const trainElement = document.getElementById(`train-${setId}`);
    const trackElement = document.getElementById(`track-${setId}`);

    if (trainElement && trackElement) {
      const trackWidth = trackElement.getBoundingClientRect().width;

      // Animate train moving across the track
      const duration = 3000; // 3 seconds
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setTrainPosition(progress * 100);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Animation complete
          setTimeout(() => {
            setAnimatingTrain(null);
          }, 500);
        }
      };

      requestAnimationFrame(animate);
    }
  };

  // Generate smoke particles for animated train
  const generateSmokeParticles = (count: number, trainId: string, styles: ReturnType<typeof getSubjectStyles>) => {
    const particles = [];

    for (let i = 0; i < count; i++) {
      const delay = i * 0.2;
      const size = Math.random() * 10 + 5;
      const offsetX = Math.random() * 10 - 5;
      const offsetY = Math.random() * -10 - 5;

      particles.push(
        <div
          key={`smoke-${trainId}-${i}`}
          className="absolute rounded-full opacity-0 animate-smoke"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: styles.smokeColor,
            left: `5px`,
            top: '5px',
            transform: `translate(${offsetX}px, ${offsetY}px)`,
            animationDelay: `${delay}s`
          }}>
        </div>
      );
    }

    return particles;
  };

  return (
    <div className="train-journey-timeline space-y-6 pb-8">
      {/* Header with title and legend */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-slate-600 dark:text-slate-400">
              <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z" />
              <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z" />
              <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z" />
              <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Train Journey Timeline</h2>
        </div>
        
        <div className="flex space-x-4">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
            <span className="text-sm text-slate-700 dark:text-slate-300">Math</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>
            <span className="text-sm text-slate-700 dark:text-slate-300">Reading</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
            <span className="text-sm text-slate-700 dark:text-slate-300">Writing</span>
          </div>
        </div>
      </div>
      
      {/* Train line legend */}
      <div className="flex items-center justify-center space-x-6 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">E</div>
          <span className="text-sm text-slate-700 dark:text-slate-300">Express</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">P</div>
          <span className="text-sm text-slate-700 dark:text-slate-300">Passenger</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold">L</div>
          <span className="text-sm text-slate-700 dark:text-slate-300">Local</span>
        </div>
      </div>
      
      {/* Timeline railway */}
      <div ref={timelineRef} className="timeline-railway space-y-12 relative">
        {/* Central railway track - runs through whole timeline */}
        <div className="central-track absolute left-24 top-0 bottom-0 w-2 bg-slate-300 dark:bg-slate-700"></div>
        
        {/* Month sections */}
        {Object.entries(groupedSets).map(([month, sets]) =>
        <div key={month} className="month-section relative">
            {/* Month station */}
            <div className="month-station absolute left-0 top-0 flex items-center">
              <div className="station-platform w-20 h-14 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="font-medium text-slate-800 dark:text-slate-200">{month.split(' ')[0]}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">{month.split(' ')[1]}</div>
                </div>
              </div>
              <div className="station-connector h-2 w-6 bg-slate-300 dark:bg-slate-700"></div>
            </div>
            
            {/* Practice sets as train stations */}
            <div className="sets-container ml-28 space-y-16">
              {sets.map((set, index) => {
              const styles = getSubjectStyles(set.subject);
              const isSelected = set.id === selectedSetId;
              const isHovered = set.id === hoverSetId;
              const isAnimating = animatingTrain === set.id;
              const trainClass = getTrainClass(set);
              const trainSpeed = getTrainSpeed(set);
              const platformNumber = getPlatformNumber(set);

              return (
                <div key={set.id} className="relative">
                    {/* Track connecting to central railway */}
                    <div
                    id={`track-${set.id}`}
                    className="station-track absolute -left-[104px] top-1/2 h-2 w-28 -translate-y-1/2"
                    style={{
                      backgroundColor: styles.trackColor,
                      opacity: isSelected || isHovered || isAnimating ? 1 : 0.6
                    }}>
                  </div>
                    
                    {/* Station */}
                    <div
                    className={`train-station p-4 rounded-lg border border-slate-200 dark:border-slate-700 transition-all duration-300
                        ${isSelected ? `ring-2 ${styles.ringColor} shadow-lg scale-102` : 'hover:shadow-md'}
                        ${isHovered ? 'shadow-md' : ''}
                        ${isSelected || isHovered || isAnimating ? styles.lightBg : 'bg-white dark:bg-slate-800'}`}
                    onClick={() => {
                      onSelectSet?.(set.id);
                      animateTrain(set.id);
                    }}
                    onMouseEnter={() => setHoverSetId(set.id)}
                    onMouseLeave={() => setHoverSetId(null)}>

                      {/* Station header */}
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className={`font-medium ${styles.text}`}>
                            {getStationName(set)}
                          </h3>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {formatDate(set.dateCompleted)}
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full ${styles.bg} flex items-center justify-center text-white text-xs font-bold`}>
                            {trainClass === 'express' ? 'E' : trainClass === 'passenger' ? 'P' : 'L'}
                          </div>
                        </div>
                      </div>
                      
                      {/* Station info */}
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Platform</div>
                          <div className="font-medium text-slate-800 dark:text-slate-200">{platformNumber}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Accuracy</div>
                          <div className="font-medium text-slate-800 dark:text-slate-200">{set.accuracy}%</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Service</div>
                          <div className="font-medium text-slate-800 dark:text-slate-200">{trainSpeed}</div>
                        </div>
                      </div>
                      
                      {/* Expanded panel when selected */}
                      {isSelected &&
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Journey Details</h4>
                              
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-slate-600 dark:text-slate-400">Departure Time</span>
                                  <span className="text-slate-800 dark:text-slate-200">{set.timeOfDay}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600 dark:text-slate-400">Journey Duration</span>
                                  <span className="text-slate-800 dark:text-slate-200">{Math.floor(set.timeUsed / 60)} min</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600 dark:text-slate-400">Train Class</span>
                                  <span className="text-slate-800 dark:text-slate-200">{trainClass}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600 dark:text-slate-400">Train Speed</span>
                                  <span className="text-slate-800 dark:text-slate-200">{trainSpeed}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Passenger Info</h4>
                              
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-slate-600 dark:text-slate-400">Passengers</span>
                                  <span className="text-slate-800 dark:text-slate-200">{set.questions.length}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600 dark:text-slate-400">On-time Arrival</span>
                                  <span className="text-slate-800 dark:text-slate-200">{set.accuracy}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600 dark:text-slate-400">Delays</span>
                                  <span className="text-slate-800 dark:text-slate-200">
                                    {set.mistakeTypes.conceptual + set.mistakeTypes.careless + set.mistakeTypes.timeManagement}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600 dark:text-slate-400">Satisfaction</span>
                                  <span className="text-slate-800 dark:text-slate-200">
                                    {set.accuracy >= 90 ? 'Outstanding' :
                                set.accuracy >= 75 ? 'Satisfied' :
                                set.accuracy >= 60 ? 'Acceptable' :
                                'Needs Improvement'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Performance Tracking</h4>
                            
                            <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-3">
                              <div className="flex items-center mb-2">
                                <div className="text-xs text-slate-600 dark:text-slate-400 mr-2">Journey Efficiency</div>
                                <div className="text-xs">
                                  <span className={set.sessionFatigue.earlyAccuracy > set.sessionFatigue.lateAccuracy ? 'text-red-500' : 'text-green-500'}>
                                    {set.sessionFatigue.earlyAccuracy > set.sessionFatigue.lateAccuracy ? '↓' : '↑'}
                                    {Math.abs(set.sessionFatigue.earlyAccuracy - set.sessionFatigue.lateAccuracy).toFixed(1)}%
                                  </span>
                                </div>
                              </div>
                              
                              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                                <div className="h-full bg-emerald-500" style={{ width: `${set.sessionFatigue.earlyAccuracy}%` }}></div>
                                <div className="h-full bg-amber-500" style={{ width: `${100 - set.sessionFatigue.earlyAccuracy - (100 - set.sessionFatigue.lateAccuracy)}%` }}></div>
                                <div className="h-full bg-red-500" style={{ width: `${100 - set.sessionFatigue.lateAccuracy}%` }}></div>
                              </div>
                              
                              <div className="flex justify-between mt-1 text-xs text-slate-500 dark:text-slate-400">
                                <span>Departure</span>
                                <span>Transit</span>
                                <span>Arrival</span>
                              </div>
                            </div>
                          </div>
                        </div>
                    }
                    </div>
                    
                    {/* Animated train */}
                    {(isAnimating || isSelected) &&
                  <div
                    id={`train-${set.id}`}
                    className="absolute -left-[104px] top-1/2 -translate-y-1/2 -translate-x-full transition-transform duration-1000 ease-in-out"
                    style={{
                      transform: `translateY(-50%) translateX(${isAnimating ? trainPosition : 100}%)`,
                      zIndex: 10
                    }}>

                        {/* Train body */}
                        <div className="relative">
                          {/* Engine */}
                          <div
                        className="train-engine w-16 h-8 rounded-r-md"
                        style={{ backgroundColor: styles.trainColor }}>

                            {/* Train windows */}
                            <div className="absolute top-1 left-4 w-2 h-2 bg-yellow-200 rounded-sm"></div>
                            <div className="absolute top-1 left-8 w-2 h-2 bg-yellow-200 rounded-sm"></div>
                            <div className="absolute bottom-1 left-6 w-6 h-1.5 bg-slate-800 rounded-sm"></div>
                            
                            {/* Chimney with smoke */}
                            <div className="absolute -top-3 left-3 w-2 h-3 bg-slate-700 rounded-t-sm">
                              <div className="relative">
                                {generateSmokeParticles(5, set.id, styles)}
                              </div>
                            </div>
                            
                            {/* Front light */}
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-0.5 w-1 h-1 bg-yellow-300 rounded-full shadow-glow"></div>
                          </div>
                          
                          {/* Wheels */}
                          <div className="absolute -bottom-1.5 left-3 w-3 h-3 rounded-full bg-slate-700 border border-slate-400"></div>
                          <div className="absolute -bottom-1.5 left-9 w-3 h-3 rounded-full bg-slate-700 border border-slate-400"></div>
                        </div>
                      </div>
                  }
                  </div>);

            })}
            </div>
          </div>
        )}
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes smoke {
          0% {
            opacity: 0.7;
            transform: translate(0, 0) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translate(0, -20px) scale(2);
          }
        }
        
        .animate-smoke {
          animation: smoke 2s ease-out forwards;
        }
        
        .shadow-glow {
          box-shadow: 0 0 4px 2px rgba(253, 224, 71, 0.5);
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </div>);

};