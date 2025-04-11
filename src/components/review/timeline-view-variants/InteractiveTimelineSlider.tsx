'use client';

import { useState } from 'react';
import { TimelineViewProps } from './types';

/**
 * Interactive Timeline Slider (Timeline View Variant 9)
 * A dynamic timeline with interactive slider controls to navigate through practice history
 */
export function InteractiveTimelineSlider({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  // Sort sets by date for chronological order
  const sortedSets = [...practiceSets].sort(
    (a, b) => new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
  );

  // Active set index state
  const [activeIndex, setActiveIndex] = useState(0);

  // Calculate date range for the slider
  const startDate = sortedSets.length > 0 ? new Date(sortedSets[0].dateCompleted) : new Date();
  const endDate = sortedSets.length > 0 ? new Date(sortedSets[sortedSets.length - 1].dateCompleted) : new Date();
  const totalDays = Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));

  // Handle slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setActiveIndex(value);
  };

  // Helper to get set date as string
  const getFormattedDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Group sets by date
  const setsByDate = sortedSets.reduce<Record<string, typeof practiceSets>>((acc, set) => {
    const dateStr = new Date(set.dateCompleted).toLocaleDateString();
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(set);
    return acc;
  }, {});

  // Create date markers
  const dateMarkers = Object.keys(setsByDate).map((dateStr) => {
    return {
      date: new Date(dateStr),
      sets: setsByDate[dateStr]
    };
  });

  // Current active sets
  const activeSets = activeIndex < dateMarkers.length ? dateMarkers[activeIndex].sets : [];
  const activeDate = activeIndex < dateMarkers.length ? dateMarkers[activeIndex].date : new Date();

  // Get subject color class
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Reading':
        return 'bg-sky-500 dark:bg-sky-600';
      case 'Math':
        return 'bg-indigo-500 dark:bg-indigo-600';
      case 'Writing':
        return 'bg-violet-500 dark:bg-violet-600';
      default:
        return 'bg-slate-500 dark:bg-slate-600';
    }
  };

  // Get accuracy color class
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 85) return 'text-emerald-500 dark:text-emerald-400';
    if (accuracy >= 70) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-rose-500 dark:text-rose-400';
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid=":p_gwpf">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="6s:dzzf">9. Interactive Timeline Slider</h3>
      
      <div className="max-w-4xl mx-auto" data-oid="3rjgzub">
        {/* Timeline visualization */}
        <div className="relative h-[120px] mb-6 px-10" data-oid="d0:aexi">
          {/* Main timeline line */}
          <div className="absolute top-1/2 left-10 right-10 h-1 bg-slate-200 dark:bg-slate-700 transform -translate-y-1/2" data-oid="g8:4p26"></div>
          
          {/* Timeline points */}
          {dateMarkers.map((marker, index) => {
            // Calculate position percentage along timeline
            const position = dateMarkers.length > 1 ?
            index / (dateMarkers.length - 1) * 100 :
            50;

            // Get subject counts for this date
            const subjects = marker.sets.reduce<Record<string, number>>((acc, set) => {
              if (!acc[set.subject]) acc[set.subject] = 0;
              acc[set.subject]++;
              return acc;
            }, {});

            // Average accuracy for this date
            const avgAccuracy = Math.round(
              marker.sets.reduce((sum, set) => sum + set.accuracy, 0) / marker.sets.length
            );

            return (
              <div
                key={marker.date.toISOString()}
                className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer
                          ${activeIndex === index ? 'z-10' : 'z-0'}`}
                style={{ left: `${position}%` }}
                onClick={() => setActiveIndex(index)} data-oid="re2o27-">

                {/* Stacked circles for each subject */}
                <div className="relative flex flex-col items-center" data-oid="ys1w758">
                  {/* Highlight circle when active */}
                  {activeIndex === index &&
                  <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-full transform scale-[2] animate-pulse" data-oid=".l.q.t1"></div>
                  }
                  
                  {/* Point */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 shadow-md
                             ${activeIndex === index ?
                    'scale-125 bg-indigo-500 dark:bg-indigo-600' :
                    'bg-slate-300 dark:bg-slate-600 hover:scale-110 transition-transform'}`} data-oid="sug9jqy">

                    {Object.entries(subjects).map(([subject, count], i) =>
                    <div
                      key={subject}
                      className={`absolute top-0 left-0 right-0 bottom-0 rounded-full ${getSubjectColor(subject)}`}
                      style={{
                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(2 * Math.PI * (i + 1) / Object.keys(subjects).length)}% ${50 - 50 * Math.sin(2 * Math.PI * (i + 1) / Object.keys(subjects).length)}%, ${50 + 50 * Math.cos(2 * Math.PI * i / Object.keys(subjects).length)}% ${50 - 50 * Math.sin(2 * Math.PI * i / Object.keys(subjects).length)}%)`
                      }} data-oid="e49vywt" />

                    )}
                    <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white" data-oid="f7d63od">
                      {marker.sets.length}
                    </div>
                  </div>
                  
                  {/* Date label */}
                  <div className={`text-xs font-medium mt-2 whitespace-nowrap ${activeIndex === index ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`} data-oid="_7qsmft">
                    {marker.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                  
                  {/* Accuracy indicator above point */}
                  {activeIndex === index &&
                  <div className={`absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold ${getAccuracyColor(avgAccuracy)}`} data-oid="yq4fjjg">
                      {avgAccuracy}%
                    </div>
                  }
                </div>
              </div>);

          })}
        </div>
        
        {/* Interactive slider */}
        <div className="mb-8 px-10" data-oid="2-fhknj">
          <input
            type="range"
            min="0"
            max={dateMarkers.length - 1}
            value={activeIndex}
            onChange={handleSliderChange}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 dark:bg-slate-700 outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:dark:bg-indigo-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:dark:border-slate-800 [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125" data-oid="9ubd5nh" />

          
          {/* Selected date display */}
          <div className="flex justify-between items-center mt-3" data-oid="064378g">
            <button
              onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="text-indigo-600 dark:text-indigo-400 disabled:text-slate-400 dark:disabled:text-slate-600" data-oid="eayy-pj">

              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-oid="v.k-8.k">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" data-oid="cltv7ry" />
              </svg>
            </button>
            
            <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400" data-oid="84p6kfp">
              {getFormattedDate(activeDate)}
            </div>
            
            <button
              onClick={() => setActiveIndex(Math.min(dateMarkers.length - 1, activeIndex + 1))}
              disabled={activeIndex === dateMarkers.length - 1}
              className="text-indigo-600 dark:text-indigo-400 disabled:text-slate-400 dark:disabled:text-slate-600" data-oid="m6m7nzq">

              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-oid="sebhiz.">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" data-oid="47qmjg_" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Selected date cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" data-oid="_f:9f9q">
          {activeSets.map((set) =>
          <div
            key={set.id}
            onClick={() => onSelectSet(set.id)}
            className={`p-4 rounded-lg border transition cursor-pointer
                         ${selectedSetId === set.id ?
            'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-700/70 shadow ring-1 ring-indigo-300 dark:ring-indigo-700' :
            'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow hover:bg-slate-50 dark:hover:bg-slate-700/50'}`} data-oid="ofl78l_">

              <div className="flex justify-between items-start" data-oid="bz46m:r">
                <div data-oid="pmb.-_x">
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2 ${
                set.subject === 'Reading' ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300' :
                set.subject === 'Math' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' :
                'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'}`
                } data-oid="osvwwpb">
                    {set.subject}
                  </div>
                  <h5 className="font-bold text-lg" data-oid="_1wgu4e">{set.type}</h5>
                </div>
                
                <div className={`text-2xl font-bold ${getAccuracyColor(set.accuracy)}`} data-oid="5ni_-58">
                  {set.accuracy}%
                </div>
              </div>
              
              <div className="mt-4" data-oid="htn:lnp">
                {/* Time & pace */}
                <div className="flex justify-between text-sm" data-oid="p8_ypq3">
                  <div data-oid="woxqash">
                    <span className="text-slate-500 dark:text-slate-400" data-oid="9msphlg">Time: </span>
                    <span className="font-medium" data-oid="tvuulm9">{Math.floor(set.timeUsed / 60)}:{(set.timeUsed % 60).toString().padStart(2, '0')}</span>
                  </div>
                  <div data-oid="c-5w978">
                    <span className="text-slate-500 dark:text-slate-400" data-oid="4.t6aq1">Pace: </span>
                    <span className="font-medium" data-oid="byy6:9o">{set.pace}</span>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="mt-2 w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden" data-oid="lgc7wcw">
                  <div
                  className={`h-full ${
                  set.accuracy >= 85 ? 'bg-emerald-500' :
                  set.accuracy >= 70 ? 'bg-yellow-500' :
                  'bg-rose-500'}`
                  }
                  style={{ width: `${set.accuracy}%` }} data-oid="ds9z3cg">
                </div>
                </div>
              </div>
              
              {/* Difficulty */}
              <div className="mt-3 text-xs text-slate-500 dark:text-slate-400" data-oid="ed1b745">
                Difficulty: <span className="font-medium" data-oid="y3fkec0">{set.difficulty}</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Timeline stats summary */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700" data-oid="8f-bnes">
          <div className="grid grid-cols-3 gap-4 text-center" data-oid="h34-jfu">
            <div data-oid="9vp.nb3">
              <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="6:y011w">Time Range</div>
              <div className="font-bold" data-oid="-3:fp1q">
                {dateMarkers.length > 0 ? `${totalDays} days` : 'N/A'}
              </div>
            </div>
            <div data-oid="y151hdx">
              <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="-rfo2:c">Total Sets</div>
              <div className="font-bold" data-oid="6mlrms4">{practiceSets.length}</div>
            </div>
            <div data-oid="ft_1xun">
              <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="987rpam">Avg. Accuracy</div>
              <div className="font-bold" data-oid="sybvpe.">
                {Math.round(practiceSets.reduce((sum, set) => sum + set.accuracy, 0) / Math.max(1, practiceSets.length))}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}