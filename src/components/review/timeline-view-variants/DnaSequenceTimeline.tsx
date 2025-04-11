'use client';

import { useState, useEffect } from 'react';
import { TimelineViewProps } from './types';

/**
 * DNA Sequence Timeline (Timeline View Variant 29)
 * A timeline visualization representing learning activity as a DNA strand
 * with base pairs for sessions and molecular biology-inspired design
 */
export function DnaSequenceTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  const [hoveredSetId, setHoveredSetId] = useState<string | null>(null);

  // Group practice sets by month
  const monthlyGroups = practiceSets.reduce((groups, set) => {
    const date = new Date(set.dateCompleted);
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(set);
    return groups;
  }, {} as Record<string, typeof practiceSets>);

  // Sort months chronologically
  const sortedMonths = Object.keys(monthlyGroups).sort((a, b) => {
    const dateA = new Date(monthlyGroups[a][0].dateCompleted);
    const dateB = new Date(monthlyGroups[b][0].dateCompleted);
    return dateA.getTime() - dateB.getTime();
  });

  // Auto-scroll to selected set
  useEffect(() => {
    if (selectedSetId) {
      const element = document.getElementById(`dna-set-${selectedSetId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedSetId]);

  // Generate color based on subject for DNA bases
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          primary: 'bg-blue-500',
          secondary: 'bg-blue-300',
          text: 'text-blue-600',
          helix: 'from-blue-500 to-blue-600',
          border: 'border-blue-400',
          light: 'bg-blue-100',
          baseChar: 'A' // Adenine
        };
      case 'Reading':
        return {
          primary: 'bg-green-500',
          secondary: 'bg-green-300',
          text: 'text-green-600',
          helix: 'from-green-500 to-green-600',
          border: 'border-green-400',
          light: 'bg-green-100',
          baseChar: 'G' // Guanine
        };
      case 'Writing':
        return {
          primary: 'bg-purple-500',
          secondary: 'bg-purple-300',
          text: 'text-purple-600',
          helix: 'from-purple-500 to-purple-600',
          border: 'border-purple-400',
          light: 'bg-purple-100',
          baseChar: 'C' // Cytosine
        };
      default:
        return {
          primary: 'bg-amber-500',
          secondary: 'bg-amber-300',
          text: 'text-amber-600',
          helix: 'from-amber-500 to-amber-600',
          border: 'border-amber-400',
          light: 'bg-amber-100',
          baseChar: 'T' // Thymine
        };
    }
  };

  // Convert timestamp to formatted date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate accuracy color class
  const getAccuracyColorClass = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-500';
    if (accuracy >= 70) return 'text-blue-500';
    if (accuracy >= 50) return 'text-amber-500';
    return 'text-red-500';
  };

  // Create dynamic DNA animation
  const createDnaAnimation = () => {
    // Create a series of floating particles
    return (
      <div className="absolute inset-0 opacity-20" data-oid="5hwbc-u">
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 10 + 5;
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const delay = Math.random() * 5;
          return (
            <div
              key={`particle-${i}`}
              className="absolute rounded-full bg-blue-300 dark:bg-blue-500"
              style={{
                width: size,
                height: size,
                top: `${top}%`,
                left: `${left}%`,
                opacity: Math.random() * 0.5 + 0.1,
                animation: `float 15s infinite ease-in-out ${delay}s`
              }} data-oid="tr4g.pf" />);


        })}
      </div>);

  };

  return (
    <div className="relative bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md p-6 overflow-hidden" data-oid="yfkntv1">
      <h3 className="text-center text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200" data-oid="qjsd4ch">
        <span className="text-3xl" data-oid="r685l6l">29.</span> DNA Sequence Timeline
      </h3>
      
      <div className="text-center mb-8 text-gray-600 dark:text-gray-400" data-oid="a3vugvt">
        A visualization of your learning journey represented as a DNA double helix
      </div>
      
      {/* Background animation */}
      {createDnaAnimation()}
      
      {/* Main DNA strand container */}
      <div className="relative z-10 px-4 py-6" data-oid="4g1s22e">
        {sortedMonths.map((month, monthIndex) => {
          const sets = monthlyGroups[month];

          return (
            <div key={month} className="mb-16 last:mb-0" data-oid=".wj68dq">
              {/* Month label */}
              <div className="relative mb-8" data-oid="ajufeye">
                <h4 className="text-xl font-bold text-center px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-full inline-block mx-auto text-gray-800 dark:text-gray-200" data-oid="qfycl5t">
                  {month}
                </h4>
                
                {/* Gradient line connecting months */}
                {monthIndex < sortedMonths.length - 1 &&
                <div className="absolute left-1/2 top-full h-16 w-0.5 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-700" data-oid="lv77i6_"></div>
                }
              </div>
              
              {/* DNA strand for this month */}
              <div className="relative mx-auto max-w-3xl" data-oid="k:-hjsm">
                {/* DNA backbone (double helix) */}
                <div className="absolute left-0 right-0 h-full" data-oid="d27mb1d">
                  {/* Left backbone */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-700 rounded-full"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                    animation: "dnaWave1 10s infinite ease-in-out"
                  }} data-oid="9dz6m-g"></div>
                  
                  {/* Right backbone */}
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-700 rounded-full"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                    animation: "dnaWave2 10s infinite ease-in-out"
                  }} data-oid="2ydtsp:"></div>
                </div>
                
                {/* Base pairs (practice sets) */}
                <div className="relative space-y-12" data-oid="gd:rwpn">
                  {sets.map((set, setIndex) => {
                    const isSelected = set.id === selectedSetId;
                    const isHovered = set.id === hoveredSetId;
                    const colors = getSubjectColor(set.subject);

                    // Alternate left and right sides
                    const isLeft = setIndex % 2 === 0;

                    return (
                      <div
                        id={`dna-set-${set.id}`}
                        key={set.id}
                        className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                        onMouseEnter={() => setHoveredSetId(set.id)}
                        onMouseLeave={() => setHoveredSetId(null)} data-oid="_rd3gbn">

                        {/* Base pair connector line */}
                        <div className={`absolute left-6 right-6 h-2 ${isSelected ? colors.primary : 'bg-gray-200 dark:bg-gray-800'} z-0`} data-oid="wxj38a0"></div>
                        
                        {/* Left DNA base */}
                        <div
                          className={`relative z-10 h-12 w-12 rounded-full flex items-center justify-center text-white font-bold transition-transform ${colors.primary} ${isSelected || isHovered ? 'scale-110' : ''}`} data-oid="d3s-ryd">

                          {colors.baseChar}
                        </div>
                        
                        {/* Base pair content (card) */}
                        <div
                          onClick={() => onSelectSet(set.id)}
                          className={`relative z-20 flex-1 mx-3 rounded-lg transition-all cursor-pointer 
                                     bg-white dark:bg-gray-800 border-2 
                                     ${isSelected ? colors.border : 'border-gray-200 dark:border-gray-700'} 
                                     ${isSelected || isHovered ? 'shadow-lg scale-105' : 'shadow'}`} data-oid="d2ou2hm">

                          <div className="px-4 py-3" data-oid="sy6-cr5">
                            <div className="flex items-center justify-between" data-oid="esek6.c">
                              <h5 className={`font-medium ${colors.text}`} data-oid="9o2xa_3">{set.type}</h5>
                              <span className="text-xs text-gray-500 dark:text-gray-400" data-oid="6hmcocq">{formatDate(set.dateCompleted)}</span>
                            </div>
                            
                            <div className="mt-2 flex flex-wrap gap-2" data-oid="d-mgude">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${colors.light} ${colors.text}`} data-oid="nnmsi3y">
                                {set.subject}
                              </span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 ${getAccuracyColorClass(set.accuracy)}`} data-oid="vbbdd5l">
                                {set.accuracy}% accuracy
                              </span>
                            </div>
                            
                            <div className="mt-3 text-sm text-gray-600 dark:text-gray-300" data-oid=".1l0c6i">
                              <div className="flex justify-between" data-oid="vu:3cm4">
                                <span data-oid="y4l7nmg">Questions: {set.questions.length}</span>
                                <span data-oid="xe:748e">Time: {Math.floor(set.timeUsed / 60)}m {set.timeUsed % 60}s</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Nucleotide base details (only shown when selected) */}
                          {isSelected &&
                          <div className={`p-3 border-t text-sm ${colors.light} ${colors.text}`} data-oid="lcu5r3k">
                              <div className="flex justify-between" data-oid="cth__nd">
                                <div data-oid="bxf_v4r">
                                  <span className="text-gray-600 dark:text-gray-400" data-oid="e8tzrbu">Conceptual Errors:</span> 
                                  <span className="ml-1 font-medium" data-oid="._811vt">{set.mistakeTypes.conceptual}</span>
                                </div>
                                <div data-oid="ec3xwg2">
                                  <span className="text-gray-600 dark:text-gray-400" data-oid="_cbnjg6">Careless Errors:</span>
                                  <span className="ml-1 font-medium" data-oid="d.se5nk">{set.mistakeTypes.careless}</span>
                                </div>
                              </div>
                            </div>
                          }
                        </div>
                        
                        {/* Right DNA base */}
                        <div
                          className={`relative z-10 h-12 w-12 rounded-full flex items-center justify-center text-white font-bold transition-transform ${colors.secondary} ${isSelected || isHovered ? 'scale-110' : ''}`} data-oid="w5_-w1b">

                          {/* Complementary base pair */}
                          {colors.baseChar === 'A' ? 'T' :
                          colors.baseChar === 'T' ? 'A' :
                          colors.baseChar === 'G' ? 'C' : 'G'}
                        </div>
                      </div>);

                  })}
                </div>
              </div>
            </div>);

        })}
      </div>
      
      {/* Legend for DNA bases */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4" data-oid="dhz3lfa">
        <h5 className="text-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" data-oid="b5n-q21">DNA Base Pairs Legend</h5>
        <div className="flex justify-center flex-wrap gap-4" data-oid="vwvtm-e">
          <div className="flex items-center" data-oid="fj_ntil">
            <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs mr-1" data-oid="gw5-4me">A</div>
            <div className="h-6 w-6 rounded-full bg-blue-300 flex items-center justify-center text-white font-bold text-xs mr-2" data-oid="szh696q">T</div>
            <span className="text-sm text-gray-600 dark:text-gray-400" data-oid="vnvq_hn">Math</span>
          </div>
          <div className="flex items-center" data-oid="5kvz_da">
            <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xs mr-1" data-oid="1lm_wn9">G</div>
            <div className="h-6 w-6 rounded-full bg-green-300 flex items-center justify-center text-white font-bold text-xs mr-2" data-oid="wwwsk_u">C</div>
            <span className="text-sm text-gray-600 dark:text-gray-400" data-oid="j4bgnf3">Reading</span>
          </div>
          <div className="flex items-center" data-oid="op0:va3">
            <div className="h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xs mr-1" data-oid="16_c_7i">C</div>
            <div className="h-6 w-6 rounded-full bg-purple-300 flex items-center justify-center text-white font-bold text-xs mr-2" data-oid="0i12gtm">G</div>
            <span className="text-sm text-gray-600 dark:text-gray-400" data-oid="kp9gks6">Writing</span>
          </div>
          <div className="flex items-center" data-oid="_:98i-a">
            <div className="h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-xs mr-1" data-oid="x9xtpt9">T</div>
            <div className="h-6 w-6 rounded-full bg-amber-300 flex items-center justify-center text-white font-bold text-xs mr-2" data-oid="ubch5y7">A</div>
            <span className="text-sm text-gray-600 dark:text-gray-400" data-oid="04gm5vr">Other</span>
          </div>
        </div>
      </div>
      
      {/* DNA animation keyframes */}
      <style jsx data-oid="_r173zq">{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes dnaWave1 {
          0%, 100% { transform: translateX(0) scaleY(1); }
          25% { transform: translateX(4px) scaleY(1.02); }
          50% { transform: translateX(0) scaleY(1); }
          75% { transform: translateX(-4px) scaleY(0.98); }
        }
        
        @keyframes dnaWave2 {
          0%, 100% { transform: translateX(0) scaleY(1); }
          25% { transform: translateX(-4px) scaleY(0.98); }
          50% { transform: translateX(0) scaleY(1); }
          75% { transform: translateX(4px) scaleY(1.02); }
        }
      `}</style>
    </div>);

}