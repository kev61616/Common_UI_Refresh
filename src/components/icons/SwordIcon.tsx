'use client';

import React from 'react';

type SwordIconProps = {
  className?: string;
  size?: number;
  color?: string;
  onClick?: () => void;
  isActive?: boolean;
};

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
      onClick={onClick} data-oid="h96s3m5">

      {/* Sword Blade */}
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5" stroke={color} strokeWidth="2" data-oid="yovoxy." />
      {/* Sword Hilt */}
      <path d="M13 19l6-6" stroke={color} strokeWidth="2" data-oid="3oag75q" />
      <path d="M16 16l3.5 3.5" stroke={color} strokeWidth="2" data-oid="9q.3urp" />
      <path d="M19 19l.5.5" stroke={color} strokeWidth="2" data-oid="89k6_hz" />
      {/* Sword Handle */}
      <path d="M14.5 17.5L16 19" stroke={color} strokeWidth="2" data-oid="-m_0l8r" />
      {/* Decorative Hilt Element */}
      <circle cx="16" cy="16" r="1" fill={color} data-oid="du7n.31" />
    </svg>);

}