'use client';

import { useState } from 'react';
import { PracticeSet } from '@/lib/mockData';

interface ListViewProps {
  practiceSets: PracticeSet[];
  onSelectSet: (id: string) => void;
  selectedSetId: string | null;
}

export function ListView2Modified({ practiceSets, onSelectSet, selectedSetId }: ListViewProps) {
  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(practiceSets.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = practiceSets.slice(indexOfFirstItem, indexOfLastItem);

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Format date to Mar 16 '25 format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(2);
    return `${month} ${day} '${year}`;
  };

  // Get color class based on accuracy
  const getAccuracyColorClass = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600 dark:text-green-400';
    if (accuracy >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  // Get subject icon
  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Math':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="sjhii3v">
            <path d="M7 12L12 7L17 12L12 17L7 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-oid="xt172xk" />
          </svg>);

      case 'Reading':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="gajjtdb">
            <path d="M4 4L6 6M6 6L8 8M6 6L8 4M6 6L4 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-oid="v-suku:" />
            <path d="M10 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="m21a1zt" />
            <path d="M4 16L20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="uas9gp-" />
            <path d="M4 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="e1_hw:s" />
            <path d="M10 20L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="2qgvzyu" />
          </svg>);

      case 'Writing':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="_wv0qod">
            <path d="M8 18L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="ahe273z" />
            <path d="M8 14L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="ak.od_d" />
            <path d="M12 10L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="x4w36ms" />
            <path d="M7 10C7 10.5523 6.55228 11 6 11C5.44772 11 5 10.5523 5 10C5 9.44772 5.44772 9 6 9C6.55228 9 7 9.44772 7 10Z" fill="currentColor" data-oid="dnl4o.r" />
            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" data-oid="m5zi:nr" />
          </svg>);

      default:
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="i2:_ogn">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" data-oid="hlwbzkd" />
          </svg>);

    }
  };

  // Get the subject background style
  const getSubjectStyle = (subject: string) => {
    switch (subject) {
      case 'Math':
        return 'bg-gradient-to-r from-indigo-500 to-purple-500';
      case 'Reading':
        return 'bg-gradient-to-r from-sky-500 to-blue-500';
      case 'Writing':
        return 'bg-gradient-to-r from-amber-500 to-orange-500';
      default:
        return 'bg-gradient-to-r from-slate-500 to-slate-700';
    }
  };

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-6 p-[3%]" data-oid="bsg2tw0">
      {/* List items with card style */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" data-oid="eoqr8tc">
        {currentItems.length > 0 ?
        currentItems.map((set) =>
        <div
          key={set.id}
          onClick={() => onSelectSet(set.id)}
          className={`overflow-hidden bg-white rounded-xl shadow-lg border cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
          selectedSetId === set.id ?
          'border-sky-500 ring-2 ring-sky-500/50' :
          'border-slate-100 dark:border-slate-700/50'} dark:bg-slate-800 dark:hover:bg-slate-800`
          } data-oid="93:5e-q">

              {/* Header with subject background */}
              <div className={`${getSubjectStyle(set.subject)} px-4 py-3 text-white flex items-center justify-between`} data-oid="9i5yf_r">
                <div className="flex items-center gap-2" data-oid="yr61n4_">
                  <div className="bg-white/20 p-1.5 rounded-full" data-oid="v:r4r9h">
                    {getSubjectIcon(set.subject)}
                  </div>
                  <div data-oid="12jkgna">
                    <div className="font-medium" data-oid="fp56kbf">{set.subject}</div>
                    <div className="text-xs text-white/80" data-oid="j.ggy_-">{set.type}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end" data-oid="o99292d">
                  <div className="text-xs" data-oid="v22y75h">{formatDate(set.dateCompleted)}</div>
                  <div className={`text-xs px-2 py-0.5 rounded-full bg-white/20 uppercase`} data-oid="5aob.6b">
                    {set.difficulty}
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4" data-oid="22rbpou">
                <div className="grid grid-cols-2 gap-3 text-center mb-4" data-oid="03gj.9b">
                  <div className="flex flex-col items-center" data-oid="n66bk9.">
                    <div className={`text-2xl font-bold ${getAccuracyColorClass(set.accuracy)}`} data-oid="1i5ksyq">
                      {set.accuracy}%
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="chu7giw">Accuracy</div>
                  </div>
                  
                  <div className="flex flex-col items-center" data-oid="iccprq-">
                    <div className="text-2xl font-bold text-slate-700 dark:text-slate-300" data-oid="4.qzpn:">
                      {set.pace}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="o4xlf0_">Pace</div>
                  </div>
                </div>
                
                {/* Horizontal indicators */}
                <div className="mt-3 space-y-2" data-oid="vnal1ml">
                  {/* Tags section - increased width */}
                  <div className="flex items-start gap-2" data-oid="wt5zxa1">
                    <div className="text-xs text-slate-500 dark:text-slate-400 w-20 mt-1" data-oid="43w7goc">Tags:</div>
                    <div className="flex-grow flex flex-wrap items-center gap-1.5" data-oid="x_vc8si">
                      {set.mistakeTypes.conceptual > 0 &&
                  <span className="inline-flex items-center bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full dark:bg-indigo-900/50 dark:text-indigo-300" data-oid="-schpn1">
                          {set.mistakeTypes.conceptual} conceptual
                        </span>
                  }
                      {set.mistakeTypes.careless > 0 &&
                  <span className="inline-flex items-center bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full dark:bg-amber-900/50 dark:text-amber-300" data-oid="e5hwwq7">
                          {set.mistakeTypes.careless} careless
                        </span>
                  }
                      {set.mistakeTypes.timeManagement > 0 &&
                  <span className="inline-flex items-center bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full dark:bg-red-900/50 dark:text-red-300" data-oid="md2tq.i">
                          {set.mistakeTypes.timeManagement} time
                        </span>
                  }
                    </div>
                  </div>
                  
                  {/* Fatigue */}
                  {set.sessionFatigue.earlyAccuracy - set.sessionFatigue.lateAccuracy > 15 &&
              <div className="flex items-center gap-2" data-oid="na-:7ys">
                      <div className="text-xs text-slate-500 dark:text-slate-400 w-20" data-oid="_s9hebn">Fatigue:</div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full flex-grow overflow-hidden" data-oid="1gt581g">
                        <div className="h-full bg-gradient-to-r from-green-500 to-red-500" style={{ width: '100%' }} data-oid="omzq-15"></div>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="bormugg">
                        -{set.sessionFatigue.earlyAccuracy - set.sessionFatigue.lateAccuracy}%
                      </div>
                    </div>
              }
                  
                  {/* Time of day */}
                  <div className="flex items-center gap-2" data-oid="by05yvt">
                    <div className="text-xs text-slate-500 dark:text-slate-400 w-20" data-oid="f43zfrr">Completed:</div>
                    <div className="text-xs text-slate-700 dark:text-slate-300" data-oid="tiod4km">{set.timeOfDay}</div>
                  </div>
                </div>
              </div>
            </div>
        ) :

        <div className="col-span-full bg-white text-center py-8 rounded-lg shadow-sm border border-slate-200 dark:bg-slate-800 dark:border-slate-700" data-oid="lx61joc">
            <p className="text-slate-500 dark:text-slate-400" data-oid="evv0c16">No practice sets match your filters</p>
          </div>
        }
      </div>
      
      {/* Pagination */}
      {totalPages > 1 &&
      <div className="flex justify-center mt-8" data-oid="7:8-pkt">
          <nav className="inline-flex rounded-xl shadow-lg overflow-hidden" data-oid="8m37vsw">
            <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700" data-oid="voxfh_t">

              <span className="sr-only" data-oid="5j4dzxh">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-oid="hm.y9t9">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" data-oid="-xzin4:" />
              </svg>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) =>
          <button
            key={page}
            onClick={() => paginate(page)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            currentPage === page ?
            'bg-gradient-to-r from-sky-500 to-indigo-500 text-white' :
            'bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
            } data-oid="c7ya2og">

                {page}
              </button>
          )}
            
            <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700" data-oid="6m2v5fm">

              <span className="sr-only" data-oid="6m6d1p-">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-oid="2nilwhv">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" data-oid="9es20b1" />
              </svg>
            </button>
          </nav>
        </div>
      }
    </div>);

}