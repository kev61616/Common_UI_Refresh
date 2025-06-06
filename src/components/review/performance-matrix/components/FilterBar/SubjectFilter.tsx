'use client';

import React from 'react';

interface SubjectFilterProps {
  subjects: string[];
  filterSubject: string | null;
  setFilterSubject: (subject: string | null) => void;
}

/**
 * Subject selector filter component
 */
export const SubjectFilter: React.FC<SubjectFilterProps> = ({
  subjects,
  filterSubject,
  setFilterSubject
}) => {
  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterSubject(value === 'all' ? null : value);
  };

  return (
    <div className="flex flex-col" data-oid=".o4f:n0">
      <label
        htmlFor="subject-filter"
        className="text-sm text-slate-600 dark:text-slate-400 mb-1 whitespace-nowrap" data-oid="dewhaow">

        Subject:
      </label>
      <select
        id="subject-filter"
        value={filterSubject || 'all'}
        onChange={handleSubjectChange}
        className="w-full text-sm border border-slate-200 rounded-md py-1.5 px-3 
                 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 
                 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300" data-oid="hg5:shf">









        <option value="all" data-oid="4knon-i">All Subjects</option>
        {subjects.map((subject) =>
        <option key={subject} value={subject} data-oid="n676t-l">
            {subject}
          </option>
        )}
      </select>
    </div>);

};