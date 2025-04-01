'use client';

import { 
  Clock, 
  Target, 
  BarChart4, 
  Sparkles, 
  Trophy 
} from "lucide-react";
import { userData } from "@/lib/mockData/userData";

// Mock user stats - would come from a real backend
const userStats = {
  totalPracticeMinutes: 326,
  questionsAnswered: 847,
  currentStreak: userData.streakDays,
  totalPoints: 2340,
  skillMastery: 68
};

interface StatCardProps { 
  icon: React.ReactNode, 
  value: string, 
  label: string, 
  color: string 
}

export function StatCard({ icon, value, label, color }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-4 flex items-center">
      <div className={`rounded-full p-2.5 ${color} mr-4 flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</div>
      </div>
    </div>
  );
}

export function StatsRow({ isVisible = true }: { isVisible?: boolean }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mt-8 max-w-4xl mx-auto transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <StatCard 
        icon={<Clock className="h-4 w-4 text-blue-500" />} 
        value={`${userStats.totalPracticeMinutes}m`}
        label="Practice Time" 
        color="bg-blue-100 dark:bg-blue-900/30" 
      />
      <StatCard 
        icon={<Target className="h-4 w-4 text-red-500" />} 
        value={userStats.questionsAnswered.toString()}
        label="Questions" 
        color="bg-red-100 dark:bg-red-900/30" 
      />
      <StatCard 
        icon={<BarChart4 className="h-4 w-4 text-indigo-500" />} 
        value={`${userStats.skillMastery}%`}
        label="Mastery" 
        color="bg-indigo-100 dark:bg-indigo-900/30" 
      />
      <StatCard 
        icon={<Sparkles className="h-4 w-4 text-amber-500" />} 
        value={userStats.totalPoints.toString()}
        label="Points" 
        color="bg-amber-100 dark:bg-amber-900/30" 
      />
      <StatCard 
        icon={<Trophy className="h-4 w-4 text-emerald-500" />} 
        value={`${userStats.currentStreak} days`}
        label="Streak" 
        color="bg-emerald-100 dark:bg-emerald-900/30" 
      />
    </div>
  );
}
