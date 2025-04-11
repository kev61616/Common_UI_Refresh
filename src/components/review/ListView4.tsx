'use client';

import { useState } from 'react';
import { PracticeSet } from '@/lib/mockData';

interface ListViewProps {
  practiceSets: PracticeSet[];
  onSelectSet: (id: string) => void;
  selectedSetId: string | null;
}

export function ListView4({ practiceSets, onSelectSet, selectedSetId }: ListViewProps) {
  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  // Format date to more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Get color class based on accuracy
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'bg-green-500';
    if (accuracy >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Get the subject gradient style
  const getSubjectGradient = (subject: string) => {
    switch (subject) {
      case 'Math':
        return 'from-indigo-500 to-purple-600';
      case 'Reading':
        return 'from-sky-500 to-blue-600';
      case 'Writing':
        return 'from-amber-500 to-orange-600';
      default:
        return 'from-slate-500 to-slate-700';
    }
  };

  // Get subject icon
  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Math':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="d8c1-fj">
            <path d="M7 12L12 7L17 12L12 17L7 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-oid="ftf2894" />
          </svg>);

      case 'Reading':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="uz..wbp">
            <path d="M4 4L6 6M6 6L8 8M6 6L8 4M6 6L4 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-oid="oxcd4kh" />
            <path d="M10 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="h90nrhs" />
            <path d="M4 16L20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="0jqaivc" />
            <path d="M4 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="gxh0rwi" />
            <path d="M10 20L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="mf9iwjk" />
          </svg>);

      case 'Writing':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="ot-5md1">
            <path d="M8 18L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="zb44783" />
            <path d="M8 14L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="yt.3i_:" />
            <path d="M12 10L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-oid="-71d-6v" />
            <path d="M7 10C7 10.5523 6.55228 11 6 11C5.44772 11 5 10.5523 5 10C5 9.44772 5.44772 9 6 9C6.55228 9 7 9.44772 7 10Z" fill="currentColor" data-oid="vkp.b8h" />
            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" data-oid="k3as6ua" />
          </svg>);

      default:
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="1ta1.17">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" data-oid=":rcrlm." />
          </svg>);

    }
  };

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-[3%]" data-oid="_f2ffbd">
      {/* Masonry/Grid style */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" data-oid=":e916ul">
        {currentItems.length > 0 ?
        currentItems.map((set) =>
        <div
          key={set.id}
          onClick={() => onSelectSet(set.id)}
          className={`relative bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
          selectedSetId === set.id ?
          'ring-4 ring-sky-500/50' :
          ''}`
          } data-oid="540xxok">

              {/* Top gradient banner */}
              <div className={`h-24 w-full bg-gradient-to-r ${getSubjectGradient(set.subject)} flex items-center justify-center relative`} data-oid="can-wq7">
                <div className="absolute inset-0 bg-black/10" data-oid="c08zw0b"></div>
                <div className="relative z-10 text-white" data-oid="hwqbugq">
                  {getSubjectIcon(set.subject)}
                </div>
                
                {/* Difficulty badge */}
                <div className="absolute top-2 right-2 bg-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold" data-oid="8_bwprn">
                  {set.difficulty}
                </div>
                
                {/* Date badge */}
                <div className="absolute bottom-2 left-2 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs" data-oid="4110ozz">
                  {formatDate(set.dateCompleted)}
                </div>
                
                {/* Time badge */}
                <div className="absolute bottom-2 right-2 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs" data-oid="4wl93gj">
                  {set.timeOfDay}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5" data-oid="dx7wzsh">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white flex justify-between items-center" data-oid="pjrbp34">
                  <span data-oid="0m:.btp">{set.subject}</span>
                  <span className="text-slate-500 dark:text-slate-400 text-sm font-normal" data-oid="ehhypxo">{set.type}</span>
                </h3>
                
                {/* Stats section */}
                <div className="mt-4 flex items-stretch" data-oid="b1ik.p-">
                  {/* Accuracy donut */}
                  <div className="w-1/3 flex flex-col items-center" data-oid="rh60ule">
                    <div className="relative h-16 w-16" data-oid="07-0c9m">
                      <svg viewBox="0 0 36 36" className="h-full w-full" data-oid="sr3mhx7">
                        <path
                      className="stroke-slate-200 dark:stroke-slate-700 fill-none"
                      strokeWidth="3.8"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" data-oid="_wb_z5h" />

                        <path
                      className={`stroke-current ${getAccuracyColor(set.accuracy)} fill-none`}
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      strokeDasharray={`${set.accuracy}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" data-oid="m:-x121" />

                        <text
                      x="18"
                      y="20.35"
                      className="fill-slate-800 dark:fill-white font-bold text-[8px]"
                      textAnchor="middle" data-oid="lzcpild">

                          {set.accuracy}%
                        </text>
                      </svg>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1" data-oid="x3ramp0">Accuracy</span>
                  </div>
                  
                  {/* Time */}
                  <div className="w-1/3 flex flex-col items-center justify-center border-x border-slate-100 dark:border-slate-800" data-oid="wb07e0m">
                    <div className="text-lg font-bold text-slate-700 dark:text-slate-300" data-oid="lkqdkuy">
                      {formatTime(set.timeUsed)}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400" data-oid="4uvakru">Time</span>
                  </div>
                  
                  {/* Pace */}
                  <div className="w-1/3 flex flex-col items-center justify-center" data-oid="3.qt9gs">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                set.pace === 'Fast' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' :
                set.pace === 'Normal' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' :
                'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300'}`
                } data-oid="vaupzn6">
                      {set.pace}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1" data-oid="ed0gwuj">Pace</span>
                  </div>
                </div>
                
                {/* Mistake & fatigue indicators */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800" data-oid="8rxtzsc">
                  <div className="flex flex-wrap gap-2" data-oid="ts.21i_">
                    {set.mistakeTypes.conceptual > 0 &&
                <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-md dark:bg-indigo-900/30 dark:text-indigo-300" data-oid="h2tc5ui">
                        {set.mistakeTypes.conceptual} Conceptual
                      </span>
                }
                    {set.mistakeTypes.careless > 0 &&
                <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-md dark:bg-amber-900/30 dark:text-amber-300" data-oid="i1r-wz4">
                        {set.mistakeTypes.careless} Careless
                      </span>
                }
                    {set.mistakeTypes.timeManagement > 0 &&
                <span className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-md dark:bg-red-900/30 dark:text-red-300" data-oid="6m4yrtz">
                        {set.mistakeTypes.timeManagement} Time
                      </span>
                }
                    {set.sessionFatigue.earlyAccuracy - set.sessionFatigue.lateAccuracy > 15 &&
                <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-md dark:bg-purple-900/30 dark:text-purple-300" data-oid="doa2qe1">
                        Fatigue: -{set.sessionFatigue.earlyAccuracy - set.sessionFatigue.lateAccuracy}%
                      </span>
                }
                  </div>
                </div>
              </div>
            </div>
        ) :

        <div className="col-span-full bg-white text-center py-8 rounded-lg shadow-sm border border-slate-200 dark:bg-slate-800 dark:border-slate-700" data-oid="bltw:66">
            <p className="text-slate-500 dark:text-slate-400" data-oid="4v99kv4">No practice sets match your filters</p>
          </div>
        }
      </div>
      
      {/* Pagination */}
      {totalPages > 1 &&
      <div className="flex justify-center mt-8" data-oid=".shnio6">
          <nav className="inline-flex rounded-xl shadow-md overflow-hidden" data-oid="v96w9s2">
            <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2.5 bg-white/90 backdrop-blur-sm text-sm font-medium text-slate-600 hover:bg-white transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/90 dark:bg-slate-800/90 dark:text-slate-300 dark:hover:bg-slate-800" data-oid="ww:ubfg">

              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" data-oid="oa8.ih4">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" data-oid="-5rxuxb" />
              </svg>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) =>
          <button
            key={page}
            onClick={() => paginate(page)}
            className={`relative inline-flex items-center px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
            currentPage === page ?
            'bg-gradient-to-br from-sky-500 to-indigo-600 text-white' :
            'bg-white/90 backdrop-blur-sm text-slate-600 hover:bg-white dark:bg-slate-800/90 dark:text-slate-300 dark:hover:bg-slate-800'}`
            } data-oid="wfbo8fa">

                {page}
              </button>
          )}
            
            <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-4 py-2.5 bg-white/90 backdrop-blur-sm text-sm font-medium text-slate-600 hover:bg-white transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/90 dark:bg-slate-800/90 dark:text-slate-300 dark:hover:bg-slate-800" data-oid="vf:4ek7">

              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" data-oid="z10rejy">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" data-oid="qy1jzb0" />
              </svg>
            </button>
          </nav>
        </div>
      }
    </div>);

}