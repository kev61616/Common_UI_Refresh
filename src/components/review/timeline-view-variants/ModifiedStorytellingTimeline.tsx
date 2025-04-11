'use client';

import { useState } from 'react';
import { TimelineViewProps } from './types';
import { getDataWithFallback } from '@/lib/dataUtils';

/**
 * Narrative timeline that displays practice sets as a learning journey with chapters
 */
export function ModifiedStorytellingTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  // Debug data loading
  console.log('ModifiedStorytellingTimeline received practiceSets:', practiceSets?.length);

  // Use the utility function to get data with fallback
  const displaySets = getDataWithFallback(practiceSets);

  // Sort sets by date for chronological order
  const sortedSets = [...displaySets].sort(
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

  // Get emoji milestone for achievements - using a deterministic approach to avoid hydration errors
  const getMilestoneEmoji = (achievement: number) => {
    // Use static string references rather than dynamic calculations to ensure
    // consistent results between server and client rendering
    const achievementValue = Math.floor(achievement);

    if (achievementValue >= 90) return '🏆';
    if (achievementValue >= 80) return '🌟';
    if (achievementValue >= 70) return '🎯';
    if (achievementValue >= 60) return '📈';
    return '🔍';
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm max-w-4xl mx-auto" data-oid="as1wu:j">
        
      {/* Chapter navigation */}
      <div className="flex justify-center mb-8 overflow-x-auto py-2 hide-scrollbar" data-oid="cj-r-f_">
        <div className="flex space-x-1" data-oid="ha251px">
          {chapters.map((chapter, index) => {
            const { avgAccuracy } = getChapterAchievements(chapter.sets);

            return (
              <button
                key={chapter.title}
                onClick={() => setActiveChapter(activeChapter === index ? null : index)}
                className={`px-3 py-2 text-sm rounded-lg transition-colors flex items-center whitespace-nowrap
                           ${activeChapter === index ?
                'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100' :
                'bg-white hover:bg-slate-50 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`} data-oid="bicd.0s">

                <span className="mr-2" data-oid="9vaa.05">{getMilestoneEmoji(avgAccuracy)}</span>
                <span data-oid="1aa_jwc">{chapter.title}</span>
              </button>);

          })}
        </div>
      </div>
      
      {/* Timeline path with alternating cards */}
      <div className="relative pb-10 pt-4 border-l-2 border-indigo-200 dark:border-indigo-900 ml-4 md:ml-8" data-oid="5bq:zwf">
        {chapters.map((chapter, chapterIndex) => {
          const { totalSets, avgAccuracy, fastestSet, highestAccuracy } = getChapterAchievements(chapter.sets);
          const isActive = activeChapter === null || activeChapter === chapterIndex;

          return (
            <div key={chapter.title} className={`mb-12 ${isActive ? 'block' : 'hidden'}`} data-oid="s5k:8zz">
              {/* Chapter marker */}
              <div className="absolute -left-3 md:-left-4 w-6 h-6 md:w-8 md:h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full border-2 border-indigo-500 flex items-center justify-center" data-oid=".lkip.p">
                <span className="text-xs md:text-sm font-bold text-indigo-600 dark:text-indigo-300" data-oid="_g9--45">{chapterIndex + 1}</span>
              </div>
              
              {/* Chapter header */}
              <div className="ml-6 md:ml-10 mb-6" data-oid="ed5m2cv">
                <h5 className="text-xl font-bold flex items-center text-indigo-600 dark:text-indigo-400" data-oid="jk:0d3c">
                  {chapter.title} {getMilestoneEmoji(avgAccuracy)}
                </h5>
                <p className="text-slate-600 dark:text-slate-400 italic" data-oid="rtv87bh">{chapter.summary}</p>
              </div>
              
              {/* Practice sets within chapter */}
              <div className="space-y-6 ml-6 md:ml-10" data-oid="w0tbfs.">
                {chapter.sets.map((set, setIndex) =>
                <div
                  key={set.id}
                  onClick={() => onSelectSet(set.id)}
                  className={`p-4 rounded-lg cursor-pointer border transition
                             ${selectedSetId === set.id ?
                  'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-700 shadow-md' :
                  'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 hover:shadow hover:bg-slate-50 dark:hover:bg-slate-700/50'}`} data-oid="fuq4mus">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3" data-oid="57q-wp0">
                      {/* Set details */}
                      <div data-oid="fr4m3cr">
                        <div className="flex items-center gap-2 mb-1" data-oid="s0i:-by">
                          <div className={`px-2 py-1 text-xs rounded-full ${
                        set.subject === 'Reading' ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300' :
                        set.subject === 'Math' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' :
                        'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'}`
                        } data-oid="nrh1mmx">
                            {set.subject}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="bc8ntul">
                            {new Date(set.dateCompleted).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <h6 className="font-bold text-lg" data-oid="xnksxt8">{set.type}</h6>
                        
                        {/* Narrative description */}
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1" data-oid="gkl9qkc">
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
                      <div className="flex flex-row md:flex-col items-center gap-3 md:min-w-[100px]" data-oid="871ug_n">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      set.accuracy >= 80 ?
                      'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                      set.accuracy >= 60 ?
                      'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                      'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300'}`
                      } data-oid="mrk53ub">
                          <span className="text-2xl font-bold" data-oid="frbz_2l">{set.accuracy}%</span>
                        </div>
                        
                        {/* Special achievement badges */}
                        {set.id === highestAccuracy.id &&
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs px-2 py-1 rounded-full" data-oid="-.fh2ef">
                            Highest Score
                          </span>
                      }
                        {set.id === fastestSet.id &&
                      <span className="bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-xs px-2 py-1 rounded-full" data-oid="2r5ce1j">
                            Fastest Time
                          </span>
                      }
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Chapter conclusion */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 mt-4" data-oid="eiheger">
                  <div className="font-medium" data-oid="6dnmd_9">Chapter Summary</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mt-1" data-oid="u4m-box">
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
        <div className="absolute -left-3 md:-left-4 bottom-0 w-6 h-6 md:w-8 md:h-8 bg-indigo-500 rounded-full border-2 border-indigo-600 flex items-center justify-center" data-oid="gv9ii.e">
          <span className="text-white" data-oid=".h6sftu">🏁</span>
        </div>
        <div className="ml-6 md:ml-10 pb-6" data-oid="jomowcv">
          <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400" data-oid="5mvz7qz">
            Current Progress
          </div>
          <p className="text-slate-600 dark:text-slate-400" data-oid="pv.6y_l">
            Your learning journey continues! Overall accuracy: {
            displaySets.length > 0 ?
            Math.round(displaySets.reduce((sum, set) => sum + set.accuracy, 0) / displaySets.length) :
            0
            }%
          </p>
        </div>
      </div>
    </div>);

}