'use client';

import { ChevronRight, Trophy } from "lucide-react";
import Link from "next/link";

export function TipsSection() {
  return (
    <div className="mt-12 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/20 shadow-sm stagger-fade-in stagger-delay-4">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Test Day Tips</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Get a good night's sleep, eat a healthy breakfast, and arrive early to your testing location. During the test, manage your time carefully and don't spend too long on any single question.
        </p>
        <Link 
          href="/resources/test-tips"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-md transition-all shadow-sm"
        >
          <span>View All Test Day Tips</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}

export function WeeklyChallengeBanner() {
  return (
    <div className="mt-10 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-100 dark:border-amber-900/30 p-5 flex flex-col sm:flex-row items-center justify-between shadow-sm stagger-fade-in stagger-delay-6">
      <div className="mb-4 sm:mb-0 sm:mr-6 flex items-center">
        <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full p-2.5 mr-4">
          <Trophy className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Weekly Challenge</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Complete a full test this week and earn bonus points</p>
        </div>
      </div>
      <Link 
        href="/challenges/weekly" 
        className="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md shadow-sm transition-colors duration-300"
      >
        <span>View Challenge</span>
        <ChevronRight className="h-4 w-4 ml-1.5" />
      </Link>
    </div>
  );
}
