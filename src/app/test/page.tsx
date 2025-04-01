"use client";

import { useState, useEffect } from "react";
import { usePageLoadAnimation } from "@/hooks/useAnimatedEffects";
import { TestTypeCard, testTypeCards } from "@/components/test/home/TestTypeCards";
import { InfoAlert } from "@/components/test/home/InfoAlert";
import { ResourcesSection } from "@/components/test/home/ResourcesSection";
import { StatsRow } from "@/components/test/home/StatCards";
import { HeroSection } from "@/components/test/home/HeroSection";

export default function TestPage() {
  const { containerRef } = usePageLoadAnimation();
  const [isVisible, setIsVisible] = useState(false);
  
  // Simulate stats loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section with Pattern Background */}
        <HeroSection />
        
        {/* Stats Row */}
        <StatsRow isVisible={isVisible} />
        
        {/* Info Alert */}
        <InfoAlert />

        {/* Test Type Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {testTypeCards.map((card, index) => (
            <TestTypeCard 
              key={index} 
              {...card} 
            />
          ))}
        </div>
        
        {/* Resources Section */}
        <ResourcesSection />
      </div>
    </div>
  );
}
