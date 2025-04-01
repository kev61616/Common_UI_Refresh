"use client";

import { Brain } from "lucide-react";
import { usePageLoadAnimation } from "@/hooks/useAnimatedEffects";
import { PracticeCard } from "@/components/test/shared/PracticeCard";
import { continuousPracticeOptions } from "@/components/test/continuous-practice/PracticeOptions";
import { HeroSection } from "@/components/test/continuous-practice/HeroSection";
import { ProgressSection } from "@/components/test/continuous-practice/ProgressSection";

export default function ContinuousPracticeClient() {
  const { containerRef } = usePageLoadAnimation();
  
  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section with Pattern Background */}
        <HeroSection />
        
        {/* User Progress Section */}
        <ProgressSection />
        
        {/* Practice Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {continuousPracticeOptions.map((option) => (
            <PracticeCard 
              key={option.title} 
              {...option}
            />
          ))}
        </div>
        
        {/* Learning Philosophy Section */}
        <div className="mt-16 p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm stagger-fade-in stagger-delay-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex-shrink-0 mb-6 lg:mb-0 lg:mr-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-full">
                <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-center lg:text-left dark:text-white">Our Learning Philosophy</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center lg:text-left">
                Our continuous practice system is designed based on proven learning science. We use spaced repetition, interleaving, 
                and adaptive difficulty to optimize your learning experience and help you retain information longer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
