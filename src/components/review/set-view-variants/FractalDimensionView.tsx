'use client';

import React, { useState, useEffect } from 'react';
import { SetViewProps } from './types';

export const FractalDimensionView: React.FC<SetViewProps> = ({
  sets,
  selectedSetId,
  onSelectSet,
  isLoading = false
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fractal pattern generation functions
  const generateFractalPattern = (level: number, size: number, accuracy: number, isSelected: boolean) => {
    // Base shape and colors based on performance
    const baseColor = getColorFromAccuracy(accuracy);
    const selectedColor = isSelected ? 'border-white dark:border-white shadow-lg' : '';

    // Fractal complexity based on level
    let pattern;

    if (level <= 1) {
      // Base level pattern
      pattern =
      <div
        className={`rounded-lg border-2 ${baseColor} ${selectedColor} overflow-hidden transform transition-all duration-300`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transform: isSelected ? 'scale(1.05)' : undefined
        }} data-oid="cf85m6v">
      </div>;

    } else {
      // Create subdivisions for higher levels
      const subSize = size / 2;

      // Pattern depends on level for visual variety
      if (level % 3 === 0) {
        // Spiral pattern
        pattern =
        <div
          className={`relative rounded-lg border-2 ${baseColor} ${selectedColor} overflow-hidden transform transition-all duration-300`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transform: isSelected ? 'scale(1.05)' : undefined
          }} data-oid="u261viu">

            <div className="absolute left-0 top-0" data-oid="neoyfg.">
              {generateFractalPattern(level - 1, subSize, accuracy * 0.95, false)}
            </div>
            <div className="absolute right-0 top-0" data-oid="--tqil8">
              {generateFractalPattern(level - 1, subSize, accuracy * 0.9, false)}
            </div>
            <div className="absolute left-0 bottom-0" data-oid="c_vezkq">
              {generateFractalPattern(level - 1, subSize, accuracy * 0.85, false)}
            </div>
            <div className="absolute right-0 bottom-0" data-oid="3certjp">
              {generateFractalPattern(level - 1, subSize, accuracy * 0.8, false)}
            </div>
          </div>;

      } else if (level % 3 === 1) {
        // Centered pattern
        pattern =
        <div
          className={`relative rounded-lg border-2 ${baseColor} ${selectedColor} flex items-center justify-center transform transition-all duration-300`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transform: isSelected ? 'scale(1.05)' : undefined
          }} data-oid="b_st.ky">

            {generateFractalPattern(level - 1, size * 0.6, accuracy * 0.9, false)}
          </div>;

      } else {
        // H pattern
        pattern =
        <div
          className={`relative rounded-lg border-2 ${baseColor} ${selectedColor} flex flex-col items-center transform transition-all duration-300`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transform: isSelected ? 'scale(1.05)' : undefined
          }} data-oid="6w88oni">

            <div className="flex-1 w-full flex justify-around items-center" data-oid="hp1l6az">
              <div className="transform scale-75" data-oid="w2xm_um">
                {generateFractalPattern(level - 1, subSize, accuracy * 0.9, false)}
              </div>
              <div className="transform scale-75" data-oid="clep.p_">
                {generateFractalPattern(level - 1, subSize, accuracy * 0.9, false)}
              </div>
            </div>
            <div className="flex-1 w-full flex justify-center items-center" data-oid="zerq7jg">
              <div className="transform scale-75" data-oid="je22x6.">
                {generateFractalPattern(level - 1, subSize, accuracy * 0.9, false)}
              </div>
            </div>
            <div className="flex-1 w-full flex justify-around items-center" data-oid="5p8x1b5">
              <div className="transform scale-75" data-oid="3.rnd9-">
                {generateFractalPattern(level - 1, subSize, accuracy * 0.9, false)}
              </div>
              <div className="transform scale-75" data-oid="lkl3ono">
                {generateFractalPattern(level - 1, subSize, accuracy * 0.9, false)}
              </div>
            </div>
          </div>;

      }
    }

    return pattern;
  };

  // Determine color based on accuracy
  const getColorFromAccuracy = (accuracy: number) => {
    if (accuracy >= 90) {
      return 'border-emerald-500 dark:border-emerald-400 bg-emerald-500/20 dark:bg-emerald-400/20';
    } else if (accuracy >= 70) {
      return 'border-blue-500 dark:border-blue-400 bg-blue-500/20 dark:bg-blue-400/20';
    } else if (accuracy >= 50) {
      return 'border-amber-500 dark:border-amber-400 bg-amber-500/20 dark:bg-amber-400/20';
    } else {
      return 'border-rose-500 dark:border-rose-400 bg-rose-500/20 dark:bg-rose-400/20';
    }
  };

  // Group sets by subject for better organization
  const groupedSets = sets?.reduce((acc, set) => {
    const subject = set.subject || 'Other';
    if (!acc[subject]) {
      acc[subject] = [];
    }
    acc[subject].push(set);
    return acc;
  }, {} as Record<string, typeof sets>) || {};

  if (!mounted || isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center" data-oid="skcqeoi">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin" data-oid="pdrh5n4"></div>
      </div>);

  }

  if (!sets || sets.length === 0) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg" data-oid="4vm:eml">
        <p className="text-slate-500 dark:text-slate-400" data-oid="8zbrn9i">No practice sets available to visualize</p>
      </div>);

  }

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="3x2_uew">
      <h3 className="text-xl font-bold mb-4 text-center" data-oid="8b:5cps">Fractal Dimension View</h3>
      
      <div className="space-y-6" data-oid="mws7w_l">
        {Object.entries(groupedSets).map(([subject, subjectSets]) =>
        <div key={subject} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4" data-oid="5-4il6j">
            <h4 className="text-lg font-medium mb-3 border-b pb-2 border-slate-200 dark:border-slate-700" data-oid="z4vdz-k">
              {subject}
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5" data-oid="ls70u2b">
              {subjectSets.map((set) => {
              // Determine fractal complexity based on set properties
              const complexity = Math.min(3, 1 + Math.floor(set.questions.length / 10));

              return (
                <div
                  key={set.id}
                  onClick={() => onSelectSet(set.id)}
                  className="cursor-pointer" data-oid="z3xef9l">

                    <div className="flex justify-center mb-3" data-oid="n8xacwd">
                      {generateFractalPattern(
                      complexity,
                      120,
                      set.accuracy || 50,
                      set.id === selectedSetId
                    )}
                    </div>
                    
                    <div className="text-center" data-oid="e_c2dpn">
                      <div className={`font-medium truncate ${set.id === selectedSetId ? 'text-primary' : ''}`} data-oid="u7:hzp8">
                        {set.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1" data-oid="axcukhb">
                        {set.questions.length} questions · {set.accuracy}% accuracy
                      </div>
                    </div>
                  </div>);

            })}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-4" data-oid="2go8z1k">
        <div className="text-center text-sm text-slate-500 dark:text-slate-400" data-oid=":371vxo">
          <span className="font-medium" data-oid="carp3nl">Fractal Legend:</span> 
          <span className="ml-2" data-oid=".q:8g_t">Pattern complexity represents question count | </span>
          <span data-oid="bv5q0xf">Colors represent performance levels</span>
        </div>
        
        <div className="flex justify-center mt-3 space-x-4" data-oid="j74yjd:">
          <div className="flex items-center" data-oid="p_1.ihw">
            <div className="w-3 h-3 rounded-full bg-emerald-500 mr-1.5" data-oid="oh40.v_"></div>
            <span className="text-xs" data-oid=".u8yc0b">90%+</span>
          </div>
          <div className="flex items-center" data-oid="1htex8o">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1.5" data-oid="8idqdsa"></div>
            <span className="text-xs" data-oid="5dsomb6">70-89%</span>
          </div>
          <div className="flex items-center" data-oid="rbb88iu">
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-1.5" data-oid="3bgyyk3"></div>
            <span className="text-xs" data-oid="q52mg2t">50-69%</span>
          </div>
          <div className="flex items-center" data-oid="5.y2-lt">
            <div className="w-3 h-3 rounded-full bg-rose-500 mr-1.5" data-oid="jvezgbg"></div>
            <span className="text-xs" data-oid="e-chi56">&lt; 50%</span>
          </div>
        </div>
      </div>
    </div>);

};