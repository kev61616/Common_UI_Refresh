'use client';

import React, { useState, useEffect } from 'react';
import { SortableContextProvider, SortableItem } from '@/components/dnd';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils'; // Import the cn utility
'use client';

'use client';

import React, { useState, useEffect } from 'react';
import { SortableContextProvider, SortableItem } from '@/components/dnd';
import { Typography } from '@/components/ui/typography';
import { RankCard } from './RankCard';
import { RecentAchievementsCard } from './RecentAchievementsCard';
import { PredictedScoresCard } from './PredictedScoresCard';
import { TagMasteryCard } from './TagMasteryCard';
import { SkillsRadarChart } from '@/components/dashboard/SkillsRadarChart';
import { StudyStreak } from '@/components/dashboard/StudyStreak';

// Card header component for consistent styling
const CardHeader = ({ 
  title, 
  bgColor = 'bg-primary/10', 
  textColor = 'text-primary' 
}: { 
  title: string;
  bgColor?: string;
  textColor?: string;
}) => (
  <div className={`px-6 py-4 border-b border-border ${bgColor}`}>
    <Typography variant="h3" className={`font-semibold ${textColor}`}>
      {title}
    </Typography>
  </div>
);

// Card configuration data
const CARD_CONFIG = {
  rank: {
    title: 'Current Rank',
    bgColor: 'bg-blue-50 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400',
    colSpan: 2
  },
  achievements: {
    title: 'Recent Achievements',
    bgColor: 'bg-orange-50 dark:bg-orange-900/30',
    textColor: 'text-orange-600 dark:text-orange-400',
    colSpan: 2
  },
  scores: {
    title: 'Predicted Scores',
    bgColor: 'bg-sky-50 dark:bg-sky-900/30',
    textColor: 'text-sky-600 dark:text-sky-400',
    colSpan: 2
  },
  skills: {
    title: 'Skills Breakdown',
    bgColor: 'bg-violet-50 dark:bg-violet-900/30',
    textColor: 'text-violet-600 dark:text-violet-400',
    colSpan: 4
  },
  streak: {
    textColor: 'text-green-600 dark:text-green-400',
    colSpan: 2
  }
};

type ProfileCardGridProps = {
  cardPositions: string[];
  onOrderChange: (newOrder: string[]) => void;
  activeCardId: string | null;
  onCardClick: (cardId: string) => void;
  profileData: any;
  skills: any[];
};

export function ProfileCardGrid({
  cardPositions,
  onOrderChange,
  activeCardId,
  onCardClick,
  profileData,
  skills
}: ProfileCardGridProps) {
  // Render the appropriate card content based on card ID
  // Helper function to create a modified RankCard with custom styles
  const createModifiedRankCard = () => {
    // We'll selectively style the RankCard to avoid duplicate titles
    const CustomRankCard = () => {
      // Extract just the card content - the gradient bar and rank tiers
      return (
        <div className="pt-0">
          <div className={`bg-gradient-to-r from-primary-500 to-primary-400 text-primary-foreground rounded-lg p-4 shadow-sm`}>
            <div className="flex items-center mb-2">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                {profileData.scoreRank === 'Platinum' && '⚡'}
              </div>
              <div>
                <Typography variant="h5" weight="bold" className="text-inherit">{profileData.scoreRank}</Typography>
                <Typography variant="small" className="text-inherit opacity-90">Level {Math.floor(profileData.rankProgress / 20) + 1}</Typography>
              </div>
            </div>

            <div className="mt-2">
              <div className="text-sm mb-1 flex justify-between text-inherit opacity-90">
                <span className="text-sm">Progress to next rank</span>
                <span className="text-sm">{profileData.rankProgress}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white/50 rounded-full"
                  style={{ width: `${profileData.rankProgress}%` }}>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-between text-muted-foreground">
            <div className="text-center">
              <div className="h-4 w-4 bg-warning-600 rounded-full mx-auto mb-1"></div>
              <span className="text-xs text-muted-foreground">Bronze</span>
            </div>
            <div className="text-center">
              <div className="h-4 w-4 bg-slate-400 rounded-full mx-auto mb-1"></div>
              <span className="text-xs text-muted-foreground">Silver</span>
            </div>
            <div className="text-center">
              <div className="h-4 w-4 bg-warning-400 rounded-full mx-auto mb-1"></div>
              <span className="text-xs text-muted-foreground">Gold</span>
            </div>
            <div className="text-center">
              <div className="h-4 w-4 bg-primary-400 rounded-full mx-auto mb-1"></div>
              <span className="text-xs text-muted-foreground">Platinum</span>
            </div>
            <div className="text-center">
              <div className="h-4 w-4 bg-accent-400 rounded-full mx-auto mb-1"></div>
              <span className="text-xs text-muted-foreground">Diamond</span>
            </div>
          </div>
        </div>
      );
    };
    
    return <CustomRankCard />;
  };
  
  // Get the card content based on its ID
  const renderCardContent = (cardId: string) => {
    switch (cardId) {
      case 'rank':
        // Use our customized renderer instead of the original component
        return createModifiedRankCard();
      
      case 'achievements':
        // For achievements, wrap in a div without the unnecessary padding
        return (
          <div className="achievements-card-content">
            {/* Remove the header section from the RecentAchievementsCard */}
            <div className="space-y-4">
              {profileData.recentAchievements.map((achievement: any, index: number) => (
                <div key={index} className="flex items-start">
                  <div className={`w-10 h-10 bg-gradient-to-br from-${achievement.color.split('-')[1]}-500 to-${achievement.color.split('-')[1]}-600 rounded-full flex items-center justify-center text-primary-foreground text-lg shadow-sm`}>
                    {achievement.icon}
                  </div>
                  <div className="ml-3">
                    <span className="text-sm font-medium text-foreground block">{achievement.name}</span>
                    <span className="text-xs text-muted-foreground block">{achievement.description}</span>
                    <span className="text-xs text-muted-foreground/80 block mt-1">{achievement.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'scores':
        // Custom rendering for predicted scores
        return (
          <div className="scores-card-content">
            {/* Large overall score */}
            <div className="flex justify-center mb-4">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary">{profileData.predictedScores.overall}</div>
                <div className="text-sm text-muted-foreground mt-1">Overall Score</div>
              </div>
            </div>
            
            {/* Section scores */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-xl font-semibold text-blue-600">{profileData.predictedScores.reading}</div>
                <div className="text-xs text-muted-foreground">Reading</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold text-violet-600">{profileData.predictedScores.writing}</div>
                <div className="text-xs text-muted-foreground">Writing</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold text-green-600">{profileData.predictedScores.math}</div>
                <div className="text-xs text-muted-foreground">Math</div>
              </div>
            </div>
          </div>
        );
      
      case 'skills':
        return (
          <div className="h-[280px] sm:h-[270px] md:h-[300px] lg:h-[280px] xl:h-[320px] w-full">
            <SkillsRadarChart skills={skills} />
          </div>
        );
      
      case 'streak':
        return (
          <StudyStreak
            currentStreak={5}
            longestStreak={14} 
          />
        );
      
      case 'tags':
        // Custom rendering for tag mastery
        return (
          <div className="tags-card-content space-y-3">
            {profileData.tagMasteryHighlights.map((tag: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{tag.tag}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${tag.accuracy}%` }}></div>
                  </div>
                  <span className="text-xs font-medium">{tag.accuracy}%</span>
                  <span>
                    {tag.trend === 'up' && '↑'}
                    {tag.trend === 'down' && '↓'}
                    {tag.trend === 'neutral' && '→'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  // Render a sortable card
  const renderSortableCard = (cardId: string) => {
    const config = CARD_CONFIG[cardId as keyof typeof CARD_CONFIG];

    // We need a wrapper for the card content that handles clicks
    // without interfering with the drag behavior
    const CardContent = () => {
      return (
        <div 
          className="relative w-full h-full"
          onClick={(e) => {
            // This click handler will execute after the drag delay
            // Only if the card wasn't actually being dragged
            e.stopPropagation();
            onCardClick(cardId);
          }}
        >
          <CardHeader 
            title={config.title} 
            bgColor={config.bgColor} 
            textColor={config.textColor} 
          />
          <div className={cardId === 'streak' ? 'p-0' : 'p-4'}>
            {renderCardContent(cardId)}
          </div>
          
          {/* Visual feedback during drag - only shown when dragging */}
          <div className="absolute inset-0 pointer-events-none bg-primary/5 opacity-0 group-hover:opacity-30 flex items-center justify-center transition-opacity">
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-60">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 9h14M5 15h14"></path>
              </svg>
            </div>
          </div>
        </div>
      );
    };

    return (
      <SortableItem
        key={cardId}
        id={cardId}
        className={`bg-card rounded-xl shadow-sm overflow-hidden border 
          ${activeCardId === cardId ? 'ring-2 ring-primary' : 'border-border'}
          ${cardId === 'skills' ? 'lg:col-span-4' : 'lg:col-span-2'}`}
      >
        <CardContent />
      </SortableItem>
    );
  };

  // Function to render drag overlay contents
  const renderDragOverlay = (id: string | null) => {
    if (!id) return null;
    const config = CARD_CONFIG[id as keyof typeof CARD_CONFIG];
    
    return (
      <div className="bg-card rounded-xl shadow-lg border border-primary/30 overflow-hidden opacity-90">
        <CardHeader 
          title={config.title} 
          bgColor={config.bgColor} 
          textColor={config.textColor} 
        />
        <div className="p-4 bg-opacity-90">
          {renderCardContent(id)}
        </div>
      </div>
    );
  };

  // State management for drag and drop interactions
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "info" | "warning" | "error">("success");
  const [isDragging, setIsDragging] = useState(false);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [dragStartPosition, setDragStartPosition] = useState<{ x: number, y: number } | null>(null);
  
  // Track mouse position for advanced visual effects
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
  
  // Set up event listeners for mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging]);
  
  // Handlers for drag and drop events
  const handleDragStart = (event: any) => {
    setIsDragging(true);
    setDraggedCardId(event.active?.id);
    setDragStartPosition({
      x: event.active?.rect?.current?.left ?? 0,
      y: event.active?.rect?.current?.top ?? 0
    });
    
    // Show drag start toast
    setToastMessage("Dragging card...");
    setToastType("info");
    setShowToast(true);
    
    // Play sound effect
    if (typeof window !== 'undefined') {
      try {
        // This is a placeholder - you would need to implement actual sound
        // new Audio('/sounds/drag-start.mp3').play();
      } catch (e) {
        console.log('Sound not supported');
      }
    }
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedCardId(null);
    setDragStartPosition(null);
    setMousePosition(null);
    
    // Hide the toast after a short delay
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  };
  
  // Handle saving of card positions
  const handlePositionChange = (newOrder: string[]) => {
    // Show saving state
    setToastMessage("Saving layout changes...");
    setToastType("info");
    setShowToast(true);
    
    // Call the parent handler
    onOrderChange(newOrder);
    
    // Simulate API call with progress feedback
    setTimeout(() => {
      setToastMessage("Layout saved successfully!");
      setToastType("success");
      setShowToast(true);
      
      // Vibration feedback if supported
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try {
          navigator.vibrate(100); // 100ms vibration for feedback
        } catch (e) {
          console.log('Vibration not supported');
        }
      }
      
      // Auto-hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }, 800);
  };
  
  // Enhanced onboarding hint with animations
  const DragHint = () => (
    <div className={cn(
      "absolute -left-16 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 rounded-lg shadow-md p-3 text-xs text-muted-foreground",
      "hidden lg:flex flex-col items-center",
      "border border-primary/20",
      isDragging ? "opacity-0" : "opacity-0 transition-opacity duration-300 group-hover:opacity-95"
    )}>
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-full h-6 mb-1">
          <div className="absolute top-0 left-0 w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded opacity-40 animate-pulse"></div>
          <svg className="absolute top-0 left-0 w-5 h-5 text-primary animate-[float_3s_ease-in-out_infinite]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 15L19 19M15 19L19 15" />
            <path d="M5 9h14M5 15h14" />
          </svg>
          <div className="absolute top-0 left-8 w-8 h-5 bg-gray-200 dark:bg-gray-700 rounded opacity-60"></div>
        </div>
        <span className="text-center font-medium">Drag cards to<br />customize your layout</span>
        <div className="text-[10px] text-primary/80 animate-pulse">Try it now!</div>
      </div>
    </div>
  );
  
  // Simple Toast component
  const Toast = () => {
    if (!showToast) return null;
    
    const bgColor = {
      success: "bg-green-500",
      info: "bg-blue-500",
      warning: "bg-amber-500",
      error: "bg-red-500"
    }[toastType];
    
    return (
      <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2`}>
        {toastType === "success" && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}
        {toastType === "info" && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
        )}
        <span>{toastMessage}</span>
      </div>
    );
  };

  return (
    <>
      <SortableContextProvider
        items={cardPositions}
        onItemsChange={handlePositionChange}
        strategy="horizontal" // Using horizontal for grid layout
        renderOverlay={renderDragOverlay}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 group relative">
          {/* Enhanced background grid pattern that shows during drag */}
          <div className={cn(
            "absolute inset-0 grid grid-cols-6 gap-6 pointer-events-none transition-all duration-300",
            isDragging 
              ? "opacity-50" 
              : "opacity-0 group-hover:opacity-5"
          )}>
            {Array.from({ length: 24 }).map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "bg-gray-100 dark:bg-gray-800 rounded-lg min-h-[200px]",
                  "border-2 border-dashed",
                  isDragging ? "border-primary/40" : "border-primary/20",
                  // Highlight the grid cell nearest to the mouse position
                  isDragging && mousePosition && 
                    Math.floor(i / 6) === Math.floor((mousePosition.y - 200) / 200) && 
                    i % 6 === Math.floor((mousePosition.x - 100) / 200) && 
                    "bg-primary/10 border-primary/60"
                )}
              />
            ))}
          </div>
          
          {/* Enhanced drop target indicators */}
          {isDragging && (
            <div className="absolute inset-0 pointer-events-none z-10">
              {/* Path indicator line */}
              {dragStartPosition && mousePosition && (
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 20 }}>
                  <line
                    x1={dragStartPosition.x}
                    y1={dragStartPosition.y}
                    x2={mousePosition.x}
                    y2={mousePosition.y}
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.5"
                  />
                </svg>
              )}
            </div>
          )}
          
          {/* Onboarding hint */}
          <DragHint />
          
          {/* Tutorial button */}
          <button 
            className="absolute -right-16 top-2 text-xs text-primary p-2 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-sm hidden lg:flex items-center justify-center hover:bg-primary/10 transition-colors"
            onClick={() => {
              setToastMessage("Drag any card to rearrange your dashboard!");
              setToastType("info");
              setShowToast(true);
              setTimeout(() => setShowToast(false), 4000);
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </button>
          
          {/* The actual cards */}
          {cardPositions.map(cardId => renderSortableCard(cardId))}
        </div>
      </SortableContextProvider>
      
      {/* Toast notification */}
      <Toast />
    </>
  );
}
