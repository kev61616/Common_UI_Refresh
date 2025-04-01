'use client';

import Link from "next/link";
import { useState } from "react";
import { Clock, Calendar, ChevronRight, CheckCircle2 } from "lucide-react";
import { useInteractiveGlow, useStaggeredAnimation } from "@/hooks/useAnimatedEffects";
import { PracticeOption } from "../shared/types";

export function TestCard({ 
  title, 
  description, 
  features,
  href, 
  gradient,
  index 
}: PracticeOption) {
  const { elementRef } = useInteractiveGlow();
  const { getDelayClass } = useStaggeredAnimation(4);
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div 
      ref={elementRef}
      className={`flex flex-col bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden
                hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 stagger-fade-in ${getDelayClass(index)}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={`bg-gradient-to-r ${gradient.from} ${gradient.to} h-2.5`}></div>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300">3 hours duration</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Available now</span>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Sections:</p>
          <div className="space-y-1">
            {features.slice(0, 2).map((feature, i) => (
              <div key={i} className="flex items-center">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400 mr-2" />
                <span className="text-xs text-gray-600 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100 dark:border-slate-700">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Length</span>
          <Link 
            href={href}
            className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white 
                      bg-gradient-to-r ${gradient.from} ${gradient.to} hover:shadow-md transition-all duration-300`}
          >
            <span>Start</span>
            <ChevronRight className={`h-3.5 w-3.5 ml-1 transition-transform duration-300 ${isHovering ? 'translate-x-0.5' : ''}`} />
          </Link>
        </div>
      </div>
    </div>
  );
}
