'use client';

import React from 'react';
import { useFilters } from './FilterContext';

interface FilterButtonProps {
  filterType: string;
  label: string;
  icon: React.ReactNode;
  activeColorClasses: string;
  inactiveColorClasses: string;
  ringColorClass: string;
  count?: number;
}

/**
 * Reusable filter button component
 * Used to toggle dropdown visibility and show active filter status
 */
export function FilterButton({
  filterType,
  label,
  icon,
  activeColorClasses,
  inactiveColorClasses,
  ringColorClass,
  count = 0
}: FilterButtonProps) {
  const { activeDropdown, setActiveDropdown } = useFilters();

  const isActive = activeDropdown === filterType;

  const handleClick = () => {
    setActiveDropdown(isActive ? null : filterType);
  };

  return (
    <button
      className={`px-2.5 py-1.5 text-xs font-medium rounded-full border transition-colors duration-200 flex items-center gap-1.5 
        ${isActive ? activeColorClasses : inactiveColorClasses}
        ${count > 0 ? ringColorClass : ''}`
      }
      onClick={handleClick}
      aria-expanded={isActive}
      aria-controls={`${filterType}-dropdown`} data-oid="zqmmd8t">

      {icon}
      <span data-oid="wch0.h8">{label}</span>
      {/* Count badge */}
      <span className={`ml-1 inline-flex items-center justify-center w-4 h-4 text-[10px] rounded-full transition-colors
                      ${count > 0 ?
      'bg-slate-300 text-slate-700 dark:bg-slate-600 dark:text-slate-200' :
      'bg-transparent'}`} data-oid="-bmqgwo">
        {count > 0 ? count : ''}
      </span>
    </button>);

}

// Pre-defined filter button icons for consistent usage
export const FilterButtonIcons = {
  subject:
  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" data-oid="6j8n-9a">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" data-oid="xe.js-." />
    </svg>,

  type:
  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" data-oid="wi3xv.z">
      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" data-oid="addd5p9" />
    </svg>,

  date:
  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" data-oid="u5d_hde">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" data-oid="5b5n88x" />
    </svg>,

  accuracy:
  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" data-oid="nurbkvt">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" data-oid="mhp6wf-" />
    </svg>,

  time:
  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" data-oid="qvgezvr">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" data-oid="gnlhax5" />
    </svg>,

  pace:
  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" data-oid="16er_tq">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" data-oid="xww961v" />
    </svg>

};