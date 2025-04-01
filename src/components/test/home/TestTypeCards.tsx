'use client';

import Link from "next/link";
import { useState } from "react";
import { Calculator, ChevronRight, Brain } from "lucide-react";
import { useStaggeredAnimation, useInteractiveGlow } from "@/hooks/useAnimatedEffects";

interface TestTypeCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  index: number;
}

export function TestTypeCard({ 
  title, 
  description, 
  href, 
  icon, 
  accentColor, 
  gradientFrom, 
  gradientTo, 
  index 
}: TestTypeCardProps) {
  const { elementRef } = useInteractiveGlow();
  const { getDelayClass } = useStaggeredAnimation(4);
  const [isHovering, setIsHovering] = useState(false);
  
  // Dynamic styles based on props
  const accentClasses = {
    indigo: {
      bg: "bg-indigo-500 dark:bg-indigo-600",
      light: "bg-indigo-50 dark:bg-indigo-900/20",
      text: "text-indigo-600 dark:text-indigo-400",
      border: "border-indigo-100 dark:border-indigo-800/30",
      iconBg: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
      gradient: `bg-gradient-to-br ${gradientFrom} ${gradientTo}`
    },
    emerald: {
      bg: "bg-emerald-500 dark:bg-emerald-600",
      light: "bg-emerald-50 dark:bg-emerald-900/20",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-100 dark:border-emerald-800/30",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
      gradient: `bg-gradient-to-br ${gradientFrom} ${gradientTo}`
    }
  };
  
  const colorScheme = accentClasses[accentColor as keyof typeof accentClasses];
  
  return (
    <div 
      ref={elementRef}
      className={`flex flex-col bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden
                hover:shadow-lg transition-transform duration-500 hover:-translate-y-1 interactive-glow shine-effect stagger-fade-in ${getDelayClass(index)}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={`${colorScheme.gradient} h-2.5`}></div>
      <div className="p-8 flex flex-col h-full">
        <div className="flex items-center mb-5">
          <div className={`rounded-full p-3.5 ${colorScheme.iconBg} mr-4`}>
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-base">{description}</p>
        
        <div className="mt-auto">
          <Link 
            href={href} 
            className={`flex items-center justify-center w-full py-3 px-4 rounded-lg 
                    ${colorScheme.gradient} text-white shadow-sm hover:shadow-md transition-all duration-300`}
          >
            <span className="mr-1.5">Get Started</span>
            <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isHovering ? 'translate-x-0.5' : ''}`} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export const testTypeCards = [
  {
    title: "Continuous Practice",
    description: "Improve your skills through adaptive learning that adjusts to your personal strengths and weaknesses.",
    href: "/test/continuous-practice",
    icon: <Brain className="h-6 w-6" />,
    accentColor: "indigo",
    gradientFrom: "from-indigo-500",
    gradientTo: "to-purple-600",
    index: 0
  },
  {
    title: "Full Test",
    description: "Experience comprehensive exam simulations that mirror the actual test environment and timing.",
    href: "/test/full-test",
    icon: <Calculator className="h-6 w-6" />,
    accentColor: "emerald",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-600",
    index: 1
  },
];
