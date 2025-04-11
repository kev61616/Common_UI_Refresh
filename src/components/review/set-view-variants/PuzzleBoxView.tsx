'use client';

import React, { useState, useEffect } from 'react';
import { SetViewProps } from './types';

export const PuzzleBoxView: React.FC<SetViewProps> = ({
  sets,
  selectedSetId,
  onSelectSet,
  isLoading = false
}) => {
  const [mounted, setMounted] = useState(false);
  const [expandedBox, setExpandedBox] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // If the selectedSetId changes, expand that box
  useEffect(() => {
    if (selectedSetId) {
      setExpandedBox(selectedSetId);
    }
  }, [selectedSetId]);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center" data-oid=".j6fpq.">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin" data-oid="pf:n2q3"></div>
      </div>);

  }

  if (!sets || sets.length === 0) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg" data-oid="jy5x7jf">
        <p className="text-slate-500 dark:text-slate-400" data-oid=":sm9zff">No puzzle boxes available</p>
      </div>);

  }

  // Group sets by subject
  const groupedSets = sets.reduce((acc: Record<string, any[]>, set) => {
    const subject = set.subject || 'Other';
    if (!acc[subject]) acc[subject] = [];
    acc[subject].push(set);
    return acc;
  }, {});

  // Puzzle pieces appearance based on set properties
  const getPuzzlePieceStyle = (set: any) => {
    const baseClasses = 'rounded-lg border-2 shadow-md transition-all duration-300';

    // Different styles based on subject
    if (set.subject === 'Math') {
      return `${baseClasses} bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/20 border-indigo-300 dark:border-indigo-700`;
    } else if (set.subject === 'Reading') {
      return `${baseClasses} bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/20 border-emerald-300 dark:border-emerald-700`;
    } else if (set.subject === 'Writing') {
      return `${baseClasses} bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 border-amber-300 dark:border-amber-700`;
    } else {
      return `${baseClasses} bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/40 dark:to-slate-700/20 border-slate-300 dark:border-slate-600`;
    }
  };

  // Decorative puzzle pieces pattern
  const renderPuzzlePattern = (subject: string) => {
    // Different patterns based on subject
    const getPatternConfig = () => {
      if (subject === 'Math') {
        return {
          color: 'text-indigo-700 dark:text-indigo-400',
          shapes: [
          'M0 0L6 0L6 4L10 4L10 10L0 10Z', // Tetris-like shapes
          'M0 0L10 0L10 10L6 10L6 6L0 6Z',
          'M0 0L4 0L4 4L10 4L10 10L0 10Z',
          'M3 0L7 0L10 5L7 10L3 10L0 5Z' // Hexagon
          ]
        };
      } else if (subject === 'Reading') {
        return {
          color: 'text-emerald-700 dark:text-emerald-400',
          shapes: [
          'M0 0Q5 0 10 0Q10 5 10 10Q5 10 0 10Q0 5 0 0Z', // Smooth rounded square
          'M0 5Q0 0 5 0Q10 0 10 5Q10 10 5 10Q0 10 0 5Z', // Circle-like
          'M0 0L10 0L10 7Q5 10 0 7Z', // Book shape
          'M2 0L8 0L10 10L0 10Z' // Trapezoid
          ]
        };
      } else if (subject === 'Writing') {
        return {
          color: 'text-amber-700 dark:text-amber-400',
          shapes: [
          'M0 0L8 0L10 5L8 10L0 10L2 5Z', // Note paper
          'M0 0L10 0L8 10L2 10Z', // Pencil tip
          'M5 0L10 5L5 10L0 5Z', // Diamond
          'M0 3L3 0L10 0L10 7L7 10L0 10Z' // Document corner
          ]
        };
      } else {
        return {
          color: 'text-slate-700 dark:text-slate-400',
          shapes: [
          'M0 0L10 0L10 10L0 10Z', // Square
          'M0 0L10 0L10 10L0 10Z', // Square (repeated for simplicity)
          'M0 0L10 0L10 10L0 10Z', // Square (repeated for simplicity)
          'M0 0L10 0L10 10L0 10Z' // Square (repeated for simplicity)
          ]
        };
      }
    };

    const { color, shapes } = getPatternConfig();

    return (
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden" data-oid="sh-4d9q">
        <svg className={`w-full h-full ${color}`} viewBox="0 0 100 100" data-oid="as_hann">
          <pattern id={`puzzle-pattern-${subject.toLowerCase().replace(/\s+/g, '-')}`} patternUnits="userSpaceOnUse" width="20" height="20" data-oid="upgvaf-">
            {shapes.map((d, i) =>
            <path key={i} d={d} fill="currentColor" transform={`translate(${i % 2 * 10}, ${Math.floor(i / 2) * 10}) scale(0.8)`} data-oid="ir7ppu3" />
            )}
          </pattern>
          <rect width="100%" height="100%" fill={`url(#puzzle-pattern-${subject.toLowerCase().replace(/\s+/g, '-')})`} data-oid="nkp:5u-" />
        </svg>
      </div>);

  };

  // Render the puzzle box mechanism
  const renderPuzzleBox = (set: any, isExpanded: boolean) => {
    const getBoxContents = () => {
      // If box is not expanded, show teaser content
      if (!isExpanded) {
        return (
          <div className="h-full flex flex-col justify-between p-4" data-oid="r5p-s8.">
            <div data-oid="kp0b_kq">
              <h3 className="font-bold text-lg mb-1" data-oid="dqc0g7s">{set.subject}</h3>
              <p className="text-sm opacity-80" data-oid="7c50oof">{set.type}</p>
            </div>
            
            <div className="flex justify-between items-end" data-oid="hmr8d4-">
              <div className="text-xs opacity-70" data-oid="soc-esb">
                {new Date(set.dateCompleted).toLocaleDateString()}
              </div>
              <div className="bg-black/10 dark:bg-white/10 rounded-full px-2 py-0.5 text-xs font-medium" data-oid="oo.n4lq">
                {set.accuracy}%
              </div>
            </div>
          </div>);

      }

      // If box is expanded, show detailed content
      return (
        <div className="h-full flex flex-col p-4" data-oid="9ythb24">
          <div className="mb-4" data-oid="9m9d8q9">
            <h3 className="font-bold text-lg" data-oid="szmrba5">{set.subject}</h3>
            <p className="text-sm" data-oid="f9hzqnd">{set.type}</p>
          </div>
          
          <div className="space-y-3 flex-grow" data-oid=":xk9w:-">
            {/* Accuracy meter */}
            <div data-oid="lz2..jn">
              <div className="flex justify-between text-xs mb-1" data-oid="20_q6q0">
                <span data-oid="fd3s54q">Accuracy</span>
                <span className="font-medium" data-oid="0-p161r">{set.accuracy}%</span>
              </div>
              <div className="h-1.5 bg-black/10 dark:bg-white/10 rounded-full" data-oid="f7-l5v8">
                <div
                  className={`h-1.5 rounded-full ${
                  set.accuracy >= 80 ? 'bg-emerald-500 dark:bg-emerald-400' :
                  set.accuracy >= 60 ? 'bg-amber-500 dark:bg-amber-400' :
                  'bg-rose-500 dark:bg-rose-400'}`
                  }
                  style={{ width: `${set.accuracy}%` }} data-oid="-9h815s">
                </div>
              </div>
            </div>
            
            {/* Questions completed */}
            <div data-oid="vcqyyjv">
              <div className="flex justify-between text-xs mb-1" data-oid="ykj532k">
                <span data-oid=":87n1em">Questions</span>
                <span className="font-medium" data-oid="_gf0r8e">{set.completedCount || 0}/{set.questions?.length || 0}</span>
              </div>
              <div className="h-1.5 bg-black/10 dark:bg-white/10 rounded-full" data-oid="xnrhyeb">
                <div
                  className="h-1.5 rounded-full bg-blue-500 dark:bg-blue-400"
                  style={{ width: `${set.questions?.length ? (set.completedCount || 0) / set.questions.length * 100 : 0}%` }} data-oid="xg8z9sv">
                </div>
              </div>
            </div>
            
            {/* Difficulty */}
            <div data-oid="1slh41q">
              <div className="text-xs mb-1" data-oid="mbzacyl">Difficulty</div>
              <div className="flex space-x-1" data-oid="-8ahqoz">
                {Array.from({ length: 5 }).map((_, i) =>
                <div
                  key={i}
                  className={`w-5 h-5 rounded ${
                  i < (
                  set.difficulty === 'Easy' ? 1 :
                  set.difficulty === 'Medium' ? 2 :
                  set.difficulty === 'Hard' ? 3 :
                  set.difficulty === 'Expert' ? 4 : 0) ?

                  'bg-violet-500 dark:bg-violet-400' :
                  'bg-black/10 dark:bg-white/10'}`
                  } data-oid="026h8bo">
                </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4" data-oid="2eoz5ha">
            <div className="flex justify-between items-center text-xs opacity-70" data-oid=":.3fgxx">
              <span data-oid="u2hei2l">Completed: {new Date(set.dateCompleted).toLocaleDateString()}</span>
              <span data-oid="_3ybt2n">Pace: {set.pace}</span>
            </div>
          </div>
        </div>);

    };

    // Mechanistic elements for puzzle aesthetic
    const renderMechanismElements = () => {
      const baseClasses = "absolute rounded bg-black/5 dark:bg-white/5";
      return (
        <>
          <div className={`${baseClasses} top-2 left-2 w-3 h-1`} data-oid="hak0u6g"></div>
          <div className={`${baseClasses} top-2 right-2 w-3 h-1`} data-oid="gf2z2gv"></div>
          <div className={`${baseClasses} bottom-2 left-2 w-3 h-1`} data-oid="2:d:onx"></div>
          <div className={`${baseClasses} bottom-2 right-2 w-3 h-1`} data-oid="f5ar2mg"></div>
          <div className={`${baseClasses} left-2 top-2 h-3 w-1`} data-oid="c_oke6u"></div>
          <div className={`${baseClasses} right-2 top-2 h-3 w-1`} data-oid="56xj7.u"></div>
          <div className={`${baseClasses} left-2 bottom-2 h-3 w-1`} data-oid="__2.ip5"></div>
          <div className={`${baseClasses} right-2 bottom-2 h-3 w-1`} data-oid="zou968f"></div>
        </>);

    };

    return (
      <div
        className={`${getPuzzlePieceStyle(set)} overflow-hidden relative cursor-pointer
                   ${isExpanded ? 'transform scale-105 z-10' : 'hover:scale-[1.02]'}`}
        onClick={() => {
          setExpandedBox(isExpanded ? null : set.id);
          onSelectSet(set.id);
        }}
        style={{
          height: isExpanded ? '240px' : '140px',
          transition: 'all 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67)'
        }} data-oid="5dz:pur">

        {renderPuzzlePattern(set.subject)}
        {renderMechanismElements()}
        {getBoxContents()}
      </div>);

  };

  // Render boxes grouped by subject with staggered layout
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm bg-slate-50 dark:bg-slate-800/50" data-oid="1yk6ya0">
      <h2 className="text-xl font-bold mb-6 text-center" data-oid="kkrbadq">Puzzle Box Collection</h2>
      
      <div className="space-y-8" data-oid="e.hwfdb">
        {Object.entries(groupedSets).map(([subject, subjectSets]) =>
        <div key={subject} data-oid=".-y752p">
            <h3 className="font-semibold mb-4 border-b border-slate-200 dark:border-slate-700 pb-2" data-oid="wwg_iwh">
              {subject} Section
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-oid="r7zr4yn">
              {subjectSets.map((set) =>
            <div key={set.id} data-oid="wj6hq81">
                  {renderPuzzleBox(set, expandedBox === set.id)}
                </div>
            )}
            </div>
          </div>
        )}
      </div>
      
      {/* Decorative puzzle pieces scattered around */}
      <div className="relative h-16 mt-6 opacity-50" data-oid="wmx8t75">
        {['Math', 'Reading', 'Writing'].map((subject, i) =>
        <div
          key={subject}
          className={`absolute w-10 h-10 transform rotate-${45 * i}`}
          style={{
            left: `${20 + i * 30}%`,
            top: `${i % 2 ? 0 : 40}%`,
            opacity: 0.6
          }} data-oid="7.j53xm">

            {renderPuzzlePattern(subject)}
          </div>
        )}
      </div>
    </div>);

};