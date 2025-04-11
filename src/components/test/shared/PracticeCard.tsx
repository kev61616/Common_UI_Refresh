'use client';

import Link from "next/link";
import { useState } from "react";
import { Shield, ChevronRight, Heart, CheckCircle2 } from "lucide-react";
import { useInteractiveGlow, useStaggeredAnimation } from "@/hooks/useAnimatedEffects";
import { PracticeOption } from "./types";
import { userData } from "@/lib/mockData/userData";

export function PracticeCard({
  title,
  description,
  features,
  isPremium,
  isFree,
  href,
  icon,
  gradient,
  index
}: PracticeOption) {
  const { elementRef } = useInteractiveGlow();
  const { getDelayClass } = useStaggeredAnimation(2);
  const [isHovering, setIsHovering] = useState(false);

  // Dynamic gradient classes
  const gradientBg = `bg-gradient-to-r ${gradient.from} ${gradient.to}`;
  const gradientBorder = isPremium ?
  'border-amber-200 dark:border-amber-800/50' :
  'border-indigo-100 dark:border-indigo-800/50';

  return (
    <div
      ref={elementRef}
      className={`flex flex-col bg-white dark:bg-slate-800 border ${gradientBorder} rounded-xl shadow-sm overflow-hidden
                hover:shadow-lg hover:-translate-y-1 transition-all duration-300 interactive-glow shine-effect stagger-fade-in ${getDelayClass(index)}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}>

      {/* Gradient header bar */}
      <div className={`${gradientBg} h-3`}></div>
      
      <div className="p-8">
        {/* Card header with icon and title */}
        <div className="flex items-center mb-6">
          <div className="relative mr-4">
            <div className={`rounded-full p-3.5 ${isPremium ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'}`}>
              {icon}
            </div>
            {isPremium &&
            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-400 to-amber-600 text-white p-1 rounded-full animate-pulse">
                <Shield className="h-4 w-4" />
              </div>
            }
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
        
        {/* Features list */}
        <div className="space-y-3 mb-8">
          {features.map((feature, i) =>
          <div key={i} className="flex items-start">
              <CheckCircle2 className={`h-5 w-5 mt-0.5 mr-2.5 flex-shrink-0 ${isPremium ? 'text-amber-500 dark:text-amber-400' : 'text-emerald-500 dark:text-emerald-400'}`} />
              <p className="text-sm text-gray-700 dark:text-gray-300">{feature}</p>
            </div>
          )}
        </div>
        
        {/* Status indicators */}
        {isPremium ?
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border border-amber-200 dark:border-amber-800/40 rounded-lg p-2.5 text-center mb-6">
            <div className="flex items-center justify-center text-amber-800 dark:text-amber-300 font-medium">
              <Shield className="h-4 w-4 mr-2" />
              Premium Feature
            </div>
          </div> :
        isFree ?
        <div className="bg-gradient-to-r from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20 border border-rose-200 dark:border-rose-800/40 rounded-lg p-2.5 text-center mb-6">
            <div className="flex items-center justify-center text-rose-700 dark:text-rose-300 font-medium">
              <Heart className="h-4 w-4 mr-2" />
              <span>{userData.heartCount}/7 hearts remaining today</span>
            </div>
          </div> :
        null}
        
        {/* Action button */}
        <Link
          href={href}
          className={`mt-4 flex items-center justify-center w-full py-3.5 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300
                    ${isPremium ?
          'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white' :
          'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white'}`}>

          <span className="font-medium">{isPremium ? 'Upgrade to Premium' : 'Start Practice'}</span>
          <ChevronRight className={`h-4 w-4 ml-1.5 transition-transform duration-300 ${isHovering ? 'translate-x-0.5' : ''}`} />
        </Link>
      </div>
    </div>);

}