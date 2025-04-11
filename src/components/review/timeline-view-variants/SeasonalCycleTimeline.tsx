'use client';

import React, { useState, useEffect } from 'react';
import { PracticeSet } from '@/lib/mockData';
import { TimelineViewProps } from './types';
import { format, parseISO, getMonth } from 'date-fns';

export const SeasonalCycleTimeline: React.FC<TimelineViewProps> = ({
  practiceSets,
  onSelectSet,
  selectedSetId
}) => {
  const [yearlyGroups, setYearlyGroups] = useState<Record<string, Record<string, PracticeSet[]>>>({});
  const [expandedYear, setExpandedYear] = useState<string | null>(null);
  const [hoverSetId, setHoverSetId] = useState<string | null>(null);

  // Group practice sets by year and season
  useEffect(() => {
    const grouped: Record<string, Record<string, PracticeSet[]>> = {};

    practiceSets.forEach((set) => {
      const date = parseISO(set.dateCompleted);
      const year = format(date, 'yyyy');
      const monthNum = getMonth(date);

      // Determine season (Northern Hemisphere)
      let season: string;
      if (monthNum >= 2 && monthNum <= 4) season = 'Spring';else
      if (monthNum >= 5 && monthNum <= 7) season = 'Summer';else
      if (monthNum >= 8 && monthNum <= 10) season = 'Fall';else
      season = 'Winter';

      // Create year group if it doesn't exist
      if (!grouped[year]) {
        grouped[year] = {
          'Winter': [],
          'Spring': [],
          'Summer': [],
          'Fall': []
        };
      }

      // Add set to appropriate season
      grouped[year][season].push(set);
    });

    setYearlyGroups(grouped);

    // Expand the most recent year by default
    const years = Object.keys(grouped).sort();
    if (years.length > 0) {
      setExpandedYear(years[years.length - 1]);
    }
  }, [practiceSets]);

  // Get subject-specific styles
  const getSubjectStyles = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          bg: 'bg-blue-500',
          text: 'text-blue-500 dark:text-blue-400',
          border: 'border-blue-500 dark:border-blue-600',
          light: 'bg-blue-100 dark:bg-blue-900/20',
          ring: 'ring-blue-500 dark:ring-blue-400'
        };
      case 'Reading':
        return {
          bg: 'bg-emerald-500',
          text: 'text-emerald-500 dark:text-emerald-400',
          border: 'border-emerald-500 dark:border-emerald-600',
          light: 'bg-emerald-100 dark:bg-emerald-900/20',
          ring: 'ring-emerald-500 dark:ring-emerald-400'
        };
      case 'Writing':
        return {
          bg: 'bg-amber-500',
          text: 'text-amber-500 dark:text-amber-400',
          border: 'border-amber-500 dark:border-amber-600',
          light: 'bg-amber-100 dark:bg-amber-900/20',
          ring: 'ring-amber-500 dark:ring-amber-400'
        };
      default:
        return {
          bg: 'bg-slate-500',
          text: 'text-slate-500 dark:text-slate-400',
          border: 'border-slate-500 dark:border-slate-600',
          light: 'bg-slate-100 dark:bg-slate-800',
          ring: 'ring-slate-500 dark:ring-slate-400'
        };
    }
  };

  // Get season-specific styles
  const getSeasonStyles = (season: string) => {
    switch (season) {
      case 'Spring':
        return {
          bg: 'bg-green-100 dark:bg-green-900/20',
          border: 'border-green-300 dark:border-green-700',
          text: 'text-green-800 dark:text-green-200',
          accent: 'from-green-400 to-green-500',
          icon:
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-500" data-oid="f97bxaj">
              <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" data-oid="wwv3.4o" />
            </svg>,

          motif: 'spring-buds'
        };
      case 'Summer':
        return {
          bg: 'bg-amber-100 dark:bg-amber-900/20',
          border: 'border-amber-300 dark:border-amber-700',
          text: 'text-amber-800 dark:text-amber-200',
          accent: 'from-amber-400 to-amber-500',
          icon:
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-500" data-oid="5zjr0-8">
              <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" data-oid="1wbj45." />
            </svg>,

          motif: 'summer-sun'
        };
      case 'Fall':
        return {
          bg: 'bg-orange-100 dark:bg-orange-900/20',
          border: 'border-orange-300 dark:border-orange-700',
          text: 'text-orange-800 dark:text-orange-200',
          accent: 'from-orange-400 to-orange-500',
          icon:
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-500" data-oid="aa8_pw7">
              <path fillRule="evenodd" d="M20.137 9.806c.183.641.78.599 1.349.1.381-.334.239-.906-.285-1.355a.75.75 0 0 1 .462-1.308c.73.018 1.347-.299 1.575-.908.192-.51-.341-1.016-.958-1.239a.75.75 0 0 1-.492-1.014c.303-.806-.4-1.375-1.148-1.471a.75.75 0 0 1-.572-.96c.151-.576-.004-1.049-.45-1.318-.417-.25-.93-.154-1.297.136a.75.75 0 0 1-1.293-.271c-.052-.462-.33-.818-.788-.92-.52-.116-1.152.039-1.306.595a.75.75 0 0 1-1.292.272c-.368-.29-.88-.387-1.297-.136-.446.269-.602.742-.451 1.318a.75.75 0 0 1-.572.96c-.747.096-1.45.665-1.148 1.47a.75.75 0 0 1-.492 1.015c-.617.223-1.15.729-.958 1.239.228.609.845.926 1.576.908a.75.75 0 0 1 .462 1.307c-.524.45-.666 1.021-.285 1.356.467.4 1.068.441 1.348-.1a.75.75 0 0 1 1.232.502c.046.482.356.85.84.894.602.055 1.137-.279 1.282-.774a.75.75 0 0 1 1.231-.502c.281.54.882.5 1.349.1.38-.334.237-.906-.285-1.356a.75.75 0 0 1 .462-1.307c.73-.018 1.347-.299 1.575-.908.192-.51-.341-1.016-.958-1.239a.75.75 0 0 1-.492-1.015c.302-.805-.401-1.374-1.148-1.47a.75.75 0 0 1-.572-.96c.151-.576-.004-1.049-.45-1.318-.417-.25-.93-.154-1.297.136a.75.75 0 0 1-1.293-.271c-.053-.463-.331-.818-.788-.92-.52-.116-1.152.039-1.306.595a.75.75 0 0 1-1.292.272c-.368-.29-.88-.387-1.297-.136-.446.269-.602.742-.451 1.318a.75.75 0 0 1-.572.96c-.747.096-1.45.665-1.148 1.47a.75.75 0 0 1-.492 1.015c-.617.223-1.15.729-.958 1.239.228.609.845.926 1.576.908a.75.75 0 0 1 .462 1.307c-.524.45-.666 1.021-.285 1.356.467.4 1.068.441 1.348-.1a.75.75 0 0 1 1.232.502c.046.482.356.85.84.894.602.055 1.137-.279 1.282-.774a.75.75 0 0 1 1.231-.502ZM4.72 12.43a.75.75 0 0 0-1.092-.115 5.25 5.25 0 0 0 7.539 7.254.75.75 0 0 0-.114-1.092.75.75 0 0 1-.092-1.149 5.25 5.25 0 0 0-5.092-5.99.75.75 0 0 1-1.15-.092Zm15.037 1.892a.75.75 0 0 0-1.149-.092 5.25 5.25 0 0 0-5.99-5.092.75.75 0 0 1-1.092-.114.75.75 0 0 0-1.092.114 5.25 5.25 0 0 0 7.254 7.539.75.75 0 0 0-.115-1.092.75.75 0 0 1-.092-1.149 5.25 5.25 0 0 0 2.276-2.276.75.75 0 0 1 0 1.162Z" clipRule="evenodd" data-oid="r1840j3" />
            </svg>,

          motif: 'fall-leaves'
        };
      case 'Winter':
        return {
          bg: 'bg-blue-100 dark:bg-blue-900/20',
          border: 'border-blue-300 dark:border-blue-700',
          text: 'text-blue-800 dark:text-blue-200',
          accent: 'from-blue-400 to-blue-500',
          icon:
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-500" data-oid="elme0l2">
              <path fillRule="evenodd" d="m6.56 1.14 3.24 3.235a1.902 1.902 0 0 0-1.046 1.282 1.95 1.95 0 0 0 .29 1.499l-1.01 1.01a3.85 3.85 0 0 0-2.296-.874 3.85 3.85 0 0 0-2.735 1.133L4.236 7.09a1.902 1.902 0 0 0 1.046-1.282 1.95 1.95 0 0 0-.29-1.499l1.01-1.01a3.85 3.85 0 0 0 2.296.874 3.85 3.85 0 0 0 2.735-1.133L7.8 2.807l1.01-1.01a.75.75 0 0 0-1.06-1.06l-1.19 1.19ZM12.32 7.904l3.23-3.235a3.845 3.845 0 0 0 2.735 1.133 3.845 3.845 0 0 0 2.296-.874l1.01 1.01a1.95 1.95 0 0 0-.29 1.499 1.902 1.902 0 0 0 1.046 1.282l-1.233 1.233a3.845 3.845 0 0 0-2.735-1.133 3.845 3.845 0 0 0-2.296.874l-1.01-1.01a1.95 1.95 0 0 0 .29-1.499 1.902 1.902 0 0 0-1.046-1.282l-1.013 1.013a.75.75 0 0 0 1.06 1.06l-1.043 1.043Zm-4.96 7.48 3.235-3.24a1.902 1.902 0 0 0 1.282 1.046 1.95 1.95 0 0 0 1.499-.29l1.01 1.01a3.845 3.845 0 0 0-.874 2.296 3.845 3.845 0 0 0 1.133 2.735l-1.233 1.233a1.902 1.902 0 0 0-1.282-1.046 1.95 1.95 0 0 0-1.499.29l-1.01-1.01a3.845 3.845 0 0 0 .874-2.296 3.845 3.845 0 0 0-1.133-2.735l-1.233 1.233a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.656 1.504a1.902 1.902 0 0 0-1.282-1.046 1.95 1.95 0 0 0-1.499.29l-1.01-1.01a3.847 3.847 0 0 0 .874-2.296 3.845 3.845 0 0 0-1.133-2.735l1.013-1.013A1.902 1.902 0 0 0 1.931 10.6a1.95 1.95 0 0 0 1.499-.29l1.01 1.01a3.845 3.845 0 0 0-.874 2.296 3.845 3.845 0 0 0 1.133 2.735l-1.233 1.233a.75.75 0 1 0 1.06 1.06L2.94 16.947Z" clipRule="evenodd" data-oid="bq-7vpj" />
            </svg>,

          motif: 'winter-snowflake'
        };
      default:
        return {
          bg: 'bg-slate-100 dark:bg-slate-800',
          border: 'border-slate-300 dark:border-slate-700',
          text: 'text-slate-800 dark:text-slate-200',
          accent: 'from-slate-400 to-slate-500',
          icon: null,
          motif: 'default'
        };
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, 'MMM d');
  };

  // Get season-specific description based on performance
  const getSeasonalDescription = (set: PracticeSet, season: string) => {
    const accuracy = set.accuracy;

    if (season === 'Spring') {
      if (accuracy >= 90) return "Blooming brilliantly with fresh insights";
      if (accuracy >= 75) return "Growing steadily with new understanding";
      if (accuracy >= 60) return "Budding knowledge requires nurturing";
      return "Early growth needs additional care";
    }

    if (season === 'Summer') {
      if (accuracy >= 90) return "Thriving impressively in full bloom";
      if (accuracy >= 75) return "Flourishing well under optimal conditions";
      if (accuracy >= 60) return "Developing steadily in the warmth";
      return "Growth challenged by unfavorable conditions";
    }

    if (season === 'Fall') {
      if (accuracy >= 90) return "Harvesting exceptional results of study";
      if (accuracy >= 75) return "Gathering solid understanding efficiently";
      if (accuracy >= 60) return "Collecting moderate results of efforts";
      return "Yield limited, review needed before winter";
    }

    if (season === 'Winter') {
      if (accuracy >= 90) return "Core knowledge solidly preserved";
      if (accuracy >= 75) return "Fundamental concepts well maintained";
      if (accuracy >= 60) return "Basic concepts surviving the challenge";
      return "Knowledge foundation needs reinforcement";
    }

    return "Results indicate ongoing progress";
  };

  return (
    <div className="seasonal-cycle-timeline space-y-6 pb-8" data-oid="gzybi23">
      {/* Header with title and legend */}
      <div className="flex items-center justify-between mb-6" data-oid="5mometg">
        <div className="flex items-center space-x-3" data-oid="wj0a_5j">
          <div className="h-8 w-8 flex items-center justify-center" data-oid="lv:2xo_">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-slate-600 dark:text-slate-400" data-oid="el9su7_">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" data-oid="qcuubfx" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200" data-oid="31d.2r2">Seasonal Cycle Timeline</h2>
        </div>
        
        <div className="flex space-x-4" data-oid="_crkjjf">
          <div className="flex items-center" data-oid="pg:yr85">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2" data-oid="8u-a1iw"></span>
            <span className="text-sm text-slate-700 dark:text-slate-300" data-oid="ajvy.1e">Math</span>
          </div>
          <div className="flex items-center" data-oid="npu:9-r">
            <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 mr-2" data-oid="iza_5i0"></span>
            <span className="text-sm text-slate-700 dark:text-slate-300" data-oid=".h.dpdh">Reading</span>
          </div>
          <div className="flex items-center" data-oid=":dcgd18">
            <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-2" data-oid="s:qqtki"></span>
            <span className="text-sm text-slate-700 dark:text-slate-300" data-oid="i_sqtqa">Writing</span>
          </div>
        </div>
      </div>
      
      {/* Season legend */}
      <div className="grid grid-cols-4 gap-4 mb-6" data-oid="0rq6.0n">
        {['Spring', 'Summer', 'Fall', 'Winter'].map((season) => {
          const styles = getSeasonStyles(season);

          return (
            <div
              key={season}
              className={`rounded-lg p-3 ${styles.bg} border ${styles.border} flex items-center`} data-oid="o-gmj-m">

              <div className="mr-2" data-oid="2n-vb8v">{styles.icon}</div>
              <div data-oid="lyowa0j">
                <div className={`font-medium ${styles.text}`} data-oid="lgk4..k">{season}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400" data-oid="sp5swyc">
                  {season === 'Spring' ? 'Growth Phase' :
                  season === 'Summer' ? 'Development Phase' :
                  season === 'Fall' ? 'Harvest Phase' :
                  'Reflection Phase'}
                </div>
              </div>
            </div>);

        })}
      </div>
      
      {/* Yearly cycles */}
      <div className="space-y-8" data-oid="5pxk.p2">
        {Object.entries(yearlyGroups).
        sort(([yearA], [yearB]) => parseInt(yearB, 10) - parseInt(yearA, 10)) // Sort years descending
        .map(([year, seasons]) =>
        <div key={year} className="year-cycle" data-oid="vaio-52">
              {/* Year header */}
              <div
            className="year-header flex items-center space-x-2 cursor-pointer mb-4"
            onClick={() => setExpandedYear(expandedYear === year ? null : year)} data-oid="uzhzvlv">

                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${expandedYear === year ? 'bg-amber-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`} data-oid="68n_pj4">
                  {expandedYear === year ?
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" data-oid="f-bclxv">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clipRule="evenodd" data-oid="hafb6zc" />
                    </svg> :

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" data-oid="4w8-hu.">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.5 10.5a.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1 0-1.5h7.5a.75.75 0 0 1 .75.75Zm-4.5 4.5a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1 0-1.5h3a.75.75 0 0 1 .75.75Zm0-9a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1 0-1.5h3a.75.75 0 0 1 .75.75Z" clipRule="evenodd" data-oid="9h7z7zv" />
                    </svg>
              }
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200" data-oid=".2h3ps4">{year} Cycle</h3>
                
                {/* Year summary badges */}
                <div className="flex ml-auto space-x-2" data-oid="b007da0">
                  {Object.entries(seasons).map(([season, sets]) => {
                if (sets.length === 0) return null;

                const styles = getSeasonStyles(season);
                return (
                  <div
                    key={season}
                    className={`px-2 py-0.5 rounded text-xs font-medium ${styles.bg} ${styles.text}`} data-oid=":3s_iso">

                        {sets.length} {season}
                      </div>);

              })}
                </div>
              </div>
              
              {/* Year content */}
              {expandedYear === year &&
          <div className="seasons-container" data-oid="9du:qc-">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4" data-oid="u2112hn">
                    {['Winter', 'Spring', 'Summer', 'Fall'].map((season) => {
                const seasonSets = seasons[season];
                const seasonStyles = getSeasonStyles(season);

                return (
                  <div
                    key={season}
                    className={`season-card relative rounded-lg border overflow-hidden ${seasonStyles.border}`} data-oid="9l90qex">

                          {/* Season header */}
                          <div className={`p-3 ${seasonStyles.bg} border-b ${seasonStyles.border} flex items-center`} data-oid="4lip7-x">
                            {seasonStyles.icon}
                            <h4 className={`font-medium ml-2 ${seasonStyles.text}`} data-oid="wlmmpj4">{season}</h4>
                            <div className="ml-auto px-2 py-0.5 rounded-full bg-white/70 dark:bg-slate-800/70 text-xs font-medium text-slate-700 dark:text-slate-300" data-oid="1gine_8">
                              {seasonSets.length} sessions
                            </div>
                          </div>
                          
                          {/* Season motif background */}
                          <div className={`absolute inset-0 opacity-5 pointer-events-none ${seasonStyles.motif}`} data-oid="vqjwmj6"></div>
                          
                          {/* Session cards */}
                          <div className={`p-3 bg-white dark:bg-slate-800 ${seasonSets.length === 0 ? 'min-h-[100px]' : ''}`} data-oid="f-m2ac8">
                            {seasonSets.length === 0 ?
                      <div className="h-full flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm italic" data-oid="bw8rwt0">
                                No sessions this season
                              </div> :

                      <div className="space-y-3" data-oid="le4vh9l">
                                {seasonSets.map((set) => {
                          const subjectStyles = getSubjectStyles(set.subject);
                          const isSelected = set.id === selectedSetId;
                          const isHovered = set.id === hoverSetId;

                          return (
                            <div
                              key={set.id}
                              className={`session-card rounded-md border transition-all duration-300
                                        ${isSelected ? `ring-2 ${subjectStyles.ring} shadow-md` : 'shadow-sm'}
                                        ${isSelected || isHovered ? subjectStyles.light : 'bg-white dark:bg-slate-800'}
                                        ${isSelected ? 'border-transparent' : 'border-slate-200 dark:border-slate-700'}
                                        cursor-pointer`}
                              onClick={() => onSelectSet?.(set.id)}
                              onMouseEnter={() => setHoverSetId(set.id)}
                              onMouseLeave={() => setHoverSetId(null)} data-oid="-xmywub">

                                      <div className="p-3" data-oid="5e-5bhr">
                                        <div className="flex items-start justify-between" data-oid="daelurg">
                                          <div data-oid="eh5293w">
                                            <h5 className={`font-medium ${subjectStyles.text}`} data-oid="anbfmo5">
                                              {set.subject}: {set.type}
                                            </h5>
                                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5" data-oid="94vt.8j">
                                              {formatDate(set.dateCompleted)}
                                            </div>
                                          </div>
                                          
                                          <div className={`${subjectStyles.bg} text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center`} data-oid="eyj.21s">
                                            {set.accuracy}
                                          </div>
                                        </div>
                                        
                                        {/* Accuracy bar */}
                                        <div className="mt-2 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden" data-oid="--rvcv4">
                                          <div
                                    className={`h-full ${subjectStyles.bg}`}
                                    style={{ width: `${set.accuracy}%` }} data-oid="7cfcqs3">
                                  </div>
                                        </div>
                                        
                                        {/* Seasonal description */}
                                        <div className={`mt-2 text-xs italic ${seasonStyles.text}`} data-oid="_nmzrf_">
                                          {getSeasonalDescription(set, season)}
                                        </div>
                                        
                                        {/* Expanded card when selected */}
                                        {isSelected &&
                                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700" data-oid="mnu_l_8">
                                            <div className="grid grid-cols-3 gap-3 text-sm" data-oid="suz6wrd">
                                              <div data-oid="l1c6sh6">
                                                <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="c8awrj4">Difficulty</div>
                                                <div className="font-medium text-slate-700 dark:text-slate-300" data-oid="y7yj2:z">{set.difficulty}</div>
                                              </div>
                                              <div data-oid="s3j8:pp">
                                                <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="pp_t_gu">Pace</div>
                                                <div className="font-medium text-slate-700 dark:text-slate-300" data-oid="ob4b3f5">{set.pace}</div>
                                              </div>
                                              <div data-oid="ofoeu0r">
                                                <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="ndak:02">Questions</div>
                                                <div className="font-medium text-slate-700 dark:text-slate-300" data-oid="juxlvl-">{set.questions.length}</div>
                                              </div>
                                            </div>
                                            
                                            {/* Mistake types */}
                                            <div className="mt-3" data-oid="w3zo9mp">
                                              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1" data-oid="_l:ek3u">Challenges</div>
                                              <div className="flex flex-wrap gap-2" data-oid="x19mncp">
                                                {set.mistakeTypes.conceptual > 0 &&
                                      <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs rounded-full" data-oid="fivinzt">
                                                    {set.mistakeTypes.conceptual} conceptual
                                                  </span>
                                      }
                                                {set.mistakeTypes.careless > 0 &&
                                      <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs rounded-full" data-oid="_8b6w7b">
                                                    {set.mistakeTypes.careless} careless
                                                  </span>
                                      }
                                                {set.mistakeTypes.timeManagement > 0 &&
                                      <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full" data-oid="f0o7_7s">
                                                    {set.mistakeTypes.timeManagement} time
                                                  </span>
                                      }
                                                {set.mistakeTypes.conceptual === 0 && set.mistakeTypes.careless === 0 && set.mistakeTypes.timeManagement === 0 &&
                                      <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full" data-oid="ef:er--">
                                                    No major challenges
                                                  </span>
                                      }
                                              </div>
                                            </div>
                                            
                                            {/* Performance trend */}
                                            <div className="mt-3" data-oid="5d3qhkk">
                                              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1" data-oid="o13:9.8">Performance Trend</div>
                                              <div className="relative h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden" data-oid="a:nqat3">
                                                <div className="absolute top-0 left-0 bottom-0 w-1/3 bg-gradient-to-r from-slate-100 dark:from-slate-700 to-transparent z-10" data-oid="740tb:r"></div>
                                                <div className="absolute top-0 bottom-0 left-1/3 w-1/3 bg-gradient-to-r from-transparent to-transparent z-10" data-oid="rxi_894"></div>
                                                <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-l from-slate-100 dark:from-slate-700 to-transparent z-10" data-oid="w1yazo5"></div>
                                                
                                                <div className="flex h-full" data-oid="1uzyhm-">
                                                  <div
                                          className={`h-full ${subjectStyles.bg}`}
                                          style={{ width: `${set.sessionFatigue.earlyAccuracy}%` }} data-oid="b_x_wb1">
                                        </div>
                                                  <div
                                          className={`h-full ${subjectStyles.bg} opacity-80`}
                                          style={{ width: `${(set.sessionFatigue.earlyAccuracy + set.sessionFatigue.lateAccuracy) / 2}%` }} data-oid="b51cqaz">
                                        </div>
                                                  <div
                                          className={`h-full ${subjectStyles.bg} opacity-60`}
                                          style={{ width: `${set.sessionFatigue.lateAccuracy}%` }} data-oid="xbf.rk6">
                                        </div>
                                                </div>
                                              </div>
                                              <div className="flex justify-between mt-1 text-[10px] text-slate-500 dark:text-slate-400" data-oid="u6smc80">
                                                <span data-oid="pv1ywhx">Early</span>
                                                <span data-oid="3rj6auf">Mid</span>
                                                <span data-oid="new9tmm">Late</span>
                                              </div>
                                            </div>
                                            
                                            {/* Time details */}
                                            <div className="mt-3" data-oid="t2fqby5">
                                              <div className="flex justify-between text-xs" data-oid="8f7-h5g">
                                                <span className="text-slate-500 dark:text-slate-400" data-oid="-xm2gwo">Time Period</span>
                                                <span className="text-slate-700 dark:text-slate-300" data-oid="8dh0jdp">{Math.floor(set.timeUsed / 60)} minutes</span>
                                              </div>
                                              <div className="flex justify-between text-xs mt-1" data-oid="qb.0_2i">
                                                <span className="text-slate-500 dark:text-slate-400" data-oid="e064od1">Time of Day</span>
                                                <span className="text-slate-700 dark:text-slate-300" data-oid="idbpor.">{set.timeOfDay}</span>
                                              </div>
                                            </div>
                                          </div>
                                }
                                      </div>
                                    </div>);

                        })}
                              </div>
                      }
                          </div>
                        </div>);

              })}
                  </div>
                </div>
          }
            </div>
        )}
      </div>
      
      {/* CSS for season motifs */}
      <style jsx data-oid=".mvz90s">{`
        .spring-buds {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2322c55e' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E");
        }
        
        .summer-sun {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' stroke='%23f59e0b' stroke-width='2' fill='none' /%3E%3C/svg%3E");
        }
        
        .fall-leaves {
          background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20 L40 40 L60 20 M20 60 L40 40 L60 60' stroke='%23ea580c' stroke-width='2' fill='none' /%3E%3C/svg%3E");
        }
        
        .winter-snowflake {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 L30 50 M10 30 L50 30 M15 15 L45 45 M15 45 L45 15' stroke='%233b82f6' stroke-width='1' fill='none' /%3E%3C/svg%3E");
        }
      `}</style>
    </div>);

};