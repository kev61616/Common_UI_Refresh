"use client";

import { usePageLoadAnimation } from "@/hooks/useAnimatedEffects";
import { TestCard } from "@/components/test/full-test/TestCard";
import { fullTestOptions } from "@/components/test/full-test/TestOptions";
import { IntroSection } from "@/components/test/full-test/IntroSection";
import { TipsSection, WeeklyChallengeBanner } from "@/components/test/full-test/TipsSection";

export default function FullTestClient() {
  const { containerRef } = usePageLoadAnimation();
  
  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 page-header-animate">
          <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500 animate-gradient">
            Full Test
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
            Take a full-length mock test in simulated exam conditions to practice timing and build test endurance.
          </p>
        </div>

        {/* Intro Section */}
        <IntroSection />

        {/* Available Tests Section */}
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white stagger-fade-in stagger-delay-2">Available Tests</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {fullTestOptions.map((test) => (
            <TestCard 
              key={test.title} 
              {...test}
            />
          ))}
        </div>
        
        {/* Tips Section */}
        <TipsSection />
        
        {/* Weekly Challenge Banner */}
        <WeeklyChallengeBanner />
      </div>
    </div>
  );
}
