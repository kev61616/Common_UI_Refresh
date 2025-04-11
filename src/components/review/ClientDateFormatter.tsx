'use client';

import { useState, useEffect } from 'react';

interface DateFormatterProps {
  dateString: string;
  format?: 'short' | 'medium' | 'long';
  fallback?: string;
}

/**
 * Client-only date formatter component to prevent hydration errors
 * caused by different date formatting between server and client
 */
export function ClientDateFormatter({
  dateString,
  format = 'medium',
  fallback = '---'
}: DateFormatterProps) {
  const [formattedDate, setFormattedDate] = useState<string>(fallback);

  useEffect(() => {
    try {
      const date = new Date(dateString);

      let options: Intl.DateTimeFormatOptions;
      switch (format) {
        case 'short':
          options = {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric'
          };
          break;
        case 'long':
          options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
          };
          break;
        case 'medium':
        default:
          options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          };
          break;
      }

      const formatted = new Intl.DateTimeFormat('en-US', options).format(date);
      setFormattedDate(formatted);
    } catch (error) {
      console.error('Error formatting date:', error);
      setFormattedDate(fallback);
    }
  }, [dateString, format, fallback]);

  // Return a placeholder during SSR and initial hydration
  return (
    <span suppressHydrationWarning data-oid="z.h84l.">
      {formattedDate}
    </span>);

}