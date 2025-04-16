"use client";

import React, { useState, useEffect } from 'react';
import { ProfileCardGrid } from '../cards/ProfileCardGrid';
import ChartSkeleton from '../charts/ui/ChartSkeleton';
import ChartErrorState from '../charts/ui/ChartErrorState';

// Default card layout using the actual card IDs from cardConfig.ts
// Organized according to specified layout:
// Column 1: Rank (top), Scores (bottom)
// Column 2: Skills (big-tall, 3 units high)
// Column 3: Streak (big-tall, 3 units high)
const DEFAULT_CARD_POSITIONS = [
  'rank',        // First column, top
  'skills',      // Middle column (big-tall, 3 units high)
  'streak',      // Right column (big-tall, 3 units high)
  'scores'       // First column, bottom
  // 'achievements' removed as requested
  // 'tags' removed as previously requested
];

export interface OverviewChartsContainerProps {
  studentId: string;
  className?: string;
}

// Mock data for the overview - structured to match expected ProfileData interface
const MOCK_PROFILE_DATA = {
  // For RankCardContent
  scoreRank: "Gold",
  rankProgress: 65,
  
  // For AchievementsCardContent
  recentAchievements: [
    { 
      name: "Reading Master", 
      description: "Completed 5 reading exercises with high scores", 
      icon: "📚", 
      color: "bg-blue", 
      date: "Apr 10, 2025" 
    },
    { 
      name: "Math Whiz", 
      description: "Aced the Algebra quiz with a perfect score", 
      icon: "🧮", 
      color: "bg-green", 
      date: "Apr 8, 2025" 
    },
    { 
      name: "Writing Pro", 
      description: "Essay received top marks for structure and content", 
      icon: "✍️", 
      color: "bg-violet", 
      date: "Apr 5, 2025" 
    }
  ],
  
  // For ScoresCardContent - updated to match SAT score scale (400-1600)
  predictedScores: {
    overall: 1350, // Total SAT score (scale: 400-1600)
    reading: 690,  // Reading & Writing section (scale: 200-800)
    writing: 690,  // Display as same as reading since they're combined in new SAT
    math: 660      // Math section (scale: 200-800)
  },
  
  // For TagsCardContent
  tagMasteryHighlights: [
    { tag: "Grammar", accuracy: 85, trend: "up" },
    { tag: "Algebra", accuracy: 78, trend: "neutral" },
    { tag: "Vocabulary", accuracy: 92, trend: "up" },
    { tag: "Comprehension", accuracy: 75, trend: "down" }
  ]
};

// Mock skills data - updated to match expected format with color property
const MOCK_SKILLS_DATA = [
  { id: 'reading', name: 'Reading', value: 75, color: '#4299E1' },
  { id: 'writing', name: 'Writing', value: 68, color: '#9F7AEA' },
  { id: 'math', name: 'Mathematics', value: 82, color: '#38B2AC' }
];

const OverviewChartsContainer: React.FC<OverviewChartsContainerProps> = ({
  studentId,
  className = ''
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [cardPositions, setCardPositions] = useState<string[]>(DEFAULT_CARD_POSITIONS);

  useEffect(() => {
    // This would be an API call in a real implementation
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, we would fetch data here
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch overview data'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [studentId]);

  // Handle card order changes
  const handleCardOrderChange = (newOrder: string[]) => {
    setCardPositions(newOrder);
    // In a real app, we would save this to the user's preferences
  };

  // Handle card selection
  const handleCardClick = (cardId: string) => {
    setActiveCard(cardId === activeCard ? null : cardId);
  };

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <ChartSkeleton type="bar" height={300} />
      </div>
    );
  }

  if (error) {
    return (
      <ChartErrorState 
        error={error} 
        onRetry={() => window.location.reload()}
        className={className}
      />
    );
  }

  return (
    <div className={`${className}`}>
      <ProfileCardGrid
        cardPositions={cardPositions}
        onOrderChange={handleCardOrderChange}
        activeCardId={activeCard}
        onCardClick={handleCardClick}
        profileData={MOCK_PROFILE_DATA}
        skills={MOCK_SKILLS_DATA}
      />
    </div>
  );
};

export default OverviewChartsContainer;
