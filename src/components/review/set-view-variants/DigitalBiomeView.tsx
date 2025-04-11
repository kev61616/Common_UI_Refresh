'use client';

import React, { useState, useEffect } from 'react';
import { SetViewProps } from './types';

export const DigitalBiomeView: React.FC<SetViewProps> = ({
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
      <div className="min-h-[500px] flex items-center justify-center" data-oid="xfaq39g">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin" data-oid="h38krg2"></div>
      </div>);

  }

  if (!sets || sets.length === 0) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg" data-oid="h8awac_">
        <p className="text-slate-500 dark:text-slate-400" data-oid="pvyr8li">No practice sets available</p>
      </div>);

  }

  // Group sets by subject
  const groupedSets = sets.reduce((acc: Record<string, any[]>, set) => {
    const subject = set.subject || 'Other';
    if (!acc[subject]) acc[subject] = [];
    acc[subject].push(set);
    return acc;
  }, {});

  // Digital biome ecosystem types based on subject
  const getBiomeType = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          name: 'Crystalline Network',
          bgClass: 'bg-gradient-to-br from-blue-900/30 to-indigo-900/30 dark:from-blue-900/40 dark:to-indigo-900/50',
          borderClass: 'border-blue-500/30 dark:border-blue-500/40',
          entityClass: 'bg-blue-500/20 dark:bg-blue-500/30',
          highlightClass: 'bg-blue-500 dark:bg-blue-400',
          description: 'A structured digital ecosystem with mathematical precision'
        };
      case 'Reading':
        return {
          name: 'Knowledge Forest',
          bgClass: 'bg-gradient-to-br from-emerald-900/30 to-green-900/30 dark:from-emerald-900/40 dark:to-green-900/50',
          borderClass: 'border-emerald-500/30 dark:border-emerald-500/40',
          entityClass: 'bg-emerald-500/20 dark:bg-emerald-500/30',
          highlightClass: 'bg-emerald-500 dark:bg-emerald-400',
          description: 'A lush ecosystem of interconnected information'
        };
      case 'Writing':
        return {
          name: 'Creative Coral Reef',
          bgClass: 'bg-gradient-to-br from-amber-900/30 to-orange-900/30 dark:from-amber-900/40 dark:to-orange-900/50',
          borderClass: 'border-amber-500/30 dark:border-amber-500/40',
          entityClass: 'bg-amber-500/20 dark:bg-amber-500/30',
          highlightClass: 'bg-amber-500 dark:bg-amber-400',
          description: 'A vibrant ecosystem of expressive elements'
        };
      default:
        return {
          name: 'Digital Tundra',
          bgClass: 'bg-gradient-to-br from-slate-700/30 to-slate-900/30 dark:from-slate-700/40 dark:to-slate-900/50',
          borderClass: 'border-slate-500/30 dark:border-slate-500/40',
          entityClass: 'bg-slate-500/20 dark:bg-slate-500/30',
          highlightClass: 'bg-slate-500 dark:bg-slate-400',
          description: 'A sparse but resilient information landscape'
        };
    }
  };

  // Digital organism types based on set properties
  const getOrganismType = (set: any) => {
    // Base on accuracy and difficulty
    const accuracy = set.accuracy || 0;
    const difficulty = set.difficulty || 'Medium';

    if (accuracy >= 90) {
      return {
        name: 'Apex Entity',
        icon: '⬠',
        size: 'large',
        description: 'Dominant digital life form representing mastery'
      };
    } else if (accuracy >= 75) {
      return {
        name: 'Advanced Entity',
        icon: '⬟',
        size: 'medium-large',
        description: 'Well-established digital organism showing proficiency'
      };
    } else if (accuracy >= 60) {
      return {
        name: 'Evolving Entity',
        icon: '⬢',
        size: 'medium',
        description: 'Growing digital life form with stable foundation'
      };
    } else if (accuracy >= 40) {
      return {
        name: 'Developing Entity',
        icon: '⬡',
        size: 'small-medium',
        description: 'Early-stage digital organism with potential'
      };
    } else {
      return {
        name: 'Nascent Entity',
        icon: '⌾',
        size: 'small',
        description: 'Newly formed digital life with room to grow'
      };
    }
  };

  // Generate a pattern of organisms based on set properties
  const generateOrganismPattern = (set: any) => {
    const organismCount = Math.max(5, Math.min(15, set.questions?.length || 10));
    const organism = getOrganismType(set);

    // Create a grid of digital organisms
    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden" data-oid="w1rzq7o">
        <div className="grid grid-cols-3 gap-1 w-full h-full p-2" data-oid="l:durua">
          {Array.from({ length: organismCount }).map((_, i) => {
            // Calculate size based on organism type
            let size = 'w-3 h-3';
            if (organism.size === 'large') size = 'w-5 h-5';else
            if (organism.size === 'medium-large') size = 'w-4 h-4';else
            if (organism.size === 'medium') size = 'w-3.5 h-3.5';else
            if (organism.size === 'small-medium') size = 'w-3 h-3';else
            size = 'w-2 h-2';

            // Make some organisms a bit larger for variety
            if (i % 4 === 0) {
              size = size.replace('w-', 'w-'); // Same size, just for reference
            } else if (i % 7 === 0) {
              // Make slightly larger
              size = size.
              replace('w-2', 'w-2.5').
              replace('w-3', 'w-3.5').
              replace('w-4', 'w-4.5').
              replace('w-5', 'w-5.5').
              replace('h-2', 'h-2.5').
              replace('h-3', 'h-3.5').
              replace('h-4', 'h-4.5').
              replace('h-5', 'h-5.5');
            }

            // Random position within grid cell
            return (
              <div
                key={i}
                className={`flex items-center justify-center ${size} rounded-full`}
                style={{
                  opacity: 0.7 + Math.random() * 0.3,
                  transform: `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`
                }} data-oid="4skysek">

                <span className="text-[0.6rem]" data-oid="00ne29z">{organism.icon}</span>
              </div>);

          })}
        </div>
      </div>);

  };

  // Render a digital biome card
  const renderDigitalBiomeCard = (set: any) => {
    const biome = getBiomeType(set.subject);
    const organism = getOrganismType(set);
    const isSelected = selectedSetId === set.id;

    return (
      <div
        className={`
          relative border rounded-lg overflow-hidden transition-all duration-300 
          ${biome.borderClass} ${biome.bgClass}
          ${isSelected ? 'shadow-lg transform scale-105' : 'hover:shadow-md hover:scale-[1.02]'}
          cursor-pointer h-[225px]
        `}
        onClick={() => onSelectSet(set.id)} data-oid="tha9ngb">

        {/* Digital organism pattern in background */}
        <div className={`absolute inset-0 ${biome.entityClass} opacity-70`} data-oid="gtncvz_">
          {generateOrganismPattern(set)}
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 p-4 flex flex-col h-full" data-oid="jkpz83h">
          <div className="mb-2" data-oid="lfm231y">
            <div className="flex justify-between items-start" data-oid="28rt_xa">
              <h3 className="font-bold text-lg" data-oid="oq9l6m8">{set.subject} - {set.type}</h3>
              <div className={`${biome.highlightClass} rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-xs`} data-oid="hdwcd9s">
                {set.accuracy}%
              </div>
            </div>
            <p className="text-xs opacity-80" data-oid="j3oua9w">
              {new Date(set.dateCompleted).toLocaleDateString()}
            </p>
          </div>
          
          <div className="bg-black/10 dark:bg-white/5 backdrop-blur-sm rounded-lg p-3 mt-1" data-oid=":8p8ct7">
            <div className="flex items-center" data-oid="t4wmpi.">
              <div className={`${biome.highlightClass} rounded-full w-6 h-6 flex items-center justify-center mr-2`} data-oid="_8v1d-x">
                <span className="text-white text-xs" data-oid=".99n:t0">{organism.icon}</span>
              </div>
              <div data-oid="7krwty5">
                <div className="font-medium text-sm" data-oid="vzwb5pu">{organism.name}</div>
                <div className="text-xs opacity-80" data-oid="15_eye0">{organism.description}</div>
              </div>
            </div>
          </div>
          
          <div className="mt-auto" data-oid="ch4duc.">
            <div className="text-xs mb-1 opacity-80" data-oid="tcraueo">Digital ecosystem vitality</div>
            <div className="h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden" data-oid="1b-n_n5">
              <div
                className={`h-full ${biome.highlightClass}`}
                style={{ width: `${set.accuracy}%` }} data-oid="sn84hb8">
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-3" data-oid="1xq96sx">
              <div className="bg-black/10 dark:bg-white/5 backdrop-blur-sm rounded p-2" data-oid="r:q8zek">
                <div className="text-xs opacity-80" data-oid="cmt:gj0">Complexity</div>
                <div className="text-sm font-medium" data-oid="p:bhwkn">{set.difficulty || 'Medium'}</div>
              </div>
              <div className="bg-black/10 dark:bg-white/5 backdrop-blur-sm rounded p-2" data-oid="atn8x6c">
                <div className="text-xs opacity-80" data-oid="u9d32od">Entities</div>
                <div className="text-sm font-medium" data-oid="p.1_d3g">{set.questions?.length || 0}</div>
              </div>
            </div>
          </div>
        </div>
      </div>);

  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm bg-slate-100 dark:bg-slate-900/50" data-oid="5cm1ig5">
      <h2 className="text-xl font-bold mb-6 text-center" data-oid="2x3aotu">Digital Biome Ecosystem</h2>
      
      <div className="mb-6 text-center" data-oid="nrv-:45">
        <p className="text-sm max-w-2xl mx-auto opacity-80" data-oid="8e4br_.">
          Visualizing your practice sets as digital ecosystems where each set represents
          a unique biome populated by digital organisms that evolve based on your performance.
        </p>
      </div>
      
      <div className="space-y-8" data-oid="490676e">
        {Object.entries(groupedSets).map(([subject, subjectSets]) => {
          const biome = getBiomeType(subject);

          return (
            <div key={subject} className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden" data-oid="n.63.qf">
              <div className={`p-4 ${biome.bgClass}`} data-oid="cr8rmy6">
                <h3 className="font-semibold flex items-center" data-oid="v8hfe8q">
                  <span className={`${biome.highlightClass} w-3 h-3 rounded-full mr-2`} data-oid="x27prlw"></span>
                  {biome.name}
                </h3>
                <p className="text-xs opacity-80 ml-5" data-oid="-hmatf7">{biome.description}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5" data-oid="9gapn._">
                {subjectSets.map((set) => renderDigitalBiomeCard(set))}
              </div>
            </div>);

        })}
      </div>
      
      {/* Biome legend */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4" data-oid="asq9b1b">
        {['Math', 'Reading', 'Writing', 'Other'].map((subject) => {
          const biome = getBiomeType(subject);

          return (
            <div key={subject} className={`rounded-lg p-2 ${biome.bgClass} ${biome.borderClass} border text-xs`} data-oid="mqhvo-g">
              <div className="flex items-center" data-oid="y22edad">
                <div className={`w-3 h-3 rounded-full ${biome.highlightClass} mr-2`} data-oid="9scwv:v"></div>
                <div className="font-medium" data-oid="00j6pjf">{biome.name}</div>
              </div>
            </div>);

        })}
      </div>
    </div>);

};