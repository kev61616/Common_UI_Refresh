'use client';

import React from 'react';
import Link from 'next/link';

export default function AchievementsPage() {
  return (
    <div className="py-6 px-4 sm:px-6 md:px-8 dark:bg-slate-900" data-oid="hu0h_wx">
      <div className="max-w-7xl mx-auto" data-oid="4daa4-j">
        <div className="flex flex-col space-y-6" data-oid="lw-c..k">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4" data-oid="m0ad5v_">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white" data-oid="agvk-3n">
              Your Achievements
            </h1>
            <Link
              href="/profile"
              className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center text-sm font-medium transition-colors hover:bg-indigo-100 dark:hover:bg-indigo-900/50" data-oid="7n15d_6">

              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="0m_.x.u">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" data-oid="2ym_-2:" />
              </svg>
              Back to Profile
            </Link>
          </header>

          {/* Content - Placeholder */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6" data-oid="3vdec52">
            <p className="text-slate-600 dark:text-slate-400" data-oid=":32a5b9">
              This page will display all of your achievements and badges.
            </p>
          </div>
        </div>
      </div>
    </div>);

}