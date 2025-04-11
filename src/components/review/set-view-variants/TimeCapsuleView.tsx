'use client';

import React, { useState, useEffect } from 'react';
import { SetViewProps } from './types';

export const TimeCapsuleView: React.FC<SetViewProps> = ({
  sets,
  selectedSetId,
  onSelectSet,
  isLoading = false
}) => {
  const [mounted, setMounted] = useState(false);
  const [timelineZoom, setTimelineZoom] = useState<'year' | 'month' | 'week'>('month');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center" data-oid="kd4xuil">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin" data-oid="a4_42og"></div>
      </div>);

  }

  if (!sets || sets.length === 0) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg" data-oid="krc9lyv">
        <p className="text-slate-500 dark:text-slate-400" data-oid="nfrtcl4">No time capsules available</p>
      </div>);

  }

  // Organize sets by timeline period
  const organizeSetsByTime = () => {
    const sortedSets = [...sets].sort((a, b) => {
      const dateA = a.dateCompleted ? new Date(a.dateCompleted).getTime() : 0;
      const dateB = b.dateCompleted ? new Date(b.dateCompleted).getTime() : 0;
      return dateB - dateA; // Most recent first
    });

    // Group by time period based on current zoom level
    const timeGroups: Record<string, typeof sets> = {};

    sortedSets.forEach((set) => {
      if (!set.dateCompleted) {
        const key = 'Undated';
        if (!timeGroups[key]) timeGroups[key] = [];
        timeGroups[key].push(set);
        return;
      }

      const date = new Date(set.dateCompleted);
      let key: string;

      // Format the date based on the timeline zoom level
      switch (timelineZoom) {
        case 'year':
          key = date.getFullYear().toString();
          break;
        case 'month':
          key = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
          break;
        case 'week':
          // Get week number (rough approximation)
          const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
          const daysSinceFirstDay = Math.floor((date.getTime() - firstDayOfYear.getTime()) / (24 * 60 * 60 * 1000));
          const weekNumber = Math.ceil((date.getDay() + 1 + daysSinceFirstDay) / 7);
          key = `Week ${weekNumber}, ${date.getFullYear()}`;
          break;
      }

      if (!timeGroups[key]) timeGroups[key] = [];
      timeGroups[key].push(set);
    });

    return timeGroups;
  };

  const timelinePeriods = organizeSetsByTime();

  // Render a time capsule for a set
  const renderTimeCapsule = (set: any, isSelected: boolean) => {
    // Determine capsule appearance based on set properties
    const getCapsuleStyle = () => {
      const baseStyle = 'border-2 rounded-lg overflow-hidden transition-all duration-300';

      // Style based on subject and accuracy
      if (set.subject === 'Math') {
        return `${baseStyle} ${
        (set.accuracy || 0) >= 70 ?
        'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-300 dark:border-indigo-700' :
        'bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800/50'}`;

      } else if (set.subject === 'Reading') {
        return `${baseStyle} ${
        (set.accuracy || 0) >= 70 ?
        'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700' :
        'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/50'}`;

      } else if (set.subject === 'Writing') {
        return `${baseStyle} ${
        (set.accuracy || 0) >= 70 ?
        'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700' :
        'bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/50'}`;

      } else {
        return `${baseStyle} ${
        (set.accuracy || 0) >= 70 ?
        'bg-slate-50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-700' :
        'bg-slate-50/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50'}`;

      }
    };

    // Get the date label with decade context
    const getTimePeriodLabel = () => {
      if (!set.dateCompleted) return 'Undated';

      const date = new Date(set.dateCompleted);
      const year = date.getFullYear();
      const decade = Math.floor(year / 10) * 10 + 's';

      return (
        <div className="text-xs text-center" data-oid="hbius:6">
          <span className="opacity-70" data-oid="c66i_lm">{decade} • </span>
          <span data-oid=".:dxuaz">{date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
        </div>);

    };

    // Determine "age" appearance - how worn/aged the capsule looks
    const getAgeEffects = () => {
      if (!set.dateCompleted) return null;

      const now = new Date();
      const creationDate = new Date(set.dateCompleted);
      const daysSinceCreation = Math.floor((now.getTime() - creationDate.getTime()) / (1000 * 60 * 60 * 24));

      // Simulated aging based on "days since creation"
      const agingLevel = Math.min(5, Math.max(1, Math.floor(daysSinceCreation / 30)));

      // Apply visual effects based on aging level
      return (
        <div
          className={`absolute inset-0 pointer-events-none mix-blend-overlay ${
          agingLevel > 3 ? 'opacity-60' : agingLevel > 1 ? 'opacity-40' : 'opacity-20'}`
          } data-oid="f2ztt8n">

          <svg width="100%" height="100%" className="text-slate-700" data-oid="s7:h:d:">
            <pattern id={`aging-${set.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" data-oid="zyf_jth">
              <path d={`M${Math.random() * 10},${Math.random() * 10} L${10 + Math.random() * 10},${10 + Math.random() * 10}`} stroke="currentColor" strokeWidth="0.5" data-oid="i36a73p" />
              <path d={`M${Math.random() * 5},${10 + Math.random() * 10} L${15 + Math.random() * 5},${Math.random() * 10}`} stroke="currentColor" strokeWidth="0.5" data-oid="nhw66gh" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill={`url(#aging-${set.id})`} data-oid="p_ukfi8" />
          </svg>
        </div>);

    };

    // Define "historical artifacts" based on set properties
    const renderArtifacts = () => {
      // Subject-specific artifacts
      if (set.subject === 'Math') {
        return (
          <div className="text-center my-2" data-oid="-fsm0hw">
            <div className="inline-block p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded" data-oid=":9mwv:v">
              <svg viewBox="0 0 24 24" width="20" height="20" className="text-indigo-700 dark:text-indigo-300" data-oid="3pp3zbp">
                <path fill="currentColor" d="M7,2H17A2,2 0 0,1 19,4V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V4A2,2 0 0,1 7,2M7,4V8H17V4H7M7,10V12H9V10H7M11,10V12H13V10H11M15,10V12H17V10H15M7,14V16H9V14H7M11,14V16H13V14H11M15,14V16H17V14H15M7,18V20H9V18H7M11,18V20H13V18H11M15,18V20H17V18H15Z" data-oid="cnb0i2s" />
              </svg>
            </div>
            <div className="text-xs mt-1 font-mono text-indigo-800 dark:text-indigo-300" data-oid=":ikpx-x">Calculation Device</div>
          </div>);

      } else if (set.subject === 'Reading') {
        return (
          <div className="text-center my-2" data-oid="wxa2oi-">
            <div className="inline-block p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded" data-oid="6iso:c2">
              <svg viewBox="0 0 24 24" width="20" height="20" className="text-emerald-700 dark:text-emerald-300" data-oid="48qsfxv">
                <path fill="currentColor" d="M19 2L14 6.5V17.5L19 13V2M6.5 5C4.55 5 2.45 5.4 1 6.5V21.16C1 21.41 1.25 21.66 1.5 21.66C1.6 21.66 1.65 21.59 1.75 21.59C3.1 20.94 5.05 20.5 6.5 20.5C8.45 20.5 10.55 20.9 12 22C13.35 21.15 15.8 20.5 17.5 20.5C19.15 20.5 20.85 20.81 22.25 21.56C22.35 21.61 22.4 21.59 22.5 21.59C22.75 21.59 23 21.34 23 21.09V6.5C22.4 6.05 21.75 5.75 21 5.5V19C19.9 18.65 18.7 18.5 17.5 18.5C15.8 18.5 13.35 19.15 12 20V6.5C10.55 5.4 8.45 5 6.5 5Z" data-oid="87.qyyj" />
              </svg>
            </div>
            <div className="text-xs mt-1 font-mono text-emerald-800 dark:text-emerald-300" data-oid="7cza0a9">Ancient Tome</div>
          </div>);

      } else if (set.subject === 'Writing') {
        return (
          <div className="text-center my-2" data-oid="jfbnsjc">
            <div className="inline-block p-2 bg-amber-100 dark:bg-amber-900/30 rounded" data-oid="8fceryt">
              <svg viewBox="0 0 24 24" width="20" height="20" className="text-amber-700 dark:text-amber-300" data-oid="08xfc.d">
                <path fill="currentColor" d="M15.54,3.5L20.5,8.47L19.07,9.88L14.12,4.93L15.54,3.5M3.5,19.78L10,13.31C9.9,13 9.97,12.61 10.23,12.35C10.62,11.96 11.26,11.96 11.65,12.35C12.04,12.75 12.04,13.38 11.65,13.77C11.39,14.03 11,14.1 10.69,14L4.22,20.5L14.83,16.95L18.36,10.59L13.42,5.64L7.05,9.17L3.5,19.78Z" data-oid="0-opvw5" />
              </svg>
            </div>
            <div className="text-xs mt-1 font-mono text-amber-800 dark:text-amber-300" data-oid="ry-cj0e">Quill & Inkwell</div>
          </div>);

      } else {
        return (
          <div className="text-center my-2" data-oid="p2njw-o">
            <div className="inline-block p-2 bg-slate-100 dark:bg-slate-700/30 rounded" data-oid="62pt63j">
              <svg viewBox="0 0 24 24" width="20" height="20" className="text-slate-700 dark:text-slate-300" data-oid="xxj1x.a">
                <path fill="currentColor" d="M12,15C7.58,15 4,16.79 4,19V21H20V19C20,16.79 16.42,15 12,15M12,7A2,2 0 0,0 10,9A2,2 0 0,0 12,11A2,2 0 0,0 14,9A2,2 0 0,0 12,7M7,2H17A2,2 0 0,1 19,4V6H17V4H7V6H5V4A2,2 0 0,1 7,2Z" data-oid="y2prmr3" />
              </svg>
            </div>
            <div className="text-xs mt-1 font-mono text-slate-800 dark:text-slate-300" data-oid="kid8p8g">Identification Badge</div>
          </div>);

      }
    };

    // Historical document style content
    const renderHistoricalContent = () => {
      return (
        <div className="px-4 pb-3" data-oid="1-6.14r">
          <h3 className={`text-center font-serif text-base ${
          isSelected ? 'text-primary font-medium' : 'font-medium'}`
          } data-oid="nkov34k">
            {set.title}
          </h3>
          
          <div className="mt-1 space-y-2" data-oid="x:8dsel">
            {/* Difficulty seal */}
            <div className="flex justify-between items-center text-xs" data-oid="kz2c17m">
              <span className="opacity-70" data-oid="6go_rme">Difficulty:</span>
              <span className="font-medium" data-oid="7v4vy6x">{set.difficulty || 'Unknown'}</span>
            </div>
            
            {/* Accuracy measurement */}
            <div className="flex justify-between items-center text-xs" data-oid="axgfkmh">
              <span className="opacity-70" data-oid="o-_p3si">Accuracy:</span>
              <div className="flex items-center" data-oid="i:xx2i4">
                <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mr-1" data-oid="5fxx2rv">
                  <div
                    className={`h-full rounded-full ${
                    (set.accuracy || 0) >= 80 ? 'bg-emerald-500 dark:bg-emerald-400' :
                    (set.accuracy || 0) >= 60 ? 'bg-blue-500 dark:bg-blue-400' :
                    'bg-amber-500 dark:bg-amber-400'}`
                    }
                    style={{ width: `${set.accuracy || 0}%` }} data-oid="ln3fsyl">
                  </div>
                </div>
                <span className="font-mono" data-oid="80b.z.j">{set.accuracy || 0}%</span>
              </div>
            </div>
            
            {/* Question stats */}
            <div className="flex justify-between items-center text-xs" data-oid="uertdky">
              <span className="opacity-70" data-oid="5wltprm">Questions:</span>
              <span className="font-mono" data-oid="o.6sua3">{set.completedCount || 0}/{set.questions?.length || 0}</span>
            </div>
          </div>
          
          {renderArtifacts()}
        </div>);

    };

    return (
      <div
        className={`${getCapsuleStyle()} ${
        isSelected ? 'transform scale-105 shadow-lg' : 'hover:shadow-md hover:scale-[1.02]'} transition-all duration-300 cursor-pointer relative`
        } data-oid="2te:he.">

        {/* Time period header */}
        <div className={`py-1 px-3 text-white ${
        set.subject === 'Math' ? 'bg-indigo-600 dark:bg-indigo-700' :
        set.subject === 'Reading' ? 'bg-emerald-600 dark:bg-emerald-700' :
        set.subject === 'Writing' ? 'bg-amber-600 dark:bg-amber-700' :
        'bg-slate-600 dark:bg-slate-700'}`
        } data-oid="2zbrbos">
          {getTimePeriodLabel()}
        </div>
        
        {/* Historical content */}
        {renderHistoricalContent()}
        
        {/* Age effects overlay */}
        {getAgeEffects()}
      </div>);

  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid=".cj8x2s">
      <div className="flex items-center justify-between mb-6" data-oid="k:a9f-9">
        <h3 className="text-xl font-bold" data-oid="lqebmx8">Time Capsule Archive</h3>
        
        {/* Timeline zoom control */}
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg" data-oid="b:47816">
          <button
            onClick={() => setTimelineZoom('year')}
            className={`px-3 py-1 rounded text-sm ${
            timelineZoom === 'year' ?
            'bg-white dark:bg-slate-700 shadow text-primary' :
            'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            } data-oid="onjir1b">

            Year
          </button>
          <button
            onClick={() => setTimelineZoom('month')}
            className={`px-3 py-1 rounded text-sm ${
            timelineZoom === 'month' ?
            'bg-white dark:bg-slate-700 shadow text-primary' :
            'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            } data-oid="_fnhz3y">

            Month
          </button>
          <button
            onClick={() => setTimelineZoom('week')}
            className={`px-3 py-1 rounded text-sm ${
            timelineZoom === 'week' ?
            'bg-white dark:bg-slate-700 shadow text-primary' :
            'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            } data-oid="jvxnl2f">

            Week
          </button>
        </div>
      </div>
      
      {/* Time capsule visualization as a timeline */}
      <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-6 overflow-hidden" data-oid="ithgr7n">
        {/* Timeline decoration */}
        <div className="relative mb-8" data-oid="-22kk4v">
          <div className="absolute left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700" data-oid="7u:p7u3"></div>
          
          {/* Time markers */}
          <div className="flex justify-between relative" data-oid="4:e_48a">
            {Object.keys(timelinePeriods).slice(0, 5).map((period, i) =>
            <div key={period} className="flex flex-col items-center" style={{ left: `${i * 25}%` }} data-oid="1xm.g0g">
                <div className="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-500 mb-2 relative z-10" data-oid="91cvghl"></div>
                <div className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap" data-oid="szu9_o-">
                  {period.split(',')[0]}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Timeline periods */}
        <div className="space-y-8" data-oid="n0oy-r.">
          {Object.entries(timelinePeriods).map(([period, periodSets]) =>
          <div key={period} data-oid="pl.o5bd">
              <h4 className="text-lg font-medium mb-4 border-b pb-2 border-slate-200 dark:border-slate-700 flex items-center" data-oid="9c63294">
                <span className="mr-2" data-oid="0fhx0k9">{period}</span>
                <span className="text-xs bg-slate-200 dark:bg-slate-700 rounded-full px-2 py-0.5 text-slate-600 dark:text-slate-400" data-oid="vj9r7a6">
                  {periodSets.length} {periodSets.length === 1 ? 'capsule' : 'capsules'}
                </span>
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-oid="_ds.te6">
                {periodSets.map((set) =>
              <div
                key={set.id}
                onClick={() => onSelectSet(set.id)} data-oid="o9.v13_">

                    {renderTimeCapsule(set, set.id === selectedSetId)}
                  </div>
              )}
              </div>
            </div>
          )}
        </div>
        
        {/* Historical legend */}
        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700" data-oid="662eor6">
          <h4 className="text-sm font-medium mb-3 text-center" data-oid="hx_-jxu">Subject Areas</h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center" data-oid="6fs73ku">
            <div className="text-xs" data-oid="mnyw_ua">
              <div className="w-full h-2 bg-indigo-600 dark:bg-indigo-700 rounded mb-1" data-oid="guck46q"></div>
              Mathematics
            </div>
            
            <div className="text-xs" data-oid="-5e06l1">
              <div className="w-full h-2 bg-emerald-600 dark:bg-emerald-700 rounded mb-1" data-oid="_md-lkv"></div>
              Reading
            </div>
            
            <div className="text-xs" data-oid="urbimib">
              <div className="w-full h-2 bg-amber-600 dark:bg-amber-700 rounded mb-1" data-oid="6r42fm8"></div>
              Writing
            </div>
            
            <div className="text-xs" data-oid="3u-.-d:">
              <div className="w-full h-2 bg-slate-600 dark:bg-slate-700 rounded mb-1" data-oid=".jmuni8"></div>
              Other Subjects
            </div>
          </div>
        </div>
      </div>
    </div>);

};