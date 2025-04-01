'use client';

import { 
  LightbulbIcon, 
  BarChart3, 
  CalendarDays, 
  TrendingUp,
  Target
} from "lucide-react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { KnowledgeAreas } from "../shared/KnowledgeAreaProgress";
import { ProgressChart } from "../shared/ProgressChart";
import { userData } from "@/lib/mockData/userData";

export function ProgressSection() {
  return (
    <div className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Weekly progress chart */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 stagger-fade-in stagger-delay-1">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Progress</h3>
          <CalendarDays className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="flex items-center justify-center mb-4">
          <ProgressChart data={userData.recentProgress} />
        </div>
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Last 7 days progress
        </div>
        <div className="mt-4 flex items-center justify-center">
          <TrendingUp className="h-4 w-4 text-emerald-500 mr-1.5" />
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">12% improvement this week</span>
        </div>
      </div>
      
      {/* Knowledge areas */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 stagger-fade-in stagger-delay-2">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Knowledge Areas</h3>
          <BarChart3 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </div>
        <KnowledgeAreas areas={userData.knowledgeAreas} />
      </div>
      
      {/* Recommended topics */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 stagger-fade-in stagger-delay-3">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recommended Focus</h3>
          <LightbulbIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Based on your recent performance, we suggest focusing on these areas:
        </p>
        <ul className="space-y-3">
          {userData.recommendedTopics.map((topic, index) => (
            <li key={index} className="flex items-start">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full p-1 mr-2 flex-shrink-0">
                <Target className="h-4 w-4" />
              </div>
              <span className="text-gray-700 dark:text-gray-300">{topic}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Link 
            href="/test/continuous-practice/ai-recommended"
            className="flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            <span>Start focused practice</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
