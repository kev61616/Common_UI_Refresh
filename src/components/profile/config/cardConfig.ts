export type CardConfigKey = 'rank' | 'achievements' | 'scores' | 'skills' | 'streak' | 'tags';
export type CardSize = 'small' | 'medium-wide' | 'medium-long' | 'large' | 'big-tall';

export interface CardConfig {
  title: string;
  bgColor: string;
  textColor: string;
  size: CardSize;
  height: string;
  minHeight?: string;
  colSpan: number;
}

/**
 * Card configuration with standardized dimensions and layout settings.
 * Card size guidelines:
 * - small: 2-column span × standard height (most cards)
 * - medium-wide: 4-column span × standard height (horizontal visualizations)
 * - medium-long: 2-column span × double height (vertical visualizations)
 * - big-tall: 2-column span × triple height (extended vertical visualizations)
 * - large: 4-column span × double height (complex data cards)
 * 
 * Usage rules:
 * - Use small (2-column) cards whenever possible for most data
 * - Use medium-wide for data that needs horizontal space (like radar charts)
 * - Use medium-long for data that benefits from vertical space (like timelines)
 * - Large cards are reserved for future complex visualizations
 */
export const CARD_CONFIG: Record<CardConfigKey, CardConfig> = {
  rank: {
    title: 'Current Rank',
    bgColor: 'bg-blue-50 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400',
    size: 'small',
    height: '320px',
    minHeight: '300px',
    colSpan: 2
  },
  achievements: {
    title: 'Recent Achievements',
    bgColor: 'bg-orange-50 dark:bg-orange-900/30',
    textColor: 'text-orange-600 dark:text-orange-400',
    size: 'small',
    height: '320px',
    minHeight: '300px',
    colSpan: 2
  },
  scores: {
    title: 'Predicted Scores',
    bgColor: 'bg-sky-50 dark:bg-sky-900/30',
    textColor: 'text-sky-600 dark:text-sky-400',
    size: 'small',
    height: '320px',
    minHeight: '300px',
    colSpan: 2
  },
  skills: {
    title: 'Skills Breakdown',
    bgColor: 'bg-violet-50 dark:bg-violet-900/30',
    textColor: 'text-violet-600 dark:text-violet-400',
    size: 'medium-long',
    height: '640px', // Double height for medium-long
    minHeight: '600px',
    colSpan: 2
  },
  streak: {
    title: 'Study Streak',
    bgColor: 'bg-amber-50 dark:bg-amber-900/30',
    textColor: 'text-amber-600 dark:text-amber-400',
    size: 'medium-long',
    height: '640px', // Double height for medium-long
    minHeight: '600px',
    colSpan: 2
  },
  tags: {
    title: 'Tag Mastery',
    bgColor: 'bg-green-50 dark:bg-green-900/30',
    textColor: 'text-green-600 dark:text-green-400',
    size: 'small',
    height: '320px',
    minHeight: '300px',
    colSpan: 2
  }
};
