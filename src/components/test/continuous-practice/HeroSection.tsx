'use client';

import { useState, useEffect } from "react";
import { Brain, Award } from "lucide-react";
import { userData } from "@/lib/mockData/userData";

export function HeroSection() {
  const [showStreak, setShowStreak] = useState(false);
  
  // Simulate loading and animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStreak(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative mb-12 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/30 dark:from-indigo-900/40 dark:to-purple-900/50"></div>
      <div className="absolute inset-0 opacity-10 dark:opacity-5" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366F1' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="relative py-12 px-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-white dark:bg-slate-800 p-2.5 rounded-full shadow-md">
            <Brain className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
        
        <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 animate-gradient">
          Continuous Practice
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed">
          Build lasting knowledge through consistent practice. Choose between AI-recommended 
          content that adapts to your needs or customize your own practice sessions.
        </p>
        
        {/* Streak indicator */}
        <div 
          className={`inline-flex items-center bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/30 rounded-full px-4 py-2 mt-2 transition-all duration-500 ${
            showStreak ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
          }`}
        >
          <Award className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
          <span className="text-sm font-medium text-amber-800 dark:text-amber-300">
            {userData.streakDays} Day Streak! Keep it going!
          </span>
        </div>
      </div>
    </div>
  );
}
