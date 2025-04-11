'use client';

import { TimelineViewProps } from './types';

/**
 * Circular Timeline (Timeline View Variant 6)
 * Displays practice sets in a circular format organized by month
 */
export function CircularTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="jlvs5b_">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="2bl7v5o">6. Circular Timeline</h3>
      
      <div className="relative flex justify-center min-h-[600px]" data-oid="9ltyqcy">
        {/* Circular track */}
        <div className="relative w-[500px] h-[500px] mt-6" data-oid="93i:ka-">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700" data-oid="23yfv1g"></div>
          
          {/* Center point */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center shadow-lg z-20" data-oid="o6l4ap_">
            Now
          </div>
          
          {/* Month markers */}
          {[...Array(12)].map((_, i) => {
            const angle = i / 12 * 2 * Math.PI;
            const x = 250 + Math.sin(angle) * 250;
            const y = 250 - Math.cos(angle) * 250;
            return (
              <div
                key={i}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 dark:text-slate-400"
                style={{ left: `${x}px`, top: `${y}px` }} data-oid="f1mqp19">

                {new Date(2025, i, 1).toLocaleString('default', { month: 'short' })}
              </div>);

          })}
          
          {/* Practice sets */}
          {practiceSets.map((set, index) => {
            const date = new Date(set.dateCompleted);
            const month = date.getMonth();
            const day = date.getDate();

            // Position based on month and day
            const angle = (month + day / 31) / 12 * 2 * Math.PI;
            const radius = 190 + index % 3 * 20; // Vary the radius slightly to avoid overlap
            const x = 250 + Math.sin(angle) * radius;
            const y = 250 - Math.cos(angle) * radius;

            return (
              <div
                key={set.id}
                onClick={() => onSelectSet(set.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10
                          ${selectedSetId === set.id ? 'z-30' : 'hover:z-20'}`}
                style={{ left: `${x}px`, top: `${y}px` }} data-oid="0x0j3cn">

                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md
                              ${set.subject === 'Reading' ?
                'bg-sky-500 text-white' :
                set.subject === 'Math' ?
                'bg-indigo-500 text-white' :
                'bg-violet-500 text-white'}`} data-oid="tor_ly8">

                  <div className="text-xs font-bold" data-oid="6a1gepw">{set.accuracy}%</div>
                </div>
                
                {/* Tooltip on hover/selection */}
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 
                               bg-white dark:bg-slate-800 shadow-lg rounded-lg p-2 w-max max-w-[150px] text-center
                               ${selectedSetId === set.id ? 'opacity-100' : 'opacity-0 hover:opacity-100'}
                               transition-opacity`} data-oid="7wrggz3">

                  <div className="font-medium text-sm" data-oid="pj5.xwd">{set.subject}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400" data-oid="ku84-5.">{set.type}</div>
                  <div className="text-xs" data-oid="_e3a9jo">{new Date(set.dateCompleted).toLocaleDateString()}</div>
                </div>
              </div>);

          })}
        </div>
      </div>
    </div>);

}