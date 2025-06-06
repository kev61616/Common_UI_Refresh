'use client';

import React, { useState } from 'react';
import { SetViewProps } from '../../set-view-variants/types';

/**
 * Learning Garden View
 * 
 * A botanical-inspired visualization that represents study sets as plants in a garden:
 * - Each set is a unique plant type with growth stages based on progress
 * - Interactive garden plot with vibrant visuals and animations
 * - Color-coded plant types represent different subjects
 * - Visual growth indicators show completion and mastery
 */
export function Component({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [hoveredSetId, setHoveredSetId] = useState<string | null>(null);

  // Sort sets by subject and completion percentage
  const sortedSets = [...practiceSets].sort((a, b) => {
    // First sort by subject
    if (a.subject < b.subject) return -1;
    if (a.subject > b.subject) return 1;

    // Then by completion percentage
    const aCompleted = a.questions.filter((q) => q.answered).length / a.questions.length;
    const bCompleted = b.questions.filter((q) => q.answered).length / b.questions.length;
    return bCompleted - aCompleted;
  });

  // Group sets by subject
  const setsBySubject: Record<string, typeof practiceSets> = {};
  sortedSets.forEach((set) => {
    if (!setsBySubject[set.subject]) {
      setsBySubject[set.subject] = [];
    }
    setsBySubject[set.subject].push(set);
  });

  // Calculate growth stage (0-4) based on completion and accuracy
  const getGrowthStage = (set: typeof practiceSets[0]): number => {
    const answeredQuestions = set.questions.filter((q) => q.answered);
    const completionRate = answeredQuestions.length / set.questions.length;

    if (completionRate === 0) return 0; // Seed
    if (completionRate < 0.3) return 1; // Sprout
    if (completionRate < 0.7) return 2; // Growing
    if (completionRate < 1) return 3; // Blooming
    return 4; // Fully Grown
  };

  // Get subject-specific color
  const getSubjectColor = (subject: string): string => {
    switch (subject) {
      case 'Math':return 'bg-blue-500 dark:bg-blue-600';
      case 'Reading':return 'bg-green-500 dark:bg-green-600';
      case 'Writing':return 'bg-purple-500 dark:bg-purple-600';
      case 'Science':return 'bg-teal-500 dark:bg-teal-600';
      case 'History':return 'bg-amber-500 dark:bg-amber-600';
      default:return 'bg-gray-500 dark:bg-gray-600';
    }
  };

  // Get plant type based on set type
  const getPlantType = (set: typeof practiceSets[0]): string => {
    switch (set.type.toLowerCase()) {
      case 'quiz':return 'Sunflower';
      case 'practice':return 'Tulip';
      case 'review':return 'Rose';
      case 'exam':return 'Oak Tree';
      case 'homework':return 'Fern';
      case 'assignment':return 'Cactus';
      default:return 'Daisy';
    }
  };

  // Return SVG for different growth stages of plants
  const getPlantSvg = (set: typeof practiceSets[0]) => {
    const growthStage = getGrowthStage(set);
    const subjectClass = getSubjectColor(set.subject).replace('bg-', 'text-').replace('dark:bg-', 'dark:text-');
    const accuracyPercentage = Math.round(set.accuracy);

    // Plant elements vary by type, but all have growth stages
    switch (getPlantType(set)) {
      case 'Sunflower':
        return (
          <div className="flex flex-col items-center justify-end h-full" data-oid="xjb6ta0">
            {/* Stem */}
            <div
              className={`w-2 bg-green-500 dark:bg-green-600 rounded-full transition-all duration-300 ${
              growthStage >= 1 ? 'h-16' : 'h-0'} ${
              growthStage >= 2 ? 'h-24' : ''} ${growthStage >= 3 ? 'h-32' : ''}`} data-oid=":xxyeto">
            </div>
            
            {/* Flower/Seed */}
            <div
              className={`relative rounded-full transition-all duration-300 flex items-center justify-center ${
              growthStage === 0 ? 'w-6 h-6 bg-amber-800 dark:bg-amber-900' : // Seed
              growthStage >= 3 ? `w-20 h-20 ${getSubjectColor(set.subject)}` : // Flower
              `w-12 h-12 ${getSubjectColor(set.subject)}` // Bud
              }`} data-oid="9zarrx4">

              {growthStage >= 3 &&
              <div className="absolute inset-0 flex items-center justify-center" data-oid="92:a1dv">
                  <div className="w-10 h-10 rounded-full bg-amber-800 dark:bg-amber-900 flex items-center justify-center text-white font-bold" data-oid="am91p1h">
                    {accuracyPercentage}%
                  </div>
                </div>
              }
              
              {/* Petals for blooming flowers */}
              {growthStage >= 3 &&
              <>
                  {[...Array(8)].map((_, i) =>
                <div
                  key={i}
                  className={`absolute w-10 h-5 ${subjectClass} rounded-full transform origin-bottom`}
                  style={{ transform: `rotate(${i * 45}deg) translateY(-15px)` }} data-oid="itm7v_j">
                </div>
                )}
                </>
              }
            </div>
            
            {/* Leaves */}
            {growthStage >= 2 &&
            <>
                <div className="absolute left-1/2 bottom-16 transform -translate-x-full" data-oid="pd1s_m1">
                  <div className="w-10 h-5 bg-green-400 dark:bg-green-500 rounded-full -rotate-45" data-oid="iehgzrv"></div>
                </div>
                <div className="absolute left-1/2 bottom-24 transform" data-oid="1qo_-c2">
                  <div className="w-10 h-5 bg-green-400 dark:bg-green-500 rounded-full rotate-45" data-oid=":lka5l1"></div>
                </div>
              </>
            }
          </div>);


      case 'Rose':
        return (
          <div className="flex flex-col items-center justify-end h-full" data-oid="-h791zn">
            {/* Stem */}
            <div
              className={`w-2 bg-green-500 dark:bg-green-600 rounded-full transition-all duration-300 ${
              growthStage >= 1 ? 'h-16' : 'h-0'} ${
              growthStage >= 2 ? 'h-24' : ''} ${growthStage >= 3 ? 'h-32' : ''}`} data-oid="te8:mvf">
            </div>
            
            {/* Flower/Bud */}
            <div
              className={`relative rounded-full transition-all duration-300 ${
              growthStage === 0 ? 'w-6 h-6 bg-amber-800 dark:bg-amber-900' : // Seed
              growthStage === 1 ? 'w-8 h-8 bg-green-600 dark:bg-green-700' : // Small bud
              `w-16 h-16 ${getSubjectColor(set.subject)}` // Flower
              }`} data-oid="0h1q-fk">

              {growthStage >= 3 &&
              <div className="absolute inset-0 flex items-center justify-center" data-oid="tb_a4c2">
                  <span className="text-white font-bold" data-oid="lly6v7:">{accuracyPercentage}%</span>
                </div>
              }
              
              {/* Petals for blooming rose */}
              {growthStage >= 3 &&
              <>
                  {[...Array(12)].map((_, i) =>
                <div
                  key={i}
                  className={`absolute w-8 h-8 ${subjectClass} rounded-full opacity-60`}
                  style={{
                    transform: `rotate(${i * 30}deg) translate(6px, 0)`
                  }} data-oid="m5rxg10">
                </div>
                )}
                </>
              }
            </div>
            
            {/* Leaves and thorns */}
            {growthStage >= 2 &&
            <>
                <div className="absolute left-1/2 bottom-12 transform -translate-x-full" data-oid="h_.z.83">
                  <div className="w-10 h-5 bg-green-400 dark:bg-green-500 rounded-tr-full rounded-bl-full -rotate-45" data-oid="t4_l536"></div>
                </div>
                <div className="absolute left-1/2 bottom-20 transform" data-oid=":1gwdxe">
                  <div className="w-10 h-5 bg-green-400 dark:bg-green-500 rounded-tl-full rounded-br-full rotate-45" data-oid="nb9c9.s"></div>
                </div>
                {/* Thorns */}
                <div className="absolute left-1/2 bottom-16 transform -translate-x-4" data-oid="zazp.2p">
                  <div className="w-2 h-2 bg-green-700 dark:bg-green-800 rotate-45" data-oid="d25iaic"></div>
                </div>
                <div className="absolute left-1/2 bottom-24 transform translate-x-3" data-oid="9erde_c">
                  <div className="w-2 h-2 bg-green-700 dark:bg-green-800 rotate-45" data-oid="4t5c.1:"></div>
                </div>
              </>
            }
          </div>);


      case 'Tulip':
        return (
          <div className="flex flex-col items-center justify-end h-full" data-oid="thvm9ws">
            {/* Stem */}
            <div
              className={`w-2 bg-green-500 dark:bg-green-600 rounded-full transition-all duration-300 ${
              growthStage >= 1 ? 'h-16' : 'h-0'} ${
              growthStage >= 2 ? 'h-24' : ''} ${growthStage >= 3 ? 'h-32' : ''}`} data-oid="qov6-.m">
            </div>
            
            {/* Flower/Bud */}
            {growthStage === 0 &&
            <div className="w-6 h-6 bg-amber-800 dark:bg-amber-900 rounded-full" data-oid="na6:zbq"></div>
            }
            
            {growthStage >= 1 && growthStage < 3 &&
            <div className="w-8 h-12 bg-green-600 dark:bg-green-700 rounded-t-full" data-oid="tlm1.-_"></div>
            }
            
            {growthStage >= 3 &&
            <div className="relative w-16 h-20 flex justify-center overflow-hidden" data-oid=".pnm.9k">
                {/* Tulip petals */}
                <div className={`absolute w-10 h-16 ${getSubjectColor(set.subject)} rounded-t-full left-0`} data-oid="faxu2xq"></div>
                <div className={`absolute w-10 h-16 ${getSubjectColor(set.subject)} rounded-t-full right-0`} data-oid="3-.701r"></div>
                <div className={`absolute w-10 h-16 ${getSubjectColor(set.subject)} rounded-t-full mx-auto z-10`} data-oid="revsfpb"></div>
                
                {/* Accuracy in center */}
                <div className="absolute bottom-4 z-20 bg-white dark:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center" data-oid="7o.be0a">
                  <span className={`text-sm font-bold ${subjectClass}`} data-oid="q3sj0aj">{accuracyPercentage}%</span>
                </div>
              </div>
            }
            
            {/* Leaves */}
            {growthStage >= 2 &&
            <>
                <div className="absolute left-1/2 bottom-10 transform -translate-x-full" data-oid="7d0m95m">
                  <div className="w-12 h-4 bg-green-400 dark:bg-green-500 rounded-full -rotate-12" data-oid="46.h1_y"></div>
                </div>
                <div className="absolute left-1/2 bottom-16 transform" data-oid="-k-6a6v">
                  <div className="w-12 h-4 bg-green-400 dark:bg-green-500 rounded-full rotate-12" data-oid="n2bb34d"></div>
                </div>
              </>
            }
          </div>);


      default: // Daisy fallback
        return (
          <div className="flex flex-col items-center justify-end h-full" data-oid="xkfbpne">
            {/* Stem */}
            <div
              className={`w-2 bg-green-500 dark:bg-green-600 rounded-full transition-all duration-300 ${
              growthStage >= 1 ? 'h-16' : 'h-0'} ${
              growthStage >= 2 ? 'h-24' : ''} ${growthStage >= 3 ? 'h-32' : ''}`} data-oid="xho63m7">
            </div>
            
            {/* Flower/Seed */}
            <div
              className={`relative rounded-full transition-all duration-300 flex items-center justify-center ${
              growthStage === 0 ? 'w-6 h-6 bg-amber-800 dark:bg-amber-900' : // Seed
              growthStage >= 3 ? 'w-16 h-16' : 'w-10 h-10' // Flower or bud
              } ${growthStage >= 1 ? 'bg-yellow-300 dark:bg-yellow-400' : ''}`} data-oid="wt6-i4z">

              {growthStage >= 3 &&
              <span className="text-gray-800 dark:text-gray-900 font-bold z-10" data-oid="gv8-5g-">{accuracyPercentage}%</span>
              }
              
              {/* Petals for blooming flowers */}
              {growthStage >= 2 &&
              <>
                  {[...Array(8)].map((_, i) =>
                <div
                  key={i}
                  className={`absolute w-8 h-3 bg-white dark:bg-gray-100 rounded-full transform origin-center 
                        ${growthStage >= 3 ? 'opacity-100' : 'opacity-70'}`}
                  style={{ transform: `rotate(${i * 45}deg) translateX(8px)` }} data-oid="ja53.ui">
                </div>
                )}
                </>
              }
            </div>
            
            {/* Leaves */}
            {growthStage >= 2 &&
            <>
                <div className="absolute left-1/2 bottom-12 transform -translate-x-full" data-oid="2w1vrub">
                  <div className="w-10 h-4 bg-green-400 dark:bg-green-500 rounded-full -rotate-30" data-oid="ye1-s::"></div>
                </div>
                <div className="absolute left-1/2 bottom-20 transform" data-oid="i1vc1lj">
                  <div className="w-10 h-4 bg-green-400 dark:bg-green-500 rounded-full rotate-30" data-oid="mc38_ry"></div>
                </div>
              </>
            }
          </div>);

    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg h-full" data-oid="udqe_oi">
      <div className="mb-6" data-oid="_s8_6y:">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2" data-oid="485n64v">
          Learning Garden
        </h2>
        <p className="text-gray-600 dark:text-gray-300" data-oid="lt:k9:e">
          Watch your knowledge grow in this interactive garden. Each plant represents a set of questions or exercises.
        </p>
      </div>
      
      {/* Garden plots by subject */}
      <div className="space-y-8 mt-4 pb-4" data-oid="q-1s01g">
        {Object.entries(setsBySubject).map(([subject, sets]) =>
        <div key={subject} className="bg-gradient-to-r from-amber-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-4" data-oid="-jxrre6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center" data-oid="..y9i2g">
              <span
              className={`inline-block w-4 h-4 rounded-full mr-2 ${getSubjectColor(subject)}`} data-oid="pcrv72d">
            </span>
              {subject} Garden Plot
            </h3>
            
            {/* Plants in this plot */}
            <div
            className="grid gap-8 pt-6"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))'
            }} data-oid="98d4xj3">

              {sets.map((set) => {
              const isSelected = set.id === selectedSetId;
              const isHovered = set.id === hoveredSetId;
              const completedQuestions = set.questions.filter((q) => q.answered).length;
              const totalQuestions = set.questions.length;
              const completionPercentage = Math.round(completedQuestions / totalQuestions * 100);
              const growthStage = getGrowthStage(set);

              // Growth stage labels
              const stageLabels = ['Seed', 'Sprout', 'Growing', 'Blooming', 'Flourishing'];

              return (
                <div
                  key={set.id}
                  className={`
                      relative h-60 flex flex-col bg-white dark:bg-gray-800 rounded-lg 
                      transition-all duration-300 cursor-pointer group
                      ${isSelected ? 'ring-2 ring-blue-500 shadow-md' : 'shadow'}
                      ${isHovered ? 'transform scale-105' : ''}
                    `}
                  onClick={() => onSelectSet(set.id)}
                  onMouseEnter={() => setHoveredSetId(set.id)}
                  onMouseLeave={() => setHoveredSetId(null)} data-oid="7_2lc_f">

                    {/* Plant container */}
                    <div className="flex-1 flex items-end justify-center pb-4 relative overflow-hidden" data-oid="8du1z2h">
                      {/* Sun rays animation for selected or hovered items */}
                      {(isSelected || isHovered) &&
                    <div className="absolute top-4 right-4 w-12 h-12" data-oid=":l6zg7p">
                          <div className="absolute inset-0 bg-yellow-300 dark:bg-yellow-400 rounded-full" data-oid="0n7mj1y"></div>
                          <div className="absolute inset-0 animate-ping bg-yellow-200 dark:bg-yellow-300 rounded-full opacity-75" data-oid="_2ntxso"></div>
                        </div>
                    }
                      
                      {/* Soil */}
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-amber-800 dark:bg-amber-900 rounded-b-lg" data-oid="0_wp9dh"></div>
                      
                      {/* Plant */}
                      <div className="relative h-40 w-full flex justify-center" data-oid="ehanq1.">
                        {getPlantSvg(set)}
                      </div>
                    </div>
                    
                    {/* Set info */}
                    <div className="p-3 pt-2 bg-gray-50 dark:bg-gray-700 rounded-b-lg" data-oid="j_9754a">
                      <div className="flex justify-between items-center mb-1" data-oid="s.ral0z">
                      <div className="font-medium text-gray-900 dark:text-white truncate" data-oid="xv1s8zo">
                        {set.type}
                      </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300" data-oid="btmxhd2">
                          {completedQuestions}/{totalQuestions}
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-1" data-oid="lxac7tp">
                        <div
                        className={`${getSubjectColor(set.subject)} h-2 rounded-full`}
                        style={{ width: `${completionPercentage}%` }} data-oid="o..aznz">
                      </div>
                      </div>
                      
                      {/* Growth stage */}
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between" data-oid="g2.w-p6">
                        <span data-oid="63-2ng:">{getPlantType(set)}</span>
                        <span data-oid=":h5b0m8">{stageLabels[growthStage]}</span>
                      </div>
                    </div>
                  </div>);

            })}
            </div>
          </div>
        )}
      </div>
      
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-green-200 dark:border-green-900" data-oid="ct__oh1">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300" data-oid="s9-gjh6">
          <div className="flex items-center" data-oid="2389b0d">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1" data-oid="nrnx5wc"></div>
            <span data-oid="uvwwblm">Math</span>
          </div>
          <div className="flex items-center" data-oid="t29ifkt">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1" data-oid="s-dr6th"></div>
            <span data-oid=".yfk9t-">Reading</span>
          </div>
          <div className="flex items-center" data-oid="j.6z.06">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-1" data-oid="jo9_vy1"></div>
            <span data-oid="u-0_rq5">Writing</span>
          </div>
          <div className="flex items-center ml-4" data-oid="3cmm-on">
            <span data-oid="s:o_l8s">🌱</span>
            <span className="ml-1" data-oid="iwnkb2d">Growth = Completion</span>
          </div>
          <div className="flex items-center ml-4" data-oid="3aoxqs4">
            <span data-oid="ie_utcf">%</span>
            <span className="ml-1" data-oid="49jqy7q">Numbers = Accuracy</span>
          </div>
        </div>
      </div>
    </div>);

}