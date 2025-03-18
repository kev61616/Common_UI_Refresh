import { mockPracticeSets } from './mockData';

/**
 * Utility function to ensure we always have data to display
 * This acts as a fallback when no data is passed from parent components
 */
export function getDataWithFallback(data: any[] | undefined | null): any[] {
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.log('Using fallback data');
    return mockPracticeSets;
  }
  
  console.log('Using provided data', data.length);
  return data;
}
