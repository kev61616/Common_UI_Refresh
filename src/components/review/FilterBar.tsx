'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';

interface FilterBarProps {
  filters: {
    subject: string[];
    type: string[];
    accuracyRange: [number, number];
    timeRange: [number, number];
    pace: string[];
    dateRange: [Date, Date];
  };
  sortConfig: {
    key: string;
    direction: 'asc' | 'desc';
  };
  onFilterChange: (filters: FilterBarProps['filters']) => void;
  onSortChange: (key: string, direction: 'asc' | 'desc') => void;
  onClearFilters: () => void;
}

export function FilterBar({
  filters,
  sortConfig,
  onFilterChange,
  onSortChange,
  onClearFilters
}: FilterBarProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Subject filter handler
  const handleSubjectChange = (subject: string) => {
    const newSubjects = filters.subject.includes(subject) ?
    filters.subject.filter((s) => s !== subject) :
    [...filters.subject, subject];

    onFilterChange({
      ...filters,
      subject: newSubjects
    });
  };

  // Type filter handler
  const handleTypeChange = (type: string) => {
    const newTypes = filters.type.includes(type) ?
    filters.type.filter((t) => t !== type) :
    [...filters.type, type];

    onFilterChange({
      ...filters,
      type: newTypes
    });
  };

  // Pace filter handler
  const handlePaceChange = (pace: string) => {
    const newPaces = filters.pace.includes(pace) ?
    filters.pace.filter((p) => p !== pace) :
    [...filters.pace, pace];

    onFilterChange({
      ...filters,
      pace: newPaces
    });
  };

  // Accuracy range handler
  const handleAccuracyRangeChange = (rangeType: 'min' | 'max', value: number) => {
    const newRange: [number, number] = [...filters.accuracyRange] as [number, number];
    if (rangeType === 'min') {
      newRange[0] = value;
    } else {
      newRange[1] = value;
    }

    onFilterChange({
      ...filters,
      accuracyRange: newRange
    });
  };

  // Time range handler
  const handleTimeRangeChange = (rangeType: 'min' | 'max', value: number) => {
    const newRange: [number, number] = [...filters.timeRange] as [number, number];
    if (rangeType === 'min') {
      newRange[0] = value;
    } else {
      newRange[1] = value;
    }

    onFilterChange({
      ...filters,
      timeRange: newRange
    });
  };

  // Date range handler
  const handleDateRangeChange = (rangeType: 'start' | 'end', dateString: string) => {
    const newRange: [Date, Date] = [...filters.dateRange] as [Date, Date];
    if (rangeType === 'start') {
      newRange[0] = new Date(dateString);
    } else {
      newRange[1] = new Date(dateString);
    }

    onFilterChange({
      ...filters,
      dateRange: newRange
    });
  };

  // Format date for input
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Sort handler
  const handleSortChange = (key: string) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    onSortChange(key, direction);
  };

  return (
    <div className="bg-gradient-to-b from-white to-slate-50 rounded-xl shadow-lg border border-slate-100 p-[3%] dark:from-slate-800 dark:to-slate-800/80 dark:border-slate-700/50 backdrop-blur-sm relative overflow-hidden" data-oid="is5.hq:">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-sky-500/5 to-transparent rounded-bl-full" data-oid="pg08kl0"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-indigo-500/[0.03] to-transparent rounded-tr-full" data-oid="w3ksvqe"></div>
      
      <div className="relative z-10 flex flex-wrap justify-between items-center mb-5" data-oid="5a8iqrb">
        <h3 className="font-semibold text-slate-800 dark:text-white text-lg flex items-center" data-oid="0ir4dd0">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-sm mr-3" data-oid="xvsbb8b">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="i_p5qjr">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" data-oid="sxf0qxm" />
            </svg>
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400" data-oid="klmg3au">
            Filters & Sort
          </span>
        </h3>
        <div className="flex gap-3" data-oid="odyft2e">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full border border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-200 hover:bg-sky-50 flex items-center gap-1.5 dark:border-slate-700 dark:text-slate-300 dark:hover:text-sky-400 dark:hover:border-sky-700 dark:hover:bg-sky-950/30" data-oid="y8g7bv4">

            {showAdvancedFilters ?
            <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="94p5dw9">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" data-oid="syxe.l:" />
                </svg>
                <span data-oid="70anj6x">Hide Advanced</span>
              </> :

            <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="6zz:9ti">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" data-oid="duwgb8r" />
                </svg>
                <span data-oid="09cvy55">Show Advanced</span>
              </>
            }
          </button>
          <button
            onClick={onClearFilters}
            className="px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-100 hover:from-red-50 hover:to-red-50 flex items-center gap-1.5 dark:from-slate-800 dark:to-slate-700 dark:border-slate-600 dark:text-slate-300 dark:hover:text-red-400 dark:hover:border-red-900/50 dark:hover:from-red-950/30 dark:hover:to-red-900/20" data-oid="a7vo9vx">

            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="m-sqq:s">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" data-oid="ejf0vb." />
            </svg>
            <span data-oid="a4j4vfp">Clear All</span>
          </button>
        </div>
      </div>
      
      {/* Basic filters - with improved styling */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5 relative z-10" data-oid="j5n.0c:">
        {/* Subject Filter */}
        <div className="bg-white/50 rounded-xl p-3 border border-slate-100 shadow-sm dark:bg-slate-800/30 dark:border-slate-700/50" data-oid="us.f4qu">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center" data-oid="pput-pu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-indigo-500 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" data-oid="k.u_qkg">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" data-oid="f-6b1aw" />
            </svg>
            Subject
          </label>
          <div className="flex flex-wrap gap-2" data-oid="ibsfw2s">
            {['Reading', 'Writing', 'Math'].map((subject) =>
            <button
              key={subject}
              onClick={() => handleSubjectChange(subject)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${
              filters.subject.includes(subject) ?
              'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-indigo-600 shadow-sm dark:from-indigo-600 dark:to-indigo-700 dark:border-indigo-700' :
              'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:text-indigo-400 dark:hover:border-indigo-800'}`
              } data-oid="et8a0j9">

                {subject}
              </button>
            )}
          </div>
        </div>
        
        {/* Type Filter */}
        <div className="bg-white/50 rounded-xl p-3 border border-slate-100 shadow-sm dark:bg-slate-800/30 dark:border-slate-700/50" data-oid=":pax-wo">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center" data-oid="g5i3wq2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-sky-500 dark:text-sky-400" viewBox="0 0 20 20" fill="currentColor" data-oid="xi3dr7r">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" data-oid="a58tkfj" />
            </svg>
            Type
          </label>
          <div className="flex flex-wrap gap-2" data-oid="fa.j.uz">
            {['Algebra', 'Geometry', 'Comprehension', 'Grammar', 'Vocabulary'].map((type) =>
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${
              filters.type.includes(type) ?
              'bg-gradient-to-r from-sky-500 to-sky-600 text-white border-sky-600 shadow-sm dark:from-sky-600 dark:to-sky-700 dark:border-sky-700' :
              'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-sky-600 hover:border-sky-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:text-sky-400 dark:hover:border-sky-800'}`
              } data-oid="icxa1po">

                {type}
              </button>
            )}
          </div>
        </div>
        
        {/* Sort - with improved styling */}
        <div className="bg-white/50 rounded-xl p-3 border border-slate-100 shadow-sm dark:bg-slate-800/30 dark:border-slate-700/50" data-oid="qe5ay.6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center" data-oid="i0busm1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-purple-500 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor" data-oid="5xhk._4">
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" data-oid="9rvwh:j" />
            </svg>
            Sort By
          </label>
          <div className="flex gap-2" data-oid="hzvq9o4">
            <div className="relative flex-grow" data-oid="1qrz0_z">
              <select
                className="w-full px-3 py-1.5 text-sm rounded-lg bg-white border border-slate-200 text-slate-700 appearance-none pl-10 pr-10 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-25 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:focus:border-purple-700 dark:focus:ring-purple-900 dark:focus:ring-opacity-25"
                value={sortConfig.key}
                onChange={(e) => handleSortChange(e.target.value)} data-oid="xjiq:ih">

                <option value="dateCompleted" data-oid="_vk:tjb">Date</option>
                <option value="accuracy" data-oid="ut.tjs3">Accuracy</option>
                <option value="timeUsed" data-oid="dp15d75">Time</option>
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400" data-oid="j1kcxqg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="_dvd8pq">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12M8 12h12M8 17h12M4 7h.01M4 12h.01M4 17h.01" data-oid=".qf1u-5" />
                </svg>
              </div>
            </div>
            <button
              onClick={() => onSortChange(sortConfig.key, sortConfig.direction === 'asc' ? 'desc' : 'asc')}
              className="px-4 py-1.5 text-sm rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 transition-colors duration-200 flex items-center justify-center shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-purple-950/30 dark:hover:border-purple-800 dark:hover:text-purple-400" data-oid="gda1ty9">

              {sortConfig.direction === 'asc' ?
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="ee.88o2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" data-oid="9bmyddg" />
                </svg> :

              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="shvcuml">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" data-oid="iuss85c" />
                </svg>
              }
            </button>
          </div>
        </div>
      </div>
      
      {/* Advanced filters - with enhanced styling */}
      {showAdvancedFilters &&
      <div className="mt-6 relative" data-oid=":oj8r3c">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/[0.02] to-transparent rounded-bl-full pointer-events-none" data-oid="8h7s5dx"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-sky-500/[0.01] to-transparent rounded-tr-full pointer-events-none" data-oid="w6ypt7e"></div>
          
          {/* Section header */}
          <div className="mb-5 border-t border-slate-200 dark:border-slate-700/80 pt-5" data-oid="fjzb_-r">
            <div className="flex items-center gap-2 mb-5" data-oid="ox24svv">
              <div className="h-8 w-1 rounded-full bg-gradient-to-b from-purple-500 to-indigo-600 opacity-80" data-oid="dbq:7zw"></div>
              <h4 className="font-medium text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400" data-oid="0m:iy_q">
                Advanced Filters
              </h4>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" data-oid="wvlfucr">
            {/* Accuracy Range */}
            <div className="bg-white/70 p-4 rounded-xl shadow-sm border border-slate-100 dark:bg-slate-800/30 dark:border-slate-700/50" data-oid="05wgq3u">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center" data-oid="glash:b">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor" data-oid="xazli51">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" data-oid="9832wg4" />
                </svg>
                Accuracy Range
              </label>
              <div className="mt-3" data-oid="a21_y:y">
                <div className="relative pt-5" data-oid="0i75:z3">
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden dark:bg-slate-700/60" data-oid="ex.xex2">
                    <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    style={{ width: `${filters.accuracyRange[1]}%` }} data-oid="l4cgyjx">
                  </div>
                    <div
                    className="h-full bg-gradient-to-r from-slate-300 to-slate-300 rounded-full absolute top-0"
                    style={{ width: `${filters.accuracyRange[0]}%` }} data-oid="f98i065">
                  </div>
                  </div>
                  <div className="flex justify-between mt-4 text-xs text-slate-500" data-oid="z-q5t2j">
                    <div className="flex items-center" data-oid="v0j:vjv">
                      <input
                      type="number"
                      min="0"
                      max="100"
                      value={filters.accuracyRange[0]}
                      onChange={(e) => handleAccuracyRangeChange('min', parseInt(e.target.value))}
                      className="w-14 px-2 py-1.5 text-sm rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-25 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:focus:border-indigo-800 dark:focus:ring-indigo-900 dark:focus:ring-opacity-25" data-oid="g8r01:a" />

                      <span className="mx-2" data-oid="bagk-:0">-</span>
                      <input
                      type="number"
                      min="0"
                      max="100"
                      value={filters.accuracyRange[1]}
                      onChange={(e) => handleAccuracyRangeChange('max', parseInt(e.target.value))}
                      className="w-14 px-2 py-1.5 text-sm rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-25 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:focus:border-indigo-800 dark:focus:ring-indigo-900 dark:focus:ring-opacity-25" data-oid="29sced5" />

                      <span className="ml-1.5 text-slate-600 dark:text-slate-400" data-oid="b-k.2pu">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Time Range */}
            <div className="bg-white/70 p-4 rounded-xl shadow-sm border border-slate-100 dark:bg-slate-800/30 dark:border-slate-700/50" data-oid="c1g7778">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center" data-oid="czeq-83">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-sky-500" viewBox="0 0 20 20" fill="currentColor" data-oid="xg3ijz7">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" data-oid="bq3xmrs" />
                </svg>
                Time Range (min)
              </label>
              <div className="mt-3" data-oid="06pjf2i">
                <div className="relative pt-5" data-oid="qa92wqg">
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden dark:bg-slate-700/60" data-oid="s88v6zf">
                    <div
                    className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full"
                    style={{ width: `${filters.timeRange[1] / 120 * 100}%` }} data-oid="n_bt4ca">
                  </div>
                    <div
                    className="h-full bg-gradient-to-r from-slate-300 to-slate-300 rounded-full absolute top-0"
                    style={{ width: `${filters.timeRange[0] / 120 * 100}%` }} data-oid="n::by.n">
                  </div>
                  </div>
                  <div className="flex justify-between mt-4 text-xs text-slate-500" data-oid="3d8wytw">
                    <div className="flex items-center" data-oid="8fdkxz:">
                      <input
                      type="number"
                      min="0"
                      max="120"
                      value={filters.timeRange[0]}
                      onChange={(e) => handleTimeRangeChange('min', parseInt(e.target.value))}
                      className="w-14 px-2 py-1.5 text-sm rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-25 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:focus:border-sky-800 dark:focus:ring-sky-900 dark:focus:ring-opacity-25" data-oid="lab75yn" />

                      <span className="mx-2" data-oid="0-a9e37">-</span>
                      <input
                      type="number"
                      min="0"
                      max="120"
                      value={filters.timeRange[1]}
                      onChange={(e) => handleTimeRangeChange('max', parseInt(e.target.value))}
                      className="w-14 px-2 py-1.5 text-sm rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-25 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:focus:border-sky-800 dark:focus:ring-sky-900 dark:focus:ring-opacity-25" data-oid="lojhgcz" />

                      <span className="ml-1.5 text-slate-600 dark:text-slate-400" data-oid="vrkg3g:">min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pace */}
            <div className="bg-white/70 p-4 rounded-xl shadow-sm border border-slate-100 dark:bg-slate-800/30 dark:border-slate-700/50" data-oid="qn4hm5y">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center" data-oid="1z2jvbh">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-amber-500" viewBox="0 0 20 20" fill="currentColor" data-oid="st8xdcg">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" data-oid="v4ykw4i" />
                </svg>
                Pace
              </label>
              <div className="flex flex-wrap gap-2 mt-3" data-oid="ve5vkh_">
                {[
              { label: 'Fast', icon: 'M13 5l7 7-7 7M5 5l7 7-7 7' },
              { label: 'Normal', icon: 'M9 5l7 7-7 7M5 5l7 7-7 7' },
              { label: 'Slow', icon: 'M10 19l-7-7 7-7m4 14l-7-7 7-7' }].
              map((pace) =>
              <button
                key={pace.label}
                onClick={() => handlePaceChange(pace.label)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 flex items-center gap-1.5 ${
                filters.pace.includes(pace.label) ?
                'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-600 shadow-sm dark:from-amber-600 dark:to-amber-700 dark:border-amber-700' :
                'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-amber-600 hover:border-amber-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:text-amber-400 dark:hover:border-amber-800'}`
                } data-oid="6yo4pja">

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="ixj1_zr">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={pace.icon} data-oid="6a65xz:" />
                    </svg>
                    {pace.label}
                  </button>
              )}
              </div>
            </div>
            
            {/* Date Range */}
            <div className="bg-white/70 p-4 rounded-xl shadow-sm border border-slate-100 dark:bg-slate-800/30 dark:border-slate-700/50 md:col-span-3" data-oid="koqn:s1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center" data-oid="qynycch">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-rose-500" viewBox="0 0 20 20" fill="currentColor" data-oid="2qol9.1">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" data-oid="_b79nk5" />
                </svg>
                Date Range
              </label>
              <div className="flex flex-wrap md:flex-nowrap items-center gap-4 mt-3" data-oid="1u2cs0y">
                <div className="relative w-full" data-oid="34vr5tt">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" data-oid="e40s37n">
                    <span className="text-slate-500 dark:text-slate-400 text-xs" data-oid="dh3fdqs">From</span>
                  </div>
                  <input
                  type="date"
                  value={formatDate(filters.dateRange[0])}
                  onChange={(e) => handleDateRangeChange('start', e.target.value)}
                  className="pl-14 pr-3 py-2 text-sm rounded-lg bg-white border border-slate-200 text-slate-700 w-full shadow-sm focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-25 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:focus:border-rose-800 dark:focus:ring-rose-900 dark:focus:ring-opacity-25" data-oid="l6bc8kq" />

                </div>
                <div className="relative w-full" data-oid="rira0:i">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" data-oid=".rz_3e:">
                    <span className="text-slate-500 dark:text-slate-400 text-xs" data-oid="uopr8gz">To</span>
                  </div>
                  <input
                  type="date"
                  value={formatDate(filters.dateRange[1])}
                  onChange={(e) => handleDateRangeChange('end', e.target.value)}
                  className="pl-10 pr-3 py-2 text-sm rounded-lg bg-white border border-slate-200 text-slate-700 w-full shadow-sm focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-25 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:focus:border-rose-800 dark:focus:ring-rose-900 dark:focus:ring-opacity-25" data-oid="bq_lb7_" />

                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>);

}