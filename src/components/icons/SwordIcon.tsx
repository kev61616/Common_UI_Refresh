'use client'

import React from 'react'

type SwordIconProps = {
  className?: string;
  size?: number;
  color?: string;
  onClick?: () => void;
  isActive?: boolean;
}

/**
 * SwordIcon - A decorative sword icon for challenge indicators
 * Used to represent challenge opportunities in the mastery progression grid
 */
export function SwordIcon({
  className = '',
  size = 20,
  color = 'currentColor',
  onClick,
  isActive = false
}: SwordIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color}
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={`${className} ${isActive ? 'animate-pulse' : ''} ${onClick ? 'cursor-pointer transition-all hover:scale-110' : ''}`}
      onClick={onClick}
    >
      {/* Sword Blade */}
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5" stroke={color} strokeWidth="2" />
      {/* Sword Hilt */}
      <path d="M13 19l6-6" stroke={color} strokeWidth="2" />
      <path d="M16 16l3.5 3.5" stroke={color} strokeWidth="2" />
      <path d="M19 19l.5.5" stroke={color} strokeWidth="2" />
      {/* Sword Handle */}
      <path d="M14.5 17.5L16 19" stroke={color} strokeWidth="2" />
      {/* Decorative Hilt Element */}
      <circle cx="16" cy="16" r="1" fill={color} />
    </svg>
  )
}
