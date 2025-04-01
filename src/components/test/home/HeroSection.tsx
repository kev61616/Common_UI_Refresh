'use client';

import { useState, useEffect } from "react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Simulate loading for animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative mb-12 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/30 dark:from-blue-900/40 dark:to-indigo-900/50"></div>
      <div className="absolute inset-0 opacity-20 dark:opacity-10" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366F1' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '30px 30px'
      }}></div>
      <div className="relative py-16 px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500 animate-gradient">
          Test Center
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
          Master your exams through personalized practice and realistic test simulations.
          Track your progress and improve with every session.
        </p>
      </div>
    </div>
  );
}
