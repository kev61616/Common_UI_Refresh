'use client';

import { FileText, BookOpen, BarChart4, TimerIcon } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function IntroSection() {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden mb-12 stagger-fade-in stagger-delay-1">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full">
              <FileText className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Full Mock Test Experience</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our timed, full-length exam simulates real test conditions to help you prepare for the actual exam day. Each test includes all sections and follows the same format as the official test.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
              <div className="inline-flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full text-xs font-medium text-blue-600 dark:text-blue-300">
                <TimerIcon className="h-3 w-3 mr-1" />
                Timed Sections
              </div>
              <div className="inline-flex items-center px-3 py-1 bg-green-50 dark:bg-green-900/30 rounded-full text-xs font-medium text-green-600 dark:text-green-300">
                <BookOpen className="h-3 w-3 mr-1" />
                Full Length
              </div>
              <div className="inline-flex items-center px-3 py-1 bg-purple-50 dark:bg-purple-900/30 rounded-full text-xs font-medium text-purple-600 dark:text-purple-300">
                <BarChart4 className="h-3 w-3 mr-1" />
                Detailed Scoring
              </div>
            </div>
            <Link 
              href="/test/full-test/about"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              <span>Learn more about our test format</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
