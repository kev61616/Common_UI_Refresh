import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class values using clsx and ensures proper Tailwind class merging
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Typography sizes with pixel values for reference (+2px increase)
export const typoSizes = {
  // Headings
  h1: { size: '2.625rem', /* 42px */ lineHeight: '3.125rem' /* 50px */ },
  h2: { size: '2.125rem', /* 34px */ lineHeight: '2.625rem' /* 42px */ },
  h3: { size: '1.875rem', /* 30px */ lineHeight: '2.375rem' /* 38px */ },
  h4: { size: '1.625rem', /* 26px */ lineHeight: '2.125rem' /* 34px */ },
  h5: { size: '1.375rem', /* 22px */ lineHeight: '1.875rem' /* 30px */ },
  h6: { size: '1.25rem', /* 20px */ lineHeight: '1.625rem' /* 26px */ },
  
  // Paragraph sizes
  p1: { size: '1.375rem', /* 22px */ lineHeight: '1.875rem' /* 30px */ },
  p2: { size: '1.25rem', /* 20px */ lineHeight: '1.625rem' /* 26px */ },
  p3: { size: '1.125rem', /* 18px */ lineHeight: '1.625rem' /* 26px */ },
  p4: { size: '1rem', /* 16px */ lineHeight: '1.375rem' /* 22px */ },
  
  // Utility sizes
  large: { size: '1.25rem', /* 20px */ lineHeight: '1.875rem' /* 30px */ },
  default: { size: '1.125rem', /* 18px */ lineHeight: '1.625rem' /* 26px */ },
  small: { size: '1rem', /* 16px */ lineHeight: '1.375rem' /* 22px */ },
  tiny: { size: '0.875rem', /* 14px */ lineHeight: '1.125rem' /* 18px */ },
}
