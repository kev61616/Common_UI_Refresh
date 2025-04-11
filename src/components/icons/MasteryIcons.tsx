'use client';

import React from 'react';

type MasteryIconProps = {
  className?: string;
  size?: number;
  color?: string;
};

/**
 * VeryWeakIcon - Two arrows pointing down for the "Very Weak" mastery level
 */
export function VeryWeakIcon({
  className = '',
  size = 20,
  color = 'currentColor'
}: MasteryIconProps) {
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
      className={className} data-oid="uhnivbl">

      <path d="M7 13L12 18L17 13" stroke={color} strokeWidth="2" data-oid="k-_feth" />
      <path d="M7 6L12 11L17 6" stroke={color} strokeWidth="2" data-oid="nmsp6n." />
    </svg>);

}

/**
 * WeakIcon - One arrow pointing down for the "Weak" mastery level
 */
export function WeakIcon({
  className = '',
  size = 20,
  color = 'currentColor'
}: MasteryIconProps) {
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
      className={className} data-oid="eanmoad">

      <path d="M7 10L12 15L17 10" stroke={color} strokeWidth="2" data-oid="918v89f" />
    </svg>);

}

/**
 * NotAttemptedIcon - Question mark for the "Not Attempted" mastery level
 */
export function NotAttemptedIcon({
  className = '',
  size = 20,
  color = 'currentColor'
}: MasteryIconProps) {
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
      className={className} data-oid="kr87ti8">

      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" data-oid="3:f7idm" />
      <path d="M9 10a3 3 0 1 1 3 3v2" stroke={color} strokeWidth="2" data-oid="4oxwfe5" />
      <circle cx="12" cy="18" r="0.5" fill={color} stroke="none" data-oid="9k0l1q-" />
    </svg>);

}

/**
 * EmergingIcon - One arrow pointing up for the "Emerging" mastery level
 */
export function EmergingIcon({
  className = '',
  size = 20,
  color = 'currentColor'
}: MasteryIconProps) {
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
      className={className} data-oid="h0drqmo">

      <path d="M7 14L12 9L17 14" stroke={color} strokeWidth="2" data-oid="h:qzhp1" />
    </svg>);

}

/**
 * ProficientIcon - Two arrows pointing up for the "Proficient" mastery level
 */
export function ProficientIcon({
  className = '',
  size = 20,
  color = 'currentColor'
}: MasteryIconProps) {
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
      className={className} data-oid="0m6wy9t">

      <path d="M7 18L12 13L17 18" stroke={color} strokeWidth="2" data-oid="cd5-s92" />
      <path d="M7 11L12 6L17 11" stroke={color} strokeWidth="2" data-oid="coffk_y" />
    </svg>);

}

/**
 * MasteredIcon - Trophy icon with shimmering effect for the "Mastered" mastery level
 */
export function MasteredIcon({
  className = '',
  size = 20,
  color = 'currentColor'
}: MasteryIconProps) {
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
      className={`${className} animate-pulse`} data-oid="7r1fzc5">

      {/* Trophy cup */}
      <path d="M8 21h8m-4-4v4" stroke={color} strokeWidth="2" data-oid="fz4rlli" />
      <path d="M17 5h2a2 2 0 0 1 2 2v2a4 4 0 0 1-4 4h-1" stroke={color} strokeWidth="2" data-oid="18-t8zx" />
      <path d="M7 5H5a2 2 0 0 0-2 2v2a4 4 0 0 0 4 4h1" stroke={color} strokeWidth="2" data-oid="h95ty:g" />
      <path d="M12 17a6 6 0 0 0 6-6V5H6v6a6 6 0 0 0 6 6z" stroke={color} strokeWidth="2" data-oid="2ml8gh3" />
      
      {/* Shimmering effect */}
      <path d="M9 8L10 9" stroke={color} strokeWidth="1.5" className="animate-ping" data-oid="b_m-g-6" />
      <path d="M14 8L15 9" stroke={color} strokeWidth="1.5" className="animate-ping" opacity="0.8" data-oid="48ss2b:" />
      <path d="M12 6L12 7" stroke={color} strokeWidth="1.5" className="animate-ping" opacity="0.6" data-oid="9el21h0" />
    </svg>);

}