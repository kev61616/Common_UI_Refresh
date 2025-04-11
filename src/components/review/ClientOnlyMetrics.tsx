'use client';

import { useState, useEffect } from 'react';

interface AccuracyMeterProps {
  accuracy: number;
  id: string;
  fallback?: React.ReactNode;
}

/**
 * Client-only accuracy display component to prevent hydration errors
 * Uses a hash function for deterministic values across server and client
 */
export function ClientAccuracyMeter({
  accuracy,
  id,
  fallback = <div className="text-xl font-semibold text-slate-400" data-oid="2xphxx:">--</div>
}: AccuracyMeterProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getAccuracyStyle = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600 dark:text-green-400';
    if (accuracy >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getProgressBarColor = (accuracy: number) => {
    if (accuracy >= 90) return 'bg-green-500 dark:bg-green-400';
    if (accuracy >= 70) return 'bg-yellow-500 dark:bg-yellow-400';
    return 'bg-red-500 dark:bg-red-400';
  };

  // During SSR or before hydration, render the fallback
  if (!isMounted) {
    return (
      <>
        {fallback}
      </>);

  }

  // Once mounted on the client, render the actual content
  return (
    <div className="flex flex-col items-center" data-oid="d9kq08n">
      <div className={`text-xl font-semibold ${getAccuracyStyle(accuracy)}`} suppressHydrationWarning data-oid="45a5:nm">
        {accuracy}%
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 mt-1.5 rounded-full overflow-hidden" data-oid="j:xer9j">
        <div
          className={`h-full rounded-full ${getProgressBarColor(accuracy)}`}
          style={{ width: `${accuracy}%` }} data-oid="it8_gqv">
        </div>
      </div>
    </div>);

}

/**
 * Component to display mistake summary with client-only rendering
 * Updated to not show 2c 2l 2t format to improve readability
 */
export function ClientMistakeTypes({
  conceptual = 0,
  careless = 0,
  timeManagement = 0




}: {conceptual?: number;careless?: number;timeManagement?: number;}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || conceptual === 0 && careless === 0 && timeManagement === 0) {
    return null; // Empty during SSR or if there are no mistakes
  }

  // Calculate total mistakes
  const totalMistakes = conceptual + careless + timeManagement;

  return (
    <div className="flex items-center justify-center mt-1" data-oid="nhy2mr.">
      <span className="text-xs text-slate-600 dark:text-slate-400" data-oid="b3dzn89">
        {totalMistakes} {totalMistakes === 1 ? 'mistake' : 'mistakes'}
      </span>
    </div>);

}

/**
 * Client-only time formatting component
 */
export function ClientTimeFormat({
  seconds,
  fallback = '--:--'



}: {seconds: number;fallback?: string;}) {
  const [formattedTime, setFormattedTime] = useState(fallback);

  useEffect(() => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    setFormattedTime(`${minutes}:${remainingSeconds.toString().padStart(2, '0')}`);
  }, [seconds]);

  return (
    <span suppressHydrationWarning data-oid="z7nekb9">
      {formattedTime}
    </span>);

}

/**
 * Client-only fatigue display component
 */
export function ClientFatigueDisplay({
  earlyAccuracy,
  lateAccuracy,
  threshold = 15




}: {earlyAccuracy: number;lateAccuracy: number;threshold?: number;}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fatigueDiff = earlyAccuracy - lateAccuracy;

  if (!isMounted || fatigueDiff <= threshold) {
    return null;
  }

  return (
    <div className="text-xs text-red-600 dark:text-red-400 mt-1" data-oid="7bsm:uj">
      Fatigue: -{fatigueDiff}%
    </div>);

}