'use client';

import React from 'react';
import Link from 'next/link';

export default function ProfileSettingsPage() {
  return (
    <div className="py-6 px-4 sm:px-6 md:px-8 dark:bg-slate-900" data-oid="_7r5gnm">
      <div className="max-w-7xl mx-auto" data-oid="2ke-q_1">
        <div className="flex flex-col space-y-6" data-oid="dqlodec">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4" data-oid="2aqem-m">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white" data-oid="ckim13g">
              Profile Settings
            </h1>
            <Link
              href="/profile"
              className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center text-sm font-medium transition-colors hover:bg-indigo-100 dark:hover:bg-indigo-900/50" data-oid="gwh0f.g">

              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="fv7rnol">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" data-oid="0ovlhy9" />
              </svg>
              Back to Profile
            </Link>
          </header>

          {/* Content - Placeholder */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6" data-oid="g6h5a6z">
            <p className="text-slate-600 dark:text-slate-400" data-oid="xs9q_pl">
              This page will allow you to manage your profile settings and preferences.
            </p>
          </div>
        </div>
      </div>
    </div>);

}