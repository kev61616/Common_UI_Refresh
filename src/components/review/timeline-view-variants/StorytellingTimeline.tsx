'use client';

import { useState } from 'react';
import { TimelineViewProps } from './types';

/**
 * Storytelling Timeline (Timeline View Variant 8)
 * Displays practice sets as a narrative journey with chapters and milestones
 */
export function StorytellingTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  // Sort sets by date for chronological order
  const sortedSets = [...practiceSets].sort(
    (a, b) => new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
  );

  // Active chapter state
  const [activeChapter, setActiveChapter] = useState<number | null>(null);

  // Group sets into "chapters" (e.g., by month)
  const chapters = sortedSets.reduce<{
    title: string;
    date: Date;
    sets: typeof practiceSets;
    summary: string;
  }[]>((acc, set) => {
    const date = new Date(set.dateCompleted);
    const monthYear = `${date.toLocaleDateString('en-US', { month: 'long' })} ${date.getFullYear()}`;

    // Find existing chapter or create new one
    let chapter = acc.find((c) => c.title === monthYear);
    if (!chapter) {
      // Create summaries based on performance
      const averagePerformance = set.accuracy;
      let summary = "";

      if (averagePerformance >= 85) {
        summary = "An impressive period of mastery and achievement.";
      } else if (averagePerformance >= 70) {
        summary = "Solid progress and consistent effort.";
      } else {
        summary = "A challenging period with valuable learning opportunities.";
      }

      chapter = {
        title: monthYear,
        date,
        sets: [],
        summary
      };
      acc.push(chapter);
    }

    chapter.sets.push(set);
    return acc;
  }, []);

  // Sort chapters chronologically
  chapters.sort((a, b) => a.date.getTime() - b.date.getTime());

  // Calculate chapter achievements
  const getChapterAchievements = (sets: typeof practiceSets) => {
    const totalSets = sets.length;
    const avgAccuracy = Math.round(sets.reduce((sum, set) => sum + set.accuracy, 0) / totalSets);
    const fastestSet = sets.reduce((fastest, set) =>
    set.timeUsed < fastest.timeUsed ? set : fastest, sets[0]);
    const highestAccuracy = sets.reduce((highest, set) =>
    set.accuracy > highest.accuracy ? set : highest, sets[0]);

    return { totalSets, avgAccuracy, fastestSet, highestAccuracy };
  };

  // Get emoji milestone for achievements
  const getMilestoneEmoji = (achievement: number) => {
    if (achievement >= 90) return '🏆';
    if (achievement >= 80) return '🌟';
    if (achievement >= 70) return '🎯';
    if (achievement >= 60) return '📈';
    return '🔍';
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="ot0q-xy">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="bwor_47">8. Storytelling Timeline</h3>
      
      <div className="max-w-4xl mx-auto" data-oid="bwzeovv">
        {/* Journey title */}
        <div className="text-center mb-8" data-oid="zrre1o1">
          <h4 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400" data-oid="ozl9tnf">Your Learning Journey</h4>
          <p className="text-slate-500 dark:text-slate-400 mt-2" data-oid="dsa1t9f">
            The story of your progress through {chapters.length} chapters and {practiceSets.length} practice sets
          </p>
        </div>
        
        {/* Chapter navigation */}
        <div className="flex justify-center mb-8 overflow-x-auto py-2 hide-scrollbar" data-oid="s_bgg:9">
          <div className="flex space-x-1" data-oid="a2yq:t0">
            {chapters.map((chapter, index) => {
              const { avgAccuracy } = getChapterAchievements(chapter.sets);

              return (
                <button
                  key={chapter.title}
                  onClick={() => setActiveChapter(activeChapter === index ? null : index)}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors flex items-center whitespace-nowrap
                             ${activeChapter === index ?
                  'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100' :
                  'bg-white hover:bg-slate-50 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`} data-oid="744oplb">

                  <span className="mr-2" data-oid="s0v17jd">{getMilestoneEmoji(avgAccuracy)}</span>
                  <span data-oid="e8djtco">{chapter.title}</span>
                </button>);

            })}
          </div>
        </div>
        
        {/* Timeline path with alternating cards */}
        <div className="relative pb-10 pt-4 border-l-2 border-indigo-200 dark:border-indigo-900 ml-4 md:ml-8" data-oid="g67k6s3">
          {chapters.map((chapter, chapterIndex) => {
            const { totalSets, avgAccuracy, fastestSet, highestAccuracy } = getChapterAchievements(chapter.sets);
            const isActive = activeChapter === null || activeChapter === chapterIndex;

            return (
              <div key={chapter.title} className={`mb-12 ${isActive ? 'block' : 'hidden'}`} data-oid="zkfbt-6">
                {/* Chapter marker */}
                <div className="absolute -left-3 md:-left-4 w-6 h-6 md:w-8 md:h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full border-2 border-indigo-500 flex items-center justify-center" data-oid="thoi6r9">
                  <span className="text-xs md:text-sm font-bold text-indigo-600 dark:text-indigo-300" data-oid="kpassab">{chapterIndex + 1}</span>
                </div>
                
                {/* Chapter header */}
                <div className="ml-6 md:ml-10 mb-6" data-oid="z59noo5">
                  <h5 className="text-xl font-bold flex items-center text-indigo-600 dark:text-indigo-400" data-oid="nelqplf">
                    {chapter.title} {getMilestoneEmoji(avgAccuracy)}
                  </h5>
                  <p className="text-slate-600 dark:text-slate-400 italic" data-oid="v90cs1h">{chapter.summary}</p>
                </div>
                
                {/* Practice sets within chapter */}
                <div className="space-y-6 ml-6 md:ml-10" data-oid="le5lovt">
                  {chapter.sets.map((set, setIndex) =>
                  <div
                    key={set.id}
                    onClick={() => onSelectSet(set.id)}
                    className={`p-4 rounded-lg cursor-pointer border transition
                               ${selectedSetId === set.id ?
                    'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-700 shadow-md' :
                    'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 hover:shadow hover:bg-slate-50 dark:hover:bg-slate-700/50'}`} data-oid="80scdl8">

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3" data-oid="aoc3c9q">
                        {/* Set details */}
                        <div data-oid="0oh9r7l">
                          <div className="flex items-center gap-2 mb-1" data-oid="23lckzh">
                            <div className={`px-2 py-1 text-xs rounded-full ${
                          set.subject === 'Reading' ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300' :
                          set.subject === 'Math' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' :
                          'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'}`
                          } data-oid="_48epah">
                              {set.subject}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="72bu6r_">
                              {new Date(set.dateCompleted).toLocaleDateString()}
                            </div>
                          </div>
                          
                          <h6 className="font-bold text-lg" data-oid="fsg6nzh">{set.type}</h6>
                          
                          {/* Narrative description */}
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1" data-oid="8.r63b.">
                            {set.accuracy >= 90 ?
                          `An exceptional performance that showcases your mastery of ${set.subject.toLowerCase()} concepts.` :
                          set.accuracy >= 75 ?
                          `A strong result demonstrating solid understanding of ${set.subject.toLowerCase()} principles.` :
                          set.accuracy >= 60 ?
                          `A good effort with room for improvement in some ${set.subject.toLowerCase()} areas.` :
                          `A challenging session that identified key areas to focus on in ${set.subject.toLowerCase()}.`
                          }
                          </p>
                        </div>
                        
                        {/* Stats and badges */}
                        <div className="flex flex-row md:flex-col items-center gap-3 md:min-w-[100px]" data-oid="xmygk7-">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        set.accuracy >= 80 ?
                        'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                        set.accuracy >= 60 ?
                        'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                        'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300'}`
                        } data-oid="zj6cgpr">
                            <span className="text-2xl font-bold" data-oid="fy5k9td">{set.accuracy}%</span>
                          </div>
                          
                          {/* Special achievement badges */}
                          {set.id === highestAccuracy.id &&
                        <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs px-2 py-1 rounded-full" data-oid="yzxkull">
                              Highest Score
                            </span>
                        }
                          {set.id === fastestSet.id &&
                        <span className="bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-xs px-2 py-1 rounded-full" data-oid="no3ebif">
                              Fastest Time
                            </span>
                        }
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Chapter conclusion */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 mt-4" data-oid="t0spfaf">
                    <div className="font-medium" data-oid="iu9fu3n">Chapter Summary</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-1" data-oid="joczblj">
                      Completed {totalSets} practice sets with an average accuracy of {avgAccuracy}%.
                      {avgAccuracy >= 85 ?
                      " This was an exceptional period in your learning journey." :
                      avgAccuracy >= 70 ?
                      " You showed consistent progress during this chapter." :
                      " This chapter provided valuable learning opportunities."
                      }
                    </div>
                  </div>
                </div>
              </div>);

          })}
          
          {/* Journey end */}
          <div className="absolute -left-3 md:-left-4 bottom-0 w-6 h-6 md:w-8 md:h-8 bg-indigo-500 rounded-full border-2 border-indigo-600 flex items-center justify-center" data-oid="j40ct3s">
            <span className="text-white" data-oid="p03ns.s">🏁</span>
          </div>
          <div className="ml-6 md:ml-10 pb-6" data-oid="zpk92v3">
            <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400" data-oid="oprotpk">
              Current Progress
            </div>
            <p className="text-slate-600 dark:text-slate-400" data-oid="ex.a68t">
              Your learning journey continues! Overall accuracy: {
              Math.round(practiceSets.reduce((sum, set) => sum + set.accuracy, 0) / practiceSets.length)
              }%
            </p>
          </div>
        </div>
      </div>
    </div>);

}