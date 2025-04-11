'use client';

import React, { useState, useEffect } from 'react';
import { SetViewProps } from './types';

export const ZodiacConstellationView: React.FC<SetViewProps> = ({
  sets,
  selectedSetId,
  onSelectSet,
  isLoading = false
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center" data-oid="v.is0f1">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin" data-oid="nhpj54l"></div>
      </div>);

  }

  if (!sets || sets.length === 0) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg" data-oid="d_j4nra">
        <p className="text-slate-500 dark:text-slate-400" data-oid="fr569.4">No constellations available</p>
      </div>);

  }

  // Zodiac signs and their symbols
  const zodiacSigns = [
  { name: 'Aries', symbol: '♈︎', element: 'Fire' },
  { name: 'Taurus', symbol: '♉︎', element: 'Earth' },
  { name: 'Gemini', symbol: '♊︎', element: 'Air' },
  { name: 'Cancer', symbol: '♋︎', element: 'Water' },
  { name: 'Leo', symbol: '♌︎', element: 'Fire' },
  { name: 'Virgo', symbol: '♍︎', element: 'Earth' },
  { name: 'Libra', symbol: '♎︎', element: 'Air' },
  { name: 'Scorpio', symbol: '♏︎', element: 'Water' },
  { name: 'Sagittarius', symbol: '♐︎', element: 'Fire' },
  { name: 'Capricorn', symbol: '♑︎', element: 'Earth' },
  { name: 'Aquarius', symbol: '♒︎', element: 'Air' },
  { name: 'Pisces', symbol: '♓︎', element: 'Water' }];


  // Assign a zodiac sign to each set based on its properties
  const assignZodiacSign = (set: any) => {
    // Use set properties to determine zodiac sign
    // For this example, we'll use a combination of subject and accuracy

    if (set.subject === 'Math') {
      if (set.accuracy >= 80) return zodiacSigns[0]; // Aries
      if (set.accuracy >= 60) return zodiacSigns[4]; // Leo
      return zodiacSigns[8]; // Sagittarius
    }

    if (set.subject === 'Reading') {
      if (set.accuracy >= 80) return zodiacSigns[2]; // Gemini
      if (set.accuracy >= 60) return zodiacSigns[6]; // Libra
      return zodiacSigns[10]; // Aquarius
    }

    if (set.subject === 'Writing') {
      if (set.accuracy >= 80) return zodiacSigns[3]; // Cancer
      if (set.accuracy >= 60) return zodiacSigns[7]; // Scorpio
      return zodiacSigns[11]; // Pisces
    }

    // Default for other subjects
    if (set.accuracy >= 80) return zodiacSigns[1]; // Taurus
    if (set.accuracy >= 60) return zodiacSigns[5]; // Virgo
    return zodiacSigns[9]; // Capricorn
  };

  // Generate constellation points for a zodiac sign
  const generateConstellationPoints = (set: any, index: number) => {
    const CANVAS_WIDTH = 200;
    const CANVAS_HEIGHT = 200;
    const CENTER_X = CANVAS_WIDTH / 2;
    const CENTER_Y = CANVAS_HEIGHT / 2;

    // Generate constellation star points based on set properties
    const starCount = Math.max(3, Math.min(9, Math.floor(set.questions?.length / 2) || 5));
    const points: Array<{x: number;y: number;size: number;}> = [];

    // Generate a seed based on set properties for deterministic constellation generation
    const seed = (set.id.charCodeAt(0) || 1) * (set.accuracy || 50);

    // Generate main constellation stars with pseudo-random but deterministic positions
    for (let i = 0; i < starCount; i++) {
      const angle = (seed + i * 50) % 360 * (Math.PI / 180);
      const distance = 30 + (seed + i * 17) % 50;

      // Convert polar coordinates to Cartesian
      const x = CENTER_X + Math.cos(angle) * distance;
      const y = CENTER_Y + Math.sin(angle) * distance;

      // Determine star size based on properties
      let size = 2;
      if (i === 0) size = 4; // Main star is bigger
      if (i === 1) size = 3; // Second star is medium

      points.push({ x, y, size });
    }

    return points;
  };

  // Generate constellation lines connecting the stars
  const generateConstellationLines = (points: Array<{x: number;y: number;size: number;}>) => {
    if (points.length < 2) return [];

    const lines: Array<{x1: number;y1: number;x2: number;y2: number;}> = [];

    // Create a "connect the dots" pattern
    for (let i = 0; i < points.length - 1; i++) {
      lines.push({
        x1: points[i].x,
        y1: points[i].y,
        x2: points[i + 1].x,
        y2: points[i + 1].y
      });
    }

    // Optionally add a few extra connections for more interesting patterns
    if (points.length > 3) {
      // Add a connection from the first to the third point
      lines.push({
        x1: points[0].x,
        y1: points[0].y,
        x2: points[2].x,
        y2: points[2].y
      });

      // If there are enough points, add another connection
      if (points.length > 5) {
        lines.push({
          x1: points[1].x,
          y1: points[1].y,
          x2: points[4].x,
          y2: points[4].y
        });
      }
    }

    return lines;
  };

  // Get styling based on zodiac element
  const getElementStyling = (element: string) => {
    switch (element) {
      case 'Fire':
        return {
          bg: 'bg-gradient-to-br from-amber-900/20 to-red-900/20 dark:from-amber-900/40 dark:to-red-900/40',
          border: 'border-amber-700/30 dark:border-amber-700/50',
          starColor: 'amber-400',
          lineColor: 'amber-300/40'
        };
      case 'Earth':
        return {
          bg: 'bg-gradient-to-br from-emerald-900/20 to-green-900/20 dark:from-emerald-900/40 dark:to-green-900/40',
          border: 'border-emerald-700/30 dark:border-emerald-700/50',
          starColor: 'emerald-400',
          lineColor: 'emerald-300/40'
        };
      case 'Air':
        return {
          bg: 'bg-gradient-to-br from-sky-900/20 to-indigo-900/20 dark:from-sky-900/40 dark:to-indigo-900/40',
          border: 'border-sky-700/30 dark:border-sky-700/50',
          starColor: 'sky-400',
          lineColor: 'sky-300/40'
        };
      case 'Water':
        return {
          bg: 'bg-gradient-to-br from-blue-900/20 to-violet-900/20 dark:from-blue-900/40 dark:to-violet-900/40',
          border: 'border-blue-700/30 dark:border-blue-700/50',
          starColor: 'blue-400',
          lineColor: 'blue-300/40'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-slate-900/20 to-slate-800/20 dark:from-slate-800/30 dark:to-slate-700/30',
          border: 'border-slate-700/30 dark:border-slate-600/50',
          starColor: 'slate-400',
          lineColor: 'slate-300/40'
        };
    }
  };

  // Group sets by their assigned zodiac sign
  const zodiacGroups = sets.reduce((acc: Record<string, any[]>, set) => {
    const zodiacSign = assignZodiacSign(set);
    if (!acc[zodiacSign.name]) {
      acc[zodiacSign.name] = [];
    }
    acc[zodiacSign.name].push({ ...set, zodiacSign });
    return acc;
  }, {});

  // Render a zodiac constellation
  const renderConstellation = (set: any, index: number) => {
    const zodiacSign = set.zodiacSign;
    const styling = getElementStyling(zodiacSign.element);
    const isSelected = selectedSetId === set.id;

    // Generate constellation points and lines
    const points = generateConstellationPoints(set, index);
    const lines = generateConstellationLines(points);

    return (
      <div
        key={set.id}
        onClick={() => onSelectSet(set.id)}
        className={`relative border rounded-lg overflow-hidden transition-all duration-300 cursor-pointer
                  ${styling.bg} ${styling.border} ${isSelected ? 'shadow-lg transform scale-105' : 'hover:shadow-md'}`} data-oid="sgaxxg.">

        {/* Stars and constellation */}
        <div className="w-full h-48 relative" data-oid="t-eo._f">
          {/* Background stars */}
          <div className="absolute inset-0" data-oid="qd3hpcn">
            {Array.from({ length: 20 }).map((_, i) =>
            <div
              key={i}
              className={`absolute bg-${styling.starColor} rounded-full opacity-${Math.floor(Math.random() * 30) + 20}`}
              style={{
                width: `${Math.floor(Math.random() * 2) + 1}px`,
                height: `${Math.floor(Math.random() * 2) + 1}px`,
                left: `${Math.floor(Math.random() * 190) + 5}px`,
                top: `${Math.floor(Math.random() * 190) + 5}px`,
                animation: `twinkle ${Math.floor(Math.random() * 5) + 3}s ease-in-out infinite`,
                animationDelay: `${Math.floor(Math.random() * 5)}s`
              }} data-oid="o9z-oqs">
            </div>
            )}
          </div>
          
          {/* Constellation lines */}
          <svg className="absolute inset-0 w-full h-full" data-oid="couwen0">
            {lines.map((line, i) =>
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              className={`stroke-${styling.lineColor}`}
              strokeWidth="1" data-oid="yrjgry1" />

            )}
          </svg>
          
          {/* Constellation stars */}
          <svg className="absolute inset-0 w-full h-full" data-oid="hew81bm">
            {points.map((point, i) =>
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={point.size}
              className={`fill-${styling.starColor}`} data-oid="2z-6pm_" />

            )}
          </svg>
          
          {/* Zodiac symbol */}
          <div className="absolute inset-0 flex items-center justify-center" data-oid="sxebgu.">
            <div className={`text-5xl opacity-20 ${isSelected ? 'text-white' : `text-${styling.starColor}`}`} data-oid="8k:1dub">
              {zodiacSign.symbol}
            </div>
          </div>
        </div>
        
        {/* Set info */}
        <div className="p-3 bg-black/20 dark:bg-black/40" data-oid="y9hdbrm">
          <div className="flex justify-between items-start" data-oid="kk0vj3d">
            <div data-oid="plje9b4">
              <h3 className="font-bold text-white" data-oid="j6p9elu">{set.subject}</h3>
              <p className="text-xs text-white/80" data-oid="s0xgrm.">{set.type}</p>
            </div>
            <div className="text-white/90 text-sm font-semibold bg-white/10 rounded-full h-7 w-7 flex items-center justify-center" data-oid="3zv.wf6">
              {set.accuracy}%
            </div>
          </div>
          
          <div className="mt-2 flex justify-between items-center" data-oid="e8-6h9b">
            <div className="text-xs text-white/70" data-oid="lpyfus4">
              {new Date(set.dateCompleted).toLocaleDateString()}
            </div>
            <div className="text-xs flex items-center text-white/90" data-oid="a7ifedz">
              <span className="mr-1" data-oid="ms0w8gn">{zodiacSign.symbol}</span>
              <span data-oid="sszptfc">{zodiacSign.name}</span>
            </div>
          </div>
        </div>
      </div>);

  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm bg-gradient-to-b from-slate-900 to-indigo-950" data-oid="eu87:xx">
      <h2 className="text-xl font-bold mb-6 text-center text-white" data-oid="::f8r-k">Zodiac Constellations</h2>
      
      {/* Zodiac description */}
      <div className="mb-8 text-center" data-oid="n7pdqwc">
        <p className="text-sm text-white/80 max-w-2xl mx-auto" data-oid="d99qr6v">
          Your practice sets visualized as celestial constellations, grouped by cosmic elements and zodiac signs.
          Each constellation's pattern reflects the set's properties and performance.
        </p>
      </div>
      
      {/* Zodiac legend */}
      <div className="grid grid-cols-4 gap-2 mb-8" data-oid="u-m31eg">
        {['Fire', 'Earth', 'Air', 'Water'].map((element) => {
          const styling = getElementStyling(element);
          return (
            <div key={element} className={`${styling.bg} ${styling.border} rounded p-2 flex items-center justify-center`} data-oid="h.pgg3e">
              <div className={`w-3 h-3 rounded-full bg-${styling.starColor} mr-2`} data-oid="6c75tfp"></div>
              <span className="text-white text-sm" data-oid="qffn:cy">{element}</span>
            </div>);

        })}
      </div>
      
      {/* Zodiac constellations by group */}
      <div className="space-y-6" data-oid="5y.hns8">
        {Object.entries(zodiacGroups).map(([zodiacName, zodiacSets]) =>
        <div key={zodiacName} className="border-t border-white/10 pt-4" data-oid="j0-id6:">
            <h3 className="text-white mb-3 font-medium flex items-center" data-oid="niadvtf">
              <span className="text-lg mr-2" data-oid="zkb9e.v">
                {zodiacSets[0]?.zodiacSign?.symbol}
              </span>
              <span data-oid="mz-:.kt">{zodiacName} ({zodiacSets.length})</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" data-oid="m6ttyeu">
              {zodiacSets.map((set, index) => renderConstellation(set, index))}
            </div>
          </div>
        )}
      </div>
      
      {/* Dynamic stars footer */}
      <div className="mt-8 pt-4 border-t border-white/10 text-center" data-oid="is0mbw6">
        <style jsx data-oid="01pljlu">{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `}</style>
        <p className="text-xs text-white/60 italic" data-oid="xh8w74t">
          "The stars align to illuminate your learning journey."
        </p>
      </div>
    </div>);

};