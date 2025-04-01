'use client';

import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";

export function ResourcesSection() {
  return (
    <div className="mt-16 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-slate-700 stagger-fade-in stagger-delay-5">
      <div className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Ready to take your practice further?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Explore our premium courses and additional study resources designed by expert educators.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/courses" 
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
            >
              <span>Browse Courses</span>
              <ArrowUpRight className="h-4 w-4 ml-2" />
            </Link>
            <Link 
              href="/resources/study-tips" 
              className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300"
            >
              <span>Study Tips</span>
              <ChevronRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
