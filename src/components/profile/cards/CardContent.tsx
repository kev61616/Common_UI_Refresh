import React from 'react';
import { CardConfigKey } from '../config/cardConfig';
import { SkillsRadarChart } from '@/components/dashboard/SkillsRadarChart';
import { StudyStreak } from '@/components/dashboard/StudyStreak';
import { Typography } from '@/components/ui/typography';

// Types for profile data, keeping it generic enough for different card types
interface ProfileData {
  scoreRank: string;
  rankProgress: number;
  recentAchievements: Array<{
    name: string;
    description: string;
    icon: string;
    color: string; 
    date: string;
  }>;
  predictedScores: {
    overall: number;
    reading: number;
    writing: number;
    math: number;
  };
  tagMasteryHighlights: Array<{
    tag: string;
    accuracy: number;
    trend: 'up' | 'down' | 'neutral';
  }>;
}

interface CardContentProps {
  cardId: CardConfigKey;
  profileData: ProfileData;
  skills?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

// Component to render the appropriate card content based on the card type
export const CardContent: React.FC<CardContentProps> = ({ cardId, profileData, skills = [] }) => {
  switch (cardId) {
    case 'rank':
      return <RankCardContent rank={profileData.scoreRank} progress={profileData.rankProgress} />;
    case 'achievements':
      return <AchievementsCardContent achievements={profileData.recentAchievements} />;
    case 'scores':
      return <ScoresCardContent scores={profileData.predictedScores} />;
    case 'skills':
      return <SkillsCardContent skills={skills} />;
    case 'streak':
      return <StreakCardContent currentStreak={5} longestStreak={14} />;
    case 'tags':
      return <TagsCardContent tags={profileData.tagMasteryHighlights} />;
    default:
      return <div>Unknown card type</div>;
  }
};

// Individual card content components

const RankCardContent: React.FC<{ rank: string; progress: number }> = ({ rank, progress }) => {
  return (
    <div className="pt-0">
      <div className={`bg-gradient-to-r from-primary-500 to-primary-400 text-primary-foreground rounded-lg p-4 shadow-sm`}>
        <div className="flex items-center mb-2">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
            {rank === 'Platinum' && '⚡'}
            {rank === 'Diamond' && '💎'}
            {rank === 'Gold' && '🏅'}
            {rank === 'Silver' && '🥈'}
            {rank === 'Bronze' && '🥉'}
          </div>
          <div>
            <Typography variant="h5" weight="bold" className="text-inherit">{rank}</Typography>
            <Typography variant="small" className="text-inherit opacity-90">Level {Math.floor(progress / 20) + 1}</Typography>
          </div>
        </div>

        <div className="mt-2">
          <div className="text-sm mb-1 flex justify-between text-inherit opacity-90">
            <span className="text-sm">Progress to next rank</span>
            <span className="text-sm">{progress}%</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/50 rounded-full"
              style={{ width: `${progress}%` }}>
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

const AchievementsCardContent: React.FC<{ 
  achievements: Array<{
    name: string;
    description: string;
    icon: string;
    color: string;
    date: string;
  }> 
}> = ({ achievements }) => {
  return (
    <div className="achievements-card-content">
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
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
};

const ScoresCardContent: React.FC<{ 
  scores: {
    overall: number;
    reading: number;
    writing: number;
    math: number;
  } 
}> = ({ scores }) => {
  return (
    <div className="scores-card-content">
      {/* Large overall score */}
      <div className="flex justify-center mb-4">
        <div className="text-center">
          <div className="text-5xl font-bold text-primary">{scores.overall}</div>
          <div className="text-sm text-muted-foreground mt-1">Overall Score</div>
        </div>
      </div>
      
      {/* Section scores */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <div className="text-xl font-semibold text-blue-600">{scores.reading}</div>
          <div className="text-xs text-muted-foreground">Reading</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-semibold text-violet-600">{scores.writing}</div>
          <div className="text-xs text-muted-foreground">Writing</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-semibold text-green-600">{scores.math}</div>
          <div className="text-xs text-muted-foreground">Math</div>
        </div>
      </div>
    </div>
  );
};

const SkillsCardContent: React.FC<{ 
  skills: Array<{
    name: string;
    value: number;
    color: string;
  }> 
}> = ({ skills }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* Turn off compact mode since we have more vertical space now */}
      <SkillsRadarChart 
        skills={skills}
        compact={false} // Use full mode for tall card layout
      />
      
      {/* Add additional content for the extra vertical space */}
      <div className="mt-6 w-full px-4">
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Skill Development Focus</h3>
        <div className="space-y-3">
          {skills.map((skill) => (
            <div key={skill.name} className="flex flex-col">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="text-sm font-medium">{skill.value}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div 
                  className="h-2 rounded-full" 
                  style={{ 
                    width: `${skill.value}%`,
                    backgroundColor: skill.color 
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StreakCardContent: React.FC<{ 
  currentStreak: number;
  longestStreak: number;
}> = ({ currentStreak, longestStreak }) => {
  return (
    <StudyStreak
      currentStreak={currentStreak}
      longestStreak={longestStreak} 
    />
  );
};

const TagsCardContent: React.FC<{ 
  tags: Array<{
    tag: string;
    accuracy: number;
    trend: 'up' | 'down' | 'neutral';
  }> 
}> = ({ tags }) => {
  return (
    <div className="tags-card-content space-y-3">
      {tags.map((tag, index) => (
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
};
