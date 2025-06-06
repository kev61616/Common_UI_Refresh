'use client';

import { useState } from 'react';
import { PracticeSet } from '@/lib/mockData';
import { getDataWithFallback } from '@/lib/dataUtils';

interface SetViewTimelineProps {
  practiceSets: PracticeSet[];
  onSelectSet?: (id: string) => void;
  selectedSetId?: string | null;
}

/**
 * SetView - A clean, tabular view of practice sets with detailed performance metrics
 * 
 * Features:
 * - Structured table layout with sortable columns
 * - Color-coded performance indicators
 * - Subject and type grouping
 * - Difficulty and pace badges
 * - Pagination with results count
 */
export function SetViewTimeline({ practiceSets, onSelectSet, selectedSetId }: SetViewTimelineProps) {
  // Debug data loading
  console.log('SetView received practiceSets:', practiceSets?.length);

  // Use the utility function to get data with fallback
  const sets = getDataWithFallback(practiceSets);

  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(sets.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sets.slice(indexOfFirstItem, indexOfLastItem);

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
  const getAccuracyStyle = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600 dark:text-green-400';
    if (accuracy >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  // Get progress bar color based on accuracy
  const getProgressBarColor = (accuracy: number) => {
    if (accuracy >= 90) return 'bg-green-500 dark:bg-green-400';
    if (accuracy >= 70) return 'bg-yellow-500 dark:bg-yellow-400';
    return 'bg-red-500 dark:bg-red-400';
  };

  // Get badge for difficulty
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded dark:bg-green-900/40 dark:text-green-300" data-oid="eh1904j">Easy</span>;
      case 'Medium':
        return <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded dark:bg-yellow-900/40 dark:text-yellow-300" data-oid="dlw2hpc">Medium</span>;
      case 'Hard':
        return <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded dark:bg-red-900/40 dark:text-red-300" data-oid="83_5.8:">Hard</span>;
      default:
        return null;
    }
  };

  // Get badge for pace
  const getPaceBadge = (pace: string) => {
    switch (pace) {
      case 'Fast':
        return <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded dark:bg-blue-900/40 dark:text-blue-300" data-oid="3u52nxm">Fast</span>;
      case 'Normal':
        return <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded dark:bg-green-900/40 dark:text-green-300" data-oid="nu7.f8:">Normal</span>;
      case 'Slow':
        return <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-xs rounded dark:bg-orange-900/40 dark:text-orange-300" data-oid="yevu0u1">Slow</span>;
      default:
        return null;
    }
  };

  // Get subject icon or identifier
  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Math':
        return <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-center" data-oid="j80a-6-">M</div>;
      case 'Reading':
        return <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center" data-oid="ov-7_kx">R</div>;
      case 'Writing':
        return <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center justify-center" data-oid="8300gca">W</div>;
      default:
        return <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center" data-oid="0rmcvo5">{subject.charAt(0)}</div>;
    }
  };

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle set selection
  const handleSelectSet = (id: string) => {
    if (onSelectSet) {
      onSelectSet(id);
    }
  };

  return (
    <div className="p-4" data-oid="hu:0fyr">
      {/* Table style list */}
      <div className="overflow-x-auto bg-white dark:bg-slate-900 shadow-md rounded-lg" data-oid="29dvxos">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700" data-oid="ttb.188">
          <thead className="bg-slate-50 dark:bg-slate-800" data-oid="9_zkfs7">
            <tr data-oid=":jj0w_o">
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400" data-oid="4ivcnpc">
                Subject
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400" data-oid="wy_6-t7">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400" data-oid="z7c.-hv">
                Performance
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400" data-oid="5pp.834">
                Time Used
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400" data-oid="b39ahua">
                Difficulty
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400" data-oid="nfkyuw6">
                Pace
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200 dark:bg-slate-900 dark:divide-slate-700" data-oid="yip_q3h">
            {currentItems.length > 0 ?
            currentItems.map((set) =>
            <tr
              key={set.id}
              onClick={() => handleSelectSet(set.id)}
              className={`hover:bg-slate-50 dark:hover:bg-slate-800/70 cursor-pointer transition-colors duration-150 ${
              selectedSetId === set.id ?
              'bg-sky-50 dark:bg-sky-900/20 border-l-4 border-sky-500' :
              ''}`
              } data-oid="4bjrrp1">

                  <td className="px-6 py-4 whitespace-nowrap" data-oid="9rkmarz">
                    <div className="flex items-center" data-oid=":y6:13:">
                      {getSubjectIcon(set.subject)}
                      <div className="ml-4" data-oid="l5u:thm">
                        <div className="text-sm font-medium text-slate-900 dark:text-white" data-oid="hn-h2ra">
                          {set.subject}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="dgd-1de">
                          {set.type}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" data-oid="w42:zp7">
                    <div className="text-sm text-slate-900 dark:text-white" data-oid=":jtcnvc">{formatDate(set.dateCompleted)}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="w_qvgbv">{set.timeOfDay}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" data-oid="ggm2m:q">
                    <div className="flex flex-col items-center" data-oid="q7bdl7o">
                      <div className={`text-xl font-semibold ${getAccuracyStyle(set.accuracy)}`} data-oid=":sh1tzq">
                        {set.accuracy}%
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 mt-1.5 rounded-full overflow-hidden" data-oid="zba43w8">
                        <div
                      className={`h-full rounded-full ${getProgressBarColor(set.accuracy)}`}
                      style={{ width: `${set.accuracy}%` }} data-oid="zrsxdkj">
                    </div>
                      </div>
                      <div className="flex items-center justify-center mt-1 space-x-1" data-oid=":himts3">
                        {set.mistakeTypes.conceptual > 0 &&
                    <span className="text-xs text-slate-600 dark:text-slate-400" data-oid="o2icxfg">
                            {set.mistakeTypes.conceptual}c
                          </span>
                    }
                        {set.mistakeTypes.careless > 0 &&
                    <span className="text-xs text-slate-600 dark:text-slate-400" data-oid="3b6pos0">
                            {set.mistakeTypes.careless}l
                          </span>
                    }
                        {set.mistakeTypes.timeManagement > 0 &&
                    <span className="text-xs text-slate-600 dark:text-slate-400" data-oid="qg5o1ir">
                            {set.mistakeTypes.timeManagement}t
                          </span>
                    }
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center" data-oid=":y43c-f">
                    <div className="text-sm font-medium text-slate-900 dark:text-white" data-oid=".22dzz5">{formatTime(set.timeUsed)}</div>
                    {set.sessionFatigue.earlyAccuracy - set.sessionFatigue.lateAccuracy > 15 &&
                <div className="text-xs text-red-600 dark:text-red-400 mt-1" data-oid="9sjdwmb">Fatigue: -{set.sessionFatigue.earlyAccuracy - set.sessionFatigue.lateAccuracy}%</div>
                }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center" data-oid="e4wvvul">
                    <div className="flex justify-center" data-oid="l.aa-e_">
                      {getDifficultyBadge(set.difficulty)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center" data-oid="1yyb_9e">
                    <div className="flex justify-center" data-oid="qdejlwl">
                      {getPaceBadge(set.pace)}
                    </div>
                  </td>
                </tr>
            ) :

            <tr data-oid="8ko9n7j">
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-slate-500 dark:text-slate-400" data-oid="le8:mah">
                  No practice sets match your filters
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 &&
      <div className="flex justify-between items-center mt-5 px-2" data-oid="y6nbh-5">
          <div className="text-sm text-slate-600 dark:text-slate-400" data-oid="g1ozq:4">
            Showing <span className="font-medium" data-oid="73:-72c">{indexOfFirstItem + 1}</span> to{' '}
            <span className="font-medium" data-oid="od4norn">{Math.min(indexOfLastItem, sets.length)}</span> of{' '}
            <span className="font-medium" data-oid="1-oju.7">{sets.length}</span> results
          </div>
          
          <nav className="inline-flex shadow-sm -space-x-px" data-oid="3ltcqiy">
            <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800" data-oid="5b1b.nk">

              <span className="sr-only" data-oid="udlpvo0">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-oid="q83sl4s">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" data-oid="h4ru4tk" />
              </svg>
            </button>
            
            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) =>
          <button
            key={page}
            onClick={() => paginate(page)}
            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
            currentPage === page ?
            'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-indigo-900/30 dark:border-indigo-500 dark:text-indigo-400' :
            'bg-white border-slate-300 text-slate-500 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800'}`
            } data-oid="b3.-tqk">

                {page}
              </button>
          )}
            
            <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800" data-oid="r6n760k">

              <span className="sr-only" data-oid="uk_cj95">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-oid="6ffci2.">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" data-oid="lj8.926" />
              </svg>
            </button>
          </nav>
        </div>
      }
    </div>);

}